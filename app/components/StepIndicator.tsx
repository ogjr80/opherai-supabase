import { FC } from 'react';
import { IconType } from 'react-icons';
import { motion } from 'framer-motion';

interface StepIndicatorProps {
  title: string;
  Icon: IconType;
  isActive: boolean;
  isCompleted: boolean;
  onClick?: () => void;
}

const StepIndicator: FC<StepIndicatorProps> = ({ 
  title, 
  Icon, 
  isActive, 
  isCompleted,
  onClick 
}) => {
  return (
    <motion.div 
      className="flex flex-col items-center cursor-pointer"
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className={`w-12 h-12 rounded-full flex items-center justify-center mb-2
          ${isCompleted ? 'bg-green-500' : isActive ? 'bg-blue-500' : 'bg-gray-300'}
          ${isActive ? 'ring-4 ring-blue-200' : ''}`}
        initial={false}
        animate={{
          scale: isActive ? 1.1 : 1,
          transition: { type: "spring", stiffness: 300, damping: 20 }
        }}
      >
        <Icon className="w-6 h-6 text-white" />
      </motion.div>
      <motion.span 
        className={`text-sm ${isActive ? 'text-blue-600 font-medium' : 'text-gray-500'}`}
        animate={{
          scale: isActive ? 1.05 : 1
        }}
      >
        {title}
      </motion.span>
    </motion.div>
  );
};

export default StepIndicator;