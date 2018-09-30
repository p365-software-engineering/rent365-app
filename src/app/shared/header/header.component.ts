import { Component, OnInit } from '@angular/core';
import { AuthXService} from "../../services/service-export";



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public authX : AuthXService) { 
    // this.authX.getUserInfo();
  }

  ngOnInit() {
  }
}
