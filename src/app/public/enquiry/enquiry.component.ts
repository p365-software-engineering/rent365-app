import { Component, OnInit } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-enquiry',
  templateUrl: './enquiry.component.html',
  styleUrls: ['./enquiry.component.css']
})
export class EnquiryComponent implements OnInit {
  public enquiry: FormGroup;
  private eid: string;
  constructor(private fb: FormBuilder, private toastr: ToastrService, public afs: AngularFirestore) {
    this.eid = this.afs.createId();
  }
  ngOnInit() {
    this.enquiry = this.fb.group({
      eid: this.eid,
      firstName: ['', [ Validators.required]],
      lastName: ['', [ Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      contact: [''],
      message: ['', [Validators.required]]
    });
  }

  public enquire() {
    if (this.enquiry && this.enquiry.valid) {
        this.toastr.success('Enquiry has been succesfully submitted', 'Submitted', {
        timeOut: 2000
      });
      console.log(this.enquiry.value);
    } else {
      console.log('Invalid details has been submitted');
    }
  }

}
