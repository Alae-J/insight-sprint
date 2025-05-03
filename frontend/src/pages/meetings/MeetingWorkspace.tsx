import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { User, AlertTriangle, CheckCircle, Brain, X, RefreshCw, Loader } from 'lucide-react';
import { api } from '@/service/api/api';
import { MeetingResponse } from './Meetings.types';
import Button from '@/components/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/Card';

const MeetingWorkspace = () => {
  const { id } = useParams<{ id: string }>();
  const [meeting, setMeeting] = useState<MeetingResponse | null>(null);
  const [notes, setNotes] = useState('');
  const [attendees, setAttendees] = useState<string[]>([]);
  const [actionItems, setActionItems] = useState<{ id: number; text: string; assigned: string }[]>([]);
  const [risks, setRisks] = useState<{ id: number; text: string }[]>([]);
  const [newAttendee, setNewAttendee] = useState('');
  const [activeTab, setActiveTab] = useState<'summary' | 'decision' | 'attendees'>('summary');
  const [isPanelOpen, setIsPanelOpen] = useState(true);
  const [isLoading, setIsLoading] = useState<string | null>(null);

  useEffect(() => {
    const fetchMeeting = async () => {
      try {
        const data = await api.get<MeetingResponse>(`/api/meetings/${id}`);
        setMeeting(data);
        setNotes(data.rawNotesMd ?? '');
        setAttendees(data.attendees.map(a => a.fullName));
        setActionItems(JSON.parse(data.summary?.actionItemsJson || '[]'));
        setRisks(JSON.parse(data.summary?.risksJson || '[]'));
      } catch (err) {
        console.error("Failed to fetch meeting", err);
      }
    };
    if (id) fetchMeeting();
  }, [id]);

  const updateMeeting = async (updates: Partial<MeetingResponse>) => {
    if (!id || !meeting) return;
    const updated = await api.put<MeetingResponse>(`/api/meetings/${id}`, {
      ...meeting,
      ...updates,
    });
    setMeeting(updated);
    setNotes(updated.rawNotesMd ?? '');
    setAttendees(updated.attendees.map(a => a.fullName));
    setActionItems(JSON.parse(updated.summary?.actionItemsJson || '[]'));
    setRisks(JSON.parse(updated.summary?.risksJson || '[]'));
  };

  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNotes(e.target.value);
  };

  const handleAddAttendee = async () => {
    if (!newAttendee.trim()) return;
    setIsLoading('attendees');
    try {
      await updateMeeting({ attendees: [...attendees, { fullName: newAttendee }] } as any);
      setNewAttendee('');
    } catch (err) {
      console.error("Failed to add attendee", err);
    } finally {
      setIsLoading(null);
    }
  };

  const handleRemoveAttendee = async (fullName: string) => {
    setIsLoading('attendees');
    try {
      await updateMeeting({ attendees: attendees.filter(a => a !== fullName).map(name => ({ fullName: name })) } as any);
    } catch (err) {
      console.error("Failed to remove attendee", err);
    } finally {
      setIsLoading(null);
    }
  };

  const regenerateSummary = async () => {
    if (!meeting) return;
    setIsLoading('summary');
    try {
      await updateMeeting({ rawNotesMd: notes });
    } catch (err) {
      console.error("Failed to regenerate summary", err);
    } finally {
      setIsLoading(null);
    }
  };

  const getDecisionSuggestions = async () => {
    setIsLoading('decision');
    try {
      await updateMeeting({ rawNotesMd: notes });
    } catch (err) {
      console.error("Failed to generate suggestions", err);
    } finally {
      setIsLoading(null);
    }
  };

  if (!meeting) return <div className="text-center mt-8">Loading meeting...</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-text-primary dark:text-white">{meeting.title}</h1>
        <Button variant="outline" onClick={() => setIsPanelOpen(prev => !prev)}>
          {isPanelOpen ? <><X size={16} className="mr-2" /> Close Panel</> : <><RefreshCw size={16} className="mr-2" /> Open Panel</>}
        </Button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className={`${isPanelOpen ? 'lg:w-1/2' : 'w-full'}`}>
          <Card>
            <CardHeader><CardTitle>Meeting Notes</CardTitle></CardHeader>
            <CardContent>
              <textarea
                value={notes}
                onChange={handleNotesChange}
                className="w-full h-[calc(100vh-250px)] p-3 border border-gray-300 rounded-lg dark:bg-gray-800 dark:text-white font-mono text-sm"
              />
            </CardContent>
          </Card>
        </div>

        {isPanelOpen && (
          <div className="lg:w-1/2">
            <Card>
              <CardHeader>
                <nav className="flex space-x-4">
                  {['summary', 'decision', 'attendees'].map(tab => (
                    <button
                      key={tab}
                      className={`py-2 border-b-2 ${activeTab === tab ? 'border-primary-blue text-primary-blue' : 'border-transparent text-gray-500'}`}
                      onClick={() => setActiveTab(tab as typeof activeTab)}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  ))}
                </nav>
              </CardHeader>
              <CardContent>
                {activeTab === 'summary' && (
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Summary</h3>
                    {isLoading === 'summary' ? <Loader className="animate-spin" /> : (
                      <>
                        <p className="text-gray-600 dark:text-gray-300">
                          {meeting.summary?.summaryMd || "I'm happy to help! However, I don't see any meeting notes provided."}
                        </p>
                        <div className="mt-4 text-right">
                          <Button variant="secondary" onClick={regenerateSummary}>
                            <RefreshCw className="mr-2" size={16} /> Regenerate
                          </Button>
                        </div>
                      </>
                    )}
                    <div className="mt-6">
                      <h4 className="font-medium mb-2 flex items-center text-text-primary dark:text-white">
                        <CheckCircle className="text-success-green mr-2" size={18} /> Action Items
                      </h4>
                      <ul className="space-y-2">
                        {actionItems.map(item => (
                          <li key={item.id} className="flex justify-between bg-gray-50 dark:bg-gray-700/50 p-2 rounded">
                            <span>{item.text}</span>
                            <span className="text-sm text-gray-500 dark:text-gray-400">{item.assigned}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="mt-6">
                      <h4 className="font-medium mb-2 flex items-center text-text-primary dark:text-white">
                        <AlertTriangle className="text-warning-yellow mr-2" size={18} /> Risks & Concerns
                      </h4>
                      <ul className="space-y-2">
                        {risks.map(risk => (
                          <li key={risk.id} className="bg-gray-50 dark:bg-gray-700/50 p-2 rounded">
                            {risk.text}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
                {activeTab === 'decision' && (
                  <div className="text-center">
                    <p className="text-gray-600 dark:text-gray-300 mb-4">Let AI help decide the next steps.</p>
                    <Button variant="primary" onClick={getDecisionSuggestions} disabled={isLoading === 'decision'}>
                      {isLoading === 'decision' ? <Loader className="animate-spin mr-2" /> : <Brain className="mr-2" />} Suggest
                    </Button>
                  </div>
                )}
                {activeTab === 'attendees' && (
                  <div>
                    <ul className="space-y-2 mb-4">
                      {attendees.map((a, i) => (
                        <li key={i} className="flex justify-between items-center bg-gray-50 dark:bg-gray-700/50 p-2 rounded">
                          <div className="flex items-center">
                            <User size={16} className="mr-2 text-gray-500" />
                            <span>{a}</span>
                          </div>
                          <button onClick={() => handleRemoveAttendee(a)} className="text-gray-400 hover:text-red-500">
                            <X size={16} />
                          </button>
                        </li>
                      ))}
                    </ul>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newAttendee}
                        onChange={e => setNewAttendee(e.target.value)}
                        className="border p-2 rounded flex-grow"
                        placeholder="Add attendee..."
                      />
                      <Button onClick={handleAddAttendee} disabled={isLoading === 'attendees'}>
                        Add
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default MeetingWorkspace;
