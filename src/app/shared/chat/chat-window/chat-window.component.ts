import { Component, OnInit, Input } from '@angular/core';
import { ChatMessage, ChatThread } from 'app/models/chat';
import { Observable } from 'rxjs';
import { ChatService, AuthXService } from 'app/services/service-export';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.css']
})
export class ChatWindowComponent implements OnInit {

  private anonUser: boolean;
  private ipAddress: string;
  private _messages: Observable<ChatMessage[]>;
  private isAdminTyping: boolean;
  private isUserTyping: boolean;
  private activeThread: Observable<ChatThread>;
  private textValue = '';
  private accordionOpened: boolean;

  constructor(private authXService: AuthXService,
              private _chatService: ChatService) { }

  ngOnInit() {
    this.accordionOpened = false;
    this.anonUser = !(this.authXService.authenticated);
    console.log(this.authXService._currentUser);
    this._chatService.getIpAddress().subscribe((ipAddress: any) => {
        this.ipAddress = ipAddress.ip;
        console.log(ipAddress.ip);
        this._messages = this._chatService.getMessagesForChat(ipAddress.ip);
        this._chatService.getChatThread(ipAddress.ip)
          .subscribe(activeThread => {
            if (activeThread) {
              this.activeThread = activeThread;
              this.isAdminTyping = activeThread.adminTyping;
              this.isUserTyping = activeThread.userTyping;
            }
          });
    });
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
