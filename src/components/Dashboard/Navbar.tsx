import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, Search, Bell, Brain, BookOpen, Calendar, BarChart3, Timer, Upload, ChevronDown } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { SignedIn, SignedOut, UserButton, useUser } from '@clerk/clerk-react';
import Button from '../UI/Button';

interface NavbarProps {
  onMenuToggle: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onMenuToggle }) => {
  const navigate = useNavigate();
  const [showQuickAccess, setShowQuickAccess] = useState(false);
  const { user } = useUser();

  const studyFeatures = [
    {
      icon: Brain,
      title: 'AI Q&A Tutor',
      description: 'Get instant answers and step-by-step explanations for any question',
      path: '/ai-tutor',
      color: 'text-purple-600'
    },
    {
      icon: BookOpen,
      title: 'Smart Flashcards',
      description: 'Auto-generated flashcards that adapt to your learning pace',
      path: '/flashcards',
      color: 'text-blue-600'
    },
    {
      icon: Calendar,
      title: 'Study Planner',
      description: 'Personalized study schedules that fit your lifestyle',
      path: '/planner',
      color: 'text-green-600'
    },
    {
      icon: BarChart3,
      title: 'Progress Analytics',
      description: 'Detailed insights into your learning patterns and improvements',
      path: '/analytics',
      color: 'text-orange-600'
    },
    {
      icon: Timer,
      title: 'Focus Timer',
      description: 'Pomodoro technique with smart break reminders',
      path: '/focus-timer',
      color: 'text-red-600'
    },
    {
      icon: Upload,
      title: 'File Upload',
      description: 'Upload and organize your study materials',
      path: '/upload',
      color: 'text-indigo-600'
    }
  ];

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 lg:px-6 py-4"
    >
      <div className="flex items-center justify-between">
        {/* Left side - Menu & Search */}
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onMenuToggle}
            className="lg:hidden"
            icon={Menu}
          >
            <span className="sr-only">Menu</span>
          </Button>

          <div className="hidden md:flex items-center space-x-4">
            {/* Quick Access Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowQuickAccess(!showQuickAccess)}
                className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <Brain className="w-4 h-4" />
                <span>Study Tools</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${showQuickAccess ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {showQuickAccess && (
                  <>
                    <div 
                      className="fixed inset-0 z-10" 
                      onClick={() => setShowQuickAccess(false)}
                    />
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute top-full left-0 mt-2 w-80 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-20"
                    >
                      <div className="p-2">
                        <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide px-3 py-2">
                          Study Features
                        </div>
                        {studyFeatures.map((feature, index) => {
                          const Icon = feature.icon;
                          return (
                            <motion.button
                              key={feature.path}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.05 }}
                              onClick={() => {
                                navigate(feature.path);
                                setShowQuickAccess(false);
                              }}
                              className="w-full flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-left"
                            >
                              <Icon className={`w-5 h-5 mt-0.5 ${feature.color}`} />
                              <div className="flex-1 min-w-0">
                                <div className="text-sm font-medium text-gray-900 dark:text-white">
                                  {feature.title}
                                </div>
                                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                  {feature.description}
                                </div>
                              </div>
                            </motion.button>
                          );
                        })}
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            {/* Search */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="search"
                placeholder="Search anything..."
                className="block w-80 pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              />
            </div>
          </div>
        </div>

        {/* Right side - Notifications & Profile */}
        <div className="flex items-center space-x-4">
          {/* Search for mobile */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            icon={Search}
          >
            <span className="sr-only">Search</span>
          </Button>

          {/* Notifications */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
          >
            <Bell className="w-5 h-5" />
            {/* Notification badge */}
            <span className="absolute top-1 right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          </motion.button>

          {/* Profile / Auth */}
          <SignedIn>
            <div className="flex items-center space-x-3">
              <div className="hidden sm:block text-right">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {user?.firstName || 'Student'}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Welcome back!
                </p>
              </div>
              <UserButton appearance={{ elements: { avatarBox: 'w-8 h-8' } }} />
            </div>
          </SignedIn>
          <SignedOut>
            <Link
              to="/sign-in"
              className="px-3 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg"
            >
              Sign In
            </Link>
          </SignedOut>
        </div>
      </div>
    </motion.header>
  );
};

export default Navbar;
