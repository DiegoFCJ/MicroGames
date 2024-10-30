import { Component, Directive, EventEmitter, Input, OnInit, Output, PipeTransform, QueryList, ViewChildren } from '@angular/core';
import { ScoreService } from 'src/services/score.service';
import { ScoresForRankDTO } from 'src/models/score';
import { FormControl } from '@angular/forms';
import { DecimalPipe } from '@angular/common';
import { Observable, map, of, startWith } from 'rxjs';
@Component({
  selector: 'app-global-scores',
  templateUrl: './global-scores.component.html',
  styleUrls: ['./global-scores.component.scss']
})
export class GlobalScoresComponent implements OnInit {
	dataSource: ScoresForRankDTO[] = [];
	filter = new FormControl('', { nonNullable: true });

	page = 1;
	pageSize = 10;
	dataLen!: number;
	dataSourceOrdered$: Observable<ScoresForRankDTO[]> = of([]);
	direction!: string;

	constructor(private scoreServ: ScoreService, private pipe: DecimalPipe) {}

	ngOnInit(): void {
		this.fetchAllScores();
		this.dataSourceOrdered$ = this.filter.valueChanges.pipe(
			startWith(''),
			map((text) => this.search(text))
		);
	}

	search(text: string): ScoresForRankDTO[] {
		return this.dataSource.filter((scores: ScoresForRankDTO) => {
			const term = text.toLowerCase();
			return (
				scores.username.toLowerCase().includes(term) ||
				scores.score.toString().includes(term) ||
				scores.lastGamePlayedAt.toString().includes(term)
			);
		});
	}

	refreshData() {
		this.dataSourceOrdered$ = of(
			this.dataSource
				.map((score, i) => ({ ...score, id: i + 1 }))
				.slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize)
		);
	}

	fetchAllScores() {
		this.scoreServ.getScForRunkings().subscribe((data) => {
			this.dataSource = data;
			this.dataLen = data.length;
			this.refreshData();
		});
	}
	  
}
