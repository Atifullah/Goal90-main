<template>
    <div id="wallet-history">
      <WalletHistory />
    </div>
  </template>

  <script>
  import WalletHistory from "@/components/person/WalletHistory/WalletHistory.vue"
  export default {
    components:{
        WalletHistory
    }

  }
  </script>

<style lang="scss">
@import '@/assets/scss/pages/user-center/wallet-history.scss';
</style>
