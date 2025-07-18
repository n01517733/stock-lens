import { Component, Input, inject } from '@angular/core';
import { combineLatest, filter } from 'rxjs';
import { FavoritesCard, Stock } from '../../../shared/models/home/home.model';
import { LocalStorageService } from '../../../shared/services/local-storage.service';
import { StockDataService } from '../../../shared/services/stock-data.service';
import { STOCK_FAVORITES_KEY } from '../../../shared/constants/app.constants';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent {  
  public favoritesList: Stock[] = [];
  public favoritesLatestPrice: FavoritesCard[] = [];
  private readonly localStorageService = inject(LocalStorageService);

  constructor(private stockDataService: StockDataService) {}
  ngOnInit(){
    this.localStorageService.storage$<Stock[]>(STOCK_FAVORITES_KEY).pipe(
      filter((favorites) => favorites !== null) 
    ).subscribe(favorites => {
        this.favoritesList = favorites;
      combineLatest(
        this.favoritesList.map(value =>
          this.stockDataService.getLatestStockPrice(value.symbol)
        )
      ).subscribe(prices => {
        this.favoritesLatestPrice = prices.map((price, index) => ({
          ...price,
          name: favorites[index].name 
        }));
      });
    });
  }

  removeStock(stock: FavoritesCard){
    this.favoritesList = this.favoritesList.filter(s => s.symbol !== stock.symbol);
    this.favoritesLatestPrice = this.favoritesLatestPrice.filter(s => s.symbol !== stock.symbol);
  }
}
