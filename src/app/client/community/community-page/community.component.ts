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
  
}
