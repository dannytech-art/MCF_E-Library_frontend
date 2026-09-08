import { getFacultyMaterials, DriveFile } from './facultyService';

export const getMaterialsByFaculty = async (facultyName: string): Promise<DriveFile[]> => {
  try {
    console.log('📚 Getting materials for faculty:', facultyName);
    const materials = await getFacultyMaterials(facultyName);
    console.log('✅ Materials loaded:', materials.length);
    return materials;
  } catch (error) {
    console.error('❌ Error in materials service:', error);
    throw error;
  }
};