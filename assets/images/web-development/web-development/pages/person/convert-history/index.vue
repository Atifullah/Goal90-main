<template>
    <div id="security-form">
        <ConvertHistory />

    </div>
  </template>

  <script>
    import ConvertHistory from "@/components/person/Security/SecuritySetting/ConvertHistory.vue"

  export default {
    components: {
        ConvertHistory
    }
    }
  </script>

  <style lang="scss">
  @import '@/assets/scss/pages/user-center/security-center.scss';
  </style>
