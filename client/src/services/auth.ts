import api from "./client";
import { getErrorMessage } from "@/utils/errorHandler";

interface User {
  username: string;
  password?: string;
}

export const authUser = async (userData: User) => {
  try {
    const response = await api.post('/login', userData);
    return response.data;
  } catch (error) {
    const errorMessage = getErrorMessage(error, 'Failed to login user.');
    throw new Error(errorMessage);
  }
}