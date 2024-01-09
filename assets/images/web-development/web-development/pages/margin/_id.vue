<template>
    <div class="hex-flex">
        <div class="money-exchange-content hex-flex_auto margin pt-1">
            <div class="money-exchange" :class="bindTabClass">
                <!--24小时行情start-->
                <!-- <hex-new-money :symbleinfo="symbleinfo" :dailyDetail="dailyDetail" /> -->
                <div style="display: flex">
                    <div class="left-list">
                        <!--币种列表-->
                        <hex-coinlist class="margin left-list-coinlist-margin" :dailyDetail="dailyDetail"
                            :symbleinfo="symbleinfo" symbletype="-1" />
                        <!--币种列表end-->
                        <!--最新成交start-->
                        <hex-knockdown class="left-list-knockdown-margin" :symbleinfo="symbleinfo" v-if="screenSizeIsLg" />
                        <!--最新成交end-->
                    </div>
                    <div class="" style="flex-grow: 1">
                        <hex-new-money class="" :symbleinfo="symbleinfo" :dailyDetail="dailyDetail" />
                        <div style="display: flex">
                            <div class="center-list">
                                <div class="chart-block" style="height: 348px">
                                    <!-- TradingView Widget BEGIN -->
                                    <no-ssr>
                                        <TVChartContainer :symbleinfo="symbleinfo" :symbol="symbleinfo.descriptions" />
                                        <!-- <hex-chart class="hex-chart-margin" :symbleinfo="symbleinfo" /> -->
                                    </no-ssr>
                                    <!-- TradingView Widget END -->
                                </div>
                                <!--账户杠杆信息-->
                                <hex-margin-token :symbleinfo="symbleinfo" :leverageCtidInfo="leverageCtidInfo"
                                    ref="child_margin" />

                                <div class="exchange-block" style="overflow: inherit; min-height: 353px">
                                    <div class="exchange-block_nav">
                                        <div class="nav-content">
                                            <div class="notice" v-if="notice === false">
                                                {{ $t("deal.notice01") }}
                                                <div class="close" @click="HideNotice"></div>
                                            </div>
                                            <span :class="{
                                                active: orderType == 1,
                                            }" @click="setOrderType(1)">{{ $t("deal.limitedDeal") }}</span>
                                            <span :class="{
                                                active: orderType == 2,
                                            }" @click="setOrderType(2)">
                                                {{ $t("deal.marketDeal") }}
                                            </span>
                                            <span :class="{
                                                active: orderType == 3,
                                            }" @click="setOrderType(3)">{{ $t("deal.stopLoss") }}</span>
                                            <span :class="{
                                                active: orderType == 4,
                                            }" @click="setOrderType(4)">
                                                {{ $t("deal.strategyTrade") }}
                                            </span>

                                            <span class="margin-operate">
                                                <nuxt-link tag="span" @click.native="showPop()" to="" class="meuns">{{
                                                    $t("leverage.transfer")
                                                }}
                                                </nuxt-link>
                                            </span>
                                        </div>
                                    </div>
                                    <div>
                                        <!--限价交易start-->
                                        <hex-limit v-if="orderType == 1" :symbleinfo="symbleinfo"
                                            :leverageCtidInfo="leverageCtidInfo" :tradingDealTo="tradingDealTo"
                                            margin="margin" :tradingDealFrom="tradingDealFrom"
                                            :entrustSaleRate="entrustSaleRate" :entrustBuyRate="entrustBuyRate"
                                            :entrustSaleNum="entrustSaleNum" :entrustBuyNum="entrustBuyNum" />
                                        <!--限价交易end-->
                                        <!--市价交易start-->
                                        <hex-market v-if="orderType == 2" :symbleinfo="symbleinfo"
                                            :leverageCtidInfo="leverageCtidInfo" :tradingDealTo="tradingDealTo"
                                            margin="margin" :tradingDealFrom="tradingDealFrom"
                                            :entrustSaleRate="entrustSaleRate" :entrustBuyRate="entrustBuyRate" />
                                        <!--市价交易end-->
                                        <!--止盈止损交易start-->
                                        <hex-profit-loss v-if="orderType == 3" :symbleinfo="symbleinfo"
                                            :leverageCtidInfo="leverageCtidInfo" :tradingDealTo="tradingDealTo"
                                            margin="margin" :tradingDealFrom="tradingDealFrom"
                                            :entrustSaleRate="entrustSaleRate" :entrustBuyRate="entrustBuyRate"
                                            :triggerPriceBuy="triggerPriceBuy" :triggerPriceSale="triggerPriceSale"
                                            :entrustSaleNum="entrustSaleNum" :entrustBuyNum="entrustBuyNum" />
                                        <!--止盈止损交易end-->

                                        <StrategyHorizental :symbleinfo="symbleinfo" :tradingTo="tradingDealTo"
                                            @onOpenTransferPopup="
                                                showPopTrasfer()
                                                " :tradingFrom="tradingDealFrom" :is-spot="true"
                                            v-if="orderType == 4" />
                                    </div>
                                </div>
                            </div>
                            <!--中间交易模块-->

                            <div class="right-list">
                                <!--委托列表start-->
                                <hex-entrust :symbleinfo="symbleinfo" @entrust:getEntrustRate="getEntrustRate"
                                    :dailyDetail="dailyDetail" />
                                <!--委托列表end-->
                            </div>

                            <div class="after-right-list">
                                <!--委托列表start-->
                                <hex-knockdown :symbleinfo="symbleinfo" style="height: 100%" v-if="!screenSizeIsLg" />
                                <!--委托列表end-->
                            </div>
                        </div>
                    </div>
                </div>
                <!--24小时行情end-->
                <div class="content">
                    <!--中间交易模块-->
                </div>
                <!--用户订单列表start-->
                <hex-order :symbleinfo="symbleinfo" symbletype="-1" :leverageCtidInfo="leverageCtidInfo" ref="ref_order" />
                <hex-transfer v-if="transfer_pop" :transfer_pop="transfer_pop" :ctid="symbleinfo.id" type="1"
                    :closePopup="showPop" ref="ref_transfer" />
                <!--用户订单列表end-->
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
import marginToken from "@/components/margin/margin-token";
import coin from "@/components/public/coin";
import transferPop from "@/components/security/transfer"; //转账
import StrategyHorizental from "@/components/deal/StrategyHorizental.vue";
import TVChartContainer from "~/components/Chart/TVChartContainer.vue";
export default {
    name: "Margin",
    components: {
        "hex-chart": chart,
        "hex-limit": limit,
        "hex-profit-loss": profitLoss,
        "hex-market": market,
        "hex-order": orderList,
        "hex-entrust": entrust,
        "hex-knockdown": knockdown,
        "hex-new-money": newMoney,
        "hex-coin": coin,
        "hex-coinlist": coinList,
        "hex-margin-token": marginToken,
        "hex-transfer": transferPop,
        StrategyHorizental,
        TVChartContainer,
    },
    data() {
        return {
            borrowShow: false,
            background: false,
            notice: false,
            searchvalue: "",
            orderType: 1,
            transfer_pop: false,
            marginsymbles: [],
            //获取用户交易对信息
            tradingDealTo: {
                canuseamount: 0,
            },
            tradingDealFrom: {
                canuseamount: 0,
            },
            //设置触发价
            triggerPriceBuy: "",
            triggerPriceSale: "",
            //设置买入卖出价
            entrustBuyRate: "",
            entrustSaleRate: "",
            entrustBuyNum: "",
            entrustSaleNum: "",
            dailyDetail: {},
            symbleinfo: {},
            leverageCtidInfo: {},
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

    watch: {
        // 'window.innerWidth': function (val) {
        //     //console.log('val window.innerWidth: ', val)
        // }
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
        showPopTrasfer() {
            if (this.transfer_pop) this.getUserBorrowAssessInfos();
            this.transfer_pop = !this.transfer_pop;
        },
        //交易数据接口(用户交易对信息)
        getUserBorrowAssessInfos() {
            if (this.$userinfo.uid) {
                let _self = this;
                this.$store
                    .dispatch("userborrowmoney_user_mortgageassets_infos", {
                        ctid: this.symbleinfo.id,
                    })
                    .then(({ data }) => {
                        if (data) {
                            var marginData = this.getMortgageassetsInfos(data, 1)[0]
                            if (marginData) {
                                _self.tradingDealFrom = Object.assign({},{ canuseamount: Number(marginData.fcanuseamount) });
                                _self.tradingDealTo = Object.assign({}, { canuseamount: Number(marginData.tcanuseamount) });
                                /*更新交易状态*/
                                _self.$pubsub.publish(
                                    _self.$pubsub.changeDealState
                                );
                                if (
                                    Number(marginData.riskrate) <= 1.1 &&
                                    Number(marginData.riskrate) > 0
                                ) {
                                    _self.percentage = "100%";
                                } else if (
                                    Number(marginData.riskrate) > 1.1 &&
                                    Number(marginData.riskrate) < 2
                                ) {
                                    _self.percentage = `${((marginData.riskrate - 1.1) / (2 - 1.1)) * 100
                                        }%`;
                                } else {
                                    _self.percentage = 0;
                                }
                                _self.leverageCtidInfo = marginData;
                            }
                        }
                    });
            }
        },
        HideNotice() {
            this.notice = true;
            this.$storage.set("marginnotice", true);
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
        //设置订单类型
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
        setBorrowShow() {
            this.borrowShow = !this.borrowShow;
        },
        showPop() {
            this.transfer_pop = !this.transfer_pop;
        },
    },
    /*订阅相关消息*/
    subscribe() {
        return {
            /*更新交易卖出买入量*/
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
                //下单后更新资产数据
                this.getUserBorrowAssessInfos();
                this.pop_in = false;
            },
            /*订阅最行情*/
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
        if (this.$storage.get("marginnotice")) {
            this.notice = this.$storage.get("marginnotice");
        }
        const symblename = this.$route.params.id.replace("_", "/");
        this.marginsymbles = this.$store.state.symbleinfos.filter((item) => {
            return item.itype == 0 && item.borrowmultiple > 0;
        });
        this.symbleinfo = this.marginsymbles.filter((item) => {
            return item.descriptions == symblename.toUpperCase();
        })[0];
        this.$store.commit("trade/setSymbolInfo", this.symbleinfo);

        this.$nextTick(() => {
            window.addEventListener("resize", this.onResize);
        });
        this.onResize();

        this.getUserBorrowAssessInfos();
    },
    beforeDestroy() {
        const symbol = this.symbleinfo.descriptions.replace("/", "");
        this.$socket.uninvoke({
            sub: "market." + symbol.toLowerCase() + ".trade.detail",
            type: this.$socket.type.quotation_trading_details_get,
        });
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

.money-exchange-content.margin {
    background-color: @cl_global;
    width: 100%;

    .multiple {
        margin-right: 6px;
        padding: 0 10px;
        border: 1px solid #f4b805;
        font-size: 14px;
        background: transparent;
        border-radius: 2px;
        cursor: pointer;
    }

    .left-list,
    .center-list,
    .right-list,
    .after-right-list {
        float: left;
    }

    .left-list {
        width: 320px;
        height: 819px;
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
        height: 746px !important;
    }

    .after-right-list {
        display: none;
        margin-bottom: 6px;
        margin-left: 6px;
        width: 320px;
        height: 746px !important;
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
            content: "";
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

    .dealcoin-list .dealcoin-list_content .dealcoin-list_content_body {
        height: 301px !important;
    }

    .strategy-tab-opened {
        .left-list-knockdown-margin {
            height: 425px !important;
        }

        .dealcoin-list_content .dealcoin-list_content_body {
            height: 359px !important;
        }

        .left-list {
            height: 877px !important;
        }

        .right-list,
        .after-right-list {
            height: 804px !important;
        }
    }

    .trigger-order-tab-opened {
        .left-list-knockdown-margin {
            height: 409px !important;
        }

        .left-list {
            height: 860px !important;
        }

        .right-list,
        .after-right-list {
            height: 787px !important;
        }

        .dealcoin-list_content .dealcoin-list_content_body {
            height: 342px !important;
        }
    }

    @import "../deal/exchangeblock";

    .exchange-block .exchange-block_nav .active {
        background-color: #12181d;
        border-left: 1px solid #393939;
        border-right: 1px solid #393939;
    }
}

.exchange-block_content {
    overflow: hidden;
    width: 100%;
}

.notice {
    position: absolute;
    z-index: 99;
    background: url(../../static/images/notice.png) no-repeat left 10px center,
        @cl_link;
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

.left-list-coinlist-margin {
    height: 445px !important;
}

.left-list-knockdown-margin {
    height: 368px !important;
}

@media only screen and (max-width: 1799px) {
    .after-right-list {
        .order-book {
            display: none;
        }

        .market-trade {
            display: block;
        }
    }

    .right-list {
        .market-trade {
            display: none;
        }
    }

    .left-list {
        .order-book {
            display: none !important;
        }
    }

    .margin {
        .dealcoin-list .coin-content .coin-list_content {
            max-height: 323px !important;
        }
    }
}

.margin {
    .exchange-block .exchange-block_nav .nav-content>span {
        padding: 2px 20px 0px 20px !important;
        line-height: 44px !important;
    }

    .exchange-block .exchange-block_nav {
        border-bottom: 1px solid #393939;
        padding: 24px 0px 22px 0px;
    }

    .exchange-block_nav .active {
        background-color: @cl_12181D;
    }

    .TVChartContainer {
        margin: 0 auto;
        height: 382px !important;
    }

    .nav-content span.active:first-child {
        border-left: 0px !important;
    }

}

@media only screen and (min-width: 1800px) {
    .money-exchange-content {
        .money-exchange {
            width: 100%;
        }

        .after-right-list {
            display: block !important;
            margin-left: 6px;
            width: 280px;

            .dealcoin-list .dealcoin-list_content .dealcoin-list_content_body {
                height: 677px !important;
            }

            .order-book {
                display: none;
            }

            .market-trade {
                display: block;
            }
        }

        .trigger-order-tab-opened {
            .after-right-list {
                .dealcoin-list {
                    .dealcoin-list_content {
                        .dealcoin-list_content_body {
                            height: 721px !important;
                        }
                    }
                }
            }
        }

        .strategy-tab-opened {
            .after-right-list {
                .dealcoin-list {
                    .dealcoin-list_content {
                        .dealcoin-list_content_body {
                            height: 738px !important;
                        }
                    }
                }
            }
        }


    }

    .margin {
        .left-list-knockdown-margin {
            display: none;
        }

        .left-list-coinlist-margin {
            height: 100% !important;
        }

        .left-list {
            .dealcoin-list .coin-content .coin-list_content {
                max-height: 674px !important;
            }
        }


        .strategy-tab-opened.strategy-auto-tab-is-active {
            .left-list {
                height: 835px !important;

                .dealcoin-list_content .dealcoin-list_content_body {
                    height: 318px !important;
                }

                .left-list-knockdown-margin {
                    height: 384px !important;
                }
            }

            .right-list,
            .after-right-list {
                height: 762px !important;
            }
        }
    }
}

.day .money-exchange-content.margin {
    background-color: #ffffff;
}
</style>
