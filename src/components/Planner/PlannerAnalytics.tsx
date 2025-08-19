import React from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  TrendingUp, 
  Clock, 
  Target, 
  Calendar,
  Award,
  BookOpen,
  Zap
} from 'lucide-react';
import { usePlannerStore } from '../../stores/plannerStore';

const PlannerAnalytics: React.FC = () => {
  const { 
    getProductivityStats, 
    getWeeklyActivity, 
    getSubjectStats,
    tasks,
    goals,
    sessions
  } = usePlannerStore();
  
  const stats = getProductivityStats();
  const weeklyActivity = getWeeklyActivity();
  const subjectStats = getSubjectStats();
  
  const completedTasks = tasks.filter(task => task.completed);
  const completedGoals = goals.filter(goal => goal.completed);
  const totalSessions = sessions.length;
  
  const averageSessionDuration = totalSessions > 0 
    ? sessions.reduce((acc, session) => acc + (session.duration || 0), 0) / totalSessions 
    : 0;

  const thisWeekHours = weeklyActivity.reduce((acc, day) => acc + day.hours, 0);
  const lastWeekHours = 25; // Mock data for comparison
  const weeklyGrowth = lastWeekHours > 0 ? ((thisWeekHours - lastWeekHours) / lastWeekHours) * 100 : 0;

  const achievements = [
    { 
      id: 1, 
      title: 'Early Bird', 
      description: 'Completed 5 morning study sessions',
      icon: '🌅',
      earned: totalSessions >= 5,
      progress: Math.min(totalSessions, 5)
    },
    { 
      id: 2, 
      title: 'Goal Crusher', 
      description: 'Completed 3 goals',
      icon: '🎯',
      earned: completedGoals.length >= 3,
      progress: Math.min(completedGoals.length, 3)
    },
    { 
      id: 3, 
      title: 'Consistency King', 
      description: 'Study 7 days in a row',
      icon: '👑',
      earned: false,
      progress: 4
    },
    { 
      id: 4, 
      title: 'Marathon Learner', 
      description: 'Study for 50+ hours total',
      icon: '🏃‍♂️',
      earned: stats.totalHours >= 50,
      progress: Math.min(stats.totalHours, 50)
    }
  ];

  const productivityTrends = [
    { day: 'Mon', hours: 3.5, tasks: 4 },
    { day: 'Tue', hours: 4.2, tasks: 6 },
    { day: 'Wed', hours: 2.8, tasks: 3 },
    { day: 'Thu', hours: 5.1, tasks: 7 },
    { day: 'Fri', hours: 3.9, tasks: 5 },
    { day: 'Sat', hours: 6.2, tasks: 8 },
    { day: 'Sun', hours: 4.5, tasks: 6 }
  ];

  const maxHours = Math.max(...productivityTrends.map(d => d.hours));

  return (
    <div className="flex flex-col h-full bg-gray-50 dark:bg-gray-900 overflow-y-auto">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Study Analytics
              </h2>
              <p className="text-gray-500 dark:text-gray-400">
                Track your learning progress and productivity
              </p>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {Math.round(stats.totalHours)}h
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Total Study Time</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {completedTasks.length}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Tasks Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {Math.round(averageSessionDuration)}min
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Avg Session</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {completedGoals.length}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Goals Achieved</div>
            </div>
          </div>
        </div>

        {/* Weekly Progress */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Weekly Activity
              </h3>
              <div className={`flex items-center space-x-1 text-sm ${
                weeklyGrowth >= 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                <TrendingUp className="w-4 h-4" />
                <span>{weeklyGrowth >= 0 ? '+' : ''}{weeklyGrowth.toFixed(1)}%</span>
              </div>
            </div>

            <div className="space-y-3">
              {productivityTrends.map((day, index) => (
                <div key={day.day} className="flex items-center space-x-3">
                  <div className="w-8 text-sm text-gray-500 dark:text-gray-400">
                    {day.day}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-gray-600 dark:text-gray-400">
                        {day.hours}h • {day.tasks} tasks
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(day.hours / maxHours) * 100}%` }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Subject Breakdown */}
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Subject Breakdown
            </h3>
            
            <div className="space-y-4">
              {subjectStats.slice(0, 5).map((subject, index) => {
                const colors = [
                  'from-blue-500 to-blue-600',
                  'from-green-500 to-green-600', 
                  'from-purple-500 to-purple-600',
                  'from-yellow-500 to-yellow-600',
                  'from-red-500 to-red-600'
                ];
                
                return (
                  <div key={subject.subject} className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${colors[index % colors.length]}`} />
                    <div className="flex-1">
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="font-medium text-gray-900 dark:text-white">
                          {subject.subject}
                        </span>
                        <span className="text-gray-500 dark:text-gray-400">
                          {subject.hours.toFixed(1)}h
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${(subject.hours / Math.max(...subjectStats.map(s => s.hours))) * 100}%` }}
                          transition={{ delay: index * 0.1 }}
                          className={`bg-gradient-to-r ${colors[index % colors.length]} h-1.5 rounded-full`}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Achievements */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Award className="w-5 h-5 text-yellow-500" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Achievements
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {achievements.map((achievement) => (
              <motion.div
                key={achievement.id}
                whileHover={{ scale: 1.02 }}
                className={`p-4 rounded-lg border-2 transition-all ${
                  achievement.earned
                    ? 'border-yellow-200 bg-yellow-50 dark:border-yellow-700 dark:bg-yellow-900/20'
                    : 'border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800'
                }`}
              >
                <div className="text-center">
                  <div className={`text-3xl mb-2 ${achievement.earned ? '' : 'grayscale opacity-50'}`}>
                    {achievement.icon}
                  </div>
                  <h4 className={`font-semibold text-sm mb-1 ${
                    achievement.earned 
                      ? 'text-yellow-800 dark:text-yellow-200' 
                      : 'text-gray-600 dark:text-gray-400'
                  }`}>
                    {achievement.title}
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                    {achievement.description}
                  </p>
                  
                  {!achievement.earned && (
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                      <div
                        className="bg-gradient-to-r from-yellow-400 to-yellow-500 h-1.5 rounded-full transition-all"
                        style={{ width: `${(achievement.progress / (achievement.id === 1 ? 5 : achievement.id === 2 ? 3 : achievement.id === 3 ? 7 : 50)) * 100}%` }}
                      />
                    </div>
                  )}
                  
                  {achievement.earned && (
                    <div className="text-xs font-medium text-yellow-600 dark:text-yellow-400">
                      ✓ Earned
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Study Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-3">
              <Clock className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              <h4 className="font-semibold text-blue-900 dark:text-blue-100">
                Peak Hours
              </h4>
            </div>
            <p className="text-sm text-blue-700 dark:text-blue-300 mb-2">
              You're most productive between 2-4 PM
            </p>
            <div className="text-xs text-blue-600 dark:text-blue-400">
              Schedule important tasks during this time
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-3">
              <Zap className="w-6 h-6 text-green-600 dark:text-green-400" />
              <h4 className="font-semibold text-green-900 dark:text-green-100">
                Streak
              </h4>
            </div>
            <p className="text-sm text-green-700 dark:text-green-300 mb-2">
              4 days of consistent studying
            </p>
            <div className="text-xs text-green-600 dark:text-green-400">
              Keep it up! Aim for 7 days
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-3">
              <BookOpen className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              <h4 className="font-semibold text-purple-900 dark:text-purple-100">
                Focus Score
              </h4>
            </div>
            <p className="text-sm text-purple-700 dark:text-purple-300 mb-2">
              85% average session completion
            </p>
            <div className="text-xs text-purple-600 dark:text-purple-400">
              Excellent focus! Keep it up
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlannerAnalytics;
