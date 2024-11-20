import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const ExperienceOverview = ({ experience }) => {
  if (!experience?.length) return null;

  const latestExperience = experience[0];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Latest Experience</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium">{latestExperience.position}</h3>
            <p className="text-sm text-gray-500">{latestExperience.company}</p>
          </div>
          <p className="text-sm text-gray-600 line-clamp-2">{latestExperience.description}</p>
          {latestExperience.achievements?.length > 0 && (
            <div className="flex gap-2">
              <Badge variant="secondary">
                {latestExperience.achievements.length} Achievement{latestExperience.achievements.length !== 1 ? 's' : ''}
              </Badge>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ExperienceOverview;
