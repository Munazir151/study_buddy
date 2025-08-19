import React from 'react';
import { motion } from 'framer-motion';
import { NavLink, useLocation } from 'react-router-dom';
import {
  Home,
  Upload,
  MessageCircle,
  BookOpen,
  Calendar,
  User,
  X,
} from 'lucide-react';
import ThemeToggle from '../UI/ThemeToggle';

interface NavItem {
  name: string;
  path: string;
  icon: React.ComponentType<any>;
  description: string;
}

const navItems: NavItem[] = [
  { name: 'Dashboard', path: '/dashboard', icon: Home, description: 'Overview & Stats' },
  { name: 'Upload', path: '/upload', icon: Upload, description: 'Upload Files' },
  { name: 'AI Chat', path: '/chat', icon: MessageCircle, description: 'Chat Assistant' },
  { name: 'Flashcards', path: '/flashcards', icon: BookOpen, description: 'Study Cards' },
  { name: 'Planner', path: '/planner', icon: Calendar, description: 'Study Schedule' },
  { name: 'Profile', path: '/profile', icon: User, description: 'Your Profile' },
];

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onToggle }) => {
  const location = useLocation();

  const sidebarVariants = {
    open: {
      x: 0,
      transition: {
        type: 'spring' as const,
        stiffness: 300,
        damping: 30,
      },
    },
    closed: {
      x: '-100%',
      transition: {
        type: 'spring' as const,
        stiffness: 300,
        damping: 30,
      },
    },
  };

  const overlayVariants = {
    open: { opacity: 1, pointerEvents: 'auto' as const },
    closed: { opacity: 0, pointerEvents: 'none' as const },
  };

  return (
    <>
      {/* Mobile Overlay */}
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
        variants={overlayVariants}
        animate={isOpen ? 'open' : 'closed'}
        onClick={onToggle}
      />

      {/* Sidebar */}
      <motion.aside
        className="fixed left-0 top-0 h-full w-72 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 shadow-lg z-50 lg:static lg:translate-x-0"
        variants={sidebarVariants}
        animate={isOpen ? 'open' : 'closed'}
        initial={false}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary-600 text-white rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900 dark:text-white">
                  Study Buddy
                </h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  AI Learning Assistant
                </p>
              </div>
            </div>
            
            <button
              onClick={onToggle}
              className="lg:hidden p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* User Info */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-purple-500 rounded-full flex items-center justify-center text-white font-medium">
                S
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                  Student
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  Welcome to StudyBuddy
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => {
                    // Close sidebar on mobile after navigation
                    if (window.innerWidth < 1024) {
                      onToggle();
                    }
                  }}
                  className={({ isActive: active }) =>
                    `group flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      active
                        ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/50 dark:text-primary-300'
                        : 'text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700'
                    }`
                  }
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center w-full"
                  >
                    <Icon
                      className={`w-5 h-5 mr-3 ${
                        isActive
                          ? 'text-primary-600 dark:text-primary-400'
                          : 'text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-300'
                      }`}
                    />
                    <div className="flex-1">
                      <div className="text-sm font-medium">{item.name}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {item.description}
                      </div>
                    </div>
                  </motion.div>
                </NavLink>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">Theme</span>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </motion.aside>
    </>
  );
};

export default Sidebar;
