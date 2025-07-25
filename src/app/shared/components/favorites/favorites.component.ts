import { Component, Input, inject } from '@angular/core';
import { combineLatest, filter, map, mergeMap, of } from 'rxjs';
import { FavoritesCard, Stock } from '../../models/home/app.model';
import { LocalStorageService } from '../../services/local-storage.service';
import { StockDataService } from '../../services/stock-data.service';
import { STOCK_FAVORITES_KEY } from '../../constants/app.constants';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent {  
  @Input() isMobile: boolean = false;

  public favoritesList: Stock[] = [];
  public favoritesLatestPrice: FavoritesCard[] = [];
  private readonly localStorageService = inject(LocalStorageService);

  constructor(private stockDataService: StockDataService) {}

  ngOnInit(){
    this.localStorageService
      .storage$<Stock[]>(STOCK_FAVORITES_KEY)
      .pipe(
        filter((favorites): favorites is Stock[] => favorites !== null),
        mergeMap(favorites => {
          this.favoritesList = favorites;

          this.favoritesLatestPrice = this.favoritesLatestPrice.filter(p =>
            favorites.some(fav => fav.symbol === p.symbol)
          );

          const newSymbols = favorites.filter(
            stock => !this.favoritesLatestPrice.some(p => p.symbol === stock.symbol)
          ).reverse();

          if (newSymbols.length === 0) return of([]);

          this.favoritesLatestPrice.unshift(
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
        newPrices.forEach(newPrice => {
          const index = this.favoritesLatestPrice.findIndex(p => p.symbol === newPrice.symbol);
          (index > -1) ? this.favoritesLatestPrice[index] = newPrice : this.favoritesLatestPrice.unshift(newPrice);
        });
      });
  }

  removeStock(stock: FavoritesCard){
    this.favoritesList = this.favoritesList.filter(s => s.symbol !== stock.symbol);
    this.favoritesLatestPrice = this.favoritesLatestPrice.filter(s => s.symbol !== stock.symbol);
  }
}
