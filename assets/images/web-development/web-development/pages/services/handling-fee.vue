<template>
    <div id="handling-fee">
      <HandlingFee />
    </div>
  </template>
  
  <script>
  import HandlingFee from '~/components/FooterModule/HandlingFee.vue'
  export default {
      components: {
          HandlingFee,
      }
  }
  </script>
  
  <style lang="scss">
  @import '@/assets/scss/pages/footer/handlingfee.scss';
  </style>