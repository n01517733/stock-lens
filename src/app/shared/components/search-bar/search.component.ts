import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription, distinctUntilChanged, filter, switchMap } from 'rxjs';
import { StockDataService } from '../../services/stock-data.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Stock } from '../../models/home/home.model';
import { LocalStorageService } from '../../services/local-storage.service';
import { STOCK_FAVORITES_KEY } from '../../constants/app.constants';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})

export class SearchComponent {
  private readonly localStorageService = inject(LocalStorageService);
  // private readonly storageSubscription: Subscription;
  searchControl = new FormControl();
  searchResults: Stock[] = [];
  displayedColumns = ['symbol', 'name', 'favorite'];
  favoritesList: Stock[] =  [];

  @Output() optionSelected = new EventEmitter<Stock>();
  storageSubscription!: Subscription;

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
    const hasElement = this.favoritesList.some(item => item.symbol === element.symbol);

    this.favoritesList = hasElement
      ? this.favoritesList.filter(v => v.symbol !== element.symbol)
      : [...this.favoritesList, element];

    this.localStorageService.update(STOCK_FAVORITES_KEY, this.favoritesList);
  }

  isInFavorites(stock: Stock): boolean {
    return this.favoritesList?.some(fav => fav.symbol === stock.symbol) ?? false;
  }
}
