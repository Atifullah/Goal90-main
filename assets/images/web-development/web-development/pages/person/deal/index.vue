<template>
    <div id="buy-sell-crypto">
      <Deal />
    </div>
  </template>

  <script>
  import Deal from "@/components/person/MyOrders/Deal.vue"
  export default {
    components:{
        Deal
    }

  }
  </script>

<style lang="scss">
@import '@/assets/scss/pages/user-center/order-details.scss';
</style>
