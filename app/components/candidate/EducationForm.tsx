'use client';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { FormInput, FormDialog, TableView } from './FormComponents';
interface Education {
    institution: string;
    degree: string;
    fieldOfStudy: string;
    startDate: string;
    endDate: string;
    grade?: string;
  }
  
  interface EducationFormProps {
    education: Education[];
    addEducation: () => void;
    removeEducation: (index: number) => void;
    updateEducation: (index: number, field: string, value: string) => void;
  }
const EducationForm = ({ 
    education, 
    addEducation, 
    removeEducation, 
    updateEducation }: EducationFormProps) => {
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [formData, setFormData] = useState<Education>({
    institution: '',
    degree: '',
    fieldOfStudy: '',
    startDate: '',
    endDate: '',
    grade: ''
  });
  
  const handleEdit = (index: number) => {
    setEditIndex(index);
    setFormData(education[index]);
  };

  const handleSubmit = () => {
    if (editIndex !== null) {
      Object.entries(formData).forEach(([field, value]) => {
        updateEducation(editIndex, field, value);
      });
    } else {
      addEducation();
      Object.entries(formData).forEach(([field, value]) => {
        updateEducation(education.length, field, value);
      });
    }
    setEditIndex(null);
    setFormData({
      institution: '',
      degree: '',
      fieldOfStudy: '',
      startDate: '',
      endDate: '',
      grade: ''
    });
  };

  const tableHeaders = ['Institution', 'Degree', 'Field of Study', 'Duration', 'Grade'];
  const tableRows = education.map(edu => [
    edu.institution,
    edu.degree,
    edu.fieldOfStudy,
    `${new Date(edu.startDate).toLocaleDateString()} - ${new Date(edu.endDate).toLocaleDateString()}`,
    edu.grade || '-'
  ]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-gray-900">Education History</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {education.length > 0 ? (
          <TableView
            headers={tableHeaders}
            rows={tableRows}
            onEdit={handleEdit}
            onDelete={removeEducation}
          />
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-gray-500">No education history added yet.</p>
          </div>
        )}

        <FormDialog
          trigger={
            <Button className="w-full" size="lg">
              {education.length === 0 ? 'Add Education' : 'Add Another Education'}
            </Button>
          }
          title={editIndex !== null ? 'Edit Education' : 'Add New Education'}
          onClose={() => {
            setEditIndex(null);
            setFormData({
              institution: '',
              degree: '',
              fieldOfStudy: '',
              startDate: '',
              endDate: '',
              grade: ''
            });
          }}
          onSubmit={handleSubmit}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput
              label="Institution"
              required
              error=""
              value={formData.institution}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                setFormData({ ...formData, institution: e.target.value })}
              placeholder="Enter institution name"
            />
            <FormInput
              label="Degree"
              required
              error=""
              value={formData.degree}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                setFormData({ ...formData, degree: e.target.value })}
              placeholder="Enter degree name"
            />
            <FormInput
              label="Field of Study"
              required
              error=""
              value={formData.fieldOfStudy}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                setFormData({ ...formData, fieldOfStudy: e.target.value })}
              placeholder="Enter field of study"
            />
            <FormInput
              label="Grade"
              error=""
              required={false}
              value={formData.grade}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                setFormData({ ...formData, grade: e.target.value })}
              placeholder="Enter grade (optional)"
            />
            <FormInput
              type="date"
              label="Start Date"
              required
              error=""
              value={formData.startDate}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                setFormData({ ...formData, startDate: e.target.value })}
            />
            <FormInput
              type="date"
              label="End Date"
              required
              error=""
              value={formData.endDate}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                setFormData({ ...formData, endDate: e.target.value })}
            />
          </div>
        </FormDialog>
      </CardContent>
    </Card>
  );
};

export default EducationForm;