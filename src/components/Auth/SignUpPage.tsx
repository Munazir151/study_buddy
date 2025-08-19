import React from 'react';
import { SignUp } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GraduationCap, Zap, Shield, Heart, CheckCircle } from 'lucide-react';

const SignUpPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        
        {/* Left Side - Sign Up Form */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center order-2 lg:order-1"
        >
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Join StudyBuddy AI</h3>
              <p className="text-gray-600">Start your personalized learning journey today</p>
            </div>
            
            <SignUp 
              appearance={{
                elements: {
                  formButtonPrimary: 
                    "bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white",
                  card: "shadow-none",
                  headerTitle: "hidden",
                  headerSubtitle: "hidden",
                }
              }}
              redirectUrl="/dashboard"
            />
            
            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Already have an account?{' '}
                <Link 
                  to="/sign-in" 
                  className="text-purple-600 hover:text-purple-700 font-medium transition-colors"
                >
                  Sign in here
                </Link>
              </p>
            </div>

            {/* Trust Indicators */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-center space-x-4 text-xs text-gray-500">
                <div className="flex items-center space-x-1">
                  <Shield className="w-3 h-3" />
                  <span>Secure</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Heart className="w-3 h-3" />
                  <span>Trusted</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Zap className="w-3 h-3" />
                  <span>Fast Setup</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Side - Benefits and Features */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center lg:text-left order-1 lg:order-2"
        >
          {/* Logo and Brand */}
          <div className="flex items-center justify-center lg:justify-start space-x-4 mb-8">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 via-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
              <GraduationCap className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">StudyBuddy AI</h1>
              <p className="text-sm text-purple-600 font-medium">Transform Your Learning</p>
            </div>
          </div>

          {/* Main Heading */}
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Start Learning
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-600"> Smarter Today!</span>
          </h2>
          
          <p className="text-xl text-gray-600 mb-8 max-w-lg">
            Join thousands of students who are already excelling with our AI-powered study platform.
          </p>

          {/* Benefits List */}
          <div className="space-y-4 mb-8">
            {[
              "Get instant help from AI tutors 24/7",
              "Create adaptive flashcards automatically",
              "Track your learning progress with analytics",
              "Build personalized study schedules",
              "Access focus timers and productivity tools"
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="flex items-center space-x-3"
              >
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span className="text-gray-700">{benefit}</span>
              </motion.div>
            ))}
          </div>

          {/* Success Stats */}
          <div className="grid grid-cols-3 gap-6 p-6 bg-white/60 backdrop-blur-sm rounded-xl border border-gray-200">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">95%</div>
              <div className="text-sm text-gray-600">Improved Grades</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">50%</div>
              <div className="text-sm text-gray-600">Faster Learning</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">10k+</div>
              <div className="text-sm text-gray-600">Happy Students</div>
            </div>
          </div>

          {/* Testimonial */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-8 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-200"
          >
            <p className="text-gray-700 italic mb-2">
              "StudyBuddy AI helped me improve my grades by 30% in just one semester!"
            </p>
            <p className="text-sm text-gray-600">- Sarah, University Student</p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default SignUpPage;