import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, RotateCcw, Check, X, ArrowLeft, BookOpen, Brain, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Flashcard {
  id: number;
  question: string;
  answer: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
}

const Flashcards: React.FC = () => {
  const navigate = useNavigate();
  const [flashcards, setFlashcards] = useState<Flashcard[]>([
    {
      id: 1,
      question: "What is photosynthesis?",
      answer: "The process by which plants convert light energy into chemical energy using chlorophyll, carbon dioxide, and water to produce glucose and oxygen.",
      difficulty: "medium",
      category: "Biology"
    },
    {
      id: 2,
      question: "What is the capital of France?",
      answer: "Paris",
      difficulty: "easy",
      category: "Geography"
    },
    {
      id: 3,
      question: "What is the formula for the area of a circle?",
      answer: "A = πr² (where r is the radius of the circle)",
      difficulty: "medium",
      category: "Mathematics"
    },
    {
      id: 4,
      question: "Who wrote 'Romeo and Juliet'?",
      answer: "William Shakespeare",
      difficulty: "easy",
      category: "Literature"
    }
  ]);

  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [studyMode, setStudyMode] = useState<'review' | 'create' | 'generate'>('review');
  const [newCard, setNewCard] = useState({ 
    question: '', 
    answer: '', 
    category: '', 
    difficulty: 'medium' as const 
  });
  const [generateContent, setGenerateContent] = useState('');
  const [generateSubject, setGenerateSubject] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const currentCard = flashcards[currentCardIndex];

  const nextCard = () => {
    setCurrentCardIndex((prev) => (prev + 1) % flashcards.length);
    setIsFlipped(false);
  };

  const prevCard = () => {
    setCurrentCardIndex((prev) => (prev - 1 + flashcards.length) % flashcards.length);
    setIsFlipped(false);
  };

  const handleDifficultyResponse = (_difficulty: 'easy' | 'medium' | 'hard') => {
    // Mock implementation - just move to next card
    nextCard();
  };

  const categories = ['Mathematics', 'Science', 'History', 'Literature', 'Geography', 'Biology', 'Chemistry', 'Physics'];

  const handleCreateCard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCard.question || !newCard.answer) return;

    const newFlashcard: Flashcard = {
      id: Date.now(),
      question: newCard.question,
      answer: newCard.answer,
      difficulty: newCard.difficulty,
      category: newCard.category || 'General'
    };

    setFlashcards(prev => [newFlashcard, ...prev]);
    setNewCard({ question: '', answer: '', category: '', difficulty: 'medium' });
    setStudyMode('review');
  };

  const handleGenerateCards = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!generateContent) return;

    setIsGenerating(true);
    
    // Mock AI generation with delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const mockGeneratedCards: Flashcard[] = [
      {
        id: Date.now() + 1,
        question: `What is the main concept in ${generateSubject || generateContent}?`,
        answer: `This is a generated answer about ${generateSubject || generateContent}`,
        difficulty: 'medium',
        category: generateSubject || 'General'
      },
      {
        id: Date.now() + 2,
        question: `How does ${generateSubject || generateContent} work?`,
        answer: `Generated explanation of how ${generateSubject || generateContent} functions`,
        difficulty: 'hard',
        category: generateSubject || 'General'
      }
    ];

    setFlashcards(prev => [...mockGeneratedCards, ...prev]);
    setGenerateContent('');
    setGenerateSubject('');
    setIsGenerating(false);
    setStudyMode('review');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => (window.history.length > 1 ? navigate(-1) : navigate('/'))}
              className="text-gray-600 hover:text-gray-800"
              aria-label="Go back"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-800 flex items-center">
                <BookOpen className="w-8 h-8 mr-3 text-blue-600" />
                Flashcards
              </h1>
              <p className="text-gray-600 mt-1">Study with interactive flashcards</p>
            </div>
          </div>
          
          <div className="flex space-x-2">
            <button
              onClick={() => setStudyMode('review')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                studyMode === 'review' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              Review
            </button>
            <button
              onClick={() => setStudyMode('create')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                studyMode === 'create' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Plus className="w-4 h-4 inline mr-2" />
              Create
            </button>
            <button
              onClick={() => setStudyMode('generate')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                studyMode === 'generate' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Sparkles className="w-4 h-4 inline mr-2" />
              Generate
            </button>
          </div>
        </div>

        {/* Review Mode */}
        {studyMode === 'review' && flashcards.length > 0 && (
          <div className="max-w-2xl mx-auto">
            <div className="mb-6 text-center">
              <span className="text-gray-600">
                Card {currentCardIndex + 1} of {flashcards.length}
              </span>
            </div>
            
            <motion.div
              key={currentCardIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-lg p-8 min-h-[300px] cursor-pointer"
              onClick={() => setIsFlipped(!isFlipped)}
            >
              <div className="text-center">
                <div className="mb-4">
                  <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                    {currentCard.category}
                  </span>
                  <span className={`inline-block ml-2 px-3 py-1 rounded-full text-sm ${
                    currentCard.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                    currentCard.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {currentCard.difficulty}
                  </span>
                </div>
                
                <div className="text-xl font-medium text-gray-800 mb-6">
                  {isFlipped ? currentCard.answer : currentCard.question}
                </div>
                
                <div className="text-gray-500 text-sm mb-6">
                  Click to {isFlipped ? 'see question' : 'reveal answer'}
                </div>
              </div>
            </motion.div>
            
            {/* Navigation and Actions */}
            <div className="flex justify-between items-center mt-6">
              <button
                onClick={prevCard}
                className="flex items-center px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous
              </button>
              
              {isFlipped && (
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleDifficultyResponse('hard')}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Hard
                  </button>
                  <button
                    onClick={() => handleDifficultyResponse('medium')}
                    className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors flex items-center"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Medium
                  </button>
                  <button
                    onClick={() => handleDifficultyResponse('easy')}
                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center"
                  >
                    <Check className="w-4 h-4 mr-2" />
                    Easy
                  </button>
                </div>
              )}
              
              <button
                onClick={nextCard}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Next
                <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
              </button>
            </div>
          </div>
        )}

        {/* Create Mode */}
        {studyMode === 'create' && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Create New Flashcard</h2>
              
              <form onSubmit={handleCreateCard} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Question
                  </label>
                  <textarea
                    value={newCard.question}
                    onChange={(e) => setNewCard({ ...newCard, question: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={3}
                    placeholder="Enter your question..."
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Answer
                  </label>
                  <textarea
                    value={newCard.answer}
                    onChange={(e) => setNewCard({ ...newCard, answer: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={3}
                    placeholder="Enter the answer..."
                    required
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category
                    </label>
                    <select
                      value={newCard.category}
                      onChange={(e) => setNewCard({ ...newCard, category: e.target.value })}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select category...</option>
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Difficulty
                    </label>
                    <select
                      value={newCard.difficulty}
                      onChange={(e) => setNewCard({ ...newCard, difficulty: e.target.value as typeof newCard.difficulty })}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="easy">Easy</option>
                      <option value="medium">Medium</option>
                      <option value="hard">Hard</option>
                    </select>
                  </div>
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Create Flashcard
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Generate Mode */}
        {studyMode === 'generate' && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <Brain className="w-6 h-6 mr-2 text-purple-600" />
                AI Generate Flashcards
              </h2>
              
              <form onSubmit={handleGenerateCards} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Content to Study
                  </label>
                  <textarea
                    value={generateContent}
                    onChange={(e) => setGenerateContent(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    rows={4}
                    placeholder="Paste your study material or describe the topic you want to create flashcards for..."
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject (Optional)
                  </label>
                  <input
                    type="text"
                    value={generateSubject}
                    onChange={(e) => setGenerateSubject(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="e.g., Biology, History, Mathematics..."
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={isGenerating}
                  className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isGenerating ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Generating Flashcards...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5 mr-2" />
                      Generate Flashcards
                    </>
                  )}
                </button>
              </form>
              
              <div className="mt-4 text-sm text-gray-600">
                <p>💡 Tip: Provide detailed content for better flashcard generation</p>
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {studyMode === 'review' && flashcards.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-600 mb-2">No flashcards yet</h3>
            <p className="text-gray-500 mb-6">Create your first flashcard or generate some with AI</p>
            <div className="space-x-4">
              <button
                onClick={() => setStudyMode('create')}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Create Flashcard
              </button>
              <button
                onClick={() => setStudyMode('generate')}
                className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
              >
                Generate with AI
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Flashcards;