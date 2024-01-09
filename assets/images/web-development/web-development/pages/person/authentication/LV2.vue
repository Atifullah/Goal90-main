<template>
  <div id="identity-authentication">
    <LV2 />
  </div>
</template>
<script>
import LV2 from "@/components/person/IdentityAuthentication/Lv2Form.vue"
export default {
  components: {
    LV2,
  },
  computed: {
    selfRoute() {
      return this.$store.state.route
    }
  },

  beforeRouteEnter(to, from, next) {
    next()
    // next(vm => {
    //   console.log('too::::', from);
    //  if (vm.$userinfo.securitylevel == 0||vm.$userinfo.securitylevel >= 2) {
    //     return vm.$router.push(vm.selfRoute.authentication)
    //   } else {
    //     next();
    //   }
    // });
  },
}
</script>
  
<style lang="scss">
@import '@/assets/scss/pages/user-center/identity-authentication.scss';
</style>