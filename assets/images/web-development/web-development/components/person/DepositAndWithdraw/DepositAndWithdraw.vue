<template>
  <div class="trade-table1">
    <a-card class="deposit-card mb-3" :bordered="false">
      <a-row>
        <a-col :lg="24">
          <p class="deposit-withdraw-heading fw-5 mb-0">{{ $t('person.Spot_Account_person') }}</p>
          <p class="mb-0 margin-txt fw-5">{{ $t('person.gateway') }}</p>
        </a-col>
      </a-row>
    </a-card>
    <a-card class="deposit-card" :bordered="false">
      <a-row :gutter="16">
        <a-col :lg="24">
          <p class="total-blance fw-5 mb-1">{{ $t('wallet.totalAssets') }}

            <svg width="15" height="15" class="svg-icon ml-2 pointer" @click="toggleFundVisible">
              <use
                :xlink:href="$usersettings.moreconfig?.fundsvisible ? '/images/svg/sprite.svg#us-eye-icon' : '/images/svg/sprite.svg#us-eye-active-icon'">
              </use>
            </svg>
          </p>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :lg="18">

          <p class="deposit-blance fw-6 mb-1">
            {{ $usersettings.moreconfig?.fundsvisible ? totalAssets : '*******' }} BTC

            <span class="deposit-blance fw-4 mb-0 limit-txt">≈
              {{ $usersettings.moreconfig?.fundsvisible ? allTransition : '*******' }}
              {{ $store.state.hex_client_exchange.active.toUpperCase().toUpperCase() }}
            </span>
          </p>
          <p class="withdraw-txt fw-4 total-blance mb-0">
            {{ $t('wallet.todayMention') }}: {{ global_get_tofixed($userinfo.withdrawlimtperday) }} BTC
          </p>
        </a-col>
        <a-col :lg="3" align="end">
          <nuxt-link to="/person/send-recieve-crypto/receive-crypto"> <a-button class="outline-btn fw-5"
              block>{{ $t('person.Recieve_person') }}</a-button></nuxt-link>
        </a-col>
        <a-col :lg="3" align="end">
          <nuxt-link to="/person/send-recieve-crypto/send-crypto"><a-button class="outline-btn fw-5"
              block>{{ $t('person.Send_person') }}</a-button></nuxt-link>
        </a-col>
      </a-row>
    </a-card>
    <TradeTable :currencyData="currencyData" :getWalletInfo="getWalletInfo" :loading="loading" />
  </div>
</template>

<script>

import Table from "@/components/public/Assets/Table.vue"
export default {
  components: {
    TradeTable: Table
  },
  computed: {
    allTransition: function () {
      let alltransition = this.$store.getters.get_client_exchange_rate('btc', this.totalAssets);
      return alltransition;
    },
  },
  data() {
    return {
      currencyData: [],
      loading: true,
      totalAssets: 0
    }
  },
  methods: {
    setTotalAssets() {
      const _this = this;
      let allbtc = 0;
      let dataList = this.getAssetsInfos(this.currencyData, 1)
      if (this.currencyData.length > 0) {
        dataList.forEach((item) => {
          if (item.currency?.currencyname) {
            allbtc += this.$store.getters.get_btc_exchange_rate(item.currency.currencyname, item.totalamount)
            allbtc += this.$store.getters.get_btc_exchange_rate(item.currency.currencyname, item.lockamount)
          }
        })
      }
      _this.decimal = this.global_get_decimal('btc');
      this.totalAssets = this.global_get_tofixed(allbtc, _this.decimal.a);
    },
    getWalletInfo() {
      const _self = this;
      this.loading = true;
      _self.$store.dispatch('user_assets_get', {}).then(({
        data
      }) => {
        if (data) {
          //  const  updatedData=data.map((item)=>{
          //     item.currency=this.$store.state.currencyinfos.find(x=>x.id==item.currencyid)
          //     return item;
          //   }).reverse()
          //   this.currencyData = updatedData;
          console.log(data, "Data")
          const updatedData = this.$store.state.currencyinfos.map((citem) => {
            let apidata = data.find(item => item.currencyid === citem.id)
            if (apidata) {
              apidata.currency = citem;
              return apidata;
            }
            else {

              const data = {
                "totalamount": 0,
                "totalamountbtc": 0.00,
                "canuseamount": 0,
                "frozenamount": 0,
                "bbfrozen": 0,
                "financingamount": 0,
                "listsymble": null
              }
              data.currency = citem;
              return data;
            }
          }).filter(item => item != undefined)
          console.log(updatedData, "UpdatedDAta")
          this.currencyData = updatedData;
          this.setTotalAssets()
        }
        this.loading = false;
      })
    },
    toggleFundVisible() {

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

<style lang="scss"></style>
