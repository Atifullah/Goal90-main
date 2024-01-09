<template>
  <div id="app" :class="{'day': $store.state.hex_client_background.active === 'day'}" ref="app"> 
    <div class="content">
      <nuxt/>
    </div> 
    <Default></Default>
  </div>
</template>
<script>
  import  Default from '@/components/public/default'
  export default {
    name: 'error',
    data() {
      return {
        timer: null,
        title: ' BitNasdaq  | ',
      }
    },
    components: {
      Default: Default
    },
  } 
</script> 
<style lang="less" scoped>
  .content {
    overflow: auto;
    height: 100%;
  }
</style>
