import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/_service/product.service';
import { User } from '../../Model/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

 userRegister :User;

  constructor(private fb: FormBuilder,private service : ProductService,private _router : Router) { }


  // comparePasswords(fb: FormGroup) {
  //   debugger;
  //   let confirmPswrdCtrl = fb.get('ConfirmPassword');
  //   //passwordMismatch
  //   //confirmPswrdCtrl.errors={passwordMismatch:true}
  //   if (confirmPswrdCtrl.errors == null || 'passwordMismatch' in confirmPswrdCtrl.errors) {
  //     if (fb.get('password').value != confirmPswrdCtrl.value)
  //       confirmPswrdCtrl.setErrors({ passwordMismatch: true });
  //     else
  //       confirmPswrdCtrl.setErrors(null);
  //   }
  // }

  formModel = this.fb.group({
    userName: ['', Validators.required],

    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    // Passwords: this.fb.group({
      password: ['', [Validators.required, Validators.minLength(4)]],
    //   ConfirmPassword: ['', Validators.required]
    // }, { validator: this.comparePasswords })

  });



 ngOnInit() {
  
  }
  onSubmit(){
    debugger;
    this.service._register(this.formModel.value).subscribe((res : any)=>{
      this.userRegister = res;
      console.log(this.userRegister);
      this._router.navigate(['/user/login']) 
    })
  }
}
