<template>
    <div class="hex-flex">
        <div id="contract-pro" class="money-exchange-content hex-flex_auto contract-pro">
            <div class="money-exchange">
                <!--24小时行情start-->
                <!--24小时行情end-->
                <div>
                    <hex-coin-list-header />
                </div>
                <div style=" display:flex;">
                    <!--  display:flex; -->
                    <div class="" style="display:flex;flex-grow:1; flex-wrap: wrap; height:100%;">
                        <div class="left-list-pro">
                            <!--币种列表-->
                            <div class="contract">
                                <hex-coinlist class="left-list-coinlist-contract-pro" :dailyDetail="dailyDetail"
                                    :contractType="contractType" :symbleinfo="symbleinfo" symbletype="1"
                                    :searchvalue="searchvalue" />
                            </div>
                            <div class="coin-info">
                                <hex-knockdown class="left-list-knockdown-contract-pro" :symbleinfo="symbleinfo"
                                    v-show="!screenSizeIsLg && entrustType == 10" :showAssetsTab="true"
                                    @setEntrustType="setEntrustType" />
                                <hex-coininfo class="left-coininfo" :symblefrom="symbleinfo.fcurrencyname"
                                    :dailyDetail="dailyDetail" v-show="!screenSizeIsLg && entrustType == 9"
                                    :contractassesinfo="contractassesinfos[0]" @showPopHz="showPopTrasfer"
                                    @setEntrustType="setEntrustType" />
                            </div>
                        </div>
                        <div class="" style="flex-grow:1; ">
                            <hex-new-money class="" :symbleinfo="symbleinfo" :dailyDetail="dailyDetail" symbletype="1" />
                            <div style="display:flex;">
                                <div class="center-list " style="height: 581px;">
                                    <div class="chart-block " style="height: 581px;">
                                        <!-- TradingView Widget BEGIN -->
                                        <no-ssr>
                                            <TVChartContainer :symbol="symbleinfo.descriptions" :symbleinfo="symbleinfo" />
                                            <!-- <hex-chart class="hex-chart-margin" :symbleinfo="symbleinfo" /> -->
                                        </no-ssr>
                                        <!-- TradingView Widget END -->
                                    </div>
                                </div>
                                <div class="right-list pro" style="height: 581px;">
                                    <hex-entrust v-show="entrustTypeRight == 8" :symbleinfo="symbleinfo"
                                        @entrust:getEntrustRate="getEntrustRate" @setEntrustType="setEntrustTypeRight"
                                        :showMarketTab="true" />
                                    <hex-knockdown class="left-list-knockdown-contract-pro"
                                        v-if="entrustTypeRight == 10 && screenSizeIsLg" :symbleinfo="symbleinfo"
                                        @setEntrustType="setEntrustTypeRight" :showAssetsTab="true" />
                                </div>
                            </div>
                        </div>
                        <div class="break"></div>
                        <div class="" style="width:100%;">
                            <!-- <hex-/ -->
                            <hex-order :symbleinfo="symbleinfo" :margin="margin" :listhaveorderinfos="listhaveorderinfos"
                                :loadingProps="loadingProps" :dailyDetail="dailyDetail" :multiple="currencyLeverage"
                                :currencyUnitType="currencyUnitType" :contractassesinfo="contractassesinfos[0]"
                                :entrustBuyRate="entrustSaleRate" :entrustSaleRate="entrustBuyRate"
                                @getContractAssesInfos="getContractAssesInfos" ref="hexorder" :isPro="true"></hex-order>
                        </div>
                    </div>
                    <div id="right-data">
                        <div class="standard-strategy-container"
                            :style="`max-height: ${standardHeight};  min-height: ${standardHeight};`">
                            <div id="exchange-block">
                                <a-row>
                                    <a-col :lg="showOnlyStandard ? 24 : 12">
                                        <a-button @click="standardBlock = true" block class="standard-btn fw-5"
                                            :class="standardBlock ? 'active-tab' : ''">{{ $t('deal.standardview')
                                            }}</a-button>
                                    </a-col>
                                    <a-col :lg="12" v-if="!showOnlyStandard">
                                        <a-button @click="standardBlock = false" block
                                            class="standard-btn fw-5 strategy-btn"
                                            :class="!standardBlock ? 'active-tab' : ''">{{ $t('deal_new.dn2')
                                            }}</a-button>
                                    </a-col>
                                </a-row>
                                <div v-show="standardBlock" style="width:320px" class="standard-section">
                                    <a-row class="long-short mt-4">
                                        <a-col :lg="18">
                                            <a-radio-group v-model="activeKey">
                                                <a-radio-button value="1" class="radio" @click="onTabChange">
                                                    {{ $t('contract.buycontract') }}
                                                </a-radio-button>
                                                <a-radio-button value="2" class="radio" @click="onTabChange">
                                                    {{ $t('contract.sellcontract') }}
                                                </a-radio-button>
                                            </a-radio-group>
                                        </a-col>
                                        <a-col :lg="4" align="end" class="pr-2">
                                            <span class="p-1 margin-trade-new m-0" @click="leverageShow = true">
                                                {{ borrowMultiple }}X
                                            </span>
                                        </a-col>
                                        <a-col :lg="2">
                                            <div class=" text-right ">
                                                <a href="javascript:;" @mouseover="hoverKey = 'calculator'"
                                                    @mouseleave="hoverKey = ''" @click="showCalu()">
                                                    <img :src="hoverKey == 'calculator' ? '/images/orange-calculator.svg' : '/images/white-calculator.svg'"
                                                        height="20px" />
                                                </a>
                                            </div>
                                        </a-col>
                                        <a-col :lg="24">
                                            <a-divider class="transfer-border" />
                                        </a-col>
                                    </a-row>
                                    <div class="rang-tabs">
                                        <a-tabs v-model="orderType" @change=setOrderType>
                                            <a-tab-pane :key="1" :tab="$t('legal.lgl5')">

                                                <!-- <hex-coininfo class="left-coininfo" :symblefrom="symbleinfo.fcurrencyname"
                                                    v-show="!screenSizeIsLg && entrustType == 9"
                                                    :contractassesinfo="contractassesinfos[0]" @showPopHz="showPopTrasfer"
                                                    @setEntrustType="setEntrustType" /> -->

                                                <hex-limit v-if="orderType == 1" :openType="openType"
                                                    :multiple="currencyLeverage" :symbleinfo="symbleinfo"
                                                    :listhaveorderinfos="listhaveorderinfos"
                                                    :currencyUnitType="currencyUnitType" :tradingDealTo="tradingDealTo"
                                                    :tradingDealFrom="tradingDealFrom" :entrustSaleRate="entrustBuyRate"
                                                    :entrustBuyRate="entrustSaleRate" :entrustSaleNum="entrustSaleNum"
                                                    :activeKey="activeKey" :entrustBuyNum="entrustBuyNum"
                                                    :contractassesinfo="contractassesinfos[0]"
                                                    @onOpenTransferPopup="showPopTrasfer()" />
                                            </a-tab-pane>
                                            <a-tab-pane :key="2" :tab="$t('home.trades')">
                                                <hex-market v-if="orderType == 2" :openType="openType"
                                                    :symbleinfo="symbleinfo" :multiple="currencyLeverage"
                                                    :listhaveorderinfos="listhaveorderinfos"
                                                    :currencyUnitType="currencyUnitType" :tradingDealTo="tradingDealTo"
                                                    :tradingDealFrom="tradingDealFrom" :entrustSaleRate="entrustBuyRate"
                                                    :entrustBuyRate="entrustSaleRate" :entrustSaleNum="entrustSaleNum"
                                                    :activeKey="activeKey" :entrustBuyNum="entrustBuyNum"
                                                    :contractassesinfo="contractassesinfos[0]"
                                                    @onOpenTransferPopup="showPopTrasfer()" />
                                            </a-tab-pane>
                                            <a-tab-pane :key="3">
                                                <span slot="tab">
                                                    <span>{{ $t('contract.planLoss') }} </span>

                                                    <AppInfoTooltip :title="$t('contract.marketTip')" />
                                                </span>
                                                <hex-profit-loss v-if="orderType == 3" :openType="openType"
                                                    :multiple="currencyLeverage" :listhaveorderinfos="listhaveorderinfos"
                                                    :currencyUnitType="currencyUnitType" :symbleinfo="symbleinfo"
                                                    :tradingDealTo="tradingDealTo" :tradingDealFrom="tradingDealFrom"
                                                    :entrustSaleRate="entrustBuyRate" :entrustBuyRate="entrustSaleRate"
                                                    :triggerPriceBuy="triggerPriceBuy" :triggerPriceSale="triggerPriceSale"
                                                    :entrustSaleNum="entrustSaleNum" :activeKey="activeKey"
                                                    :entrustBuyNum="entrustBuyNum"
                                                    :contractassesinfo="contractassesinfos[0]"
                                                    @onOpenTransferPopup="showPopTrasfer()" />
                                            </a-tab-pane>
                                        </a-tabs>

                                        <a-row class="px-3" v-if="!$userinfo.uid">
                                            <a-col :lg="24">
                                                <a-button style="width:100%; background:#FFA500 !important;"
                                                    class="buy-btc-btn mb-2" @click="() => $router.push('/register')">{{
                                                        $t('home.headRegister') }}</a-button>
                                                <a-button style="width:100%;" class="exchange-block_button_buy no_login"
                                                    @click="() => $router.push('/login')">{{
                                                        $t("home.headLogin") }}</a-button>
                                            </a-col>
                                        </a-row>
                                        <a-row class="px-3 mt-4">
                                            <a-col :lg="24">
                                                <div class="reward-card">
                                                    <a-row>

                                                        <a-col :lg="14">
                                                            <p class="mb-0 reward-txt">
                                                                {{ $t('rewardhub.rew16') }}
                                                            </p>
                                                            <nuxt-link :to="selfRoute.rewardHub">
                                                                <img src="/images/white-right-arrow.svg" height="12px"
                                                                    class="mt-1 cursor" />
                                                            </nuxt-link>
                                                        </a-col>
                                                        <a-col :lg="9" align="end">
                                                            <img src="/images/rewards-1.png" />
                                                        </a-col>
                                                    </a-row>
                                                </div>
                                            </a-col>
                                        </a-row>
                                    </div>
                                </div>
                                <div v-if="!standardBlock" style="width:320px">
                                    <hex-strategy :symbleinfo="symbleinfo" :is-future="true" :tradingTo="tradingDealTo"
                                        :tradingFrom="tradingDealFrom" @onOpenTransferPopup="showPopTrasfer()"
                                        @onShowLeverage="leverageShow = true" :borrowMultiple="currencyLeverage"
                                        @onShowCalculator="showCalu()" :contractassesinfo="contractassesinfos[0]" />
                                </div>
                            </div>
                        </div>

                        <div class="assets-detail" v-if="standardBlock">
                            <a-row>
                                <a-col :lg="24">
                                    <hex-coininfo class="mt-1" :symblefrom="symbleinfo.fcurrencyname" v-if="screenSizeIsLg"
                                        :contractassesinfo="contractassesinfos[0]" @showPopHz="showPopTrasfer" />
                                </a-col>
                            </a-row>
                        </div>

                    </div>
                </div>
                <!--用户订单列表start-->
                <hex-calu @confirmCurrencyUnit="confirmCurrencyUnit" @closePopup="showCalu" v-if="calu_in"
                    :currencyCaluModal="calu_in" :symblefrom="symbleinfo.fcurrencyname" />
                <hex-currency-leverage :listhaveorderinfos="listhaveorderinfos" :symbleinfo="symbleinfo"
                    @confirmCurrencyLeverage="confirmCurrencyLeverage" @reloadLeverage="reloadLeverage"
                    @closePopup="setLeverage" v-show="leverageShow" :currencyLeverageModal="leverageShow" />
                <!--transfer_pop-->
                <hex-transfer v-if="transfer_pop" :transfer_pop="transfer_pop" :ctid="symbleinfo.id" type="3"
                    :closePopup="showPopTrasfer" ref="ref_transfer" />
            </div>
        </div>
    </div>
</template>
<script>
import chart from '@/components/deal/chart'
import limit from '@/components/deal/limit-contract-pro'
// cls //限价交易
import market from '@/components/deal/market-contract-pro' //市价交易
import coininfo from '@/components/deal/coin-info-contract' //资产信息
import profitLoss from '@/components/deal/profit-loss-contract-pro' //止盈止损交易
import orderList from '@/components/deal/order-list-contract'  //历史订单
import entrust from '@/components/deal/entrust' //深度
import knockdown from '@/components/deal/knockdown'  //最新成交
import newMoney from '@/components/deal/new-money'  //24小时行情
import coinList from '@/components/deal/coin-list' //币种列表
import calu from '@/components/security/currency-calu';//计算器
import currencyLeverage from '@/components/security/currency-leverage'; //倍数切换
import transferPop from '@/components/security/transfer';//转账
import coinListHeader from '@/components/deal/coin-list-header';
import strategy from '@/components/deal/strategy.vue'
import TVChartContainer from '~/components/Chart/TVChartContainer.vue'
import AppInfoTooltip from '~/components/App/AppInfoTooltip.vue'
export default {
    name: 'ContractPro',
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
        'hex-coin-list-header': coinListHeader,
        'hex-currency-leverage': currencyLeverage,
        'hex-calu': calu,
        'hex-coininfo': coininfo,
        'hex-transfer': transferPop,
        'hex-strategy': strategy,
        TVChartContainer,
        AppInfoTooltip
    },
    watch: {
        dailyDetail(val) {
            this.title = this.global_get_tofixed(val.c, this.symbleinfo.pricedigits) + ' ' + this.global_get_uppercase(val.symble) + ' | BitNasdaq'
        }
    },
    head() {
        return {
            bodyAttrs: {
                class: this.$store.state.hex_client_background.active + ' trade-layout contract-pro-body',
            }
        }
    },
    data() {
        return {
            loadingProps: true,
            activeKey: '1',
            standardBlock: true,
            leverageShow: false,
            showOnlyStandard: true,
            dcs: {},
            searchvalue: '',
            iscollect: {},
            background: false,
            orderType: 1,
            calu_in: false,
            loading: false,
            entrustType: 9,
            entrustTypeRight: 8,
            openType: '1',
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
            directionType: '1',
            event_timer: {},
            innerWidth: '',
            screenSizeIsLg: false,
            hoverKey: '',
            indexPrice: 0,
            contractType: ''
        }
    },

    computed: {
        selfRoute: function () {
            return this.$store.state.route;
        },
        loggedIn: function () {
            return this.$userinfo.uid != null || this.$userinfo.uid != undefined
        },
        standardHeight: function () {

            let height = '1167px'
            if (this.standardBlock) {
                height = '1167px'
                if (this.orderType != 3) {
                    height = '1189px'
                }

                if (!this.loggedIn && this.screenSizeIsLg) {
                    height = '830px' //830px
                }

                if (!this.loggedIn && !this.screenSizeIsLg) {
                    height = '1192px' //830px
                }

                if (this.loggedIn && this.screenSizeIsLg) {
                    height = '799px' //830px
                }

                if (this.orderType == 3) {
                    height = '860px'
                }

            }

            if (!this.standardBlock) {
                height = '1167px'

                if (!this.loggedIn) {
                    height = '1167px'
                }

            }
            return height
        },
        borrowMultiple: function () {
            const borrowmultiple = this.symbleinfo.borrowmultiple > 0 ? this.symbleinfo.borrowmultiple : this.currencyLeverage
            return borrowmultiple
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
            if (contractType == 1 && Number(this.entrustSaleRate) > 0) {
                if (this.contractassesinfos.length > 0) {
                    let canuseamount = this.contractassesinfos[0].canuseamount_usdt / Number(this.indexPrice * 1.004)
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
        onTabChange(key) {
            this.activeKey = parseInt(key);
        },
        showPopTrasfer() {
            if (this.transfer_pop)
                this.getContractAssesInfos();
            this.transfer_pop = !this.transfer_pop;
        },
        //交易数据接口(用户交易对信息)
        getContractAssesInfos(showLoading) {

            let _self = this;
            if (this.$userinfo.uid && this.symbleinfo) {
                const params = this.contractType == 1 ? Object.assign({}, { ctid: this.symbleinfo.id, contractType: 1 }) : Object.assign({}, { ctid: this.symbleinfo.id })
                this.loadingProps = showLoading
                this.$store.dispatch('usercontract_user_contractassets_infos', params).then(({ data }) => {
                    this.loadingProps = false
                    if (data) {
                        if (this.contractType == 1) {
                            let contractData = data;
                            _self.contractassesinfos = contractData
                            _self.listhaveorderinfos = contractData[0].listhaveorderinfos
                            _self.setPriceAndAsset()
                            _self.$pubsub.publish(_self.$pubsub.changeDealState);
                            _self.event_timer = setTimeout(function () {
                                _self.getContractAssesInfos(false);
                            }, 50000);
                        } else {
                            if (data.length > 0) {
                                var contractData = this.getContractsInfos(data, 1);
                                _self.contractassesinfos = contractData
                                _self.listhaveorderinfos = contractData[0].listhaveorderinfos
                                _self.tradingDealFrom = Object.assign({}, { canuseamount: Number(contractData[0].canuseamount) });
                                _self.tradingDealTo = Object.assign({}, { canuseamount: Number(contractData[0].canuseamount) });
                                /*更新交易状态*/
                                _self.$pubsub.publish(_self.$pubsub.changeDealState);
                                _self.event_timer = setTimeout(function () {
                                    _self.getContractAssesInfos(showLoading);
                                }, 50000);
                            }
                        }
                    }
                })
            } else {
                this.loadingProps = false
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
        },
        //设置订单类型
        setEntrustType(num) {
            this.entrustType = num
        },
        setEntrustTypeRight(num) {
            this.entrustTypeRight = num
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
        },
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
                this.getContractAssesInfos(true)
            },
            /*订阅最行情*/
            quotationDaily(res) {
                //subscribed from coint-list component inside changeTab(itype) function
                // console.log('res', res);
                this.dailyDetail = res
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

            }
        }
    },
    created() {
        this.setSymbolInfosFromLocal()
    },
    mounted() {
        this.contractType = this.$route.query.contractType
        console.log('this.contractType=======', this.contractType)
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
        this.getContractAssesInfos();

        this.$nextTick(() => {
            window.addEventListener('resize', this.onResize);
        })
        this.onResize()

        const route = this.$route
        const strategyBotId = route.query["strategy-bot-id"]
        //console.log('strategyBotId: ', strategyBotId)
        const ctid = route.query.ctid

        if ((strategyBotId == '' || strategyBotId == undefined || isNaN(strategyBotId)) && (ctid == '' || ctid == undefined || isNaN(ctid))) {
            this.showOnlyStandard = true
            this.standardBlock = true
        } else {
            this.showOnlyStandard = false
            this.standardBlock = false
        }




    },
    beforeDestroy() {
        clearInterval(this.event_timer);
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
<style lang="scss">
@import '@/assets/scss/pages/deal/exchange-block.scss';
</style>
<style lang='less'>
@import "../../static/styles/color";

body.contract-pro-body {
    width: 100% !important;
}

.money-exchange-content {
    background-color: @cl_global;

    .left-list-pro,
    .center-list,
    .right-list,
    .search,
    .after-right-list {
        float: left;
    }

    .left-list-pro {
        display: none;
        width: 280px;
        height: 100%;
        margin-right: 6px;
        margin-bottom: 6px;
    }

    .search-area {
        width: 280px;
        background: #0C1014;
        margin-right: 6px;
    }

    .center-list {
        margin-right: 6px;
        // margin-bottom: 6px;
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
        width: 100%;
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

.exchange-block_tnav {
    line-height: 36px;
    position: relative;
    border-bottom: 1px solid #292E39;
}

.tnav {
    display: inline-block;
    width: 76px;
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
}

.exchange-block_tnav .margin-operate span:hover {
    color: @cl_link !important;
}

.exchange-block_tnav .margin-operate span {
    margin-right: 10px;
}

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



.left-list-coinlist-contract-pro {
    height: 380px !important;
    width: 320px !important;
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
        margin-right: 0px;
        border: 1px solid @cl_292E39;
        position: relative;
        padding-right: 25px;
        padding-left: 8px;
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
            opacity: 1;
            font-weight: 500 !important;

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

.break {
    flex-basis: 100%;
    height: 0;
}

.contract-pro {
    .standard-strategy-container {
        width: 320px;
        background: @cl_12181D;
        margin-left: 6px;

        max-height: 1168px;
        min-height: 1181px;
    }

    #right-data {
        .contractcoininfo .dealcoin-items {
            padding-bottom: 20px;
            width: 89% !important;
        }
    }

    .left-list-pro {
        .left-list-knockdown-contract-pro {
            margin-top: 8px;
            height: 255px !important;
        }

        .contractcoininfo .dealcoin-items {
            height: 225px !important;
            padding: 0px 18px 0px 6px;
        }
    }

    .right-list.pro {
        .dealcoin-list_content .dealcoin-list_content_body {
            height: 520px
        }
    }

    .assets-detail {
        width: 320px;
        margin-left: 6px;
        margin-bottom: 6px;

        .assets-transfer {
            background-color: transparent !important;
        }

        .contractcoininfo .dealcoin-items {
            padding: 0px 16px 8px;
        }

        .dealcoin-list .coin-title {
            padding: 0px 16px 0px 0px;
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


    .TVChartContainer {
        margin: 0 auto;
        height: 581px !important;
    }

}




@media only screen and (max-width: 1799px) {
    .contract-pro {
        .right-list {

            .order-book,
            .market-trade {
                display: block;
            }

            .assets-transfer {
                display: none;
            }
        }

        .left-list {

            .order-book {
                display: none !important;
            }

            .market-trade,
            .assets-transfer {
                display: block !important;
            }
        }

        .assets-detail {
            .market-trade {
                display: none !important;
            }


            .transfer {
                padding: 0px !important;
            }
        }
    }

}


@media only screen and (min-width: 1800px) {
    .contract-pro {
        .left-list-pro {
            display: block;

            .dealcoin-list .dealcoin-list_content .dealcoin-list_content_body {
                height: 190px;
            }

        }

        .money-exchange-content {
            .money-exchange {
                width: 100%;
                // padding: 0 48px;
                // min-width: 1440px;
                // margin: auto;
            }
        }

        .after-right-list-pro {
            display: block;
            margin-bottom: 6px;
            margin-left: 6px;
            width: 280px;

        }

        .right-list.pro {

            .order-book {
                display: block !important;
            }

            .assets-transfer,
            .market-trade {
                display: none;
            }
        }

        .left-list-pro {
            display: block;
            width: 320px;
            height: 100%;
            margin-right: 6px;
            margin-bottom: 6px;

            .order-book {
                display: none !important;
            }

            .market-trade,
            .assets-transfer {
                display: block;
            }

            .left-coininfo {
                margin-top: 6px;
                height: 268px !important;
                overflow: hidden;
            }

        }

    }
}
</style>
