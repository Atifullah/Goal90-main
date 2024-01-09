<style scoped lang="less">
@import "css/order-list";
</style>
<template>
    <div class="traded">
        <div class="traded-block">
            <div class="traded_table_content">
                <table class="hex_table">
                    <thead class="hex_table_header padding br">
                        <tr>
                            <th class="lt">
                                <div>{{ $t('strtable.stab1') }}</div>
                            </th>
                            <th class="lt">
                                <div>ID</div>
                            </th>
                            <th class="lt">
                                <div>{{ $t('strtable.stab2') }}</div>
                            </th>
                            <th class="lt">
                                <div>{{ $t('strtable.stab3') }}</div>
                            </th>
                            <th class="lt">
                                <div>{{ $t('strtable.stab4') }}</div>
                            </th>
                            <th class="lt">
                                <div>{{ $t('strtable.stab5') }}</div>
                            </th>
                            <th class="lt">
                                <div>{{ $t('strtable.stab6') }}</div>
                            </th>
                            <th class="lt">
                                <div>{{ $t('strtable.stab9') }}</div>
                            </th>
                            <th class="lt">
                                <div>{{ $t('strtable.stab8') }}</div>
                            </th>
                            <th class="rt">
                                <div> {{ $t('strategy.trade_count') }}</div>
                            </th>
                            <th class="rt">
                                <div>{{ $t('strtable.stab10') }}</div>
                            </th>
                            <th class="rt">
                                <div>{{ $t('strtable.stab7') }}</div>
                            </th>
                            <th class="rt">
                                <div>{{ $t('strtable.stab11') }}</div>
                            </th>
                        </tr>
                    </thead>
                    <tbody class="deal-tbody">
                        <tr class="hex_table_body padding" v-for="(coins, index) in orderDetail" :key="index">
                            <td class="lt">
                                {{ global_get_local_time(coins.createtime).format('YYYY-MM-DD HH:mm:ss') }}
                            </td>
                            <td class="lt">
                                {{ coins.id }}
                            </td>
                            <td class="lt">
                                <span v-if="coins.strategytype == 3">{{ coins.fcurrencyname }}
                                    <span class="symbolTo ml-1 perpetual-txt fw-5"> {{ $t('deal_new.dn10') }}</span></span>
                                <span v-else>{{ coins.market }}
                                    <a-tag class="tag ml-1" v-if="coins.strategytype == 2">{{ coins.borrowmultiple
                                    }}x</a-tag>
                                </span>
                            </td>
                            <td class="lt">
                                {{ coins.minprice }}- {{ coins.maxprice }}
                            </td>
                            <td class="lt" :class="{ 'success': coins.direction == 1, 'fail': coins.direction == -1 }">
                                {{ coins.gridnum }}
                            </td>
                            <td class="lt">
                                {{ coins.famount }} {{ coins.fcurrencyname }} / {{ coins.tamount }} {{ coins.tcurrencyname
                                }}
                            </td>
                            <td class="lt">
                                {{ coins.stoplossprice }} / {{ coins.stopprofitprice }}
                            </td>
                            <td class="lt">
                                {{ global_get_tofixed_entrust(coins.incomerate * 100, 2) }}%
                            </td>
                            <td class="lt">
                                {{ global_get_tofixed_entrust(coins.profit, 2) }}
                            </td>
                            <td class="rt">
                                {{ coins.tradenum }}
                            </td>
                            <td class="rt">
                                <AppInfoTooltip :title="coins.reason" v-if="coins.reason" />
                                <a-switch :checked="coins.state" @change="strategyChange(coins)" v-else />
                            </td>

                            <td class="rt">
                                {{ coins.state == 1 ? gethours(new Date(coins.createtime), getUTCTime()) : gethours(new
                                    Date(coins.createtime), new Date(coins.updatetime)) }}
                            </td>
                            <td class="rt" :class="coins.state ? '' : 'repeal'">
                                <a href="javascript:void(0)" v-if="coins.state == 1">--</a>
                                <a href="javascript:void(0)" @click="strategyDelete(coins)"
                                    v-else>{{ $t('deal_new.dn11') }}</a>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div class="anonymous" v-if="loading || !found">
                    <div class="loadingPic deal" v-hex-loading="loading" v-if="loading" />
                    <template v-if="!found">
                        <div v-if="$userinfo.uid"> 
                            <AppNoData /> 
                        </div>
                        <div v-else class="islogin">
                            <nuxt-link to="/login">{{ $t('home.headLogin') }}</nuxt-link>
                            /
                            <nuxt-link to="/register"> {{ $t('home.headRegister') }}</nuxt-link>
                        </div>
                    </template>
                </div>
            </div>
            <div class="mr-3"
                :class="$store.state.hex_client_background.active == 'night' ? 'deal-paging-source' : 'text-right'"
                v-if="requestParameter.totalitemcount > 0">
                <a-pagination background @change="handChange" :page-size="requestParameter.pageSize"
                    :current="requestParameter.pageIndex" popper-class="paging" layout="prev, pager, next"
                    :total="requestParameter.totalitemcount">
                </a-pagination>
            </div>
        </div>
    </div>
</template> 
<script>

import AppInfoTooltip from '../App/AppInfoTooltip.vue'
import AppNoData from '../App/AppNoData.vue';
export default {
    name: "StrategyTable",
    components: { AppInfoTooltip, AppNoData },
    props: ["symbleinfo", "isSelect"],
    data() {
        return {
            loading: true,
            found: true,
            requestParameter: {
                pageIndex: 1,
                pageSize: 10,
                totalitemcou1nt: 0,
            },
            orderDetail: [],
        };
    },
    watch: {
        "isSelect": function (val) {
            if (val.length > 0) {
                this.requestParameter.ctid = this.symbleinfo.id;
                this.getStrategies();
            }
            else {
                this.requestParameter.ctid = "";
                this.getStrategies();
            }
        },
        "changeState": function (val) {
            if (val == 5) {
                this.getStrategies();
            }
        }
    },
    mounted() {
        this.getStrategies();
    },
    updated() {
        //console.log(this.isSelect, "Selected");
    },
    methods: {
        gethours(beginDate, endDate) {
            var time = endDate - beginDate;
            return Math.floor(time / (60 * 1000)) + " Min";
        },
        getStrategies() {
            const _S = this;
            if (!this.$userinfo.uid) {
                this.loading = false;
                this.found = false;
                return;
            }
            this.$store.dispatch("strategysget", this.requestParameter).then((res) => {
                _S.loading = false;
                if (res.data) {
                    _S.requestParameter.totalitemcount = res.data.totalitemcount;
                    let data = res.data.pagedata;
                    _S.orderDetail = data.map((_y) => {
                        let selectedCurrency = _S.$store.state.symbleinfos.find((_x) => _x.id == _y.ctid);
                        _y.market = _y.strategyType != 3 ? selectedCurrency.descriptions : selectedCurrency.fcurrencyname;
                        _y.borrowmultiple = selectedCurrency.borrowmultiple
                        _y.fcurrencyname = selectedCurrency.fcurrencyname
                        _y.tcurrencyname = selectedCurrency.tcurrencyname
                        _y.state = _y.state == 1 ? true : false;
                        return _y;
                    });
                    if (data.length > 0) {
                        _S.found = true;
                    }
                    else {
                        _S.found = false;
                    }
                }
            }).catch((error) => {
                _S.loading = false;
            });
        },
        strategyChange(obj) {
            const state = obj.state ? 0 : 1;
            this.$store.dispatch("strategyupdatestate", { id: obj.id, state: state }).then((res) => {
                if (res.data) {
                    obj.state = obj.state ? false : true;
                }
            });
        },
        strategyDelete(obj) {
            if (!obj.state) {
                this.$store.dispatch("strategydelete", { id: obj.id }).then((res) => {
                    if (res.data) {
                        this.requestParameter.pageIndex = 1
                        this.getStrategies();
                    }
                });
            }
        },
        handChange(val) {
            this.requestParameter.pageIndex = val;
            this.getStrategies();
        },
        getUTCTime() {
            let d1 = new Date();
            let d2 = new Date(d1.getUTCFullYear(), d1.getUTCMonth(), d1.getUTCDate(), d1.getUTCHours(), d1.getUTCMinutes(), d1.getUTCSeconds());
            return Date.parse(d2);
        }
    },
    subscribe() {
        return {
            /*订阅最新价*/
            strategiesList(res) {
                //console.log("getStrategies: subscribed: strategy-table", res);
                this.getStrategies();
            }
        };
    },

}
</script>
