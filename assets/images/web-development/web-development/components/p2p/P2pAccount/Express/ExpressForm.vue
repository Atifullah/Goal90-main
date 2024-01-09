<template>
    <div class="bank-transfer-form">
        <a-card class="bank-transfer-card">
            <!-- <a-row>
                <a-col :lg="12">
                    <a-button class="buy-btn" block>{{$t('express.exp7')}}</a-button>
                </a-col>
                <a-col :lg="12"> <a-button class="buy-btn sell-btn" block>{{$t('express.exp8')}}</a-button></a-col>

            </a-row> -->
            <a-form-model ref="applyForm" :model="bankTransferForm" :hide-required-mark="true" label-align="left">
                <div class="post-btn-bg mx-4 mt-4">
                                        <div class="sell-left-btn"><a-button block class="buy-sell fw-5"
                                                :class="direction == 1 ? 'right-btn' : 'trans-btn'"
                                                @click="onDirectionChange(1)">{{ $t('postadd.pna1') }}</a-button>
                                        </div>
                                        <div class="sell-left-btn"><a-button block class="buy-sell fw-5"
                                                :class="direction == -1 ? 'left-btn' : 'trans-btn'"
                                                @click="onDirectionChange(-1)">{{ $t('postadd.pna2') }}</a-button></div>
                                    </div>
                <a-row class="mx-4">
                    <a-col :lg="24" class="mt-4">
                        <a-form-model-item has-feedback :label="$t('express.exp45')" prop="wantToPay" :colon="false"
                            :wrapper-col="{
                                xl: 24,
                                lg: 24,
                                md: 24,
                                sm: 24,
                                xs: 24,
                            }">
                            <a-input :default-value="$t('placeholders.plh28')" class="quantity-input">
                                <div slot="suffix">
                                    <a-select default-value="lucy" dropdownClassName="bank-transfer">
                                        <a-select-option value="jack">
                                            {{$t('express.exp9')}}
                                        </a-select-option>
                                        <a-select-option value="lucy">
                                            {{$t('express.exp10')}}
                                        </a-select-option>
                                        <a-select-option value="disabled">
                                            {{$t('express.exp11')}}
                                        </a-select-option>
                                        <a-select-option value="Yiminghe">
                                            {{$t('express.exp12')}}
                                        </a-select-option>
                                    </a-select>
                                </div>
                            </a-input>

                        </a-form-model-item>
                    </a-col>
                    <a-col :lg="24" class="mt-2 pb-5 mb-4">
                        <a-form-model-item has-feedback :label="$t('express.exp46')" prop="willReceeive" :colon="false"
                            :wrapper-col="{
                                xl: 24,
                                lg: 24,
                                md: 24,
                                sm: 24,
                                xs: 24,
                            }">
                            <a-input default-value="Please enter quantity" class="quantity-input">
                                <div slot="suffix">
                                    <a-select default-value="lucy" dropdownClassName="bank-transfer">
                                        <a-select-option :value="$t('person.pm14')">
                                            {{$t('express.exp9')}}
                                        </a-select-option>
                                        <a-select-option :value="$t('person.pm15')">
                                            {{$t('express.exp10')}}
                                        </a-select-option>
                                        <a-select-option :value="$t('person.pm16')">
                                            {{$t('express.exp11')}}
                                        </a-select-option>
                                        <a-select-option :value="$t('person.pm17')">
                                            {{$t('express.exp12')}}
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
                        <p class="estimated-price-txt fw-5">{{$t('express.exp20')}}</p>
                        <a-button class="primary-btn fw-5 mb-3" block @click="paymentMethodModel=true">{{$t('express.exp14')}}</a-button>
                        <p class="estimated-price-txt fw-5 pr-4 pb-2">{{$t('express.exp15')}}<a href="#"> {{$t('express.exp16')}}  ></a>
                        </p>
                    </a-col>
                </a-row>
            </a-form-model>
        </a-card>
        <PaymentMethodModal :paymentMethodModel="paymentMethodModel" :close="close"/>
    </div>
</template>

<script>
import PaymentMethodModal from './PaymentMethodModal.vue';
export default {
  components: { PaymentMethodModal },
    data() {
        return {
            direction: 1,
            paymentMethodModel: false,
            bankTransferForm: {
                wantToPay: '',
                willReceeive: '',
            }
        }
    },
    method: {
        close() {
            this.paymentMethodModel = false
        },
        onDirectionChange(val) {
            if (val) {
                this.direction = val;
            }
        }
    }
}
</script>

<style>

</style>
