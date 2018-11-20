import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ChatMessage, ChatThread } from 'app/models/chat';
import { ChatService } from 'app/services/chat/chat.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  /** Chat Data */
  private _messages: Observable<ChatMessage[]>;
  private _chatThreads: Observable<ChatThread[]>;
  private _chatThreadIDs: string[];
  private isUserTyping: boolean;
  private activeThread: Observable<ChatThread>;

  /** Dashboard Box Statiscis */
  private numOfTenants: number;

  constructor(private _chatService: ChatService) {
  }
  
  ngOnInit() {
    this._chatThreads = this._chatService.getActiveChatThreads();
    // TODO: this is meant to be used to pipe and fill over the dropdown
    // that doesnt work in Daemonite
    // this._chatThreadIDs = [];
    // .pipe(
    //   map(chatThreads => {
    //     return chatThreads;
    //   })
    // );
    this.numOfTenants = 7; // TODO:

  }




}
