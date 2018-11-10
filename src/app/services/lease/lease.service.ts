import { Injectable } from '@angular/core';
import { Apartment } from 'app/models/apartment';
import { Amenity } from 'app/models/amenity';
import { LeaseRequest, LeaseUserData } from 'app/models/lease-request';
import { AngularFirestore, CollectionReference, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { LeaseWorkflowService } from '../lease-workflow/lease-workflow.service';

@Injectable({
  providedIn: 'root'
})
export class LeaseService {

  // Amenities Data
  private amenitiesData: Observable<Amenity[]>;
  public apartmentsCollection: AngularFirestoreCollection<Apartment>;
  public amenitiesCollection: AngularFirestoreCollection<Amenity>;
  // New Lease
  private leaseInfo: LeaseRequest = new LeaseRequest();

  constructor(private db: AngularFirestore, private wf: LeaseWorkflowService) {
    this.apartmentsCollection = this.db.collection<Apartment>('Apartments');
    this.amenitiesCollection = this.db.collection<Amenity>('Amenities');
  }
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
    return this.apartmentsCollection.valueChanges();
  }

  public getApartmentbyID(aptID: string): Observable<any> {
    return this.apartmentsCollection.doc(aptID).valueChanges();
  }

  public getAmenities(): Observable<Amenity[]> {
    return this.amenitiesCollection.valueChanges();
  }

  public getAmenitybyID(amntID: string): Observable<any> {
    return this.amenitiesCollection.doc(amntID).valueChanges();
  }

  public setUserDetails(userInfo: LeaseUserData) {
    this.leaseInfo.setLeaseData(userInfo);
    console.log(JSON.stringify(this.leaseInfo));
  }

  public addApartment(apt: Apartment) {
    return this.apartmentsCollection
                .doc(apt.aptID)
                .set(apt);
  }

  public updateApartment(apt: Apartment) {
    return this.apartmentsCollection
                .doc(apt.aptID)
                .update(apt);
  }

  public deleteApartment(apt: Apartment) {
    return this.apartmentsCollection
                .doc(apt.aptID)
                .delete();
  }

  public addAmenity(amt: Amenity) {
    return this.amenitiesCollection
                .doc(amt.amntID)
                .set(amt);
  }

  public updateAmenity(amt: Amenity) {
    return this.amenitiesCollection
                .doc(amt.amntID)
                .update(amt);
  }

  public deleteAmenity(amt: Amenity) {
    return this.amenitiesCollection
                .doc(amt.amntID)
                .delete();
  }
}
