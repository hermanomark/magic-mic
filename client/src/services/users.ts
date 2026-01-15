import api from "./client";
import { getErrorMessage } from "@/utils/errorHandler";

interface User {
  id: number;
  username: string;
  password?: string;
}

export const registerUser = async (userData: User) => {
  try {
    const response = await api.post('/users/register', userData);
    return response.data;
  } catch (error) {
    const errorMessage = getErrorMessage(error, 'Failed to register user.');
    throw new Error(errorMessage);
  }
}

export const loginUser = async (userData: User) => {
  try {
    const response = await api.post('/users/login', userData);
    return response.data;
  } catch (error) {
    const errorMessage = getErrorMessage(error, 'Failed to login user.');
    throw new Error(errorMessage);
  }
}

export const getUserProfile = async (userId: number) => {
  try {
    const response = await api.get(`/users/${userId}`);
    return response.data;
  } catch (error) {
    const errorMessage = getErrorMessage(error, 'Failed to fetch user profile.');
    throw new Error(errorMessage);
  }
}