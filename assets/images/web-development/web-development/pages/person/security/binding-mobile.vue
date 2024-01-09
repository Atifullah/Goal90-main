<template>
    <div id="security-form">
        <changeMobile />

    </div>
  </template>

  <script>
    import changeMobile from "@/components/person/Security/SecuritySetting/changeMobile.vue"

  export default {
    components: {
        changeMobile
    }
    }
  </script>

  <style lang="scss">
  @import '@/assets/scss/pages/user-center/security-center.scss';
  </style>
