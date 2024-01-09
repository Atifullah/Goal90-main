<template>
    <div class="payment-method-modal">
        <a-modal id="payment-method-modal" v-model="paymentMethodModel" :footer="false" :title="false" @cancel="close"
            width="504px">
            <a-row :gutter="16" class="col-alignment">
                <a-col :lg="2">
                </a-col>
                <a-col :lg="20" align="center">
                    <p class="payment-method-title fw-5 mb-0">{{$t('adsharing.as21')}}</p>
                </a-col>

                <a-col :lg="2" class=""> <img src="/images/ud-cross.svg" class="pointer" @click="close" />
                </a-col>

            </a-row>
            <a-row :gutter="16" class="py-5">
                <a-col :lg="24" align="center">
                    <p class="price-txt fw-5 mb-2">{{
                        Direction == 1 ? OrderData.SellObject.symbol_native : OrderData.SellObject.currencyname }} {{
        OrderData.SellAmount }}</p>
                    <p class="price-desc fw-5 mb-0">{{$t('express.exp46')}} {{ OrderData.BuyAmount }} {{
                        Direction == 1 ? OrderData.BuyObject.currencyname : OrderData.BuyObject.symbol_native }} </p>
                </a-col>
            </a-row>
            <p class="paywith-txt fw-5 mb-2">{{$t('adsharing.as22')}}</p>

            <div class="scroll">
                <a-row :gutter="16" class="mr-2">
                    <a-col :lg="24">

                        <a-card class="bank-card mb-3" v-for="(item, index) in OrderData.adData.payconfiglist" :key="index"
                            @click="paymentSelect(item)"
                            :class="item.identifier === activeclass ? 'active-card-border' : ''">
                            <a-row :gutter="16" class="pt-2">
                                <a-col :lg="12">
                                    <p class="price-desc fw-5 mb-0"> <a-divider type="vertical" class="ml-1 mr-1"
                                            :style="`border-left: 3px solid ${item.bgcolor}`" />
                                        {{
                                            item.identifier }}</p>
                                </a-col>
                                <a-col :lg="12" align="end">
                                    <p class="price-desc fw-5 mb-2"> {{
                                        Direction == 1 ? OrderData.SellObject.symbol_native :
                                        OrderData.BuyObject.symbol_native
                                    }} {{
    Direction == 1 ? OrderData.SellAmount : OrderData.BuyAmount
}}</p> <a-tag color="orange" class="pointer" v-if="item.isrecommended">
    {{$t('adsharing.as23')}}
                                    </a-tag>
                                </a-col>
                            </a-row>
                        </a-card>

                    </a-col>
                </a-row>
            </div>
            <a-row :gutter="16" class="mr-2">
                <a-col :lg="24">
                    <a-button class="primary-btn fw-5 mt-4" block v-show="!PaymentFlagForSell" @click="addPaymentMethod()">{{$t('adsharing.as24')}}</a-button>

                    <a-button class="primary-btn fw-5 mt-4" block @click="submitRequest" v-show="PaymentFlagForSell"
                        :class="paymentMethodSelected ? 'primary-btn' : 'disabled-btn'" :loading="loading">{{$t('adsharing.as25')}}</a-button>

                </a-col>
            </a-row>
        </a-modal>
    </div>
</template>

<script>
export default {
    props: {
        paymentMethodModel: {
            type: Boolean
        },
        OrderData: {
            type: Object,
            default: () => { }
        },
        Direction: {
            type: Number,
            default: 1
        },
        close: {
            type: Function
        },
        refresh: {
            type: Function
        },
        applySuccessModel: {
            type: Function
        }
    },
    data() {
        return {
            apiRequestData: {},
            paymentMethodSelected: false,
            loading: false,
            activeclass: '',
            UserPayments: false,
            addPaymentSelected: '',
            PaymentFlagForSell:true
        }
    },

    methods: {
        addPaymentMethod(){
            this.$store.commit('setSelectedPayment',this.addPaymentSelected)
    this.$router.push({ path: '/p2p/payment/add-method'});
},

        paymentSelect(payment) {

            if (this.Direction == 1) {
                this.apiRequestData.payTypes = payment.identifier;
                this.PaymentFlagForSell = true
            }
            else {
                let paymentMethodCheck = this.UserPayments.find((item) => item.identifier === payment.identifier);
                if (paymentMethodCheck) {
                    this.apiRequestData.payTypes = payment.identifier;
                    this.PaymentFlagForSell = true
                }
                else {
                    this.PaymentFlagForSell=false
                    this.addPaymentSelected = this.OrderData.adData.payconfiglist.find((item) => item.identifier == payment.identifier)
                }
            }
            this.paymentMethodSelected = true;
                this.activeclass = payment.identifier;
        },
        getUserPayments() {
            if (this.$userinfo.uid && this.Direction == -1) {
                this.$store.dispatch('user_user_payments_get').then(({ data }) => {
                    if (data) {
                        this.UserPayments = data;
                    }
                })
            }

        },

        submitRequest() {
            this.loading = true;
            this.apiRequestData.type = this.Direction
            this.apiRequestData.buyCurrencyID = this.Direction == 1 ? this.OrderData.BuyObject.id : this.OrderData.SellObject.id
            this.apiRequestData.payMentCurrencyName = this.Direction == 1 ? this.OrderData.SellObject.name : this.OrderData.BuyObject.name
            this.apiRequestData.payAmount = this.Direction == 1 ? 0 : this.OrderData.BuyAmount,
                this.apiRequestData.buyAmount = this.Direction == 1 ? this.OrderData.BuyAmount : 0,
                this.$store.dispatch('express_p2p_quick_purchase', this.apiRequestData).then(data => {
                    this.loading = false;
                    if (data.data != undefined && data.data.length > 1) {
                        this.$router.push(`/p2p/orders-history/${data.data}`)

                        // this.applySuccessModel({ClientMessage:`Ad Posted Successfully,Redirect to Order ${data.data}`,ServerMessage:"Order Successfull" })
                        // this.close()
                    }
                    else {
                        this.applySuccessModel({ ClientMessage: `${data.msg}`, ServerMessage: this.$t('messages.msg63') })
                        this.refresh()
                        this.close()
                    }
                })






        }
    },
    mounted() {
        this.getUserPayments();
    },
}
</script>

<style></style>
