import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';
import { verifyOtp, resendOtp } from '../services/authService';
import { BookOpen, RefreshCw } from 'lucide-react';

const VerifyOtpPage = () => {
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const { pendingEmail, login } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!pendingEmail) {
      showToast('error', 'No email found. Please sign up again.');
      navigate('/signup');
      return;
    }

    try {
      const response = await verifyOtp({
        email: pendingEmail,
        otp,
      });

      login(response.data, response.token);

      showToast('success', 'Email verified successfully!');

      setTimeout(() => {
        navigate(`/dashboard/${response.data.faculty}`);
      }, 500);
    } catch (err: any) {
      showToast(
        'error',
        err.response?.data?.message || 'Invalid or expired OTP'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setIsResending(true);

    if (!pendingEmail) {
      showToast('error', 'No email found. Please sign up again.');
      navigate('/signup');
      return;
    }

    try {
      await resendOtp({ email: pendingEmail });
      showToast('success', 'New OTP sent to your email');
    } catch (err: any) {
      showToast(
        'error',
        err.response?.data?.message || 'Failed to resend OTP'
      );
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy via-gray-900 to-navy flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-brand-red to-red-700 rounded-full flex items-center justify-center shadow-lg">
              <BookOpen className="h-8 w-8 text-white" />
            </div>
          </div>

          <CardTitle className="text-2xl text-center font-bold">
            Verify Your Email
          </CardTitle>

          <CardDescription className="text-center">
            Enter the 4-digit OTP sent to {pendingEmail}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="otp"
                className="text-sm font-medium text-gray-700"
              >
                OTP Code
              </label>

              <Input
                id="otp"
                type="text"
                placeholder="1234"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
                maxLength={4}
                pattern="[0-9]{4}"
                className="text-center text-2xl tracking-widest focus:ring-2 focus:ring-brand-red"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-brand-red to-red-700 hover:from-red-700 hover:to-red-800 shadow-lg"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <LoadingSpinner size="sm" />
                  Verifying...
                </span>
              ) : (
                'Verify Email'
              )}
            </Button>
          </form>

          <div className="mt-4 text-center">
            <Button
              type="button"
              variant="ghost"
              onClick={handleResendOtp}
              disabled={isResending}
              className="text-sm text-gray-600 hover:text-brand-red"
            >
              <RefreshCw
                className={`mr-2 h-4 w-4 ${
                  isResending ? 'animate-spin' : ''
                }`}
              />
              {isResending ? 'Resending...' : 'Resend OTP'}
            </Button>
          </div>

          <div className="mt-4 text-center text-sm">
            <span className="text-gray-600">Wrong email? </span>

            <button
              onClick={() => navigate('/signup')}
              className="text-brand-red hover:underline font-medium"
            >
              Sign up again
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VerifyOtpPage;
