import { UserFull } from '../../../models/user';
import { AuthService } from 'src/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MovieRootObject } from 'src/models/movie';
import { MovieAPIService } from 'src/services/movie-api.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Router } from '@angular/router';
import { ScoreService } from 'src/services/score.service';


@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.scss'],
})
export class GamePageComponent implements OnInit {
  attributes = ['revenue', 'release_date', 'popularity'];
  stringCondPrint: string = "";
  currentUser: Partial<UserFull> = this.authServ.getCurrentUser();
  randomMovies: MovieRootObject[] = [];
  arrayDim: number= 10;

  constructor(
    protected movieServ: MovieAPIService, 
    private router: Router, 
    protected authServ: AuthService,
    protected scoreServ: ScoreService) { }


  ngOnInit(): void {
    //verifica se l'utente è loggato, nel caso reindirizza
    if (!this.authServ.isAuthenticated()) {
      alert("Non puoi accedere a questa pagina senza permesso! Esegui l'accesso")
      this.router.navigateByUrl("/sign");
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
    //cambia pagina per visualizare il punteggio
    this.router.navigate(['/review']);
    //confronta l'array dei film usati nel gioco con l'array dei film ordinati all'inizio
    for (let i = 0; i < this.arrayDim; i++) {
      if (this.randomMovies[i] === this.movieServ.ordMovies[i]) {
        //incrementa la variabile rating di 10 ogni volta che i due array matchano
        this.movieServ.rating = this.movieServ.rating + 10;
      }
    }
    //definizione della variabile da inviare al DB node per salvare il punteggio
    this.scoreServ.scoreForDB = {
      userId: this.authServ.getCurrentUser().id,
      userName: this.authServ.getCurrentUser().username,
      score: this.movieServ.rating
    }
    //chiamata http post per inviare i dati
    this.scoreServ.saveNewScore().subscribe();
  }

  printGameType(){
    if(this.movieServ.attribute === "release_date"){
      this.stringCondPrint = "piú vecchio";
      return "data di rilascio"
    } else if(this.movieServ.attribute === "revenue"){
      this.stringCondPrint = "film con meno fatturato";
      return "fatturato"
    }
    this.stringCondPrint = "meno popolare";
    return "popolaritá"
  }
}


