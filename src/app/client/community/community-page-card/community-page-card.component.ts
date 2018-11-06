import { Component, OnInit, Input } from '@angular/core';
import { Event } from 'app/models/event';

@Component({
  selector: 'app-community-page-card',
  templateUrl: './community-page-card.component.html',
  styleUrls: ['./community-page-card.component.css']
})
export class CommunityPageCardComponent implements OnInit {

  @Input() public event: Event;
  constructor() { }

  ngOnInit() {
  }

}
