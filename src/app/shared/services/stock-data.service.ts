import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class StockDataService {
  private API_KEY2 = '9S919EDC89SB0HVD'; //can this be more secure?
  private API_KEY = 'NYDGYOTTC981VPXB';
  private baseUrl = 'https://www.alphavantage.co/query';
  
  constructor(private http: HttpClient) {}

  getLatestStockPrice(symbol: string) {
    const params = {
      function: 'GLOBAL_QUOTE',
      apikey: this.API_KEY,
      symbol,
    };
    
    return this.http.get<{[key: string]: any}>(`${this.baseUrl},${params}`).pipe(
      map((response) => response['Global Quote']),
      map((quote) => ({
        symbol: quote['01. symbol'],
        price: parseFloat(quote['05. price']),
        change: quote['09. change'],
        percentChange: quote['10. change percent'],
      })));
  }

  getSearchResults(search: string) {
    const params = {
      function: 'SYMBOL_SEARCH',
      keywords: search,
      apikey: this.API_KEY,
    };

    return this.http.get<{ bestMatches: any[] }>(this.baseUrl, { params }).pipe(
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
}
