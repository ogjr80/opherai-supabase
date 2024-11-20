import { motion } from 'framer-motion';
import { Building2, Briefcase, Users, Building, CheckCircle } from 'lucide-react';

interface ReviewFormProps {
  data: {
    profile: {
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
    services: {
      recruitmentTypes: string[];
      industries: string[];
      locations: string[];
      fees: {
        structure: string;
        rates: string;
      };
    };
    team: {
      name: string;
      email: string;
      role: string;
      specialization: string[];
      experience: string;
    }[];
    clients: {
      currentClients: string[];
      successMetrics: {
        placements: string;
        timeToHire: string;
        clientRetention: string;
      };
    };
  };
}

const Section = ({ title, icon: Icon, children }: { title: string; icon: any; children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white rounded-lg p-6 space-y-4"
  >
    <div className="flex items-center space-x-2 text-blue-600">
      <Icon className="w-5 h-5" />
      <h3 className="font-semibold">{title}</h3>
    </div>
    {children}
  </motion.div>
);

const ReviewForm = ({ data }: ReviewFormProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      <div className="text-center space-y-2">
        <CheckCircle className="w-12 h-12 text-green-500 mx-auto" />
        <h2 className="text-2xl font-bold text-gray-900">Review Your Agency Profile</h2>
        <p className="text-gray-600">Please review all the information before completing your profile setup.</p>
      </div>

      <div className="grid gap-6">
        <Section title="Agency Profile" icon={Building2}>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-500">Agency Name</p>
              <p className="font-medium">{data.profile.name}</p>
            </div>
            <div>
              <p className="text-gray-500">Type</p>
              <p className="font-medium">{data.profile.type}</p>
            </div>
            <div>
              <p className="text-gray-500">Size</p>
              <p className="font-medium">{data.profile.size}</p>
            </div>
            <div>
              <p className="text-gray-500">Founded</p>
              <p className="font-medium">{data.profile.founded}</p>
            </div>
            <div className="col-span-2">
              <p className="text-gray-500">Description</p>
              <p className="font-medium">{data.profile.description}</p>
            </div>
            <div className="col-span-2">
              <p className="text-gray-500">Industries</p>
              <div className="flex flex-wrap gap-2 mt-1">
                {data.profile.industries.map((industry) => (
                  <span key={industry} className="px-2 py-1 bg-blue-50 text-blue-700 rounded-md text-sm">
                    {industry}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Section>

        <Section title="Services" icon={Briefcase}>
          <div className="space-y-4">
            <div>
              <p className="text-gray-500 mb-2">Recruitment Types</p>
              <div className="flex flex-wrap gap-2">
                {data.services.recruitmentTypes.map((type) => (
                  <span key={type} className="px-2 py-1 bg-green-50 text-green-700 rounded-md text-sm">
                    {type}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-gray-500 mb-2">Geographic Coverage</p>
              <div className="flex flex-wrap gap-2">
                {data.services.locations.map((location) => (
                  <span key={location} className="px-2 py-1 bg-purple-50 text-purple-700 rounded-md text-sm">
                    {location}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-gray-500">Fee Structure</p>
              <p className="font-medium">{data.services.fees.structure}</p>
            </div>
          </div>
        </Section>

        <Section title="Team Members" icon={Users}>
          <div className="space-y-4">
            {data.team.map((member, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-gray-500">Name</p>
                    <p className="font-medium">{member.name}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Role</p>
                    <p className="font-medium">{member.role}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Experience</p>
                    <p className="font-medium">{member.experience}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Email</p>
                    <p className="font-medium">{member.email}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Client Portfolio" icon={Building}>
          <div className="space-y-4">
            <div>
              <p className="text-gray-500 mb-2">Current Clients</p>
              <div className="flex flex-wrap gap-2">
                {data.clients.currentClients.map((client, index) => (
                  <span key={index} className="px-2 py-1 bg-orange-50 text-orange-700 rounded-md text-sm">
                    {client}
                  </span>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-gray-500">Monthly Placements</p>
                <p className="font-medium">{data.clients.successMetrics.placements}</p>
              </div>
              <div>
                <p className="text-gray-500">Time to Hire</p>
                <p className="font-medium">{data.clients.successMetrics.timeToHire}</p>
              </div>
              <div>
                <p className="text-gray-500">Client Retention</p>
                <p className="font-medium">{data.clients.successMetrics.clientRetention}</p>
              </div>
            </div>
          </div>
        </Section>
      </div>
    </motion.div>
  );
};

export default ReviewForm;
