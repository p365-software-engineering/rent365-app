import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route,
  CanActivate, CanActivateChild, CanLoad } from '@angular/router';
import { AuthXService } from '../login/auth-x.service';

@Injectable({
  providedIn: 'root'
})
export class AuthXGuardAdminService implements CanActivate,CanActivateChild,CanLoad{
  // If the user is admin activate all the Admin routes. 

  constructor(private authService: AuthXService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    throw new Error("Method not implemented.");
  }
  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean  {
    if(this.authService.isLoggedIn()){

    }
    throw new Error("Method not implemented.");
  }
  canLoad(route: Route): boolean  {
    throw new Error("Method not implemented.");
  }
  
}
