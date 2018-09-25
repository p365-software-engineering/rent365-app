import { Component, OnInit } from '@angular/core';
import { Guid } from "guid-typescript";
import { AuthXService} from "../../services/service-export";
import { IRegister } from '../../models/user_model';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-register-x',
  templateUrl: './register-x.component.html',
  styleUrls: ['./register-x.component.css']
})
export class RegisterXComponent implements OnInit {
  
  currentRegister: IRegister;
  constructor(private router: Router,private authX : AuthXService ) { }

  ngOnInit() {
  }

  onSubmit(formData :NgForm){
    console.log(formData.value);    
    if (formData && formData.valid) {
      if(formData.value['password'] == formData.value['confirmPassword']){
        
        this.currentRegister = {
          guid: Guid.create().toString(),
          first_name: formData.value['firstName'],
          middle_name:"na",
          last_name:formData.value['lastName'],
          email_id: formData.value['email'],
          password: formData.value['password']
        }

        this.authX.register(this.currentRegister);
      }
    }
    else{
      console.log("invalid")
    }
  }

}
