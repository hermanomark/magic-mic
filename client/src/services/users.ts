import api from "./client";
import { getErrorMessage } from "@/utils/errorHandler";
import { type UserToken, type UserFormValues, type UserProfile } from "@/types/User";

export const registerUser = async (userData: UserFormValues) => {
  try {
    const response = await api.post<UserToken>('/users/register', userData);
    return response.data;
  } catch (error) {
    const errorMessage = getErrorMessage(error, 'Failed to register user.');
    throw new Error(errorMessage);
  }
}

export const getUserProfile = async (username: string) => {
  try {
    const response = await api.get<UserProfile>(`/users/${username}`);
    return response.data;
  } catch (error) {
    const errorMessage = getErrorMessage(error, 'Failed to fetch user profile.');
    throw new Error(errorMessage);
  }
}