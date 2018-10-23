import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-lease-info',
  templateUrl: './lease-info.component.html',
  styleUrls: ['./lease-info.component.css']
})
export class LeaseInfoComponent implements OnInit {
  customerForm: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.customerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      dob: ''
    });
  }

  public populateData() {
    // Instead of setValue you can use patch value
    this.customerForm.setValue({
      firstName: 'arun nekkalapudi',
      lastName: 'nekkalapudi',
      email: 'arun.nekkalapudi@gmail.com'
    });
  }

  public setNotification(setValue: string) {
    const emailControl = this.customerForm.get('email');
    emailControl.setValidators([Validators.required]);
    emailControl.updateValueAndValidity();

  }

}
