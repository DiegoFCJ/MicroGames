import { MovieAPIService } from 'src/services/movie-api.service';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ScoreService } from 'src/services/score.service';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.scss']
})

export class RankingComponent implements OnInit {
  displayedColumns = ["count", "username", "score", "data"];

  constructor(protected scoreServ: ScoreService, protected movieServ: MovieAPIService) { }

  ngOnInit(): void {
    this.fetchAllScores();
  }

  fetchAllScores(){
    this.scoreServ.fetchAllScores().subscribe((data)=> {
      this.scoreServ.dataSource = new MatTableDataSource(data);
    });
  }
}
