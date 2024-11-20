"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export const completeOnboardingAction = async (formData: FormData) => {
  const supabase = await createClient();
  const { data: { user }, error: userError } = await supabase.auth.getUser();

  if (userError || !user) {
    return redirect('/sign-in');
  }

  const role = user.user_metadata.role;
  const profileData = Object.fromEntries(formData.entries());

  // Update user metadata
  const { error: updateError } = await supabase.auth.updateUser({
    data: { onboarded: true }
  });

  if (updateError) {
    return encodedRedirect(
      "error",
      `/onboarding/${role}`,
      "Failed to update onboarding status"
    );
  }

  // Update role-specific profile
  const { error: profileError } = await supabase
    .from(`${role}_profiles`)
    .update(profileData)
    .eq('id', user.id);

  if (profileError) {
    return encodedRedirect(
      "error",
      `/onboarding/${role}`,
      "Failed to update profile"
    );
  }

  return redirect(`/dashboard/${role}`);
};