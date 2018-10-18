import { Component, OnInit, Input } from '@angular/core';
import { ChatMessage } from 'app/models/chat';
import { Observable } from 'rxjs';
import { ChatService, AuthXService } from 'app/services/service-export';

@Component({
  selector: 'chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.css']
})
export class ChatWindowComponent implements OnInit {

  private anonUser: boolean;
  private ipAddress: string;
  private _messages: Observable<ChatMessage[]>;

  constructor(private authXService: AuthXService, 
              private _chatService: ChatService) { }

  ngOnInit() {    
    this.anonUser = !(this.authXService.authenticated);
    this._chatService.getIpAddress().subscribe((ipAddress: any) => {
        this.ipAddress = ipAddress.ip;
        this._messages = this._chatService.getMessagesForChat(ipAddress.ip);
    });
  }

  sendMessage(messageText: string) {
    const sender = (this.anonUser) ? "anonymous" : "admin";
    const messageObj = {
      messageText: messageText,
      chatThreadID: this.ipAddress,
      sender: sender
    };
    this._chatService.sendMessage(messageObj)
      // .then(res => console.log(res))
      .catch(err => console.log(err));
  }

}
