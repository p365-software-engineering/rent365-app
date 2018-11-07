import { Component, OnInit } from '@angular/core';
import { BillService, AuthXService, EventService } from 'app/services/service-export';
import { IUserData } from 'app/models/user-model';
import { Observable } from 'rxjs';
import { Bill } from 'app/models/bill';
import { PaymentOrchestratorService } from 'app/services/payment-orchestrator/payment-orchestrator.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  // !# TODO: Delete SAV6VEIM2477EYBVOM2SXY3JG6JFKL734KKQRICCAQVMV57PC2KUMYH7 --> Testing only
  public bill: Bill;
  private user: IUserData;

  constructor(private _billService: BillService,
              private authX: AuthXService,
              private _pmtOrchService: PaymentOrchestratorService) { }

    ngOnInit() {
      this.authX.getCurrentUser().subscribe((user: IUserData) => {
        this.user = user;
        this._billService.getBillByUserID(user.uid)
          .subscribe(bill => this.bill = bill);
      });
    }

    makePayment(_secretKey: string) {
      if (!this.bill ) { return alert('You have no balance due at the moment'); }
      if (!_secretKey) { return alert('Uh oh, looks like you didnt enter a secret key'); }
      const pmtObj = {
        userID: this.user.uid,
        apartmentID: this.bill.apartmentID,
        amount: this.bill.amount,
        datePaid: Date.now()
      };
      this._pmtOrchService.excutePayment(_secretKey, pmtObj)
        .then(() => this._billService.moveBillToUserStatements(this.user.uid, pmtObj))
        .then(() => {
          alert('Payment Success');
          this.paymentSuccess();
          return;
        })
        .catch(err => alert(err));
    }

    private paymentSuccess() {
      this.bill = null;
    }

}
