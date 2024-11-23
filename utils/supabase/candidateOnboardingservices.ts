import { createClient } from './client';

import {
    personalInfoSchema,
    educationSchema,
    experienceSchema,
    projectSchema,
    skillSchema
} from '@/lib/validations/candidate';
const supabase = createClient();

export const CandidateOnboardingService = {
  async updateBiography(userId: string, bio: CandidateProfile['biography']) {
    try {
      await personalInfoSchema.parseAsync(bio);
      
      const { error } = await supabase
        .from('candidate_profiles')
        .upsert({
          id: userId,
          first_name: bio.firstName,
          last_name: bio.lastName,
          email: bio.email,
          phone: bio.phone,
          location: bio.location,
          about: bio.about,
          linkedin: bio.linkedIn,
          github: bio.github,
          portfolio: bio.portfolio,
          updated_at: new Date().toISOString()
        });

      if (error) throw error;
    } catch (error) {
      console.error('Update biography error:', error);
      throw error;
    }
  },

  async updateEducation(userId: string, education: Education[]) {
    const { error } = await supabase
      .from('candidate_education')
      .upsert(
        education.map(edu => ({
          candidate_id: userId,
          institution: edu.institution,
          degree: edu.degree,
          field_of_study: edu.fieldOfStudy,
          start_date: edu.startDate,
          end_date: edu.endDate,
          grade: edu.grade
        }))
      );

    if (error) throw error;
  },

  async updateExperience(userId: string, experience: Experience[]) {
    const { error } = await supabase
      .from('candidate_experience')
      .upsert(
        experience.map(exp => ({
          candidate_id: userId,
          company: exp.company,
          position: exp.position,
          start_date: exp.startDate,
          end_date: exp.endDate,
          description: exp.description,
          achievements: exp.achievements
        }))
      );

    if (error) throw error;
  },

  async updateProjects(userId: string, projects: Project[]) {
    const { error } = await supabase
      .from('candidate_projects')
      .upsert(
        projects.map(proj => ({
          candidate_id: userId,
          name: proj.name,
          description: proj.description,
          technologies: proj.technologies,
          link: proj.link,
          start_date: proj.startDate,
          end_date: proj.endDate
        }))
      );

    if (error) throw error;
  },

  async updateSkills(userId: string, skills: Skill[]) {
    const { error } = await supabase
      .from('candidate_skills')
      .upsert(
        skills.map(skill => ({
          candidate_id: userId,
          name: skill.name,
          level: skill.level,
          years_of_experience: skill.yearsOfExperience
        }))
      );

    if (error) throw error;
  },

  async saveProgress(userId: string, step: number, formData: CandidateFormData) {
    try {
      const { error } = await supabase
        .from('candidate_onboarding_progress')
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
        .from('candidate_onboarding_progress')
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
      console.error('Load progress error:', error);
      throw error;
    }
  },

  async clearProgress(userId: string) {
    try {
      const { error } = await supabase
        .from('candidate_onboarding_progress')
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