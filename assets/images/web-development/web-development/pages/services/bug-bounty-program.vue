<template>
    <div id="bug-bounty">
      <span v-if="IsAvailable"><BugBounty /></span>
      <span v-else ><CommingSoon /></span>
    </div>
  </template>
  
  <script>
  import BugBounty from '@/components/FooterModule/BugBounty.vue'
  import CommingSoon from '@/components/FooterModule/CommingSoon.vue'
  export default {
      components: {
        BugBounty,
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
  @import '@/assets/scss/pages/footer/bug-bounty.scss';
  </style>