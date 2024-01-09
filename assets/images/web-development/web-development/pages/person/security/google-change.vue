<template>
    <div id="security-form">
        <GoogleVerification />

    </div>
  </template>

  <script>
    import GoogleVerification from "@/components/person/Security/SecuritySetting/GoogleVerification.vue"

  export default {
    components: {
        GoogleVerification
    }
    }
  </script>

  <style lang="scss">
  @import '@/assets/scss/pages/user-center/security-center.scss';
  </style>
