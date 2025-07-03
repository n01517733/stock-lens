import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SearchComponent } from './components/search-bar/search.component';
import {MatInputModule} from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [SearchComponent],
  imports: [
    CommonModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatTableModule,
  ],
  exports: [SearchComponent],
})
export class SharedModule {}
