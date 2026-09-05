import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { BookOpen, ArrowLeft, FileText } from 'lucide-react';
import { faculties } from '../data/faculties';
import { getMaterialsByFaculty } from '../services/materialsService';
import { StudyMaterial } from '../data/materials';
import { useAuth } from '../contexts/AuthContext';

const DashboardPage = () => {
  const { facultyId } = useParams<{ facultyId: string }>();
  const [materials, setMaterials] = useState<StudyMaterial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const faculty = faculties.find((f) => f.id === facultyId);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (facultyId) {
      loadMaterials(facultyId);
    }
  }, [facultyId, isAuthenticated, navigate]);

  const loadMaterials = async (id: string) => {
    setIsLoading(true);
    try {
      const data = await getMaterialsByFaculty(id);
      setMaterials(data);
    } catch (error) {
      console.error('Failed to load materials:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMaterialClick = (materialId: string) => {
    navigate(`/material/${materialId}`);
  };

  if (!faculty) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Faculty Not Found</CardTitle>
            <CardDescription>
              The requested faculty does not exist.
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
      <div className="bg-navy text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="text-white hover:bg-gray-800 mb-4"
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
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-blue"></div>
            <p className="mt-4 text-gray-600">Loading materials...</p>
          </div>
        ) : materials.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <BookOpen className="h-16 w-16 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-600">No materials available yet.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {materials.map((material) => (
              <Card
                key={material.id}
                className="hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => handleMaterialClick(material.id)}
              >
                <CardHeader>
                  <div className="w-12 h-12 bg-primary-blue/10 rounded-lg flex items-center justify-center mb-3">
                    <FileText className="h-6 w-6 text-primary-blue" />
                  </div>
                  <CardTitle className="text-lg">{material.title}</CardTitle>
                  <CardDescription>{material.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <span>{material.author}</span>
                    <span>{new Date(material.dateAdded).toLocaleDateString()}</span>
                  </div>
                  <Button
                    variant="ghost"
                    className="w-full mt-4 text-navy hover:bg-blue-50"
                  >
                    Read Material
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
