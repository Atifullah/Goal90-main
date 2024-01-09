<template>

  <a-layout id="components-layout-demo-fixed" :class="{ 'day': $store.state.hex_client_background.active === 'day' }"
    ref="app">
    <h1 v-show="0">{{ $store.state.h1Seo }}</h1>
    <Default></Default>
    <hex-black-header v-if="showBlack" />
    <hex-header v-if="!showBlack && !hideNav" />
    <a-layout-content class="main-layout-content bg-white" ref="content">
      <div class="layout-content">
        <nuxt />
      </div>
    </a-layout-content>
    <hex-black-footer v-if="showBlack" />
    <hex-footer v-if="!showBlack && !hideNav" />
  </a-layout>
</template>
<script>
import Default from '@/components/public/default'
import Vue from 'vue'
import { isMobile, isTradeView } from '~/plugins/helpers'
import { mapGetters } from 'vuex'
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
  computed: {
    ...mapGetters('trade', ['getSymbolInfo']),
    showBlack() {
      if (this.$route.name == 'deal-id' || this.$route.name == 'margin-id' || this.$route.name == 'contract-id' || this.$route.name == 'deal-pro-id' || this.$route.name == 'margin-pro-id' || this.$route.name == 'contract-pro-id') {
        if (this.$store.state.hex_client_background.active === 'night') {
          return true
        }
      }
      return false
    },
    hideNav() {
      return this.$route.name == 'deals-pro-id' || this.$route.name == 'deals-id'
    }
  },
  watch: {
    '$route': {
      handler(to) {
        this.setSymbolInfosFromLocal()
        const currentRoute = this.$route.name
        if (process.client && navigator != undefined && navigator.userAgent.toLowerCase().includes('mobile') && currentRoute != 'services-downloads') {
          if (currentRoute == 'invite') {
            location.href = '/inviteMobile' + this.$route.query;
          } else if (currentRoute != 'inviteMobile' && currentRoute != 'registerMobile' && currentRoute != 'terms-sub_title') {
            location.href = '/services/downloads'
          }
        }

      },
      deep: true,
      immediate: true, // Trigger the handler immediately when the component is mounted
    },

    getSymbolInfo: function (val) {

      if (isTradeView(this) && val.descriptions) {

        this.getNewTradData()
      }
    }

  },
  mounted() {
    Vue.$scrollContent = this.$refs.content
    if (isTradeView(this)) {
      this.getNewTradData()
    }
    //this.getCommonMessage()

  },
  methods: {
    getNewTradData() {
      const _self = this
      const symbol = this.getSymbolInfo.descriptions.replace("/", "")
      this.$store.dispatch(this.$socket.url.quotation_trading_details_get, {
        symble: symbol,
        pageindex: 1,
        pagesize: 40
      }).then(({ data }) => {
        if (data) {
          data[0].symble = symbol
          this.$store.commit('trade/setSocketTradeDetail', { data: data })

          this.$store.commit('trade/setSocketTradeDetailData', data)
          console.log('data[0]data[0]', _self.$pubsub.changeNewMoney);

          _self.$pubsub.publish(_self.$pubsub.changeNewMoney, data[0]) //publishing new record
          _self.$socket.invoke({ //invoking socket for new record
            sub: "market." + symbol.toLowerCase() + ".trade.detail",
            type: _self.$socket.type.quotation_trading_details_get
          })

          this.$socket.receive(_self.$socket.type.quotation_trading_details_get, (res) => { //receiving socket for new record
            this.$store.commit('trade/setSocketTradeDetail', res)
            this.$store.commit('trade/setSocketTradeDetailData', res.data[0])
          })

          _self.$pubsub.subscribe(_self.$pubsub.changeNewMoney, (msg, response) => {
            // console.log('subscribers:: response', response); 
            const event = new CustomEvent("marketValueListener", { detail: response })
            document.dispatchEvent(event)
            this.$store.commit('market/setCurrentMarketPrice', {
              c: parseFloat(response.price).toFixed(this.getSymbolInfo.pricedigits),
              symble: symbol
            })
          })
        }
      });
    },
    async getCommonMessage() {
      const tokeninfo = {
        'token': '',
        'expire': new Date().getTime() - 10000000
      }
      var token_result = await this.$store.dispatch('gettoken', {});
      tokeninfo.token = token_result.data;
      tokeninfo.expire = new Date().getTime() + 2 * 3600000
      this.$store.commit('set_token', tokeninfo)
      if (this.$store.hex_uid.value) {
       // 用户信息
       const user_data = await this.$store.dispatch('user_getuserinfo');
       if (user_data.data) {
        this.$store.commit('set_server_user_info', user_data.data);
       }
      } 
    }
  },
}


</script>
<style lang="scss">
@import '@/assets/scss/global/layouts/base';
</style>
