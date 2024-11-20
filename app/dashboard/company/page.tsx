'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
// import { CandidateService } from '@/utils/supabase/candidateService';
import {
  Building,
  Users,
  Briefcase,
  TrendingUp,
  Clock,
  UserCheck,
  Search,
  Filter
} from 'lucide-react';
import Link from 'next/link';

const stats = [
  { label: 'Active Job Postings', value: '12', icon: Briefcase, trend: '+2 this week' },
  { label: 'Total Applicants', value: '148', icon: Users, trend: '+28 this week' },
  { label: 'Interviews Scheduled', value: '8', icon: Clock, trend: '+3 this week' },
  { label: 'Positions Filled', value: '5', icon: UserCheck, trend: '+1 this month' },
];

const recentApplications = [
  {
    position: 'Senior Frontend Developer',
    applicant: 'Sarah Chen',
    status: 'Screening',
    match: 92,
    applied: '2 days ago'
  },
  {
    position: 'DevOps Engineer',
    applicant: 'Michael Brown',
    status: 'Interview',
    match: 88,
    applied: '3 days ago'
  },
  // Add more applications as needed
];

export default function CompanyDashboard() {
  return (
    <div className="space-y-8 p-8">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Company Dashboard</h1>
          <p className="text-gray-500">Manage your recruitment pipeline and team</p>
        </div>
        <div className="space-x-4">
          <Link href="/dashboard/company/jobs/create">
            <Button className="space-x-2">
              <Briefcase className="w-4 h-4" />
              <span>Post New Job</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index}>
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
        ))}
      </div>

      {/* Recent Applications */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Recent Applications</CardTitle>
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
            {recentApplications.map((application, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                <div>
                  <h3 className="font-medium">{application.position}</h3>
                  <p className="text-sm text-gray-500">{application.applicant}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <Badge variant="outline">{application.status}</Badge>
                  <Badge variant="success">{application.match}% Match</Badge>
                  <span className="text-sm text-gray-500">{application.applied}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Hiring Pipeline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span>Screening</span>
                <Badge>12</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span>Interview</span>
                <Badge>8</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span>Offer</span>
                <Badge>3</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Team Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-sm text-gray-500">Recent team member actions...</p>
              {/* Add team activity feed here */}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>AI Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm text-gray-600">
              <p>• Candidate response rate is 15% higher for remote positions</p>
              <p>• Technical roles are taking 20% longer to fill than average</p>
              <p>• Top candidates are most active during morning hours</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}