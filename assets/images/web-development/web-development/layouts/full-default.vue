<template>
  <div id="app" class="full" :class="{ 'day': $store.state.hex_client_background.active === 'day' }" ref="app"
    style="position:relative">
    <div class="content" v-bar ref="content">
      <nuxt />
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

  watch: {
    '$route': {
      handler(to) {
        const currentRoute = this.$route.name
        if (process.client && navigator != undefined && window.innerWidth <= 540 && currentRoute != 'services-downloads') {
          location.href = '/services/downloads'
        }
      },
      deep: true,
      immediate: true, // Trigger the handler immediately when the component is mounted
    },
  },
} 
</script>