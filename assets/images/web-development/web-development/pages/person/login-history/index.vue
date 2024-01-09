<template>
    <div id="security-form">
        <LoginHistory />

    </div>
  </template>

  <script>
    import LoginHistory from "@/components/person/Security/SecuritySetting/LoginHistory.vue"

  export default {
    components: {
        LoginHistory
    }
    }
  </script>

  <style lang="scss">
  @import '@/assets/scss/pages/user-center/security-center.scss';
  </style>
