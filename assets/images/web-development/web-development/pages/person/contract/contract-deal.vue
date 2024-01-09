<template>
    <div id="buy-sell-crypto">
      <ContractDeal />
    </div>
  </template>

  <script>
  import ContractDeal from "@/components/person/MyOrders/ContractDeal.vue"
  export default {
    components:{
        ContractDeal
    }

  }
  </script>

<style lang="scss">
@import '@/assets/scss/pages/user-center/order-details.scss';
</style>
