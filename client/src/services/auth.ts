import api from "./client";
import { getErrorMessage } from "@/utils/errorHandler";
import { type UserFormValues, type UserToken } from "@/types/User";

export const authUser = async (userData: UserFormValues) => {
  try {
    const response = await api.post<UserToken>('/login', userData);
    return response.data;
  } catch (error) {
    const errorMessage = getErrorMessage(error, 'Failed to login user.');
    throw new Error(errorMessage);
  }
}