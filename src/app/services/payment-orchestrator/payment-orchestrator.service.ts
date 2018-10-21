import { Injectable } from '@angular/core';
import { StellarService } from '../stellar/stellar.service';
import { PaymentService } from '../payment/payment.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentOrchestratorService {

  constructor(private _stellarService: StellarService,
              private _paymentService: PaymentService) { }

  excutePayment(secretKey: string, paymentObj: any): Promise<string> {
    const { amount } = paymentObj;
    const _secretKey = secretKey || sessionStorage.getItem('seed_key');
    if (!_secretKey) return Promise.reject('Please enter secret key');
    const pubKey = sessionStorage.getItem('public_key');
    console.log(pubKey);
    if (!pubKey || pubKey !== this._stellarService.getPublicKey(_secretKey)) return Promise.reject('Your public key doesn\'t match your secret key');
    return this._stellarService.validateNewBalance(pubKey, amount)
      .then((validBalance: boolean) => {
        if (validBalance) {
          const createPmtPromise = this._paymentService.createNewPayment(paymentObj);
          const sendStellarPmt = this._stellarService.sendPayment(amount, 'TODO: memo')
          return Promise.all([
              createPmtPromise,
              sendStellarPmt
          ])
          .then(res => 'EUREUKA!!!!!');
        } else {
          Promise.reject('invalid balance');
        }
      });
  }

}
