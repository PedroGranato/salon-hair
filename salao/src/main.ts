import './index.css'; 
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import axios from 'axios';

const app = createApp(App);

// ao iniciar, carrega token e header
const token = localStorage.getItem('token');
if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

// opcional: guarda o e‑mail ou outros dados em um store/composable
const userJson = localStorage.getItem('user');
if (userJson) {
  const user = JSON.parse(userJson);
  // você pode expor esse `user` em um composable para usar em qualquer componente
  console.log('Usuário logado:', user);
}

app.use(router);
app.mount('#app');