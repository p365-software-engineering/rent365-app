import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route,
  CanActivate, CanActivateChild, CanLoad } from '@angular/router';
import { AuthXService } from '../login/auth-x.service';


@Injectable({
  providedIn: 'root'
})
export class AuthXGuardClientService implements CanActivate,CanActivateChild,CanLoad {
  // If the user is admin activate all the Client routes. 
 
  constructor(private authService: AuthXService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // Check whether if logIn user is Client or Not.
    throw new Error("Method not implemented.");
  }
  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    throw new Error("Method not implemented.");
  }
  canLoad(route: Route): boolean {
    throw new Error("Method not implemented.");
  }

}
