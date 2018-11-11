import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { ReviewService } from 'app/services/service-export';
import { Review } from 'app/models/review';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {

  @Input() apartmentID: string;
  public _reviews: Observable<Review[]>;

  constructor(private _reviewService: ReviewService) { }

  ngOnInit() {
    this._reviews = this._reviewService.getAllReviewsByAptID(this.apartmentID);
  }

}
