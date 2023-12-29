  export interface FavMovie{
    id: number,
    comment: string,
    userId: number,
    movieId: number,
    rating: number,
    title: string,
    posterPath: string
  }

  export interface FavMovieForDB{
    id: number,
    createdAt: Date,
    movieId: number,
    userId: number,
    favorite: boolean,
    like: boolean
  }