'use client';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Brain, Code, FileSpreadsheet, MessageSquare, Trophy, Timer } from 'lucide-react';
import Link from 'next/link';

const assessmentCategories = [
  {
    title: 'Technical Skills',
    description: 'Evaluate your programming and technical abilities',
    icon: Code,
    progress: 65,
    assessments: [
      { 
        name: 'JavaScript Fundamentals', 
        duration: '45 mins', 
        questions: 30,
        difficulty: 'Intermediate',
        completions: '2.3k',
        status: 'completed',
        score: 85
      },
      { 
        name: 'React Development', 
        duration: '60 mins', 
        questions: 35,
        difficulty: 'Advanced',
        completions: '1.8k',
        status: 'not_started'
      },
      { 
        name: 'HTML & CSS', 
        duration: '30 mins', 
        questions: 25,
        difficulty: 'Beginner',
        completions: '5k',
        status: 'in_progress',
        progress: 60
      },
    ]
  },
  {
    title: 'Office Skills',
    description: 'Test your proficiency in office applications',
    icon: FileSpreadsheet,
    progress: 33,
    assessments: [
      { 
        name: 'Microsoft Excel', 
        duration: '45 mins', 
        questions: 25,
        difficulty: 'Intermediate',
        completions: '3.1k',
        status: 'completed',
        score: 92
      },
      { 
        name: 'Microsoft Word', 
        duration: '30 mins', 
        questions: 20,
        difficulty: 'Beginner',
        completions: '4.2k',
        status: 'not_started'
      }
    ]
  },
  {
    title: 'Soft Skills',
    description: 'Assess your interpersonal and communication abilities',
    icon: MessageSquare,
    progress: 0,
    assessments: [
      { 
        name: 'Communication Skills', 
        duration: '30 mins', 
        questions: 25,
        difficulty: 'Intermediate',
        completions: '2.8k',
        status: 'not_started'
      },
      { 
        name: 'Team Collaboration', 
        duration: '25 mins', 
        questions: 20,
        difficulty: 'Intermediate',
        completions: '2.5k',
        status: 'not_started'
      }
    ]
  }
];

export default function AssessmentsPage() {
  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col space-y-4 md:flex-row md:justify-between md:items-center">
        <div>
          <h1 className="text-3xl font-bold">Skill Assessments</h1>
          <p className="text-gray-500 mt-1">Showcase your abilities and earn certificates</p>
        </div>
        <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-3">
          <Link href="/dashboard/candidate/assessments/psychometric">
            <Button className="space-x-2 w-full md:w-auto" size="lg" variant="outline">
              <Brain className="w-4 h-4" />
              <span>View My Psychometric Assessment</span>
            </Button>
          </Link>
          <Link href="/dashboard/candidate/assessments/technical">
            <Button className="space-x-2 w-full md:w-auto" size="lg">
              <Code className="w-4 h-4" />
              <span>View My Technical Assessment</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Completed Assessments', value: '8', icon: Trophy, color: 'text-green-600' },
          { label: 'In Progress', value: '2', icon: Timer, color: 'text-blue-600' },
          { label: 'Average Score', value: '85%', icon: Brain, color: 'text-purple-600' },
          { label: 'Certificates Earned', value: '5', icon: Code, color: 'text-orange-600' },
        ].map((stat, index) => (
          <Card key={index}>
            <CardContent className="flex items-center p-6">
              <div className={`p-2 rounded-lg ${stat.color} bg-opacity-10 mr-4`}>
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
              </div>
              <div>
                <p className="text-sm text-gray-500">{stat.label}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Assessment Categories */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {assessmentCategories.map((category) => (
          <Card key={category.title} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="p-2 rounded-lg bg-blue-50">
                    <category.icon className="w-6 h-6 text-blue-500" />
                  </div>
                  <div>
                    <CardTitle>{category.title}</CardTitle>
                    <CardDescription>{category.description}</CardDescription>
                  </div>
                </div>
              </div>
              <Progress value={category.progress} className="mt-4" />
              <p className="text-sm text-gray-500 mt-2">{category.progress}% Complete</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {category.assessments.map((assessment, index) => (
                  <div key={index} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-medium">{assessment.name}</h3>
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                          <Timer className="w-4 h-4" />
                          <span>{assessment.duration}</span>
                          <span>•</span>
                          <span>{assessment.questions} questions</span>
                        </div>
                      </div>
                      <Badge variant={
                        assessment.status === 'completed' ? 'success' :
                        assessment.status === 'in_progress' ? 'warning' : 'secondary'
                      }>
                        {assessment.status === 'completed' ? 'Completed' :
                         assessment.status === 'in_progress' ? 'In Progress' : 'Start'}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline">{assessment.difficulty}</Badge>
                        <span className="text-sm text-gray-500">{assessment.completions} completions</span>
                      </div>
                      {assessment.score && (
                        <div className="text-green-600 font-medium">
                          Score: {assessment.score}%
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}