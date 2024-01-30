import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor(private location: Location){

  }
  title = 'angular-assessment';
  goBack(): void {
    this.location.back();
  
  }
}
