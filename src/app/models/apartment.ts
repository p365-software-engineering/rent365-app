export class Apartment {
    title: string;
    sub_title: string;
    description: string;
    type: string;
    image: string;
    baths: string;
    beds; string;

    clearData(): void {
        this.title = null;
        this.sub_title = null;
        this.description = null;
        this.type = null;
        this.image = null;
        this.baths = null;
        this.beds = null;
    }
}
