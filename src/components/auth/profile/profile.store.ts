export interface IUser {
  uid: string;
  name: string,
  age: number,
  gender: string,
  created_at?: Date,
  updated_at?: Date
}

const state = reactive({
  user: {} as IUser,
});

const getters = {
  getUser: () => state.user,

  getUserName: () => {
    const user = state.user;
    return `${user.name}`;
  }
}

const actions = {
  setUser:(user: IUser) => {
    state.user = user;
  },

}

export default {
  ...getters,
  ...actions,
}
