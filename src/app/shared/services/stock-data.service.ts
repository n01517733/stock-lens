import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { API_KEY, baseUrl } from '../constants/app.constants';

@Injectable({ providedIn: 'root' })
export class StockDataService {

  constructor(private http: HttpClient) {}

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
        high: parseFloat(quote['03. high']).toFixed(2),
        low: parseFloat(quote['04. low']).toFixed(2),
        price: parseFloat(quote['05. price']).toFixed(2),
        date: quote['07. latest trading day'],
        change: parseFloat(quote['09. change']).toFixed(2),
        percentChange: `${parseFloat(quote['10. change percent']).toFixed(2)}%`,
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
}
