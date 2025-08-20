import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import AnimatedBackground from '../components/UI/AnimatedBackground';
import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';
import { Menu, X } from 'lucide-react';

 

const Landing: React.FC = () => {
  const [counters, setCounters] = useState({ students: 0, hours: 0, success: 0 });
  const [mobileNavOpen, setMobileNavOpen] = useState<boolean>(false);

  // Animated counter effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setCounters({ students: 25000, hours: 150000, success: 94 });
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div className="min-h-screen overflow-x-hidden">
      <AnimatedBackground />
      
      {/* Navigation */}
      <nav className="relative z-20 p-6">
        <div className="max-w-screen-2xl mx-auto flex justify-between items-center flex-wrap gap-3">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-3"
          >
            <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">S</span>
            </div>
            <span className="text-2xl font-bold gradient-text">StudyBuddy</span>
          </motion.div>
          {/* Middle nav - feature links and auth (Signed out) */}
           <div className="hidden md:flex items-center flex-wrap justify-center gap-3 md:gap-6 max-w-[60%] text-sm md:text-base">
            <Link to="/ai-tutor" className="text-gray-700 hover:text-blue-600 transition-colors">AI Tutor</Link>
            <Link to="/flashcards" className="text-gray-700 hover:text-blue-600 transition-colors">Flashcards</Link>
            <Link to="/planner" className="text-gray-700 hover:text-blue-600 transition-colors">Study Planner</Link>
            <Link to="/analytics" className="text-gray-700 hover:text-blue-600 transition-colors">Analytics</Link>
            <Link to="/upload" className="text-gray-700 hover:text-blue-600 transition-colors">Upload</Link>
            <SignedOut>
              <Link 
                to="/sign-in" 
                className="ml-2 md:ml-4 bg-white text-gray-700 px-3 py-2 md:px-4 md:py-2 rounded-full font-semibold hover:shadow-lg transition-all duration-300 border border-gray-200"
              >
                Sign In
              </Link>
              <Link 
                to="/sign-up" 
                className="gradient-primary text-white px-3 py-2 md:px-4 md:py-2 rounded-full font-semibold hover:shadow-lg transition-all duration-300"
              >
                Sign Up
              </Link>
            </SignedOut>
          </div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center space-x-4"
          >
            {/* Mobile menu button */}
            <button
              type="button"
              className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg border border-gray-200 hover:bg-gray-100 text-gray-700"
              onClick={() => setMobileNavOpen(!mobileNavOpen)}
              aria-label="Toggle menu"
            >
              {mobileNavOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <SignedIn>
              <UserButton appearance={{ elements: { avatarBox: 'w-8 h-8' } }} />
            </SignedIn>
          </motion.div>
        </div>

        {/* Mobile dropdown menu */}
        {mobileNavOpen && (
         <div className="md:hidden mt-3">
            <div className="max-w-7xl mx-auto px-2">
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 space-y-2">
                <Link to="/ai-tutor" onClick={() => setMobileNavOpen(false)} className="block py-2 text-gray-700 hover:text-blue-600">AI Tutor</Link>
                <Link to="/flashcards" onClick={() => setMobileNavOpen(false)} className="block py-2 text-gray-700 hover:text-blue-600">Flashcards</Link>
                <Link to="/planner" onClick={() => setMobileNavOpen(false)} className="block py-2 text-gray-700 hover:text-blue-600">Study Planner</Link>
                <Link to="/analytics" onClick={() => setMobileNavOpen(false)} className="block py-2 text-gray-700 hover:text-blue-600">Analytics</Link>
                <Link to="/upload" onClick={() => setMobileNavOpen(false)} className="block py-2 text-gray-700 hover:text-blue-600">Upload</Link>
                <SignedOut>
                  <div className="pt-2 mt-2 border-t border-gray-200 flex items-center gap-3">
                    <Link to="/sign-in" onClick={() => setMobileNavOpen(false)} className="flex-1 text-center bg-white text-gray-700 px-4 py-2 rounded-full font-semibold border border-gray-200">Sign In</Link>
                    <Link to="/sign-up" onClick={() => setMobileNavOpen(false)} className="flex-1 text-center gradient-primary text-white px-4 py-2 rounded-full font-semibold">Sign Up</Link>
                  </div>
                </SignedOut>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-screen-2xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              variants={staggerContainer}
              initial="initial"
              animate="animate"
              className="text-center lg:text-left"
            >
              <motion.h1 
                variants={fadeInUp}
                className="text-5xl lg:text-7xl font-bold leading-tight mb-6"
              >
                Learn Faster with
                <span className="gradient-text block">AI-Powered</span>
                Study Assistant
              </motion.h1>
              
              <motion.p 
                variants={fadeInUp}
                className="text-xl text-gray-600 mb-8 leading-relaxed"
              >
                Transform your study routine with personalized AI tutoring, smart flashcards, 
                and progress tracking that adapts to your learning style.
              </motion.p>
              
              <motion.div 
                variants={fadeInUp}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              >
                <Link 
                  to="/chat" 
                  className="gradient-primary text-white px-8 py-4 rounded-full font-semibold text-lg pulse-glow hover:scale-105 transition-all duration-300"
                >
                  🚀 Start Learning Free
                </Link>
                <button className="bg-white text-gray-700 px-8 py-4 rounded-full font-semibold text-lg border border-gray-200 hover:shadow-lg transition-all duration-300">
                  📹 Watch Demo
                </button>
              </motion.div>
              
              <motion.div 
                variants={fadeInUp}
                className="flex items-center justify-center lg:justify-start gap-4 mt-8 text-sm text-gray-500"
              >
                <span>✨ No credit card required</span>
                <span>📚 Free forever plan</span>
                <span>⭐ Trusted by 25k+ students</span>
              </motion.div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative"
            >
              <div className="relative">
                {/* Floating icons around the central illustration */}
                <motion.div className="absolute -top-6 -left-6 floating-animation">
                  <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center">
                    <span className="text-2xl">📚</span>
                  </div>
                </motion.div>
                
                <motion.div className="absolute -top-6 -right-6 floating-animation-delayed">
                  <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center">
                    <span className="text-2xl">⚡</span>
                  </div>
                </motion.div>
                
                <motion.div className="absolute -bottom-6 -left-6 floating-animation-delayed">
                  <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center">
                    <span className="text-2xl">🎯</span>
                  </div>
                </motion.div>
                
                <motion.div className="absolute -bottom-6 -right-6 floating-animation">
                  <div className="w-16 h-16 bg-yellow-100 rounded-2xl flex items-center justify-center">
                    <span className="text-2xl">🏆</span>
                  </div>
                </motion.div>
                
                {/* Central device mockup */}
                <div className="bg-white rounded-3xl p-8 shadow-2xl mx-0 lg:mx-8">
                  <div className="aspect-video bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl flex items-center justify-center text-6xl">
                    👨‍💻
                  </div>
                  <div className="mt-6 space-y-3">
                    <div className="h-4 bg-gray-200 rounded-full w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded-full w-1/2"></div>
                    <div className="flex space-x-2">
                      <div className="h-8 bg-blue-100 rounded-lg flex-1"></div>
                      <div className="h-8 bg-purple-100 rounded-lg flex-1"></div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="max-w-screen-2xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Get Started in <span className="gradient-text">3 Simple Steps</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join thousands of students who've transformed their learning experience
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { step: "01", title: "Create Account", desc: "Sign up in seconds and tell us about your learning goals", icon: "👤" },
              { step: "02", title: "Get Study Plan", desc: "Our AI creates a personalized study plan just for you", icon: "🎯" },
              { step: "03", title: "Learn & Track", desc: "Study with AI assistance and track your amazing progress", icon: "📈" }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="text-center group"
              >
                <div className="relative mb-8">
                  <div className="w-24 h-24 gradient-primary rounded-full flex items-center justify-center text-4xl text-white mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {item.step}
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-screen-2xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Powerful Features for <span className="gradient-text">Smarter Learning</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to excel in your studies, powered by cutting-edge AI
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "AI Q&A Tutor", desc: "Get instant answers and step-by-step explanations for any question", icon: "🤖", color: "bg-blue-500" },
              { title: "Smart Flashcards", desc: "Auto-generated flashcards that adapt to your learning pace", icon: "📇", color: "bg-purple-500" },
              { title: "Study Planner", desc: "Personalized study schedules that fit your lifestyle", icon: "📅", color: "bg-green-500" },
              { title: "Progress Analytics", desc: "Detailed insights into your learning patterns and improvements", icon: "📊", color: "bg-orange-500" },
              { title: "Focus Timer", desc: "Pomodoro technique with smart break reminders", icon: "⏰", color: "bg-red-500" },
              { title: "File Upload", desc: "Upload documents and get instant summaries and quizzes", icon: "📄", color: "bg-indigo-500" }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 card-hover cursor-pointer group"
              >
                <div className={`w-16 h-16 ${feature.color} rounded-2xl flex items-center justify-center text-3xl text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="py-20 bg-white">
        <div className="max-w-screen-2xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              See StudyBuddy in <span className="gradient-text">Action</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the intuitive interface that makes learning enjoyable
            </p>
          </motion.div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center text-white font-bold">
                  ✨
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Interactive Dashboard</h3>
                  <p className="text-gray-600">Clean, intuitive interface that adapts to your study habits</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center text-white font-bold">
                  📱
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Mobile Optimized</h3>
                  <p className="text-gray-600">Study anywhere, anytime with our responsive design</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center text-white font-bold">
                  🎨
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Beautiful Design</h3>
                  <p className="text-gray-600">Carefully crafted UI that makes studying feel less like work</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-gray-900 rounded-3xl p-6 shadow-2xl">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                </div>
                <div className="bg-white rounded-2xl p-6 aspect-video">
                  <div className="h-full gradient-primary rounded-xl flex items-center justify-center text-white text-2xl font-bold">
                    StudyBuddy Dashboard Preview
                  </div>
                </div>
              </div>
              
              {/* Mobile mockup */}
              <div className="absolute -bottom-8 -right-8 bg-gray-900 rounded-3xl p-4 shadow-xl w-48">
                <div className="bg-white rounded-2xl p-4 aspect-[9/16]">
                  <div className="h-full gradient-primary rounded-xl flex items-center justify-center text-white text-sm font-bold">
                    Mobile App
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      

      {/* Stats Section */}
      <section className="py-20 gradient-primary">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center text-white"
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Trusted by Students Worldwide
            </h2>
            <p className="text-xl opacity-90 mb-16 max-w-3xl mx-auto">
              Join thousands of successful learners who've achieved their goals with StudyBuddy
            </p>
            
            <div className="grid md:grid-cols-3 gap-12">
              {[
                { number: counters.students.toLocaleString() + "+", label: "Active Students", icon: "👥" },
                { number: counters.hours.toLocaleString() + "+", label: "Study Hours Saved", icon: "⏱️" },
                { number: counters.success + "%", label: "Success Rate", icon: "🎯" }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="text-center"
                >
                  <div className="text-6xl mb-4">{stat.icon}</div>
                  <div className="text-4xl lg:text-5xl font-bold mb-2">{stat.number}</div>
                  <div className="text-xl opacity-90">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              What Students <span className="gradient-text">Say</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real feedback from real students who've transformed their learning
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Sarah Chen", role: "Computer Science Student", rating: 5, text: "StudyBuddy helped me ace my algorithms course! The AI tutor explanations are incredibly clear.", avatar: "👩‍💻" },
              { name: "Marcus Johnson", role: "Med School Student", rating: 5, text: "The flashcard feature is a game-changer. It saved me hours of study time during exam season.", avatar: "👨‍⚕️" },
              { name: "Emma Rodriguez", role: "High School Student", rating: 5, text: "Finally, studying doesn't feel like a chore anymore. The interface is so beautiful and motivating!", avatar: "👩‍🎓" }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="bg-white rounded-2xl p-8 card-hover"
              >
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-2xl mr-4">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">{testimonial.name}</h4>
                    <p className="text-gray-600 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-xl">⭐</span>
                  ))}
                </div>
                
                <p className="text-gray-700 leading-relaxed italic">"{testimonial.text}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 gradient-primary">
        <div className="max-w-screen-lg mx-auto px-6 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-6xl font-bold mb-6">
              Ready to Transform Your Learning?
            </h2>
            <p className="text-xl opacity-90 mb-12 max-w-2xl mx-auto leading-relaxed">
              Join thousands of students who are already studying smarter, not harder. 
              Start your free trial today and experience the future of learning.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link 
                to="/chat" 
                className="bg-white text-gray-900 px-10 py-5 rounded-full font-bold text-xl hover:scale-105 transition-transform duration-300 glow-effect"
              >
                🚀 Start Free Trial
              </Link>
              <button className="border-2 border-white text-white px-10 py-5 rounded-full font-bold text-xl hover:bg-white hover:text-gray-900 transition-all duration-300">
                📞 Contact Sales
              </button>
            </div>
            
            <p className="text-sm opacity-75 mt-8">
              ✨ No credit card required • 📚 Free forever plan • 🔒 Cancel anytime
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-screen-2xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-xl">S</span>
                </div>
                <span className="text-2xl font-bold">StudyBuddy</span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Empowering students worldwide with AI-powered learning tools.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold text-lg mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Mobile App</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-lg mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-lg mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Status</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2025 StudyBuddy. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">📘 Facebook</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">🐦 Twitter</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">📷 Instagram</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">💼 LinkedIn</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
