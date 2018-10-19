export class Review {

    reviewID: string;
    userID: string;
    apartmentID: string;
    reviewText: string;
    ranking: number;

    constructor(obj?: any) {
        this.reviewID       = obj.reviewID;
        this.userID         = obj.userID;
        this.apartmentID    = obj.apartmentID;
        this.reviewText     = obj.reviewText;
        this.ranking        = obj.ranking;
    }

}
