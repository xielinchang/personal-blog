import { createApp } from 'vue';
import App from './App.vue';
import JoydDemo from './components/main';
import './assets/scss/index.scss';
const app = createApp(App);
app.use(JoydDemo);
app.mount('#app');
