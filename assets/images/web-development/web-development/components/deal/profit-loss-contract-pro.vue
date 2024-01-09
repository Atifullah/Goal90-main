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

            <AppNumber :hasArrow="true" :fix="symbleinfo.pricedigits" @number:focus="showBuyPriceFocus"
              :before="$t('labels.lbl16')" @number:blur="showBuyPriceFocus" :num.sync="copeTriggerPriceBuy" after="USDT"
              class="mt-2" />

          </a-col>
          <a-col :lg="24">

            <a-row class="mt-3">
              <a-col span=16 v-if="markettype_buy == 1">
                <AppNumber :hasArrow="true" :fix="symbleinfo.pricedigits" @number:focus="showBuyPriceFocus"
                  :before="$t('deal.buyinRate')" @number:blur="showBuyPriceFocus" :num.sync="copeEntrustBuyRate"
                  after="USDT" />
              </a-col>
              <a-col span=16 v-else>
                <div class="exchange-block_input  best-market ipt_hover">

                  <p class="market_tip   fw-5"> {{ $t('deal.markesell') }} </p>

                </div>
              </a-col>
              <a-col span=8 class="pl-2">
                <a-select defaultValue="1" dropdown-class-name="sl_markettype" @change="sl_buy_Change">
                  <a-select-option value="1">{{ $t('patch.LimitOrderShort') }}</a-select-option>
                  <a-select-option value="2">{{ $t('patch.MarketOrderShort') }}</a-select-option>
                </a-select>
              </a-col>
            </a-row>
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
            <hex-slider :dec="getbuydec" @slider:change="getEntrustBuyNum"></hex-slider>
          </a-col>
          <!-- <a-col :lg="24">
            <AppNumber
              :num="global_get_tofixed((markettype_buy == 1 ? copeEntrustBuyRate : lastprice) * copeEntrustBuyNum, symbleinfo.pricedigits)"
              :disabled="true" after="USDT" class="mt-1" :before="$t('deal.turnover')" />
          </a-col>
          <a-col :lg="24">
            <p class="my-2  text-right label">
              <img src="/images/delta-gray.svg" />
              {{ clientExchangeRate(global_get_tofixed((markettype_buy == 1 ? copeEntrustBuyRate : lastprice) *
                copeEntrustBuyNum, symbleinfo.pricedigits)) }}
              {{ $store.state.hex_client_exchange.active.toUpperCase() }}
            </p>
          </a-col> -->

        </a-row>


        <CurrentCurrencyMarginValue :contractAssetsInfo="contractassesinfo" :fCurrencyName="symbleinfo.fcurrencyname" :contractType="contractType" :amount="getBuyAmount" :positionValue="positionValue"
          v-if="openType == 1" :assetType="1"/>

        <a-row class="mx-2" :gutter="16">
          <a-col :lg="24" v-if="$userinfo.uid">
            <a-button class=" buy-btc-btn" :loading="profitLossBuyState" block @click="profitLossBuyDeal">{{ openType
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

            <AppNumber :hasArrow="true" :fix="symbleinfo.pricedigits" @number:focus="showSalePriceFocus"
              :before="$t('labels.lbl16')" @number:blur="showSalePriceFocus" :num.sync="copeTriggerPriceSale" after="USDT"
              class="mt-2" />

          </a-col>
          <a-col :lg="24">

            <div class="exchange-block_input mt-3">
              <a-row>
                <a-col span=16 v-if="markettype_sell == 1">
                  <AppNumber :hasArrow="true" :fix="symbleinfo.pricedigits" @number:focus="showSalePriceFocus"
                    :before="$t('deal.buyinRate')" @number:blur="showSalePriceFocus" :num.sync="copeEntrustSaleRate"
                    after="USDT" />
                </a-col>
                <a-col span=16 v-else>
                  <div class="exchange-block_input   best-market ipt_hover">
                    
                      <p class="market_tip fw-5">
                        {{ $t('deal.markebuy') }}
                      </p>
                    
                  </div>
                </a-col>
                <a-col span=8 class="pl-2">
                  <a-select defaultValue="1" dropdown-class-name="sl_markettype" @change="sl_sell_Change">
                    <a-select-option value="1">{{ $t('patch.LimitOrderShort') }}</a-select-option>
                    <a-select-option value="2">{{ $t('patch.MarketOrderShort') }}</a-select-option>
                  </a-select>
                </a-col>
              </a-row>
            </div>
          </a-col>
          <a-col :lg="24">
            <AppNumber :hasArrow="true" :fix="symbleinfo.amountdigits" :num.sync="copeEntrustSaleNum"
              :before="$t('deal.purchases')" @number:focus="showSaleFocus" @number:blur="showSaleFocus"
              :after="symbleinfo.fcurrencyname" class="mt-3" />
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

            <AppNumber
              :num="global_get_tofixed((markettype_sell == 1 ? copeEntrustSaleRate : lastprice) * copeEntrustSaleNum, 2)"
              :disabled="true" after="USDT" class="mt-1" :before="$t('deal.turnover')" />
          </a-col>
          <a-col :lg="24">
            <p class="my-2  text-right label">
              <img src="/images/delta-gray.svg" />
              {{ clientExchangeRate(global_get_tofixed((markettype_sell == 1 ? copeEntrustSaleRate : lastprice) *
                copeEntrustSaleNum, 2)) }}
              {{ $store.state.hex_client_exchange.active.toUpperCase() }}
            </p>
          </a-col> -->


        </a-row>

        <CurrentCurrencyMarginValue :contractAssetsInfo="contractassesinfo" :fCurrencyName="symbleinfo.fcurrencyname"  :contractType="contractType" :amount="getcanuseAmount(-1)" :positionValue="positionValue"
          v-if="openType == 1" :assetType="1"/>

        <a-row class="mx-2" :gutter="16">
          <a-col :lg="24" v-if="$userinfo.uid">
            <a-button class="sell-btc-btn" :loading="profitLossSaleState" block @click="profitLossSaleDeal">
              {{ openType == 1 ? $t("contract.sellcontract") : $t("contract.sellopencontract") }}
            </a-button>
          </a-col>
        </a-row>
      </a-form-model>
    </div>
  </div>
</template>
<script>
import number from "@/components/public/number"
import slider from "@/components/public/slider"
import AppNumber from "../App/AppNumber.vue"
import CurrentCurrencyMarginValue from './CurrentCurrencyMarginValue.vue'
import AppTooltip from "../App/AppTooltip.vue";

export default {
  name: "profitLoss",
  components: {
    "hex-number": number,
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
          if (this.activeKey == 1) {
            if (this.markettype_buy == 1) {
              n = (this.contractassesinfo.canuseamount_usdt * this.multiple) / (this.copeEntrustBuyRate * 1.004)
            } else {
              n = this.copeTriggerPriceBuy > 0 ?(this.contractassesinfo.canuseamount_usdt * this.multiple) / (this.copeTriggerPriceBuy * 1.004) : ''
            }
            
          } else {
            if (this.markettype_sell == 1) {
              n = (this.contractassesinfo.canuseamount_usdt * this.multiple) / (this.copeEntrustSaleRate * 1.004)
            } else {
              n = this.copeTriggerPriceSale > 0 ?(this.contractassesinfo.canuseamount_usdt * this.multiple) / (this.copeTriggerPriceSale * 1.004) : ''
            }
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
    },
    positionValue: function () { // 仓位价值
      let price = ''
      if (this.activeKey == 1) {
        if (this.markettype_buy == 1) {
            price = this.copeEntrustBuyNum * Number(this.copeEntrustBuyRate)
          } else {
            if (this.copeTriggerPriceSale > 0) {
              price = this.copeEntrustBuyNum * Number(this.copeTriggerPriceSale)
            } else {
              price = ''
            }
          }
      } else {
        if (this.markettype_sell == 1) {
          price = this.copeEntrustSaleNum * Number(this.copeEntrustSaleRate)
          
        } else {
          if (this.copeTriggerPriceSale > 0) {
            price = this.copeEntrustSaleNum * Number(this.copeTriggerPriceSale)
        }  else {
            price = ''
          }
        }
      }
      if (price > 0) {
        return this.global_get_tofixed(price, this.symbleinfo.amountdigits)
      } else {
        return '--'
      }
      // let n = this.global_get_tofixed(price, this.symbleinfo.amountdigits)
      // return n
    },
  },
  props: {

    contractassesinfo: {
      type: Object
    },
    symbleinfo: {
      type: Object,
      default: function () {
        return {}
      }
    },
    activeKey: {
      type: Number
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
    direction: {
      type: Number | String,
      default: 1
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
    }
  },
  emits: ['onOpenTransferPopup'],
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
        canuseamount = this.getBuyAmount
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
      if (Number(this.getBuyAmount) <= 0) {
        this.$store.commit("set_message", {
          type: "error",
          text: this.$t("patch.volumeLzero")
        });
        this.profitLossBuyState = false;
        return;
      }
      if (this.contractType == 1) {
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
      if (Number(this.getSaleAmount) <= 0) {
        this.$store.commit("set_message", {
          type: "error",
          text: this.$t("patch.volumeLzero")
        });
        this.profitLossSaleState = false;
        return;
      }
      if (this.contractType == 1) {
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
    },
    clientExchangeRate: function (amount) {
      return this.global_get_tofixed(this.$store.getters.get_client_exchange_rate(this.symbleinfo.tcurrencyname, amount, this.$store.state.hex_client_exchange.active.toUpperCase()), 2);
    }
  }
};
</script>
<style lang="less" scoped>
@import '../../static/styles/color.less';

#exchangeBlock {

  .exchange-block_input {
    height: 44px;
    line-height: 44px;
    position: relative;
    font-size: 14px;
    border-radius: 3px;
  }

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

  .market_tip {
    padding-left: 10px;
    color: @cl_555A5F;
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
  