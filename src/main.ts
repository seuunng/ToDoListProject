import { createApp } from 'vue'
import App from './App.vue'
import '@fortawesome/fontawesome-free/css/all.css';
import router from './router';
import 'normalize.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import * as bootstrap from 'bootstrap'; 
//import modules from './modules';

window.bootstrap = bootstrap;
createApp(App)
    .use(router)
    .mount('#app');

