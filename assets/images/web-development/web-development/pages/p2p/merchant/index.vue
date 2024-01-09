<template>
  <div id="merchant-account">
    <MerchantAccount />
  </div>
</template>

<script>
  import MerchantAccount from "~/components/p2p/MerchantAccount/MerchantAccount.vue"

export default {
  components: {
    MerchantAccount
  },
  mounted(){
    if (!this.$userinfo.uid) {
      this.$router.push('/login?returnurl=' + this.$route.path)
    }
  }
}
</script>


<style lang="scss">
@import '@/assets/scss/pages/user-center/merchant-account.scss';
</style>
