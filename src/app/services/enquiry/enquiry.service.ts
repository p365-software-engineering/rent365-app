// jshint ignore: start
/* tslint:disable */
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Enquiry } from '../../models/enquiry';


@Injectable({
  providedIn: 'root'
})
export class EnquiryService {

  private enquiryCollection: AngularFirestoreCollection<Enquiry>;

  constructor(private afs: AngularFirestore) { 
    this.enquiryCollection = afs.collection<Enquiry>('enquiry');
  }

  createNewEnquiry(): Promise<void> {
      const enquiryID = this.afs.createId();
      const enquiryObj = <Enquiry> {
          enquiryID: enquiryID
      };
      return this.enquiryCollection
        .doc(enquiryID)
        .set(enquiryObj);
  }

  getAllEnquirys(): Observable<Enquiry[]> {
    return this.enquiryCollection
      .valueChanges();
  }

  getOneEnquiry(enquiryID: string): Observable<any> {
    return this.enquiryCollection
      .doc(enquiryID)
      .valueChanges();
  }

  updateEnquiry(enquiryObj: any): Promise<void> {
    const enquiryID = enquiryObj.enquiryID;
    return this.enquiryCollection
      .doc(enquiryID)
      .update(enquiryObj);
  }

  deleteEnquiry(enquiryID: string): Promise<void> {
    return this.enquiryCollection
      .doc(enquiryID)
      .delete();
  }
  
}