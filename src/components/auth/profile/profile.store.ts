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

  getUserProgressLevels(){
    if(!state.user.progress)return [];
    return Object.keys(state.user.progress);
  },

  getUserCompletedGamesByLevel:(levelId: string) => {
    if(!state.user.progress)return 0;
    return  state.user.progress[levelId]?.completedGames;
  }
}

const actions = {
  setUser:(user: IUser) => {
    state.user = user;
  },

  setUserProgress:(progress: IUserProgress) => {
    state.user.progress = progress;
  },

  unlockedNextGame(levelId: string, currentGameId: string){
    if(!state.user.progress) return;
    const levelProgress = state.user.progress[levelId];

    if(!levelProgress)return;
    const gameIds = Object.keys(levelProgress.games);
    const currentIndex = gameIds.indexOf(currentGameId);
    if(currentIndex >= 0 && currentIndex + 1 < gameIds.length) {
      const nextGameId = gameIds[currentIndex + 1];
      levelProgress.games[nextGameId].isPainted = true;
    }
  }

}

export default {
  ...getters,
  ...actions,
}
