import { Component } from '@angular/core';
import { StockDataService } from '../shared/services/stock-data.service';
import { Stock } from '../shared/models/home/home.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  searchValue: string = '';
  searchResults: Stock[] = [];
  favorites: Stock[] = [];

  constructor(private stockDataService: StockDataService) {}

  filterResult(value: Stock): void {
    this.searchValue = value.symbol;

    if (!this.searchValue) return;

    this.favorites.push(value);
  }
}
