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
          <nuxt-link v-if="$userinfo.uid && !(margin === 'margin')" to="/person/wallet" class="exchange-block_recharge"
            tag="span">
            {{ $t('wallet.recharge') }}
          </nuxt-link>
          <!-- 杠杆显示余额 -->
          <span v-else-if="$userinfo.uid && margin === 'margin'">
            {{ $t('leverage.Balance') }}
            <span class="num"
              @click="marketEntrustBuyNum = global_get_tofixed(leverageCtidInfo.tamount, symbleinfo.pricedigits)">
              <a-tooltip class="tooltip-hover" style="border-bottom: 1px dashed rgb(20, 162, 165); cursor: pointer;">
                <template #title>
                  <span>{{ $t('leverage.clickbuytip') }} </span>
                </template>
                {{ leverageCtidInfo.tamount ? global_get_tofixed(leverageCtidInfo.tamount, symbleinfo.pricedigits) : 0 }}
              </a-tooltip>
              {{ symbleinfo.tcurrencyname }}
            </span>
          </span>
          <nuxt-link v-else to="/login" class="exchange-block_recharge" tag="span">{{
            $t('home.headLogin')
          }}</nuxt-link>
        </span>
      </div>
      <div>
        <div class="exchange-block_input  ipt_hover">
          <span class="before">{{ $t('deal.buyinRate') }}</span>
          <span class="after">{{ symbleinfo.tcurrencyname }}</span>
          <p class="market_tip">
            {{ $t('deal.markesell') }}
          </p>
        </div>
        <div class="exchange-block_input  ipt_hover">
          <span class="before">{{ $t('memberCenter.amount') }}</span>
          <span class="after">{{ symbleinfo.tcurrencyname }}</span>
          <hex-number :fix="symbleinfo.pricedigits" :num.sync="marketEntrustBuyNum" @number:focus="showBuyFocus"
            @number:blur="showBuyFocus" class='ipt_hover'></hex-number>
          <span v-show="mostBuyPurchases" class="exchange-block_owner_tip">≈
            <span class="num">
              {{ clientExchangeRate(marketEntrustBuyNum) }} {{ $store.state.hex_client_exchange.active.toUpperCase() }}
            </span></span>
        </div>
        <hex-slider :dec="getbuydec" @slider:change="getMarketEntrustBuyNum"></hex-slider>
      </div>
      <div class="exchange-block_tip tip_exchange">
        <span class="left">
          <span class="tip">{{ $t("deal.turnover") }} ≈</span>
          <span class="num number-value">
            {{ global_get_tofixed(marketEntrustBuyNum / lastprice, symbleinfo.amountdigits) }} {{ symbleinfo.fcurrencyname }}</span>
        </span>
        <span class="right" v-show="margin == 'margin'">
          <span class="tip">{{ $t("deal.borrow") }}</span>
          <span class="num" :style="needborrowtamount > 0 ? 'color: #f6465d;' : ''">
          {{ needborrowtamount }} {{ symbleinfo.tcurrencyname }}
          </span>
        </span>
      </div>
      <div class="exchange-block_button_buy" v-hex-loading="marketBuyState" @click="marketBuyDeal" v-if="$userinfo.uid"
        :class="{ 'exchange-block_button--unavailable': marketBuyState }">
        {{ $t('memberCenter.buy') }}{{ margin === 'margin' ? $t('leverage.long') : '' }} {{ symbleinfo.fcurrencyname }}
      </div>
      <div class="exchange-block_button_sale no_login" v-else>
        <nuxt-link to="/login" tag="span" class="repeal">{{ $t("home.headLogin") }}</nuxt-link>
        /
        <nuxt-link to="/register" tag="span" class="repeal">{{ $t('home.headRegister') }}</nuxt-link>
      </div>
    </div>
    <div class="exchange-block_content_right right">
      <div class="exchange-block_tip clearfix">
        <span class="left">
          {{ $t("deal.usable") }}
          <span class="num number-value">
            {{ global_get_tofixed(tradingDealFrom.canuseamount, symbleinfo.amountdigits) }}
            {{ symbleinfo.fcurrencyname }}
          </span>
        </span>
        <span class="right">
          <nuxt-link v-if="$userinfo.uid && !(margin === 'margin')" to="/person/wallet" class="exchange-block_recharge" tag="span">
            {{ $t('wallet.recharge') }}
          </nuxt-link>
          <!-- 杠杆显示余额 -->
          <span v-else-if="$userinfo.uid && margin === 'margin'">
            {{ $t('leverage.Balance') }}
            <span class="num"
              @click="marketEntrustSaleNum = global_get_tofixed(leverageCtidInfo.famount, symbleinfo.amountdigits)">
              <a-tooltip class="tooltip-hover" style="border-bottom: 1px dashed rgb(20, 162, 165); cursor: pointer;">
                <template #title>
                  <span>{{ $t('leverage.clicksaletip') }} </span>
                </template>
                {{ leverageCtidInfo.famount ? global_get_tofixed(leverageCtidInfo.famount, symbleinfo.amountdigits) : 0 }}
              </a-tooltip>
              {{ symbleinfo.fcurrencyname }}
            </span>
          </span>
          <nuxt-link v-else to="/login" class="exchange-block_recharge" tag="span">{{
            $t('home.headLogin')
          }}</nuxt-link>
        </span>
      </div>
      <div>
        <div class="exchange-block_input">
          <span class="before">{{ $t('deal.sellOutPrice') }}</span>
          <span class="after">{{ symbleinfo.tcurrencyname }}</span>
          <p class="market_tip">
            {{ $t('deal.markebuy') }}
          </p>
        </div>
        <div class="exchange-block_input">
          <span class="before">{{ $t('deal.sellQuantity') }}</span>
          <span class="after">{{ symbleinfo.fcurrencyname }}</span>
          <hex-number :fix="symbleinfo.amountdigits" @number:focus="showSaleFocus" @number:blur="showSaleFocus"
            :num.sync="marketEntrustSaleNum" class='ipt_hover'></hex-number>
          <span v-show="mostSaleAvailable" class="exchange-block_owner_tip">≈
            <span class="num">
              {{ clientExchangeRate(getSaleAmount) }} {{ $store.state.hex_client_exchange.active.toUpperCase() }}
            </span></span>
        </div>
        <hex-slider :dec="getsaledec" @slider:change="getMarketEntrustSaleNum"></hex-slider>
      </div>
      <div class="exchange-block_tip tip_exchange">
        <span class="left">
          <span class="tip">{{ $t("deal.turnover") }} ≈</span>
          <span class="num number-value">{{ getSaleAmount }} {{ symbleinfo.tcurrencyname }}</span>
        </span>
        <span class="right" v-show="margin == 'margin'">
          <span class="tip">{{ $t("deal.borrow") }}</span>
          <span class="num" :style="needborrowfamount > 0 ? 'color: #f6465d;' : ''">
            {{ needborrowfamount }} {{ symbleinfo.fcurrencyname }}</span>
        </span>
      </div>
      <div class="exchange-block_button_sale" v-hex-loading="marketSaleState" @click="marketSaleDeal" v-if="$userinfo.uid"
        :class="{ 'exchange-block_button--unavailable': marketSaleState }">
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
import hexNumber from '@/components/public/number'
import slider from '@/components/public/slider'
export default {
  name: 'Market',
  components: {
    'hex-number': hexNumber,
    'hex-slider': slider
  },
  computed: {
    buynum() {
      const num = this.$store.getters.get_to_from_exchange_rate(this.marketEntrustBuyNum, this.lastprice)
      return this.global_get_tofixed(num, this.symbleinfo.amountdigits)
    },
    sellnum() {
      const num = this.$store.getters.get_from_to_exchange_rate(this.marketEntrustSaleNum, this.lastprice)
      return this.global_get_tofixed(num, this.global_get_decimal(this.symbleinfo.tcurrencyname).a)
    },
    getbuydec() {
      if (!this.tradingDealTo.canuseamount) {
        return 0
      }
      return (this.marketEntrustBuyNum / this.tradingDealTo.canuseamount) * 100
    },
    getsaledec() {
      if (!this.tradingDealFrom.canuseamount) {
        return 0
      }
      return (this.marketEntrustSaleNum / this.tradingDealFrom.canuseamount) * 100
    },
    //设置买入交易额
    getBuyAmount: function () {
      return this.marketEntrustBuyNum == '' ? 0 : this.marketEntrustBuyNum;
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
      return this.global_get_tofixed(this.sellnum, this.symbleinfo.sumdigits)
    },
    needborrowfamount: function () {
      var needborrow = 0;
      if (this.margin == 'margin' && this.leverageCtidInfo.famount != undefined && this.symbleinfo.pricedigits != undefined) {
        needborrow = this.global_get_tofixed(this.getSaleAmount - (this.leverageCtidInfo.famount < 0 ? 0 : this.leverageCtidInfo.famount), this.symbleinfo.amountdigits);
      } 
      needborrow = needborrow <= 0 ? 0 : needborrow;
      return needborrow;
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
    margin: '',
    //买入卖出价
    entrustSaleRate: 0,
    entrustBuyRate: 0,
  },
  data() {
    return {
      mostBuyPurchases: false,
      mostSaleAvailable: false,
      marketBuyState: false,
      marketSaleState: false,
      //设置市价买入卖出量
      marketEntrustBuyNum: '',
      marketEntrustSaleNum: '',
      //订单数据模型
      dealModel: {
        ctid: '',
        ordertype: 2,
        direction: 1,
        price: 0,
        amount: 0,
        paypassword: '',
        ordersource: 1
      },
      lastprice: 0
    }
  },
  subscribe() {
    return {
      //订阅下单状态
      changeDealState() {
        this.marketBuyState = false
        this.marketSaleState = false
      },
      /*订阅最新价*/
      changeNewMoney(res) {
        if (res) {
          this.lastprice = res.price;
        }
      }
    }
  },
  mounted() {

  },
  methods: {
    showBuyFocus() {
      this.mostBuyPurchases = !this.mostBuyPurchases
    },
    showSaleFocus() {
      this.mostSaleAvailable = !this.mostSaleAvailable
    },
    //设置市价交易买入量
    getMarketEntrustBuyNum(num) {
      const n = this.$np.times(this.tradingDealTo.canuseamount, num)
      this.marketEntrustBuyNum = this.global_get_tofixed(n, this.symbleinfo.pricedigits)
    },
    //设置市价交易卖出量
    getMarketEntrustSaleNum(num) {
      const n = this.$np.times(this.tradingDealFrom.canuseamount, num)
      this.marketEntrustSaleNum = this.global_get_tofixed(n, this.symbleinfo.amountdigits)
    },
    //市价交易买入卖出
    marketBuyDeal() {
      if (this.marketBuyState) return
      this.marketBuyState = true
      this.dealModel.ordertype = (this.margin == 'margin') ? 6 : 2;
      const dealModel = Object.assign({}, this.dealModel)
      dealModel.amount = Number(this.marketEntrustBuyNum)
      dealModel.ctid = this.symbleinfo.id + "";
      if (Number(dealModel.amount) <= 0) {
        this.$store.commit('set_message', { type: 'error', text: this.$t('patch.countLzero') })
        this.marketBuyState = false
        return
      }
      if (Number(this.marketEntrustBuyNum) > Number(this.tradingDealTo.canuseamount)) {
        this.$store.commit('set_message', { type: 'error', text: this.$t('patch.buyLusable') })
        this.marketBuyState = false
        return
      }
      var _self = this;
      this.$store.dispatch('trading_order_create', dealModel)
        .then((res) => {
          if (res.data) {
            /*发布订阅*/
            _self.$pubsub.publish(_self.$pubsub.getOrderList)
            _self.$store.commit('set_message', { type: 'ok', text: res.msg })
            _self.marketEntrustBuyNum = 0;
          }
        })
        .then(() => {
          _self.marketBuyState = false
        })
        .catch(() => {
          _self.marketBuyState = false
        })
    },
    marketSaleDeal() {
      if (this.marketSaleState) return
      this.marketSaleState = true
      this.dealModel.ordertype = (this.margin == 'margin') ? 6 : 2;
      const dealModel = Object.assign({}, this.dealModel)
      dealModel.amount = Number(this.marketEntrustSaleNum)
      dealModel.ctid = this.symbleinfo.id + "";
      dealModel.direction = -1
      if (Number(dealModel.amount) <= 0) {
        this.$store.commit('set_message', { type: 'error', text: this.$t('patch.countLzero') })
        this.marketSaleState = false
        return
      }
      if (Number(this.marketEntrustSaleNum) > Number(this.tradingDealFrom.canuseamount)) {
        this.$store.commit('set_message', { type: 'error', text: this.$t('patch.sellCount') })
        this.marketSaleState = false
        return
      }
      var _self = this;
      this.$store.dispatch('trading_order_create', dealModel)
        .then((res) => {
          if (res.data) {
            /*下单实时更新用户资产和委托订单*/
            _self.$pubsub.publish(_self.$pubsub.getOrderList)
            _self.$store.commit('set_message', { type: 'ok', text: res.msg })
            _self.marketEntrustSaleNum = 0;
          }
        })
        .then(() => {
          _self.marketSaleState = false
        })
        .catch(() => {
          _self.marketSaleState = false
        })
    },
    clientExchangeRate: function (amount) {
      return this.global_get_tofixed(this.$store.getters.get_client_exchange_rate(this.symbleinfo.tcurrencyname, amount, this.$store.state.hex_client_exchange.active.toUpperCase()), 2);
    }
  }
}
</script>
