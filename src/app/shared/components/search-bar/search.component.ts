import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { distinctUntilChanged, filter, switchMap } from 'rxjs';
import { StockDataService } from '../../services/stock-data.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Stock } from '../../models/home/home.model';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})

export class SearchComponent {
  STOCK_FAVORITES_KEY = 'STOCK_FAVORITES';
  searchControl = new FormControl();
  searchResults: Stock[] = [];
  displayedColumns = ['symbol', 'name', 'favorite'];
  favoritesList:Stock[] = [];
  
  private readonly localStorageService = inject(LocalStorageService);

  @Output() optionSelected = new EventEmitter<Stock>();

  constructor(private stockDataService: StockDataService) {}

  ngOnInit():void {
    this.favoritesList = this.localStorageService.get(this.STOCK_FAVORITES_KEY) ?? []; 
    this.searchControl.valueChanges
    .pipe(
      distinctUntilChanged(),
      switchMap(value => this.stockDataService.getSearchResults(value))
    ).subscribe(results => {
        this.searchResults = results;
    });  
  }

  onOptionSelected(event: MatAutocompleteSelectedEvent){
    this.optionSelected.emit(event.option.value);
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

    this.localStorageService.update(this.STOCK_FAVORITES_KEY, this.favoritesList);
  }

  isInFavorites(stock: Stock): boolean {
    return this.favoritesList.some(fav => fav.symbol === stock.symbol);
  }
}
