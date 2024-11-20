'use client'; 
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid, AreaChart, Area, PieChart, Pie, Cell } from 'recharts';

// Simulated API calls
const fetchPersonalityTraits = () => new Promise(resolve => setTimeout(() => resolve(personalityTraitsData), 500));
const fetchCognitiveAbilities = () => new Promise(resolve => setTimeout(() => resolve(cognitiveAbilitiesData), 500));
const fetchWorkStyles = () => new Promise(resolve => setTimeout(() => resolve(workStylesData), 500));
const fetchEmotionalIntelligence = () => new Promise(resolve => setTimeout(() => resolve(emotionalIntelligenceData), 500));
const fetchTeamDynamics = () => new Promise(resolve => setTimeout(() => resolve(teamDynamicsData), 500));
const fetchLeadershipPotential = () => new Promise(resolve => setTimeout(() => resolve(leadershipPotentialData), 500));

// Mock data
const personalityTraitsData = [
  { trait: 'Openness', score: 80, average: 70 },
  { trait: 'Conscientiousness', score: 75, average: 65 },
  { trait: 'Extraversion', score: 60, average: 55 },
  { trait: 'Agreeableness', score: 85, average: 75 },
  { trait: 'Neuroticism', score: 30, average: 40 },
];

const cognitiveAbilitiesData = [
  { ability: 'Verbal Reasoning', score: 85 },
  { ability: 'Numerical Reasoning', score: 78 },
  { ability: 'Abstract Reasoning', score: 82 },
  { ability: 'Spatial Reasoning', score: 75 },
  { ability: 'Problem Solving', score: 88 },
];

const workStylesData = [
  { style: 'Autonomous', value: 75 },
  { style: 'Collaborative', value: 85 },
  { style: 'Detail-oriented', value: 80 },
  { style: 'Innovative', value: 70 },
  { style: 'Adaptable', value: 90 },
];

const emotionalIntelligenceData = [
  { aspect: 'Self-awareness', score: 85 },
  { aspect: 'Self-regulation', score: 78 },
  { aspect: 'Motivation', score: 90 },
  { aspect: 'Empathy', score: 82 },
  { aspect: 'Social skills', score: 88 },
];

const teamDynamicsData = [
  { role: 'Coordinator', score: 80 },
  { role: 'Shaper', score: 65 },
  { role: 'Plant', score: 75 },
  { role: 'Monitor-Evaluator', score: 85 },
  { role: 'Implementer', score: 70 },
  { role: 'Completer-Finisher', score: 78 },
  { role: 'Team Worker', score: 88 },
  { role: 'Resource Investigator', score: 72 },
];

const leadershipPotentialData = [
  { quality: 'Vision', score: 85 },
  { quality: 'Strategic Thinking', score: 80 },
  { quality: 'Decision Making', score: 78 },
  { quality: 'Communication', score: 88 },
  { quality: 'Integrity', score: 92 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658', '#ff7300'];

const PsychometricAssessmentDashboard = () => {
  const [activeTab, setActiveTab] = useState('personality');
  const [personalityTraits, setPersonalityTraits] = useState([]);
  const [cognitiveAbilities, setCognitiveAbilities] = useState([]);
  const [workStyles, setWorkStyles] = useState([]);
  const [emotionalIntelligence, setEmotionalIntelligence] = useState([]);
  const [teamDynamics, setTeamDynamics] = useState([]);
  const [leadershipPotential, setLeadershipPotential] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCandidate, setSelectedCandidate] = useState('John Doe');

  const aiInsights = useMemo(() => [
    "This candidate's high conscientiousness score suggests they would excel in roles requiring attention to detail and organization.",
    "The combination of high openness and problem-solving abilities indicates strong potential for innovative thinking.",
    "This candidate's emotional intelligence scores suggest they would be an asset in team leadership positions.",
    "The balanced work style preferences show adaptability to various project types and team dynamics.",
    "High scores in empathy and social skills indicate this candidate would excel in client-facing roles."
  ], []);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const [traits, abilities, styles, ei, dynamics, leadership] = await Promise.all([
        fetchPersonalityTraits(),
        fetchCognitiveAbilities(),
        fetchWorkStyles(),
        fetchEmotionalIntelligence(),
        fetchTeamDynamics(),
        fetchLeadershipPotential()
      ]);
      setPersonalityTraits(traits);
      setCognitiveAbilities(abilities);
      setWorkStyles(styles);
      setEmotionalIntelligence(ei);
      setTeamDynamics(dynamics);
      setLeadershipPotential(leadership);
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
    return <div className="text-center py-10">Loading psychometric assessment data...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-blue-600">Candidate Psychometric Assessment Dashboard</h1>
      
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
        <h3 className="text-xl font-semibold mb-2">AI-Driven Assessment Insight</h3>
        <div className="bg-blue-100 p-4 rounded-lg">
          <p className="text-lg font-medium text-blue-800">{aiInsights[Math.floor(Math.random() * aiInsights.length)]}</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex mb-4 space-x-2 overflow-x-auto pb-2">
          {['personality', 'cognitive', 'workstyle', 'emotional', 'team', 'leadership'].map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2 rounded whitespace-nowrap ${activeTab === tab ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {activeTab === 'personality' && (
          <div className="h-96">
            <h2 className="text-2xl font-semibold mb-4">Personality Traits</h2>
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart outerRadius={90} width={730} height={250} data={personalityTraits}>
                <PolarGrid />
                <PolarAngleAxis dataKey="trait" />
                <PolarRadiusAxis angle={30} domain={[0, 100]} />
                <Radar name="Candidate" dataKey="score" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                <Radar name="Average" dataKey="average" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
                <Legend />
                <Tooltip content={<CustomTooltip />} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        )}

        {activeTab === 'cognitive' && (
          <div className="h-96">
            <h2 className="text-2xl font-semibold mb-4">Cognitive Abilities</h2>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={cognitiveAbilities} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" domain={[0, 100]} />
                <YAxis dataKey="ability" type="category" />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar dataKey="score" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        {activeTab === 'workstyle' && (
          <div className="h-96">
            <h2 className="text-2xl font-semibold mb-4">Work Styles</h2>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={workStyles}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {workStyles.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}

        {activeTab === 'emotional' && (
          <div className="h-96">
            <h2 className="text-2xl font-semibold mb-4">Emotional Intelligence</h2>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={emotionalIntelligence}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="aspect" />
                <YAxis domain={[0, 100]} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Area type="monotone" dataKey="score" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}

        {activeTab === 'team' && (
          <div className="h-96">
            <h2 className="text-2xl font-semibold mb-4">Team Dynamics Roles</h2>
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart outerRadius={90} width={730} height={250} data={teamDynamics}>
                <PolarGrid />
                <PolarAngleAxis dataKey="role" />
                <PolarRadiusAxis angle={30} domain={[0, 100]} />
                <Radar name="Score" dataKey="score" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                <Legend />
                <Tooltip content={<CustomTooltip />} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        )}

        {activeTab === 'leadership' && (
          <div className="h-96">
            <h2 className="text-2xl font-semibold mb-4">Leadership Potential</h2>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={leadershipPotential} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="quality" />
                <YAxis domain={[0, 100]} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar dataKey="score" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Key Strengths</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>High conscientiousness indicates strong work ethic</li>
            <li>Excellent problem-solving skills</li>
            <li>Strong emotional intelligence, particularly in empathy</li>
            <li>Adaptable work style suited for dynamic environments</li>
            <li>Natural leadership qualities in vision and communication</li>
          </ul>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Development Areas</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Potential for increased assertiveness in team settings</li>
            <li>Opportunity to enhance numerical reasoning skills</li>
            <li>Could benefit from stress management techniques</li>
            <li>Scope to improve strategic thinking for leadership roles</li>
            <li>Potential to develop more innovative approaches to problem-solving</li>
          </ul>
        </div>
      </div>

      <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Recommendations</h2>
        <ol className="list-decimal list-inside space-y-2">
          <li>Consider roles that require high attention to detail and organizational skills.</li>
          <li>Provide opportunities for collaborative projects to leverage strong teamwork abilities.</li>
          <li>Offer mentoring responsibilities to nurture leadership potential.</li>
          <li>Encourage participation in creative problem-solving workshops to enhance innovation.</li>
          <li>Consider additional training in data analysis to complement strong verbal reasoning skills.</li>
        </ol>
      </div>

      <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Candidate Comparison</h2>
        <div className="flex items-center space-x-4 mb-4">
          <select 
            className="p-2 border rounded"
            onChange={(e) => alert(`Comparing ${selectedCandidate} with ${e.target.value}. This feature will be available soon!`)}
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
        <p className="text-gray-600">Select another candidate to compare psychometric profiles side-by-side.</p>
      </div>

      <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Assessment Validity</h2>
        <div className="flex items-center justify-between">
          <div className="text-center">
            <h3 className="text-lg font-semibold">Consistency Score</h3>
            <p className="text-3xl font-bold text-green-600">92%</p>
          </div>
          <div className="text-center">
            <h3 className="text-lg font-semibold">Completion Time</h3>
            <p className="text-3xl font-bold text-blue-600">45 min</p>
          </div>
          <div className="text-center">
            <h3 className="text-lg font-semibold">Response Pattern</h3>
            <p className="text-3xl font-bold text-purple-600">Normal</p>
          </div>
        </div>
        <p className="mt-4 text-gray-600">These metrics help ensure the reliability and validity of the assessment results.</p>
      </div>

      <div className="mt-8 text-center">
        <p className="text-sm text-gray-500">Assessment data last updated: {new Date().toLocaleString()}</p>
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
          onClick={() => alert('Generating detailed report... This feature will be available soon!')} 
          className="bg-green-500 text-white p-2 rounded-full shadow-lg hover:bg-green-600 transition-colors"
          title="Generate Report"
        >
          📊 Full Report
        </button>
      </div>
    </div>
  );
};

export default PsychometricAssessmentDashboard;