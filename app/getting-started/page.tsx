'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUser, FaBuilding, FaBriefcase, FaArrowRight } from 'react-icons/fa';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import BackButton from '@/app/components/navigation/BackButton';

const options = [
  {
    id: 'candidate',
    title: 'Job Seeker',
    subtitle: 'Find Your Dream Career',
    icon: FaUser,
    description: 'Access AI-powered job matches, track applications, and showcase your skills to top employers',
    benefits: ['AI-powered job matching', 'Skill assessments', 'Application tracking', 'Career insights'],
    color: 'blue',
    path: '/onboarding/candidate',
    bgPattern: '/patterns/candidate-bg.svg'
  },
  {
    id: 'agency',
    title: 'Recruitment Agency',
    subtitle: 'Streamline Your Operations',
    icon: FaBriefcase,
    description: 'Manage multiple clients, streamline recruitment, and leverage AI for better candidate matching',
    benefits: ['Multi-client management', 'AI-powered matching', 'Advanced analytics', 'Automated workflows'],
    color: 'green',
    path: '/onboarding/agency',
    bgPattern: '/patterns/agency-bg.svg'
  },
  {
    id: 'company',
    title: 'Employer',
    subtitle: 'Build Your Dream Team',
    icon: FaBuilding,
    description: 'Post jobs, manage applications, and find perfect candidates using AI-driven insights',
    benefits: ['Smart job posting', 'Candidate screening', 'Team analytics', 'Interview management'],
    color: 'purple',
    path: '/onboarding/company',
    bgPattern: '/patterns/company-bg.svg'
  }
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  hover: { scale: 1.02, transition: { duration: 0.2 } }
};

const GetStartedPage = () => {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto"
      >
        <div className="flex justify-between items-center mb-8">
          <BackButton href="/" />
          <div className="w-24" />
        </div>

        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 mb-6"
          >
            Welcome to Opher
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 dark:text-gray-300"
          >
            Choose your path to revolutionize your hiring experience
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <AnimatePresence>
            {options.map((option, index) => (
              <motion.div
                key={option.id}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                transition={{ delay: index * 0.1 }}
              >
                <Link href={option.path}>
                  <div 
                    className={`relative h-full bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden
                      ${hoveredCard === option.id ? `ring-2 ring-${option.color}-500` : ''}`}
                    onMouseEnter={() => setHoveredCard(option.id)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    <div className="absolute inset-0 opacity-5">
                      <Image
                        src={option.bgPattern}
                        alt=""
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                    
                    <div className="relative p-8">
                      <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-${option.color}-100 dark:bg-${option.color}-900 mb-6`}>
                        <option.icon className={`w-8 h-8 text-${option.color}-500 dark:text-${option.color}-400`} />
                      </div>
                      
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        {option.title}
                      </h2>
                      <p className={`text-${option.color}-500 dark:text-${option.color}-400 font-medium mb-4`}>
                        {option.subtitle}
                      </p>
                      <p className="text-gray-600 dark:text-gray-300 mb-6">
                        {option.description}
                      </p>
                      
                      <ul className="space-y-3 mb-8">
                        {option.benefits.map((benefit, i) => (
                          <li key={i} className="flex items-center text-gray-600 dark:text-gray-300">
                            <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            {benefit}
                          </li>
                        ))}
                      </ul>

                      <div className={`flex items-center text-${option.color}-500 dark:text-${option.color}-400 font-medium`}>
                        Get Started <FaArrowRight className="ml-2" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default GetStartedPage;
