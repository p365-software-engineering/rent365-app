import { Component, OnInit } from '@angular/core';
import { StellarService, ChatService } from '../services/service-export';
import { environment } from '../../environments/environment.prod';
import { Observable } from 'rxjs';
import { ChatMessage, ChatThread } from 'app/models/chat';

@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.css']
})
export class PublicComponent implements OnInit {

  private _adminPubKey: string;
  private _messages: Observable<ChatMessage[]>
  private ipAddress: string;
  private isAdminTyping: boolean;
  private activeThread: Observable<ChatThread>;

  constructor(private stellarService: StellarService,
              private _chatService: ChatService) {}

  ngOnInit() {
    this._adminPubKey = environment.ADMIN_PUBLIC_KEY;
    this.stellarService.cacheKeys('SAV6VEIM2477EYBVOM2SXY3JG6JFKL734KKQRICCAQVMV57PC2KUMYH7');
    // this.stellarService.loadBalances('GBT7DUXFTBW6CLYHB4UKLLIX3IENABCXLXAZASJF4I6J73NAV4TR4ZTQ')
    //   .then(res => console.log(res));
    // this.stellarService.loadBalances('GCAT3TTEHLU7VSM42AYV34FGNUFI4XEGSZNVHLFLHSUV4RG2GCML7SLE')
    //   .then(res => console.log(res));

    this._chatService.getIpAddress().subscribe((ipAddress: any) => {
      this.ipAddress = ipAddress.ip;
      console.log(ipAddress.ip);
      this._messages = this._chatService.getMessagesForChat(ipAddress.ip);
      this._chatService.getChatThread(ipAddress.ip)
        .subscribe(activeThread => {
          if (activeThread) {
            this.activeThread = activeThread;
            this.isAdminTyping = activeThread.adminTyping;
            // this.isUserTyping = activeThread.userTyping;
          }
        });
      });
  }

  sendPayment() {
    const secretKey =  localStorage.getItem('seed_key');
    if (!secretKey) { return; }
    if (this.stellarService.validateSecretKey(secretKey)) {
      this.stellarService.sendPayment('30', 'My first rent')
        .then(res => alert('Payment Success'))
        .catch(err => alert('Error: \n ' + err));
    }
  }
}
