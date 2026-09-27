import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ToastProvider } from './contexts/ToastContext';
import { BookmarkProvider } from './contexts/bookmarkContext';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import VerifyOtpPage from './pages/VerifyOtpPage';
import DashboardPage from './pages/DashboardPage';
import ProfilePage from './pages/ProfilePage';

// Pages that should NOT show the top navbar
// (they have their own layout — split screen, or sidebar)
const HIDE_NAVBAR_PREFIXES = ['/login', '/signup', '/verify-otp', '/dashboard'];

function AppContent() {
  const location = useLocation();

  const hideNavbar = HIDE_NAVBAR_PREFIXES.some((prefix) =>
    location.pathname.startsWith(prefix)
  );

  return (
    <div className="min-h-screen">
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/verify-otp" element={<VerifyOtpPage />} />
        <Route path="/dashboard/:facultyName" element={<DashboardPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <BookmarkProvider>
          <Router>
            <AppContent />
          </Router>
        </BookmarkProvider>
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;