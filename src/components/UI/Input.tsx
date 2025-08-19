import React from 'react';
import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  icon: Icon,
  iconPosition = 'left',
  fullWidth = false,
  className = '',
  id,
  ...props
}) => {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
  const hasIcon = !!Icon;
  
  const baseClasses = 'input-field focus:outline-none focus:ring-2 focus:border-primary-500 transition-colors duration-200';
  
  const iconClasses = hasIcon
    ? iconPosition === 'left'
      ? 'pl-10'
      : 'pr-10'
    : '';
  
  const errorClasses = error
    ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
    : '';
  
  const widthClass = fullWidth ? 'w-full' : '';
  
  const inputClasses = `${baseClasses} ${iconClasses} ${errorClasses} ${widthClass} ${className}`;
  
  return (
    <div className={fullWidth ? 'w-full' : ''}>
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300"
        >
          {label}
        </label>
      )}
      
      <div className="relative">
        {Icon && (
          <div
            className={`absolute inset-y-0 ${
              iconPosition === 'left' ? 'left-0 pl-3' : 'right-0 pr-3'
            } flex items-center pointer-events-none`}
          >
            <Icon className="w-5 h-5 text-gray-400 dark:text-gray-500" />
          </div>
        )}
        
        <motion.input
          id={inputId}
          className={inputClasses}
          whileFocus={{ scale: 1.01 }}
          transition={{ duration: 0.2 }}
          {...(props as any)}
        />
      </div>
      
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-1 text-sm text-red-600 dark:text-red-400"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
};

export default Input;
