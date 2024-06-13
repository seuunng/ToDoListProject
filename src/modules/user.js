// ./modules/user.js

const state = {
  user: null,
  status: ''
};

const mutations = {
  SET_USER(state, user) {
    state.user = user;
  },
  SET_STATUS(state, status) {
    state.status = status;
  }
};

const actions = {
  login({ commit }, user) {
    // 로그인 로직 (API 호출 등)
    commit('SET_USER', user);
    commit('SET_STATUS', 'loggedIn');
  },
  logout({ commit }) {
    // 로그아웃 로직 (API 호출 등)
    commit('SET_USER', null);
    commit('SET_STATUS', 'loggedOut');
  },
  updateUserStatus({ commit }, status) {
    commit('SET_STATUS', status);
  }
};

const getters = {
  isAuthenticated: state => !!state.user,
  getUser: state => state.user,
  getStatus: state => state.status
};

export default {
  state,
  mutations,
  actions,
  getters
};