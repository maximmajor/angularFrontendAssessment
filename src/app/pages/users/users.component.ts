import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../model/user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'], // Fix: Change styleUrl to styleUrls
})
export class UsersComponent implements OnInit {
  users: any;
  first_name!: string;
  last_name!: string;
  email!: string;
  id!: string;
  editProfile: boolean = false;

  page: number = 1;
  per_page!: number;
  total!: number;

  constructor(
    private userService: UserService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.userService.getAllUsers(this.page).subscribe((val) => {
      this.users = val.data;
      this.page = val.page;
      this.per_page = val.per_page;
      this.total = val.total;
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
        this.toastr.error('User update failed!', 'Error'); // Fix: Use error method for toastr
      }
    );
  }

  loadPage(pageNum: number, event: Event) {
    event.preventDefault();
    if (pageNum !== this.page) {
      this.userService.getAllUsers(pageNum).subscribe(
        (val) => {
          this.users = val.data;
          this.page = pageNum; // Update the page after a successful API call
          this.per_page = val.per_page;
          this.total = val.total;
        },
        (error) => {
          this.toastr.error('User update failed!', 'Error');
        }
      );
    }
  }

  getPaginationArray(): number[] {
    const numPages = Math.ceil(this.total / this.per_page);
    return Array.from({ length: numPages }, (_, index) => index + 1);
  }

  onDelete(id: string) {
    this.userService.deleteUser(id).subscribe(
      () => {
        console.log('User deleted successfully');
        this.toastr.success('User deleted successfully', 'Success');
        window.location.reload();
      },
      (error) => {
        console.error('Error deleting user:', error);
        this.toastr.error('Error deleting user', 'Error');
      }
    );
  }
}
