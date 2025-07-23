import { Component } from '@angular/core';
import { Stock } from '../shared/models/home/home.model';
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

  goToDetails(value: Stock): void {
    console.log("row clicked, need to redirect to details page", value)
  }
  
  toggleDrawer() {
    this.drawerOpen = !this.drawerOpen;
  }
}
