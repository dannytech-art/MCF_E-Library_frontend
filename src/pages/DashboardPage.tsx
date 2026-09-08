import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { BookOpen, ArrowLeft, FileText, ExternalLink } from 'lucide-react';
import { faculties } from '../data/faculties';
import { getMaterialsByFaculty } from '../services/materialsService';
import { DriveFile } from '../services/facultyService';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';

const DashboardPage = () => {
  const { facultyName } = useParams<{ facultyName: string }>(); // Changed to facultyName
  const [materials, setMaterials] = useState<DriveFile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  // Find faculty by name (decode URL encoding)
  const decodedFacultyName = facultyName ? decodeURIComponent(facultyName) : '';
  const faculty = faculties.find((f) => f.name === decodedFacultyName);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (facultyName) {
      loadMaterials(decodedFacultyName);
    }
  }, [facultyName, isAuthenticated, navigate]);

  const loadMaterials = async (name: string) => {
    setIsLoading(true);
    try {
      console.log('📚 Loading materials for faculty:', name);
      const data = await getMaterialsByFaculty(name);
      console.log('✅ Materials loaded:', data?.length || 0, 'items');
      setMaterials(data || []);
    } catch (error) {
      console.error('❌ Failed to load materials:', error);
      showToast('error', 'Failed to load materials. Please try again.');
      setMaterials([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMaterialClick = (webViewLink: string) => {
    if (webViewLink) {
      window.open(webViewLink, '_blank');
      showToast('info', 'Opening material in Google Drive...');
    } else {
      showToast('error', 'Unable to open this material');
    }
  };

  if (!faculty) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md shadow-lg">
          <CardHeader>
            <CardTitle>Faculty Not Found</CardTitle>
            <CardDescription>
              The requested faculty "{decodedFacultyName}" does not exist.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => navigate('/')} className="w-full">
              <ArrowLeft className="mr-2 h-4 w-4" />
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
            onClick={() => navigate('/')}
            className="text-white hover:bg-white/10 mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">{faculty.name}</h1>
          <p className="text-gray-300">{faculty.description}</p>
        </div>
      </div>

      {/* Materials Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Study Materials
          </h2>
          <p className="text-gray-600">
            Browse and read materials specific to your faculty
          </p>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <LoadingSpinner size="lg" text="Loading materials..." />
          </div>
        ) : materials.length === 0 ? (
          <Card className="text-center py-12 shadow-lg">
            <CardContent>
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-10 w-10 text-gray-400" />
              </div>
              <p className="text-gray-600 text-lg">No materials available yet.</p>
              <p className="text-gray-500 text-sm mt-2">Check back later for new content.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {materials.map((material) => (
              <Card
                key={material.id}
                className="hover:shadow-xl transition-all duration-300 cursor-pointer group"
                onClick={() => handleMaterialClick(material.webViewLink)}
              >
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-br from-brand-red to-red-600 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <FileText className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-lg line-clamp-2">{material.name}</CardTitle>
                  <CardDescription>
                    {material.mimeType?.split('/').pop()?.toUpperCase() || 'FILE'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <span>
                      {material.modifiedTime 
                        ? new Date(material.modifiedTime).toLocaleDateString() 
                        : 'Unknown date'}
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    className="w-full mt-4 text-navy hover:bg-red-50 group-hover:bg-red-50 transition-colors"
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Open in Drive
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;