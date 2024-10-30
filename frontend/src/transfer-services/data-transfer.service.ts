import { Injectable } from '@angular/core';
import { MovieRootObject } from 'src/models/movie';

@Injectable({
  providedIn: 'root',
})
export class DataTransferService {
  private rating: number = 0;
  private ordMovies: MovieRootObject[] = [];

  constructor() {}
  setRating(rating: number): void {
    this.rating = rating;
  }

  getRating(): number {
    return this.rating;
  }

  setOrdMovies(ordMovies: MovieRootObject[]): void {
    this.ordMovies = ordMovies;
  }

  getOrdMovies(): MovieRootObject[] {
    return this.ordMovies;
  }
}
