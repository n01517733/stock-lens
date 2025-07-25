import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home.component';
import { provideHttpClient } from '@angular/common/http';
import { FavoritesComponent } from '../shared/components/favorites/favorites.component';
import { FavoritesCardComponent } from '../shared/components/favorites/favorites-card/favorites-card.component';
import { MatIcon } from "@angular/material/icon";
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { MatTooltip } from '@angular/material/tooltip';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    SharedModule,
    MatIcon
  ],
  providers: [provideHttpClient()],
  exports: [],
})
export class HomeModule {}
