import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import {MatInputModule} from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [SearchBarComponent],
  imports: [
    CommonModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule
  ],
  exports: [SearchBarComponent],
})
export class SharedModule {}
