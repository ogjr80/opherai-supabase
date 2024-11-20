'use client';
import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion } from 'framer-motion';
import { 
  Building2,
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

interface AgencySettings {
  notifications: {
    clientAlerts: boolean;
    candidateMessages: boolean;
    teamUpdates: boolean;
    marketingEmails: boolean;
  };
  privacy: {
    agencyProfileVisibility: 'public' | 'private' | 'verified_only';
    showTeamMembers: boolean;
    showMetrics: boolean;
  };
  billing: {
    plan: 'starter' | 'professional' | 'enterprise';
    recruiters: number;
    billingCycle: 'monthly' | 'annual';
  };
}

export default function AgencySettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');

  const tabItems = [
    { id: 'profile', label: 'Agency Profile', icon: Building2 },
    { id: 'team', label: 'Team', icon: Users },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'privacy', label: 'Privacy', icon: Shield },
    { id: 'billing', label: 'Billing', icon: CreditCard },
    { id: 'security', label: 'Security', icon: Settings }
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Agency Settings</h1>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <Card>
          <CardContent className="p-3">
            <TabsList className="w-full justify-start bg-transparent border-b">
              <div className="flex w-full relative">
                {tabItems.map((tab) => (
                  <TabsTrigger
                    key={tab.id}
                    value={tab.id}
                    className="relative px-4 py-2 data-[state=active]:bg-transparent"
                  >
                    <div className="flex items-center space-x-2">
                      <tab.icon className="w-4 h-4" />
                      <span>{tab.label}</span>
                    </div>
                    {activeTab === tab.id && (
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                        layoutId="activeTab"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 30
                        }}
                      />
                    )}
                  </TabsTrigger>
                ))}
              </div>
            </TabsList>
          </CardContent>
        </Card>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <TabsContent value="profile" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Agency Profile Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Agency Name</label>
                    <Input placeholder="Premier Talent Solutions" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Specialization</label>
                    <Input placeholder="Tech Recruitment" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Agency Description</label>
                  <Textarea placeholder="Tell clients about your agency expertise..." />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Website</label>
                    <Input type="url" placeholder="https://agency.com" />
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

          <TabsContent value="team" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Recruiter Management</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <h3 className="font-medium">Team Members</h3>
                  <Button variant="outline">
                    <Users className="w-4 h-4 mr-2" />
                    Add Recruiter
                  </Button>
                </div>
                <div className="space-y-4">
                  <h3 className="font-medium">Roles & Permissions</h3>
                  {/* Role management content */}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

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
                      <p className="text-sm text-gray-500">Recruiter Seats</p>
                      <p className="font-medium">5 recruiters ($199/seat/month)</p>
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

          {/* Add remaining TabsContent components for notifications, privacy, and security */}
        </motion.div>
      </Tabs>
    </div>
  );
}