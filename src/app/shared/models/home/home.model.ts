export interface Home {
  id: string;
}

export interface Stock {
  symbol: string;
  name: string;
}

export interface FavoritesCard {
  symbol: string;
  name: string;
  high?: string;
  low?: string;
  price?: string;
  date?: string;
  change?: string;
  percentChange?:string;
}