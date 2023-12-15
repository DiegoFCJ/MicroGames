export interface Favourite {
    userId?: number,
    movieId?: number,
  }

  export interface FavMovie{
    id: number,
    comment: string,
    userId: number,
    movieId: number,
    rating: number,
    title: string,
    poster_path: string
  }