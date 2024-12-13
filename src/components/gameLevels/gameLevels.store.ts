import { ILevel } from '@/models/interfaces';

const state = reactive({
  levels: [] as ILevel[],
});

const getters = {
  getLevels(){
    return state.levels;
  }
};


const mutations = {
  setLevels(levels: ILevel[]){
    state.levels = levels;
  }
}


export default {
  ...getters,
  ...mutations,
}

