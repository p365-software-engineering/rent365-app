import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route,
  CanActivate, CanActivateChild, CanLoad } from '@angular/router';
import { AuthXService } from '../login/auth-x.service';
import { Observable } from 'rxjs';
import { take,map,tap } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth'



@Injectable({
  providedIn: 'root'
})
export class AuthXGuardClientService implements CanActivate,CanActivateChild,CanLoad {
  // If the user is admin activate all the Client routes. 
 
  constructor(private AuthX: AuthXService,private router: Router, private firebaseAuth: AngularFireAuth) { }

  // https://github.com/codediodeio/angular-firestarter/blob/master/src/app/core/auth.guard.ts
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | any {

    return this.firebaseAuth.authState.pipe(
      map(auth => {
        if((auth)){
          console.log("Not allowed");
          this.router.navigate(['/'])
          return false;
        }
        else{
          return true;
        }
      })
    );
  }
  
  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    throw new Error("Method not implemented.");
  }
  canLoad(route: Route): boolean {
    throw new Error("Method not implemented.");
  }

}
