import React, { useEffect, useState } from 'react';
import Button from '../../components/Button';
import { Card } from '../../components/Card';
import { Edit, Trash, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { api } from '@/service/api/api';
import { ProjectRequest, ProjectResponse } from './Projects.types';

const Projects = () => {
  const [projects, setProjects] = useState<ProjectResponse[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState<Partial<ProjectResponse>>({
    id: 0,
    tenantId: '',
    name: '',
    description: ''
  });

  // Fetch projects on component mount
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projects = await api.get<ProjectResponse[]>('/api/projects/me');
        setProjects(projects);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);

  const openModal = (project: Partial<ProjectResponse> = { id: 0, tenantId: '', name: '', description: '' }) => {
    setCurrentProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setCurrentProject({ id: 0, tenantId: '', name: '', description: '' }); // Clear on close
    setIsModalOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCurrentProject(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { name, description, tenantId } = currentProject;
    const payload: ProjectRequest = { name, description, tenantId };

    if (currentProject.id) {
      // Update existing project
      try {
        const updatedProject = await api.put<ProjectResponse>(`/api/projects/${currentProject.id}`, payload);
        setProjects(prev => prev.map(p => p.id === currentProject.id ? updatedProject : p));
      } catch (error) {
        console.error("Error updating project:", error);
      }
    } else {
      // Add new project
      try {
        const newProject = await api.post<ProjectResponse>('/api/projects', payload);
        setProjects(prev => [...prev, newProject]);
      } catch (error) {
        console.error("Error creating project:", error);
      }
    }

    closeModal();
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await api.delete(`/api/projects/${id}`);
        setProjects(prev => prev.filter(project => project.id !== id));
      } catch (error) {
        console.error("Error deleting project:", error);
      }
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-text-primary dark:text-white">Projects</h1>
        <Button variant="primary" onClick={() => openModal()}>
          <Plus size={18} className="mr-2" /> New Project
        </Button>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="pb-3 pt-2 text-text-secondary dark:text-gray-400 font-medium">Name</th>
                <th className="pb-3 pt-2 text-text-secondary dark:text-gray-400 font-medium">Description</th>
                <th className="pb-3 pt-2 text-text-secondary dark:text-gray-400 font-medium">Created At</th>
                <th className="pb-3 pt-2 text-text-secondary dark:text-gray-400 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700/10">
                  <td className="py-4 pr-4">
                    <Link to={`/projects/${project.id}/meetings`} className="font-medium text-primary-blue hover:underline">
                      {project.name}
                    </Link>
                  </td>
                  <td className="py-4 pr-4 text-text-secondary dark:text-gray-300">{project.description}</td>
                  <td className="py-4 pr-4 text-text-secondary dark:text-gray-300">{new Date(project.createdAt).toLocaleDateString()}</td>
                  <td className="py-4">
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" onClick={() => openModal(project)}>
                        <Edit size={16} />
                      </Button>
                      <Button variant="danger" size="sm" onClick={() => handleDelete(project.id)}>
                        <Trash size={16} />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Modal for adding/editing projects */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4 text-text-primary dark:text-white">{currentProject.id ? 'Edit Project' : 'New Project'}</h2>

              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-text-secondary dark:text-gray-300 mb-1">Project Name</label>
                  <input
                    type="text"
                    name="name"
                    value={currentProject.name || ''}
                    onChange={handleChange}
                    className="border border-gray-300 dark:border-gray-600 rounded p-2 w-full focus:border-primary-blue focus:ring-1 focus:ring-primary-blue dark:bg-gray-700 dark:text-white"
                    required
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-text-secondary dark:text-gray-300 mb-1">Description</label>
                  <textarea
                    name="description"
                    value={currentProject.description || ''}
                    onChange={handleChange}
                    className="border border-gray-300 dark:border-gray-600 rounded p-2 w-full h-24 focus:border-primary-blue focus:ring-1 focus:ring-primary-blue dark:bg-gray-700 dark:text-white"
                    required
                  />
                </div>

                <div className="flex justify-end space-x-2">
                  <Button variant="outline" type="button" onClick={closeModal}>Cancel</Button>
                  <Button variant="primary" type="submit">{currentProject.id ? 'Update' : 'Create'}</Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;
