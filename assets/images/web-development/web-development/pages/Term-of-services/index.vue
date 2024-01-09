<template>
    <div id="user-agreement" class="main-content">
          <termOfService/>
    </div>
  </template>
  
  <script>
  import termOfService from '../../components/FooterModule/termOfService.vue';
  export default {
      components: {
        termOfService,
      }
  }
  </script>
  
  <style lang="scss">
  @import '@/assets/scss/pages/footer/user-agreement.scss';
  </style>
  