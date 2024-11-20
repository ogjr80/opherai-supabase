'use client';
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import BackButton from '@/app/components/navigation/BackButton';
import { Building, Users, Briefcase, Globe, FileText, CheckCircle, Building2 } from 'lucide-react';
import { toast } from 'sonner';
import StepIndicator from '@/app/components/StepIndicator';
import AgencyProfileForm from '@/app/components/agency/AgencyProfileForm';
import ServicesForm from '@/app/components/agency/ServicesForm';
import TeamSetupForm from '@/app/components/agency/TeamSetupForm';
import ClientPortfolioForm from '@/app/components/agency/ClientPortfolioForm';
import ReviewForm from '@/app/components/agency/ReviewForm';
import { createClient } from '@/utils/supabase/client';
import { AgencyOnboardingService } from '@/utils/supabase/onboardingService';
import { agencyProfileSchema, agencyServicesSchema, recruiterProfileSchema, clientPortfolioSchema } from '@/lib/validations/agency';
import { z } from "zod";
import debounce from 'lodash/debounce';

interface AgencyProfile {
  name: string;
  type: string;
  specialization: string[];
  size: string;
  website: string;
  description: string;
  location: string;
  founded: string;
  industries: string[];
}

interface RecruiterProfile {
  name: string;
  email: string;
  role: string;
  specialization: string[];
  experience: string;
}

interface AgencyFormData {
  profile: AgencyProfile;
  services: {
    recruitmentTypes: string[];
    industries: string[];
    locations: string[];
    fees: {
      structure: string;
      rates: string;
    };
  };
  team: RecruiterProfile[];
  clients: {
    currentClients: string[];
    successMetrics: {
      placements: string;
      timeToHire: string;
      clientRetention: string;
    };
  };
}

const initialFormData: AgencyFormData = {
  profile: {
    name: '',
    type: '',
    specialization: [],
    size: '',
    website: '',
    description: '',
    location: '',
    founded: '',
    industries: []
  },
  services: {
    recruitmentTypes: [],
    industries: [],
    locations: [],
    fees: {
      structure: '',
      rates: ''
    }
  },
  team: [],
  clients: {
    currentClients: [],
    successMetrics: {
      placements: '',
      timeToHire: '',
      clientRetention: ''
    }
  }
};

export default function AgencyOnboarding() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<AgencyFormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const steps = [
    {
      title: 'Agency Profile',
      icon: Building2,
      description: 'Basic information about your agency',
      component: <AgencyProfileForm 
        data={formData.profile}
        fieldErrors={fieldErrors}
        updateData={(field, value) => {
          setFormData(prev => ({
            ...prev,
            profile: { ...prev.profile, [field]: value }
          }));
        }}
      />
    },
    {
      title: 'Services',
      icon: Briefcase,
      description: 'Your recruitment services and specializations',
      component: <ServicesForm 
        data={formData.services}
        fieldErrors={fieldErrors}
        updateData={(field, value) => {
          setFormData(prev => ({
            ...prev,
            services: { ...prev.services, [field]: value }
          }));
        }}
      />
    },
    {
      title: 'Team Setup',
      icon: Users,
      description: 'Add your recruiters and team members',
      component: <TeamSetupForm
        data={formData.team}
        updateData={(field, value) => {
          setFormData(prev => ({
            ...prev,
            [field]: value
          }));
        }}
      />
    },
    {
      title: 'Client Portfolio',
      icon: Building,
      description: 'Your client history and success metrics',
      component: <ClientPortfolioForm
        data={formData.clients}
        updateData={(field, value) => {
          setFormData(prev => ({
            ...prev,
            clients: { ...prev.clients, [field]: value }
          }));
        }}
      />
    },
    {
      title: 'Review',
      icon: CheckCircle,
      description: 'Review and confirm your information',
      component: <ReviewForm data={formData} />
    }
  ];

  const handleSubmit = async () => {
    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('No user found');
      }

      setIsSubmitting(true);
      
      // Just complete onboarding and clear progress
      await AgencyOnboardingService.completeOnboarding(user.id);
      
      toast.success('Setup completed successfully!');
      router.push('/dashboard/agency');
    } catch (error) {
      console.error('Onboarding error:', error);
      toast.error('Failed to complete setup');
    } finally {
      setIsSubmitting(false);
    }
  };

  const validateStep = async (currentStep: number) => {
    setIsValidating(true);
    setFieldErrors({});
    
    try {
      switch (currentStep) {
        case 0:
          await agencyProfileSchema.parseAsync(formData.profile);
          break;
        case 1:
          await agencyServicesSchema.parseAsync(formData.services);
          break;
        case 2:
          await z.array(recruiterProfileSchema).min(1).parseAsync(formData.team);
          break;
        case 3:
          await clientPortfolioSchema.parseAsync(formData.clients);
          break;
      }
      setIsValidating(false);
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors: Record<string, string> = {};
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

  const handleNext = async () => {
    console.log('handleNext clicked');
    setIsValidating(true);
    setFieldErrors({});

    if (step === steps.length - 1) {
      handleSubmit();
    } else {
      const isValid = await validateStep(step);
      console.log('Validation result:', isValid);
      console.log('Current errors:', fieldErrors);
      
      if (isValid) {
        try {
          const supabase = createClient();
          const { data: { user } } = await supabase.auth.getUser();
          
          if (user) {
            setIsSubmitting(true);
            
            // Save both progress and step-specific data
            switch (step) {
              case 0:
                await AgencyOnboardingService.updateProfile(user.id, formData.profile);
                break;
              case 1:
                await AgencyOnboardingService.updateServices(user.id, formData.services);
                break;
              case 2:
                await AgencyOnboardingService.updateTeam(user.id, formData.team);
                break;
              case 3:
                await AgencyOnboardingService.updateClientPortfolio(user.id, formData.clients);
                break;
            }
            
            // Save progress after saving step data
            await AgencyOnboardingService.saveProgress(user.id, step + 1, formData);
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

  // Load saved progress
  useEffect(() => {
    async function loadSavedProgress() {
      try {
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
          return;
        }

        const progress = await AgencyOnboardingService.loadProgress(user.id);
        
        if (progress?.form_data) {
          setStep(progress.current_step);
          setFormData(progress.form_data);
        }
      } catch (error) {
        console.error('Error loading progress:', error);
        // Don't show error toast for first-time users
        if (error.message !== 'No saved progress found') {
          toast.error('Failed to load saved progress');
        }
      }
    }
    
    loadSavedProgress();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <BackButton href="/getting-started" />
          <h1 className="text-3xl font-bold text-center">Welcome to Agency Setup</h1>
          <div className="w-24" /> {/* Spacer for alignment */}
        </div>
        
        <div className="space-y-6">
          <p className="text-gray-500 text-center max-w-2xl mx-auto">
            Let's get your recruitment agency profile set up so you can start connecting companies with top talent.
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