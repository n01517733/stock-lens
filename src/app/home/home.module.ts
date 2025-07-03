import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home.component';
import { provideHttpClient } from '@angular/common/http';

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, SharedModule, ],
  providers: [provideHttpClient()],
  exports: [],
})
export class HomeModule {}
