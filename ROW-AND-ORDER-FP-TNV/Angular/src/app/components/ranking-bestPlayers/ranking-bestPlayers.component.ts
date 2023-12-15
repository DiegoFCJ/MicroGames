import { UserLocalSt } from '../../models/user';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

const SBUrl = "http://localhost:8080/api/public";

@Component({
  selector: 'app-ranking-bestPlayers',
  templateUrl: './ranking-bestPlayers.component.html',
  styleUrls: ['./ranking-bestPlayers.component.scss']
})

export class RankingComponent implements OnInit {
  displayedColumns = ["count", "name", "surname", "username", "score"];
  dataSource!: MatTableDataSource<UserLocalSt> 
  lowValue: number = 0;
  highValue: number = 0;
  index!: number[];

  constructor(private http: HttpClient) { }

  @ViewChild('paginator') 
  paginator!: MatPaginator;

  RenderDataTable() {  
      this.fetchAllUsersDesc().subscribe((res) => {
        this.dataSource = new MatTableDataSource(res);
        this.highValue = res.length
      });  
  } 
  
  public getPaginatorData(event: PageEvent): PageEvent {
    this.lowValue = event.pageIndex * event.pageSize;
    this.highValue = this.lowValue + event.pageSize;
    return event;
  }

  public refreshlist=()=>{
    window.location.reload();
  }
  
  ngOnInit(): void {
    this.RenderDataTable();
  }
  
  fetchAllUsersDesc(){
    return this.http.get<UserLocalSt[]>(`${SBUrl}/allUsersDescending`);
  }
} 
