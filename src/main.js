import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import User from "./components/User";
import Home from "./components/Home";
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min'
import 'vuetify/dist/vuetify.min.css'
import Login from "./components/Login";
import Joblist from "./components/Joblist";
import Inscription from "./components/Inscription";
import '@mdi/font/css/materialdesignicons.css'
import Vuex from "vuex";
import store from "@vue/cli-service/generator/vuex/template/src/store";
import test from "./components/test";

Vue.config.productionTip = false


Vue.use(Vuex)
Vue.use(VueRouter);
Vue.use(Vuetify, {
    iconfont: 'mdi',
})
const routes = [
    {path: '/users', component: User},
    {path: '/home', component:Home},
    {path: '/' , component:Login},
    {path: '/jobs',component:Joblist},
    {path: '/inscription',component:Inscription},
    {path: '/test',component:test},

    {path: '*', redirect:'/'}
];

const router = new VueRouter({
    mode: 'history',
    routes:routes
})

router.beforeEach((to,from,next)=>{
    console.log(to)
    console.log(to.fullPath=="/inscription")
    if(to.fullPath == "/inscription"){
        return next();
    }
    const publicPages = ['/'];
    const authRequired = !publicPages.includes(to.path);  //check if auth is needed
    const loggedIn = localStorage.getItem('user-token');
    if (authRequired && !loggedIn) {
        return next('/');
    }
    next();
})


new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
