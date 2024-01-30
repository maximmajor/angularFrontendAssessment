import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'https://reqres.in/api';

  constructor(private http: HttpClient) {}

  getUser(): Observable<any> {
    return this.http.get(`${this.apiUrl}/users/4`);
  }

  updateUser(id: string, user: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/users/${id}`, user);
  }

  getAllUsers(page: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/users?page=${page}`);
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/users/${id}`);
  }
}
