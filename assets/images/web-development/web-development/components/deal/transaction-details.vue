
<template>
    <!-- 合约成交明细 -->
    <div class="traded">
        <div class="traded-block">
            <div class="traded_table_content">
                <table class="hex_table">
                    <thead class="hex_table_header padding br">
                        <tr>
                            <th class="lt traded-table-w6">
                                <div>{{ $t('strtable.stab24') }} </div>
                            </th>
                            <th class="lt traded-table-w6">
                                <div>{{ $t('strtable.stab36') }}</div>
                            </th>
                            <th class="lt traded-table-w6">
                                <div>{{ $t('strtable.stab26') }}</div>
                            </th>
                            <th class="lt traded-table-w6">
                                <div>{{ $t('strtable.stab37') }}</div>
                            </th>
                            <th class="lt traded-table-w6">
                                <div>{{ $t('strtable.stab38') }}</div>
                            </th>
                            <th class="lt traded-table-w6">
                                <div>{{ $t('strtable.stab29') }}</div>
                            </th>
                        </tr>
                    </thead>
                    <tbody class="deal-tbody">
                        <tr class="hex_table_body padding" v-for="(coins, index) in orderDetail" :key="index">
                            <td class="lt">
                                {{ global_get_local_time(coins.updatetime).format('YYYY-MM-DD HH:mm:ss') }}
                            </td>
                            <td class="lt" :class="{ 'success': coins.direction == 1, 'fail': coins.direction == -1 }">
                                {{ global_get_contract_order_direction(coins.ordertype, coins.direction)}}·{{ global_get_tofixed(coins.multiple, 0)}}X
                            </td>
                            <td class="lt">
                                {{ global_get_uppercase(coins.symble).replace('/YX', $t('contract.swap')) }}
                            </td>
                            <td class="lt">
                                {{ global_get_tofixed(coins.transactionamount, getSymbInfo(coins.ctid).amountdigits) }}{{ getSymbInfo(coins.ctid).fcurrencyname }}
                            </td>
                            <td class="lt">
                              {{ global_get_tofixed(coins.tradeavgprice, getSymbInfo(coins.ctid).pricedigits) }}

                            </td>
                            <!-- real_fee大于0就取real_fee不然取real_Fee_USDT -->
                            <td class="lt" v-if="coins.real_fee > 0">
                                {{ global_get_tofixed(coins.real_fee, getSymbInfo(coins.ctid).amountdigits) }} {{ getSymbInfo(coins.ctid).fcurrencyname }}
                            </td>
                            <td class="lrt" v-else>
                                {{ global_get_tofixed(coins.real_fee_usdt, global_get_decimal(getSymbInfo(coins.ctid).fcurrencyname).p) }}USDT
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div class="anonymous" v-if="loading || !found">
                    <div class="loadingPic deal" v-hex-loading="loading" v-if="loading"></div>
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
                v-if="requestParameter.totalItemCount > 0">
                <a-pagination background @change="handChange" :page-size="requestParameter.pageSize"
                    :current="requestParameter.pageIndex" popper-class="paging" layout="prev, pager, next"
                    :total="requestParameter.totalItemCount">
                </a-pagination>
            </div>
        </div>
    </div>
</template>

<script>
import AppPagination from '@/components/AppPagination'
import AppNoData from '../App/AppNoData.vue';

export default {
    name: "StrategyTableDetail",
    props: ["isSelect", "changeState", "symbletype", "symbleinfo"],
    components: { AppPagination, AppNoData },
    data() {
        return {
            loading: false,
            requestParameter: {
                pageIndex: 1,
                pageSize: 10,
                orderstatus: '1,3,4',
                totalItemCount: 0,
            },
            found: true,
            orderDetail: [],
        };
    },
    watch: {
        "isSelect": function (val) {
            if (val.length > 0) {
                this.requestParameter.ctid = this.symbleinfo.id;
                this.getStrategiesDetail();
            }
            else {
                this.requestParameter.ctid = "";
                this.getStrategiesDetail();
            }
        },
        "changeState": function (val) {
            if (val == 6) {
                this.getStrategiesDetail();
            }
        }
    },
    mounted() {
        this.getStrategiesDetail();
    },

    methods: {
        getSymbInfo(ctid) {
            var symbleinfo = this.$store.state.symbleinfos.filter((citem) => {
                return citem.id == ctid;
            })[0];
            //('symbleinfo===', symbleinfo)
            return symbleinfo ? symbleinfo : {};
        },
        getStatus(status) {//状态：1，已开仓；2，开仓交易成功；3，开仓交易失败；4，已平仓；5，平仓交易成功；6，平仓交易失败
            if (status == 1) {
                return this.$t('returntxt.rtxt1');
            }
            else if (status == 2) {
                return this.$t('returntxt.rtxt2');
            }
            else if (status == 3) {
                return this.$t('returntxt.rtxt3');
            }
            else if (status == 4) {
                return this.$t('returntxt.rtxt4');
            }
            else if (status == 5) {
                return this.$t('returntxt.rtxt5');
            }
            else if (status == 6) {
                return this.$t('returntxt.rtxt6');
            }
            else {
                return "";
            }
        },
        getStrategiesDetail() {
            const _self = this;
            _self.orderDetail = []

            if (!_self.$userinfo.uid) {
                _self.loading = false
                _self.found = false
                return
            }

            _self.loading = true
            if (this.$route.query.contractType == 1) {
                this.requestParameter.contractType = 1
            }
            this.$store.dispatch('usercontract_order_search', this.requestParameter).then(({ data }) => {
                _self.loading = false
                console.log('data', data)
                if (data.pagedata) {
                    _self.requestParameter = {
                        pageIndex: data.currentpageindex,
                        pageSize: data.pagesize,
                        totalItemCount: data.totalitemcount,
                        totalPageCount: data.totalpagecount,
                        orderstatus: '1,3,4',
                    };
                    _self.orderDetail = data.pagedata;
                    console.log('self.orderDetail', _self.orderDetail)
                    if (data.pagedata.length > 0) {
                        _self.found = true;
                    }
                    else {
                        _self.found = false;
                    }
                }
            }).catch((error) => {

                _self.loading = false
                console.error('getStrategiesDetail: ', error)
            });

        },
        handChange(val) {
            this.requestParameter.pageIndex = val;
            this.getStrategiesDetail();

        },
        coinDecimal(coin) {
          return coin.split("/")[0].toLowerCase();
        }
    },

}
</script>

<style scoped lang="less">
@import "css/order-list";

.traded {
    .traded-table-w6 {
        width: calc(600/100%);
    }
}
</style>
