import apiClient from './api';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  fullName: string;
  email: string;
  password: string;
  faculty: string;
}

export interface VerifyOtpData {
  email: string;
  otp: string;
}

export interface ResendOtpData {
  email: string;
}

export interface User {
  _id: string;
  fullName: string;
  email: string;
  faculty: string;
  isVerified: boolean;
}

export interface AuthResponse {
  message: string;
  token: string;
  data: User;
}

export interface ApiMessage {
  message: string;
}

export const login = async (
  credentials: LoginCredentials
): Promise<AuthResponse> => {
  const response = await apiClient.post<AuthResponse>('/login', credentials);
  return response.data;
};

export const register = async (
  data: RegisterData
): Promise<AuthResponse> => {
  const response = await apiClient.post<AuthResponse>('/signup', data);
  return response.data;
};

export const verifyOtp = async (
  data: VerifyOtpData
): Promise<AuthResponse> => {
  const response = await apiClient.post<AuthResponse>('/verify-otp', data);
  return response.data;
};

export const resendOtp = async (
  data: ResendOtpData
): Promise<ApiMessage> => {
  const response = await apiClient.post<ApiMessage>('/resend-otp', data);
  return response.data;
};

export const logout = async (): Promise<void> => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('user');
};
