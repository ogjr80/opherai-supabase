import { mockCandidates } from '@/app/dashboard/data/mockCandidates';
import { Candidate } from '@/app/dashboard/company/types/company';

export const candidateService = {
  async getAllCandidates(): Promise<Candidate[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    return mockCandidates;
  },

  async getCandidateById(id: string): Promise<Candidate | null> {
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockCandidates.find(candidate => candidate.id === id) || null;
  },

  async searchCandidates(query: string): Promise<Candidate[]> {
    await new Promise(resolve => setTimeout(resolve, 800));
    return mockCandidates.filter(candidate => 
      candidate.personalInfo.name.toLowerCase().includes(query.toLowerCase()) ||
      candidate.skills.some(skill => 
        skill.name.toLowerCase().includes(query.toLowerCase())
      )
    );
  },

  async filterCandidates(filters: {
    status?: string;
    location?: string;
    skills?: string[];
    experience?: number;
  }): Promise<Candidate[]> {
    await new Promise(resolve => setTimeout(resolve, 800));
    return mockCandidates.filter(candidate => {
      let matches = true;
      if (filters.status) {
        matches = matches && candidate.applications.some(app => app.status === filters.status);
      }
      if (filters.location) {
        matches = matches && candidate.personalInfo.location.includes(filters.location);
      }
      if (filters.skills?.length) {
        matches = matches && filters.skills.every(skill =>
          candidate.skills.some(s => s.name.toLowerCase() === skill.toLowerCase())
        );
      }
      if (filters.experience) {
        matches = matches && candidate.professionalInfo.yearsOfExperience >= filters.experience;
      }
      return matches;
    });
  }
};