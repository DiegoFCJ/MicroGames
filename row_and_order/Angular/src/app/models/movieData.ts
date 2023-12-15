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
        comment: string,
        userId: number,
        movieId: number,
        rating: number,
        title: string,
        poster_path: string
    }