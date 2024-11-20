'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import BackButton from '@/app/components/navigation/BackButton';
import { FaGraduationCap, FaBriefcase, FaCode, FaUser, FaProjectDiagram, FaCheckCircle, FaFileUpload } from 'react-icons/fa';
import { toast } from 'sonner';
import Link from 'next/link';

import BiographyForm from '@/app/components/candidate/BiographyForm';
import EducationForm from '@/app/components/candidate/EducationForm';
import ExperienceForm from '@/app/components/candidate/ExperienceForm';
import ProjectsForm from '@/app/components/candidate/ProjectsForm';
import SkillsForm from '@/app/components/candidate/SkillsForm';
import StepIndicator from '@/app/components/StepIndicator';
import OnboardingMethodSelection from '@/app/components/candidate/OnboardingMethodSelection';
import ResumeUploadForm from '@/app/components/candidate/ResumeUploadForm';

import { getEmptyItem } from '@/app/components/utils/formHelpers';

interface Education {
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
  grade?: string;
}

interface Experience {
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
  achievements: string[];
}

interface Project {
  name: string;
  description: string;
  technologies: string[];
  link?: string;
  startDate: string;
  endDate: string;
}

interface Skill {
  name: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  yearsOfExperience: number;
}

const CandidateOnboarding = () => {
  const router = useRouter();
  const [onboardingMethod, setOnboardingMethod] = useState<'manual' | 'resume' | null>(null);
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    biography: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      location: '',
      about: '',
      linkedIn: '',
      github: '',
      portfolio: '',
    },
    education: [] as Education[],
    experience: [] as Experience[],
    projects: [] as Project[],
    skills: [] as Skill[],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isProcessingResume, setIsProcessingResume] = useState(false);

  const addItem = (section: 'education' | 'experience' | 'projects' | 'skills') => {
    setFormData(prev => ({
      ...prev,
      [section]: [...prev[section], getEmptyItem(section)]
    }));
  };

  const removeItem = (section: 'education' | 'experience' | 'projects' | 'skills', index: number) => {
    setFormData(prev => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index)
    }));
  };

  const updateItem = (
    section: 'education' | 'experience' | 'projects' | 'skills',
    index: number,
    field: string,
    value: string | number | string[] | boolean
  ) => {
    setFormData(prev => ({
      ...prev,
      [section]: prev[section].map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  const handleResumeUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsProcessingResume(true);
    const formData = new FormData();
    formData.append('resume', file);

    try {
      // Call your AI resume parsing endpoint
      const response = await fetch('/api/parse-resume', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Failed to parse resume');

      const parsedData = await response.json();
      
      // Update form data with parsed information
      setFormData(parsedData);
      setOnboardingMethod('manual'); // Switch to manual mode for review/editing
      toast.success('Resume parsed successfully! Please review and edit the information.');
    } catch (error) {
      console.error('Error parsing resume:', error);
      toast.error('Failed to parse resume. Please try again or use manual input.');
    } finally {
      setIsProcessingResume(false);
    }
  };

  if (!onboardingMethod) {
    return <OnboardingMethodSelection onSelect={setOnboardingMethod} />;
  }

  if (onboardingMethod === 'resume') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-xl w-full space-y-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold text-gray-900">Upload Your Resume</h2>
            <p className="mt-2 text-gray-600">We'll help you create a great profile from your resume</p>
          </motion.div>
          
          <ResumeUploadForm 
            onUpload={handleResumeUpload}
            isProcessing={isProcessingResume}
          />
        </div>
      </div>
    );
  }

  const steps = [
    {
      title: 'Biography',
      icon: FaUser,
      component: <BiographyForm 
        data={formData.biography} 
        updateData={(field: string, value: string) => 
          setFormData(prev => ({
            ...prev,
            biography: { ...prev.biography, [field]: value }
          }))
        }
      />
    },
    {
      title: 'Education',
      icon: FaGraduationCap,
      component: <EducationForm 
        education={formData.education}
        addEducation={() => addItem('education')}
        removeEducation={(index) => removeItem('education', index)}
        updateEducation={(index, field, value) => 
          updateItem('education', index, field, value)
        }
      />
    },
    {
      title: 'Experience',
      icon: FaBriefcase,
      component: <ExperienceForm 
        experience={formData.experience}
        addExperience={() => addItem('experience')}
        removeExperience={(index) => removeItem('experience', index)}
        updateExperience={(index, field, value) => 
          updateItem('experience', index, field, value)
        }
      />
    },
    {
      title: 'Projects',
      icon: FaProjectDiagram,
      component: <ProjectsForm 
        projects={formData.projects}
        addProject={() => addItem('projects')}
        removeProject={(index) => removeItem('projects', index)}
        updateProject={(index, field, value) => 
          updateItem('projects', index, field, value)
        }
      />
    },
    {
      title: 'Skills',
      icon: FaCode,
      component: <SkillsForm 
        skills={formData.skills}
        addSkill={() => addItem('skills')}
        removeSkill={(index) => removeItem('skills', index)}
        updateSkill={(index, field, value) => 
          updateItem('skills', index, field, value)
        }
      />
    },
    {
      title: 'Summary',
      icon: FaCheckCircle,
      component: (
        <div className="space-y-6 text-center">
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-gray-900">Thank You for Completing Your Profile!</h3>
            <p className="text-gray-600">
              Your profile has been successfully created. We will use this information to match you with the best opportunities.
            </p>
          </div>

          <div className="bg-green-50 p-6 rounded-lg">
            <h4 className="font-semibold text-green-800 mb-2">Profile Summary</h4>
            <div className="space-y-2 text-left">
              <p className="text-green-700">
                ✓ Personal Information: {formData.biography.firstName} {formData.biography.lastName}
              </p>
              <p className="text-green-700">
                ✓ Education: {formData.education.length} entries added
              </p>
              <p className="text-green-700">
                ✓ Experience: {formData.experience.length} entries added
              </p>
              <p className="text-green-700">
                ✓ Projects: {formData.projects.length} entries added
              </p>
              <p className="text-green-700">
                ✓ Skills: {formData.skills.length} skills added
              </p>
            </div>
          </div>

          <div className="pt-4">
            <p className="text-gray-600 mb-4">
              Ready to explore opportunities? Visit your dashboard to get started!
            </p>
            <Link 
              href="/dashboard/candidate"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Go to Dashboard
            </Link>
          </div>
        </div>
      )
    }
  ];

  const handleSubmit = () => {
    try {
      setIsSubmitting(true);
      
    //   // Here you would send the data to your backend
    //   const response = await fetch('/api/candidate/onboarding', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(formData),
    //   });

    //   if (!response.ok) {
    //     throw new Error('Failed to submit onboarding data');
    //   }

      toast.success('Profile created successfully!');
      router.push('/dashboard/candidate'); // Redirect to candidate dashboard
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Failed to create profile. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <BackButton href="/getting-started" />
          <h1 className="text-3xl font-bold text-center">Create Your Profile</h1>
          <div className="w-24" /> {/* Spacer for alignment */}
        </div>
        
        <div className="mb-8">
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
              step === steps.length - 1 ? 'Complete Profile' : 'Next'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CandidateOnboarding;
