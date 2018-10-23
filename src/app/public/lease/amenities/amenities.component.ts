import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LeaseService } from 'app/services/lease/lease.service';
import { Amenity } from 'app/models/amenity';
import { isUndefined } from 'util';

@Component({
  selector: 'app-amenities',
  templateUrl: './amenities.component.html',
  styleUrls: ['./amenities.component.css']
})
export class AmenitiesComponent  {
  public amenities: Amenity[];
  public alert: boolean;
  constructor(private ls: LeaseService) {
    this.ls.getAmenities().subscribe(
      next => {
        this.amenities = next;
      },
      error => {
        console.log(error);
      }
    );
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
      return true;
    }
    this.alert = true;
    return false;
  }

}
