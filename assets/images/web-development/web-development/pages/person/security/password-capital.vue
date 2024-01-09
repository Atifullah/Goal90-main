<template>
  <div id="security-form">
    <ChangeFundPassword />

  </div>
</template>

<script>
import ChangeFundPassword from '~/components/person/Security/SecuritySetting/changeFundPassword';

export default {
  components: {
    ChangeFundPassword
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/pages/user-center/security-center.scss';
</style>