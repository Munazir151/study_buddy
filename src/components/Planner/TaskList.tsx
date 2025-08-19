import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Filter, 
  Search, 
  Play, 
  CheckCircle2, 
  Clock, 
  Calendar,
  MoreVertical,
  Edit,
  Trash2,
  Flag
} from 'lucide-react';
import { usePlannerStore } from '../../stores/plannerStore';
import Button from '../UI/Button';

interface TaskListProps {
  filterSubject: string;
  onFilterChange: (subject: string) => void;
  onStartSession: (taskId: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ 
  filterSubject, 
  onFilterChange, 
  onStartSession 
}) => {
  const { 
    tasks, 
    subjects, 
    toggleTask, 
    deleteTask, 
    updateTask 
  } = usePlannerStore();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'dueDate' | 'priority' | 'created'>('dueDate');
  const [showCompleted, setShowCompleted] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const filteredTasks = tasks
    .filter(task => {
      if (!showCompleted && task.completed) return false;
      if (filterSubject !== 'all' && task.subject !== filterSubject) return false;
      if (searchQuery && !task.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'dueDate':
          return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
        case 'priority':
          const priorityOrder = { high: 3, medium: 2, low: 1 };
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        case 'created':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        default:
          return 0;
      }
    });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100 dark:bg-red-900/30 dark:text-red-400';
      case 'medium': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'low': return 'text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-700 dark:text-gray-400';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'exam': return '📝';
      case 'assignment': return '📋';
      case 'project': return '🚀';
      case 'review': return '📚';
      default: return '📖';
    }
  };

  const isOverdue = (dueDate: Date) => {
    return new Date(dueDate) < new Date() && new Date(dueDate).toDateString() !== new Date().toDateString();
  };

  const isDueToday = (dueDate: Date) => {
    return new Date(dueDate).toDateString() === new Date().toDateString();
  };

  const formatDueDate = (dueDate: Date) => {
    const date = new Date(dueDate);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-50 dark:bg-gray-900">
      {/* Header Controls */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tasks..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
            />
          </div>

          {/* Filters and Controls */}
          <div className="flex items-center space-x-3">
            {/* Subject Filter */}
            <select
              value={filterSubject}
              onChange={(e) => onFilterChange(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="all">All Subjects</option>
              {subjects.map(subject => (
                <option key={subject} value={subject}>{subject}</option>
              ))}
            </select>

            {/* Sort By */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="dueDate">Sort by Due Date</option>
              <option value="priority">Sort by Priority</option>
              <option value="created">Sort by Created</option>
            </select>

            {/* Show Completed Toggle */}
            <label className="flex items-center space-x-2 text-sm">
              <input
                type="checkbox"
                checked={showCompleted}
                onChange={(e) => setShowCompleted(e.target.checked)}
                className="rounded border-gray-300 text-green-600 focus:ring-green-500"
              />
              <span className="text-gray-700 dark:text-gray-300">Show completed</span>
            </label>
          </div>
        </div>
      </div>

      {/* Task List */}
      <div className="flex-1 overflow-y-auto p-6">
        {filteredTasks.length === 0 ? (
          <div className="text-center py-12">
            <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No tasks found
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              {searchQuery ? 'Try adjusting your search or filters' : 'Create your first task to get started'}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            <AnimatePresence>
              {filteredTasks.map((task) => (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className={`bg-white dark:bg-gray-800 rounded-lg border p-4 transition-all hover:shadow-md ${
                    task.completed 
                      ? 'border-green-200 dark:border-green-700' 
                      : isOverdue(task.dueDate)
                      ? 'border-red-200 dark:border-red-700'
                      : isDueToday(task.dueDate)
                      ? 'border-yellow-200 dark:border-yellow-700'
                      : 'border-gray-200 dark:border-gray-700'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3 flex-1">
                      {/* Checkbox */}
                      <button
                        onClick={() => toggleTask(task.id)}
                        className={`mt-1 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                          task.completed
                            ? 'bg-green-500 border-green-500 text-white'
                            : 'border-gray-300 dark:border-gray-600 hover:border-green-500'
                        }`}
                      >
                        {task.completed && <CheckCircle2 className="w-3 h-3" />}
                      </button>

                      {/* Task Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="text-lg">{getTypeIcon(task.type)}</span>
                          <h3 className={`font-medium ${
                            task.completed 
                              ? 'line-through text-gray-500 dark:text-gray-400' 
                              : 'text-gray-900 dark:text-white'
                          }`}>
                            {task.title}
                          </h3>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(task.priority)}`}>
                            {task.priority}
                          </span>
                        </div>

                        {task.description && (
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                            {task.description}
                          </p>
                        )}

                        <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span className={
                              isOverdue(task.dueDate) ? 'text-red-600 dark:text-red-400' :
                              isDueToday(task.dueDate) ? 'text-yellow-600 dark:text-yellow-400' :
                              'text-gray-500 dark:text-gray-400'
                            }>
                              {formatDueDate(task.dueDate)}
                            </span>
                          </div>

                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{task.estimatedDuration}min</span>
                          </div>

                          <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs">
                            {task.subject}
                          </span>

                          {task.tags.map(tag => (
                            <span
                              key={tag}
                              className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded text-xs"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center space-x-2 ml-4">
                      {!task.completed && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onStartSession(task.id)}
                          icon={Play}
                          className="text-green-600 hover:bg-green-50 dark:text-green-400 dark:hover:bg-green-900/20"
                        >
                          Start
                        </Button>
                      )}

                      <div className="relative">
                        <button
                          onClick={() => setActiveDropdown(activeDropdown === task.id ? null : task.id)}
                          className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </button>

                        {activeDropdown === task.id && (
                          <div className="absolute right-0 top-8 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg py-1 z-10 min-w-[120px]">
                            <button
                              onClick={() => {
                                // Handle edit - would open edit modal
                                setActiveDropdown(null);
                              }}
                              className="w-full px-3 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-2"
                            >
                              <Edit className="w-4 h-4" />
                              <span>Edit</span>
                            </button>
                            <button
                              onClick={() => {
                                deleteTask(task.id);
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
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskList;
