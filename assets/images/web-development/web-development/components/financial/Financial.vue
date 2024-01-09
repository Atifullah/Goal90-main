<template>
    <div>
        <div class="financial-header">
            <div class="main-content">
                <a-row :gutter="24">
                    <a-col :lg="13" :xl="15" class="pt-5 mt-4 header-row">
                        <p class="financial-heading fw-5 mb-1">{{ $t('financial.fin_headertop_note') }}</p>
                        <span class="financial-desc fw-5">{{ $t('financial.fin_headertop_note2') }}
                            <br />
                            {{ $t('financial.fin_headertop_note2new') }}
                        </span>
                    </a-col>
                    <a-col :lg="11" :xl="9">
                        <div class="outer-box">
                            <img src="/images/financial-card.svg" width="100%" />
                            <div class="financial-profit-black">
                                <ProfitCard ref="profitCard" />
                            </div>
                        </div>
                    </a-col>
                </a-row>
                <a-row class="financial-tab-btn">
                    <a-col :lg="24">
                        <a-radio-group v-model="tab" @change="getNowTime" size="large" class="financial-btn-tabs">
                            <a-radio-button value="1">
                                {{ $t('financial.Locked_Savings_fin') }}
                            </a-radio-button>
                            <a-radio-button value="2">
                                {{ $t('financial.Flexible_Savings_fin') }}
                            </a-radio-button>
                            <a-radio-button value="3">
                                {{ $t('financial.Locked_Hybrid_Financing') }}
                            </a-radio-button>
                            <a-radio-button value="4">
                                {{ $t('financial.Flexible_Hybrid_Financing') }}
                            </a-radio-button>
                        </a-radio-group>
                    </a-col>
                </a-row>
            </div>
        </div>
        <div>
            <div class="main-content">
                <div class="financial">
                    <div v-if="!loading" class="financial-card mt-5" :bordered="false">
                        <a-tabs v-model="filter" class="py-3">
                            <a-tab-pane key="1" :tab="$t('manage.All')">
                            </a-tab-pane>
                            <a-tab-pane key="2" tab="BTC">
                            </a-tab-pane>
                            <a-tab-pane key="3" tab="ETH">
                            </a-tab-pane>
                            <a-tab-pane key="4" tab="USDT">
                            </a-tab-pane>

                            <div slot="tabBarExtraContent">
                                <a-input ref="userNameInput" v-model="searchvalue" :placeholder="$t('placeholders.plh5')">
                                    <span slot="prefix">
                                        <img src="/images/search-icon-home.svg" />
                                    </span>
                                </a-input>
                            </div>
                        </a-tabs>
                        <a-row v-if="tab == '1'" :gutter="16" class="mb-4 mt-4">
                            <a-col v-for="(item, item_index) in filteredLockedSavings" :key="item.currencyid" :lg="8"
                                :xl="6" :md="8" class="mb-3">
                                <BtcCard :item_index="item_index" :item="item" :termChange="termChange" tab="1"
                                    :subscriptionBtnModel="subscriptionBtnModel" :dateNow="dateNow" />
                            </a-col>
                        </a-row>
                        <a-row v-if="tab == '2'" :gutter="16" class="mb-4 mt-4">
                            <a-col v-for="(item, item_index) in filteredFlexibleSavings" :key="item.currencyid" :lg="8"
                                :xl="6" :md="8" class="mb-3">
                                <BtcCard :item_index="item_index" :item="item" :termChange="termChange" tab="2"
                                    :subscriptionBtnModel="subscriptionBtnModel" :dateNow="dateNow" />
                            </a-col>
                        </a-row>

                        <a-row v-if="tab == '3'" :gutter="16" class="mb-4 mt-4">
                            <a-col v-for="(item, item_index) in filteredLockedHybridFinancing" :key="item.currencyid"
                                :lg="8" :xl="6" :md="8" class="mb-3">
                                <BtcCard :item_index="item_index" :item="item" :termChange="termChangeHybrid" tab="3"
                                    :allIcons="allIcons" :subscriptionBtnModel="hybridSubscriptionBtnModel"
                                    :dateNow="dateNow" />
                            </a-col>
                        </a-row>
                        <a-row v-if="tab == '4'" :gutter="16" class="mb-4 mt-4">
                            <a-col v-for="(item, item_index) in filteredHybridFinancing" :key="item.currencyid" :lg="8"
                                :xl="6" :md="8" class="mb-3">
                                <BtcCard :item_index="item_index" :item="item" :termChange="termChangeHybrid" tab="4"
                                    :allIcons="allIcons" :subscriptionBtnModel="hybridSubscriptionBtnModel"
                                    :dateNow="dateNow" />
                            </a-col>
                        </a-row>
                    </div>
                    <div v-else>
                        <a-spin
                            style="height:40vh; display:flex; justify-content:center; align-items:center; background:#FDFDFD;">
                            <a-icon slot="indicator" type="loading" style="font-size: 24px; " spin />
                        </a-spin>
                    </div>
                    <a-row class="">
                        <a-col :lg="24">
                            <Faqs :channelid="68" :subtitle="'financial_faqs'" />
                        </a-col>
                    </a-row>
                    <Subscription ref="subscription" :purchasePackage="purchasePackage" :minTradeAmount="minTradeAmount"
                        :maxTradeAmount="maxTradeAmount" :tab="tab" :model="model" :close="close"
                        :locked_saving_currency="locked_saving_currency" :yearlyRate="yearlyRate"
                        :locked_canuse_amount="locked_canuse_amount" :dailyRate="dailyRate" :tradeAmount="tradeAmount"
                        :activities="activities" :firstCurrencyName="firstCurrencyName"
                        :secondCurrencyName="secondCurrencyName" :hybrid_currency="hybrid_currency"
                        :activeHybridDetail="activeHybridDetail" :updateHybridDetail="updateHybridDetail" :tenure="tenure"
                        :icon="icon" />
                    <VerificationDetail ref="verification" :close="close" :isVerification="isVerification"
                        :subscribePakcage="subscribePakcage" :purchaseProductID="purchaseProductID" :currencyID="currencyID"
                        :tradeAmount="tradeAmount" :refresh="refresh" />
                    <TradingRequirements :tradingRequirements="tradingRequirements" :close="close" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Faqs from '@/components/public/Faqs.vue'
import BtcCard from "./BtcCard.vue"
import ProfitCard from "../financial/ProfitCard.vue"
import Subscription from "./SubscriptionModal/Subscription.vue"
import VerificationDetail from "./SubscriptionModal/VerificationDetail.vue"
import TradingRequirements from '@/components/p2p/Modals/TradingRequirements'
export default {
    name: 'Financial',
    components: {
        BtcCard,
        Subscription,
        VerificationDetail,
        Faqs,
        ProfitCard,
        TradingRequirements
    },
    computed: {
        filteredLockedSavings() {
            const _self = this;
            // filter 1:all
            if (this.filter == '2') { // btc
                return this.lockedSavings.filter(item => item.currencyname == 'BTC')
            }
            else if (this.filter == '3') { // eth
                return this.lockedSavings.filter(item => item.currencyname == 'ETH')
            }
            else if (this.filter == '4') { // usdt
                return this.lockedSavings.filter(item => item.currencyname == 'USDT')
            }
            else if (this.filter == '5') { // qtc
                return this.lockedSavings.filter(item => item.currencyname == 'QTC')
            }
            else {
                if (this.searchvalue != '') {
                    const filtered = _self.lockedSavings.filter(function (item) {
                        const str = item.currencyname.toLowerCase();
                        return str.indexOf(_self.searchvalue.toLowerCase()) !== -1;
                    });
                    return filtered
                }
                else {
                    return this.lockedSavings;
                }

            }
        },
        filteredFlexibleSavings() {
            const _self = this;
            if (this.filter == '2') {
                return this.flexibleSavings.filter(item => item.currencyname == 'BTC')
            }
            else if (this.filter == '3') {
                return this.flexibleSavings.filter(item => item.currencyname == 'ETH')
            }
            else if (this.filter == '4') {
                return this.flexibleSavings.filter(item => item.currencyname == 'USDT')
            }
            else if (this.filter == '5') {
                return this.flexibleSavings.filter(item => item.currencyname == 'QTC')
            }
            else {
                if (this.searchvalue != '') {
                    const filtered = _self.flexibleSavings.filter(function (item) {
                        const str = item.currencyname.toLowerCase();
                        return str.indexOf(_self.searchvalue.toLowerCase()) !== -1;
                    });
                    return filtered
                }
                else {
                    return this.flexibleSavings;
                }

            }
        },
        filteredHybridFinancing() {
            const _self = this;
            if (this.filter == '2') {
                return this.hybridFinancing.filter(item => item.currencyname == 'BTC')
            }
            else if (this.filter == '3') {
                return this.hybridFinancing.filter(item => item.currencyname == 'ETH')
            }
            else if (this.filter == '4') {
                return this.hybridFinancing.filter(item => item.currencyname == 'USDT')
            }
            else if (this.filter == '5') {
                return this.hybridFinancing.filter(item => item.currencyname == 'QTC')
            }
            else {
                if (this.searchvalue != '') {
                    const filtered = _self.hybridFinancing.filter(function (item) {
                        const str = item.currencyname.toLowerCase();
                        return str.indexOf(_self.searchvalue.toLowerCase()) !== -1;
                    });
                    return filtered
                }
                else {
                    return this.hybridFinancing;
                }

            }
        },
        filteredLockedHybridFinancing() {
            const _self = this;
            if (this.filter == '2') {
                return this.lockedHybridFinancing.filter(item => item.currencyname == 'BTC')
            }
            else if (this.filter == '3') {
                return this.lockedHybridFinancing.filter(item => item.currencyname == 'ETH')
            }
            else if (this.filter == '4') {
                return this.lockedHybridFinancing.filter(item => item.currencyname == 'USDT')
            }
            else if (this.filter == '5') {
                return this.lockedHybridFinancing.filter(item => item.currencyname == 'QTC')
            }
            else {
                if (this.searchvalue != '') {
                    const filtered = _self.lockedHybridFinancing.filter(function (item) {
                        const str = item.currencyname.toLowerCase();
                        return str.indexOf(_self.searchvalue.toLowerCase()) !== -1;
                    });
                    return filtered
                }
                else {
                    return this.lockedHybridFinancing;
                }

            }
        }
    },
    data() {
        return {
            current: 2,
            loading: true,
            lockedSavings: [],
            flexibleSavings: [],
            lockedHybridFinancing: [],
            hybridFinancing: [],
            allIcons: [],
            lang: this.$store.state.hex_lang.locale,
            tab: "1",
            filter: "1",
            searchvalue: '',
            tradingRequirements: false,
            progress: 0,
            testString: 0,
            testStringHybrid: 0,
            totalAssets: 0,
            previousDayProfit: 0,
            lastMonthProfit: 0,
            status: ['Created', 'Ongoing', 'Ended'],
            model: false,
            isVerification: false,
            activities: [{
                content: this.$t("subscriptio.sub25"),
                timestamp: '2018-04-15'
            }, {
                content: this.$t("subscriptio.sub26"),
                timestamp: '2018-04-13'
            }, {
                content: this.$t("subscriptio.sub27"),
                timestamp: '2018-04-11'
            }],
            userAssets: [],
            locked_saving_currency: '',
            locked_canuse_amount: 0,
            tradeAmount: 0,
            locked_saving_cycle: 0,
            activeProduct: 0,
            item_index: 0,
            hybrid_currency: '',
            dailyRate: 0,
            yearlyRate: 0,
            firstCurrencyName: '',
            secondCurrencyName: '',
            activeHybridDetail: 0,
            userAssetsDetail: [],
            purchaseProductID: "0",
            purchaseVerificationArea: 1,
            currencyID: 0,
            verificationTab: 0,
            paymentVerificationCode: '',
            phoneVerificationCode: '',
            emailVerificationCode: '',
            googleVerificationCode: '',
            minTradeAmount: 0,
            maxTradeAmount: 10,
            message: '',
            messageCode: '',
            dateNow: '',
            tenure: '',
            icon: '',
        }
    },
    methods: {
        getUserAssets() {
            if (this.$userinfo.uid) {
                this.$store.dispatch('get_user_finance_assets').then(({ data }) => {
                    if (data) {
                        this.totalAssets = data.totalasset;
                        this.previousDayProfit = data.financialasset;
                        this.lastMonthProfit = data.totalincome;
                    }
                })
            }
        },
        goTo(link) {
            this.$router.push(link)
        },
        close() {
            this.$refs.verification.reset();
            this.$refs.subscription.reset();
            this.model = false;
            this.isVerification = false;
        },
        termChange(item_index, i) {
            console.log('termchange', i)
            let obj = this.filteredLockedSavings[item_index];
            this.$set(obj, 'activeProduct', i);
            this.$set(obj, 'activeStatus', i);
            this.testString = i;
        },
        termChangeHybrid(item_index, i) {
            let obj = this.filteredLockedHybridFinancing[item_index];
            this.$set(obj, 'activeProduct', i);
            this.$set(obj, 'activeStatus', i);
            this.testStringHybrid = i;
        },
        getLockedSavings() {
            this.$store.dispatch('get_financial_products', {
                type: 0
            }).then((data) => {
                let length = data.data.length;
                for (let i = 0; i < length; i++) {
                    data.data[i].products.sort((a, b) => b.cycle - a.cycle);
                }
                let tempVar = data.data
                const currenciesColors = this.$store.state.currenciesColors
                this.lockedSavings = tempVar.map((item) => {
                    return {
                        ...item,
                        color: currenciesColors[item.currencyname]
                    }
                });
                this.loading = false;
            })
        },
        getFlexibleSavings() {
            this.$store.dispatch('get_financial_products', {
                type: 1
            }).then((data) => {
                let length = data.data.length;
                for (let i = 0; i < length; i++) {
                    data.data[i].products.sort((a, b) => b.cycle - a.cycle);
                }
                let tempVar = data.data;
                const currenciesColors = this.$store.state.currenciesColors

                this.flexibleSavings = tempVar.map((item) => {
                    return {
                        ...item,
                        color: currenciesColors[item.currencyname]
                    }
                });
            })
        },
        getLockedHybridFinancing() {
            this.$store.dispatch('get_financial_products', {
                type: 2
            }).then((data) => {
                let length = data.data.length;
                for (let i = 0; i < length; i++) {
                    data.data[i].products.sort((a, b) => b.cycle - a.cycle);
                }
                let tempVar = data.data; 
                const currenciesColors = this.$store.state.currenciesColors

                this.lockedHybridFinancing = tempVar.map((item) => {
                    return {
                        ...item,
                        color: currenciesColors[item.currencyname]
                    }
                });
            })
            this.getUserAssetsDetail("", this.locked_saving_currency);

        },
        getHybridFinancing() {
            this.$store.dispatch('get_financial_products', {
                type: 3
            }).then((data) => {
                let length = data.data.length;
                for (let i = 0; i < length; i++) {
                    data.data[i].products.sort((a, b) => b.cycle - a.cycle);
                }
                let tempVar = data.data;
                const currenciesColors = this.$store.state.currenciesColors
                this.hybridFinancing = tempVar.map((item) => {
                    return {
                        ...item,
                        color: currenciesColors[item.currencyname]
                    }
                });
            })
            this.getUserAssetsDetail("", this.locked_saving_currency);
        },
        getAllIcons() {
            this.allIcons = this.$store.state.currencyinfos;
        },
        subscriptionBtnModel(modelID, currency_name, activeProduct, item_index) {
            // if (this.$userinfo.securitylevel < 2) {
            //     this.tradingRequirements = true;
            //     return;
            // }

            if (this.$userinfo.uid) {
                this.model = true;
                if (modelID == 1) {
                    this.locked_saving_currency = currency_name;
                    this.getUserAssetsDetail(this.locked_saving_currency, "", item_index, activeProduct, modelID);
                    this.locked_saving_cycle = this.filteredLockedSavings[item_index].products[activeProduct].cycle;
                    this.dailyRate = this.filteredLockedSavings[item_index].products[activeProduct].dailyrate;
                    this.yearlyRate = this.filteredLockedSavings[item_index].products[activeProduct].yearlyrate * 100;
                    this.purchaseProductID = this.filteredLockedSavings[item_index].products[activeProduct].id;
                    this.tenure = this.filteredLockedSavings[item_index].products[activeProduct].cycle;
                    this.icon = this.filteredLockedSavings[item_index].currencyicon;

                    let subscriptionDate = new Date();
                    let interestAccuringDate = new Date();
                    let earnGainDate = new Date();

                    subscriptionDate = subscriptionDate.getFullYear() + "-" + (subscriptionDate.getMonth() + 1) + "-" + subscriptionDate.getDate();

                    interestAccuringDate.setDate(interestAccuringDate.getDate() + 1);
                    interestAccuringDate = interestAccuringDate.toISOString().substr(0, 10);

                    earnGainDate.setDate(earnGainDate.getDate() + this.locked_saving_cycle);
                    earnGainDate = earnGainDate.toISOString().substr(0, 10);

                    this.activities[0].timestamp = subscriptionDate;
                    this.activities[1].timestamp = interestAccuringDate;
                    this.activities[2].timestamp = earnGainDate;
                }
                else {
                    if (modelID == 2) {
                        this.locked_saving_currency = currency_name;
                        this.getUserAssetsDetail(this.locked_saving_currency, "", item_index, activeProduct, modelID);
                        this.locked_saving_cycle = this.filteredFlexibleSavings[item_index].products[activeProduct].cycle;
                        this.dailyRate = this.filteredFlexibleSavings[item_index].products[activeProduct].dailyrate;
                        this.yearlyRate = this.filteredFlexibleSavings[item_index].products[activeProduct].yearlyrate * 100;
                        this.purchaseProductID = this.filteredFlexibleSavings[item_index].products[activeProduct].id;
                        this.tenure = this.filteredFlexibleSavings[item_index].products[activeProduct].cycle;
                        this.icon = this.filteredFlexibleSavings[item_index].currencyicon;
                        let subscriptionDate = new Date();
                        let interestAccuringDate = new Date();
                        let earnGainDate = new Date();

                        subscriptionDate = subscriptionDate.getFullYear() + "-" + (subscriptionDate.getMonth() + 1) + "-" + subscriptionDate.getDate();

                        interestAccuringDate.setDate(interestAccuringDate.getDate() + 1);
                        interestAccuringDate = interestAccuringDate.toISOString().substr(0, 10);

                        earnGainDate.setDate(earnGainDate.getDate() + 2);
                        earnGainDate = earnGainDate.toISOString().substr(0, 10);

                        this.activities[0].timestamp = subscriptionDate;
                        this.activities[1].timestamp = interestAccuringDate;
                        this.activities[2].timestamp = earnGainDate;
                    }
                }
            }
            else {
                this.$router.push({ path: '/login?returnurl=%2Ffinancial' });
            }
        },
        hybridSubscriptionBtnModel(modelID, currency_name, activeProduct, item_index) {
            if (this.$userinfo.securitylevel < 2) {
                this.tradingRequirements = true;
                return;
            }
            if (this.$userinfo.uid) {
                this.model = true;
                if (modelID == 3) {
                    this.locked_saving_currency = currency_name;
                    this.getUserAssetsDetail("", this.locked_saving_currency, item_index, activeProduct, modelID);
                    this.locked_saving_cycle = this.filteredLockedHybridFinancing[item_index].products[activeProduct].cycle;
                    this.dailyRate = this.filteredLockedHybridFinancing[item_index].products[activeProduct].dailyrate;
                    this.yearlyRate = this.filteredLockedHybridFinancing[item_index].products[activeProduct].yearlyrate * 100;
                    this.activeProduct = activeProduct;
                    this.item_index = item_index;
                    this.purchaseProductID = this.filteredLockedHybridFinancing[item_index].products[activeProduct].id;
                    this.tenure = this.filteredLockedHybridFinancing[item_index].products[activeProduct].cycle;
                    this.icon = this.filteredLockedHybridFinancing[item_index].currencyicon;
                    let subscriptionDate = new Date();
                    let interestAccuringDate = new Date();
                    let earnGainDate = new Date();

                    subscriptionDate = subscriptionDate.getFullYear() + "-" + (subscriptionDate.getMonth() + 1) + "-" + subscriptionDate.getDate();

                    interestAccuringDate.setDate(interestAccuringDate.getDate() + 1);
                    interestAccuringDate = interestAccuringDate.toISOString().substr(0, 10);

                    earnGainDate.setDate(earnGainDate.getDate() + this.locked_saving_cycle);
                    earnGainDate = earnGainDate.toISOString().substr(0, 10);

                    this.activities[0].timestamp = subscriptionDate;
                    this.activities[1].timestamp = interestAccuringDate;
                    this.activities[2].timestamp = earnGainDate;
                }
                else {
                    if (modelID == 4) {
                        this.locked_saving_currency = currency_name;
                        this.getUserAssetsDetail("", this.locked_saving_currency, item_index, activeProduct, modelID);
                        this.locked_saving_cycle = this.filteredHybridFinancing[item_index].products[activeProduct].cycle;
                        this.dailyRate = this.filteredHybridFinancing[item_index].products[activeProduct].dailyrate;
                        this.yearlyRate = this.filteredHybridFinancing[item_index].products[activeProduct].yearlyrate * 100;
                        this.activeProduct = activeProduct;
                        this.item_index = item_index;
                        this.purchaseProductID = this.filteredHybridFinancing[item_index].products[activeProduct].id;
                        this.tenure = this.filteredHybridFinancing[item_index].products[activeProduct].cycle;
                        this.icon = this.filteredHybridFinancing[item_index].currencyicon;

                        let subscriptionDate = new Date();
                        let interestAccuringDate = new Date();
                        let earnGainDate = new Date();

                        subscriptionDate = subscriptionDate.getFullYear() + "-" + (subscriptionDate.getMonth() + 1) + "-" + subscriptionDate.getDate();

                        interestAccuringDate.setDate(interestAccuringDate.getDate() + 1);
                        interestAccuringDate = interestAccuringDate.toISOString().substr(0, 10);

                        earnGainDate.setDate(earnGainDate.getDate() + 2);
                        earnGainDate = earnGainDate.toISOString().substr(0, 10);

                        this.activities[0].timestamp = subscriptionDate;
                        this.activities[1].timestamp = interestAccuringDate;
                        this.activities[2].timestamp = earnGainDate;
                    }
                }



            }
            else {
                this.$router.push({ path: '/login?returnurl=%2Ffinancial' });
            }
        },

        getUserAssetsDetail(token, symble, item_index, activeProduct, modelID) {
            if (token != "") {
                this.$store.dispatch('user_assets_uc_get', {
                    "token": token
                }).then((data) => {
                    this.userAssets = data.data;
                    this.locked_canuse_amount = data.data.list[0].canuseamount;
                    if (modelID == 1) {
                        this.minTradeAmount = this.filteredLockedSavings[item_index].products[activeProduct].minbuyamount;
                        this.maxTradeAmount = this.filteredLockedSavings[item_index].products[activeProduct].maxbuyamount-this.filteredLockedSavings[item_index].products[activeProduct].selledamount;
                    }
                    if (modelID == 2) {
                        this.minTradeAmount = this.filteredFlexibleSavings[item_index].products[activeProduct].minbuyamount;
                        this.maxTradeAmount = this.filteredFlexibleSavings[item_index].products[activeProduct].maxbuyamount-this.filteredFlexibleSavings[item_index].products[activeProduct].selledamount;

                    }
                })
            }
            else if (this.$userinfo.uid) {
                this.$store.dispatch('user_assets_uc_get', {
                    "symble": symble
                }).then((data) => {
                    this.userAssets = data.data;
                    this.updateHybridDetail(0);
                    this.locked_canuse_amount = data.data.list[1].canuseamount;
                    this.firstCurrencyName = this.userAssets?.list[0].currency.currencyname;
                    this.secondCurrencyName = this.userAssets?.list[1].currency.currencyname;
                    this.hybrid_currency = this.secondCurrencyName;
                    if (modelID == 3) {
                        this.minTradeAmount = this.filteredLockedHybridFinancing[item_index].products[activeProduct].minbuyamount;
                        this.maxTradeAmount = this.filteredLockedHybridFinancing[item_index].products[activeProduct].maxbuyamount-this.filteredLockedHybridFinancing[item_index].products[activeProduct].selledamount;
                    }
                    if (modelID == 4) {
                        this.minTradeAmount = this.filteredHybridFinancing[item_index].products[activeProduct].minbuyamount;
                        this.maxTradeAmount = this.filteredHybridFinancing[item_index].products[activeProduct].maxbuyamount-this.filteredHybridFinancing[item_index].products[activeProduct].selledamount;

                    }
                })
            }
        },
        updateHybridDetail(id) {
            this.currencyID = id;
            this.activeHybridDetail = this.currencyID;
            this.locked_canuse_amount = this.userAssets.list[id == 0 ? 1 : 0].canuseamount;
            this.hybrid_currency = this.userAssets.list[id == 0 ? 1 : 0].currency.currencyname;
        },
        getNowTime() {
            this.filter = '1';
            this.searchvalue = '';
            this.$store.dispatch('com_test').then(({ data }) => {
                if (data) {
                    this.dateNow = data.utcnow;
                }
            })
        },
        refresh() {
            switch (this.tab) {
                case '1':
                    this.getLockedSavings();
                    break;
                case '2':
                    this.getFlexibleSavings();
                    break;
                case '3':
                    this.getLockedHybridFinancing();
                    break;
                case '4':
                    this.getHybridFinancing();
                    break;
            }
            this.$refs.profitCard.getUserAssets();
        },
        closeModel() {
            this.model = 0;
            this.tradeAmount = 0;
        },
        purchasePackage(amount) {
            this.tradeAmount = parseFloat(amount);
            this.model = false;
            this.isVerification = true;
        },
        subscribePakcage() {
            let amount = 0;
            let tamount = 0;
            if (this.currencyID == 0) {
                amount = this.tradeAmount;
            }
            else {
                tamount = this.tradeAmount;
            }
            let data = [
                {
                    "productID": this.purchaseProductID,
                    "amount": amount,
                    "tAmount": tamount,
                }
            ]

            if (this.paymentVerificationCode) {
                data.payPassword = crypto.md5String(this.paymentVerificationCode)
            }
            else if (this.googleVerificationCode) {
                data.googleVerifyCode = this.googleVerificationCode
            }
        }
    },
    mounted() {
        if (this.$userinfo.isopenpaypassword) {
            this.verificationTab = 0;
        }
        else {
            if (this.$userinfo.isgoogleauthed) {
                this.verificationTab = 1;
            }
        }
        this.getNowTime();
        this.getAllIcons();
        this.getFlexibleSavings();
        this.getLockedHybridFinancing();
        this.getHybridFinancing();
        this.getLockedSavings();

        this.getUserAssets();

    },
}
</script>


