import { Component, OnInit } from '@angular/core';
import { ServiceTicketService, AuthXService } from 'app/services/service-export';
import { ServiceTicket } from 'app/models/model-export';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-service-history',
  templateUrl: './service-history.component.html',
  styleUrls: ['./service-history.component.css']
})
export class ServiceHistoryComponent implements OnInit {

  public allCount: number;
  public completedCount: number;
  public pendingCount: number;
  public allRequests: ServiceTicket[];
  constructor(private ticket: ServiceTicketService,
    private authX: AuthXService) { }

  ngOnInit() {
    this.ticket.getServiceticketsByAptID(this.authX._currentUser.uid).subscribe(
      next => {
        this.allRequests = next;
        this.allCount = next.length;
      },
      error => console.log(error)
    );

    this.ticket.getProgressServiceticketsByAptID(this.authX._currentUser.uid).subscribe(
      next => {
        this.pendingCount = next.length;
      },
      error => console.log(error)
    );

    this.ticket.getCompletedServiceticketsByAptID(this.authX._currentUser.uid).subscribe(
      next => {
        this.completedCount = next.length;
      },
      error => console.log(error)
    );
  }

}
