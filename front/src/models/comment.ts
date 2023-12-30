export interface CommentFull {
    id: number;
    username: string;
    comment: string[];
    userId: number;
    movieId: number
  }

  export interface Comment {
    username: string;
    createdAt: Date;
    comment: string[];
    movieId: number
    userId: number
  }