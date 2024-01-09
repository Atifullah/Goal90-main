<template>
  <div id="p2p-account">
    <BuyAccount />
  </div>
</template>

<script>
  import BuyAccount from "@/components/p2p/P2pAccount/BuyAccount.vue"

export default {
    components: {
        BuyAccount
}
}
</script>

<style lang="scss">
@import '@/assets/scss/pages/p2p/p2p-account.scss';
</style>
