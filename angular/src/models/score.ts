import { User } from "./user";

export interface ScoresForRankDTO {
  rankingNumOrdered: number;
  score: number;
  username: string;
  lastGamePlayedAt: Date;
}

export interface ScoreDTO {
  createdAt: Date;
  score: number;
  user: User;
}

export interface ScoreFromDBDTO {
  id: number;
  createdAt: Date;
  score: number;
  user: User;
}
