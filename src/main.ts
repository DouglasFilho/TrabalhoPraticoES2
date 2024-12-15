import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import 'quasar/src/css/index.sass'; 

import { Quasar } from 'quasar';
import quasarLang from 'quasar/lang/pt-BR';
import quasarIconSet from 'quasar/icon-set/material-icons';

const app = createApp(App)

app.use(Quasar, {
  plugins: {},
  lang: quasarLang,
  iconSet: quasarIconSet,
});
app.use(createPinia())
app.use(router)

app.mount('#app')
