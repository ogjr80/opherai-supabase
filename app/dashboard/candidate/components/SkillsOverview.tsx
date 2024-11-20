import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import  {SkillBadge}  from '@/app/components/candidate/FormComponents';

const SkillsOverview = ({ skills }) => {
  if (!skills?.length) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Skills</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {skills.map(skill => (
            <SkillBadge 
              key={skill.name} 
              skill={skill.name} 
              level={skill.level} 
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SkillsOverview;
