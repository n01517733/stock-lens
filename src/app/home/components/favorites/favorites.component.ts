import { Component, EventEmitter, Output, inject } from '@angular/core';
import { combineLatest, filter, map, of, switchMap } from 'rxjs';
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
  @Output() directToDetails = new EventEmitter<Stock>();

  public favoritesList: Stock[] = [];
  public favoritesLatestPrice: FavoritesCard[] = [];
  private readonly localStorageService = inject(LocalStorageService);

  constructor(private stockDataService: StockDataService) {}

  ngOnInit(){
    this.localStorageService
      .storage$<Stock[]>(STOCK_FAVORITES_KEY)
      .pipe(
        filter((favorites): favorites is Stock[] => favorites !== null),
        switchMap(favorites => {
          this.favoritesList = favorites;

          // Keep only prices that are still in the favorites list
          this.favoritesLatestPrice = this.favoritesLatestPrice.filter(p =>
            favorites.some(fav => fav.symbol === p.symbol)
          );

          const newSymbols = favorites.filter(
            stock => !this.favoritesLatestPrice.some(p => p.symbol === stock.symbol)
          );

          if (newSymbols.length === 0) return of([]);

          // Add placeholders
          this.favoritesLatestPrice.push(
            ...newSymbols.map(stock => ({
              symbol: stock.symbol,
              name: stock.name,
            }))
          );

          return combineLatest(
            newSymbols.map(stock =>
              this.stockDataService.getLatestStockPrice(stock.symbol).pipe(
                map(price => ({
                  ...price,
                  name: stock.name,
                }))
              )
            )
          );
        })
      )
      .subscribe(newPrices => {
        // Replace placeholder with actual data
        newPrices.forEach(newPrice => {
          const index = this.favoritesLatestPrice.findIndex(p => p.symbol === newPrice.symbol);
          if (index > -1) {
            this.favoritesLatestPrice[index] = newPrice;
          } else {
            this.favoritesLatestPrice.push(newPrice);
          }
        });
      });
  }

  removeStock(stock: FavoritesCard){
    this.favoritesList = this.favoritesList.filter(s => s.symbol !== stock.symbol);
    this.favoritesLatestPrice = this.favoritesLatestPrice.filter(s => s.symbol !== stock.symbol);
  }

  goToDetails(stock: FavoritesCard){
    const item = this.favoritesList.find(item => item.symbol === stock.symbol);
    this.directToDetails.emit(item);
  }
}
