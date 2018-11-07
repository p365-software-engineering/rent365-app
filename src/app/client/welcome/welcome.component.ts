import { Component, OnInit } from '@angular/core';
import { ServiceTicketService, AuthXService, BillService, EventService } from 'app/services/service-export';
import { IUserData } from '../../models/user-model';
import { Bill } from '../../models/bill';
import { Event } from '../../models/event';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  public pendingRequest: number;
  public bill: Bill;
  public event: Event;
  // TODO: SEE BELOW
  // private _serviceCount: number;

  constructor(private ticket: ServiceTicketService,
              private authx: AuthXService,
              private _billService: BillService,
              private _serviceTicketService: ServiceTicketService,
              private _eventService: EventService,
              private _router: Router) { }

  ngOnInit() {
    // TODO: DECIDE IF THIS IS BETTER based on DB Structure
    // this._serviceTicketService.getServiceticketsByUserID(this.authx._currentUser.uid)
    //   .subscribe(serviceTickets => this._serviceCount = serviceTickets.length);
    this.ticket.getProgressServiceticketsByAptID(this.authx._currentUser.uid).subscribe(
      pending => {
        this.pendingRequest = pending.length;
      }
    );

    this.authx.getCurrentUser().subscribe((user: IUserData) => {
      this._billService.getBillByUserID(user.uid)
        .subscribe(bill => this.bill = bill);
    });
    this._eventService.getNextEvent().subscribe((event: Event[]) => {
      this.event = event[0];
      console.log(event);
    });
  }

  goToEvents() {
    this._router.navigate(['client/community']);
  }

}
