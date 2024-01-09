<template>
  <div class="exchange-block_content clearfix">
    <div class="exchange-block_content_left left">
      <div>
        <div class="exchange-block_input  ipt_hover">
          <span class="before">{{ $t("deal.buyinRate") }}</span>
          <span class="after">USDT</span>
          <p class="market_tip">
            {{ $t('deal.markesell') }}
          </p>
        </div>
        <div class="exchange-block_input  ipt_hover">
          <span class="before">{{ $t('deal.count') }}</span>
          <span class="after"> {{ symbleinfo.fcurrencyname }}</span>
          <hex-number :fix="symbleinfo.amountdigits" :num.sync="copeEntrustBuyNum" @number:focus="showBuyFocus"
            @number:blur="showBuyFocus" class='ipt_hover'></hex-number>
          <span v-show="mostBuyPurchases" class="exchange-block_owner_tip">
            {{ openType == 1 ? "open amount≈" : "close amount=" }}<span class="num">{{ getBuycurrencyUnitNum() }}
              USDT</span>
          </span>
        </div>
        <hex-slider :dec="getbuydec" @slider:change="getcopeEntrustBuyNum"></hex-slider>
      </div>
      <div class="exchange-block_tip tip_exchange">
        <span class="left" v-if="openType == 1"><!-- 开仓本金 -->
          <span class="tip text-gray-light">
            {{ $t("deal.usable") }}
          </span>
          <span v-if="contractType == 1"  class="num number-value">
            {{ contractassesinfo? cutZero(global_get_tofixed(contractassesinfo.canuseamount_usdt, 2)) : 0}}
            <span>USDT</span>
          </span>
          <span v-else class="num number-value">
            {{ getBuyAmount }}
            {{ this.symbleinfo.fcurrencyname }}
          </span>
        </span>
        <!-- 可平空金额 -->
        <!-- <span class="left" v-else>
          <span class="tip text-gray-light">
            {{ $t('confirm.con18') }}
          </span>
          <span class="num number-value" style="border-bottom: 1px dashed ; cursor: pointer;">
            <AppTooltip :title="profitlossbuy" :text="profitlossbuyamount" />
          </span>
        </span> -->
        <span class="right" v-if="openType == 1"><!-- 开仓可用 -->
          <span v-if="contractType == 1">
            <AppInfoTooltip :title="$t('contract.buyCloseupTip1')" />
            <span class="text-gray-light">{{ $t('contract.canuseamount1') }}</span>
            <span class="text-white number-value">{{ getBuyAmount }} {{ symbleinfo.fcurrencyname }}</span>
          </span>
          <span v-else>
            <AppInfoTooltip :title="$t('contract.buyCloseupTip')" />
            <span class="text-gray-light">{{ $t('deal.usable') }}</span>
            <span class="text-white number-value">{{ getBuyUseAmount }} {{ symbleinfo.fcurrencyname }}</span>
          </span>
        </span>
        <span class="right" v-else><!-- 可平多数量 -->

          <AppInfoTooltip :title="$t('contract.buyCloseupTip')" />
          <span class="text-gray-light">{{ $t('contract.flatZh') }}</span>
          <span class="num number-value" style="border-bottom: 1px dashed ; cursor: pointer;">

            <AppTooltip :title="$t('contract.flatZh') + getBuyUseAmount_usdt + ' USDT'"
              :text="getBuyUseAmount + ' ' + symbleinfo.fcurrencyname" />
          </span>
        </span>
      </div>
      <div class="exchange-block_button_buy" v-hex-loading="marketBuyState" @click="marketBuyDeal" v-if="$userinfo.uid"
        :class="{ 'exchange-block_button--unavailable': marketBuyState }">
        {{ openType === 1 ? $t("contract.buycontract") : $t("contract.buyopencontract") }}
      </div>
      <div class="exchange-block_button_sale no_login" v-else>
        <nuxt-link to="/login" tag="span" class="repeal">{{ $t("home.headLogin") }}</nuxt-link>
        /
        <nuxt-link to="/register" tag="span" class="repeal">{{ $t('home.headRegister') }}</nuxt-link>
      </div>
    </div>
    <div class="exchange-block_content_right right">
      <div>
        <div class="exchange-block_input">
          <span class="before">{{ $t('deal.sellOutPrice') }}</span>
          <span class="after">USDT</span>
          <p class="market_tip">
            {{ $t('deal.markebuy') }}
          </p>
        </div>
        <div class="exchange-block_input">
          <span class="before">{{ $t('deal.sellQuantity') }}</span>
          <span class="after"> {{ symbleinfo.fcurrencyname }}</span>
          <hex-number :fix="symbleinfo.amountdigits" @number:focus="showSaleFocus" @number:blur="showSaleFocus"
            :num.sync="copeEntrustSaleNum" class='ipt_hover'></hex-number>
          <span v-show="mostSaleAvailable" class="exchange-block_owner_tip">
            {{ openType == 1 ? "open amount≈" : "close amount=" }}<span class="num">{{ getSellcurrencyUnitNum() }}
              USDT</span>
          </span>
        </div>
        <hex-slider :dec="getsaledec" @slider:change="getcopeEntrustSaleNum"></hex-slider>
      </div>
      <div class="exchange-block_tip tip_exchange">
        <span class="left" v-if="openType == 1"><!-- 开仓本金 -->
          <span class="tip text-gray-light">
            {{ $t("deal.usable") }}
          </span>
          <span v-if="contractType == 1" class="num number-value">
            {{ contractassesinfo? cutZero(global_get_tofixed(contractassesinfo.canuseamount_usdt, 2)) : 0}}USDT
          </span>
          <span v-else class="num number-value">
            {{ getSaleAmount }}
            {{ symbleinfo.fcurrencyname }}
          </span>
        </span>
        <!-- 可平多金额 -->
        <!-- <span class="left" v-else>
          <span class="tip text-gray-light">
            {{ $t('confirm.con18') }}
          </span>
          <span class="num number-value" style="border-bottom: 1px dashed ; cursor: pointer;">
            <AppTooltip :title="profitlosssell" :text="profitlosssellamount" />
          </span>
        </span> -->
        <span class="right" v-if="openType == 1"><!-- 开仓可用 -->
          <span v-if="contractType == 1">
            <AppInfoTooltip :title="$t('contract.saleCloseupTip1')" />
            <span class="text-gray-light">{{ $t('contract.canuseamount1') }}</span>

            <span class="text-white number-value">{{ getSaleUseAmount }} {{ this.symbleinfo.fcurrencyname }}</span>
          </span>
          <span v-else>
            <AppInfoTooltip :title="$t('contract.saleCloseupTip')" />
            <span class="text-gray-light">{{ $t('contract.buyCloseup') }}</span>

            <span class="text-white number-value">{{ getSaleUseAmount }} {{ this.symbleinfo.fcurrencyname }}</span>
          </span>
        </span>
        <span class="right" v-else><!-- 可平多数量 -->
          {{ $t('contract.flatZh') }}
          <span class="num number-value" style="border-bottom: 1px dashed ; cursor: pointer;">
            <AppTooltip :title="$t('contract.flatZh') + ' ' + getSaleUseAmount_usdt + ' USDT'"
              :text="getSaleUseAmount + ' ' + symbleinfo.fcurrencyname" />
          </span>
        </span>
      </div>
      <div class="exchange-block_button_sale" v-hex-loading="marketSaleState" @click="marketSaleDeal" v-if="$userinfo.uid"
        :class="{ 'exchange-block_button--unavailable': marketSaleState }">
        {{ openType === 1 ? $t("contract.sellcontract") : $t("contract.sellopencontract") }}
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
import AppTooltip from '../App/AppTooltip.vue'
import AppInfoTooltip from '../App/AppInfoTooltip.vue'
export default {
  name: 'articles',
  components: {
    'hex-number': number,
    'hex-slider': slider,
    AppTooltip,
    AppInfoTooltip
  },
  computed: {
    //设置买入交易额
    getBuyAmount: function () {
      var n
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
        if (this.contractType == 1) {
          n = this.getBuyAmount
        } else {
          n = this.tradingDealFrom.canuseamount
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
    //设置可用卖出交易额
    getSaleUseAmount: function () {
      var n
      if (this.openType == 1) {
        if (this.contractType == 1) {
          n = (this.contractassesinfo.canuseamount_usdt * this.multiple) / (this.entrustSaleRate * 1.004)
        } else {
          n = this.tradingDealFrom.canuseamount
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
      var ratenum = this.openType == 1 ? this.symbleinfo.amountdigits : 2
      return this.global_get_tofixed(n, ratenum)
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
    }
  },
  props: {
    symbleinfo: {
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
    contractassesinfo: {
      type: Object
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
  created() {

  },
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
    /* 根据交易单位，计算相应货币的数量 */
    getBuycurrencyUnitNum: function () {
      var val = 0;
      if (this.openType == 1) {
        val = this.global_get_tofixed(Number(this.lastprice) * Number(this.copeEntrustBuyNum), this.symbleinfo.pricedigits)
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
        if (this.contractType == 1) {
          canuseamount = side == 1 ? this.getBuyUseAmount : this.getSaleUseAmount
        } else {
          canuseamount = this.$np.times(this.tradingDealFrom.canuseamount, this.multiple)
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
    }
  }
}
</script> 