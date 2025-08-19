import React from 'react';
import { SignIn } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GraduationCap, Brain, BookOpen, Target } from 'lucide-react';

const SignInPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        
        {/* Left Side - Branding and Features */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center lg:text-left"
        >
          {/* Logo and Brand */}
          <div className="flex items-center justify-center lg:justify-start space-x-4 mb-8">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
              <GraduationCap className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">StudyBuddy AI</h1>
              <p className="text-sm text-blue-600 font-medium">Your Learning Companion</p>
            </div>
          </div>

          {/* Welcome Message */}
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Welcome Back to
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600"> Learning!</span>
          </h2>
          
          <p className="text-xl text-gray-600 mb-8 max-w-lg">
            Continue your educational journey with AI-powered study tools designed to help you excel.
          </p>

          {/* Features Grid */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center space-x-3 p-4 bg-white/60 backdrop-blur-sm rounded-lg border border-gray-200"
            >
              <Brain className="w-6 h-6 text-blue-500" />
              <div className="text-left">
                <div className="font-semibold text-gray-900">AI Tutor</div>
                <div className="text-sm text-gray-600">24/7 Learning Help</div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex items-center space-x-3 p-4 bg-white/60 backdrop-blur-sm rounded-lg border border-gray-200"
            >
              <BookOpen className="w-6 h-6 text-purple-500" />
              <div className="text-left">
                <div className="font-semibold text-gray-900">Smart Cards</div>
                <div className="text-sm text-gray-600">Adaptive Flashcards</div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex items-center space-x-3 p-4 bg-white/60 backdrop-blur-sm rounded-lg border border-gray-200"
            >
              <Target className="w-6 h-6 text-green-500" />
              <div className="text-left">
                <div className="font-semibold text-gray-900">Study Plans</div>
                <div className="text-sm text-gray-600">Personalized Schedule</div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex items-center space-x-3 p-4 bg-white/60 backdrop-blur-sm rounded-lg border border-gray-200"
            >
              <div className="w-6 h-6 bg-orange-500 rounded flex items-center justify-center">
                <span className="text-white text-xs font-bold">📊</span>
              </div>
              <div className="text-left">
                <div className="font-semibold text-gray-900">Analytics</div>
                <div className="text-sm text-gray-600">Track Progress</div>
              </div>
            </motion.div>
          </div>

          {/* Social Proof */}
          <div className="flex items-center justify-center lg:justify-start space-x-4 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <span className="font-semibold text-gray-900">10,000+</span>
              <span>Students</span>
            </div>
            <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
            <div className="flex items-center space-x-1">
              <span className="font-semibold text-gray-900">4.9/5</span>
              <span>Rating</span>
            </div>
            <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
            <div className="flex items-center space-x-1">
              <span className="font-semibold text-gray-900">95%</span>
              <span>Success Rate</span>
            </div>
          </div>
        </motion.div>

        {/* Right Side - Sign In Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center"
        >
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Sign In to Continue</h3>
              <p className="text-gray-600">Access your personalized learning dashboard</p>
            </div>
            
            <SignIn 
              appearance={{
                elements: {
                  formButtonPrimary: 
                    "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white",
                  card: "shadow-none",
                  headerTitle: "hidden",
                  headerSubtitle: "hidden",
                }
              }}
              redirectUrl="/"
            />
            
            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Don't have an account?{' '}
                <Link 
                  to="/sign-up" 
                  className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
                >
                  Sign up here
                </Link>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SignInPage;