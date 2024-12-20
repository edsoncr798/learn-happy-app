import { IGame } from '@/models/interfaces';

const state = reactive({
  games: [] as IGame[],
  selectedGame: {} as IGame,
});

const getters = {
  getGames: () => state.games,
  getSelectedGame: () => {
    if (!state.selectedGame) {
      const selectGameFromLocalStorage = localStorage.getItem('selectedGame');
      if (selectGameFromLocalStorage) {
        state.selectedGame = JSON.parse(selectGameFromLocalStorage);
      }
    }
    return state.selectedGame;
  },
};

const mutations = {
  setGames: (games: IGame[]) => {
    state.games = games;
  },

  updateGames: (gameId: string, updates: Partial<IGame>) => {
    const game = state.games.find((g) => g.uid === gameId);
    if (game) {
      Object.assign(game, updates);
    }
    console.log('game updated!!!', game);
    state.games = Object.assign([], state.games);
  },

  unlockNextGame: () => {
    const nextGame = state.games.find((game) => !game.completed);
    if (nextGame) nextGame.unlocked = true;
  },

  setSelectedGame: (game: IGame) => {
    state.selectedGame = game;
  },
};

export default {
  ...getters,
  ...mutations,
};
