'use client';
import { useEffect, useState } from 'react';
import { candidateService } from '@/lib/services/candidateService';
import { Candidate } from '../../types/company';
import LoadingSpinner from '@/components/ui/loading-spinner';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  User, Mail, Phone, MapPin, Building, Briefcase,
  Calendar, FileText, Star, Download, Clock, DollarSign,
  GraduationCap, Award, Activity, CheckCircle
} from 'lucide-react';

export default function CandidateDetail({ params }: { params: { id: string } }) {
  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('profile');

  useEffect(() => {
    const fetchCandidate = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await candidateService.getCandidateById(params.id);
        if (!data) {
          setError('Candidate not found');
          return;
        }
        setCandidate(data);
      } catch (err) {
        setError('Failed to fetch candidate details');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCandidate();
  }, [params.id]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  if (error || !candidate) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500">
        {error || 'Something went wrong'}
      </div>
    );
  }

  const renderSkillBadge = (skill: any) => (
    <Badge key={skill.name} variant="secondary" className="flex items-center gap-2">
      <span>{skill.name}</span>
      <span className="px-1.5 py-0.5 bg-gray-100 rounded-full text-xs">
        {skill.level}
      </span>
    </Badge>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div className="flex items-center space-x-4">
          <div className="h-20 w-20 rounded-full bg-gray-200 flex items-center justify-center">
            <User className="h-10 w-10 text-gray-500" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">{candidate.personalInfo.name}</h1>
            <p className="text-gray-500">{candidate.professionalInfo.currentRole}</p>
            <div className="flex items-center space-x-4 mt-2">
              <Badge variant="outline">92% Match</Badge>
              <Badge variant="success">Available</Badge>
            </div>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Mail className="w-4 h-4 mr-2" />
            Message
          </Button>
          <Button>Schedule Interview</Button>
        </div>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="experience">Experience</TabsTrigger>
          <TabsTrigger value="applications">Applications</TabsTrigger>
          <TabsTrigger value="assessments">Assessments</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>

        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2 space-y-6">
            <TabsContent value="profile" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Professional Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <p className="text-sm text-gray-500">Current Role</p>
                      <p className="font-medium">{candidate?.professionalInfo.currentRole}</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-gray-500">Years of Experience</p>
                      <p className="font-medium">{candidate?.professionalInfo.yearsOfExperience} years</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-gray-500">Preferred Work Type</p>
                      <div className="flex gap-2">
                        {candidate?.professionalInfo.preferredWorkType.map(type => (
                          <Badge key={type} variant="outline">{type}</Badge>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-gray-500">Expected Salary</p>
                      <p className="font-medium">
                        {candidate?.professionalInfo.expectedSalary.currency} 
                        {candidate?.professionalInfo.expectedSalary.min.toLocaleString()} - 
                        {candidate?.professionalInfo.expectedSalary.max.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Skills</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {candidate?.skills.map(renderSkillBadge)}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Education</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {candidate?.education?.map(edu => (
                    <div key={edu.id} className="border-b last:border-0 pb-4 last:pb-0">
                      <h4 className="font-medium">{edu.institution}</h4>
                      <p className="text-sm text-gray-500">{edu.degree} in {edu.field}</p>
                      <p className="text-sm text-gray-500">
                        {edu.startDate} - {edu.endDate} • {edu.grade}
                      </p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="experience" className="space-y-6">
              {candidate?.experience?.map(exp => (
                <Card key={exp.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{exp.role}</CardTitle>
                        <p className="text-gray-500">{exp.company}</p>
                      </div>
                      <Badge variant={exp.current ? 'default' : 'secondary'}>
                        {exp.current ? 'Current' : 'Past'}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p>{exp.description}</p>
                    <div>
                      <p className="font-medium mb-2">Key Achievements</p>
                      <ul className="list-disc list-inside space-y-1">
                        {exp.achievements.map((achievement, index) => (
                          <li key={index} className="text-gray-600">{achievement}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {exp.skills.map(skill => (
                        <Badge key={skill} variant="outline">{skill}</Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="applications" className="space-y-6">
              {candidate?.applications?.map(app => (
                <Card key={app.jobId}>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle>Application Status</CardTitle>
                      <Badge>{app.status}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Progress</span>
                        <span>{app.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${app.progress}%` }}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Applied Date</p>
                        <p className="font-medium">{app.appliedDate}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Match Score</p>
                        <p className="font-medium">{app.matchScore}%</p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-sm text-gray-500">Next Step</p>
                        <p className="font-medium">{app.nextStep}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-gray-500" />
                  <span>{candidate?.personalInfo.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-gray-500" />
                  <span>{candidate?.personalInfo.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <span>{candidate?.personalInfo.location}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button className="w-full" variant="outline">
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule Interview
                </Button>
                <Button className="w-full" variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Download Resume
                </Button>
                <Button className="w-full" variant="outline">
                  <Mail className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </Tabs>
    </div>
  );
}