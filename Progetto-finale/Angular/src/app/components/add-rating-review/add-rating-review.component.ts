import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { debounceTime, Subject } from 'rxjs';
import { AuthService } from '../../@core/services/auth.service';
import { RatingService } from '../../@core/services/rating.service';
import { ReviewService } from '../../@core/services/review.service';
import { Movie } from '../../models/movie';
import { Rating } from '../../models/rating';
import { User } from '../../models/user';

@Component({
  selector: 'tnv-add-rating-review',
  templateUrl: './add-rating-review.component.html',
  styleUrls: ['./add-rating-review.component.scss']
})
export class AddRatingReviewComponent implements OnInit {

  @Input() movie: Partial<Movie> = {};
  @Input() rating: Partial<Rating> = {};
  private _success = new Subject<string>();

  currentUser: Partial<User> = {};
  currentRecensione = "";
  currentRate = 0;

  successMessage = '';

  @ViewChild('selfClosingAlert', { static: false }) selfClosingAlert: NgbAlert | undefined;


  constructor(private authService: AuthService, private reviewService: ReviewService, private ratingService: RatingService) { }

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();

    this._success.subscribe(message => this.successMessage = message);
    this._success.pipe(debounceTime(5000)).subscribe(() => {
      if (this.selfClosingAlert) {
        this.selfClosingAlert.close();
      }
    });
  }

  public changeSuccessMessage() { this._success.next('Recensione e voto inseriti correttamente'); }

  onSubmit(form: NgForm) {
      form.value['recensione'] = this.currentRecensione;
      this.reviewService.addReview({ userId: this.currentUser.id, movieId: this.movie.id, recensione: this.currentRecensione }).subscribe({
        next: (res) => {
          console.log(res)
        },
      });

      form.value['rating'] = this.currentRate;
      this.ratingService.createRating({ userId: this.currentUser.id, movieId: this.movie.id, rating: this.currentRate }).subscribe({
        next: (res) => {
          console.log(res);
        },
      });
    }
  }
