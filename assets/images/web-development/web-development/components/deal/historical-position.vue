
<template>
    <!-- 合约历史仓位 -->
    <div class="traded">
        <div class="traded-block">
            <div class="traded_table_content">
                <table class="hex_table">
                    <thead class="hex_table_header padding br">
                        <tr>
                            <th class="lt" style="width: 30vh;">
                                <div>{{ $t('contract.contractDeal') }} </div>
                            </th>
                            <th class="lt" style="width: 30vh;">
                                <div>{{ $t('strtable.stab17') }}</div>
                            </th>
                            <th class="lt" style="width: 20vh;">
                                <div>{{ $t('strtable.stab30') }}</div>
                            </th>
                            <th class="lt" style="width: 20vh;">
                                <div>{{ $t('strtable.stab31') }}</div>
                            </th>
                            <th class="lt" style="width: 20vh;">
                                <div>{{ $t('strtable.stab32') }}</div>
                            </th>
                            <th class="lt" style="width: 20vh;">
                                <div>{{ $t('strtable.stab33') }}</div>
                            </th>
                            <th class="lt" style="width: 20vh;">
                                <div>{{ $t('strtable.stab34') }}</div>
                            </th>
                            <th class="rt" style="width: 30vh;">
                                <div>{{ $t('strtable.stab35') }}</div>
                            </th>
                        </tr>
                    </thead>
                    <tbody class="deal-tbody">
                        <tr class="hex_table_body padding" v-for="(coins, index) in orderDetail" :key="index">
                            <td class="lt">
                                {{ getSymbInfo(coins.ctid).descriptions.replace('/YX', $t('contract.swap')) }}·{{ coins.direction == -1 ?
                                    $t('contract.none') : $t('contract.more')}}·{{ global_get_tofixed(coins.multiple, 0)}}X
                            </td>
                            <td class="lt">
                                {{ global_get_local_time(coins.opentime).format('YYYY-MM-DD HH:mm:ss') }}
                            </td>
                            <td class="lt">
                                {{ global_get_tofixed_entrust(coins.openavgprice, getSymbInfo(coins.ctid).pricedigits) }}
                            </td>
                            <td class="lt">
                                {{ global_get_tofixed_entrust(coins.closeprice, getSymbInfo(coins.ctid).pricedigits) }}
                            </td>
                            <td class="lt">
                                {{ global_get_tofixed_entrust(coins.closeamount, getSymbInfo(coins.ctid).amountdigits) }}
                            </td>
                            <td class="lt">
                                {{ global_get_tofixed_entrust(coins.closeprice * coins.closeamount, global_get_decimal(getSymbInfo(coins.ctid).fcurrencyname).p) }}
                            </td>
                            <td class="lt" :style="{'color': coins.profitamount_usdt > 0 ?'#00c076':'#f54252'}">
                                {{ global_get_tofixed_entrust(coins.profitamount_usdt, global_get_decimal(getSymbInfo(coins.ctid).fcurrencyname).p) }}
                            </td>
                            <td class="rt">
                                {{ global_get_local_time(coins.closetime).format('YYYY-MM-DD HH:mm:ss') }}
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
        getSymbInfo(ctid) {
            var symbleinfo = this.$store.state.symbleinfos.filter((citem) => {
                return citem.id == ctid;
            })[0];
            return symbleinfo ? symbleinfo : {};
        },
        getStrategiesDetail() {
            const _self = this;
            _self.orderDetail = []

            if (!_self.$userinfo.uid) {
                _self.loading = false
                _self.found = false
                return
            }


            if (this.$route.query.contractType == 1) {
                this.requestParameter.contractType = 1
            }

            _self.loading = true
            this.$store.dispatch("get_getfundrates_infos", this.requestParameter).then((res) => {
                _self.loading = false
                if (res.data) {
                    console.log('历史仓位', res)
                    const data = res.data;
                    _self.requestParameter = {
                        pageIndex: data.currentpageindex,
                        pageSize: data.pagesize,
                        totalItemCount: data.totalitemcount,
                        totalPageCount: data.totalpagecount,
                    };
                    _self.orderDetail = data.pagedata;
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

        }
    },

}
</script>

<style scoped lang="less">
@import "css/order-list";
</style>
