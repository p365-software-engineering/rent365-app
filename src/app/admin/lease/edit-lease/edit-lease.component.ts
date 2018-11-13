import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormArray, FormControl } from '@angular/forms';
import { AuthXService } from 'app/services/service-export';
import { LeaseService } from 'app/services/lease/lease.service';
import { Amenity } from 'app/models/amenity';
import { ActivatedRoute, Router } from '@angular/router';
import { LeaseRequest } from 'app/models/lease-request';
import { materialize } from 'rxjs/operators';

@Component({
  selector: 'app-edit-lease',
  templateUrl: './edit-lease.component.html',
  styleUrls: ['./edit-lease.component.css']
})
export class EditLeaseComponent implements OnInit {

  public apartmentForm: FormGroup;
  public amenitiesForm: FormGroup;
  public leaseDetailsForm: FormGroup;
  public amenities: Amenity[];
  public amenitiesArray: Object[];
  public leaseID: string;
  constructor(private fb: FormBuilder,
              private routeParams: ActivatedRoute,
              private route: Router,
              private authX: AuthXService,
              private ls: LeaseService) { }

  ngOnInit() {
    this.apartmentForm = this.fb.group({
      aptID: [{value: ''}, [Validators.required]]
    });

    this.amenitiesForm = this.fb.group({
      amntID: []
    });

    this.leaseDetailsForm = this.fb.group({
      uid: '' ,
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      leaseInfo: this.fb.group({
        startDate: ['', [Validators.required]],
        period: ['', Validators.required],
      }),
      otherLeasee: this.fb.array([])
    });

    this.ls.getAmenities().subscribe(
      next => {
        this.amenities = next;
        this.amenitiesArray = this.addAmenitiesControl().controls;
      },
      error => {
        console.warn(error);
      }
    );

    this.routeParams.params.subscribe(
      (params) => {
        if (params['id'] !== '0') {
          console.log(params['id']);
          this.leaseID = params['id'];
          this.updateLease();
        }
      });
  }

  private updateLease(): void {
    this.ls.getLeaseRequestById(this.leaseID).subscribe(
      (next: LeaseRequest) => {
        this.apartmentForm.patchValue({
          aptID: next['aptID'] || ''
        });

        this.updateAmenities(next['amenities']).then(
          (data) => {
            this.amenitiesForm.patchValue({
              amntID: this.fb.array(<FormControl[]>data)
            });
            this.amenitiesArray = (<FormArray>this.amenitiesForm.get('amntID').value).controls;
          }
        );

        console.log(next.leaseInfo['startDate']['seconds']);
        const date = new Date(0);
        date.setUTCSeconds(next.leaseInfo['startDate']['seconds']);
        this.leaseDetailsForm.patchValue({
          uid: next.leasee['uid'] ,
          firstName: next.leasee['firstName'],
          lastName: next.leasee['lastName'],
          email: next.leasee['email'],
          leaseInfo: {
            startDate: date.toISOString().substring(0, 10),
            period: next.leaseInfo['period'],
          },
          // otherLeasee: this.fb.array(next.leasee['otherLeasee'])
        });
      }
    );
  }

  public updateAmenities(amenitiesList: string[]) {
    const amenities = [];
    return new Promise(resolve => {
      this.ls.getAmenities().subscribe(
        (next) => {
          next.filter(
            (value) => {
              if (amenitiesList.indexOf(value['amntID']) < 0) {
                amenities.push(this.fb.control(false));
              } else {
                amenities.push(this.fb.control(true));
              }
            }
          );
          resolve(amenities);
        }
      );
    });
  }

  private addAmenitiesControl() {
    const amentiesArr = this.amenities.map(
      () => {
        return this.fb.control(false);
      });
     this.amenitiesForm.patchValue({
       'amntID': this.fb.array(amentiesArr)
     });

     return <FormArray>this.amenitiesForm.get('amntID').value;
  }

   onSubmit() {
   }
}
