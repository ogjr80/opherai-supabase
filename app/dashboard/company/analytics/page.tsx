'use client';
import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from 'recharts';

const hiringMetrics = [
  { month: 'Jan', applications: 45, hires: 3, interviews: 12 },
  { month: 'Feb', applications: 52, hires: 4, interviews: 15 },
  { month: 'Mar', applications: 61, hires: 5, interviews: 18 },
  { month: 'Apr', applications: 48, hires: 3, interviews: 14 },
];

const skillGapData = [
  { name: 'React', required: 90, current: 75 },
  { name: 'Node.js', required: 85, current: 80 },
  { name: 'TypeScript', required: 80, current: 70 },
  { name: 'AWS', required: 75, current: 60 },
  { name: 'Python', required: 70, current: 85 },
];

const timeToHireData = [
  { stage: 'Screening', avgDays: 3 },
  { stage: 'Technical Interview', avgDays: 5 },
  { stage: 'Team Interview', avgDays: 4 },
  { stage: 'Offer', avgDays: 3 },
  { stage: 'Acceptance', avgDays: 2 },
];

export default function AnalyticsPage() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
          <p className="text-gray-500">Track your recruitment metrics and insights</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-2">
              <p className="text-sm text-gray-500">Average Time to Hire</p>
              <p className="text-2xl font-bold">17 days</p>
              <p className="text-sm text-green-600">↓ 3 days from last month</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-2">
              <p className="text-sm text-gray-500">Application Success Rate</p>
              <p className="text-2xl font-bold">24%</p>
              <p className="text-sm text-green-600">↑ 5% from last month</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-2">
              <p className="text-sm text-gray-500">Open Positions</p>
              <p className="text-2xl font-bold">12</p>
              <p className="text-sm text-blue-600">4 urgent needs</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recruitment Analytics</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="overview" className="w-full">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="hiring">Hiring Pipeline</TabsTrigger>
              <TabsTrigger value="skills">Skills Gap</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={hiringMetrics}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area type="monotone" dataKey="applications" stroke="#8884d8" fill="#8884d8" />
                  <Area type="monotone" dataKey="interviews" stroke="#82ca9d" fill="#82ca9d" />
                  <Area type="monotone" dataKey="hires" stroke="#ffc658" fill="#ffc658" />
                </AreaChart>
              </ResponsiveContainer>
            </TabsContent>

            <TabsContent value="hiring" className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={timeToHireData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="stage" type="category" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="avgDays" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </TabsContent>

            <TabsContent value="skills" className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={skillGapData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="name" />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} />
                  <Radar name="Required Skills" dataKey="required" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
                  <Radar name="Current Skills" dataKey="current" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                  <Legend />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>AI Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Badge variant="outline">Trend</Badge>
                <p className="text-sm">Remote positions receive 40% more applications</p>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant="outline">Insight</Badge>
                <p className="text-sm">Technical roles taking 25% longer to fill than average</p>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant="outline">Action</Badge>
                <p className="text-sm">Consider adjusting salary ranges for senior roles</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Performing Job Posts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {['Senior Frontend Developer', 'DevOps Engineer', 'Product Manager'].map((position) => (
                <div key={position} className="flex justify-between items-center">
                  <span className="font-medium">{position}</span>
                  <Badge variant="outline">High Match Rate</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}