export class ServiceTicket {

    serviceTicketID: string;
    userID: string;
    apartmentID: string;
    ticketDescription: string;
    dateCreated: number;
    dateResolved: number | null;
    ticketStatus: ServiceTicketStatus;

    constructor(obj?: any) {
        this.serviceTicketID    = obj.serviceTicketID;
        this.userID             = obj.userID;
        this.apartmentID        = obj.apartmentID;
        this.ticketDescription  = obj.ticketDescription;
        this.dateCreated        = obj.dateCreated;
        this.dateResolved       = obj.dateResolved;
        this.ticketStatus       = obj.ticketStatus;
    }
}

export enum ServiceTicketStatus {
    COMPLETED = 'Completed',
    PROGRESS = 'Progress'
}
