import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Clock, 
  AlertCircle,
  Play,
  CheckCircle2
} from 'lucide-react';
import { usePlannerStore } from '../../stores/plannerStore';
import Button from '../UI/Button';

interface CalendarViewProps {
  onStartSession: (taskId: string) => void;
}

const CalendarView: React.FC<CalendarViewProps> = ({ onStartSession }) => {
  const { 
    selectedDate, 
    setSelectedDate, 
    getTasksForDate, 
    generateSchedule,
    scheduleTask 
  } = usePlannerStore();
  
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();
  const today = new Date();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newMonth = new Date(currentMonth);
    if (direction === 'prev') {
      newMonth.setMonth(newMonth.getMonth() - 1);
    } else {
      newMonth.setMonth(newMonth.getMonth() + 1);
    }
    setCurrentMonth(newMonth);
  };

  const selectDate = (day: number) => {
    const newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    setSelectedDate(newDate);
  };

  const isToday = (day: number) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    return date.toDateString() === today.toDateString();
  };

  const isSelected = (day: number) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    return date.toDateString() === selectedDate.toDateString();
  };

  const getTasksForDay = (day: number) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    return getTasksForDate(date);
  };

  const selectedDateTasks = getTasksForDate(selectedDate);
  const suggestedTasks = generateSchedule(selectedDate);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
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

  return (
    <div className="flex h-full">
      {/* Calendar Grid */}
      <div className="flex-1 p-6">
        {/* Calendar Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
          </h2>
          <div className="flex space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigateMonth('prev')}
              icon={ChevronLeft}
            >
              <span className="sr-only">Previous Month</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCurrentMonth(new Date())}
            >
              Today
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigateMonth('next')}
              icon={ChevronRight}
            >
              <span className="sr-only">Next Month</span>
            </Button>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
          {/* Day Headers */}
          <div className="grid grid-cols-7 border-b border-gray-200 dark:border-gray-700">
            {dayNames.map(day => (
              <div key={day} className="p-3 text-center text-sm font-medium text-gray-500 dark:text-gray-400">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Days */}
          <div className="grid grid-cols-7">
            {/* Empty cells for days before month starts */}
            {Array.from({ length: firstDayOfMonth }, (_, i) => (
              <div key={`empty-${i}`} className="h-24 border-r border-b border-gray-200 dark:border-gray-700" />
            ))}

            {/* Days of the month */}
            {Array.from({ length: daysInMonth }, (_, i) => {
              const day = i + 1;
              const dayTasks = getTasksForDay(day);
              const completedTasks = dayTasks.filter(task => task.completed);
              
              return (
                <motion.div
                  key={day}
                  whileHover={{ backgroundColor: 'rgba(0,0,0,0.02)' }}
                  onClick={() => selectDate(day)}
                  className={`h-24 border-r border-b border-gray-200 dark:border-gray-700 p-2 cursor-pointer relative ${
                    isSelected(day) ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                  } ${isToday(day) ? 'bg-yellow-50 dark:bg-yellow-900/20' : ''}`}
                >
                  <div className={`text-sm font-medium ${
                    isToday(day) ? 'text-yellow-600 dark:text-yellow-400' :
                    isSelected(day) ? 'text-blue-600 dark:text-blue-400' :
                    'text-gray-900 dark:text-white'
                  }`}>
                    {day}
                  </div>
                  
                  {/* Task indicators */}
                  <div className="mt-1 space-y-1">
                    {dayTasks.slice(0, 2).map((task, index) => (
                      <div
                        key={task.id}
                        className={`text-xs px-1 py-0.5 rounded truncate ${
                          task.completed 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                            : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                        }`}
                      >
                        {getTypeIcon(task.type)} {task.title}
                      </div>
                    ))}
                    {dayTasks.length > 2 && (
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        +{dayTasks.length - 2} more
                      </div>
                    )}
                  </div>

                  {/* Progress indicator */}
                  {dayTasks.length > 0 && (
                    <div className="absolute bottom-1 right-1">
                      <div className={`w-2 h-2 rounded-full ${
                        completedTasks.length === dayTasks.length ? 'bg-green-500' :
                        completedTasks.length > 0 ? 'bg-yellow-500' : 'bg-gray-300'
                      }`} />
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Right Sidebar - Selected Date Details */}
      <div className="w-80 bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 p-6 overflow-y-auto">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            {selectedDate.toLocaleDateString('en-US', { 
              weekday: 'long', 
              month: 'long', 
              day: 'numeric' 
            })}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {selectedDateTasks.length} tasks scheduled
          </p>
        </div>

        {/* Scheduled Tasks */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
            Scheduled Tasks
          </h4>
          
          {selectedDateTasks.length === 0 ? (
            <div className="text-center py-6">
              <Clock className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-500 dark:text-gray-400">
                No tasks scheduled for this day
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {selectedDateTasks.map((task) => (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-3 rounded-lg border ${
                    task.completed 
                      ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-700'
                      : 'bg-gray-50 border-gray-200 dark:bg-gray-700 dark:border-gray-600'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-sm">{getTypeIcon(task.type)}</span>
                        <span className={`text-sm font-medium ${
                          task.completed ? 'line-through text-gray-500' : 'text-gray-900 dark:text-white'
                        }`}>
                          {task.title}
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
                        <span className={`w-2 h-2 rounded-full ${getPriorityColor(task.priority)}`} />
                        <span>{task.subject}</span>
                        <span>•</span>
                        <span>{task.estimatedDuration}min</span>
                        {task.scheduledTime && (
                          <>
                            <span>•</span>
                            <span>{task.scheduledTime}</span>
                          </>
                        )}
                      </div>
                    </div>
                    
                    {!task.completed && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onStartSession(task.id)}
                        icon={Play}
                        className="ml-2"
                      >
                        <span className="sr-only">Start Session</span>
                      </Button>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* AI Suggestions */}
        {suggestedTasks.length > 0 && (
          <div>
            <div className="flex items-center space-x-2 mb-3">
              <AlertCircle className="w-4 h-4 text-blue-500" />
              <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                AI Suggestions
              </h4>
            </div>
            
            <div className="space-y-2">
              {suggestedTasks.slice(0, 3).map((task) => (
                <div
                  key={task.id}
                  className="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-sm">{getTypeIcon(task.type)}</span>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          {task.title}
                        </span>
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        Due: {new Date(task.dueDate).toLocaleDateString()}
                      </div>
                    </div>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        scheduleTask(task.id, selectedDate, '09:00');
                      }}
                      icon={Plus}
                      className="ml-2 text-blue-600 hover:bg-blue-100 dark:text-blue-400 dark:hover:bg-blue-900/30"
                    >
                      <span className="sr-only">Schedule Task</span>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CalendarView;
