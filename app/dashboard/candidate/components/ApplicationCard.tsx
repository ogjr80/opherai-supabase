'use client';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Building2, Calendar, MessageSquare, Timer } from 'lucide-react';
import Link from 'next/link';
import type { Application } from '../applications/types';
import { LucideIcon } from 'lucide-react';

interface ApplicationCardProps {
  application: Application;
  statusConfig: Record<string, { label: string; color: string; icon: LucideIcon }>;
}

export default function ApplicationCard({ application, statusConfig }: ApplicationCardProps) {
  const StatusIcon = statusConfig[application.status].icon;
  
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center">
              <Building2 className="w-6 h-6 text-gray-600" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">{application.position}</h3>
              <p className="text-gray-600">{application.company}</p>
              <div className="flex items-center space-x-2 mt-1">
                <Badge variant="outline">{application.type}</Badge>
                <Badge variant="outline">{application.location}</Badge>
                <Badge variant="outline">{application.salary}</Badge>
              </div>
            </div>
          </div>
          <div className="text-right">
            <Badge className={statusConfig[application.status].color}>
              <StatusIcon className="w-4 h-4 mr-1" />
              {statusConfig[application.status].label}
            </Badge>
            <p className="text-sm text-gray-500 mt-1">Applied {application.applied}</p>
          </div>
        </div>

        <div className="mt-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">{application.stage}</span>
            <span className="text-sm text-gray-500">{application.progress}%</span>
          </div>
          <Progress value={application.progress} className="h-2" />
        </div>

        {application.interviews && (
          <div className="mt-4 border-t pt-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-medium">Next Interview</span>
              </div>
              <Button variant="outline" size="sm">
                <MessageSquare className="w-4 h-4 mr-2" />
                Prepare
              </Button>
            </div>
            {application.interviews.map((interview, index) => (
              <div key={index} className="mt-2 text-sm text-gray-600">
                {interview.type} • {interview.date} • {interview.time}
              </div>
            ))}
          </div>
        )}

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Timer className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-500">Last activity {application.lastActivity}</span>
          </div>
          <Link href={`/dashboard/candidate/applications/${application.id}`}>
            <Button variant="outline" size="sm">View Details</Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}