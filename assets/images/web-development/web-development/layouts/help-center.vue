<template>
  <a-layout id="dashbaord-layout" :class="{ 'day': $store.state.hex_client_background.active === 'day' }" ref="app">
    <Default></Default>
    <hex-header />
    <a-layout class="main-content mb-5">
      <a-layout-sider>
        <HelpCenterSidebar />
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
import HelpCenterSidebar from '@/components/public/HelpCenterSidebar.vue'
import Vue from 'vue'
import { mapActions } from 'vuex'
export default {
  name: 'error',
  data() {
    return {
      timer: null,
    }
  },
  components: {
    Default: Default,
    HelpCenterSidebar

  },
  watch: {
    '$store.state.message': function (msgobj) {
      this.show(msgobj)
    },

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


  methods: {
    ...mapActions('article', ['fetchArticleChannels']),
    show(msgobj) {
      this.$notify({
        group: 'hex-message-template',
        text: msgobj.text,
        type: msgobj.type,
      });
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
    // this.getEvent()
    //all ids are not confirmed yet might be chnaged in future

    const params = this.$route.params
    const channel = params.channel
    //console.log('help-center mounted', params)
    this.fetchArticleChannels({ channelID: channel })
  },



  beforeDestroy() {
    this.$socket.uninvoke(this.$socket.type.userevent)
  }
}
</script>
<style lang="scss">
@import '@/assets/scss/global/layouts/base';
</style>
