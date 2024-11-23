'use client';
import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Building,
  Bell, 
  Shield, 
  CreditCard, 
  Mail, 
  Globe, 
  Users,
  Download,
  Trash2,
  Settings,
  Lock
} from 'lucide-react';
import { motion } from 'framer-motion';

interface CompanySettings {
  notifications: {
    applicationAlerts: boolean;
    candidateMessages: boolean;
    teamUpdates: boolean;
    marketingEmails: boolean;
  };
  privacy: {
    companyProfileVisibility: 'public' | 'private' | 'verified_only';
    showTeamMembers: boolean;
    showMetrics: boolean;
  };
  billing: {
    plan: 'starter' | 'professional' | 'enterprise';
    seats: number;
    billingCycle: 'monthly' | 'annual';
  };
}

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

export default function CompanySettingsPage() {
  const [settings, setSettings] = useState<CompanySettings>({
    notifications: {
      applicationAlerts: true,
      candidateMessages: true,
      teamUpdates: true,
      marketingEmails: false
    },
    privacy: {
      companyProfileVisibility: 'public',
      showTeamMembers: true,
      showMetrics: false
    },
    billing: {
      plan: 'professional',
      seats: 5,
      billingCycle: 'annual'
    }
  });

  return (
    <motion.div 
      className="space-y-8 p-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div variants={itemVariants} className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-gray-500">Manage your account preferences</p>
        </div>
      </motion.div>

      <motion.div variants={containerVariants}>
        <Tabs defaultValue="profile">
          <motion.div variants={itemVariants}>
            <TabsList>
              <TabsTrigger value="profile">Company Profile</TabsTrigger>
              <TabsTrigger value="team">Team Management</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="privacy">Privacy</TabsTrigger>
              <TabsTrigger value="billing">Billing</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
            </TabsList>
          </motion.div>

          <motion.div variants={itemVariants}>
            <TabsContent value="profile" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Company Profile Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Company Name</label>
                      <Input placeholder="TechCorp Solutions" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Industry</label>
                      <Input placeholder="Technology" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Company Description</label>
                    <Textarea placeholder="Tell candidates about your company..." />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Website</label>
                      <Input type="url" placeholder="https://company.com" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Location</label>
                      <Input placeholder="San Francisco, CA" />
                    </div>
                  </div>
                  <Button>Save Changes</Button>
                </CardContent>
              </Card>
            </TabsContent>
          </motion.div>

          <motion.div variants={itemVariants}>
            <TabsContent value="team" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Team Management</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <h3 className="font-medium">Team Members</h3>
                    {/* Team member list and management here */}
                    <Button variant="outline">
                      <Users className="w-4 h-4 mr-2" />
                      Invite Team Member
                    </Button>
                  </div>
                  <div className="space-y-4">
                    <h3 className="font-medium">Roles & Permissions</h3>
                    {/* Role management here */}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </motion.div>

          <motion.div variants={itemVariants}>
            <TabsContent value="billing" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Billing & Subscription</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="font-medium">Current Plan: Professional</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Billing Cycle</p>
                        <p className="font-medium">Annual (20% discount)</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Team Seats</p>
                        <p className="font-medium">5 seats ($99/seat/month)</p>
                      </div>
                    </div>
                    <Button variant="outline">Manage Subscription</Button>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="font-medium">Payment Method</h3>
                    <Button variant="outline">
                      <CreditCard className="w-4 h-4 mr-2" />
                      Update Payment Method
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </motion.div>

          <motion.div variants={itemVariants}>
            <TabsContent value="security" className="space-y-4">
              {/* Your existing security settings content */}
            </TabsContent>
          </motion.div>
        </Tabs>
      </motion.div>
    </motion.div>
  );
}