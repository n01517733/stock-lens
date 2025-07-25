import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FavoritesCard, Stock } from '../../../models/home/app.model';
import { LocalStorageService } from '../../../services/local-storage.service';
import { STOCK_FAVORITES_KEY } from '../../../constants/app.constants';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favorites-card',
  templateUrl: './favorites-card.component.html',
  styleUrls: ['./favorites-card.component.scss']

})
export class FavoritesCardComponent {
  @Input() stock!: FavoritesCard;
  @Output() removeStock = new EventEmitter<FavoritesCard>();

  private readonly localStorageService = inject(LocalStorageService);

  constructor(private router: Router) {}
  
  get stockDataAvailable(): boolean {
    return !!this.stock?.high;
  }

  removeCard(card: FavoritesCard) {
    this.localStorageService.remove<Stock>(STOCK_FAVORITES_KEY, card.symbol)
    this.removeStock.emit(card);
  }
  
  goToDetails() {
    this.router.navigate(['/', this.stock.symbol]);
  }

  formatDate(dateStr: string): string {
    const [year, month, day] = dateStr.split('-');
    return `${month}.${day}.${year}`;
  }
}
