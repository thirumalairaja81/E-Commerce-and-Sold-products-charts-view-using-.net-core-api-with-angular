import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) { }
    
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    debugger;
      let currentUser = JSON.parse(localStorage.getItem('currentUser'));
      const expectedPermissions = route.data.roles;
      if (currentUser) {
          if (expectedPermissions) {
              const found = expectedPermissions.indexOf(currentUser.role_id) > -1;
              if (!found) {
                  // this.router.navigate(['/forbidden']);
                  // return false;
                  localStorage.removeItem('currentUser');
                  this.router.navigate(['/user/login']);
              }else{
                  return true;
              }
          } else {
              return true;
          }
      }

      this.router.navigate(['/user/login'], { queryParams: { returnUrl: state.url }});
      return false;
  }
  // constructor(private router: Router) {
  // }
  // canActivate(
 
  //   next: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): boolean {
  //     debugger;
  //   if (localStorage.getItem('token') != null)
  //     return true;
  //   else {
  //     this.router.navigate(['/user/login']);
  //     return false;
  //   }

  // }
}