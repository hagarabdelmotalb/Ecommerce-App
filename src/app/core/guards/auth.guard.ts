import { isPlatformBrowser, ɵPLATFORM_BROWSER_ID } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {

  const _Route = inject(Router)
  const id = inject(PLATFORM_ID)

  if(isPlatformBrowser(id)){
    if(localStorage.getItem('userToken') !== null){
      return true;
    }
    else{
      _Route.navigate(['/login'])
      return false
    }
  }
  else{
    return false
  }
};
