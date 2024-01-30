import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../model/user';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrl: './my-account.component.css',
})
export class MyAccountComponent implements OnInit {
  singleUserData!: any;
  first_name!: string;
  last_name!: string;
  email!: string;
  id!: string;
  editProfile: boolean = false;

  constructor(
    private userService: UserService,
    private toastr: ToastrService
  ) {}
  ngOnInit() {
    this.userService.getUser().subscribe((val) => {
      this.singleUserData = val.data;
      this.first_name = val.data.first_name;
      this.last_name = val.data.last_name;
      this.email = val.data.email;
      this.id = val.data.id;
    });
  }

  editAccount(
    first_name: string,
    last_name: string,
    email: string,
    id: string
  ) {
    console.log(first_name, last_name, email, id);
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.id = id;
    this.editProfile = true;
  }

  onSubmit(values: any) {
    const userData: User = {
      first_name: values.first_name,
      last_name: values.last_name,
      email: values.email,
    };
    this.userService.updateUser(this.id, userData).subscribe(
      (response) => {
        this.editProfile = false;
        this.toastr.success('User updated successfully!', 'Success');
      },
      (error) => {
        this.toastr.success('User updated successfully!', 'Success');
      }
    );
  }
}
