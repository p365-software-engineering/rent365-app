import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Review } from '../../models/review';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  private reviewCollection: AngularFirestoreCollection<Review>;

  constructor(private afs: AngularFirestore) { 
    this.reviewCollection = afs.collection<Review>('review');
  }

  createNewReview(): Promise<void> {
      const reviewID = this.afs.createId();
      const reviewObj = <Review> {
          reviewID: reviewID
      };
      return this.reviewCollection
        .doc(reviewID)
        .set(reviewObj);
  }

  getAllReviews(): Observable<Review[]> {
    return this.reviewCollection
      .valueChanges();
  }

  getOneReview(reviewID: string): Observable<any> {
    return this.reviewCollection
      .doc(reviewID)
      .valueChanges();
  }

  updateReview(reviewObj: any): Promise<void> {
    const reviewID = reviewObj.reviewID;
    return this.reviewCollection
      .doc(reviewID)
      .update(reviewObj);
  }

  deleteReview(reviewID: string): Promise<void> {
    return this.reviewCollection
      .doc(reviewID)
      .delete();
  }
  
}