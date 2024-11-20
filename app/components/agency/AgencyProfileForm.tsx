import { useState } from 'react';
import { motion } from 'framer-motion';
import {  Globe, MapPin, Calendar } from 'lucide-react';

interface AgencyProfileFormProps {
  data: {
    name: string;
    type: string;
    specialization: string[];
    size: string;
    website: string;
    description: string;
    location: string;
    founded: string;
    industries: string[];
  };
  updateData: (field: string, value: string | string[]) => void;
  fieldErrors?: Record<string, string>;
}

const agencyTypes = [
  'Full-Service Recruitment',
  'Executive Search',
  'Temporary Staffing',
  'IT Recruitment',
  'Healthcare Recruitment',
  'Other'
];

const companySizes = [
  '1-10 employees',
  '11-50 employees',
  '51-200 employees',
  '201-500 employees',
  '500+ employees'
];

const industries = [
  'Technology',
  'Healthcare',
  'Finance',
  'Manufacturing',
  'Retail',
  'Education',
  'Construction',
  'Professional Services',
  'Other'
];

const AgencyProfileForm = ({ data, updateData, fieldErrors = {} }: AgencyProfileFormProps) => {
  const [selectedSpecializations, setSelectedSpecializations] = useState<string[]>(data.specialization);
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>(data.industries);

  const handleSpecializationChange = (specialization: string) => {
    const updated = selectedSpecializations.includes(specialization)
      ? selectedSpecializations.filter(s => s !== specialization)
      : [...selectedSpecializations, specialization];
    
    setSelectedSpecializations(updated);
    updateData('specialization', updated);
  };

  const handleIndustryChange = (industry: string) => {
    const updated = selectedIndustries.includes(industry)
      ? selectedIndustries.filter(i => i !== industry)
      : [...selectedIndustries, industry];
    
    setSelectedIndustries(updated);
    updateData('industries', updated);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="space-y-2">
        <label className="block text-lg font-medium text-gray-900">
          Agency Name
        </label>
        <input
          type="text"
          value={data.name}
          onChange={(e) => updateData('name', e.target.value)}
          className={`block w-full p-3 border rounded-lg focus:ring-blue-500 focus:border-blue-500
            ${fieldErrors['name'] ? 'border-red-300' : 'border-gray-300'}`}
          placeholder="Enter your agency name"
        />
        {fieldErrors['name'] && (
          <p className="text-sm text-red-500 mt-1">{fieldErrors['name']}</p>
        )}
      </div>

      <div className="space-y-4">
        <label className="block text-sm font-medium text-gray-700">Agency Type</label>
        <select
          value={data.type}
          onChange={(e) => updateData('type', e.target.value)}
          className="block w-full py-2 px-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Select agency type</option>
          {agencyTypes.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>

      <div className="space-y-4">
        <label className="block text-sm font-medium text-gray-700">Specializations</label>
        <div className="grid grid-cols-2 gap-2">
          {agencyTypes.map((specialization) => (
            <motion.button
              key={specialization}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleSpecializationChange(specialization)}
              className={`p-2 rounded-md text-sm ${
                selectedSpecializations.includes(specialization)
                  ? 'bg-blue-100 text-blue-800 border-blue-200'
                  : 'bg-gray-100 text-gray-800 border-gray-200'
              } border`}
            >
              {specialization}
            </motion.button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <label className="block text-sm font-medium text-gray-700">Company Size</label>
        <select
          value={data.size}
          onChange={(e) => updateData('size', e.target.value)}
          className="block w-full py-2 px-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Select company size</option>
          {companySizes.map((size) => (
            <option key={size} value={size}>{size}</option>
          ))}
        </select>
      </div>

      <div className="space-y-4">
        <label className="block text-sm font-medium text-gray-700">Website</label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Globe className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="url"
            value={data.website}
            onChange={(e) => updateData('website', e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="https://example.com"
          />
        </div>
      </div>

      <div className="space-y-4">
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          value={data.description}
          onChange={(e) => updateData('description', e.target.value)}
          rows={4}
          className="block w-full py-2 px-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          placeholder="Tell us about your agency..."
        />
      </div>

      <div className="space-y-4">
        <label className="block text-sm font-medium text-gray-700">Location</label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MapPin className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={data.location}
            onChange={(e) => updateData('location', e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="City, Country"
          />
        </div>
      </div>

      <div className="space-y-4">
        <label className="block text-sm font-medium text-gray-700">Founded Year</label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Calendar className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={data.founded}
            onChange={(e) => updateData('founded', e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="YYYY"
          />
        </div>
      </div>

      <div className="space-y-4">
        <label className="block text-sm font-medium text-gray-700">Industries Served</label>
        <div className="grid grid-cols-2 gap-2">
          {industries.map((industry) => (
            <motion.button
              key={industry}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleIndustryChange(industry)}
              className={`p-2 rounded-md text-sm ${
                selectedIndustries.includes(industry)
                  ? 'bg-blue-100 text-blue-800 border-blue-200'
                  : 'bg-gray-100 text-gray-800 border-gray-200'
              } border`}
            >
              {industry}
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default AgencyProfileForm;
