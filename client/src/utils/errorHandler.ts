import axios from "axios"

export const getErrorMessage = (error: unknown, fallbackMessage: string): string => {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.title || 'An error occurred with the API request.'
  }
  if (error instanceof Error) {
    return error.message
  }
  return fallbackMessage;
}