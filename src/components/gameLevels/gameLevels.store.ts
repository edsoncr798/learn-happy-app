const state = reactive({
  levels: [
    { number: 1, isUnlocked: true },
    { number: 2, isUnlocked: true },
    { number: 3, isUnlocked: true },
    { number: 4, isUnlocked: false },
    { number: 5, isUnlocked: false },
    { number: 6, isUnlocked: false },
    { number: 7, isUnlocked: false },
    { number: 8, isUnlocked: false },
    { number: 9, isUnlocked: false },
    { number: 10, isUnlocked: false },
  ],
});

const getters = {
  getLevels: () => state.levels,
};


const actions = {
  setUnlockLevel: (levelNumber: number) => {
    const nextLevelIndex = levelNumber;
    if (nextLevelIndex < state.levels.length - 1) {
      state.levels[nextLevelIndex].isUnlocked = true;
    }
  }
}


export default {
  ...getters,
  ...actions,
}

