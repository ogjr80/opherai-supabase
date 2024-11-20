'use client';
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid,  PieChart, Pie, Cell, Treemap } from 'recharts';

// Simulated API calls
const fetchProgrammingSkills = () => new Promise(resolve => setTimeout(() => resolve(programmingSkillsData), 500));
const fetchFrameworksLibraries = () => new Promise(resolve => setTimeout(() => resolve(frameworksLibrariesData), 500));
const fetchProblemSolvingSkills = () => new Promise(resolve => setTimeout(() => resolve(problemSolvingSkillsData), 500));
const fetchDatabaseSkills = () => new Promise(resolve => setTimeout(() => resolve(databaseSkillsData), 500));
const fetchProjectExperience = () => new Promise(resolve => setTimeout(() => resolve(projectExperienceData), 500));
const fetchCodeQualityMetrics = () => new Promise(resolve => setTimeout(() => resolve(codeQualityMetricsData), 500));

// Mock data
const programmingSkillsData = [
  { language: 'JavaScript', score: 85 },
  { language: 'Python', score: 78 },
  { language: 'Java', score: 72 },
  { language: 'C++', score: 65 },
  { language: 'TypeScript', score: 80 },
  { language: 'Ruby', score: 60 },
];

const frameworksLibrariesData = [
  { name: 'React', proficiency: 90 },
  { name: 'Angular', proficiency: 75 },
  { name: 'Vue.js', proficiency: 60 },
  { name: 'Django', proficiency: 85 },
  { name: 'Express.js', proficiency: 80 },
  { name: 'Spring Boot', proficiency: 70 },
];

const problemSolvingSkillsData = [
  { skill: 'Algorithm Design', score: 82 },
  { skill: 'Data Structures', score: 88 },
  { skill: 'Time Complexity Analysis', score: 75 },
  { skill: 'System Design', score: 70 },
  { skill: 'Debugging', score: 85 },
];

const databaseSkillsData = [
  { database: 'MySQL', score: 85 },
  { database: 'PostgreSQL', score: 80 },
  { database: 'MongoDB', score: 75 },
  { database: 'Redis', score: 70 },
  { database: 'Elasticsearch', score: 65 },
];

const projectExperienceData = [
  { name: 'E-commerce Platform', size: 800, complexity: 85, impact: 90 },
  { name: 'Social Media App', size: 600, complexity: 75, impact: 80 },
  { name: 'Data Analytics Dashboard', size: 400, complexity: 70, impact: 85 },
  { name: 'IoT Device Management', size: 300, complexity: 80, impact: 75 },
  { name: 'Machine Learning Model', size: 200, complexity: 90, impact: 95 },
];

const codeQualityMetricsData = [
  { metric: 'Code Readability', score: 85 },
  { metric: 'Documentation', score: 75 },
  { metric: 'Test Coverage', score: 80 },
  { metric: 'Code Reusability', score: 78 },
  { metric: 'Performance Optimization', score: 82 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658', '#ff7300'];

const TechnicalSkillsDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [programmingSkills, setProgrammingSkills] = useState([]);
  const [frameworksLibraries, setFrameworksLibraries] = useState([]);
  const [problemSolvingSkills, setProblemSolvingSkills] = useState([]);
  const [databaseSkills, setDatabaseSkills] = useState([]);
  const [projectExperience, setProjectExperience] = useState([]);
  const [codeQualityMetrics, setCodeQualityMetrics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCandidate, setSelectedCandidate] = useState('John Doe');

  const aiInsights = useMemo(() => [
    "This candidate's strong JavaScript and React skills make them an excellent fit for front-end development roles.",
    "Their proficiency in both SQL and NoSQL databases indicates versatility in data management.",
    "High scores in algorithm design and data structures suggest strong problem-solving abilities.",
    "The candidate's experience with machine learning models could be valuable for AI-driven projects.",
    "Their code quality metrics, especially in readability and test coverage, indicate a focus on maintainable code."
  ], []);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const [programming, frameworks, problemSolving, databases, projects, codeQuality] = await Promise.all([
        fetchProgrammingSkills(),
        fetchFrameworksLibraries(),
        fetchProblemSolvingSkills(),
        fetchDatabaseSkills(),
        fetchProjectExperience(),
        fetchCodeQualityMetrics()
      ]);
      setProgrammingSkills(programming);
      setFrameworksLibraries(frameworks);
      setProblemSolvingSkills(problemSolving);
      setDatabaseSkills(databases);
      setProjectExperience(projects);
      setCodeQualityMetrics(codeQuality);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch assessment data. Please try again later.');
      console.log(err);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded shadow">
          <p className="text-sm font-bold">{`${label}`}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {`${entry.name}: ${typeof entry.value === 'number' ? entry.value.toFixed(2) : entry.value}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  if (loading) {
    return <div className="text-center py-10">Loading technical skills assessment data...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-blue-600">Candidate Technical Skills Assessment Dashboard</h1>
      
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Candidate: {selectedCandidate}</h2>
          <select 
            className="p-2 border rounded"
            value={selectedCandidate}
            onChange={(e) => setSelectedCandidate(e.target.value)}
          >
            <option>John Doe</option>
            <option>Jane Smith</option>
            <option>Alex Johnson</option>
          </select>
        </div>
        <h3 className="text-xl font-semibold mb-2">AI-Driven Technical Insight</h3>
        <div className="bg-blue-100 p-4 rounded-lg">
          <p className="text-lg font-medium text-blue-800">{aiInsights[Math.floor(Math.random() * aiInsights.length)]}</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex mb-4 space-x-2 overflow-x-auto pb-2">
          {['overview', 'programming', 'frameworks', 'problemsolving', 'databases', 'projects', 'codequality'].map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2 rounded whitespace-nowrap ${activeTab === tab ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab === 'problemsolving' ? 'Problem Solving' : tab === 'codequality' ? 'Code Quality' : tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {activeTab === 'overview' && (
          <div className="h-96">
            <h2 className="text-2xl font-semibold mb-4">Technical Skills Overview</h2>
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart outerRadius={90} width={730} height={250} data={[...programmingSkills, ...problemSolvingSkills]}>
                <PolarGrid />
                <PolarAngleAxis dataKey="language" />
                <PolarRadiusAxis angle={30} domain={[0, 100]} />
                <Radar name="Skills" dataKey="score" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                <Legend />
                <Tooltip content={<CustomTooltip />} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        )}

        {activeTab === 'programming' && (
          <div className="h-96">
            <h2 className="text-2xl font-semibold mb-4">Programming Languages Proficiency</h2>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={programmingSkills} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" domain={[0, 100]} />
                <YAxis dataKey="language" type="category" />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar dataKey="score" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        {activeTab === 'frameworks' && (
          <div className="h-96">
            <h2 className="text-2xl font-semibold mb-4">Frameworks and Libraries</h2>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={frameworksLibraries}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="proficiency"
                  nameKey="name"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {frameworksLibraries.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}

        {activeTab === 'problemsolving' && (
          <div className="h-96">
            <h2 className="text-2xl font-semibold mb-4">Problem Solving Skills</h2>
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart outerRadius={90} width={730} height={250} data={problemSolvingSkills}>
                <PolarGrid />
                <PolarAngleAxis dataKey="skill" />
                <PolarRadiusAxis angle={30} domain={[0, 100]} />
                <Radar name="Score" dataKey="score" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                <Legend />
                <Tooltip content={<CustomTooltip />} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        )}

        {activeTab === 'databases' && (
          <div className="h-96">
            <h2 className="text-2xl font-semibold mb-4">Database Skills</h2>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={databaseSkills} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="database" />
                <YAxis domain={[0, 100]} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar dataKey="score" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        {activeTab === 'projects' && (
          <div className="h-96">
            <h2 className="text-2xl font-semibold mb-4">Project Experience</h2>
            <ResponsiveContainer width="100%" height="100%">
              <Treemap
                data={projectExperience}
                dataKey="size"
                aspectRatio={4 / 3}
                stroke="#fff"
                fill="#8884d8"
              >
                <Tooltip content={<CustomTooltip />} />
              </Treemap>
            </ResponsiveContainer>
          </div>
        )}

        {activeTab === 'codequality' && (
          <div className="h-96">
            <h2 className="text-2xl font-semibold mb-4">Code Quality Metrics</h2>
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart outerRadius={90} width={730} height={250} data={codeQualityMetrics}>
                <PolarGrid />
                <PolarAngleAxis dataKey="metric" />
                <PolarRadiusAxis angle={30} domain={[0, 100]} />
                <Radar name="Score" dataKey="score" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                <Legend />
                <Tooltip content={<CustomTooltip />} />
              </RadarChart>
            </ResponsiveContainer>
          </div>)}
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Key Technical Strengths</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Excellent proficiency in JavaScript and React</li>
            <li>Strong problem-solving skills, particularly in algorithm design</li>
            <li>Versatile database knowledge covering both SQL and NoSQL</li>
            <li>High code quality metrics, especially in readability and test coverage</li>
            <li>Valuable experience in machine learning projects</li>
          </ul>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Areas for Improvement</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Enhance C++ skills for better versatility in systems programming</li>
            <li>Improve proficiency in Vue.js to broaden front-end framework expertise</li>
            <li>Strengthen system design skills for more complex architectural challenges</li>
            <li>Deepen knowledge of Elasticsearch for advanced search capabilities</li>
            <li>Focus on improving documentation practices for better code maintainability</li>
          </ul>
        </div>
      </div>

      <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Technical Recommendations</h2>
        <ol className="list-decimal list-inside space-y-2">
          <li>Assign to projects involving JavaScript and React to leverage strong skills</li>
          <li>Encourage participation in system design discussions to improve architectural skills</li>
          <li>Provide opportunities to work on machine learning projects to utilize and expand expertise</li>
          <li>Suggest online courses or workshops to enhance C++ and Vue.js proficiency</li>
          <li>Implement pair programming sessions to share knowledge on code quality best practices</li>
        </ol>
      </div>

      <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Technical Skills Comparison</h2>
        <div className="flex items-center space-x-4 mb-4">
          <select 
            className="p-2 border rounded"
            onChange={(e) => alert(`Comparing ${selectedCandidate}'s technical skills with ${e.target.value}. This feature will be available soon!`)}
          >
            <option value="">Select a candidate to compare</option>
            <option value="Jane Smith">Jane Smith</option>
            <option value="Alex Johnson">Alex Johnson</option>
            <option value="Emily Brown">Emily Brown</option>
          </select>
          <button 
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
            onClick={() => alert("Comparison feature coming soon!")}
          >
            Compare
          </button>
        </div>
        <p className="text-gray-600">Select another candidate to compare technical skills side-by-side.</p>
      </div>

      <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Technical Assessment Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <h3 className="text-lg font-semibold">Assessment Type</h3>
            <p className="text-xl font-bold text-blue-600">Full Stack Developer</p>
          </div>
          <div className="text-center">
            <h3 className="text-lg font-semibold">Completion Time</h3>
            <p className="text-xl font-bold text-green-600">2 hours 15 minutes</p>
          </div>
          <div className="text-center">
            <h3 className="text-lg font-semibold">Overall Percentile</h3>
            <p className="text-xl font-bold text-purple-600">85th</p>
          </div>
        </div>
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Assessment Modules</h3>
          <ul className="list-disc list-inside space-y-1">
            <li>Coding Challenges (JavaScript, Python)</li>
            <li>System Design</li>
            <li>Database Management</li>
            <li>Front-end Development (React)</li>
            <li>API Integration</li>
          </ul>
        </div>
      </div>

      <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Technical Interview Performance</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Strengths Demonstrated</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>Clear communication of technical concepts</li>
              <li>Efficient problem-solving approach</li>
              <li>Strong understanding of JavaScript ecosystem</li>
              <li>Insightful questions about the role and projects</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Areas for Discussion</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>Experience with large-scale distributed systems</li>
              <li>Approach to handling technical debt</li>
              <li>Familiarity with CI/CD practices</li>
              <li>Views on emerging technologies in web development</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center">
        <p className="text-sm text-gray-500">Technical assessment data last updated: {new Date().toLocaleString()}</p>
      </div>

      <div className="fixed bottom-4 right-4 space-x-2">
        <button 
          onClick={fetchData} 
          className="bg-blue-500 text-white p-2 rounded-full shadow-lg hover:bg-blue-600 transition-colors"
          title="Refresh Data"
        >
          🔄 Refresh
        </button>
        <button 
          onClick={() => alert('Generating comprehensive technical report... This feature will be available soon!')} 
          className="bg-green-500 text-white p-2 rounded-full shadow-lg hover:bg-green-600 transition-colors"
          title="Generate Technical Report"
        >
          📊 Full Report
        </button>
      </div>
    </div>
  );
};

export default TechnicalSkillsDashboard;