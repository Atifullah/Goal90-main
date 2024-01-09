<template>
    <div class="subscription">
        <a-modal id="subscription-modal" v-model="model" width="593px" :footer="false" @cancel="close">
            <a-row :gutter="16" class="col-alignment mb-3">
                <a-col :lg="20">
                    <p class="subscription-title fw-5 mb-0">{{ `${locked_saving_currency} ${$t('subscriptio.sub28')}` }}</p>
                </a-col>
                <a-col :lg="4" align="end"><img src="/images/ud-cross.svg" class="pointer"
                        @click="close" /></a-col>
            </a-row>

            <a-row :gutter="16" class="pt-3">
                <a-col :lg="14">
                    <a-row :gutter="16">
                        <a-col :lg="6">
                            <p class="product-type fw-5 mb-0">{{ $t('subscriptio.sub2') }}</p>
                        </a-col>
                        <a-col :lg="18">
                            <p class="product-type fw-5 hybrid-txt mb-0">{{ getTab }}</p>
                        </a-col>
                    </a-row>
                    <a-divider class="my-2 subscribe-divider" />
                    <a-row :gutter="16">
                        <a-col :lg="6">
                            <p class="product-type fw-5 mb-0">{{ $t('subscriptio.sub3') }}</p>
                        </a-col>
                        <a-col :lg="18">
                            <p class="product-type fw-5 hybrid-txt mb-0">{{ yearlyRate }}%</p>
                        </a-col>
                    </a-row>
                    <a-divider class="my-2  subscribe-divider" />
                    <a-row :gutter="16">
                        <a-col :lg="6">
                            <p class="product-type fw-5 mb-0">{{ $t('subscriptio.sub4') }}</p>
                        </a-col>
                        <a-col :lg="18">
                            <p class="product-type fw-5 hybrid-txt mb-0">{{ tenure }} {{ $t('subscriptio.sub5') }}</p>
                        </a-col>
                    </a-row>
                    <a-card class="financial-card mt-4">
                        <a-row :gutter="16" class="col-alignment pr-2">
                            <a-col :lg="14">
                                <div class="btc-box btc-box1" v-if="tab == '1' || tab == '2'">
                                    <a-button block class=" btc-usdt-btn fw-5">{{ locked_saving_currency }}</a-button>
                                </div>
                                <div class="btc-box" v-else>
                                    <a-button block class="fw-5" :class="activeHybridDetail == 0 ? 'btc-usdt-btn' : 'usdt-btn'"
                                        @click="reset(), updateHybridDetail(0)">{{ secondCurrencyName }}</a-button>
                                    <a-button block class="mr-2 fw-5"
                                        :class="activeHybridDetail == 1 ? 'btc-usdt-btn' : 'usdt-btn'"
                                        @click="reset(), updateHybridDetail(1)">{{ firstCurrencyName }}</a-button>
                                </div>
                            </a-col>
                            <a-col :lg="10" align="end" class="pr-0">
                                <span @mouseover="hoverKey = 2" @mouseleave="hoverKey = -1">
                                    <nuxt-link to="/person/wallet"><a-button class="outline-btn fw-5">
                                            <img :src="hoverKey == 2 ? '/images/card-send-active.svg' : '/images/card-send.svg'"
                                                class="mr-2" />{{ $t('subscriptio.sub6') }}</a-button> </nuxt-link>
                                </span>
                            </a-col>
                        </a-row>
                        <a-row :gutter="16" class="pt-4">
                            <a-col :lg="12">
                                <p class="amount-blance fw-5 mb-2">{{ $t('subscriptio.sub7') }}</p>
                            </a-col>
                            <a-col :lg="12" align="end">
                                <p class="amount-blance fw-5 mb-2">{{
                                    global_get_tofixed(locked_canuse_amount, global_get_decimal((tab == '1' || tab == '2')
                                        ? locked_saving_currency : hybrid_currency).a)
                                }} {{ (tab == '1' || tab == '2') ? locked_saving_currency : hybrid_currency }}</p>
                            </a-col>
                        </a-row>
                        <a-row :gutter="16">
                            <a-col :lg="24">
                                <a-row>
                                    <a-col :lg="21">
                                        <a-form-model ref="subForm" :model="{ amount }" :rules="rules"
                                            :hide-required-mark="true" label-align="left">
                                            <a-form-model-item has-feedback prop="amount" :colon="false" :wrapper-col="{
                                                xl: 24,
                                                lg: 24,
                                                md: 24,
                                                sm: 24,
                                                xs: 24,
                                            }">
                                                <a-input-number type="number" v-model="amount"
                                                    :placeholder="`${global_get_tofixed(this.minTradeAmount, this.global_get_decimal(this.locked_saving_currency).a)} - ${global_get_tofixed(this.maxTradeAmount, this.global_get_decimal(this.locked_saving_currency).a)}`" class="subscription-input">
                        
                                                    <span slot="suffix" class="btc-gray-txt fw-3 col-alignment"><img
                                                            src="/images/btc-gray.svg" class="mr-1" />{{ (tab ==
                                                                '1' || tab == '2') ? locked_saving_currency : hybrid_currency
                                                            }}</span>
                                                </a-input-number>
                                            </a-form-model-item>
                                        </a-form-model>
                                    </a-col>
                                    <a-col :lg="3">
                                        <p class="text-center all-transfer-txt mb-0 pointer"
                                            @click="amount = global_get_tofixed(locked_canuse_amount, global_get_decimal((tab == '1' || tab == '2') ? locked_saving_currency : hybrid_currency).a)">
                                            All</p>
                                    </a-col>
                                </a-row>
                            </a-col>
                        </a-row>
                        <a-row :gutter="16" class="mt-3 col-alignment">
                            <a-col :lg="12">
                                <p class="profit-coin fw-5 mb-0">{{ $t('subscriptio.sub8') }}</p>
                            </a-col>
                            <a-col :lg="12" align="end">
                                <p class="amount-blance fw-5 mb-0">
                                    {{ (tab == '1' || tab == '2') ? locked_saving_currency : secondCurrencyName }}
                                </p>
                            </a-col>
                        </a-row>
                        <a-divider class="my-2  subscribe-divider" />
                        <a-row :gutter="16">
                            <a-col :lg="12">
                                <p class="profit-coin fw-5 mb-0">{{ $t('subscriptio.sub9') }}</p>
                            </a-col>
                            <a-col :lg="12" align="end">
                                <p class="amount-blance fw-5 mb-0">
                                    {{ ((tab == '1' || tab == '2') == false && activeHybridDetail == 1) ?
                                        global_get_tofixed((dailyRate * amount * tenure) /
                                            getPrice(secondCurrencyName),
                                            secondCurrencyName) : global_get_tofixed((dailyRate * amount * tenure),
                                                secondCurrencyName) }}
                                    {{ (tab == '1' || tab == '2') ? locked_saving_currency : secondCurrencyName }}
                                </p>
                            </a-col>
                        </a-row>
                    </a-card>
                </a-col>
                <a-col :lg="10" class="pl-2">

                    <a-row :gutter="16" class="mb-4 " v-for="(activity, index) in activities" :key="index">
                        <a-col :lg="24">
                            <a-row :gutter="16">
                                <a-col :lg="24">
                                    <p class="mb-1 accruing-date fw-4">{{ activity.content }}</p>
                                    <p class="mb-0 accruing-txt fw-5">{{ activity.timestamp }}</p>
                                </a-col>
                            </a-row>
                        </a-col>
                    </a-row>
                    <a-card class="tip-card" :bordered="false">
                        <p class="tip-title fw-5 mb-2">{{ $t('deal_new.dn38') }}:</p>
                        <p class="tip-title-desc fw-5 mb-0">{{ $t('deal_new.dn39') }}</p>
                    </a-card>
                </a-col>
            </a-row>

            <div class="subscription-modal-bg">
                <a-row>
                    <a-col :lg="10" class="pl-5">
                        <p class="mb-0 accruing-txt fw-5 pt-2">{{ $t('deal_new.dn40') }}</p>
                    </a-col>
                </a-row>
            </div>
            <a-row :gutter="16" class=" mt-3">
                <a-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                    <a-button block class="cancel-outline-btn fw-5" @click="close">
                        {{ $t('subscriptio.sub13') }}
                    </a-button>
                </a-col>
                <a-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                    <a-button block class="primary-btn fw-5" @click="addVerification()">
                        {{ $t('subscriptio.sub14') }}
                    </a-button>
                </a-col>
            </a-row>
        </a-modal>
    </div>
</template>

<script>
import Steps from "./Steps.vue"
export default {
    name: 'Subscription',
    components: {
        Steps,
    },
    props: {
        model: {
            type: Boolean
        },
        close: {
            type: Function
        },
        locked_saving_currency: {
            type: String
        },
        yearlyRate: {
            type: Number
        },
        tab: {
            type: String
        },
        locked_canuse_amount: {
            type: Number
        },
        dailyRate: {
            type: Number
        },
        minTradeAmount: {
            type: Number
        },
        maxTradeAmount: {
            type: Number
        },
        activities: {
            type: Array
        },
        purchasePackage: {
            type: Function
        },
        firstCurrencyName: {
            type: String
        },
        secondCurrencyName: {
            type: String
        },
        updateHybridDetail: {
            type: Function
        },
        hybrid_currency: {
            type: String
        },
        activeHybridDetail: {
            type: Number
        },
        tenure: {
            type: [Number, String]
        },
        icon: {
            type: String
        }
    },
    data() {
        return {
            amount: '',
            subRuleTab: true,
            hoverKey: -1,
            rules: {
                amount: [
                    {
                        validator: async (rule, value, callback) => {
                            const minAmt = this.global_get_tofixed(this.minTradeAmount, this.global_get_decimal(this.locked_saving_currency).a);
                            const maxAmt = this.global_get_tofixed(this.maxTradeAmount, this.global_get_decimal(this.locked_saving_currency).a); 
                            if (this.amount == '' || this.amount == null) {
                                callback(new Error(this.$t('messages.msg16')))
                            } else {
                                if (this.activeHybridDetail < 1) {
                                    if (parseFloat(this.amount) < minAmt) {
                                        callback(new Error(`${this.$t('errors.err1')} ${minAmt}`))
                                    }
                                    else if (parseFloat(this.amount) > maxAmt) {
                                        callback(new Error(`${this.$t('errors.err2')} ${maxAmt}`))
                                    }
                                    else if (parseFloat(this.amount) > this.locked_canuse_amount) {
                                        callback(new Error(`${this.$t('errors.err3')}`));
                                    }
                                    else {
                                        callback()
                                    }
                                }
                                else {
                                    const minAmt = this.global_get_tofixed(this.minTradeAmount, this.global_get_decimal(this.locked_saving_currency).a);
                                    const maxAmt = this.global_get_tofixed(this.maxTradeAmount, this.global_get_decimal(this.locked_saving_currency).a); 
                                    if (parseFloat(this.amount) < minAmt) {
                                        console.log("kldkjlfsaf")
                                        callback(new Error(`${this.$t('errors.err1')} ${minAmt}`))
                                    }
                                    else if (parseFloat(this.amount) > maxAmt) {
                                        console.log("kldkjlfsaf")
                                        callback(new Error(`${this.$t('errors.err2')} ${maxAmt}`))
                                    }
                                    else if (parseFloat(this.amount) > this.locked_canuse_amount) {
                                        console.log("kldkjlfsaf")
                                        callback(new Error(`${this.$t('errors.err3')}`))
                                    }
                                    else {
                                        callback()
                                    }
                                }
                            }
                        },
                        trigger: 'blur',
                    },
                ],

            },
        }
    },
    computed: {
        getTab() {
            if (this.tab == '1') {
                return this.$t('returntxt.rtxt8')
            }
            else if (this.tab == '2') {
                return this.$t('returntxt.rtxt9')
            }
            else if (this.tab == '3') {
                return this.$t('returntxt.rtxt10')
            }
            else {
                return this.$t('returntxt.rtxt11')
            }
        },
        validations() {
            return (this.amount > this.minTradeAmount && this.amount < this.maxTradeAmount) ? true : false;
        },
    },
    methods: {
        callback(key) {
        },
        async addVerification() {
            await this.$refs['subForm'].validate(async (valid) => {
                if (valid) {
                    this.purchasePackage(this.amount);
                }
            })
        },
        reset() {
            this.amount = '';
            this.$refs['subForm']?.clearValidate(['amount']);
        },
        onHandleChangeNumeric(e) {
            let valu = e.target.value;

            if (!Number(valu)) {
                e.preventDefault();
                return;
            }
            else {
                this.amount = valu;
            }
        },
        getPrice(currencyname) {
            let price = this.$store.getters.get_exchange_rate_by_name(currencyname, 'USDT');
            return price.toFixed(2)
        },
    },
}
</script>

<style scoped>
.error-note {
    color: red;
    font-size: 12px;
}

.ant-input-number-handler-wrap {
    border: none;
}</style>
