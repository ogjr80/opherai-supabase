'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Building2,
  Users,
  Briefcase,
  TrendingUp,
  Clock,
  UserCheck,
  Search,
  Filter,
  DollarSign,
  Target
} from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const stats = [
  { label: 'Active Clients', value: '24', icon: Building2, trend: '+3 this month' },
  { label: 'Open Positions', value: '47', icon: Briefcase, trend: '+8 this week' },
  { label: 'Candidates Placed', value: '156', icon: UserCheck, trend: '+12 this month' },
  { label: 'Revenue Generated', value: '$425K', icon: DollarSign, trend: '+15% vs last month' },
];

const recentPlacements = [
  {
    company: 'TechCorp Solutions',
    position: 'Senior Frontend Developer',
    candidate: 'Sarah Chen',
    placementFee: '$25,000',
    date: '2 days ago',
    status: 'Onboarding'
  },
  {
    company: 'InnovateLabs',
    position: 'DevOps Engineer',
    candidate: 'Michael Brown',
    placementFee: '$28,000',
    date: '5 days ago',
    status: 'Started'
  }
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

export default function AgencyDashboard() {
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
          <h1 className="text-3xl font-bold">Agency Dashboard</h1>
          <p className="text-gray-500">Manage your clients, candidates, and placements</p>
        </div>
        <div className="space-x-4">
          <Link href="/dashboard/agency/clients/add">
            <Button className="space-x-2">
              <Building2 className="w-4 h-4" />
              <span>Add New Client</span>
            </Button>
          </Link>
        </div>
      </motion.div>

      {/* Stats Overview */}
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

      {/* Recent Placements */}
      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Placements</CardTitle>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" size="sm">
                <Search className="w-4 h-4 mr-2" />
                Search
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentPlacements.map((placement, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                  <div>
                    <h3 className="font-medium">{placement.company}</h3>
                    <p className="text-sm text-gray-500">{placement.position}</p>
                    <p className="text-sm text-gray-500">{placement.candidate}</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="font-medium text-green-600">{placement.placementFee}</p>
                      <p className="text-sm text-gray-500">{placement.date}</p>
                    </div>
                    <Badge variant="outline">{placement.status}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick Actions */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
        variants={containerVariants}
      >
        <Card>
          <CardHeader>
            <CardTitle>Client Pipeline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span>Discovery</span>
                <Badge>8</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span>Contract</span>
                <Badge>5</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span>Active</span>
                <Badge>24</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Performance Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span>Time to Fill</span>
                <span className="font-medium">32 days avg.</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Fill Rate</span>
                <span className="font-medium">78%</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Client Satisfaction</span>
                <span className="font-medium">4.8/5.0</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>AI Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm text-gray-600">
              <p>• High demand for Full-stack developers in fintech sector</p>
              <p>• 25% increase in remote position placements</p>
              <p>• Suggested focus: AI/ML specialists for Q3</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}