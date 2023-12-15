export interface ScoreInfo {
  userId: number;
  userName: string;
  score: number;
}

export interface ScoreFull {
  userId: number;
  userName: string;
  score: number;
  createdAt: Date;
  updatedAt: Date;
}
