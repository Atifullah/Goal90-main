<template>
    <div class="all-notifications-page">
      <AllNotification />
    </div>
  </template>

  <script>
  import AllNotification from "@/components/AllNotification/AllNotification.vue"
  export default {
    components:{
        AllNotification
    }

  }
  </script>


<style lang="scss">
@import '@/assets/scss/pages/all-notification/all-notification.scss';
</style>
