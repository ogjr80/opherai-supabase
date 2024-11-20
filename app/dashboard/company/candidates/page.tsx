'use client';
import { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { candidateService } from '@/lib/services/candidateService';
import { Candidate } from '@/app/dashboard/company/types/company';
import useDebounce from '@/hooks/useDebounce';
import LoadingSpinner from '@/components/ui/loading-spinner';
import { Search, Filter, Calendar, Mail, Star, StarOff, UserPlus } from 'lucide-react';
import Link from 'next/link';

const stages = [
  { value: 'All', label: 'All Candidates' },
  { value: 'New', label: 'New' },
  { value: 'Screening', label: 'Screening' },
  { value: 'Interview', label: 'Interview' },
  { value: 'Offer', label: 'Offer' },
  { value: 'Hired', label: 'Hired' },
  { value: 'Rejected', label: 'Rejected' }
];

export default function CandidatesPage() {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentStage, setCurrentStage] = useState('All');
  
  const debouncedSearch = useDebounce(searchQuery, 300);

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        let results;
        if (debouncedSearch) {
          results = await candidateService.searchCandidates(debouncedSearch);
        } else {
          results = await candidateService.getAllCandidates();
        }
        
        if (currentStage !== 'All') {
          results = results.filter(candidate => 
            candidate.applications.some(app => app.status.toLowerCase() === currentStage.toLowerCase())
          );
        }
        
        setCandidates(results);
      } catch (err) {
        setError('Failed to fetch candidates');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCandidates();
  }, [debouncedSearch, currentStage]);

  const renderCandidateCard = (candidate: Candidate) => (
    <Link 
      href={`/dashboard/company/candidates/${candidate.id}`}
      key={candidate.id}
      className="block hover:bg-gray-50 transition-colors"
    >
      <div className="p-4 border rounded-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="sm"
              className="hover:bg-transparent"
              onClick={(e) => {
                e.preventDefault();
                // Add star functionality
              }}
            >
              {candidate.starred ? (
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
              ) : (
                <StarOff className="w-4 h-4 text-gray-400" />
              )}
            </Button>
            <div>
              <h3 className="font-medium">{candidate.personalInfo.name}</h3>
              <p className="text-sm text-gray-500">{candidate.professionalInfo.currentRole}</p>
            </div>
          </div>
          <Badge variant="outline">
            {candidate.applications[0]?.matchScore}% Match
          </Badge>
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          {candidate.skills.slice(0, 3).map((skill) => (
            <Badge key={skill.name} variant="secondary">
              {skill.name}
            </Badge>
          ))}
          {candidate.skills.length > 3 && (
            <Badge variant="secondary">+{candidate.skills.length - 3}</Badge>
          )}
        </div>
      </div>
    </Link>
  );

  return (
    <div className="space-y-6">
      {/* Header with Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Candidates</p>
                <p className="text-2xl font-bold">1,234</p>
              </div>
              <UserPlus className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        {/* Add more stat cards */}
      </div>

      {/* Main Content */}
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
            <div className="flex-1 max-w-2xl">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search candidates by name, skills, or role..."
                  className="pl-10 pr-4"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
              <Button variant="outline">
                <Calendar className="w-4 h-4 mr-2" />
                Schedule
              </Button>
              <Button variant="outline">
                <Mail className="w-4 h-4 mr-2" />
                Message
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <Tabs defaultValue="All" className="w-full">
            <TabsList className="mb-4">
              {stages.map((stage) => (
                <TabsTrigger
                  key={stage.value}
                  value={stage.value}
                  onClick={() => setCurrentStage(stage.value)}
                >
                  {stage.label}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value={currentStage}>
              <div className="mt-4">
                {isLoading ? (
                  <div className="flex justify-center p-8">
                    <LoadingSpinner />
                  </div>
                ) : error ? (
                  <div className="text-center text-red-500 p-8">{error}</div>
                ) : candidates.length === 0 ? (
                  <div className="text-center text-gray-500 p-8">
                    No candidates found
                  </div>
                ) : (
                  <div className="space-y-4">
                    {candidates.map(renderCandidateCard)}
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}