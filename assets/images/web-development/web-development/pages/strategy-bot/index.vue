<template>
  <div id="strategy-bot">
    <StrategyBot />
  </div>
</template>

<script>
import StrategyBot from '@/components/deal/StrategyBot.vue'
export default {
components: {
    StrategyBot,
}
}
</script>


<style lang="scss">
@import '@/assets/scss/pages/p2p/strategy-bot.scss';
</style>
