
import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Button from '../components/Button';
import { Card, CardHeader, CardTitle, CardContent } from '../components/Card';
import { Calendar, Clock, User, ArrowRight, Plus, ChevronRight } from 'lucide-react';
import Input from '../components/Input';

// Sample data for meetings
const projectsData = {
  1: { id: 1, name: 'Website Redesign' },
  2: { id: 2, name: 'Mobile App' },
  3: { id: 3, name: 'API Integration' },
};

const meetingsData = {
  1: [
    {
      id: 101,
      title: 'Initial Design Review',
      date: '2023-05-01T10:00:00',
      author: 'John Smith',
      attendees: ['John Smith', 'Alice Johnson', 'Mike Brown'],
    },
    {
      id: 102,
      title: 'User Testing Planning',
      date: '2023-05-03T14:30:00',
      author: 'Alice Johnson',
      attendees: ['John Smith', 'Alice Johnson', 'Sarah Williams'],
    },
  ],
  2: [
    {
      id: 201,
      title: 'App Architecture',
      date: '2023-05-02T11:00:00',
      author: 'Mike Brown',
      attendees: ['Mike Brown', 'Sarah Williams'],
    },
  ],
  3: [
    {
      id: 301,
      title: 'API Requirements',
      date: '2023-05-04T09:30:00',
      author: 'Sarah Williams',
      attendees: ['Sarah Williams', 'John Smith'],
    },
  ],
};

const MeetingsList = () => {
  const { id } = useParams<{ id: string }>();
  const projectId = id ? parseInt(id) : 1;  // Default to project 1 if no id
  const project = projectsData[projectId as keyof typeof projectsData];
  const meetings = meetingsData[projectId as keyof typeof meetingsData] || [];
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newMeeting, setNewMeeting] = useState({
    title: '',
    date: '',
    time: '',
  });

  const openModal = () => {
    setIsModalOpen(true);
    // Set default date to today
    const today = new Date().toISOString().split('T')[0];
    setNewMeeting({
      title: '',
      date: today,
      time: '10:00',
    });
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewMeeting(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would add the meeting to the database
    console.log('New meeting:', {
      ...newMeeting,
      projectId,
    });
    closeModal();
  };

  return (
    <div>
      <div className="mb-6">
        <div className="flex items-center text-sm text-text-secondary dark:text-gray-400 mb-4">
          <Link to="/projects" className="hover:text-primary-blue">
            Projects
          </Link>
          <ChevronRight size={16} className="mx-1" />
          <span className="text-text-primary dark:text-white">{project?.name}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-text-primary dark:text-white">Meetings</h1>
          <Button variant="primary" onClick={openModal}>
            <Plus size={18} className="mr-2" /> New Meeting
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {meetings.map((meeting) => (
          <Card key={meeting.id}>
            <CardHeader>
              <CardTitle>{meeting.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center text-text-secondary dark:text-gray-300">
                  <Calendar size={18} className="mr-2" />
                  <span>
                    {new Date(meeting.date).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </span>
                </div>
                
                <div className="flex items-center text-text-secondary dark:text-gray-300">
                  <Clock size={18} className="mr-2" />
                  <span>
                    {new Date(meeting.date).toLocaleTimeString('en-US', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>
                
                <div className="flex items-center text-text-secondary dark:text-gray-300">
                  <User size={18} className="mr-2" />
                  <span>Created by {meeting.author}</span>
                </div>
                
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex -space-x-2">
                    {meeting.attendees.slice(0, 3).map((attendee, i) => (
                      <div 
                        key={i} 
                        className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-600 border-2 border-white dark:border-gray-800 flex items-center justify-center overflow-hidden"
                        title={attendee}
                      >
                        {attendee.charAt(0)}
                      </div>
                    ))}
                    {meeting.attendees.length > 3 && (
                      <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 border-2 border-white dark:border-gray-800 flex items-center justify-center text-xs">
                        +{meeting.attendees.length - 3}
                      </div>
                    )}
                  </div>
                  
                  <Link 
                    to={`/meetings/${meeting.id}`}
                    className="flex items-center text-primary-blue hover:underline"
                  >
                    <span className="mr-1">Open</span>
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {meetings.length === 0 && (
          <div className="col-span-2 text-center py-12">
            <p className="text-text-secondary dark:text-gray-400">No meetings yet. Create your first meeting.</p>
          </div>
        )}
      </div>
      
      {/* Modal for adding new meeting */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4 text-text-primary dark:text-white">
                New Meeting
              </h2>
              
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-text-secondary dark:text-gray-300 mb-1">Meeting Title</label>
                  <input
                    type="text"
                    name="title"
                    value={newMeeting.title}
                    onChange={handleChange}
                    className="border border-gray-300 dark:border-gray-600 rounded p-2 w-full focus:border-primary-blue focus:ring-1 focus:ring-primary-blue dark:bg-gray-700 dark:text-white"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-text-secondary dark:text-gray-300 mb-1">Date</label>
                    <input
                      type="date"
                      name="date"
                      value={newMeeting.date}
                      onChange={handleChange}
                      className="border border-gray-300 dark:border-gray-600 rounded p-2 w-full focus:border-primary-blue focus:ring-1 focus:ring-primary-blue dark:bg-gray-700 dark:text-white"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-text-secondary dark:text-gray-300 mb-1">Time</label>
                    <input
                      type="time"
                      name="time"
                      value={newMeeting.time}
                      onChange={handleChange}
                      className="border border-gray-300 dark:border-gray-600 rounded p-2 w-full focus:border-primary-blue focus:ring-1 focus:ring-primary-blue dark:bg-gray-700 dark:text-white"
                      required
                    />
                  </div>
                </div>
                
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" type="button" onClick={closeModal}>
                    Cancel
                  </Button>
                  <Button variant="primary" type="submit">
                    Create Meeting
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MeetingsList;
