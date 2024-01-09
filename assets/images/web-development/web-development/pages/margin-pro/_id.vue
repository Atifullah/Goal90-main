<template>
    <div class="hex-flex">
        <div class="money-exchange-content hex-flex_auto margin margin-pro">
            <div class="money-exchange">
                <!--24小时行情start-->
                <hex-coin-list-header />
                <div style=" display:flex;">
                    <div class="" style=" display:flex;flex-grow:1; flex-wrap: wrap; height:100%;">
                        <div class="left-list-pro">
                            <!--币种列表-->
                            <hex-coinlist class="margin left-list-coinlist-margin-pro" :dailyDetail="dailyDetail"
                                :symbleinfo="symbleinfo" symbletype="-1" />
                            <!-- @setEntrustType="setEntrustTypeRight" -->
                            <hex-knockdown style="height: 263px; margin-top: 4px;" :symbleinfo="symbleinfo"
                                :showOrderTab="true" v-if="!screenSizeIsLg" />
                            <!--币种列表 end-->
                        </div>
                        <div class="" style="flex-grow:1;">
                            <hex-new-money class="" :symbleinfo="symbleinfo" :dailyDetail="dailyDetail"
                                :isMarginPage="true" />
                            <div style="display:flex;">
                                <div class="center-list" style="height: 574px;">
                                    <div class="chart-block" style="height: 574px;">
                                        <!-- TradingView Widget BEGIN -->
                                        <no-ssr>
                                            <TVChartContainer :symbol="symbleinfo.descriptions" :symbleinfo="symbleinfo" />
                                            <!-- <hex-chart class="hex-chart-margin" :symbleinfo="symbleinfo" /> -->
                                        </no-ssr>
                                        <!-- TradingView Widget END -->
                                    </div>
                                    <!--账户杠杆信息-->
                                </div>
                                <!--中间交易模块-->
                                <div class="right-list pro" style="height: 574px !important; ">
                                    <!--委托列表 start-->
                                    <hex-entrust v-show="entrustTypeRight == 8" :symbleinfo="symbleinfo"
                                        @entrust:getEntrustRate="getEntrustRate" :dailyDetail="dailyDetail"
                                        :showMarketTab="true" @setEntrustType="setEntrustTypeRight" />
                                    <hex-knockdown style="height: 574px;" v-if="entrustTypeRight == 10 && screenSizeIsLg"
                                        :symbleinfo="symbleinfo" @setEntrustType="setEntrustTypeRight"
                                        :showOrderTab="true" />
                                    <!--委托列表 end-->
                                </div>
                            </div>
                        </div>
                        <div class="break"></div>
                        <div class="" style="width:100%;">
                            <hex-order :symbleinfo="symbleinfo" symbletype="-1" :leverageCtidInfo="leverageCtidInfo"
                                ref="ref_order" />
                        </div>
                    </div>
                    <div class="white-theme-bg"
                        style="max-height: 1183px; width: 320px; margin-left: 6px; min-height: 1020px;">

                        <div id="exchange-block">
                            <a-row class="">
                                <a-col :lg="showOnlyStandard ? 24 : 12">
                                    <a-button @click="standardBlock = true" block class="standard-btn fw-5"
                                        :class="standardBlock ? 'active-tab' : ''">{{ $t('deal_new.dn1') }}</a-button>
                                </a-col>
                                <a-col :lg="12" v-if="!showOnlyStandard">
                                    <a-button @click="standardBlock = false" block class="standard-btn fw-5 strategy-btn"
                                        :class="!standardBlock ? 'active-tab' : ''">{{ $t('deal_new.dn2') }}</a-button>
                                </a-col>
                            </a-row>
                            <div style="width:320px" v-if="standardBlock" class="standard-section">
                                <hex-margin-token :symbleinfo="symbleinfo" :leverageCtidInfo="leverageCtidInfo"
                                    ref="child_margin" />
                                <a-tabs v-model="activeKey" class="buy" @change="onTabChange">
                                    <a-tab-pane :key="1" :tab="$t('tabkeys.tab70')"></a-tab-pane>
                                    <a-tab-pane :key="2" :tab="$t('tabkeys.tab71')"></a-tab-pane>
                                </a-tabs>
                                <div class="rang-tabs">
                                    <a-tabs v-model="orderType" @change=setOrderType>
                                        <a-tab-pane :key="1" :tab="$t('legal.lgl5')">
                                            <hex-limit v-if="orderType == 1" :symbleinfo="symbleinfo"
                                                :leverageCtidInfo="leverageCtidInfo" :tradingDealTo="tradingDealTo"
                                                margin="margin" :tradingDealFrom="tradingDealFrom"
                                                :entrustSaleRate="entrustSaleRate" :entrustBuyRate="entrustBuyRate"
                                                :entrustSaleNum="entrustSaleNum" :entrustBuyNum="entrustBuyNum"
                                                :activeKey="activeKey" @onOpenTransferPopup="showPopTrasfer()" />
                                        </a-tab-pane>
                                        <a-tab-pane :key="2" :tab="$t('home.trades')">
                                            <hex-market v-if="orderType == 2" :symbleinfo="symbleinfo"
                                                :leverageCtidInfo="leverageCtidInfo" :tradingDealTo="tradingDealTo"
                                                margin="margin" :tradingDealFrom="tradingDealFrom"
                                                :entrustSaleRate="entrustSaleRate" :entrustBuyRate="entrustBuyRate"
                                                :activeKey="activeKey" @onOpenTransferPopup="showPopTrasfer()" />
                                        </a-tab-pane>
                                        <a-tab-pane :key="3" :tab="$t('tabkeys.tab69')">
                                            <hex-profit-loss v-if="orderType == 3" :symbleinfo="symbleinfo"
                                                :leverageCtidInfo="leverageCtidInfo" :tradingDealTo="tradingDealTo"
                                                margin="margin" :tradingDealFrom="tradingDealFrom"
                                                :entrustSaleRate="entrustSaleRate" :entrustBuyRate="entrustBuyRate"
                                                :triggerPriceBuy="triggerPriceBuy" :triggerPriceSale="triggerPriceSale"
                                                :entrustSaleNum="entrustSaleNum" :entrustBuyNum="entrustBuyNum"
                                                :activeKey="activeKey" @onOpenTransferPopup="showPopTrasfer()" />
                                        </a-tab-pane>
                                    </a-tabs>
                                    <a-row class="px-2" v-if="!$userinfo.uid">
                                        <a-col :lg="24">
                                            <a-button style="width:100%; background:#FFAF00 !important;"
                                                class="buy-btc-btn mb-2" @click="() => $router.push('/register')">{{
                                                    $t('home.headRegister') }}</a-button>
                                            <a-button style="width:100%;" class="exchange-block_button_buy no_login"
                                                @click="() => $router.push('/login')">{{ $t("home.headLogin") }}</a-button>
                                        </a-col>
                                    </a-row>
                                    <a-row class="px-3 asset-detail">
                                        <a-col :lg="12">
                                            <p class="mt-4 mb-2 assets-detail-txt text-white">
                                                {{ $t('contract.assets') }} <img src="/images/white-eye.svg" />
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
                                            <p class="my-1 gray-black">
                                                {{ symbleinfo.tcurrencyname }} {{ $t('leverage.Balance') }}
                                            </p>
                                        </a-col>
                                        <a-col :lg="12">
                                            <p class="my-1 text-white text-right">
                                                {{ this.global_get_tofixed(tradingDealTo.tamount,
                                                    symbleinfo.pricedigits) }} {{ symbleinfo.tcurrencyname }}
                                            </p>
                                        </a-col>
                                        <a-col :lg="12">
                                            <p class="my-1 gray-black">
                                                {{ symbleinfo.fcurrencyname }} {{ $t('leverage.Balance') }}
                                            </p>
                                        </a-col>
                                        <a-col :lg="12">
                                            <p class="my-1 text-white text-right">
                                                {{
                                                    this.global_get_tofixed(tradingDealFrom.famount,
                                                        symbleinfo.amountdigits)
                                                }} {{ symbleinfo.fcurrencyname }}
                                            </p>
                                        </a-col>

                                    </a-row>

                                    <a-row :gutter="8" class="mx-3 redirect-links ">
                                        <a-col :lg="8" class="mt-3" style="display:flex; justify-content:start;">

                                            <a-button class="cancel-outline-btn fw-5  px-2" size="small" block
                                                @click="toRecharge(tradingDealTo)">
                                                <nuxt-link :to="selfRoute.wallet">
                                                    {{ $t('wallet.recharge') }}
                                                </nuxt-link>
                                            </a-button>
                                        </a-col>
                                        <a-col :lg="8" class="mt-3" style="display:flex; justify-content:center;">
                                            <a-button class="cancel-outline-btn fw-5  px-2" size="small" block
                                                @click="showPopTrasfer()">
                                                {{ $t('leverage.transfer') }}
                                            </a-button>
                                        </a-col>
                                        <a-col :lg="8" class="mt-3" style="display:flex; justify-content:end;">

                                            <a-button class="cancel-outline-btn fw-5 px-2" size="small" block>
                                                <nuxt-link :to="selfRoute.convert">
                                                    {{ $t('convert.con3') }}
                                                </nuxt-link>
                                            </a-button>

                                        </a-col>
                                    </a-row>
                                </div>
                            </div>
                            <div style="width:320px" v-else>
                                <hex-strategy :symbleinfo="symbleinfo" :is-margin="true" :tradingTo="tradingDealTo"
                                    :tradingFrom="tradingDealFrom" @onOpenTransferPopup="showPopTrasfer()" />
                            </div>
                        </div>
                    </div>
                </div>
                <hex-transfer v-if="transfer_pop" :transfer_pop="transfer_pop" :ctid="symbleinfo.id" type="1"
                    :closePopup="showPop" ref="ref_transfer" />

            </div>
        </div>
    </div>
</template>
<script>
import chart from '@/components/deal/chart'
import limit from '@/components/deal/limit-pro'
import coinListHeader from '@/components/deal/coin-list-header'
import market from '@/components/deal/market-pro'
import profitLoss from '@/components/deal/profit-loss-pro'
import orderList from '@/components/deal/order-list'
import entrust from '@/components/deal/entrust'
import knockdown from '@/components/deal/knockdown'
import newMoney from '@/components/deal/new-money'
import coinList from '@/components/deal/coin-list'
import marginToken from '@/components/margin/margin-token'
import coin from '@/components/public/coin'
import transferPop from '@/components/security/transfer';//转账
import strategy from '@/components/deal/strategy.vue'
import TVChartContainer from '~/components/Chart/TVChartContainer.vue'
export default {
    name: 'MarginPro',
    components: {
        'hex-chart': chart,
        'hex-limit': limit,
        'hex-profit-loss': profitLoss,
        'hex-coin-list-header': coinListHeader,
        'hex-market': market,
        'hex-order': orderList,
        'hex-entrust': entrust,
        'hex-knockdown': knockdown,
        'hex-new-money': newMoney,
        'hex-coin': coin,
        'hex-coinlist': coinList,
        'hex-margin-token': marginToken,
        'hex-transfer': transferPop,
        'hex-strategy': strategy,
        TVChartContainer,
    },
    data() {
        return {
            borrowShow: false,
            background: false,

            standardBlock: true,
            showOnlyStandard: true,
            notice: false,
            searchvalue: '',
            orderType: 1,
            activeKey: 1,
            transfer_pop: false,
            marginsymbles: [],
            //获取用户交易对信息
            tradingDealTo: {
                canuseamount: 0
            },
            tradingDealFrom: {
                canuseamount: 0
            },
            entrustTypeRight: 8,
            //设置触发价
            triggerPriceBuy: '',
            triggerPriceSale: '',
            //设置买入卖出价
            entrustBuyRate: '',
            entrustSaleRate: '',
            entrustBuyNum: '',
            entrustSaleNum: '',
            dailyDetail: {},
            symbleinfo: {},
            leverageCtidInfo: {},
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
        showPopTrasfer() {
            if (this.transfer_pop)
                this.getUserBorrowAssessInfos();
            this.transfer_pop = !this.transfer_pop;
        },
        //交易数据接口(用户交易对信息)
        getUserBorrowAssessInfos() {
            if (this.$userinfo.uid) {
                let _self = this;
                this.$store.dispatch('userborrowmoney_user_mortgageassets_infos', { ctid: this.symbleinfo.id }).then(({ data }) => {
                    if (data) {
                        var marginData = this.getMortgageassetsInfos(data, 1)[0]
                        if (marginData) {
                            _self.tradingDealFrom = Object.assign({}, { canuseamount: Number(marginData.fcanuseamount), famount: Number(marginData.famount) });
                            _self.tradingDealTo = Object.assign({}, { canuseamount: Number(marginData.tcanuseamount), tamount: Number(marginData.tamount) });
                            /*更新交易状态*/
                            _self.$pubsub.publish(_self.$pubsub.changeDealState);
                            if (Number(marginData.riskrate) <= 1.1 && Number(marginData.riskrate) > 0) {
                                _self.percentage = '100%';
                            } else if (Number(marginData.riskrate) > 1.1 && Number(marginData.riskrate) < 2) {
                                _self.percentage = `${((marginData.riskrate - 1.1) / (2 - 1.1)) * 100}%`;
                            } else {
                                _self.percentage = 0;
                            }
                            _self.leverageCtidInfo = marginData;

                        }
                    }
                })
            }
        },
        HideNotice() {
            this.notice = true
            this.$storage.set("marginnotice", true);
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
        getIsCollect(val) {
            this.iscollect = val;
        },
        limitPrice: function (c, o) {
            let limit_price = Number((((c - o) / o) * 100).toFixed(4));
            return isNaN(limit_price) ? 0 : limit_price;
        },
        //设置买入价卖出价 触发价
        getEntrustRate(m) {
            this.entrustBuyRate = this.global_get_tofixed(m.p, this.symbleinfo.pricedigits)
            this.entrustSaleRate = this.global_get_tofixed(m.p, this.symbleinfo.pricedigits)
            this.triggerPriceBuy = this.global_get_tofixed(m.p, this.symbleinfo.pricedigits)
            this.triggerPriceSale = this.global_get_tofixed(m.p, this.symbleinfo.pricedigits)
            this.entrustBuyNum = this.global_get_tofixed(m.alltotal, this.symbleinfo.amountdigits)
            this.entrustSaleNum = this.global_get_tofixed(m.alltotal, this.symbleinfo.amountdigits)
        },
        //设置订单类型
        setOrderType(num) {
            this.orderType = num
        },
        setBorrowShow() {
            this.borrowShow = !this.borrowShow
        },
        showPop() {
            this.transfer_pop = !this.transfer_pop;
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
            getOrderList() {//下单后更新资产数据
                this.getUserBorrowAssessInfos();
                this.pop_in = false;
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
            }
        }
    },
    created() {
        // this.setSymbolInfosFromLocal()
    },
    mounted() {
        if (this.$storage.get("marginnotice")) {
            this.notice = this.$storage.get("marginnotice");
        }
        const symblename = this.$route.params.id.replace('_', '/')
        this.marginsymbles = this.$store.state.symbleinfos.filter(item => {
            return item.itype == 0 && item.borrowmultiple > 0
        });
        this.symbleinfo = this.marginsymbles.filter((item) => {
            return item.descriptions == symblename.toUpperCase();
        })[0];
        this.$store.commit('trade/setSymbolInfo', this.symbleinfo)
        this.getUserBorrowAssessInfos()
        const route = this.$route

        const strategyBotId = route.query["strategy-bot-id"]
        const ctid = route.query.ctid
        if ((strategyBotId == '' || strategyBotId == undefined || isNaN(strategyBotId)) && (ctid == '' || ctid == undefined || isNaN(ctid))) {
            this.showOnlyStandard = true
            this.standardBlock = true
        } else {
            this.showOnlyStandard = false
            this.standardBlock = false
        }
        this.$nextTick(() => {
            window.addEventListener('resize', this.onResize);
        })
        this.onResize()



    },

    beforeDestroy() {
        this.$store.commit('trade/setSocketTradeDetail', { data: [] })

        const symbol = this.symbleinfo.descriptions.replace("/", "")
        this.$socket.uninvoke({
            sub: "market." + symbol.toLowerCase() + ".trade.detail",
            type: this.$socket.type.quotation_trading_details_get
        })

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

.money-exchange-content.margin-pro {
    .new-money .money-type {
        width: auto !important;
    }

    background-color: @cl_global;
    width: 100%;

    .left-list-pro,
    .center-list,
    .right-list,
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

    .money-exchange {
        width: 100%;
        // min-width: 1440px;
        // margin: auto;

        .content {
            position: relative;
            overflow: hidden;
            display: flex;
            width: 100%;
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

    .TVChartContainer {
        margin: 0 auto;
        height: 581px !important;
    }

    @import "../deal/exchangeblock";
}

.exchange-block_content {
    overflow: hidden;
    width: 100%;
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

.notice {
    position: absolute;
    z-index: 99;
    background: url(../../static/images/notice.png) no-repeat left 10px center, @cl_link;
    border-radius: 5px;
    padding-left: 30px;
    padding-right: 6px;
    line-height: 30px;
    font-size: 12px;
    color: #fff;
    right: -45px;
    top: -35px;
}

.notice a {
    margin-left: 5px;
    display: inline-block;
    background: rgba(255, 255, 255, 0.9);
    border-radius: 5px;
    color: #14a2a5;
    line-height: 24px;
    font-size: 12px;
    padding: 0 5px;
    min-width: 40px;
    text-align: center;
}

.notice a:hover {
    background: rgba(255, 255, 255, 1);
}

.notice:after {
    content: " ";
    position: absolute;
    top: 29px;
    left: calc(85% - 20px);
    background: url(../../static/images/ardo.png) no-repeat top center;
    width: 15px;
    height: 10px;
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

.money-exchange-content .exchange-block {
    min-height: 344px !important;
    margin-top: 5px;
}

.money-exchange-content.margin .knockdown-list {
    height: 344px !important;
}


.money-exchange-content.margin .entrust-list {
    height: 100% !important;
}

.knockdown-list_content_body {
    height: 274px !important;
}

.left-list-coinlist-margin-pro {
    height: 445px !important;

}

.left-list-knockdown-margin {
    height: 345px;
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

    .margin-pro {
        .right-list {
            .dealcoin-list .dealcoin-list_content .dealcoin-list_content_body {
                height: 520px !important;
            }
        }
    }
}



@media only screen and (min-width: 1800px) {
    .money-exchange-content.margin-pro {
        .money-exchange {
            width: 100%;
            // padding: 0 48px;
            // min-width: 1440px;
            // margin: auto;
        }

        .after-right-list {
            display: block;
            margin-left: 6px;
            width: 280px;
        }

        .left-list-pro {
            display: block !important;
            width: 320px;
            height: 100%;
            margin-right: 6px;
            margin-bottom: 6px;

            .order-book {
                display: none;
            }

            .market-trade {
                display: block;
            }

        }

        .right-list.pro {
            .order-book {
                display: block;
            }

            .market-trade {
                display: none;
            }
        }
    }

    .left-list-knockdown-margin {
        display: none;
    }

    .left-list-coinlist-margin-pro {
        max-height: 380px !important;
    }
}
</style>
