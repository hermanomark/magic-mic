import api from './client';
import { getErrorMessage } from '@/utils/errorHandler';
import { type CardType, type CardFormValues, type CardStats } from '@/types/Card';

export const getAllCards = async () => {
  try {
    const response = await api.get<CardType[]>('/cards');
    return response.data;
  } catch (error) {
    const errorMessage = getErrorMessage(error, 'Failed to fetch cards.');
    throw new Error(errorMessage);
  }
}

export const getStats = async () => {
  try {
    const response = await api.get<CardStats>('/cards/stats');
    return response.data;
  } catch (error) {
    const errorMessage = getErrorMessage(error, 'Failed to fetch stats.');
    throw new Error(errorMessage);
  }
}

export const getCardById = async (id: string) => {
  try {
    const response = await api.get<CardType>(`/cards/${id}`);
    return response.data;
  } catch (error) {
    const errorMessage = getErrorMessage(error, 'Failed to fetch the card.');
    throw new Error(errorMessage);
  }
}

export const addNewCard = async (cardData: CardFormValues) => {
  try {
    const response = await api.post<CardType>('/cards', cardData);
    return response.data;
  } catch (error) {
    const errorMessage = getErrorMessage(error, 'Failed to add new card.');
    throw new Error(errorMessage);
  }
}

export const updateCard = async (cardData: CardType) => {
  try {
    const response = await api.put<CardType>(`/cards/${cardData.id}`, cardData);
    return response.data;
  } catch (error) {
    const errorMessage = getErrorMessage(error, 'Failed to update the card.');
    throw new Error(errorMessage);
  }
}

export const deleteCard = async (id: string) => {
  try {
    const response = await api.delete<CardType>(`/cards/${id}`);
    return response.data;
  } catch (error) {
    const errorMessage = getErrorMessage(error, 'Failed to delete the card.');
    throw new Error(errorMessage);
  }
} 