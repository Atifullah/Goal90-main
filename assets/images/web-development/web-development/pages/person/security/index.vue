<template>
    <div id="security-center">
      <SecuritySetting />
    </div>
  </template>

  <script>
  import SecuritySetting from "@/components/person/Security/SecuritySetting/SecuritySetting.vue"
  export default {
    components:{
        SecuritySetting
    }

  }
  </script>


<style lang="scss">
@import '@/assets/scss/pages/user-center/security-center.scss';
</style>
