'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Briefcase,
  Building2,
  MapPin,
  Clock,
  DollarSign,
  Search,
  Filter,
  Users,
  Target,
  Plus
} from 'lucide-react';

const stats = [
  { label: 'Active Jobs', value: '47', icon: Briefcase, trend: '+8 this week' },
  { label: 'Total Applications', value: '342', icon: Users, trend: '+56 this week' },
  { label: 'Positions Filled', value: '18', icon: Target, trend: '+3 this month' },
  { label: 'Revenue Pipeline', value: '$280K', icon: DollarSign, trend: '+12% vs last month' },
];

const jobs = [
  {
    id: 1,
    title: 'Senior Full Stack Developer',
    company: 'TechCorp Solutions',
    location: 'San Francisco, CA (Hybrid)',
    salary: '$120k - $160k',
    type: 'Full-time',
    posted: '2 days ago',
    skills: ['React', 'Node.js', 'TypeScript', 'PostgreSQL'],
    applicants: 24,
    shortlisted: 6,
    status: 'Active',
    clientPriority: 'High',
    potentialCandidates: 15
  },
  // Add more jobs...
];

export default function AgencyJobsPage() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex justify-between items-center"
      >
        <div>
          <h1 className="text-3xl font-bold">Job Management</h1>
          <p className="text-gray-500">Track and manage client job postings</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add New Job
        </Button>
      </motion.div>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index, duration: 0.5 }}
          >
            <Card>
              <CardContent className="flex items-center p-6">
                <div className="p-2 rounded-lg bg-blue-50 mr-4">
                  <stat.icon className="w-8 h-8 text-blue-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-green-600">{stat.trend}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
              <div className="flex-1 max-w-2xl">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search jobs by title, company, or skills..."
                    className="pl-10 pr-4"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {jobs.map((job) => (
                <div key={job.id} className="border rounded-lg p-4 hover:bg-gray-50">
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-medium">{job.title}</h3>
                        <Badge variant={job.clientPriority === 'High' ? 'destructive' : 'default'}>
                          {job.clientPriority} Priority
                        </Badge>
                        <Badge variant={job.status === 'Active' ? 'success' : 'secondary'}>
                          {job.status}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span className="flex items-center">
                          <Building2 className="w-4 h-4 mr-1" />
                          {job.company}
                        </span>
                        <span className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {job.location}
                        </span>
                        <span className="flex items-center">
                          <DollarSign className="w-4 h-4 mr-1" />
                          {job.salary}
                        </span>
                        <span className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          Posted {job.posted}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {job.skills.map((skill) => (
                          <Badge key={skill} variant="outline">{skill}</Badge>
                        ))}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="space-y-1">
                        <p className="text-sm">
                          <span className="font-medium">{job.applicants}</span> Applicants
                        </p>
                        <p className="text-sm">
                          <span className="font-medium">{job.shortlisted}</span> Shortlisted
                        </p>
                        <p className="text-sm text-blue-600">
                          {job.potentialCandidates} Potential Matches
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}