import api from './client';
import { getErrorMessage } from '@/utils/errorHandler';

export const uploadImage = async (file: File) => {
  try {
    const formData = new FormData();
    formData.append('image', file);

    const response = await api.post<{ imageUrl: string }>('/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    return response.data.imageUrl;
  } catch (error) {
    const errorMessage = getErrorMessage(error, 'Failed to upload image.');
    throw new Error(errorMessage);
  }
};
