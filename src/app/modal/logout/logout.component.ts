import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {
  
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  constructor(public modal: NgbModal, private authService: AuthService, private router: Router){

  }

  close(){
    this.modal.dismissAll();
    
  }

  logout(){
    this.modal.dismissAll();
    this.authService.isLoggedOut()
    this.router.navigate(['/login']);
  }

}
