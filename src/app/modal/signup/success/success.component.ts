import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css']
})
export class SuccessComponent {
  constructor(public modal: NgbModal, private router: Router) {}


  close(){
    this.modal.dismissAll();
    this.router.navigate(['/login']);
  }
}
