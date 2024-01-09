<template>
  <div class="hex-flex hide-history-tab">
    <div class="money-exchange-content hex-flex_auto deal deal-standard">
      <div class="money-exchange" :class="bindTabClass">
        <!--24小时行情start-->
        <!--24 hours market start-->
        <!-- <hex-new-money :symbleinfo="symbleinfo" :dailyDetail="dailyDetail"/> -->
        <!--24小时行情end-->
        <!--24 hours market end-->
        <div style="display: flex">
          <div class="left-list">
            <!--币种列表-->
            <!--Currency List-->
            <hex-coinlist class="left-list-coinlist" :dailyDetail="dailyDetail" :symbleinfo="symbleinfo" symbletype="0" />
            <!--币种列表 end-->
            <!--Currency list end-->
            <!--最新成交 start-->
            <!--Latest transaction start-->
            <hex-knockdown class="left-list-knockdown" :symbleinfo="symbleinfo" v-if="screenSizeIsLg" />
            <!--最新成交 end-->
            <!--Latest transaction end-->
          </div>
          <div class="" style="flex-grow: 1">
            <hex-new-money class="" :symbleinfo="symbleinfo" :dailyDetail="dailyDetail" />
            <div style="display: flex">
              <div class="center-list">
                <div class="chart-block" style="height: 365px">
                  <!-- TradingView Widget BEGIN -->
                  <no-ssr>
                    <TVChartContainer :symbleinfo="symbleinfo" :symbol="symbleinfo.descriptions" />
                    <!-- <hex-chart :symbleinfo="symbleinfo" /> -->
                  </no-ssr>
                  <!-- TradingView Widget END -->
                </div>
                <div class="exchange-block">
                  <div class="exchange-block_nav">
                    <div class="nav-content">
                      <span :class="{ active: orderType == 1 }" @click="setOrderType(1)">
                        {{ $t("deal.limitedDeal") }}
                      </span>
                      <span :class="{ active: orderType == 2 }" @click="setOrderType(2)">
                        {{ $t("deal.marketDeal") }}
                      </span>
                      <span :class="{ active: orderType == 3 }" @click="setOrderType(3)">
                        {{ $t("contract.planLoss") }}
                      </span>
                      <span :class="{ active: orderType == 4 }" @click="setOrderType(4)">
                        {{ $t("deal.strategyDeal") }}
                      </span>

                      <div class="intro_nav">
                        <span class="gray-white">
                          {{ symbleinfo.fcurrencyname }}
                        </span>
                        <span class="gray-black">/{{
                          symbleinfo.tcurrencyname
                        }}</span>
                      </div>
                    </div>
                  </div>

                  <!--限价交易 start-->
                  <!--Limit price transaction start-->
                  <hex-limit v-if="orderType == 1" :symbleinfo="symbleinfo" :tradingDealTo="tradingDealTo" margin=""
                    :tradingDealFrom="tradingDealFrom" :entrustSaleRate="entrustSaleRate" :entrustBuyRate="entrustBuyRate"
                    :entrustSaleNum="entrustSaleNum" :entrustBuyNum="entrustBuyNum" />
                  <!--限价交易 end-->
                  <!--Price limit transaction end-->

                  <!--市价交易 start-->
                  <!--Market price transaction start-->
                  <hex-market v-if="orderType == 2" :symbleinfo="symbleinfo" :tradingDealTo="tradingDealTo" margin=""
                    :tradingDealFrom="tradingDealFrom" :entrustSaleRate="entrustSaleRate"
                    :entrustBuyRate="entrustBuyRate" />
                  <!--市价交易end-->
                  <!--market price transaction end-->
                  <!--止盈止损交易start--><!--Plan entrusted transaction start-->
                  <hex-profit-loss v-if="orderType == 3" :symbleinfo="symbleinfo" :tradingDealTo="tradingDealTo" margin=""
                    :tradingDealFrom="tradingDealFrom" :entrustSaleRate="entrustSaleRate" :entrustBuyRate="entrustBuyRate"
                    :triggerPriceBuy="triggerPriceBuy" :triggerPriceSale="triggerPriceSale"
                    :entrustSaleNum="entrustSaleNum" :entrustBuyNum="entrustBuyNum" />
                  <!--止盈止损交易end-->
                  <!--Plan entrusted transaction end-->
                  <!--币种介绍-->
                  <!--Currency Introduction-->
                  <!-- <hex-currencyabount v-show="orderType == 4" :symble="symbleinfo.fcurrencyname" /> -->

                  <StrategyHorizental :symbleinfo="symbleinfo" :tradingTo="tradingDealTo" :tradingFrom="tradingDealFrom"
                    :is-spot="true" v-if="orderType == 4" @onOpenTransferPopup="showPopTrasfer()" />
                </div>
              </div>
              <!--中间交易模块-->
              <!--Intermediate transaction module-->

              <div class="right-list" :style="{
                height: strategyTradeOpened
                  ? ' '
                  : triggerOrderOpened
                    ? ''
                    : '714px',
              }">
                <!--委托列表 start-->
                <!--Delegation list start-->
                <hex-entrust :symbleinfo="symbleinfo" @entrust:getEntrustRate="getEntrustRate"
                  :dailyDetail="dailyDetail" />
                <!--委托列表 end-->
                <!--Delegation list end-->
              </div>
              <div class="after-right-list">
                <!--委托列表 start-->
                <!--Delegation list start-->
                <hex-knockdown :symbleinfo="symbleinfo" v-if="!screenSizeIsLg" />
                <!--委托列表 end-->
                <!--Delegation list end-->
              </div>
            </div>
          </div>
        </div>
        <!--用户订单列表start--><!--User order list start-->
        <hex-order :symbleinfo="symbleinfo" symbletype="0" />
        <!--用户订单列表end--><!--User order list end-->

        <hex-transfer v-if="transfer_pop" :transfer_pop="transfer_pop" :ctid="symbleinfo.id" type="1"
          :closePopup="showPop" ref="ref_transfer" />
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import chart from "@/components/deal/chart";
import limit from "@/components/deal/limit";
import market from "@/components/deal/market";
import profitLoss from "@/components/deal/profit-loss";
import orderList from "@/components/deal/order-list";
import entrust from "@/components/deal/entrust";
import knockdown from "@/components/deal/knockdown";
import newMoney from "@/components/deal/new-money";
import coinList from "@/components/deal/coin-list";
import StrategyHorizental from "@/components/deal/StrategyHorizental";
import currencyabount from "@/components/public/currency-about";
import transferPop from "@/components/security/transfer"; //转账
import TVChartContainer from "~/components/Chart/TVChartContainer.vue";
export default {
  name: "DealSpot",
  layout: "default",
  components: {
    "hex-chart": chart,
    "hex-limit": limit,
    "hex-profit-loss": profitLoss,
    "hex-market": market,
    "hex-order": orderList,
    "hex-entrust": entrust,
    "hex-knockdown": knockdown,
    "hex-new-money": newMoney,
    "hex-coinlist": coinList,
    "hex-currencyabount": currencyabount,
    "hex-transfer": transferPop,
    StrategyHorizental,
    TVChartContainer,
  },
  data() {
    return {
      background: false,
      orderType: 1,
      transfer_pop: false,
      //获取用户交易对信息 //Get user transaction pair information
      tradingDealTo: {
        canuseamount: 0,
      },
      tradingDealFrom: {
        canuseamount: 0,
      },
      //设置触发价 //Set trigger price
      triggerPriceBuy: "",
      triggerPriceSale: "",
      //设置买入卖出价 //Set buy and sell price
      entrustBuyRate: "",
      entrustSaleRate: "",
      searchvalue: "",
      entrustBuyNum: "",
      entrustSaleNum: "",
      dailyDetail: {},
      symbleinfo: {},
      innerWidth: "",
      screenSizeIsLg: false,
    };
  },

  head() {
    return {
      bodyAttrs: {
        class:
          this.$store.state.hex_client_background.active +
          " trade-layout",
      },
    };
  },

  computed: {
    ...mapGetters("strategy", ["strategyTradeOpened", "strategyTabPosition"]),
    ...mapGetters("trade", ["triggerOrderOpened"]),
    bindTabClass() {
      let cls = "";
      if (this.strategyTradeOpened) {
        cls = "strategy-tab-opened";
      } else if (this.triggerOrderOpened) {
        cls = "trigger-order-tab-opened";
      }

      if (this.strategyTabPosition == 'auto') {
        cls = cls + ' strategy-auto-tab-is-active'
      }
      return cls;
    },
  },
  methods: {
    onResize() {
      const innerWidth = window.innerWidth;
      this.innerWidth = innerWidth;
      this.screenSizeIsLg = false;
      if (innerWidth <= 1799) {
        this.screenSizeIsLg = true;
      }
    },
    //交易数据接口(用户交易对信息) //Transaction data interface (user transaction pair information)
    showPop() {
      this.transfer_pop = !this.transfer_pop;
    },
    showPopTrasfer() {
      if (this.transfer_pop) this.getUserAssesInfo();
      this.transfer_pop = !this.transfer_pop;
    },
    getUserAssesInfo() {
      if (
        this.$userinfo.uid &&
        this.symbleinfo &&
        this.symbleinfo.descriptions
      ) {
        this.$store
          .dispatch("user_assets_get", {
            tokens: this.symbleinfo.descriptions.replace("/",",")
          })
          .then(({ data }) => {
            if (data) {
              console.log('assertInfo-----', data)
              let assertInfo = this.getAssetsInfos(data, 1)
              assertInfo.map((item) => {
                if (
                  item.currency.currencyname.toLowerCase() ==
                  this.symbleinfo.fcurrencyname.toLowerCase()
                ) {
                  this.tradingDealFrom = item
                } 
                if (
                  item.currency.currencyname.toLowerCase() ==
                  this.symbleinfo.tcurrencyname.toLowerCase()
                ) {
                  this.tradingDealTo = item
                }
              });
              //更新用户资产 //Update user assets
              this.global_refresh_user_assets();
              /*更新交易状态*/ /*Update transaction status*/
              this.$pubsub.publish(this.$pubsub.changeDealState);
            }
          });
      }
    },
    stimulatedLogin() {
      this.$store
        .dispatch("tokenbykey", {
          userid: this.$route.query.userid,
          loginkey: this.$route.query.loginkey,
        })
        .then((res) => {
          if (res.data) {
            this.$store.commit("set_token", {
              token: res.data.token,
              expire: new Date().getTime() + 2 * 3600000,
            });
            this.$store.commit("set_user_info", res);
            this.getUserAssesInfo();
          }
        });
    },
    //设置买入价卖出价 触发价 //Set the buying price and selling price Trigger price
    getEntrustRate(m) {
      this.entrustBuyRate = this.global_get_tofixed(
        m.p,
        this.symbleinfo.pricedigits
      );
      this.entrustSaleRate = this.global_get_tofixed(
        m.p,
        this.symbleinfo.pricedigits
      );
      this.triggerPriceBuy = this.global_get_tofixed(
        m.p,
        this.symbleinfo.pricedigits
      );
      this.triggerPriceSale = this.global_get_tofixed(
        m.p,
        this.symbleinfo.pricedigits
      );
      this.entrustBuyNum = this.global_get_tofixed(
        m.alltotal,
        this.symbleinfo.amountdigits
      );
      this.entrustSaleNum = this.global_get_tofixed(
        m.alltotal,
        this.symbleinfo.amountdigits
      );
    },
    //设置订单类型 //Set order type
    setOrderType(num) {
      this.orderType = num;
      let openStrategy = false;
      let openTrigger = false;
      if (num == 4) {
        openStrategy = true;
      }

      if (num == 3) {
        openTrigger = true;
      }
      this.$store.commit("strategy/setStrategyTradeStatus", openStrategy);
      this.$store.commit("trade/setTriggerOrderOpened", openTrigger);
    },
  },
  /*订阅相关消息*/ /*Subscribe related news*/
  subscribe() {
    return {
      /*更新交易卖出买入量*/ /*Update transaction selling and buying volume*/
      entrustSaleRate(v) {
        if (v) {
          this.entrustSaleRate = v;
        }
      },
      entrustBuyRate(v) {
        if (v) {
          this.entrustBuyRate = v;
        }
      },
      getOrderList() {
        //下单后更新资产数据  //Update asset data after placing an order
        this.getUserAssesInfo();
      },
      /*订阅最行情*/ /*Subscribe to the most quotes*/
      quotationDaily(res) {
        this.dailyDetail = res;
        this.$store.commit("market/setCurrentMarketPrice", {
          c: res.c,
          symble: res.symble,
          ctid: res.ctid,
          itype: res.itype,
          logo: res.logo,
        });
      },
    };
  },
  created() { 
    this.setSymbolInfosFromLocal()
  },
  mounted() {
    //console.log(this.$route.query)
    const symblename = this.$route.params.id.replace("_", "/");
    this.symbleinfo = this.$store.state.symbleinfos.filter((item) => {
      return item.descriptions == symblename.toUpperCase();
    })[0];

    this.$store.commit("trade/setSymbolInfo", this.symbleinfo);
    //交易数据接口(用户交易对信息) //Transaction data interface (user transaction pair information)
    if (this.$route.query.loginkey) {
      this.stimulatedLogin();
    } else {
      this.getUserAssesInfo();
    }

    this.$nextTick(() => {
      window.addEventListener("resize", this.onResize);
    });
    this.onResize();
  },
  beforeDestroy() {
    const symbol = this.symbleinfo.descriptions.replace("/", "");
    this.$socket.uninvoke({
      sub: "market." + symbol.toLowerCase() + ".trade.detail",
      type: this.$socket.type.quotation_trading_details_get,
    })
    this.$store.commit("trade/setSocketTradeDetail", {})
    this.$store.commit("trade/setSymbolInfo", {})
    this.$store.commit("trade/setSocketTradeDetailData", [])

    this.$store.commit('strategy/setStrategyTradeStatus', false)
    this.$store.commit('trade/setTriggerOrderOpened', false)
  },
};
</script>
<style lang="less">
@import "../../static/styles/color";

.money-exchange-content.deal {
  background-color: @cl_global;

  .left-list,
  .center-list,
  .right-list,
  .after-right-list {
    float: left;
  }

  .left-list {
    width: 320px;
    height: 714px !important;
    margin-right: 6px;
    margin-bottom: 6px;
  }

  .search-area {
    width: 320px;
    background: #0c1014;
    margin-right: 6px;
  }

  .center-list {
    margin-right: 6px;
    margin-bottom: 6px;
    flex-grow: 1;
  }

  .right-list {
    margin-bottom: 6px;
    width: 320px;
  }

  .after-right-list {
    display: none;
    margin-bottom: 6px;
    margin-left: 6px;
    width: 320px !important;
  }

  .entrust-list {
    height: 100% !important;
    width: 320px !important;
  }

  .knockdown-list {
    height: 344px !important;
  }

  .money-exchange {
    width: 100%;
    // min-width: 1440px;
    // margin: auto;

    .content {
      position: relative;
      overflow: hidden;
      width: 100%;
      display: flex;
    }

    .content:after {
      content: "";
      display: block;
      clear: both;
    }

    .chart-block {
      // width: 868px;
      width: 100%;
      background-color: @cl_content;
      overflow: hidden;
      margin-bottom: 6px;
    }
  }

  .left-list {
    height: 788px !important;
  }

  .right-list,
  .after-right-list {
    height: 714px !important;
  }

  .trigger-order-tab-opened {
    .left-list {
      height: 830px !important;

      .left-list-knockdown {
        height: 397px !important;
      }

      .dealcoin-list_content .dealcoin-list_content_body {
        height: 331px !important;
      }
    }

    .right-list,
    .after-right-list {
      height: 757px !important;
    }
  }

  .strategy-tab-opened {
    .left-list {
      height: 847px !important;

      .left-list-knockdown {
        height: 414px !important;
      }

      .dealcoin-list_content .dealcoin-list_content_body {
        height: 348px !important;
      }
    }

    .right-list,
    .after-right-list {
      height: 774px !important;
    }
  }



  @import "./exchangeblock";

  .exchange-block .exchange-block_nav {
    border-bottom: 1px solid #393939;
    padding: 24px 0px 22px 0px;

    .nav-content {
      top: -1px;
      position: absolute;
      width: 100%;

      span.active:first-child {
        border-left: 0px;
      }
    }

    .nav-content>span {
      padding: 2px 20px 0px 20px !important;
      line-height: 44px !important;
    }

    .active {
      background-color: #12181d;
      border-left: 1px solid #393939;
      border-right: 1px solid #393939;
    }

  }
}

.gray-black {
  color: #5e6573;
}

.intro_nav {
  float: right;
  padding: 14px 16px;
  cursor: pointer;
}

.knockdown-list_content_body {
  height: 270px !important;
}

.money-exchange-content .exchange-block {
  min-height: 344px !important;
  // width: 868px;
}

.left-list-coinlist {
  height: 427px !important;
}

.left-list-knockdown {
  height: 355px !important;
}

@media only screen and (max-width: 1799px) {
  .hide-history-tab {
    .money-exchange-content.deal {

      .right-list {
        .order-book {
          display: block;
        }

        .market-trade {
          display: none;
        }
      }

      .left-list {
        .order-book {
          display: none !important;
        }
      }

      .strategy-tab-opened.strategy-auto-tab-is-active {
        .left-list {
          height: 806px !important;

          .left-list-knockdown {
            height: 373px !important;
          }

          .dealcoin-list_content .dealcoin-list_content_body {
            height: 306px !important;
          }
        }

        .right-list,
        .after-right-list {
          height: 732px !important;
        }
      }

    }
  }
}

.money-exchange-content.deal {
  .exchange-block .exchange-block_nav>span {
    padding: 2px 20px 0px 20px;
  }

  .TVChartContainer {
    margin: 0 auto;
    height: 365px !important;
  }
}

@media only screen and (min-width: 1800px) {
  .money-exchange-content {
    .money-exchange {
      width: 100%;
    }

    .after-right-list {
      display: block !important;
      margin-bottom: 6px;
      margin-left: 6px;
      width: 320px;

      .dealcoin-list {
        .dealcoin-list_content {
          .dealcoin-list_content_body {
            height: 650px;
          }
        }
      }

      .order-book {
        display: none !important;
      }
    }

    .strategy-tab-opened {
      .after-right-list {
        .dealcoin-list {
          .dealcoin-list_content {
            .dealcoin-list_content_body {
              height: 708px;
            }
          }
        }
      }
    }


    .trigger-order-tab-opened {
      .after-right-list {
        .dealcoin-list {
          .dealcoin-list_content {
            .dealcoin-list_content_body {
              height: 691px;
            }
          }
        }
      }
    }

    .strategy-tab-opened.strategy-auto-tab-is-active {
      .left-list {
        height: 805px !important;

        .left-list-knockdown {
          height: 414px !important;
        }

        .dealcoin-list_content .dealcoin-list_content_body {
          height: 348px !important;
        }
      }

      .right-list,
      .after-right-list {
        height: 732px !important;
      }
    }
  }

  .deal-standard {
    .left-list {
      .order-book {
        display: none !important;
      }

      .dealcoin-list .coin-content .coin-list_content {
        max-height: 656px !important;
      }
    }

    .left-list-knockdown {
      display: none;
    }

    .left-list-coinlist {
      height: 100% !important;
    }



    .trigger-order-tab-opened {
      .left-list {
        .dealcoin-list .coin-content .coin-list_content {
          max-height: 701px !important;
        }
      }
    }

    .strategy-tab-opened {
      .left-list {
        .dealcoin-list .coin-content .coin-list_content {
          max-height: 719px !important;
        }
      }
    }
  }
}
</style>
