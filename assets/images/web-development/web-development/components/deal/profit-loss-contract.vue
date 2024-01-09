<template>
  <div class="exchange-block_content clearfix exchange-block_profit-loss">
    <!-- 买入做多 opentype 1开仓-->
    <div class="exchange-block_content_left left">
      <div>
        <!--买入触发价-->
        <div class="exchange-block_input ipt_hover">
          <span class="before">{{ $t("deal.trigger") }}</span>
          <span class="after">USDT</span>
          <hex-number :fix="symbleinfo.pricedigits" @number:focus="showBuyPriceFocus" @number:blur="showBuyPriceFocus"
            :num.sync="copeTriggerPriceBuy" class="ipt_hover"></hex-number>
        </div>
        <!--买入价-->
        <div class="exchange-block_input ipt_hover">
          <a-row>
            <a-col span=19 v-if="markettype_buy == 1">
              <span class="before">{{ $t("deal.buyinRate") }}</span>
              <span class="after">USDT</span>
              <hex-number :fix="symbleinfo.pricedigits" @number:focus="showBuyPriceFocus" @number:blur="showBuyPriceFocus"
                :num.sync="copeEntrustBuyRate" class='ipt_hover'></hex-number>
            </a-col>
            <a-col span=19 v-else>
              <span class="before">{{ $t('deal.buyinRate') }}</span>
              <span class="after">USDT</span>
              <p class="market_tip">
                {{ $t('deal.markesell') }}
              </p>
            </a-col>
            <a-col  id="markettype"  span=5>
              <a-select defaultValue="1" dropdown-class-name="sl_markettype" @change="sl_buy_Change">
                <a-select-option value="1">{{ $t('patch.LimitOrderShort') }}</a-select-option>
                <a-select-option value="2">{{ $t('patch.MarketOrderShort') }}</a-select-option>
              </a-select>
            </a-col>
          </a-row>
        </div>
        <!--买入量-->
        <div class="exchange-block_input ipt_hover">
          <span class="before">{{ $t("deal.purchases") }}</span>
          <span class="after">{{ symbleinfo.fcurrencyname }}</span>
          <hex-number :fix="symbleinfo.amountdigits" :num.sync="copeEntrustBuyNum" @number:focus="showBuyFocus"
            @number:blur="showBuyFocus" class='ipt_hover'></hex-number>
          <span v-show="mostBuyPurchases" class="exchange-block_owner_tip">
            {{ openType == 1 ? "open amount≈" : "close amount=" }}<span class="num">{{ getBuycurrencyUnitNum() }}
              USDT</span>
          </span>
        </div>
        <hex-slider :dec="getbuydec" @slider:change="getEntrustBuyNum"></hex-slider>
      </div>
      <div class="exchange-block_tip tip_exchange" style="margin: 10px 0px 10px 0px !important;">
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
        <span class="right" v-if="openType == 1"><!-- 开仓可用 -->
          <span v-if="contractType == 1">
            <!-- 可开 -->
            <AppInfoTooltip :title="$t('contract.buyCloseupTip1')" />
            <span class="text-gray-light">{{ $t('contract.canuseamount1') }}</span>
            <span class="text-white  number-value">{{ getBuyAmount }} {{ this.symbleinfo.fcurrencyname }}</span>
          </span>
          <span v-else>
            <AppInfoTooltip :title="$t('contract.buyCloseupTip')" />
            <span class="text-gray-light">{{ $t('deal.usable') }}</span>
            <span class="text-white number-value">{{ getBuyUseAmount }} {{ this.symbleinfo.fcurrencyname }}</span>
          </span>
        </span>
        <span class="right" v-else><!-- 可平多数量 -->
          <span class="text-gray-light">{{ $t('contract.flatZh') }}</span>
          <span class="num number-value" style="border-bottom: 1px dashed ; cursor: pointer;">
            <AppTooltip :title="$t('contract.flatZh') + ' ' + getBuyUseAmount_usdt + ' USDT'"
              :text="getBuyUseAmount + ' ' + symbleinfo.fcurrencyname" />

          </span>
        </span>
      </div>
      <div class="exchange-block_button_buy" v-hex-loading="profitLossBuyState" v-if="$userinfo.uid"
        @click="profitLossBuyDeal" :class="{ 'exchange-block_button--unavailable': (profitLossBuyState) }">
        {{ openType === 1 ? $t("contract.buycontract") : $t("contract.buyopencontract") }}
      </div>
      <div class="exchange-block_button_buy no_login" v-else>
        <nuxt-link to="/login" tag="span" class="repeal">{{ $t("home.headLogin") }}</nuxt-link>/
        <nuxt-link to="/register" tag="span" class="repeal">{{ $t("home.headRegister") }}</nuxt-link>
      </div>
    </div>
    <!-- 卖出/做空 -->
    <div class="exchange-block_content_right right">
      <div>
        <!--卖出触发价-->
        <div class="exchange-block_input">
          <span class="before">{{ $t('deal.trigger') }}</span>
          <span class="after">USDT</span>
          <hex-number :fix="symbleinfo.pricedigits" @number:focus="showSalePriceFocus" @number:blur="showSalePriceFocus"
            :num.sync="copeTriggerPriceSale" class="ipt_hover"></hex-number>
        </div>
        <!--卖出价-->
        <div class="exchange-block_input">
          <a-row>
            <a-col span=19 v-if="markettype_sell == 1">
              <span class="before">{{ $t('deal.sellOutPrice') }}</span>
              <span class="after">USDT</span>
              <hex-number :fix="symbleinfo.pricedigits" @number:focus="showSalePriceFocus"
                @number:blur="showSalePriceFocus" :num.sync="copeEntrustSaleRate" class='ipt_hover'></hex-number>
            </a-col>
            <a-col span=19 v-else>
              <span class="before">{{ $t('deal.sellOutPrice') }}</span>
              <span class="after">USDT</span>
              <p class="market_tip">
                {{ $t('deal.markebuy') }}
              </p>
            </a-col>
            <a-col id="markettype-right" span=5>
              <a-select defaultValue="1" dropdown-class-name="sl_markettype" @change="sl_sell_Change">
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
            {{ openType == 1 ? "open amount≈" : "close amount=" }}<span class="num">{{ getSellcurrencyUnitNum() }}
              USDT</span>
          </span>
        </div>
        <hex-slider :dec="getsaledec" @slider:change="getEntrustSaleNum"></hex-slider>
      </div>
      <div class="exchange-block_tip tip_exchange" style="margin: 10px 0px 10px 0px !important;">
        <span class="left" v-if="openType == 1"><!-- 开仓本金 -->
          <span class="tip text-gray-light">
            {{ $t("deal.usable") }}
          </span>
          <span v-if="contractType == 1" class="num number-value">
            {{ contractassesinfo? cutZero(global_get_tofixed(contractassesinfo.canuseamount_usdt, 2)) : 0}}USDT
          </span>
          <span v-else class="num number-value">
            {{ getSaleAmount }}
            {{ this.symbleinfo.fcurrencyname }}
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
            <span class="text-white number-value">{{ getSaleAmount }} {{ symbleinfo.fcurrencyname }}</span>
          </span>
          <span v-else>
            <AppInfoTooltip :title="$t('contract.saleCloseupTip')" />
            <span class="text-gray-light">{{ $t('deal.usable') }}</span>
            <span class="text-white number-value">{{ getSaleUseAmount }} {{ this.symbleinfo.fcurrencyname }}</span>
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
      <div class="exchange-block_button_sale" v-hex-loading="profitLossSaleState" @click="profitLossSaleDeal"
        v-if="$userinfo.uid" :class="{ 'exchange-block_button--unavailable': (profitLossSaleState) }">
        {{ openType === 1 ? $t("contract.sellcontract") : $t("contract.sellopencontract") }}
      </div>
      <div class="exchange-block_button_sale no_login" v-else>
        <nuxt-link to="/login" tag="span" class="repeal">{{ $t("home.headLogin") }}</nuxt-link>/
        <nuxt-link to="/register" tag="span" class="repeal">{{ $t('home.headRegister') }}</nuxt-link>
      </div>
    </div>
  </div>
</template>
<script>
import number from "@/components/public/number";
import slider from "@/components/public/slider";
import AppInfoTooltip from "../App/AppInfoTooltip.vue";
import AppTooltip from "../App/AppTooltip.vue";

export default {
  name: "profitLoss",
  components: {
    "hex-number": number,
    "hex-slider": slider,
    AppInfoTooltip,
    AppTooltip
  },
  computed: {
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
    profitlosssellamount: function () {//平仓本次交易预计盈亏
      var n = this.global_get_tofixed((this.markettype_sell == 1 ? this.copeEntrustSaleRate : this.lastprice) * this.copeEntrustSaleNum - this.getSellcurrencyUnitNum(), this.symbleinfo.pricedigits)
      return n + ' USDT';
    },
    profitlosssell: function () {//平仓本次交易预计盈亏
      var n = this.global_get_tofixed((this.markettype_sell == 1 ? this.copeEntrustSaleRate : this.lastprice) * this.copeEntrustSaleNum - this.getSellcurrencyUnitNum(), this.symbleinfo.pricedigits)
      n = this.global_get_tofixed(n / (this.markettype_sell == 1 ? this.copeEntrustSaleRate : this.lastprice), this.symbleinfo.amountdigits)
      return n + ' ' + this.symbleinfo.fcurrencyname;
    },
    profitlossbuyamount: function () {//平仓本次交易预计盈亏
      var n = this.global_get_tofixed((this.markettype_buy == 1 ? this.copeEntrustBuyRate : this.lastprice) * this.copeEntrustBuyNum - this.getBuycurrencyUnitNum(), this.symbleinfo.pricedigits)
      return n + ' USDT';
    },
    profitlossbuy: function () {//平仓本次交易预计盈亏
      var n = this.global_get_tofixed((this.markettype_buy == 1 ? this.copeEntrustBuyRate : this.lastprice) * this.copeEntrustBuyNum - this.getBuycurrencyUnitNum(), this.symbleinfo.pricedigits)
      n = this.global_get_tofixed(n / (this.markettype_buy == 1 ? this.copeEntrustBuyRate : this.lastprice), this.symbleinfo.amountdigits)
      return n + ' ' + this.symbleinfo.fcurrencyname;
    },
    //设置买入交易额
    getBuyAmount: function () {
      var n
      if (this.openType == 1) {
        if (this.contractType == 1) {
          if (this.markettype_buy == 1) {
            n = (this.contractassesinfo.canuseamount_usdt * this.multiple) / (this.copeEntrustBuyRate * 1.004)
          } else {
            n = this.copeTriggerPriceBuy > 0 ? (this.contractassesinfo.canuseamount_usdt * this.multiple) / (this.copeTriggerPriceBuy * 1.004) : ''
          }
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
      return n > 0 ? this.global_get_tofixed(n, this.symbleinfo.amountdigits) : '--'
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
    //设置卖出交易额
    getSaleAmount: function () {
      var n
      if (this.openType == 1) {
        if (this.contractType == 1) {
          if (this.markettype_sell == 1) {
            n = (this.contractassesinfo.canuseamount_usdt * this.multiple) / (this.copeEntrustSaleRate * 1.004)
          } else {
            n = this.copeTriggerPriceSale > 0 ? (this.contractassesinfo.canuseamount_usdt * this.multiple) / (this.copeTriggerPriceSale * 1.004) : ''
          }
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
      return n > 0 ? this.global_get_tofixed(n, this.symbleinfo.amountdigits) : '--'
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
    getSaleUseAmount_usdt: function () {
      var totalamount_usdt = 0;
      var self = this;
      this.listhaveorderinfos.forEach(element => {
        if (element.direction == 1) {
          totalamount_usdt = self.global_get_tofixed(element.holdpositionsavgprice * element.openinterest, self.symbleinfo.pricedigits);
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
    //触发价
    triggerPriceBuy: "",
    triggerPriceSale: "",
    //买入卖出价
    entrustSaleRate: "",
    entrustBuyRate: "",
    //设置限价买入卖出量
    entrustBuyNum: "",
    entrustSaleNum: "",
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
    openType: 0,
    tradingDealTo: {
      type: Object,
      default: function () {
        return {
          canuseamount: 0
        }
      }
    },
    multiple: 0,
    contractassesinfo: {
      type: Object
    },
  },
  watch: {
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
        ordersource: 1
      },
      lastprice: 0,//最后价格
      markettype_buy: 1, //默认买限价;2,市价
      markettype_sell: 1,//默认卖限价;2,市价
      contractType: ''
    };
  },
  mounted() {
    this.contractType = this.$route.query.contractType
  },
  subscribe() {
    return {
      //订阅下单状态
      changeDealState() {
        this.profitLossBuyState = false;
        this.profitLossSaleState = false;
      },
      changeNewMoney(res) {
        /*更新最新价格*/
        this.lastprice = res.price;
      }
    };
  },
  created() { },
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
    /* 根据交易单位，计算相应货币的数量 */
    getBuycurrencyUnitNum: function () {
      var val = 0;
      if (this.openType == 1) {
        val = this.global_get_tofixed(Number(this.markettype_buy == 1 ? this.copeEntrustBuyRate : this.lastprice) * Number(this.copeEntrustBuyNum), this.symbleinfo.pricedigits)
      } else {
        val = this.global_get_tofixed(this.getbuydec * this.getBuyUseAmount_usdt * 0.01, this.symbleinfo.pricedigits)
      }
      return val;
    },
    getSellcurrencyUnitNum: function () {
      var val = 0;
      if (this.openType == 1) {
        val = this.global_get_tofixed(Number(this.markettype_sell == 1 ? this.copeEntrustSaleRate : this.lastprice) * Number(this.copeEntrustSaleNum), this.symbleinfo.pricedigits)
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
        canuseamount = side == 1 ? this.getBuyAmount : this.getSaleAmount
      } else {
        canuseamount = side == 1 ? this.getBuyUseAmount : this.getSaleUseAmount

      }
      return canuseamount
    },
    showBuyFocus() {
      this.mostBuyPurchases = !this.mostBuyPurchases;
    },
    showBuyPriceFocus() {
      this.mostBuyPricePurchases = !this.mostBuyPricePurchases;
    },
    showSalePriceFocus() {
      this.mostSalePricePurchases = !this.mostSalePricePurchases;
    },
    showSaleFocus() {
      this.mostSaleAvailable = !this.mostSaleAvailable;
    },
    Login() {
      this.$router.push('/login?returnurl=' + this.$route.path)
      return
    },
    //买入卖出交易
    profitLossBuyDeal() {
      if (this.profitLossBuyState) return;
      this.profitLossBuyState = true;
      this.copeEntrustBuyNum = this.global_get_replace_dot(
        this.copeEntrustBuyNum
      );
      this.copeEntrustBuyRate = this.global_get_replace_dot(
        this.copeEntrustBuyRate
      );
      const dealModel = Object.assign({}, this.dealModel);
      dealModel.ordertype = (this.openType == 2) ? 6 : 3;// 开仓 '' 平仓contract
      dealModel.price = Number(this.copeEntrustBuyRate);
      dealModel.triggerprice = Number(this.copeTriggerPriceBuy);
      dealModel.ctid = this.symbleinfo.id + "";
      dealModel.amount = Number(this.copeEntrustBuyNum)
      dealModel.multiple = Number(this.multiple)
      if (Number(this.copeTriggerPriceBuy) <= 0) {
        this.$store.commit("set_message", {
          type: "error",
          text: this.$t("patch.volumeLzero")
        });
        this.profitLossBuyState = false;
        return;
      }
      if (this.$route.query.contractType == 1) {
        dealModel.contractType = 1
      }
      this.$store
        .dispatch("usercontract_order_create", dealModel)
        .then(res => {
          if (res.data) {
            /*发布*/
            this.$pubsub.publish(this.$pubsub.getOrderList);
            this.$store.commit("set_message", { type: "ok", text: res.msg });
            this.copeEntrustBuyNum = 0;
          }
        })
        .then(() => {
          this.profitLossBuyState = false;
        })
        .catch(() => {
          this.profitLossBuyState = false;
        });
    },
    profitLossSaleDeal() {
      if (this.profitLossSaleState) return;
      this.profitLossSaleState = true;
      const dealModel = Object.assign({}, this.dealModel);
      dealModel.price = Number(this.copeEntrustSaleRate);
      dealModel.ordertype = (this.openType == 2) ? 6 : 3;
      dealModel.triggerprice = Number(this.copeTriggerPriceSale);
      dealModel.ctid = this.symbleinfo.id + "";
      dealModel.direction = -1;
      dealModel.amount = Number(this.copeEntrustSaleNum)
      dealModel.multiple = Number(this.multiple)
      if (Number(this.copeEntrustSaleNum) <= 0) {
        this.$store.commit("set_message", {
          type: "error",
          text: this.$t("patch.volumeLzero")
        });
        this.profitLossSaleState = false;
        return;
      }
      if (this.$route.query.contractType == 1) {
        dealModel.contractType = 1
      }
      this.$store
        .dispatch("usercontract_order_create", dealModel)
        .then(res => {
          if (res.data) {
            /*发布*/
            this.$pubsub.publish(this.$pubsub.getOrderList);
            this.$store.commit("set_message", { type: "ok", text: res.msg });
            this.copeEntrustSaleNum = 0;
          }
        })
        .then(() => {
          this.profitLossSaleState = false;
          window.location.reload()
        })
        .catch(() => {
          this.profitLossSaleState = false;
        });
    }
  }
};
</script>
<style lang="less" scoped>
.exchange-block_profit-loss {
  .exchange-block_input {
    margin-bottom: 20px !important;
  }

  .exchange-block_slider {
    margin: 24px 4px 10px 4px;
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
}
</style>
