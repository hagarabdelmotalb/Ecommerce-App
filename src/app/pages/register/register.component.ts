import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from './../../core/services/auth/auth.service';
import { Component, inject } from '@angular/core';
import {AbstractControl, FormControl,FormGroup,ReactiveFormsModule, Validators} from '@angular/forms'
import { error } from 'console';
import { response } from 'express';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule,TranslatePipe],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  messageError:string = "";
  isSuccess:string = "";
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  isLoading:boolean = false;

  registerForm:FormGroup = new FormGroup({
    name:new FormControl(null, [Validators.required, Validators.minLength(3),Validators.maxLength(30)]),
    email:new FormControl(null, [Validators.required,Validators.email]),
    password:new FormControl(null, [Validators.required , Validators.pattern(/^[A-Z]\w{7,}$/)]),
    rePassword:new FormControl(null, [Validators.required ]),
    phone:new FormControl(null , [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]),
  },
  { validators: this.confirmPassword },
  
);

  submitForm():void{
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    if(this.registerForm.valid){
      this.isLoading = true;
      this.authService.sendRegisterForm(this.registerForm.value).subscribe(
        {
          next:(res)=>{
            console.log(res);
            if(res.message==='success'){

              this.isSuccess = res.message;

              setTimeout(()=>{
                this.router.navigate(['/login'])
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

  confirmPassword(group:AbstractControl){
    const password = group.get('password')?.value;
    const repassword = group.get('rePassword')?.value;

    return password === repassword ? null:{mismatch:true}
  }

}
