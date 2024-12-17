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
// podriamos empezar desde cero?, trabajando en los siguientes puntos importantes
//1. teniendo el cuenta la interfaz de IGame(collection games de firebase)
// export interface IGame {
//   uid: string;
//   gameNumber: number;
//   level_id: string;
//   unlocked: boolean;
//   description: string;
//   completed: boolean;
//   colors: string[];
//   images: string[];
//   created_at?: Date,
//   updated_at?: Date
// }

// funcionalidad: al entrar y completar un juego se mostrara un modal dando las felicitaciones y tendra un boton
// para ir al siguiente nivel osea regresara a la vista donde se muestra todos
// los juegos pero por logica debe estar desbloqueado el juego 2 y asi con todos hasta
//llegar al ultimo y desbloquear ya no un siguiente juego sino desbloquear el siguiente
//nivel (nivel 2) que tiene esta interfaz:
//export interface ILevel {
//uid: string;
//levelNumber: number;
//is_unlocked: boolean;
//}
// (y es trabajar con este campo "is_unlocked" para desbloquearlo
// ya que todos por default a excepcion del nivel 1 is_unlocked=false)

export interface IUser {
  uid: string;
  name: string,
  age: number,
  gender: string,
  progress: IUserProgress | null,
  created_at?: Date,
  updated_at?: Date
}