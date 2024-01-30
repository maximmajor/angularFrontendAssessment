import { AuthService } from '../../services/auth.service';
import { GeolocationService } from './../../services/geolocation.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'], // Fix: Use 'styleUrls' instead of 'styleUrl'
})
export class NavComponent implements OnInit {
  city!: string;
  region!: string;
  country!: string;
  locationError: any;
  isLoggedIn!: boolean;
  constructor(
    private geolocationService: GeolocationService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.geolocationService.getGeolocationData().subscribe(
      (res: any) => {
        this.city = res.city;
        this.region = res.region;
        this.country = res.country;
      },
      (error) => {
        this.locationError =
          'Error fetching geolocation data: ' + error.message;
      }
    );
    this.isLogin();
  }

  isLogin() {
    this.authService.isLoggedIn().subscribe((value) => {
      this.isLoggedIn = value;
    });
  }

  logout() {
    this.authService.openLogoutModal();
  }
}
