import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const logedGuard: CanActivateFn = (route, state) => {
  
  const _Route = inject(Router)

  if(localStorage.getItem('userToken') !== null){
    _Route.navigate(['/home'])
    return false;
  }
  else{
    return true;
  }
};
