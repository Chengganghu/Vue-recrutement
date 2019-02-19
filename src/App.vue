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
import Login from "./components/Login";
import Inscription from "./components/Inscription";
import AddQuestion from "./components/AddQuestion";
import VHeader from "./components/VHeader";
import Quizze from "./components/Quizze";
import UniqueQuestion from "./components/question/UniqueQuestion";
import OuverteQuestion from "./components/question/OuverteQuestion";
import MultipleQuestion from "./components/question/MultipleQuestion";

export default {
  name: 'app',
  components: {
    HelloWorld,
    Home,
    Login,
    Inscription,
    AddQuestion,
    VHeader,
    Quizze,
    MultipleQuestion,
    OuverteQuestion,
    UniqueQuestion
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
