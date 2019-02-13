<template>
  <div id="app">
    <div>
      <router-view></router-view>
    </div>
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
    }
  }
}
</script>

<style>

</style>
