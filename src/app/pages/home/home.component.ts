import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  isLoggedIn!: boolean;
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.isLogin();
  }

  isLogin() {
    this.authService.isLoggedIn().subscribe((value) => {
      console.log(value);
      this.isLoggedIn = value;
    });
  }
}
