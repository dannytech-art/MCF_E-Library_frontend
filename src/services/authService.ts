// import apiClient from './api';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  fullName: string;
  email: string;
  password: string;
  facultyId: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    fullName: string;
    email: string;
    facultyId: string;
  };
}

// Login function - replace with actual API call when available
export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  // Mock implementation - replace with actual API call
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Mock successful login
      resolve({
        token: 'mock-jwt-token',
        user: {
          id: '1',
          fullName: 'Test User',
          email: credentials.email,
          facultyId: 'engineering', // Default faculty for mock
        },
      });
    }, 500);
  });

  // Actual API call (commented out for now):
  // const response = await apiClient.post<AuthResponse>('/auth/login', credentials);
  // return response.data;
};

// Register function - replace with actual API call when available
export const register = async (data: RegisterData): Promise<AuthResponse> => {
  // Mock implementation - replace with actual API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        token: 'mock-jwt-token',
        user: {
          id: Date.now().toString(),
          fullName: data.fullName,
          email: data.email,
          facultyId: data.facultyId,
        },
      });
    }, 500);
  });

  // Actual API call (commented out for now):
  // const response = await apiClient.post<AuthResponse>('/auth/register', data);
  // return response.data;
};

// Logout function
export const logout = async (): Promise<void> => {
  // Mock implementation - replace with actual API call
  localStorage.removeItem('authToken');
  localStorage.removeItem('user');

  // Actual API call (commented out for now):
  // await apiClient.post('/auth/logout');
};
