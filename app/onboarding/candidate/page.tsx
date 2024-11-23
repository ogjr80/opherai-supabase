'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import BackButton from '@/app/components/navigation/BackButton';
import { User, GraduationCap, Briefcase, Code, CheckCircle , ProjectorIcon} from 'lucide-react';
import { toast } from 'sonner';
import StepIndicator from '@/app/components/StepIndicator';
import BiographyForm from '@/app/components/candidate/BiographyForm';
import EducationForm from '@/app/components/candidate/EducationForm';
import ExperienceForm from '@/app/components/candidate/ExperienceForm';
import ProjectsForm from '@/app/components/candidate/ProjectsForm';
import SkillsForm from '@/app/components/candidate/SkillsForm';
import ReviewForm from '@/app/components/candidate/SummaryStep';
import { createClient } from '@/utils/supabase/client';
import { CandidateOnboardingService } from '@/utils/supabase/candidateOnboardingservices';
import {
  personalInfoSchema,
  educationSchema,
  experienceSchema,
  projectSchema,
  skillSchema
} from '@/lib/validations/candidate';
import { z } from 'zod';

export interface Education {
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
  grade?: string;
}

export interface Experience {
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
  achievements: string[];
}

export interface Project {
  name: string;
  description: string;
  technologies: string[];
  link?: string;
  startDate: string;
  endDate: string;
}

export interface Skill {
  name: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  yearsOfExperience: number;
}

export interface CandidateProfile {
  biography: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    location: string;
    about: string;
    linkedIn?: string;
    github?: string;
    portfolio?: string;
  };
  education: Education[];
  experience: Experience[];
  projects: Project[];
  skills: Skill[];
}

export type CandidateFormData = CandidateProfile;

export interface CandidateFormProps {
  data: CandidateFormData;
  updateData: (field: string, value: any) => void;
  fieldErrors?: Record<string, string>;
}
const initialFormData: CandidateFormData = {
  biography: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    location: '',
    about: '',
    linkedIn: '',
    github: '',
    portfolio: ''
  },
  education: [],
  experience: [],
  projects: [],
  skills: []
};

export default function CandidateOnboarding() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<CandidateFormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});

  const steps = [
    {
      title: 'Personal Info',
      icon: User,
      description: 'Basic information',
      component: <BiographyForm 
        data={formData.biography}
        updateData={(field, value) => {
          setFormData(prev => ({
            ...prev,
            biography: { ...prev.biography, [field]: value }
          }));
        }}
      />
    },
    {
      title: 'Education',
      icon: GraduationCap,
      description: 'Academic background',
      component: <EducationForm 
        data={formData.education}
        updateData={(field, value) => {
          setFormData(prev => ({
            ...prev,
            education: value
          }));
        }}
      />
    },
    {
      title: 'Experience',
      icon: Briefcase,
      description: 'Work history',
      component: <ExperienceForm
        data={formData.experience}
        updateData={(field, value) => {
          setFormData(prev => ({
            ...prev,
            experience: value
          }));
        }}
      />
    },
    {
      title: 'Projects',
      icon: ProjectorIcon,
      description: 'Portfolio projects',
      component: <ProjectsForm
        data={formData.projects}
        updateData={(field, value) => {
          setFormData(prev => ({
            ...prev,
            projects: value
          }));
        }}
      />
    },
    {
      title: 'Skills',
      icon: Code,
      description: 'Technical skills',
      component: <SkillsForm
        data={formData.skills}
        updateData={(field, value) => {
          setFormData(prev => ({
            ...prev,
            skills: value
          }));
        }}
      />
    },
    {
      title: 'Review',
      icon: CheckCircle,
      description: 'Review profile',
      component: <ReviewForm data={formData} />
    }
  ];

  const validateStep = async (currentStep: number) => {
    setIsValidating(true);
    setFieldErrors({});
    
    try {
      switch (currentStep) {
        case 0:
          await personalInfoSchema.parseAsync(formData.biography);
          break;
        case 1:
          await educationSchema.parseAsync(formData.education);
          break;
        case 2:
          await experienceSchema.parseAsync(formData.experience);
          break;
        case 3:
          await projectSchema.parseAsync(formData.projects);
          break;
        case 4:
          await skillSchema.parseAsync(formData.skills);
          break;
      }
      setIsValidating(false);
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors = {};
        error.errors.forEach(err => {
          const path = err.path.join('.');
          errors[path] = err.message;
          toast.error(err.message);
        });
        setFieldErrors(errors);
      }
      setIsValidating(false);
      return false;
    }
  };

  const handleSubmit = async () => {
    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('No user found');
      }

      setIsSubmitting(true);
      await CandidateOnboardingService.completeOnboarding(user.id);
      
      toast.success('Profile created successfully!');
      router.push('/dashboard/candidate');
    } catch (error) {
      console.error('Onboarding error:', error);
      toast.error('Failed to complete setup');
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleNext = async () => {
    setIsValidating(true);
    setFieldErrors({});

    if (step === steps.length - 1) {
      handleSubmit();
    } else {
      const isValid = await validateStep(step);
      
      if (isValid) {
        try {
          const supabase = createClient();
          const { data: { user } } = await supabase.auth.getUser();
          
          if (user) {
            setIsSubmitting(true);
            
            switch (step) {
              case 0:
                await CandidateOnboardingService.updateBiography(user.id, formData.biography);
                break;
              case 1:
                await CandidateOnboardingService.updateEducation(user.id, formData.education);
                break;
              case 2:
                await CandidateOnboardingService.updateExperience(user.id, formData.experience);
                break;
              case 3:
                await CandidateOnboardingService.updateProjects(user.id, formData.projects);
                break;
              case 4:
                await CandidateOnboardingService.updateSkills(user.id, formData.skills);
                break;
            }
            
            await CandidateOnboardingService.saveProgress(user.id, step + 1, formData);
            setStep(prev => prev + 1);
          }
        } catch (error) {
          console.error('Error saving data:', error);
          toast.error('Failed to save data');
        } finally {
          setIsSubmitting(false);
        }
      }
    }
    setIsValidating(false);
  };

  useEffect(() => {
    const loadSavedProgress = async () => {
      try {
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) return;

        const progress = await CandidateOnboardingService.loadProgress(user.id);
        
        if (progress?.form_data) {
          setStep(progress.current_step);
          setFormData(progress.form_data);
        }
      } catch (error) {
        console.error('Error loading progress:', error);
        if (error.message !== 'No saved progress found') {
          toast.error('Failed to load saved progress');
        }
      }
    };
    
    loadSavedProgress();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <BackButton href="/getting-started" />
          <h1 className="text-3xl font-bold text-center">Create Your Profile</h1>
          <div className="w-24" />
        </div>
        
        <div className="space-y-6">
          <p className="text-gray-500 text-center max-w-2xl mx-auto">
            Let's build your professional profile to help you find the perfect opportunities.
          </p>
          
          <div className="flex justify-center space-x-4">
            {steps.map((stepItem, index) => (
              <StepIndicator 
                key={index}
                title={stepItem.title}
                Icon={stepItem.icon}
                isActive={step === index}
                isCompleted={step > index}
                onClick={() => setStep(index)}
              />
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-white rounded-lg shadow-xl p-8"
          >
            {steps[step].component}
          </motion.div>
        </AnimatePresence>

        <div className="mt-8 flex justify-between">
          <button
            onClick={() => setStep(prev => prev - 1)}
            disabled={step === 0}
            className="px-6 py-3 bg-gray-500 text-white rounded-lg disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            disabled={isSubmitting || isValidating}
            className={`px-6 py-3 text-white rounded-lg flex items-center gap-2
              ${isSubmitting || isValidating ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'}`}
          >
            {isSubmitting || isValidating ? (
              <>
                <span className="animate-spin">⚪</span>
                {isSubmitting ? 'Saving...' : 'Validating...'}
              </>
            ) : (
              step === steps.length - 1 ? 'Complete Profile' : 'Next'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}