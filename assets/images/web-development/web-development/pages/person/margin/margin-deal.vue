<template>
    <div id="buy-sell-crypto">
      <MarginDeal />
    </div>
  </template>

  <script>
  import MarginDeal from "@/components/person/MyOrders/MarginDeal.vue"
  export default {
    components:{
        MarginDeal
    }

  }
  </script>

<style lang="scss">
@import '@/assets/scss/pages/user-center/order-details.scss';
</style>
