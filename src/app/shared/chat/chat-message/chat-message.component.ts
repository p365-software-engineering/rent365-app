import { Component, OnInit, Input } from '@angular/core';
import { ChatMessage } from 'app/models/chat';

@Component({
  selector: 'chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.css']
})
export class ChatMessageComponent implements OnInit {

  @Input() private message: ChatMessage;
  constructor() { }

  ngOnInit() {
  }

}
