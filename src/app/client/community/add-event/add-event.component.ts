import { Component, OnInit } from '@angular/core';
import { EventService } from 'app/services/service-export';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {

  add_event_form: FormGroup;
  constructor(private _eventService: EventService,
              private router: Router,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.add_event_form = this.fb.group({
      eventTitle: ['', [ Validators.required]],
      date: ['', [ Validators.required]],
      eventDescription: ['', [Validators.required]],
      pictureURL: ['']
    });
  }

  createNewEvent() {
    return this._eventService.createNewEvent({
      date: Date.now(),
      eventTitle: this.add_event_form.get('eventTitle').value,
      eventDescription: this.add_event_form.get('eventDescription').value,
      pictureURL: this.add_event_form.get('pictureURL').value
    }).then(() => this.router.navigate(['client/community']));
  }

}
