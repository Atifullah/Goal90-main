<template>
    <div id="security-form">
        <changeEmail />

    </div>
  </template>

  <script>
    import changeEmail from "~/components/person/Security/SecuritySetting/changeEmail.vue"

  export default {
    components: {
      changeEmail
    }
    }
  </script>

  <style lang="scss">
  @import '@/assets/scss/pages/user-center/security-center.scss';
  </style>
