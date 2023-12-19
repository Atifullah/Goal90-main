<template>
  <div class="home">
    <Menu></Menu>
    <Home></Home>
  </div>
</template>

<script>
import Menu from './menu.vue'
import Home from './Home.vue'

export default {
  components: {
    Menu,
    Home,
  },

  methods: {},
}
</script>
<style scoped>
@import '../assets/scss/global/home/home.scss';
</style>
