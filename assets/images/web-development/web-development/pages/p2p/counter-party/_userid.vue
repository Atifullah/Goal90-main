<template>
    <div id="counter-party">
      <CounterParty />
    </div>
</template>
<script>
import CounterParty from '@/components/p2p/CounterParty/CounterParty.vue'
export default {
    components: {
        CounterParty,
    }
}
</script>

<style lang="scss">
@import '@/assets/scss/pages/p2p/counter-party.scss';

</style>
