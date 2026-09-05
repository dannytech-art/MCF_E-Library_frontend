import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { ArrowLeft, FileText, Calendar, User } from 'lucide-react';
import { getMaterialById } from '../services/materialsService';
import { StudyMaterial } from '../data/materials';
import { useAuth } from '../contexts/AuthContext';
import ReactMarkdown from 'react-markdown';

const MaterialViewerPage = () => {
  const { materialId } = useParams<{ materialId: string }>();
  const [material, setMaterial] = useState<StudyMaterial | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (materialId) {
      loadMaterial(materialId);
    }
  }, [materialId, isAuthenticated, navigate]);

  const loadMaterial = async (id: string) => {
    setIsLoading(true);
    try {
      const data = await getMaterialById(id);
      setMaterial(data);
    } catch (error) {
      console.error('Failed to load material:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    if (material) {
      navigate(`/dashboard/${material.facultyId}`);
    } else {
      navigate('/');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-navy"></div>
          <p className="mt-4 text-gray-600">Loading material...</p>
        </div>
      </div>
    );
  }

  if (!material) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Material Not Found</CardTitle>
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
      <div className="bg-primary-black text-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Button
            variant="ghost"
            onClick={handleBack}
            className="text-white hover:bg-gray-800 mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
          <h1 className="text-2xl sm:text-3xl font-bold">{material.title}</h1>
        </div>
      </div>

      {/* Material Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <CardTitle className="text-xl">{material.title}</CardTitle>
                <p className="text-gray-600 mt-2">{material.description}</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 text-sm text-gray-500">
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-2" />
                  {material.author}
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  {new Date(material.dateAdded).toLocaleDateString()}
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="prose prose-sm sm:prose lg:prose-lg max-w-none">
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <ReactMarkdown>{material.content}</ReactMarkdown>
              </div>
            </div>
            
            {/* Notice about read-only access */}
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-start">
                <FileText className="h-5 w-5 text-navy mr-2 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-blue-900">
                    Read-Only Access
                  </p>
                  <p className="text-sm text-blue-700 mt-1">
                    This material is available for reading within the platform only. 
                    Downloading is not permitted to protect intellectual property.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MaterialViewerPage;
