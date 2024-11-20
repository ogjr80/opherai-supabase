import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FormInput, FormTextarea, FormDialog } from './FormComponents';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Github, Globe, Calendar } from 'lucide-react';

const ProjectsForm = ({ projects, addProject, removeProject, updateProject }) => {
  const [editIndex, setEditIndex] = useState(null);
  const [activeView, setActiveView] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    technologies: [],
    link: '',
    startDate: '',
    endDate: ''
  });

  const handleEdit = (index) => {
    setEditIndex(index);
    setFormData(projects[index]);
  };

  const handleSubmit = () => {
    if (editIndex !== null) {
      Object.entries(formData).forEach(([field, value]) => {
        updateProject(editIndex, field, value);
      });
    } else {
      addProject();
      Object.entries(formData).forEach(([field, value]) => {
        updateProject(projects.length, field, value);
      });
    }
    setEditIndex(null);
    setFormData({
      name: '',
      description: '',
      technologies: [],
      link: '',
      startDate: '',
      endDate: ''
    });
  };

  const handleTechnologyChange = (value) => {
    setFormData({
      ...formData,
      technologies: value.split(',').map(tech => tech.trim()).filter(Boolean)
    });
  };

  const filteredProjects = projects.filter(project =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.technologies.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const formatDuration = (startDate, endDate) => {
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

  const getLinkIcon = (url) => {
    if (!url) return null;
    if (url.includes('github.com')) return Github;
    return Globe;
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-gray-900">Projects</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Search and Controls */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <Globe className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          <FormDialog
            trigger={
              <Button size="lg">
                Add New Project
              </Button>
            }
            title={editIndex !== null ? 'Edit Project' : 'Add New Project'}
            onClose={() => {
              setEditIndex(null);
              setFormData({
                name: '',
                description: '',
                technologies: [],
                link: '',
                startDate: '',
                endDate: ''
              });
            }}
            onSubmit={handleSubmit}
          >
            <div className="space-y-6">
              <FormInput
                label="Project Name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter project name"
              />

              <FormTextarea
                label="Description"
                required
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe your project..."
                rows={4}
              />

              <FormInput
                label="Technologies Used"
                required
                value={formData.technologies.join(', ')}
                onChange={(e) => handleTechnologyChange(e.target.value)}
                placeholder="React, Node.js, MongoDB, etc. (comma-separated)"
              />

              <FormInput
                label="Project Link"
                type="url"
                value={formData.link}
                onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                placeholder="https://..."
              />

              <div className="grid grid-cols-2 gap-4">
                <FormInput
                  type="date"
                  label="Start Date"
                  required
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                />
                <FormInput
                  type="date"
                  label="End Date"
                  required
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                />
              </div>
            </div>
          </FormDialog>
        </div>

        {/* View Toggle */}
        <Tabs value={activeView} onValueChange={setActiveView} className="w-full">
          <TabsList className="grid w-full grid-cols-2 lg:w-[200px]">
            <TabsTrigger value="grid">Grid View</TabsTrigger>
            <TabsTrigger value="table">Table View</TabsTrigger>
          </TabsList>

          <TabsContent value="grid" className="mt-6">
            {filteredProjects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.map((project, index) => {
                  const LinkIcon = getLinkIcon(project.link);
                  return (
                    <Card key={index} className="group relative overflow-hidden">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <h3 className="text-lg font-semibold line-clamp-1">{project.name}</h3>
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEdit(index)}
                              className="mr-1"
                            >
                              Edit
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeProject(index)}
                              className="text-red-600 hover:text-red-900"
                            >
                              Remove
                            </Button>
                          </div>
                        </div>

                        <p className="text-gray-600 mb-4 line-clamp-2">{project.description}</p>

                        <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                          <Calendar className="w-4 h-4" />
                          <span>{formatDuration(project.startDate, project.endDate)}</span>
                        </div>

                        {project.link && (
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-4"
                          >
                            {LinkIcon && <LinkIcon className="w-4 h-4" />}
                            Visit Project
                          </a>
                        )}

                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map((tech, techIndex) => (
                            <Badge
                              key={techIndex}
                              variant="secondary"
                              className="px-2 py-1 text-xs"
                            >
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            ) : (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <p className="text-gray-500">No projects found.</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="table" className="mt-6">
            {filteredProjects.length > 0 ? (
              <div className="overflow-x-auto rounded-lg border border-gray-200">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Project
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Duration
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Technologies
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredProjects.map((project, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="flex flex-col">
                            <span className="font-medium">{project.name}</span>
                            <span className="text-sm text-gray-500 line-clamp-2">
                              {project.description}
                            </span>
                            {project.link && (
                              <a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:text-blue-800 text-sm mt-1"
                              >
                                View Project
                              </a>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900">
                            {formatDuration(project.startDate, project.endDate)}
                          </div>
                          <div className="text-sm text-gray-500">
                            {new Date(project.startDate).toLocaleDateString()} - 
                            {new Date(project.endDate).toLocaleDateString()}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-wrap gap-2">
                            {project.technologies.map((tech, techIndex) => (
                              <Badge
                                key={techIndex}
                                variant="secondary"
                                className="px-2 py-1 text-xs"
                              >
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(index)}
                            className="mr-2"
                          >
                            Edit
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeProject(index)}
                            className="text-red-600 hover:text-red-900"
                          >
                            Remove
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <p className="text-gray-500">No projects found.</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ProjectsForm;