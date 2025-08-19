import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useThemeStore } from '../../stores/themeStore';

const ThemeToggle: React.FC = () => {
  const { isDark, toggleTheme } = useThemeStore();

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative p-2 rounded-lg bg-gray-200 dark:bg-gray-700 transition-colors duration-200"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      <motion.div
        initial={false}
        animate={{
          rotate: isDark ? 180 : 0,
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        {isDark ? (
          <Moon className="w-5 h-5 text-gray-800 dark:text-gray-200" />
        ) : (
          <Sun className="w-5 h-5 text-gray-800 dark:text-gray-200" />
        )}
      </motion.div>
    </motion.button>
  );
};

export default ThemeToggle;
