import { IGame } from '@/models/interfaces';


const state = reactive({
  games: [] as IGame[],
  thisIsLastGame: false,
});

const getters = {
  getGames: () => state.games,
  getThisIsLastGame: () => state.thisIsLastGame,
}

const mutations = {
  setGames: (games: IGame[]) =>{
    state.games = games;
  },

  updateGames: (gameId: string, updates: Partial<IGame>) =>{
    const game = state.games.find(
      (g) => g.uid === gameId
    );
    if(game){
      Object.assign(game, updates);
    }
  },

  unlockNextGame: () =>{
    const nextGame = state.games.find((game) => !game.completed);
    if(nextGame) nextGame.unlocked = true;
  }
};


export default {
  ...getters,
  ...mutations,
};