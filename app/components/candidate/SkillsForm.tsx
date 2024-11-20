import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FormInput, FormDialog, TableView } from './FormComponents';
import { BarChart, LineChart, TrendingUp, Award } from 'lucide-react';

const skillLevels = [
  { 
    value: 'Beginner',
    icon: LineChart,
    color: 'bg-gray-100 text-gray-900',
    progress: 25
  },
  { 
    value: 'Intermediate',
    icon: BarChart,
    color: 'bg-blue-100 text-blue-900',
    progress: 50 
  },
  { 
    value: 'Advanced',
    icon: TrendingUp,
    color: 'bg-green-100 text-green-900',
    progress: 75
  },
  { 
    value: 'Expert',
    icon: Award,
    color: 'bg-purple-100 text-purple-900',
    progress: 100
  }
];

const SkillsForm = ({ skills, addSkill, removeSkill, updateSkill }) => {
  const [editIndex, setEditIndex] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    level: '',
    yearsOfExperience: ''
  });

  const handleEdit = (index) => {
    setEditIndex(index);
    setFormData(skills[index]);
  };

  const handleSubmit = () => {
    if (editIndex !== null) {
      Object.entries(formData).forEach(([field, value]) => {
        updateSkill(editIndex, field, value);
      });
    } else {
      addSkill();
      Object.entries(formData).forEach(([field, value]) => {
        updateSkill(skills.length, field, value);
      });
    }
    setEditIndex(null);
    setFormData({
      name: '',
      level: '',
      yearsOfExperience: ''
    });
  };

  const tableHeaders = ['Skill', 'Level', 'Years of Experience'];
  const tableRows = skills.map(skill => [
    skill.name,
    <Badge key={`${skill.name}-level`} variant="secondary" className={
      skillLevels.find(l => l.value === skill.level)?.color
    }>
      {skill.level}
    </Badge>,
    `${skill.yearsOfExperience} year${skill.yearsOfExperience !== 1 ? 's' : ''}`
  ]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-gray-900">Skills</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {skills.length > 0 ? (
          <TableView
            headers={tableHeaders}
            rows={tableRows}
            onEdit={handleEdit}
            onDelete={removeSkill}
          />
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-gray-500">No skills added yet.</p>
          </div>
        )}

        <FormDialog
          trigger={
            <Button className="w-full" size="lg">
              {skills.length === 0 ? 'Add Skill' : 'Add Another Skill'}
            </Button>
          }
          title={editIndex !== null ? 'Edit Skill' : 'Add New Skill'}
          onClose={() => {
            setEditIndex(null);
            setFormData({
              name: '',
              level: '',
              yearsOfExperience: ''
            });
          }}
          onSubmit={handleSubmit}
        >
          <div className="space-y-6">
            <FormInput
              label="Skill Name"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter skill name"
            />

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Proficiency Level *
              </label>
              <div className="grid grid-cols-2 gap-3">
                {skillLevels.map(({ value, icon: Icon, color }) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setFormData({ ...formData, level: value })}
                    className={`
                      flex items-center gap-2 p-3 rounded-lg border-2 transition-all
                      ${formData.level === value
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-blue-200"
                      } ${color}
                    `}
                  >
                    <Icon className="w-4 h-4" />
                    {value}
                  </button>
                ))}
              </div>
            </div>

            <FormInput
              type="number"
              label="Years of Experience"
              required
              value={formData.yearsOfExperience}
              onChange={(e) => setFormData({ ...formData, yearsOfExperience: e.target.value })}
              min="0"
              step="0.5"
              placeholder="Enter years of experience"
            />
          </div>
        </FormDialog>
      </CardContent>
    </Card>
  );
};

export default SkillsForm;