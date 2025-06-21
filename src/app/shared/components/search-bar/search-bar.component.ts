import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  // styles: [':host{display:contents}'], // Makes component host as if it was not there, can offer less css headaches. Use @HostBinding class approach for easier overrides.
  // host: { class: 'contents' },
})
export class SearchBarComponent {
  searchControl = new FormControl();
  constructor() {}

  ngOnInit():void {
    this.searchControl.valueChanges
      .pipe(distinctUntilChanged())
      .subscribe(value => {
        console.log('searching for:', this.searchControl.value);
        //filterStocks()
      });
  }

  // get value(): string {
  //   return this.searchControl.value ?? "";
  // }
  
  reset(){
    this.searchControl.setValue('');
  }

}
