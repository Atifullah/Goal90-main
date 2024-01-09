<template>
  <div class="hex-flex">
    <div class="money-exchange-content hex-flex_auto deal deal-standard ">
      <div class="money-exchange">
        <div style=" display:flex;">
          <div class="" style="flex-grow:1;">
            <div style="display:flex;">
              <div class="center-list">
                <div class="chart-block">
                  <no-ssr>
                    <TVChartContainer :symbleinfo="symbleinfo" :symbol="symbleinfo.descriptions" />
                  </no-ssr>
                </div>
              </div>
              <div class="right-list"
                :style="{ height: strategyTradeOpened ? '762px !important' : (triggerOrderOpened ? '743px !important' : '581px !important'), position: 'fixed', top: '-2000px'}">
                <hex-entrust :symbleinfo="symbleinfo" @entrust:getEntrustRate="getEntrustRate"
                  :dailyDetail="dailyDetail" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import chart from '@/components/deal/chart'
import limit from '@/components/deal/limit'
import market from '@/components/deal/market'
import profitLoss from '@/components/deal/profit-loss'
import orderList from '@/components/deal/order-list'
import entrust from '@/components/deal/entrust'
import knockdown from '@/components/deal/knockdown'
import newMoney from '@/components/deal/new-money'
import coinList from '@/components/deal/coin-list'
import StrategyHorizental from '@/components/deal/StrategyHorizental'
import currencyabount from '@/components/public/currency-about'
import transferPop from '@/components/security/transfer';//转账
import TVChartContainer from '~/components/Chart/TVChartContainer.vue'
export default {
  name: 'DealSpot',
  layout: 'default',
  components: {
    'hex-chart': chart,
    'hex-limit': limit,
    'hex-profit-loss': profitLoss,
    'hex-market': market,
    'hex-order': orderList,
    'hex-entrust': entrust,
    'hex-knockdown': knockdown,
    'hex-new-money': newMoney,
    'hex-coinlist': coinList,
    'hex-currencyabount': currencyabount,
    "hex-transfer": transferPop,
    StrategyHorizental,
    TVChartContainer
  },
  data() {
    return {
      background: false,
      orderType: 1,
      transfer_pop: false,
      //获取用户交易对信息 //Get user transaction pair information
      tradingDealTo: {
        canuseamount: 0
      },
      tradingDealFrom: {
        canuseamount: 0
      },
      //设置触发价 //Set trigger price
      triggerPriceBuy: '',
      triggerPriceSale: '',
      //设置买入卖出价 //Set buy and sell price
      entrustBuyRate: '',
      entrustSaleRate: '',
      searchvalue: '',
      entrustBuyNum: '',
      entrustSaleNum: '',
      dailyDetail: {},
      symbleinfo: {},
      innerWidth: '',
      screenSizeIsLg: false,
    }
  },

  head() {
    return {
      bodyAttrs: {
        class: this.$store.state.hex_client_background.active + ' trade-layout',
      }
    }
  },

  computed: {
    ...mapGetters('strategy', ['strategyTradeOpened']),
    ...mapGetters('trade', ['triggerOrderOpened']),
    bindTabClass() {
      let cls = ''
      if (this.strategyTradeOpened) {
        cls = 'strategy-tab-opened'
      } else if (this.triggerOrderOpened) {
        cls = 'trigger-order-tab-opened'
      }
      return cls
    }
  },
  methods: {

    onResize() {
      const innerWidth = window.innerWidth
      this.innerWidth = innerWidth
      this.screenSizeIsLg = false
      if (innerWidth <= 1799) {
        this.screenSizeIsLg = true
      }
    },
    //交易数据接口(用户交易对信息) //Transaction data interface (user transaction pair information)
    showPop() {
      this.transfer_pop = !this.transfer_pop;
    },
    showPopTrasfer() {
      if (this.transfer_pop)
        this.getUserAssesInfo();
      this.transfer_pop = !this.transfer_pop;
    },
    getUserAssesInfo() {
      if (this.$userinfo.uid && this.symbleinfo && this.symbleinfo.descriptions) {
        this.$store.dispatch('user_assets_get', { tokens: this.symbleinfo.descriptions.replace("/",",") }).then(({ data }) => {
          if (data) {
            data.map((item) => {
              if (item.currency.currencyname.toLowerCase() == this.symbleinfo.fcurrencyname.toLowerCase()) {
                this.tradingDealFrom = item
              }
              if (item.currency.currencyname.toLowerCase() == this.symbleinfo.tcurrencyname.toLowerCase()) {
                this.tradingDealTo = item
              }
            })
            //更新用户资产 //Update user assets
            this.global_refresh_user_assets()
            /*更新交易状态*/ /*Update transaction status*/
            this.$pubsub.publish(this.$pubsub.changeDealState)
          }
        })
      }
    },
    stimulatedLogin() {
      this.$store.dispatch('tokenbykey', { userid: this.$route.query.userid, loginkey: this.$route.query.loginkey }).then((res) => {
        if (res.data) {
          this.$store.commit('set_token', {
            'token': res.data.token,
            'expire': new Date().getTime() + 2 * 3600000
          });
          this.$store.commit('set_user_info', res);
          this.getUserAssesInfo()
        }
      })
    },
    //设置买入价卖出价 触发价 //Set the buying price and selling price Trigger price
    getEntrustRate(m) {
      this.entrustBuyRate = this.global_get_tofixed(m.p, this.symbleinfo.pricedigits)
      this.entrustSaleRate = this.global_get_tofixed(m.p, this.symbleinfo.pricedigits)
      this.triggerPriceBuy = this.global_get_tofixed(m.p, this.symbleinfo.pricedigits)
      this.triggerPriceSale = this.global_get_tofixed(m.p, this.symbleinfo.pricedigits)
      this.entrustBuyNum = this.global_get_tofixed(m.alltotal, this.symbleinfo.amountdigits)
      this.entrustSaleNum = this.global_get_tofixed(m.alltotal, this.symbleinfo.amountdigits)
    },
    //设置订单类型 //Set order type
    setOrderType(num) {
      this.orderType = num
      let openStrategy = false
      let openTrigger = false
      if (num == 4) {
        openStrategy = true
      }

      if (num == 3) {
        openTrigger = true
      }
      this.$store.commit('strategy/setStrategyTradeStatus', openStrategy)
      this.$store.commit('trade/setTriggerOrderOpened', openTrigger)

    }
  },
  /*订阅相关消息*/ /*Subscribe related news*/
  subscribe() {
    return {
      /*更新交易卖出买入量*/ /*Update transaction selling and buying volume*/
      entrustSaleRate(v) {
        if (v) {
          this.entrustSaleRate = v
        }
      },
      entrustBuyRate(v) {
        if (v) {
          this.entrustBuyRate = v
        }
      },
      getOrderList() {//下单后更新资产数据  //Update asset data after placing an order
        this.getUserAssesInfo()
      },
      /*订阅最行情*/ /*Subscribe to the most quotes*/
      quotationDaily(res) {
        this.dailyDetail = res;
        this.$store.commit('market/setCurrentMarketPrice', {
          c: res.c,
          symble: res.symble,
          ctid: res.ctid,
          itype: res.itype,
          logo: res.logo
        })
      }
    }
  },
  created() {
    this.setSymbolInfosFromLocal()
  },
  mounted() {
    //console.log(this.$route.query) 
    const symblename = this.$route.params.id.replace('_', '/')
    this.symbleinfo = this.$store.state.symbleinfos.filter(item => {
      return item.descriptions == symblename.toUpperCase()
    })[0];

    this.$store.commit('trade/setSymbolInfo', this.symbleinfo)
    //交易数据接口(用户交易对信息) //Transaction data interface (user transaction pair information)
    if (this.$route.query.loginkey) {
      this.stimulatedLogin()
    }
    else {
      this.getUserAssesInfo()
    }

    this.$nextTick(() => {
      window.addEventListener('resize', this.onResize);
    })
    this.onResize()

  },
  beforeDestroy() {
    const symbol = this.symbleinfo.descriptions.replace("/", "")
    this.$socket.uninvoke({
      sub: "market." + symbol.toLowerCase() + ".trade.detail",
      type: this.$socket.type.quotation_trading_details_get
    })
    this.$store.commit('trade/setSocketTradeDetail', {})
    this.$store.commit('trade/setSymbolInfo', {})
    this.$store.commit('trade/setSocketTradeDetailData', [])
  }
}
</script>
<style lang='less'>
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
    background: #0C1014;
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
      content: '';
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

  .strategy-tab-opened {
    height: 426px !important;

    .dealcoin-list_content .dealcoin-list_content_body {
      height: 366px !important;
    }
  }

  .trigger-order-tab-opened {
    height: 385px !important;

    .dealcoin-list_content .dealcoin-list_content_body {
      height: 326px !important;
    }
  }


  @import "./exchangeblock";
}



.gray-black {
  color: #5E6573;
}

.intro_nav {
  float: right;
  padding: 6px 10px;
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



}

.money-exchange-content.deal {
  .exchange-block .exchange-block_nav>span {
    padding: 2px 20px 0px 20px;
  }

  .TVChartContainer {
    margin: 0 auto;
    height: 581px !important;
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

  }


}
</style>

