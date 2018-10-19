import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent implements OnInit {

  constructor(private toastr: ToastrService) { }

  ngOnInit() {
  }

  public onSubmitRequest(requestData: NgForm): void {

    console.log(requestData.valid);
    if (requestData && requestData.valid) {
      console.log(requestData);
    } else {
      this.toastr.error('Failed to Submit the Ticket', 'Incomplete Fields', {
        timeOut: 1000
      });
    }
  }

}
