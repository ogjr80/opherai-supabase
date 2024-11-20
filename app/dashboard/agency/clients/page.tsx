'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Building2,
  Search,
  Filter,
  Plus,
  Users,
  Briefcase,
  DollarSign,
  Clock
} from 'lucide-react';
import { motion } from 'framer-motion';

const stats = [
  { label: 'Active Clients', value: '24', icon: Building2, trend: '+3 this month' },
  { label: 'Open Positions', value: '47', icon: Briefcase, trend: '+8 this week' },
  { label: 'Total Revenue', value: '$425K', icon: DollarSign, trend: '+15% vs last month' },
  { label: 'Avg. Time to Fill', value: '32 days', icon: Clock, trend: '-3 days vs last month' },
];

const clients = [
  {
    name: 'TechCorp Solutions',
    industry: 'Technology',
    openPositions: 5,
    activeRecruitments: 8,
    lastActivity: '2 hours ago',
    status: 'Active',
    revenue: '$125,000',
  },
  {
    name: 'InnovateLabs',
    industry: 'Healthcare',
    openPositions: 3,
    activeRecruitments: 4,
    lastActivity: '1 day ago',
    status: 'Active',
    revenue: '$85,000',
  },
  // Add more clients as needed
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

export default function ClientsPage() {
  return (
    <motion.div 
      className="space-y-6"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div variants={itemVariants} className="flex justify-between items-center">
        {/* Header Section */}
        <div>
          <h1 className="text-3xl font-bold">Client Management</h1>
          <p className="text-gray-500">Manage and monitor your client relationships</p>
        </div>
        <Button className="space-x-2">
          <Plus className="w-4 h-4" />
          <span>Add New Client</span>
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
                    placeholder="Search clients by name, industry..."
                    className="pl-10 pr-4"
                  />
                </div>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                </Button>
                <Button variant="outline">
                  <Users className="w-4 h-4 mr-2" />
                  Team
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="divide-y">
              {clients.map((client, index) => (
                <div key={index} className="py-4 flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-medium">{client.name}</h3>
                    <p className="text-sm text-gray-500">{client.industry}</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="text-sm font-medium">{client.openPositions} open positions</p>
                      <p className="text-sm text-gray-500">Last active {client.lastActivity}</p>
                    </div>
                    <Badge variant={client.status === 'Active' ? 'success' : 'secondary'}>
                      {client.status}
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