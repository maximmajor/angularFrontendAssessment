import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { SuccessComponent } from '../modal/login/success/success.component';
import { FailureComponent } from '../modal/login/failure/failure.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { LogoutComponent } from '../modal/logout/logout.component';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://reqres.in/api';

  constructor(
    private http: HttpClient,
    private modalService: NgbModal,
    private router: Router
  ) {}

  login(user: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, user);
  }

  openSuccessModal() {
    const modalRef = this.modalService.open(SuccessComponent, {
      centered: true,
    });
    modalRef.closed.subscribe(() => {
      console.log('Modal closed');
    });
  }

  // A separate method for handling the failure modal
  openFailureModal() {
    const modalRef = this.modalService.open(FailureComponent, {
      centered: true,
    });
    modalRef.closed.subscribe(() => {
      console.log('Modal closed');
    });
  }

  isAuthenticated(): Observable<boolean> {
    const token = localStorage.getItem('token');

    if (!token) {
      // No token or expired token, navigate to login and return an observable with an error
      this.router.navigate(['/login']);
      return of(false);
    }

    return of(true);
  }

  isLoggedIn() {
    const token = localStorage.getItem('token');
    if (!token) {
      return of(false);
    }
    return of(true);
  }

  isLoggedOut() {
    localStorage.removeItem('token');
  }

  openLogoutModal() {
    const modalRef = this.modalService.open(LogoutComponent, {
      centered: true,
    });
    modalRef.closed.subscribe(() => {
      console.log('Logged out successfully');
    });
  }
}
