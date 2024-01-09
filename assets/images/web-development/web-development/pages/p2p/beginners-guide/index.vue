<template>
  <div id="p2p-account">
    <BeginnersGuide />
  </div>
</template>

<script>
  import BeginnersGuide from "@/components/p2p/BeginnersGuide/BeginnersGuide.vue"

export default {
components: {
    BeginnersGuide,
}
}
</script>

<style lang="scss">
@import '@/assets/scss/pages/p2p/p2p-account.scss';
</style>
