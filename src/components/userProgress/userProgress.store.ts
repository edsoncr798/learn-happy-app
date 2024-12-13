import { IUserProgress } from '@/models/interfaces';


const state = reactive({
  progress: {} as IUserProgress | null,
});

const getters = {

  getProgress() {
    if(state.progress != null) return state.progress;
    return null;
  }

};

const mutations = {
  setProgress(progress: IUserProgress) {
    state.progress = progress;
  }

};

export default {
  ...getters,
  ...mutations
}