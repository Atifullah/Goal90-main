<template>
  <div id="p2p-account">
    <BuyMethod />
  </div>
</template>

<script>
import BuyMethod from "@/components/p2p/P2pAccount/BuyMethod/BuyMethod.vue"
export default {
components: {
    BuyMethod,
}
}
</script>


<style lang="scss">
@import '@/assets/scss/pages/p2p/p2p-account.scss';
</style>
