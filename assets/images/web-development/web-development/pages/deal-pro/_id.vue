<template>
  <div class="hex-flex">
    <div class="money-exchange-content hex-flex_auto deal deal-pro ">
      <div class="money-exchange">
        <!--24小时行情start--> <!--24 hours market start-->
        <div>
          <hex-coin-list-header />
        </div>
        <!--24小时行情end--> <!--24 hours market end-->
        <div style=" display:flex; ">
          <div class="" style=" display:flex;flex-grow:1; flex-wrap: wrap; height:100%; ">
            <div class="left-list-pro">
              <!--币种列表--> <!--Currency List-->
              <hex-coinlist class="left-list-coinlist-pro" :dailyDetail="dailyDetail" :symbleinfo="symbleinfo"
                symbletype="0" />
              <!--币种列表 end--> <!--Currency list end-->

              <hex-knockdown style="max-height: 266px; margin-top: 8px;" :symbleinfo="symbleinfo" :showOrderTab="true"
                v-if="!screenSizeIsLg" />
            </div>

            <div class="" style="flex-grow:1;">
              <hex-new-money class="" :symbleinfo="symbleinfo" :dailyDetail="dailyDetail" />
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
                <div class="right-list pro" style="height: 581px !important">
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
            <div class="break"></div>
            <div class="" style="width:100%;">
              <hex-order :symbleinfo="symbleinfo" symbletype="0" />
            </div>
          </div>
          <div class="white-theme-bg" style="max-height: 1190px; width: 320px; margin-left: 6px; min-height: 1020px; ">
            <div id="exchange-block">

              <a-row>
                <a-col :lg="showOnlyStandard ? 24 : 12">
                  <a-button @click="standardBlock = true" block class="standard-btn fw-5"
                    :class="standardBlock ? 'active-tab' : ''">{{ $t('deal_new.dn1') }}</a-button>
                </a-col>
                <a-col :lg="12" v-if="!showOnlyStandard">
                  <a-button @click="standardBlock = false" block class="standard-btn fw-5 strategy-btn"
                    :class="!standardBlock ? 'active-tab' : ''">{{ $t('deal_new.dn2') }}</a-button>
                </a-col>
              </a-row>

              <a-row :gutter="16" class="mr-0">
                <a-col :lg="24">
                  <div v-show="standardBlock" style="width:320px" class="standard-section">
                    <a-tabs v-model="activeKey" class="buy" @change="onTabChange">
                      <a-tab-pane :key="1" :tab="$t('pinfo.pin9')"></a-tab-pane>
                      <a-tab-pane :key="2" :tab="$t('pinfo.pin10')"></a-tab-pane>
                    </a-tabs>

                    <div class="rang-tabs ">

                      <a-tabs v-model="orderType" @change=setOrderType>
                        <a-tab-pane :key="1" :tab="$t('legal.lgl5')">
                          <hex-limit v-if="orderType == 1" :symbleinfo="symbleinfo" :tradingDealTo="tradingDealTo"
                            margin="" :tradingDealFrom="tradingDealFrom" :entrustSaleRate="entrustSaleRate"
                            :entrustBuyRate="entrustBuyRate" :entrustSaleNum="entrustSaleNum"
                            :entrustBuyNum="entrustBuyNum" :activeKey="activeKey"
                            @onOpenTransferPopup="showPopTrasfer()" />
                        </a-tab-pane>
                        <a-tab-pane :key="2" :tab="$t('home.trades')">
                          <hex-market v-if="orderType == 2" :symbleinfo="symbleinfo" :tradingDealTo="tradingDealTo"
                            margin="" :tradingDealFrom="tradingDealFrom" :entrustSaleRate="entrustSaleRate"
                            :entrustBuyRate="entrustBuyRate" :activeKey="activeKey"
                            @onOpenTransferPopup="showPopTrasfer()" />
                        </a-tab-pane>
                        <a-tab-pane :key="3" :tab="$t('contract.planLoss')">
                          <hex-profit-loss v-if="orderType == 3" :symbleinfo="symbleinfo" :tradingDealTo="tradingDealTo"
                            margin="" :tradingDealFrom="tradingDealFrom" :entrustSaleRate="entrustSaleRate"
                            :entrustBuyRate="entrustBuyRate" :triggerPriceBuy="triggerPriceBuy"
                            :triggerPriceSale="triggerPriceSale" :entrustSaleNum="entrustSaleNum"
                            :entrustBuyNum="entrustBuyNum" :activeKey="activeKey"
                            @onOpenTransferPopup="showPopTrasfer()" />
                        </a-tab-pane>
                      </a-tabs>

                      <a-row class="px-3" v-if="!$userinfo.uid">
                        <a-col :lg="24"  >
                          <a-button style="width:100%; background:#FFAF00 !important;" class="buy-btc-btn mb-2"
                            @click="() => $router.push('/register')">{{ $t('home.headRegister') }}</a-button>
                          <a-button style="width:100%;" class="exchange-block_button_buy no_login "
                            @click="() => $router.push('/login')">{{ $t("home.headLogin") }}</a-button>
                        </a-col>
                      </a-row>
                      <a-row class="px-3 asset-detail">
                        <a-col :lg="12">
                          <p class="mt-4 mb-2 assets-detail-txt text-white">
                            {{ $t('contract.assets') }}
                            <!-- <img src="/images/white-eye.svg" /> -->
                          </p>
                        </a-col>
                        <a-col :lg="12">
                          <p class="mt-4  mb-2 assets-detail-txt text-right yellow-active">
                            <nuxt-link :to="`${selfRoute.buyAndSell}?direction=-1&tabkey=2`">
                              {{ $t('footer.footer_Buy_Crypto') }}
                            </nuxt-link>
                          </p>
                        </a-col>
                        <a-col :lg="12">
                          <p class="my-1 label fw-5">
                            {{ symbleinfo.tcurrencyname }} {{ $t('contract.ct4') }}
                          </p>
                        </a-col>
                        <a-col :lg="12">
                          <p class="my-1 text-white text-right fw-5 number-value">
                            {{ this.global_get_tofixed(tradingDealTo.canuseamount, symbleinfo.pricedigits) }} 
                            {{ symbleinfo.tcurrencyname }}
                          </p>
                        </a-col>
                        <a-col :lg="12">
                          <p class="my-1 label fw-5">
                            {{ symbleinfo.fcurrencyname }} {{ $t('contract.ct4') }}
                          </p>
                        </a-col>
                        <a-col :lg="12">
                          <p class="my-1 text-white text-right fw-5 number-value">
                            {{ this.global_get_tofixed(tradingDealFrom.canuseamount, symbleinfo.amountdigits) }} {{
                              symbleinfo.fcurrencyname }}
                          </p>
                        </a-col>
                      </a-row>
                      <a-row :gutter="8" class="px-3 redirect-links mx-0">
                        <a-col :lg="8" class="mt-3">
                          <a-button class="cancel-outline-btn fw-5  px-2" block size="small"
                            @click="toRecharge(tradingDealTo)">
                            <nuxt-link :to="selfRoute.wallet">
                              {{ $t('wallet.recharge') }}
                            </nuxt-link>
                          </a-button>
                        </a-col>
                        <a-col :lg="8" class="mt-3">
                          <a-button class="cancel-outline-btn fw-5  px-2" size="small" block @click="showPopTrasfer()">
                            {{ $t('leverage.transfer') }}
                          </a-button>
                        </a-col>
                        <a-col :lg="8" class="mt-3">
                          <a-button class="cancel-outline-btn fw-5 px-2" size="small" block>
                            <nuxt-link :to="selfRoute.convert">
                              {{ $t('convert.con3') }}
                            </nuxt-link>
                          </a-button>
                        </a-col>
                      </a-row>
                    </div>
                  </div>
                </a-col>
              </a-row>
              <div v-if="!standardBlock" style="width:320px">
                <hex-strategy :symbleinfo="symbleinfo" :tradingTo="tradingDealTo" :tradingFrom="tradingDealFrom"
                  :is-spot="true" @onOpenTransferPopup="showPopTrasfer()" />
              </div>
            </div>
          </div>
        </div>

        <!--用户订单列表 end--><!--User order list end-->
        <hex-transfer v-if="transfer_pop" :transfer_pop="transfer_pop" :ctid="symbleinfo.id" type="2"
          :closePopup="showPopTrasfer" ref="ref_transfer" />

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
            let dataInfos = this.getAssetsInfos(data, 1)
            dataInfos.map((item) => {
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
    // this.setSymbolInfosFromLocal()
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
    console.log("stratedgy ctid", strategyBotId, ctid)
     if ((strategyBotId == '' || strategyBotId == undefined || isNaN(strategyBotId)) && (ctid == '' || ctid == undefined || isNaN(ctid))) {
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


.money-exchange-content.deal.deal-pro {
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

