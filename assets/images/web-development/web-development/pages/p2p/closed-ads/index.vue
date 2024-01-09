<template>
    <div id="my-p2p-ads">
      <MyAds :closed="true"/>
    </div>
  </template>
  
  <script>
    import MyAds from "@/components/p2p/MyAds/MyAds.vue"
  
  export default {
    components: {
      MyAds,
    },
    mounted(){
      if (!this.$userinfo.uid) {
        this.$router.push('/login?returnurl=' + this.$route.path)
      }
    }
  }
  </script>
  
  <style lang="scss">
  @import '@/assets/scss/pages/p2p/my-ads.scss';
  </style>