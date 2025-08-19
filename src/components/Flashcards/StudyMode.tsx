import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  RotateCcw,
  X,
  Eye,
  Trophy,
  Check
} from 'lucide-react';
import type { Deck, Flashcard } from '../../stores/flashcardsStore';
import { useFlashcardsStore } from '../../stores/flashcardsStore';
import Button from '../UI/Button';

interface StudyModeProps {
  deck: Deck;
  onComplete: () => void;
}

const StudyMode: React.FC<StudyModeProps> = ({ deck, onComplete }) => {
  const { 
    getCardsForReview, 
    startStudySession,
    endStudySession,
    reviewCard
  } = useFlashcardsStore();
  
  // nextCard is unused; navigation is handled by moveToNextCard
  const [cards, setCards] = useState<Flashcard[]>([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [cardStartTime, setCardStartTime] = useState<Date | null>(null);
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [sessionStats, setSessionStats] = useState({
    correct: 0,
    incorrect: 0,
    skipped: 0
  });

  const currentCard = cards[currentCardIndex];
  const progress = cards.length > 0 ? ((currentCardIndex + 1) / cards.length) * 100 : 0;

  useEffect(() => {
    const reviewCards = getCardsForReview(deck.id, 20);
    setCards(reviewCards);
    
    if (reviewCards.length > 0) {
      startStudySession(deck.id);
      setCardStartTime(new Date());
      setIsSessionActive(true);
    }
  }, [deck.id]);

  const handleReveal = () => {
    setShowAnswer(true);
  };

  const handleResponse = (correct: boolean) => {
    if (!currentCard || !cardStartTime) return;

    const timeSpent = Date.now() - cardStartTime.getTime();
    reviewCard(currentCard.id, correct, timeSpent);

    setSessionStats(prev => ({
      ...prev,
      correct: prev.correct + (correct ? 1 : 0),
      incorrect: prev.incorrect + (!correct ? 1 : 0)
    }));

    moveToNextCard();
  };

  const handleSkip = () => {
    setSessionStats(prev => ({
      ...prev,
      skipped: prev.skipped + 1
    }));
    moveToNextCard();
  };

  const moveToNextCard = () => {
    if (currentCardIndex < cards.length - 1) {
      setCurrentCardIndex(prev => prev + 1);
      setShowAnswer(false);
      setCardStartTime(new Date());
    } else {
      completeSession();
    }
  };

  const completeSession = () => {
    endStudySession();
    setIsSessionActive(false);
  };

  const handleRestart = () => {
    setCurrentCardIndex(0);
    setShowAnswer(false);
    setSessionStats({ correct: 0, incorrect: 0, skipped: 0 });
    setCardStartTime(new Date());
    startStudySession(deck.id);
    setIsSessionActive(true);
  };

  if (cards.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
            <Trophy className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            All caught up!
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            No cards are due for review in this deck right now.
          </p>
          <Button variant="primary" onClick={onComplete}>
            Back to Decks
          </Button>
        </div>
      </div>
    );
  }

  if (!isSessionActive) {
    const accuracy = sessionStats.correct + sessionStats.incorrect > 0 
      ? (sessionStats.correct / (sessionStats.correct + sessionStats.incorrect)) * 100 
      : 0;

    return (
      <div className="flex items-center justify-center h-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg max-w-md w-full mx-4"
        >
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center">
              <Trophy className="w-8 h-8 text-white" />
            </div>
            
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              Session Complete!
            </h3>
            
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              Great job studying {deck.name}
            </p>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{sessionStats.correct}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Correct</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">{sessionStats.incorrect}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Incorrect</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-600">{sessionStats.skipped}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Skipped</div>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Accuracy</div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {Math.round(accuracy)}%
              </div>
            </div>

            <div className="flex space-x-3">
              <Button
                variant="outline"
                onClick={handleRestart}
                icon={RotateCcw}
                className="flex-1"
              >
                Study Again
              </Button>
              <Button
                variant="primary"
                onClick={onComplete}
                className="flex-1"
              >
                Done
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              {deck.name}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Card {currentCardIndex + 1} of {cards.length}
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
              <X className="w-4 h-4" />
              <span>{sessionStats.correct}/{sessionStats.correct + sessionStats.incorrect + sessionStats.skipped}</span>
            </div>
            
            <Button
              variant="ghost"
              onClick={onComplete}
            >
              End Session
            </Button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-4">
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <motion.div
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      </div>

      {/* Card Display */}
      <div className="flex-1 flex items-center justify-center p-8">
        <motion.div
          key={currentCard?.id}
          initial={{ opacity: 0, rotateY: 180 }}
          animate={{ opacity: 1, rotateY: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-2xl"
        >
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 min-h-[300px] flex flex-col">
            {/* Card Content */}
            <div className="flex-1 p-8 flex flex-col justify-center">
              <div className="text-center">
                <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">
                  {showAnswer ? 'Answer' : 'Question'}
                </div>
                
                <AnimatePresence mode="wait">
                  {!showAnswer ? (
                    <motion.div
                      key="question"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="text-xl md:text-2xl font-medium text-gray-900 dark:text-white leading-relaxed"
                    >
                      {currentCard?.front}
                    </motion.div>
                  ) : (
                    <motion.div
                      key="answer"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="text-xl md:text-2xl font-medium text-gray-900 dark:text-white leading-relaxed"
                    >
                      {currentCard?.back}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Card Actions */}
            <div className="border-t border-gray-200 dark:border-gray-700 p-6">
              {!showAnswer ? (
                <div className="flex justify-center space-x-4">
                  <Button
                    variant="primary"
                    onClick={handleReveal}
                    icon={Eye}
                    size="lg"
                  >
                    Reveal Answer
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={handleSkip}
                    icon={X}
                  >
                    Skip
                  </Button>
                </div>
              ) : (
                <div className="flex justify-center space-x-4">
                  <Button
                    variant="outline"
                    onClick={() => handleResponse(false)}
                    icon={X}
                    className="text-red-600 border-red-300 hover:bg-red-50 dark:hover:bg-red-900/20"
                  >
                    Incorrect
                  </Button>
                  <Button
                    variant="primary"
                    onClick={() => handleResponse(true)}
                    icon={Check}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    Correct
                  </Button>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Session Stats */}
      <div className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 p-4">
        <div className="flex justify-center space-x-8 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-gray-600 dark:text-gray-400">Correct: {sessionStats.correct}</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span className="text-gray-600 dark:text-gray-400">Incorrect: {sessionStats.incorrect}</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
            <span className="text-gray-600 dark:text-gray-400">Skipped: {sessionStats.skipped}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyMode;
