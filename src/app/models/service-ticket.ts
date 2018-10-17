export class ServiceTicket {

    ticketID: string;
    userID: string;
    apartmentID: string;
    ticketDescription: string;
    dateCreated: number;
    dateResolved: number | null
    ticketStatus: ServiceTicketStatus;
    
    constructor(obj?: any) {
        this.ticketID           = obj.ticketID;
        this.userID             = obj.userID;
        this.apartmentID        = obj.apartmentID;
        this.ticketDescription  = obj.ticketDescription;
        this.ticketID           = obj.ticketID;
        this.dateCreated        = obj.dateCreated;
        this.dateResolved       = obj.dateResolved;
        this.ticketStatus       = obj.ticketStatus;
    }
}

export enum ServiceTicketStatus {
    COMPLETED = "Completed",
    PROGRESS = "Progress",
}