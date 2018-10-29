import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { ChatMessage, ChatThread } from 'app/models/chat';
import { Observable, Subject } from 'rxjs';
import { ChatService, AuthXService } from 'app/services/service-export';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.css']
})
export class ChatWindowComponent implements OnInit {

  public anonUser: boolean;
  public accordionOpened: boolean;
  public _chatThreads: Observable<ChatThread[]>;
  public _activeThread = new Subject<ChatThread>();
  public _messages = new Subject<ChatMessage[]>();
  @Input() public ipAddress: string;

  constructor(private authXService: AuthXService,
              private _chatService: ChatService) { }

  ngOnInit() {
    this.accordionOpened = false;
    this.anonUser = !(this.authXService.authenticated);
    if( !this.anonUser ) {
        this._chatThreads = this._chatService.getActiveChatThreads()
          .pipe(
            map(chatThreads => {
              console.log(chatThreads);
              return chatThreads;
            })
          );
      }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['ipAddress'] && this.ipAddress !== undefined) {
      console.log("changes['ipAddress']" + this.ipAddress);
      this.setActiveThread(this.ipAddress);
    }
}

  // sendMessage(messageText: string) {
  //   const sender = (this.anonUser) ? 'anonymous' : 'admin';
  //   const messageObj = {
  //     messageText: messageText,
  //     chatThreadID: this.ipAddress,
  //     sender: sender
  //   };
  //   this._chatService.sendMessage(messageObj)
  //     // TODO: SEND UPDATE TO SAY NO LONGER TYPING FOR WHICH USER???
  //     // .then(() => this.switchTyping())
  //     .catch(err => console.log(err));
  // }

  switchTyping(chatThreadData: any) {
    console.log('from rentz');
    const { chatThreadID, typing } = chatThreadData;
    if (this.anonUser) {
      this._chatService.updateChatThread(chatThreadID, {
        userTyping: typing
      });
    } else {
      this._chatService.updateChatThread(chatThreadID, {
        adminTyping: typing
      });
    }
  }

  setActiveThread(activeThreadID) {
    this._chatService.getChatThread(activeThreadID)
      .subscribe(activeThread => this._activeThread.next(activeThread));
    this._chatService.getMessagesForChat(activeThreadID)
      .subscribe(chatMessages => this._messages.next(chatMessages));
  }

  toggleAccordion = () => {
    this.accordionOpened = !this.accordionOpened;
  }
}
