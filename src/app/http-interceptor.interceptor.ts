// http-interceptor.interceptor.ts
import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class HttpInterceptorInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log(`Outgoing Request - Method: ${request.method}, URL: ${request.url}`);
    
    return next.handle(request).pipe(
      tap(
        event => {
          if (event instanceof HttpResponse) {
            console.log(`Incoming Response - Status: ${event.status}, URL: ${request.url}`);
          }
        },
        error => {
          if (error instanceof HttpErrorResponse) {
            console.error(`Incoming Response Error - Status: ${error.status}, URL: ${request.url}`);
          }
        }
      )
    );
  }
}
