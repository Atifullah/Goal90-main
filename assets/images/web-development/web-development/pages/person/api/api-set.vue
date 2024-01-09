<template>
    <div id="security-form">
        <ApiSet />
    </div>
  </template>

  <script>
    import ApiSet from "@/components/person/Security/SecuritySetting/ApiSet.vue"

  export default {
    components: {
        ApiSet
    }
    }
  </script>

  <style lang="scss">
  @import '@/assets/scss/pages/user-center/security-center.scss';
  </style>
