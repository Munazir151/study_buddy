import React from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  TrendingUp, 
  Target, 
  Clock, 
  Calendar,
  Award,
  Brain,
  Zap
} from 'lucide-react';
import { useFlashcardsStore } from '../../stores/flashcardsStore';

const Analytics: React.FC = () => {
  const { decks, studySessions, getDeckStats } = useFlashcardsStore();

  const totalCards = decks.reduce((sum, deck) => sum + deck.totalCards, 0);
  const totalMastered = decks.reduce((sum, deck) => sum + deck.masteredCards, 0);
  const totalSessions = studySessions.length;
  const averageAccuracy = decks.length > 0 
    ? decks.reduce((sum, deck) => sum + getDeckStats(deck.id).averageAccuracy, 0) / decks.length 
    : 0;

  const recentSessions = studySessions
    .sort((a, b) => b.startTime.getTime() - a.startTime.getTime())
    .slice(0, 7);

  const weeklyProgress = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const dayStart = new Date(date.setHours(0, 0, 0, 0));
    const dayEnd = new Date(date.setHours(23, 59, 59, 999));
    
    const sessionsCount = studySessions.filter(session => 
      session.startTime >= dayStart && session.startTime <= dayEnd
    ).length;
    
    return {
      day: date.toLocaleDateString('en-US', { weekday: 'short' }),
      sessions: sessionsCount
    };
  }).reverse();

  return (
    <div className="p-6 space-y-6">
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-6 rounded-xl"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-1">
                Total Cards
              </p>
              <p className="text-3xl font-bold text-blue-900 dark:text-blue-100">
                {totalCards}
              </p>
              <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                Across {decks.length} decks
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-6 rounded-xl"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-600 dark:text-green-400 mb-1">
                Mastered
              </p>
              <p className="text-3xl font-bold text-green-900 dark:text-green-100">
                {totalMastered}
              </p>
              <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                {totalCards > 0 ? Math.round((totalMastered / totalCards) * 100) : 0}% complete
              </p>
            </div>
            <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
              <Target className="w-6 h-6 text-white" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 p-6 rounded-xl"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-purple-600 dark:text-purple-400 mb-1">
                Accuracy
              </p>
              <p className="text-3xl font-bold text-purple-900 dark:text-purple-100">
                {Math.round(averageAccuracy)}%
              </p>
              <p className="text-xs text-purple-600 dark:text-purple-400 mt-1">
                Average across all decks
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 p-6 rounded-xl"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-orange-600 dark:text-orange-400 mb-1">
                Study Sessions
              </p>
              <p className="text-3xl font-bold text-orange-900 dark:text-orange-100">
                {totalSessions}
              </p>
              <p className="text-xs text-orange-600 dark:text-orange-400 mt-1">
                Total completed
              </p>
            </div>
            <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Weekly Activity
            </h3>
            <Calendar className="w-5 h-5 text-gray-400" />
          </div>
          
          <div className="space-y-4">
            {weeklyProgress.map((day, index) => (
              <div key={day.day} className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400 w-12">
                  {day.day}
                </span>
                <div className="flex-1 mx-4">
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <motion.div
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min((day.sessions / 5) * 100, 100)}%` }}
                      transition={{ duration: 0.8, delay: index * 0.1 }}
                    />
                  </div>
                </div>
                <span className="text-sm font-medium text-gray-900 dark:text-white w-8 text-right">
                  {day.sessions}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Deck Performance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Deck Performance
            </h3>
            <TrendingUp className="w-5 h-5 text-gray-400" />
          </div>
          
          <div className="space-y-4">
            {decks.slice(0, 5).map((deck, index) => {
              const stats = getDeckStats(deck.id);
              const progress = deck.totalCards > 0 ? (stats.masteredCards / deck.totalCards) * 100 : 0;
              
              return (
                <div key={deck.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div 
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: deck.color }}
                      />
                      <span className="text-sm font-medium text-gray-900 dark:text-white truncate">
                        {deck.name}
                      </span>
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {Math.round(progress)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <motion.div
                      className="h-2 rounded-full"
                      style={{ backgroundColor: deck.color }}
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.8, delay: index * 0.1 }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Recent Sessions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Recent Study Sessions
          </h3>
          <Clock className="w-5 h-5 text-gray-400" />
        </div>
        
        {recentSessions.length === 0 ? (
          <div className="text-center py-8">
            <div className="w-12 h-12 mx-auto mb-4 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
              <Clock className="w-6 h-6 text-gray-400" />
            </div>
            <p className="text-gray-500 dark:text-gray-400">
              No study sessions yet. Start studying to see your progress here!
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {recentSessions.map((session, index) => {
              const deck = decks.find(d => d.id === session.deckId);
              const accuracy = session.cardsStudied > 0 
                ? (session.correctAnswers / session.cardsStudied) * 100 
                : 0;
              
              return (
                <motion.div
                  key={session.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: deck?.color || '#6B7280' }}
                    />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {deck?.name || 'Unknown Deck'}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {session.startTime.toLocaleDateString()} at {session.startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className="font-medium text-gray-900 dark:text-white">
                      {session.cardsStudied} cards
                    </p>
                    <p className={`text-sm ${
                      accuracy >= 80 ? 'text-green-600' : 
                      accuracy >= 60 ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {Math.round(accuracy)}% accuracy
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </motion.div>

      {/* Achievement Badges */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Achievements
          </h3>
          <Award className="w-5 h-5 text-gray-400" />
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className={`text-center p-4 rounded-lg ${totalCards >= 100 ? 'bg-yellow-50 dark:bg-yellow-900/20' : 'bg-gray-50 dark:bg-gray-700'}`}>
            <div className={`w-12 h-12 mx-auto mb-2 rounded-full flex items-center justify-center ${totalCards >= 100 ? 'bg-yellow-500' : 'bg-gray-300 dark:bg-gray-600'}`}>
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <p className={`text-sm font-medium ${totalCards >= 100 ? 'text-yellow-800 dark:text-yellow-200' : 'text-gray-500'}`}>
              Card Collector
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              100+ cards
            </p>
          </div>

          <div className={`text-center p-4 rounded-lg ${totalMastered >= 50 ? 'bg-green-50 dark:bg-green-900/20' : 'bg-gray-50 dark:bg-gray-700'}`}>
            <div className={`w-12 h-12 mx-auto mb-2 rounded-full flex items-center justify-center ${totalMastered >= 50 ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'}`}>
              <Target className="w-6 h-6 text-white" />
            </div>
            <p className={`text-sm font-medium ${totalMastered >= 50 ? 'text-green-800 dark:text-green-200' : 'text-gray-500'}`}>
              Master Learner
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              50+ mastered
            </p>
          </div>

          <div className={`text-center p-4 rounded-lg ${averageAccuracy >= 80 ? 'bg-purple-50 dark:bg-purple-900/20' : 'bg-gray-50 dark:bg-gray-700'}`}>
            <div className={`w-12 h-12 mx-auto mb-2 rounded-full flex items-center justify-center ${averageAccuracy >= 80 ? 'bg-purple-500' : 'bg-gray-300 dark:bg-gray-600'}`}>
              <Brain className="w-6 h-6 text-white" />
            </div>
            <p className={`text-sm font-medium ${averageAccuracy >= 80 ? 'text-purple-800 dark:text-purple-200' : 'text-gray-500'}`}>
              Accuracy Expert
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              80%+ accuracy
            </p>
          </div>

          <div className={`text-center p-4 rounded-lg ${totalSessions >= 20 ? 'bg-blue-50 dark:bg-blue-900/20' : 'bg-gray-50 dark:bg-gray-700'}`}>
            <div className={`w-12 h-12 mx-auto mb-2 rounded-full flex items-center justify-center ${totalSessions >= 20 ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'}`}>
              <Zap className="w-6 h-6 text-white" />
            </div>
            <p className={`text-sm font-medium ${totalSessions >= 20 ? 'text-blue-800 dark:text-blue-200' : 'text-gray-500'}`}>
              Study Warrior
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              20+ sessions
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Analytics;
