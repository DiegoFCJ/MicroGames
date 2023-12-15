export interface MovieData {
    comment: String,
    userId: number,
    movieId: number,
    rating: number
  }

export interface FavData {
      userId?: number,
      movieId: number
  }

  export interface FullFavData {
        id: number,
        userId: number,
        movieId: number,
        createdAt: Date,
        updatedAt: Date
    }