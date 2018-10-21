import { Component, OnInit, Input } from '@angular/core';
import { ChatMessage, ChatThread } from 'app/models/chat';
import { Observable, BehaviorSubject } from 'rxjs';
import { ChatService, AuthXService } from 'app/services/service-export';
import { map } from 'rxjs/operators';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.css']
})
export class ChatWindowComponent implements OnInit {

  private anonUser: boolean;
  private ipAddress: string;
  private isAdminTyping: boolean;
  private isUserTyping: boolean;
  private activeThread: Observable<ChatThread>;
  private textValue = '';
  private accordionOpened: boolean;  
  // private _chatThreadIDs2: string[];
  // private _chatThreadIDs: Observable<string[]>;
  @Input() private _chatThreads = new BehaviorSubject<ChatThread[]>([]);
  @Input() private _messages: Observable<ChatMessage[]>;

  constructor(private authXService: AuthXService,
              private _chatService: ChatService) { }

  ngOnInit() {
    // this._chatThreadIDs = [];
    this.accordionOpened = false;
    this.anonUser = !(this.authXService.authenticated);
    // this._chatThreadIDs = this._chatService.getActiveChatThreads().pipe(
    //   map(chatThreads => {
    //     console.log(chatThreads);
    //     const _chatThreadIDS = chatThreads.map(chatThread => chatThread.chatThreadID);
    //     this._chatThreadIDs2 = chatThreads.map(chatThread => chatThread.chatThreadID);
    //     return _chatThreadIDS;
    //   }));
  }

  sendMessage(messageText: string) {
    console.log(this.activeThread);
    const sender = (this.anonUser) ? 'anonymous' : 'admin';
    const messageObj = {
      messageText: messageText,
      chatThreadID: this.ipAddress,
      sender: sender
    };
    this._chatService.sendMessage(messageObj)
    // TODO: SEND UPDATE TO SAY NO LONGER TYPING FOR WHICH USER???
      .then(() => this.switchTyping())
      .catch(err => console.log(err));
  }

  switchTyping = () => {
    if (this.anonUser) {
      this.isUserTyping = !this.isUserTyping;
    } else {
      this.isAdminTyping = !this.isAdminTyping;
    }
  }

  // listenForText = () => {
  // }

  toggleAccordion = () => {
    this.accordionOpened = !this.accordionOpened;
  }
}
