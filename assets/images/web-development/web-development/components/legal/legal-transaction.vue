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
                        <hex-select ref="dirction" :type="$i18n.t('patch.Side')" :order="direction" :market="directiontext"
                            @searchData="searchData" @change="change" @clearCurrentState="clearCurrentState" />
                    </a-col>
                    <a-col :lg="4">
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
                                        </svg>
                            {{ $t('memberCenter.reset')
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
                        <p class="type-coin-txt fw-4">{{ $t('legal.lgl9') }}</p>
                    </a-col>
                    <a-col :lg="4">
                        <p class="type-coin-txt fw-4">{{ $t('legal.lgl7') }}</p>
                    </a-col>
                    <a-col :lg="3" align="end">
                        <p class="type-coin-txt fw-4">{{ $t('legal.lgl10') }}</p>
                    </a-col>
                </a-row>
                <a-card v-for="(item, index) in orderDetail" :key=index :bordered="false" class="currency-detail-card"
                    :class="index == 0 ? 'first-card' : ''">
                    <a-row class="px-3 curency-detail-bg">
                        <a-col :lg="14">
                            <p class="mb-0 currency-txt fw-5"><span :class="item.direction == 1 ? 'buy-txt' : 'sell-txt'">{{
                                item.direction == 1 ? 'Buy' : 'Sell' }}</span><a-divider type="vertical"
                                    class="mx-2" />{{ global_get_local_time(item.createtime).format('YYYY-MM-DD hh:mm a') }}</p>
                        </a-col>
                        <a-col :lg="10" align="end">
                            <p class="mb-0 copy-link-txt fw-5"><span :id="`keycopy${index}`">{{ item.id }}</span>
                                <AppClipboard :target="`#keycopy${index}`" element-class="link-url1" />

                            </p>
                        </a-col>
                    </a-row>
                    <a-row :gutter="16" class="px-3 py-4 col-alignment">
                        <a-col :lg="3">
                            <p class="col-alignment currency-txt fw-5 usdt-txt mb-0"><img :src="getCurrencyIcon(item)" width="20"
                                    height="20" class="mr-2" />{{ item.currencyname }}</p>
                        </a-col>
                        <a-col :lg="4">
                            <p class="currency-txt fw-5 usdt-txt mb-0">{{ (item.amount * item.price).toFixed(2) }} {{
                                item.legaltype }}</p>
                        </a-col>
                        <a-col :lg="3">
                            <p class="currency-txt fw-5 usdt-txt red-active mb-0">{{ item.price.toFixed(2) }}</p>
                        </a-col>
                        <a-col :lg="3">
                            <p class="currency-txt fw-5 usdt-txt mb-0 pointer">{{ item.amount }} {{ item.currencyname }}</p>
                        </a-col>
                        <a-col :lg="4">
                            <p class="currency-txt fw-5 usdt-txt mb-0 pointer" @click="goCounterParty(item)"><u>{{ item.nikename
                            }}</u></p>
                        </a-col>
                        <a-col :lg="4">
                            <p class="currency-txt fw-5 usdt-txt mb-0">
                                <span v-if="item.orderstatus == 0" class="yellow-active">
                                    {{ $t('c2c.buyers') }}
                                </span>
                                <span v-else-if="item.orderstatus == 4" class="yellow-active">
                                    {{ $t('c2c.seller') }}
                                </span>
                                <span v-else-if="item.orderstatus == 1 || item.orderstatus == 5 || item.orderstatus == 7" class="success-active">
                                    {{ $t('legalDeal.completed') }}
                                </span>
                                <span v-else-if="item.orderstatus == 2 || item.orderstatus == 3" class="red-active">
                                    {{ $t('c2c.Cancelled') }}
                                </span>
                                <span v-else-if="item.orderstatus == 6" class="yellow-active">
                                    {{ $t('c2c.Appealing') }}
                                </span>
                            </p>
                        </a-col>
                        <a-col :lg="3" align="end">
                            <span class="deposit-table-txt fw-5 mr-2 pointer" @click="gotrade(item)">{{ $t('legal.lgl11') }}</span>
                        </a-col>
                    </a-row>
                </a-card>
                <NoData v-if="orderDetail.length<1" :loading="loading"/>
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
            <hex-delete v-show="popupstate" ref="popname" @closePopup="popup" @deleteAddress="repeal" />
        </div>
    </div>
</template>
<script>
import AppClipboard from '~/components/App/AppClipboard.vue';

import more from '@/components/public/more'
import select from '@/components/security/deal_select'
import deleteOrder from '@/components/security/popup-only-google'
import Clipboard from 'clipboard';
import NoData from '~/components/public/NoData';

export default {
    name: 'articles',
    components: {
        'hex-more': more,
        "hex-select": select,
        "hex-delete": deleteOrder,
        NoData,
        AppClipboard
    },
    computed: {
        // 未付款： 0
        // 已付款：4
        // 已完成：1、5
        // 已取消：2、3
        // 申诉：6
        orderstatusselect: function () {
            return [
                // {
                //     id: [0],
                //     value: this.$t('legalDeal.Unpaid'),//未付款
                //     type: 'orderstatus'
                // },
                // {
                //     id: [4],
                //     value: this.$t('legalDeal.Paid'),//已付款
                //     type: 'orderstatus'
                // },
                {
                    id: [1, 5],
                    value: this.$t('legalDeal.Complete'),//已完成
                    type: 'orderstatus'
                },
                {
                    id: [2, 3],
                    value: this.$t('legalDeal.Cancelled'),//已取消
                    type: 'orderstatus'
                },
                // {
                //     id: [6],
                //     value: this.$t('legalDeal.Complaint'),//申诉
                //     type: 'orderstatus'
                // },
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
            hoverKey: -1,
            popupstate: false,
            orderState: true,
            serachOrder: {
                pagesize: 5,
                pageindex: 1,
            },
            searchParam: {},
            directiontext: "direction",
            ordertypetext: "ordertype",
            markettext: "c2ccurrecy",
            orderstatusselecttext: "orderstatus",
            orderDetail: [],
            market: [],
            calender: [],
            total: 0,
            found: false,
            /*state*/
            activeorder: '',
            confirmorderbuystate: false,
            affirmbuyloading: false,
            confirmordersellstate: false,
            affirmsellloading: false,
            userappealstate: false,
            userappealloading: false,
            usercancelstate: false,
            usercancelloading: false
        }
    },
    mounted() {
        this.resetSelect();
    },
    methods: {
        c2cDecimal(val) {
            let digits;
            switch (val) {
                case 'btc':
                    digits = 6;
                    break;
                case 'eth':
                    digits = 4;
                    break;
                case 'usdt':
                    digits = 2;
                    break;
                case 'cnyt':
                    digits = 2;
                    break;
            }
            return digits;
        },
        gotrade(order) {
            this.$router.push({ path: 'orders-history/' + order.id })
        },
        goCounterParty(item) {
            var userid = item.userid == this.$userinfo.uid ? item.orderuserid : item.userid
            this.$router.push({
                path: '/p2p/counter-party', query: {
                    userid: userid,
                    advid: item.orderid
                }
            })
        },
        /*买家确认支付*/
        paybuyaffirm(item) {
            this.confirmorderbuystate = true
            this.activeorder = item
        },
        paysellaffirm(item) {
            this.confirmordersellstate = true
            this.activeorder = item
        },
        /*用户订单申诉*/
        changeappealstate(item) {
            this.userappealstate = true
            this.activeorder = item
        },
        /*取消订单*/
        changeusercancel(item) {
            this.usercancelstate = true
            this.activeorder = item
        },
        getCurrencyIcon(item) {
            const icon = this.$store.state.currencyinfos.filter(_i => _i.currencyname == item.currencyname)[0].icon;
            return icon;
        },
        /*买家确认支付*/
        confirmreceipt() {
            if (this.affirmbuyloading) {
                return
            }
            this.affirmbuyloading = true
            this.$store.dispatch('trading_c2c_order_comfirmpay', { ordercompleteid: this.activeorder.id })
                .then((res) => {
                    if (res.code == '200') {
                        this.getorderdetail(4).then((data) => {
                            this.$store.commit('set_message', { type: 'ok', text: this.$t('c2c.Confirmed') })
                            this.affirmbuyloading = false
                            this.confirmorderbuystate = false
                        })
                    } else {
                        this.affirmbuyloading = false
                    }
                })
        },
        /*卖家确认收款*/
        confirmreceiptsell() {
            if (this.affirmsellloading) {
                return
            }
            this.affirmsellloading = true
            this.$store.dispatch('trading_c2c_order_receivables', { ordercompleteid: this.activeorder.id })
                .then((res) => {
                    if (res.code == '200') {
                        this.getorderdetail(1).then((data) => {
                            this.$store.commit('set_message', { type: 'ok', text: this.$t('c2c.ConfirmedR') })
                            this.affirmsellloading = false
                            this.confirmordersellstate = false
                        })
                    } else {
                        this.affirmsellloading = false
                    }
                })
        },
        /*用户取消订单*/
        usercancel() {
            if (this.usercancelloading) {
                return
            }
            this.usercancelloading = true
            this.$store.dispatch('trading_c2c_order_cancel', { ordercompleteid: this.activeorder.id })
                .then((res) => {
                    if (res.code == '200') {
                        this.getorderdetail(2).then((data) => {
                            this.usercancelstate = false
                            this.usercancelloading = false
                            this.$store.commit('set_message', { type: 'ok', text: this.$t('c2c.Successfully') })
                        })
                    } else {
                        this.usercancelloading = false
                    }
                })
        },

        /*订单申诉*/
        userappeal() {
            if (this.userappealloading) {
                return
            }
            this.userappealloading = true
            this.$store.dispatch('trading_c2c_order_appeal', { ordercompleteid: this.activeorder.id })
                .then((res) => {
                    if (res.code == '200') {
                        this.getorderdetail(6).then((data) => {
                            this.userappealstate = false
                            this.userappealloading = false
                            this.$store.commit('set_message', { type: 'ok', text: this.$t('c2c.Submitted') })
                        })
                    } else {
                        this.userappealloading = false
                    }
                })
        },
        /*获取订单*/
        getorderdetail(state) {
            const _self = this
            im.logininfo.identifier = _self.$userinfo.uid
            im.friendid = _self.activeorder.type < 0 ? _self.activeorder.userid : _self.activeorder.orderuserid
            /*登录im 并 发送 创建成功订单消息*/
            this.getUserDeal(false, this.serachOrder.pageindex)
        },
        handChange(val) {
            this.getUserDeal(false, val);
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
        upPop(val) {
            this.popupstate = !this.popupstate;
            this.$refs.popname.ShowPopup(val, 'repeal');
        },
        popup() {
            this.popupstate = !this.popupstate;
        },
        repeal(id) {//订单撤销
            this.$store.dispatch('trading_order_cancel', { orderId: id }).then((res) => {
                if (res.data) {
                    let fliterData = [];
                    this.orderDetail.forEach((item) => {
                        if (item.id != id) {
                            fliterData.push(item);
                        }
                    });
                    this.popupstate = !this.popupstate;
                    this.orderDetail = fliterData;
                    this.$store.commit('set_message', { type: 'ok', text: res.msg })
                    this.$pubsub.publish(this.$pubsub.getOrderList)
                }
            })
        },
        clearCurrentState(id) {
            this.searchParam[id] = {};
        },
        resetSelect() {
            this.$refs.dirction.clearStatus();
            this.$refs.market.clearStatus();
            this.$refs.orderstatus.clearStatus();
            this.searchParam = {};
            this.calender = [];
            this.getUserDeal();
        },
        searchData(val) {//用于存子组件传过来数据
            this.searchParam[val.type] = val.id;
            this.getUserDeal();
        },
        changeDate(date, dateString) {
            this.searchParam['startTime'] = dateString[0];
            this.searchParam['endTime'] = dateString[1];
            this.getUserDeal();
        },
        // 过去用户交易记录
        getUserDeal(val, pageIndex) {
            this.$refs.dirction.changeBack();
            this.$refs.market.changeBack();
            this.$refs.orderstatus.changeBack();
            let serachOrder = this.serachOrder;
            this.orderState = true;
            const _params = this.searchParam;
            val || !pageIndex ? serachOrder.pageindex = 1 : serachOrder.pageindex = pageIndex;
            let symbles, direction, orderstatus;
            _params.direction == undefined ? direction = [] : direction = Object.getOwnPropertyNames(_params.direction);
            _params.symble == undefined ? symbles = [] : symbles = Object.getOwnPropertyNames(_params.symble);
            _params.orderstatus == undefined ? orderstatus = [] : orderstatus = Object.getOwnPropertyNames(_params.orderstatus);
            if (direction.length > 0) {
                serachOrder[_params.direction.type] = _params.direction.id;
            } else {
                delete serachOrder.direction;
            }
            if (symbles.length > 0) {
                serachOrder['currencyname'] = _params.symble.value;
            } else {
                delete serachOrder.currencyname;
            }
            if (orderstatus.length > 0) {
                serachOrder[_params.orderstatus.type] = _params.orderstatus.id;
            } else {
                // delete serachOrder.orderstatus;
                _params.orderstatus=[1,2,3,5,7]
            }
            var postData = Object.assign(this.searchParam, serachOrder);
            this.loading=true
            this.$store.dispatch('trading_c2c_order_pagedlist', postData).then(({ data }) => {
                if (data) {
                    if (data.pagedata.length > 0) {
                        this.total = data.totalitemcount;
                        this.orderDetail = data.pagedata;
                        this.found = false;
                    } else {
                        this.total = 0;
                        this.found = true;
                        this.orderDetail = [];
                    }
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

td .dealType {
    .Unionpay:before {
        content: '';
        background: url('../../static/images/Unionpay.svg') no-repeat;
        vertical-align: middle;
        width: 18px;
        height: 18px;
        background-size: cover;
        display: inline-block;
    }

    .Alipay:before {
        content: '';
        background: url('../../static/images/Alipay.svg') no-repeat;
        vertical-align: middle;
        width: 18px;
        height: 18px;
        background-size: cover;
        display: inline-block;
    }

    .wechat:before {
        content: '';
        background: url('../../static/images/wechat.svg') no-repeat;
        vertical-align: middle;
        width: 18px;
        height: 18px;
        background-size: cover;
        display: inline-block;
    }

    .Wumis:before {
        content: '';
        background: url('../../static/images/Wumis.svg') no-repeat;
        vertical-align: middle;
        width: 18px;
        height: 18px;
        background-size: cover;
        display: inline-block;
    }

    .money-gram:before {
        content: '';
        background: url('../../static/images/money-gram.svg') no-repeat;
        vertical-align: middle;
        width: 18px;
        height: 18px;
        background-size: cover;
        display: inline-block;
    }

    .Paypal:before {
        content: '';
        background: url('../../static/images/Paypal.svg') no-repeat;
        vertical-align: middle;
        width: 18px;
        height: 18px;
        background-size: cover;
        display: inline-block;
    }
}

.soldOut {
    cursor: pointer;
    color: #14a2a5;
    margin-right: 10px;
}

.hex_table_body td.lt .gray {
    color: rgba(153, 153, 153, 1);
}
</style>
