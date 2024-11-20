import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const EducationOverview = ({ education }) => {
  if (!education?.length) return null;

  const latestEducation = education[0];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Education</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <h3 className="font-medium">{latestEducation.institution}</h3>
          <p className="text-sm text-gray-500">{latestEducation.degree} in {latestEducation.fieldOfStudy}</p>
          {latestEducation.grade && (
            <p className="text-sm text-gray-600">Grade: {latestEducation.grade}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default EducationOverview;
