import { ILevel } from '@/models/interfaces';

const state = reactive({
  levels: [] as ILevel[],
});

const getters = {
  getLevels: () => state.levels,
};


const mutations = {
  setLevels: (levels: ILevel[])=> {
    state.levels = levels;
  },

  unlockedNextLevel: (currentLevelId: string) => {
    const currentLevelIndex = state.levels.findIndex(
      (i) => i.uid === currentLevelId
    );
    if(currentLevelIndex !== -1 && currentLevelIndex < state.levels.length -1) {
      state.levels[currentLevelIndex + 1].is_unlocked = true;
    }
  }

}


export default {
  ...getters,
  ...mutations,
}

