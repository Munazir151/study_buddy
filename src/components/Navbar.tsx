import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';
import { Menu, X, GraduationCap, Timer, Play, Pause, RotateCcw } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [timerTime, setTimerTime] = useState(25 * 60); // 25 minutes in seconds
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timerMode, setTimerMode] = useState<'work' | 'break'>('work');

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning && timerTime > 0) {
      interval = setInterval(() => {
        setTimerTime(time => time - 1);
      }, 1000);
    } else if (timerTime === 0) {
      setIsTimerRunning(false);
      // Switch between work and break
      if (timerMode === 'work') {
        setTimerMode('break');
        setTimerTime(5 * 60); // 5 minute break
      } else {
        setTimerMode('work');
        setTimerTime(25 * 60); // 25 minute work
      }
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerTime, timerMode]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleTimer = () => {
    setIsTimerRunning(!isTimerRunning);
  };

  const resetTimer = () => {
    setIsTimerRunning(false);
    setTimerMode('work');
    setTimerTime(25 * 60);
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <GraduationCap className="w-8 h-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">StudyBuddy</span>
            </Link>
          </div>

          {/* Focus Timer */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-gray-100 rounded-lg px-3 py-2">
              <Timer className="w-4 h-4 text-gray-600" />
              <span className={`font-mono text-sm ${timerMode === 'work' ? 'text-blue-600' : 'text-green-600'}`}>
                {formatTime(timerTime)}
              </span>
              <button
                onClick={toggleTimer}
                className="p-1 hover:bg-gray-200 rounded transition-colors"
              >
                {isTimerRunning ? (
                  <Pause className="w-4 h-4 text-gray-600" />
                ) : (
                  <Play className="w-4 h-4 text-gray-600" />
                )}
              </button>
              <button
                onClick={resetTimer}
                className="p-1 hover:bg-gray-200 rounded transition-colors"
              >
                <RotateCcw className="w-4 h-4 text-gray-600" />
              </button>
              <span className="text-xs text-gray-500 capitalize">{timerMode}</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors">
              Home
            </Link>
            <a href="/#ai-tutor" className="text-gray-700 hover:text-blue-600 transition-colors">AI Tutor</a>
            <Link to="/chat" className="text-gray-700 hover:text-blue-600 transition-colors">AI Chat</Link>
            <a href="/#flashcards" className="text-gray-700 hover:text-blue-600 transition-colors">
              Flashcards
            </a>
            <a href="/#planner" className="text-gray-700 hover:text-blue-600 transition-colors">
              Study Planner
            </a>
            <a href="/#analytics" className="text-gray-700 hover:text-blue-600 transition-colors">
              Analytics
            </a>
            <a href="/#upload" className="text-gray-700 hover:text-blue-600 transition-colors">
              Upload
            </a>

            <div className="ml-4 flex items-center space-x-3">
              <SignedOut>
                <Link to="/sign-in" className="text-gray-700 hover:text-blue-600 transition-colors">Sign In</Link>
                <Link to="/sign-up" className="px-3 py-1 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors">Sign Up</Link>
              </SignedOut>
              <SignedIn>
                <UserButton appearance={{ elements: { avatarBox: 'w-8 h-8' } }} />
              </SignedIn>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-blue-600"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-2">
            {/* Mobile Timer */}
            <div className="flex items-center justify-center space-x-2 bg-gray-100 rounded-lg px-3 py-2 mb-4">
              <Timer className="w-4 h-4 text-gray-600" />
              <span className={`font-mono text-sm ${timerMode === 'work' ? 'text-blue-600' : 'text-green-600'}`}>
                {formatTime(timerTime)}
              </span>
              <button
                onClick={toggleTimer}
                className="p-1 hover:bg-gray-200 rounded transition-colors"
              >
                {isTimerRunning ? (
                  <Pause className="w-4 h-4 text-gray-600" />
                ) : (
                  <Play className="w-4 h-4 text-gray-600" />
                )}
              </button>
              <button
                onClick={resetTimer}
                className="p-1 hover:bg-gray-200 rounded transition-colors"
              >
                <RotateCcw className="w-4 h-4 text-gray-600" />
              </button>
              <span className="text-xs text-gray-500 capitalize">{timerMode}</span>
            </div>
            
            <Link to="/" className="block py-2 text-gray-700 hover:text-blue-600 transition-colors">
              Home
            </Link>
            <a href="/#ai-tutor" className="block py-2 text-gray-700 hover:text-blue-600 transition-colors">AI Tutor</a>
            <Link to="/chat" className="block py-2 text-gray-700 hover:text-blue-600 transition-colors">AI Chat</Link>
            <a href="/#flashcards" className="block py-2 text-gray-700 hover:text-blue-600 transition-colors">
              Flashcards
            </a>
            <a href="/#planner" className="block py-2 text-gray-700 hover:text-blue-600 transition-colors">
              Study Planner
            </a>
            <a href="/#analytics" className="block py-2 text-gray-700 hover:text-blue-600 transition-colors">
              Analytics
            </a>
            <a href="/#upload" className="block py-2 text-gray-700 hover:text-blue-600 transition-colors">Upload</a>

            <div className="pt-2 border-t border-gray-200">
              <SignedOut>
                <Link to="/sign-in" className="block py-2 text-gray-700 hover:text-blue-600 transition-colors">Sign In</Link>
                <Link to="/sign-up" className="block py-2 text-gray-700 hover:text-blue-600 transition-colors">Sign Up</Link>
              </SignedOut>
              <SignedIn>
                <div className="py-2"><UserButton appearance={{ elements: { avatarBox: 'w-7 h-7' } }} /></div>
              </SignedIn>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;