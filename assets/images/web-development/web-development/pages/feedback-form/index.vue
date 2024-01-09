<template>
  <div id="submit-feedback" class="main-content">
    <FeedBackForm />

  </div>
</template>

<script>
import FeedBackForm from '@/components/SubmitFeedBack/FeedBackForm.vue'
export default {
components: {
    FeedBackForm
}
}
</script>

<style lang="scss">
@import '@/assets/scss/pages/submit-feedback/feedback.scss';
</style>
