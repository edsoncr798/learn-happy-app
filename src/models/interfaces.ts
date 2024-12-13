export interface IGame {
  uid: string;
  gameNumber: number;
  level_id: string;
  unlocked: boolean;
  description: string;
  completed: boolean;
  colors: string[];
  images: string[];
  created_at?: Date,
  updated_at?: Date
}


export interface ILevel {
  uid: string;
  levelNumber: number;
  is_unlocked: boolean;
  created_at?: Date,
  updated_at?: Date
}

export interface IUserProgress {
  [levelId: string]: {
    completedGames: number,
    games: {
      [gameId: string]: {
        isPainted: boolean,
      }
    }
  };
}


export interface IUser {
  uid: string;
  name: string,
  age: number,
  gender: string,
  progress: IUserProgress | null,
  created_at?: Date,
  updated_at?: Date
}