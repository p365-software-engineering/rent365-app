import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthXService} from "../../services/service-export"
import { IUser } from '../../models/user_model';


@Component({
  selector: 'app-login-x',
  templateUrl: './login-x.component.html',
  styleUrls: ['./login-x.component.css']
})
export class LoginXComponent implements OnInit {

  currenttUser: IUser;

  constructor(private router: Router,private authX : AuthXService) { 
  }

  ngOnInit() {
    
  }

  onSubmit(formData : NgForm){
    if (formData && formData.valid) {

      this.currenttUser = {
        email_id : formData.value['email'],
        password : formData.value['password']
      }
      this.authX.login(this.currenttUser);
    }
    else{
      console.log("invalid")
    }
  }
}
