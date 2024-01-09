<template>
  <div class="exchange-block_content clearfix">
    <div class="exchange-block_content_left left">
      <div class="exchange-block_tip clearfix">
        <span class="left">
          {{ $t('deal.usable') }}
          <span class="num number-value">
            {{ global_get_tofixed(tradingDealTo.canuseamount, symbleinfo.pricedigits) }}
            {{ symbleinfo.tcurrencyname }}
          </span>
        </span>
        <span class="right">
          <!-- 币币显示充值 -->
          <span class="exchange-block_recharge" @click="toRecharge(tradingDealTo)"
            v-if="$userinfo.uid && !(margin === 'margin')">
            {{ $t('wallet.recharge') }}
          </span>
          <!-- 杠杆显示余额 -->
          <span v-else-if="$userinfo.uid && margin === 'margin'">
            {{ $t('leverage.Balance') }}
            <span class="num"
              @click="copeEntrustBuyNum = global_get_tofixed(leverageCtidInfo.tamount / copeEntrustBuyRate, symbleinfo.amountdigits)">
              <a-tooltip class="tooltip-hover" style="border-bottom: 1px dashed rgb(20, 162, 165); cursor: pointer;">
                <template #title>
                  <span>{{ $t('leverage.clickbuytip') }} </span>
                </template>
                {{
                  leverageCtidInfo.tamount ? global_get_tofixed(leverageCtidInfo.tamount, symbleinfo.pricedigits) : 0
                }}
              </a-tooltip>
              {{ symbleinfo.tcurrencyname }}
            </span>
          </span>
          <!-- 未登陆显示需要登陆 -->
          <nuxt-link v-else to="/login" class="exchange-block_recharge" tag="span">{{
            $t("home.headLogin")
          }}</nuxt-link>
        </span>
      </div>
      <div>
        <div class="exchange-block_input  ipt_hover">
          <span class="before">{{ $t("deal.buyinRate") }}</span>
          <span class="after">{{ symbleinfo.tcurrencyname }}</span>
          <hex-number :fix="symbleinfo.pricedigits" @number:focus="showBuyPriceFocus" @number:blur="showBuyPriceFocus"
            :num.sync="copeEntrustBuyRate" class='ipt_hover'></hex-number>
          <span v-show="mostBuyPricePurchases" class="exchange-block_owner_tip">
            <span class="num">
              ≈<span>{{ getBuyClientRate }}</span>
              <span class="tip">{{ $store.state.hex_client_exchange.active.toUpperCase() }}</span>
            </span>
          </span>
        </div>
        <div class="exchange-block_input  ipt_hover">
          <span class="before">{{ $t("deal.purchases") }}</span>
          <span class="after">{{ symbleinfo.fcurrencyname }}</span>
          <hex-number :fix="symbleinfo.amountdigits" :num.sync="copeEntrustBuyNum" @number:focus="showBuyFocus"
            @number:blur="showBuyFocus" class='ipt_hover'></hex-number>
          <span v-show="mostBuyPurchases" class="exchange-block_owner_tip">
            <span class="num">≈ {{ clientExchangeRate(getBuyAmount) }} {{
              $store.state.hex_client_exchange.active.toUpperCase() }}</span>
          </span>
        </div>
        <hex-slider :dec="getbuydec" @slider:change="getEntrustBuyNum"></hex-slider>
      </div>
      <div class="exchange-block_tip tip_exchange">
        <span class="left">
          <span class="tip">{{ $t("deal.turnover") }}</span>
          <span class="num number-value">{{ getBuyAmount }} {{ symbleinfo.tcurrencyname }}</span>
        </span>
        <span class="right" v-show="margin == 'margin'">
          <span class="tip">{{ $t("deal.borrow") }}</span>
          <span class="num" :style="needborrowtamount > 0 ? 'color: #f6465d;' : ''">{{ needborrowtamount }} {{
            symbleinfo.tcurrencyname
          }}</span>
        </span>
      </div>
      <div class="exchange-block_button_buy" v-hex-loading="buyState" v-if="$userinfo.uid" @click="buyDeal"
        :class="{ 'exchange-block_button--unavailable': (buyState) }">
        {{ $t("memberCenter.buy") }}
        {{ margin === 'margin' ? $t('leverage.long') : '' }}
        {{ symbleinfo.fcurrencyname }}
      </div>
      <div class="exchange-block_button_buy no_login" v-else>
        <nuxt-link to="/login" tag="span" class="repeal">{{ $t("home.headLogin") }}</nuxt-link>
        /
        <nuxt-link to="/register" tag="span" class="repeal">{{ $t("home.headRegister") }}</nuxt-link>
      </div>
    </div>
    <div class="exchange-block_content_right right">
      <div class="exchange-block_tip clearfix">
        <span class="left">
          {{ $t('deal.usable') }}
          <span class="num number-value">
            {{ global_get_tofixed(tradingDealFrom.canuseamount, symbleinfo.amountdigits) }}
            {{ symbleinfo.fcurrencyname }}
          </span>
        </span>
        <span class="right">
          <!-- 币币显示充值 -->
          <span class="exchange-block_recharge" @click="toRecharge(tradingDealFrom)"
            v-if="$userinfo.uid && !(margin === 'margin')">
            {{ $t('wallet.recharge') }}
          </span>
          <!-- 杠杆显示余额 -->
          <span v-else-if="$userinfo.uid && margin === 'margin'">
            {{ $t('leverage.Balance') }}
            <span class="num"
              @click="copeEntrustSaleNum = global_get_tofixed(leverageCtidInfo.famount, symbleinfo.amountdigits)">
              <a-tooltip class="tooltip-hover" style="border-bottom: 1px dashed rgb(20, 162, 165); cursor: pointer;">
                <template #title>
                  <span>{{ $t('leverage.clicksaletip') }} </span>
                </template>
                {{
                  leverageCtidInfo.famount ? global_get_tofixed(leverageCtidInfo.famount, symbleinfo.amountdigits) : 0
                }}
              </a-tooltip>
              {{ symbleinfo.fcurrencyname }}
            </span>
          </span>
          <nuxt-link v-else to="/login" class="exchange-block_recharge" tag="span">{{ $t('home.headLogin') }}
          </nuxt-link>
        </span>
      </div>
      <div>
        <div class="exchange-block_input">
          <span class="before">{{ $t('deal.sellOutPrice') }}</span>
          <span class="after">{{ symbleinfo.tcurrencyname }}</span>
          <hex-number :fix="symbleinfo.pricedigits" @number:focus="showSalePriceFocus" @number:blur="showSalePriceFocus"
            :num.sync="copeEntrustSaleRate" class='ipt_hover'></hex-number>
          <span v-show="mostSalePricePurchases" class="exchange-block_owner_tip">
            <span class="num">
              ≈<span>{{ getSaleClientRate }}</span>
              <span class="tip">{{ $store.state.hex_client_exchange.active.toUpperCase() }}</span>
            </span>
          </span>
        </div>
        <div class="exchange-block_input">
          <span class="before">{{ $t('deal.sellQuantity') }}</span>
          <span class="after">{{ symbleinfo.fcurrencyname }}</span>
          <hex-number :fix="symbleinfo.amountdigits" :num.sync="copeEntrustSaleNum" @number:focus="showSaleFocus"
            @number:blur="showSaleFocus" class='ipt_hover'></hex-number>
          <span v-show="mostSaleAvailable" class="exchange-block_owner_tip">
            <span class="num">≈ {{ clientExchangeRate(getSaleAmount) }} {{
              $store.state.hex_client_exchange.active.toUpperCase() }}</span>
          </span>
        </div>
        <hex-slider :dec="getsaledec" @slider:change="getEntrustSaleNum"></hex-slider>
      </div>
      <div class="exchange-block_tip tip_exchange">
        <span class="left">
          <span class="tip"> {{ $t('deal.turnover') }}</span>
          <span class="num number-value">{{ getSaleAmount }} {{ symbleinfo.tcurrencyname }}</span>
        </span>
        <span class="right" v-show="margin == 'margin'">
          <span class="tip">{{ $t("deal.borrow") }}</span>
          <span class="num" :style="needborrowfamount > 0 ? 'color: #f6465d;' : ''">{{ needborrowfamount }} {{
            symbleinfo.fcurrencyname
          }}</span>
        </span>
      </div>
      <div class="exchange-block_button_sale" v-hex-loading="saleState" @click="saleDeal" v-if="$userinfo.uid"
        :class="{ 'exchange-block_button--unavailable': (saleState) }">
        {{ $t('deal.sellOut') }}{{ margin === 'margin' ? $t('leverage.short') : '' }} {{ symbleinfo.fcurrencyname }}
      </div>
      <div class="exchange-block_button_sale no_login" v-else>
        <nuxt-link to="/login" tag="span" class="repeal">{{ $t("home.headLogin") }}</nuxt-link>
        /
        <nuxt-link to="/register" tag="span" class="repeal">{{ $t('home.headRegister') }}</nuxt-link>
      </div>
    </div>
  </div>
</template>
<script>
import number from '@/components/public/number'
import slider from '@/components/public/slider'
export default {
  name: 'DealLimit',
  components: {
    'hex-number': number,
    'hex-slider': slider,
  },
  computed: {
    getbuydec() {
      if (!this.buyable) {
        return 0
      }
      
      return (this.copeEntrustBuyNum / this.buyable) * 100
    },
    getsaledec() {
      if (!this.tradingDealFrom.canuseamount) {
        return 0
      }
      return (this.copeEntrustSaleNum / this.tradingDealFrom.canuseamount) * 100
    },
    //获取本地货币汇率
    getBuyClientRate: function () {
      return this.$store.getters.get_client_exchange_rate(this.symbleinfo.tcurrencyname, this.copeEntrustBuyRate)
    },
    getSaleClientRate: function () {
      return this.$store.getters.get_client_exchange_rate(this.symbleinfo.tcurrencyname, this.copeEntrustSaleRate)
    },
    //设置买入交易额
    getBuyAmount: function () {
      const n = this.$np.times(this.copeEntrustBuyRate, this.copeEntrustBuyNum)
      return this.global_get_tofixed(n, this.symbleinfo.sumdigits);
    },
    needborrowtamount: function () {
      var needborrow = 0;
      if (this.margin == 'margin' && this.leverageCtidInfo.tamount != undefined && this.symbleinfo.pricedigits != undefined) {
        needborrow = this.global_get_tofixed(this.getBuyAmount - (this.leverageCtidInfo.tamount < 0 ? 0 : this.leverageCtidInfo.tamount), this.symbleinfo.pricedigits);
      }
      needborrow = needborrow <= 0 ? 0 : needborrow;
      return needborrow;
    },
    //设置卖出交易额
    getSaleAmount: function () {
      const n = this.$np.times(this.copeEntrustSaleRate, this.copeEntrustSaleNum)
      return this.global_get_tofixed(n, this.symbleinfo.sumdigits)
    },
    needborrowfamount: function () {
      var needborrow = 0;
      if (this.margin == 'margin' && this.leverageCtidInfo.famount != undefined && this.symbleinfo.pricedigits != undefined) {
        needborrow = this.global_get_tofixed(this.copeEntrustSaleNum - (this.leverageCtidInfo.famount < 0 ? 0 : this.leverageCtidInfo.famount), this.symbleinfo.amountdigits);
      }
      needborrow = needborrow <= 0 ? 0 : needborrow;
      return needborrow;
    },
    //计算可买量
    buyable: function () {
      const a = this.global_get_tofixed(this.tradingDealTo.canuseamount, this.symbleinfo.amountdigits)
      const num = Number(this.global_get_tofixed(this.$store.getters.get_to_from_exchange_rate(a, this.copeEntrustBuyRate), this.symbleinfo.amountdigits))
      console.log('num----', num)
      return num
    }
  },
  props: {
    symbleinfo: {
      type: Object,
      default: function () {
        return {}
      }
    },
    leverageCtidInfo: {
      type: Object,
      default: function () {
        return {}
      }
    },
    //买入卖出价
    entrustSaleRate: '',
    entrustBuyRate: '',
    //设置限价买入卖出量
    entrustBuyNum: '',
    entrustSaleNum: '',
    tradingDealFrom: {
      type: Object,
      default: function () {
        return {
          canuseamount: 0
        }
      }
    },
    tradingDealTo: {
      type: Object,
      default: function () {
        return {
          canuseamount: 0
        }
      }
    },
    margin: ''
  },
  watch: {
    'entrustBuyRate': function (val) {
      this.copeEntrustBuyRate = this.global_get_tofixed(val, this.symbleinfo.pricedigits)
    },
    'entrustSaleRate': function (val) {
      this.copeEntrustSaleRate = this.global_get_tofixed(val, this.symbleinfo.pricedigits)
    },
    'entrustBuyNum': function (val) {
      if (val == '--') {
        newval = 0;
      }
      let newval = val
      if (this.buyable < Number(val)) {
        newval = this.buyable
      }
      this.copeEntrustBuyNum = this.global_get_tofixed(newval, this.symbleinfo.amountdigits)
    },
    'entrustSaleNum': function (val) {
      if (val == '--') {
        newval = 0;
      }
      let newval = val
      const a = this.global_get_tofixed(this.tradingDealFrom.canuseamount, this.global_get_decimal(this.symbleinfo.fcurrencyname).a)
      if (a < Number(val)) {
        newval = a;
      }
      this.copeEntrustSaleNum = this.global_get_tofixed(newval, this.symbleinfo.amountdigits)
    }
  },
  data() {
    return {
      //下单状态
      buyState: false,
      saleState: false,
      //最多购买状态
      mostBuyPricePurchases: false,
      mostBuyPurchases: false,
      mostSaleAvailable: false,
      mostSalePricePurchases: false,
      copeEntrustBuyRate: this.entrustBuyRate,
      copeEntrustSaleRate: this.entrustSaleRate,
      copeEntrustBuyNum: this.entrustBuyNum,
      copeEntrustSaleNum: this.entrustSaleNum,
      buydecimals: 0,
      saledecimals: 0,
      refreshneedtime: 0,
      //订单数据模型
      dealModel: {
        ctid: '',
        ordertype: 1,
        direction: 1,
        price: 0,
        amount: 0,
        paypassword: '',
        ordersource: 1
      }
    }
  },
  mounted() {

  },
  subscribe() {
    return {
      //订阅下单状态
      changeDealState() {
        this.buyState = false
        this.saleState = false
      }
    }
  },
  created() {
  },
  methods: {
    formatTooltip(val) {
      return val + "%";
    },
    toRecharge(assets) {
      this.$router.push({ name: "person-wallet", params: { id: assets.currency.id } });
    },
    //设置买入量
    getEntrustBuyNum(num) {
     //console.log('num', num);
      const n = this.global_get_tofixed(this.buyable * num, this.symbleinfo.amountdigits)
      this.copeEntrustBuyNum = n
    },
    //设置卖出量
    getEntrustSaleNum(num) {
      this.saledecimals = num
      this.copeEntrustSaleNum = this.global_get_tofixed(this.tradingDealFrom.canuseamount * num, this.symbleinfo.amountdigits)
    },
    showBuyFocus() {
      this.mostBuyPurchases = !this.mostBuyPurchases
    },
    showBuyPriceFocus() {
      this.mostBuyPricePurchases = !this.mostBuyPricePurchases
    },
    showSalePriceFocus() {
      this.mostSalePricePurchases = !this.mostSalePricePurchases
    },
    showSaleFocus() {
      this.mostSaleAvailable = !this.mostSaleAvailable
    },
    //买入卖出交易
    buyDeal() {
      if (this.buyState) return
      this.buyState = true
      this.copeEntrustBuyNum = this.global_get_replace_dot(this.copeEntrustBuyNum)
      this.copeEntrustBuyRate = this.global_get_replace_dot(this.copeEntrustBuyRate)
      this.dealModel.ordertype = (this.margin == 'margin') ? 4 : 1;
      const dealModel = Object.assign({}, this.dealModel)
      dealModel.price = Number(this.copeEntrustBuyRate)
      dealModel.amount = Number(this.copeEntrustBuyNum)
      dealModel.ctid = this.symbleinfo.id.toString()
      if (Number(this.getBuyAmount) <= 0) {
        this.$store.commit('set_message', { type: 'error', text: this.$t('patch.volumeLzero') })
        this.buyState = false
        return
      }
      if (Number(this.copeEntrustBuyNum) > Number(this.buyable)) {
        this.$store.commit('set_message', { type: 'error', text: this.$t('patch.buyCount') })
        this.buyState = false
        return
      }
      var _self = this;
      this.$store.dispatch('trading_order_create', dealModel)
        .then((res) => {
          if (res.data) {
            /*发布*/
            _self.$pubsub.publish(_self.$pubsub.getOrderList)
            _self.$store.commit('set_message', { type: 'ok', text: res.msg })
            _self.copeEntrustBuyNum = 0;
          }
        })
        .then(() => {
          _self.buyState = false
        })
        .catch(() => {
          _self.buyState = false
        })
    },
    saleDeal() {
      if (this.saleState) return
      this.saleState = true
      this.dealModel.ordertype = (this.margin == 'margin') ? 4 : 1;
      const dealModel = Object.assign({}, this.dealModel)
      dealModel.price = Number(this.copeEntrustSaleRate)
      dealModel.amount = Number(this.copeEntrustSaleNum)
      dealModel.ctid = this.symbleinfo.id
      dealModel.direction = -1
      if (Number(this.getSaleAmount) <= 0) {
        this.$store.commit('set_message', { type: 'error', text: this.$t('patch.volumeLzero') })
        this.saleState = false
        return
      }
      if (Number(this.copeEntrustSaleNum) > Number(this.tradingDealFrom.canuseamount)) {
        this.$store.commit('set_message', { type: 'error', text: this.$t('patch.sellCount') })
        this.saleState = false
        return
      }
      var _self = this;
      this.$store.dispatch('trading_order_create', dealModel).then((res) => {
        if (res.data) {
          /*发布*/
          _self.$pubsub.publish(_self.$pubsub.getOrderList)
          _self.$store.commit('set_message', { type: 'ok', text: res.msg })
          _self.copeEntrustSaleNum = 0;
        }
      })
        .then(() => {
          _self.saleState = false
        })
        .catch(() => {
          _self.saleState = false
        })
    },
    clientExchangeRate: function (amount) {
      return this.global_get_tofixed(this.$store.getters.get_client_exchange_rate(this.symbleinfo.tcurrencyname, amount, this.$store.state.hex_client_exchange.active.toUpperCase()), 2);
    }
  }
}
</script>

