import { Component, OnInit } from '@angular/core';
import { StellarService, ChatService } from '../services/service-export';
import { environment } from '../../environments/environment.prod';
import { Observable } from 'rxjs';
import { PaymentOrchestratorService } from 'app/services/payment-orchestrator/payment-orchestrator.service';
import { Payment } from 'app/models/model-export';
import * as $ from 'jquery';

@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.css']
})
export class PublicComponent implements OnInit {

  private _adminPubKey: string;
  public ipAddress: Observable<string>;

  constructor(private stellarService: StellarService,
              private _chatService: ChatService,
              private _pmtOrchestrator: PaymentOrchestratorService) {
              }

  ngOnInit() {
    this._chatService.getIpAddress().then(ipAddress => this.ipAddress = ipAddress.ip);
    this._adminPubKey = environment.ADMIN_PUBLIC_KEY;
    this.stellarService.cacheKeys('SAV6VEIM2477EYBVOM2SXY3JG6JFKL734KKQRICCAQVMV57PC2KUMYH7');
  }

  sendPayment() {
    const secretKey = sessionStorage.getItem('seed_key');
    if (!secretKey) { return alert('Please entere secret key somewhere'); }
    if (this.stellarService.validateSecretKey(secretKey)) {
      this.stellarService.sendPayment('30', 'My first rent')
        .then(res => alert('Payment Success'))
        .catch(err => alert('Error: \n ' + err));
    }
  }

  sendPayment2() {
    const secretKey =  localStorage.getItem('seed_key');
    const pmtObj = {
        paymentID: 1,
        userID: 2,
        apartmentID: 3,
        amount: '20',
        dateDue: 'date'
    };
    this._pmtOrchestrator.excutePayment(secretKey, pmtObj)
        .then(res => alert(res))
        .catch(err => alert('Error: \n ' + err));
    }

}
