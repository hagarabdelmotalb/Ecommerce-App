import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData:any = null;
  constructor(private httpClient:HttpClient) { }

  private readonly _Router = inject(Router)

  sendRegisterForm(data:object):Observable<any>
  {
    return this.httpClient.post('https://ecommerce.routemisr.com/api/v1/auth/signup',data)
  }
  sendLoginForm(data:object):Observable<any>
  {
    return this.httpClient.post('https://ecommerce.routemisr.com/api/v1/auth/signin',data)
  }

  saveUserData():void{
    if(localStorage.getItem('userToken')!== null){
      this.userData = jwtDecode(localStorage.getItem('userToken')!)

    }
  }
  logout():void{
    localStorage.removeItem('userToken');
    this.userData = null;
    setTimeout(()=>{
      this._Router.navigate(['/login'])
    },500)

  }
//======================forget password service===================


  setEmailVerify(data:object):Observable<any>{
    return this.httpClient.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords',data)
  }

  setCodeVerify(data:object):Observable<any>{
    return this.httpClient.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode',data)
  }

  resetPasswordVerify(data:object):Observable<any>{
    return this.httpClient.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword',data)
  }


}
