import { Component } from '@angular/core';
import { Stock } from '../shared/models/home/app.model';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  searchValue: string = '';
  searchResults: Stock[] = [];
  isMobile: boolean = false;
  drawerOpen: boolean = false;

  constructor(
    private breakpointObserver: BreakpointObserver
    ) {}

  ngOnInit(){
    this.breakpointObserver.observe(['(max-width: 768px)'])
      .subscribe(result => {
        this.isMobile = result.matches;
      });
  }
  
  toggleDrawer() {
    this.drawerOpen = !this.drawerOpen;
  }
}
