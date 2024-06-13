// ./modules/modules/task.js

const state = {
  tasks: []
};

const mutations = {
  ADD_TASK(state, task) {
    state.tasks.push(task);
  },
  UPDATE_TASK(state, updatedTask) {
    const index = state.tasks.findIndex(task => task.id === updatedTask.id);
    if (index !== -1) {
      state.tasks.splice(index, 1, updatedTask);
    }
  },
  DELETE_TASK(state, taskId) {
    state.tasks = state.tasks.filter(task => task.id !== taskId);
  }
};

const actions = {
  addTask({ commit }, task) {
    // 할일 추가 로직 (API 호출 등)
    commit('ADD_TASK', task);
  },
  updateTask({ commit }, updatedTask) {
    // 할일 수정 로직 (API 호출 등)
    commit('UPDATE_TASK', updatedTask);
  },
  deleteTask({ commit }, taskId) {
    // 할일 삭제 로직 (API 호출 등)
    commit('DELETE_TASK', taskId);
  }
};

const getters = {
  getTasks: state => state.tasks,
  getTaskById: state => id => state.tasks.find(task => task.id === id)
};

export default {
  state,
  mutations,
  actions,
  getters
};