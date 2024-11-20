import { motion } from 'framer-motion';
import { Building, Users, Briefcase, Globe, FileText, CheckCircle } from 'lucide-react';

interface ReviewFormProps {
  data: {
    profile: {
      name: string;
      industry: string;
      size: string;
      website: string;
      description: string;
      location: string;
      founded: string;
    };
    culture: {
      values: string[];
      benefits: string[];
      workStyle: string[];
    };
    team: {
      name: string;
      email: string;
      role: string;
      department: string;
    }[];
    hiring: {
      positions: string[];
      departments: string[];
      urgency: string;
      hiringGoals: string;
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
        <h2 className="text-2xl font-bold text-gray-900">Review Your Company Profile</h2>
        <p className="text-gray-600">Please review all the information before completing your profile setup.</p>
      </div>

      <div className="grid gap-6">
        <Section title="Company Profile" icon={Building}>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-500">Company Name</p>
              <p className="font-medium">{data.profile.name}</p>
            </div>
            <div>
              <p className="text-gray-500">Industry</p>
              <p className="font-medium">{data.profile.industry}</p>
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
            <div>
              <p className="text-gray-500">Location</p>
              <p className="font-medium">{data.profile.location}</p>
            </div>
            <div>
              <p className="text-gray-500">Website</p>
              <p className="font-medium">{data.profile.website}</p>
            </div>
          </div>
        </Section>

        <Section title="Company Culture" icon={Globe}>
          <div className="space-y-4">
            <div>
              <p className="text-gray-500 mb-2">Company Values</p>
              <div className="flex flex-wrap gap-2">
                {data.culture.values.map((value) => (
                  <span key={value} className="px-2 py-1 bg-blue-50 text-blue-700 rounded-md text-sm">
                    {value}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-gray-500 mb-2">Benefits & Perks</p>
              <div className="flex flex-wrap gap-2">
                {data.culture.benefits.map((benefit) => (
                  <span key={benefit} className="px-2 py-1 bg-purple-50 text-purple-700 rounded-md text-sm">
                    {benefit}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-gray-500 mb-2">Work Style</p>
              <div className="flex flex-wrap gap-2">
                {data.culture.workStyle.map((style) => (
                  <span key={style} className="px-2 py-1 bg-orange-50 text-orange-700 rounded-md text-sm">
                    {style}
                  </span>
                ))}
              </div>
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
                    <p className="text-gray-500">Department</p>
                    <p className="font-medium">{member.department}</p>
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

        <Section title="Hiring Needs" icon={Briefcase}>
          <div className="space-y-4">
            <div>
              <p className="text-gray-500 mb-2">Open Positions</p>
              <div className="flex flex-wrap gap-2">
                {data.hiring.positions.map((position, index) => (
                  <span key={index} className="px-2 py-1 bg-green-50 text-green-700 rounded-md text-sm">
                    {position}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-gray-500 mb-2">Hiring Departments</p>
              <div className="flex flex-wrap gap-2">
                {data.hiring.departments.map((department) => (
                  <span key={department} className="px-2 py-1 bg-yellow-50 text-yellow-700 rounded-md text-sm">
                    {department}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-gray-500">Hiring Urgency</p>
              <p className="font-medium">{data.hiring.urgency}</p>
            </div>
            <div>
              <p className="text-gray-500">Hiring Goals</p>
              <p className="font-medium">{data.hiring.hiringGoals}</p>
            </div>
          </div>
        </Section>
      </div>
    </motion.div>
  );
};

export default ReviewForm;