import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Building, Plus, X, TrendingUp, Clock, Users } from 'lucide-react';

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
}

const ClientPortfolioForm = ({ data, updateData }: ClientPortfolioFormProps) => {
  const [newClient, setNewClient] = useState('');

  const addClient = () => {
    if (newClient.trim()) {
      updateData('currentClients', [...data.currentClients, newClient.trim()]);
      setNewClient('');
    }
  };

  const removeClient = (index: number) => {
    updateData('currentClients', data.currentClients.filter((_, i) => i !== index));
  };

  const updateMetric = (metric: string, value: string) => {
    updateData('successMetrics', {
      ...data.successMetrics,
      [metric]: value
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      {/* Current Clients Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Notable Clients</h3>
        <div className="flex space-x-2">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
              <Building className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={newClient}
              onChange={(e) => setNewClient(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addClient()}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="Add client company name"
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={addClient}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus className="w-5 h-5" />
          </motion.button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <AnimatePresence>
            {data.currentClients.map((client, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg group"
              >
                <span className="text-gray-700">{client}</span>
                <button
                  onClick={() => removeClient(index)}
                  className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-4 h-4" />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Success Metrics Section */}
      <div className="space-y-6">
        <h3 className="text-lg font-medium text-gray-900">Success Metrics</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Average Placements (Monthly)
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                <TrendingUp className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={data.successMetrics.placements}
                onChange={(e) => updateMetric('placements', e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., 20-30"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Average Time to Hire
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                <Clock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={data.successMetrics.timeToHire}
                onChange={(e) => updateMetric('timeToHire', e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., 30 days"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Client Retention Rate
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                <Users className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={data.successMetrics.clientRetention}
                onChange={(e) => updateMetric('clientRetention', e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., 85%"
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ClientPortfolioForm;