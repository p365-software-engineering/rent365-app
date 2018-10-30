// jshint ignore: start
/* tslint:disable */
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Event } from '../../models/event';


@Injectable({
  providedIn: 'root'
})
export class EventService {

  private eventCollection: AngularFirestoreCollection<Event>;

  constructor(private afs: AngularFirestore) { 
    this.eventCollection = afs.collection<Event>('event');
  }

  createNewEvent(): Promise<void> {
      const eventID = this.afs.createId();
      const eventObj = <Event> {
          eventID: eventID
      };
      return this.eventCollection
        .doc(eventID)
        .set(eventObj);
  }

  getAllEvents(): Observable<Event[]> {
    return this.eventCollection
      .valueChanges();
  }

  getOneEvent(eventID: string): Observable<any> {
    return this.eventCollection
      .doc(eventID)
      .valueChanges();
  }

  updateEvent(eventObj: any): Promise<void> {
    const eventID = eventObj.eventID;
    return this.eventCollection
      .doc(eventID)
      .update(eventObj);
  }

  deleteEvent(eventID: string): Promise<void> {
    return this.eventCollection
      .doc(eventID)
      .delete();
  }
  
}