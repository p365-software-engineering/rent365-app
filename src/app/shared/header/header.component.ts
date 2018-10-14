import { Component, OnInit } from '@angular/core';
import { AuthXService} from '../../services/service-export';
import { Router } from '@angular/router';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public authX: AuthXService,public router:Router) {
    // this.authX.getUserInfo();
  }

  ngOnInit() {
  }
}
