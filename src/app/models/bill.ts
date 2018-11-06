export class Bill {

    billID: string;
    userID: string;
    apartmentID: string;
    amount: string;
    dateDue: number;
    datePaid: number | null;

    constructor(obj?: any) {
        this.billID         = obj.billID;
        this.userID         = obj.userID;
        this.apartmentID    = obj.apartmentID;
        this.amount         = obj.amount;
        this.dateDue        = obj.dateDue;
    }

}
