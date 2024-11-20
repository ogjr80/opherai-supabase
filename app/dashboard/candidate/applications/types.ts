export interface Interview {
    type: string;
    date: string;
    time: string;
    interviewer: string;
    status: string;
  }
  
  export interface Application {
    id: number;
    company: string;
    position: string;
    location: string;
    type: string;
    salary: string;
    status: 'applied' | 'in_review' | 'interview_scheduled' | 'offer_received' | 'rejected' | 'accepted';
    logo?: string;
    stage: string;
    progress: number;
    lastActivity: string;
    nextStep?: string;
    matchScore: number;
    applied: string;
    interviews?: Interview[];
  }