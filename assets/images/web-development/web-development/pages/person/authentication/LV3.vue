<template>
  <div id="identity-authentication">
    <LV3 />
  </div>
</template>
<script>
import LV3 from "@/components/person/IdentityAuthentication/Lv3Form.vue"
export default {
  components: {
    LV3,
  },
  computed: {
    selfRoute() {
      return this.$store.state.route
    }
  },

  beforeRouteEnter(to, from, next) {
    next(vm => {
      console.log('too::::', from);
      if (vm.$userinfo.securitylevel == 0||vm.$userinfo.securitylevel == 3) {
        return vm.$router.push(vm.selfRoute.authentication)
      } else {
        next();
      }
    });
  },
}
</script>
  
<style lang="scss">
@import '@/assets/scss/pages/user-center/identity-authentication.scss';
</style>