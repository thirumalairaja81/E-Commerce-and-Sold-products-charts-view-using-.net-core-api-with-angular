import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { tap } from "rxjs/operators";

@Injectable()
export class AuthinterceptorInterceptor implements HttpInterceptor {

  constructor(private router: Router) {

  }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.token) {
        request = request.clone({
            setHeaders: { 
                Authorization: `Bearer ${currentUser.token}`
            }
        });
    }

    return next.handle(request);
}


}