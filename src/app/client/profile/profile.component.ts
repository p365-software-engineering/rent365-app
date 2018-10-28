import { Component, OnInit } from '@angular/core';
import { AuthXGuardAdminService, AuthXService } from 'app/services/service-export';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public lastName: string;
  constructor(private authX: AuthXService) {

  }

  ngOnInit() {
    this.lastName = 'Nekkalapudi';
  }

}

