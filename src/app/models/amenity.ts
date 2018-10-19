export class Amenity {

    amenityID: string;
    amenityName: string;
    amenityDescription: string;

    constructor(obj?: any) {
        this.amenityID              = obj.amenityID;
        this.amenityName            = obj.amenityName;
        this.amenityDescription     = obj.amenityDescription;
    }

}
