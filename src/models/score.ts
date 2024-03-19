import { User } from "./user";

export interface ScoresForRankDTO {
  rankingNumOrdered: number;
  score: number;
  username: string;
  lastGamePlayedAt: Date;
}

export interface ScoreDTO {
  score: number;
  createdAt: Date;
  user: {
    id: number;
    username: string;
  };
}

export interface ScoreFromDBDTO {
  id: number;
  createdAt: Date;
  score: number;
  user: User;
}
