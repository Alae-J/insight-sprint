
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/Card';
import Badge from '../components/Badge';
import { Calendar, CheckSquare, FileText, Tag } from 'lucide-react';

// Sample data for the dashboard
const recentMeetings = [
  { id: 1, title: 'Weekly Planning', date: '2023-05-01' },
  { id: 2, title: 'Product Review', date: '2023-05-02' },
  { id: 3, title: 'UI/UX Workshop', date: '2023-05-03' },
];

const unreadSummaries = 5;
const pendingTasks = 2;

const topTags = ['UI', 'API', 'Bug'];

const Dashboard = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-text-primary dark:text-white mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Recent Meetings Card */}
        <Card className="col-span-1">
          <CardHeader>
            <div className="flex items-center">
              <Calendar className="mr-2 text-primary-blue" size={20} />
              <CardTitle>Recent Meetings</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {recentMeetings.map(meeting => (
                <li key={meeting.id} className="flex justify-between items-center">
                  <span className="text-text-primary dark:text-white">{meeting.title}</span>
                  <span className="text-sm text-text-secondary dark:text-gray-400">
                    {new Date(meeting.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric'
                    })}
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        
        {/* Unread Summaries Card */}
        <Card className="col-span-1">
          <CardHeader>
            <div className="flex items-center">
              <FileText className="mr-2 text-secondary-teal" size={20} />
              <CardTitle>Unread Summaries</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center h-24">
              <span className="text-4xl font-bold text-primary-blue">{unreadSummaries}</span>
              <span className="text-text-secondary dark:text-gray-400 mt-1">
                Waiting for review
              </span>
            </div>
          </CardContent>
        </Card>
        
        {/* Pending Tasks Card */}
        <Card className="col-span-1">
          <CardHeader>
            <div className="flex items-center">
              <CheckSquare className="mr-2 text-warning-yellow" size={20} />
              <CardTitle>Pending Tasks</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center h-24">
              <span className="text-4xl font-bold text-warning-yellow">{pendingTasks}</span>
              <span className="text-text-secondary dark:text-gray-400 mt-1">
                Due today
              </span>
            </div>
          </CardContent>
        </Card>
        
        {/* Top Tags Card */}
        <Card className="col-span-1">
          <CardHeader>
            <div className="flex items-center">
              <Tag className="mr-2 text-danger-red" size={20} />
              <CardTitle>Top Idea Tags</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2 justify-center">
              {topTags.map(tag => (
                <Badge key={tag} className="text-sm">
                  {tag}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Activity Feed */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="w-9 h-9 rounded-full bg-primary-blue/10 flex items-center justify-center mr-3">
                <Calendar size={16} className="text-primary-blue" />
              </div>
              <div>
                <p className="font-medium text-text-primary dark:text-white">Weekly Planning</p>
                <p className="text-sm text-text-secondary dark:text-gray-400">New meeting created 2 hours ago</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="w-9 h-9 rounded-full bg-secondary-teal/10 flex items-center justify-center mr-3">
                <FileText size={16} className="text-secondary-teal" />
              </div>
              <div>
                <p className="font-medium text-text-primary dark:text-white">Product Review summary</p>
                <p className="text-sm text-text-secondary dark:text-gray-400">Summary generated 5 hours ago</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="w-9 h-9 rounded-full bg-warning-yellow/10 flex items-center justify-center mr-3">
                <CheckSquare size={16} className="text-warning-yellow" />
              </div>
              <div>
                <p className="font-medium text-text-primary dark:text-white">Prepare API documentation</p>
                <p className="text-sm text-text-secondary dark:text-gray-400">Task created yesterday</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
