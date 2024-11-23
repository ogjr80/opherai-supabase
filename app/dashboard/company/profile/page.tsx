'use client';
import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import {
  Building,
  MapPin,
  Globe,
  Users,
  Mail,
  Phone,
  Link as LinkIcon,
  Edit,
  Save,
  Image as ImageIcon
} from 'lucide-react';
import { motion } from 'framer-motion';

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

const CompanyProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [companyData, setCompanyData] = useState({
    name: 'TechCorp Solutions',
    logo: '/companies/techcorp.png',
    industry: 'Technology',
    size: '1000-5000 employees',
    founded: '2010',
    website: 'https://techcorp.com',
    location: 'San Francisco, CA',
    about: 'TechCorp Solutions is a leading technology company specializing in enterprise software solutions...',
    benefits: [
      'Health Insurance',
      'Remote Work Options',
      '401(k) Match',
      'Professional Development'
    ],
    socialLinks: {
      linkedin: 'https://linkedin.com/company/techcorp',
      twitter: 'https://twitter.com/techcorp',
      github: 'https://github.com/techcorp'
    }
  });

  return (
    <motion.div 
      className="space-y-8 p-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div variants={itemVariants}>
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Company Profile</h1>
          <Button onClick={() => setIsEditing(!isEditing)}>
            {isEditing ? (
              <>
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </>
            ) : (
              <>
                <Edit className="w-4 h-4 mr-2" />
                Edit Profile
              </>
            )}
          </Button>
        </div>
      </motion.div>

      <motion.div variants={containerVariants}>
        <motion.div variants={itemVariants}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Main Profile Info */}
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Company Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center">
                    <ImageIcon className="w-8 h-8 text-gray-400" />
                  </div>
                  {isEditing && (
                    <Button variant="outline" size="sm">
                      Change Logo
                    </Button>
                  )}
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">Company Name</label>
                      <Input
                        disabled={!isEditing}
                        value={companyData.name}
                        onChange={(e) =>
                          setCompanyData({ ...companyData, name: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Industry</label>
                      <Input
                        disabled={!isEditing}
                        value={companyData.industry}
                        onChange={(e) =>
                          setCompanyData({ ...companyData, industry: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium">About</label>
                    <Textarea
                      disabled={!isEditing}
                      value={companyData.about}
                      onChange={(e) =>
                        setCompanyData({ ...companyData, about: e.target.value })
                      }
                      rows={4}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact & Social */}
            <Card>
              <CardHeader>
                <CardTitle>Contact & Social</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-sm">
                    <Globe className="w-4 h-4" />
                    <span>{companyData.website}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <MapPin className="w-4 h-4" />
                    <span>{companyData.location}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Users className="w-4 h-4" />
                    <span>{companyData.size}</span>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <h3 className="font-medium mb-2">Benefits & Perks</h3>
                  <div className="flex flex-wrap gap-2">
                    {companyData.benefits.map((benefit) => (
                      <Badge key={benefit} variant="secondary">
                        {benefit}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default CompanyProfilePage;