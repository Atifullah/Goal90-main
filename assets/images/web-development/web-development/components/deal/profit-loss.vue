<template>
  <div class="exchange-block_content clearfix exchange-block_profit-loss">
    <div class="exchange-block_content_left left">
      <p class="exchange-block_tip clearfix">
        <span class="left">
          {{ $t('deal.usable') }}
          <span class="num number-value">
            {{ global_get_tofixed(tradingDealTo.canuseamount, global_get_decimal(symbleinfo.tcurrencyname).a) }} {{
              symbleinfo.tcurrencyname }}
          </span>
        </span>
        <span class="right">
          <span class="exchange-block_recharge" @click="toRecharge(tradingDealTo)"
            v-if="$userinfo.uid && !(margin === 'margin')">
            {{ $t('wallet.recharge') }}
          </span>
          <!-- 杠杆显示余额 -->
          <span v-else-if="$userinfo.uid && margin === 'margin'">
            {{ $t('leverage.Balance') }}
            <span class="num"
              @click="copeEntrustBuyNum = global_get_tofixed(leverageCtidInfo.tamount, symbleinfo.pricedigits)"
              style="border-bottom: 1px dashed rgb(20, 162, 165); cursor: pointer;">
              <a-tooltip class="tooltip-hover">
                <template #title>
                  <span>{{ $t('leverage.clickbuytip') }} </span>
                </template>
                {{ leverageCtidInfo.tamount ? global_get_tofixed(leverageCtidInfo.tamount, symbleinfo.pricedigits) : 0 }}
                {{ symbleinfo.tcurrencyname }}
              </a-tooltip>
            </span>
          </span>
          <nuxt-link v-else to="/login" class="exchange-block_recharge" tag="span">{{ $t("home.headLogin") }}
          </nuxt-link>
        </span>
      </p>
      <div>
        <!--买入触发价-->
        <div class="exchange-block_input  ipt_hover">
          <span class="before">{{ $t("deal.trigger") }}</span>
          <span class="after">{{ symbleinfo.tcurrencyname }}</span>
          <hex-number :fix="symbleinfo.pricedigits" @number:focus="showBuyPriceFocus" @number:blur="showBuyPriceFocus"
            :num.sync="copeTriggerPriceBuy" class='ipt_hover'></hex-number>
        </div>
        <!--买入价-->
        <div class="exchange-block_input  ipt_hover">
          <a-row>
            <a-col span=19 v-if="copeEntrustBuyRate > 0">
              <span class="before">{{ $t("deal.buyinRate") }}</span>
              <span class="after">{{ symbleinfo.tcurrencyname }}</span>
              <hex-number :fix="symbleinfo.pricedigits" @number:focus="showBuyPriceFocus" @number:blur="showBuyPriceFocus"
                :num.sync="copeEntrustBuyRate" class='ipt_hover'></hex-number>
            </a-col>
            <a-col span=19 v-else>
              <span class="before">{{ $t('deal.buyinRate') }}</span>
              <span class="after">{{ symbleinfo.tcurrencyname }}</span>
              <p class="market_tip">
                {{ $t('deal.markesell') }}
              </p>
            </a-col>
            <a-col id="markettype" span=5>
              <a-select defaultValue="1" dropdown-class-name="sl_markettype" @change="sl_buy_Change">
                <a-select-option value="1">{{ $t('patch.LimitOrderShort') }}</a-select-option>
                <a-select-option value="2">{{ $t('patch.MarketOrderShort') }}</a-select-option>
              </a-select>
            </a-col>
          </a-row>
        </div>
        <!--买入量-->
        <div class="exchange-block_input  ipt_hover">
          <span class="before">{{ markettype_buy == 1 ? $t('deal.purchases') : $t("memberCenter.amount") }}</span>
          <span class="after">{{ markettype_buy == 1 ? symbleinfo.fcurrencyname : symbleinfo.tcurrencyname }}</span>
          <hex-number :fix="markettype_buy == 1 ? symbleinfo.amountdigits : symbleinfo.pricedigits" :num.sync="copeEntrustBuyNum" @number:focus="showBuyFocus"
            @number:blur="showBuyFocus" class='ipt_hover'></hex-number>
          <span v-show="mostBuyPurchases" class="exchange-block_owner_tip"> 
            <span class="num">≈  {{ clientExchangeRate(getBuyAmount) }} {{ $store.state.hex_client_exchange.active.toUpperCase() }}</span> 
          </span>
        </div>
        <hex-slider :dec="getbuydec" @slider:change="getEntrustBuyNum"></hex-slider>
      </div>
      <div class="exchange-block_tip tip_exchange">
        <span class="left">
          <span class="tip">{{ $t("deal.turnover") }}{{ markettype_buy == 1 ? "" : "≈" }}</span>
          <span class="num number-value" v-if="markettype_buy == 1">{{ getBuyAmount }} {{ symbleinfo.tcurrencyname }}</span>
          <span class="num number-value" v-else>
            {{ global_get_tofixed(getBuyAmount / lastprice, symbleinfo.amountdigits) }} 
            {{ symbleinfo.fcurrencyname }}</span>
        </span>
        <span class="right" v-show="margin == 'margin'">
          <span class="tip">{{ $t("deal.borrow") }}</span>
          <span class="num number-value" :style="needborrowtamount > 0 ? 'color: #f6465d;' : ''">{{ needborrowtamount }} {{
            symbleinfo.tcurrencyname }}</span>
        </span>
      </div>
      <div class="exchange-block_button_buy" v-hex-loading="profitLossBuyState" v-if="$userinfo.uid"
        @click="profitLossBuyDeal" :class="{ 'exchange-block_button--unavailable': (profitLossBuyState) }">
        {{ $t("memberCenter.buy") }} {{ margin === 'margin' ? $t('leverage.long') : '' }} {{ symbleinfo.fcurrencyname }}
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
            {{ global_get_tofixed(tradingDealFrom.canuseamount,
              symbleinfo.amountdigits)
            }} {{ symbleinfo.fcurrencyname }}
          </span>
        </span>
        <span class="right">
          <span class="exchange-block_recharge" @click="toRecharge(tradingDealFrom)"
            v-if="$userinfo.uid && !(margin === 'margin')">
            {{ $t('wallet.recharge') }}
          </span>
          <!-- 杠杆显示余额 -->
          <span v-else-if="$userinfo.uid && margin === 'margin'">
            {{ $t('leverage.Balance') }}
            <span class="num"
              @click="copeEntrustSaleNum = global_get_tofixed(leverageCtidInfo.famount, symbleinfo.amountdigits)"
              style="border-bottom: 1px dashed rgb(20, 162, 165); cursor: pointer;">
              <a-tooltip class="tooltip-hover">
                <template #title>
                  <span>{{ $t('leverage.clicksaletip') }} </span>
                </template>
                {{ leverageCtidInfo.famount ? global_get_tofixed(leverageCtidInfo.famount, symbleinfo.amountdigits) : 0 }}
                {{ symbleinfo.fcurrencyname }}
              </a-tooltip>
            </span>
          </span>
          <nuxt-link v-else to="/login" class="exchange-block_recharge" tag="span">{{ $t('home.headLogin') }}
          </nuxt-link></span>
      </div>
      <div>
        <!--卖出触发价-->
        <div class="exchange-block_input">
          <span class="before">{{ $t('deal.trigger') }}</span>
          <span class="after">{{ symbleinfo.tcurrencyname }}</span>
          <hex-number :fix="symbleinfo.pricedigits" @number:focus="showSalePriceFocus" @number:blur="showSalePriceFocus"
            :num.sync="copeTriggerPriceSale" class='ipt_hover'></hex-number>

        </div>
        <!--卖出价-->
        <div class="exchange-block_input">
          <a-row>
            <a-col span=19 v-if="copeEntrustSaleRate > 0">
              <span class="before">{{ $t('deal.sellOutPrice') }}</span>
              <span class="after">{{ symbleinfo.tcurrencyname }}</span>
              <hex-number :fix="symbleinfo.pricedigits" @number:focus="showSalePriceFocus"
                @number:blur="showSalePriceFocus" :num.sync="copeEntrustSaleRate" class='ipt_hover'></hex-number>
            </a-col>
            <a-col span=19 v-else>
              <span class="before">{{ $t('deal.sellOutPrice') }}</span>
              <span class="after">{{ symbleinfo.tcurrencyname }}</span>
              <p class="market_tip">
                {{ $t('deal.markebuy') }}
              </p>
            </a-col>
            <a-col id="markettype-right" span=5>
              <a-select defaultValue="1" class="markettype-right" dropdown-class-name="sl_markettype" @change="sl_sell_Change">
                <a-select-option value="1">{{ $t('patch.LimitOrderShort') }}</a-select-option>
                <a-select-option value="2">{{ $t('patch.MarketOrderShort') }}</a-select-option>
              </a-select>
            </a-col>
          </a-row>
        </div>
        <div class="exchange-block_input">
          <span class="before">{{ $t('deal.sellQuantity') }}</span>
          <span class="after">{{ symbleinfo.fcurrencyname }}</span>
          <hex-number :fix="symbleinfo.amountdigits" :num.sync="copeEntrustSaleNum" @number:focus="showSaleFocus"
            @number:blur="showSaleFocus" class='ipt_hover'></hex-number>
          <span v-show="mostSaleAvailable" class="exchange-block_owner_tip"> 
            <span class="num">
              {{ clientExchangeRate(getSaleAmount) }} {{ $store.state.hex_client_exchange.active.toUpperCase() }}
            </span>
          </span>
        </div>
        <hex-slider :dec="getsaledec" @slider:change="getEntrustSaleNum"></hex-slider>
      </div>
      <div class="exchange-block_tip tip_exchange">
        <span class="left">
          <span class="tip"> {{ $t('deal.turnover') }}{{ markettype_buy == 1 ? "" : " ≈" }}</span>
          <span class="num number-value">{{ getSaleAmount }} {{ symbleinfo.tcurrencyname }}</span>
        </span>
        <span class="right" v-show="margin == 'margin'">
          <span class="tip">{{ $t("deal.borrow") }}</span>
          <span class="num number-value" :style="needborrowfamount > 0 ? 'color: #f6465d;' : ''">{{ needborrowfamount }} {{
            symbleinfo.fcurrencyname }}</span>
        </span>
      </div>
      <div class="exchange-block_button_sale" v-hex-loading="profitLossSaleState" @click="profitLossSaleDeal"
        v-if="$userinfo.uid" :class="{ 'exchange-block_button--unavailable': (profitLossSaleState) }">
        {{ $t('deal.sellOut') }} {{ margin === 'margin' ? $t('leverage.short') : '' }} {{ symbleinfo.fcurrencyname }}
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
  name: 'profitLoss',
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
    /*根据最新价计算买入价的小数位数*/
    getnumfix() {
      const ratefix = 1 / parseFloat(this.lastprice)
      let fix
      if (ratefix >= 500) {
        fix = 8
      } else if (ratefix >= 100) {
        fix = 6
      } else if (ratefix >= 0) {
        fix = 4
      }
      return fix
    },
    /*根据买入价格的小数位数计算买入量的小数位数*/
    getnumfixbyprice: function () {
      const ratefix = 1 / parseFloat(this.copeEntrustBuyRate)
      return this.getfix(ratefix)
    },
    /*根据买入价格的小数位数计算买入量的小数位数*/
    getnumfixbypricesell: function () {
      const ratefix = 1 / parseFloat(this.copeEntrustSaleRate)
      return this.getfix(ratefix)
    }, 
    //设置买入交易额
    getBuyAmount: function () {
      if (this.markettype_buy == 1) {
        const n = this.$np.times(this.copeEntrustBuyRate, this.copeEntrustBuyNum)
        return this.global_get_tofixed(n, this.symbleinfo.sumdigits)
      } else {
        return this.global_get_tofixed(this.copeEntrustBuyNum, this.symbleinfo.sumdigits)
      }
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
      const n = this.$np.times(this.markettype_buy == 1 ? this.copeEntrustBuyRate : this.lastprice, this.copeEntrustSaleNum)
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
      const a = this.global_get_tofixed(this.tradingDealTo.canuseamount, this.symbleinfo.pricedigits)
      if (this.markettype_buy == 1) {
        const num = this.global_get_tofixed(this.$store.getters.get_to_from_exchange_rate(a, this.copeEntrustBuyRate), this.symbleinfo.sumdigits)
        return num
      } else {
        return a;
      }
    },
    //计算可得量
    buyAvailable: function () {
      const a = this.global_get_tofixed(this.tradingDealFrom.canuseamount, this.symbleinfo.pricedigits)
      return this.global_get_tofixed(this.$store.getters.get_from_to_exchange_rate(a, this.copeEntrustSaleRate), this.symbleinfo.sumdigits)
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
    //触发价
    triggerPriceBuy: '',
    triggerPriceSale: '',
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
    'triggerPriceBuy': function (val) {
      this.copeTriggerPriceBuy = this.global_get_tofixed(val, this.symbleinfo.pricedigits)
    },
    'triggerPriceSale': function (val) {
      this.copeTriggerPriceSale = this.global_get_tofixed(val, this.symbleinfo.pricedigits)
    },
    'entrustBuyRate': function (val) {
      this.copeEntrustBuyRate = this.global_get_tofixed(val, this.symbleinfo.pricedigits)
    },
    'entrustSaleRate': function (val) {
      this.copeEntrustSaleRate = this.global_get_tofixed(val, this.symbleinfo.pricedigits)
    },
    'entrustBuyNum': function (val) {
      let newval = val
      if (Number(this.buyable) < Number(val)) {
        newval = this.buyable
      }
      this.copeEntrustBuyNum = this.global_get_tofixed(newval, this.symbleinfo.amountdigits)
    },
    'entrustSaleNum': function (val) {
      let newval = val
      if (Number(this.tradingDealFrom.canuseamount) < Number(val)) {
        newval = this.tradingDealFrom.canuseamount
      }
      this.copeEntrustSaleNum = this.global_get_tofixed(newval, this.symbleinfo.amountdigits)
    }
  },
  data() {
    return {
      //下单状态
      profitLossBuyState: false,
      profitLossSaleState: false,
      //最多购买状态
      mostBuyPricePurchases: false,
      mostBuyPurchases: false,
      mostSaleAvailable: false,
      mostSalePricePurchases: false,
      copeTriggerPriceBuy: this.triggerPriceBuy,
      copeTriggerPriceSale: this.triggerPriceSale,
      copeEntrustBuyRate: this.entrustBuyRate,
      copeEntrustSaleRate: this.entrustSaleRate,
      copeEntrustBuyNum: this.entrustBuyNum,
      copeEntrustSaleNum: this.entrustSaleNum,
      buydecimals: 0,
      saledecimals: 0,
      //订单数据模型
      dealModel: {
        ctid: '',
        ordertype: 3,
        direction: 1,
        price: 0,
        amount: 0,
        paypassword: '',
        ordersource: 1,
        triggerprice: 0
      },
      lastprice: 0,
      markettype_buy: 1, //默认买限价
      markettype_sell: 1//默认卖限价  
    }
  },
  mounted() {

  },
  subscribe() {
    return {
      //订阅下单状态
      changeDealState() {
        this.profitLossBuyState = false
        this.profitLossSaleState = false
      },
      /*订阅最新价*/
      changeNewMoney(res) {
        if (res) {
          this.lastprice = res.price;
        }
      }
    }
  },
  created() {
  },
  methods: {
    sl_buy_Change(val) {
      this.markettype_buy = val;
      this.copeEntrustBuyNum = 0;
      if (val == 1) {
        this.copeEntrustBuyRate = this.entrustBuyRate;
      } else {
        this.copeEntrustBuyRate = 0;
      }
    },
    sl_sell_Change(val) {
      this.markettype_sell = val;
      if (val == 1) {
        this.copeEntrustSaleRate = this.entrustBuyRate;
      } else {
        this.copeEntrustSaleRate = 0;
      }
    },
    getfix(val) {
      let fix
      if (val >= 500) {
        fix = 2
      } else if (val >= 100) {
        fix = 3
      } else if (val >= 0) {
        fix = 4
      }
      return fix
    },
    formatTooltip(val) {
      return val + "%";
    },
    toRecharge(assets) {
      this.$router.push({ name: "person-wallet", params: { id: assets.currency.id } });
    },
    //设置买入量
    getEntrustBuyNum(num) {
      if (this.markettype_buy == 1) {
        this.copeEntrustBuyNum = this.global_get_tofixed(this.buyable * num, this.symbleinfo.amountdigits)
      } else {
        this.copeEntrustBuyNum = this.global_get_tofixed(this.buyable * num, this.symbleinfo.pricedigits)
      }
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
    profitLossBuyDeal() {
      if (this.profitLossBuyState) return
      this.profitLossBuyState = true
      this.copeEntrustBuyNum = this.global_get_replace_dot(this.copeEntrustBuyNum)
      this.copeEntrustBuyRate = this.global_get_replace_dot(this.copeEntrustBuyRate)
      this.dealModel.ordertype = (this.margin == 'margin') ? 5 : 3;
      const dealModel = Object.assign({}, this.dealModel)
      dealModel.price = Number(this.copeEntrustBuyRate)
      dealModel.triggerprice = Number(this.copeTriggerPriceBuy)
      dealModel.amount = Number(this.copeEntrustBuyNum)
      dealModel.ctid = this.symbleinfo.id + ""
      if (Number(this.getBuyAmount) <= 0) {
        this.$store.commit('set_message', { type: 'error', text: this.$t('patch.volumeLzero') })
        this.profitLossBuyState = false
        return
      }
      if (Number(this.copeEntrustBuyNum) > Number(this.buyable)) {
        this.$store.commit('set_message', { type: 'error', text: this.$t('patch.buyCount') })
        this.profitLossBuyState = false
        return
      }
      this.$store.dispatch('trading_order_create', dealModel)
        .then((res) => {
          if (res.data) {
            /*发布*/
            this.$pubsub.publish(this.$pubsub.getOrderList)
            this.$store.commit('set_message', { type: 'ok', text: res.msg })
            this.copeEntrustBuyNum = 0
          }
        })
        .then(() => {
          this.profitLossBuyState = false
        })
        .catch(() => {
          this.profitLossBuyState = false
        })
    },
    profitLossSaleDeal() {
      if (this.profitLossSaleState) return
      this.profitLossSaleState = true
      this.dealModel.ordertype = (this.margin == 'margin') ? 5 : 3;
      const dealModel = Object.assign({}, this.dealModel)
      dealModel.price = Number(this.copeEntrustSaleRate)
      dealModel.triggerprice = Number(this.copeTriggerPriceSale)
      dealModel.amount = Number(this.copeEntrustSaleNum)
      dealModel.ctid = this.symbleinfo.id + ""
      dealModel.direction = -1
      if (Number(this.getSaleAmount) <= 0) {
        this.$store.commit('set_message', { type: 'error', text: this.$t('patch.volumeLzero') })
        this.profitLossSaleState = false
        return
      }
      if (Number(this.copeEntrustSaleNum) > Number(this.tradingDealFrom.canuseamount)) {
        this.$store.commit('set_message', { type: 'error', text: this.$t('patch.sellCount') })
        this.profitLossSaleState = false
        return
      }
      this.$store.dispatch('trading_order_create', dealModel)
        .then((res) => {
          if (res.data) {
            /*发布*/
            this.$pubsub.publish(this.$pubsub.getOrderList)
            this.$store.commit('set_message', { type: 'ok', text: res.msg })
            this.copeEntrustSaleNum = 0;
          }
        })
        .then(() => {
          this.profitLossSaleState = false
        })
        .catch(() => {
          this.profitLossSaleState = false
        })
    },
    clientExchangeRate: function (amount) {
      return this.global_get_tofixed(this.$store.getters.get_client_exchange_rate(this.symbleinfo.tcurrencyname, amount, this.$store.state.hex_client_exchange.active.toUpperCase()),2);
    }
  }
}
</script>
<style lang="less" scoped>
.exchange-block_profit-loss {
  .exchange-block_input {
    margin-bottom: 20px !important;
  }

  .exchange-block_slider {
    margin: 24px 4px 0px 4px;
    padding-bottom: 10px;
  }
}

/deep/ .ant-select {
  width: 100%;
  height: 37px;
  vertical-align: top;
  text-align: center;
  background: transparent;
  border: none !important;
  cursor: pointer;
  outline: none;
  border-radius: 0;

  .ant-select-selection {
    border-radius: 0;
    background: transparent !important;
    height: 100%;
    border: 0px;
    outline: none;

    .ant-select-selection-selected-value {
      color: #B7BDC6;
      height: 37px;
      line-height: 37px;
    }

    .ant-select-arrow {
      color: #B7BDC6;
    }

  }
}</style>
