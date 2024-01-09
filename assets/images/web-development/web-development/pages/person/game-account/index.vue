<template>
    <div id="trade-table">
      <GameAccount />
    </div>
  </template>

  <script>
  import GameAccount from "@/components/person/GameAccount/GameAccount.vue"
  export default {
    components:{
        GameAccount
    }
  }
  </script>

<style lang="scss">
@import '@/assets/scss/components/trade-table/trade-table.scss';
</style>
