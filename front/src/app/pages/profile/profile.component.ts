// Import dei moduli Angular e dei servizi necessari
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';
import { MovieAPIService } from 'src/services/movie-api.service';
import { FavoriteService } from '../../../services/favorite-like.service';
import { AlertsService } from 'src/mockup/alerts.service';
import * as Messages from 'src/const-messages/messages';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  // Inizializzazione dei servizi tramite dependency injection
  constructor(
    protected authServ: AuthService,
    protected movieServ: MovieAPIService,
    protected favServ: FavoriteService,
    private router: Router,
    private alertServ: AlertsService
  ) {}

  // Metodo chiamato alla creazione del componente
  ngOnInit(): void {
    // Verifica se l'utente è autenticato, altrimenti reindirizza alla pagina di login
    if (!this.authServ.isAuthenticated()) {
      this.alertServ.showAutoDestroyAlert(
        Messages.ICO_INFO,
        Messages.LOG_MUST,
        Messages.LOG_WARNING_NO_ACC,
        4000
      ).then(() => {
        return this.router.navigateByUrl(Messages.ROT_SIGN);
      });
    }
    this.printStringIfNoFav()
    // Ottiene i film preferiti dell'utente corrente
    this.getAllFavouriteMovies(this.authServ.getCurrentUser().id);
  }

  // Mostra un messaggio se non ci sono film preferiti
  printStringIfNoFav() {
    if (this.movieServ.favourites.length <= 0) {
      return this.alertServ.showAutoDestroyAlert(
        Messages.ICO_WARNING,
        Messages.TIT_WARNING,
        Messages.FAV_NOTPRESENT,
        4200
      );
    } else {
      return this.alertServ.showAutoDestroyAlert(
        Messages.ICO_INFO,
        Messages.TIT_INFO,
        Messages.FAV_ISPRESENT,
        3200
      );
    }
  }

  // Ottiene tutti i film preferiti dell'utente dall'API
  getAllFavouriteMovies(id: number) {
    this.favServ.getAllFavoriteMovies(id).subscribe((data) => {
      // Assegna i film preferiti alla variabile nel servizio MovieAPI
      this.movieServ.favourites = data;
      // Per ogni film preferito, ottiene ulteriori dettagli tramite l'API dei film
      for (let i = 0; i < data.length; i++) {
        this.movieServ.getMovie(data[i].movieId).subscribe((res) => {
          // Aggiorna i dettagli dei film preferiti con i nuovi dati ottenuti dall'API
          this.movieServ.favourites[i] = {
            id: this.movieServ.favourites[i].id,
            comment: this.movieServ.favourites[i].comment,
            userId: this.movieServ.favourites[i].userId,
            movieId: this.movieServ.favourites[i].movieId,
            rating: this.movieServ.favourites[i].rating,
            title: res.title,
            posterPath: res.poster_path
          };
        });
      }
    });
  }

  // Elimina un film dalla lista dei preferiti
  deleteFavourite() {
    this.favServ.deleteFavorite(this.movieServ.singleFavourite.id).subscribe();
    // Ricarica la pagina dopo l'eliminazione del film preferito
    window.location.reload();
  }
}