import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { EventService } from 'app/services/service-export';
import { Event } from 'app/models/event';

@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.css']
})
export class CommunityComponent implements OnInit {

  private _events: Observable<Event[]>;
  constructor(private _eventService: EventService) { }

  ngOnInit() {
    this._events = this._eventService.getAllEvents();
  }

  public createNewEvent() {
    return this._eventService.createNewEvent({
      date: Date.now(),
      eventTitle: "second event",
      eventDescription: "second event desc",
      pictureURL: "https://lh3.googleusercontent.com/FyZA5SbKPJA7Y3XCeb9-uGwow8pugxj77Z1xvs8vFS6EI3FABZDCDtA9ScqzHKjhU8av_Ck95ET-P_rPJCbC2v_OswCN8A=s688"
    });
  }

}
