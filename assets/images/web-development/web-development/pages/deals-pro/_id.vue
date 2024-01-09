<template>
  <div class="hex-flex">
    <div class="money-exchange-content hex-flex_auto deal deal-pro ">
      <div class="money-exchange">
        <div style=" display:flex; ">
          <div class="" style=" display:flex;flex-grow:1; flex-wrap: wrap; height:100%; ">
            <div class="" style="flex-grow:1;">
              <!-- <hex-new-money class="" :symbleinfo="symbleinfo" :dailyDetail="dailyDetail" /> -->
              <div style="display:flex;">
                <div class="center-list" style="height: 581px;">
                  <div class="chart-block" style="height: 581px;" id="dealProTvContainer">
                    <!-- TradingView Widget BEGIN -->
                    <no-ssr>
                      <TVChartContainer :symbol="symbleinfo.descriptions" :symbleinfo="symbleinfo" />
                      <!-- <hex-chart :symbleinfo="symbleinfo" /> -->
                    </no-ssr>
                    <!-- TradingView Widget END -->
                  </div>
                </div>
                <div class="right-list pro" style="height: 581px; position: fixed; top: -2000px;">
                  <!--委托列表 start--> <!--Delegation list start-->

                  <hex-entrust v-show="entrustTypeRight == 8" :symbleinfo="symbleinfo"
                    @entrust:getEntrustRate="getEntrustRate" @setEntrustType="setEntrustTypeRight"
                    :showMarketTab="true" />


                  <hex-knockdown style="height: 581px;" v-if="entrustTypeRight == 10 && screenSizeIsLg"
                    :symbleinfo="symbleinfo" @setEntrustType="setEntrustTypeRight" :showOrderTab="true" />
                  <!--委托列表 end--> <!--Delegation list end -->
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import chart from '@/components/deal/chart'
import limit from '@/components/deal/limit-pro'
import market from '@/components/deal/market-pro'
import profitLoss from '@/components/deal/profit-loss-pro'
import orderList from '@/components/deal/order-list'
import entrust from '@/components/deal/entrust'
import knockdown from '@/components/deal/knockdown'
import newMoney from '@/components/deal/new-money'
import coinList from '@/components/deal/coin-list'
import currencyabount from '@/components/public/currency-about'
import coinListHeader from '@/components/deal/coin-list-header'
import strategy from '@/components/deal/strategy.vue'
import transferPop from '@/components/security/transfer';//转账
import TVChartContainer from '~/components/Chart/TVChartContainer.vue'


export default {
  name: 'DealPro',
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
    'hex-coin-list-header': coinListHeader,
    'hex-strategy': strategy,
    'hex-transfer': transferPop,
    TVChartContainer
  },
  data() {
    return {
      activeKey: 1,
      background: false,
      standardBlock: true,
      showOnlyStandard: false,
      transfer_pop: false,
      orderType: 1,
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
      entrustTypeRight: 8,
      searchvalue: '',
      entrustBuyNum: '',
      entrustSaleNum: '',
      dailyDetail: {},
      symbleinfo: {},
      innerWidth: '',
      screenSizeIsLg: false,
      symbleParamString: ''
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
    selfRoute: function () {
      return this.$store.state.route
    },
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
    setEntrustTypeRight(num) {
      this.entrustTypeRight = num
    },
    toRecharge(assets) {
      this.$router.push({ name: "person-wallet", params: { id: assets.currency.id } });
    },
    onTabChange(key) {
      this.updateTabBackground(key);
    },
    updateTabBackground(key) {
      const element = document.documentElement;
      if (element) {
        element.style.setProperty('--active_tab_color', key == '1' ? '#0ECB81' : '#f6465d'); // Use Dynamic color variable here.
      }
    },
    stimulatedLogin() {
      this.$store.dispatch('tokenbykey', { userid: this.$route.query.userid, loginKey: this.$route.query.loginkey }).then((res) => {
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
    },

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
        // console.log('qutationdaily', res);
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
    // //console.log(this.$route.query) 
    // this.$store.commit('market/setCurrentMarketPrice', { c: 3, symbol: 'awaeeen' })
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

    const route = this.$route
    const strategyBotId = route.query["strategy-bot-id"]
    const ctid = route.query.ctid
    console.log("stratedgy", strategyBotId)
    if (strategyBotId == '' || strategyBotId == undefined || isNaN(strategyBotId)) {
      this.standardBlock = true
      this.showOnlyStandard = false

    } else if ((strategyBotId == '' || strategyBotId == undefined || isNaN(strategyBotId)) && (ctid == '' || ctid == undefined || isNaN(ctid))) {
      this.showOnlyStandard = true
      this.standardBlock = true
    } else {
      this.showOnlyStandard = false
      this.standardBlock = false
    }


  },
  beforeDestroy() {
    const symbol = this.symbleinfo.descriptions.replace("/", "")
    this.$socket.uninvoke({
      sub: "market." + symbol.toLowerCase() + ".trade.detail",
      type: this.$socket.type.quotation_trading_details_get
    })
    this.$store.commit('trade/setSocketTradeDetail', { data: [] })
    this.$store.commit('trade/setSymbolInfo', {})
    this.$store.commit('trade/setSocketTradeDetailData', [])
  }
}
</script>
<style lang="scss" >
@import '@/assets/scss/pages/deal/exchange-block.scss';
</style>
<style lang='less'>
@import "../../static/styles/color";


.money-exchange-content.deal-pro {
  background-color: @cl_global;

  .exchange-block_owner_tip {
    position: absolute;
    background-color: #202020;
    height: 24px;
    line-height: 24px;
    font-size: 12px;
    padding: 0 10px;
    width: 100%;
    color: @cl_CED3DD;
    top: 34px;
  }

  .left-list-pro,
  .center-list,
  .right-list,
  .after-right-list {
    float: left;
  }

  .left-list-pro {
    display: none;
    width: 320px;
    height: 100%;
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
    width: 280px;
  }

  .entrust-list {
    height: 100% !important;
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

  #dealProTvContainer .TVChartContainer {
    margin: 0 auto;
    height: 581px !important;
  }

  @import "./exchangeblock";
}

.intro_nav {
  float: right;
}

.knockdown-list_content_body {
  height: 270px !important;
}

.money-exchange-content .exchange-block {
  min-height: 344px !important;
  // width: 868px;
}

.left-list-coinlist-pro {
  height: 380px !important;
}

.left-list-knockdown {
  height: 345px;
}

.break {
  flex-basis: 100%;
  height: 0;
}



@media only screen and (max-width: 1799px) {
  .left-list-pro {
    .order-book {
      display: none;
    }

    .market-trade {
      display: block;
    }
  }

  .right-list.pro {

    .market-trade,
    .order-book {
      display: block;
    }

  }

  .right-list {
    .dealcoin-list {
      .dealcoin-list_content {
        .dealcoin-list_content_body {
          height: 520px !important;
        }
      }
    }
  }

}


@media only screen and (min-width: 1800px) {

  .deal-pro {
    .left-list-pro .dealcoin-list_content_body {
      height: 195px !important;
    }

    .left-list-pro {
      display: block !important;
      width: 280px;
      height: 100%;
      margin-right: 6px;
      margin-bottom: 6px;

      .dealcoin-list {
        .dealcoin-list_content {
          .dealcoin-list_content_body {
            height: 650px;
          }
        }
      }

      .order-book {
        display: none;
      }

      .market-trade {
        display: block;
      }


    }
  }


  .money-exchange-content {
    .money-exchange {
      width: 100%;
      //   padding:0 48px;
      //   min-width: 1440px;
      //   margin: auto;
    }

    .after-right-list {
      display: block;
      margin-bottom: 6px;
      margin-left: 6px;
      width: 280px;
    }

    .right-list {
      .dealcoin-list {
        .dealcoin-list_content {
          .dealcoin-list_content_body {
            height: 677px;
          }
        }
      }

      .order-book {
        display: block;
      }

      .market-trade {
        display: none;
      }
    }



  }

  // .left-list-knockdown{
  //   display:none;
  // }
  // .left-list-coinlist{
  //   height:776px !important;
  // }

}
</style>

