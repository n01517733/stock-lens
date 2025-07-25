import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StockDataService } from '../shared/services/stock-data.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-stock-details',
  templateUrl: './stock-details.component.html',
  styleUrls: ['./stock-details.component.scss']
})
export class StockDetailsComponent {
  quote: any;
  overview: any;
  symbol: string = '';
  isLoading: boolean = true;

  constructor (
    private route: ActivatedRoute,
    private router: Router, 
    private stockDataService: StockDataService
    ) {}

  ngOnInit(){
    this.symbol = this.route.snapshot.paramMap.get('symbol')!;

    forkJoin({
      quote: this.stockDataService.getLatestStockPrice(this.symbol),
      overview: this.stockDataService.getStockDetails(this.symbol)
    }).subscribe(({ quote, overview }) => {
      this.quote = quote;
      this.overview = overview;
      this.isLoading = false;
    });

  }

  get noStockData(): boolean {
    return Object.values(this.overview).every(value => value === undefined || value === null) 
    && Object.values(this.quote).every(value => value === undefined || value === null);
  }

  goToDetails() {
    this.router.navigate(['/']);
  }

  formatDate(dateStr: string): string {
    const [year, month, day] = dateStr.split('-');
    return `${month}.${day}.${year}`;
  }
}
