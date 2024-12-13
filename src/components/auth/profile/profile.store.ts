import { IUser } from '@/models/interfaces';


const state = reactive({
  user: {} as IUser,
});

const getters = {
  getUser: () => state.user,

  getUserName: () => {
    const user = state.user;
    return `${user.name}`;
  },

  getUserProgress(){
    return state.user.progress;
  }
}

const actions = {
  setUser:(user: IUser) => {
    state.user = user;
  },

  setUserProgress:(user: IUser) => {
    state.user.progress = user.progress;
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
