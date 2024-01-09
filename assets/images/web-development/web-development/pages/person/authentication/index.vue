<template>
    <div id="identity-authentication">
      <IdentityAuthentication />
    </div>
  </template>
  <script>
  import IdentityAuthentication from "@/components/person/IdentityAuthentication/IdentityAuthentication"
  export default {
    components:{
      IdentityAuthentication,
    }
  }
  </script>
  
  <style lang="scss">
  @import '@/assets/scss/pages/user-center/identity-authentication.scss';
  </style>