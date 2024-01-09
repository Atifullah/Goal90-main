<template>
  <div id="media-authenticator">
    <MediaAuthenticator />
  </div>

</template>

<script>
import MediaAuthenticator from '@/components/MediaAuthenticator/MediaAuthenticator.vue'
export default {
components: {
    MediaAuthenticator,
}
}
</script>

<style lang="scss">
@import '@/assets/scss/pages/media-authenticator/media-authenticator.scss';
</style>
