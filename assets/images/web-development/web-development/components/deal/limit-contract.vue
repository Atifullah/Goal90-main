<template>
  <div class="exchange-block_content clearfix">
    <div class="exchange-block_content_left left">
      <!--买入价-->
      <div class="exchange-block_input  ipt_hover">
        <span class="before">{{ $t("deal.buyinRate") }}</span>
        <span class="after">USDT</span>
        <hex-number :fix="symbleinfo.pricedigits" @number:focus="showBuyPriceFocus" @number:blur="showBuyPriceFocus"
          :num.sync="copeEntrustBuyRate" class='ipt_hover'></hex-number>
        <span v-show="mostBuyPricePurchases" class="exchange-block_owner_tip" style="border:1px solid green;">
          <span class="num">≈<span>{{ getBuyClientRate }}</span>
            <span class="tip"> {{ $store.state.hex_client_exchange.active.toUpperCase() }}</span>
          </span>
        </span>
      </div>
      <!--买入量-->
      <div class="exchange-block_input ipt_hover">
        <span class="before">{{ $t("deal.purchases") }}</span>
        <span class="after">
          {{ symbleinfo.fcurrencyname }}
        </span>
        <hex-number :fix="symbleinfo.amountdigits" :num.sync="copeEntrustBuyNum" @number:focus="showBuyFocus"
          @number:blur="showBuyFocus" class='ipt_hover'></hex-number>
        <span v-show="mostBuyPurchases" class="exchange-block_owner_tip">
          {{ openType == 1 ? "open amount≈" : "close amount=" }}<span class="num">
            {{ getBuycurrencyUnitNum() }}
            {{ symbleinfo.tcurrencyname ? symbleinfo.tcurrencyname.replace("YX", "USDT") : '' }}</span>
        </span>
      </div>
      <hex-slider :dec="getbuydec" @slider:change="getEntrustBuyNum"></hex-slider>
      <div class="exchange-block_tip tip_exchange">
        <span class="left" v-if="openType == 1"><!-- 开仓本金 -->
          <span class="tip text-gray-light">
            {{ $t("deal.usable") }}
          </span>
          <span v-if="contractType == 1" class="num number-value">
            {{ contractassesinfo? cutZero(global_get_tofixed(contractassesinfo.canuseamount_usdt, 2)) : 0}}USDT
          </span>
          <span v-else class="num number-value">
            {{ getBuyAmount }}
            {{ symbleinfo.fcurrencyname }}
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
        <span class="right " v-if="openType == 1"><!-- 开仓可用 -->
          <span  v-if="contractType == 1">
            <AppInfoTooltip :title="$t('contract.buyCloseupTip1')" />

            <span class="text-gray-light">{{ $t('contract.canuseamount1') }}</span>
            <span class="text-white  number-value">{{ getBuyAmount }} {{ this.symbleinfo.fcurrencyname }}</span>
          </span>
          <span v-else>
            <AppInfoTooltip :title="$t('contract.buyCloseupTip')" />

            <span class="text-gray-light">{{ $t('contract.buyCloseup') }}</span>
            <span class="text-white  number-value">{{ getBuyUseAmount }} {{ this.symbleinfo.fcurrencyname }}</span>
          </span>
        </span>
        <span class="right " v-else><!-- 可平多数量 -->
          {{ $t('contract.flatZh') }}
          <span class="num number-value" style="border-bottom: 1px dashed ; cursor: pointer;">

            <AppTooltip :title="$t('contract.flatZh') + ' ' + getBuyUseAmount_usdt + ' USDT'"
              :text="getBuyUseAmount + ' ' + symbleinfo.fcurrencyname" />
          </span>
        </span>
      </div>
      <div class="exchange-block_button_buy" v-hex-loading="buyState" v-if="$userinfo.uid" @click="buyDeal"
        :class="{ 'exchange-block_button--unavailable': (buyState) }">
        {{
          openType === 1 ? $t("contract.buycontract") : $t("contract.buyopencontract")
        }}
      </div>
      <div class="exchange-block_button_buy no_login" v-else>
        <nuxt-link to="/login" tag="span" class="repeal">{{ $t("home.headLogin") }}</nuxt-link>
        /
        <nuxt-link to="/register" tag="span" class="repeal">{{ $t("home.headRegister") }}</nuxt-link>
      </div>
    </div>
    <div class="exchange-block_content_right right">
      <div>
        <div class="exchange-block_input">
          <span class="before">{{ $t('deal.sellOutPrice') }}</span>
          <span class="after">USDT</span>
          <hex-number :fix="symbleinfo.pricedigits" @number:focus="showSalePriceFocus" @number:blur="showSalePriceFocus"
            :num.sync="copeEntrustSaleRate" class='ipt_hover'></hex-number>
          <span v-show="mostSalePricePurchases" class="exchange-block_owner_tip">
            <span class="num">
              ≈<span>{{ getSaleClientRate }}</span>
              <span class="tip"> {{ $store.state.hex_client_exchange.active.toUpperCase() }}</span>
            </span>
          </span>
        </div>
        <div class="exchange-block_input">
          <span class="before">{{ $t('deal.sellQuantity') }}</span>
          <span class="after">
            {{ this.symbleinfo.fcurrencyname }}
          </span>
          <hex-number :fix="symbleinfo.amountdigits" :num.sync="copeEntrustSaleNum" @number:focus="showSaleFocus"
            @number:blur="showSaleFocus" class='ipt_hover'></hex-number>
          <span v-show="mostSaleAvailable" class="exchange-block_owner_tip">
            {{ openType == 1 ? "open amount≈" : "close amount=" }}<span class="num">{{ getSellcurrencyUnitNum() }}
              USDT</span>
          </span>
        </div>
        <hex-slider :dec="getsaledec" @slider:change="getEntrustSaleNum"></hex-slider>
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
        <span class="right label" v-if="openType == 1"><!-- 开仓可用 -->
          <span class="right label" v-if="contractType == 1">
            <AppInfoTooltip :title="$t('contract.saleCloseupTip1')" />
            <span class="text-gray-light">{{ $t('contract.canuseamount1') }}</span>
            <span class="text-white number-value">{{ getSaleAmount }} {{ symbleinfo.fcurrencyname }}</span>
          </span>
          <span class="right label" v-else>
            <AppInfoTooltip :title="$t('contract.saleCloseupTip')" />
            <span class="text-gray-light">{{ $t('deal.usable') }}</span>
            <span class="text-white number-value">{{ getSaleUseAmount }} {{ symbleinfo.fcurrencyname }}</span>
          </span>
        </span>
        <span class="right" v-else><!-- 可平多数量 -->
          <span class="text-gray-light">{{ $t('contract.flatZh') }}</span>
          <span class="num number-value" style="border-bottom: 1px dashed ; cursor: pointer;">
            <AppTooltip :title="$t('contract.flatZh') + ' ' + getSaleUseAmount_usdt + ' USDT'"
              :text="getSaleUseAmount + ' ' + symbleinfo.fcurrencyname" />
          </span>
        </span>
      </div>
      <div class="exchange-block_button_sale" v-hex-loading="saleState" @click="saleDeal" v-if="$userinfo.uid"
        :class="{ 'exchange-block_button--unavailable': (saleState) }">
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
import AppInfoTooltip from '../App/AppInfoTooltip.vue'
import AppTooltip from '../App/AppTooltip.vue'

export default {
  name: 'articles',
  components: {
    'hex-number': number,
    'hex-slider': slider,
    AppInfoTooltip,
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
    //获取本地货币汇率
    getBuyClientRate: function () {
      return this.$store.getters.get_client_exchange_rate(this.symbleinfo.tcurrencyname, this.copeEntrustBuyRate)
    },
    getSaleClientRate: function () {
      return this.$store.getters.get_client_exchange_rate(this.symbleinfo.tcurrencyname, this.copeEntrustSaleRate)
    },
    //设置买入交易额
    getBuyAmount: function () {
      var n
      if (this.openType == 1) {
        if (this.contractType == 1) {
          let amount = this.contractassesinfo?.canuseamount_usdt / this.copeEntrustBuyRate
          n = this.$np.times(amount, this.multiple)
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
        if (this.contractType == 1) {
          n = this.getSaleAmount
        } else {
          n = this.tradingDealFrom.canuseamount
        }
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
        if (this.contractType == 1) {
          let amount = this.contractassesinfo?.canuseamount_usdt / this.copeEntrustSaleRate
          n = this.$np.times(amount, this.multiple)
        } else {
          n = this.$np.times(this.tradingDealFrom.canuseamount, this.multiple)
        }
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
    }
  },
  props: {
    symbleinfo: {
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
    tradingDealTo: {
      type: Object,
      default: function () {
        return {
          canuseamount: 0
        }
      }
    },
    openType: 0, //1，开仓；2，平仓 
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
        canuseamount = side == 1 ? this.getBuyAmount : this.getSaleUseAmount
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
    }
  }
}
</script>