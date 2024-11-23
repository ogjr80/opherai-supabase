'use client';
import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { 
  Building, MapPin, Clock, DollarSign, 
  Search, Plus, Users, Briefcase, 
  ArrowUpDown, Filter 
} from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const jobStatuses = [
  { value: 'all', label: 'All Jobs' },
  { value: 'active', label: 'Active' },
  { value: 'draft', label: 'Draft' },
  { value: 'closed', label: 'Closed' },
  { value: 'paused', label: 'Paused' }
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

export default function JobsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentStatus, setCurrentStatus] = useState('all');

  return (
    <motion.div 
      className="space-y-8 p-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Header Section */}
      <motion.div variants={itemVariants} className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Job Postings</h1>
          <p className="text-gray-500">Manage and track your job listings</p>
        </div>
        <Link href="/dashboard/company/jobs/create">
          <Button className="space-x-2">
            <Plus className="w-4 h-4" />
            <span>Post New Job</span>
          </Button>
        </Link>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
              <div className="flex-1 max-w-2xl">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search jobs by title, skills, or location..."
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

          <motion.div variants={containerVariants}>
            <Tabs defaultValue="all" className="p-6">
              <TabsList className="mb-4">
                {jobStatuses.map((status) => (
                  <TabsTrigger
                    key={status.value}
                    value={status.value}
                    onClick={() => setCurrentStatus(status.value)}
                  >
                    {status.label}
                  </TabsTrigger>
                ))}
              </TabsList>

              <TabsContent value="all" className="space-y-4">
                {/* Job Cards */}
                <motion.div variants={itemVariants} className="space-y-4">
                  <JobCard />
                </motion.div>
              </TabsContent>
            </Tabs>
          </motion.div>
        </Card>
      </motion.div>
    </motion.div>
  );
}

function JobCard() {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold">Senior Full Stack Developer</h3>
            <div className="flex items-center gap-4 mt-2 text-gray-500">
              <div className="flex items-center gap-1">
                <Building className="w-4 h-4" />
                <span>TechCorp Solutions</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                <span>San Francisco, CA (Hybrid)</span>
              </div>
              <div className="flex items-center gap-1">
                <DollarSign className="w-4 h-4" />
                <span>$120k - $160k</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary">24 Applicants</Badge>
            <Badge variant="outline">Active</Badge>
          </div>
        </div>

        <div className="mt-4">
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">React</Badge>
            <Badge variant="secondary">Node.js</Badge>
            <Badge variant="secondary">TypeScript</Badge>
            <Badge variant="secondary">PostgreSQL</Badge>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Clock className="w-4 h-4" />
            <span>Posted 2 days ago</span>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">Edit</Button>
            <Button variant="outline" size="sm">View Applicants</Button>
            <Button size="sm">Manage Job</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}