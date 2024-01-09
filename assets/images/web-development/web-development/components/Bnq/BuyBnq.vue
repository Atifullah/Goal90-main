<template>
    <div class="buy-bnq">
        <a-card class="buy-bnq-card mt-7">
            <a-form-model ref="convertForm" :model="input" :rules="setValidation.rules" :hide-required-mark="true"
                label-align="left">
                <a-row class=" mb-4 col-alignment">
                    <a-col :lg="10">
                        <p class="buy-bnq-title mb-0 text-black fw-5">{{ $t('person.buybnq') }}</p>
                    </a-col>
                    <a-col :lg="14" align="end">
                        <p class="fw-5 zero-fee mb-0">{{ global_get_tofixed(input.to * settings.rate,
                            global_get_decimal(currencyTo).a) }} {{ $t('contract.feerate') }}</p>
                    </a-col>
                </a-row>
                <a-card class="gray-card" :bordered="false">
                    <a-row class="mb-3">
                        <a-col :lg="8">
                            <p class="fw-4 buy-text mb-0">{{ $t('legalTrad.Pay') }} </p>
                        </a-col>
                        <a-col :lg="16" align="end">
                            <p class="fw-4 buy-text mb-0">{{ $t('person.holding') }}: {{ canUseFrom }}</p>
                        </a-col>
                    </a-row>
                    <AppFormModelItem prop="from">
                        <a-input class="buy-bnq-input" type="number" v-model="input.from"
                            :placeholder="`${fminamount}-${fmaxamount}`" @change="onFromChange">
                            <p class="mb-0 ustd-list" slot="suffix">
                                <img src="/images/ustd-icon.svg" class="mr-2" height="20px" />USDT
                            </p>
                        </a-input>
                    </AppFormModelItem>
                </a-card>
                <p class="my-3 bnq-center-txt fw-5">1 BNQ = {{ bnqRate }} USDT </p>
                <a-card class="gray-card" :bordered="false">
                    <a-row class="mb-3">
                        <a-col :lg="8">
                            <p class="fw-4 buy-text mb-0">{{ $t('legalTrad.Buy') }}</p>
                        </a-col>
                        <a-col :lg="16" align="end">
                            <p class="fw-4 buy-text mb-0">{{ $t('legalTrad.Available') }}: {{ canUseTo }}</p>
                        </a-col>
                    </a-row>
                    <AppFormModelItem prop="to">
                        <a-input class="buy-bnq-input" type="number" v-model="input.to"
                            :placeholder="`${tminamount}-${tmaxamount}`" @change="onToChange">
                            <p class="mb-0 ustd-list" slot="suffix">
                                <img src="/images/bnq.png" class="mr-2" height="20px" />BNQ
                            </p>
                        </a-input>
                    </AppFormModelItem>
                </a-card>
                <a-row>
                    <a-col :lg="24">
                        <a-button class="primary-btn buy-bnq-btn" block @click="PreviewConversion">
                            {{ loggedIn ? 'Buy BNQ' : $t('public.ph27') }}
                        </a-button>
                        <p class="note mb-0 mt-2"><span> {{ $t('person.Note_person') }}:</span> {{ $t('person.bnqnote') }}</p>
                    </a-col>
                </a-row>
            </a-form-model>
        </a-card>
        <Subscription ref="subscription" :purchasePackage="purchasePackage" :minTradeAmount="minTradeAmount"
            :maxTradeAmount="maxTradeAmount" tab="1" :model="model" :close="close"
            :locked_saving_currency="locked_saving_currency" :yearlyRate="yearlyRate"
            :locked_canuse_amount="locked_canuse_amount" :dailyRate="dailyRate" :tradeAmount="tradeAmount"
            :activities="activities" :firstCurrencyName="firstCurrencyName" :secondCurrencyName="secondCurrencyName"
            :hybrid_currency="hybrid_currency" :activeHybridDetail="activeHybridDetail"
            :updateHybridDetail="updateHybridDetail" :tenure="tenure" :icon="icon" />

        <ConfirmBuyBnq ref="success" :show="showBuyBnqModal" :convert-data="convertData" :fee="settings.rate"
            :PreviewConversion="PreviewConversion" :init="init"
            :rate="`1 ${settings.fname.toUpperCase()} = ${bnqRate} ${settings.tname.toUpperCase()} `"
            @close="showBuyBnqModal = false" @assetConverted="onSuccess" />
        <ConversionSuccessful :successfulModal="successfulModal" @close="successfulModal = false"
            @proceed="proceedSubscription" :item="lockedSaving" :conversionObj="conversionObj"
            :subscriptionBtnModel="subscriptionBtnModel" v-if="successfulModal" />

        <VerificationDetail ref="verification" :close="close" :isVerification="isVerification"
            :subscribePakcage="subscribePakcage" :purchaseProductID="purchaseProductID" :currencyID="currencyID"
            :tradeAmount="tradeAmount" :refresh="refresh" />

    </div>
</template>

<script>
import AppFormModelItem from '../App/AppFormModelItem.vue'
import Subscription from '../financial/SubscriptionModal/Subscription.vue';
import VerificationDetail from '../financial/SubscriptionModal/VerificationDetail.vue';
import ConfirmBuyBnq from './BuyBnqSuccessModal.vue';
import ConversionSuccessful from './ConversionSuccessful.vue';

export default {
    name: 'BuyBnq',
    components: { AppFormModelItem, ConfirmBuyBnq, ConversionSuccessful, Subscription, VerificationDetail },
    data() {
        return {
            showBuyBnqModal: false,
            assets: [],
            flashData: [],
            bnqObject: {},
            fminamount: '0',
            fmaxamount: '0',
            tminamount: '0',
            tmaxamount: '0',
            currencyFrom: 'USDT',
            currencyTo: 'BNQ',
            model: false,
            firstCurrencyName: '',
            secondCurrencyName: '',
            purchaseProductID: "0",
            hybrid_currency: '',
            successfulModal: false,
            convertData: null,
            lockedSaving: {},
            lockedSavings: [],
            userAssets: [],
            conversionObj: {
                from: '',
                to: '',
            },
            tradeAmount: 0,
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
            minTradeAmount: 0,
            maxTradeAmount: 10,
            activeHybridDetail: 0,
            tab: "1",
            isVerification: false,
            loadingLockedSavings: false,
            yearlyRate: 0,
            dailyRate: 0,
            currencyID: 0,
            locked_saving_currency: 'BNQ',
            locked_canuse_amount: 0,
            settings: {
                fname: '',
                tname: '',
            },
            input: {
                from: '',
                to: '',
            },
            tenure: '',
            icon: '',
            preview: false,
            setValidation: {
                rules: {
                    from: [
                        {
                            required: true,
                            message: this.$t('messages.msg16'),
                        },
                        {
                            validator: async (rule, value, callback) => {
                                if (this.input.from === '') {
                                    callback(new Error(this.$t('messages.msg16')));
                                }
                                else {
                                    if (parseFloat(this.input.from) < this.fminamount) {
                                        callback(new Error(`${this.$t('errors.err1')} ${this.fminamount}`));
                                    }
                                    else if (parseFloat(this.input.from) > this.fmaxamount) {
                                        callback(new Error(`${this.$t('errors.err2')} ${this.fmaxamount}`));
                                    }
                                    else if (parseFloat(this.input.from) > this.canUseFrom) {
                                        callback(new Error(`${this.$t('errors.err3')}`));
                                    }
                                    else {
                                        callback();
                                    }
                                }
                            },
                            trigger: 'blur',
                        },
                    ],
                    to: [
                        {
                            validator: async (rule, value, callback) => {
                                if (this.input.to === '') {
                                    callback(new Error(this.$t('messages.msg16')));
                                }
                                else {
                                    if (parseFloat(this.input.to) < this.tminamount) {
                                        callback(new Error(`
                                        ${this.$t('errors.err1')} ${this.tminamount}`));
                                    }
                                    else if (parseFloat(this.input.to) > this.tmaxamount) {
                                        callback(new Error(`${this.$t('errors.err2')} ${this.tmaxamount}`));
                                    }
                                    else {
                                        callback();
                                    }
                                }
                            },
                            trigger: 'blur',
                        },
                    ],
                },
            },
        };
    },
    watch: {
        loggedIn: function (val) {
            if (val == true) {
                this.getAssets()
            }
        }
    },
    computed: {
        loggedIn() {
            return this.$userinfo.uid != undefined;
        },
        canUseFrom() {
            const _self = this;
            const token = this.assets.filter(item => item.currency.currencyname == this.currencyFrom);
            if (token.length > 0) {
                return _self.cutZero(_self.global_get_tofixed(token[0].canuseamount, _self.global_get_decimal(this.currencyFrom).a));
            }
            else {
                return 0;
            }
        },
        canUseTo() {
            const _self = this;
            const token = this.assets.filter(item => item.currency.currencyname == this.currencyTo);
            if (token.length > 0) {
                return _self.cutZero(_self.global_get_tofixed(token[0].canuseamount, _self.global_get_decimal(this.currencyTo).a));
            }
            else {
                return 0;
            }
        },
        bnqRate() {
            return this.$store.getters.get_exchange_rate_by_name(this.currencyTo, 'USDT')
        }
    },
    methods: {
        init() {
            this.$store.dispatch('user_flash_exchange_settings_get').then((flashData) => {
                this.flashData = flashData.data;
                this.bnqObject = flashData.data.find((flash) => flash.fname.toLowerCase() == 'bnq');
                console.log('userinfo', this.$userinfo);
                if (this.loggedIn) {
                    this.getAssets();
                }
                else {
                    this.assets = this.$store.state.currencyinfos.filter((currency) => currency.currencyname.toLowerCase() == 'bnq').map((item) => {
                        const cname = item.currencyname.toLowerCase();
                        for (let i = 0; i < this.flashData.length; i++) {
                            if (cname == this.flashData[i].fname ||
                                cname == this.flashData[i].tname) {
                                return { currency: item };
                            }
                        }
                    });
                    if (this.assets.length > 0) {
                        if (this.currencyFrom == undefined) {
                            const from = this.assets.find((asset) => asset.currency.currencyname == 'USDT');
                            this.currencyFrom = from ? from.currency.currencyname : 'USDT';
                        }
                        this.getConvertTo(this.currencyTo);
                    }
                }
            });
        },
        async getAssets() {
            try {
                this.$store.dispatch('user_assets_uc_get', { assetstype: 1 }).then(({ data }) => {
                    if (data) {
                        this.assets = data.list.filter((assess) => {
                            const cname = assess.currency.currencyname.toLowerCase();
                            for (let i = 0; i < this.flashData.length; i++) {
                                if (cname == this.flashData[i].fname ||
                                    cname == this.flashData[i].tname) {
                                    return assess;
                                }
                            }
                        });
                        if (this.assets.length > 0) {
                            // [0].currency.currencyname
                            const from = this.assets.find((asset) => asset.currency.currencyname == 'USDT');
                            this.currencyFrom = from ? from.currency.currencyname : 'USDT';
                            this.getConvertTo(this.currencyTo);
                        }
                    }
                });
            }
            catch (error) {
                //console.log('Error', error)
            }
        },
        getConvertTo(val) {
            const cname = this.currencyFrom.toLowerCase();
            const array = [];
            this.flashData.filter((_d) => {
                if (_d.fname == cname) {
                    array.push(_d.tname);
                }
                else if (_d.tname == cname) {
                    array.push(_d.fname);
                }
            });
            this.convertToAssets = this.assets.filter((_a) => {
                const assetCName = _a.currency.currencyname.toLowerCase();
                for (let i = 0; i < array.length; i++) {
                    if (assetCName == array[i]) {
                        return _a;
                    }
                }
            });
            if (val) {
                this.currencyTo = val;
            }
            else {
                this.currencyTo = this.convertToAssets[0]?.currency.currencyname;
            }
            this.getMinMaxAmount();
        },
        getMinMaxAmount() {
            // this.input.from = '';
            // this.input.to = '';
            const cFrom = this.currencyFrom.toLowerCase();
            const cTo = this.currencyTo.toLowerCase();
            const settings = this.flashData.filter((_d) => {
                if ((cFrom == _d.fname && cTo == _d.tname) ||
                    (cFrom == _d.tname && cTo == _d.fname)) {
                    return _d;
                }
            })[0];
            this.settings = settings;
            if (settings.fname == cFrom) {
                this.fminamount = this.cutZero(this.global_get_tofixed(settings.minamount, this.global_get_decimal(cFrom).a));
                this.fmaxamount = this.cutZero(this.global_get_tofixed(settings.maxamount, this.global_get_decimal(cFrom).a));
                this.tminamount = this.cutZero(this.currencyConverter(settings.minamount, cFrom, cTo));
                this.tmaxamount = this.cutZero(this.currencyConverter(settings.maxamount, cFrom, cTo));
            }
            else {
                this.fminamount = this.cutZero(this.currencyConverter(settings.minamount, cTo, cFrom));
                this.fmaxamount = this.cutZero(this.currencyConverter(settings.maxamount, cTo, cFrom));
                this.tminamount = this.cutZero(this.global_get_tofixed(settings.minamount, this.global_get_decimal(cTo).a));
                this.tmaxamount = this.cutZero(this.global_get_tofixed(settings.maxamount, this.global_get_decimal(cTo).a));
            }
            this.tab = '0';
        },
        currencyConverter(amount, cFrom, cTo) {
            const amt = this.$store.getters.get_exchange_rate_by_name(cFrom, 'USDT') * parseFloat(amount) / this.$store.getters.get_exchange_rate_by_name(cTo, 'USDT');
            return this.global_get_tofixed(amt, this.global_get_decimal(cTo).a);
        },
        onFromChange() {
            const val = this.input.from;
            if (val != '') {
                const amt = this.$store.getters.get_exchange_rate_by_name(this.currencyFrom, 'USDT') * parseFloat(this.input.from) / this.$store.getters.get_exchange_rate_by_name(this.currencyTo, 'USDT');
                this.input.to = this.cutZero(amt.toFixed(this.global_get_decimal(this.currencyTo).a));
            }
            else {
                this.input.to = '';
            }
        },
        onToChange() {
            const val = this.input.to;
            if (val != '') {
                const amt = this.$store.getters.get_exchange_rate_by_name(this.currencyTo, 'USDT') * parseFloat(this.input.to) / this.$store.getters.get_exchange_rate_by_name(this.currencyFrom, 'USDT');
                this.input.from = this.cutZero(this.global_get_tofixed(amt, this.global_get_decimal(this.currencyFrom).a));
            }
            else {
                this.input.from = '';
            }
        },
        async PreviewConversion() {
            if (this.loggedIn) {
                await this.$refs['convertForm'].validate(async (valid) => {
                    if (valid) {
                        try {
                            const { data } = await this.$store.dispatch('user_flash_convert_get', {
                                fName: this.currencyFrom,
                                tName: this.currencyTo,
                                fAmount: this.input.from,
                            });
                            this.convertData = data;
                            this.showBuyBnqModal = true;
                            this.$refs['success'].startTimer();
                        }
                        catch (error) {
                            //console.log(error)
                        }
                    }
                });
            }
            else {
                this.$router.push('/login?returnurl=' + this.$route.path);
            }
        },
        getFinancialData() {
            this.loadingLockedSavings = true
            this.$store.dispatch('get_financial_products', {
                type: 0
            }).then((data) => {
                let length = data.data.length
                for (let i = 0; i < length; i++) {
                    data.data[i].products.sort((a, b) => b.cycle - a.cycle)
                }
                const tempVar = data.data.filter((saving) => saving.currencyname.toLowerCase() == 'bnq')
                const currenciesColors = this.$store.state.currenciesColors
                const lockedSavings = tempVar.map((item) => {
                    return {
                        ...item,
                        color: currenciesColors[item.currencyname]
                    }
                });
                this.lockedSaving = lockedSavings.length > 0 ? lockedSavings[0] : {}
                this.lockedSavings = lockedSavings
                this.loadingLockedSavings = false;
            })
        },
        close() {
            this.$refs.subscription.reset()
            this.model = false
            this.isVerification = false
        },
        onSuccess() {
            this.conversionObj.from = this.input.from
            this.conversionObj.to = this.input.to
            this.input = {
                from: '',
                to: '',
            }
            this.successfulModal = true
        },
        proceedSubscription() {
            this.successfulModal = false
            console.log('proceedSubscription');
        },

        purchasePackage(amount) {
            this.tradeAmount = parseFloat(amount);
            this.isVerification = true;
            this.model = false;
        },
        getUserAssetsDetail(token, symble, item_index, activeProduct, modelID) {
            if (token != "") {
                this.$store.dispatch('user_assets_uc_get', {
                    "token": token
                }).then((data) => {
                    this.userAssets = data.data;
                    this.locked_canuse_amount = data.data.list[0].canuseamount;
                    if (modelID == 1) {
                        this.minTradeAmount = this.lockedSavings[item_index].products[activeProduct].minbuyamount;
                        this.maxTradeAmount = this.lockedSavings[item_index].products[activeProduct].maxbuyamount - this.lockedSavings[item_index].products[activeProduct].selledamount;
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
                        this.maxTradeAmount = this.filteredLockedHybridFinancing[item_index].products[activeProduct].maxbuyamount - this.filteredLockedHybridFinancing[item_index].products[activeProduct].selledamount;
                    }
                    if (modelID == 4) {
                        this.minTradeAmount = this.filteredHybridFinancing[item_index].products[activeProduct].minbuyamount;
                        this.maxTradeAmount = this.filteredHybridFinancing[item_index].products[activeProduct].maxbuyamount - this.filteredHybridFinancing[item_index].products[activeProduct].selledamount;

                    }
                })
            }
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
                    this.locked_saving_cycle = this.lockedSavings[0].products[activeProduct].cycle;
                    this.dailyRate = this.lockedSavings[0].products[activeProduct].dailyrate;
                    this.yearlyRate = this.lockedSavings[0].products[activeProduct].yearlyrate * 100;
                    this.purchaseProductID = this.lockedSavings[0].products[activeProduct].id;
                    this.tenure = this.lockedSavings[0].products[activeProduct].cycle;
                    this.icon = this.lockedSavings[0].currencyicon;

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

        updateHybridDetail(id) {
            this.currencyID = id;
            this.activeHybridDetail = this.currencyID;
            this.locked_canuse_amount = this.userAssets.list[id == 0 ? 1 : 0].canuseamount;
            this.hybrid_currency = this.userAssets.list[id == 0 ? 1 : 0].currency.currencyname;
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
        },

        refresh() {
            this.getFinancialData();
            // this.$refs.profitCard.getUserAssets();
        },
    },
    mounted() {
        this.init();
        this.getFinancialData()
    },
}
</script>

<style></style>