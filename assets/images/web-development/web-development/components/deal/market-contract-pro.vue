<template>
  <div id="exchangeBlock">
    <div v-show="activeKey == 1">
      <a-form-model ref="exchangeBlock" :hide-required-mark="true" label-align="left">
        <a-row :gutter="16" class="mx-2 ">
          <a-col :lg="24">
            <a-row :gutter="16">
              <a-col :lg="13">
                <p class="available-blance fw-5 mb-0">
                  <span class="tip available-balance">
                    <AppTooltip v-if="openType == 1" :title="$t('details.det18')" :text="$t('deal.usable')" />
                    <AppTooltip v-else :title="$t('details.det18')" :text="$t('contract.flatZh')" />
                  </span>
                  <img src="/images/arrow-2.svg" class="pl-2 cursor" @click="showPopTrasfer()" />
                </p>
              </a-col>
              <a-col :lg="11" align="end">
                <div v-if="openType == 1">
                  <p v-if="contractType == 1" class="available-blance fw-5 usdt-txt mb-0">
                  
                    <span class="num">
                      {{ contractassesinfo? cutZero(global_get_tofixed(contractassesinfo.canuseamount_usdt, 2)) : 0}}
                      <span>USDT</span>
                    </span>
                  </p>
                  <p v-else class="available-blance fw-5 usdt-txt mb-0">
                    {{ contractassesinfo ?
                      global_get_tofixed(contractassesinfo.amount,
                        global_get_decimal(symbleinfo.fcurrencyname).a) : 0 }}
                    {{ symbleinfo.fcurrencyname }} /
                    {{ contractassesinfo ? cutZero(global_get_tofixed(contractassesinfo.amount_usdt, 2)) : 0 }}
                    <span>USDT</span>
                  </p>
                </div>
                <div v-else>
                  <p class="available-blance fw-5 usdt-txt mb-0">
                    <span class="num">
                      {{ getBuyAmount }} {{ symbleinfo.fcurrencyname }}
                    </span>
                  </p>

                </div>
              </a-col>
            </a-row>
          </a-col>
          <a-col :lg="24">

            <div class="exchange-block_input  best-market ipt_hover mt-2">
              <span class="after text-white">USDT</span>
              <p class="market_tip  fw-5">
                {{ $t('deal.markesell') }}
              </p>
            </div>
          </a-col>
          <a-col :lg="24">

            <AppNumber :hasArrow="true" :fix="symbleinfo.amountdigits" :num.sync="copeEntrustBuyNum"
              :before="$t('deal.purchases')" @number:focus="showBuyFocus" @number:blur="showBuyFocus"
              :after="symbleinfo.fcurrencyname" class="mt-3" />

            <!-- <p class="available-blance fw-5 mb-0" v-if="openType == 2" style="height:30px;line-height:30px;">
              <span class="tip"> {{ $t('deal.profit') }}</span>
              <span class="num" style="color: #f6465d;float: right;">
                <a-tooltip class="tooltip-hover">
                  <template #title>
                    <span>{{ profitlossbuy }}</span>
                  </template>
                  {{ profitlossbuyamount }}
                </a-tooltip>
              </span>
            </p> -->
          </a-col>
          <a-col :lg="24">
            <hex-slider :dec="getbuydec" @slider:change="getcopeEntrustBuyNum"></hex-slider>
          </a-col>
          <!-- <a-col :lg="24">
            <AppNumber :num="global_get_tofixed(copeEntrustBuyNum * lastprice, symbleinfo.pricedigits)" :disabled="true"
              :before="$t('deal.turnover')" :after="USDT" />
          </a-col>
          <a-col :lg="24">
            <p class="my-2  text-right label">
              <img src="/images/delta-gray.svg" />
              {{ clientExchangeRate(global_get_tofixed(copeEntrustBuyNum * lastprice, symbleinfo.pricedigits)) }} {{
                $store.state.hex_client_exchange.active.toUpperCase() }}
            </p>
          </a-col> -->


        </a-row>
        <CurrentCurrencyMarginValue :contractAssetsInfo="contractassesinfo" :fCurrencyName="symbleinfo.fcurrencyname" :contractType="contractType"
          v-if="openType == 1" :amount="getBuyAmount" :positionValue="positionValue" :assetType="1"/>

        <a-row class="mx-2" :gutter="16">
          <a-col :lg="24" v-if="$userinfo.uid">
            <a-button class=" buy-btc-btn" :loading="marketBuyState" @click="marketBuyDeal" style="width:100%">
              {{ openType
                == 1 ? $t("contract.buycontract") : $t("contract.buyopencontract")
              }}</a-button>
          </a-col>
        </a-row>
      </a-form-model>
    </div>
    <div v-show="activeKey == 2">
      <a-form-model ref="exchangeBlock" :hide-required-mark="true" label-align="left">
        <a-row :gutter="16" class="mx-2 ">
          <a-col :lg="24">
            <a-row :gutter="16">
              <a-col :lg="13">
                <p class="available-blance fw-5 mb-0">
                  <span class="tip available-balance">
                    <AppTooltip v-if="openType == 1" :title="$t('details.det18')" :text="$t('deal.usable')" />
                    <AppTooltip v-else :title="$t('details.det18')" :text="$t('contract.flatZh')" />
                  </span>
                  <img src="/images/arrow-2.svg" class="pl-2 cursor" @click="showPopTrasfer()" />
                </p>
              </a-col>
              <a-col :lg="11" align="end">
                <div v-if="openType == 1">
                  <p v-if="contractType == 1" class="available-blance fw-5 usdt-txt mb-0">
                  
                    <span class="num">
                      {{ contractassesinfo? cutZero(global_get_tofixed(contractassesinfo.canuseamount_usdt, 2)) : 0}}
                      <span>USDT</span>
                    </span>
                  </p>
                  <p v-else class="available-blance fw-5 usdt-txt mb-0">
                    {{ contractassesinfo ?
                      global_get_tofixed(contractassesinfo.amount,
                        global_get_decimal(symbleinfo.fcurrencyname).a) : 0 }}
                    {{ symbleinfo.fcurrencyname }} /
                    {{ contractassesinfo ? cutZero(global_get_tofixed(contractassesinfo.amount_usdt, 2)) : 0 }}
                    <span>USDT</span>
                  </p>
                </div>
                <div v-else>
                  <p class="available-blance fw-5 usdt-txt mb-0">
                    <span class="num">
                      {{ getSaleAmount }} {{ symbleinfo.fcurrencyname }}
                    </span>
                  </p>
                </div>
              </a-col>
            </a-row>
          </a-col>
          <a-col :lg="24">

            <div class="exchange-block_input best-market ipt_hover mt-2">

              <span class="after text-white">USDT</span>
              <p class="market_tip  fw-5">
                {{ $t('deal.markebuy') }}
              </p>
            </div>
          </a-col>
          <a-col :lg="24">

            <div class="exchange-block_input mt-3">
              <AppNumber :hasArrow="true" :fix="symbleinfo.amountdigits" @number:focus="showSaleFocus"
                :before="$t('deal.purchases')" @number:blur="showSaleFocus" :num.sync="copeEntrustSaleNum"
                :after="symbleinfo.fcurrencyname" />
            </div>
            <!-- <p class="available-blance fw-5 mb-0" v-if="openType == 2" style="height:30px;line-height:30px;">
              <span class="tip"> {{ $t('deal.profit') }}</span>
              <span class="num" style="color: #f6465d;float: right;">
                <a-tooltip class="tooltip-hover">
                  <template #title>
                    <span>{{ profitlosssell }}</span>
                  </template>
                  {{ profitlosssellamount }}
                </a-tooltip>
              </span>
            </p> -->
          </a-col>
          <a-col :lg="24">
            <hex-slider :dec="getsaledec" @slider:change="getcopeEntrustSaleNum"></hex-slider>
          </a-col>
          <!-- <a-col :lg="24">
            <AppNumber :num="global_get_tofixed(copeEntrustSaleNum * lastprice, symbleinfo.pricedigits)" :disabled="true"
              after="USDT" :before="$t('deal.turnover')" />
          </a-col>
          <a-col :lg="24">
            <p class="my-2  text-right label">
              <img src="/images/delta-gray.svg" />
              {{ clientExchangeRate(global_get_tofixed(copeEntrustSaleNum * lastprice, symbleinfo.pricedigits)) }}
              {{ $store.state.hex_client_exchange.active.toUpperCase() }}
            </p>
          </a-col> -->
        </a-row>

        <CurrentCurrencyMarginValue :contractAssetsInfo="contractassesinfo" :fCurrencyName="symbleinfo.fcurrencyname" :contractType="contractType"
          v-if="openType == 1" :amount="getcanuseAmount(-1)" :positionValue="positionValue" :assetType="1"/>

        <a-row class="mx-2" :gutter="16">
          <a-col :lg="24" v-if="$userinfo.uid">
            <a-button class="sell-btc-btn" style="width: 100%;" :loading="marketSaleState" @click="marketSaleDeal">
              {{ openType == 1 ? $t("contract.sellcontract") : $t("contract.sellopencontract") }}
            </a-button>
          </a-col>
        </a-row>

      </a-form-model>
    </div>
  </div>
</template>
<script>
import number from '@/components/public/number'
import slider from '@/components/public/slider'
import AppNumber from '../App/AppNumber.vue'
import CurrentCurrencyMarginValue from './CurrentCurrencyMarginValue.vue'
import AppTooltip from '../App/AppTooltip.vue'
export default {
  name: 'MarketContractPro',
  components: {
    "hex-number": number,
    "hex-slider": slider,
    AppNumber,
    CurrentCurrencyMarginValue,
    AppTooltip
  },
  computed: {
    //设置买入交易额
    getBuyAmount: function () {
      let n = ''
      if (this.openType == 1) {
        if (this.contractType == 1) {
          n = (this.contractassesinfo.canuseamount_usdt * this.multiple) / (this.entrustSaleRate * 1.004)
        } else {
          n = this.$np.times(this.tradingDealFrom.canuseamount, this.multiple)
        }
      } else {
        this.listhaveorderinfos.forEach(element => {
          if (element.direction == -1) {
            n = element.cansellamount
          }
        });
      }
      return this.global_get_tofixed(n, this.symbleinfo.amountdigits)
    },
    //设置可用买入交易额
    getBuyUseAmount: function () {
      var n
      if (this.openType == 1) {
        n = this.tradingDealFrom.canuseamount
      } else {
        this.listhaveorderinfos.forEach(element => {
          if (element.direction == -1) {
            n = element.cansellamount
          }
        });
      }
      return this.global_get_tofixed(n, this.symbleinfo.amountdigits)
    },
    //设置可用卖出交易额
    getSaleUseAmount: function () {
      var n
      if (this.openType == 1) {
        n = this.tradingDealFrom.canuseamount
      } else {
        this.listhaveorderinfos.forEach(element => {
          if (element.direction == 1) {
            n = element.cansellamount
          }
        });
      }
      return this.global_get_tofixed(n, this.symbleinfo.amountdigits)
    },
    //设置卖出交易额
    getSaleAmount: function () {
      var n
      if (this.openType == 1) {
        if (this.contractType == 1) {
          n = (this.contractassesinfo.canuseamount_usdt * this.multiple) / (this.entrustSaleRate * 1.004)
        } else {
          n = this.$np.times(this.tradingDealFrom.canuseamount, this.multiple)
        }
      } else {
        this.listhaveorderinfos.forEach(element => {
          if (element.direction == 1) {
            n = element.cansellamount
          }
        });
      }
      return this.global_get_tofixed(n, this.symbleinfo.amountdigits)
    },
    profitlosssellamount: function () {//平仓本次交易预计盈亏
      var n = this.global_get_tofixed(this.lastprice * this.copeEntrustSaleNum - this.getSellcurrencyUnitNum(), this.symbleinfo.pricedigits)
      return n + ' USDT';
    },
    profitlosssell: function () {//平仓本次交易预计盈亏
      var n = this.global_get_tofixed(this.lastprice * this.copeEntrustSaleNum - this.getSellcurrencyUnitNum(), this.symbleinfo.pricedigits)
      n = this.global_get_tofixed(n / this.lastprice, this.symbleinfo.amountdigits)
      return n + ' ' + this.symbleinfo.fcurrencyname;
    },
    profitlossbuyamount: function () {//平仓本次交易预计盈亏
      var n = this.global_get_tofixed(this.lastprice * this.copeEntrustBuyNum - this.getBuycurrencyUnitNum(), this.symbleinfo.pricedigits)
      return n + ' USDT';
    },
    profitlossbuy: function () {//平仓本次交易预计盈亏
      var n = this.global_get_tofixed(this.lastprice * this.copeEntrustBuyNum - this.getBuycurrencyUnitNum(), this.symbleinfo.pricedigits)
      n = this.global_get_tofixed(n / this.lastprice, this.symbleinfo.amountdigits)
      return n + ' ' + this.symbleinfo.fcurrencyname;
    },
    getbuydec() {
      var canuseamount = this.getcanuseAmount(1)
      if (canuseamount == 0) {
        return 0
      }
      return (this.copeEntrustBuyNum / canuseamount) * 100
    },
    getsaledec() {
      var canuseamount = this.getcanuseAmount(-1)
      if (canuseamount == 0) {
        return 0
      }
      return (this.copeEntrustSaleNum / canuseamount) * 100
    },
    getBuyUseAmount_usdt: function () {//可平空量
      var totalamount_usdt = 0;
      this.listhaveorderinfos.forEach(element => {
        if (element.direction == -1) {
          totalamount_usdt = this.global_get_tofixed(element.holdpositionsavgprice * element.openinterest, this.symbleinfo.pricedigits);
        }
      });
      return totalamount_usdt;
    },
    getSaleUseAmount_usdt: function () {//可平多量
      var totalamount_usdt = 0;
      this.listhaveorderinfos.forEach(element => {
        if (element.direction == 1) {
          totalamount_usdt = this.global_get_tofixed(element.holdpositionsavgprice * element.openinterest, this.symbleinfo.pricedigits);
        }
      });
      return totalamount_usdt;
    },
    positionValue: function () { // 仓位价值
      let price = ''
      if (this.activeKey == 1) {
        price = this.copeEntrustBuyNum * this.copeEntrustBuyRate
      } else {
        price = this.copeEntrustSaleNum * this.copeEntrustSaleRate
      }
      let n = this.global_get_tofixed(price, this.symbleinfo.amountdigits)
      return n
    },
  },
  props: {
    symbleinfo: {
      type: Object,
      default: function () {
        return {}
      }
    },
    contractassesinfo: {
      type: Object
    },
    tradingDealFrom: {
      type: Object,
      default: function () {
        return {
          canuseamount: 0
        }
      }
    },
    activeKey: {
      type: Number
    },
    //买入卖出价
    entrustSaleRate: '',
    entrustBuyRate: '',
    //设置限价买入卖出量
    entrustBuyNum: '',
    entrustSaleNum: '',
    listhaveorderinfos: {
      type: Array,
      default: function () {
        return [{
          cansellamount: 0
        }], [{
          cansellamount: 0
        }]
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
    openType: 0,
    multiple: 0,
  },
  watch: {
    'entrustBuyRate': function (val) {//买价格变更
      this.copeEntrustBuyRate = this.global_get_tofixed(val, this.symbleinfo.pricedigits)
    },
    'entrustBuyNum': function (val) {//买数量变更 
      let newval = val
      if (this.getBuyAmount == '--') {
        newval = 0;
      }
      if (this.getBuyAmount < Number(val)) {
        newval = this.getBuyAmount
      }
      this.copeEntrustBuyNum = this.global_get_tofixed(newval, this.symbleinfo.amountdigits)
    },
    'entrustSaleRate': function (val) {//卖价格变更
      this.copeEntrustSaleRate = this.global_get_tofixed(val, this.symbleinfo.pricedigits)
      
    },
    'entrustSaleNum': function (val) {//卖数量变更
      let newval = val
      if (this.getSaleAmount == '--') {
        newval = 0;
      }
      if (this.getSaleAmount < Number(val)) {
        newval = this.getSaleAmount;
      }
      this.copeEntrustSaleNum = this.global_get_tofixed(newval, this.symbleinfo.amountdigits)
    }
  },
  created() {

  },
  emits: ['onOpenTransferPopup'],
  data() {
    return {
      mostBuyPurchases: false,
      mostSaleAvailable: false,
      marketBuyState: false,
      marketSaleState: false,
      //设置市价买入卖出量
      copeEntrustBuyRate: this.entrustBuyRate,
      copeEntrustSaleRate: this.entrustSaleRate,
      copeEntrustBuyNum: this.entrustBuyNum,
      copeEntrustSaleNum: this.entrustSaleNum,
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
      lastprice: 0,
      contractType: ''
    }
  },
  subscribe() {
    return {
      //订阅下单状态
      changeDealState() {
        this.marketBuyState = false
        this.marketSaleState = false
      },
      changeNewMoney(res) {
        /*更新最新价格*/
        this.marketEntrustBuyRate = res.price
        this.lastprice = res.price;
      }
    }
  },
  mounted() {
    this.contractType = this.$route.query.contractType
  },
  methods: {

    showPopTrasfer() {
      this.$emit('onOpenTransferPopup', true)
    },
    /* 根据交易单位，计算相应货币的数量 */
    getBuycurrencyUnitNum: function () {
      var val = 0;
      if (this.openType == 1) {
        n = this.$np.times(this.tradingDealFrom.canuseamount, this.multiple)
      } else {
        val = this.global_get_tofixed(this.getbuydec * this.getBuyUseAmount_usdt * 0.01, this.symbleinfo.pricedigits)
      }
      return val;
    },
    getSellcurrencyUnitNum: function () {
      var val = 0;
      if (this.openType == 1) {
        val = this.global_get_tofixed(Number(this.lastprice) * Number(this.copeEntrustSaleNum), this.symbleinfo.pricedigits)
      } else {
        val = this.global_get_tofixed(this.getsaledec * this.getSaleUseAmount_usdt * 0.01, this.symbleinfo.pricedigits)
      }
      return val;
    },
    showBuyFocus() {
      this.mostBuyPurchases = !this.mostBuyPurchases
    },
    showSaleFocus() {
      this.mostSaleAvailable = !this.mostSaleAvailable
    },
    //设置市价交易买入量
    getcopeEntrustBuyNum(num) {
      var canuseamount = this.getcanuseAmount(1)
      this.copeEntrustBuyNum = this.global_get_tofixed(canuseamount * num, this.symbleinfo.amountdigits)
    },
    //设置市价交易卖出量
    getcopeEntrustSaleNum(num) {
      var canuseamount = this.getcanuseAmount(-1)
      this.copeEntrustSaleNum = this.global_get_tofixed(canuseamount * num, this.symbleinfo.amountdigits)
    },
    /**
     * side == 1 买 
     * side == -1 卖
     */
    getcanuseAmount(side) {
      var canuseamount
      if (this.openType == 1) {
        if (this.activeKey == 1) {
          canuseamount = this.getBuyAmount
        } else {
          let amount = this.contractassesinfo.canuseamount_usdt / this.copeEntrustSaleRate
          canuseamount = this.$np.times(amount, this.multiple)
          canuseamount = this.global_get_tofixed(canuseamount, this.symbleinfo.amountdigits)
        }
      } else {
        canuseamount = side == 1 ? this.getBuyUseAmount : this.getSaleUseAmount
      }
      return canuseamount
    },
    //市价交易买入卖出
    marketBuyDeal() {
      if (this.marketBuyState) return
      this.marketBuyState = true
      const dealModel = Object.assign({}, this.dealModel)
      dealModel.ordertype = (this.openType == 2) ? 5 : 2
      dealModel.ctid = this.symbleinfo.id + "";
      dealModel.amount = Number(this.copeEntrustBuyNum)
      if (Number(dealModel.amount) <= 0) {
        this.$store.commit('set_message', { type: 'error', text: this.$t('patch.countLzero') })
        this.marketBuyState = false
        return
      }
      dealModel.multiple = Number(this.multiple)
      var _self = this;
      if (this.contractType == 1) {
        dealModel.contractType = 1
      }
      this.$store.dispatch('usercontract_order_create', dealModel)
        .then((res) => {
          if (res.data) {
            /*发布订阅*/
            _self.$pubsub.publish(_self.$pubsub.getOrderList)
            _self.$store.commit('set_message', { type: 'ok', text: res.msg })
            _self.copeEntrustBuyNum = 0;
          }
        })
        .then(() => {
          _self.marketBuyState = false
          // window.location.reload()
        })
        .catch(() => {
          _self.marketBuyState = false
        })
    },
    marketSaleDeal() {
      if (this.marketSaleState) return
      this.marketSaleState = true
      const dealModel = Object.assign({}, this.dealModel)
      dealModel.ordertype = (this.openType == 2) ? 5 : 2 // 开仓 '' 平仓contract 
      dealModel.ctid = this.symbleinfo.id + "";
      dealModel.direction = -1
      dealModel.amount = Number(this.copeEntrustSaleNum)
      dealModel.multiple = Number(this.multiple)
      if (Number(dealModel.amount) <= 0) {
        this.$store.commit('set_message', { type: 'error', text: this.$t('patch.countLzero') })
        this.marketSaleState = false
        return
      }
      var _self = this;
      if (this.contractType == 1) {
        dealModel.contractType = 1
      }
      this.$store.dispatch('usercontract_order_create', dealModel)
        .then((res) => {
          if (res.data) {
            /*下单实时更新用户资产和委托订单*/
            _self.$pubsub.publish(_self.$pubsub.getOrderList)
            _self.$store.commit('set_message', { type: 'ok', text: res.msg })
            _self.copeEntrustSaleNum = 0;
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
<style lang="less" scoped>
@import '../../static/styles/color.less';

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



  .exchange-block_input .ipt_hover {
    // padding-left: 75px;
    padding-left: 15px;
    padding-right: 45px;
    background-color: transparent;
    height: 40px;
    line-height: 40px;
    left: 0;
    display: block;
    width: 100%;
    color: @cl_CED3DD;
  }

  .exchange-block_input .before,
  .exchange-block_input .after {
    padding: 0 10px;
    position: absolute;
    line-height: 40px;
    height: 40px;
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
    color: @cl_555A5F;
    font-size: 12px;
    margin: 0px;
  }
}
</style>