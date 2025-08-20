import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, Clock, Target, ArrowLeft, Calendar, BookOpen, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

const Analytics: React.FC = () => {
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year'>('week');

  // Mock data for analytics
  const studyData = {
    week: {
      totalHours: 28,
      sessionsCompleted: 12,
      averageSession: 2.3,
      subjects: [
        { name: 'Mathematics', hours: 8, color: 'bg-blue-500' },
        { name: 'Physics', hours: 7, color: 'bg-purple-500' },
        { name: 'Chemistry', hours: 6, color: 'bg-green-500' },
        { name: 'Biology', hours: 4, color: 'bg-yellow-500' },
        { name: 'History', hours: 3, color: 'bg-red-500' }
      ],
      dailyHours: [4, 3, 5, 2, 6, 4, 4],
      performance: 85
    },
    month: {
      totalHours: 120,
      sessionsCompleted: 48,
      averageSession: 2.5,
      subjects: [
        { name: 'Mathematics', hours: 35, color: 'bg-blue-500' },
        { name: 'Physics', hours: 28, color: 'bg-purple-500' },
        { name: 'Chemistry', hours: 25, color: 'bg-green-500' },
        { name: 'Biology', hours: 20, color: 'bg-yellow-500' },
        { name: 'History', hours: 12, color: 'bg-red-500' }
      ],
      dailyHours: [4, 3, 5, 2, 6, 4, 4, 3, 5, 4, 6, 3, 4, 5, 2, 6, 4, 3, 5, 4, 6, 3, 4, 5, 2, 6, 4, 3, 5, 4],
      performance: 88
    },
    year: {
      totalHours: 1440,
      sessionsCompleted: 576,
      averageSession: 2.5,
      subjects: [
        { name: 'Mathematics', hours: 420, color: 'bg-blue-500' },
        { name: 'Physics', hours: 336, color: 'bg-purple-500' },
        { name: 'Chemistry', hours: 300, color: 'bg-green-500' },
        { name: 'Biology', hours: 240, color: 'bg-yellow-500' },
        { name: 'History', hours: 144, color: 'bg-red-500' }
      ],
      dailyHours: Array.from({ length: 52 }, () => Math.floor(Math.random() * 10) + 20),
      performance: 92
    }
  };

  const currentData = studyData[timeRange];
  const maxHours = Math.max(...currentData.subjects.map(s => s.hours));

  const achievements = [
    { title: '7-Day Streak', description: 'Studied for 7 consecutive days', icon: '🔥', earned: true },
    { title: 'Early Bird', description: 'Completed 10 morning study sessions', icon: '🌅', earned: true },
    { title: 'Marathon Learner', description: 'Studied for 5+ hours in a day', icon: '🏃‍♂️', earned: false },
    { title: 'Subject Master', description: 'Completed 50 hours in one subject', icon: '🎓', earned: true },
    { title: 'Consistency King', description: 'Maintained 80%+ performance for a month', icon: '👑', earned: false },
    { title: 'Quiz Champion', description: 'Scored 90%+ on 10 quizzes', icon: '🏆', earned: true }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/" className="flex items-center text-gray-600 hover:text-orange-600 transition-colors">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Home
              </Link>
              <div className="h-6 w-px bg-gray-300"></div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-2xl font-bold text-orange-600">Study Analytics</h1>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {(['week', 'month', 'year'] as const).map((range) => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors capitalize ${
                    timeRange === range 
                      ? 'bg-orange-500 text-white' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {range}
                </button>
              ))}
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
                <p className="text-sm text-gray-600">Total Hours</p>
                <p className="text-3xl font-bold text-blue-600">{currentData.totalHours}</p>
                <p className="text-sm text-green-500 flex items-center mt-1">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  +12% from last {timeRange}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-blue-500" />
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
                <p className="text-sm text-gray-600">Sessions</p>
                <p className="text-3xl font-bold text-purple-600">{currentData.sessionsCompleted}</p>
                <p className="text-sm text-green-500 flex items-center mt-1">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  +8% from last {timeRange}
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <Target className="w-6 h-6 text-purple-500" />
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
                <p className="text-sm text-gray-600">Avg Session</p>
                <p className="text-3xl font-bold text-green-600">{currentData.averageSession}h</p>
                <p className="text-sm text-green-500 flex items-center mt-1">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  +5% from last {timeRange}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <Calendar className="w-6 h-6 text-green-500" />
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
                <p className="text-sm text-gray-600">Performance</p>
                <p className="text-3xl font-bold text-orange-600">{currentData.performance}%</p>
                <p className="text-sm text-green-500 flex items-center mt-1">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  +3% from last {timeRange}
                </p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                <Award className="w-6 h-6 text-orange-500" />
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Study Hours Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2 bg-white rounded-2xl shadow-sm p-6"
          >
            <h2 className="text-xl font-bold mb-6 flex items-center">
              <BarChart3 className="w-5 h-5 mr-2 text-blue-500" />
              Study Hours Trend
            </h2>
            <div className="h-64 flex items-end space-x-2">
              {currentData.dailyHours.slice(0, timeRange === 'week' ? 7 : timeRange === 'month' ? 30 : 12).map((hours, index) => (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div
                    className="w-full bg-blue-500 rounded-t-lg transition-all duration-300 hover:bg-blue-600"
                    style={{ height: `${(hours / Math.max(...currentData.dailyHours)) * 200}px` }}
                  ></div>
                  <span className="text-xs text-gray-500 mt-2">
                    {timeRange === 'week' ? ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index] :
                     timeRange === 'month' ? index + 1 :
                     ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][index]}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Subject Breakdown */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-2xl shadow-sm p-6"
          >
            <h2 className="text-xl font-bold mb-6 flex items-center">
              <BookOpen className="w-5 h-5 mr-2 text-purple-500" />
              Subject Breakdown
            </h2>
            <div className="space-y-4">
              {currentData.subjects.map((subject, index) => (
                <div key={subject.name} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{subject.name}</span>
                    <span className="text-sm text-gray-600">{subject.hours}h</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(subject.hours / maxHours) * 100}%` }}
                      transition={{ delay: index * 0.1, duration: 0.8 }}
                      className={`h-2 rounded-full ${subject.color}`}
                    ></motion.div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-sm p-6 mt-8"
        >
          <h2 className="text-xl font-bold mb-6 flex items-center">
            <Award className="w-5 h-5 mr-2 text-yellow-500" />
            Achievements
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                  achievement.earned 
                    ? 'border-yellow-200 bg-yellow-50 hover:border-yellow-300' 
                    : 'border-gray-200 bg-gray-50 opacity-60'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`text-2xl ${achievement.earned ? '' : 'grayscale'}`}>
                    {achievement.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className={`font-bold ${achievement.earned ? 'text-yellow-700' : 'text-gray-500'}`}>
                      {achievement.title}
                    </h3>
                    <p className={`text-sm ${achievement.earned ? 'text-yellow-600' : 'text-gray-400'}`}>
                      {achievement.description}
                    </p>
                  </div>
                  {achievement.earned && (
                    <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Performance Insights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-sm p-6 mt-8"
        >
          <h2 className="text-xl font-bold mb-6 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-green-500" />
            Performance Insights
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">📈</span>
              </div>
              <h3 className="font-bold text-blue-600">Improving</h3>
              <p className="text-sm text-gray-600">Your study consistency has improved by 15% this month</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="font-bold text-green-600">On Track</h3>
              <p className="text-sm text-gray-600">You're meeting 85% of your weekly study goals</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">⭐</span>
              </div>
              <h3 className="font-bold text-purple-600">Strong Areas</h3>
              <p className="text-sm text-gray-600">Mathematics and Physics are your strongest subjects</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">💡</span>
              </div>
              <h3 className="font-bold text-orange-600">Suggestion</h3>
              <p className="text-sm text-gray-600">Consider spending more time on History to balance your studies</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Analytics;
