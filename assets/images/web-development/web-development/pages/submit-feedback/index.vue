<template>
  <div class="submit-feedback">
    <FeedBack />
  </div>
</template>

<script>
import FeedBack from '@/components/SubmitFeedBack/FeedBack.vue'
export default {
components: {
    FeedBack,
}
}
</script>

<style lang="scss">
@import '@/assets/scss/pages/submit-feedback/feedback.scss';
</style>
