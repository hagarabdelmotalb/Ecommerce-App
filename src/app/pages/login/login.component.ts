import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from './../../core/services/auth/auth.service';
import { Component, inject } from '@angular/core';
import {AbstractControl, FormControl,FormGroup,ReactiveFormsModule, Validators} from '@angular/forms'
import { error } from 'console';
import { response } from 'express';
import { Router, RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,RouterLink,TranslatePipe],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  messageError:string = "";
  isSuccess:string = "";
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  isLoading:boolean = false;

    loginForm:FormGroup = new FormGroup({
   
    email:new FormControl(null, [Validators.required,Validators.email]),
    password:new FormControl(null, [Validators.required , Validators.pattern(/^[A-Z]\w{7,}$/)]),
  },

  
);

  submitForm():void{
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    if(this.loginForm.valid){
      this.isLoading = true;
      this.authService.sendLoginForm(this.loginForm.value).subscribe(
        {
          next:(res)=>{
            console.log(res);
            if(res.message==='success'){

              this.isSuccess = res.message;

              localStorage.setItem('userToken',res.token)
              

              this.authService.saveUserData();
              

              setTimeout(()=>{
                this.router.navigate(['/home'])
              },1000)

            }
            this.isLoading = false;
          },
    
          error:(err:HttpErrorResponse)=>{
            console.log(err);
            this.messageError = err.error.message;
            this.isLoading = false;
          }
        }
      )
    }
  }
}
