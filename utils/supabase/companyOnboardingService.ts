import { createClient } from './client';
import { companyProfileSchema, companyCultureSchema, companyTeamSchema, hiringNeedsSchema } from '@/lib/validations/company';
const supabase = createClient();

export const CompanyOnboardingService = {
  async updateProfile(userId: string, profile: CompanyProfile) {
    try {
      await companyProfileSchema.parseAsync(profile);
      
      const { error } = await supabase
        .from('company_profiles')
        .upsert({
          id: userId,
          company_name: profile.name,
          industry: profile.industry,
          size: profile.size,
          website: profile.website,
          description: profile.description,
          location: profile.location,
          founded: profile.founded,
          updated_at: new Date().toISOString()
        });

      if (error) throw error;
    } catch (error) {
      console.error('Update profile error:', error);
      throw error;
    }
  },

  async updateCulture(userId: string, culture: CompanyFormData['culture']) {
    const { error } = await supabase
      .from('company_culture')
      .upsert({
        company_id: userId,
        values: culture.values,
        benefits: culture.benefits,
        work_style: culture.workStyle
      });

    if (error) throw error;
  },

  async updateTeam(userId: string, team: TeamMember[]) {
    const { error } = await supabase
      .from('company_team')
      .upsert(
        team.map(member => ({
          company_id: userId,
          name: member.name,
          email: member.email,
          role: member.role,
          department: member.department
        }))
      );

    if (error) throw error;
  },

  async updateHiringNeeds(userId: string, hiring: CompanyFormData['hiring']) {
    const { error } = await supabase
      .from('company_hiring_needs')
      .upsert({
        company_id: userId,
        positions: hiring.positions,
        departments: hiring.departments,
        urgency: hiring.urgency,
        hiring_goals: hiring.hiringGoals
      });

    if (error) throw error;
  },

  async saveProgress(userId: string, step: number, formData: CompanyFormData) {
    try {
      const { error } = await supabase
        .from('company_onboarding_progress')
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
        );

      if (error) throw error;
    } catch (error) {
      console.error('Save progress error:', error);
      throw error;
    }
  },

  async loadProgress(userId: string) {
    try {
      const { data, error } = await supabase
        .from('company_onboarding_progress')
        .select('current_step, form_data')
        .eq('user_id', userId)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
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
        .from('company_onboarding_progress')
        .delete()
        .eq('user_id', userId);

      if (error) throw error;
    } catch (error) {
      console.error('Error clearing progress:', error);
      throw error;
    }
  },

  async completeOnboarding(userId: string) {
    try {
      const { error: userError } = await supabase.auth.updateUser({
        data: { onboarded: true }
      });

      if (userError) throw userError;
      await this.clearProgress(userId);
    } catch (error) {
      console.error('Error completing onboarding:', error);
      throw error;
    }
  }
};