<template>
  <div id="new-download">
    <NewDownloads />
  </div>
</template>

<script>
  import NewDownloads from '@/components/Download/NewDownloads.vue'

export default {
components: {
    NewDownloads
}
}
</script>

<style lang="scss">
@import '@/assets/scss/pages/download/new-download.scss';
</style>