import { Component, OnInit, Input } from '@angular/core';
import { ChatMessage, ChatThread } from 'app/models/chat';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
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
  // private isAdminTyping: boolean;
  // private isUserTyping: boolean;
  // private _activeThread: Observable<ChatThread>;
  // private textValue = '';
  private accordionOpened: boolean;
  private _chatThreads: Observable<ChatThread[]>;
  // private _messages: Observable<ChatMessage[]>;
  private _activeThreadID = new Subject<string>();
  @Input() private ipAddress: string;

  constructor(private authXService: AuthXService,
              private _chatService: ChatService) { }

  ngOnInit() {
    this.accordionOpened = false;
    this.anonUser = !(this.authXService.authenticated);
    // TODO: if (ipAddress)
    if (this.ipAddress) {
      this._chatService.getChatThread(this.ipAddress)
        .subscribe(activeThread => {
            this.setActiveThread(activeThread);
        });
    } else {
      this._chatThreads = this._chatService.getActiveChatThreads()
        .pipe(
          map(chatThreads => {
            console.log(chatThreads);
            return chatThreads;
          })
        )
    }
  }

  sendMessage(messageText: string) {
    // console.log(this._activeThread);
    const sender = (this.anonUser) ? 'anonymous' : 'admin';
    const messageObj = {
      messageText: messageText,
      chatThreadID: this.ipAddress,
      sender: sender
    };
    this._chatService.sendMessage(messageObj)
      // TODO: SEND UPDATE TO SAY NO LONGER TYPING FOR WHICH USER???
      // .then(() => this.switchTyping())
      .catch(err => console.log(err));
  }

  // switchTyping = () => {
  //   if (this.anonUser) {
  //     this.isUserTyping = !this.isUserTyping;
  //   } else {
  //     this.isAdminTyping = !this.isAdminTyping;
  //   }
  // }

  // listenForText = () => {
  // }

  setActiveThread(activeThreadID) {
    // this.ipAddress = activeThreadID;
    this._activeThreadID.next(activeThreadID);
    // this._chatService.getChatThread(activeThreadID)
    //   .subscribe(activeThread => {
    //     if (activeThread) {
    //       this._activeThread = activeThread;
    //       this.isUserTyping = activeThread.userTyping;
    //     }
    //   });
    // this._messages = this._chatService.getMessagesForChat(activeThreadID);
    // console.log(activeThreadID);
  }

  toggleAccordion = () => {
    this.accordionOpened = !this.accordionOpened;
  }
}
