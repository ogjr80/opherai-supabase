'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import {
  Search,
  Filter,
  Star,
  StarOff,
  Mail,
  Calendar,
  MapPin,
  Briefcase,
  GraduationCap,
  Clock,
  Building2,
  DollarSign
} from 'lucide-react';

interface TalentProfile {
  id: string;
  name: string;
  title: string;
  location: string;
  experience: string;
  skills: string[];
  education: string;
  availability: 'immediate' | '2_weeks' | '1_month' | 'not_available';
  matchScore: number;
  salary: string;
  savedStatus: boolean;
  lastActive: string;
  potentialClients: string[];
  placementProbability: number;
}

const mockTalentProfiles: TalentProfile[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    title: 'Senior Frontend Developer',
    location: 'San Francisco, CA',
    experience: '8 years',
    skills: ['React', 'TypeScript', 'Node.js', 'AWS'],
    education: 'MS Computer Science',
    availability: 'immediate',
    matchScore: 95,
    salary: '$120k - $150k',
    savedStatus: true,
    lastActive: '2 hours ago',
    potentialClients: ['TechCorp', 'InnovateLabs', 'FutureStack'],
    placementProbability: 85
  },
  // Add more mock profiles...
];

export default function AgencyTalentSearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [savedOnly, setSavedOnly] = useState(false);
  const [activeTab, setActiveTab] = useState('all');

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
          <h1 className="text-2xl font-bold">Talent Search</h1>
          <p className="text-gray-500">Find and match top talent with your clients</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Star className="w-4 h-4 mr-2" />
            Saved Talent
          </Button>
          <Button>
            <Building2 className="w-4 h-4 mr-2" />
            Client Matches
          </Button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
              <div className="flex-1 max-w-2xl">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search by skills, job title, or location..."
                    className="pl-10 pr-4"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  Advanced Filters
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[600px]">
              <div className="space-y-4">
                {mockTalentProfiles.map((profile) => (
                  <div
                    key={profile.id}
                    className="p-4 border rounded-lg hover:bg-gray-50"
                  >
                    <div className="flex justify-between items-start">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-medium">{profile.name}</h3>
                          <Badge variant="success">{profile.matchScore}% Match</Badge>
                          {profile.availability === 'immediate' && (
                            <Badge variant="secondary">Immediate</Badge>
                          )}
                        </div>
                        <p className="text-gray-600">{profile.title}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span className="flex items-center">
                            <MapPin className="w-4 h-4 mr-1" />
                            {profile.location}
                          </span>
                          <span className="flex items-center">
                            <Briefcase className="w-4 h-4 mr-1" />
                            {profile.experience}
                          </span>
                          <span className="flex items-center">
                            <DollarSign className="w-4 h-4 mr-1" />
                            {profile.salary}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {profile.skills.map((skill) => (
                            <Badge key={skill} variant="outline">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                        <div className="mt-2">
                          <p className="text-sm text-blue-600">
                            Potential Clients: {profile.potentialClients.join(', ')}
                          </p>
                          <p className="text-sm text-green-600">
                            Placement Probability: {profile.placementProbability}%
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col space-y-2">
                        <Button variant="outline" size="sm">
                          <Mail className="w-4 h-4 mr-2" />
                          Contact
                        </Button>
                        <Button variant="outline" size="sm">
                          <Calendar className="w-4 h-4 mr-2" />
                          Schedule
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}