<template>
    <div id="security-form">
        <changePassword />

    </div>
  </template>

  <script>
    import changePassword from "~/components/person/Security/SecuritySetting/changePassword.vue"

  export default {
    components: {
      changePassword
    }
    }
  </script>

  <style lang="scss">
    @import '@/assets/scss/pages/user-center/security-center.scss';
  </style>
