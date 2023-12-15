export interface User {
  name: string;
  surname: string;
  username: string;
}

export interface LoginDTO {
  username: string;
  password: string;
}

export interface RegisterDTO {
  name: string;
  email: string;
  surname: string;
  username: string;
  password: string;
}

export interface UserFull {
  id: number;
  name: string;
  surname: string;
  email: string;
  username: string;
  score: number;
}

export interface SpringResponse {
  data: UserFull;
}
