export interface IUser {
  uid: string;
  name: string,
  age: string,
  gender: string,
  created_at?: Date,
  updated_at?: Date
}

export interface IProfileStore {
  user: IUser | null;
}

const state = reactive<IProfileStore>({
  user: null,
});

const getters = {
  getUser: () => state.user,
}

const mutations = {
  setUser(user: IUser) {
    state.user = user;
  }

}

export default {
  ...getters,
  ...mutations,
}
