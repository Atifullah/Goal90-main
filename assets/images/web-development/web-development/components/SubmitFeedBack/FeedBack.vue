<template>
  <div class="">
    <div class="feedback-header">
        <p class="feedback-heading fw-5 text-center mb-2">{{$t('feedback.fdb1')}}</p>
        <p class="feedback-desc fw-5 text-center">{{$t('feedback.fdb2')}}</p>
    </div>
    <div class="main-content" id="submit-feedback">
        <a-row>
            <SubmitCard />
        </a-row>

    </div>
  </div>
</template>

<script>
import SubmitCard from './SubmitCard.vue'
export default {
components: {
    SubmitCard,
}
}
</script>

<style>

</style>
