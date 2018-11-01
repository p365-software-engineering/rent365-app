import { Component, OnInit } from '@angular/core';
import { ServiceTicketService, AuthXService } from 'app/services/service-export';
import { tick } from '@angular/core/src/render3';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  public pendingRequest: number;
  constructor(private ticket: ServiceTicketService, private authx: AuthXService) { }

  ngOnInit() {
    this.ticket.getProgressServiceticketsByAptID(this.authx._currentUser.uid).subscribe(
      pending => {
        this.pendingRequest = pending.length;
      }
    );
  }

}
