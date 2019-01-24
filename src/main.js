import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import User from "./components/User";
import Home from "./components/Home";
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min'
import Login from "./components/Login";
Vue.config.productionTip = false

Vue.use(VueRouter);
Vue.use(Vuetify)
const routes = [
  {
    path: '/users', component: User
  },
  {
    path: '/home', component:Home
  },
  {
    path: '/' , component:Login
  }
];

const router = new VueRouter({
  routes:routes
})

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
