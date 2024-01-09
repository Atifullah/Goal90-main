<template>
  <div class="p2p-account">
    <a-card class="deposit-card mb-3" :bordered="false">
      <a-row>
        <a-col :lg="24">
          <p class="deposit-withdraw-heading fw-5 mb-0">{{ $t('person.p2paccount') }}</p>
          <p class="mb-0 margin-txt fw-5">{{ $t('p2p.p2p22') }}</p>
        </a-col>
      </a-row>
    </a-card>
    <a-card class="deposit-card" :bordered="false">
      <a-row :gutter="16" class="col-alignment">
        <a-col :lg="14">
          <p class="total-blance fw-5 mb-0"><span> {{ $t('wallet.totalAssets') }} </span>
          
            <svg width="15" height="15" class="svg-icon ml-2 pointer" @click="toggleFundVisible">
                                    <use :xlink:href="$usersettings.moreconfig?.fundsvisible  ? '/images/svg/sprite.svg#us-eye-icon':'/images/svg/sprite.svg#us-eye-active-icon'"></use>
                                    </svg>
</p>
          <p class="deposit-blance fw-6 mb-0">
            {{$usersettings.moreconfig?.fundsvisible?totalAssets:'*******'}} BTC <span class="limit-txt fw-4">≈ {{$usersettings.moreconfig?.fundsvisible?allTransition:'*******'}}
              {{ $store.state.hex_client_exchange.active.toUpperCase().toUpperCase() }}</span>
          </p>
        </a-col>
        <a-col :lg="10" align="end">
          <nuxt-link to="/p2p/buy-and-sell"> <a-button
              class="outline-btn fw-5 mr-2">{{ $t('person.pi21') }}</a-button></nuxt-link>
          <a-button class="outline-btn fw-5 mt-1 mr-2" v-if="!$usersettings.moreconfig?.applyadv"
            @click="becomeMerchant">{{ $t('person.be_merchant') }}</a-button>
          <nuxt-link to="/p2p/post-new-add" v-else> <a-button
              class="outline-btn fw-5 mt-1  px-4">{{ $t('person.post_ad') }}</a-button></nuxt-link>

        </a-col>
      </a-row>
    </a-card>
    <TradeTable :currencyData="currencyData" :getWalletInfo="getWalletInfo" :loading="loading"/>
  </div>
</template>

<script>
import Table from "./Table.vue"

export default {
  components: {
    TradeTable: Table
  },
  computed: {
    totalAssets: function () {
      const _this = this;
      let allbtc = 0;
      console.log('this.currencyData', this.currencyData)
      this.currencyData.forEach((item) => {
        if (item.currency?.currencyname) {
          allbtc += this.$store.getters.get_btc_exchange_rate(item.currency.currencyname, item.totalamount)
          allbtc += this.$store.getters.get_btc_exchange_rate(item.currency.currencyname, item.lockamount)
      
        }
      });
      _this.decimal = this.global_get_decimal('btc');
      return this.global_get_tofixed(allbtc, _this.decimal.a);
    },
    allTransition: function () {
      let alltransition = this.$store.getters.get_client_exchange_rate('btc', this.totalAssets);
      return alltransition;
    },

  },
  data() {
    return {
      currencyData: [],
      currencyStatus: true,
      loading:true

    }
  },
  methods: {
    getWalletInfo() {
      const _self = this;
      this.currencyStatus = true;
      this.loading = true;
      _self.$store.dispatch('trading_user_c2c_userc2cassets_get', {}).then(({
        data
      }) => {
        if (data) {
          this.currencyData = data;
          /*是否是跳转过来的,展开充币、提币选项*/
          let openTab;
          let id;
          if (this.$route.params.id) {
            openTab = 'chargeMoney'
            id = this.$route.params.id
          } else if (this.$route.params.withdraw) {
            openTab = 'mentionMoney'
            id = this.$route.params.withdraw
          }
          // const id = this.$route.params.assetsid;
          if (id) {
            const active = data.find((item) => {
              return item.currency.id == id;
            })
            this.showDetailRow(active, openTab)
          }
        }
        this.currencyStatus = false;
        this.loading = false;
      })
    },
    becomeMerchant() {
      this.$router.push('/p2p/merchant')
    },
    toggleFundVisible(){
      
      this.$store.dispatch('user_user_settings_save', {
  moreConfig: {
    fundsVisible: !this.$usersettings.moreconfig.fundsvisible
  },
}).then(({
  data
}) => {
  if (data) {
    this.global_refresh_user_settings();
  }
})
}
  },
  mounted() {
    this.getWalletInfo();
  }
}
</script>

<style></style>
