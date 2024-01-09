<template>
    <div id="trade-table">
      <P2pAccount />
    </div>
  </template>

  <script>
  import P2pAccount from "@/components/person/P2pAccount/P2pAccount.vue"
  export default {
    components:{
        P2pAccount
    }
  }
  </script>

<style lang="scss">
@import '@/assets/scss/components/trade-table/trade-table.scss';
</style>
