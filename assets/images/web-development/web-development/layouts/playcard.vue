<template>
  <a-layout id="playcard-layout" :class="{ 'day': $store.state.hex_client_background.active === 'day' }" ref="app">
    <Default></Default>
    <hex-black-header/>
    <a-layout class="">
      <a-layout-content class="main-layout-content" ref="content">
        <div class="layout-content mb-3">
          <nuxt />
        </div>
      </a-layout-content>
      <hex-black-footer />
    </a-layout>
  </a-layout>
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
    Default: Default,
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
  mounted() {
    Vue.$scrollContent = this.$refs.content
  }
}
</script>
<style lang="scss">
@import '@/assets/scss/global/layouts/base';
</style>
