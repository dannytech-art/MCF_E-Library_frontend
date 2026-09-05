// import apiClient from './api';
import { StudyMaterial } from '../data/materials';

// Get materials by faculty - replace with actual API call when available
export const getMaterialsByFaculty = async (facultyId: string): Promise<StudyMaterial[]> => {
  // Mock implementation - using dummy data
  const { studyMaterials } = await import('../data/materials');
  return studyMaterials.filter(material => material.facultyId === facultyId);

  // Actual API call (commented out for now):
  // const response = await apiClient.get<StudyMaterial[]>(`/materials/faculty/${facultyId}`);
  // return response.data;
};

// Get material by ID - replace with actual API call when available
export const getMaterialById = async (materialId: string): Promise<StudyMaterial | null> => {
  // Mock implementation - using dummy data
  const { studyMaterials } = await import('../data/materials');
  return studyMaterials.find(material => material.id === materialId) || null;

  // Actual API call (commented out for now):
  // const response = await apiClient.get<StudyMaterial>(`/materials/${materialId}`);
  // return response.data;
};
