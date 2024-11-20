import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, Plus, X, Building, Clock, Target } from 'lucide-react';

interface HiringNeedsFormProps {
  data: {
    positions: string[];
    departments: string[];
    urgency: string;
    hiringGoals: string;
  };
  updateData: (field: string, value: any) => void;
}

const departments = [
  'Engineering',
  'Product',
  'Design',
  'Marketing',
  'Sales',
  'Customer Success',
  'Human Resources',
  'Finance',
  'Operations',
  'Legal'
];

const urgencyLevels = [
  { value: 'low', label: 'Low - No immediate hiring needs' },
  { value: 'medium', label: 'Medium - Hiring within 3-6 months' },
  { value: 'high', label: 'High - Immediate hiring needs' }
];

const HiringNeedsForm = ({ data, updateData }: HiringNeedsFormProps) => {
  const [newPosition, setNewPosition] = useState('');
  
  const addPosition = () => {
    if (newPosition.trim()) {
      updateData('positions', [...data.positions, newPosition.trim()]);
      setNewPosition('');
    }
  };

  const removePosition = (index: number) => {
    updateData('positions', data.positions.filter((_, i) => i !== index));
  };

  const toggleDepartment = (department: string) => {
    const newDepartments = data.departments.includes(department)
      ? data.departments.filter(d => d !== department)
      : [...data.departments, department];
    updateData('departments', newDepartments);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      <div className="space-y-6">
        <div className="flex items-center space-x-2">
          <Briefcase className="w-5 h-5 text-blue-500" />
          <h3 className="text-lg font-medium">Open Positions</h3>
        </div>
        <div className="space-y-4">
          <div className="flex space-x-2">
            <input
              type="text"
              value={newPosition}
              onChange={(e) => setNewPosition(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter position title"
              onKeyPress={(e) => e.key === 'Enter' && addPosition()}
            />
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={addPosition}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Plus className="w-5 h-5" />
            </motion.button>
          </div>
          <AnimatePresence>
            {data.positions.map((position, index) => (
              <motion.div
                key={position}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <span>{position}</span>
                <button
                  onClick={() => removePosition(index)}
                  className="text-gray-400 hover:text-red-500"
                >
                  <X className="w-4 h-4" />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex items-center space-x-2">
          <Building className="w-5 h-5 text-purple-500" />
          <h3 className="text-lg font-medium">Hiring Departments</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {departments.map((department) => (
            <motion.button
              key={department}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => toggleDepartment(department)}
              className={`p-3 rounded-lg text-sm border transition-colors
                ${data.departments.includes(department)
                  ? 'bg-purple-50 border-purple-200 text-purple-700'
                  : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                }`}
            >
              {department}
            </motion.button>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex items-center space-x-2">
          <Clock className="w-5 h-5 text-orange-500" />
          <h3 className="text-lg font-medium">Hiring Urgency</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {urgencyLevels.map((level) => (
            <motion.button
              key={level.value}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => updateData('urgency', level.value)}
              className={`p-3 rounded-lg text-sm border transition-colors
                ${data.urgency === level.value
                  ? 'bg-orange-50 border-orange-200 text-orange-700'
                  : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                }`}
            >
              {level.label}
            </motion.button>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex items-center space-x-2">
          <Target className="w-5 h-5 text-green-500" />
          <h3 className="text-lg font-medium">Hiring Goals</h3>
        </div>
        <textarea
          value={data.hiringGoals}
          onChange={(e) => updateData('hiringGoals', e.target.value)}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
          placeholder="Describe your hiring goals and timeline..."
        />
      </div>
    </motion.div>
  );
};

export default HiringNeedsForm;