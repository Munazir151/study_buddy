import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Calendar, Clock, Flag, BookOpen, Target } from 'lucide-react';
import { usePlannerStore } from '../../stores/plannerStore';
import Button from '../UI/Button';

interface TaskCreatorProps {
  onClose: () => void;
}

const TaskCreator: React.FC<TaskCreatorProps> = ({ onClose }) => {
  const { createTask, subjects, addSubject } = usePlannerStore();
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [subject, setSubject] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [type, setType] = useState<'study' | 'assignment' | 'exam' | 'review' | 'project'>('study');
  const [estimatedDuration, setEstimatedDuration] = useState(60);
  const [dueDate, setDueDate] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');

  const taskTypes = [
    { value: 'study', label: 'Study Session', icon: '📚' },
    { value: 'assignment', label: 'Assignment', icon: '📝' },
    { value: 'exam', label: 'Exam', icon: '🎯' },
    { value: 'review', label: 'Review', icon: '🔄' },
    { value: 'project', label: 'Project', icon: '🚀' }
  ];

  const priorityLevels = [
    { value: 'low', label: 'Low', color: 'bg-green-500' },
    { value: 'medium', label: 'Medium', color: 'bg-yellow-500' },
    { value: 'high', label: 'High', color: 'bg-red-500' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !dueDate) return;

    // Add new subject if it doesn't exist
    if (subject && !subjects.includes(subject)) {
      addSubject(subject);
    }

    createTask({
      title: title.trim(),
      description: description.trim(),
      subject: subject || 'General',
      priority,
      type,
      estimatedDuration,
      dueDate: new Date(dueDate),
      tags
    });

    onClose();
  };

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
              <Target className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Create New Task
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Add a new study task to your planner
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Task Title *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Complete Chapter 5 exercises"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Additional details about the task..."
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
              />
            </div>

            {/* Subject and Type */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Subject
                </label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                >
                  <option value="">Select subject</option>
                  {subjects.map(subj => (
                    <option key={subj} value={subj}>{subj}</option>
                  ))}
                </select>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Or type new subject"
                  className="w-full px-3 py-2 mt-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Task Type
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {taskTypes.map(taskType => (
                    <button
                      key={taskType.value}
                      type="button"
                      onClick={() => setType(taskType.value as any)}
                      className={`p-2 border rounded-lg text-sm transition-colors ${
                        type === taskType.value
                          ? 'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300'
                          : 'border-gray-300 dark:border-gray-600 hover:border-gray-400'
                      }`}
                    >
                      <span className="block">{taskType.icon}</span>
                      <span className="text-xs">{taskType.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Priority and Duration */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Priority
                </label>
                <div className="flex space-x-2">
                  {priorityLevels.map(level => (
                    <button
                      key={level.value}
                      type="button"
                      onClick={() => setPriority(level.value as any)}
                      className={`flex items-center space-x-2 px-3 py-2 border rounded-lg text-sm transition-colors ${
                        priority === level.value
                          ? 'border-gray-400 bg-gray-50 dark:bg-gray-700'
                          : 'border-gray-300 dark:border-gray-600 hover:border-gray-400'
                      }`}
                    >
                      <div className={`w-3 h-3 rounded-full ${level.color}`} />
                      <span>{level.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Estimated Duration (minutes)
                </label>
                <input
                  type="number"
                  value={estimatedDuration}
                  onChange={(e) => setEstimatedDuration(Number(e.target.value))}
                  min="15"
                  max="480"
                  step="15"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>

            {/* Due Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Due Date *
              </label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                required
              />
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Tags
              </label>
              <div className="flex flex-wrap gap-2 mb-2">
                {tags.map(tag => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs rounded-full"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="ml-1 text-blue-600 hover:text-blue-800"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Add a tag..."
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white text-sm"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addTag}
                  disabled={!newTag.trim()}
                >
                  Add
                </Button>
              </div>
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200 dark:border-gray-700">
          <Button
            variant="outline"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleSubmit}
            disabled={!title.trim() || !dueDate}
          >
            Create Task
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default TaskCreator;
