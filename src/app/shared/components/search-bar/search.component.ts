import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { distinctUntilChanged, filter, switchMap } from 'rxjs';
import { StockDataService } from '../../services/stock-data.service';
import { Stock } from '../../models/home/home.model';
import { LocalStorageService } from '../../services/local-storage.service';
import { STOCK_FAVORITES_KEY } from '../../constants/app.constants';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})

export class SearchComponent {
  @Output() optionSelected = new EventEmitter<Stock>();

  public searchControl = new FormControl();
  public searchResults: Stock[] = [];
  public displayedColumns = ['symbol', 'name', 'favorite'];
  public favoritesList: Stock[] =  [];
  
  private readonly localStorageService = inject(LocalStorageService);

  constructor(private stockDataService: StockDataService) {}

  ngOnInit():void {
    this.searchControl.valueChanges
    .pipe(
      distinctUntilChanged(),
      switchMap(value => this.stockDataService.getSearchResults(value))
    ).subscribe(results => {
        this.searchResults = results;
    });  
    this.localStorageService.storage$<Stock[]>(STOCK_FAVORITES_KEY).pipe(filter((value)=>value !== null)).subscribe((value) => {
        this.favoritesList = value;
    });
  }

  onOptionSelected(row: Stock){
    this.optionSelected.emit(row);
  }

  displayFn(result: any){
    return result ? `[${result.symbol}] ${result.name}` : '';
  }

  reset(){
    this.searchControl.setValue('');
  }

  updateFavorites(element: Stock): void {
    const isInFavorite = this.isInFavorites(element);
    isInFavorite ? this.stockDataService.removeStock(element.symbol) : this.stockDataService.addStock(element);
  }

  isInFavorites(stock: Stock): boolean {
    return this.favoritesList?.some(fav => fav.symbol === stock.symbol) ?? false;
  }
}
