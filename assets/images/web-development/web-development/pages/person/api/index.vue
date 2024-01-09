<template>
    <div id="security-form">
        <Api />

    </div>
  </template>

  <script>
    import Api from "@/components/person/Security/SecuritySetting/Api.vue"

  export default {
    components: {
        Api
    }
    }
  </script>

  <style lang="scss">
  @import '@/assets/scss/pages/user-center/security-center.scss';
  </style>
