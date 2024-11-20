import { motion } from 'framer-motion';
import { Building2, Briefcase, Users, FileText } from 'lucide-react';

interface ReviewFormProps {
  data: AgencyFormData;
}

const ReviewForm = ({ data }: ReviewFormProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      {/* Agency Profile Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Building2 className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-medium">Agency Profile</h3>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Agency Name</p>
            <p className="font-medium">{data.profile.name}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Type</p>
            <p className="font-medium">{data.profile.type}</p>
          </div>
          {/* Add other profile fields */}
        </div>
      </div>

      {/* Services Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Briefcase className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-medium">Services</h3>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg space-y-4">
          <div>
            <p className="text-sm text-gray-500">Recruitment Types</p>
            <div className="flex flex-wrap gap-2 mt-1">
              {data.services.recruitmentTypes.map((type, index) => (
                <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                  {type}
                </span>
              ))}
            </div>
          </div>
          {/* Add other services fields */}
        </div>
      </div>

      {/* Team Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-medium">Team ({data.team.length} members)</h3>
        </div>
        <div className="space-y-2">
          {data.team.map((member, index) => (
            <div key={index} className="bg-gray-50 p-4 rounded-lg">
              <p className="font-medium">{member.name}</p>
              <p className="text-sm text-gray-500">{member.role}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Client Portfolio Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-medium">Client Portfolio</h3>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg space-y-4">
          <div>
            <p className="text-sm text-gray-500">Current Clients</p>
            <div className="flex flex-wrap gap-2 mt-1">
              {data.clients.currentClients.map((client, index) => (
                <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                  {client}
                </span>
              ))}
            </div>
          </div>
          {/* Add success metrics */}
        </div>
      </div>
    </motion.div>
  );
};

export default ReviewForm;
