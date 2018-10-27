import { Component, OnInit, Input, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ChatMessage, ChatThread } from 'app/models/chat';
import { ChatService } from 'app/services/service-export';
import { map, debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'chat-thread',
  templateUrl: './chat-thread.component.html',
  styleUrls: ['./chat-thread.component.css']
})
export class ChatThreadComponent implements OnInit {

  @ViewChild('messageBox') messageBox: ElementRef;

  @Input() private anonUser: boolean;
  @Input() private activeThread: Observable<ChatThread>;
  private activeThread2: Observable<ChatThread>;
  private _activeThread: ChatThread;
  private _messages: Observable<ChatMessage[]>;
  private messageText$ = new Subject<string>();
  @Output() eventEmitter = new EventEmitter();

  constructor(private _chatService: ChatService) {
    // TODO: JSUT CHECK IF TEXT IS ENTERED AND SUBMIT ONE TYPING REQUUEST
    const subscription = this.messageText$.pipe(
      map((event: string) => event),
      debounceTime(500),
      distinctUntilChanged(),
    ).subscribe(() => this.switchTyping());
   }

  ngOnInit() {
    this.activeThread.subscribe(activeThread => {
      this._activeThread = activeThread;
      // TODO: Order by date
      this._messages = this._chatService.getMessagesForChat(activeThread.chatThreadID);
    });
    // this.activeThread = this.activeThread;//.subscribe(activeThread => {
    //   this._activeThread = activeThread;
    //   // TODO: Order by date
    //   this._messages = this._chatService.getMessagesForChat(activeThread.chatThreadID);
    // });
  }

  sendMessage(message: string) {
    const chatThreadID = this._activeThread.chatThreadID;
    this._chatService.sendMessage({
      messageText: message,
      chatThreadID: chatThreadID,
      sender: (this.anonUser) ? chatThreadID : 'admin'
    });
    this.eventEmitter.emit({
      chatThreadID: chatThreadID,
      typing: false
    });
  }

   switchTyping = () => {
    this.eventEmitter.emit({
      chatThreadID: this._activeThread.chatThreadID,
      typing: true
    });
    console.log('i am typin');
  }


}
