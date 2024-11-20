'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import BackButton from '@/app/components/navigation/BackButton';
import { Building, Users, Briefcase, Globe, FileText, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';
import StepIndicator from '@/app/components/StepIndicator';
import CompanyProfileForm from '@/app/components/company/CompanyProfileForm';
import CompanyCultureForm from '@/app/components/company/CompanyCultureForm';
import TeamSetupForm from '@/app/components/company/TeamSetupForm';
import HiringNeedsForm from '@/app/components/company/HiringNeedsForm';
import ReviewForm from '@/app/components/company/ReviewForm';

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

const initialFormData: CompanyFormData = {
  profile: {
    name: '',
    industry: '',
    size: '',
    website: '',
    description: '',
    location: '',
    founded: '',
  },
  culture: {
    values: [],
    benefits: [],
    workStyle: [],
  },
  team: [],
  hiring: {
    positions: [],
    departments: [],
    urgency: 'medium',
    hiringGoals: '',
  },
};

export default function CompanyOnboarding() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<CompanyFormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // API call would go here
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulated API call
      toast.success('Company profile created successfully!');
      router.push('/dashboard/company');
    } catch (error) {
      toast.error('Error creating company profile');
    } finally {
      setIsSubmitting(false);
    }
  };

  const steps = [
    {
      title: 'Company Profile',
      icon: Building,
      description: 'Basic information about your company',
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
      icon: Users,
      description: 'Your values and work environment',
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
      icon: Briefcase,
      description: 'Add your team members',
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
      title: 'Hiring Needs',
      icon: FileText,
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
      description: 'Review and confirm your information',
      component: <ReviewForm data={formData} />
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <BackButton href="/getting-started" />
          <h1 className="text-3xl font-bold text-center">Welcome to Your Company Setup</h1>
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
            onClick={() => step === steps.length - 1 ? handleSubmit() : setStep(prev => prev + 1)}
            disabled={isSubmitting}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg disabled:opacity-75 flex items-center gap-2"
          >
            {isSubmitting ? (
              <>
                <span className="animate-spin">⚪</span>
                Saving...
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