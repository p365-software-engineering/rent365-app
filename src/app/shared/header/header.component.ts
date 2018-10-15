import { Component, OnInit } from '@angular/core';
import { AuthXService} from '../../services/service-export';
import { Router } from '@angular/router';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public authX: AuthXService, public router: Router) {
    // this.authX.getUserInfo();
  }


  ngOnInit() {
  }

  public show(): boolean {

    if ((this.router.url).indexOf('client') >= 0) {
      return false;
    } else if ((this.router.url).indexOf('admin') >= 0) {
      return false;
    }
    return true;

  }
}
