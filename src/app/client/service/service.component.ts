import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthXService, ServiceTicketService } from 'app/services/service-export';
import { Guid } from 'guid-typescript';
import { Router } from '@angular/router';
import { ServiceTicket } from 'app/models/model-export';
import { tick } from '@angular/core/src/render3';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent implements OnInit {

  serviceRequest: FormGroup;
  date: string;

  constructor(private ticket: ServiceTicketService ,
    private toastr: ToastrService,
    private router: Router,
    private fb: FormBuilder,
    private authX: AuthXService) {
    this.date = new Date().toISOString();
  }

  ngOnInit() {
    this.serviceRequest = this.fb.group({
      serviceTicketID: Guid.create().toString(),
      userID: this.authX._currentUser.uid,
      apartmentID: '',
      subject: ['', Validators.required],
      ticketDescription: ['', Validators.required],
      permission: ['', Validators.required],
      pets: ['', Validators.required],
      security: ['', Validators.required],
      dateCreated: this.date
    });
  }

  public onSubmitRequest(): void {
    if (this.serviceRequest && this.serviceRequest.valid) {
      this.toastr.success('Service Request ', 'Submitted', {
        timeOut: 2000
      });
      const ticket: ServiceTicket = new ServiceTicket(this.serviceRequest.value);
      console.log(JSON.stringify(ticket));
      this.ticket.createNewServiceTicket(ticket);
      this.router.navigate(['client', 'history']);
    } else {
      this.toastr.error('Failed to Submit the Ticket', 'Incomplete Fields', {
        timeOut: 1000
      });
    }
  }
}
