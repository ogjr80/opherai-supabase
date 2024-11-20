import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Plus, X, Mail, UserCircle, Briefcase, Clock } from 'lucide-react';

interface TeamSetupFormProps {
  data: {
    name: string;
    email: string;
    role: string;
    specialization: string[];
    experience: string;
  }[];
  updateData: (field: string, value: any[]) => void;
}

const roles = [
  'Senior Recruiter',
  'Technical Recruiter',
  'Executive Recruiter',
  'Recruitment Coordinator',
  'Sourcing Specialist',
  'Account Manager',
  'Team Lead',
  'Managing Director'
];

const specializations = [
  'IT & Technology',
  'Finance & Banking',
  'Healthcare',
  'Sales & Marketing',
  'Engineering',
  'Executive Search',
  'HR & Recruitment',
  'Legal'
];

const experienceLevels = [
  '1-2 years',
  '3-5 years',
  '6-10 years',
  '10+ years'
];

const TeamSetupForm = ({ data, updateData }: TeamSetupFormProps) => {
  const addTeamMember = () => {
    updateData('team', [
      ...data,
      {
        name: '',
        email: '',
        role: '',
        specialization: [],
        experience: ''
      }
    ]);
  };

  const removeTeamMember = (index: number) => {
    updateData('team', data.filter((_, i) => i !== index));
  };

  const updateTeamMember = (index: number, field: string, value: string | string[]) => {
    updateData('team', data.map((member, i) => 
      i === index ? { ...member, [field]: value } : member
    ));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">Team Members</h3>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={addTeamMember}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Team Member
        </motion.button>
      </div>

      <AnimatePresence>
        {data.map((member, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-gray-50 p-6 rounded-lg space-y-4 relative"
          >
            <button
              onClick={() => removeTeamMember(index)}
              className="absolute top-4 right-4 text-gray-400 hover:text-red-500"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                    <UserCircle className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={member.name}
                    onChange={(e) => updateTeamMember(index, 'name', e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Full Name"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    value={member.email}
                    onChange={(e) => updateTeamMember(index, 'email', e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Email Address"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Role</label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                    <Briefcase className="h-5 w-5 text-gray-400" />
                  </div>
                  <select
                    value={member.role}
                    onChange={(e) => updateTeamMember(index, 'role', e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select Role</option>
                    {roles.map((role) => (
                      <option key={role} value={role}>{role}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Experience</label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                    <Clock className="h-5 w-5 text-gray-400" />
                  </div>
                  <select
                    value={member.experience}
                    onChange={(e) => updateTeamMember(index, 'experience', e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select Experience</option>
                    {experienceLevels.map((level) => (
                      <option key={level} value={level}>{level}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Specializations</label>
              <div className="mt-2 grid grid-cols-2 gap-2">
                {specializations.map((spec) => (
                  <motion.button
                    key={spec}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      const updated = member.specialization.includes(spec)
                        ? member.specialization.filter(s => s !== spec)
                        : [...member.specialization, spec];
                      updateTeamMember(index, 'specialization', updated);
                    }}
                    className={`p-2 rounded-lg text-sm border transition-colors
                      ${member.specialization.includes(spec)
                        ? 'bg-blue-50 border-blue-200 text-blue-700'
                        : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                      }`}
                  >
                    {spec}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {data.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-8 text-gray-500"
        >
          <Users className="w-12 h-12 mx-auto text-gray-400 mb-3" />
          <p>No team members added yet</p>
          <p className="text-sm">Click the button above to add team members</p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default TeamSetupForm;