'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import BackButton from '@/app/components/navigation/BackButton';
import { Building, Users, Briefcase, Globe, FileText, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';
import StepIndicator from '@/app/components/StepIndicator';
import CompanyProfileForm from '@/app/components/company/CompanyProfileForm';
import CompanyCultureForm from '@/app/components/company/CompanyCultureForm';
import CompanyTeamForm from '@/app/components/company/TeamSetupForm';
import HiringNeedsForm from '@/app/components/company/HiringNeedsForm';
import ReviewForm from '@/app/components/company/ReviewForm';
import { createClient } from '@/utils/supabase/client';
import { CompanyOnboardingService } from '@/utils/supabase/companyOnboardingService';
import { companyProfileSchema, companyCultureSchema, companyTeamSchema, hiringNeedsSchema } from '@/lib/validations/company';
 interface CompanyProfile {
  name: string;
  industry: string;
  size: string;
  website: string;
  description: string;
  location: string;
  founded: string;
}

 interface TeamMember {
  name: string;
  email: string;
  role: string;
  department: string;
}

 interface CompanyFormData {
  profile: CompanyProfile;
  culture: {
    values: string[];
    benefits: string[];
    workStyle: string[];
  };
  team: TeamMember[];
  hiring: {
    positions: string[];
    departments: string[];
    urgency: string;
    hiringGoals: string;
  };
}

export interface CompanyFormProps {
  data: CompanyFormData;
  updateData: (field: string, value: any) => void;
  fieldErrors?: Record<string, string>;
}
const initialFormData: CompanyFormData = {
  profile: {
    name: '',
    industry: '',
    size: '',
    website: '',
    description: '',
    location: '',
    founded: ''
  },
  culture: {
    values: [],
    benefits: [],
    workStyle: []
  },
  team: [],
  hiring: {
    positions: [],
    departments: [],
    urgency: 'medium',
    hiringGoals: ''
  }
};

export default function CompanyOnboarding() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<CompanyFormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});

  const steps = [
    {
      title: 'Company Profile',
      icon: Building,
      description: 'Basic company information',
      component: <CompanyProfileForm 
        data={formData.profile}
        updateData={(field, value) => {
          setFormData(prev => ({
            ...prev,
            profile: { ...prev.profile, [field]: value }
          }));
        }}
      />
    },
    {
      title: 'Company Culture',
      icon: Globe,
      description: 'Values and work environment',
      component: <CompanyCultureForm 
        data={formData.culture}
        updateData={(field, value) => {
          setFormData(prev => ({
            ...prev,
            culture: { ...prev.culture, [field]: value }
          }));
        }}
      />
    },
    {
      title: 'Team Setup',
      icon: Users,
      description: 'Add your team members',
      component: <CompanyTeamForm
        data={formData.team}
        updateData={(field, value) => {
          setFormData(prev => ({
            ...prev,
            team: value
          }));
        }}
      />
    },
    {
      title: 'Hiring Needs',
      icon: Briefcase,
      description: 'Your recruitment goals',
      component: <HiringNeedsForm
        data={formData.hiring}
        updateData={(field, value) => {
          setFormData(prev => ({
            ...prev,
            hiring: { ...prev.hiring, [field]: value }
          }));
        }}
      />
    },
    {
      title: 'Review',
      icon: CheckCircle,
      description: 'Review your information',
      component: <ReviewForm data={formData} />
    }
  ];

  const validateStep = async (currentStep: number) => {
    setIsValidating(true);
    setFieldErrors({});
    
    try {
      switch (currentStep) {
        case 0:
          await companyProfileSchema.parseAsync(formData.profile);
          break;
        case 1:
          await companyCultureSchema.parseAsync(formData.culture);
          break;
        case 2:
          await companyTeamSchema.parseAsync(formData.team);
          break;
        case 3:
          await hiringNeedsSchema.parseAsync(formData.hiring);
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
      await CompanyOnboardingService.completeOnboarding(user.id);
      
      toast.success('Company profile created successfully!');
      router.push('/dashboard/company');
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
                await CompanyOnboardingService.updateProfile(user.id, formData.profile);
                break;
              case 1:
                await CompanyOnboardingService.updateCulture(user.id, formData.culture);
                break;
              case 2:
                await CompanyOnboardingService.updateTeam(user.id, formData.team);
                break;
              case 3:
                await CompanyOnboardingService.updateHiringNeeds(user.id, formData.hiring);
                break;
            }
            
            await CompanyOnboardingService.saveProgress(user.id, step + 1, formData);
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
        
        if (!user) {
          return;
        }

        const progress = await CompanyOnboardingService.loadProgress(user.id);
        
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
          <h1 className="text-3xl font-bold text-center">Create Your Company Profile</h1>
          <div className="w-24" /> {/* Spacer for alignment */}
        </div>
        
        <div className="space-y-6">
          <p className="text-gray-500 text-center max-w-2xl mx-auto">
            Let's get your company profile set up so you can start finding the best talent for your team.
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
              step === steps.length - 1 ? 'Complete Setup' : 'Next'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}