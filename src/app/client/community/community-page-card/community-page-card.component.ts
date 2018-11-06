import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'community-page-card',
  templateUrl: './community-page-card.component.html',
  styleUrls: ['./community-page-card.component.css']
})
export class CommunityPageCardComponent implements OnInit {

  @Input() event: Event;
  constructor() { }

  ngOnInit() {
  }

}
