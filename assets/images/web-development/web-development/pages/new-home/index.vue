<template>
  <div id="home">
   <NewHome />
  </div>
</template>

<script>
import NewHome from '~/components/NewHome/NewHome.vue'

export default {
  components: {
    NewHome
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/pages/new-home/home.scss';
</style>