import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, ExternalLink } from 'lucide-react';

declare global {
  interface Window {
    chatbase?: (...args: any[]) => void;
  }
}

const ChatInterface: React.FC = () => {
  const [isWidgetLoaded, setIsWidgetLoaded] = useState(false);

  useEffect(() => {
    // Check if Chatbase is loaded
    const checkChatbase = () => {
      if (window.chatbase) {
        setIsWidgetLoaded(true);
        console.log('✅ Chatbase widget loaded successfully');
        
        // Initialize the widget
        window.chatbase('init', {
          chatbotId: 'OuRLXEvo7q4ti53YQpfWx'
        });
      } else {
        console.log('⏳ Waiting for Chatbase to load...');
        setTimeout(checkChatbase, 500);
      }
    };

    checkChatbase();
  }, []);

  const openChatbaseWidget = () => {
    if (window.chatbase) {
      if (window.chatbase) {
        if (window.chatbase) {
          window.chatbase('open');
        }
      }
    } else {
      alert('Chatbase widget is still loading. Please try again in a moment.');
    }
  };

  const refreshWidget = () => {
    if (window.chatbase) {
      window.chatbase('close');
      setTimeout(() => {
        window.chatbase('open');
      }, 500);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Header */}
  

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center max-w-lg">
          {/* Loading State */}
          {!isWidgetLoaded && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-8"
            >
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mb-4 mx-auto animate-pulse">
                <MessageCircle className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">Loading StudyBuddy AI...</h2>
              <p className="text-gray-600">Please wait while we initialize your AI study assistant.</p>
            </motion.div>
          )}

          {/* Ready State */}
          {isWidgetLoaded && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-6 mx-auto shadow-lg">
                <MessageCircle className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-3">Welcome to StudyBuddy AI</h2>
              <p className="text-lg text-gray-600 mb-6">
                Your intelligent study companion powered by advanced AI. Get help with homework, 
                explanations, study plans, and much more!
              </p>
              
              {/* Features Grid */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                  <div className="text-blue-600 font-semibold text-sm mb-1">📚 Subject Help</div>
                  <div className="text-gray-700 text-xs">Math, Science, History, Literature & more</div>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg border border-purple-100">
                  <div className="text-purple-600 font-semibold text-sm mb-1">🎯 Study Plans</div>
                  <div className="text-gray-700 text-xs">Personalized learning schedules</div>
                </div>
                <div className="p-4 bg-green-50 rounded-lg border border-green-100">
                  <div className="text-green-600 font-semibold text-sm mb-1">💡 Explanations</div>
                  <div className="text-gray-700 text-xs">Complex topics made simple</div>
                </div>
                <div className="p-4 bg-orange-50 rounded-lg border border-orange-100">
                  <div className="text-orange-600 font-semibold text-sm mb-1">📝 Practice</div>
                  <div className="text-gray-700 text-xs">Quizzes and test preparation</div>
                </div>
              </div>

              {/* CTA Button */}
              <button
                onClick={openChatbaseWidget}
                className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              >
                <span className="flex items-center justify-center space-x-2">
                  <MessageCircle className="w-5 h-5" />
                  <span>Start Studying with AI</span>
                  <ExternalLink className="w-4 h-4 opacity-75" />
                </span>
                <div className="absolute inset-0 bg-white opacity-20 rounded-xl blur-xl group-hover:opacity-30 transition-opacity"></div>
              </button>

              <p className="text-sm text-gray-500 mt-4">
                The chat widget will appear in the bottom-right corner of your screen
              </p>
            </motion.div>
          )}

          {/* Quick Tips */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gray-50 rounded-lg p-6 border border-gray-200"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-3">💡 Quick Tips</h3>
            <div className="text-left space-y-2 text-sm text-gray-600">
              <div className="flex items-start space-x-2">
                <span className="text-blue-500 font-bold">•</span>
                <span>Ask specific questions for better answers</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-blue-500 font-bold">•</span>
                <span>Upload images of problems for visual help</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-blue-500 font-bold">•</span>
                <span>Request step-by-step explanations</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-blue-500 font-bold">•</span>
                <span>Ask for practice questions and quizzes</span>
              </div>
            </div>
          </motion.div>

          {/* Example Prompts */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-6"
          >
            <h3 className="text-md font-semibold text-gray-900 mb-3">🚀 Try asking:</h3>
            <div className="grid grid-cols-1 gap-2 text-sm">
              <button
                onClick={openChatbaseWidget}
                className="p-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 text-left transition-colors"
              >
                "Explain photosynthesis in simple terms"
              </button>
              <button
                onClick={openChatbaseWidget}
                className="p-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 text-left transition-colors"
              >
                "Help me solve this calculus problem"
              </button>
              <button
                onClick={openChatbaseWidget}
                className="p-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 text-left transition-colors"
              >
                "Create a study schedule for my biology exam"
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-gray-200 bg-gray-50 p-4">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs text-gray-500">
            StudyBuddy AI is powered by advanced language models. 
            Always verify important information and cite sources for academic work.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
