<template>
    <a-card class="deposit-card" :bordered="false">
      <a-row :gutter="16">
        <a-col :lg="5"
          ><p class="total-blance fw-5 mb-0">{{$t('wallet.totalAssets')}}</p>
          <p class="deposit-blance fw-6 mb-0">
            {{totalAssets}} BTC
          </p>
        </a-col>
        <a-col :lg="19"
          ><p class="withdraw-txt fw-4 total-blance mb-0">
            {{$t('wallet.todayMention')}}：{{global_get_tofixed($userinfo.withdrawlimtperday)}} BTC
          </p>
          <p class="deposit-blance fw-4 mb-0 limit-txt">≈{{allTransition}} {{$store.state.hex_client_exchange.active.toUpperCase().toUpperCase()}}</p>
        </a-col>
      </a-row>
    </a-card>
</template>

<script>
export default {
  computed: {
    totalAssets: function() {
      const _this = this;
      let allbtc = 0;
      this.currencyData.forEach((item) => {
        allbtc += this.$store.getters.get_btc_exchange_rate(item.currency.currencyname, item.totalamount)
        allbtc += this.$store.getters.get_btc_exchange_rate(item.currency.currencyname, item.lockamount)
      });
      _this.decimal = this.global_get_decimal('btc');
      return this.global_get_tofixed(allbtc, _this.decimal.a);
    },
    allTransition: function() {
      let alltransition = this.$store.getters.get_client_exchange_rate('btc', this.totalAssets);
      return alltransition;
    },
  },
  data(){
    return{
      currencyData:[]
    }
  },
  methods:{
    getWalletInfo() {
      const _self = this;
      _self.$store.dispatch('user_assets_get', {}).then(({
        data
      }) => {
        if (data) {
          const  updatedData=data.map((item)=>{
            item.currency=this.$store.state.currencyinfos.find(x=>x.id==item.currencyid)
            return item;
          })  
          this.currencyData = updatedData;
        }
      })
    },
  },
  mounted() {
    this.getWalletInfo();
  }

}
</script>
