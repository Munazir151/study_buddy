import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  BarChart3, 
  BookOpen, 
  Brain,
  Target,
  Clock,
  TrendingUp,
  Zap
} from 'lucide-react';
import { useFlashcardsStore } from '../../stores/flashcardsStore';
import Button from '../UI/Button';
import DeckGrid from './DeckGrid';
import StudyMode from './StudyMode';
import DeckCreator from './DeckCreator';
import Analytics from './Analytics';

type ViewMode = 'overview' | 'study' | 'create' | 'analytics';

const SmartFlashcards: React.FC = () => {
  const { decks, selectedDeckId, selectDeck, getDeckStats } = useFlashcardsStore();
  const [viewMode, setViewMode] = useState<ViewMode>('overview');
  const [showCreateDeck, setShowCreateDeck] = useState(false);

  const selectedDeck = decks.find(deck => deck.id === selectedDeckId);
  // const deckStats = selectedDeckId ? getDeckStats(selectedDeckId) : null;

  const handleStartStudy = (deckId: string) => {
    selectDeck(deckId);
    setViewMode('study');
  };

  const handleBackToOverview = () => {
    setViewMode('overview');
    selectDeck(null);
  };

  const totalCards = decks.reduce((sum, deck) => sum + deck.totalCards, 0);
  const totalMastered = decks.reduce((sum, deck) => sum + deck.masteredCards, 0);
  const dueToday = decks.reduce((sum, deck) => {
    const stats = getDeckStats(deck.id);
    return sum + stats.dueCards;
  }, 0);

  return (
    <div className="flex flex-col h-full bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Smart Flashcards
              </h1>
              <p className="text-gray-500 dark:text-gray-400">
                Auto-generated flashcards that adapt to your learning pace
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {viewMode !== 'overview' && (
              <Button
                variant="ghost"
                onClick={handleBackToOverview}
              >
                Back to Overview
              </Button>
            )}
            
            <Button
              variant="outline"
              onClick={() => setViewMode('analytics')}
              icon={BarChart3}
            >
              Analytics
            </Button>
            
            <Button
              variant="primary"
              onClick={() => setShowCreateDeck(true)}
              icon={Plus}
            >
              New Deck
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        {viewMode === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Total Cards</p>
                  <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">{totalCards}</p>
                </div>
                <BookOpen className="w-8 h-8 text-blue-500" />
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-600 dark:text-green-400">Mastered</p>
                  <p className="text-2xl font-bold text-green-900 dark:text-green-100">{totalMastered}</p>
                </div>
                <Target className="w-8 h-8 text-green-500" />
              </div>
            </div>

            <div className="bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-orange-600 dark:text-orange-400">Due Today</p>
                  <p className="text-2xl font-bold text-orange-900 dark:text-orange-100">{dueToday}</p>
                </div>
                <Clock className="w-8 h-8 text-orange-500" />
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-purple-600 dark:text-purple-400">Study Streak</p>
                  <p className="text-2xl font-bold text-purple-900 dark:text-purple-100">7 days</p>
                </div>
                <TrendingUp className="w-8 h-8 text-purple-500" />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        <AnimatePresence mode="wait">
          {viewMode === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="h-full"
            >
              <DeckGrid onStartStudy={handleStartStudy} />
            </motion.div>
          )}

          {viewMode === 'study' && selectedDeck && (
            <motion.div
              key="study"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="h-full"
            >
              <StudyMode 
                deck={selectedDeck} 
                onComplete={handleBackToOverview}
              />
            </motion.div>
          )}

          {viewMode === 'analytics' && (
            <motion.div
              key="analytics"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="h-full"
            >
              <Analytics />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Create Deck Modal */}
      <AnimatePresence>
        {showCreateDeck && (
          <DeckCreator onClose={() => setShowCreateDeck(false)} />
        )}
      </AnimatePresence>

      {/* AI Study Suggestions */}
      {viewMode === 'overview' && dueToday > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-6 right-6 bg-gradient-to-r from-purple-500 to-blue-500 text-white p-4 rounded-lg shadow-lg max-w-sm"
        >
          <div className="flex items-start space-x-3">
            <Brain className="w-6 h-6 mt-1" />
            <div>
              <h3 className="font-semibold">AI Study Suggestion</h3>
              <p className="text-sm opacity-90 mt-1">
                You have {dueToday} cards due for review. Perfect time for a quick study session!
              </p>
              <Button
                variant="ghost"
                size="sm"
                className="mt-2 text-white hover:bg-white/20"
                icon={Zap}
              >
                Start Smart Review
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default SmartFlashcards;
