<template>
  <div id="play-card">
    <PlayCard />
  </div>
</template>

<script>
import PlayCard from '~/components/PlayCard/PlayCard.vue'
export default {
  components: { PlayCard },
  layout: 'playcard',
}
</script>


<style lang="scss">
    @import '@/assets/scss/pages/play-card/play-card.scss';

</style>
