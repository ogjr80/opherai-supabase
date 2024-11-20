'use client';
import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, Trophy, Target, Clock, Star } from 'lucide-react';

interface Course {
  id: string;
  title: string;
  provider: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  progress: number;
  skills: string[];
  status: 'not_started' | 'in_progress' | 'completed';
  description: string;
  image: string;
}

const courses: Course[] = [
  {
    id: '1',
    title: 'Advanced React Patterns',
    provider: 'Frontend Masters',
    duration: '6 hours',
    level: 'Advanced',
    progress: 45,
    skills: ['React', 'TypeScript', 'Design Patterns'],
    status: 'in_progress',
    description: 'Learn advanced React patterns including compound components, render props, and hooks.',
    image: '/courses/react-patterns.jpg'
  },
  {
    id: '2',
    title: 'System Design Fundamentals',
    provider: 'Educative',
    duration: '10 hours',
    level: 'Intermediate',
    progress: 0,
    skills: ['System Design', 'Architecture', 'Scalability'],
    status: 'not_started',
    description: 'Master the fundamentals of system design and architecture.',
    image: '/courses/system-design.jpg'
  }
];

const LearningPage = () => {
  const [activeTab, setActiveTab] = useState('recommended');

  const CourseCard = ({ course }: { course: Course }) => (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-3">
            <h3 className="font-semibold text-lg">{course.title}</h3>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <BookOpen className="w-4 h-4" />
              {course.provider}
              <Clock className="w-4 h-4 ml-2" />
              {course.duration}
            </div>
            <div className="flex gap-2">
              {course.skills.map((skill) => (
                <Badge key={skill} variant="secondary">
                  {skill}
                </Badge>
              ))}
            </div>
            <p className="text-sm text-gray-600">{course.description}</p>
          </div>
        </div>
        <div className="mt-4 space-y-3">
          {course.status === 'in_progress' && (
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span>{course.progress}%</span>
              </div>
              <Progress value={course.progress} />
            </div>
          )}
          <Button className="w-full" variant={course.status === 'not_started' ? 'default' : 'secondary'}>
            {course.status === 'not_started' ? 'Start Course' : 'Continue Learning'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Learning Hub</h1>
        <Button>
          <Target className="w-4 h-4 mr-2" />
          Set Learning Goals
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="recommended">Recommended</TabsTrigger>
          <TabsTrigger value="in_progress">In Progress</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="bookmarked">Bookmarked</TabsTrigger>
        </TabsList>

        <TabsContent value="recommended" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </TabsContent>

        {/* Add other TabsContent components for different tabs */}
      </Tabs>
    </div>
  );
};

export default LearningPage;