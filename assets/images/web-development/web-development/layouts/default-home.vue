<template>
  <div id="app" :class="{'day': $store.state.hex_client_background.active === 'day'}" ref="app" style="position:relative">
    <hex-header fromPage="home"/>
    <div class="content" v-bar ref="content">
      <div>
        <nuxt/>
      </div>
    </div>

    <Default></Default>
    <hex-footer/>

  </div>
</template>
<script>
  import  Default from '@/components/public/default'
  import Vue from 'vue'
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
    mounted() {
      Vue.$scrollContent = this.$refs.content
    }
  }
</script>
<style lang="less" scoped>
  .content {
    overflow: auto;
    height: 100%;
  }
</style>
