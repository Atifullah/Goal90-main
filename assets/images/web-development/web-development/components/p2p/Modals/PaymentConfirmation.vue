<template>
    <div class="payment-confirmation">
        <a-modal id="p2p-payment-confirmation" v-model="p2pPaymentConfirmation" :footer="false" :title="false"
            @cancel="close">
            <a-row :gutter="16" class="mb-3">
                <a-col :lg="12">
                    <p class="mb-0 payment-confirmation-heading fw-5">{{$t('modals.mod13')}}</p>
                </a-col>
                <a-col :lg="12" align="end"><img src="/images/ud-cross.svg" class="pointer"
                        @click="close" /></a-col>
            </a-row>
            <a-row :gutter="16" class="mx-1">
                <a-card class="gray-card-bg mt-4 mb-3">
                    <p class="mb-3 jazcash fw-4">{{ paymentMethod?.name }}</p>
                    <a-row :gutter="16" v-for="(list, key) in paymentMethod?.fields" :key="key">
                        <a-col :lg="12">
                            <p class="user-name fw-5  mb-0">{{ list.fieldname }}</p>
                        </a-col>
                        <a-col :lg="12">
                            <a-popover v-if="list.fieldcontenttype=='qr_code'"
                                trigger="hover"
                                placement="bottom"
                                overlay-class-name="qrcode-popover"
                            >
                                <template slot="content">
                                <div>
                                    <img  :src="list.fieldvalue" height="60" width="100"/>
                                </div>
                                </template>
                                <img  :src="list.fieldvalue" height="20" width="40"/>
                            </a-popover>
                            <p v-else class="user-name fw-5 mb-0">
                                {{ list.fieldvalue }}
                            </p>
                        </a-col>
                    </a-row>
                    <a-row :gutter="16">
                        <a-col :lg="12">
                            <p class="user-name fw-5 mb-0">Amount</p>
                        </a-col>
                        <a-col :lg="12">
                            <p  class="user-name fw-5 mb-0">
                                {{orderdata?.legaltype }} {{(orderdata?.amount * orderdata?.price).toFixed(2)}}
                            </p>
                        </a-col>
                        <a-col :lg="12">
                            <p class="user-name fw-5 mb-0">Price</p>
                        </a-col>
                        <a-col :lg="12">
                            <p  class="user-name fw-5 mb-0">
                                {{ orderdata.legaltype }} {{ orderdata.price }}
                            </p>
                        </a-col>
                        <a-col :lg="12">
                            <p class="user-name fw-5 mb-0">Quantity</p>
                        </a-col>
                        <a-col :lg="12">
                            <p  class="user-name fw-5 mb-0">
                                {{ orderdata.amount }} {{ orderdata.currencyname }}
                            </p>
                        </a-col>



                    </a-row>
                </a-card>
                <a-row :gutter="16" class="mt-4 mb-2">
                    <a-col :lg="1"><img src="/images/confirmation-icon.svg" /></a-col>
                    <a-col :lg="23" class="pl-4">
                        <p class="user-desc fw-4"><span class="tip-txt fw-5">{{$t('modals.mod18')}}</span> {{$t('modals.mod9')}}</p>
                    </a-col>
                </a-row>
                    <a-row :gutter="16">
                        <a-col :lg="1"><a-checkbox v-model="readAgreement"></a-checkbox></a-col>
                        <a-col :lg="23" class="pl-4">
                            <p class="user-desc fw-4">{{$t('modals.mod10')}}
                            </p>
                        </a-col>
                    </a-row>
                    <a-row :gutter="16" class="mt-4 mb-3">
                        <a-col :lg="24" align="end">
                            <a-button class="cancel-outline-btn fw-5 mr-2" @click="close">{{$t('modals.mod11')}}</a-button>
                            <a-button class="px-3 fw-5" :class="readAgreement?'primary-btn':'disabled-btn'" :loading="loading" @click="notifySeller">{{$t('modals.mod12')}}</a-button></a-col>
                    </a-row>
                </a-row>
        </a-modal>
    </div>
</template>

<script>
export default {
    props: {
        p2pPaymentConfirmation: {
            type: Boolean
        },
        paymentMethod:{
            type: Object
        },
        id:{
            type: String
        },
        close: {
            type: Function
        },
        orderdata: {
            type: Object,
            default:()=>{}
        },
    },
    data(){
        return{
            readAgreement:false,
            loading:false
        }
    },
    methods:{
        notifySeller(){
            const _self =this;
            this.loading = true
            this.$store.dispatch('trading_c2c_order_comfirmpay', { ordercompleteid: this.id, payTypes:this.paymentMethod.identifier }).then((res) => {
                if (res.code == '200') {
                    this.$store.commit('set_message', { type: 'ok', text: this.$t('c2c.Confirmed') })
                    this.loading = false
                    _self.$emit('getorderdetail')
                    this.close();
                } else {
                    this.loading = false
                }
            })
        }
    }
}
</script>

<style lang="scss">
@import '@/assets/scss/components/p2p-modules/modals/payment-confirmation.scss';
</style>
