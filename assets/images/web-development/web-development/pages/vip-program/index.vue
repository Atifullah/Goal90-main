<template>
  <div class="vip">
    <Vip />
  </div>
</template>

<script>
import Vip from '@/components/VipProgram/Vip.vue'
export default {
    components: {
        Vip
    },
    // beforeRouteEnter(to, from, next) {
    //     next((vm) => {
    //       if (!vm.$userinfo.uid) {
    //         vm.$router.push('/login?returnurl=' + vm.$route.path)
    //       }
    //     })

    // },
}
</script>


<style lang="scss">
@import '@/assets/scss/pages/vip/vip.scss';
</style>
