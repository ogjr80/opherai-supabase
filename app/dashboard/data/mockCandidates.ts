import { Candidate } from '../company/types/company';

export const mockCandidates: Candidate[] = [
  {
    id: '1',
    personalInfo: {
      name: 'Sarah Chen',
      email: 'sarah.chen@example.com',
      phone: '+1 (555) 123-4567',
      location: 'San Francisco, CA',
      availability: 'two_weeks',
    },
    professionalInfo: {
      currentRole: 'Senior Frontend Developer',
      yearsOfExperience: 8,
      preferredWorkType: ['remote', 'hybrid'],
      expectedSalary: {
        min: 120000,
        max: 150000,
        currency: 'USD',
      },
    },
    skills: [
      {
        name: 'React',
        level: 'expert',
        yearsOfExperience: 6,
        lastUsed: '2024-04',
      },
      {
        name: 'TypeScript',
        level: 'advanced',
        yearsOfExperience: 4,
        lastUsed: '2024-04',
      },
      
    ],
    experience: [
      {
        id: 'exp1',
        company: 'TechCorp',
        role: 'Senior Frontend Developer',
        startDate: '2021-03',
        current: true,
        description: 'Leading frontend development team...',
        skills: ['React', 'TypeScript', 'Next.js'],
        achievements: [
          'Reduced load time by 40%',
          'Implemented CI/CD pipeline',
        ],
      },
      
    ],
    education: [
      {
        id: 'edu1',
        institution: 'University of California, Berkeley',
        degree: 'Bachelor of Science',
        field: 'Computer Science',
        startDate: '2012-09',
        endDate: '2016-05',
        grade: '3.8 GPA',
      },
    ],
    applications: [
      {
        jobId: 'job1',
        status: 'interview',
        stage: 'Technical Interview',
        progress: 75,
        matchScore: 92,
        appliedDate: '2024-04-01',
        lastActivity: '2 hours ago',
        nextStep: 'Technical Interview on April 15, 2024',
        interviews: [
          {
            id: 'int1',
            type: 'Technical Interview',
            date: '2024-04-15',
            time: '10:00 AM PST',
            interviewer: 'Sarah Johnson',
            status: 'scheduled',
          },
        ],
      },
    ],
    assessments: [
      {
        id: 'ass1',
        type: 'technical',
        name: 'Frontend Development',
        score: 92,
        maxScore: 100,
        completedDate: '2024-03-15',
        details: [
          {
            category: 'React',
            score: 95,
            maxScore: 100,
          },
          {
            category: 'JavaScript',
            score: 90,
            maxScore: 100,
          },
        ],
      },
    ],
    documents: [
      {
        id: 'doc1',
        type: 'resume',
        name: 'Sarah_Chen_Resume_2024.pdf',
        url: '/documents/resume.pdf',
        uploadedDate: '2024-01-15',
      },
    ],
    timeline: [
      {
        id: 'tim1',
        type: 'application',
        date: '2024-04-01',
        title: 'Applied for Senior Frontend Developer',
        description: 'Application submitted successfully',
      },
    ],
    notes: [
      {
        id: 'note1',
        author: 'John Recruiter',
        date: '2024-04-02',
        content: 'Excellent communication skills during initial screening',
        type: 'feedback',
        visibility: 'team',
      },
    ],
    tags: ['frontend', 'react', 'senior'],
    starred: true,
    lastUpdated: '2024-04-10T15:30:00Z',
  },
  {
    id: '2',
    personalInfo: {
      name: 'Michael Brown',
      email: 'michael.brown@example.com',
      phone: '+1 (555) 234-5678',
      location: 'Remote',
      availability: 'immediate',
    },
    professionalInfo: {
      currentRole: 'DevOps Engineer',
      yearsOfExperience: 5,
      preferredWorkType: ['remote'],
      expectedSalary: {
        min: 110000,
        max: 140000,
        currency: 'USD',
      },
    },
    skills: [
      {
        name: 'AWS',
        level: 'expert',
        yearsOfExperience: 5,
        lastUsed: '2024-04',
      },
      {
        name: 'Docker',
        level: 'expert',
        yearsOfExperience: 4,
        lastUsed: '2024-04',
      },
      {
        name: 'Kubernetes',
        level: 'advanced',
        yearsOfExperience: 3,
        lastUsed: '2024-04',
      },
    ],
    experience: [
      {
        id: 'exp1',
        company: 'CloudTech Solutions',
        role: 'DevOps Engineer',
        startDate: '2022-01',
        current: true,
        description: 'Leading cloud infrastructure and deployment automation',
        skills: ['AWS', 'Docker', 'Kubernetes', 'Terraform'],
        achievements: [
          'Reduced deployment time by 60%',
          'Implemented zero-downtime deployments',
        ],
      },
    ],
    applications: [
      {
        jobId: 'job2',
        status: 'screening',
        stage: 'Initial Review',
        progress: 30,
        matchScore: 88,
        appliedDate: '2024-04-02',
        lastActivity: '1 day ago',
        nextStep: 'Technical Screening Call',
      },
    ],
    education: [
      {
        id: 'edu1',
        institution: 'MIT',
        degree: 'Master of Science',
        field: 'Computer Engineering',
        startDate: '2017-09',
        endDate: '2019-05',
        grade: '3.9 GPA',
      },
    ],
    tags: ['devops', 'aws', 'kubernetes'],
    starred: false,
    lastUpdated: '2024-04-09T10:15:00Z',
  },
  {
    id: '3',
    personalInfo: {
      name: 'Emily Rodriguez',
      email: 'emily.r@example.com',
      phone: '+1 (555) 345-6789',
      location: 'New York, NY',
      availability: 'one_month',
    },
    professionalInfo: {
      currentRole: 'Data Scientist',
      yearsOfExperience: 4,
      preferredWorkType: ['hybrid', 'onsite'],
      expectedSalary: {
        min: 130000,
        max: 160000,
        currency: 'USD',
      },
    },
    skills: [
      {
        name: 'Python',
        level: 'expert',
        yearsOfExperience: 4,
        lastUsed: '2024-04',
      },
      {
        name: 'Machine Learning',
        level: 'advanced',
        yearsOfExperience: 3,
        lastUsed: '2024-04',
      },
      {
        name: 'TensorFlow',
        level: 'intermediate',
        yearsOfExperience: 2,
        lastUsed: '2024-04',
      },
    ],
    applications: [
      {
        jobId: 'job3',
        status: 'offer',
        stage: 'Offer Review',
        progress: 90,
        matchScore: 95,
        appliedDate: '2024-03-15',
        lastActivity: '3 hours ago',
        nextStep: 'Offer Acceptance',
      },
    ],
    tags: ['data-science', 'machine-learning', 'python'],
    starred: true,
    lastUpdated: '2024-04-10T09:20:00Z',
  },
  {
    id: '4',
    personalInfo: {
      name: 'David Kim',
      email: 'david.kim@example.com',
      phone: '+1 (555) 456-7890',
      location: 'Seattle, WA',
      availability: 'two_weeks',
    },
    professionalInfo: {
      currentRole: 'Backend Engineer',
      yearsOfExperience: 6,
      preferredWorkType: ['remote', 'hybrid'],
      expectedSalary: {
        min: 140000,
        max: 170000,
        currency: 'USD',
      },
    },
    skills: [
      {
        name: 'Go',
        level: 'expert',
        yearsOfExperience: 4,
        lastUsed: '2024-04',
      },
      {
        name: 'PostgreSQL',
        level: 'expert',
        yearsOfExperience: 6,
        lastUsed: '2024-04',
      },
    ],
    applications: [
      {
        jobId: 'job4',
        status: 'new',
        stage: 'Application Review',
        progress: 10,
        matchScore: 87,
        appliedDate: '2024-04-08',
        lastActivity: '2 days ago',
        nextStep: 'Initial Review',
      },
    ],
    tags: ['backend', 'golang', 'databases'],
    starred: false,
    lastUpdated: '2024-04-08T14:30:00Z',
  },
  {
    id: '5',
    personalInfo: {
      name: 'Rachel Thompson',
      email: 'rachel.t@example.com',
      phone: '+1 (555) 567-8901',
      location: 'Austin, TX',
      availability: 'immediate',
    },
    professionalInfo: {
      currentRole: 'UI/UX Designer',
      yearsOfExperience: 7,
      preferredWorkType: ['hybrid'],
      expectedSalary: {
        min: 100000,
        max: 130000,
        currency: 'USD',
      },
    },
    skills: [
      {
        name: 'Figma',
        level: 'expert',
        yearsOfExperience: 5,
        lastUsed: '2024-04',
      },
      {
        name: 'User Research',
        level: 'expert',
        yearsOfExperience: 7,
        lastUsed: '2024-04',
      },
    ],
    applications: [
      {
        jobId: 'job5',
        status: 'rejected',
        stage: 'Final Decision',
        progress: 100,
        matchScore: 82,
        appliedDate: '2024-03-20',
        lastActivity: '1 week ago',
        nextStep: 'None',
      },
    ],
    tags: ['design', 'ui-ux', 'figma'],
    starred: false,
    lastUpdated: '2024-04-03T11:45:00Z',
  }
];