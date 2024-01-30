import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {

  api_key = '68448fc08499471d8addbdaff92ab8c6';
  url = 'https://ipgeolocation.abstractapi.com/v1/?api_key=' + this.api_key;

  constructor(private http: HttpClient) { }

  getGeolocationData(): Observable<any> {
    return this.http.get(this.url);
  }
}
