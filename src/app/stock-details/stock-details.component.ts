import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-stock-details',
  templateUrl: './stock-details.component.html',
  styleUrls: ['./stock-details.component.scss']
})
export class StockDetailsComponent {
  symbol: string = '';

  constructor(private route: ActivatedRoute, private router: Router) {}
  ngOnInit(){
    this.symbol = this.route.snapshot.paramMap.get('symbol')!;
  }

  goToDetails() {
    this.router.navigate(['/']);
  }
}
