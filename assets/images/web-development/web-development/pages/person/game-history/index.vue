<template>
    <div id="wallet-history">
      <GameOrders />
    </div>
  </template>

  <script>
  import GameOrders from "@/components/person/GameHistory/GameOrders.vue"
  export default {
    components:{
      GameOrders
    }

  }
  </script>

<style lang="scss">
@import '@/assets/scss/pages/user-center/wallet-history.scss';
</style>
