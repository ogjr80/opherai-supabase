'use client';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Users,
  Search,
  Filter,
  Calendar,
  Mail,
  Building2,
  Briefcase,
  UserCheck,
  Star
} from 'lucide-react';
import { motion } from 'framer-motion';

const stats = [
  { label: 'Total Candidates', value: '2,547', icon: Users, trend: '+156 this month' },
  { label: 'Placed Candidates', value: '156', icon: UserCheck, trend: '+12 this month' },
  { label: 'Active in Process', value: '342', icon: Briefcase, trend: '+28 this week' },
  { label: 'Top Rated', value: '189', icon: Star, trend: '+15 this month' },
];

const candidates = [
  {
    name: 'Sarah Chen',
    role: 'Senior Frontend Developer',
    experience: '8 years',
    skills: ['React', 'TypeScript', 'Node.js'],
    status: 'In Process',
    company: 'TechCorp Solutions',
    matchScore: 95,
    lastActivity: '2 hours ago'
  },
  // Add more candidates
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 24
    }
  }
};

export default function CandidatesPage() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <motion.div 
      className="space-y-6"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div variants={itemVariants} className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Candidate Management</h1>
          <p className="text-gray-500">Track and manage your candidate pipeline</p>
        </div>
        <Button>
          <UserCheck className="w-4 h-4 mr-2" />
          Add Candidate
        </Button>
      </motion.div>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
        variants={containerVariants}
      >
        {stats.map((stat, index) => (
          <motion.div key={index} variants={itemVariants}>
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

      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
              <div className="flex-1 max-w-2xl">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search candidates by name, skills, or role..."
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
                <Button variant="outline">
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule
                </Button>
                <Button variant="outline">
                  <Mail className="w-4 h-4 mr-2" />
                  Message
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {candidates.map((candidate, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex-1">
                    <h3 className="font-medium">{candidate.name}</h3>
                    <p className="text-sm text-gray-500">{candidate.role}</p>
                    <div className="flex gap-2 mt-1">
                      {candidate.skills.map((skill, idx) => (
                        <Badge key={idx} variant="secondary">{skill}</Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 mr-1" />
                        <span className="font-medium">{candidate.matchScore}% match</span>
                      </div>
                      <p className="text-sm text-gray-500">Last active {candidate.lastActivity}</p>
                    </div>
                    <Badge variant={
                      candidate.status === 'In Process' ? 'default' : 
                      candidate.status === 'Placed' ? 'success' : 'secondary'
                    }>
                      {candidate.status}
                    </Badge>
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