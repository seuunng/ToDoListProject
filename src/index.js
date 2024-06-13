// ./index.js

import { createStore } from 'vuex';
import user from './modules/user';
import task from './modules/task';

const store = createStore({
  modules: {
    user,
    task
  }
});

export default store;