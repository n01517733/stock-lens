import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home.component';
import { provideHttpClient } from '@angular/common/http';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { FavoritesCardComponent } from './components/favorites/favorites-card/favorites-card.component';
import { MatIcon } from "@angular/material/icon";
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { MatTooltip } from '@angular/material/tooltip';

@NgModule({
  declarations: [HomeComponent, FavoritesComponent, FavoritesCardComponent],
  imports: [
    CommonModule,
    SharedModule,
    MatIcon,
    MatProgressSpinner,
    MatCard,
    MatCardContent,
    MatCardActions,
    MatCardHeader,
    MatCardTitle,
    MatTooltip
  ],
  providers: [provideHttpClient()],
  exports: [FavoritesComponent, FavoritesCardComponent],
})
export class HomeModule {}
