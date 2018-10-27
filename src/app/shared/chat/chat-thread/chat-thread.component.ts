import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { ChatMessage, ChatThread } from 'app/models/chat';
import { ChatService } from 'app/services/service-export';

@Component({
  selector: 'chat-thread',
  templateUrl: './chat-thread.component.html',
  styleUrls: ['./chat-thread.component.css']
})
export class ChatThreadComponent implements OnInit {

  @Input() private activeThreadID: Observable<string>;
  private activeThread: Observable<ChatThread>;
  private _messages: Observable<ChatMessage[]>;

  constructor(private _chatService: ChatService) { }

  ngOnInit() {
    this.activeThreadID.subscribe(activeThreadID => {
      console.log(activeThreadID);
      this._messages = this._chatService.getMessagesForChat(activeThreadID);
      this.activeThread = this._chatService.getChatThread(activeThreadID);
    })
  }

}
