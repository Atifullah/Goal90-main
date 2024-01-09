<template>
  <div id="exchangeBlock">
    <div v-show="activeKey == 1">
      <a-form-model ref="exchangeBlock" :hide-required-mark="true" label-align="left">
        <a-row :gutter="16" class="mx-2">
          <a-col :lg="24">
            <a-row :gutter="16">
              <a-col :lg="9">
                <p class="available-blance mb-0 main-txt fw-5">
                  <span class="tip available-balance">
                    <AppTooltip :title="$t('details.det17')" :text="$t('deal.usable')" />
                  </span>
                  <img src="/images/arrow-2.svg" class="pl-2 cursor" @click="showPopTrasfer()" />
                </p>

              </a-col>
              <a-col :lg="15" align="end">
                <p class="available-blance usdt-txt mb-0 number-value fw-5">
                  <span class="num">
                    {{ global_get_tofixed(tradingDealTo.canuseamount, symbleinfo.pricedigits) }}
                    {{ symbleinfo.tcurrencyname }}
                  </span>
                </p>
              </a-col>
            </a-row>
          </a-col>
          <a-col :lg="24">
            <div class="exchange-block_input ipt_hover mt-2">
              <AppNumber :hasArrow="true" :fix="symbleinfo.pricedigits" @number:focus="showBuyPriceFocus"
                :before="$t('deal.buyinRate')" @number:blur="showBuyPriceFocus" :num.sync="copeEntrustBuyRate"
                :after="symbleinfo.tcurrencyname" />
            </div>
          </a-col>
          <a-col :lg="24">
            <div class="exchange-block_input ipt_hover mt-3">
              <AppNumber :hasArrow="true" :fix="symbleinfo.amountdigits" :num.sync="copeEntrustBuyNum"
                :before="$t('deal.purchases')" @number:focus="showBuyFocus" @number:blur="showBuyFocus"
                :after="symbleinfo.fcurrencyname" :max="buyable" />
            </div>
            <p class="available-blance fw-5 mb-0" v-show="needborrowtamount > 0" style="height: 30px; line-height: 30px">
              <span class="tip">{{ $t("deal.borrow") }}</span>
              <span class="num" style="color: #f6465d; float: right">
                {{ needborrowtamount }} {{ symbleinfo.tcurrencyname }}
              </span>
            </p>
          </a-col>
          <a-col :lg="24">
            <div class="">
              <hex-slider :dec="getbuydec" @slider:change="getEntrustBuyNum"></hex-slider>
            </div>
          </a-col>
          <a-col :lg="24">
            <AppNumber :num.sync="getBuyAmount" :after="symbleinfo.tcurrencyname" :before="$t('deal.turnover')" disabled
              class="mt-1" />
          </a-col>
          <a-col :lg="24">
            <p class="my-2 text-right label main-txt fw-5">
              <img src="/images/delta-gray.svg" />
              {{ clientExchangeRate(getBuyAmount) }}
              {{ $store.state.hex_client_exchange.active.toUpperCase() }}
            </p>
          </a-col>
          <a-col :lg="9">
            <p class="max-buy-amt mb-1 main-txt fw-5">
              <AppTooltip :title="$t('details.det16')" :text="$t('deal.maxbuy')" />
            </p>
          </a-col>
          <a-col :lg="15">
            <p class="mt-2 text-right text-white mb-1 number-value fw-5">
              {{ buyable }} {{ symbleinfo.fcurrencyname }}
            </p>
          </a-col>
          <a-col :lg="24" v-if="$userinfo.uid">
            <a-button class="buy-btc-btn" :loading="buyState" block @click="buyDeal">{{ $t("memberCenter.buy") }}
              {{ margin === "margin" ? $t("leverage.long") : "" }}
              {{ symbleinfo.fcurrencyname }}</a-button>
          </a-col>
          <a-col :lg="24" v-if="environment" class="mt-3">
            <a :href="$userinfo.uid?'https://test.bitnasdaq.com/deal-pro/btc_usdt?ctid=1575964013659730564':'/login'" 
              class="ant-btn ant-btn-block mock-btn">{{ $t('deposit.dc12') }}</a>
          </a-col>
        </a-row>
      </a-form-model>
    </div>
    <div v-show="activeKey == 2">
      <a-form-model ref="exchangeBlock" :hide-required-mark="true" label-align="left">
        <a-row :gutter="16" class="mx-2">
          <a-col :lg="24">
            <a-row :gutter="16">
              <a-col :lg="9">
                <p class="available-blance mb-0 main-txt fw-5">
                  <span class="tip available-balance">
                    <AppTooltip :title="$t('details.det17')" :text="$t('deal.usable')" />
                  </span>

                  <img src="/images/arrow-2.svg" class="pl-2 cursor" @click="showPopTrasfer()" />
                </p>
              </a-col>
              <a-col :lg="15" align="end">
                <p class="available-blance usdt-txt mb-0 number-value fw-5">
                  <span class="num">
                    {{ global_get_tofixed(tradingDealFrom.canuseamount, symbleinfo.amountdigits) }}
                    {{ symbleinfo.fcurrencyname }}
                  </span>
                </p>
              </a-col>
            </a-row>
          </a-col>
          <a-col :lg="24">
            <div class="exchange-block_input mt-2">
              <AppNumber :hasArrow="true" :fix="symbleinfo.pricedigits" @number:focus="showSalePriceFocus"
                :before="$t('deal.buyinRate')" @number:blur="showSalePriceFocus" :num.sync="copeEntrustSaleRate"
                :after="symbleinfo.tcurrencyname" />
            </div>
          </a-col>
          <a-col :lg="24">
            <div class="exchange-block_input mt-3">
              <AppNumber :hasArrow="true" :fix="symbleinfo.amountdigits" :num.sync="copeEntrustSaleNum"
                @number:focus="showSaleFocus" @number:blur="showSaleFocus" :after="symbleinfo.fcurrencyname"
                :before="$t('deal.purchases')"
                :max="global_get_tofixed(tradingDealFrom.canuseamount, symbleinfo.amountdigits)" />
            </div>
            <p class="available-blance mb-2 main-txt fw-5" v-show="needborrowfamount > 0"
              style="height: 30px; line-height: 30px">
              <span class="tip">{{ $t("deal.borrow") }}</span>
              <span class="num" style="color: #f6465d; float: right">
                {{ needborrowfamount }} {{ symbleinfo.fcurrencyname }}
              </span>
            </p>
          </a-col>
          <a-col :lg="24">
            <div class="">
              <hex-slider :dec="getsaledec" @slider:change="getEntrustSaleNum"></hex-slider>
            </div>
          </a-col>
          <a-col :lg="24">
            <AppNumber :num="getSaleAmount" :disabled="true" :after="symbleinfo.tcurrencyname"
              :before="$t('deal.turnover')" class="mt-1" />
          </a-col>
          <a-col :lg="24">
            <p class="my-2 text-right label main-txt fw-5">
              <img src="/images/delta-gray.svg" />
              {{ clientExchangeRate(getSaleAmount) }}
              {{ $store.state.hex_client_exchange.active.toUpperCase() }}
            </p>
          </a-col>
          <a-col :lg="9">
            <p class="max-buy-amt mb-1 main-txt fw-5">
              <AppTooltip :title="$t('details.det16')" :text="$t('deal.maxsell')" />
            </p>
          </a-col>
          <a-col :lg="15">
            <p class="mt-2 text-right text-white mb-1 number-value fw-5">
              {{ global_get_tofixed(tradingDealFrom.canuseamount, symbleinfo.amountdigits) }}
              {{ symbleinfo.fcurrencyname }}
            </p>
          </a-col>
          <a-col :lg="24" v-if="$userinfo.uid">
            <a-button class="sell-btc-btn" :loading="saleState" block @click="saleDeal">
              {{ $t("deal.sellOut") }}
              {{ margin === "margin" ? $t("leverage.short") : "" }}
              {{ symbleinfo.fcurrencyname }}</a-button>
          </a-col>
        </a-row>
      </a-form-model>
    </div>
  </div>
</template>
<script>
import slider from "@/components/public/slider"
import AppNumber from "../App/AppNumber.vue"
import init from '../../init'
import { isTradeView } from "~/plugins/helpers"
import AppTooltip from "../App/AppTooltip.vue";
export default {
  name: "LimitPro",
  components: {
    "hex-slider": slider,
    AppNumber,
    AppTooltip
  },
  props: {
    symbleinfo: {
      type: Object,
      default: function () {
        return {};
      },
    },
    activeKey: {
      type: Number,
    },
    leverageCtidInfo: {
      type: Object,
      default: function () {
        return {};
      },
    },
    //买入卖出价
    entrustSaleRate: "",
    entrustBuyRate: "",
    //设置限价买入卖出量
    entrustBuyNum: "",
    entrustSaleNum: "",
    tradingDealFrom: {
      type: Object,
      default: function () {
        return {
          canuseamount: 0,
        };
      },
    },
    tradingDealTo: {
      type: Object,
      default: function () {
        return {
          canuseamount: 0,
        };
      },
    },
    margin: "",
  },
  emits: ["onOpenTransferPopup"],

  data() {
    return {
      //下单状态
      buyState: false,
      saleState: false,
      sliderRangeValue: "",
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
      refreshneedtime: 0,
      //订单数据模型
      dealModel: {
        ctid: "",
        ordertype: 1,
        direction: 1,
        price: 0,
        amount: 0,
        paypassword: "",
        ordersource: 1,
      },
    };
  },

  computed: {
    environment() {
      if (init.obj.server.port == 9087) {
        if (isTradeView(this)) {
          return true
        }
      }
      return false
    },
    getbuydec() {
      if (!this.buyable) {
        return 0;
      }
      return (this.copeEntrustBuyNum / this.buyable) * 100;
    },
    getsaledec() {
      if (!this.tradingDealFrom.canuseamount) {
        return 0;
      }
      return (
        (this.copeEntrustSaleNum / this.tradingDealFrom.canuseamount) * 100
      );
    },
    //设置买入交易额

    getvalueamount: {
      get: function () {
        const n = this.$np.times(
          this.copeEntrustBuyRate,
          this.copeEntrustBuyNum
        );
        return this.global_get_tofixed(n, this.symbleinfo.sumdigits);
      },
    },
    getBuyAmount: {
      get: function () {
        return this.getvalueamount;
      },
      set: function (newValue) {
        const newValueParsed = parseFloat(newValue);

        if (!isNaN(newValueParsed) && this.copeEntrustBuyRate !== 0) {
          if (Number.isInteger(newValueParsed)) {
            // Handle whole numbers directly as integers
            const formattedValue = newValueParsed.toString();
            this.copeEntrustBuyNum = formattedValue / this.copeEntrustBuyRate;
            // console.log("new value ", formattedValue);
          } else {
            // Handle decimal values with desired formatting
            const formattedValue = newValueParsed.toFixed(
              this.symbleinfo.amountdigits
            );
            this.copeEntrustBuyNum = formattedValue / this.copeEntrustBuyRate;
            // console.log("new value ", formattedValue);
          }
        }
      },
    },
    needborrowtamount: function () {
      var needborrow = 0;
      if (
        this.margin == "margin" &&
        this.leverageCtidInfo.tamount != undefined &&
        this.symbleinfo.pricedigits != undefined
      ) {
        needborrow = this.global_get_tofixed(
          this.getBuyAmount -
          (this.leverageCtidInfo.tamount < 0
            ? 0
            : this.leverageCtidInfo.tamount),
          this.symbleinfo.pricedigits
        );
      }
      needborrow = needborrow <= 0 ? 0 : needborrow;
      return needborrow;
    },
    //设置卖出交易额
    getSaleAmount: function () {
      const n = this.$np.times(
        this.copeEntrustSaleRate,
        this.copeEntrustSaleNum
      );
      const saleAmount = this.global_get_tofixed(n, this.symbleinfo.sumdigits);
      return saleAmount;
    },
    needborrowfamount: function () {
      var needborrow = 0;
      if (
        this.margin == "margin" &&
        this.leverageCtidInfo.famount != undefined &&
        this.symbleinfo.pricedigits != undefined
      ) {
        needborrow = this.global_get_tofixed(
          this.copeEntrustSaleNum -
          (this.leverageCtidInfo.famount < 0
            ? 0
            : this.leverageCtidInfo.famount),
          this.symbleinfo.amountdigits
        );
      }
      needborrow = needborrow <= 0 ? 0 : needborrow;
      return needborrow;
    },
    //计算btc可买量
    buyable: function () {
      const a = this.global_get_tofixed(
        this.tradingDealTo.canuseamount,
        this.global_get_decimal(this.symbleinfo.tcurrencyname).a
      );
      const num = this.global_get_tofixed(this.$store.getters.get_to_from_exchange_rate(
        a,
        this.copeEntrustBuyRate
      ), this.symbleinfo.amountdigits)
      return num;
    },
  },
  watch: {
    entrustBuyRate: function (val) {
      this.copeEntrustBuyRate = this.global_get_tofixed(
        val,
        this.symbleinfo.pricedigits
      );
    },
    entrustSaleRate: function (val) {
      this.copeEntrustSaleRate = this.global_get_tofixed(
        val,
        this.symbleinfo.pricedigits
      );
    },
    entrustBuyNum: function (val) {
      if (val == "--") {
        newval = 0;
      }
      let newval = val;
      if (this.buyable < Number(val)) {
        newval = this.buyable;
      }
      this.copeEntrustBuyNum = this.global_get_tofixed(
        newval,
        this.symbleinfo.amountdigits
      );
    },
    entrustSaleNum: function (val) {
      if (val == "--") {
        newval = 0;
      }
      let newval = val;
      const a = this.global_get_tofixed(
        this.tradingDealFrom.canuseamount,
        this.global_get_decimal(this.symbleinfo.fcurrencyname).a
      );
      if (a < Number(val)) {
        newval = a;
      }
      this.copeEntrustSaleNum = this.global_get_tofixed(
        newval,
        this.symbleinfo.amountdigits
      );
    },
  },
  mounted() { },
  subscribe() {
    return {
      //订阅下单状态
      changeDealState() {
        this.buyState = false;
        this.saleState = false;
      },
    };
  },
  created() { },
  methods: {
    showPopTrasfer() {
      this.$emit("onOpenTransferPopup", true);
    },
    formatTooltip(val) {
      return val + "%";
    },
    toRecharge(assets) {
      this.$router.push({
        name: "person-wallet",
        params: { id: assets.currency.id },
      });
    },
    //设置买入量
    getEntrustBuyNum(num) {
      const n = this.global_get_tofixed(
        this.buyable * num,
        this.symbleinfo.amountdigits
      );
      this.copeEntrustBuyNum = n;
    },
    //设置卖出量
    getEntrustSaleNum(num) {
      this.saledecimals = num;
      this.copeEntrustSaleNum = this.global_get_tofixed(
        this.tradingDealFrom.canuseamount * num,
        this.symbleinfo.amountdigits
      );
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
    //买入卖出交易
    buyDeal() {
      if (this.buyState) return;
      this.buyState = true;
      this.copeEntrustBuyNum = this.global_get_replace_dot(
        this.copeEntrustBuyNum
      );
      this.copeEntrustBuyRate = this.global_get_replace_dot(
        this.copeEntrustBuyRate
      );
      this.dealModel.ordertype = this.margin == "margin" ? 4 : 1;
      const dealModel = Object.assign({}, this.dealModel);
      dealModel.price = Number(this.copeEntrustBuyRate);
      dealModel.amount = Number(this.copeEntrustBuyNum);
      dealModel.ctid = this.symbleinfo.id.toString();
      if (Number(this.getBuyAmount) <= 0) {
        this.$store.commit("set_message", {
          type: "error",
          text: this.$t("patch.volumeLzero"),
        });
        this.buyState = false;
        return;
      }
      if (Number(this.copeEntrustBuyNum) > Number(this.buyable)) {
        this.$store.commit("set_message", {
          type: "error",
          text: this.$t("patch.buyCount"),
        });
        this.buyState = false;
        return;
      }
      var _self = this;
      this.$store
        .dispatch("trading_order_create", dealModel)
        .then((res) => {
          if (res.data) {
            /*发布*/
            _self.$pubsub.publish(_self.$pubsub.getOrderList);
            _self.$store.commit("set_message", { type: "ok", text: res.msg });
            _self.copeEntrustBuyNum = 0;
          }
        })
        .then(() => {
          _self.buyState = false;
        })
        .catch(() => {
          _self.buyState = false;
        });
    },
    saleDeal() {
      if (this.saleState) return;
      this.saleState = true;
      this.dealModel.ordertype = this.margin == "margin" ? 4 : 1;
      const dealModel = Object.assign({}, this.dealModel);
      dealModel.price = Number(this.copeEntrustSaleRate);
      dealModel.amount = Number(this.copeEntrustSaleNum);
      dealModel.ctid = this.symbleinfo.id;
      dealModel.direction = -1;
      if (Number(this.getSaleAmount) <= 0) {
        this.$store.commit("set_message", {
          type: "error",
          text: this.$t("patch.volumeLzero"),
        });
        this.saleState = false;
        return;
      }
      if (
        Number(this.copeEntrustSaleNum) >
        Number(this.tradingDealFrom.canuseamount)
      ) {
        this.$store.commit("set_message", {
          type: "error",
          text: this.$t("patch.sellCount"),
        });
        this.saleState = false;
        return;
      }
      var _self = this;
      this.$store
        .dispatch("trading_order_create", dealModel)
        .then((res) => {
          if (res.data) {
            /*发布*/
            _self.$pubsub.publish(_self.$pubsub.getOrderList);
            _self.$store.commit("set_message", { type: "ok", text: res.msg });
            _self.copeEntrustSaleNum = 0;
          }
        })
        .then(() => {
          _self.saleState = false;
        })
        .catch(() => {
          _self.saleState = false;
        });
    },
    clientExchangeRate: function (amount) {
      return this.global_get_tofixed(
        this.$store.getters.get_client_exchange_rate(
          this.symbleinfo.tcurrencyname,
          amount,
          this.$store.state.hex_client_exchange.active.toUpperCase()
        ),
        2
      );
    },
  },
};
</script>

<style lang="less" scoped>
@import "../../static/styles/color.less";

.available-balance,
.max-buy-amt {
  color: @cl_7e7e7e;
}

.max-buy-amt {
  margin-top: 8px;
  width: fit-content;
}
</style>

