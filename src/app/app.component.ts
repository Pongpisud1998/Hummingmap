import { Component } from '@angular/core';
import { Location } from "@angular/common";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'test-theme';

  constructor(
    public location: Location,
  ) {
    console.log(location.path());
    
  }
}
