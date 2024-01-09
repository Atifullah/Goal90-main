<template>
  <a-layout id="dashbaord-layout" :class="{ 'day': $store.state.hex_client_background.active === 'day' }" ref="app">
    <Default></Default>
    <hex-header />
    <a-layout class="main-content mb-5 px-0">
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
import Default from '@/components/public/default'
import sidebar from '@/components/public/p2p-sidebar'
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
  watch: {
    '$store.state.message': function (msgobj) {
      this.show(msgobj)
    }
  },
  methods: {
    show(msgobj) {
      console.log('notify', this.$notify);

      // this.$notify({
      //   group: 'hex-message-template',
      //   text: msgobj.text,
      //   type: msgobj.type,
      // });
    },
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
    this.getEvent()
  },
  beforeDestroy() {
    this.$socket.uninvoke(this.$socket.type.userevent)
  }
}
</script>
<style lang="scss">
@import '@/assets/scss/global/layouts/base';
</style>
