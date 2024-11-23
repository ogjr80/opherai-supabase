import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FormInput, FormTextarea, FormDialog, TableView } from './FormComponents';
import { Plus, X } from 'lucide-react';

interface Experience {
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
  achievements: string[];
}

interface ExperienceFormProps {
  data: Experience[];
  updateData: (field: string, value: Experience[]) => void;
}

const ExperienceForm = ({ data, updateData }: ExperienceFormProps) => {
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [formData, setFormData] = useState<Experience>({
    company: '',
    position: '',
    startDate: '',
    endDate: '',
    description: '',
    achievements: []
  });

  const handleEdit = (index: number) => {
    setEditIndex(index);
    setFormData(data[index]);
  };

  const handleSubmit = () => {
    const newExperience = [...data];
    if (editIndex !== null) {
      newExperience[editIndex] = formData;
    } else {
      newExperience.push(formData);
    }
    updateData('experience', newExperience);
    setEditIndex(null);
    setFormData({
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      description: '',
      achievements: []
    });
  };

  const handleDelete = (index: number) => {
    const newExperience = data.filter((_, i) => i !== index);
    updateData('experience', newExperience);
  };

  const addAchievement = () => {
    setFormData({
      ...formData,
      achievements: [...formData.achievements, '']
    });
  };

  const updateAchievement = (index: number, value: string) => {
    const newAchievements = [...formData.achievements];
    newAchievements[index] = value;
    setFormData({
      ...formData,
      achievements: newAchievements
    });
  };

  const removeAchievement = (index: number) => {
    setFormData({
      ...formData,
      achievements: formData.achievements.filter((_, i) => i !== index)
    });
  };

  const formatDuration = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const monthDiff = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
    const years = Math.floor(monthDiff / 12);
    const months = monthDiff % 12;
    
    let duration = '';
    if (years > 0) duration += `${years} year${years > 1 ? 's' : ''} `;
    if (months > 0) duration += `${months} month${months > 1 ? 's' : ''}`;
    return duration.trim();
  };

  const tableHeaders = ['Company & Position', 'Duration', 'Description', 'Achievements'];
  const tableRows = data.map(exp => [
    <div key={`${exp.company}-${exp.position}`} className="space-y-1">
      <div className="font-medium">{exp.company}</div>
      <div className="text-sm text-gray-500">{exp.position}</div>
    </div>,
    <div key={`${exp.company}-duration`} className="space-y-1">
      <div className="text-sm">
        {new Date(exp.startDate).toLocaleDateString()} - {new Date(exp.endDate).toLocaleDateString()}
      </div>
      <div className="text-sm text-gray-500">
        {formatDuration(exp.startDate, exp.endDate)}
      </div>
    </div>,
    <div key={`${exp.company}-desc`} className="max-w-md">
      <p className="text-sm line-clamp-2">{exp.description}</p>
    </div>,
    <div key={`${exp.company}-achievements`} className="flex flex-wrap gap-2">
      {exp.achievements.length > 0 ? (
        <Badge variant="secondary" className="text-xs">
          {exp.achievements.length} achievement{exp.achievements.length !== 1 ? 's' : ''}
        </Badge>
      ) : (
        <span className="text-gray-400 text-sm">No achievements added</span>
      )}
    </div>
  ]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-gray-900">Work Experience</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {data.length > 0 ? (
          <TableView
            headers={tableHeaders}
            rows={tableRows}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-gray-500">No work experience added yet.</p>
          </div>
        )}

        <FormDialog
          trigger={
            <Button className="w-full" size="lg">
              {data.length === 0 ? 'Add Experience' : 'Add Another Experience'}
            </Button>
          }
          title={editIndex !== null ? 'Edit Experience' : 'Add New Experience'}
          onClose={() => {
            setEditIndex(null);
            setFormData({
              company: '',
              position: '',
              startDate: '',
              endDate: '',
              description: '',
              achievements: []
            });
          }}
          onSubmit={handleSubmit}
        >
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput
                label="Company"
                required
                error=""
                value={formData.company}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, company: e.target.value })}
                placeholder="Enter company name"
              />
              <FormInput
                label="Position"
                required
                error=""
                value={formData.position}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, position: e.target.value })}
                placeholder="Enter job title"
              />
              <FormInput
                type="date"
                label="Start Date"
                required
                error=""
                value={formData.startDate}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, startDate: e.target.value })}
              />
              <FormInput
                type="date"
                label="End Date"
                required
                error=""
                value={formData.endDate}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, endDate: e.target.value })}
              />
            </div>

            <FormTextarea
              label="Description"
              required
              error=""
              value={formData.description}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe your role and responsibilities..."
              rows={4}
            />

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="text-sm font-medium text-gray-700">Key Achievements</h4>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addAchievement}
                  className="flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add Achievement
                </Button>
              </div>

              {formData.achievements.map((achievement, index) => (
                <div key={index} className="flex gap-2">
                  <FormInput
                    value={achievement}
                    required={false}    
                    error=""
                    label="Achievement"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateAchievement(index, e.target.value)}
                    placeholder="Describe your achievement..."
                    className="flex-1"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeAchievement(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </FormDialog>
      </CardContent>
    </Card>
  );
};

export default ExperienceForm;