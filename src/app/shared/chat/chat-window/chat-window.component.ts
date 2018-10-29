import { Component, OnInit, Input } from '@angular/core';
import { ChatMessage, ChatThread } from 'app/models/chat';
import { Observable, Subject } from 'rxjs';
import { ChatService, AuthXService } from 'app/services/service-export';
import { map } from 'rxjs/operators';

@Component({
  selector: 'chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.css']
})
export class ChatWindowComponent implements OnInit {

  private anonUser: boolean;
  private accordionOpened: boolean;
  private _chatThreads: Observable<ChatThread[]>;
  private _activeThread = new Subject<ChatThread>();
  private _messages = new Subject<ChatMessage[]>();
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
