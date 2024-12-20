import { IUser, IUserProgress } from '@/models/interfaces';

const state = reactive({
  user: {} as IUser,
});

const getters = {
  getUser: () => state.user,

  getUserName: () => {
    const user = state.user;
    return `${user.name}`;
  },

  getUserProgressLevels() {
    if (!state.user.progress) return [];
    return Object.keys(state.user.progress);
  },

  getUserProgressGames() {
    if (!state.user.progress) return [];

    const levels = Object.keys(state.user.progress);
    const games = levels.map((level) => {
      if (!state.user.progress) return [];

      return Object.keys(state.user.progress[level].games);
    });
    return games.flat();
  },

  getUserCompletedGamesByLevel: (levelId: string) => {
    if (!state.user.progress) return 0;
    if (!state.user.progress[levelId]) return 0;
    return state.user.progress[levelId]?.completedGames;
  },

  getUserGamesCompletedByLevel2: (levelId: string) => {
    if (!state.user.progress) return [];
    if (!state.user.progress[levelId]) return [];

    return Object.keys(state.user.progress[levelId]?.games).filter((gameId) => {
      if (!state.user.progress) return false;
      return state.user.progress[levelId]?.games[gameId].isPainted;
    });
  },
};

const actions = {
  setUser: (user: IUser) => {
    state.user = user;
  },

  setUserProgress: (progress: IUserProgress) => {
    state.user.progress = Object.assign({}, progress);
  },

  unlockedNextGame(levelId: string, currentGameId: string) {
    if (!state.user.progress) return;
    const levelProgress = state.user.progress[levelId];

    if (!levelProgress) return;
    const gameIds = Object.keys(levelProgress.games);
    const currentIndex = gameIds.indexOf(currentGameId);
    if (currentIndex >= 0 && currentIndex + 1 < gameIds.length) {
      const nextGameId = gameIds[currentIndex + 1];
      levelProgress.games[nextGameId].isPainted = true;
    }
  },
};

export default {
  ...getters,
  ...actions,
};
