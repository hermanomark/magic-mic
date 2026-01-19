import api from './client';
import { getErrorMessage } from '@/utils/errorHandler';

interface Card {
  id?: string;
  playerName: string;
  teamName: string;
  series: string;
  yearReleased: number;
  ebayUrl: string;
  imageUrl: string;
  stock: number;
  price: number;
  forSale: boolean;
  user: string;
}

export const getAllCards = async () => {
  try {
    const response = await api.get('/cards');
    return response.data;
  } catch (error) {
    const errorMessage = getErrorMessage(error, 'Failed to fetch cards.');
    throw new Error(errorMessage);
  }
}

export const getCardById = async (id: string) => {
  try {
    const response = await api.get(`/cards/${id}`);
    return response.data;
  } catch (error) {
    const errorMessage = getErrorMessage(error, 'Failed to fetch the card.');
    throw new Error(errorMessage);
  }
}

export const addNewCard = async (cardData: Card) => {
  try {
    const response = await api.post('/cards', cardData);
    return response.data;
  } catch (error) {
    const errorMessage = getErrorMessage(error, 'Failed to add new card.');
    throw new Error(errorMessage);
  }
}

export const updateCard = async (id: string, cardData: Card) => {
  try {
    const response = await api.put(`/cards/${id}`, cardData);
    return response.data;
  } catch (error) {
    const errorMessage = getErrorMessage(error, 'Failed to update the card.');
    throw new Error(errorMessage);
  }
}

export const deleteCard = async (id: string) => {
  try {
    const response = await api.delete(`/cards/${id}`);
    return response.data;
  } catch (error) {
    const errorMessage = getErrorMessage(error, 'Failed to delete the card.');
    throw new Error(errorMessage);
  }
} 