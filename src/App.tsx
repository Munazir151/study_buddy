import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react';
import { useThemeStore } from './stores/themeStore';
import Landing from './pages/Landing';
import ChatInterface from './components/Chat/ChatInterface';
import DashboardLayout from './components/Dashboard/DashboardLayout';
import SignInPage from './components/Auth/SignInPage';
import SignUpPage from './components/Auth/SignUpPage';
import AITutor from './pages/AITutor';
import Flashcards from './pages/Flashcards';
import StudyPlanner from './pages/StudyPlanner';
import Analytics from './pages/Analytics';
import Upload from './pages/Upload';


// Temporary page components
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

        {/* Auth */}
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        
        {/* Chatbot Interface */}
        <Route path="/chat" element={
          <Protected>
            <ChatInterface />
          </Protected>
        } />

        {/* Feature Pages (Protected) */}
        <Route path="/ai-tutor" element={
          <Protected>
            <AITutor />
          </Protected>
        } />
        <Route path="/flashcards" element={
          <Protected>
            <Flashcards />
          </Protected>
        } />
        <Route path="/planner" element={
          <Protected>
            <StudyPlanner />
          </Protected>
        } />
        <Route path="/analytics" element={
          <Protected>
            <Analytics />
          </Protected>
        } />
        
        {/* Dashboard Routes */}
        {/* Backward-compatible alias for old Study Planner URL */}
        <Route path="/study-planner" element={<Navigate to="/planner" replace />} />
        <Route path="/upload" element={
          <Protected>
            <Upload />
          </Protected>
        } />
        
        
        <Route path="/profile" element={
          <Protected>
            <DashboardLayout>
              <Profile />
            </DashboardLayout>
          </Protected>
        } />
      </Routes>
    </Router>
  );
}

export default App;
function Protected({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SignedIn>{children}</SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
}

