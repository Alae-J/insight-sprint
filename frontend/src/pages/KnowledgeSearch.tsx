
import React, { useState } from 'react';
import { Card, CardContent } from '../components/Card';
import Button from '../components/Button';
import Input from '../components/Input';
import { Search as SearchIcon, Book, ArrowRight } from 'lucide-react';

// Sample Q&A data
const sampleQnA = [
    {
        id: 1,
        question: "What was our Q1 revenue target?",
        answer: "The Q1 revenue target was $2.5 million, as discussed in the January planning meeting.",
        source: "January Planning Meeting (2023-01-15)",
        context: `
            # Q1 Planning Meeting
            Date: January 15, 2023
            Attendees: John, Sarah, Mike, Lisa

            ## Agenda
            - Review Q4 performance
            - Set Q1 targets
            - Budget approval

            ## Key Decisions
            1. Set Q1 revenue target at $2.5 million (15% increase from Q4)
            2. Approve marketing budget of $300,000
            3. Prioritize mobile app feature development
        `,
    },
    {
        id: 2,
        question: "Who is responsible for the API documentation?",
        answer: "Mike Brown is responsible for creating the API documentation, as assigned in the API Integration kick-off meeting.",
        source: "API Integration Kick-off (2023-03-10)",
        context: `
            # API Integration Kick-off Meeting
            Date: March 10, 2023
            Attendees: Sarah, Mike, David, Jennifer

            ## Tasks Assigned
            - Sarah: API authentication system
            - Mike: API documentation
            - David: Integration testing
            - Jennifer: Client SDK development

            ## Timeline
            Documentation draft due by March 25
            Final documentation due by April 10
        `,
    },
];

const KnowledgeSearch = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const [hasSearched, setHasSearched] = useState(false);
    const [expandedResult, setExpandedResult] = useState<number | null>(null);
    
    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Searching for:', searchQuery);
        
        // In a real app, this would call an API to search the knowledge base
        // For now, we'll just return the sample QnA data
        setSearchResults(sampleQnA);
        setHasSearched(true);
    };

    const toggleResultExpansion = (id: number) => {
        setExpandedResult(expandedResult === id ? null : id);
    };

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6 text-text-primary dark:text-white">Knowledge Search</h1>
            
            <Card className="mb-8">
                <CardContent className="p-6">
                    <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
                        <div className="flex-grow">
                            <Input
                                placeholder="Ask a question about your meeting notes and decisions..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full"
                                fullWidth
                            />
                        </div>
                        <Button variant="primary" type="submit">
                            <SearchIcon size={18} className="mr-2" /> Search
                        </Button>
                    </form>
                </CardContent>
            </Card>
            
            {hasSearched && (
                <div>
                <h2 className="text-xl font-semibold mb-4 text-text-primary dark:text-white">
                    Search Results {searchResults.length > 0 ? `(${searchResults.length})` : ''}
                </h2>
                
                {searchResults.length === 0 ? (
                    <div className="text-center py-8">
                    <p className="text-text-secondary dark:text-gray-400">No results found for your query.</p>
                    <p className="text-sm text-text-secondary dark:text-gray-400 mt-2">
                        Try using different keywords or phrases.
                    </p>
                    </div>
                ) : (
                    <div className="space-y-6">
                    {searchResults.map((result) => (
                        <Card key={result.id}>
                        <CardContent className="p-6">
                            <div className="border-b border-gray-200 dark:border-gray-700 pb-4 mb-4">
                            <div className="flex items-start">
                                <div className="w-9 h-9 rounded-full bg-secondary-teal/10 flex items-center justify-center mr-3">
                                <SearchIcon size={16} className="text-secondary-teal" />
                                </div>
                                <div>
                                <h3 className="font-medium text-text-primary dark:text-white">
                                    {result.question}
                                </h3>
                                <p className="text-sm text-text-secondary dark:text-gray-400 mt-1">
                                    Found in: {result.source}
                                </p>
                                </div>
                            </div>
                            </div>
                            
                            <div className="flex items-start">
                            <div className="w-9 h-9 rounded-full bg-primary-blue/10 flex items-center justify-center mr-3">
                                <Book size={16} className="text-primary-blue" />
                            </div>
                            <div>
                                <p className="text-text-secondary dark:text-gray-300">
                                {result.answer}
                                </p>
                                
                                <button 
                                className="flex items-center mt-3 text-sm text-primary-blue hover:underline"
                                onClick={() => toggleResultExpansion(result.id)}
                                >
                                {expandedResult === result.id ? 'Hide context' : 'View context'}
                                <ArrowRight size={14} className="ml-1" />
                                </button>
                                
                                {expandedResult === result.id && (
                                <div className="mt-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-md">
                                    <pre className="text-sm text-text-secondary dark:text-gray-300 whitespace-pre-wrap font-mono">
                                    {result.context}
                                    </pre>
                                </div>
                                )}
                            </div>
                            </div>
                        </CardContent>
                        </Card>
                    ))}
                    </div>
                )}
                </div>
            )}
        </div>
    );
};

export default KnowledgeSearch;
