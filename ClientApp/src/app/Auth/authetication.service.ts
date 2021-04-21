import { Router } from '@angular/router';
import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { User } from '../User/Model/user';

@Injectable()
export class AuthenticationService {
  debugger;
  token : string;
    myApiUrl = 'http://localhost:62873/';
  constructor(private http: HttpClient, private router:Router,@Inject('BASE_URL') baseUrl: string) { 
      this.myApiUrl = baseUrl;
  }

  login(data) {
      debugger;
    return this.http.post<any>(this.myApiUrl+'api/Account/login', data)
      .pipe(map(user => {
        if (user && user.token) {
          localStorage.setItem('currentUser', JSON.stringify(user));
          return user;
        }else{
          return user;
        }
      }));
  }

  logout() {
      debugger;
    // remove user from local storage to log user out
     this.token = null;
    localStorage.removeItem('currentUser');
    localStorage.clear();
    this.router.navigate(['/user/login']);
  }
}