<template>
  <div id="app">
    <div>
      <router-view></router-view>
    </div>
    <!--<HelloWorld msg="Welcome to Your Vue.js App"/>-->


  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import Home from "./components/Home";
import User from "./components/User";
import Login from "./components/Login";
import Inscription from "./components/Inscription";


export default {
  name: 'app',
  components: {
    HelloWorld,
    Home,
    User,
    Login,
    Inscription,
  },
  methods:{

  },
  data () {
    return {
      tab: null,
      items: [
        'web', 'shopping', 'videos', 'images', 'news'
      ],
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    }
  }
}
</script>

<style>

</style>
