<template>
    <div id="api">
      <CommingSoon />
    </div>
  </template>
  
  <script>
  import CommingSoon from '@/components/FooterModule/CommingSoon.vue'
  export default {
      components: {
        CommingSoon
      },
      data() {
        return {
          IsAvailable : false
        }
      },
  }
  </script>
  
  <style lang="scss">
  /* @import '@/assets/scss/pages/footer/bug-bounty.scss'; */
  </style>