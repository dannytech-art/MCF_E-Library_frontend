import api from './api';

export interface DriveFile {
  id: string;
  name: string;
  mimeType: string;
  webViewLink: string;
  thumbnailLink?: string;
  modifiedTime: string;
  size?: string;
}

export const getFacultyMaterials = async (facultyName: string): Promise<DriveFile[]> => {
  try {
    console.log('📤 Sending request for faculty:', facultyName);
    
    // Encode the name for URL (spaces become %20)
    const encodedName = encodeURIComponent(facultyName);
    const url = `/faculty/${encodedName}/materials`;
    
    console.log('📤 Request URL:', url);
    
    const response = await api.get(url);
    
    console.log('📦 API Response:', response.data);
    console.log('📦 Materials found:', response.data.data?.length || 0);
    
    // The materials are in response.data.data
    return response.data.data || [];
  } catch (error: any) {
    console.error('❌ Error fetching materials:', error.response?.data || error.message);
    throw error;
  }
};