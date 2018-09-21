import { Injectable } from '@angular/core';
import { IUser, IRegister } from '../../models/user_model';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})

// We will be using this service to authenticate user 
// Request - emailID, password
export class AuthXService {

  currentUser : IUser;
  reDirectURL :  String;

  constructor(private http:HttpClient) { }

  public isLoggedIn() : boolean{
    return true;
  }

  public userType() {
    // Return user type
  }

  public register(r_user: IRegister) : boolean {
    // Send an HttpRequest to the Rest-API
    // Upon successfull registration return true else false.
    // Already Registered - Warn the user and suggest him to login or try Forgot password.
    return true;
  }

  //login functionality 
  public login(user: IUser) : boolean{
    if(!user.email_id || !user.password){
      // Warn the user to input username and password. 
    }

    // Store the token in localstorage of the browser.
    // Navigate user to the corresponding page.
    return true;
  }
  
  public logout() : boolean{
    // Initiate logout request to the REST API
    // Clean out the localstorage to prevent from stealing the session tokens
    return true;
  }

}
