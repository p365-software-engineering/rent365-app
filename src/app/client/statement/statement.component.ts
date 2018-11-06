import { Component, OnInit } from '@angular/core';
import { BillService, AuthXService } from 'app/services/service-export';
import { Observable } from 'rxjs';
import { Bill } from 'app/models/bill';
import { IUserData } from 'app/models/user-model';

@Component({
  selector: 'app-statement',
  templateUrl: './statement.component.html',
  styleUrls: ['./statement.component.css']
})
export class StatementComponent implements OnInit {

  private bill: Bill;

  constructor(private _billService: BillService,
              private authX: AuthXService) { }

  ngOnInit() {
    this.authX.getCurrentUser().subscribe((user: IUserData) => {
        this._billService.getBillByUserID(user.uid).subscribe(
            bill => {
              this.bill = bill;
            }
        );
      }
    )
  }

}
