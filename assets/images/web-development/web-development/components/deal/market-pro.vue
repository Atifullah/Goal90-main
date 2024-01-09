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
                    {{ global_get_tofixed(tradingDealTo.canuseamount, symbleinfo.pricedigits) }}
                    {{ symbleinfo.tcurrencyname }}
                  </span>
                </p>
              </a-col>
            </a-row>
          </a-col>
          <a-col :lg="24">
              <div class="exchange-block_input best-market  ipt_hover mt-2">
                <span class="after text-white">{{ symbleinfo.tcurrencyname }}</span>
                <p class="market_tip fw-5"> {{ $t('deal.markebuy') }} </p>
              </div>
          </a-col>
          <a-col :lg="24">
              <div class="exchange-block_input  ipt_hovers mt-3">
                <AppNumber :hasArrow="true" :fix="symbleinfo.pricedigits" :num.sync="marketEntrustBuyNum"
                  @number:focus="showBuyFocus" @number:blur="showBuyFocus" :after="symbleinfo.tcurrencyname" :before="$t('memberCenter.amount')"
                  :max="tradingDealTo.canuseamount" />
              </div>
            <p class="available-blance fw-5 mb-0" v-show="needborrowtamount > 0" style="height:30px;line-height:30px;">
              <span class="tip">{{ $t("deal.borrow") }}</span>
              <span class="num" style="color: #f6465d;float: right;">
                {{ needborrowtamount }} {{ symbleinfo.tcurrencyname }}
              </span>
            </p>
          </a-col>
          <a-col :lg="24">
            <hex-slider :dec="getbuydec" @slider:change="getMarketEntrustBuyNum"></hex-slider>
          </a-col>
          <!-- <a-col :lg="24">
            <AppNumber :num="global_get_tofixed(marketEntrustBuyNum / lastprice, symbleinfo.amountdigits)" :before="$t('deal.turnover')"
              :disabled="true" :after="fCurrencyName" class="mt-1" />
          </a-col>
          <a-col :lg="24">
            <p class="my-2  text-right label">
              <img src="/images/delta-gray.svg" />
              {{ clientExchangeRate(getBuyAmount) }} {{ $store.state.hex_client_exchange.active.toUpperCase() }}
            </p>
          </a-col> -->
          <a-col :lg="9">
            <p class="max-buy-amt label fw-5">
              <AppTooltip :title="$t('details.det16')" :text="$t('deal.maxbuy')" />
            </p>
          </a-col>
          <a-col :lg="15">
            <p class="mt-2 text-right text-white number-value fw-5">
              {{ global_get_tofixed(tradingDealTo.canuseamount, symbleinfo.pricedigits) }} {{ symbleinfo.tcurrencyname }}
            </p>
          </a-col>
          <a-col :lg="24" v-if="$userinfo.uid">
            <a-button class="  buy-btc-btn" :loading="marketBuyState" block @click="marketBuyDeal">{{
              $t('memberCenter.buy') }} {{ margin === 'margin' ? $t('leverage.long') : '' }}{{ fCurrencyName }}</a-button>
          </a-col>
        </a-row>
      </a-form-model>
    </div>
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
                    {{
                      global_get_tofixed(tradingDealFrom.canuseamount, symbleinfo.amountdigits)
                    }} {{ fCurrencyName }}
                  </span>
                </p>
              </a-col>
            </a-row>
          </a-col>
          <a-col :lg="24">
              <div class="exchange-block_input best-market ipt_hover mt-2">
                  <span class="after text-white">{{ symbleinfo.tcurrencyname }}</span>
                  <p class="market_tip fw-5">
                    {{ $t('deal.markesell') }}
                  </p>
              </div>
          </a-col>
          <a-col :lg="24">
              <div class="exchange-block_input mt-3">
                <AppNumber :hasArrow="true" :fix="symbleinfo.amountdigits" @number:focus="showSaleFocus"
                  @number:blur="showSaleFocus" :num.sync="marketEntrustSaleNum" :after="symbleinfo.fcurrencyname" :before="$t('deal.purchases')"
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
              <hex-slider :dec="getsaledec" @slider:change="getMarketEntrustSaleNum"></hex-slider>
            
          </a-col>
          <!-- <a-col :lg="24">
            <AppNumber :num="getSaleAmount" :disabled="true" :after="symbleinfo.tcurrencyname" :before="$t('deal.turnover')" class="mt-1" />
          </a-col> -->
          <!-- <a-col :lg="24">
            <p class="my-2  text-right label">
              <img src="/images/delta-gray.svg" />
              {{ clientExchangeRate(getSaleAmount) }} {{ $store.state.hex_client_exchange.active.toUpperCase() }}
            </p>
          </a-col> -->
          <a-col :lg="9">
            <p class="max-buy-amt label fw-5">
              <AppTooltip :title="$t('details.det16')" :text="$t('deal.maxsell')" />
            </p>
          </a-col>
          <a-col :lg="15">
            <p class="mt-2 text-right text-white number-value">
              {{ global_get_tofixed(tradingDealFrom.canuseamount, symbleinfo.amountdigits) }} {{ symbleinfo.fcurrencyname }}
            </p>
          </a-col>
          <a-col :lg="24" v-if="$userinfo.uid">
            <a-button class=" sell-btc-btn" :loading="marketSaleState" block @click="marketSaleDeal">{{ $t('deal.sellOut')
            }} {{ margin === 'margin' ? $t('leverage.short') : '' }}{{ symbleinfo.fcurrencyname }}</a-button>
          </a-col>
        </a-row>
      </a-form-model>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import hexNumber from '@/components/public/number'
import slider from '@/components/public/slider'
import AppNumber from '../App/AppNumber.vue'
import AppTooltip from '../App/AppTooltip.vue'
export default {
  name: 'MarketPro',
  components: {
    "hex-number": hexNumber,
    "hex-slider": slider,
    AppNumber,
    AppTooltip
  },
  props: {
    symbleinfo: {
      type: Object,
      default: function () {
        return {}
      }
    },
    activeKey: {//1购买；2出售
      type: Number
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
      buyAmount: 0,
      maxBuyingAmount: 0,
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

  emits: ['onOpenTransferPopup'],
  computed: {
    ...mapGetters('market', ['getCurrentMarketPrice']),
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
      return this.marketEntrustBuyNum == '' ? 0 : this.marketEntrustBuyNum
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
      return this.global_get_tofixed(this.marketEntrustSaleNum * this.lastprice, this.symbleinfo.pricedigits)
    },
    needborrowfamount: function () {
      var needborrow = 0;
      if (this.margin == 'margin' && this.leverageCtidInfo.famount != undefined && this.symbleinfo.pricedigits != undefined) {
        needborrow = this.global_get_tofixed(this.copeEntrustSaleNum - (this.leverageCtidInfo.famount < 0 ? 0 : this.leverageCtidInfo.famount), this.symbleinfo.amountdigits);
      }
      needborrow = needborrow <= 0 ? 0 : needborrow;
      return needborrow;
    },
    fCurrencyName: function () {
      return this.symbleinfo.fcurrencyname
    }
  },
  methods: {
    showPopTrasfer() {
      this.$emit('onOpenTransferPopup', true)
    },
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
}
</script>
<style lang="less" scoped>
@import '../../static/styles/color.less';

.text-gray {
  color: @cl_7e7e7e !important;
}

.available-balance,
.max-buy-amt {
  color: @cl_7e7e7e;
}

.max-buy-amt {
  margin-top: 15px;
  width: fit-content;
}


#exchangeBlock {

  .best-market {
    background-color: @cl_171B23;
    height: 44px;
    line-height: 44px;
    position: relative;
    font-size: 14px;
    border: 1px solid #292E39;
    border-radius: 8px;

    .ipt_hover {
      // padding-left: 75px;
      padding-left: 15px;

      background-color: transparent;
      height: 44px;
      line-height: 44px;
      left: 0;
      display: block;
      width: 100%;
      color: @cl_CED3DD;
    }

    .after {
      padding: 0 10px;
      position: absolute;
      line-height: 44px;
      height: 44px;
      color: #5E6573;
      right: 0;
    }
  }

  .market_tip {
    padding-left: 10px;
    color: @cl_6D777E;
    font-size: 12px;
    margin: 0px;
  }
}
</style>