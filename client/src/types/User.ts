import { type CardType } from "@/types/Card";

export interface User {
  username: string;
  password: string;
  token: string;
  name: string;
  cards: CardType[];
}

export type UserFormValues = Omit<User, 'cards' | 'name' | 'token'>;

export type UserProfile = Omit<User, 'password' | 'token'>;

export type UserToken = Omit<User, 'password' | 'cards'>;