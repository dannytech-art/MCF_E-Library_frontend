import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Select } from '../components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';
import { getProfile, updateProfile, changePassword, deleteAccount } from '../services/userService';
import { faculties } from '../data/faculties';
import { User, ArrowLeft, User as UserIcon, Lock, Trash2, AlertTriangle } from 'lucide-react';

const ProfilePage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  
  // Profile update form
  const [fullName, setFullName] = useState('');
  const [faculty, setFaculty] = useState('');
  
  // Password change form
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  
  const { user: authUser, logout } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    setIsLoading(true);
    try {
      const userData = await getProfile();
      setUser(userData);
      setFullName(userData.fullName);
      setFaculty(userData.faculty);
    } catch (err: any) {
      showToast('error', err.response?.data?.message || 'Failed to load profile');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);

    if (!user) return;

    try {
      const updatedUser = await updateProfile(user._id, { fullName, faculty });
      setUser(updatedUser);
      showToast('success', 'Profile updated successfully!');
    } catch (err: any) {
      showToast('error', err.response?.data?.message || 'Failed to update profile');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsChangingPassword(true);

    try {
      await changePassword({ currentPassword, newPassword });
      showToast('success', 'Password changed successfully!');
      setCurrentPassword('');
      setNewPassword('');
    } catch (err: any) {
      showToast('error', err.response?.data?.message || 'Failed to change password');
    } finally {
      setIsChangingPassword(false);
    }
  };

  const handleDeleteAccount = async () => {
    setIsDeleting(true);

    if (!user) return;

    try {
      await deleteAccount(user._id);
      showToast('success', 'Account deleted successfully');
      logout();
      navigate('/');
    } catch (err: any) {
      showToast('error', err.response?.data?.message || 'Failed to delete account');
      setShowDeleteConfirm(false);
    } finally {
      setIsDeleting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading profile..." />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md shadow-lg">
          <CardHeader>
            <CardTitle>Profile Not Found</CardTitle>
            <CardDescription>
              Unable to load your profile information.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => navigate('/')} className="w-full">
              Go to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-navy to-blue-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="text-white hover:bg-white/10 mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <h1 className="text-3xl font-bold mb-2">My Profile</h1>
          <p className="text-gray-300">Manage your account settings</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Profile Information */}
          <Card className="shadow-lg">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-brand-red to-red-600 rounded-full flex items-center justify-center">
                  <UserIcon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>Update your personal details</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleUpdateProfile} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Email</label>
                  <Input value={user.email} disabled className="bg-gray-100" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="fullName" className="text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <Input
                    id="fullName"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
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
                    {faculties.map((fac) => (
                      <option key={fac.id} value={fac.id}>
                        {fac.name}
                      </option>
                    ))}
                  </Select>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <span className={`px-3 py-1 rounded-full ${user.isVerified ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                    {user.isVerified ? '✓ Verified' : '⏳ Not Verified'}
                  </span>
                </div>
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-brand-red to-red-700 hover:from-red-700 hover:to-red-800 shadow-lg"
                  disabled={isUpdating}
                >
                  {isUpdating ? (
                    <span className="flex items-center gap-2">
                      <LoadingSpinner size="sm" />
                      Updating...
                    </span>
                  ) : (
                    'Update Profile'
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Password & Account Settings */}
          <div className="space-y-6">
            {/* Change Password */}
            <Card className="shadow-lg">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-brand-red to-red-600 rounded-full flex items-center justify-center">
                    <Lock className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <CardTitle>Change Password</CardTitle>
                    <CardDescription>Update your password</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleChangePassword} className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="currentPassword" className="text-sm font-medium text-gray-700">
                      Current Password
                    </label>
                    <Input
                      id="currentPassword"
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      required
                      className="focus:ring-2 focus:ring-brand-red"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="newPassword" className="text-sm font-medium text-gray-700">
                      New Password
                    </label>
                    <Input
                      id="newPassword"
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                      minLength={6}
                      className="focus:ring-2 focus:ring-brand-red"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-brand-red to-red-700 hover:from-red-700 hover:to-red-800 shadow-lg"
                    disabled={isChangingPassword}
                  >
                    {isChangingPassword ? (
                      <span className="flex items-center gap-2">
                        <LoadingSpinner size="sm" />
                        Changing...
                      </span>
                    ) : (
                      'Change Password'
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Delete Account */}
            <Card className="border-red-200 shadow-lg">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                    <Trash2 className="h-6 w-6 text-red-600" />
                  </div>
                  <div>
                    <CardTitle className="text-red-600">Delete Account</CardTitle>
                    <CardDescription>Permanently delete your account</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {!showDeleteConfirm ? (
                  <Button
                    variant="destructive"
                    className="w-full"
                    onClick={() => setShowDeleteConfirm(true)}
                  >
                    Delete Account
                  </Button>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-start space-x-2 text-sm text-red-600 bg-red-50 p-3 rounded-lg">
                      <AlertTriangle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                      <p>
                        This action cannot be undone. All your data will be permanently deleted.
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        variant="destructive"
                        onClick={handleDeleteAccount}
                        disabled={isDeleting}
                        className="flex-1"
                      >
                        {isDeleting ? (
                          <span className="flex items-center gap-2">
                            <LoadingSpinner size="sm" />
                            Deleting...
                          </span>
                        ) : (
                          'Confirm Delete'
                        )}
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setShowDeleteConfirm(false)}
                        disabled={isDeleting}
                        className="flex-1"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
