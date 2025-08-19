import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useThemeStore } from './stores/themeStore';
import Landing from './pages/Landing';
import ChatInterface from './components/Chat/ChatInterface';
import DashboardLayout from './components/Dashboard/DashboardLayout';
import StudyPlanner from './components/Planner/StudyPlanner';

// Temporary page components
const Upload = () => <div className="p-6"><h1 className="text-2xl font-bold text-gray-900 dark:text-white">Upload Files</h1></div>;
const Chat = () => <div className="p-6"><h1 className="text-2xl font-bold text-gray-900 dark:text-white">AI Chat</h1></div>;
const Flashcards = () => <div className="p-6"><h1 className="text-2xl font-bold text-gray-900 dark:text-white">Flashcards</h1></div>;
const Profile = () => <div className="p-6"><h1 className="text-2xl font-bold text-gray-900 dark:text-white">Profile</h1></div>;

function App() {
  const { setTheme } = useThemeStore();

  useEffect(() => {
    // Check system preference on first load
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (!localStorage.getItem('theme-storage')) {
      setTheme(prefersDark);
    }
  }, [setTheme]);

  return (
    <Router>
      <Routes>
        {/* Landing Page */}
        <Route path="/" element={<Landing />} />
        
        {/* Chatbot Interface */}
        <Route path="/chat" element={<ChatInterface />} />
        
        {/* Dashboard Routes */}
        <Route path="/upload" element={
          <DashboardLayout>
            <Upload />
          </DashboardLayout>
        } />
        <Route path="/flashcards" element={
          <DashboardLayout>
            <Flashcards />
          </DashboardLayout>
        } />
        <Route path="/planner" element={
          <DashboardLayout>
            <StudyPlanner />
          </DashboardLayout>
        } />
        <Route path="/profile" element={
          <DashboardLayout>
            <Profile />
          </DashboardLayout>
        } />
      </Routes>
    </Router>
  );
}

export default App;
