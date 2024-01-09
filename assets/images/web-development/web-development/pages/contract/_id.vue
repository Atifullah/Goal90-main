<template>
  <div class="hex-flex">
    <div class="money-exchange-content hex-flex_auto contract">
      <div class="money-exchange" :class="bindContentClass">
        <div style=" display:flex;">
          <div class="left-list">
            <!--币种列表-->
            <div class="contract">
              <hex-coinlist class="left-list-coinlist-contract" :dailyDetail="dailyDetail" :symbleinfo="symbleinfo"
                symbletype="1" />
            </div>
            <!--币种列表end-->
            <!--资产信息-->
            <div class="coin-info">
              <hex-coininfo class="left-coininfo" :symblefrom="symbleinfo.fcurrencyname" v-show="entrustType == 9"
                :contractassesinfo="contractassesinfos[0]" @showPopHz="showPopTrasfer" @setEntrustType="setEntrustType" :dailyDetail="dailyDetail"/>
              <hex-knockdown class="left-list-knockdown-contract margin" :symbleinfo="symbleinfo"
                @setEntrustType="setEntrustType" v-if="screenSizeIsLg && entrustType == 10" :showAssetsTab="true" />
            </div>
            <!--资产信息end-->
          </div>
          <div class="" style="flex-grow:1;">
            <hex-new-money class="" :symbleinfo="symbleinfo" :dailyDetail="dailyDetail" symbletype="1" />
            <div style="display:flex;">
              <div class="center-list">
                <div class="chart-block" style="height: 382px;">
                  <!-- TradingView Widget BEGIN -->
                  <no-ssr>

                    <TVChartContainer :symbleinfo="symbleinfo" :symbol="symbleinfo.descriptions" />
                    <!-- <hex-chart class="hex-chart-margin" :symbleinfo="symbleinfo" /> -->
                  </no-ssr>
                  <!-- TradingView Widget END -->
                </div>

                <div class="exchange-block" style="overflow:inherit;min-height: 353px !important;">
                  <div class="exchange-block_tnav clearfix">
                    <div class="tnav_content">

                      <span class="tnav" :class="{ 'active': openType == 1 }" @click="setOpenType(1)">{{
                        $t('contract.openPosition') }}</span>
                      <span class="tnav tnav2" :class="{ 'active': openType == 2 }" @click="setOpenType(2)">{{
                        $t('contract.closePosition') }}</span>
                    </div>
                    <div class="exchange-block_title">{{ symbleinfo.fcurrencyname }} {{ $t('contract.perpetualContract')
                    }}</div>
                    <div class="margin-operate center-top">
                      <a @click="showPopTrasfer()" class="transfer  mr-4" style="margin-right: 16px;">{{
                        $t('leverage.transfer')
                      }}</a>

                      <span clla @click="showCalu()" to="" class="meuns calculator mr-4">{{
                        $t('contract.calculator')
                      }}</span>
                      <a href="/vip-program" class="meuns mr-2" target="_blank">{{ $t('contract.feerate') }}</a>
                    </div>
                  </div>
                  <div class="exchange-block_nav exchange-block_snav">
                    <span class="snav" :class="{ 'active': orderType == 1 }" @click="setOrderType(1)">{{
                      $t('deal.limitedDeal') }}</span>
                    <span class="snav" :class="{ 'active': orderType == 2 }" @click="setOrderType(2)">{{
                      $t('deal.marketDeal') }}</span>

                    <span class="snav" :class="{ 'active': orderType == 3 }" @click="setOrderType(3)">
                      <span>{{ $t('contract.planLoss') }} </span>
                      <AppInfoTooltip :title="$t('contract.marketTip')" />
                    </span>


                    <span class="snav" :class="{ 'active': orderType == 4 }" @click="setOrderType(4)">{{
                      $t('deal.strategyDeal') }}</span>
                    <div class="margin-operate">
                      <span @click="setLeverage()" class="meuns tooltip-hover">
                        <AppTooltip :title="$t('contract.multTip')"
                          :text="currencyLeverage == '' ? '10X' : currencyLeverage + 'X'" />
                      </span>
                      <AppInfoTooltip :title="$t('contract.multTip2')" />
                    </div>
                  </div>
                  <!--限价交易start-->
                  <hex-limit v-if="orderType == 1" :openType="openType" :multiple="currencyLeverage"
                    :symbleinfo="symbleinfo" :listhaveorderinfos="listhaveorderinfos" :currencyUnitType="currencyUnitType"
                    :tradingDealTo="tradingDealTo" :tradingDealFrom="tradingDealFrom" :entrustSaleRate="entrustBuyRate"
                    :entrustBuyRate="entrustSaleRate" :entrustSaleNum="entrustSaleNum" :entrustBuyNum="entrustBuyNum" :contractassesinfo="contractassesinfos[0]">
                  </hex-limit>
                  <!--限价交易end-->
                  <!--市价交易start-->
                  <hex-market v-if="orderType == 2" :openType="openType" :symbleinfo="symbleinfo"
                    :multiple="currencyLeverage" :listhaveorderinfos="listhaveorderinfos"
                    :currencyUnitType="currencyUnitType" :tradingDealTo="tradingDealTo" :tradingDealFrom="tradingDealFrom"
                    :entrustSaleRate="entrustBuyRate" :entrustBuyRate="entrustSaleRate" :entrustSaleNum="entrustSaleNum"
                    :entrustBuyNum="entrustBuyNum" :contractassesinfo="contractassesinfos[0]">
                  </hex-market>
                  <!--市价交易end-->
                  <!--止盈止损交易start-->
                  <hex-profit-loss v-if="orderType == 3" :openType="openType" :multiple="currencyLeverage"
                    :listhaveorderinfos="listhaveorderinfos" :currencyUnitType="currencyUnitType" :symbleinfo="symbleinfo"
                    :tradingDealTo="tradingDealTo" :tradingDealFrom="tradingDealFrom" :entrustSaleRate="entrustBuyRate"
                    :entrustBuyRate="entrustSaleRate" :triggerPriceBuy="triggerPriceBuy"
                    :triggerPriceSale="triggerPriceSale" :entrustSaleNum="entrustSaleNum" :entrustBuyNum="entrustBuyNum" :contractassesinfo="contractassesinfos[0]">
                  </hex-profit-loss>
                  <!--止盈止损交易end-->
                  <StrategyHorizental :symbleinfo="symbleinfo" :tradingTo="tradingDealTo" :tradingFrom="tradingDealFrom"
                    @onOpenTransferPopup="showPopTrasfer()" :is-future="true" v-if="orderType == 4"
                    :borrowMultiple="currencyLeverage" />
                </div>
              </div>
              <div class="right-list">
                <!--委托列表begin-->
                <hex-entrust :symbleinfo="symbleinfo" @entrust:getEntrustRate="getEntrustRate" />
                <!--委托列表end-->
              </div>
              <div class="after-right-list">
                <hex-knockdown style="height: 100%; " :symbleinfo="symbleinfo" @setEntrustType="setEntrustType"
                  v-if="!screenSizeIsLg" />
                <!--委托列表end-->
              </div>
            </div>
          </div>
        </div>
        <!--用户订单列表start-->
        <hex-order :symbleinfo="symbleinfo" :margin="margin" :listhaveorderinfos="listhaveorderinfos" :dailyDetail="dailyDetail" :loadingProps="loadingProps"
          :multiple="currencyLeverage" :currencyUnitType="currencyUnitType" :entrustBuyRate="entrustSaleRate"
          :entrustSaleRate="entrustBuyRate" @getContractAssesInfos="getContractAssesInfos" ref="hexorder" />
        <hex-calu @confirmCurrencyUnit="confirmCurrencyUnit" @closePopup="showCalu" v-if="calu_in"
          :currencyCaluModal="calu_in" :symblefrom="symbleinfo.fcurrencyname" />
        <hex-currency-leverage :listhaveorderinfos="listhaveorderinfos" :symbleinfo="symbleinfo"
          @confirmCurrencyLeverage="confirmCurrencyLeverage" @reloadLeverage="reloadLeverage" @closePopup="setLeverage"
          v-show="leverageShow" :currencyLeverageModal="leverageShow" />
        <!--transfer_pop-->
        <hex-transfer v-if="transfer_pop" :transfer_pop="transfer_pop" :ctid="symbleinfo.id" type="3"
          :closePopup="showPopTrasfer" ref="ref_transfer" />
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import chart from '@/components/deal/chart'
import limit from '@/components/deal/limit-contract' //限价交易
import market from '@/components/deal/market-contract' //市价交易
import coininfo from '@/components/deal/coin-info-contract' //资产信息
import profitLoss from '@/components/deal/profit-loss-contract' //止盈止损交易
import orderList from '@/components/deal/order-list-contract'  //历史订单
import entrust from '@/components/deal/entrust' //深度
import knockdown from '@/components/deal/knockdown'  //最新成交
import newMoney from '@/components/deal/new-money'  //24小时行情
import coinList from '@/components/deal/coin-list' //币种列表
import calu from '@/components/security/currency-calu';//计算器
import currencyLeverage from '@/components/security/currency-leverage'; //倍数切换
import transferPop from '@/components/security/transfer';//转账
import StrategyHorizental from '~/components/deal/StrategyHorizental.vue'
import TVChartContainer from '~/components/Chart/TVChartContainer.vue'
import AppInfoTooltip from '~/components/App/AppInfoTooltip.vue'
import AppTooltip from '~/components/App/AppTooltip.vue'
export default {
  name: 'Contract',
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
    "hex-currency-leverage": currencyLeverage,
    "hex-calu": calu,
    "hex-coininfo": coininfo,
    "hex-transfer": transferPop,
    StrategyHorizental,
    TVChartContainer,
    AppInfoTooltip,
    AppTooltip
  },
  watch: {
    dailyDetail(val) {
      this.title = this.global_get_tofixed(val.c, this.symbleinfo.pricedigits) + ' ' + this.global_get_uppercase(val.symble) + ' | BitNasdaq'
    },
    'innerWidth': function (val) {
      if (val >= 1800) {
        this.entrustType = 9;
      }
    }
  },
  data() {
    return {
      loadingProps: true,
      leverageShow: false,
      dcs: {},
      searchvalue: '',
      iscollect: {},
      background: false,
      orderType: 1,
      calu_in: false,
      loading: false,
      entrustType: 9,
      openType: 1,
      indexPrice: 0,
      symbleinfo: {},
      listhaveorderinfos: [],
      //获取用户交易对信息
      tradingDealTo: {
        canuseamount: 0
      },
      tradingDealFrom: {
        canuseamount: 0
      },
      //设置触发价
      triggerPriceBuy: '',
      triggerPriceSale: '',
      //设置买入卖出价
      entrustBuyRate: '',
      entrustSaleRate: '',
      entrustBuyNum: '',
      entrustSaleNum: '',
      dailyDetail: {},
      title: '',
      currencyUnitType: "",
      currencyLeverage: "10",
      margin: 'contract',//杠杆订单标识
      transfer_pop: false,
      contractassesinfos: [],  //用户合约资产列表
      event_timer: {},
      innerWidth: 0,
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
    ...mapGetters('strategy', ['strategyTradeOpened', 'strategyTabPosition']),
    ...mapGetters('trade', ['triggerOrderOpened']),
    bindContentClass() {
      let cls = ''
      if (this.strategyTradeOpened) {
        cls = 'strategy-tab-opened'
      } else if (this.triggerOrderOpened) {
        cls = 'trigger-order-tab-opened'
      }
      if (this.strategyTabPosition == 'auto') {
        cls = cls + ' strategy-auto-tab-is-active'
      }
      return cls
    },
    positionsData() {
      return this.contractassesinfos.map((asset) => {
        if (asset.listhaveorderinfos?.length > 0) {
          return asset.listhaveorderinfos
        }
      })

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
    replaceCurrency(symble) {
      return symble.toUpperCase().replace(this.$t('contract.swap'), '');
    },
    setPriceAndAsset() {
      let contractType = this.$route.query.contractType
      if (contractType == 1 && Number(this.indexPrice) > 0) {
          if (this.contractassesinfos.length > 0) {
            let canuseamount = this.contractassesinfos[0].canuseamount_usdt / Number(this.indexPrice)
            let amout = 0
            if (this.contractassesinfos[0].canuseamount_usdt > 0) {
              amout = this.global_get_tofixed(this.contractassesinfos[0].canuseamount_usdt, this.global_get_decimal(this.replaceCurrency("usdt/yx")))
              //amout = Number(_self.contractassesinfos[0].canuseamount_usdt)
            }
            this.tradingDealFrom = Object.assign({}, { canuseamount: Number(canuseamount) });
            this.tradingDealTo = Object.assign({}, { canuseamount: amout })
          } 
        }
    },
    showPopTrasfer() {
      if (this.transfer_pop)
        this.getContractAssesInfos();
      this.transfer_pop = !this.transfer_pop;
    },
    //交易数据接口(用户交易对信息)
    getContractAssesInfos(val) {
      const _self = this;
      if (this.$userinfo.uid && this.symbleinfo) {
        let contractType = this.$route.query.contractType
        const params = contractType == 1 ? Object.assign({}, { ctid: this.symbleinfo.id , contractType : 1}) : Object.assign({}, { ctid: this.symbleinfo.id})
        if(val == 1) {
          this.loadingProps = true
        }
        this.$store.dispatch('usercontract_user_contractassets_infos', params).then(({ data }) => {
          this.loadingProps = false
          if (data) {
            console.log("listhaveorderinfos=======", data)
            if (contractType == 1) {
                let contractData = data;
                _self.contractassesinfos = contractData
                _self.listhaveorderinfos = contractData[0].listhaveorderinfos
                _self.setPriceAndAsset()
                _self.$pubsub.publish(_self.$pubsub.changeDealState);
                _self.event_timer = setTimeout(function () {
                _self.getContractAssesInfos();
                }, 50000);
            } else {
              var contractData = this.getContractsInfos(data, 1);
              if (contractData.length > 0) {
                _self.contractassesinfos = contractData
                _self.listhaveorderinfos = contractData[0].listhaveorderinfos
                _self.tradingDealFrom = Object.assign({}, { canuseamount: Number(contractData[0].canuseamount) });
                _self.tradingDealTo = Object.assign({}, { canuseamount: Number(contractData[0].canuseamount) });
                /*更新交易状态*/
                _self.$pubsub.publish(_self.$pubsub.changeDealState);
                _self.event_timer = setTimeout(function () {
                  _self.getContractAssesInfos();
                }, 50000);
              }
            }
          }
        })
      }
    },
    limitPrice: function (c, o) {
      let limit_price = Number((((c - o) / o) * 100).toFixed(4));
      return isNaN(limit_price) ? 0 : limit_price;
    },
    //设置买入价卖出价 触发价
    getEntrustRate(m) {
      this.entrustBuyRate = this.global_get_tofixed(m.p, this.dcs.p)
      this.entrustSaleRate = this.global_get_tofixed(m.p, this.dcs.p)
      this.triggerPriceBuy = this.global_get_tofixed(m.p, this.dcs.p)
      this.triggerPriceSale = this.global_get_tofixed(m.p, this.dcs.p)
      this.entrustBuyNum = this.global_get_tofixed(m.alltotal, this.dcs.a)
      this.entrustSaleNum = this.global_get_tofixed(m.alltotal, this.dcs.a)
    },
    //设置订单类型
    setOrderType(num) {
      this.orderType = num
      this.entrustBuyNum = 0
      this.entrustSaleNum = 0

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
    },
    //设置订单类型
    setEntrustType(num) {
      this.entrustType = num
    },
    setOpenType(num) {
      this.margin = num == 1 ? "" : "contract"
      this.openType = num
      this.entrustBuyNum = 0
      this.entrustSaleNum = 0
    },
    setLeverage() {
      this.leverageShow = !this.leverageShow
    },
    showCalu() {
      this.calu_in = !this.calu_in;
    },
    confirmCurrencyUnit(UnitType) {
      this.currencyUnitType = UnitType
    },
    confirmCurrencyLeverage(Type) {//切换倍数通知
      this.currencyLeverage = Type
    },
    reloadLeverage(Type) {
      this.currencyLeverage = Type
    }
  },
  /*订阅相关消息*/
  subscribe() {
    return {
      /*更新交易卖出买入量*/
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
      getOrderList() {//下单订阅
        this.getContractAssesInfos()
      },
      /*订阅最行情*/
      quotationDaily(res) {
        this.dailyDetail = res;

        this.$store.commit('market/setCurrentMarketPrice', {
          c: res.c,
          symble: res.symble,
          ctid: res.ctid,
          itype: res.itype,
          logo: res.logo
        })
      },

      indexPrice(res) {
        this.indexPrice = res;
        if (Number(this.indexPrice) > 0) {
          this.setPriceAndAsset()
        }
        
      },
    }
  },
  created() {
  },
  mounted() {
    const symble_filter = this.$route.params.id.replace('_', '/');
    this.dcs = this.global_get_decimal(this.symble_filter)
    var contractSymbles = this.$store.state.symbleinfos.filter(item => {
      return item.itype == 1;
    });
    this.symbleinfo = contractSymbles.filter((item) => {
      return (item.descriptions == symble_filter.toUpperCase());
    })[0];
    this.$store.commit('trade/setSymbolInfo', this.symbleinfo)
    //初始化用户资产
    this.getContractAssesInfos(1);
    window.addEventListener('resize', this.onResize)
    this.onResize()
  },
  beforeDestroy() {
    clearInterval(this.event_timer);
    window.removeEventListener('resize', this.onResize)
    const symbol = this.symbleinfo.descriptions.replace("/", "")
    this.$socket.uninvoke({
      sub: "market." + symbol.toLowerCase() + ".trade.detail",
      type: this.$socket.type.quotation_trading_details_get
    })
    this.$store.commit('trade/setSocketTradeDetail', {})
    this.$store.commit('trade/setSymbolInfo', {})
    this.$store.commit('trade/setSocketTradeDetailData', [])

    this.$store.commit('strategy/setStrategyTradeStatus', false)
    this.$store.commit('trade/setTriggerOrderOpened', false)
  }
}
</script>
<style lang='less'>
@import "../../static/styles/color";

.money-exchange-content.contract {
  background-color: @cl_global;

  .left-list,
  .center-list,
  .right-list,
  .search,
  .after-right-list {
    float: left;
  }

  .left-list {
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
    width: 320px;
  }

  .entrust-list {
    width: 320px;
    height: 100% !important;
    display: flex;
    flex-direction: column;
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
      height: 442px;
      // width: 868px;
      width: 100%;
      background-color: @cl_content;
      overflow: hidden;
      margin-bottom: 6px;
    }
  }





  @import "../deal/exchangeblock";
}

.exchange-block_content {
  overflow: hidden;
  max-height: 100%;
  width: 100%;
}


.close {
  background: url(../../static/images/close.png) no-repeat top center;
  width: 15px;
  height: 10px;
  display: inline-block;
  opacity: 0.8;
  cursor: pointer;
}

.close:hover {
  opacity: 1;
}

.ant-slider__button-wrapper {
  z-index: 99;
}

.entrust-list .entrust-list_title .select_list_tab .all,
.entrust-list .entrust-list_title .select_list_tab .buy,
.entrust-list .entrust-list_title .select_list_tab .sell {
  width: 24px !important;
  height: 20px !important;
  margin: 5px 5px;
  border: none;
  border-radius: 3px;
}

.entrust-list .entrust-list_title .select_list_tab .buy.active,
.entrust-list .entrust-list_title .select_list_tab .all.active,
.entrust-list .entrust-list_title .select_list_tab .sell.active {
  border: 1px solid @cl_link !important;
}

.knockdown-list_title {
  display: none !important;
}

.contract {

  .after-right-list,
  .right-list {
    height: 741px !important;
  }

  .exchange-block_tnav {
    line-height: 44px;
    position: relative;
    border-bottom: 1px solid #393939;
  }

  .exchange-block_tnav .tnav.active {
    border-right: 1px solid #393939;
    color: white !important;
  }

  .exchange-block_tnav .tnav2.active {
    border-left: 1px solid #393939;
  }

  .tnav {
    display: inline-block;
    width: 110px;
    text-align: center;
    font-size: 14px;
    border-top: 2px solid transparent;
    cursor: pointer;
    color: @cl_ADB1B8;
    font-weight: 500 !important;

  }

  .tnav.active {
    background-color: #12181D;
    color: @cl_link;
    border-top: 2px solid @cl_link;
  }

  .exchange-block_snav {
    padding: 12px 20px 5px 20px;
    border-bottom: none !important;
  }

  .snav {
    height: 24px;
    margin-right: 6px;
    line-height: 22px !important;
    background: transparent;
    border-radius: 2px;
    border: none;
  }

  .snav:hover {
    border-color: @cl_link;
    color: @cl_link;
  }

  .snav.active {
    color: @cl_link;
    border: none !important;
  }

  .exchange-block_snav .margin-operate .meuns {
    background: #412F11;
    border-radius: 3px;
    color: #FFA500;
    font-size: 10px;
    padding: 3px;
    border: none;
    cursor: pointer;
  }

  .exchange-block_snav .margin-operate .meuns:hover {
    border: none;
    color: @cl_link !important;
  }

  .ac {
    margin-right: 6px;
    display: inline-block;
    font-size: 14px;
    border-bottom: 1px dashed #9aa5b5;
    cursor: pointer;
    color: #555A5F;
    font-weight: 500 !important;

  }

  .ac:hover {
    color: #555A5F !important;
    font-weight: 500 !important;

  }

  .ac_img {
    width: 15px;
    vertical-align: middle;
    cursor: pointer;
  }

  .exchange-block_title {
    color: rgba(255, 255, 255, 0.9);
    text-align: center;
    font-weight: bold;
  }

  .tnav_content {
    top: -1px;
  }

  .tnav_content,
  .exchange-block_tnav .margin-operate {
    position: absolute;
  }

  .exchange-block_tnav .margin-operate {
    float: none !important;
    right: 10px;
    top: 0;
  }

  .exchange-block_tnav .margin-operate a,
  .exchange-block_tnav .margin-operate span {
    color: @cl_link;
    cursor: pointer;
    position: relative;
  }

  .exchange-block_tnav .center-top .transfer:after,
  .exchange-block_tnav .center-top .calculator:after {
    content: "";
    height: 26px;
    width: 2px;
    background: @cl_202020;
    position: absolute;
    right: -16px;
    top: -4px;
    z-index: 10 !important;
  }

  .exchange-block_tnav .center-top a,
  .exchange-block_tnav .center-top span {
    font-size: 14px;
  }

  .exchange-block_tnav .center-top span {
    margin-right: 16px;
  }

  .exchange-block_tnav .margin-operate span:hover {
    color: @cl_link !important;
  }

  .exchange-block_tnav .margin-operate span {
    margin-right: 10px;
  }

  .tooltip-hover {
    display: inline-block;
  }

  .tooltip-inner {
    position: relative;
    z-index: 500;
    left: 0;
    display: none;
  }

  .tooltip-inner .tooltip-arrow,
  .tooltip-inner .tooltip-text {
    position: absolute;
    box-shadow: 0 10px 20px 0 rgba(0, 0, 0, .4);
  }

  .tooltip-inner .tooltip-text {
    word-spacing: 0;
    display: block;
    font-size: 12px;
    color: #1c242c;
    word-wrap: break-word;
    border-radius: 3px;
    padding: 10px;
    bottom: 22px;
    text-align: left;
    width: 208px;
    font-style: normal;
    background-color: #fff;
  }

  .tooltip-inner .tooltip-arrow {
    left: 10px;
    bottom: 17px;
    background-color: transparent;
    display: inline-block;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 5px solid #fff;
  }

  .tooltip-hover:hover .tooltip-inner {
    display: block;
  }

  .left-list-coinlist-contract {
    height: 444px !important;
  }

  .strategy-tab-opened .dealcoin-list_content .dealcoin-list_content_body {
    height: 419px !important;
  }

  .trigger-order-tab-opened {
    .left-list {
      .left-list-knockdown-contract {
        height: 406px !important;

        .dealcoin-list_content .dealcoin-list_content_body {
          height: 340px !important;
        }
      }

      .left-coininfo {
        height: 406px !important;
      }
    }
  }


  .strategy-tab-opened {
    .left-list {

      .left-list-knockdown-contract,
      .left-coininfo {
        height: 453px !important;

        .dealcoin-list_content .dealcoin-list_content_body {
          height: 386px !important;
        }
      }
    }
  }

  .strategy-tab-opened.strategy-auto-tab-is-active {

    .left-list-knockdown-contract,
    .left-coininfo {
      height: 410px !important;
    }
  }
}

.coin-search {
  // margin: 6px 8px 0 8px;
  color: @cl_8790A1;
  font-size: 12px;
  height: 100%;
  display: flex;
  justify-content: center;

  .search {
    display: inline-block;
    width: 100%;
    height: 100%;
    line-height: 24px;
    font-size: 14px;
    border-radius: 3px;
    margin-right: 7px;
    border: 1px solid @cl_292E39;
    position: relative;
    padding-right: 25px;
    padding-left: 10px;
    float: left;
    border: 1px solid #37383A;

    input {
      line-height: 1;
      color: #ffffff;
      width: 100%;
      background-color: transparent;
      height: 100%;
      outline: none;
    }

    input:focus+.search_coin {
      background-image: url("../../static/images/foucs_search.svg");

    }

    input::placeholder {
      color: #555A5F;
      font-weight: 500 !important;
      opacity: 1;
      /* Firefox */
    }

    .search_coin {
      background-image: url("../../static/images/search.svg");
      display: inline-block;
      width: 12px;
      height: 12px;
      background-size: cover;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      right: 8px;
    }
  }
}



.contract {
  .TVChartContainer {
    margin: 0 auto;
    height: 382px !important;
  }

  .left-list {
    .left-list-knockdown-contract {
      margin-top: 6px;
      height: 364px !important;
    }

    .contractcoininfo .dealcoin-items {
      height: 334px !important;
      padding: 0px 18px 0px 6px;
    }

    .dealcoin-list .coin-content .coin-list_content {
      max-height: 675px !important
    }
  }

  .coin-info {
    .coin-title_item:hover {
      cursor: pointer !important;
      color: @cl_link_hover ;
    }

    .dealcoin-list .coin-title {
      border-bottom: 0px;
    }

    .dealcoin-list .coin-title .coin-title_item {
      padding: 0 12px !important;
    }
  }
}


@media only screen and (max-width: 1799px) {
  .contract {
    .right-list {
      .order-book {
        display: block;
      }

      .market-trade {
        display: none;
      }
    }

    .left-list {

      .order-book,
      .market-trade {
        display: none !important;
      }

      .market-trade,
      .assets-transfer {
        display: block !important;
      }

      .dealcoin-list .dealcoin-list_content .dealcoin-list_content_body {
        height: 290px;
      }
    }
  }
}


@media only screen and (min-width: 1800px) {
  .money-exchange-content.contract {


    .money-exchange-content {
      .money-exchange {
        width: 100%;
        //   padding:0 48px;
        //   min-width: 1440px;
        //   margin: auto;
      }


      .left-list {
        display: block;
        width: 280px;
        height: 100%;
        margin-right: 6px;
        margin-bottom: 6px;

        .order-book,
        .market-trade {
          display: none !important;
        }

        .assets-transfer {
          display: block;
        }


      }

    }

    .after-right-list {
      display: block !important;
      margin-bottom: 6px;
      margin-left: 6px;
      width: 320px !important;

      .order-book {
        display: none;
      }


      .dealcoin-list .dealcoin-list_content .dealcoin-list_content_body {
        height: 677px !important;
      }

    }

    .trigger-order-tab-opened {

      .right-list,
      .after-right-list {
        height: 785px !important;
      }

      .after-right-list {
        .dealcoin-list .dealcoin-list_content .dealcoin-list_content_body {
          height: 719px !important;
        }
      }
    }

    .strategy-tab-opened {

      .right-list,
      .after-right-list {
        height: 830px !important;
      }

      .after-right-list {
        .dealcoin-list .dealcoin-list_content .dealcoin-list_content_body {
          height: 764px !important;
        }
      }
    }
    .strategy-tab-opened.strategy-auto-tab-is-active{
      .right-list,
      .after-right-list {
        height: 789px !important;
      }
      .after-right-list {
        .dealcoin-list .dealcoin-list_content .dealcoin-list_content_body {
          height: 723px !important;
        }
      }
    }

    .left-list {

      .order-book {
        display: none !important;
      }

      .dealcoin-list .dealcoin-list_content .dealcoin-list_content_body {
        height: 320px;
      }

    }

    .left-list-knockdown-contract {
      display: none;
    }

    .left-list-coinlist-contract {
      height: 444px !important;
    }

    .left-coininfo {
      margin-top: 8px;
      height: 362px !important;
    }

  }

}
</style>
