import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FavoritesCard, Stock } from '../../../../shared/models/home/home.model';
import { LocalStorageService } from '../../../../shared/services/local-storage.service';
import { STOCK_FAVORITES_KEY } from '../../../../shared/constants/app.constants';

@Component({
  selector: 'app-favorites-card',
  templateUrl: './favorites-card.component.html',
  styleUrls: ['./favorites-card.component.scss']

})
export class FavoritesCardComponent {
  @Input() stock!: FavoritesCard;
  @Output() removeStock = new EventEmitter<FavoritesCard>();
  @Output() directToDetails = new EventEmitter<FavoritesCard>();

  private readonly localStorageService = inject(LocalStorageService);

  // constructor() {}

  ngOnInit() {
    // console.log("card", this.stock)
  }
  
  get stockDataAvailable(): boolean {
    return !!this.stock?.high;
  }

  removeCard(card: FavoritesCard) {
    this.localStorageService.remove<Stock>(STOCK_FAVORITES_KEY, card.symbol)
    this.removeStock.emit(card);
  }
  
  goToDetails() {
    this.directToDetails.emit(this.stock);
  }

  formatDate(dateStr: string): string {
    const [year, month, day] = dateStr.split('-');
    return `${month}.${day}.${year}`;
  }
}
