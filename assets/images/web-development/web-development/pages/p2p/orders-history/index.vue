<template>
  <div id="buy-sell-crypto">
    <OrderHistory />
  </div>
</template>

<script>
import OrderHistory from '@/components/p2p/OrderHistory/OrderHistory.vue'
export default {
  components: {
    OrderHistory,
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
