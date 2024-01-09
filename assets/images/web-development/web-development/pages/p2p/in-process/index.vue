<template>
    <div id="buy-sell-crypto">
      <InProcess />
    </div>
  </template>
  <script>
  import InProcess from '@/components/p2p/InProcess/InProcess.vue'
  export default {
    components: {
      InProcess,
    },
    mounted(){
      if (!this.$userinfo.uid) {
        this.$router.push('/login?returnurl=' + this.$route.path)
      }
    }
  }
  </script>
  
  <style lang="scss">
  @import '@/assets/scss/pages/user-center/order-details.scss';
  </style>
  