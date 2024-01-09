<template>
    <div>
        <!-- <a-row class="convert-bg">
            <a-col :lg="24" class="text-center">
                <p class="convert-heading mb-0">{{ $t('convert.con1') }} <br />{{ $t('convert.con8') }} </p>
            </a-col>
        </a-row> -->

        <div class="convert-bg">
            <div class="main-content">
                <a-row :gutter="16" class="mt-3">
                    <a-col :lg="14" :xl="15">
                        <a-card class="left-side-card" :bordered="false">
                            <a-row v-if="!bnqDetail.showChart && (fromIsBnq || toIsBnq)">
                                <a-col :lg="24">
                                    <p class="mb-2 text-black main-heading fw-5">{{ $t('bnq.bnq') }}</p>
                                    <p class="bnq-desc mb-4 text-black fw-4">{{ $t('bnq.bnq_intro') }}</p>
                                    <!-- <a-button class="white-paper primary-btn px-4">WHITEPAPER</a-button> -->
                                    <p class="text-black main-heading fw-5 mb-1 mt-4">{{ $t('bnq.bnq_benefit') }}</p>
                                    <p class="bnq-desc mb-0 text-black fw-4"> {{ $t('bnq.bnq_benifit_desc') }} </p>
                                    <a-row>
                                        <a-col :lg="12" v-for="(list, key) in getBnqList" :key="key" class="mt-4 pr-2">
                                            <a-row :gutter="16" class="col-alignment">
                                                <a-col :lg="4"><img :src="list.img" /></a-col>
                                                <a-col :lg="18">
                                                    <!-- <p class="bnq-desc text-black fw-5 mb-2">{{ list.title }}</p> -->
                                                    <p class="text-black mb-0">{{ list.desc }}</p>
                                                </a-col>
                                            </a-row>
                                        </a-col>
                                    </a-row>
                                </a-col>
                            </a-row>
                            <template v-else>
                                <a-row :gutter="16" class="col-alignment mt-2">
                                    <a-col :lg="24">
                                        <p v-show="currencyFrom" class="currency-heading fw-7 mb-0 col-alignment">
                                            {{ `${currencyFrom}/${currencyTo}` }}
                                            <span class="currency-sub-heading fw-7 ml-2" v-show="settings.fname">{{ `1
                                                ${settings.fname.toUpperCase()} = ${equalsTo}
                                                                                            ${settings.tname.toUpperCase()} ` }}</span>
                                        </p>
                                    </a-col>
                                </a-row>

                                <a-row :gutter="16" class="mt-1">
                                    <a-col :lg="24">
                                        <p v-show="settings.fname" class="heading2 fw-5 mb-0 col-alignment">
                                            {{ ` ${equalsTo}` }}
                                            <span class="busd-heading fw-5 red-active pl-3">
                                                {{ $t('legalSet.past') }} </span><span class="busd-heading fw-5 ml-1">{{
                                                    tab == '0' ? '5 Min' : tab == '1' ? '30 Min' : '1 Hour'
                                                }}</span>
                                        </p>
                                    </a-col>
                                </a-row>
                                <a-row :gutter="16" class="mb-5">
                                    <a-col :lg="24" align="end">
                                        <a-tabs v-model="tab" @change=changeTab class="graph2-tabs">
                                            <a-tab-pane key="0" tab="5 Min"> </a-tab-pane>
                                            <a-tab-pane key="1" tab="30 Min"> </a-tab-pane>
                                            <a-tab-pane key="2" tab="1 Hour"> </a-tab-pane>
                                        </a-tabs>
                                    </a-col>
                                    <a-col :lg="24">
                                        <div id="Chart" class="currency-curve">
                                            <div id="echarts" class="echarts"></div>
                                        </div>
                                    </a-col>
                                </a-row>
                            </template>

                        </a-card>
                    </a-col>
                    <a-col :lg="10" :xl="9">
                        <a-card class="right-side-card" :bordered="false">
                            <a-row :gutter="16" class="mb-3">
                                <a-col :lg="12">
                                    <p class="convert-heading fw-5 mb-0">{{ $t('convert.con3') }}</p>
                                </a-col>
                                <a-col :lg="12" align="end" v-if="$userinfo.uid">
                                    <span @mouseover="hoverKey = 2" @mouseleave="hoverKey = -1">
                                        <a-button class="outline-btn fw-5"
                                            @click="() => $router.push('/person/convert-history')"><img
                                                :src="hoverKey == 2 ? '/images/history-active.svg' : '/images/history.svg'"
                                                class="mr-2 mb-1" />{{
                                                    $t('convert.con_hist') }}</a-button>
                                    </span>
                                </a-col>
                            </a-row>
                            <!-- <a-card class="left-orange-card"> -->
                            <a-form-model ref="convertForm" :model="input" :rules="setValidation.rules"
                                :hide-required-mark="true" label-align="left">
                                <a-card class="from-card">
                                    <a-row :gutter="16" class="mb-3">
                                        <a-col :lg="8">
                                            <p class="mb-0 from-heading fw-7">
                                                {{ $t('convert.con_from') }}
                                            </p>
                                        </a-col>
                                        <a-col :lg="16" align="end">
                                            <p class="from-heading fw-7 mb-0" v-if="$userinfo.uid">
                                                {{ $t('convert.con_bal') }}{{ canUseFrom }} {{ currencyFrom }}
                                            </p>
                                        </a-col>
                                    </a-row>
                                    <a-row :gutter="16" class="col-alignment">
                                        <a-col :lg="24">
                                            <a-form-model-item has-feedback prop="from" :colon="false" :wrapper-col="{
                                                xl: 24,
                                                lg: 24,
                                                md: 24,
                                                sm: 24,
                                                xs: 24,
                                            }">
                                                <a-input type="number" v-model="input.from"
                                                    :placeholder="`${fminamount}-${fmaxamount}`" @change="onFromChange">
                                                    <div slot="suffix" class="ustd-list">
                                                        <a-select dropdownClassName="common-convert-drop"
                                                            v-model="currencyFrom" :loading="assets.length == 0"
                                                            @change="getConvertTo('')">
                                                            <a-select-option v-for="item in assets" :key="item.assetsid"
                                                                :title="item.currency.currencyname"
                                                                :value="item.currency.currencyname">
                                                                <span style="display: flex; align-items: center"><img
                                                                        :src="item.currency.icon"
                                                                        style="height: auto;width: 20px;margin-right: 7px;" />
                                                                    {{ item.currency.currencyname }}</span>
                                                            </a-select-option>
                                                        </a-select>
                                                    </div>
                                                </a-input>
                                            </a-form-model-item>
                                        </a-col>
                                    </a-row>
                                </a-card>
                                <a-row class="my-3">
                                    <a-col :lg="24" class="text-center">
                                        <!-- <img src="/images/convert-swap.svg" class="pointer" @click="swap"
                                            height="44px" /> -->
                                        <span @mouseover="hoverKey = 3" @mouseleave="hoverKey = -1">
                                            <img :src="hoverKey == 3 ? '/images/convert-swap-active.svg' : '/images/convert-swap.svg'"
                                                class="pointer" @click="swap" />
                                        </span>
                                    </a-col>
                                </a-row>
                                <a-card class="from-card mt-0">
                                    <a-row :gutter="16" class="mb-3">
                                        <a-col :lg="8">
                                            <p class="mb-0 from-heading fw-7">{{ $t('convert.con_to') }}</p>
                                        </a-col>
                                        <a-col :lg="16" align="end">
                                            <p class="from-heading fw-7 mb-0" v-if="$userinfo.uid">
                                                {{ $t('convert.con_bal') }}{{ canUseTo }} {{ currencyTo }}
                                            </p>
                                        </a-col>
                                    </a-row>
                                    <a-row :gutter="16" class="col-alignment">
                                        <a-col :lg="24">
                                            <a-form-model-item has-feedback prop="to" :colon="false" :wrapper-col="{
                                                xl: 24,
                                                lg: 24,
                                                md: 24,
                                                sm: 24,
                                                xs: 24,
                                            }">
                                                <a-input type="number" v-model="input.to"
                                                    :placeholder="`${tminamount}-${tmaxamount}`" @change="onToChange">

                                                    <div slot="suffix" class="ustd-list">
                                                        <a-select dropdownClassName="common-convert-drop"
                                                            v-model="currencyTo" :loading="convertToAssets.length == 0"
                                                            @change="getMinMaxAmount">
                                                            <a-select-option v-for="item in convertToAssets"
                                                                :key="item.assetsid" :label="item.currency.currencyname"
                                                                :value="item.currency.currencyname">
                                                                <span style="display: flex; align-items: center"><img
                                                                        :src="item.currency.icon"
                                                                        style="height: auto;width: 20px;margin-right: 7px;" />{{
                                                                            item.currency.currencyname }}</span>

                                                            </a-select-option>
                                                        </a-select>
                                                    </div>
                                                </a-input>
                                            </a-form-model-item>
                                        </a-col>
                                    </a-row>
                                </a-card>
                                <a-row :gutter="16">
                                    <a-col :lg="24">
                                        <a-divider class="usdt-divider fw-5">
                                            {{ `1 ${settings.fname.toUpperCase()} ≈ ${equalsTo}
                                                                                        ${settings.tname.toUpperCase()}` }}
                                        </a-divider>
                                    </a-col>
                                </a-row>
                                <a-row :gutter="16">
                                    <a-col :lg="10" :xl="10">
                                        <p class="mb-3 limit-price fw-5">{{ $t('convert.con4') }}</p>
                                        <p class="mb-3 limit-price fw-5">{{ $t('convert.con5') }}</p>
                                        <p class="mb-3 limit-price fw-5">{{ $t('convert.con6') }}</p>
                                    </a-col>
                                    <a-col :lg="14" :xl="14" align="end">
                                        <p class="single-limit-btc fw-5 mb-3">{{ fminamount }} - {{ fmaxamount }} {{
                                            currencyFrom
                                        }}</p>
                                        <p class="single-limit-btc fw-5 mb-3 green-fee">{{ cutZero(global_get_tofixed(input.to *
                                            settings.rate, global_get_decimal(currencyTo).a)) }} {{ currencyTo }}</p>
                                        <p class="single-limit-btc fw-5 mb-3">{{ cutZero(global_get_tofixed(input.to - (input.to *
                                            settings.rate), global_get_decimal(currencyTo).a)) }} {{ currencyTo }}</p>
                                    </a-col>
                                </a-row>
                                <a-row :gutter="16" class="">
                                    <a-col :lg="24" v-if="!bnqDetail.canSell && fromIsBnq">
                                        <p class="text-red">
                                            <i><b>{{ $t('person.Note_person') }}:</b></i>
                                            {{ $t('person.bnq_conversion_is_restricted', { date: bnqDetail.cantSellUntil })
                                            }}
                                        </p>
                                    </a-col>
                                    <a-col :lg="24" v-else>
                                        <a-button class="primary-btn fw-5" block @click="PreviewConversion">
                                            {{ $userinfo.uid ? $t('convert.con_now') : $t('public.ph27') }}</a-button>
                                    </a-col>
                                </a-row>
                            </a-form-model>
                        </a-card>
                    </a-col>
                </a-row>

                <a-card :bordered="false" class="mt-3 mb-5 financial-card">
                    <a-row class="">
                        <a-col :lg="24">
                            <Faqs :channelid="73" subtitle="convert_faqs" />
                        </a-col>
                    </a-row>
                </a-card>
            </div>
        </div>
        <Success ref="success" :model="model" :convert-data="convertData" :fee="settings.rate"
            :PreviewConversion="PreviewConversion" :init="init"
            :rate="`1 ${settings.fname.toUpperCase()} = ${equalsTo} ${settings.tname.toUpperCase()} `" :close="close" />
    </div>
</template>

<script>
let myChart, chartOption
import * as echarts from 'echarts'
import Success from './SuccessModal/Success.vue'
import Faqs from '@/components/public/Faqs.vue'
import BnqIntroduction from '../Bnq/BnqIntroduction.vue'
export default {
    name: 'commonconvert',
    components: {
        Success,
        Faqs,
        BnqIntroduction
    },
    computed: {
        canUseFrom() {
            const _self = this;
            const token = this.assets.filter(item => item.currency.currencyname == this.currencyFrom);
            if (token.length > 0) {
                return _self.global_get_tofixed(token[0].canuseamount, _self.global_get_decimal(this.currencyFrom).a)
            }
            else {
                return 0;
            }

        },
        canUseTo() {
            const _self = this;
            const token = this.assets.filter(item => item.currency.currencyname == this.currencyTo);
            if (token.length > 0) {
                return _self.global_get_tofixed(token[0].canuseamount, _self.global_get_decimal(this.currencyTo).a)
            }
            else {
                return 0;
            }
        },
        fromIsBnq() {
            return this.currencyFrom?.toLowerCase() == 'bnq'
        },
        toIsBnq() {
            return this.currencyTo?.toLowerCase() == 'bnq'
        },

        bnqRate() {
            return this.$store.getters.get_exchange_rate_by_name('BNQ', 'USDT')
        }
    },
    data() {
        return {
            bnqDetail: {
                showChart: false,
                canSell: false,
                cantSellUntil: '31-03-2024'
            },
            showBnqDataAtChart: false,
            assets: [],
            componentInterval: '',
            convertToAssets: [],
            flashData: [],
            currencyFrom: '',
            hoverKey: -1,
            currencyTo: '',
            fminamount: '0',
            fmaxamount: '0',
            tminamount: '0',
            tmaxamount: '0',
            model: false,
            convertData: null,
            settings: {
                fname: '',
                tname: '',
            },
            equalsTo: 0,
            tab: '0',
            echarts_ydatas: [],
            input: {
                from: '',
                to: '',
            },
            preview: false,
            getBnqList: [
                {
                    img: '/images/bnq1.svg',
                    title: this.$t('bnq.high_apy'),
                    desc: this.$t('bnq.high_apy_detail')
                },
                {
                    img: '/images/bnq6.svg',
                    title: this.$t('bnq.spot_discount'),
                    desc: this.$t('bnq.spot_discount_detail')
                },
                {
                    img: '/images/bnq2.svg',
                    title: this.$t('bnq.project_token'),
                    desc: this.$t('bnq.project_token_detail')
                },
                {
                    img: '/images/bnq7.svg',
                    title: this.$t('bnq.future_guard'),
                    desc: this.$t('bnq.future_guard_detail')
                },
                {
                    img: '/images/bnq3.svg',
                    title: this.$t('bnq.trade_bnq'),
                    desc: this.$t('bnq.trade_bnq_detail')
                },
                {
                    img: '/images/bnq8.svg',
                    title: this.$t('bnq.hold_bnq'),
                    desc: this.$t('bnq.hold_bnq_detail')
                },
                {
                    img: '/images/bnq4.svg',
                    title: this.$t('bnq.bnq_use'),
                    desc: this.$t('bnq.bnq_use_detail')
                },
                {
                    img: '/images/bnq9.svg',
                    title: this.$t('bnq.stake_bnq'),
                    desc: this.$t('bnq.stake_bnq_detail')
                },
                {
                    img: '/images/bnq5.svg',
                    title: this.$t('bnq.bnq_airdrop'),
                    desc: this.$t('bnq.bnq_airdrop_detail')
                },
            ],
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
                                    callback(new Error(this.$t('messages.msg16')))
                                } else {
                                    if (parseFloat(this.input.from) < this.fminamount) {
                                        callback(new Error(`${this.$t('errors.err1')} ${this.fminamount}`))
                                    }
                                    else if (parseFloat(this.input.from) > this.fmaxamount) {
                                        callback(new Error(`${this.$t('errors.err2')} ${this.fmaxamount}`))
                                    }
                                    else if (parseFloat(this.input.from) > this.canUseFrom) {
                                        callback(new Error(`${this.$t('errors.err3')}`))
                                    }
                                    else {
                                        callback()
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
                                    callback(new Error(this.$t('messages.msg16')))
                                } else {
                                    if (parseFloat(this.input.to) < this.tminamount) {
                                        callback(new Error(`
                                        ${this.$t('errors.err1')} ${this.tminamount}`))
                                    }
                                    else if (parseFloat(this.input.to) > this.tmaxamount) {
                                        callback(new Error(`${this.$t('errors.err2')} ${this.tmaxamount}`))
                                    }
                                    else {
                                        callback()
                                    }

                                }
                            },
                            trigger: 'blur',
                        },
                    ],
                },
            },
        }
    },
    mounted() {
        this.getBnqStatusForChart()
        if (this.$route.params) {
            this.currencyFrom = this.$route.params.currencyFrom
            this.currencyTo = this.$route.params.currencyTo
            this.input.from = this.$route.params.toAmount
        }
        this.init();
        this.onFromChange()
    },
    beforeDestroy() {
        clearInterval(this.componentInterval)
    },
    methods: {
        init() {
            this.$store.dispatch('user_flash_exchange_settings_get').then((flashData) => {
                this.flashData = flashData.data;
                if (this.$userinfo.uid) {
                    this.getAssets();
                }
                else {

                    this.assets = this.$store.state.currencyinfos.map((item) => {
                        const cname = item.currencyname.toLowerCase()
                        for (let i = 0; i < this.flashData.length; i++) {
                            if (
                                cname == this.flashData[i].fname ||
                                cname == this.flashData[i].tname
                            ) {
                                return { currency: item }
                            }
                        }
                    }).filter(item => item != undefined)
                    if (this.assets.length > 0) {
                        // [0].currency.currencyname
                        if (this.currencyFrom == undefined) {
                            const from = this.assets.find((asset) => asset.currency.currencyname == 'BTC')
                            this.currencyFrom = from ? from.currency.currencyname : 'BTC'
                        }
                        this.getConvertTo(this.currencyTo)
                    }

                }
            });
        },
        getConvertTo(val) {
            const cname = this.currencyFrom.toLowerCase()
            const array = []
            this.flashData.filter((_d) => {
                if (_d.fname == cname) {
                    array.push(_d.tname)
                } else if (_d.tname == cname) {
                    array.push(_d.fname)
                }
            })
            this.convertToAssets = this.assets.filter((_a) => {
                const assetCName = _a.currency.currencyname.toLowerCase()
                for (let i = 0; i < array.length; i++) {
                    if (assetCName == array[i]) {
                        return _a
                    }
                }
            })
            if (val) {
                this.currencyTo = val
            } else {
                this.currencyTo = this.convertToAssets[0]?.currency.currencyname
            }
            this.getMinMaxAmount()
        },
        getPrefix(name) {
            const currency = this.assets?.filter(
                (_c) => _c.currency.currencyname == name
            )[0]
            return currency?.currency.icon
        },
        changeTab(val) {
            this.getGraphData(val)
        },
        swap() {
            const temp = this.currencyFrom
            this.currencyFrom = this.currencyTo
            this.getConvertTo(temp)
        },
        async getAssets() {
            try {
                this.$store.dispatch('user_assets_uc_get', { assetstype: 1 }).then(({ data }) => {
                    if (data) {
                        this.assets = data.list.filter((assess) => {
                            const cname = assess.currency.currencyname.toLowerCase()
                            for (let i = 0; i < this.flashData.length; i++) {
                                if (
                                    cname == this.flashData[i].fname ||
                                    cname == this.flashData[i].tname
                                ) {
                                    return assess
                                }
                            }
                        })
                        if (this.assets.length > 0) {
                            // [0].currency.currencyname
                            const from = this.assets.find((asset) => asset.currency.currencyname == 'BTC')
                            this.currencyFrom = from ? from.currency.currencyname : 'BTC'
                            this.getConvertTo(this.currencyTo)
                        }
                    }
                });
            } catch (error) {
                //console.log('Error', error)
            }
        },
        onFromChange() {
            const val = this.input.from
            if (val != '') {
                const amt = this.$store.getters.get_exchange_rate_by_name(this.currencyFrom, 'USDT') * parseFloat(this.input.from) / this.$store.getters.get_exchange_rate_by_name(this.currencyTo, 'USDT');
                this.input.to = this.cutZero(amt.toFixed(this.global_get_decimal(this.currencyTo).a))
            }
            else {
                this.input.to = '';
            }
        },
        onToChange() {
            const val = this.input.to;
            if (val != '') {
                const amt = this.$store.getters.get_exchange_rate_by_name(this.currencyTo, 'USDT') * parseFloat(this.input.to) / this.$store.getters.get_exchange_rate_by_name(this.currencyFrom, 'USDT')
                this.input.from = this.cutZero(this.global_get_tofixed(amt, this.global_get_decimal(this.currencyFrom).a));
            }
            else {
                this.input.from = '';
            }
        },
        getMinMaxAmount() {
            // this.input.from = '';
            // this.input.to = '';
            const cFrom = this.currencyFrom.toLowerCase()
            const cTo = this.currencyTo.toLowerCase()
            const settings = this.flashData.filter((_d) => {
                if (
                    (cFrom == _d.fname && cTo == _d.tname) ||
                    (cFrom == _d.tname && cTo == _d.fname)
                ) {
                    return _d
                }
            })[0];
            this.settings = settings
            if (settings.fname == cFrom) {
                this.fminamount = this.cutZero(this.global_get_tofixed(settings.minamount, this.global_get_decimal(cFrom).a))
                this.fmaxamount = this.cutZero(this.global_get_tofixed(settings.maxamount, this.global_get_decimal(cFrom).a))
                this.tminamount = this.cutZero(this.currencyConverter(settings.minamount, cFrom, cTo))
                this.tmaxamount = this.cutZero(this.currencyConverter(settings.maxamount, cFrom, cTo))
            }
            else {
                this.fminamount = this.cutZero(this.currencyConverter(settings.minamount, cTo, cFrom))
                this.fmaxamount = this.cutZero(this.currencyConverter(settings.maxamount, cTo, cFrom))
                this.tminamount = this.cutZero(this.global_get_tofixed(settings.minamount, this.global_get_decimal(cTo).a))
                this.tmaxamount = this.cutZero(this.global_get_tofixed(settings.maxamount, this.global_get_decimal(cTo).a))
            }
            this.tab = '0'
            this.getGraphData(this.tab)
        },
        currencyConverter(amount, cFrom, cTo) {
            const amt = this.$store.getters.get_exchange_rate_by_name(cFrom, 'USDT') * parseFloat(amount) / this.$store.getters.get_exchange_rate_by_name(cTo, 'USDT')
            return this.cutZero(this.global_get_tofixed(amt, this.global_get_decimal(cTo).a))

        },
        async PreviewConversion() {
            if (this.$userinfo.uid) {
                await this.$refs['convertForm'].validate(async (valid) => {
                    if (valid) {
                        try {
                            const { data } = await this.$store.dispatch(
                                'user_flash_convert_get',
                                {
                                    fName: this.currencyFrom,
                                    tName: this.currencyTo,
                                    fAmount: this.input.from,
                                }
                            )
                            this.convertData = data;
                            this.model = true;
                            this.$refs['success'].startTimer()
                        } catch (error) {
                            //console.log(error)
                        }

                    }
                })
            }
            else {
                this.$router.push('/login?returnurl=' + this.$route.path)
            }

        },
        async getGraphData(val) {
            if (this.fromIsBnq) {
                this.equalsTo = this.bnqRate
            }
            if (!this.bnqDetail.showChart && (this.fromIsBnq || this.toIsBnq)) {
                // prevent to load graph data for BNQ
                return false
            }
            if (val) {
                chartOption = undefined
                myChart = undefined
            }
            this.echarts_ydatas = []
            try {
                const { data } = await this.$store.dispatch(
                    'quotation_flashkdate_get',
                    {
                        fName: this.currencyFrom,
                        tName: this.currencyTo,
                        type: this.tab,
                    }
                )

                if (data.length > 0) {
                    const reversedData = data.reverse()
                    if (this.tab == '0') this.equalsTo = reversedData[reversedData.length - 1].c

                    if (!chartOption) {
                        clearInterval(this.componentInterval)
                        this.mcharts(reversedData)
                        this.componentInterval = setInterval(() => {
                            this.getGraphData()
                            this.onFromChange()
                        }, 6000);
                    }
                    else {
                        chartOption.series[0].data = reversedData.map(item => item.c)
                        myChart.setOption(chartOption);
                    }
                }
                else {
                    this.equalsTo = 0
                }
            } catch (error) {

            }
        },
        getBnqStatusForChart() {
            this.$store.dispatch('com_constants_getconstantsinfo',
                { key: "buy_bnq_config" }
            ).then((response) => {
                const data = response.data
                console.log('datadata', data);

                this.bnqDetail = JSON.parse(data)
            })
        },
        mcharts(chartData) {
            // console.log('chartData', chartData);
            const _self = this;
            myChart = echarts.init(document.getElementById('echarts'))
            chartOption = {
                grid: {
                    left: '1%',
                    top: 30,
                    right: '1%',
                    bottom: 30,
                },
                tooltip: {
                    trigger: 'axis',
                    position(pt) {
                        return [pt[0], '10%']
                    },
                    backgroundColor: 'rgba(0, 0, 0, 0.75)',
                    padding: [1, 1, 1, 1],
                    formatter: function (params) {
                        let data = params[0];

                        return `
                 <div style="background-color: rgba(0, 0, 0, 0.75);color:#fff; padding:10px 15px;box-shadow: none; border:none">
                 <span style="color: #999;"></span>${_self.global_get_local_time(data.axisValue).format('YYYY-MM-DD HH:mm:ss')}<br>
                 <span style="display: inline-block; width: 8px; height: 8px; background-color:#ffa500 ; border-radius: 50%; margin-right: 5px;"></span>
                 <span style="color: #999;"></span>${data.data}
                </div>
                `;


                    },

                },

                xAxis: {
                    type: 'category',
                    // boundaryGap: ['20%', '20'],
                    data: chartData.map(item => item.t),
                    show: true,
                    axisLine: {
                        show: false, // hide the x-axis line.
                    },
                    axisTick: false,
                    axisLabel: {

                        interval: Math.ceil(chartData.length / 8),
                        formatter: function (value) {
                            return _self.global_get_local_time(value).format('HH:mm')
                        }
                    }


                },
                yAxis: {
                    type: 'value',
                    // boundaryGap: ['20%', '20'],
                    min: Math.min(...chartData.map(item => item.c)),
                    max: Math.max(...chartData.map(item => item.c)),
                    show: false,
                    axisLine: {
                        show: false,
                        showMinLine: false,
                        showMaxLine: false,
                    },
                    axisLabel: {
                        showMinLabel: false, // hide the minimum value label on the y-axis side
                        showMaxLabel: false, // hide the maximum value label on the y-axis side
                    },
                    axisLine: {
                        show: false,
                    },
                    splitLine: {
                        show: false,
                    },
                },
                series: [
                    {
                        name: '',
                        type: 'line',
                        symbol: 'none',
                        sampling: 'lttb',

                        endLabel: {
                            show: true,
                            backgroundColor: 'rgba(94, 102, 115, 0.8)',
                            borderWidth: 1,
                            borderRadius: 16,
                            padding: [8, 12, 8, 12],
                            fontSize: 12,
                            align: "center",
                            offset: [-40, 0],
                            color: '#fff',
                            formatter(d) {
                                return d.data
                            },
                        },
                        lineStyle: {
                            color: "#ffa500"

                        },
                        areaStyle: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                {
                                    offset: 0,
                                    color: '#fef6d1',
                                },
                                {
                                    offset: 1,
                                    color: '#ffff',
                                },
                            ]),
                        },
                        data: chartData.map(item => item.c),


                    },
                ],
            }

            myChart.setOption(chartOption)
        },
        close() {
            this.model = false
        },
    },
}
</script>

<style lang="scss" scoped>
.currency-curve {
    width: 100%;
    height: 400px;
}

.echarts {
    width: 100%;
    height: 100%;
}

.error-note {
    color: red;
    font-size: 12px;
}

@import '@/assets/scss/pages/common-convert/common-convert.scss';
</style>
