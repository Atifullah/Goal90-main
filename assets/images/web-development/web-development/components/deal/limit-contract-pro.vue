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
                      {{ contractassesinfo ? cutZero(global_get_tofixed(contractassesinfo.canuseamount_usdt, 2)) : 0 }}
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

            <div class="mt-2">
              <AppNumber :hasArrow="true" :fix="symbleinfo.pricedigits" @number:focus="showBuyPriceFocus"
                :before="$t('deal.buyinRate')" @number:blur="showBuyPriceFocus" :num.sync="copeEntrustBuyRate"
                after="USDT" />
            </div>

          </a-col>
          <a-col :lg="24">

            <AppNumber :hasArrow="true" :fix="symbleinfo.amountdigits" :num.sync="copeEntrustBuyNum"
              :before="$t('deal.purchases')" class="mt-3" @number:focus="showBuyFocus" @number:blur="showBuyFocus"
              :after="symbleinfo.fcurrencyname" />

            <!-- <p class="available-blance fw-5 mb-0" v-if="openType == 2" style="height:30px;line-height:30px;">
              <span class="tip"> {{ $t('deal.profit') }}</span>
              <span class="num" style="color: #f6465d;float: right;">
                <AppTooltip class="tooltip-hover" :title="profitlossbuy" :text="profitlossbuyamount" />


              </span>
            </p> -->
          </a-col>
          <a-col :lg="24">
            <hex-slider :dec="getbuydec" @slider:change="getEntrustBuyNum"></hex-slider>
          </a-col>
          <!-- <a-col :lg="24">
            <AppNumber :num="global_get_tofixed(copeEntrustBuyRate * copeEntrustBuyNum, symbleinfo.pricedigits)"
              :before="$t('deal.turnover')" :disabled="true" after="USDT" class="mt-2s" />
          </a-col>
          <a-col :lg="24">
            <p class="my-2  text-right label">
              <img src="/images/delta-gray.svg" />
              {{ clientExchangeRate(global_get_tofixed(copeEntrustBuyRate * copeEntrustBuyNum, symbleinfo.pricedigits)) }}
              {{ $store.state.hex_client_exchange.active.toUpperCase() }}
            </p>
          </a-col> -->
        </a-row>

        <CurrentCurrencyMarginValue :contractAssetsInfo="contractassesinfo" :fCurrencyName="symbleinfo.fcurrencyname"
          :contractType="contractType" :amount="getBuyAmount" :positionValue="positionValue" v-if="openType == 1"
          :assetType="1" />

        <a-row class="mx-2" :gutter="16">
          <a-col :lg="24" v-if="$userinfo.uid">
            <a-button class="buy-btc-btn" :loading="buyState" block @click="buyDeal">
              {{ openType == 1 ? $t("contract.buycontract") : $t("contract.buyopencontract") }}</a-button>
          </a-col>
        </a-row>
      </a-form-model>
    </div>
    <div v-show="activeKey == 2">
      <a-form-model ref="exchangeBlock" :model="exchangeBlock" :hide-required-mark="true" label-align="left">
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
                      {{ contractassesinfo ? cutZero(global_get_tofixed(contractassesinfo.canuseamount_usdt, 2)) : 0 }}
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

            <AppNumber :hasArrow="true" :fix="symbleinfo.pricedigits" @number:focus="showSalePriceFocus"
              :before="$t('deal.buyinRate')" class="mt-2" @number:blur="showSalePriceFocus"
              :num.sync="copeEntrustSaleRate" after="USDT" />

          </a-col>
          <a-col :lg="24">

            <AppNumber :hasArrow="true" :fix="symbleinfo.amountdigits" :num.sync="copeEntrustSaleNum"
              :before="$t('deal.purchases')" class="mt-3" @number:focus="showSaleFocus" @number:blur="showSaleFocus"
              :after="symbleinfo.fcurrencyname" />

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
            <hex-slider :dec="getsaledec" @slider:change="getEntrustSaleNum"></hex-slider>
          </a-col>
          <!-- <a-col :lg="24">
            <AppNumber :num="global_get_tofixed(copeEntrustSaleRate * copeEntrustSaleNum, 2)" :disabled="true"
              :before="$t('deal.turnover')" after="USDT" />
          </a-col>
          <a-col :lg="24">
            <p class="my-2  text-right label">
              <img src="/images/delta-gray.svg" />
              {{ clientExchangeRate(global_get_tofixed(copeEntrustSaleRate * copeEntrustSaleNum, 2)) }} {{
                $store.state.hex_client_exchange.active.toUpperCase() }}
            </p>
          </a-col> -->

        </a-row>

        <CurrentCurrencyMarginValue :amount="getcanuseAmount(-1)" :positionValue="positionValue"
          :contractAssetsInfo="contractassesinfo" :fCurrencyName="symbleinfo.fcurrencyname" :contractType="contractType"
          v-if="openType == 1" :assetType="1" />


        <a-row :gutter="16" class="mx-2">


          <a-col :lg="24" v-if="$userinfo.uid">
            <a-button class=" sell-btc-btn" :loading="saleState" block @click="saleDeal">{{
              openType == 1 ? $t("contract.sellcontract") : $t("contract.sellopencontract") }}</a-button>
          </a-col>
        </a-row>
      </a-form-model>
    </div>
  </div>
</template>
<script>
import slider from '@/components/public/slider'
import AppNumber from '../App/AppNumber.vue'
import CurrentCurrencyMarginValue from './CurrentCurrencyMarginValue.vue'
import AppTooltip from '../App/AppTooltip.vue'
export default {
  name: 'LimitContractPro',
  components: {
    "hex-slider": slider,
    AppNumber,
    CurrentCurrencyMarginValue,
    AppTooltip
  },
  computed: {
    getbuydec() {
      var canuseamount = this.getcanuseAmount(1)
      if (canuseamount == 0) {
        return 0
      }
      if (this.copeEntrustBuyNum == 0) {
        return 0
      }
      return (this.copeEntrustBuyNum / canuseamount) * 100
    },
    getsaledec() {
      var canuseamount = this.getcanuseAmount(-1)
      if (canuseamount == 0) {
        return 0
      }
      if (this.copeEntrustSaleNum == 0) {
        return 0
      }
      return (this.copeEntrustSaleNum / canuseamount) * 100
    },
    profitlosssellamount: function () {//平仓本次交易预计盈亏
      var n = this.global_get_tofixed(this.copeEntrustSaleRate * this.copeEntrustSaleNum - this.getSellcurrencyUnitNum(), this.symbleinfo.pricedigits)
      return n + ' USDT';
    },
    profitlosssell: function () {//平仓本次交易预计盈亏
      var n = this.global_get_tofixed(this.copeEntrustSaleRate * this.copeEntrustSaleNum - this.getSellcurrencyUnitNum(), this.symbleinfo.pricedigits)
      n = this.global_get_tofixed(n / this.copeEntrustSaleRate, this.symbleinfo.amountdigits)
      return n + ' ' + this.symbleinfo.fcurrencyname;
    },
    profitlossbuyamount: function () {//平仓本次交易预计盈亏
      var n = this.global_get_tofixed(this.copeEntrustBuyRate * this.copeEntrustBuyNum - this.getBuycurrencyUnitNum(), this.symbleinfo.pricedigits)
      return n + ' USDT';
    },
    profitlossbuy: function () {//平仓本次交易预计盈亏
      var n = this.global_get_tofixed(this.copeEntrustBuyRate * this.copeEntrustBuyNum - this.getBuycurrencyUnitNum(), this.symbleinfo.pricedigits)
      n = this.global_get_tofixed(n / this.copeEntrustBuyRate, this.symbleinfo.amountdigits)
      return n + ' ' + this.symbleinfo.fcurrencyname;
    },
    //设置买入交易额
    getBuyAmount: function () {
      var n
      if (this.openType == 1) {
        let amount = this.contractassesinfo?.canuseamount_usdt / this.copeEntrustBuyRate
        n = this.$np.times(amount, this.multiple)
      } else {
        this.listhaveorderinfos.forEach(element => {
          if (element.direction == -1) {
            n = element.cansellamount
          }
        });
      }
      if (n == undefined) {
        return "--"
      }
      if (this.copeEntrustBuyRate > 0) {
        return this.global_get_tofixed(n, this.symbleinfo.amountdigits)
      } else {
        return "--"
      }
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
        return this.global_get_tofixed(n, this.symbleinfo.amountdigits)
      }
      return this.global_get_tofixed(n, this.symbleinfo.amountdigits)
    },
    getBuyUseAmount_usdt: function () {
      var totalamount_usdt = 0;
      var self = this;
      this.listhaveorderinfos.forEach(element => {
        if (element.direction == -1) {
          totalamount_usdt = self.global_get_tofixed(element.holdpositionsavgprice * element.openinterest, self.symbleinfo.pricedigits);
        }
      });
      return totalamount_usdt;
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
        return this.global_get_tofixed(n, this.symbleinfo.amountdigits)
      }
      return this.global_get_tofixed(n, this.symbleinfo.amountdigits)
    },
    getSaleUseAmount_usdt: function () {
      var totalamount_usdt = 0;
      var self = this;
      this.listhaveorderinfos.forEach(element => {
        if (element.direction == 1) {
          totalamount_usdt = self.global_get_tofixed(element.holdpositionsavgprice * element.openinterest, self.symbleinfo.pricedigits);
        }
      });
      return totalamount_usdt;
    },
    //设置卖出交易额
    getSaleAmount: function () {
      var n
      if (this.openType == 1) {
        n = this.$np.times(this.tradingDealFrom.canuseamount, this.multiple)
      } else {
        this.listhaveorderinfos.forEach(element => {
          if (element.direction == 1) {
            n = element.cansellamount
          }
        });
        return this.global_get_tofixed(n, this.symbleinfo.amountdigits)
      } if (n == undefined) {
        return "--"
      }
      if (this.copeEntrustSaleRate > 0) {
        return this.global_get_tofixed(n, this.symbleinfo.amountdigits)
      } else {
        return "--"
      }
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
    activeKey: {
      type: Number | String
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
    tradingDealFrom: {
      type: Object,
      default: function () {
        return {
          canuseamount: 0
        }
      }
    },
    openType: 0, //1，开仓；2，平仓 
    multiple: 0,
    direction: {
      type: Number | String,
      default: 1
    },
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
  emits: ['onOpenTransferPopup'],
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
      exchangeBlock: {},
      buydecimals: 0,
      saledecimals: 0,
      //订单数据模型
      dealModel: {
        ctid: '',
        ordertype: 1,
        direction: 1,
        price: 0,
        amount: 0,
        paypassword: '',
        ordersource: 1
      },
      contractType: ''
    }
  },
  mounted() {
    this.contractType = this.$route.query.contractType
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

    showPopTrasfer() {
      this.$emit('onOpenTransferPopup', true)
    },
    /* 根据交易单位，计算相应货币的数量 */
    getBuycurrencyUnitNum: function () {
      var val = 0;
      if (this.openType == 1) {
        val = this.global_get_tofixed(Number(this.copeEntrustBuyRate) * Number(this.copeEntrustBuyNum), this.symbleinfo.pricedigits)
      } else {
        val = this.global_get_tofixed(this.getbuydec * this.getBuyUseAmount_usdt * 0.01, this.symbleinfo.pricedigits)
      }
      return val;
    },
    getSellcurrencyUnitNum: function () {
      var val = 0;
      if (this.openType == 1) {
        val = this.global_get_tofixed(Number(this.copeEntrustSaleRate) * Number(this.copeEntrustSaleNum), this.symbleinfo.pricedigits)
      } else {
        val = this.global_get_tofixed(this.getsaledec * this.getSaleUseAmount_usdt * 0.01, this.symbleinfo.pricedigits)
      }
      return val;
    },
    //设置买入量
    getEntrustBuyNum(num) {
      this.buydecimals = num
      var canuseamount = this.getcanuseAmount(1)
      this.copeEntrustBuyNum = this.global_get_tofixed(canuseamount * num, this.symbleinfo.amountdigits)
    },
    //设置卖出量
    getEntrustSaleNum(num) {
      this.saledecimals = num
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
    Login() {
      this.$router.push('/login?returnurl=' + this.$route.path)
    },
    //买入卖出交易
    buyDeal() {
      if (this.buyState) return
      this.buyState = true
      this.copeEntrustBuyNum = this.global_get_replace_dot(this.copeEntrustBuyNum)
      this.copeEntrustBuyRate = this.global_get_replace_dot(this.copeEntrustBuyRate)
      const dealModel = Object.assign({}, this.dealModel)
      dealModel.price = Number(this.copeEntrustBuyRate)
      dealModel.ordertype = (this.openType == 2) ? 4 : 1; // 开仓 '' 平仓contract 
      dealModel.amount = Number(this.copeEntrustBuyNum)
      dealModel.multiple = Number(this.multiple)
      dealModel.ctid = this.symbleinfo.id.toString()
      dealModel.direction = 1
      if (Number(this.copeEntrustBuyNum) <= 0) {
        this.$store.commit('set_message', { type: 'error', text: this.$t('patch.volumeLzero') })
        this.buyState = false
        return
      }
      var _self = this;
      if (this.$route.query.contractType == 1) {
        dealModel.contractType = 1
      }
      this.$store.dispatch('usercontract_order_create', dealModel)
        .then((res) => {
          if (res.data) {
            /*发布*/
            _self.$pubsub.publish(_self.$pubsub.getOrderList)
            _self.$pubsub.publish(_self.$pubsub.changeDepthChart)
            _self.$store.commit('set_message', { type: 'ok', text: res.msg })
            _self.copeEntrustBuyNum = 0;
          }
        })
        .then(() => {
          _self.buyState = false
          _self.copeEntrustBuyNum = ''
        })
        .catch(() => {
          _self.buyState = false
        })
    },
    saleDeal() {
      if (this.saleState) return
      this.saleState = true
      const dealModel = Object.assign({}, this.dealModel)
      dealModel.ordertype = (this.openType == 2) ? 4 : 1;
      dealModel.price = Number(this.copeEntrustSaleRate)
      dealModel.amount = Number(this.copeEntrustSaleNum)
      dealModel.ctid = this.symbleinfo.id.toString()
      dealModel.direction = -1
      dealModel.multiple = Number(this.multiple)
      if (Number(this.copeEntrustSaleNum) <= 0) {
        this.$store.commit('set_message', { type: 'error', text: this.$t('patch.volumeLzero') })
        this.saleState = false
        return
      }
      var _self = this;
      if (this.$route.query.contractType == 1) {
        dealModel.contractType = 1
      }
      this.$store.dispatch('usercontract_order_create', dealModel)
        .then((res) => {
          if (res.data) {
            /*发布*/
            _self.$pubsub.publish(_self.$pubsub.getOrderList)
            _self.$pubsub.publish(_self.$pubsub.changeDepthChart)
            _self.$store.commit('set_message', { type: 'ok', text: res.msg })
            _self.copeEntrustSaleNum = 0;
          }
        })
        .then(() => {
          _self.saleState = false
          _self.copeEntrustSaleNum = ''
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
<style lang="less" scoped>
@import '../../static/styles/color.less';

#exchangeBlock {

  .exchange-block_input {
    background-color: @cl_171B23;
    height: 40px;
    line-height: 40px;
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

}
</style>