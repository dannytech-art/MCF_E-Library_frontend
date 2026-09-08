import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const MaterialViewerPage = () => {
  const { isAuthenticated, user } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    // Redirect to dashboard since materials now open in Google Drive
    showToast('info', 'Materials open directly in Google Drive');
    if (user) {
      setTimeout(() => {
        navigate(`/dashboard/${user.faculty}`);
      }, 1000);
    } else {
      setTimeout(() => {
        navigate('/');
      }, 1000);
    }
  }, [isAuthenticated, user, navigate, showToast]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <LoadingSpinner size="lg" text="Redirecting to dashboard..." />
    </div>
  );
};

export default MaterialViewerPage;
