import Vue from 'vue'
import App from './App.vue'
import Home from "./components/Home";
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min'
import 'vuetify/dist/vuetify.min.css'
import Login from "./components/Login";
import Inscription from "./components/Inscription";
import '@mdi/font/css/materialdesignicons.css'
import Vuex from "vuex";
import VueRouter from "vue-router";
import AddQuestion from "./components/AddQuestion";
import Quizze from "./components/Quizze";
import UniqueQuestion from "./components/question/UniqueQuestion";
import MultipleQuestion from "./components/question/MultipleQuestion";
import OuverteQuestion from "./components/question/OuverteQuestion";

Vue.config.productionTip = false


Vue.use(Vuex)
Vue.use(VueRouter);
Vue.use(Vuetify, {
    iconfont: 'mdi',
})
const routes = [
    {path: '/home', component:Home},
    {path: '/' , component:Login},
    {path: '/inscription',component:Inscription},
    {path: '/addquestion', component:AddQuestion},
    {path: '/quizze', component: Quizze, children:[
            {path: 'unique',component: UniqueQuestion},
            {path: 'multiple',component:MultipleQuestion},
            {path: 'ouverte',component:OuverteQuestion}
        ]
    },
    {path: '*', redirect:'/'}
];

const router = new VueRouter({
    mode: 'history',
    routes:routes
})

router.beforeEach((to,from,next)=>{
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
