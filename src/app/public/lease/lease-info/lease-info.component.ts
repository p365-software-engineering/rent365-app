import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { LeaseService } from 'app/services/lease/lease.service';
import { Router } from '@angular/router';
import { AuthXService } from 'app/services/service-export';

@Component({
  selector: 'app-lease-info',
  templateUrl: './lease-info.component.html',
  styleUrls: ['./lease-info.component.css']
})
export class LeaseInfoComponent implements OnInit {
  customerForm: FormGroup;
  constructor(private fb: FormBuilder, private ls: LeaseService, public router: Router, public authX: AuthXService) { }

  ngOnInit() {
    this.customerForm = this.fb.group({
      uid: this.authX._currentUser.uid ,
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      leaseInfo: this.fb.group({
        'startDate': ['', [Validators.required]],
        'period': ['', Validators.required],
      }),
      otherLeasee: this.fb.array([])
    });
  }

  private getOtherLease(): FormArray {
    return <FormArray>this.customerForm.get('otherLeasee');
  }

  public populateData() {
    // Instead of setValue you can use patch value
    this.customerForm.patchValue({
      firstName: 'arun nekkalapudi',
      lastName: 'nekkalapudi',
      email: 'arun.nekkalapudi@gmail.com',
    });
  }

  public setNotification(setValue: string) {
    const emailControl = this.customerForm.get('email');
    emailControl.setValidators([Validators.required]);
    emailControl.updateValueAndValidity();
  }

  public addLeasee(): void {
    this.getOtherLease().push(this.newSubLeasee());
    console.log(this.customerForm.value);
  }

  public popLeasee(): void {
    if (this.getOtherLease().length > 0) {
      this.getOtherLease().removeAt(this.getOtherLease().length - 1);
    }
    console.log(this.customerForm.value);
  }

  public navigateBack() {
    this.router.navigate(['lease', 'amenities']);
   }

  public newSubLeasee(): FormGroup {
    return this.fb.group({
      firstName : ['', Validators.required],
      lastName : ['', Validators.required],
      email : ['', [Validators.required, Validators.email] ]
    });
  }

  public saveLeaseInfo() {
    if (this.customerForm.valid && this.customerForm) {
      console.log('UserInfo-Success');
      this.ls.setUserDetails(this.customerForm.value);
      this.router.navigate(['lease', 'submit']);
    } else {
      console.log('Failed to update data');
    }
  }
}
