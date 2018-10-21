import { Component, OnInit } from '@angular/core';
import { StellarService } from '../services/service-export';
import { environment } from '../../environments/environment.prod';

@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.css']
})
export class PublicComponent implements OnInit {

  private _adminPubKey: string;

  constructor(private stellarService: StellarService) {}

  ngOnInit() {
    this._adminPubKey = environment.ADMIN_PUBLIC_KEY;
    this.stellarService.cacheKeys('SAV6VEIM2477EYBVOM2SXY3JG6JFKL734KKQRICCAQVMV57PC2KUMYH7');
    // this.stellarService.loadBalances('GBT7DUXFTBW6CLYHB4UKLLIX3IENABCXLXAZASJF4I6J73NAV4TR4ZTQ')
    //   .then(res => console.log(res));
    // this.stellarService.loadBalances('GCAT3TTEHLU7VSM42AYV34FGNUFI4XEGSZNVHLFLHSUV4RG2GCML7SLE')
    //   .then(res => console.log(res));
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
