import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, X, Building2, Clock, TrendingUp } from 'lucide-react';

interface ClientPortfolioFormProps {
  data: {
    currentClients: string[];
    successMetrics: {
      placements: string;
      timeToHire: string;
      clientRetention: string;
    };
  };
  updateData: (field: string, value: any) => void;
  fieldErrors?: Record<string, string>;
}

const ClientPortfolioForm = ({ data, updateData, fieldErrors = {} }: ClientPortfolioFormProps) => {
  const [newClient, setNewClient] = useState('');

  const handleAddClient = () => {
    if (newClient.trim()) {
      updateData('currentClients', [...data.currentClients, newClient.trim()]);
      setNewClient('');
    }
  };

  const handleRemoveClient = (index: number) => {
    updateData('currentClients', data.currentClients.filter((_, i) => i !== index));
  };

  const handleMetricsChange = (field: string, value: string) => {
    updateData('successMetrics', { ...data.successMetrics, [field]: value });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      {/* Current Clients Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Current Clients</h3>
        <div className="flex gap-2">
          <input
            type="text"
            value={newClient}
            onChange={(e) => setNewClient(e.target.value)}
            placeholder="Enter client name"
            className="flex-1 p-2 border rounded-lg"
          />
          <button
            onClick={handleAddClient}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
        {fieldErrors['currentClients'] && (
          <p className="text-sm text-red-500">{fieldErrors['currentClients']}</p>
        )}
        
        {/* Client List */}
        <div className="space-y-2">
          {data.currentClients.map((client, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-gray-400" />
                <span>{client}</span>
              </div>
              <button
                onClick={() => handleRemoveClient(index)}
                className="text-red-500 hover:text-red-700"
              >
                <X className="w-5 h-5" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Success Metrics Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Success Metrics</h3>
        
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Average Placements per Month
            </label>
            <div className="mt-1 relative">
              <TrendingUp className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={data.successMetrics.placements}
                onChange={(e) => handleMetricsChange('placements', e.target.value)}
                className="pl-10 block w-full border-gray-300 rounded-lg"
                placeholder="e.g., 10-15"
              />
            </div>
            {fieldErrors['successMetrics.placements'] && (
              <p className="text-sm text-red-500">{fieldErrors['successMetrics.placements']}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Average Time to Hire (days)
            </label>
            <div className="mt-1 relative">
              <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={data.successMetrics.timeToHire}
                onChange={(e) => handleMetricsChange('timeToHire', e.target.value)}
                className="pl-10 block w-full border-gray-300 rounded-lg"
                placeholder="e.g., 30"
              />
            </div>
            {fieldErrors['successMetrics.timeToHire'] && (
              <p className="text-sm text-red-500">{fieldErrors['successMetrics.timeToHire']}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Client Retention Rate (%)
            </label>
            <div className="mt-1 relative">
              <TrendingUp className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={data.successMetrics.clientRetention}
                onChange={(e) => handleMetricsChange('clientRetention', e.target.value)}
                className="pl-10 block w-full border-gray-300 rounded-lg"
                placeholder="e.g., 85"
              />
            </div>
            {fieldErrors['successMetrics.clientRetention'] && (
              <p className="text-sm text-red-500">{fieldErrors['successMetrics.clientRetention']}</p>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ClientPortfolioForm;