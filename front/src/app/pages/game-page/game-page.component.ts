import { UserFull } from '../../../models/user';
import { AuthService } from 'src/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { MovieRootObject } from 'src/models/movie';
import { MovieAPIService } from 'src/services/movie-api.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Router } from '@angular/router';
import { ScoreService } from 'src/services/score.service';
import { ScoreDTO } from 'src/models/score';
import { AlertsService } from 'src/mockup/alerts.service';
import * as Messages from 'src/const-messages/messages'


@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.scss'],
})
export class GamePageComponent implements OnInit {
  attributes = [Messages.ORD_REVENUE_ENG, Messages.ORD_RELEASE_ENG, Messages.ORD_POPULARITY_ENG];
  stringCondPrint: string = "";
  currentUser: Partial<UserFull> = this.authServ.getCurrentUser();
  randomMovies: MovieRootObject[] = [];
  arrayDim: number= 10;
  scoreForDB!: ScoreDTO;

  constructor(
    protected movieServ: MovieAPIService, 
    private router: Router, 
    protected authServ: AuthService,
    protected scoreServ: ScoreService, 
    private alertServ: AlertsService) { }


  ngOnInit(): void {
    //verifica se l'utente è loggato, nel caso reindirizza
    if (!this.authServ.isAuthenticated()) {
      this.alertServ.showAutoDestroyAlert(
        Messages.ICO_INFO,
        Messages.LOG_MUST,
        Messages.LOG_WARNING_NO_ACC,
        4000
      );
      this.router.navigateByUrl(Messages.ROT_SIGN);
    }else{
      //se l'utente è loggato randomizza un attributo di riordinamento casuale tra quelli dell'array attributes
      this.movieServ.rating;
      this.movieServ.attribute = this.attributes[Math.floor(Math.random() * this.attributes.length)];
      //chiama 10 volte l'accesso al movie db per riempire gli array
      for (let i = 0; i < this.arrayDim; i++) {
       this.getRandomMovie(this.movieServ.attribute);
     }
    }
  }

  getRandomMovie(attributeS: any) {
    const latestId = 30000;
    const randomId = Math.round(Math.random() * latestId);
    // crea un observed dell'observable di movie db creato nel service e richiede un film con id casuale
    this.movieServ.getMovie(randomId).subscribe({
    next: (res) => {
      //verifica se l'attributo poster.path è true quindi se l'oggetto ha la locandina
      if (res.poster_path) {
        //inizializzo 2 array, uno disordinato per il gioco ed uno riordinato per il confronto
        this.randomMovies.push(res); 
        this.movieServ.ordMovies.push(res);
        //ordino l'array dal piu piccolo al piu grande
        this.movieServ.ordMovies.sort((a: any, b: any) => a[attributeS] > b[attributeS] ? 1 : b[attributeS] > a[attributeS] ? -1 : 0)
      } else {
        //richiama la stessa funzione nel caso in cui il film non abbia poster.path
        this.getRandomMovie(attributeS);
      }
    },
    //richiama la funzione in caso di errore quindi ad esempio se il db è vuoto in corrispondenza dell'id
    error: () => {
      this.getRandomMovie(attributeS);
    },

    });
  }
  // funzione che gestisce l'evento che si crea con il drag and drop, riposizione l'elemento dell'array nell'indice in cui viene riposizionato
  drop(event: CdkDragDrop<{ title: string; poster: string }[]>) {
    moveItemInArray(this.randomMovies, event.previousIndex, event.currentIndex);
  }

  //funzione di calcolo del risultato
  checkResult() {
    //confronta l'array dei film usati nel gioco con l'array dei film ordinati all'inizio
    for (let i = 0; i < this.arrayDim; i++) {
      if (this.randomMovies[i] === this.movieServ.ordMovies[i]) {
        //incrementa la variabile rating di 10 ogni volta che i due array matchano
        this.movieServ.rating = this.movieServ.rating + 10;
        this.movieServ.ordMovies[i].isCorrect = true;
      }
    }

    // Chiamata http post per inviare i dati
    let user = this.authServ.getCurrentUser();

    // Costruzione dell'oggetto scoreForDB con la data come oggetto Date
    this.scoreForDB = {
      createdAt: new Date(), // Utilizza direttamente new Date() per ottenere la data corrente come oggetto Date
      score: this.movieServ.rating,
      user: {
        id: user.id,
        username: user.username
      }
    };

    console.log(this.scoreForDB);

    // Chiamata al servizio per salvare il punteggio
    this.scoreServ.saveNewScore(this.scoreForDB).subscribe({
      next: () => {
        // Gestione della risposta, se necessario
        this.alertServ.showSuccessAlertWithTit(Messages.SCORE_SUCCESS, Messages.SCORE_SUCCESS_INFO )
      },
      error: (error) => {
        // Gestione degli errori, se necessario
        this.alertServ.showErrorAlert(Messages.SCORE_ERR + error)
      }
    });

    //cambia pagina per visualizare il punteggio
    this.router.navigateByUrl(Messages.ROT_REVIEW);
  }

  printGameType(){
    if(this.movieServ.attribute === Messages.ORD_RELEASE_ENG){
      this.stringCondPrint = Messages.ORD_RELEASE_OLDER;
      return Messages.ORD_RELEASE_ITA;
    } else if(this.movieServ.attribute === Messages.ORD_REVENUE_ENG){
      this.stringCondPrint = Messages.ORD_REVENUE_LESS;
      return Messages.ORD_REVENUE_ITA
    }
    this.stringCondPrint = Messages.ORD_POPULARITY_LESS;
    return Messages.ORD_POPULARITY_ITA;
  }
}