import { Component, OnInit } from '@angular/core';
import { Register } from '../../model/register';
import { RegisterService } from '../../services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  passwordVisible = false;

  constructor(private registerService: RegisterService) {}

  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }

  onSubmit(values: { email: string; password: string }) {
    const userData: Register = {
      email: values.email,
      password: values.password,
    };

    this.registerService.register(userData).subscribe(
      (response) => {
        this.registerService.openSuccessModal();
      },
      (error) => {
        this.registerService.openFailureModal();
      }
    );
  }

  togglePassword(): void {
    this.passwordVisible = !this.passwordVisible;
  }
}
