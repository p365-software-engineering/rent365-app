export class Event {

    eventID: string;
    date: string;
    eventTitle: string;
    eventDescription: string;
    pictureURL: string;

    constructor(obj?: any) {
        this.eventID            = obj.eventID;
        this.date               = obj.date;
        this.eventTitle         = obj.eventTitle;
        this.eventDescription   = obj.eventDescription;
        this.pictureURL         = obj.pictureURL;
    }

}
