import { Injectable } from '@angular/core';
import { IUser, IRegister } from '../../models/user_model';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})

// We will be using this service to authenticate user 
// Request - emailID, password
export class AuthXService {

  private currentUser : IUser;
  private currentRegister : IRegister;

  redirectURL :  String;

  constructor(private http:HttpClient) { }

  public isLoggedIn() : boolean{
    return true;
  }

  public userType() {
    // Return user type
  }

  public register(r_user: IRegister) :  any {
    // Send an HttpRequest to the Rest-API
    // Upon successfull registration return true else false.
    // Already Registered - Warn the user and suggest him to login or try Forgot password.
    this.currentRegister = r_user;
    console.log(r_user.guid)
    console.log(r_user.email_id)
    console.log(r_user.last_name)
    console.log(r_user.first_name)
    console.log(r_user.middle_name)
    console.log(r_user.password)
   
    // return true;
  }

  //login functionality 
  public login(user: IUser) : boolean{
    this.currentUser = user;
    console.log(user['email_id']);
    console.log(user['password']);
    
     return true;
  }
  
  public logout() : boolean{
    // Initiate logout request to the REST API
    // Clean out the localstorage to prevent from stealing the session tokens
    return true;
  }

}
