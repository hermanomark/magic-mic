export interface Card {
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