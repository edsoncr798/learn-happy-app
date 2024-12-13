import { IGame } from '@/models/interfaces';


const state = reactive({
  games: [] as IGame[],
});

const getters = {
  getGames() {
    return state.games;
  },

  getGameById(gameId: string){
    return state.games.find((game) => game.uid === gameId) || null;
  }
}

const mutations = {
  setGames(games: IGame[]) {
    state.games = games;
  },
};


export default {
  ...getters,
  ...mutations,
};