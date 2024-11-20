import { createClient } from './client';
import { agencyProfileSchema } from '@/lib/validations/agency';
const supabase = createClient();

export const AgencyOnboardingService = {
  async updateProfile(userId: string, data: AgencyProfile) {
    try {
      await agencyProfileSchema.parseAsync(data);
      
      // First check if the record exists
      const { data: existing } = await supabase
        .from('agency_profiles')
        .select('id')
        .eq('id', userId)
        .single();

      if (existing) {
        // Update existing record
        const { error } = await supabase
          .from('agency_profiles')
          .update({
            agency_name: data.name,
            type: data.type,
            specialization: data.specialization,
            size: data.size,
            website: data.website,
            description: data.description,
            location: data.location,
            founded: data.founded,
            industries: data.industries,
            updated_at: new Date().toISOString()
          })
          .eq('id', userId);

        if (error) throw error;
      } else {
        // Insert new record
        const { error } = await supabase
          .from('agency_profiles')
          .insert({
            id: userId,
            agency_name: data.name,
            type: data.type,
            specialization: data.specialization,
            size: data.size,
            website: data.website,
            description: data.description,
            location: data.location,
            founded: data.founded,
            industries: data.industries,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          });

        if (error) throw error;
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      throw new Error('Failed to update agency profile');
    }
  },

  async updateServices(userId: string, data: AgencyFormData['services']) {
    const { error } = await supabase
      .from('agency_services')
      .upsert({
        agency_id: userId,
        recruitment_types: data.recruitmentTypes,
        industries: data.industries,
        locations: data.locations,
        fee_structure: data.fees.structure,
        fee_rates: data.fees.rates
      });

    if (error) throw error;
  },

  async updateTeam(userId: string, team: RecruiterProfile[]) {
    const { error } = await supabase
      .from('agency_team')
      .upsert(
        team.map(member => ({
          agency_id: userId,
          name: member.name,
          email: member.email,
          role: member.role,
          specialization: member.specialization,
          experience: member.experience
        }))
      );

    if (error) throw error;
  },

  async updateClientPortfolio(userId: string, data: AgencyFormData['clients']) {
    const { error } = await supabase
      .from('agency_client_portfolio')
      .upsert({
        agency_id: userId,
        current_clients: data.currentClients,
        placements: data.successMetrics.placements,
        time_to_hire: data.successMetrics.timeToHire,
        client_retention: data.successMetrics.clientRetention
      });

    if (error) throw error;
  },

  async completeOnboarding(userId: string) {
    try {
      // Update user metadata to mark onboarding as complete
      const { error: userError } = await supabase.auth.updateUser({
        data: { onboarded: true }
      });

      if (userError) throw userError;

      // Clear onboarding progress after successful completion
      await this.clearProgress(userId);
    } catch (error) {
      console.error('Error completing onboarding:', error);
      throw error;
    }
  },

  async saveProgress(userId: string, step: number, formData: AgencyFormData) {
    try {
      const { data, error } = await supabase
        .from('agency_onboarding_progress')
        .upsert(
          {
            user_id: userId,
            current_step: step,
            form_data: formData,
            last_updated: new Date().toISOString()
          },
          {
            onConflict: 'user_id',
            ignoreDuplicates: false
          }
        )
        .select();

      if (error) {
        console.error('Supabase error:', error);
        throw new Error(error.message);
      }

      return data;
    } catch (error) {
      console.error('Save progress error:', error);
      throw error;
    }
  },

  async loadProgress(userId: string) {
    try {
      const { data, error } = await supabase
        .from('agency_onboarding_progress')
        .select('current_step, form_data')
        .eq('user_id', userId)
        .single();

      if (error) {
        if (error.code === 'PGRST116') { // No rows returned
          throw new Error('No saved progress found');
        }
        throw error;
      }

      return {
        current_step: data.current_step,
        form_data: data.form_data
      };
    } catch (error) {
      console.error('Error in loadProgress:', error);
      throw error;
    }
  },

  async clearProgress(userId: string) {
    try {
      const { error } = await supabase
        .from('agency_onboarding_progress')
        .delete()
        .eq('user_id', userId);

      if (error) throw error;
    } catch (error) {
      console.error('Error clearing progress:', error);
      throw error;
    }
  }
};