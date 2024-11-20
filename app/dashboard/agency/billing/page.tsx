'use client';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import {
  DollarSign,
  Download,
  CreditCard,
  TrendingUp,
  Calendar,
  Building2,
  FileText,
  Search,
  Filter
} from 'lucide-react';
import { motion } from 'framer-motion';

const stats = [
  { 
    label: 'Total Revenue', 
    value: '$425,000', 
    icon: DollarSign, 
    trend: '+15% vs last month',
    description: 'Year to date'
  },
  { 
    label: 'Outstanding Invoices', 
    value: '$28,500', 
    icon: FileText, 
    trend: '4 pending invoices',
    description: 'Due within 30 days'
  },
  { 
    label: 'Average Fee', 
    value: '$24,500', 
    icon: TrendingUp, 
    trend: '+8% vs last quarter',
    description: 'Per placement'
  },
  { 
    label: 'Next Payout', 
    value: '$52,000', 
    icon: Calendar, 
    trend: 'Due in 5 days',
    description: 'From 3 placements'
  },
];

const transactions = [
  {
    id: 1,
    client: 'TechCorp Solutions',
    amount: 25000,
    status: 'paid',
    date: '2024-03-15',
    type: 'Placement Fee',
    candidate: 'Sarah Chen',
    position: 'Senior Frontend Developer',
    invoiceNumber: 'INV-2024-001'
  },
  // Add more transactions...
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

export default function BillingPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentTab, setCurrentTab] = useState('all');

  return (
    <motion.div 
      className="space-y-6"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div variants={itemVariants} className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Billing & Revenue</h1>
          <p className="text-gray-500">Manage invoices, payments, and revenue tracking</p>
        </div>
        <div className="space-x-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button>
            <FileText className="w-4 h-4 mr-2" />
            New Invoice
          </Button>
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
                  <p className="text-xs text-gray-500">{stat.description}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Transactions List */}
      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
              <div className="flex-1 max-w-2xl">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search transactions..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {transactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                >
                  <div className="flex-1">
                    <div className="flex items-center space-x-4">
                      <Building2 className="w-6 h-6 text-gray-400" />
                      <div>
                        <h3 className="font-medium">{transaction.client}</h3>
                        <p className="text-sm text-gray-500">
                          {transaction.position} - {transaction.candidate}
                        </p>
                        <p className="text-xs text-gray-400">
                          Invoice #{transaction.invoiceNumber}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                  <div className="text-right">
                      <p className="font-medium">${transaction.amount.toLocaleString()}</p>
                      <p className="text-sm text-gray-500">{new Date(transaction.date).toLocaleDateString()}</p>
                    </div>
                    <Badge 
                      variant={
                        transaction.status === 'paid' ? 'success' : 
                        transaction.status === 'pending' ? 'warning' : 
                        'destructive'
                      }
                    >
                      {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                    </Badge>
                    <Button variant="ghost" size="sm">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Revenue Charts */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        variants={containerVariants}
      >
        <Card>
          <CardHeader>
            <CardTitle>Revenue by Client</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Add chart component here */}
            <div className="h-[300px] flex items-center justify-center text-gray-500">
              Revenue chart placeholder
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Monthly Revenue Trend</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Add chart component here */}
            <div className="h-[300px] flex items-center justify-center text-gray-500">
              Trend chart placeholder
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}