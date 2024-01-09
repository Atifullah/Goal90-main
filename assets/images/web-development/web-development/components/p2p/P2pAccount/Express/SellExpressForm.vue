<template>
    <!-- IN BUY THE USER BUY CRYPTO AND SELL FIAT SO BUY REFERS TO CRYPTO AND SELL REFER TO FIAT -->
    <div class="bank-transfer-form">
        <a-form-model ref="applyForm" :model="BuyForm" :rules="setValidation.rules" :hide-required-mark="true"
            label-align="left">
            <a-row class="mx-4">
                <a-col :lg="24" class="mt-4">
                    <a-form-model-item has-feedback :label="$t('labels.lbl20')" prop="Sell" :colon="false" :wrapper-col="{
                        xl: 24,
                        lg: 24,
                        md: 24,
                        sm: 24,
                        xs: 24,
                    }">
                        <a-input :placeholder="$t('placeholders.plh29')" class="quantity-input" type="number"
                            v-model="BuyForm.SellAmount" @change="onAmountChange('Sell')">
                            <span slot="suffix" class="mr-3 all-text fw-5" @click="userAllCoin" v-if="$userinfo.uid">
                                {{$t('manage.All')}}
                            </span>
                            <span slot="suffix">
                                <a-select style="width: 115px" @change="onPriceTypeChange" v-model="BuyForm.Sell">
                                    <a-select-option v-for="(item, index) in FormData.CryptoCurrencies" :key="index">
                                        <img :src="item.icon" height="15" width="15" class="mr-2 mb-1" /> {{
                                            item.currencyname }}
                                    </a-select-option>
                                </a-select>
                            </span>
                        </a-input>
                    </a-form-model-item>
                </a-col>
                <a-col :lg="24" class="mt-2 pb-5 mb-4">

                    <a-form-model-item has-feedback :label="$t('labels.lbl21')" prop="Buy" :colon="false" :wrapper-col="{
                        xl: 24,
                        lg: 24,
                        md: 24,
                        sm: 24,
                        xs: 24,
                    }">
                        <a-input :placeholder="$t('placeholders.plh28')" class="quantity-input" prop="Buy" type="number"
                            v-model="BuyForm.BuyAmount" @change="onAmountChange('Buy')">
                            <div slot="suffix">
                                <a-select style="width: 115px" :open="open" v-model="BuyForm.Buy" @change="onPriceTypeChange"
                                    ref="fiatSelect" v-on:select="setOpen(false)" @dropdownVisibleChange="onOpen"
                                    :loading="FormData.Fiats.length == 0">
                                    <a-icon v-if="open" slot="suffixIcon" type="up" />
                                    <a-icon v-else slot="suffixIcon" type="down" v-on:click="setOpen(true)" />
                                    <div slot="dropdownRender" slot-scope="menu">
                                        <div style="padding: 4px 8px; cursor: pointer;">
                                            <a-input v-if="open" :placeholder="$t('placeholders.plh5')" ref="fiatSearch" class=" all-input-search"
                                                v-on:blur="setOpen(false)" v-model="searchValue" />
                                        </div>
                                        <a-divider style="margin: 4px 0;" />
                                        <v-nodes :vnodes="menu" />
                                    </div>
                                    <a-select-option v-for="(item, index) in FormData.Fiats" :key="index"
                                        v-if="filterFiatOptions(item.name.toLowerCase())">
                                        <img :src="item.icon" height="15" width="15" class="mr-2 mb-1" /> {{
                                            item.name }}
                                    </a-select-option>
                                </a-select>
                            </div>
                        </a-input>

                    </a-form-model-item>
                </a-col>
                <!-- <a-col :lg="24" class="mt-3">
                        <p class="payment-method-label">{{$t('express.exp13')}}</p>
                        <a-card class="payment-method-icons">
                            <div class="py-3">
                                <img src="/images/visa.svg" class="pl-2 pointer" />
                                <img src="/images/master.svg" class="pl-3 pointer" />
                                <img src="/images/jcb.svg" class="pl-3 pointer" />
                                <img src="/images/discover.svg" class="pl-3 pointer" />

                            </div>
                        </a-card>
                    </a-col> -->
                <a-col :lg="24" class="mt-4">
                    <p class="estimated-price-txt fw-5" :class="adData!=null?'':'red-active '">{{ EstimatedPriceText }}</p>
                    <a-button class="primary-btn fw-5 danger-btn mb-3" block @click="handleSubmit" :class="adData != null ? '' : 'disabled-btn'">{{$userinfo.uid?$t('express.exp44'):$t('login.login') }}</a-button>
                    <p class="estimated-price-txt fw-5 pr-4 pb-2">{{ $t('express.exp15') }}<a href="#"> {{
                        $t('express.exp16') }}
                            ></a>
                    </p>
                </a-col>
            </a-row>
        </a-form-model>

    </div>
</template>

<script>
import select from '@/components/security/deal_select'
import { ValidationRule } from 'ant-design-vue/lib/form'
export default {
    props: {
        FormData: {
            type: Object,
            default: () => { }
        },
        formSubmit: {
            type: Function
        },
        applySuccessModel:{
        type:Function
        }
    }
    , components: {
        'hex-select': select,
        VNodes: {
            functional: true,
            render: (h, ctx) => ctx.props.vnodes,
        },
    },
    data() {
        return {
            BuyForm: {
                Sell: this.FormData.DefaultIndexOfCrypto,
                Buy: this.FormData.DefaultIndexOfFiat,
                SellAmount: null,
                BuyAmount: null,
                BuyMin: 0,
                SellMin: 0,
            },
            adData: null,
            searchValue: '',
            open: false,
            fiats: [],
            MinPrice: 0,
            EstimatedPriceText: '',
            setValidation: {
                rules: {
                    Sell: [{

                        validator: async (rule, value, callback) => {
                            if (this.BuyForm.SellAmount === '' || this.BuyForm.SellAmount == null) {
                                callback(new Error(this.$t('messages.msg67')))
                            } else {
                                if (parseFloat(this.BuyForm.SellAmount) < parseFloat(this.BuyForm.SellMin)) {
                                    callback(new Error(`${this.$t('errors.err1')} ${this.BuyForm.SellMin}`))
                                }
                                else if (parseFloat(this.BuyForm.SellAmount) > parseFloat(this.BuyForm.SellMax)) {
                                    callback(new Error(`${this.$t('errors.err2')} ${this.BuyForm.SellMax}`))
                                }
                                else {
                                    callback()
                                }
                            }
                        },
                    }],
                    Buy: [{

                        validator: async (rule, value, callback) => {
                            if (this.BuyForm.BuyAmount === '' || this.BuyForm.BuyAmount == null) {
                                callback(new Error(this.$t('messages.msg67')))
                            } else {
                                if (parseFloat(this.BuyForm.BuyAmount) < parseFloat(this.BuyForm.BuyMin)) {
                                    callback(new Error(`${this.$t('errors.err1')} ${this.BuyForm.BuyMin}`))
                                }
                                if (parseFloat(this.BuyForm.BuyAmount) > parseFloat(this.BuyForm.BuyMax)) {
                                    callback(new Error(`${this.$t('errors.err1')} ${this.BuyForm.BuyMax}`))
                                }
                                else {
                                    callback()
                                }
                            }
                        },
                    }],

                },
            },

        }
    },

    methods: {
        userAllCoin(){
            let selectedCurrency=this.FormData.CryptoCurrencies[this.BuyForm.Sell];
            this.BuyForm.SellAmount=this.FormData.UserAssets.find((item)=>item.currency.id==selectedCurrency.id).canuseamount;
            this.onAmountChange('sell');
        },
        async getAdsData() {
            const requestData = {
                currencyid: this.FormData.CryptoCurrencies[this.BuyForm.Sell].id,
                legaltype: this.FormData.Fiats[this.BuyForm.Buy].name,
                pageindex: 1,
                pagesize: 10,
                direction: 1,
                orderstatus: [0]
            }
            const { data } = await this.$store.dispatch('trading_c2c_market_pagedlist', requestData);
            if (data != null && data.pagedata.length > 0) {
                const FilterAds = data.pagedata.filter((item) => item.userid != this.$userinfo.uid);
                if (FilterAds.length > 0) {
                    this.adData = FilterAds[0]
                }
                else {
                    this.adData = null;
                }
            }
            else {
                this.adData = null

            }
        },
        async onPriceTypeChange() {
            await this.getAdsData()
            if (this.adData != null) {
                this.EstimatedPriceText = this.$t('returntxt.rtxt48') +this.adData.currencyname + " ≈ " + this.adData.price + " " +  this.adData.legaltype ;
                this.setMinMax()
            }
            else {
                this.EstimatedPriceText = this.$t('returntxt.rtxt47');
            }
        },



        setMinMax() {
            if (this.adData != null) {
                const maxpriceCalulated=this.adData.maxprice>(this.adData.enableamount*this.adData.price)?(this.adData.enableamount*this.adData.price):this.adData.maxprice;

                this.BuyForm.SellMin = this.global_get_tofixed((this.adData.minprice / this.adData.price), this.global_get_decimal(this.adData.legaltype).a)
                this.BuyForm.SellMax = this.global_get_tofixed((maxpriceCalulated / this.adData.price), this.global_get_decimal(this.adData.legaltype).a)
                this.BuyForm.BuyMin = this.global_get_tofixed((this.adData.minprice), this.global_get_decimal(this.adData.currencyname).a)
                this.BuyForm.BuyMax = this.global_get_tofixed((maxpriceCalulated), this.global_get_decimal(this.adData.currencyname).a)
            }

        },
        onAmountChange(val) {
            if (this.adData != null) {
                if (val == 'Buy') {
                    this.BuyForm.SellAmount = (this.BuyForm.BuyAmount / this.adData.price)
                }
                else {
                    this.BuyForm.BuyAmount = this.BuyForm.SellAmount * this.adData.price;
                }
            }
        },

        filterFiatOptions(str) {
            const _self = this;
            if (_self.searchValue !== '') {
                return (str.indexOf(_self.searchValue.toLowerCase()) !== -1)
            }
            return true
        },
        setOpen(bool) {
            if (this.open == bool) {
                return
            }
            if (!bool) {
                setTimeout(() => {
                    this.open = bool
                    this.searchValue = '';
                }, 100);
            }
            else {
                this.open = bool;
            }
        },
        onOpen() {
            this.open = true
            if (this.open == true) {
                setTimeout(() => {
                    this.$refs.fiatSearch?.focus()
                }, 100);
            }
        },
        onDirectionChange(val) {
            if (val) {
                this.direction = val;
            }
        },
        handleSubmit() {
            if(this.$userinfo.uid){
            this.$refs.applyForm.validate((valid) => {
                // SETTING COIN OBJECT BEFORE PROCESSDING TO PAYMENTS
                if (valid && this.adData != null) {
                    this.BuyForm.BuyObject = this.FormData.Fiats[this.BuyForm.Buy]
                    this.BuyForm.SellObject = this.FormData.CryptoCurrencies[this.BuyForm.Sell]
                    this.BuyForm.adData = this.adData
                    this.formSubmit(this.BuyForm)
                } else {

                    return;
                }
            });}
            else{
                this.$router.push('/login?returnurl=' + this.$route.path+'?tabkey=1')
            }
        }

    },
    mounted() {
        this.onPriceTypeChange();
    },
}
</script>

<style></style>
