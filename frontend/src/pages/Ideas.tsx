
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../components/Card';
import Button from '../components/Button';
import Badge from '../components/Badge';
import { Calendar, Plus, X, Edit } from 'lucide-react';

// Sample data for ideas
const ideasData = [
  {
    id: 1,
    text: 'Implement a dark mode toggle that remembers user preference using localStorage',
    tags: ['UI', 'Feature'],
    createdAt: '2023-04-30',
  },
  {
    id: 2,
    text: 'Add a notification system for when tasks are assigned or completed',
    tags: ['API', 'Feature'],
    createdAt: '2023-05-01',
  },
  {
    id: 3,
    text: 'Fix mobile menu not closing when clicking outside',
    tags: ['Bug', 'Mobile'],
    createdAt: '2023-05-02',
  },
];

// All available tags for selection
const availableTags = ['UI', 'API', 'Bug', 'Feature', 'Mobile', 'Performance', 'Security', 'UX', 'Testing'];

const Ideas = () => {
  const [ideas, setIdeas] = useState(ideasData);
  const [newIdea, setNewIdea] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isEditing, setIsEditing] = useState<number | null>(null);

  const handleAddIdea = () => {
    if (newIdea.trim() === '') return;
    
    const idea = {
      id: Date.now(),
      text: newIdea,
      tags: selectedTags,
      createdAt: new Date().toISOString().split('T')[0],
    };
    
    setIdeas([idea, ...ideas]);
    setNewIdea('');
    setSelectedTags([]);
  };

  const handleDeleteIdea = (id: number) => {
    setIdeas(ideas.filter(idea => idea.id !== id));
  };

  const handleEditIdea = (id: number) => {
    const idea = ideas.find(idea => idea.id === id);
    if (idea) {
      setIsEditing(id);
      setNewIdea(idea.text);
      setSelectedTags([...idea.tags]);
    }
  };

  const handleUpdateIdea = () => {
    if (!isEditing || newIdea.trim() === '') return;
    
    const updatedIdeas = ideas.map(idea => 
      idea.id === isEditing 
        ? { ...idea, text: newIdea, tags: selectedTags } 
        : idea
    );
    
    setIdeas(updatedIdeas);
    setNewIdea('');
    setSelectedTags([]);
    setIsEditing(null);
  };

  const handleCancelEdit = () => {
    setIsEditing(null);
    setNewIdea('');
    setSelectedTags([]);
  };

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-text-primary dark:text-white">Ideas</h1>
      
      {/* Add Idea Form */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Add a new idea</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <textarea
              value={newIdea}
              onChange={(e) => setNewIdea(e.target.value)}
              placeholder="What's your idea? Be as detailed as possible..."
              className="w-full h-32 p-3 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:border-primary-blue dark:bg-gray-800 dark:text-white"
            />
            
            <div>
              <label className="block text-text-secondary dark:text-gray-400 mb-2">Tags:</label>
              <div className="flex flex-wrap gap-2">
                {availableTags.map(tag => (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`px-3 py-1 rounded-full text-sm ${
                      selectedTags.includes(tag)
                        ? 'bg-secondary-teal text-white'
                        : 'bg-gray-200 dark:bg-gray-700 text-text-secondary dark:text-gray-300'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          {isEditing ? (
            <div className="space-x-2">
              <Button variant="outline" onClick={handleCancelEdit}>
                Cancel
              </Button>
              <Button variant="primary" onClick={handleUpdateIdea}>
                Update Idea
              </Button>
            </div>
          ) : (
            <Button variant="primary" onClick={handleAddIdea}>
              <Plus size={18} className="mr-2" /> Add Idea
            </Button>
          )}
        </CardFooter>
      </Card>
      
      {/* Ideas List */}
      <div className="space-y-4">
        {ideas.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-text-secondary dark:text-gray-400">No ideas yet. Add your first idea above!</p>
          </div>
        ) : (
          ideas.map(idea => (
            <Card key={idea.id}>
              <CardContent className="p-6">
                <div className="flex justify-between">
                  <p className="text-text-primary dark:text-white mb-4">{idea.text}</p>
                  <div className="flex space-x-2">
                    <button 
                      className="text-gray-400 hover:text-primary-blue"
                      onClick={() => handleEditIdea(idea.id)}
                    >
                      <Edit size={18} />
                    </button>
                    <button 
                      className="text-gray-400 hover:text-danger-red"
                      onClick={() => handleDeleteIdea(idea.id)}
                    >
                      <X size={18} />
                    </button>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex flex-wrap gap-2">
                    {idea.tags.map((tag, index) => (
                      <Badge key={index}>{tag}</Badge>
                    ))}
                  </div>
                  
                  <div className="flex items-center text-text-secondary dark:text-gray-400 text-sm">
                    <Calendar size={14} className="mr-1" />
                    {new Date(idea.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default Ideas;
