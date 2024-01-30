import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Login } from '../../model/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  passwordVisible = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // throw new Error('Method not implemented.');
    this.authService.isAuthenticated();
  }

  onSubmit(values: { email: string; password: string }) {
    const userData: Login = {
      email: values.email,
      password: values.password,
    };

    this.authService.login(userData).subscribe(
      (response) => {
        if (response.token) {
          localStorage.setItem('token', response.token);
        }

        this.authService.openSuccessModal();
      },
      (error) => {
        console.error('Login failed:', error);
        this.authService.openFailureModal();
      }
    );
  }

  togglePassword(): void {
    this.passwordVisible = !this.passwordVisible;
  }
}
