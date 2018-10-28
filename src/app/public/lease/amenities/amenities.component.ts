import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LeaseService } from 'app/services/lease/lease.service';
import { Amenity } from 'app/models/amenity';
import { isUndefined } from 'util';
import { Router } from '@angular/router';

@Component({
  selector: 'app-amenities',
  templateUrl: './amenities.component.html',
  styleUrls: ['./amenities.component.css']
})
export class AmenitiesComponent  {
  public amenities: Amenity[];
  public alert: boolean;
  constructor(private ls: LeaseService, public router: Router) {
    this.ls.getAmenities().subscribe(
      next => {
        this.amenities = next;
      },
      error => {
        console.log(error);
      }
    );
   }

   public navigateBack() {
    this.router.navigate(['lease']);
   }


  public amentiesSubmit(amenitiesID: NgForm): boolean {
    const selected = new Array();
    if (amenitiesID && amenitiesID.valid) {
      let j = 0;
      // tslint:disable-next-line:forin
      for (const i in Object.keys(amenitiesID.value)) {
        if (amenitiesID.value[Object.keys(amenitiesID.value)[i]] && !isUndefined(amenitiesID.value[Object.keys(amenitiesID.value)[i]])) {
          selected.push(Object.keys(amenitiesID.value)[i]);
          j++;
        }
      }
      this.ls.setLeaseAmenities(selected);
      this.alert = false;
      this.router.navigate(['lease', 'userinfo']);
      return true;
    }
    this.alert = true;
    return false;
  }

}
