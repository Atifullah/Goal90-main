<template>
    <div>
        <P2pTable class="mt-2" :buySellColumns="buySellColumns" :buySellData="buySellData" :loading="advloading"
            ref="p2ptable">
            <template #advertisers="{ row }">
                <p class="mb-0"><img class="mb-1 mr-2" width="20" height="auto" :src="getCurrency(row.currencyname).icon" />{{ row.currencyname }}</p>
            </template>

            <template #customTitle="{ row }">{{$t('deal.buyinRate')}} <span class="active">{{ direction==-1?'lowest to highest':'highest to lowest'}}</span></template>
            <template #limitAvailable="{ row }">
                <p class="second-txt mb-1">{{$t('deal.usable')}} <span class="third-txt pl-2"> {{ row.enableamount
                }} {{ row.currencyname }} </span>
                </p>
                <p class="second-txt mb-0">{{$t('deal.limitedDeal')}} <span class="third-txt pl-4 ml-2"> {{ row.minprice }} -
                        {{ row.maxprice
                        }} {{ row.legaltype }}</span></p>
            </template>
            <template #lowestPrice="{ row }">
                <p class="mb-0 fw-5" :class="row.direction == -1 ? 'buy-lowest-price' : 'sell-lowest-price'">{{
                    row.price.toFixed(2) }} {{ row.legaltype }}</p>
            </template>
            <template #paymentMethod="{ row }">
                <a-tag class="bank-tag" v-for="(item, index) in row.payconfiglist" :key="index"
                    :style="{ color: item.bgcolor, background: item.bgcolor + '17' }">{{ item.name
                    }}</a-tag>
            </template>
            <template #customTrade="{ row }">{{$t('home.tradeDeal')}} <a-tag class="new-tag fw-5 ml-1">0 {{$t('express.exp27')}}</a-tag></template>
            <template #expandIcon="{ row }"><span><a-button class="buy fw-5"
                        :class="row.record.direction == -1 ? 'buy-usdt-btn' : 'sell-usdt-btn'" @click="onExpand(row)">{{
                            row.record.direction == -1 ? 'Buy' : 'Sell'
                        }}</a-button></span></template>
            <template #expandedRowRender="{ row }">
                <div id="buy-sell-card">
                    <a-row :gutter="16">
                        <a-col :lg="15" class="pt-1 sell-right-border">
                            <p class="mb-0" :class="'pointer'" @click="goCounterParty(row.userid)">
                                <span class="photo mr-2" style="width:30px; height:30px;"
                                    :class="{ 'online': row.online == 1 }"
                                    :style="{ 'background-color': global_get_random_color(row.userid ? row.userid.substring(row.userid.length - 1) : 0) }">
                                    {{ getname(row.nikename) }}
                                </span>
                                <span class="speed-star-txt fw-5">{{ row.nikename
                                }}</span><img src="/images/star-p2p.svg" class="ml-1" /><img
                                    src="/images/check-star.svg" class="ml-1" />
                                <span class="speed-star-desc fw-5 ml-3">{{ row.tradenum }} {{ $t('person.orders') }} {{
                                    getCompletionRate(row) }}%
                                    {{ $t('express.exp23') }} {{ row.online }}</span>
                            </p>
                            <a-card class="sell-gray-card" :bordered="false">
                                <a-row :gutter="16" class="">
                                    <p class="mb-0 trade-info fw-5 my-4 mx-2">{{$t('express.exp28')}}</p>
                                    <a-col :lg="8">
                                        <p class="price-txt fw-4 mb-4">{{$t('deal.buyinRate')}}: <span class="ml-1 cny-txt fw-5 "
                                                :class="row.direction == 1 ? 'red-active' : 'success-active'">{{ row.price
                                                }} {{  row.legaltype }}</span><a-icon v-show="priceReload" class="ml-1 price-txt fw-4" type="sync"
                                                spin :style="{ fontSize: '12px', color: '#81858c' }" /> </p>
                                        <p class="price-txt fw-4 mb-4">{{$t('security.cc17')}}: <span class="ml-1 cny-txt fw-5">{{ row.enableamount
                                        }} {{ row.currencyname }}
                                            </span> </p>
                                        <p class="price-txt fw-4 mb-4">{{$t('legalTrad.Seller')}}: <span class="ml-1 cny-txt fw-5">{{
                                            row.nikename }}</span> </p>

                                    </a-col>
                                    <a-col :lg="16">
                                        <p class="price-txt fw-4 mb-4">{{$t('extra.extra23')}}: <span class="ml-1 cny-txt fw-5">{{
                                            row.minprice }} -
                                                {{ row.maxprice }} {{ row.legaltype }}</span> </p>
                                        <p class="price-txt fw-4 mb-4">{{$t('legalTrad.Location')}}: <span class="ml-1 cny-txt fw-5">{{ row.areaname
                                        }}</span> </p>
                                        <p class="price-txt fw-4 mb-4">
                                            <a-row>
                                                <a-col :lg="7"> {{$t('legalTrad.Totalmethods')}}:</a-col>
                                                <a-col :lg="17" class="pl-2">
                                                    <a-tag class="bank-tag" v-for="(item, index) in row.payconfiglist"
                                                        :key="index"
                                                        :style="{ color: item.bgcolor, background: item.bgcolor + '17' }">{{
                                                            item.name }}</a-tag>
                                                </a-col>
                                            </a-row>
                                        </p>
                                    </a-col>
                                </a-row>
                            </a-card>
                            <p class="mb-1 term-and-conditions fw-5 pt-4 pl-1" v-if="row.autoreply">{{$t('express.exp35')}}
                            </p>
                            <p class="term-and-conditions-desc fw-4 pl-1" v-if="row.autoreply">{{
                                row.autoreply }}</p>
                        </a-col>
                        <a-col :lg="9" class="pl-5">
                            <a-form-model ref="buySellForm" :model="buySellForm" :rules="rules" :hide-required-mark="true"
                                label-align="left">
                                <a-row :gutter="16">
                                    <a-col :lg="24">
                                        <a-form-model-item has-feedback
                                            :label="row.direction == -1 ? $t('labels.lbl21') : $t('postadd.pna2')"
                                            prop="recieveamount" :colon="false" :wrapper-col="{
                                                xl: 24,
                                                lg: 24,
                                                md: 24,
                                                sm: 24,
                                                xs: 24,
                                            }">
                                            <a-input type="number" v-model="buySellForm.recieveamount"
                                                @change="changeRecieve(row.price)">
                                                <div slot="suffix">
                                                    <p class="mb-0 gray-txt-color">{{
                                                        global_get_uppercase(row.currencyname) }}</p>
                                                </div>
                                            </a-input>
                                        </a-form-model-item>
                                    </a-col>
                                    <a-col :lg="24">
                                        <a-form-model-item has-feedback
                                            :label="row.direction == -1 ? 'I want to pay' : 'I will recieve'"
                                            prop="payamount" :colon="false" :wrapper-col="{
                                                xl: 24,
                                                md: 24,
                                                sm: 24,
                                                xs: 24,
                                            }">
                                            <a-input v-model="buySellForm.payamount" type="number"
                                                @change="changePay(row.price, row.currencyname)">
                                                <div slot="suffix">
                                                    <p class="mb-0 gray-txt-color">{{ row.legaltype }}
                                                    </p>
                                                </div>
                                            </a-input>
                                        </a-form-model-item>
                                    </a-col>
                                    <a-col :lg="24" v-if="row.direction == 1">
                                        <a-form-model-item has-feedback :label="$t('labels.lbl17')" prop="paytype" :colon="false"
                                            :wrapper-col="{
                                                xl: 24,
                                                lg: 24,
                                                md: 24,
                                                sm: 24,
                                                xs: 24,
                                            }">
                                            <a-select style="width: 100%" v-model="buySellForm.paytype"
                                            :placeholder="$t('placeholders.plh23')">
                                                <div slot="dropdownRender" slot-scope="menu">
                                                    <v-nodes :vnodes="menu" />
                                                    <a-divider style="margin: 4px 0;" />
                                                    <div style="padding: 4px 8px 10px 8px; cursor: pointer;"
                                                        @mousedown="e => e.preventDefault()" @click="toggleModel"
                                                        class="text-center">
                                                        <span><a-icon type="plus" /> {{$t('express.exp36')}}</span>
                                                    </div>
                                                </div>
                                                <a-select-option v-for="(item, index) in getPaymentMethods(row)"
                                                    :key="index" :value="item.payconfiginfo.name">
                                                    <a-tag class="bank-tag"
                                                        :style="{ color: item.payconfiginfo.bgcolor, background: item.payconfiginfo.bgcolor + '17' }">{{
                                                            item.payconfiginfo.name }}</a-tag>
                                                </a-select-option>
                                            </a-select>

                                        </a-form-model-item>
                                    </a-col>
                                </a-row>
                                <a-row :gutter="16" class="mt-3 mb-2">
                                    <a-col :lg="12"><a-button class="cancel-outline-btn fw-5" block
                                            @click="onExpand()">{{$t('express.exp37')}}</a-button></a-col>
                                    <a-col :lg="12"><a-button class="fw-5"
                                            :class="row.direction == -1 ? 'buy-usdt-btn' : 'sell-usdt-btn'" block
                                            :loading="buyState" @click="placeOrder(row)">{{
                                                row.direction == -1 ? 'Buy' : 'Sell' }}</a-button></a-col>
                                </a-row>
                            </a-form-model>
                        </a-col>
                    </a-row>
                </div>
            </template>
        </P2pTable>
        <div class=" px-3 pb-4 text-right" v-if="total > 0">
            <a-pagination background @change="handChange" :page-size="page.pagesize" :current="page.pageindex"
                popper-class="paging" layout="prev, pager, next" :total="total">
            </a-pagination>
        </div>
        <SelectPaymentMethod :model="model" :paymentMethodCollection="paymentMethodCollection" :toggleModel="toggleModel" />
        <TradingRequirements :tradingRequirements="tradingRequirements" :close="close" />
    </div>
</template>

<script>
import P2pTable from '@/components/public/P2pModules/P2pTable/P2pTable.vue'
import SelectPaymentMethod from "@/components/person/PaymentMethod/PaymentModal/SelectPaymentMethod";
import TradingRequirements from '../Modals/TradingRequirements';
export default {
    components: {
        P2pTable,
        SelectPaymentMethod,
        TradingRequirements,
        VNodes: {
            functional: true,
            render: (h, ctx) => ctx.props.vnodes,
        },
    },
    props: {
        direction: {
            type: Number
        }
    },
    data() {
        return {
            buySellColumns: [
                {
                    title: this.$t("tableskeys.msg13"),
                    dataIndex: 'advertisers',
                    scopedSlots: { customRender: 'advertisers' },
                    width: 160,
                },
                {
                    dataIndex: this.$t("tableskeys.msg14"),
                    slots: { title: 'customTitle' },
                    scopedSlots: { customRender: 'lowestPrice' },
                    width: 180,
                },
                {
                    title: this.$t("tableskeys.msg15"),
                    dataIndex: 'limitAvailable',
                    scopedSlots: { customRender: 'limitAvailable' },
                    width: 260,
                },
                {
                    title:this.$t("tableskeys.msg16"),
                    dataIndex: 'paymentMethod',
                    scopedSlots: { customRender: 'paymentMethod' },
                    width: 180,
                },
                {
                    dataIndex: 'trade',
                    slots: { title: this.$t("tableskeys.msg17") },
                    scopedSlots: { customRender: 'trade' },
                    align: 'end',
                    width: 40,
                },
            ],
            buySellData: [],
            total: 0,
            page: {
                pageindex: 1,
                pagesize: 3,
            },
            buySellForm: {
                payamount: '',
                recieveamount: '',
                paytype: undefined,
            },
            userpaymentMethods: [],
            paymentMethodCollection: {},
            row: undefined,
            model: false,
            tradingRequirements: false,
            buyState: false,
            componentInterval:'',
            priceReload: false,
            expandstate: false,
            advloading: true,
            stopTimer: true,
            rules: {
                recieveamount: [
                    {
                        validator: async (rule, value, callback) => {
                            if (this.buySellForm.recieveamount == '') {
                                callback(new Error(this.$t('messages.msg67')))
                            } else {
                                if (parseFloat(this.buySellForm.recieveamount) > parseFloat(this.row.record.enableamount)) {
                                    callback(new Error(`${this.$t('errors.err2')} ${this.row.record.enableamount}`))
                                }
                                else {
                                    callback()
                                }

                            }
                        },
                    }
                ],
                payamount: [
                    {
                        validator: async (rule, value, callback) => {
                            if (parseFloat(this.buySellForm.payamount) < parseFloat(this.row.record.minprice)) {
                                callback(new Error(`${this.$t('errors.err1')} ${this.row.record.minprice} ${this.row.record.legaltype}`))
                            } else {
                                if (parseFloat(this.buySellForm.payamount) > parseFloat(this.row.record.maxprice)) {
                                    callback(new Error(`${this.$t('errors.err2')} ${this.row.record.maxprice} ${this.row.record.legaltype}`))
                                }
                                else {
                                    callback()
                                }

                            }
                        },
                    }
                ],
                paytype: [
                    { required: true, message: this.$t('messages.msg21') },
                ],
            }
        };
    },
    methods: {
        getCurrency(name) {
            const currency=this.$store.state.currencyinfos.filter(item => item.currencyname == name)[0]
            return currency;

        },
        changeRecieve(price) {
            if (this.buySellForm.recieveamount == '') {
                this.buySellForm.payamount = '';
            }
            else {
                this.buySellForm.payamount = (this.buySellForm.recieveamount * price).toFixed(2);
            }
        },
        changePay(price, currency) {
            if (this.buySellForm.payamount == '') {
                this.buySellForm.recieveamount = '';
            }
            else {
                const amt = this.buySellForm.payamount / price;
                this.buySellForm.recieveamount = this.global_get_tofixed(amt, this.global_get_decimal(currency).a);
            }
            this.$refs['buySellForm'].validateField('recieveamount');
        },
        handChange(val) {
            this.getOrderList(val);
        },
        async paymentGetList() {
            this.$store.dispatch('user_user_payments_get').then(({ data }) => {
                if (data) {
                    this.userpaymentMethods = data;
                }
            })
        },
        resetForm() {
            this.buySellForm = {
                payamount: '',
                recieveamount: '',
                paytype: undefined,
            }
            this.$refs['buySellForm']?.clearValidate();
        },
        getname(val) {
            return val ? val.substring(0, 1) : '--'
        },
        onExpand(row) {
            if (!this.$userinfo.uid) {
                this.$router.push('/login?returnurl=' + this.$route.path)
            }
            if (this.$userinfo.securitylevel < 2) {
                this.tradingRequirements = true;
                return;
            }
            if (this.expandstate == true) {
                return
            }
            this.expandstate = true;
            this.resetForm();
            if (!row) {
                this.row.onExpand();
                this.stopTimer = true;
                this.expandstate = false;
                return
            }
            this.$set(row, 'expanded', !row.expanded);
            if (row.expanded) {
                if (this.row && this.row.record.id != row.record.id) {
                    this.$set(this.row, 'expanded', false);
                    this.row.onExpand();
                }
                row.onExpand();
                this.stopTimer = false;
                this.row = row;
                this.startTimer();
            }
            else {
                row.onExpand();
                this.row = undefined
                this.stopTimer = true;
            }
            this.expandstate = false;
        },
        startTimer() {
            this.seconds = 10;
            this.componentInterval = setInterval(() => {
                if (this.seconds != 0) {
                    this.seconds = this.seconds - 1;
                }
                else {
                    this.seconds = 11;
                    this.priceReload = true;
                    this.getOrderList(this.page.pageindex)
                }
                if (this.stopTimer) {
                    clearInterval(this.componentInterval);
                }
            }, 1000);
        },
        getCompletionRate(item) {
            const rate = (1 - item.badcomment / (item.goodcomment + item.badcomment)) * 100
            if (Number.isNaN(rate)) {
                return 0;
            }
            return rate.toFixed(2);
        },
        toggleModel() {
            this.model = !this.model;
        },
        async getAllC2CPaymentMethods() {
            const _self = this;
            try {
                let { data } = await _self.$store.dispatch('trading_c2c_all_payment_method_get');
                this.paymentMethodCollection = data;
            } catch (error) {
                //console.log('Error', error);
            }
        },
        getPaymentMethods(row) {
            const methods = this.userpaymentMethods.filter(_upm => {
                const common = row.payconfiglist.filter(item => {
                    if (_upm.identifier == item.identifier) {
                        return _upm
                    }
                })
                if (common.length > 0) {
                    return common[0];
                }
            })
            return methods;
        },
        async placeOrder(row) {
            if (row.userid == this.$userinfo.uid) {
                let msg = '';
                if (row.direction == -1) {
                    msg = this.$t('messages.msg60')
                }
                else {
                    msg = this.$t('messages.msg61')
                }
                this.$store.commit('set_message', { type: 'error', text: msg });
                return
            }
            await this.$refs['buySellForm'].validate(async (valid) => {
                if (valid) {
                    this.buyState = true;
                    const _self = this;
                    const postData = {
                        price: row.price,
                        amount: this.buySellForm.recieveamount,
                        orderID: row.id,
                        payTypes: this.buySellForm.paytype,

                    }
                    try {
                        let data = await _self.$store.dispatch('trading_c2c_order_add', postData);
                        if (data.code == '200') {
                            this.stopTimer = true;
                            this.global_refresh_user_inprocessorders_count()
                            this.$router.push('/p2p/orders-history/' + data.data)
                        }
                        else {
                            this.onExpand();
                            this.buyState = false;
                            this.$store.commit('set_message', { type: 'error', text: data.msg });

                        }

                    } catch (error) {
                        //console.log('Error', error);
                        this.buyState = false;
                    }
                }
            });
        },
        async getOrderList(pageIndex) {
            this.page.pageindex = pageIndex ? pageIndex : 1;
            var postData = Object.assign(this.page);
            postData.touserid = this.$route.query.userid;
            postData.orderstatus = [0];
            postData.direction = this.direction;
            postData.advid=this.$route.query.advid;
            try {
                const { data } = await this.$store.dispatch('trading_c2c_market_pagedlist', postData);
                if (data) {
                    this.buySellData = data.pagedata;
                    this.total = data.totalitemcount;
                    this.advloading = false;
                    this.priceReload = false;
                }
                else {
                    this.total = 0;
                    this.buySellData = [];
                    this.advloading = false;
                    this.priceReload = false;
                }
                this.$emit('setBuySellAdsCount',this.total,this.direction);
            }
            catch (error) {
                //console.log(error)
                this.advloading = false;
            }
        },
        close() {
            this.tradingRequirements = false;
        },
    },
    mounted() {
        this.getOrderList();
        this.paymentGetList();
        this.getAllC2CPaymentMethods();
    },
    beforeDestroy(){
        clearInterval(this.componentInterval)
    }

}
</script>

<style lang="scss" scoped>
.photo {
    display: inline-block;
    border-radius: 200px;
    text-align: center;
    width: 39px;
    height: 39px;
    line-height: 36px;
    vertical-align: middle;
    margin-right: 0px;
    color: #ffffff;
    position: relative;
}

.photo:after {
    content: '';
    display: inline-block;
    width: 8px;
    position: absolute;
    height: 8px;
    border-radius: 50%;
    background-color: #DDDDDD;
    background-clip: content-box;
    border: 2px solid #ffffff;
    bottom: 0;
    right: 0;
}

.photo.online:after {
    background-color: #0ED12A;
}
</style>
