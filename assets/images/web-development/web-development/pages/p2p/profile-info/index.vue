<template>
  <div id="counter-party">
    <ProfileInfo />
  </div>
</template>

<script>
import ProfileInfo from '@/components/p2p/ProfileInfo/ProfileInfo.vue'
export default {
    components: {
        ProfileInfo,
    }
}
</script>

<style lang="scss">
@import '@/assets/scss/pages/p2p/counter-party.scss';
</style>
