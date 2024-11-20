import { motion } from 'framer-motion';
import { FaFileUpload, FaUser } from 'react-icons/fa';
import BackButton from '@/app/components/navigation/BackButton';

interface OnboardingMethodSelectionProps {
  onSelect: (method: 'manual' | 'resume') => void;
}

const OnboardingMethodSelection = ({ onSelect }: OnboardingMethodSelectionProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen bg-gray-50 flex flex-col px-4"
    >
      <div className="w-full max-w-4xl mx-auto pt-12">
        <div className="flex justify-between items-center mb-8">
          <BackButton href="/getting-started" />
          <div className="w-24" /> {/* Spacer for alignment */}
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center">
        <div className="max-w-4xl w-full space-y-8">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center"
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to Your Career Journey</h1>
            <p className="text-xl text-gray-600 mb-8">Let's get your professional profile set up</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <button
                onClick={() => onSelect('resume')}
                className="w-full h-64 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all p-8 group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative z-10">
                  <FaFileUpload className="w-16 h-16 text-blue-500 mb-4 mx-auto" />
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2">Quick Start</h3>
                  <p className="text-gray-600">Upload your resume and let AI do the work</p>
                  <div className="mt-4 text-sm text-gray-500">
                    Supports PDF, DOC, DOCX
                  </div>
                </div>
              </button>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <button
                onClick={() => onSelect('manual')}
                className="w-full h-64 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all p-8 group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative z-10">
                  <FaUser className="w-16 h-16 text-green-500 mb-4 mx-auto" />
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2">Step by Step</h3>
                  <p className="text-gray-600">Create your profile with our guided process</p>
                  <div className="mt-4 text-sm text-gray-500">
                    5-10 minutes to complete
                  </div>
                </div>
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default OnboardingMethodSelection;