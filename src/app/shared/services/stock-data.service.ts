import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map } from 'rxjs';
import { API_KEY, STOCK_FAVORITES_KEY, baseUrl } from '../constants/app.constants';
import { Stock } from '../models/home/app.model';
import { LocalStorageService } from './local-storage.service';

@Injectable({ providedIn: 'root' })
export class StockDataService {
  private readonly localStorageService = inject(LocalStorageService);

  constructor(private http: HttpClient) {}

  getStockDetails(symbol: string) {
    const params = {
      function: 'OVERVIEW',
      apikey: API_KEY,
      symbol,
    };
    return this.http.get<{ [key: string]: any }>(baseUrl, { params }).pipe(
      map((details) => ({
        name: details['Name'],
        companyDescription: details['Description'],
        yearHigh: details['52WeekHigh'],
        yearLow: details['52WeekLow'] ,
        })));
  }

  getLatestStockPrice(symbol: string) {
    const params = {
      function: 'GLOBAL_QUOTE',
      apikey: API_KEY,
      symbol,
    };
    return this.http.get<{ [key: string]: any }>(baseUrl, { params }).pipe(
      map((response) => response['Global Quote']),
      map((quote) => ({
        symbol: quote["01. symbol"],
        high: this.checkForNaN(quote['03. high']),
        low: this.checkForNaN(quote['04. low']),
        price: this.checkForNaN(quote['05. price']),
        volume: quote['06. volume'],
        date: quote['07. latest trading day'],
        change: this.checkForNaN(quote['09. change']),
        percentChange: this.checkForNaN(quote['10. change percent']),
      })));
  }

  getSearchResults(search: string) {
    const params = {
      function: 'SYMBOL_SEARCH',
      keywords: search,
      apikey: API_KEY,
    };

    return this.http.get<{ bestMatches: any[] }>(baseUrl, { params }).pipe(
      map((res) => {
        return res.bestMatches || []
      }),
      map(matches =>
        matches.map(item => ({
          symbol: item['1. symbol'],
          name: item['2. name'],
        }))
      )
    );
  }

  addStock(stock: Stock) {
    const current = this.getFavorites();
    if (!current.some(s => s.symbol === stock.symbol)) {
      const updated = [...current, stock];
      this.localStorageService.update(STOCK_FAVORITES_KEY, updated);
    }
  }
  
  removeStock(symbol: string): void {
    const favorites = this.localStorageService.get<Stock[]>(STOCK_FAVORITES_KEY) ?? [];
    const updatedFavorites = favorites.filter(item => item.symbol !== symbol);
    this.localStorageService.update(STOCK_FAVORITES_KEY, updatedFavorites);
  }

  getFavorites(): Stock[] {
    const favorites = this.localStorageService.get<Stock[]>(STOCK_FAVORITES_KEY);
    return Array.isArray(favorites) ? favorites : [];
  }

  checkForNaN(value: string): string | undefined {
    const parsed = parseFloat(value);
    return isNaN(parsed) ? undefined : parsed.toFixed(2);
  }
}
