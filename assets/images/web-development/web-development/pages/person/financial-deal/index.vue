<template>
    <div id="buy-sell-crypto">
      <FinancialDeal />
    </div>
  </template>

  <script>
  import FinancialDeal from "@/components/person/MyOrders/FinancialDeal.vue"
  export default {
    components:{
        FinancialDeal
    }

  }
  </script>

<style lang="scss">
@import '@/assets/scss/pages/user-center/order-details.scss';
</style>
