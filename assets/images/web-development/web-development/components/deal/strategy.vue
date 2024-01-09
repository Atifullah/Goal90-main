<template>
    <div>
        <a-form-model class="strategy-form" ref="strategyForm" :model="manual" :rules="setValidation.rules"
            :hide-required-mark="true" label-align="left">
            <a-tabs class="strategy" v-model="autoManual" default-active-key="1" @change="setToDefaulValues()">
                <a-tab-pane :key="1" :tab="$t('tabkeys.tab63')">
                    <a-row :gutter="16" class="long-short" v-if="isFuture">
                        <a-col :lg="18">
                            <a-radio-group v-model="manual.direction_type" @change="switchLongShort()">
                                <a-radio-button value="1" class="radio">
                                    {{ $t('leverage.long') }}
                                </a-radio-button>

                                <a-radio-button value="-1" class="radio">
                                    {{ $t('leverage.short') }}
                                </a-radio-button>

                            </a-radio-group>
                        </a-col>
                        <a-col :lg="3" align="end">
                            <div class=" text-right">
                                <span class="p-1 margin-trade-new" @click="showLeverage()">
                                    {{ manual.multiple }}X
                                </span>
                            </div>
                        </a-col>

                        <a-col :lg="2">
                            <div class=" text-right ">
                                <a href="javascript:;" @mouseover="hoverKey = 'calculator'" @mouseleave="hoverKey = ''"
                                    @click="showCalculator()">
                                    <img :src="hoverKey == 'calculator' ? '/images/orange-calculator.svg' : '/images/white-calculator.svg'"
                                        height="20px" />
                                </a>
                            </div>
                        </a-col>

                        <a-col :lg="24">
                            <a-divider class="transfer-border" />
                        </a-col>
                    </a-row>


                    <a-row class="mx-3">
                        <a-col :lg="24">
                            <p class="investment-txt fw-5 mb-0 label-heading">
                                {{ $t('deal_new.dn12') }}
                                <AppInfoTooltip :title="$t('strategy.paramater_help')" />
                                <!-- <img src="/images/info-circle1.svg" class="pl-1" /> -->
                            </p>
                        </a-col>
                    </a-row>
                    <a-row :gutter="16" class="col-alignment mx-2 mt-3">
                        <a-col :lg="8">
                            <p class="price-range fw-5 mb-0 gray-black">{{ $t('deal_new.dn13') }} </p>
                        </a-col>
                        <a-col :lg="16" align="end">
                            <p class="mb-0 price-range fw-5">

                                {{ cutZero(global_get_tofixed(strategyInfo.minprice,
                                    global_get_decimal(tCurrencyName).a)) }}
                                -
                                {{ cutZero(global_get_tofixed(strategyInfo.maxprice,
                                    global_get_decimal(tCurrencyName).a)) }}
                                {{ tCurrencyName }}
                            </p>
                        </a-col>
                    </a-row>
                    <a-row :gutter="16" class="col-alignment mx-2 mt-3">
                        <a-col :lg="10">
                            <p class="price-range fw-5 mb-0 gray-black">{{ $t('deal_new.dn14') }}</p>
                        </a-col>
                        <a-col :lg="14" align="end">
                            <p class="mb-0 price-range fw-5">{{ strategyInfo.gridnum }}</p>
                        </a-col>
                    </a-row>

                    <a-row :gutter="16" class="col-alignment mx-2 mt-3">
                        <a-col :lg="14">
                            <p class="price-range fw-5 mb-0 gray-black">{{ $t('deal_new.dn15') }} </p>
                        </a-col>
                        <a-col :lg="10" align="end">
                            <!-- calculated from store -->
                            <p class="mb-0 price-range fw-5">{{ diffRatio.min + ' % - ' + diffRatio.max + '%' }}</p>
                        </a-col>
                    </a-row>

                    <a-row :gutter="16" class="mx-2 mt-3">
                        <a-col :lg="24">
                            <a href="javascript:;" class="price-range fw-5 mb-0 gray-black"
                                @click="copyParamaters(); autoManual = 2">{{ $t('deal_new.dn16') }}</a>
                            <a-divider class="my-4 transfer-border" />
                            <a-row :gutter="16" class="my-3 col-alignment">
                                <a-col :lg="13">
                                    <p class="investment-txt fw-5 mb-0 label-heading">{{ $t('deal_new.dn17') }}
                                        <AppInfoTooltip :title="$t('strategy.investment_help')" />
                                    </p>
                                </a-col>
                                <a-col :lg="11" v-if="!isFuture">
                                    <div class="invesment-usdt">
                                        <div class="first-btn fw-5 p-1 cursor" :class="isUsdt ? 'active' : ''"
                                            @click="convertAvailableBalance(tCurrencyName)">
                                            {{ tCurrencyName }}
                                        </div>

                                        <div class="first-btn fw-5 p-1  cursor" :class="!isUsdt ? 'active' : ''"
                                            @click="convertAvailableBalance(symbleinfo.fcurrencyname)">
                                            {{ symbleinfo.fcurrencyname }}
                                        </div>

                                    </div>
                                </a-col>

                            </a-row>

                            <a-row>
                                <a-col :lg="12">
                                    <p class="mb-2 price-range fw-5">
                                        <span class="gray-black">{{ $t('deal.usable') }}</span>
                                        <img src="/images/arrow-2.svg" class="cursor" @click="showPopTrasfer()" />
                                    </p>
                                </a-col>
                                <a-col :lg="12">
                                    <p class="mb-2 price-range fw-5 text-right">
                                        {{ availableBalance }}
                                    </p>
                                </a-col>
                            </a-row>

                            <a-form-model-item prop="investment_price" :colon="false" :wrapper-col="{
                                xl: 24,
                                lg: 24,
                                md: 24,
                                sm: 24,
                                xs: 24,
                            }">
                                <div class="input-wrapper">
                                    <a-input @change="validateStrategyData()" type="number" class="grid-input"
                                        v-model="manual.investment_price"
                                        :addon-after="`${' ≥ ' + manual.min_trade_amount} ${selectedCurrency}`" />
                                </div>
                            </a-form-model-item>
                            <!-- <a-slider class="pt-2 pb-2" /> -->
                            <!-- <AppSlider class="mt-4" /> -->
                            <!-- @slider:change="getEntrustSaleNum" -->

                            <hex-slider @slider:change="updateInestmentPrice" :dec="initSliderValue" />

                            <p class="pt-2 avbl-desc fw-5">{{ $t('deal_new.dn31') }}
                                <a href="javascript:;" @click="showPopTrasfer()" class="active-txt">{{ $t('deal_new.dn18')
                                }}</a> {{ $t('deal_new.dn19') }}
                                <nuxt-link :to="selfRoute.wallet" class="active-txt">{{ $t('deal_new.dn20') }}</nuxt-link>
                                {{ $t('deal_new.dn19') }}
                                <nuxt-link :to="selfRoute.convert" class="active-txt"> {{ $t('deal_new.dn21') }}</nuxt-link>

                                <AppInfoTooltip :title="$t('strategy.submit_info')" />

                            </p>



                        </a-col>
                    </a-row>

                    <div class="mt-2 mb-3" v-if="isFuture">
                        <CurrentCurrencyMarginValue :contractAssetsInfo="contractassesinfo" :contractType="contractType"
                            :fCurrencyName="symbleinfo.fcurrencyname" />
                    </div>

                    <a-row class="mx-2" :gutter="16" :class="!isFuture ? ' mt-3' : ''">
                        <a-col :lg="24" v-if="$userinfo.uid">
                            <a-button class="primary-btn fw-5 mb-3 success-btn" :loading="creatingStrategy"
                                :disabled="!strategyFormValidated || creatingStrategy" block @click="createStrategy()"
                                v-if="manual.direction_type == 1">
                                {{ $t('deal_new.dn22') }}
                            </a-button>

                            <a-button class="primary-btn fw-5 mb-3 danger-btn" :loading="creatingStrategy"
                                :disabled="!strategyFormValidated || creatingStrategy" block @click="createStrategy()"
                                v-else-if="manual.direction_type == -1">
                                {{ $t('deal_new.dn23') }}
                            </a-button>

                            <a-button class="primary-btn fw-5 mb-3" :loading="creatingStrategy"
                                :disabled="!strategyFormValidated || creatingStrategy" block @click="createStrategy()"
                                v-else>
                                {{ $t('deal_new.dn24') }}
                            </a-button>
                        </a-col>
                        <a-col :lg="24" v-else>
                            <div class=" no_login  my-3">
                                <nuxt-link to="/login" tag="span" class="repeal">{{ $t("home.headLogin")
                                }}</nuxt-link>
                                /
                                <nuxt-link to="/register" tag="span" class="repeal">{{ $t("home.headRegister")
                                }}</nuxt-link>
                            </div>
                        </a-col>
                    </a-row>

                </a-tab-pane>

                <a-tab-pane :key="2" :tab="$t('tabkeys.tab64')">

                    <a-row :gutter="16" class="long-short" v-if="isFuture">
                        <a-col :lg="18">
                            <a-radio-group v-model="manual.direction_type" @change="switchLongShort()">
                                <a-radio-button value="1" class="radio">
                                    {{ $t('leverage.long') }}
                                </a-radio-button>
                                <a-radio-button value="-1" class="radio">
                                    {{ $t('leverage.short') }}
                                </a-radio-button>
                            </a-radio-group>
                        </a-col>

                        <a-col :lg="3" align="end">
                            <div class=" text-right">
                                <span class="p-1 margin-trade-new" @click="showLeverage()">
                                    {{ manual.multiple }}X
                                </span>
                            </div>
                        </a-col>

                        <a-col :lg="2">
                            <div class=" text-right ">
                                <a href="javascript:;" @mouseover="hoverKey = 'calculator'" @mouseleave="hoverKey = ''"
                                    @click="showCalculator()">
                                    <img :src="hoverKey == 'calculator' ? '/images/orange-calculator.svg' : '/images/white-calculator.svg'"
                                        height="20px" />
                                </a>
                            </div>
                        </a-col>


                        <a-col :lg="24">
                            <a-divider class="transfer-border" />
                        </a-col>
                    </a-row>

                    <div class="mx-3">
                        <a-row class="mb-2 col-alignment">
                            <a-col :lg="12">
                                <p class="mb-0 price-range fw-5  label-heading">{{ $t('deal_new.dn25') }}</p>
                            </a-col>
                            <a-col :lg="12" class="text-right">
                                <a href="javascript:;" @click="autoFill()" v-if="!autoFilled" class="active">{{
                                    $t('deal_new.dn26') }}</a>
                                <a href="javascript:;" class="gray-black" @click="clearField()" v-if="autoFilled">{{
                                    $t('deal_new.dn27') }}</a>
                            </a-col>
                        </a-row>


                        <a-row class="mb-3 pb-1">
                            <a-col :lg="11">
                                <a-form-model-item prop="min_price" :colon="false" :wrapper-col="{
                                    xl: 24,
                                    lg: 24,
                                    md: 24,
                                    sm: 24,
                                    xs: 24,
                                }
                                    ">
                                    <a-input placeholder="Min" type="number" v-model="manual.min_price"
                                        @change="updateManualData()" />
                                </a-form-model-item>
                            </a-col>
                            <a-col :lg="2" align="center" class="pt-2 mt-1">
                                <p class="delta-icon mb-0">~</p>
                            </a-col>
                            <a-col :lg="11">
                                <a-form-model-item prop="max_price" :colon="false" :wrapper-col="{
                                    xl: 24,
                                    lg: 24,
                                    md: 24,
                                    sm: 24,
                                    xs: 24,
                                }
                                    ">
                                    <a-input placeholder="Max" type="number" v-model="manual.max_price"
                                        @change="updateManualData()" />
                                </a-form-model-item>
                            </a-col>
                        </a-row>

                        <a-row>
                            <a-col :lg="24">
                                <p class="mb-2 price-range fw-5 label-heading">{{ $t('deal_new.dn28') }}</p>

                                <a-row :gutter="16" class="">
                                    <a-col :lg="24">
                                        <a-form-model-item prop="no_of_grids" :colon="false" :wrapper-col="{
                                            xl: 24,
                                            lg: 24,
                                            md: 24,
                                            sm: 24,
                                            xs: 24,
                                        }
                                            ">
                                            <a-input class="grid-input" :min="gridRange.min" type="number" :max-length="3"
                                                :addon-after="`${gridRange.min + '-' + gridRange.max} Grids`"
                                                :max="gridRange.max" v-model="manual.no_of_grids"
                                                @change="updateManualData()" />
                                        </a-form-model-item>
                                    </a-col>
                                </a-row>


                                <a-row :gutter="16" class="mt-2">
                                    <a-col :lg="14">
                                        <p class="price-range fw-5 mb-0 gray-black">{{ $t('deal_new.dn29') }}</p>
                                    </a-col>
                                    <a-col :lg="10" align="end">
                                        <p class="price-range fw-5 mb-0 gray-black">
                                            {{ manual.min_ratio }}% - {{ manual.max_ratio }}%
                                        </p>
                                    </a-col>
                                </a-row>
                                <a-row :gutter="16" class="mt-3 mb-2 pb-1 col-alignment">

                                    <a-col :lg="13">
                                        <p class="investment-txt fw-5 mb-0 label-heading">{{ $t('deal_new.dn30') }}
                                            <AppInfoTooltip :title="$t('strategy.investment_help')" />
                                        </p>
                                    </a-col>

                                    <a-col :lg="11" v-if="!isFuture">
                                        <div class="invesment-usdt">
                                            <div class="first-btn fw-5 p-1 cursor" :class="isUsdt ? 'active' : ''"
                                                @click="convertAvailableBalance(tCurrencyName); validateStrategyData()">
                                                {{ tCurrencyName }}
                                            </div>


                                            <div class="first-btn fw-5 p-1 cursor" :class="!isUsdt ? 'active' : ''"
                                                @click="convertAvailableBalance(symbleinfo.fcurrencyname); validateStrategyData()">
                                                {{ symbleinfo.fcurrencyname }}
                                            </div>
                                        </div>
                                    </a-col>

                                </a-row>
                            </a-col>
                        </a-row>

                        <a-row>
                            <a-col :lg="8">
                                <p class="mb-2 price-range fw-5">
                                    <span class="gray-black">{{ $t('deal.usable') }}</span>
                                    <img src="/images/arrow-2.svg" class=" cursor" @click="showPopTrasfer()" />
                                </p>
                            </a-col>

                            <a-col :lg="16">
                                <p class="mb-2 price-range fw-5 text-right">
                                    {{ availableBalance }}
                                </p>
                            </a-col>

                            <a-col :lg="24">

                                <a-form-model-item prop="investment_price" :colon="false" :wrapper-col="{
                                    xl: 24,
                                    lg: 24,
                                    md: 24,
                                    sm: 24,
                                    xs: 24,
                                }
                                    ">
                                    <div class="input-wrapper">
                                        <a-input @change="validateStrategyData();" type="number" class="grid-input"
                                            v-model="manual.investment_price"
                                            :addon-after="`${' ≥ ' + manual.min_trade_amount} ${selectedCurrency}`" />
                                    </div>
                                </a-form-model-item>

                                <div class="pt-0">
                                    <hex-slider @slider:change="updateInestmentPrice" :dec="initSliderValue" />
                                </div>
                                <p class="avbl-desc fw-5 pt-1">
                                    {{ $t('deal_new.dn31') }}
                                    <a href="javascript:;" @click="showPopTrasfer()" class="active-txt">{{
                                        $t('deal_new.dn18') }}</a> {{ $t('deal_new.dn19') }}
                                    <nuxt-link :to="selfRoute.wallet" class="active-txt">{{
                                        $t('deal_new.dn20') }}</nuxt-link>
                                    {{ $t('deal_new.dn19') }}
                                    <nuxt-link :to="selfRoute.convert" class="active-txt">
                                        {{ $t('deal_new.dn21') }}</nuxt-link>
                                    <AppInfoTooltip :title="$t('strategy.submit_info')" />
                                </p>





                                <a-divider class="my-3 transfer-border" />
                                <a-collapse class="advance-setting" expand-icon-position="right"
                                    @change="openingAdvanceSetting">
                                    <a-collapse-panel key="1" header="Advanced Setting" class="additional-setting">
                                        <a-form-model-item prop="stop_loss_price" :colon="false" :wrapper-col="{
                                            xl: 24,
                                            lg: 24,
                                            md: 24,
                                            sm: 24,
                                            xs: 24,
                                        }
                                            ">
                                            <div class="input-wrapper">
                                                <a-input @change="validateStrategyData()" type="number" class="mt-3"
                                                    ref="stopLossLimit" v-model="manual.stop_loss_price"
                                                    placeholder="Stop Loss"
                                                    :addon-after="`${advanceOption.stop_loss_limit} ${tCurrencyName}`" />
                                            </div>

                                        </a-form-model-item>
                                        <a-form-model-item prop="stop_profit_price" :colon="false" :wrapper-col="{
                                            xl: 24,
                                            lg: 24,
                                            md: 24,
                                            sm: 24,
                                            xs: 24,
                                        }
                                            ">
                                            <div class="input-wrapper">
                                                <a-input @change="validateStrategyData()" type="number" class="mt-3"
                                                    v-model="manual.stop_profit_price" placeholder="Take Profit"
                                                    :addon-after="`${advanceOption.take_profit_limit} ${tCurrencyName}`" />
                                            </div>
                                        </a-form-model-item>


                                        <a-row :gutter="16" class="mt-3">
                                            <a-col :lg="11">
                                                <p class="price-range fw-5 mb-0 gray-black">
                                                    {{ $t('deal_new.dn32') }}
                                                </p>
                                            </a-col>

                                            <a-col :lg="13" align="end">
                                                <a-radio-group v-model="manual.time_period" size="small">
                                                    <a-radio-button value="3">
                                                        3D
                                                    </a-radio-button>
                                                    <a-radio-button value="7">
                                                        7D
                                                    </a-radio-button>
                                                    <a-radio-button value="30">
                                                        30D
                                                    </a-radio-button>
                                                    <a-radio-button value="180">
                                                        180D
                                                    </a-radio-button>
                                                </a-radio-group>

                                            </a-col>
                                        </a-row>

                                        <a-row class="mt-3">
                                            <a-col :lg="24">
                                                <a-checkbox class="price-range fw-5 gray-black"
                                                    v-model="manual.stop_cancel">
                                                    {{ $t('deal_new.dn33') }}
                                                </a-checkbox>
                                            </a-col>
                                        </a-row>

                                    </a-collapse-panel>
                                </a-collapse>
                            </a-col>
                        </a-row>



                    </div>

                    <div class="my-3" v-if="isFuture">
                        <CurrentCurrencyMarginValue :contractAssetsInfo="contractassesinfo" :contractType="contractType"
                            :fCurrencyName="symbleinfo.fcurrencyname" />
                    </div>

                    <a-row class="mx-2 " :gutter="16" :class="!isFuture ? ' mt-3' : ''">

                        <a-col :lg="24" v-if="$userinfo.uid">
                            <a-button class="primary-btn fw-5 mb-4 success-btn" :loading="creatingStrategy"
                                :disabled="!strategyFormValidated || creatingStrategy" block @click="createStrategy()"
                                v-if="manual.direction_type == 1">
                                {{ $t('deal_new.dn22') }}
                            </a-button>

                            <a-button class="primary-btn fw-5 mb-4 danger-btn" :loading="creatingStrategy"
                                :disabled="!strategyFormValidated || creatingStrategy" block @click="createStrategy()"
                                v-else-if="manual.direction_type == -1">
                                {{ $t('deal_new.dn23') }}
                            </a-button>

                            <a-button class="primary-btn fw-5 mb-4 " :loading="creatingStrategy"
                                :disabled="!strategyFormValidated || creatingStrategy" block @click="createStrategy()"
                                v-else>
                                {{ $t('deal_new.dn24') }}
                            </a-button>
                        </a-col>

                        <a-col :lg="24" v-else>
                            <div class=" no_login  my-3">
                                <nuxt-link to="/login" tag="span" class="repeal">
                                    {{ $t("home.headLogin") }}
                                </nuxt-link>
                                /
                                <nuxt-link to="/register" tag="span" class="repeal">
                                    {{ $t("home.headRegister") }}
                                </nuxt-link>
                            </div>
                        </a-col>
                    </a-row>

                </a-tab-pane>

            </a-tabs>
        </a-form-model>
        <ApplySuccessModal :applySuccessModel="successModel" @applySuccessModelClose="successModel = {}" />
    </div>
</template>
<script>

import { mapActions, mapGetters } from 'vuex'
import { gridProfitFees, gridProfitFeesRange } from '~/plugins/helpers';
import ApplySuccessModal from '../AgentPlan/ApplySuccessModal.vue';
import AppSlider from '@/components/App/AppSlider.vue'
import AppInfoTooltip from '../App/AppInfoTooltip.vue';
import slider from '@/components/public/slider'
import AppNumber from '../App/AppNumber.vue';
import CurrentCurrencyMarginValue from './CurrentCurrencyMarginValue.vue'

export default {
    name: 'Strategy',
    components: {
        ApplySuccessModal,
        AppSlider,
        "hex-slider": slider,
        AppInfoTooltip,
        AppNumber,
        CurrentCurrencyMarginValue
    },
    emits: ['onOpenTransferPopup', 'onShowLeverage', 'onShowCalculator'],
    props: {
        contractassesinfo: {
            type: Object
        },
        symbleinfo: {
            type: Object,
            default: () => { }
        },
        newmoney: {
            type: Object,
            default: () => { }
        },
        tradingTo: {
            type: Object,
            default: () => { }
        },
        tradingFrom: {
            type: Object,
            default: () => { }
        },
        isMargin: {
            type: Boolean,
            default: false,
        },
        isSpot: {
            type: Boolean,
            default: false,
        },
        isFuture: {
            type: Boolean,
            default: false,
        },
        borrowMultiple: {
            type: [String, Number],
            default: 0,
        },
    },
    data() {
        return {
            buyable: 0,
            strategyInfo: {},
            autoManual: 2,
            autoFilled: false,
            isUsdt: true,
            selectedCurrency: "USDT",
            strategyFormValidated: true,
            settingOpened: false,
            leverageShow: false,
            ctid: 0,
            strategyBotId: 0,
            diffRatio: {
                min: "--",
                max: "--"
            },
            successModel: {

            },
            gridRange: {
                min: 2,
                max: 99
            },
            advanceOption: {
                stop_loss_limit: 0,
                take_profit_limit: 0,
            },
            manual: {
                min_price: "",
                max_price: "",
                no_of_grids: "",
                min_ratio: "0.0",
                max_ratio: "0.0",
                min_trade_amount: "",
                stop_loss_price: "",
                stop_profit_price: "",
                stop_cancel: false,
                time_period: "",
                investment_price: "",
                // default for margin or spot but for future changed (short, long)
                // short:sell
                // long: buy
                direction_type: "0"
            },
            availableBalance: "",
            hoverKey: '',
            setValidation: {
                rules: {
                    min_price: [
                        {
                            required: true,
                            message: this.$t('messages.msg55'),
                        },
                        {
                            validator: async (rule, v, callback) => {
                                const lowerLimit = this.limits.lower;
                                const value = parseFloat(v);
                                if (value <= lowerLimit) {
                                    callback(new Error(`${this.$t('errors.err4')} ${lowerLimit} USDT.`));
                                }
                                else if (value >= parseFloat(this.manual.max_price)) {
                                    callback(new Error(`${this.$t('errors.err5')}`));
                                }
                            },
                            trigger: ["blur", "change"],
                        },
                    ],
                    max_price: [
                        {
                            required: true,
                            message: this.$t('messages.msg56'),
                        },
                        {
                            validator: async (rule, v, callback) => {
                                const upperLimit = this.limits.upper;
                                const lowerLimit = this.limits.lower;
                                const value = parseFloat(v);
                                if (value < parseFloat(this.manual.min_price)) {
                                    callback(new Error(`${this.$t('errors.err6')}`));
                                }
                                else if (value <= lowerLimit) {
                                    callback(new Error(`${this.$t('errors.err7')} ${lowerLimit} USDT.`));
                                }
                                else if (value >= upperLimit) {
                                    callback(new Error(`${this.$t('errors.err8')} ${upperLimit} USDT.`));
                                }
                            },
                            trigger: ["blur", "change"],
                        },
                    ],
                    stop_loss_price: [
                        {
                            validator: async (rule, v, callback) => {
                                const value = parseFloat(v)
                                const minPrice = parseFloat(this.manual.min_price)
                                const maxPrice = parseFloat(this.manual.max_price)
                                const stopLossPrice = parseFloat(this.manual.stop_loss_price)
                                let direction = 0


                                if (this.isSpot || this.isMargin) {
                                    let fAmount = 0

                                    if (this.selectedCurrency != "USDT") {
                                        fAmount = parseFloat(this.manual.investment_price)
                                    }

                                    direction = fAmount > 0 ? -1 : 1
                                }

                                if (this.isFuture) {
                                    direction = this.manual.direction_type
                                }

                                if (direction == -1 && stopLossPrice <= maxPrice) {
                                    callback(new Error(`${this.$t('errors.err9')}`));
                                } else if (direction == 1 && value >= minPrice) {
                                    callback(new Error(`${this.$t('errors.err10')}`));
                                }


                            },
                            trigger: ["blur", "change"],
                        },
                    ],
                    stop_profit_price: [
                        {
                            validator: async (rule, v, callback) => {
                                const maxPrice = parseFloat(this.manual.max_price)
                                const minPrice = parseFloat(this.manual.min_price)
                                const stopProfitPrice = parseFloat(this.manual.stop_profit_price)
                                const value = parseFloat(v)

                                let direction = 0

                                if (this.isSpot || this.isMargin) {
                                    let fAmount = 0

                                    if (this.selectedCurrency != "USDT") {
                                        fAmount = this.manual.investment_price
                                    }

                                    direction = fAmount > 0 ? -1 : 1
                                }

                                if (this.isFuture) {
                                    direction = this.manual.direction_type
                                }

                                if (direction == -1 && stopProfitPrice >= minPrice) {
                                    callback(new Error(`${this.$t('errors.err11')}`))

                                } else if (direction == 1 && value <= maxPrice) {
                                    callback(new Error(`${this.$t('errors.err12')}`))
                                }

                            },
                            trigger: ["blur", "change"],
                        },
                    ],
                    investment_price: [
                        {
                            required: true,
                            message: this.$t('messages.msg57'),
                        },
                        {
                            validator: async (rule, v, callback) => {
                                const minTradeAmount = this.manual.min_trade_amount;
                                const value = parseFloat(v);
                                if (value < minTradeAmount) {
                                    callback(new Error(`${this.$t('errors.err13')} ${minTradeAmount}.`));
                                }
                            },
                            trigger: ["blur", "change"],
                        },
                    ],
                    no_of_grids: [
                        {
                            required: true,
                            message: this.$t('messages.msg58'),
                        },
                        {
                            validator: async (rule, v, callback) => {
                                const max = this.gridRange.max;
                                const value = parseFloat(v);
                                if (value > max) {
                                    callback(new Error(`${this.$t('errors.err14')} ${max}.`));
                                } else if (value < 2) {
                                    callback(new Error(`${this.$t('errors.err15')}`));
                                }
                            },
                            trigger: ["blur", "change"],
                        },
                    ]
                },
            },
            contractType: ''
        };
    },
    computed: {
        ...mapGetters("strategy", ["getStrategyInfo", "getStrategyDiffRatio", "getManualSettingValidationRules"]),
        ...mapGetters("market", ["getCurrentMarketPrice",]),
        ...mapGetters("general", ["creatingStrategy"]),

        initSliderValue() {
            if (this.manual.investment_price == 0 || this.buyable == 0) {
                return 0
            }
            return (this.manual.investment_price / this.buyable) * 100
        },

        currentMarketPrice: function () {
            return this.getCurrentMarketPrice;
        },

        limits: function () {
            const marketPrice = this.currentMarketPrice.price;
            const lower = this.cutZero(parseFloat(marketPrice / 3).toFixed(2));
            const upper = this.cutZero(parseFloat(marketPrice * 3).toFixed(2));
            return {
                lower: lower,
                upper: upper
            };
        },

        selfRoute: function () {
            return this.$store.state.route;
        },

        tCurrencyName: function () {
            const fc = this.symbleinfo.tcurrencyname ? this.symbleinfo.tcurrencyname : ''
            return fc.toUpperCase() == 'YX' ? 'USDT' : fc
        },
        fCurrencyName: function () {
            return this.symbleinfo.fcurrencyname
        },
        amountDigits: function () {
            return this.symbleinfo.amountdigits
        },
        priceDigits: function () {
            return this.symbleinfo.pricedigits
        },

    },
    watch: {
        getStrategyInfo: function (val) {
            this.strategyInfo = val
        },
        getStrategyDiffRatio: function (val) {
            this.diffRatio = val
        },
        'manual.min_price': function (val) {
            this.changeAdvanceSetting(this.selectedCurrency)
        },
        'manual.max_price': function (val) {
            this.changeAdvanceSetting(this.selectedCurrency)
        },
        borrowMultiple: function (val) {
            this.manual.multiple = val
            this.convertAvailableBalance(this.fCurrencyName)
        },
        tradingFrom: function (val) {
            this.convertAvailableBalance(this.selectedCurrency)
        },
        tradingTo: function (val) {
            this.convertAvailableBalance(this.selectedCurrency)
        }
    },
    methods: {
        ...mapActions("strategy", ["fetchStrategyInfo", "submitStrategyRequest"]),
        async createStrategy() {
            let fAmount = 0
            let tAmount = 0
            let directionType = 0

            if (this.selectedCurrency == "USDT") {
                tAmount = this.manual.investment_price
                directionType = 1 //long or buying
            }
            else {
                fAmount = this.manual.investment_price
                directionType = -1 //short or selling
            }


            if (this.isFuture) {
                directionType = this.manual.direction_type
            }
 
            let strategyType = 1

            if (this.isSpot) {
                strategyType = 1
            } else if (this.isMargin) {
                strategyType = 2
            } else {
                strategyType = 3
            } 
            const params = {
                strategyType: strategyType,
                minPrice: this.manual.min_price,
                maxPrice: this.manual.max_price,
                gridNum: this.manual.no_of_grids,
                multiple: this.isMargin ? this.symbleinfo.borrowmultiple : this.manual.multiple, //passed when future or margin
                fAmount: fAmount,
                tAmount: tAmount,
                directionType: directionType,
                stopLossPrice: this.manual.stop_loss_price ? this.manual.stop_loss_price : 0,
                stopProfitPrice: this.manual.stop_profit_price ? this.manual.stop_profit_price : 0,
                stopCancel: this.manual.stop_cancel,
                days: this.manual.time_period,
                ctid: this.symbleinfo.id,
                id: this.strategyBotId,
            }
            if (this.$route.query.contractType == 1) {
                params.contractType = 1
            }
            const validate = await this.$refs["strategyForm"].validate(async (valid) => {
                //console.log("validated: valid: ", valid);
                if (valid) {
                    this.strategyFormValidated = true;
                    const response = await this.submitStrategyRequest(params);
                    //console.log("createStrategy:createStrategy: response: ", response);
                    if (response.code == 200) {
                        this.successModel = {
                            ServerMessage: this.$t('messages.msg62')
                        }
                        // this.autoManual = 1
                        this.setToDefaulValues()

                        this.$pubsub.publish(this.$pubsub.strategiesList);


                    }
                    else {
                        console.error('Strategy: ', response);
                    }
                }
                else {
                    this.strategyFormValidated = false;
                }
            })
        },

        async copyParamaters() {
            const lowPrice = this.strategyInfo.minprice
            const upperPrice = this.strategyInfo.maxprice
            let multiple = 0
            let directionType = 0

            if (this.isFuture) {
                directionType = '1' //for long
                if (this.borrowMultiple) {
                    multiple = this.borrowMultiple
                } else {
                    multiple = 10
                }

            }

            this.manual = {
                id: this.strategyBotId,
                ctid: this.ctid,
                min_price: this.cutZero(lowPrice),
                max_price: this.cutZero(upperPrice),
                no_of_grids: this.strategyInfo.gridnum,
                min_ratio: this.diffRatio.min,
                max_ratio: this.diffRatio.max,
                stop_loss_price: '',
                stop_profit_price: '',
                stop_loss_price: '',
                stop_cancel: false,
                stop_loss_price: '',
                time_period: '',
                investment_price: '',
                direction_type: directionType,
                multiple: multiple
            }

            this.manual.min_trade_amount = 12.5 * this.strategyInfo.gridnum
            this.autoFilled = true;

            await this.calculateGridRange()

        },

        updateManualData() {
            //console.log('manual:', this.manual);
            let minTradeAmount = 0
            const gridNo = this.manual.no_of_grids

            if (this.selectedCurrency == 'USDT') {
                minTradeAmount = 12.5 * gridNo
            } else {
                minTradeAmount = (12.5 * this.manual.no_of_grids) / this.currentMarketPrice.price
            }

            //console.log('minTradeAmount', minTradeAmount)

            const lowerPrice = this.cutZero(this.manual.min_price)
            const upperPrice = this.cutZero(this.manual.max_price)

            const currentPrice = this.currentMarketPrice
            const ratio = gridProfitFees(upperPrice, lowerPrice, gridNo, currentPrice)
            const { min, max } = gridProfitFeesRange(ratio)

            this.manual.min_trade_amount = this.cutZero(this.global_get_tofixed(minTradeAmount, this.global_get_decimal(this.tCurrencyName)))
            this.manual.min_ratio = min
            this.manual.max_ratio = max

            this.calculateGridRange()
            this.validateStrategyData()
        },

        async autoFill() {
            this.autoFilled = true;
            await this.copyParamaters();

            this.validateStrategyData()
        },

        clearField() {
            this.autoFilled = false

            let multiple = 0
            let directionType = '0'

            if (this.isFuture) {
                directionType = '1' //for long
                if (this.symbleinfo.borrowmultiple) {
                    multiple = this.symbleinfo.borrowmultiple
                } else {
                    multiple = 10
                }
            }

            this.manual = {
                id: this.strategyBotId,
                ctid: this.ctid,
                min_price: "",
                max_price: "",
                no_of_grids: "",
                min_ratio: "0.0",
                max_ratio: "0.0",
                min_trade_amount: "",
                stop_loss_price: "",
                stop_profit_price: "",
                stop_cancel: false,
                time_period: "",
                investment_price: "",
                /// default for margin or spot but for future changed (short, long)
                // short:sell
                // long: buy
                direction_type: directionType,
                multiple: multiple
            };

            this.resetValidationMessages()

        },

        calculateGridRange() {
            // if gird no is equal or lower than zero then
            // set grid max range to 50 and value to 25
            // (min - max) /(newprice * 0.0015)
            // 0.0015 is static value
            const max = this.cutZero(this.manual.max_price)
            const min = this.cutZero(this.manual.min_price)
            const nowPrice = this.currentMarketPrice.price
            //console.log("calculateGridRange:manual", this.manual)
            const number = 0.0015
            const difference = max - min
            let maxValue = parseInt(difference / (nowPrice * number))
            maxValue = maxValue >= 100 ? 100 - 1 : maxValue
            if (maxValue <= 0) {
                maxValue = 50
                this.manual.no_of_grids = maxValue / 2
            }

            this.gridRange = {
                min: 2,
                max: maxValue <= 2 ? 25 : maxValue
            };

        },

        openingAdvanceSetting() {
            this.settingOpened = !this.settingOpened
            this.manual.time_period = ''
            if (this.settingOpened) {
                this.manual.time_period = '3'
                this.$nextTick(() => {
                    this.$refs.stopLossLimit.focus();
                });
            }
        },
        convertAvailableBalance(currency = "usdt") {

            const selectedCurrency = currency.toUpperCase()
            const toCanUseAmount = this.tradingTo.canuseamount
            const canUserAmount = this.tradingFrom.canuseamount
            let available = this.cutZero(this.global_get_tofixed(toCanUseAmount, this.priceDigits))
            const multiple = this.manual.multiple
            this.manual.investment_price = ''

            if (selectedCurrency == "USDT") {
                this.availableBalance = available + " " + this.tCurrencyName
                //console.log("currency available: ", this.manual)
                this.manual.min_trade_amount = 12.5 * this.manual.no_of_grids
                this.isUsdt = true

            } else {
                available = this.cutZero(this.global_get_tofixed(multiple > 0 ? multiple * canUserAmount : canUserAmount, this.amountDigits))

                this.availableBalance = available + " " + selectedCurrency
                this.isUsdt = false
                const minTradeAmount = 12.5 * this.manual.no_of_grids / this.currentMarketPrice.price
                this.manual.min_trade_amount = this.cutZero(this.global_get_tofixed(minTradeAmount, this.selectedCurrency))
            }

            this.selectedCurrency = selectedCurrency
            this.changeAdvanceSetting(selectedCurrency)
            this.buyable = available

        },

        changeAdvanceSetting(currency = "usdt") {
            const selectedCurrency = currency.toUpperCase()
            if (selectedCurrency == "USDT") {
                this.advanceOption.stop_loss_limit = `< ${this.manual.min_price}`
                this.advanceOption.take_profit_limit = `> ${this.manual.max_price}`
            } else {
                this.advanceOption.stop_loss_limit = `> ${this.manual.max_price}`
                this.advanceOption.take_profit_limit = `< ${this.manual.min_price}`
            }
        },

        async setToDefaulValues() {
            let multiple = 0
            let directionType = '0'

            let showUsdt = true
            let currency = this.tCurrencyName

            if (this.isFuture) {
                directionType = '1' //for long
                if (this.symbleinfo.borrowmultiple) {
                    multiple = this.symbleinfo.borrowmultiple
                } else {
                    multiple = 10
                }
                showUsdt = false
                currency = this.symbleinfo.fcurrencyname
            }

            //console.log('setToDefaulValues', multiple);

            if (this.autoManual == 1) { //auto

                this.isUsdt = showUsdt
                this.manual = {
                    id: this.strategyBotId,
                    ctid: this.ctid,
                    min_price: this.cutZero(this.strategyInfo.minprice),
                    max_price: this.cutZero(this.strategyInfo.maxprice),
                    no_of_grids: this.strategyInfo.gridnum,
                    min_ratio: this.diffRatio.min,
                    max_ratio: this.diffRatio.max,
                    // min_trade_amount: "",
                    stop_loss_price: '',
                    stop_profit_price: '',
                    stop_cancel: false,
                    time_period: "3",
                    investment_price: "",
                    direction_type: directionType,
                    multiple: multiple
                }
            }
            else { //manual
                // await this.clearField();
                // this.validateStrategyData()
            }

            this.resetValidationMessages()
            this.convertAvailableBalance(currency)
        },
        updateInestmentPrice(num) {
            //console.log('availableBalance:', this.availableBalance, 'num: ', num)
            const selectedCurrency = this.selectedCurrency.toUpperCase()
            let digits = ''
            if (selectedCurrency == "USDT") {
                digits = this.symbleinfo.priceDigits
            } else {
                digits = this.symbleinfo.amountdigits
            }
            this.manual.investment_price = this.cutZero(this.global_get_tofixed(this.buyable * num, digits))
            this.validateStrategyData()
        },
        switchLongShort() {
            const currency = this.symbleinfo.fcurrencyname
            if (this.manual.direction_type == 1) { //long or buying
                this.isUsdt = false
                this.convertAvailableBalance(currency)
            } else if (this.manual.direction_type == -1) { //short or selling
                this.isUsdt = false
                this.convertAvailableBalance(currency)
            } 
        },
        showPopTrasfer() {
            this.$emit('onOpenTransferPopup', true)
        },

        showCalculator() {
            this.$emit('onShowCalculator', true)
        },

        resetValidationMessages() {
            this.$refs["strategyForm"]?.clearValidate([
                "min_price",
                "max_price",
                "no_of_grids",
                "min_trade_amount",
                "stop_loss_price",
                "stop_profit_price",
                "investment_price"
            ])
            this.strategyFormValidated = true
        },

        async validateStrategyData() {
            const validate = await this.$refs["strategyForm"].validate(async (valid) => {
                //console.log("validated: valid: ", valid)
                if (!valid) {
                    this.strategyFormValidated = false
                }
                else {
                    this.strategyFormValidated = true
                }
            });
            return validate
        },


        showLeverage() {
            this.$emit('onShowLeverage', true)
        },
    },
    async mounted() {
        const route = this.$route;
        this.contractType = route.query.contractType
        const sid = route.query["strategy-bot-id"]
        const cid = route.query["ctid"]

        if ((sid == '' || sid == undefined || isNaN(sid)) && (cid == '' || cid == undefined || isNaN(cid))) {

        } else {

            const object = {
                id: sid ? sid : 0,
                ctid: cid ? cid : 0
            }

            this.ctid = isNaN(cid) || !cid ? 0 : cid
            this.strategyBotId = isNaN(sid) || !sid ? 0 : sid
            console.log('object:: mounted::', object);

            await this.fetchStrategyInfo(object)
            // console.log(object,"dfdf")
            setTimeout(async () => {
                await this.autoFill()
                this.resetValidationMessages()
                const fc = this.isFuture ? this.symbleinfo.fcurrencyname : 'USDT'
                this.convertAvailableBalance(fc)
            }, 900)
        }
        this.$store.commit('strategy/setStrategyTabActive', true)
    },

    beforeDestroy() {
        this.$store.commit('strategy/setStrategyTabActive', false)
    }

};

</script>
