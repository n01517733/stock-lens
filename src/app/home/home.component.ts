import { Component } from '@angular/core';
import { StockDataService } from '../shared/services/stock-data.service';
import { Stock } from '../shared/models/home/home.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  searchValue: string = '';
  searchResults: Stock[] = [];

  constructor(private stockDataService: StockDataService) {}

  goToDetails(value: Stock): void {
    console.log("row clicked, need to redirect to details page", value)
  }
}
