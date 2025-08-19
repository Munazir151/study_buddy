import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <Sidebar isOpen={sidebarOpen} onToggle={toggleSidebar} />

        {/* Main content */}
        <div className="flex flex-col flex-1 overflow-hidden">
          <Navbar onMenuToggle={toggleSidebar} />
          
          <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900"
          >
            <div className="container mx-auto px-4 lg:px-6 py-6 max-w-7xl">
              {children}
            </div>
          </motion.main>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
