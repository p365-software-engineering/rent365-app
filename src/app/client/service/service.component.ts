import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthXService, ServiceTicketService } from 'app/services/service-export';
import { Router } from '@angular/router';
import { ServiceTicket, IUserData } from 'app/models/model-export';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent implements OnInit {

  public serviceRequest: FormGroup;
  private date: string;
  private stid: string;
  public count: number;

  constructor(private ticket: ServiceTicketService ,
    private toastr: ToastrService,
    private router: Router,
    private fb: FormBuilder,
    private authX: AuthXService,
    private afs: AngularFirestore) {
    this.date = new Date().toISOString();
    this.stid = this.afs.createId();
    this.count = 0;
  }

  ngOnInit() {

    this.authX.getCurrentUser().subscribe(
      (user: IUserData) => {
        this.serviceRequest = this.fb.group({
          request_id: user['request_id'],
          serviceTicketID: this.stid,
          userID: user['uid'],
          lease_id: user['lease_id'],
          subject: ['', Validators.required],
          ticketDescription: ['', Validators.required],
          permission: ['', Validators.required],
          pets: ['', Validators.required],
          security: ['', Validators.required],
          dateCreated: this.date
        });
      }
    );

    // Need to Update based on lease id
    this.ticket.getProgressServiceticketsByAptID(this.authX._currentUser.uid).subscribe(
      next => {
        this.count = next.length;
      },
      error => console.log(error)
    );
  }

  public onSubmitRequest(): void {
    if (this.serviceRequest && this.serviceRequest.valid) {
      this.toastr.success('Service Request ', 'Submitted', {
        timeOut: 2000
      });
      const ticket: ServiceTicket = new ServiceTicket(this.serviceRequest.value);
      // console.log(JSON.stringify(ticket));
      this.ticket.createNewServiceTicket(ticket);
      this.router.navigate(['client', 'history']);
    } else {
      this.toastr.error('Failed to Submit the Ticket', 'Incomplete Fields', {
        timeOut: 1000
      });
    }
  }
}
