<template>
    <div id="user-agreement" class="main-content">
          <PrivacyPolicy />
    </div>
  </template>
  
  <script>
 import PrivacyPolicy from '../../components/FooterModule/PrivacyPolicy.vue';
  export default {
      components: {
        PrivacyPolicy,
      }
  }
  </script>
  
  <style lang="scss">
  @import '@/assets/scss/pages/footer/user-agreement.scss';
  </style>
  