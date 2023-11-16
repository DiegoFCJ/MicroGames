import { Component, Directive, EventEmitter, Input, OnInit, Output, PipeTransform, QueryList, ViewChildren } from '@angular/core';
import { ScoreService } from 'src/services/score.service';
import { ScoresForRankDTO } from 'src/models/score';
import { FormControl } from '@angular/forms';
import { DecimalPipe } from '@angular/common';
import { Observable, map, of, startWith } from 'rxjs';

export type SortColumn = keyof ScoresForRankDTO | '';
export type SortDirection = 'asc' | 'desc' | '';
const rotate: { [key: string]: SortDirection } = { asc: 'desc', desc: '', '': 'asc' };

const compare = (v1: string | number | Date, v2: string | number | Date) => {
	if (v1 instanceof Date && v2 instanceof Date) {
	  return v1.getTime() - v2.getTime();
	}
	if (typeof v1 === 'string' && typeof v2 === 'string') {
	  return v1.localeCompare(v2);
	}
	return v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
  };
  

export interface SortEvent {
	column: SortColumn;
	direction: SortDirection;
}

@Directive({
	selector: 'th[sortable]',
	host: {
		'[class.asc]': 'direction === "asc"',
		'[class.desc]': 'direction === "desc"',
		'(click)': 'rotate()',
	},
})
export class NgbdSortableHeader {
	@Input() sortable: SortColumn = '';
	@Input() direction: SortDirection = '';
	@Output() sort = new EventEmitter<SortEvent>();

	rotate() {
		this.direction = rotate[this.direction];
		this.sort.emit({ column: this.sortable, direction: this.direction });
	}
}

@Component({
	selector: 'app-ranking',
	templateUrl: './ranking.component.html',
	styleUrls: ['./ranking.component.scss']
})
export class RankingComponent implements OnInit {
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

	@ViewChildren(NgbdSortableHeader) headers!: QueryList<NgbdSortableHeader>;

	onSort(column: SortColumn) {
		this.headers.forEach((header) => {
		  if (header.sortable !== column) {
			header.direction = '';
		  }
		});
	  
		if (column === '') {
		  this.dataSourceOrdered$ = of(this.dataSource);
		} else {
		  this.dataSourceOrdered$ = of([...this.dataSource].sort((a, b) => {
			const res = compare(a[column], b[column]);
			return this.direction === 'asc' ? res : -res;
		  }));
		}
	  }
	  
}
