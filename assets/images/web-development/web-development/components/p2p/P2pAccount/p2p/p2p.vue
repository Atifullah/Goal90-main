<template>
    <div>
        <!-- <Guide /> -->
        <div id="p2p-filters" v-show="currenciesLoaded[0] && currenciesLoaded[1]">
            <div class="shadow-card pt-4 px-4 pb-4">
                <a-row :gutter="10" class="col-alignment">
                    <a-col :lg="5">
                        <div class="buy-sell-box">
                            <div class="buy-left"><a-button class="fw-5" :class="direction == -1 ? 'buy-btn' : 'gray-p2pbtn'" block
                                    @click="changeDirection(-1)">{{ $t('express.exp7') }}</a-button></div>
                            <div class="sell-right"><a-button class="fw-5" :class="direction == 1 ? 'sell-btn' : 'gray-p2pbtn'" block
                                    @click="changeDirection(1)">{{ $t('express.exp8') }}</a-button></div>
                        </div>
                    </a-col>
                    <a-col :lg="4">
                        <hex-select ref="currencyDetails" :label="$i18n.t('Waddress.selectCion')"
                            :type="$i18n.t('Waddress.selectCion')" :frenchcurrency="'frenchcurrency'" :market="'c2ccurrecy'"
                            :order="currencyDetails" @searchData="searchData" @clearCurrentState="clearCurrentState" />
                    </a-col>
                    <a-col :lg="6">
                        <a-input-search type="number" :placeholder="$t('placeholders.plh19')" enter-button v-model="amount"
                            @search="onSearch" @blur="onSearch">
                            <span slot="suffix" v-show="amount != ''"><img src="/images/x-close.svg"
                                    @click="clearAmount" class="pointer" /></span>
                            <span class="" slot="suffix">
                                <hex-select ref="fiats" :label="$i18n.t('Waddress.selectCion')" :type="'Select Fiat'"
                                    :market="'Fiats'" dropdownClassName="p2p-search-filter-drop" :order="fiats"
                                    @searchData="searchData" :showSearch="true" @clearCurrentState="clearCurrentState" />
                            </span>

                        </a-input-search>
                    </a-col>

                    <a-col :lg="4">
                        <hex-select ref="methodsDetails" :label="$t('conditionaltxt.ct30')"
                            :type="$t('conditionaltxt.ct30')" :order="searchPayMethods" :market="$t('conditionaltxt.ct30')"
                            @searchData="searchData" @clearCurrentState="clearCurrentState" :showSearch="true" />
                    </a-col>
                    <a-col :lg="4">
                        <hex-select ref="regionsDetails" :label="$t('conditionaltxt.ct31')"
                            :type="$t('conditionaltxt.ct31')" :order="countryOptions" :market="$t('conditionaltxt.ct31')"
                            @searchData="searchData" :showSearch="true" @clearCurrentState="clearCurrentState" />
                    </a-col>
                    <a-col :lg="1" class="p-0 ml-1">
                        <a-row :gutter="16">
                            <!-- <a-col :lg="12" class="pr-0">
                                <a-dropdown :trigger="['click']" placement="bottomRight"
                                    overlayClassName="filter-dropdown mt-4">
                                    <a class="ant-dropdown-link">
                                        <img src="/images/filter-icon.svg" />
                                    </a>
                                    <a-menu slot="overlay">
                                        <a-menu-item key="0">
                                            <a-checkbox v-model="isMerchant" @change="showMerchant">
                                                {{ $t('express.exp21') }}
                                            </a-checkbox>
                                        </a-menu-item>
                                    </a-menu>
                                </a-dropdown>
                            </a-col> -->
                            <a-col :lg="12" class="pointer"><img @click="resetSelect"
                                    src="/images/refresh-p2p-icon.svg" height="38px"/></a-col>
                        </a-row>

                    </a-col>
                </a-row>
            </div>
        </div>
        <a-row>
            <a-col :lg="24" class="">
                <P2pTable :buySellColumns="buySellColumns" :buySellData="buySellData" :loading="loading" ref="p2ptable">
                    <template #advertisers="{ row }">
                        <span class="pointer" @click="goCounterParty(row)">
                            <a-row :gutter="16" class="col-alignment">
                                <a-col :lg="5">
                                    <span class="photo" v-if="row.userlogo"
                                        :class="{ 'online': row.online == 'now is online' }">
                                        <img :src="row.userlogo" height="39px" width="39px" style="border-radius:50%" />
                                    </span>
                                    <span v-else class="photo"
                                        :class="{ 'online': row.online == $t('conditionaltxt.ct32') }"
                                        :style="{ 'background-color': global_get_random_color(row.userid ? row.userid.substring(row.userid.length - 1) : 0) }">
                                        {{ getname(row.nikename) }}
                                    </span>
                                </a-col>
                                <a-col :lg="18">
                                    <p class="mb-1 speed-star-txt fw-5">{{ row.nikename }}<img
                                            v-if="getCompletionRate(row) >= 95" :title="$t('conditionaltxt.ct33')"
                                            src="/images/star-p2p.svg" class="ml-1" /><img v-if="row.applyadv"
                                            title="Certified Merchant" src="/images/check-star.svg" class="ml-1" /> </p>
                                    <p class="mb-0 second-txt">{{ row.tradenum }} {{ $t('express.exp22') }} {{
                                        getCompletionRate(row)
                                    }}% {{ $t('express.exp23') }}
                                        <br /> {{ row.online }}
                                    </p>
                                </a-col>
                            </a-row>
                        </span>
                    </template>

                    <template #customTitle="{ row }"> {{ $t('express.exp24') }} <span class="active">{{
                        direction == -1 ? $t('conditionaltxt.ct34') : $t('conditionaltxt.ct35') }}</span></template>
                    <template #limitAvailable="{ row }">
                        <p class="second-txt mb-1">{{ $t('express.exp25') }} <span class="third-txt pl-2"> {{
                            global_get_tofixed(row.enableamount, global_get_decimal(row.currencyname).a) }} {{
        row.currencyname }}</span>
                        </p>
                        <p class="second-txt mb-0"> {{ $t('express.exp26') }}<span class="third-txt pl-4 ml-2"> {{
                            row.minprice }} -
                                {{ row.maxprice
                                }} {{ row.legaltype }}</span></p>
                    </template>
                    <template #lowestPrice="{ row }">
                        <p class="mb-0 fw-7" :class="direction == -1 ? 'buy-lowest-price' : 'sell-lowest-price'">{{
                            row.price.toFixed(2) }} {{ row.legaltype }}</p>
                    </template>
                    <template #paymentMethod="{ row }">
                        <a-tag class="bank-tag" v-for="(item, index) in row.payconfiglist" :key="index"
                            :style="{ color: item.bgcolor, background: item.bgcolor + '17' }">{{
                                item.name }}</a-tag>
                        <!-- <div v-for="(item, index) in row.payconfiglist" :key="index" class="mr-3 bank-tag-txt"
                           >
                           <span class="bank-tag-border"  :style="{ borderLeft:'3.5px solid '+  item.bgcolor }"></span>
                           <span class="bank-tag">
                            {{ item.name}}
                           </span>
                        </div> -->
                    </template>
                    <template #customTrade="{ row }"> {{ $t('express.exp41') }}<a-tag class="new-tag fw-5 ml-1">0
                            {{ $t('express.exp27') }}</a-tag></template>
                    <template #expandIcon="{ row }"><span><a-button class="buy fw-5"
                                :class="row.record.userid == $userinfo.uid ? 'buy-sell-disabled-btn' : direction == -1 ? 'buy-usdt-btn' : 'sell-usdt-btn'"
                                @click="onExpand(row)">{{ direction == -1 ? $t('conditionaltxt.ct36') :
                                    $t('conditionaltxt.ct37')
                                }}</a-button></span></template>
                    <template #expandedRowRender="{ row }">
                        <div id="buy-sell-card">
                            <a-row :gutter="16">
                                <a-col :lg="15" class="pt-1 sell-right-border">
                                    <p class="mb-0" :class="'pointer'" @click="goCounterParty(row)">
                                        <!-- <span class="photo mr-2" style="width:30px; height:30px;"
                                        :class="{ 'online': row.online == 'now is online' }"
                                            :style="{ 'background-color': global_get_random_color(row.userid ? row.userid.substring(row.userid.length - 1) : 0) }">
                                            {{ getname(row.nikename) }}
                                        </span> -->
                                        <span class="photo" v-if="row.userlogo"
                                            :class="{ 'online': row.online == 'now is online' }">
                                            <img :src="row.userlogo" height="39px" width="39px" style="border-radius:50%" />
                                        </span>
                                        <span v-else class="photo mr-2"
                                            :class="{ 'online': row.online == $t('conditionaltxt.ct32') }"
                                            :style="{ 'background-color': global_get_random_color(row.userid ? row.userid.substring(row.userid.length - 1) : 0) }">
                                            {{ getname(row.nikename) }}
                                        </span>
                                        <span class="speed-star-txt fw-5">{{ row.nikename
                                        }}</span><img src="/images/star-p2p.svg" class="ml-1" /><img
                                            src="/images/check-star.svg" class="ml-1" />
                                        <span class="speed-star-desc fw-5 ml-3">{{ row.tradenum }} {{ $t('express.exp42') }} {{
                                            getCompletionRate(row) }}%
                                            {{ $t('express.exp43') }} <span class="fw-7"
                                                :class="{ 'buy-lowest-price': row.online == 'now is online' }">{{ row.online
                                                }}</span></span>
                                    </p>
                                    <a-card class="sell-gray-card" :bordered="false">
                                        <a-row :gutter="16" class="">
                                            <p class="mb-0 trade-info fw-5 my-4 mx-2">{{ $t('express.exp28') }}</p>
                                            <a-col :lg="7">
                                                <p class="price-txt fw-4 mb-4">{{ $t('express.exp29') }} <span
                                                        class="ml-1 cny-txt fw-5 "
                                                        :class="direction == 1 ? 'red-active' : 'success-active'">{{
                                                            row.price }} {{
                                                         row.legaltype
                                                 }}</span><a-icon v-show="priceReload" class="ml-1 price-txt fw-4" 
                                                        type="sync" spin :style="{ fontSize: '12px', color: '#81858c' }" />
                                                </p>
                                                <p class="price-txt fw-4 mb-4">{{ $t('express.exp30') }}<span
                                                        class="ml-1 cny-txt fw-5">{{ row.enableamount }} {{
                                                            row.currencyname }}
                                                    </span> </p>
                                                <p class="price-txt fw-4 mb-4">{{ $t('express.exp31') }} <span
                                                        class="ml-1 cny-txt fw-5">{{
                                                            row.nikename }}</span> </p>

                                            </a-col>
                                            <a-col :lg="17">
                                                <p class="price-txt fw-4 mb-4">{{ $t('express.exp32') }} <span
                                                        class="ml-1 cny-txt fw-5">{{ row.minprice }} -
                                                        {{ row.maxprice }} {{ row.legaltype }}</span> </p>
                                                <p class="price-txt fw-4 mb-4">{{ $t('express.exp33') }} <span
                                                        class="ml-1 cny-txt fw-5">{{ row.areaname }}</span> </p>
                                                <p class="price-txt fw-4 mb-4">
                                                    <a-row>
                                                        <a-col :lg="6">{{ $t('express.exp34') }}</a-col>
                                                        <a-col :lg="18" class="pl-2">

                                                            <a-tag class="bank-tag"
                                                                v-for="(item, index) in row.payconfiglist" :key="index"
                                                                :style="{ color: item.bgcolor, background: item.bgcolor + '17' }">{{
                                                                    item.name }}</a-tag>
                                                        </a-col>
                                                    </a-row>
                                                </p>
                                            </a-col>
                                        </a-row>
                                    </a-card>
                                    <p class="mb-1 term-and-conditions fw-5 pt-4 pl-1" v-if="row.autoreply">
                                        {{ $t('express.exp35') }}
                                    </p>
                                    <p class="term-and-conditions-desc fw-4 pl-1" v-if="row.autoreply">{{
                                        row.autoreply }}</p>
                                </a-col>

                                <a-col :lg="9" class="pl-5">
                                    <a-form-model ref="buySellForm" :model="buySellForm" :rules="rules"
                                        :hide-required-mark="true" label-align="left">
                                        <a-row :gutter="16">
                                            <a-col :lg="24">
                                                <a-form-model-item has-feedback
                                                    :label="row.direction == -1 ? $t('conditionaltxt.ct38') : $t('conditionaltxt.ct39')"
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
                                                    :label="row.direction == -1 ? $t('conditionaltxt.ct40') : $t('conditionaltxt.ct38')"
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
                                            <a-col :lg="24" v-if="direction == 1">
                                                <a-form-model-item has-feedback :label="$t('labels.lbl17')" prop="paytype"
                                                    :colon="false" :wrapper-col="{
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
                                                                <span><a-icon type="plus" /> {{ $t('express.exp36')
                                                                }}</span>
                                                            </div>
                                                        </div>
                                                        <a-select-option v-for="(item, index) in getPaymentMethods(row)"
                                                            :key="index" :value="item.payconfiginfo.identifier">
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
                                                    @click="onExpand()">{{ $t('express.exp37') }}</a-button></a-col>
                                            <a-col :lg="12"><a-button class="fw-5"
                                                    :class="direction == -1 ? 'buy-usdt-btn' : 'sell-usdt-btn'" block
                                                    :loading="buyState" @click="placeOrder(row)">{{
                                                        direction == -1 ? $t('conditionaltxt.ct36') : $t('conditionaltxt.ct37')
                                                    }}</a-button></a-col>
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
            </a-col>
        </a-row>
        <SelectPaymentMethod :model="model" :paymentMethodCollection="paymentMethodCollection" :toggleModel="toggleModel" />
        <TradingRequirements :tradingRequirements="tradingRequirements" :close="close" />
        <ApplySuccessModel :applySuccessModel="applySuccessModel" @applySuccessModelClose="applySuccessModelClose" />



    </div>
</template>
<script>


import select from '@/components/security/deal_select'

import P2pFilters from '@/components/public/P2pModules/P2pFilters/P2pFilters.vue'
import P2pTable from '@/components/public/P2pModules/P2pTable/P2pTable.vue'
// import WorksCard from '@/components/public/P2pModules/WorksCard.vue'
// import Faqs from '@/components/public/Faqs.vue'
import BuySellCard from '@/components/public/P2pModules/BuySellCard.vue'

import SelectPaymentMethod from "@/components/person/PaymentMethod/PaymentModal/SelectPaymentMethod";
import TradingRequirements from '../../Modals/TradingRequirements'
import ApplySuccessModel from "@/components/AgentPlan/ApplySuccessModal.vue";
// import Guide from '~/components/App/Guide.vue'

export default {
    props: {
        directionprop: {
            type: Number | String,
            default: 1
        }
    },

    components: {
        "hex-select": select,
        P2pFilters,
        P2pTable,
        // WorksCard,
        TradingRequirements,
        // Faqs,
        BuySellCard,
        SelectPaymentMethod,
        VNodes: {
            functional: true,
            render: (h, ctx) => ctx.props.vnodes,
        },
        ApplySuccessModel,
        // Guide
    },
    watch: {
        'realFiats': function (val) {
            // console.log(val)
            if (val) {
                val?.map(item => {
                    this.fiats.push({
                        id: item.name,
                        value: item.name,
                        type: 'legaltype',
                        icon: item.icon
                    })
                });
                this.getLang()
            }
        },
        'currencyDetails': function (val) {
            if (val) {
                this.currenciesLoaded[0] = true;
                if (this.currenciesLoaded[1]) {
                    this.resetSelect();
                }
            }
        }
    },
    data() {
        return {
            open: false,
            buySellColumns: [
                {
                    title: this.$t("tableskeys.msg13"),
                    dataIndex: 'advertisers',
                    scopedSlots: { customRender: 'advertisers' },
                    width: 300,
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
                    width: 240,
                },
                {
                    title: this.$t("tableskeys.msg16"),
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
            fiats: [],
            realFiats: [],
            direction: 1,
            total: 0,
            page: {
                pageindex: 1,
                pagesize: 10,
            },
            componentInterval:'',
            currenciesLoaded: [false, false],
            amount: '',
            expandstate: false,
            model: false,
            tradingRequirements: false,
            regCurrency: '',
            buylegalType: 0,
            buytokenType: 2,
            isMerchant: false,
            countryOptions: [],
            searchParam: {},
            userpaymentMethods: [],
            loading: false,
            colors: ['', 'mezan-bank', 'jazzcash', 'easypaisa'],
            currencyDetails: [],
            paymentMethodCollection: {},
            searchPayMethods: [],
            currencyid: this.$t('formMenu.select'),
            legalType: undefined,
            buySellForm: {
                payamount: '',
                recieveamount: '',
                paytype: undefined,
            },
            row: undefined,
            buyState: false,
            priceReload: false,
            stopTimer: true,
            applySuccessModel: {},
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
        }
    },
    methods: {
        onOpen() {
            this.open = true
            if (this.open == true) {
                setTimeout(() => {
                    this.$refs.search?.focus()
                }, 100);

            }
        },
        clearAmount() {
            this.amount = '';
            delete this.searchParam.amount;
            this.getOrderList();
        },
        setOpen(bool) {
            if (this.open == bool) {
                return
            }
            if (!bool) {
                setTimeout(() => {
                    this.open = bool
                }, 100);
            }
            else {
                this.open = bool;
            }
        },
        close() {
            // this.tradingRequirements = false
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
                // console.log('not row')
                this.row.onExpand();
                this.stopTimer = true;
                this.expandstate = false;
                this.row = undefined
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
        async getOrderList(pageIndex) {
            this.page.pageindex = pageIndex ? pageIndex : 1;
            var postData = Object.assign(this.searchParam, this.page);
            postData.direction = this.direction;
            postData.orderstatus = [0];

            if(this.loading){
                return
            }

            try {
                this.loading = true
                const { data } = await this.$store.dispatch('trading_c2c_market_pagedlist', postData);
                if (data) {
                    this.buySellData = data.pagedata;
                    this.total = data.totalitemcount;
                    this.loading = false;
                    this.priceReload = false;
                }
                else {
                    this.total = 0;
                    this.buySellData = [];
                    this.loading = false;
                    this.priceReload = false;
                }

            }
            catch (error) {
                //console.log(error)
                this.loading = false;
            }
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
        toggleModel() {
            this.model = !this.model;
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
        getCompletionRate(item) {
            const rate = (1 - item.badcomment / (item.goodcomment + item.badcomment)) * 100
            if (Number.isNaN(rate)) {
                return 0;
            }
            return rate.toFixed(2);
        },
        getname(val) {
            return val ? val.substring(0, 1) : '--'
        },
        getallcoininfos() {
            this.$store.state.currencyinfos.forEach(item => {
                this.currencyDetails.push({
                    id: item.id,
                    value: item.currencyname,
                    type: 'currencyid',
                    icon: item.icon
                });
            });
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
        async getAllC2CPaymentMethods() {
            const _self = this;
            try {
                let { data } = await _self.$store.dispatch('trading_c2c_all_payment_method_get');
                this.paymentMethodCollection = data;
                data.all.forEach(item => {
                    this.searchPayMethods.push({
                        id: item.identifier,
                        value: item.name,
                        type: 'paytypes',
                        color: item.bgcolor
                    });
                });
            } catch (error) {
                // console.log('Error', error);
            }
        },
        getRegions() {
            this.$store.dispatch("com_country_getlist").then(({ data }) => {
                data.map(item => {
                    this.countryOptions.push({
                        id: item.countryid,
                        value: (this.lang == 'zh_cn' || this.lang == 'zh_hk') ? item.name : item.engname,
                        type: 'areaCode',
                        icon: item.flag
                    })
                    if (this.lang == 'zh_cn' || this.lang == 'zh_hk') {
                        item.name = item.name;
                    } else {
                        item.name = item.engname;
                    }
                });
            });
        },
        handChange(val) { 
            this.getOrderList(val);
        },
        changeDirection(val) {
            this.buySellData = []
            this.stopTimer = true;
            this.direction = val;
            // this.resetSelect();
            this.getOrderList()
            // this.getOrderList();
        },
        searchData(val) {//用于存子组件传过来数据
            this.searchParam[val.type] = val.id;
            if (this.amount != '') {
                this.searchParam['amount'] = this.amount;
            }
            else {
                delete this.searchParam.amount
            }
            if (val.type == 'legaltype') {
                this.legalType = this.$refs.fiats.selectVal
                this.buylegalType = this.legalType;
            }
            this.getOrderList();
        },

        resetSelect() {
            
            this.$refs.currencyDetails.clearStatus()
            this.amount = ''
            this.$refs.methodsDetails.clearStatus()
            this.$refs.regionsDetails.clearStatus()
            this.$refs.fiats.clearStatus()
            this.searchParam = {}
            let currency = {}
            let idx = 0;
            this.currencyDetails.filter((item, index) => {
                if (item.currencyname == 'USDT') {
                    currency = item;
                    idx = index;
                }
            });
            this.fiats.filter((item, index) => {
                if (item.value == this.regCurrency) {
                    this.$refs.fiats.selectVal = index;
                    this.legalType = index;
                    this.buylegalType = index;
                }
            })
            this.$refs.currencyDetails.selectVal = idx;
            this.searchParam[currency.type] = currency.id;
            this.searchParam['legaltype'] = this.fiats[this.legalType]?.id;
            this.getOrderList()
        },
        clearCurrentState(id) {
            this.searchParam[id] = {};
        },
        onSearch() {
            if (this.amount != '') {
                this.searchParam['amount'] = this.amount;
                this.getOrderList();
            }
            else {
                delete this.searchParam.amount;
                this.getOrderList();
            }
        },
        showMerchant() {
            this.searchParam['ismerchant'] = this.isMerchant;
            this.getOrderList();
        },
        goCounterParty(row) {
            if (row.userid == this.$userinfo.uid) {
                this.$router.push({ path: 'profile-info' })
                return
            }
            this.$router.push({
                path: 'counter-party', query: {
                    userid: row.userid,
                    advid: row.id
                }
            })
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

                            this.applySuccessModel = {
                                ServerMessage: this.$t('messages.msg22'),
                                ClientMessage: this.$t('messages.msg23'),
                                Data: data.data
                            }
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
        getLang() {
            this.$store.dispatch("com_getlangbyip").then(({ data }) => {
                if (data) {
                    this.regCurrency = data.currency_code;
                    this.currenciesLoaded[1] = true;
                    if (this.currenciesLoaded[0]) {
                        this.resetSelect()
                    }
                }
            });
        },
        resetForm() {
            this.buySellForm = {
                payamount: '',
                recieveamount: '',
                paytype: undefined,
            }
            this.$refs['buySellForm']?.clearValidate();
        },
        async paymentGetList() {
            this.$store.dispatch('user_user_payments_get').then(({ data }) => {
                if (data) {
                    this.userpaymentMethods = data;
                }
            })
        },
        applySuccessModelClose(data = null) {
            this.stopTimer = true;
            //console.log('DATAAAAA:::applySuccessModelClose', data)
            this.global_refresh_user_inprocessorders_count()
            this.$router.push('/p2p/in-process/' + data)
        },
    },
    mounted() {
        // if (this.$route.query.direction) {
        //     this.direction = this.$route.query.direction;
        // }
        this.direction = this.directionprop
        this.realFiats = this.fiatpaymenttypeget();
        //console.log(this.realFiats)
        this.getAllC2CPaymentMethods();
        this.paymentGetList();
        this.getRegions();
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
    img {
        object-fit: cover;
    }
}
.photo:after {
    content: '';
    display: inline-block;
    width: 9px;
    position: absolute;
    height: 9px;
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
