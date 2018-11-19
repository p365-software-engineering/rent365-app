import { Component, OnInit } from '@angular/core';
import { AuthXService } from 'app/services/service-export';
import { LeaseService } from 'app/services/lease/lease.service';
import { IUserData } from 'app/models/user-model';
import { Tenant, LeaseRequest } from 'app/models/lease-request';

@Component({
  selector: 'app-lease',
  templateUrl: './lease.component.html',
  styleUrls: ['./lease.component.css']
})
export class LeaseComponent implements OnInit {

  public userInfo: IUserData;
  public leasee: LeaseRequest;

  constructor(public authx: AuthXService, public ls: LeaseService) { }

  ngOnInit() {
    this.authx.getCurrentUser().subscribe(
      (user: IUserData) => {
        this.userInfo = user;
        this.ls.getTenantByLeaseID(user['lease_id']).subscribe(
          (tenant: Tenant) => {
            this.ls.getLeaseRequestById(tenant['requestID']).subscribe(
              (leaseRequest: LeaseRequest) => {
                console.log(leaseRequest);
                this.leasee = leaseRequest;
              }
            );
          }
        );
      }
    );
  }

}
