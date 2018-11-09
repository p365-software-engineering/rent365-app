import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-apartment',
  templateUrl: './edit-apartment.component.html',
  styleUrls: ['./edit-apartment.component.css']
})
export class EditApartmentComponent implements OnInit {

  public apartmentData: FormGroup;
  constructor(private fb: FormBuilder,
      private router: Router,
      private routeParams: ActivatedRoute) { }

  ngOnInit() {
    this.apartmentData = this.fb.group({
      aptID: ['', [Validators.required]],
      baths: ['', [Validators.max(8), Validators.min(1), Validators.required]],
      beds: ['', [Validators.max(8), Validators.min(1), Validators.required]],
      description: ['', [Validators.maxLength(500), Validators.required]],
      title: ['', [Validators.maxLength(50), Validators.required]],
      sub_title: ['', [Validators.maxLength(50), Validators.required]],
      type: ['', [Validators.required]],
      price: ['', [Validators.required]],
      image: ['', Validators.required]
    });
  }

}
