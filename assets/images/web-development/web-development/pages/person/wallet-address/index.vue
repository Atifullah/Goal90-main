<template>
    <div id="buy-sell-crypto">
      <WalletAddress />
    </div>
  </template>

  <script>
  import WalletAddress from "@/components/person/WalletAddress/WalletAddress.vue"
  export default {
    components:{
        WalletAddress
    }

  }
  </script>

<style lang="scss">
@import '@/assets/scss/pages/user-center/order-details.scss';
</style>
