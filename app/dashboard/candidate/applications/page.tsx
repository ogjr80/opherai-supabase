'use client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Send, FileText, Calendar, ThumbsUp, XCircle, CheckCircle2 } from 'lucide-react';
import ApplicationCard from '../components/ApplicationCard';

const applications = [
  {
    id: 1,
    company: 'TechCorp',
    position: 'Senior Frontend Developer',
    location: 'San Francisco, CA',
    type: 'Full-time',
    salary: '$120k - $150k',
    status: 'interview_scheduled',
    logo: '/companies/techcorp.png',
    stage: 'Technical Interview',
    progress: 75,
    lastActivity: '2 hours ago',
    nextStep: 'Technical Interview on April 15, 2024',
    matchScore: 92,
    applied: '2024-04-01',
    interviews: [
      {
        type: 'Technical Interview',
        date: '2024-04-15',
        time: '10:00 AM PST',
        interviewer: 'Sarah Johnson',
        status: 'scheduled'
      }
    ]
  },
  {
    id: 2,
    company: 'DataInc',
    position: 'Data Scientist',
    location: 'Remote',
    type: 'Full-time',
    salary: '$130k - $160k',
    status: 'in_review',
    logo: '/companies/datainc.png',
    stage: 'Application Review',
    progress: 30,
    lastActivity: '1 day ago',
    nextStep: 'Waiting for hiring manager review',
    matchScore: 88,
    applied: '2024-04-03'
  }
];

const statusConfig = {
  applied: { label: 'Applied', color: 'bg-gray-100 text-gray-800', icon: Send },
  in_review: { label: 'In Review', color: 'bg-blue-100 text-blue-800', icon: FileText },
  interview_scheduled: { label: 'Interview Scheduled', color: 'bg-purple-100 text-purple-800', icon: Calendar },
  offer_received: { label: 'Offer Received', color: 'bg-green-100 text-green-800', icon: ThumbsUp },
  rejected: { label: 'Not Selected', color: 'bg-red-100 text-red-800', icon: XCircle },
  accepted: { label: 'Accepted', color: 'bg-emerald-100 text-emerald-800', icon: CheckCircle2 }
};

export default function ApplicationsPage() {
//   const [filter, setFilter] = useState('all');

  return (
    <div className="space-y-8">
      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">All Applications</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="interviews">Interviews</TabsTrigger>
          <TabsTrigger value="offers">Offers</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4 mt-4">
          {applications.map((application) => (
            <ApplicationCard 
              key={application.id} 
              application={application}
              statusConfig={statusConfig}
            />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}