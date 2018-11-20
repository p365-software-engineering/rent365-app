// jshint ignore: start
/* tslint:disable */
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Bill } from '../../models/bill';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class BillService {

  private billCollection: AngularFirestoreCollection<Bill>;

  constructor(private afs: AngularFirestore) { 
    this.billCollection = afs.collection<Bill>('bills');
  }

  private createNextBillID(): string {
    const billID = this.afs.createId();
    return billID;
  }

  private calculateNextBillDate(oldBillDateString) {
      const oldBillDate = new Date(oldBillDateString);
      const nextBillMonth = oldBillDate.getMonth() + 1;
      oldBillDate.setMonth(nextBillMonth);
      return new Date(oldBillDate);
  }

  createNewBill(data: any): Promise<void> {
      const billID = this.afs.createId();
      data.billID = billID;
      return this.billCollection
        .doc(billID)
        .set(data);
  }

  getBillRef(billID: string) {
    return this.billCollection
      .doc(billID)
      .ref;
  }

  createNextBill(nextBill: any) {
      const billID = this.createNextBillID();
      nextBill.billID = billID;
      const nextBillDate = this.calculateNextBillDate(nextBill.dateDue); 
      nextBill.dateDue = nextBillDate;
      return nextBill;
  }


  getAllBills(): Observable<Bill[]> {
    return this.billCollection
      .valueChanges();
  }

  getBillByUserID(userID: string): Observable<Bill> {
    return this.billCollection
      .doc<Bill>(userID)
      .valueChanges();
  }
  
  getOneBill(billID: string): Observable<any> {
    return this.billCollection
      .doc(billID)
      .valueChanges();
  }

  updateBill(billObj: any): Promise<void> {
    const billID = billObj.billID;
    return this.billCollection
      .doc(billID)
      .update(billObj);
  }

  deleteBill(billID: string): Promise<void> {
    return this.billCollection
      .doc(billID)
      .delete();
  }

  moveBillToUserStatements(userId: string, bill: any) {
    const batch = this.afs.firestore.batch();
    batch.delete(this.billCollection
      .doc(userId)
      .ref
    );
    const newID = this.afs.createId();
    bill.id = newID;
    batch.set(this.afs.collection('statements')
      .doc(userId)
      .collection('userStatements')
      .doc(newID)
      .ref, bill
    );
    return batch.commit();
  }

}