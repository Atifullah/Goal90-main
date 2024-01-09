<template>
  <div id="exchangeBlock">
    <div v-show="activeKey == 1">
      <a-form-model ref="exchangeBlock" :hide-required-mark="true" label-align="left">
        <a-row :gutter="16" class="mx-2 ">
          <a-col :lg="24">
            <a-row :gutter="16">
              <a-col :lg="9">
                <p class="available-blance fw-5 mb-0">
                  <span class="tip available-balance">
                    <AppTooltip :title="$t('details.det17')" :text="$t('deal.usable')" />
                  </span>
                  <img src="/images/arrow-2.svg" class="pl-2 cursor" @click="showPopTrasfer()" />
                </p>
              </a-col>
              <a-col :lg="15" align="end">
                <p class="available-blance fw-5 usdt-txt mb-0">
                  <span class="num">
                    {{ global_get_tofixed(tradingDealTo.canuseamount, global_get_decimal(symbleinfo.tcurrencyname).a) }}
                    {{ symbleinfo.tcurrencyname }}
                  </span>
                </p>
              </a-col>
            </a-row>
          </a-col>
          <a-col :lg="24">
            <div class="exchange-block_input mt-2">
              <AppNumber :hasArrow="true" :fix="symbleinfo.pricedigits" @number:focus="showBuyPriceFocus"
                :before="$t('deal.trigger')" :after="symbleinfo.tcurrencyname" @number:blur="showBuyPriceFocus"
                :num.sync="copeTriggerPriceBuy" />
            </div>
          </a-col>
          <a-col :lg="24">

            <div class="exchange-block_input mt-3">
              <a-row>
                <a-col span=16 v-if="copeEntrustBuyRate > 0">
                  <AppNumber :hasArrow="true" :fix="symbleinfo.pricedigits" @number:focus="showBuyPriceFocus"
                    :before="$t('deal.buyinRate')" @number:blur="showBuyPriceFocus" :num.sync="copeEntrustBuyRate" />
                </a-col>
                <a-col span=16 v-else>
                  <div class="exchange-block_input best-market  ipt_hover">

                    <p class="market_tip fw-5">
                      {{ $t('deal.markesell') }}
                    </p>

                  </div>
                </a-col>
                <a-col span=8 class="pl-2">
                  <div id="buy-limit-market">
                    <a-select defaultValue="1" dropdown-class-name="sl_markettype" @change="sl_buy_Change">
                      <a-select-option value="1">{{ $t('patch.LimitOrderShort') }}</a-select-option>
                      <a-select-option value="2">{{ $t('patch.MarketOrderShort') }}</a-select-option>
                    </a-select>
                  </div>
                </a-col>
              </a-row>
            </div>
          </a-col>
          <a-col :lg="24">
            <div class="exchange-block_input mt-3">
              <AppNumber :hasArrow="true" :fix="markettype_buy == 1 ? symbleinfo.amountdigits : symbleinfo.pricedigits" :num.sync="copeEntrustBuyNum"
                @number:focus="showBuyFocus" @number:blur="showBuyFocus" :before="markettype_buy == 1 ? $t('deal.purchases') : $t('memberCenter.amount')"
                :after="markettype_buy == 1 ? symbleinfo.fcurrencyname : symbleinfo.tcurrencyname" :max="buyable" />
            </div>
            <p class="available-blance fw-5 mb-0" v-show="needborrowtamount > 0" style="height:30px;line-height:30px;">
              <span class="tip">{{ $t("deal.borrow") }}</span>
              <span class="num" style="color: #f6465d;float: right;">
                {{ needborrowtamount }} {{ symbleinfo.tcurrencyname }}
              </span>
            </p>
          </a-col>
          <a-col :lg="24">
            <hex-slider :dec="getbuydec" @slider:change="getEntrustBuyNum"></hex-slider>
          </a-col>
          <a-col :lg="24" v-if="markettype_buy == 1">

            <AppNumber v-if="markettype_buy == 1" :num="getBuyAmount" :disabled="true" :after="symbleinfo.tcurrencyname"
              :before="$t('deal.turnover')" class="mt-1" />
            <AppNumber v-else :num="global_get_tofixed(getBuyAmount / lastprice, symbleinfo.amountdigits)"
              :disabled="true" :after="symbleinfo.fcurrencyname" class="mt-1" />
          </a-col>
          <a-col :lg="24" v-if="markettype_buy == 1">
            <p class="my-2  text-right label">
              <img src="/images/delta-gray.svg" />
              {{ clientExchangeRate(getBuyAmount) }}{{ $store.state.hex_client_exchange.active.toUpperCase() }}
            </p>
          </a-col>
          <a-col :lg="13">
            <p class="max-buy-amt label fw-5">
              <AppTooltip :title="$t('details.det16')" :text="$t('deal.maxbuy')" />
            </p>
          </a-col>
          <a-col :lg="11">
            <p class="mt-2 text-right text-white number-value">
              {{ buyable }} {{ markettype_buy == 1 ? symbleinfo.fcurrencyname  : symbleinfo.tcurrencyname }}
            </p>
          </a-col>
          <a-col :lg="24" v-if="$userinfo.uid">
            <a-button class=" buy-btc-btn" :loading="profitLossBuyState" block @click="profitLossBuyDeal"> {{
              $t("memberCenter.buy") }}
              {{ margin === 'margin' ? $t('leverage.long') : '' }}
              {{ symbleinfo.fcurrencyname }}
            </a-button>
          </a-col>
        </a-row>
      </a-form-model>
    </div>
    <!--  class="sell-container" -->
    <div v-show="activeKey == 2">
      <a-form-model ref="exchangeBlock" :hide-required-mark="true" label-align="left">
        <a-row :gutter="16" class="mx-2 ">
          <a-col :lg="24">
            <a-row :gutter="16">
              <a-col :lg="9">
                <p class="available-blance fw-5 mb-0">
                  <span class="tip available-balance">

                    <AppTooltip :title="$t('details.det17')" :text="$t('deal.usable')" />
                  </span>
                  <img src="/images/arrow-2.svg" class="pl-2 cursor" @click="showPopTrasfer()" />
                </p>
              </a-col>
              <a-col :lg="15" align="end">
                <p class="available-blance fw-5 usdt-txt mb-0">
                  <span class="num">
                    {{ global_get_tofixed(tradingDealFrom.canuseamount,
                      symbleinfo.amountdigits)
                    }} {{ symbleinfo.fcurrencyname }}
                  </span>
                </p>
              </a-col>
            </a-row>
          </a-col>
          <a-col :lg="24">

            <div class="exchange-block_input mt-2">
              <AppNumber :hasArrow="true" :fix="symbleinfo.pricedigits" @number:focus="showSalePriceFocus"
                :before="$t('deal.trigger')" :after="symbleinfo.tcurrencyname" @number:blur="showSalePriceFocus"
                :num.sync="copeTriggerPriceSale" />
            </div>
          </a-col>
          <a-col :lg="24">
            <div class="exchange-block_input mt-3">
              <a-row>
                <a-col span=16 v-if="copeEntrustSaleRate > 0">
                  <AppNumber :hasArrow="true" :fix="symbleinfo.pricedigits" @number:focus="showSalePriceFocus"
                    :before="$t('deal.buyinRate')" @number:blur="showSalePriceFocus" :num.sync="copeEntrustSaleRate" />
                </a-col>
                <a-col span=16 v-else>

                  <div class="exchange-block_input best-market  ipt_hover">
                    <p class="market_tip fw-5">
                      {{ $t('deal.markebuy') }}
                    </p>
                  </div>
                </a-col>
                <a-col span=8 class="pl-2" id="pro-market-type">
                  <a-select   defaultValue="1" dropdown-class-name="sl_markettype" @change="sl_sell_Change">
                    <a-select-option value="1">{{ $t('patch.LimitOrderShort') }}</a-select-option>
                    <a-select-option value="2">{{ $t('patch.MarketOrderShort') }}</a-select-option>
                  </a-select>
                </a-col>
              </a-row>
            </div>
          </a-col>
          <a-col :lg="24">
            <div class="exchange-block_input mt-3">
              <AppNumber :hasArrow="true" :fix="symbleinfo.amountdigits" :num.sync="copeEntrustSaleNum"
                :before="$t('deal.purchases')" @number:focus="showSaleFocus" @number:blur="showSaleFocus"
                :after="symbleinfo.fcurrencyname"
                :max="global_get_tofixed(tradingDealFrom.canuseamount, symbleinfo.amountdigits)" />
            </div>
            <p class="available-blance fw-5 mb-0" v-show="needborrowfamount > 0" style="height:30px;line-height:30px;">
              <span class="tip">{{ $t("deal.borrow") }}</span>
              <span class="num" style="color: #f6465d;float: right;">
                {{ needborrowfamount }} {{ symbleinfo.fcurrencyname }}
              </span>
            </p>
          </a-col>
          <a-col :lg="24">
            <hex-slider :dec="getsaledec" @slider:change="getEntrustSaleNum"></hex-slider>
          </a-col>
          <a-col :lg="24" v-show="markettype_buy == 1">
            <AppNumber :num="getSaleAmount" :disabled="true" :after="symbleinfo.tcurrencyname" class="mt-1"
              :before="$t('deal.turnover')" />
          </a-col>
          <a-col :lg="24" v-show="markettype_buy == 1">
            <p class="my-2  text-right label">
              <img src="/images/delta-gray.svg" />
              {{ clientExchangeRate(getSaleAmount) }} {{ $store.state.hex_client_exchange.active.toUpperCase() }}
            </p>
          </a-col>
          <a-col :lg="13">
            <p class="max-buy-amt label fw-5">
              <AppTooltip :title="$t('details.det16')" :text="$t('deal.maxsell')" />
            </p>
          </a-col>
          <a-col :lg="11">
            <p class="mt-2 text-right text-white  number-value">
              {{ global_get_tofixed(tradingDealFrom.canuseamount, symbleinfo.amountdigits) }}
              {{ symbleinfo.fcurrencyname }}
            </p>
          </a-col>
          <a-col :lg="24" v-if="$userinfo.uid">
            <a-button class="  sell-btc-btn" :loading="profitLossSaleState" block @click="profitLossSaleDeal">
              {{ $t('deal.sellOut') }} {{ margin === 'margin' ? $t('leverage.short') : '' }}
              {{ symbleinfo.fcurrencyname }}
            </a-button>
          </a-col>
        </a-row>
      </a-form-model>
    </div>
  </div>
</template>
<script>
import AppNumber from '../App/AppNumber.vue'
import number from '@/components/public/number'
import slider from '@/components/public/slider'
import AppTooltip from '../App/AppTooltip.vue'
export default {
  name: 'profitLoss',
  components: {
    'hex-number': number,
    'hex-slider': slider,
    AppNumber,
    AppTooltip
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
      const n = this.$np.times(this.copeEntrustSaleNum, this.markettype_buy != 1 ? this.lastprice : this.copeEntrustSaleRate);
      return this.global_get_tofixed(n, this.symbleinfo.pricedigits)
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
        const num = this.global_get_tofixed(this.$store.getters.get_to_from_exchange_rate(a, this.copeEntrustBuyRate), this.symbleinfo.amountdigits)
        return parseFloat(num)
      } else {
        return parseFloat(a);
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
    activeKey: {
      type: Number
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
    }
  },

  emits: ['onOpenTransferPopup'],
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

    showPopTrasfer() {
      this.$emit('onOpenTransferPopup', true)
    },
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
      this.markettype_buy = val;
      if (val == 1) {
        this.copeEntrustSaleRate = this.entrustSaleRate;
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
      return this.global_get_tofixed(this.$store.getters.get_client_exchange_rate(this.symbleinfo.tcurrencyname, amount, this.$store.state.hex_client_exchange.active.toUpperCase()), 2);
    }
  }
}
</script>
<style lang="less" scoped>
@import '../../static/styles/color.less';

.available-balance,
.max-buy-amt {
  color: @cl_7e7e7e;
}




.max-buy-amt {
  margin-top: 15px;
  width: fit-content;
}


.best-market {
  background-color: #171B23;
  height: 44px;
  line-height: 44px;
  position: relative;
  font-size: 12px;
  border: 1px solid #292E39;
  border-radius: 3px;
  border-radius: 8px;
  color: @cl_6D777E;

  p {
    padding: 0px 10px
  }

}


#exchangeBlock .sell-container {

  .exchange-block_input {
    background-color: @cl_171B23;
    height: 44px;
    line-height: 44px;
    position: relative;
    font-size: 14px;
    border: 1px solid #292E39;
    border-radius: 3px;
  }

  .exchange-block_input .ipt_hover {
    // padding-left: 75px;
    padding-left: 15px;
    padding-right: 45px;
    background-color: transparent;
    height: 44px;
    line-height: 44px;
    left: 0;
    display: block;
    width: 100%;
    color: @cl_CED3DD;
  }

  .exchange-block_input .before,
  .exchange-block_input .after {
    padding: 0 10px;
    position: absolute;
    line-height: 44px;
    height: 44px;
    color: #5E6573;
  }

  .exchange-block_input .before {
    left: 0;
  }

  .exchange-block_input .after {
    right: 0;
    font-size: 12px;
  }

  .exchange-block_input .market_tip {
    // padding: 0 35px 0 75px;
    padding-left: 10px;
    color: @cl_CED3DD;
    font-size: 12px;
    margin: 0px;
  }
}

.exchange-block_profit-loss {
  .exchange-block_input {
    margin-bottom: 1px !important;
  }

  .exchange-block_slider {
    margin: 24px 4px 10px 4px;
  }
}

/deep/ .ant-select {
  width: 100%;
  height: 44px;
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
      height: 44px;
      line-height: 44px;
    }

    .ant-select-arrow {
      color: #B7BDC6;
    }

  }
}


</style>
  