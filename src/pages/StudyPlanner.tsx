import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Plus, BookOpen, Target, ArrowLeft, CheckCircle, Sparkles, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface StudyPlan {
  id: number;
  title: string;
  subject: string;
  description: string;
  duration: number;
  priority: 'high' | 'medium' | 'low';
  completed: boolean;
  dueDate: string;
  type: 'study' | 'assignment' | 'exam' | 'review';
}

const StudyPlanner: React.FC = () => {
  const navigate = useNavigate();
  const [studyPlans, setStudyPlans] = useState<StudyPlan[]>([
    {
      id: 1,
      title: "Review Calculus Derivatives",
      subject: "Mathematics",
      description: "Practice derivative rules and applications",
      duration: 90,
      priority: "high",
      completed: false,
      dueDate: "2024-01-15",
      type: "study"
    },
    {
      id: 2,
      title: "Biology Lab Report",
      subject: "Biology",
      description: "Complete photosynthesis experiment report",
      duration: 120,
      priority: "medium",
      completed: true,
      dueDate: "2024-01-14",
      type: "assignment"
    },
    {
      id: 3,
      title: "History Essay",
      subject: "History",
      description: "World War II impact analysis",
      duration: 180,
      priority: "high",
      completed: false,
      dueDate: "2024-01-16",
      type: "assignment"
    }
  ]);

  const [newPlan, setNewPlan] = useState({
    title: '',
    subject: '',
    description: '',
    duration: 60,
    priority: 'medium' as const,
    dueDate: '',
    type: 'study' as const
  });

  const [showAddModal, setShowAddModal] = useState(false);
  const [showAIModal, setShowAIModal] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const togglePlan = (id: number) => {
    setStudyPlans(studyPlans.map(plan => 
      plan.id === id ? { ...plan, completed: !plan.completed } : plan
    ));
  };

  const addPlan = () => {
    if (!newPlan.title || !newPlan.subject || !newPlan.dueDate) return;

    const plan: StudyPlan = {
      id: Date.now(),
      ...newPlan,
      completed: false
    };

    setStudyPlans([...studyPlans, plan]);
    setNewPlan({
      title: '',
      subject: '',
      description: '',
      duration: 60,
      priority: 'medium',
      dueDate: '',
      type: 'study'
    });
    setShowAddModal(false);
  };

  const deletePlan = (id: number) => {
    setStudyPlans(studyPlans.filter(plan => plan.id !== id));
  };

  const generateAIPlan = async () => {
    if (!aiPrompt) return;

    setIsGenerating(true);
    
    // Mock AI generation with delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const mockPlans: StudyPlan[] = [
      {
        id: Date.now() + 1,
        title: `Study Plan: ${aiPrompt.slice(0, 30)}...`,
        subject: "AI Generated",
        description: `Generated study plan based on: ${aiPrompt}`,
        duration: 90,
        priority: "medium",
        completed: false,
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        type: "study"
      }
    ];

    setStudyPlans([...studyPlans, ...mockPlans]);
    setAiPrompt('');
    setIsGenerating(false);
    setShowAIModal(false);
  };

  const today = new Date().toISOString().split('T')[0];
  const todayTasks = studyPlans.filter(plan => plan.dueDate === today);
  const completedPlans = studyPlans.filter(plan => plan.completed).length;
  const totalPlans = studyPlans.length;

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'low': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'study': return <BookOpen className="w-4 h-4" />;
      case 'assignment': return <Target className="w-4 h-4" />;
      case 'exam': return <Calendar className="w-4 h-4" />;
      case 'review': return <Clock className="w-4 h-4" />;
      default: return <BookOpen className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
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
                  <Calendar className="w-8 h-8 mr-3 text-purple-600" />
                  Study Planner
                </h1>
                <p className="text-gray-600 mt-1">Organize and track your study schedule</p>
              </div>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowAddModal(true)}
                className="bg-purple-500 text-white px-6 py-3 rounded-lg hover:bg-purple-600 transition-colors flex items-center"
              >
                <Plus className="w-5 h-5 mr-2" />
                Add Plan
              </button>
              <button
                onClick={() => setShowAIModal(true)}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-colors flex items-center"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                AI Generate
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-6 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Plans</p>
                <p className="text-2xl font-bold">{totalPlans}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Target className="w-6 h-6 text-blue-500" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl p-6 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Completed</p>
                <p className="text-2xl font-bold">{completedPlans}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-500" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl p-6 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Today's Tasks</p>
                <p className="text-2xl font-bold">{todayTasks.length}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <Calendar className="w-6 h-6 text-purple-500" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl p-6 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Progress</p>
                <p className="text-2xl font-bold">{totalPlans > 0 ? Math.round((completedPlans / totalPlans) * 100) : 0}%</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-orange-500" />
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Today's Tasks */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-2xl shadow-sm p-6"
          >
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-blue-500" />
              All Study Plans
            </h2>
            <div className="space-y-3">
              {studyPlans.length > 0 ? studyPlans.map(plan => (
                <div key={plan.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => togglePlan(plan.id)}
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        plan.completed ? 'bg-green-500 border-green-500' : 'border-gray-300'
                      }`}
                    >
                      {plan.completed && <CheckCircle className="w-3 h-3 text-white" />}
                    </button>
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${getPriorityColor(plan.priority)}`}>
                      {getTypeIcon(plan.type)}
                    </div>
                    <div>
                      <p className={`font-medium ${plan.completed ? 'line-through text-gray-500' : ''}`}>
                        {plan.title}
                      </p>
                      <p className="text-sm text-gray-500">{plan.subject} • {plan.duration} min • {plan.dueDate}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => deletePlan(plan.id)}
                    className="p-1 text-red-500 hover:bg-red-50 rounded"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              )) : (
                <p className="text-gray-500 text-center py-4">No study plans yet</p>
              )}
            </div>
          </motion.div>

          {/* Progress Overview */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-2xl shadow-sm p-6"
          >
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <Target className="w-5 h-5 mr-2 text-green-500" />
              Progress Overview
            </h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Overall Progress</span>
                  <span>{totalPlans > 0 ? Math.round((completedPlans / totalPlans) * 100) : 0}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${totalPlans > 0 ? (completedPlans / totalPlans) * 100 : 0}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Completed Tasks</span>
                  <span className="text-sm font-medium">{completedPlans}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Remaining Tasks</span>
                  <span className="text-sm font-medium">{totalPlans - completedPlans}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">High Priority</span>
                  <span className="text-sm font-medium">{studyPlans.filter(p => p.priority === 'high').length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Due Today</span>
                  <span className="text-sm font-medium">{todayTasks.length}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Add Plan Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-8 max-w-md w-full mx-4"
          >
            <h3 className="text-xl font-bold mb-6">Add New Study Plan</h3>
            <form onSubmit={(e) => { e.preventDefault(); addPlan(); }} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Plan Title</label>
                <input
                  type="text"
                  value={newPlan.title}
                  onChange={(e) => setNewPlan({ ...newPlan, title: e.target.value })}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter plan title"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                <input
                  type="text"
                  value={newPlan.subject}
                  onChange={(e) => setNewPlan({ ...newPlan, subject: e.target.value })}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter subject"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={newPlan.description}
                  onChange={(e) => setNewPlan({ ...newPlan, description: e.target.value })}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter description"
                  rows={3}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Duration (min)</label>
                  <input
                    type="number"
                    value={newPlan.duration}
                    onChange={(e) => setNewPlan({ ...newPlan, duration: parseInt(e.target.value) })}
                    className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    min="1"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                  <select
                    value={newPlan.priority}
                    onChange={(e) => setNewPlan({ ...newPlan, priority: e.target.value as typeof newPlan.priority })}
                    className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Due Date</label>
                  <input
                    type="date"
                    value={newPlan.dueDate}
                    onChange={(e) => setNewPlan({ ...newPlan, dueDate: e.target.value })}
                    className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                  <select
                    value={newPlan.type}
                    onChange={(e) => setNewPlan({ ...newPlan, type: e.target.value as typeof newPlan.type })}
                    className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="study">Study</option>
                    <option value="assignment">Assignment</option>
                    <option value="exam">Exam</option>
                    <option value="review">Review</option>
                  </select>
                </div>
              </div>
              
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
                >
                  Add Plan
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* AI Generate Modal */}
      {showAIModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-8 max-w-md w-full mx-4"
          >
            <h3 className="text-xl font-bold mb-6 flex items-center">
              <Sparkles className="w-6 h-6 mr-2 text-purple-500" />
              AI Generate Study Plan
            </h3>
            <form onSubmit={(e) => { e.preventDefault(); generateAIPlan(); }} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Study Goals & Content</label>
                <textarea
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Describe what you want to study, your goals, or paste study material..."
                  rows={4}
                  required
                />
              </div>
              
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAIModal(false)}
                  className="flex-1 px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isGenerating}
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isGenerating ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" />
                      Generate Plan
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default StudyPlanner;