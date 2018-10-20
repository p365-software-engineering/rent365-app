import { Injectable } from '@angular/core';
import { Apartment } from 'app/models/apartment';
import { Amenity } from 'app/models/amenity';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LeaseService {
  // Apartment Data
  private apartmentsData: Observable<any[]>;
  // Amenities Data
  private amenitiesData: Observable<any[]>;

  constructor(private db: AngularFirestore) {
    this.apartmentsData = db.collection('Apartments').valueChanges();
    this.amenitiesData = db.collection('Amenities').valueChanges();
  }

  public getApartments(): Observable<any[]> {
    return this.apartmentsData;
  }

  public getApartmentbyID(aptID: string): Observable<any> {
    return this.db.collection('Apartments/' + aptID).valueChanges();
  }

  public getAmenities(): Observable<any[]> {
    return this.amenitiesData;
  }

  public getAmenitybyID(amntID: string): Observable<any> {
    return this.db.collection('Amenities/' + amntID).valueChanges();
  }
}
