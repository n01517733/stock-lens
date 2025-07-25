import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SearchComponent } from './components/search-bar/search.component';
import {MatInputModule} from '@angular/material/input';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatTableModule } from '@angular/material/table';
import { MatTooltip } from '@angular/material/tooltip';
import { MatCard, MatCardContent, MatCardActions, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { FavoritesCardComponent } from './components/favorites/favorites-card/favorites-card.component';

@NgModule({
  declarations: [SearchComponent, FavoritesComponent, FavoritesCardComponent],
  imports: [
    CommonModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatTableModule,
    MatTooltip,
    MatIcon,
    MatProgressSpinner,
    MatCard,
    MatCardContent,
    MatCardActions,
    MatCardHeader,
    MatCardTitle,
    MatTooltip
  ],
  exports: [SearchComponent, FavoritesComponent, FavoritesCardComponent],
})
export class SharedModule {}
