import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbAlert, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { debounceTime, Subject } from 'rxjs';
import { AuthService } from 'src/app/@core/services/auth.service';
import { MovieService } from 'src/app/@core/services/movie.service';
import { Movie } from 'src/app/models/movie';
import { User } from 'src/app/models/user';

@Component({
  selector: 'tnv-end-game-item',
  templateUrl: './end-game-item.component.html',
  styleUrls: ['./end-game-item.component.scss'],
  providers: [NgbModalConfig, NgbModal]
})
export class EndGameItemComponent implements OnInit {

  @Input() movie: Partial<Movie> = {};
  currentUser: Partial<User> = {};
  private _success = new Subject<string>();

  imageBaseUrl: string = "https://image.tmdb.org/t/p/w440_and_h660_face"
  successMessage = '';

  @ViewChild('selfClosingAlert', { static: false }) selfClosingAlert: NgbAlert | undefined;

  constructor(private movieService: MovieService, private authService: AuthService, config: NgbModalConfig, private modalService: NgbModal) {
    config.backdrop = 'static';
    config.keyboard = false;
  }
  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();

    this._success.subscribe(message => this.successMessage = message);
    this._success.pipe(debounceTime(5000)).subscribe(() => {
      if (this.selfClosingAlert) {
        this.selfClosingAlert.close();
      }
    });
  }
  
  public changeSuccessMessage() { this._success.next('Film aggiunto ai preferiti'); }

  onSubmit(form: NgForm) {
      this.movieService.createFavorite({userId: this.currentUser.id, movieId: this.movie.id}).subscribe({
        next: (res) => {
        console.log(res);
      },
    });
  }

  open(content: any) {
    this.modalService.open(content);
  }
}
