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
  updateData: (field: string, value: any) => void;
  fieldErrors?: Record<string, string>;
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

const industries = [
  'Technology',
  'Healthcare',
  'Finance',
  'Manufacturing',
  'Retail',
  'Education',
  'Professional Services'
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

const ServicesForm = ({ data, updateData, fieldErrors = {} }: ServicesFormProps) => {
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

  const handleIndustryChange = (industry: string) => {
    const updated = selectedIndustries.includes(industry)
      ? selectedIndustries.filter(i => i !== industry)
      : [...selectedIndustries, industry];
    setSelectedIndustries(updated);
    updateData('industries', updated);
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
              type="button"
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
        {fieldErrors['recruitmentTypes'] && (
          <p className="text-sm text-red-500">{fieldErrors['recruitmentTypes']}</p>
        )}
      </div>

      <div className="space-y-4">
        <label className="block text-lg font-medium text-gray-900">
          Industries Served
        </label>
        <div className="grid grid-cols-2 gap-3">
          {industries.map((industry) => (
            <motion.button
              key={industry}
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleIndustryChange(industry)}
              className={`p-3 rounded-lg text-sm border transition-colors
                ${selectedIndustries.includes(industry)
                  ? 'bg-green-50 border-green-200 text-green-700'
                  : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                }`}
            >
              {industry}
            </motion.button>
          ))}
        </div>
        {fieldErrors['industries'] && (
          <p className="text-sm text-red-500">{fieldErrors['industries']}</p>
        )}
      </div>

      <div className="space-y-4">
        <label className="block text-lg font-medium text-gray-900">
          Geographic Coverage
        </label>
        <div className="grid grid-cols-2 gap-3">
          {locations.map((location) => (
            <motion.button
              key={location}
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleLocationChange(location)}
              className={`p-3 rounded-lg text-sm border transition-colors
                ${selectedLocations.includes(location)
                  ? 'bg-blue-50 border-blue-200 text-blue-700'
                  : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                }`}
            >
              <Globe className="w-4 h-4 inline-block mr-2" />
              {location}
            </motion.button>
          ))}
        </div>
        {fieldErrors['locations'] && (
          <p className="text-sm text-red-500">{fieldErrors['locations']}</p>
        )}
      </div>

      <div className="space-y-4">
        <label className="block text-lg font-medium text-gray-900">
          Fee Structure
        </label>
        <select
          value={data.fees.structure}
          onChange={(e) => handleFeeUpdate('structure', e.target.value)}
          className={`block w-full p-3 border rounded-lg focus:ring-blue-500 focus:border-blue-500 
            ${fieldErrors['fees.structure'] ? 'border-red-300' : 'border-gray-300'}`}
        >
          <option value="">Select fee structure</option>
          <option value="Percentage">Percentage of Salary</option>
          <option value="Fixed">Fixed Fee</option>
          <option value="Retainer">Monthly Retainer</option>
          <option value="Hybrid">Hybrid Model</option>
        </select>
        {fieldErrors['fees.structure'] && (
          <p className="text-sm text-red-500">{fieldErrors['fees.structure']}</p>
        )}

        <div className="space-y-2">
          <label className="block text-lg font-medium text-gray-900">
            Rate Details
          </label>
          <input
            type="text"
            value={data.fees.rates}
            onChange={(e) => handleFeeUpdate('rates', e.target.value)}
            className={`block w-full p-3 border rounded-lg focus:ring-blue-500 focus:border-blue-500
              ${fieldErrors['fees.rates'] ? 'border-red-300' : 'border-gray-300'}`}
            placeholder="Enter rate details"
          />
          {fieldErrors['fees.rates'] && (
            <p className="text-sm text-red-500">{fieldErrors['fees.rates']}</p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ServicesForm;