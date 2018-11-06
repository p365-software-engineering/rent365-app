import { Component, OnInit } from '@angular/core';
import { BillService, AuthXService } from 'app/services/service-export';
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

  private bill: Bill;
  private user: IUserData;


  constructor(private _billService: BillService,
              private authX: AuthXService,
              private _pmtOrchService: PaymentOrchestratorService) { }

    ngOnInit() {
      this.authX.getCurrentUser().subscribe((user: IUserData) => {
        this.user = user;
        this._billService.getBillByUserID(user.uid).subscribe(
          bill => {
            console.log(bill);
            this.bill = bill;
          }
        );
      })
    }

    makePayment(_secretKey: string) {
      const pmtObj = {
        userID: this.user.uid,
        apartmentID: this.bill.apartmentID,
        amount: this.bill.amount,
        datePaid: Date.now()
      };
      console.log(_secretKey);
      this._pmtOrchService.excutePayment(_secretKey, pmtObj)
        .then(() => this._billService.moveBillToUserStatements(this.user.uid, pmtObj))
        .then(() => {
          alert('Payment Success');
          this.paymentSuccess();
          return;
        })
    }

    private paymentSuccess() {
      this.bill = null;
    }

}
