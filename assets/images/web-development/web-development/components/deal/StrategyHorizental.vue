<template>
    <div id="strategy-exchange-horizental">
        <div class="clearfix exchange-block_profit-loss" ref="strategyFormDiv"
            style="min-height: 314px; max-height: 430px;">
            <a-form-model class="strategy-form" ref="strategyForm" :model="manual" :rules="setValidation.rules"
                :hide-required-mark="true" label-align="left">

                <a-tabs v-model="autoManual" default-active-key="1" @change="setToDefaulValues()">

                    <a-tab-pane :key="1" :tab="$t('tabkeys.tab63')">

                        <a-row class="mx-4">
                            <a-col :lg="12" class="pr-2">

                                <a-row class="mt-3">
                                    <a-col :lg="24">
                                        <p class="investment-txt fw-5 mb-0">{{ $t('deal_new.dn12') }}
                                            <AppInfoTooltip :title="$t('strategy.paramater_help')" />
                                        </p>
                                    </a-col>
                                </a-row>


                                <a-row :gutter="16" class="col-alignment mt-3">
                                    <a-col :lg="10">
                                        <p class="price-range fw-5 mb-0 gray-price-txt">
                                            {{ $t('deal_new.dn32') }}
                                        </p>
                                    </a-col>

                                    <a-col :lg="14" class="text-right">
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

                                <a-row :gutter="16" class="col-alignment mt-3">
                                    <a-col :lg="8">
                                        <p class="price-range fw-5 mb-0 gray-price-txt">{{ $t('deal_new.dn36') }}</p>
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


                                <a-row :gutter="16" class="col-alignment mt-3">
                                    <a-col :lg="10">
                                        <p class="price-range fw-5 mb-0 gray-price-txt">{{ $t('deal_new.dn14') }}</p>
                                    </a-col>
                                    <a-col :lg="14" align="end">
                                        <p class="mb-0 price-range fw-5">{{ strategyInfo.gridnum }}</p>
                                    </a-col>
                                </a-row>
                                <a-row :gutter="16" class="col-alignment mt-3">
                                    <a-col :lg="14">
                                        <p class="price-range fw-5 mb-0 gray-price-txt">{{ $t('deal_new.dn15') }} </p>
                                    </a-col>
                                    <a-col :lg="10" align="end">

                                        <p class="mb-0 price-range fw-5 ">{{ diffRatio.min + ' % - ' + diffRatio.max + '%'
                                        }}
                                        </p>
                                    </a-col>
                                </a-row>

                                <a-row :gutter="16" class="col-alignment mt-3">
                                    <a-col :lg="24">
                                        <a href="javascript:;" class="price-range fw-5 mb-0 gray-price-txt"
                                            @click="copyParamaters(); autoManual = 2">{{ $t('deal_new.dn16') }}
                                        </a>

                                    </a-col>
                                </a-row>
                            </a-col>
                            <a-col :lg="12" class="pl-5">
                                <a-row :gutter="16" class="mt-3">
                                    <a-col :lg="24">

                                        <a-row :gutter="16" class="mt-1   col-alignment">
                                            <a-col :lg="13">
                                                <p class="investment-txt fw-5 mb-2"> {{ $t('deal_new.dn17') }}
                                                    <AppInfoTooltip :title="$t('strategy.investment_help')" />
                                                </p>
                                            </a-col>
                                            <a-col :lg="11">
                                                <p class="mb-2 price-range fw-5 text-right">

                                                    <span class="gray-price-txt">
                                                        Avail:
                                                    </span> {{ availableBalance }}
                                                    <img src="/images/arrow-2.svg" class="pl-1 cursor"
                                                        @click="showPopTrasfer()" />
                                                </p>
                                            </a-col>
                                        </a-row>
                                        <a-row :gutter="8">
                                            <a-col :lg="isFuture ? 24 : 16">
                                                <a-form-model-item class="m-0" prop="investment_price" :colon="false"
                                                    :wrapper-col="{
                                                        xl: 24,
                                                        lg: 24,
                                                        md: 24,
                                                        sm: 24,
                                                        xs: 24,
                                                    }">
                                                    <AppNumber @keyup="validateStrategyData()" type="number"
                                                        v-model="manual.investment_price" :num="manual.investment_price"
                                                        has-arrow
                                                        :after="`${' ≥ ' + manual.min_trade_amount} ${selectedCurrency}`" />

                                                </a-form-model-item>
                                            </a-col>
                                            <a-col :lg="8" v-if="!isFuture">
                                                <div class="invesment-usdt">
                                                    <div class="first-btn cursor" :class="isUsdt ? 'factive' : ''"
                                                        @click="convertAvailableBalance(tCurrencyName)">
                                                        {{ tCurrencyName }}
                                                    </div>
                                                    <!-- ml-2  -->
                                                    <div class="first-btn cursor" :class="!isUsdt ? 'factive' : ''"
                                                        @click="convertAvailableBalance(symbleinfo.fcurrencyname)">
                                                        {{ symbleinfo.fcurrencyname }}
                                                    </div>

                                                </div>
                                            </a-col>
                                        </a-row>
                                        <a-row :gutter="16" class="mt-2">
                                            <a-col :lg="24">
                                                <hex-slider @slider:change="updateInestmentPrice" :dec="initSliderValue" />
                                            </a-col>
                                        </a-row>
                                        <a-row :gutter="16" class="mt-2 col-alignment">
                                            <a-col :lg="24">
                                                <p class="mb-0 price-range fw-5 gray-price-txt col-alignment">
                                                    {{ $t('deal_new.dn31') }}
                                                    <nuxt-link :to="selfRoute.wallet"><span class="active-txt px-1">{{
                                                        $t('deal_new.dn8') }}</span>
                                                    </nuxt-link> {{ $t('deal_new.dn19') }}
                                                    <nuxt-link :to="selfRoute.wallet"><span class="active-txt px-1">{{
                                                        $t('deal_new.dn7') }}</span></nuxt-link>
                                                    {{ $t('deal_new.dn19') }}
                                                    <nuxt-link :to="selfRoute.convert"><span class="active-txt px-1">{{
                                                        $t('deal_new.dn21') }}</span>
                                                    </nuxt-link>
                                                    <AppInfoTooltip :title="$t('strategy.submit_info')" />
                                                </p>
                                            </a-col>

                                        </a-row>

                                        <a-row>
                                            <a-col :lg="24" v-if="$userinfo.uid">
                                                <a-button class="exchange-block_button_buy fw-5 my-3"
                                                    :loading="creatingStrategy"
                                                    :disabled="!strategyFormValidated || creatingStrategy" block
                                                    @click="createStrategy()" v-if="manual.direction_type == 1">
                                                    {{ $t('deal_new.dn45') }}
                                                </a-button>

                                                <a-button class="primary-btn fw-5 my-3 danger-btn"
                                                    :loading="creatingStrategy"
                                                    :disabled="!strategyFormValidated || creatingStrategy" block
                                                    @click="createStrategy()" v-else-if="manual.direction_type == -1">
                                                    {{ $t('deal_new.dn23') }}
                                                </a-button>

                                                <a-button class="exchange-block_button_buy fw-5 my-3 "
                                                    :loading="creatingStrategy"
                                                    :disabled="!strategyFormValidated || creatingStrategy" block
                                                    @click="createStrategy()" v-else>
                                                    {{ $t('deal_new.dn24') }}
                                                </a-button>
                                            </a-col>

                                            <a-col :lg="24" v-else>
                                                <div class="exchange-block_button_buy no_login my-2">
                                                    <nuxt-link to="/login" tag="span">{{ $t("home.headLogin")
                                                    }}</nuxt-link>
                                                    /
                                                    <nuxt-link to="/register" tag="span">{{
                                                        $t("home.headRegister")
                                                    }}</nuxt-link>
                                                </div>
                                            </a-col>

                                        </a-row>

                                    </a-col>
                                </a-row>
                            </a-col>
                        </a-row>

                    </a-tab-pane>

                    <a-tab-pane :key="2" :tab="$t('tabkeys.tab64')">

                        <!-- <div class="mx-3 "> -->


                        <a-row class="mt-4 mb-3 mx-3 px-1">
                            <a-col :lg="12" class="pr-3">


                                <a-row>
                                    <a-col :lg="8">
                                        <p class="mb-2 price-range fw-5 font-14">{{ $t('deal_new.dn43') }}
                                            <AppInfoTooltip />
                                        </p>
                                    </a-col>
                                    <a-col :lg="16" class="text-right">

                                        <a href="javascript:;" class="fw-5" @click="clearField()" v-if="autoFilled">{{
                                            $t('deal_new.dn27') }}</a>
                                        <a ef="javascript:;" class="cursor fw-5 mb-0  yellow-active text-right"
                                            @click="autoFill" v-else>{{
                                                $t('deal_new.dn26') }}</a>
                                    </a-col>
                                </a-row>

                                <a-row class="price-range fw-5-container">
                                    <a-col :lg="11">
                                        <a-form-model-item prop="min_price" :colon="false">


                                            <AppNumber v-model="manual.min_price" :num="manual.min_price" before="Min"
                                                @keyup="updateManualData()" has-arrow />

                                        </a-form-model-item>
                                    </a-col>
                                    <a-col :lg="2" align="center" class="delta-bg">
                                        <p class="delta-icon"></p>
                                    </a-col>
                                    <a-col :lg="11">
                                        <a-form-model-item prop="max_price" :colon="false" :wrapper-col="{
                                            xl: 24,
                                            lg: 24,
                                            md: 24,
                                            sm: 24,
                                            xs: 24,
                                        }">
                                            <AppNumber type="number" v-model="manual.max_price" before="Max"
                                                :num="manual.max_price" @keyup="updateManualData()" has-arrow />
                                        </a-form-model-item>
                                    </a-col>
                                </a-row>



                                <a-row :gutter="16" class=" col-alignment">
                                    <a-col :lg="24">
                                        <a-row class="py-2 mb-1">
                                            <a-col :lg="8">
                                                <p class="price-range fw-5 mb-0 font-14"> {{ $t('deal_new.dn28') }}</p>
                                            </a-col>
                                            <a-col :lg="16">
                                                <p class="font-12 fw-5 mb-0 gray-price-txt text-right">
                                                    {{ $t('deal_new.dn29') }}
                                                    <span class="text-white">
                                                        {{ manual.min_ratio }}% - {{ manual.max_ratio }}%
                                                    </span>
                                                </p>
                                            </a-col>
                                        </a-row>


                                        <a-row :gutter="16">
                                            <a-col :lg="24">
                                                <a-form-model-item prop="no_of_grids" :colon="false" :wrapper-col="{
                                                    xl: 24,
                                                    lg: 24,
                                                    md: 24,
                                                    sm: 24,
                                                    xs: 24,
                                                }">

                                                    <AppNumber :min="gridRange.min" type="number" :max-length="3"
                                                        v-model="manual.no_of_grids" :num="manual.no_of_grids"
                                                        :after="`${gridRange.min + '-' + gridRange.max} Grids`"
                                                        :before="$t('newkeys.nk6')" @keyup="updateManualData()"
                                                        :max="gridRange.max" has-arrow />
                                                </a-form-model-item>
                                            </a-col>
                                        </a-row>
                                    </a-col>
                                </a-row>


                                <a-row :gutter="16" class="my-2 pb-1 col-alignment">

                                    <a-col :lg="13">
                                        <p class="price-range fw-5 mb-0 font-14">
                                            {{ $t('deal_new.dn30') }}
                                            <AppInfoTooltip :title="$t('strategy.investment_help')" />
                                        </p>
                                    </a-col>

                                    <a-col :lg="11">
                                        <p class="mb-0 price-range fw-5 text-right font-12">
                                            <span class="gray-price-txt px-2">
                                                Avbl
                                            </span>
                                            <span>
                                                {{ availableBalance }}
                                            </span>
                                            <img src="/images/arrow-2.svg" class="pl-2 cursor" @click="showPopTrasfer()" />
                                        </p>
                                    </a-col>

                                </a-row>


                                <a-row>
                                    <a-col :lg="isFuture ? 24 : 17">

                                        <a-form-model-item prop="investment_price" :colon="false" :wrapper-col="{
                                            xl: 24,
                                            lg: 24,
                                            md: 24,
                                            sm: 24,
                                            xs: 24,
                                        }">
                                            <AppNumber @keyup="validateStrategyData()" @change="validateStrategyData()"
                                                type="number" :before="$t('newkeys.nk7')" v-model="manual.investment_price"
                                                :num="manual.investment_price"
                                                :after="`${' ≥ ' + manual.min_trade_amount} ${selectedCurrency}`"
                                                has-arrow />
                                        </a-form-model-item>
                                    </a-col>

                                    <a-col :lg="7" class="pl-2" v-if="!isFuture">
                                        <div class="invesment-usdt">
                                            <div class="first-btn cursor" :class="isUsdt ? 'factive' : ''"
                                                @click="convertAvailableBalance(tCurrencyName); validateStrategyData()">
                                                {{ tCurrencyName }}
                                            </div>

                                            <div class="first-btn cursor" :class="!isUsdt ? 'factive' : ''"
                                                @click="convertAvailableBalance(symbleinfo.fcurrencyname); validateStrategyData()">
                                                {{ symbleinfo.fcurrencyname }}
                                            </div>
                                        </div>
                                    </a-col>
                                </a-row>
                            </a-col>

                            <a-col :lg="12" class="grid-input pl-3">
                                <a-row :gutter="16">
                                    <a-col :lg="24">
                                        <p class="mb-2 price-range fw-5 font-14">{{ $t('deal_new.dn44') }}</p>
                                    </a-col>
                                </a-row>

                                <a-row :gutter="16">
                                    <a-col :lg="24">
                                        <a-form-model-item prop="stop_loss_price" :colon="false" :wrapper-col="{
                                            xl: 24,
                                            lg: 24,
                                            md: 24,
                                            sm: 24,
                                            xs: 24,
                                        }">
                                            <AppNumber @keyup="validateStrategyData()" type="number" class=""
                                                ref="stopLossLimit" v-model="manual.stop_loss_price"
                                                :before="$t('newkeys.nk8')" :num="manual.stop_loss_price" has-arrow
                                                :addon-after="`${advanceOption.stop_loss_limit} ${tCurrencyName}`" />
                                            <!-- <a-input @change="validateStrategyData()" type="number" class="mt-2"
                                                    ref="stopLossLimit" v-model="manual.stop_loss_price"
                                                    placeholder="Stop Loss"
                                                    :addon-after="`${advanceOption.stop_loss_limit} ${tCurrencyName}`" /> -->
                                        </a-form-model-item>
                                    </a-col>

                                    <a-col :lg="24">
                                        <a-form-model-item prop="stop_profit_price" :colon="false" :wrapper-col="{
                                            xl: 24,
                                            lg: 24,
                                            md: 24,
                                            sm: 24,
                                            xs: 24,
                                        }">
                                            <AppNumber @keyup="validateStrategyData()" type="number" class=""
                                                v-model="manual.stop_profit_price" :before="$t('newkeys.nk9')"
                                                :num="manual.stop_profit_price"
                                                :addon-after="`${advanceOption.take_profit_limit} ${tCurrencyName}`"
                                                has-arrow />

                                            <!-- <a-input @change="validateStrategyData()" type="number" class="mt-3"
                                                    v-model="manual.stop_profit_price" placeholder="Take Profit"
                                                    :addon-after="`${advanceOption.take_profit_limit} ${tCurrencyName}`" /> -->
                                        </a-form-model-item>
                                    </a-col>
                                </a-row>

                                <a-row :gutter="16">
                                    <a-col :lg="10">
                                        <p class="price-range fw-5 mb-0 gray-price-txt font-12">
                                            {{ $t('deal_new.dn32') }}
                                        </p>
                                    </a-col>

                                    <a-col :lg="14" class="text-right">
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

                                <a-row :gutter="16" class="mt-2 pt-1 pl-1 col-alignment">
                                    <a-col :lg="24">
                                        <a-checkbox class="price-range fw-5 gray-price-txt  font-14"
                                            v-model="manual.stop_cancel">
                                            {{ $t('deal_new.dn33') }}
                                        </a-checkbox>
                                        <AppInfoTooltip :title="$t('strategy.submit_info')" />

                                    </a-col>
                                    <!-- <a-col :lg="6" align="end">
                                            <p class="price-range fw-5 gray-price-txt mb-0">
                                            Disclaimer</p>
                                        </a-col> -->
                                </a-row>


                                <a-row :gutter="16" class="mt-2 pl-1">
                                    <a-col :lg="24" v-if="$userinfo.uid">
                                        <a-button class="exchange-block_button_buy fw-5 mt-2" :loading="creatingStrategy"
                                            :disabled="!strategyFormValidated || creatingStrategy" block
                                            @click="createStrategy()" v-if="manual.direction_type == 1">
                                            {{ $t('deal_new.dn45') }}
                                        </a-button>

                                        <a-button class="exchange-block_button_buy fw-5  mt-2 danger-btn"
                                            :loading="creatingStrategy"
                                            :disabled="!strategyFormValidated || creatingStrategy" block
                                            @click="createStrategy()" v-else-if="manual.direction_type == -1">
                                            {{ $t('deal_new.dn23') }}
                                        </a-button>

                                        <a-button class="exchange-block_button_buy fw-5 mt-2 " :loading="creatingStrategy"
                                            :disabled="!strategyFormValidated || creatingStrategy" block
                                            @click="createStrategy()" v-else>
                                            {{ $t('deal_new.dn45') }}
                                        </a-button>
                                    </a-col>

                                    <a-col :lg="24" v-else>
                                        <div class="exchange-block_button_buy no_login  my-2">
                                            <nuxt-link to="/login" tag="span" class="repeal">{{ $t("home.headLogin")
                                            }}</nuxt-link>
                                            /
                                            <nuxt-link to="/register" tag="span" class="repeal">{{
                                                $t("home.headRegister")
                                            }}</nuxt-link>
                                        </div>
                                    </a-col>
                                </a-row>

                            </a-col>
                        </a-row>


                        <!-- </div> -->
                    </a-tab-pane>

                </a-tabs>
            </a-form-model>
            <ApplySuccessModal :applySuccessModel="successModel" @applySuccessModelClose="successModel = {}" />
        </div>
    </div>
</template>
<script>

import { mapActions, mapGetters, mapMutations } from 'vuex'
import { gridProfitFees, gridProfitFeesRange } from '~/plugins/helpers';
import ApplySuccessModal from '../AgentPlan/ApplySuccessModal.vue';
import AppNumber from '../App/AppNumber.vue';
import AppInfoTooltip from '../App/AppInfoTooltip.vue';

import slider from '../public/slider.vue';


export default {
    components: {
        ApplySuccessModal,
        AppNumber,
        'hex-slider': slider,
        AppInfoTooltip
    },
    emits: ['onOpenTransferPopup'],
    props: {
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
        }
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
                time_period: "3",
                investment_price: "",
                // default for margin or spot but for future changed (short, long)
                // short:sell
                // long: buy
                direction_type: "0"
            },
            availableBalance: "",
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
                            trigger: ["keyup", "change"],
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
                            trigger: ["keyup", "change"],
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
                            trigger: ["keyup", "change"],
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
                            trigger: ["keyup", "change"],
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
                            trigger: ["keyup", "change"],
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
                            trigger: ["keyup", "change"],
                        },
                    ]
                },
            },
        };
    },
    computed: {
        ...mapGetters("strategy", ["getStrategyInfo", "getStrategyDiffRatio", "getManualSettingValidationRules"]),
        ...mapGetters("market", ["getCurrentMarketPrice"]),
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
        fCurrencyName: function () {
            return this.symbleinfo.fcurrencyname
        },
        tCurrencyName: function () {
            const fc = this.symbleinfo.tcurrencyname ? this.symbleinfo.tcurrencyname : ''
            return fc.toUpperCase() == 'YX' ? 'USDT' : fc
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
            //console.log('watching getStrategyInfo', val)
            this.strategyInfo = val
        },
        getStrategyDiffRatio: function (val) {
            //console.log('watching getStrategyDiffRatio', val)
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
        }

    },
    methods: {
        ...mapActions("strategy", ["fetchStrategyInfo", "submitStrategyRequest"]),
        ...mapMutations("strategy", ["setStrategyTabPosition"]),
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

            // if (this.manual.no_of_grids > maxValue) {
            //     this.manual.no_of_grids = maxValue / 2
            // }

            this.gridRange = {
                min: 2,
                max: maxValue
            };

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
            let available = this.cutZero(this.global_get_tofixed(toCanUseAmount, this.global_get_decimal(this.tCurrencyName).a))
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
                this.manual.min_trade_amount = this.cutZero(this.global_get_tofixed(minTradeAmount, selectedCurrency))

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
                if (this.borrowMultiple) {
                    multiple = this.borrowMultiple
                } else {
                    multiple = 10
                }
                showUsdt = false
                currency = this.fCurrencyName

            }

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

                this.setStrategyTabPosition('auto')
            }
            else { //manual
                // await this.clearField();
                // this.validateStrategyData()
                this.setStrategyTabPosition('manual')
            }

            this.resetValidationMessages()
            this.convertAvailableBalance(currency)
        },

        switchLongShort() {
            if (this.manual.direction_type == 1) { //long or buying
                this.isUsdt = false
                this.convertAvailableBalance(this.fCurrencyName)
            } else if (this.manual.direction_type == -1) { //short or selling
                this.isUsdt = false
                this.convertAvailableBalance(this.fCurrencyName)
            }
        },

        showPopTrasfer() {
            this.$emit('onOpenTransferPopup', true)
        },

        getFormHeight() {
            const divHeight = this.$refs.strategyFormDiv.clientHeight;
            this.$store.commit('strategy/setHorizentalStrategyFormHeight', divHeight)
            //console.log('divHeight: ', divHeight)
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

            setTimeout(() => {
                this.getFormHeight()
            }, 200);
        },

        async validateStrategyData() {
            //console.log('validinggggggggg');
            const validate = await this.$refs["strategyForm"].validate(async (valid) => {
                //console.log("validated: valid: ", valid)
                if (!valid) {
                    this.strategyFormValidated = false
                }
                else {
                    this.strategyFormValidated = true
                }
            });

            setTimeout(() => {
                this.getFormHeight()
            }, 200);

            return validate
        },
    },
    async mounted() {

        this.$store.commit('strategy/setStrategyTabActive', true)
        const route = this.$route;
        const sid = route.query["strategy-bot-id"]
        const cid = route.query["ctid"]

        this.ctid = this.symbleinfo.id
        const object = {
            id: 0,
            ctid: this.ctid
        }

        this.ctid = this.symbleinfo.id
        this.strategyBotId = 0

        await this.fetchStrategyInfo(object)
        setTimeout(async () => {
            await this.autoFill()
            this.resetValidationMessages()
            const fc = this.isFuture ? this.symbleinfo.fcurrencyname : 'USDT'
            this.convertAvailableBalance(fc)
        }, 300)
    },
    beforeDestroy() {
        this.$store.commit('strategy/setStrategyTradeStatus', false)
        this.$store.commit('strategy/setStrategyTabActive', false)
        this.setStrategyTabPosition('manual')
    }
};

</script>
<style lang="scss">
// @import "assets/variables/light.scss";

@import '@/assets/scss/pages/deal/strategy-horizental-tabs.scss';
</style>
