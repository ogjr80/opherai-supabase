import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Award, Sun, Coffee } from 'lucide-react';

interface CompanyCultureFormProps {
  data: {
    values: string[];
    benefits: string[];
    workStyle: string[];
  };
  updateData: (field: string, value: string[]) => void;
}

const companyValues = [
  'Innovation',
  'Collaboration',
  'Excellence',
  'Integrity',
  'Customer Focus',
  'Diversity',
  'Growth Mindset',
  'Work-Life Balance',
  'Sustainability',
  'Social Responsibility'
];

const companyBenefits = [
  'Health Insurance',
  'Dental & Vision',
  'Remote Work',
  'Flexible Hours',
  'Professional Development',
  'Stock Options',
  'Paid Time Off',
  'Parental Leave',
  'Gym Membership',
  'Mental Health Support',
  'Learning Budget',
  'Team Events'
];

const workStyles = [
  'Fully Remote',
  'Hybrid',
  'Office-First',
  'Flexible Schedule',
  'Results-Oriented',
  'Collaborative',
  'Autonomous'
];

const CompanyCultureForm = ({ data, updateData }: CompanyCultureFormProps) => {
  const toggleSelection = (field: string, value: string) => {
    const currentValues = data[field as keyof typeof data];
    const newValues = currentValues.includes(value)
      ? currentValues.filter(v => v !== value)
      : [...currentValues, value];
    updateData(field, newValues);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      <div className="space-y-6">
        <div className="flex items-center space-x-2">
          <Heart className="w-5 h-5 text-red-500" />
          <h3 className="text-lg font-medium">Company Values</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {companyValues.map((value) => (
            <motion.button
              key={value}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => toggleSelection('values', value)}
              className={`p-3 rounded-lg text-sm border transition-colors
                ${data.values.includes(value)
                  ? 'bg-blue-50 border-blue-200 text-blue-700'
                  : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                }`}
            >
              {value}
            </motion.button>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex items-center space-x-2">
          <Award className="w-5 h-5 text-purple-500" />
          <h3 className="text-lg font-medium">Benefits & Perks</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {companyBenefits.map((benefit) => (
            <motion.button
              key={benefit}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => toggleSelection('benefits', benefit)}
              className={`p-3 rounded-lg text-sm border transition-colors
                ${data.benefits.includes(benefit)
                  ? 'bg-purple-50 border-purple-200 text-purple-700'
                  : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                }`}
            >
              {benefit}
            </motion.button>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex items-center space-x-2">
          <Sun className="w-5 h-5 text-orange-500" />
          <h3 className="text-lg font-medium">Work Style</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {workStyles.map((style) => (
            <motion.button
              key={style}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => toggleSelection('workStyle', style)}
              className={`p-3 rounded-lg text-sm border transition-colors
                ${data.workStyle.includes(style)
                  ? 'bg-orange-50 border-orange-200 text-orange-700'
                  : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                }`}
            >
              {style}
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default CompanyCultureForm;