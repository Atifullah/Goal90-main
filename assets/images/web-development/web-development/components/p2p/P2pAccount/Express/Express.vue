<template>
    <div class="bank-transfer">
        <a-row :gutter="16" class="px-4 py-5">
            <a-col :lg="12" :xl="13">
                <!-- <img src="/images/bank-transfer-bg.png" width="100%" /> -->
                <div class="bank-transfer-img">
                    <p class="mb-0 buy-sell-crypto fw-7">{{ $t('express.buy_sell_crypto') }}</p>
                </div>
                <p class="bank-transfer-heading fw-5 mb-2 mt-4 pt-2">{{ $t('express.exp1') }}</p>
                <a-row class="my-4">
                    <a-col :lg="24">
                        <a-timeline class="pr-5">
                            <a-timeline-item>
                                <span slot="dot" class="ml-2 ">
                                    <img src="/images/timeline_dot.svg" height="31" width="31" />
                                </span>{{ $t('express.exp2') }}</a-timeline-item>
                            <a-timeline-item><span slot="dot" class="ml-2 ">
                                    <img src="/images/timeline_dot.svg" height="31" width="31" />
                                </span>{{ $t('express.exp3') }}</a-timeline-item>
                            <a-timeline-item><span slot="dot" class="ml-2 ">
                                    <img src="/images/timeline_dot.svg" height="31" width="31" />
                                </span>{{ $t('express.exp4') }}</a-timeline-item>
                        </a-timeline>
                        <!-- <a-timeline class="pr-5">
                            <a-timeline-item>{{$t('express.exp2')}}</a-timeline-item>
                            <a-timeline-item>{{$t('express.exp3')}}</a-timeline-item>
                            <a-timeline-item>{{$t('express.exp4')}}</a-timeline-item>
                        </a-timeline> -->
                        <p class="bank-transfer-heading fw-5 mb-1">{{ $t('returntxt.rtxt32') }}</p>
                        <p class="faqs-txt fw-5">{{ $t('express.exp5') }}

                            <nuxt-link to="/help-center">{{ $t('express.help_center') }}</nuxt-link>
                            {{ $t('express.or_contact_us_on') }}
                            {{ $t('express.exp6') }}
                            <a href="mailto:service@bitnasdaq.com"> service@bitnasdaq.com</a>
                        </p>
                    </a-col>
                </a-row>
            </a-col>
            <a-col :lg="12" :xl="11" class="pl-5 bank-right-col">
                <a-card class="bank-transfer-card">

                    <div class="post-btn-bg mx-4 mt-4">
                        <div class="sell-left-btn"><a-button block class="buy-sell fw-5"
                                :class="direction == 1 ? 'right-btn' : 'trans-btn'" @click="onDirectionChange(1)">{{
                                    $t('postadd.pna1') }}</a-button>
                        </div>
                        <div class="sell-left-btn"><a-button block class="buy-sell fw-5"
                                :class="direction == -1 ? 'left-btn' : 'trans-btn'" @click="onDirectionChange(-1)">{{
                                    $t('postadd.pna2') }}</a-button></div>
                    </div>
                    <BuyExpressForm ref="buy" :FormData="FormData" v-if="FormData.Loaded && direction == 1"
                        :formSubmit="formSubmit" />
                    <SellExpressForm ref="sell" :FormData="FormData" v-if="FormData.Loaded && direction == -1"
                        :formSubmit="formSubmit" />
                    <PaymentMethodModal :paymentMethodModel="paymentMethodModel" :close="close"
                        :PaymentMethods="PaymentMethods" :OrderData="OrderData" :FormData="FormData" :Direction="direction"
                        :applySuccessModel="triggerApplySuccessModel" v-if="OrderData" :refresh="reMount" />
                    <ApplySuccessModel :applySuccessModel="applySuccessModel"
                        @applySuccessModelClose="applySuccessModelClose()" />

                </a-card>
            </a-col>
        </a-row>
    </div>
</template>

<script>
import BuyExpressForm from './BuyExpressForm.vue'
import SellExpressForm from './SellExpressForm.vue'
import PaymentMethodModal from './PaymentMethodModal.vue';
import ApplySuccessModel from "@/components/AgentPlan/ApplySuccessModal.vue";
export default {
    components: {
        BuyExpressForm,
        SellExpressForm,
        PaymentMethodModal,
        ApplySuccessModel,

    },
    data() {
        return {
            direction: 1,

            FormData: {
                Fiats: [],
                CryptoCurrencies: [],
                DefaultIndexOfCrypto: 0,
                DefaultIndexOfFiat: 0,
                Loaded: false,
                Constants: [],
            },
            paymentMethodModel: false,
            PaymentMethods: [],
            OrderData: 0,
            applySuccessModel: {},

        }
    },
    methods: {
        close() {
            this.paymentMethodModel = false;
        },
        reMount() {
            if (this.direction == 1) {
                this.$refs.buy.onPriceTypeChange()
            }
            else {
                this.$refs.sell.onPriceTypeChange()
            }
        },
        triggerApplySuccessModel(data) {
            this.applySuccessModel = data;
        },
        applySuccessModelClose() {
            this.applySuccessModel = {};
        },
        //GETTING CRYPTO CURRENCY LIST
        async getCryptoCurrencies() {
            var _self = this;

            const [CryptoCurrencies, UserLanguage, UserPayments, Assets] = await Promise.all([
                this.$store.dispatch('frenchcurrency_get_c2c'),
                this.$store.dispatch("com_getlangbyip"),
                this.$userinfo.uid ? this.$store.dispatch('user_user_payments_get') : null,
                this.$userinfo.uid ? this.$store.dispatch('trading_user_c2c_userc2cassets_get') : null
            ])
            if (this.$userinfo.uid) {
                this.FormData.UserAssets = Assets.data ? Assets.data : null;
                this.FormData.UserPayments = UserPayments.data ? UserPayments.data : null
            }
            else {
                this.FormData.UserAssets = null,
                    this.FormData.UserPayments = null
            }



            CryptoCurrencies.data.filter(_d => {
                this.$store.state.currencyinfos.filter(_c => {
                    if (_d == _c.currencyname) {
                        this.FormData.CryptoCurrencies.push(_c)
                    }
                })
                this.FormData.DefaultIndexOfCrypto = this.FormData.CryptoCurrencies.findIndex((x) => x.currencyname == 'USDT')
            })
            this.FormData.Fiats = this.fiatpaymenttypeget();
            this.FormData.Fiats.filter((item, index) => {
                if (item.name == UserLanguage.data.currency_code) {
                    this.FormData.DefaultIndexOfFiat = index;
                }
            });
            this.FormData.Loaded = true;
        },



        formSubmit(data) {
            this.OrderData = data;
            this.paymentMethodModel = true;

        }
        ,
        onDirectionChange(val) {
            if (val) {
                this.direction = val;
            }
        },

    },
    mounted() {
        this.getCryptoCurrencies();
    },
}
</script>

<style></style>
