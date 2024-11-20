import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Edit2, Settings, Share2 } from 'lucide-react';
import Link from 'next/link';

interface DashboardHeaderProps {
  profile: {
    firstName?: string;
    lastName?: string;
    title?: string;
    completionStatus?: {
      biography: boolean;
      experience: boolean;
      education: boolean;
      skills: boolean;
      projects: boolean;
    };
  };
}

const DashboardHeader = ({ profile }: DashboardHeaderProps) => {
  const getProfileCompletion = () => {
    if (!profile?.completionStatus) return 0;
    const completed = Object.values(profile.completionStatus).filter(Boolean).length;
    const total = Object.keys(profile.completionStatus).length;
    return Math.round((completed / total) * 100);
  };

  return (
    <div className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Welcome back, {profile?.firstName || 'Candidate'}!
            </h1>
            <p className="text-gray-500 mt-1">{profile?.title || 'Complete your profile to get started'}</p>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Share2 className="w-4 h-4" />
              Share Profile
            </Button>
            <Link href="/settings">
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Settings className="w-4 h-4" />
                Settings
              </Button>
            </Link>
            <Link href="/onboarding/candidate">
              <Button size="sm" className="flex items-center gap-2">
                <Edit2 className="w-4 h-4" />
                Edit Profile
              </Button>
            </Link>
          </div>
        </div>

        {getProfileCompletion() < 100 && (
          <Card className="mt-6 p-4 bg-blue-50 border-blue-100">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h3 className="font-medium text-blue-900">Complete Your Profile</h3>
                <p className="text-sm text-blue-700">
                  Your profile is {getProfileCompletion()}% complete. Add more information to increase visibility.
                </p>
              </div>
              <Badge variant="secondary" className="bg-blue-100 text-blue-900">
                {getProfileCompletion()}%
              </Badge>
            </div>
            <div className="mt-4 h-2 bg-blue-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-600 rounded-full transition-all duration-500"
                style={{ width: `${getProfileCompletion()}%` }}
              />
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default DashboardHeader;
