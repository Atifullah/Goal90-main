<template>
  <div  ref="home" id="home">
    <NewHome />
  </div>
</template>
<script>
import NewHome from '~/components/NewHome/NewHome.vue';
export default {
  name: "HomePage",
  components: {
    NewHome
},
};
</script>
<style lang="scss">
// @import '@/assets/scss/pages/common-home/common-home.scss';
@import '@/assets/scss/pages/new-home/home.scss';
</style>





