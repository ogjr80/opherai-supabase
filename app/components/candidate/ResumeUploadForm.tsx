'use client';
import { motion } from 'framer-motion';
import { FaCloudUploadAlt } from 'react-icons/fa';
import BackButton from '@/app/components/navigation/BackButton';

interface ResumeUploadFormProps {
  onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isProcessing: boolean;
}

const ResumeUploadForm = ({ onUpload, isProcessing }: ResumeUploadFormProps) => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <BackButton href="/getting-started" />
          <h2 className="text-3xl font-bold text-center">Upload Your Resume</h2>
          <div className="w-24" /> {/* Spacer for alignment */}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-xl p-8"
        >
          <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-8">
            <FaCloudUploadAlt className="w-16 h-16 text-gray-400 mb-4" />
            <p className="mb-2 text-sm text-gray-500">
              <span className="font-semibold">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-gray-500 mb-4">PDF, DOC, DOCX (MAX. 5MB)</p>
            
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={onUpload}
              className="hidden"
              id="resume-upload"
              disabled={isProcessing}
            />
            <label
              htmlFor="resume-upload"
              className={`px-6 py-3 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700 transition-colors ${
                isProcessing ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isProcessing ? 'Processing...' : 'Select File'}
            </label>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ResumeUploadForm;