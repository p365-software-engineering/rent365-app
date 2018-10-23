import { Injectable } from '@angular/core';
import { Apartment } from 'app/models/apartment';
import { Amenity } from 'app/models/amenity';
import { LeaseRequest } from 'app/models/lease-request';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import {  } from 'app/public/lease/lease.component';
import { LeaseWorkflowService } from '../lease-workflow/lease-workflow.service';

@Injectable({
  providedIn: 'root'
})
export class LeaseService {

  // Amenities Data
  private amenitiesData: Observable<Amenity[]>;
  // New Lease
  private leaseInfo: LeaseRequest = new LeaseRequest();

  constructor(private db: AngularFirestore, private wf: LeaseWorkflowService) {}
  // New Lease -[START]
  public setLeaseAptID(aptID: string): void {
      console.log(JSON.stringify(this.leaseInfo));
      this.leaseInfo.setApartmentID(aptID);
      this.wf.validate('apartment');
  }

  public setLeaseAmenities(amenities: string[]): void {
    this.leaseInfo.setAmenities(amenities);
    console.log(JSON.stringify(this.leaseInfo));
  }
  // New Lease -[END]

  // Data Retrieval - Firebase [START]
  public getApartments(): Observable<Apartment[]> {
    return this.db.collection<Apartment>('Apartments').valueChanges();
  }

  public getApartmentbyID(aptID: string): Observable<any> {
    return this.db.collection<Apartment>('Apartments').doc(aptID).valueChanges();
  }

  public getAmenities(): Observable<Amenity[]> {
    return this.db.collection<Amenity>('Amenities').valueChanges();
  }

  public getAmenitybyID(amntID: string): Observable<any> {
    return this.db.collection('Amenities').doc(amntID).valueChanges();
  }
  // Data Retrieval - Firebase [END]
}
