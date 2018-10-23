import { Component, OnInit } from '@angular/core';
import { LeaseService } from 'app/services/lease/lease.service';
import { Apartment } from 'app/models/apartment';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-apartment',
  templateUrl: './apartment.component.html',
  styleUrls: ['./apartment.component.css']
})
export class ApartmentComponent  {
  public apartments: Apartment[];
  public apartment: any;
  public alert: boolean;

  constructor(private ls: LeaseService, private router: Router) {
    this.ls.getApartments().subscribe(
      next => {
        this.apartments = next;
      },
      error => console.log(error)
    );
  }

  public apartmentSubmit(apartmentID: NgForm) {
    // Fill the data and route to next page [Amenities]
    if (apartmentID && apartmentID.valid) {
      this.ls.setLeaseAptID(apartmentID.value);
      this.alert = false;
      this.router.navigate(['/lease/amenities']);
    }
    this.alert = true;
  }
}
