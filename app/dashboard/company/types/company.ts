export interface Candidate {
    id: string;
    personalInfo: {
      name: string;
      email: string;
      phone: string;
      location: string;
      avatar?: string;
      availability: 'immediate' | 'two_weeks' | 'one_month' | 'not_available';
    };
    professionalInfo: {
      currentRole: string;
      yearsOfExperience: number;
      preferredWorkType: ('remote' | 'hybrid' | 'onsite')[];
      expectedSalary: {
        min: number;
        max: number;
        currency: string;
      };
    };
    skills: {
      name: string;
      level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
      yearsOfExperience: number;
      lastUsed: string;
    }[];
    experience: {
      id: string;
      company: string;
      role: string;
      startDate: string;
      endDate?: string;
      current: boolean;
      description: string;
      skills: string[];
      achievements: string[];
    }[];
    education: {
      id: string;
      institution: string;
      degree: string;
      field: string;
      startDate: string;
      endDate: string;
      grade?: string;
    }[];
    applications: {
      jobId: string;
      status: 'new' | 'screening' | 'interview' | 'offer' | 'hired' | 'rejected';
      stage: string;
      progress: number;
      matchScore: number;
      appliedDate: string;
      lastActivity: string;
      nextStep?: string;
      interviews?: {
        id: string;
        type: string;
        date: string;
        time: string;
        interviewer: string;
        status: 'scheduled' | 'completed' | 'cancelled' | 'no_show';
        feedback?: {
          rating: number;
          strengths: string[];
          improvements: string[];
          notes: string;
        };
      }[];
    }[];
    assessments: {
      id: string;
      type: 'technical' | 'behavioral' | 'cognitive';
      name: string;
      score: number;
      maxScore: number;
      completedDate: string;
      details: {
        category: string;
        score: number;
        maxScore: number;
      }[];
    }[];
    documents: {
      id: string;
      type: 'resume' | 'cover_letter' | 'portfolio' | 'certification' | 'other';
      name: string;
      url: string;
      uploadedDate: string;
    }[];
    timeline: {
      id: string;
      type: 'application' | 'interview' | 'assessment' | 'document' | 'note';
      date: string;
      title: string;
      description: string;
      metadata?: Record<string, any>;
    }[];
    notes: {
      id: string;
      author: string;
      date: string;
      content: string;
      type: 'internal' | 'feedback' | 'general';
      visibility: 'private' | 'team' | 'public';
    }[];
    tags: string[];
    starred: boolean;
    lastUpdated: string;
  }