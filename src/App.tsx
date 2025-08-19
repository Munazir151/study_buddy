import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react';
import { useThemeStore } from './stores/themeStore';
import Landing from './pages/Landing';
import ChatInterface from './components/Chat/ChatInterface';
import DashboardLayout from './components/Dashboard/DashboardLayout';
import SignInPage from './components/Auth/SignInPage';
import SignUpPage from './components/Auth/SignUpPage';
import AITutor from './components/AITutor/AITutor';
import SmartFlashcards from './components/Flashcards/SmartFlashcards';
import StudyPlanner from './components/Planner/StudyPlanner';
import PlannerAnalytics from './components/Planner/PlannerAnalytics';

// Temporary page components
const Upload = () => <div className="p-6"><h1 className="text-2xl font-bold text-gray-900 dark:text-white">Upload Files</h1></div>;
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

        {/* AI Tutor */}
        <Route path="/ai-tutor" element={
          <Protected>
            <DashboardLayout>
              <AITutor />
            </DashboardLayout>
          </Protected>
        } />
        
        {/* Dashboard Routes */}
        <Route path="/upload" element={
          <Protected>
            <DashboardLayout>
              <Upload />
            </DashboardLayout>
          </Protected>
        } />
        <Route path="/flashcards" element={
          <Protected>
            <DashboardLayout>
              <SmartFlashcards />
            </DashboardLayout>
          </Protected>
        } />
        <Route path="/planner" element={
          <Protected>
            <DashboardLayout>
              <StudyPlanner />
            </DashboardLayout>
          </Protected>
        } />
        <Route path="/analytics" element={
          <Protected>
            <DashboardLayout>
              <PlannerAnalytics />
            </DashboardLayout>
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

