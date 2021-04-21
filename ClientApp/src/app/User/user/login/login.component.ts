import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/Auth/authetication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router,private authServ:AuthenticationService) { }
  formModel = {
    UserName: '',
    Password: ''
  }
  ngOnInit() {
    debugger;
    if (localStorage.getItem('token') != null)

      this.router.navigateByUrl('/home');
    
  }
  onSubmit(form: NgForm) {
    this.authServ.login(form.value).subscribe(
      (res: any) => {
        localStorage.setItem('token', res.token);
        
        this.router.navigateByUrl('/home');
      },
      // err => {
      //   if (err.status == 400)
      //     this.toastr.error('Incorrect username or password.', 'Authentication failed.');
      //   else
      //     console.log(err);
      // }
    );
  }
}
