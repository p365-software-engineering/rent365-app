import { Component, OnInit } from '@angular/core';
import { ChatService } from 'app/services/service-export';

@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.css']
})
export class PublicComponent implements OnInit {

  // TODO: remove chat ... ?
  constructor(private _chatService: ChatService) {}

  ngOnInit() {    

  }

}
