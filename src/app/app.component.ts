import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent {
  isFetching = true;
  constructor() { setTimeout(() => this.isFetching = false, 1000); }
}
