<template>
  <a-layout id="dashbaord-layout" :class="{ 'day': $store.state.hex_client_background.active === 'day' }" ref="app">
    <Default></Default>
    <hex-header />
    <a-layout class="main-content mb-3">
      <a-layout-sider>
        <Sidebar />
      </a-layout-sider>
      <a-layout-content class="main-layout-content bg-white" ref="content">
        <div class="main-content px-0">
          <div class="layout-content">
            <nuxt />
          </div>

        </div>
      </a-layout-content>
    </a-layout>
    <hex-footer />
  </a-layout>
</template>
<script>
import  Default from '@/components/public/default'
import sidebar from '@/components/public/sidebar'
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
    Default: Default,
    Sidebar: sidebar
  },
  head() {
    return {
      meta: [{
        name: 'description',
        content: this.$store.state.descriptionSeo
      },
    ],
    link: [   
      {rel:'canonical',href:this.$store.state.currentRouteSeo},
      { rel: 'alternate', href: this.$store.state.currentRouteSeo, hreflang: 'x-default' },
    { rel: 'alternate', href: this.$store.state.currentRouteSeo, hreflang: 'en' },
    { rel: 'alternate', href: this.$store.state.currentRouteSeo, hreflang: 'en-us' },
    { rel: 'alternate', href: this.$store.state.currentRouteSeo, hreflang: 'en-in' },
    { rel: 'alternate', href: this.$store.state.currentRouteSeo, hreflang: 'en-bd' },
    { rel: 'alternate', href: this.$store.state.currentRouteSeo, hreflang: 'en-sg' }
    ],
    title: this.$store.state.titleSeo
    }
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

  mounted() {
    Vue.$scrollContent = this.$refs.content
  }
}
</script>
<style lang="scss">
@import '@/assets/scss/global/layouts/base';
</style>
