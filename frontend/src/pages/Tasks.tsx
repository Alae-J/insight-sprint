
import React, { useState } from 'react';
import { Card } from '../components/Card';
import Button from '../components/Button';
import Badge from '../components/Badge';
import { ChevronDown, Calendar, PlusSquare } from 'lucide-react';
import { TaskModal, TaskFormData } from '../components/TaskModal';
import { toast } from "sonner";

// Sample data for tasks
const tasksData = [
  {
    id: 1,
    title: 'Implement dark mode toggle',
    project: 'Website Redesign',
    dueDate: '2023-05-10',
    status: 'In Progress',
    isAiGenerated: true,
  },
  {
    id: 2,
    title: 'Set up API authentication',
    project: 'API Integration',
    dueDate: '2023-05-15',
    status: 'Not Started',
    isAiGenerated: false,
  },
  {
    id: 3,
    title: 'Fix mobile menu bug',
    project: 'Mobile App',
    dueDate: '2023-05-05',
    status: 'Completed',
    isAiGenerated: false,
  },
  {
    id: 4,
    title: 'Create user flow diagrams',
    project: 'Mobile App',
    dueDate: '2023-05-12',
    status: 'In Progress',
    isAiGenerated: true,
  },
  {
    id: 5,
    title: 'Write API documentation',
    project: 'API Integration',
    dueDate: '2023-05-20',
    status: 'Not Started',
    isAiGenerated: false,
  },
];

// Filter options
const statusOptions = ['All', 'Not Started', 'In Progress', 'Completed'];

const Tasks = () => {
  const [tasks, setTasks] = useState(tasksData);
  const [statusFilter, setStatusFilter] = useState('All');
  const [dateFilter, setDateFilter] = useState('');
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  
  const handleStatusChange = (status: string) => {
    setStatusFilter(status);
    setIsStatusDropdownOpen(false);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDateFilter(e.target.value);
  };

  const handleApplyFilters = () => {
    let filteredTasks = [...tasksData];
    
    if (statusFilter !== 'All') {
      filteredTasks = filteredTasks.filter(task => task.status === statusFilter);
    }
    
    if (dateFilter) {
      filteredTasks = filteredTasks.filter(task => {
        // Compare dates (ignoring time)
        return new Date(task.dueDate).setHours(0, 0, 0, 0) <= new Date(dateFilter).setHours(0, 0, 0, 0);
      });
    }
    
    setTasks(filteredTasks);
  };

  const resetFilters = () => {
    setStatusFilter('All');
    setDateFilter('');
    setTasks(tasksData);
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'Not Started':
        return 'default';
      case 'In Progress':
        return 'warning';
      case 'Completed':
        return 'success';
      default:
        return 'default';
    }
  };

  const handleCreateTask = (taskData: TaskFormData) => {
    const newTask = {
      id: tasks.length + 1,
      title: taskData.title,
      project: taskData.project ? projects.find(p => p.id === taskData.project)?.name || 'Uncategorized' : 'Uncategorized',
      dueDate: taskData.dueDate ? taskData.dueDate.toISOString().split('T')[0] : '',
      status: 'Not Started',
      isAiGenerated: taskData.isAiGenerated,
    };
    
    const updatedTasks = [newTask, ...tasks];
    setTasks(updatedTasks);
  };

  // Sample project data - in a real app, this would come from an API
  const projects = [
    { id: "1", name: "Website Redesign" },
    { id: "2", name: "API Integration" },
    { id: "3", name: "Mobile App" },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-text-primary dark:text-white">Tasks</h1>
        <Button variant="primary" onClick={() => setIsTaskModalOpen(true)}>
          <PlusSquare size={18} className="mr-2" /> New Task
        </Button>
      </div>
      
      {/* Filters */}
      <Card className="mb-6">
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-4 text-text-primary dark:text-white">Filters</h2>
          
          <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
            {/* Status filter */}
            <div className="relative sm:w-1/3">
              <label className="block text-text-secondary dark:text-gray-400 text-sm mb-1">Status</label>
              <div className="relative">
                <button
                  className="w-full flex items-center justify-between border border-gray-300 dark:border-gray-600 rounded p-2 bg-white dark:bg-gray-700"
                  onClick={() => setIsStatusDropdownOpen(!isStatusDropdownOpen)}
                >
                  <span>{statusFilter}</span>
                  <ChevronDown size={16} />
                </button>
                
                {isStatusDropdownOpen && (
                  <div className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded shadow-lg">
                    {statusOptions.map(status => (
                      <button
                        key={status}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600"
                        onClick={() => handleStatusChange(status)}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            {/* Due date filter */}
            <div className="sm:w-1/3">
              <label className="block text-text-secondary dark:text-gray-400 text-sm mb-1">Due Before</label>
              <div className="relative">
                <input
                  type="date"
                  value={dateFilter}
                  onChange={handleDateChange}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded p-2 dark:bg-gray-700"
                />
              </div>
            </div>
            
            {/* Apply filters */}
            <div className="sm:w-1/3 flex items-end space-x-2">
              <Button variant="secondary" onClick={handleApplyFilters} className="flex-1">
                Apply Filters
              </Button>
              <Button variant="outline" onClick={resetFilters}>
                Reset
              </Button>
            </div>
          </div>
        </div>
      </Card>
      
      {/* Tasks table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="pb-3 pt-2 text-text-secondary dark:text-gray-400 font-medium">Title</th>
                <th className="pb-3 pt-2 text-text-secondary dark:text-gray-400 font-medium">Project</th>
                <th className="pb-3 pt-2 text-text-secondary dark:text-gray-400 font-medium">Due Date</th>
                <th className="pb-3 pt-2 text-text-secondary dark:text-gray-400 font-medium">Status</th>
                <th className="pb-3 pt-2 text-text-secondary dark:text-gray-400 font-medium">AI?</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr 
                  key={task.id}
                  className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700/10"
                >
                  <td className="py-4 pr-4 font-medium text-text-primary dark:text-white">
                    {task.title}
                  </td>
                  <td className="py-4 pr-4 text-text-secondary dark:text-gray-300">
                    {task.project}
                  </td>
                  <td className="py-4 pr-4 text-text-secondary dark:text-gray-300">
                    <div className="flex items-center">
                      <Calendar size={16} className="mr-2" />
                      {new Date(task.dueDate).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="py-4 pr-4">
                    <Badge variant={getStatusBadgeVariant(task.status)}>
                      {task.status}
                    </Badge>
                  </td>
                  <td className="py-4">
                    {task.isAiGenerated && (
                      <div className="rounded-full bg-primary-blue/10 w-7 h-7 flex items-center justify-center text-primary-blue">
                        AI
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {tasks.length === 0 && (
          <div className="text-center py-8">
            <p className="text-text-secondary dark:text-gray-400">No tasks match your filters.</p>
          </div>
        )}
      </Card>

      {/* Task Modal */}
      <TaskModal 
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
        onSubmit={handleCreateTask}
      />

    </div>
  );
};

export default Tasks;
