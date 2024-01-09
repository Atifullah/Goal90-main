
<template>
    <div class="traded">
        <div class="traded-block">
            <div class="traded_table_content">
                <table class="hex_table">
                    <thead class="hex_table_header padding br">
                        <tr>
                            <th class="lt">
                                <div>{{ $t('strtable.stab1') }} </div>
                            </th>
                            <th class="rt">
                                <div>{{ $t('strtable.stab12') }}</div>
                            </th>
                            <th class="rt">
                                <div>{{ $t('strtable.stab16') }}</div>
                            </th>
                            <th class="rt">
                                <div>{{ $t('strtable.stab13') }}</div>
                            </th>
                            <th class="rt">
                                <div>{{ $t('strtable.stab14') }}</div>
                            </th>
                            <th class="rt">
                                <div>{{ $t('strtable.stab15') }}</div>
                            </th>
                            <th class="rt">
                                <div>{{ $t('strtable.stab17') }}</div>
                            </th>
                            <th class="rt">
                                <div>{{ $t('strtable.stab19') }}</div>
                            </th>
                            <th class="rt">
                                <div>{{ $t('strtable.stab18') }}</div>
                            </th>
                            <th class="rt">
                                <div>{{ $t('strtable.stab20') }}</div>
                            </th>
                            <th class="rt">
                                <div>{{ $t('strtable.stab21') }}</div>
                            </th>
                            <th class="rt">
                                <div>{{ $t('strtable.stab22') }}</div>
                            </th>
                            <th class="rt">
                                <div>{{ $t('strtable.stab23') }}</div>
                            </th>
                        </tr>
                    </thead>
                    <tbody class="deal-tbody">
                        <tr class="hex_table_body padding" v-for="(coins, index) in orderDetail" :key="index">
                            <td class="lt">
                                {{ global_get_local_time(coins.createtime).format('YYYY-MM-DD HH:mm:ss') }}
                            </td>
                            <td class="rt">
                                {{ coins.strategyid }}
                            </td>
                            <td class="rt">
                                {{ coins.forderid }}
                            </td>
                            <td class="rt">
                                {{ global_get_tofixed_entrust(coins.fprice, 2) }}
                            </td>
                            <td class="rt">
                                {{ coins.famount }}
                            </td>
                            <td class="rt" :class="{ 'success': coins.direction == 1, 'fail': coins.direction == -1 }">
                                {{ coins.direction == 1 ? $t('deal.buy') : $t('deal.sell') }}
                            </td>
                            <!-- <td class="rt">
                                {{ coins.fcreatetime }}
                            </td> -->
                            <td class="rt">
                                {{ global_get_tofixed_entrust(coins.ftradeprice, 2) }}
                            </td>
                            <td class="rt">
                                {{ coins.torderid }}
                            </td>
                            <td class="rt">
                                {{ global_get_tofixed_entrust(coins.tprice, 2) }}
                            </td>
                            <td class="rt">
                                {{ global_get_tofixed_entrust(coins.ttradeprice, 2) }}
                            </td>
                            <!--<td class="rt">
                                {{ coins.tcreatetime }}
                            </td>-->
                            <td class="rt">
                                {{ coins.totalfee }}
                            </td>
                            <td class="rt">
                                {{ coins.ttradeprice > 0 ? global_get_tofixed_entrust(coins.totalprofile, 2) : 0 }}
                            </td>

                            <td class="rt repeal">
                                {{ getStatus(coins.status) }}
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
        getStrategiesDetail() {
            const _self = this;
            _self.orderDetail = []

            if (!_self.$userinfo.uid) {
                _self.loading = false
                _self.found = false
                return
            }

            _self.loading = true
            this.$store.dispatch("strategydetailbyidget", this.requestParameter).then((res) => {
                _self.loading = false
                if (res.data) {
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
