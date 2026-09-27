import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';
import { verifyOtp, resendOtp } from '../services/authService';
import { BookOpen, ArrowLeft, RefreshCw, Mail } from 'lucide-react';

const VerifyOtpPage = () => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const { pendingEmail, login } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Countdown timer for resend
  useEffect(() => {
    if (countdown <= 0) return;
    const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown]);

  // Auto-focus first input on mount
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (index: number, value: string) => {
    // Only allow digits
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    // Take only last character if user types more
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Backspace: if current is empty, go back
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    // Arrow left/right navigation
    if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === 'ArrowRight' && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 4);
    if (!pasted) return;

    const newOtp = ['', '', '', ''];
    pasted.split('').forEach((char, i) => {
      if (i < 4) newOtp[i] = char;
    });
    setOtp(newOtp);

    // Focus the last filled input
    const nextIndex = Math.min(pasted.length, 3);
    inputRefs.current[nextIndex]?.focus();
  };

  const otpString = otp.join('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (otpString.length !== 4) {
      showToast('error', 'Please enter all 4 digits');
      return;
    }

    setIsLoading(true);

    if (!pendingEmail) {
      showToast('error', 'No email found. Please sign up again.');
      navigate('/signup');
      return;
    }

    try {
      const response = await verifyOtp({
        email: pendingEmail,
        otp: otpString,
      });

      login(response.data, response.token);
      showToast('success', 'Email verified successfully!');

      setTimeout(() => {
        navigate(`/dashboard/${response.data.faculty}`);
      }, 500);
    } catch (err: any) {
      showToast('error', err.response?.data?.message || 'Invalid or expired OTP');
      // Clear inputs on error
      setOtp(['', '', '', '']);
      inputRefs.current[0]?.focus();
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (countdown > 0 || isResending) return;

    setIsResending(true);

    if (!pendingEmail) {
      showToast('error', 'No email found. Please sign up again.');
      navigate('/signup');
      return;
    }

    try {
      await resendOtp({ email: pendingEmail });
      showToast('success', 'New OTP sent to your email');
      setCountdown(60);
      setOtp(['', '', '', '']);
      inputRefs.current[0]?.focus();
    } catch (err: any) {
      showToast('error', err.response?.data?.message || 'Failed to resend OTP');
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-white">
      {/* LEFT: FORM */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12 bg-white relative">
        {/* Back button */}
        <button
          onClick={() => navigate('/signup')}
          className="absolute top-6 left-6 flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back
        </button>

        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="flex items-center justify-center mb-8">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center shadow-lg">
              <BookOpen className="h-7 w-7 text-white" />
            </div>
          </div>

          {/* Heading */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Verify your email
            </h1>
            <p className="text-sm text-gray-500 leading-relaxed">
              We sent a 4-digit code to
            </p>
            <p className="text-sm font-semibold text-gray-900 mt-1 break-all">
              {pendingEmail || 'your email'}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* OTP Inputs */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3 text-center">
                Enter the code
              </label>
              <div className="flex justify-center gap-3">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => { inputRefs.current[index] = el; }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={handlePaste}
                    className={`w-14 h-16 text-center text-2xl font-bold rounded-lg border-2 bg-white text-gray-900 transition-all outline-none ${
                      digit
                        ? 'border-orange-500 ring-2 ring-orange-500/20'
                        : 'border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Resend link */}
            <div className="text-center">
              {countdown > 0 ? (
                <p className="text-sm text-gray-500">
                  Resend code in{' '}
                  <span className="font-semibold text-gray-900">{countdown}s</span>
                </p>
              ) : (
                <button
                  type="button"
                  onClick={handleResendOtp}
                  disabled={isResending}
                  className="inline-flex items-center gap-2 text-sm text-gray-700 hover:text-orange-600 font-medium transition-colors disabled:opacity-50"
                >
                  <RefreshCw
                    className={`h-4 w-4 ${isResending ? 'animate-spin' : ''}`}
                  />
                  {isResending ? 'Resending...' : 'Resend code'}
                </button>
              )}
            </div>

            {/* Submit */}
            <Button
              type="submit"
              disabled={isLoading || otpString.length !== 4}
              className="w-full h-11 rounded-lg bg-gray-900 hover:bg-black text-white font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <LoadingSpinner size="sm" />
                  Verifying...
                </span>
              ) : (
                'Verify & Continue'
              )}
            </Button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center text-sm">
            <span className="text-gray-500">Wrong email? </span>
            <button
              onClick={() => navigate('/signup')}
              className="text-gray-900 font-semibold hover:underline"
            >
              Sign up again
            </button>
          </div>

          <p className="mt-8 text-xs text-center text-gray-400 flex items-center justify-center gap-1.5">
            <Mail size={12} />
            Didn't receive it? Check your spam folder.
          </p>
        </div>
      </div>

      {/* RIGHT: IMAGE */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <img
          src="https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=1400&q=80"
          alt="Library"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20" />

        <div className="absolute bottom-0 left-0 right-0 p-12 text-white">
          <p className="text-xs tracking-widest uppercase mb-3 text-white/70">
            MCF E-Library
          </p>
          <h2 className="text-3xl font-bold mb-3 leading-tight">
            Almost there...
          </h2>
          <p className="text-sm text-white/80 max-w-md leading-relaxed">
            One quick step to unlock your faculty's full library. Enter the code we just sent you.
          </p>

          <div className="flex gap-2 mt-6">
            <span className="w-2 h-1 rounded-full bg-white/40" />
            <span className="w-6 h-1 rounded-full bg-white" />
            <span className="w-2 h-1 rounded-full bg-white/40" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtpPage;