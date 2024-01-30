import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SuccessComponent } from '../modal/signup/success/success.component';
import { FailureComponent } from '../modal/signup/failure/failure.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  private apiUrl = 'https://reqres.in/api';

  constructor(private http: HttpClient, private modalService: NgbModal) {}

  register(userInfo: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userInfo);
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
}
