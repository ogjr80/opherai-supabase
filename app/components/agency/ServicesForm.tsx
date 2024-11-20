import { useState } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Globe, DollarSign } from 'lucide-react';

interface ServicesFormProps {
  data: {
    recruitmentTypes: string[];
    industries: string[];
    locations: string[];
    fees: {
      structure: string;
      rates: string;
    };
  };
  updateData: (field: string, value: string | string[]) => void;
}

const recruitmentTypes = [
  'Permanent Placement',
  'Contract Staffing',
  'Executive Search',
  'RPO Services',
  'Project-Based Hiring',
  'Volume Hiring',
  'Technical Recruitment',
  'C-Level Recruitment'
];

const feeStructures = [
  'Percentage of Annual Salary',
  'Fixed Fee per Position',
  'Retainer + Success Fee',
  'Hourly Rate',
  'Project-Based Fee',
  'Monthly Retainer'
];

const locations = [
  'North America',
  'Europe',
  'Asia Pacific',
  'Latin America',
  'Middle East',
  'Africa',
  'Global'
];

const ServicesForm = ({ data, updateData }: ServicesFormProps) => {
  const [selectedRecruitmentTypes, setSelectedRecruitmentTypes] = useState<string[]>(data.recruitmentTypes);
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>(data.industries);
  const [selectedLocations, setSelectedLocations] = useState<string[]>(data.locations);

  const handleTypeChange = (type: string) => {
    const updated = selectedRecruitmentTypes.includes(type)
      ? selectedRecruitmentTypes.filter(t => t !== type)
      : [...selectedRecruitmentTypes, type];
    setSelectedRecruitmentTypes(updated);
    updateData('recruitmentTypes', updated);
  };

  const handleLocationChange = (location: string) => {
    const updated = selectedLocations.includes(location)
      ? selectedLocations.filter(l => l !== location)
      : [...selectedLocations, location];
    setSelectedLocations(updated);
    updateData('locations', updated);
  };

  const handleFeeUpdate = (field: string, value: string) => {
    updateData('fees', {
      ...data.fees,
      [field]: value
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="space-y-4">
        <label className="block text-lg font-medium text-gray-900">
          Recruitment Services
        </label>
        <div className="grid grid-cols-2 gap-3">
          {recruitmentTypes.map((type) => (
            <motion.button
              key={type}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleTypeChange(type)}
              className={`p-3 rounded-lg text-sm border transition-colors
                ${selectedRecruitmentTypes.includes(type)
                  ? 'bg-blue-50 border-blue-200 text-blue-700'
                  : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                }`}
            >
              <Briefcase className="w-4 h-4 inline-block mr-2" />
              {type}
            </motion.button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <label className="block text-lg font-medium text-gray-900">
          Geographic Coverage
        </label>
        <div className="grid grid-cols-2 gap-3">
          {locations.map((location) => (
            <motion.button
              key={location}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleLocationChange(location)}
              className={`p-3 rounded-lg text-sm border transition-colors
                ${selectedLocations.includes(location)
                  ? 'bg-green-50 border-green-200 text-green-700'
                  : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                }`}
            >
              <Globe className="w-4 h-4 inline-block mr-2" />
              {location}
            </motion.button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <label className="block text-lg font-medium text-gray-900">
          Fee Structure
        </label>
        <select
          value={data.fees.structure}
          onChange={(e) => handleFeeUpdate('structure', e.target.value)}
          className={`block w-full p-3 border rounded-lg focus:ring-blue-500 focus:border-blue-500 
            ${!data.fees.structure ? 'border-red-300' : 'border-gray-300'}`}
        >
          <option value="">Select fee structure</option>
          <option value="Percentage">Percentage of Salary</option>
          <option value="Fixed">Fixed Fee</option>
          <option value="Retainer">Monthly Retainer</option>
          <option value="Hybrid">Hybrid Model</option>
        </select>

        <div className="space-y-2">
          <label className="block text-lg font-medium text-gray-900">
            Rate Details
          </label>
          <input
            type="text"
            value={data.fees.rates}
            onChange={(e) => handleFeeUpdate('rates', e.target.value)}
            className={`block w-full p-3 border rounded-lg focus:ring-blue-500 focus:border-blue-500
              ${!data.fees.rates ? 'border-red-300' : 'border-gray-300'}`}
            placeholder="Enter rate details"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default ServicesForm;