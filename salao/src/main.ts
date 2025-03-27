import { createApp } from 'vue';
import App from './App.vue';
import './index.css';
import router from './router';

const app = createApp(App);

// Use the router
app.use(router);

// Mount the app
app.mount('#app');