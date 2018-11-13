import { Component, OnInit } from '@angular/core';
import { ReviewService, AuthXService } from 'app/services/service-export';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-review',
  templateUrl: './add-review.component.html',
  styleUrls: ['./add-review.component.css']
})
export class AddReviewComponent implements OnInit {

  add_review_form: FormGroup;
  userID: string;
  constructor(private _reviewService: ReviewService,
              private router: Router,
              private fb: FormBuilder,
              private _authXservice: AuthXService) { }

  ngOnInit() {
    this.userID = this._authXservice._currentUser.uid;
    this.add_review_form = this.fb.group({
      ranking: ['', [ Validators.required]],
      reviewText: ['', [Validators.required]]
    });
  }

  createNewReview() {
    return this._reviewService.createNewReview({
      ranking: this.add_review_form.get('ranking').value,
      reviewText: this.add_review_form.get('reviewText').value,
      userID: this.userID,
    }).then(() => this.router.navigate(['public/reviews']));
  }
}

