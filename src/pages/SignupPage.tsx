import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Select } from '../components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';
import { register as registerService } from '../services/authService';
import { faculties } from '../data/faculties';
import { BookOpen } from 'lucide-react';

const SignupPage = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [faculty, setFaculty] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { setPendingEmail } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await registerService({ fullName, email, password, faculty });
      // Store email for OTP verification
      setPendingEmail(email);
      showToast('success', 'Account created! Check your email for OTP.');
      // Redirect to OTP verification page
      setTimeout(() => {
        navigate('/verify-otp');
      }, 500);
    } catch (err: any) {
      showToast('error', err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-black via-gray-900 to-primary-blue flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-brand-red to-red-700 rounded-full flex items-center justify-center shadow-lg">
              <BookOpen className="h-8 w-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl text-center font-bold">Create Account</CardTitle>
          <CardDescription className="text-center">
            Join MCF E-Library to access your faculty's materials
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="fullName" className="text-sm font-medium text-gray-700">
                Full Name
              </label>
              <Input
                id="fullName"
                type="text"
                placeholder="John Doe"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className="focus:ring-2 focus:ring-brand-red"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="student@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="focus:ring-2 focus:ring-brand-red"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-gray-700">
                Password
              </label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="focus:ring-2 focus:ring-brand-red"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="faculty" className="text-sm font-medium text-gray-700">
                Faculty
              </label>
              <Select
                id="faculty"
                value={faculty}
                onChange={(e) => setFaculty(e.target.value)}
                required
                className="focus:ring-2 focus:ring-brand-red"
              >
                <option value="">Select your faculty</option>
                {faculties.map((faculty) => (
                  <option key={faculty.id} value={faculty.id}>
                    {faculty.name}
                  </option>
                ))}
              </Select>
            </div>
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-brand-red to-red-700 hover:from-red-700 hover:to-red-800 shadow-lg"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <LoadingSpinner size="sm" />
                  Creating account...
                </span>
              ) : (
                'Sign Up'
              )}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            <span className="text-gray-600">Already have an account? </span>
            <Link to="/login" className="text-brand-red hover:underline font-medium">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignupPage;
