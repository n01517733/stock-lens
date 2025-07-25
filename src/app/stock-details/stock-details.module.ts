import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { StockDetailsComponent } from './stock-details.component';
import { MatTooltip } from '@angular/material/tooltip';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [StockDetailsComponent],
  imports: [CommonModule, MatIcon, MatTooltip, MatProgressSpinner],
  exports: [],
})
export class StockDetailsModule {}
