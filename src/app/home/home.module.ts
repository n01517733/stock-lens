import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home.component';
import { provideHttpClient } from '@angular/common/http';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { FavoritesCardComponent } from './components/favorites/favorites-card/favorites-card.component';
import { MatIcon } from "@angular/material/icon";

@NgModule({
  declarations: [HomeComponent, FavoritesComponent,FavoritesCardComponent],
  imports: [CommonModule, SharedModule, MatIcon],
  providers: [provideHttpClient()],
  exports: [FavoritesComponent, FavoritesCardComponent],
})
export class HomeModule {}
