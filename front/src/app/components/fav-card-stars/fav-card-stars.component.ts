import { Component, OnInit, Input } from '@angular/core';
import { MovieRootObject } from 'src/models/movie';
import { AuthService } from 'src/services/auth.service';
import { RatingService } from 'src/services/rating.service';
import { DataTransferService } from 'src/transfer-services/data-transfer.service';
import { NgForm } from '@angular/forms';
import { Rating } from 'src/models/rating';
@Component({
  selector: 'app-fav-card-stars',
  templateUrl: './fav-card-stars.component.html',
  styleUrls: ['./fav-card-stars.component.scss']
})
export class FavCardStarsComponent implements OnInit {
  @Input() movieElement: any;
  @Input() i: any;
  @Input() c!: Function;
  @Input() d!: Function;
  ordMovies: MovieRootObject[] = [];
  currentRate = 0;
  rateForDB!: Rating;

  constructor(
    private dataTransferService: DataTransferService,
    protected authServ: AuthService,
    private rateServ: RatingService) { }

  ngOnInit(): void {
    this.ordMovies = this.dataTransferService.getOrdMovies();
  }

  saveRating(f: NgForm) {
    if (f.valid) {
      this.rateForDB = {
        createdAt: new Date(),
        rate: f.form.value.rating,
        movieId: this.movieElement.id,
        userId: this.authServ.getCurrentUser().id,
      };

      this.rateServ.saveRate(this.rateForDB).subscribe();
    }
  }

}
