import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Play, 
  MoreHorizontal, 
  Edit2, 
  Trash2, 
  BookOpen,
  Target,
  Clock,
  TrendingUp,
  Plus
} from 'lucide-react';
import { useFlashcardsStore } from '../../stores/flashcardsStore';
import Button from '../UI/Button';

interface DeckGridProps {
  onStartStudy: (deckId: string) => void;
}

const DeckGrid: React.FC<DeckGridProps> = ({ onStartStudy }) => {
  const { decks, deleteDeck, getDeckStats, createFlashcard } = useFlashcardsStore();
  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
    deckId: string;
  } | null>(null);

  const handleContextMenu = (e: React.MouseEvent, deckId: string) => {
    e.preventDefault();
    setContextMenu({
      x: e.clientX,
      y: e.clientY,
      deckId
    });
  };

  const handleDeleteDeck = (deckId: string) => {
    deleteDeck(deckId);
    setContextMenu(null);
  };

  const handleQuickAdd = (deckId: string) => {
    createFlashcard(deckId, 'New Question', 'New Answer');
    setContextMenu(null);
  };

  const getDifficultyColor = (accuracy: number) => {
    if (accuracy >= 80) return 'text-green-600 bg-green-100 dark:bg-green-900/30';
    if (accuracy >= 60) return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30';
    return 'text-red-600 bg-red-100 dark:bg-red-900/30';
  };

  return (
    <div className="p-6">
      {decks.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
            <BookOpen className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No flashcard decks yet
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            Create your first deck to start studying with smart flashcards
          </p>
          <Button variant="primary" icon={Plus}>
            Create Your First Deck
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {decks.map((deck, index) => {
            const stats = getDeckStats(deck.id);
            const progress = deck.totalCards > 0 ? (stats.masteredCards / deck.totalCards) * 100 : 0;
            
            return (
              <motion.div
                key={deck.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow"
                onContextMenu={(e) => handleContextMenu(e, deck.id)}
              >
                {/* Deck Header */}
                <div className="p-4 border-b border-gray-100 dark:border-gray-700">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <div 
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: deck.color }}
                        />
                        <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                          {deck.category}
                        </span>
                      </div>
                      <h3 className="font-semibold text-gray-900 dark:text-white text-lg mb-1">
                        {deck.name}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                        {deck.description}
                      </p>
                    </div>
                    
                    <button
                      onClick={(e) => handleContextMenu(e, deck.id)}
                      className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded"
                    >
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Stats */}
                <div className="p-4">
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="text-center">
                      <div className="flex items-center justify-center space-x-1 mb-1">
                        <BookOpen className="w-4 h-4 text-blue-500" />
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Cards</span>
                      </div>
                      <div className="text-lg font-bold text-gray-900 dark:text-white">
                        {deck.totalCards}
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <div className="flex items-center justify-center space-x-1 mb-1">
                        <Target className="w-4 h-4 text-green-500" />
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Mastered</span>
                      </div>
                      <div className="text-lg font-bold text-gray-900 dark:text-white">
                        {stats.masteredCards}
                      </div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-medium text-gray-600 dark:text-gray-400">Progress</span>
                      <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                        {Math.round(progress)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <motion.div
                        className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.8, delay: index * 0.1 }}
                      />
                    </div>
                  </div>

                  {/* Additional Stats */}
                  <div className="flex justify-between items-center mb-4 text-xs">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3 h-3 text-orange-500" />
                      <span className="text-gray-600 dark:text-gray-400">
                        {stats.dueCards} due
                      </span>
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(stats.averageAccuracy)}`}>
                      {Math.round(stats.averageAccuracy)}% accuracy
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2">
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => onStartStudy(deck.id)}
                      icon={Play}
                      className="flex-1"
                      disabled={deck.totalCards === 0}
                    >
                      Study
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuickAdd(deck.id)}
                      icon={Plus}
                    >
                      <span className="sr-only">Add Card</span>
                    </Button>
                  </div>
                </div>

                {/* Last Studied */}
                {deck.lastStudied && (
                  <div className="px-4 pb-3">
                    <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      Last studied {new Date(deck.lastStudied).toLocaleDateString()}
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Context Menu */}
      {contextMenu && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setContextMenu(null)}
          />
          <div
            className="fixed z-50 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg py-1 min-w-[140px]"
            style={{ left: contextMenu.x, top: contextMenu.y }}
          >
            <button
              onClick={() => handleQuickAdd(contextMenu.deckId)}
              className="w-full px-3 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Card
            </button>
            <button
              onClick={() => onStartStudy(contextMenu.deckId)}
              className="w-full px-3 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
            >
              <Play className="w-4 h-4 mr-2" />
              Study Now
            </button>
            <button
              className="w-full px-3 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
            >
              <Edit2 className="w-4 h-4 mr-2" />
              Edit Deck
            </button>
            <button
              onClick={() => handleDeleteDeck(contextMenu.deckId)}
              className="w-full px-3 py-2 text-left text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default DeckGrid;
