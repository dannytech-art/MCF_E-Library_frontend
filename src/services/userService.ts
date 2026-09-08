import apiClient from './api';

export interface User {
  _id: string;
  fullName: string;
  email: string;
  faculty: string;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateProfileData {
  fullName?: string;
  faculty?: string;
}

export interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
}

export interface ApiMessage {
  message: string;
}

// Get current user profile
export const getProfile = async (): Promise<User> => {
  const response = await apiClient.get<User>('/profile');
  return response.data;
};

// List all users (admin function)
export const getAllUsers = async (): Promise<User[]> => {
  const response = await apiClient.get<User[]>('/users');
  return response.data;
};

// Get user by ID
export const getUserById = async (id: string): Promise<User> => {
  const response = await apiClient.get<User>(`/user/${id}`);
  return response.data;
};

// Update own profile
export const updateProfile = async (id: string, data: UpdateProfileData): Promise<User> => {
  const response = await apiClient.put<User>(`/user/${id}`, data);
  return response.data;
};

// Change password
export const changePassword = async (data: ChangePasswordData): Promise<ApiMessage> => {
  const response = await apiClient.put<ApiMessage>('/change-password', data);
  return response.data;
};

// Delete own account
export const deleteAccount = async (id: string): Promise<ApiMessage> => {
  const response = await apiClient.delete<ApiMessage>(`/user/${id}`);
  return response.data;
};
