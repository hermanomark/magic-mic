export interface CardType {
  id: string;
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

export type CardFormValues = Omit<CardType, 'id'>;

export interface CardStats {
  total: number;
  forSale: number;
  notForSale: number;
}