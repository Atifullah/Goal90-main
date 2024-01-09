<template>
    <div id="help-center">
      <HelpCenter />
    </div>
  </template>
  
  <script>
  import HelpCenter from '@/components/HelpCenter/HelpCenter.vue'
  export default {
  components: {
      HelpCenter 
  }
  }
  </script>
  
  <style lang="scss">
      @import '@/assets/scss/pages/help-center/help-center.scss';
  </style>