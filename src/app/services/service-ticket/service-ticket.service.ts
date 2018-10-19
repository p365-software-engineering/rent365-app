import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ServiceTicket } from '../../models/service-ticket';

@Injectable({
  providedIn: 'root'
})
export class ServiceTicketService {

  private serviceTicketCollection: AngularFirestoreCollection<ServiceTicket>;

  constructor(private afs: AngularFirestore) {
    this.serviceTicketCollection = afs.collection<ServiceTicket>('service-ticket');
  }

  createNewServiceTicket(): Promise<void> {
      const serviceTicketID = this.afs.createId();
      const serviceTicketObj = <ServiceTicket> {
          serviceTicketID: serviceTicketID
      };
      return this.serviceTicketCollection
        .doc(serviceTicketID)
        .set(serviceTicketObj);
  }

  getAllServiceTickets(): Observable<ServiceTicket[]> {
    return this.serviceTicketCollection
      .valueChanges();
  }

  getOneServiceTicket(serviceTicketID: string): Observable<any> {
    return this.serviceTicketCollection
      .doc(serviceTicketID)
      .valueChanges();
  }

  updateServiceTicket(serviceTicketObj: any): Promise<void> {
    const serviceTicketID = serviceTicketObj.serviceTicketID;
    return this.serviceTicketCollection
      .doc(serviceTicketID)
      .update(serviceTicketObj);
  }

  deleteServiceTicket(serviceTicketID: string): Promise<void> {
    return this.serviceTicketCollection
      .doc(serviceTicketID)
      .delete();
  }

}
