<template>
    <div class="success" v-if="convertData">
        <a-modal id="confirmation" v-model="model" :footer="false" :title="false" @cancel="close" width="450px">
            <a-row :gutter="16" class="col-alignment">
                <a-col :lg="21">
                    <p class="mb-0 conversion-heading fw-5">{{ $t('confirm.con1') }}</p>
                </a-col>
                <a-col :lg="3" align="end">
                    <img src="/images/ud-cross.svg" class="pointer" @click="close" />
                </a-col>
            </a-row>

            <a-card class="orange-success-card mb-3 mt-4" :bordered="false">
                <a-row :gutter="16" class="col-alignment">
                    <a-col :lg="12">
                        <p class="convertion-to fw-5 mb-2">{{ $t('confirm.con2') }}</p>

                        <p class="convertion-form fw-5 mb-0"> <img :src="fromCurrency.icon" height="20px" class="mr-2 mb-1" />{{
                            convertData?.famount }} {{ convertData?.fname }}</p>
                        <p class="coin-text fw-5 mb-0">{{ fromCurrency.fullname }}</p>
                    </a-col>
                    <a-col :lg="12" align="end">
                        <p class="convertion-to fw-5 mb-2">{{ $t('confirm.con3') }}</p>

                        <p class="convertion-form fw-5 mb-0"> <img :src="toCurrency.icon" height="20px" class="mr-2 mb-1" />{{
                            global_get_tofixed(convertData?.tamount - (convertData?.tamount * fee),
                                global_get_decimal(convertData?.tname).a) }} {{ convertData?.tname }}</p>
                        <p class="coin-text fw-5 mb-0">{{ toCurrency.fullname }}</p>

                    </a-col>
                </a-row>
            </a-card>
            <a-row>
                <a-col :lg="24" class="mt-4">
                    <a-row :gutter="16">
                        <a-col :lg="8">
                            <p class="left-side-txt fw-5 mb-0">{{ $t('confirm.con4') }}</p>
                        </a-col>
                        <a-col :lg="16" align="end">
                            <p class="right-side-txt fw-5 mb-0"><span class="light-green-txt text-right">{{ global_get_tofixed(convertData?.tamount * fee,
                                global_get_decimal(convertData?.tname).a) }} {{ convertData?.tname }}</span></p>
                        </a-col>
                    </a-row>
                    <a-divider class="success-modal-divider"/>
                    <a-row :gutter="16">
                        <a-col :lg="8">
                            <p class="left-side-txt fw-5 mb-0">{{ $t('confirm.con5') }}</p>
                        </a-col>
                        <a-col :lg="16" align="end">
                            <p class="right-side-txt fw-5 mb-0">{{ $t('confirm.con9') }}</p>
                        </a-col>
                    </a-row>
                    <a-divider class="success-modal-divider"/>
                    <a-row :gutter="16">
                        <a-col :lg="8">
                            <p class="left-side-txt fw-5 mb-0">{{ $t('confirm.con6') }}</p>
                        </a-col>
                        <a-col :lg="16" align="end">
                            <p class="right-side-txt fw-5 mb-0">{{ $t('confirm.con10') }}</p>
                        </a-col>
                    </a-row>
                    <a-divider class="success-modal-divider"/>
                    <a-row :gutter="16">
                        <a-col :lg="8">
                            <p class="left-side-txt fw-5 mb-0">{{ $t('confirm.con7') }}</p>
                        </a-col>
                        <a-col :lg="16" align="end">
                            <p class="right-side-txt fw-5 mb-0">{{ `1 ${convertData.fname.toUpperCase()} = ${fromCurrencyConverter}
                                                            ${convertData.tname.toUpperCase()} ` }}</p>
                        </a-col>
                    </a-row>
                </a-col>
            </a-row>
            <p v-show="quoteExpire" class="error-note text-left mb-2 mt-4">{{ $t('confirm.con11') }}</p>
            <a-row :gutter="16" class="mt-4">
                <a-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                    <a-button block class="cancel-outline-btn fw-5" @click="close">
                        {{ $t('confirm.con12') }}
                    </a-button>
                </a-col>

                <a-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12" block>
                    <a-button html-type="submit" block class="primary-btn fw-5" @click="PreviewConversion" v-show="quoteExpire">
                        {{ $t('confirm.con13') }}
                    </a-button>
                    <a-button :loading="loading" html-type="submit" block class="primary-btn fw-5" @click="ConfirmConversion"
                        v-show="!quoteExpire">
                        {{ $t('confirm.con14') }} ({{ seconds }})
                    </a-button>
                </a-col>
            </a-row>
        </a-modal>
    </div>
</template>

<script>

export default {
    props: {
        convertData: {
            type: Object
        },
        rate: {
            type: String
        },
        fee: {
            type: Number
        },
        PreviewConversion: {
            type: Function
        },
        init: {
            type: Function
        },
        close: {
            type: Function
        },
        model: {
            type: Boolean
        }
    },
    computed: {
        fromCurrency() {
            let currency={
            }
            if (this.convertData) {
                currency=this.$store.state.currencyinfos.filter(item => item.currencyname == this.convertData.fname)[0]
                return currency
            } else {
                return currency;
            }

        },
        toCurrency() {
            let currency={
            }
            if (this.convertData) {
                currency=this.$store.state.currencyinfos.filter(item => item.currencyname == this.convertData.tname)[0]
                return currency
            }
            else {
                return '';
            }

        },
        fromCurrencyConverter() {
            const amt = this.convertData.tamount / this.convertData.famount;
            return this.global_get_tofixed(amt, this.global_get_decimal(this.convertData.tname).a);
        },

    },
    data() {
        return {
            quoteExpire: true,
            seconds: 5,
            loading: false,
        }
    },

    methods: {
        async ConfirmConversion() {
            this.loading = true;
            if (true) {
                try {
                    const data = await this.$store.dispatch('user_flash_convert_confirm', {
                        fName: this.convertData.fname,
                        tName: this.convertData.tname,
                        fAmount: this.convertData.famount,
                    });
                    if (data.code == '200') {
                        this.$store.commit('set_message', { type: 'ok', text: data.msg });
                    }
                    this.init();
                    this.loading = false;
                    this.$emit('assetConverted')
                    this.close();
                } catch (error) {
                    this.loading = false;
                    //console.log(error)
                }
            }
        },
        startTimer() {
            this.quoteExpire = false;
            this.seconds = 5;
            const Interval = setInterval(() => {
                if (this.seconds != 0) {
                    this.seconds = this.seconds - 1;
                }
                else {
                    clearInterval(Interval);
                    this.quoteExpire = true;
                }
            }, 1000);
        }

    },
}
</script>

<style lang="scss" scoped>
.error-note {
    color: red;
    font-size: 14px;
}
</style>
