<template>
    <div class="traded">
        <div class="traded-block">
            <div class="shadow-card pt-4 px-4 pb-4">
                <a-row :gutter="16">
                    <a-col :lg="4">
                        <hex-select ref="market" :type="$i18n.t('patch.Market')" :order="market" :market="markettext"
                            @searchData="searchData" @change="change" :frenchcurrency="'frenchcurrency'"
                            @clearCurrentState="clearCurrentState" />
                    </a-col>
                    <a-col :lg="4">
                        <hex-select ref="dirction" :type="'Type'" :order="direction" :market="directiontext"
                            @searchData="searchData" @change="change" @clearCurrentState="clearCurrentState" />
                    </a-col>
                    <a-col :lg="4" v-if="!closed">
                        <hex-select ref="orderstatus" :type="$i18n.t('patch.Status')" :order="orderstatusselect"
                            :market="orderstatusselecttext" @searchData="searchData" @change="change"
                            @clearCurrentState="clearCurrentState" />
                    </a-col>
                    <a-col :lg="6">
                        <a-range-picker @change="changeDate" v-model="calender" />
                    </a-col>
                    <a-col :lg="4" :xl="3" class="some-code-btn-space">
                        <span @mouseover="hoverKey = 2" @mouseleave="hoverKey = -1">
                            <a-button block class="outline-btn fw-5 px-2" @click="resetSelect">   
                                   <svg width="15" height="15" class="svg-icon mr-2 refresh-icon" >
                                        <use :xlink:href="hoverKey == 2 ? '/images/svg/sprite.svg#refresh-white-icon':'/images/svg/sprite.svg#refresh-icon-icon'"></use>
                                        </svg>{{ $t('memberCenter.reset')
                                    }}</a-button>
                        </span>
                    </a-col>
                </a-row>
            </div>
            <div class="main-currency-card">

            <div class="currency-detail px-4 pt-2">
                <a-row :gutter="16" class="px-3">
                    <a-col :lg="3">
                        <p class="type-coin-txt fw-4">{{ $t('legal.lgl1') }}</p>
                    </a-col>
                    <a-col :lg="4">
                        <p class="type-coin-txt fw-4">{{ $t('legal.lgl2') }}</p>
                    </a-col>
                    <a-col :lg="3">
                        <p class="type-coin-txt fw-4">{{ $t('legal.lgl3') }}</p>
                    </a-col>
                    <a-col :lg="3">
                        <p class="type-coin-txt fw-4">{{ $t('legal.lgl4') }}</p>
                    </a-col>
                    <a-col :lg="4">
                        <p class="type-coin-txt fw-4">{{ $t('legal.lgl5') }}</p>
                    </a-col>
                    <a-col :lg="4">
                        <p class="type-coin-txt fw-4">{{ $t('legal.lgl6') }}</p>
                    </a-col>
                    <a-col :lg="3" align="end">
                        <p class="type-coin-txt fw-4">{{ $t('legal.lgl7') }}</p>
                    </a-col>
                </a-row>
                <a-card v-for="(item, index) in orderDetail" :key=index :bordered="false" class="currency-detail-card"
                    :class="index == 0 ? 'first-card' : ''">
                    <a-row class="px-3 curency-detail-bg">
                        <a-col :lg="18">
                            <p class="mb-0 currency-txt fw-5">
                                <span :class="item.direction == 1 ? 'buy-txt' : 'sell-txt'">{{ item.direction == 1 ? 'Buy' :
                                    'Sell'
                                }}</span>
                                <a-divider type="vertical" class="mx-2" />{{ global_get_local_time(item.createtime).format('YYYY-MM-DD hh:mm a') }}<a-divider
                                    type="vertical" class="mx-2" /><span class="mb-0 copy-link-txt fw-5"><span
                                        :id="`keycopy${index}`">{{ item.id }}</span>
                                        <AppClipboard :target="`#keycopy${index}`" element-class="link-url1" />

                                        <!-- <span class="link-url ml-1 pointer"
                                        :data-clipboard-target="`#keycopy${index}`" @click="copy('link-url')"><img
                                            src="/images/copy-icon.svg" class="pl-2 mb-1"
                                            height="15px" /></span> -->
                                        </span>
                            </p>

                        </a-col>
                        <a-col :lg="6" align="end" v-if="!closed">
                            <template v-if="changingOnlineStatusIndex != index">
                                <img class="pointer mr-2" title="UnPublish" v-if="item.orderstatus == 0"
                                    src="/images/download-p2p.svg" @click="changeOnlineStatus(item, index)" />
                                <img class="pointer mr-2" title="Publish" v-else src="/images/upload1.svg"
                                    @click="changeOnlineStatus(item, index)" />
                            </template>

                            <div style="display: inline-block;" class="mx-2" v-if="changingOnlineStatusIndex == index">
                                <AppLoading height="16px" iconSize="12px" />
                            </div>
                            <img class="pointer mr-2" title="Edit" src="/images/edit.svg"
                                @click="editAdv('edit', item)" />
                            <img class="pointer mr-2" title="Duplicate" src="/images/copy1.svg"
                                @click="editAdv('duplicate', item)" />
                            <span class="tooltip-text mr-1"><img title="Cancel" class="pointer"
                                    src="/images/red-cross1.svg" @click="soldOut(item.id)" /></span>
                            <img class="pointer" title="Sharing" src="/images/sharing.svg"
                                @click="adSharingItem = item; adSharing = true" />
                        </a-col>
                    </a-row>
                    <a-row :gutter="16" class="px-3 py-4 col-alignment">
                        <a-col :lg="3">
                            <p class="col-alignment currency-txt fw-5 usdt-txt mb-0"><img :src="getCurrencyIcon(item)" width="20"
                                    height="20" class="mr-2" />{{ item.currencyname }}</p>
                        </a-col>
                        <a-col :lg="4">
                            <p class="currency-txt fw-5 usdt-txt mb-0">
                                {{ (item.enableamount * (item.price > 0 ? item.price : item.limitprice)).toFixed(2) }}
                                {{ item.legaltype }}
                            </p>
                        </a-col>
                        <a-col :lg="3">
                            <p class="currency-txt fw-5 usdt-txt red-active mb-0">{{
                                item.price > 0 ? item.price.toFixed(2) : item.limitprice.toFixed(2) }}</p>
                        </a-col>
                        <a-col :lg="3">
                            <p class="currency-txt fw-5 usdt-txt mb-0 pointer">{{
                                global_get_tofixed(item.enableamount, global_get_decimal(item.currencyname).a) }} {{
        item.currencyname }}</p>
                        </a-col>
                        <a-col :lg="4">
                            <p class="currency-txt fw-5 usdt-txt mb-0">{{ item.minprice }}-{{ item.maxprice }} {{ item.legaltype
                            }}</p>
                        </a-col>
                        <a-col :lg="4">
                            <span class="pr-2" v-for="(method, methodIndex) in item.payconfiglist" :key="methodIndex"><a-tag
                                    class="bank-transfer-tag fw-4"
                                    :style="{ color: method.bgcolor, background: method.bgcolor + '17' }"><span>{{
                                        method.name }}</span></a-tag></span>
                        </a-col>
                        <a-col :lg="3" align="end" v-if="!closed">
                            <a-button class="fw-5" :class="item.orderstatus > 0 ? 'unpublish-btn' : 'publish-btn'"
                                :loading="item.loading">{{ item.orderstatus == 0 ? 'Published' : item.orderstatus == 1 ?
                                    'Unpublished' : 'Closed' }}</a-button>
                        </a-col>
                        <a-col :lg="3" align="end" v-else><a-button class="unpublish-btn fw-5">{{ $t('legal.lgl8')
                        }}</a-button></a-col>
                    </a-row>
                </a-card>
                <NoData v-if="orderDetail.length < 1" :loading="loading"/>
                <a-row class="pl-4 pt-3 pb-3">
                    <a-col align="end">
                        <div class="text-right" v-if="total > 0">
                            <a-pagination background @change="handChange" :page-size="serachOrder.pagesize"
                                :current="serachOrder.pageindex" popper-class="paging" layout="prev, pager, next"
                                :total="total">
                            </a-pagination>
                        </div>
                    </a-col>
                </a-row>
            </div>
</div>
            <!--取消订单-->
            <hex-delete v-show="dialogVisible" @closePopup="deletePopupState" @deleteAddress="soldOutRequest"
                title="Are You Sure?" subTitle="You Want to Delete the Adv" ref="popname" />

        </div>
        <AdSharing v-if="adSharing" :adSharing="adSharing" :item="adSharingItem" :counterParty="counterParty"
            :close="close" />
    </div>
</template>
<script>
import AppClipboard from '~/components/App/AppClipboard.vue';

import more from '@/components/public/more';
import select from '@/components/security/deal_select';
import deleteOrder from '@/components/security/popup-only-google';
import Clipboard from 'clipboard';
import NoData from '~/components/public/NoData';
import AdSharing from '@/components/p2p/Modals/AdSharing.vue'
import AppLoading from '../AppLoading.vue';
export default {
    name: 'articles',
    components: {
        'hex-more': more,
        "hex-select": select,
        "hex-delete": deleteOrder,
        NoData,
        AdSharing,
        AppLoading,
        AppClipboard 
    },
    props: {
        closed: {
            type: Boolean,
        }
    },
    computed: {
        orderstatusselect: function () {
            return [
                {
                    id: [0],
                    value: this.$t('values.val1'),//未成交
                    type: 'orderstatus'
                },
                {
                    id: [1],
                    value: this.$t('values.val2'),//未成交
                    type: 'orderstatus'
                }
            ]
        },
        direction: function () {
            return [
                {//方向
                    id: 1,
                    value: this.$t('memberCenter.buy'),//买入
                    type: 'direction'
                }, {
                    id: -1,
                    value: this.$t('memberCenter.sell'),//卖出
                    type: 'direction'
                }]
        }
    },
    data() {
        return {
            loading: true,
            adSharing: false,
            changingOnlineStatusIndex: -1,

            adSharingItem: {},
            counterParty: {},
            hoverKey: -1,
            soldOutId: '',//下架id
            dialogVisible: false,//弹窗状态
            popupstate: false,
            orderState: true,
            searchParam: {},
            serachOrder: {
                pagesize: 5,
                pageindex: 1,
                type: 1,
                touserid: 0,
            },
            directiontext: "direction",
            markettext: "c2ccurrecy",
            orderstatusselecttext: "orderstatus",
            orderDetail: [],
            market: [],
            calender: [],
            total: 0,
            found: false,
            soldoutloading: false
        }
    },
    mounted() {
        this.serachOrder.touserid = this.$userinfo.uid;
        this.getCounterPartyInfo();
    },
    methods: {
        close() {
            this.adSharing = false
        },

        async getCounterPartyInfo() {
            const _self = this;
            try {
                const { data } = await _self.$store.dispatch('trading_statistics_p2p', {
                    toUid: this.$userinfo.uid
                });
                if (data) {
                    _self.counterParty = data;
                }
                _self.loading = false;
            } catch (error) {
                //console.log('Error', error);
            }
        },


        c2cDecimal(val) {
            let digits = 2;
            switch (val) {
                case 'btc':
                    digits = 6;
                    break;
                case 'eth':
                    digits = 4;
                    break;
            }
            return digits;
        },
        getprice(item) {
            let qua = this.$store.getters.get_exchange_rate_by_name(item.currencyname, item.legaltype)
            qua = parseFloat(qua) + parseFloat(this.$np.times(qua, item.premium))
            let price = item.limitprice
            /*买单最高限价，卖单最低限价*/
            if (item.direction == 1) {
                if (qua < parseFloat(price)) {
                    price = qua
                }
            } else {
                if (qua >= parseFloat(price)) {
                    price = qua
                }
            }
            return this.global_get_tofixed(price, this.global_get_decimal(item.symble).p)
        },
        handChange(val) {
            this.getUserDeal(false, val);
        },
        deletePopupState() {
            this.dialogVisible = !this.dialogVisible;
        },
        change(val) {
            const _self = this;
            switch (val) {
                case 'direction':
                    _self.$refs.market.changeBack();
                    _self.$refs.orderstatus.changeBack();
                    break;
                case 'symble':
                    _self.$refs.dirction.changeBack();
                    _self.$refs.orderstatus.changeBack();
                    break;
                case 'orderstatus':
                    _self.$refs.dirction.changeBack();
                    _self.$refs.market.changeBack();
                    break;
            }
        },
        getCurrencyIcon(item) {
            const icon = this.$store.state.currencyinfos.filter(_i => _i.currencyname == item.currencyname)[0].icon;
            return icon;
        },
        popup() {
            this.popupstate = !this.popupstate;
        },
        soldOut(id) {
            this.dialogVisible = true;
            this.soldOutId = id;
            this.$refs.popname.ShowPopup(id, 'deleteAddress');
        },
        editAdv(action, val) {
            this.$router.push({ path: '/p2p/post-new-add', query: { action: action, item: val, id: val.id } });
        },
        soldOutRequest() {//订单下架
            if (this.soldoutloading) {
                return
            }
            this.soldoutloading = true
            this.$store.dispatch('trading_c2c_goods_close', { orderids: [this.soldOutId] })
                .then((res) => {
                    if (res.code == '200') {
                        let fliterData = [];
                        this.orderDetail.forEach((item) => {
                            if (item.id != this.soldOutId) {
                                fliterData.push(item);
                            }
                        });
                        this.orderDetail = fliterData;
                        this.total = fliterData.length;
                        this.$store.commit('set_message', { type: 'ok', text: res.msg });
                    }
                    this.dialogVisible = false
                    this.soldoutloading = false
                    this.soldOutId = '';
                })
        },
        changeOnlineStatus(val, index) {//订单下架
            if (this.soldoutloading) {
                return
            }
            this.changingOnlineStatusIndex = index
            this.soldoutloading = true;
            const address = val.orderstatus == 0 ? 'trading_c2c_goods_offline' : 'trading_c2c_goods_online'
            this.$store.dispatch(address, { orderids: [val.id] })
                .then((res) => {
                    this.changingOnlineStatusIndex = -1
                    if (res.code == '200') {
                        this.changingOnlineStatusIndex = -1
                        this.getUserDeal(true, this.serachOrder.pageindex);
                        this.$store.commit('set_message', { type: 'ok', text: res.msg });
                    }
                    this.soldoutloading = false
                }).catch((e) => {
                    this.changingOnlineStatusIndex = -1
                })
        },
        clearCurrentState(id) {
            this.searchParam[id] = {};
        },
        resetSelect() {
            this.$refs.dirction.clearStatus();
            this.$refs.market.clearStatus();
            this.$refs.orderstatus?.clearStatus();
            this.searchParam = {};
            this.calender = [];
            this.getUserDeal(true);
        },
        changeDate(date, dateString) {
            this.searchParam['startTime'] = dateString[0];
            this.searchParam['endTime'] = dateString[1];
            this.getUserDeal(false);
        },
        searchData(val) {//用于存子组件传过来数据
            // this.serachOrder.currencyname = val.currencyname;
            this.searchParam[val.type] = val.id;
            this.getUserDeal(false);
        },
        getAllPrice(coins) {
            const p = coins.tradeavgprice * coins.transactionamount;
            if (!p) return p.toFixed(2)
            return p.toFixed(8)
        },
        // 过去用户交易记录
        getUserDeal(val, pageIndex) {

            if (!this.searchParam.orderstatus) {
                this.searchParam.orderstatus = [0, 1]
            }
            if (this.closed) {
                this.searchParam.orderstatus = [2, 3, 4]
            }
            this.serachOrder.pageindex = pageIndex ? pageIndex : 1;
            var postData = Object.assign(this.searchParam, this.serachOrder);
            this.$store.dispatch('trading_c2c_market_pagedlist', postData).then(({ data }) => {
                if (data && data.pagedata.length > 0) {
                    this.total = data.totalitemcount;
                    this.orderDetail = data.pagedata;
                    this.found = false;
                } else {
                    this.total = 0;
                    this.found = true;
                    this.orderDetail = [];
                }
                this.loading = false;
            })
        }
    }
}
</script>

<style lang='less' scoped>
@import "../../static/styles/color";
@import "../../static/styles/person";
@import "../../static/styles/table";

.traded_tip {
    font-size: 18px;
    font-weight: bold;
    margin-right: 10px;
}

.traded_info {
    font-size: 14px;
}

.traded_info .btc {
    color: #00C076;
    font-size: 30px;
    font-weight: bold;
    margin-right: 5px;
}

.traded_info .cny {
    color: #ffb11a;
    font-size: 30px;
    font-weight: bold;
    margin-right: 5px;
}

.traded_info .br {
    margin: 0 20px;
    border-right: 1px solid @cl_858;
    display: inline-block;
    height: 20px;
}

.traded_info_title {}

.traded_info_num {
    padding: 4px 0;
}

.traded_info_address_button {
    color: #ffb11a;
    margin-top: 16px;
}

.traded-block {
    background-color: #ffffff;
}

.traded-block-title {
    padding: 18px 20px 8px 20px;
}

.traded-block-title .title_tip {
    font-size: 16px;
    font-weight: bold;
}

.traded-block-search {
    margin-right: 10px;
    font-size: 14px;
    width: 130px;
    display: inline-table;
    border-collapse: separate;
}

.traded-block-search input {
    height: 30px;
    line-height: 30px;
    border: 1px solid #DDDDDD;
    display: table-cell;
    width: 100%;
    padding: 5px 10px;
}

.traded-block-search .search-tip {
    display: table-cell;
    width: 60px;
    background-color: #ffb11a;
    color: #ffffff;
    border: 1px solid #ffb11a;
    text-align: center;
}

.traded-block-search .search-tip::placeholder {
    color: $cl_bbb;
}

.traded-block-search_button {
    display: inline-block;
    height: 30px;
    line-height: 30px;
    text-align: center;
    color: #ffffff;
    background-color: #ffb11a;
    font-size: 14px;
    width: 60px;
    cursor: pointer;
}

.traded-block-reset_button {
    display: inline-block;
    height: 30px;
    line-height: 30px;
    text-align: center;
    color: #ffb11a;
    font-size: 14px;
    width: 60px;
    margin-left: 10px;
    cursor: pointer;

}

.traded .person-block_info {
    line-height: 36px;
}

.person-block {
    padding: 18px 20px 16px 20px;
}

.traded-block .search-market {
    margin: 14px 0 10px 20px;
}

.ordertab {
    padding: 10px 20px;
}

.ordertab span {
    font-size: 14px;
    padding-bottom: 3px;

}

.ordertab span.entrust {
    margin-right: 20px;
}

.ordertab span.cur {
    color: #ffb11a;
    border-bottom: 2px solid #ffb11a;
}

td.repeal {
    color: #14a2a5;
    cursor: pointer;
}

.hex_table_body {
    line-height: 32px;
}

.hex_table_body td {
    padding: 10px 7px;
}

.hex_table_header th {
    padding: 0 7px;
}

.hex_table td.fw {
    padding-left: 20px;
}

.hex_table td.orderdetail {
    width: 257px;
}

.orderType>span {
    display: block;
    font-size: 14px;
}

.orderType .type {
    width: 36px;
    height: 20px;
    text-align: center;
    color: white;
    line-height: 20px;
    border-radius: 3px;
}

.orderType .type.sell {
    background: rgba(3, 191, 123, 1);
}

.orderType .type.buy {
    background: rgba(233, 108, 66, 1);
}

.orderType .coinNane {
    font-size: 18px;
    color: rgba(33, 40, 62, 1);
}

table tbody,
table tbody tr {
    border-top: 1px solid rgba(133, 131, 172, .2);
}

.hex_table .hex_table_body td .dealType span {
    margin-right: 10px;
}

td .dealType img {
    width: 18px;
    margin-right: 10px;
}

.soldOut {
    cursor: pointer;
    color: #14a2a5;
}

.hex_table_body td.lt .gray {
    color: rgba(153, 153, 153, 1);
}
</style>
