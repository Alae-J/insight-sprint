import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from '../components/Card';
import Button from '../components/Button';
import { Tabs } from '@radix-ui/react-tabs';
import { User, AlertTriangle, CheckCircle, Brain, X, RefreshCw, Loader } from 'lucide-react';

// Sample meeting data
const meetingsData = {
  101: {
    id: 101,
    title: 'Initial Design Review',
    notes: `# Initial Design Review Meeting
## Agenda
- Review latest mockups
- Discuss user feedback
- Plan next iteration

## Key Discussion Points
- Homepage needs more contrast
- Mobile navigation is confusing for users
- Search functionality needs to be more prominent

## Action Items
- Redesign mobile navigation (Sarah)
- Increase contrast on homepage buttons (Mike)
- Add search bar to header (John)`,
    summary: `The team reviewed the latest design mockups and discussed user feedback. Main concerns were around contrast issues on the homepage, confusing mobile navigation, and hard-to-find search functionality.`,
    actionItems: [
      { id: 1, text: 'Redesign mobile navigation', assigned: 'Sarah' },
      { id: 2, text: 'Increase contrast on homepage buttons', assigned: 'Mike' },
      { id: 3, text: 'Add search bar to header', assigned: 'John' },
    ],
    risks: [
      { id: 1, text: 'Timeline might slip if redesigns require major changes' },
      { id: 2, text: 'User testing needed to validate new navigation' },
    ],
    attendees: ['John Smith', 'Alice Johnson', 'Mike Brown', 'Sarah Williams'],
    date: '2023-05-01T10:00:00',
    projectId: 1
  },
  102: {
    id: 102,
    title: 'User Testing Planning',
    notes: `# User Testing Planning
## Participants
- Need 5-8 testers
- Mix of new and returning users

## Test Scenarios
- Homepage navigation
- Checkout flow
- Account creation

## Timeline
- Testing: May 10-15
- Analysis: May 16-18
- Report: May 19`,
    summary: `The team discussed the upcoming user testing sessions. We'll need 5-8 participants with a mix of new and returning users. Testing will focus on homepage navigation, checkout flow, and account creation.`,
    actionItems: [
      { id: 1, text: 'Recruit test participants', assigned: 'Alice' },
      { id: 2, text: 'Prepare test scenarios', assigned: 'John' },
    ],
    risks: [
      { id: 1, text: 'Might be difficult to find enough testers on short notice' },
      { id: 2, text: 'Tech setup for remote testing could have issues' },
    ],
    attendees: ['John Smith', 'Alice Johnson', 'Sarah Williams'],
    date: '2023-05-03T14:30:00',
  },
  201: {
    id: 201,
    title: 'App Architecture',
    notes: `# App Architecture Meeting
## Stack
- React Native
- GraphQL
- Node.js backend

## Key Components
- Authentication flow
- Data synchronization
- Offline mode strategy

## Timeline
- Architecture finalization: 2 weeks
- Core components: 4 weeks
- MVP: 3 months`,
    summary: `The team discussed the architecture for the new mobile app. We decided on React Native for cross-platform support, with GraphQL for data fetching and a Node.js backend. We prioritized authentication flow, data sync, and offline capabilities.`,
    actionItems: [
      { id: 1, text: 'Create architecture diagram', assigned: 'Mike' },
      { id: 2, text: 'Set up project repository', assigned: 'Sarah' },
      { id: 3, text: 'Research offline storage options', assigned: 'Mike' },
    ],
    risks: [
      { id: 1, text: 'Team has limited React Native experience' },
      { id: 2, text: 'Offline sync might be more complex than estimated' },
    ],
    attendees: ['Mike Brown', 'Sarah Williams'],
    date: '2023-05-02T11:00:00',
  },
};

const MeetingWorkspace = () => {
  const { id } = useParams<{ id: string }>();
  const meetingId = id ? parseInt(id) : 101;  // Default to meeting 101 if no id
  const meeting = meetingsData[meetingId as keyof typeof meetingsData];
  
  const [activeTab, setActiveTab] = useState('summary');
  const [notes, setNotes] = useState(meeting?.notes || '');
  const [attendees, setAttendees] = useState(meeting?.attendees || []);
  const [newAttendee, setNewAttendee] = useState('');
  const [isPanelOpen, setIsPanelOpen] = useState(true);
  const [isLoading, setIsLoading] = useState<string | null>(null);
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNotes(e.target.value);
  };

  const handleAddAttendee = async () => {
    if (newAttendee.trim() !== '') {
      setIsLoading('attendees');
      
      try {
        // Simulate API call: POST /api/meetings/:id/attendees
        // In a real app: await fetch(`/api/meetings/${meetingId}/attendees`, { method: 'POST', body: JSON.stringify({ name: newAttendee }) })
        await new Promise(resolve => setTimeout(resolve, 500));
        
        setAttendees([...attendees, newAttendee]);
        setNewAttendee('');
      } catch (error) {
        console.error("Failed to add attendee:", error);
      } finally {
        setIsLoading(null);
      }
    }
  };

  const handleRemoveAttendee = async (index: number) => {
    setIsLoading('attendees');
    
    try {
      // Simulate API call: DELETE /api/meetings/:id/attendees/:attendeeId
      // In a real app: await fetch(`/api/meetings/${meetingId}/attendees/${attendeeId}`, { method: 'DELETE' })
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setAttendees(attendees.filter((_, i) => i !== index));
    } catch (error) {
      console.error("Failed to remove attendee:", error);
    } finally {
      setIsLoading(null);
    }
  };

  const regenerateSummary = async () => {
    setIsLoading('summary');
    
    try {
      // Simulate API call: POST /api/meetings/:id/summaries
      // In a real app: await fetch(`/api/meetings/${meetingId}/summaries`, { method: 'POST', body: JSON.stringify({ notes }) })
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Regenerating summary based on notes:', notes);
      // In a real app, you would update the summary with the response data
    } catch (error) {
      console.error("Failed to regenerate summary:", error);
    } finally {
      setIsLoading(null);
    }
  };

  const getDecisionSuggestions = async () => {
    setIsLoading('decision');
    
    try {
      // Simulate API call: POST /api/projects/:id/ai-next-step
      // In a real app: await fetch(`/api/projects/${meeting.projectId}/ai-next-step`, { method: 'POST', body: JSON.stringify({ notes }) })
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Getting decision suggestions based on notes:', notes);
      // In a real app, you would update the suggestions with the response data
    } catch (error) {
      console.error("Failed to get decision suggestions:", error);
    } finally {
      setIsLoading(null);
    }
  };

  const togglePanel = () => {
    setIsPanelOpen(!isPanelOpen);
  };

  if (!meeting) {
    return <div>Meeting not found</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-text-primary dark:text-white flex justify-between items-center">
        <span>{meeting.title}</span>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={togglePanel}
          aria-label={isPanelOpen ? "Close panel" : "Open panel"}
        >
          {isPanelOpen ? (
            <span className="flex items-center">
              <X size={16} className="mr-2" /> Close Panel
            </span>
          ) : (
            <span className="flex items-center">
              <RefreshCw size={16} className="mr-2" /> Open Panel
            </span>
          )}
        </Button>
      </h1>
      
      <div className={`flex flex-col lg:flex-row gap-6 transition-all duration-300 ${isPanelOpen ? '' : 'panel-closed'}`}>
        {/* Left panel - Markdown Editor */}
        <div className={`${isPanelOpen ? 'lg:w-1/2' : 'w-full'} transition-all duration-300`}>
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Meeting Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <textarea
                className="w-full h-[calc(100vh-250px)] p-4 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:border-primary-blue dark:bg-gray-800 dark:text-white font-mono text-sm"
                value={notes}
                onChange={handleNotesChange}
                placeholder="Type your meeting notes here using Markdown..."
              />
            </CardContent>
          </Card>
        </div>
        
        {/* Right panel - Tabbed Interface */}
        {isPanelOpen && (
          <div className="lg:w-1/2 transition-all duration-300">
            <Card className="h-full">
              <div className="border-b border-gray-200 dark:border-gray-700">
                <nav className="flex -mb-px">
                  <button
                    className={`py-4 px-6 border-b-2 font-medium ${
                      activeTab === 'summary'
                        ? 'border-primary-blue text-primary-blue'
                        : 'border-transparent text-text-secondary hover:text-text-primary hover:border-gray-300'
                    } focus:outline-none focus:ring-2 focus:ring-primary-blue focus:ring-offset-2`}
                    onClick={() => handleTabChange('summary')}
                  >
                    Summary
                  </button>
                  <button
                    className={`py-4 px-6 border-b-2 font-medium ${
                      activeTab === 'decision'
                        ? 'border-primary-blue text-primary-blue'
                        : 'border-transparent text-text-secondary hover:text-text-primary hover:border-gray-300'
                    } focus:outline-none focus:ring-2 focus:ring-primary-blue focus:ring-offset-2`}
                    onClick={() => handleTabChange('decision')}
                  >
                    Decision Assistant
                  </button>
                  <button
                    className={`py-4 px-6 border-b-2 font-medium ${
                      activeTab === 'attendees'
                        ? 'border-primary-blue text-primary-blue'
                        : 'border-transparent text-text-secondary hover:text-text-primary hover:border-gray-300'
                    } focus:outline-none focus:ring-2 focus:ring-primary-blue focus:ring-offset-2`}
                    onClick={() => handleTabChange('attendees')}
                  >
                    Attendees
                  </button>
                </nav>
              </div>
              
              <div className="p-6 h-[calc(100vh-290px)] overflow-y-auto">
                {/* Summary Tab */}
                {activeTab === 'summary' && (
                  <div>
                    <div className="mb-6">
                      <h3 className="text-lg font-medium mb-2 text-text-primary dark:text-white">Meeting Summary</h3>
                      {isLoading === 'summary' ? (
                        <div className="flex justify-center items-center py-8">
                          <Loader className="animate-spin h-6 w-6 text-primary-blue" />
                          <span className="ml-2 text-text-secondary">Generating summary...</span>
                        </div>
                      ) : (
                        <>
                          <p className="text-text-secondary dark:text-gray-300">{meeting.summary}</p>
                          
                          <div className="mt-4 flex justify-end">
                            <Button variant="secondary" onClick={regenerateSummary}>
                              <RefreshCw size={16} className="mr-2" /> Regenerate
                            </Button>
                          </div>
                        </>
                      )}
                    </div>
                    
                    <div className="mb-6">
                      <h3 className="text-lg font-medium mb-2 text-text-primary dark:text-white flex items-center">
                        <CheckCircle size={18} className="mr-2 text-success-green" />
                        Action Items
                      </h3>
                      <ul className="space-y-2">
                        {meeting.actionItems.map(item => (
                          <li key={item.id} className="flex items-center bg-gray-50 dark:bg-gray-700/50 p-2 rounded">
                            <CheckCircle size={16} className="mr-2 text-success-green" />
                            <span>{item.text}</span>
                            {item.assigned && (
                              <span className="ml-auto text-sm text-text-secondary dark:text-gray-400">
                                {item.assigned}
                              </span>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-2 text-text-primary dark:text-white flex items-center">
                        <AlertTriangle size={18} className="mr-2 text-warning-yellow" />
                        Risks & Concerns
                      </h3>
                      <ul className="space-y-2">
                        {meeting.risks.map(risk => (
                          <li key={risk.id} className="flex items-start bg-gray-50 dark:bg-gray-700/50 p-2 rounded">
                            <AlertTriangle size={16} className="mr-2 text-warning-yellow mt-0.5" />
                            <span>{risk.text}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
                
                {/* Decision Assistant Tab */}
                {activeTab === 'decision' && (
                  <div>
                    {isLoading === 'decision' ? (
                      <div className="flex flex-col items-center justify-center py-12">
                        <Loader className="animate-spin h-8 w-8 text-primary-blue mb-4" />
                        <p className="text-text-secondary dark:text-gray-300">
                          Analyzing your meeting notes and generating suggestions...
                        </p>
                      </div>
                    ) : (
                      <>
                        <div className="text-center mb-8">
                          <p className="text-text-secondary dark:text-gray-300 mb-4">
                            Not sure what to do next? Let AI help you make decisions based on your meeting notes.
                          </p>
                          <Button variant="primary" onClick={getDecisionSuggestions} className="focus:ring-2 focus:ring-offset-2 focus:ring-primary-blue">
                            <Brain size={18} className="mr-2" /> What should we do next?
                          </Button>
                        </div>
                        
                        <div className="space-y-4">
                          <Card className="border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
                            <CardContent className="p-4">
                              <div className="flex items-start">
                                <div className="w-10 h-10 rounded-full bg-primary-blue/10 flex items-center justify-center mr-3">
                                  <Brain size={20} className="text-primary-blue" />
                                </div>
                                <div>
                                  <h4 className="font-medium text-text-primary dark:text-white mb-1">
                                    Schedule a follow-up design review
                                  </h4>
                                  <p className="text-text-secondary dark:text-gray-300">
                                    Based on the discussion around contrast issues and navigation problems, it would be 
                                    beneficial to schedule another design review in 1-2 weeks after the changes have been implemented.
                                  </p>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                          
                          <Card className="border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
                            <CardContent className="p-4">
                              <div className="flex items-start">
                                <div className="w-10 h-10 rounded-full bg-primary-blue/10 flex items-center justify-center mr-3">
                                  <Brain size={20} className="text-primary-blue" />
                                </div>
                                <div>
                                  <h4 className="font-medium text-text-primary dark:text-white mb-1">
                                    Organize user testing for navigation changes
                                  </h4>
                                  <p className="text-text-secondary dark:text-gray-300">
                                    Since mobile navigation was identified as confusing, consider organizing a small user 
                                    testing session specifically focused on the new navigation design before finalizing it.
                                  </p>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      </>
                    )}
                  </div>
                )}
                
                {/* Attendees Tab */}
                {activeTab === 'attendees' && (
                  <div>
                    <h3 className="text-lg font-medium mb-4 text-text-primary dark:text-white">Meeting Participants</h3>
                    
                    {isLoading === 'attendees' ? (
                      <div className="flex justify-center items-center py-4">
                        <Loader className="animate-spin h-5 w-5 text-primary-blue" />
                        <span className="ml-2 text-text-secondary">Updating attendees...</span>
                      </div>
                    ) : (
                      <ul className="space-y-2 mb-6">
                        {attendees.map((attendee, index) => (
                          <li 
                            key={index}
                            className="flex items-center justify-between bg-gray-50 dark:bg-gray-700/50 p-2 rounded"
                          >
                            <div className="flex items-center">
                              <User size={16} className="mr-2 text-text-secondary" />
                              <span>{attendee}</span>
                            </div>
                            <button 
                              className="text-gray-400 hover:text-danger-red focus:outline-none focus:ring-2 focus:ring-danger-red rounded"
                              onClick={() => handleRemoveAttendee(index)}
                              aria-label={`Remove ${attendee}`}
                            >
                              <X size={16} />
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                    
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newAttendee}
                        onChange={e => setNewAttendee(e.target.value)}
                        placeholder="Add attendee..."
                        className="border border-gray-300 dark:border-gray-700 rounded p-2 flex-grow focus:outline-none focus:border-primary-blue focus:ring-1 focus:ring-primary-blue dark:bg-gray-800 dark:text-white"
                        aria-label="New attendee name"
                      />
                      <Button 
                        variant="secondary" 
                        onClick={handleAddAttendee}
                        disabled={isLoading === 'attendees'}
                        className="focus:ring-2 focus:ring-offset-2 focus:ring-secondary-teal"
                      >
                        Add
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </div>
        )}
      </div>

      <style jsx>{`
        .panel-closed .left-panel {
          width: 100%;
        }
        
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        @keyframes slideOut {
          from {
            transform: translateX(0);
            opacity: 1;
          }
          to {
            transform: translateX(100%);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default MeetingWorkspace;