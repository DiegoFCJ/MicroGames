import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-ranking-best-games',
  templateUrl: './ranking-best-games.component.html',
  styleUrls: ['./ranking-best-games.component.scss']
})
export class RankingBestGamesComponent implements OnInit {
  usersOrdered!: User[];
  dataSource: any;

  constructor(private http: HttpClient, config: NgbModalConfig, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.fetchAllUsers();
  }

  fetchAllUsers(){
    this.http.get<User[]>(`http://localhost:4567/top10`).subscribe((data)=> {
      this.usersOrdered = data;
      this.dataSource = new MatTableDataSource(this.usersOrdered);
      console.log(this.usersOrdered, this.dataSource);
    });
  }

  displayedColumns = ["count", "userName", "score", "date"];

  open(content: any) {
		this.modalService.open(content);
    }

  openDelete(targetModal: any, friend: any) {
      const deleteId = friend.id;
      this.modalService.open(targetModal, {
        backdrop: 'static',
        size: 'lg'
      });
  }
}