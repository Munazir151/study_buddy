import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Target, 
  Plus, 
  TrendingUp, 
  Calendar, 
  CheckCircle2,
  MoreVertical,
  Edit,
  Trash2,
  Award
} from 'lucide-react';
import { usePlannerStore } from '../../stores/plannerStore';
import Button from '../UI/Button';

const GoalTracker: React.FC = () => {
  const { 
    goals, 
    createGoal, 
    updateGoal, 
    deleteGoal, 
    getGoalProgress 
  } = usePlannerStore();
  
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [newGoal, setNewGoal] = useState({
    title: '',
    description: '',
    targetValue: 0,
    unit: 'hours',
    deadline: '',
    category: 'study'
  });

  const handleCreateGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGoal.title.trim() || !newGoal.deadline) return;

    createGoal({
      title: newGoal.title.trim(),
      description: newGoal.description.trim(),
      targetValue: newGoal.targetValue,
      unit: newGoal.unit as any,
      deadline: new Date(newGoal.deadline),
      category: newGoal.category as any,
      subjects: []
    });

    setNewGoal({
      title: '',
      description: '',
      targetValue: 0,
      unit: 'hours',
      deadline: '',
      category: 'study'
    });
    setShowCreateForm(false);
  };

  const getProgressPercentage = (goalId: string) => {
    const progress = getGoalProgress(goalId);
    return Math.min((progress.currentValue / progress.targetValue) * 100, 100);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'study': return 'bg-blue-500';
      case 'exam': return 'bg-red-500';
      case 'skill': return 'bg-green-500';
      case 'project': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'study': return '📚';
      case 'exam': return '🎯';
      case 'skill': return '🚀';
      case 'project': return '💼';
      default: return '📋';
    }
  };

  const formatDeadline = (deadline: Date) => {
    const date = new Date(deadline);
    const today = new Date();
    const diffTime = date.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return 'Overdue';
    if (diffDays === 0) return 'Due today';
    if (diffDays === 1) return 'Due tomorrow';
    if (diffDays <= 7) return `${diffDays} days left`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const activeGoals = goals.filter(goal => !goal.completed);
  const completedGoals = goals.filter(goal => goal.completed);

  return (
    <div className="flex flex-col h-full bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Goal Tracker</h2>
            <p className="text-gray-500 dark:text-gray-400">
              Set and track your learning objectives
            </p>
          </div>
          <Button
            variant="primary"
            onClick={() => setShowCreateForm(true)}
            icon={Plus}
          >
            New Goal
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Active Goals</p>
                <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">{activeGoals.length}</p>
              </div>
              <Target className="w-8 h-8 text-blue-500" />
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600 dark:text-green-400">Completed</p>
                <p className="text-2xl font-bold text-green-900 dark:text-green-100">{completedGoals.length}</p>
              </div>
              <Award className="w-8 h-8 text-green-500" />
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600 dark:text-purple-400">Success Rate</p>
                <p className="text-2xl font-bold text-purple-900 dark:text-purple-100">
                  {goals.length > 0 ? Math.round((completedGoals.length / goals.length) * 100) : 0}%
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Goals List */}
      <div className="flex-1 overflow-y-auto p-6">
        {/* Active Goals */}
        {activeGoals.length > 0 && (
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Active Goals
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {activeGoals.map((goal) => {
                const progress = getGoalProgress(goal.id);
                const percentage = getProgressPercentage(goal.id);
                
                return (
                  <motion.div
                    key={goal.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 ${getCategoryColor(goal.category)} rounded-lg flex items-center justify-center text-white text-lg`}>
                          {getCategoryIcon(goal.category)}
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white">
                            {goal.title}
                          </h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {goal.category}
                          </p>
                        </div>
                      </div>

                      <div className="relative">
                        <button
                          onClick={() => setActiveDropdown(activeDropdown === goal.id ? null : goal.id)}
                          className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </button>

                        {activeDropdown === goal.id && (
                          <div className="absolute right-0 top-8 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg py-1 z-10 min-w-[120px]">
                            <button
                              onClick={() => {
                                updateGoal(goal.id, { completed: true });
                                setActiveDropdown(null);
                              }}
                              className="w-full px-3 py-2 text-left text-sm text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 flex items-center space-x-2"
                            >
                              <CheckCircle2 className="w-4 h-4" />
                              <span>Complete</span>
                            </button>
                            <button
                              onClick={() => {
                                setActiveDropdown(null);
                              }}
                              className="w-full px-3 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-2"
                            >
                              <Edit className="w-4 h-4" />
                              <span>Edit</span>
                            </button>
                            <button
                              onClick={() => {
                                deleteGoal(goal.id);
                                setActiveDropdown(null);
                              }}
                              className="w-full px-3 py-2 text-left text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center space-x-2"
                            >
                              <Trash2 className="w-4 h-4" />
                              <span>Delete</span>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    {goal.description && (
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                        {goal.description}
                      </p>
                    )}

                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span className="text-gray-600 dark:text-gray-400">Progress</span>
                        <span className="font-medium text-gray-900 dark:text-white">
                          {progress.currentValue} / {goal.targetValue} {goal.unit}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <div className="text-right text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {Math.round(percentage)}% complete
                      </div>
                    </div>

                    {/* Deadline */}
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-1 text-gray-500 dark:text-gray-400">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDeadline(goal.deadline)}</span>
                      </div>
                      {percentage >= 100 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => updateGoal(goal.id, { completed: true })}
                          className="text-green-600 hover:bg-green-50 dark:text-green-400 dark:hover:bg-green-900/20"
                        >
                          Mark Complete
                        </Button>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}

        {/* Completed Goals */}
        {completedGoals.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Completed Goals
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {completedGoals.slice(0, 6).map((goal) => (
                <motion.div
                  key={goal.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-lg p-4"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center text-white">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-green-900 dark:text-green-100">
                        {goal.title}
                      </h4>
                      <p className="text-sm text-green-600 dark:text-green-400">
                        Completed • {goal.targetValue} {goal.unit}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {goals.length === 0 && (
          <div className="text-center py-12">
            <Target className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No goals yet
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              Set your first learning goal to start tracking your progress
            </p>
            <Button
              variant="primary"
              onClick={() => setShowCreateForm(true)}
              icon={Plus}
            >
              Create Your First Goal
            </Button>
          </div>
        )}
      </div>

      {/* Create Goal Modal */}
      <AnimatePresence>
        {showCreateForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-md"
            >
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Create New Goal
                </h3>

                <form onSubmit={handleCreateGoal} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Goal Title
                    </label>
                    <input
                      type="text"
                      value={newGoal.title}
                      onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
                      placeholder="e.g., Study 100 hours this semester"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Description
                    </label>
                    <textarea
                      value={newGoal.description}
                      onChange={(e) => setNewGoal({ ...newGoal, description: e.target.value })}
                      placeholder="Optional description..."
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Target Value
                      </label>
                      <input
                        type="number"
                        value={newGoal.targetValue}
                        onChange={(e) => setNewGoal({ ...newGoal, targetValue: Number(e.target.value) })}
                        min="1"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Unit
                      </label>
                      <select
                        value={newGoal.unit}
                        onChange={(e) => setNewGoal({ ...newGoal, unit: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                      >
                        <option value="hours">Hours</option>
                        <option value="tasks">Tasks</option>
                        <option value="chapters">Chapters</option>
                        <option value="exams">Exams</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Category
                    </label>
                    <select
                      value={newGoal.category}
                      onChange={(e) => setNewGoal({ ...newGoal, category: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                    >
                      <option value="study">Study</option>
                      <option value="exam">Exam</option>
                      <option value="skill">Skill</option>
                      <option value="project">Project</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Deadline
                    </label>
                    <input
                      type="date"
                      value={newGoal.deadline}
                      onChange={(e) => setNewGoal({ ...newGoal, deadline: e.target.value })}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                      required
                    />
                  </div>

                  <div className="flex space-x-3 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowCreateForm(false)}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      variant="primary"
                      className="flex-1"
                      disabled={!newGoal.title.trim() || !newGoal.deadline}
                    >
                      Create Goal
                    </Button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GoalTracker;
