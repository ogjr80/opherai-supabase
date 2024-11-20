import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const ProjectsOverview = ({ projects }) => {
  if (!projects?.length) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Recent Projects</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {projects.slice(0, 2).map(project => (
            <div key={project.name} className="space-y-2">
              <h3 className="font-medium">{project.name}</h3>
              <p className="text-sm text-gray-600 line-clamp-2">{project.description}</p>
              <div className="flex flex-wrap gap-1">
                {project.technologies.map(tech => (
                  <Badge key={tech} variant="outline" className="text-xs">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectsOverview;
