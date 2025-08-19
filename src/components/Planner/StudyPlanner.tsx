import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, 
  Plus, 
  Target, 
  Clock, 
  TrendingUp,
  BarChart3,
  CheckCircle
} from 'lucide-react';
import { usePlannerStore } from '../../stores/plannerStore';
import Button from '../UI/Button';
import CalendarView from './CalendarView';
import TaskList from './TaskList';
import TaskCreator from './TaskCreator';
import GoalTracker from './GoalTracker';
import PlannerAnalytics from './PlannerAnalytics';

type ViewMode = 'calendar' | 'tasks' | 'goals' | 'analytics';

const StudyPlanner: React.FC = () => {
  const { 
    tasks, 
    goals, 
    currentSession,
    getTasksForDate,
    getProductivityStats,
    startSession,
    endSession
  } = usePlannerStore();
  
  const [viewMode, setViewMode] = useState<ViewMode>('calendar');
  const [showTaskCreator, setShowTaskCreator] = useState(false);
  const [filterSubject, setFilterSubject] = useState<string>('all');

  const todayTasks = getTasksForDate(new Date());
  const completedToday = todayTasks.filter(task => task.completed).length;
  const pendingTasks = tasks.filter(task => !task.completed).length;
  const activeGoals = goals.filter(goal => !goal.completed).length;
  const stats = getProductivityStats();

  const handleStartSession = (taskId: string) => {
    if (currentSession) {
      endSession();
    }
    startSession(taskId);
  };

  return (
    <div className="flex flex-col h-full bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-500 rounded-xl flex items-center justify-center">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Study Planner
              </h1>
              <p className="text-gray-500 dark:text-gray-400">
                Personalized study schedules that fit your lifestyle
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              onClick={() => setViewMode('analytics')}
              icon={BarChart3}
            >
              Analytics
            </Button>
            
            <Button
              variant="primary"
              onClick={() => setShowTaskCreator(true)}
              icon={Plus}
            >
              New Task
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Today's Tasks</p>
                <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">
                  {completedToday}/{todayTasks.length}
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-blue-500" />
            </div>
          </div>

          <div className="bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-600 dark:text-orange-400">Pending</p>
                <p className="text-2xl font-bold text-orange-900 dark:text-orange-100">{pendingTasks}</p>
              </div>
              <Clock className="w-8 h-8 text-orange-500" />
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600 dark:text-green-400">Active Goals</p>
                <p className="text-2xl font-bold text-green-900 dark:text-green-100">{activeGoals}</p>
              </div>
              <Target className="w-8 h-8 text-green-500" />
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600 dark:text-purple-400">Study Hours</p>
                <p className="text-2xl font-bold text-purple-900 dark:text-purple-100">
                  {Math.round(stats.totalHours)}h
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-500" />
            </div>
          </div>
        </div>

        {/* View Mode Tabs */}
        <div className="flex space-x-1 mt-6 bg-gray-100 dark:bg-gray-700 p-1 rounded-lg">
          {[
            { key: 'calendar', label: 'Calendar', icon: Calendar },
            { key: 'tasks', label: 'Tasks', icon: CheckCircle },
            { key: 'goals', label: 'Goals', icon: Target },
            { key: 'analytics', label: 'Analytics', icon: BarChart3 }
          ].map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setViewMode(key as ViewMode)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                viewMode === key
                  ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        <AnimatePresence mode="wait">
          {viewMode === 'calendar' && (
            <motion.div
              key="calendar"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="h-full"
            >
              <CalendarView onStartSession={handleStartSession} />
            </motion.div>
          )}

          {viewMode === 'tasks' && (
            <motion.div
              key="tasks"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="h-full"
            >
              <TaskList 
                filterSubject={filterSubject}
                onFilterChange={setFilterSubject}
                onStartSession={handleStartSession}
              />
            </motion.div>
          )}

          {viewMode === 'goals' && (
            <motion.div
              key="goals"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="h-full"
            >
              <GoalTracker />
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
              <PlannerAnalytics />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Current Session Indicator */}
      {currentSession && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-6 right-6 bg-gradient-to-r from-green-500 to-blue-500 text-white p-4 rounded-lg shadow-lg"
        >
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
            <div>
              <p className="font-semibold">Study Session Active</p>
              <p className="text-sm opacity-90">
                Started at {currentSession.startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => endSession()}
              className="text-white hover:bg-white/20"
            >
              End Session
            </Button>
          </div>
        </motion.div>
      )}

      {/* Task Creator Modal */}
      <AnimatePresence>
        {showTaskCreator && (
          <TaskCreator onClose={() => setShowTaskCreator(false)} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default StudyPlanner;
