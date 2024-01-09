<template>
  <div id="crypto-listing" class="main-content">
    <CryptoListingSteps />
  </div>
</template>

<script>
import CryptoListingSteps from '@/components/FooterModule/CryptoListingSteps.vue'
export default {
components: {
    CryptoListingSteps
},
    beforeRouteEnter(to, from, next) {
    next(vm => {
      if (!vm.$userinfo.uid) {
        vm.$router.push('/login?returnurl=' + to.fullPath);
      } else {
        next();
      }
    });
    }

}
</script>

<style lang="scss">
@import '@/assets/scss/pages/footer/user-agreement.scss';
</style>
