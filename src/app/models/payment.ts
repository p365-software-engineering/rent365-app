export class Payment {

    paymentID: string;
    userID: string;
    apartmentID: string;
    amount: number;
    dateDue: number;
    datePaid: number | null;

    constructor(obj?: any) {
        this.paymentID      = obj.paymentID;
        this.userID         = obj.userID;
        this.apartmentID    = obj.apartmentID;
        this.amount         = obj.amount;
        this.dateDue        = obj.dateDue;
    }
    
}
