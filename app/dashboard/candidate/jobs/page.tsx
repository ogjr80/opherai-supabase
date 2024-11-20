import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building, MapPin, Clock, DollarSign } from 'lucide-react';

const sampleJobs = [
  {
    id: 1,
    title: 'Senior Full Stack Developer',
    company: 'TechCorp Solutions',
    location: 'San Francisco, CA (Hybrid)',
    salary: '$120k - $160k',
    type: 'Full-time',
    posted: '2 days ago',
    skills: ['React', 'Node.js', 'TypeScript', 'PostgreSQL'],
    matchScore: 92,
  },
  {
    id: 2,
    title: 'Frontend Engineer',
    company: 'Digital Innovations Inc',
    location: 'Remote',
    salary: '$90k - $130k',
    type: 'Full-time',
    posted: '1 week ago',
    skills: ['React', 'Vue.js', 'JavaScript', 'CSS'],
    matchScore: 88,
  },
  {
    id: 3,
    title: 'Backend Developer',
    company: 'DataFlow Systems',
    location: 'New York, NY (On-site)',
    salary: '$100k - $140k',
    type: 'Full-time',
    posted: '3 days ago',
    skills: ['Python', 'Django', 'AWS', 'MongoDB'],
    matchScore: 85,
  },
  {
    id: 4,
    title: 'Machine Learning Engineer',
    company: 'AI Innovations Lab',
    location: 'Remote',
    salary: '$130k - $180k',
    type: 'Full-time',
    posted: '1 day ago',
    skills: ['Python', 'TensorFlow', 'PyTorch', 'SQL'],
    matchScore: 78,
  }
];

export default function JobListings() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Recommended Jobs</h2>
        <Button variant="outline">Filter Jobs</Button>
      </div>
      
      <div className="grid gap-4">
        {sampleJobs.map((job) => (
          <Card key={job.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl mb-1">{job.title}</CardTitle>
                  <div className="flex items-center text-gray-500 space-x-4">
                    <div className="flex items-center">
                      <Building className="w-4 h-4 mr-1" />
                      {job.company}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {job.location}
                    </div>
                  </div>
                </div>
                <Badge variant="success" className="text-lg">
                  {job.matchScore}% Match
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2 mb-4">
                {job.skills.map((skill) => (
                  <Badge key={skill} variant="outline">
                    {skill}
                  </Badge>
                ))}
              </div>
              <div className="flex justify-between items-center">
                <div className="flex space-x-4 text-sm text-gray-500">
                  <div className="flex items-center">
                    <DollarSign className="w-4 h-4 mr-1" />
                    {job.salary}
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {job.posted}
                  </div>
                </div>
                <Button>Apply Now</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
