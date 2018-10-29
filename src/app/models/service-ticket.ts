export class ServiceTicket {

    serviceTicketID: string;
    userID: string;
    apartmentID: string;
    subject: string;
    ticketDescription: string;
    permission: string;
    pets: string;
    security: string;
    dateCreated: number;
    dateResolved: number | null;
    ticketStatus: ServiceTicketStatus;

    constructor(obj?: any) {
        this.serviceTicketID    = obj.serviceTicketID || '';
        this.userID             = obj.userID;
        this.apartmentID        = obj.apartmentID;
        this.subject            = obj.subject;
        this.ticketDescription  = obj.ticketDescription;
        this.permission         = obj.permission;
        this.pets               = obj.pets;
        this.security           = obj.security;
        this.dateCreated        = obj.dateCreated;
        this.dateResolved       = obj.dateResolved || '';
        this.ticketStatus       = obj.ticketStatus || ServiceTicketStatus.PROGRESS;
    }
}

export enum ServiceTicketStatus {
    COMPLETED = 'Completed',
    PROGRESS = 'Progress'
}
