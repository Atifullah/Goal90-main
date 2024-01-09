<template>
    <div class="post-new-add" v-if="initStatus">
        <a-card :bordered="false">
            <p class="post-heading fw-5 mb-0">{{ action == 'edit' ? $t('conditionaltxt.ct1') : $t('conditionaltxt.ct2') }}
            </p>
        </a-card>
        <a-card class="mt-3 px-5 pt-4" :bordered="false">
            <a-steps :current="current" label-placement="vertical">
                <a-step v-for="(item, index) in steps" :key="index" :title="item.title">
                    <span slot="icon">
                        <img :src="current >= index ? '/images/dot-active.svg' : '/images/dot-p2p.svg'" class="pointer" />
                    </span>
                </a-step>
            </a-steps>
            <a-row>
                <a-col :lg="{ span: 16, offset: 4 }" :xl="{ span: 14, offset: 5 }">
                    <div class="steps-content pt-5 my-4">
                        <a-row :gutter="16" class="mx-5 px-4 post-new-mx">

                            <a-form-model ref="postNewAddForm" :model="postNewAddForm" :rules="rules"
                                :hide-required-mark="true" label-align="left">
                                <div v-show="current == 0">
                                    <div class="post-btn-bg">
                                        <div class="sell-left-btn"><a-button block class="buy-sell fw-5"
                                                :class="direction == 1 ? 'right-btn' : 'trans-btn'" :disabled="editView"
                                                @click="onDirectionChange(1)">{{ $t('postadd.pna1') }}</a-button>
                                        </div>
                                        <div class="sell-left-btn">
                                            <a-button block class="buy-sell fw-5"
                                                :class="direction == -1 ? 'left-btn' : 'trans-btn'" :disabled="editView"
                                                @click="onDirectionChange(-1)">{{ $t('postadd.pna2') }}</a-button>
                                        </div>
                                    </div>
                                    <a-row :gutter="16" class="my-4">
                                        <a-col :lg="12">
                                            <a-form-model-item has-feedback :label="$t('labels.lbl22')" prop="coin"
                                                :colon="false" :wrapper-col="{
                                                    xl: 24,
                                                    lg: 24,
                                                    md: 24,
                                                    sm: 24,
                                                    xs: 24,
                                                }">
                                                <a-select style="width: 100%" v-model="postNewAddForm.coin"
                                                    :disabled="editView" @change="onPriceTypeChange">
                                                    <a-select-option v-for="(item, index) in currencies" :key="index">
                                                        <img :src="item.icon" height="15" width="15" class="mr-2" /> {{
                                                            item.currencyname }}
                                                    </a-select-option>
                                                </a-select>
                                            </a-form-model-item>
                                        </a-col>
                                        <a-col :lg="12">
                                            <a-form-model-item has-feedback :label="$t('labels.lbl23')" prop="fiat"
                                                :colon="false" :wrapper-col="{
                                                    xl: 24,
                                                    lg: 24,
                                                    md: 24,
                                                    sm: 24,
                                                    xs: 24,
                                                }">
                                                <a-select style="width: 100%" :open="open" v-model="postNewAddForm.fiat"
                                                    :disabled="editView" @change="onPriceTypeChange" ref="fiatSelect"
                                                    v-on:select="setOpen(false)" @dropdownVisibleChange="onOpen"
                                                    :loading="fiats.length == 0">
                                                    <a-icon v-if="open" slot="suffixIcon" type="up" />
                                                    <a-icon v-else slot="suffixIcon" type="down"
                                                        v-on:click="setOpen(true)" />
                                                    <div slot="dropdownRender" slot-scope="menu">
                                                        <div style="padding: 4px 8px; cursor: pointer;">
                                                            <a-input v-if="open" :placeholder="$t('placeholders.plh5')"
                                                                ref="fiatSearch" v-on:blur="setOpen(false)"
                                                                v-model="searchValue" />
                                                        </div>
                                                        <a-divider style="margin: 4px 0;" />
                                                        <v-nodes :vnodes="menu" />
                                                    </div>
                                                    <a-select-option v-for="(item, index) in fiats" :key="index"
                                                        v-if="filterFiatOptions(item.name.toLowerCase())">
                                                        <img :src="item.icon" height="15" width="15" class="mr-2" /> {{
                                                            item.name }}
                                                    </a-select-option>
                                                </a-select>

                                            </a-form-model-item>
                                        </a-col>
                                    </a-row>
                                    <a-row>
                                        <a-col :lg="24">
                                            <p class="price-type fw-5">{{ $t('postadd.pna3') }}</p>
                                            <a-radio-group :options="plainOptions" v-model="priceType" :disabled="editView"
                                                @change="onPriceTypeChange" />

                                        </a-col>
                                    </a-row>
                                    <a-row :gutter="16" class="mt-3 mb-0">
                                        <a-col :lg="24">
                                            <a-form-model-item has-feedback
                                                :label="priceType == 'Floating' ? $t('conditionaltxt.ct3') : $t('conditionaltxt.ct4')"
                                                prop="email" :colon="false" :wrapper-col="{
                                                    xl: 24,
                                                    lg: 24,
                                                    md: 24,
                                                    sm: 24,
                                                    xs: 24,
                                                }">
                                                <a-input :value="priceMargin"
                                                    @blur="(e) => priceMarginChange(e.target.value)"
                                                    class="increase-num mt-2">
                                                    <span>%</span>
                                                    <span class="pointer" slot="addonAfter"
                                                        @click="priceMarginChange((parseFloat(priceMargin) + 0.01).toFixed(2))"><a-icon
                                                            type="plus" /></span>
                                                    <span class="pointer" slot="addonBefore"
                                                        @click="priceMarginChange((parseFloat(priceMargin) - 0.01).toFixed(2))"><a-icon
                                                            type="minus" /></span>
                                                </a-input>

                                            </a-form-model-item>
                                            <p class="mb-3" style="font-size:14px; color:#718096;">{{
                                                `${$t('conditionaltxt.ct5')}
                                                                                            ${priceType == 'Floating' ? (this.defaultValue.minFloatingPtg + '%') :
                                                    ((this.defaultValue.minFixedPtg * marketRate / 100).toFixed(2))}
                                                                                            ${$t('conditionaltxt.ct6')}
                                                                                            ${priceType == 'Floating' ? (this.defaultValue.maxFloatingPtg + '%') :
                                                    ((this.defaultValue.maxFixedPtg * marketRate / 100).toFixed(2))}` }}
                                            </p>
                                        </a-col>
                                    </a-row>
                                    <a-row :gutter="16" class="mb-3 mt-0" v-if="priceType == 'Floating'">
                                        <a-col :lg="24">
                                            <a-form-model-item has-feedback
                                                :label="`${direction == 1 ? $t('conditionaltxt.ct7') : $t('conditionaltxt.ct8')} ${$t('conditionaltxt.ct9')}`"
                                                prop="limitPrice" :colon="false" :wrapper-col="{
                                                    xl: 24,
                                                    lg: 24,
                                                    md: 24,
                                                    sm: 24,
                                                    xs: 24,
                                                }">
                                                <a-input a-input type="number" :suffix="fiats[postNewAddForm.fiat]?.name"
                                                    v-model="postNewAddForm.limitPrice" />

                                            </a-form-model-item>
                                        </a-col>
                                    </a-row>
                                    <a-row :gutter="16" class="mb-2 mt-2 col-alignment">
                                        <a-col :lg="12" v-show="priceType == 'Floating'">
                                            <p class="mb-0 order-price fw-5">{{ $t('postadd.pna4') }}</p>
                                        </a-col>
                                        <a-col :lg="12" align="end" v-show="priceType == 'Floating'">
                                            <p class="mb-0 highest-price fw-5">{{ fiats[postNewAddForm.fiat]?.name }} {{
                                                yourPrice
                                            }}</p>
                                        </a-col>
                                    </a-row>
                                    <a-row :gutter="16" class="mb-4 col-alignment">
                                        <a-col :lg="12">
                                            <p class="mb-0 order-price fw-5">{{ $t('postadd.pna5') }}</p>
                                        </a-col>
                                        <a-col :lg="12" align="end">
                                            <p class="mb-0 highest-price fw-5">{{ fiats[postNewAddForm.fiat]?.name }} {{
                                                marketRate }}</p>
                                        </a-col>

                                    </a-row>
                                </div>
                                <div v-show="current == 1">
                                    <a-row :gutter="16">
                                        <a-col :lg="12">
                                            <p class="total-amount-txt fw-5 mb-0">{{ $t('postadd.pna6') }}</p>
                                        </a-col>
                                        <a-col :lg="12" align="end" v-if="direction == -1">
                                            <p class="mb-0 total-usdt-num fw-5">{{ $t('postadd.pna7') }}<span
                                                    class="text-black"> {{ canuseamount }} {{
                                                        currencies[postNewAddForm.coin]?.currencyname }}</span></p>
                                        </a-col>
                                    </a-row>
                                    <a-row :gutter="16" class="mt-2">
                                        <a-col :lg="24">
                                            <a-row :class="this.direction == -1 ? 'total-num-input' : ''">
                                                <a-col :lg="direction == -1 ? 21 : 24">
                                                    <a-form-model-item has-feedback label="" prop="amount" :colon="false"
                                                        :wrapper-col="{
                                                            xl: 24,
                                                            lg: 24,
                                                            md: 24,
                                                            sm: 24,
                                                            xs: 24,
                                                        }">

                                                        <a-input type="number" placeholder=""
                                                            :suffix="currencies[postNewAddForm.coin]?.currencyname"
                                                            v-model="postNewAddForm.amount" @change="onAmountChange" />
                                                    </a-form-model-item>
                                                </a-col>

                                                <a-col :lg="3" v-if="direction == -1">
                                                    <p class="text-center mb-0 total-all-amount pointer"
                                                        @click="useAllAmount">{{ $t('postadd.pna8') }}</p>
                                                </a-col>
                                            </a-row>

                                        </a-col>
                                    </a-row>
                                    <a-row :gutter="16">
                                        <a-col :lg="12">
                                            <!-- <p class="total-amount-txt mb-0">{{ $t('postadd.pna6') }}</p> -->
                                        </a-col>
                                        <!-- nisar -->
                                        <a-col :lg="12" align="end">
                                            <p class="mb-0 total-usdt-num fw-5">{{ $t('postadd.pna19') }}<span
                                                    class="text-black"> {{ this.global_get_tofixed(fee,
                                                        this.global_get_decimal(this.currencies[this.postNewAddForm.coin]?.currencyname).a)
                                                    }}
                                                    {{
                                                        currencies[postNewAddForm.coin]?.currencyname }}</span></p>
                                        </a-col>
                                    </a-row>
                                    <a-row :gutter="16" class="mt-2">
                                        <a-col :lg="12">
                                            <a-form-model-item has-feedback :label="$t('labels.lbl24')" prop="minPrice"
                                                :colon="false" :wrapper-col="{
                                                    xl: 24,
                                                    lg: 24,
                                                    md: 24,
                                                    sm: 24,
                                                    xs: 24,
                                                }">
                                                <a-input type="number" :disabled="minMaxPriceVisibility" placeholder=""
                                                    :suffix="fiats[postNewAddForm.fiat]?.name"
                                                    v-model="postNewAddForm.minPrice" />

                                            </a-form-model-item>
                                        </a-col>
                                        <a-col :lg="12">
                                            <a-form-model-item has-feedback :label="$t('labels.lbl25')" prop="maxPrice"
                                                :colon="false" :wrapper-col="{
                                                    xl: 24,
                                                    lg: 24,
                                                    md: 24,
                                                    sm: 24,
                                                    xs: 24,
                                                }">
                                                <a-input type="number" placeholder="" :disabled="minMaxPriceVisibility"
                                                    :suffix="fiats[postNewAddForm.fiat]?.name"
                                                    v-model="postNewAddForm.maxPrice" />

                                            </a-form-model-item>
                                        </a-col>
                                    </a-row>
                                    <a-row :gutter="16" class="mt-4">
                                        <a-col :lg="24">
                                            <p class="add-payment-method fw-5">{{ $t('postadd.pna9') }}
                                            </p>
                                            <a-radio-button :class="{ 'active-btn': item.checked }" :value="item"
                                                v-for="(item, index) in userpaymentMethods" :key="index"
                                                @click="onChange(item)">
                                                {{ item.payconfiginfo.name }}

                                            </a-radio-button>

                                            <a-radio-button value="d" @click="getAllC2CPaymentMethods"
                                                class="add-paymentmethod-btn">
                                                <a-icon type="plus" /> {{ $t('postadd.pna10') }}
                                            </a-radio-button>
                                            <p v-show="noPayMethod" style="font-size:14px; color:red">
                                                {{ $t('postadd.pna11') }}</p>
                                        </a-col>
                                    </a-row>
                                    <a-row :gutter="16">
                                        <a-col :lg="24">
                                            <a-form-model-item has-feedback :label="$t('labels.lbl26')"
                                                prop="orderExpiredTime" :colon="false" :wrapper-col="{
                                                    xl: 24,
                                                    lg: 24,
                                                    md: 24,
                                                    sm: 24,
                                                    xs: 24,
                                                }">
                                                <a-select v-model="postNewAddForm.orderExpiredTime" style="width: 100%">
                                                    <a-select-option value="30">
                                                        30 Mins
                                                    </a-select-option>
                                                    <a-select-option value="60">
                                                        60 Mins
                                                    </a-select-option>
                                                    <a-select-option value="90">
                                                        90 Mins
                                                    </a-select-option>
                                                    <a-select-option value="120">
                                                        120 Mins
                                                    </a-select-option>
                                                </a-select>
                                            </a-form-model-item>
                                        </a-col>
                                    </a-row>
                                </div>
                                <div v-show="current == 2">
                                    <a-row :gutter="16">
                                        <a-col :lg="24">
                                            <a-form-model-item has-feedback :label="$t('labels.lbl27')" prop="autoreply"
                                                :colon="false" :wrapper-col="{
                                                    xl: 24,
                                                    lg: 24,
                                                    md: 24,
                                                    sm: 24,
                                                    xs: 24,
                                                }">
                                                <a-textarea :placeholder="$t('placeholders.plh30')"
                                                    v-model="postNewAddForm.autoreply" :maxLength="512" />
                                            </a-form-model-item>
                                        </a-col>
                                    </a-row>
                                    <a-row :gutter="16" class="mt-3">
                                        <a-col :lg="24">
                                            <a-form-model-item has-feedback :label="$t('labels.lbl28')" prop="areaCode"
                                                :colon="false" :wrapper-col="{
                                                    xl: 24,
                                                    lg: 24,
                                                    md: 24,
                                                    sm: 24,
                                                    xs: 24,
                                                }">

                                                <a-select style="width: 100%" :open="countryOpen"
                                                    v-model="postNewAddForm.areaCode" v-on:select="setCountryOpen(false)"
                                                    @dropdownVisibleChange="onCountryOpen" :loading="fiats.length == 0">
                                                    <a-icon v-if="countryOpen" slot="suffixIcon" type="up" />
                                                    <a-icon v-else slot="suffixIcon" type="down"
                                                        v-on:click="setCountryOpen(true)" />
                                                    <div slot="dropdownRender" slot-scope="menu">
                                                        <div style="padding: 4px 8px; cursor: pointer;">
                                                            <a-input v-if="countryOpen"
                                                                :placeholder="$t('placeholders.plh5')" ref="countrySearch"
                                                                v-on:blur="setCountryOpen(false)" v-model="countrySearch" />
                                                        </div>
                                                        <a-divider style="margin: 4px 0;" />
                                                        <v-nodes :vnodes="menu" />
                                                    </div>
                                                    <a-select-option v-for="(item, index) in countryOptions" :key="index"
                                                        v-if="filterCountryOptions(item.value.toLowerCase())">
                                                        <img :src="item.icon" height="auto" width="15" class="mr-2" /> {{
                                                            item.value }}
                                                    </a-select-option>
                                                </a-select>
                                            </a-form-model-item>
                                        </a-col>
                                    </a-row>
                                    <a-row class="mt-4 pt-2">
                                        <a-col :lg="24">
                                            <p class="price-type fw-5 mb-2">{{ $t('postadd.pna12') }}</p>
                                            <a-radio v-model="isMoreTrans" @click="isMoreTrans = !isMoreTrans">{{
                                                $t('postadd.pna13') }}</a-radio>

                                        </a-col>
                                    </a-row>
                                    <a-row class="mt-4 pt-2">
                                        <a-col :lg="24">
                                            <p class="price-type fw-5 mb-2">{{ $t('postadd.pna14') }}</p>
                                            <a-radio-group :options="advStatusOptions"
                                                v-model="postNewAddForm.orderStatus" />

                                        </a-col>
                                    </a-row>

                                    <a-row :gutter="16" class="my-4 py-2" v-if="!editView">
                                        <a-col :lg="24">
                                            <a-checkbox v-model="agreed">
                                                {{ $t('postadd.pna15') }} <nuxt-link to="/user-agreement"><span
                                                        class="active">{{ $t('postadd.pna16') }}</span></nuxt-link>
                                            </a-checkbox>
                                        </a-col>
                                    </a-row>

                                </div>
                                <a-row :gutter="16" class="mb-5" v-if="current < 1">
                                    <a-col :lg="24"><a-button class="primary-btn fw-5" block @click="next">{{
                                        $t('postadd.pna17')
                                    }}</a-button></a-col>
                                </a-row>
                                <a-row :gutter="16" class="my-4" v-else>
                                    <a-col :lg="12"><a-button block class="cancel-outline-btn fw-5 mb-3" @click="prev">{{
                                        $t('postadd.pna18') }}</a-button></a-col>
                                    <a-col :lg="12"><a-button :loading="loading" block class="mb-3 fw-5"
                                            :class="(current == 2 && !agreed && !editView) ? 'disabled-btn' : 'primary-btn'"
                                            @click="next">{{
                                                current == 2 ? action == 'edit' ? $t('conditionaltxt.ct10') :
                                                $t('conditionaltxt.ct11') : $t('conditionaltxt.ct12')
                                            }}</a-button></a-col>
                                </a-row>
                            </a-form-model>

                        </a-row>
                    </div>
                </a-col>
            </a-row>
        </a-card>
        <SelectPaymentMethod :model="model" :paymentMethodCollection="paymentMethodCollection" :toggleModel="toggleModel" />
        <TradingRequirements :tradingRequirements="tradingRequirements" :close="close"
            :postNewAddtradingRequirements="postNewAddtradingRequirements" />
        <ApplySuccessModel :applySuccessModel="applySuccessModel" @applySuccessModelClose="applySuccessModelClose()" />
    </div>
</template>
<script>
const plainOptions = ['Fixed', 'Floating'];
// const advStatusOptions = [this.$t('conditionaltxt.ct13'), this.$t('conditionaltxt.ct15')];
import SelectPaymentMethod from "@/components/person/PaymentMethod/PaymentModal/SelectPaymentMethod";
import TradingRequirements from "../Modals/TradingRequirements";
import ApplySuccessModel from "@/components/AgentPlan/ApplySuccessModal.vue";
export default {
    components: {
        SelectPaymentMethod,
        TradingRequirements,
        ApplySuccessModel,
        VNodes: {
            functional: true,
            render: (h, ctx) => ctx.props.vnodes,
        },
    },

    data() {
        return {
            plainOptions,
            advStatusOptions: [this.$t('conditionaltxt.ct13'), this.$t('conditionaltxt.ct15')],
            editView: false,
            priceType: 'Fixed',
            tradingRequirements: false,
            postNewAddtradingRequirements: false,
            open: false,
            countryOpen: false,
            action: '',
            searchValue: '',
            isMoreTrans: false,
            countrySearch: '',
            currentAdv: null,
            current: 0,
            agreed: false,
            noPayMethod: false,
            initStatus: false,
            loading: false,
            direction: 1,
            amount: '',
            min: 0,
            max: 0,
            userAssets: [],
            SelectPaymentMethodCount: 0,
            priceMargin: 0.00,
            countryOptions: [],
            userpaymentMethods: [],
            paymentMethodCollection: {},
            currencies: [],
            postNewAddForm: {
                coin: 0,
                fiat: 0,
                minPrice: '',
                maxPrice: '',
                amount: '',
                areaCode: undefined,
                autoreply: '',
                orderExpiredTime: '30',
                orderStatus: this.$t('conditionaltxt.ct13'),
                limitPrice: ''
            },
            defaultValue: {},
            paymentMethod: {},
            applySuccessModel: {},
            model: false,
            fiats: [],
            steps: [
                {
                    title: this.$t("tableskeys.pna1"),
                },
                {
                    title: this.$t("tableskeys.pna2"),
                },
                {
                    title: this.$t("tableskeys.pna3"),
                },
            ],
            rules: {
                amount: [
                    {
                        validator: async (rule, value, callback) => {
                            if (this.postNewAddForm.amount === '' || this.postNewAddForm.amount == null) {
                                callback(new Error(this.$t('messages.msg16')))
                            } else {
                                if (parseFloat(this.postNewAddForm.amount) <= 0) {
                                    callback(new Error(this.$t('conditionaltxt.ct14')))
                                }
                                else if (parseFloat(this.postNewAddForm.amount) > this.maxamount) {
                                    callback(new Error(`${this.$t('errors.err2')} ${this.maxamount}`))
                                }
                                else if (parseFloat(this.postNewAddForm.amount) < this.minamount) {
                                    callback(new Error(`${this.$t('errors.err1')} ${this.minamount}`))
                                }
                                else if (parseFloat(this.postNewAddForm.amount) > this.canuseamount && this.direction != 1) {
                                    callback(new Error(`${this.$t('errors.err16')}`))
                                }
                                else {
                                    callback()
                                }

                            }
                        },
                    }
                ],
                minPrice: [
                    {
                        validator: async (rule, value, callback) => {
                            if (this.postNewAddForm.minPrice === '' || this.postNewAddForm.minPrice == null) {
                                callback(new Error(this.$t('messages.msg67')))
                            } else {
                                if (parseFloat(this.postNewAddForm.minPrice) < parseFloat(this.min).toFixed(2)) {
                                    callback(new Error(`${this.$t('errors.err1')} ${(this.min).toFixed(2)}`))
                                }
                                else if (parseFloat(this.postNewAddForm.minPrice) > parseFloat(this.max).toFixed(2)) {
                                    callback(new Error(`${this.$t('errors.err2')} ${(this.max).toFixed(2)}`))
                                }
                                else {
                                    callback()
                                }

                            }
                        },
                    }
                ],
                maxPrice: [
                    {
                        validator: async (rule, value, callback) => {
                            if (this.postNewAddForm.maxPrice === '' || this.postNewAddForm.maxPrice == null) {
                                callback(new Error(this.$t('messages.msg67')))
                            } else {
                                if (parseFloat(this.postNewAddForm.maxPrice) > parseFloat(this.max).toFixed(2)) {
                                    callback(new Error(`${this.$t('errors.err2')} ${(this.max).toFixed(2)}`))
                                }
                                else if (parseFloat(this.postNewAddForm.maxPrice) < parseFloat(this.min).toFixed(2)) {
                                    callback(new Error(`${this.$t('errors.err1')} ${(this.min).toFixed(2)}`))
                                }
                                else {
                                    callback()
                                }

                            }
                        },
                    }
                ],
                limitPrice: [
                    {
                        validator: async (rule, value, callback) => {
                            if (this.postNewAddForm.limitPrice === '' || this.postNewAddForm.limitPrice == null) {
                                callback(new Error(this.$t('messages.msg67')))
                            } else {
                                let range = 0;
                                if (this.direction == 1) {
                                    range = this.marketRate + (this.marketRate * (this.defaultValue.maxFloatingPtg - 100)) / 100;
                                }
                                else {
                                    range = parseFloat(this.marketRate) + (parseFloat(this.marketRate) * (this.defaultValue.minFloatingPtg - 100)) / 100;
                                }
                                if (parseFloat(this.postNewAddForm.limitPrice) > range && this.direction == 1) {
                                    callback(new Error(`${this.$t('errors.err2')} ${(range).toFixed(2)}`))
                                }
                                else if (parseFloat(this.postNewAddForm.limitPrice) < range && this.direction == -1) {

                                    callback(new Error(`${this.$t('errors.err13')} ${(range).toFixed(2)}`))
                                }
                                else {
                                    callback()
                                }

                            }
                        },
                        trigger: 'blur',
                    },
                ],
            }
        }
    },
    computed: {
        minMaxPriceVisibility() {
            if (this.postNewAddForm.amount == '' || this.postNewAddForm.amount <= 0) {
                this.resetMinMaxPrice();
                return true
            }
            else {
                return false;
            }
        },
        yourPrice() {
            let price = this.$store.getters.get_exchange_rate_by_name(this.currencies[this.postNewAddForm.coin]?.currencyname, this.fiats[this.postNewAddForm.fiat]?.name) * this.priceMargin / 100;
            return price.toFixed(2)
        },
        marketRate() {
            return this.$store.getters.get_exchange_rate_by_name(this.currencies[this.postNewAddForm.coin]?.currencyname, this.fiats[this.postNewAddForm.fiat]?.name).toFixed(2)
        },
        minamount() {
            const rate = this.$store.getters.get_exchange_rate_by_name(this.currencies[this.postNewAddForm.coin]?.currencyname, 'USDT')
            const amt = this.defaultValue.minamount / parseFloat(rate)
            return this.global_get_tofixed(amt, this.global_get_decimal(this.currencies[this.postNewAddForm.coin]?.currencyname).a)
        },
        maxamount() {
            const rate = this.$store.getters.get_exchange_rate_by_name(this.currencies[this.postNewAddForm.coin]?.currencyname, 'USDT')
            const amt = this.defaultValue.maxamount / parseFloat(rate)
            return this.global_get_tofixed(amt, this.global_get_decimal(this.currencies[this.postNewAddForm.coin]?.currencyname).a)
        },
        fee() {
            const amt = (this.postNewAddForm.amount * this.defaultValue.fee)
            return amt
        },
        canuseamount() {
            const currency = this.userAssets.filter(item => item.currency.currencyname == this.currencies[this.postNewAddForm.coin]?.currencyname)[0]
            if (currency) {
                let ca = currency.canuseamount;
                if (this.currentAdv?.enableamount > 0 && this.currencies[this.postNewAddForm.coin]?.currencyname == this.currentAdv?.currencyname) {
                    ca = (ca + (this.currentAdv.enableamount + (this.currentAdv.enableamount * this.currentAdv.fee)));
                }
                return this.global_get_tofixed(ca, this.global_get_decimal(this.currencies[this.postNewAddForm.coin]?.currencyname).a)


            }
            return 0;
        },
        getDataArray() {
            const _self = this;
            if (_self.searchValue != '') {
                const filtered = _self.fiats.filter(function (item) {
                    const str = item.name.toLowerCase();
                    if (str.indexOf(_self.searchValue.toLowerCase()) !== -1) {
                        item.found = true;
                    }
                    else {
                        item.found = false
                    }
                    return item
                });
                return filtered
            }
            return this.fiats
        },
        canDoP2PTrading() {
         
            return this.$userinfo.securitylevel >= 2 && this.$usersettings.moreconfig?.applyadv
        }
    },
    watch: {
        'fiats': function (val) {
            if (val) {
                this.initStatus = true;
                if (!this.$route.query.action) {
                    this.getLang();
                }
            }
        },
        canDoP2PTrading: {
            handler: function (canDo) {
                this.tradingRequirements = false
                this.postNewAddtradingRequirements = false
                if (!canDo) {
                    this.tradingRequirements = true;
                    this.postNewAddtradingRequirements = true
                }
            },
            immediate: true
        }
    },
    methods: {
        filterFiatOptions(str) {
            const _self = this;
            if (_self.searchValue !== '') {
                return (str.indexOf(_self.searchValue.toLowerCase()) !== -1)
            }
            return true
        },
        onOpen() {
            this.open = true
            if (this.open == true) {
                setTimeout(() => {
                    this.$refs.fiatSearch?.focus()
                }, 100);
            }
        },
        close() {
            if (this.$userinfo.securitylevel < 2) {
                this.tradingRequirements = true;
            }
            else {
                this.tradingRequirements = false;
            }

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
        filterCountryOptions(str) {
            const _self = this;
            if (_self.countrySearch !== '') {
                return (str.indexOf(_self.countrySearch.toLowerCase()) !== -1)
            }
            return true
        },
        onCountryOpen() {
            this.countryOpen = true
            if (this.countryOpen == true) {
                setTimeout(() => {
                    this.$refs.countrySearch?.focus()
                }, 100);
            }
        },
        setCountryOpen(bool) {
            if (this.countryOpen == bool) {
                return
            }
            if (!bool) {
                setTimeout(() => {
                    this.countryOpen = bool
                    this.countrySearch = '';
                }, 100);
            }
            else {
                this.countryOpen = bool;
            }
        },
        useAllAmount() {
            this.postNewAddForm.amount = this.canuseamount;
            this.onAmountChange();
        },
        onPriceTypeChange() {
            if (this.priceType == 'Fixed') {
                this.priceMargin = this.$store.getters.get_exchange_rate_by_name(this.currencies[this.postNewAddForm.coin].currencyname, this.fiats[this.postNewAddForm.fiat].name).toFixed(2)
            }
            else {
                this.priceMargin = 100;
            }
            this.onAmountChange();
            this.onDirectionChange();

        },
        onDirectionChange(val) {
            if (val) {
                this.direction = val;
            }
            if (this.direction == 1) {
                this.postNewAddForm.limitPrice = (parseFloat(this.yourPrice) * 1.1).toFixed(2);
            }
            else {
                //this.postNewAddForm.limitPrice = (parseFloat(this.marketRate) + (parseFloat(this.marketRate) * ((this.defaultValue.minFloatingPtg+5 )- 100)) / 100).toFixed(2);

                this.postNewAddForm.limitPrice = (parseFloat(this.yourPrice) * 0.9).toFixed(2);
            }

        },
        resetMinMaxPrice() {
            this.postNewAddForm.minPrice = '';
            this.postNewAddForm.maxPrice = '';

        },
        onChange(method) {
            if (this.SelectPaymentMethodCount > 3 && !method.checked) {
                return;
            }
            method.checked ? this.SelectPaymentMethodCount-- : this.SelectPaymentMethodCount++;
            this.$set(method, 'checked', !method.checked);
            if (this.SelectPaymentMethodCount > 0) {
                this.noPayMethod = false;
            }
        },
        onAmountChange() {
            this.$refs['postNewAddForm']?.clearValidate(['minPrice', 'maxPrice']);
            const x = parseFloat(this.priceType == 'Fixed' ? this.priceMargin : this.yourPrice) * parseFloat(this.postNewAddForm.amount != '' ? this.postNewAddForm.amount : 0);
            this.onDirectionChange()
            this.max = x + (x * this.defaultValue.fee);
            this.min = this.max / 10;
            this.postNewAddForm.minPrice = this.min.toFixed(2);
            this.postNewAddForm.maxPrice = this.max.toFixed(2);

        },
        coinChange() {
            if (this.priceType == 'Fixed') {
                this.priceMargin = this.$store.getters.get_exchange_rate_by_name(this.currencies[this.postNewAddForm.coin]?.currencyname, this.fiats[this.postNewAddForm.fiat].name).toFixed(2);
            }
        },
        prev() {
            if (this.current > 0)
                this.current--;
        },
        async next() {
            if (this.current < 1) {
                if (this.priceType == 'Fixed') {
                    this.current++;
                    return
                }
                await this.$refs['postNewAddForm'].validateField('limitPrice', (errorMessage) => {
                    if (!errorMessage) {
                        this.current++;
                    }
                })
            }
            else if (this.current < 2) {
                await this.$refs['postNewAddForm'].validate((valid) => {
                    if (valid) {
                        if (this.SelectPaymentMethodCount > 0) {
                            this.current++;
                        }
                        else {
                            this.noPayMethod = true;
                        }
                    }
                })
            }
            else {
                this.PostAdv();
            }
        },
        toggleModel(model) {
            this.model = model;
        },
        async getAllC2CPaymentMethods() {
            const _self = this;
            _self.toggleModel(true);
            try {
                let { data } = await _self.$store.dispatch('trading_c2c_all_payment_method_get', {
                });
                _self.paymentMethodCollection = data;
            } catch (error) {
                //console.log('Error', error);
            }
        },
        getRegions() {
            const _self = this;
            this.$store.dispatch("com_country_getlist").then(({ data }) => {
                data.map((item, index) => {
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
                    if (_self.currentAdv && item.countryid == _self.currentAdv.areacode) {
                        _self.postNewAddForm.areaCode = index;
                    }
                    else if (!_self.currentAdv && item.countryid == _self.$userinfo.countryid) {
                        _self.postNewAddForm.areaCode = index;
                    }
                });
            });
        },
        async paymentGetList() {
            this.$store.dispatch('user_user_payments_get').then(({ data }) => {
                if (data) {
                    this.userpaymentMethods = data;
                    if (this.currentAdv) {
                        this.userpaymentMethods.forEach(item => {
                            this.currentAdv.payconfiglist.forEach(_pc => {
                                if (_pc.identifier == item.identifier) {
                                    item.checked = true;
                                    this.SelectPaymentMethodCount++;
                                    this.noPayMethod = false;
                                }
                            })
                        })
                    }
                }
            })
        },
        priceMarginChange(e) {
            if (isNaN(e)) {
                return
            }
            if (this.priceType == 'Floating') {
                if (e < this.defaultValue.minFloatingPtg) {
                    this.priceMargin = this.defaultValue.minFloatingPtg
                    return
                }
                else if (e > this.defaultValue.maxFloatingPtg) {
                    this.priceMargin = this.defaultValue.maxFloatingPtg
                    return
                }
                this.priceMargin = e;
            }
            else {
                const marketPrice = this.$store.getters.get_exchange_rate_by_name(this.currencies[this.postNewAddForm.coin]?.currencyname, this.fiats[this.postNewAddForm.fiat].name).toFixed(2)
                if (e * 100 / marketPrice < this.defaultValue.minFixedPtg || e * 100 / marketPrice >= this.defaultValue.maxFixedPtg) {
                    return
                }
                this.priceMargin = e;
            }
            this.onAmountChange();
        },
        getConstants() {
            const _self = this;
            this.$store.dispatch('com_constants_getconstantsinfo', { key: "c2c_settinginfo" })
                .then(({ data }) => {
                    if (data) {
                        var settinginfo = JSON.parse(data)
                        _self.defaultValue = settinginfo;
                    }
                });
        },
        getP2pCurrencies() {
            var _self = this;
            this.$store.dispatch('frenchcurrency_get_c2c')
                .then(({ data }) => {
                    if (data) {

                        data.filter(_d => {
                            this.$store.state.currencyinfos.filter(_c => {
                                if (_d == _c.currencyname) {
                                    this.currencies.push(_c)
                                }
                            })
                        })
                    }
                    this.fiats = this.fiatpaymenttypeget();
                })
        },
        LoadP2pAssets() {
            var _self = this;
            this.$store.dispatch('trading_user_c2c_userc2cassets_get')
                .then(({ data }) => {
                    if (data) {
                        this.userAssets = data;
                    }
                })
        },
        setCurrentAdv() {
            this.direction = this.currentAdv.direction;
            // this.postNewAddForm.amount = this.currentAdv.amount;
            this.postNewAddForm.amount = this.global_get_tofixed((parseFloat(this.currentAdv.enableamount) + (parseFloat(this.currentAdv.enableamount) * parseFloat(this.currentAdv.fee))), this.global_get_decimal(this.currentAdv.currencyname).a)


            this.postNewAddForm.minPrice = this.currentAdv.minprice;
            this.postNewAddForm.maxPrice = this.currentAdv.maxprice;
            this.postNewAddForm.autoreply = this.currentAdv.autoreply
            this.isMoreTrans = this.currentAdv.transactionnum == 0 ? false : true;
            this.currentAdv.orderstatus == 0 ? this.postNewAddForm.orderStatus = this.$t('conditionaltxt.ct13') : this.postNewAddForm.orderStatus = this.$t('conditionaltxt.ct15'),
                this.currencies.filter((item, index) => {
                    if (item.currencyname == this.currentAdv.currencyname) {
                        this.postNewAddForm.coin = index;
                    }
                })
            this.fiats.filter((item, index) => {
                if (item.name == this.currentAdv.legaltype) {
                    this.postNewAddForm.fiat = index;
                }
            })
            if (this.currentAdv.price == 0) {
                this.priceType = 'Floating'
                this.postNewAddForm.limitPrice = this.currentAdv.limitprice
                this.priceMargin = (this.currentAdv.premium * 100) + 100
            }
            else {
                this.priceType = 'Fixed'
                this.priceMargin = this.currentAdv.price
            }

            const x = parseFloat(this.priceMargin) * parseFloat(this.postNewAddForm.amount != '' ? this.postNewAddForm.amount : 0);
            this.max = x + (x * this.defaultValue.fee);
            this.min = this.max / 10;
        },
        PostAdv() {
            if (this.$userinfo.securitylevel < 2) {
                this.tradingRequirements = true;
                return
            }
            this.loading = true;
            let postData = {
                direction: this.direction,
                legalType: this.fiats[this.postNewAddForm.fiat].name,
                areaCode: this.countryOptions[this.postNewAddForm.areaCode].id,
                currencyID: this.currencies[this.postNewAddForm.coin].id,
                amount: this.postNewAddForm.amount,
                minPrice: this.postNewAddForm.minPrice,
                maxPrice: this.postNewAddForm.maxPrice,
                orderExpiredTime: this.postNewAddForm.orderExpiredTime,
                autoReply: this.postNewAddForm.autoreply,
                orderStatus: this.postNewAddForm.orderStatus == this.$t('conditionaltxt.ct13') ? 0 : 1,
                transactionNum: this.isMoreTrans == true ? 1 : 0,
            }
            if (this.priceType == 'Fixed') {
                postData.price = this.priceMargin;
            }
            else {
                postData.premium = (this.priceMargin - 100) / 100;
                postData.limitPrice = this.postNewAddForm.limitPrice;
            }
            const methods = this.userpaymentMethods.filter(item => item.checked);
            let methodsString = '';
            methods.filter((item, index) => {
                methodsString = methodsString + item.identifier
                    ;
                if (index != methods.length - 1) {
                    methodsString = methodsString + ', ';
                }
            })
            if (this.action == 'edit') {
                postData.id = this.currentAdv.id;
            }
            postData.payTypes = methodsString;
            this.$store.dispatch('trading_c2c_goods_add', postData)
                .then((data) => {
                    this.loading = false;
                    if (data.code == '200') {
                        this.applySuccessModel = {
                            ServerMessage: data.msg,
                            ClientMessage: this.$t('messages.msg64'),
                        }
                    }
                });

        },
        getLang() {
            if (this.$route.query.action) {
                this.fiats.filter((item, index) => {
                    if (item.name == this.currentAdv.legaltype) {
                        this.postNewAddForm.fiat = index;
                    }
                })
                return;
            }
            this.$store.dispatch("com_getlangbyip").then(({ data }) => {
                this.fiats.filter((item, index) => {
                    if (item.name == data.currency_code) {
                        this.postNewAddForm.fiat = index;
                    }
                })
                this.priceMargin = this.$store.getters.get_exchange_rate_by_name(this.currencies[this.postNewAddForm.coin].currencyname, this.fiats[this.postNewAddForm.fiat].name).toFixed(2)

            });
        },
        //Nofification Close
        applySuccessModelClose() {
            this.applySuccessModel = {};
            this.$router.push('/p2p/my-ads');
        },
        getAdDetail(ad_id) {

            let postData = {
                orderStatus: [0, 1],
                orderID: ad_id,
                touserid: this.$userinfo.uid,
            }

            //console.log('postData', postData)
            this.$store.dispatch('trading_c2c_market_pagedlist', postData).then(({ data }) => {
                //console.log('postData: data', data)
                if (data && data.pagedata.length > 0) {

                    this.currentAdv = data.pagedata[0]
                    this.orderDetail = data.pagedata;
                    this.setCurrentAdv()
                } else {
                    this.orderDetail = [];
                }
            })


        }
    },
    mounted() {

        this.getP2pCurrencies();
        if (this.$route.query.action) {
            this.action = this.$route.query.action
            this.editView = this.action == 'edit'
            this.getAdDetail(this.$route.query.id)

        }
        this.LoadP2pAssets();
        this.getRegions();
        this.paymentGetList();
        this.getConstants();



    }
}
</script>

<style lang="scss" scoped>
.ant-radio-button-wrapper:focus-within {
    box-shadow: none;
}
</style>
