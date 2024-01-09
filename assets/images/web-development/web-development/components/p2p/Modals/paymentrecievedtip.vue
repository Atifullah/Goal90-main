<template>
    <div class="confirmation-release">
        <a-modal id="p2p-payment-confirmation" v-model="show" :footer="false" title="Payment Recieved"
            @cancel="close">
       
            <a-row :gutter="16">
                <a-col :lg="24" align="left">
                    <p class="fw-5 mb-0 mt-2">Payment the payment in your account?</p>
                </a-col>
            </a-row>
            <a-row :gutter="16" class="mt-3">
                <a-col :lg="1"><a-checkbox v-model="check"></a-checkbox></a-col>
                <a-col :lg="23" class="pl-4">
                    <p class="user-desc fw-5">I received the correct amount. payment sender matches the buyer’s verified name on Bitnasdaq, and i agree to release my crypto to buyer
                    </p>
                </a-col>
            </a-row>

<a-row :gutter="16">
<a-col :lg="24">
    <p class="mb-3 tip-txt fw-5">{{$t('modals.mod4')}}:</p>
    <ul class="tip-list px-3">
        <li class="fw-4">{{$t('modals.mod5')}} </li>
        <li class="fw-4">{{$t('modals.mod6')}}</li>
        <li class="fw-4">{{$t('modals.mod7')}}</li>
    </ul>
</a-col>
</a-row>
<a-row :gutter="16" class="pt-4">
                <a-col :lg="12"><a-button class="cancel-outline-btn fw-5" block @click="close">{{ $t("legalTrad.Cancel")
                }}</a-button></a-col>
                <a-col :lg="12"><a-button class="primary-btn fw-5" block @click="confirm" :loading="loading" :class="check?'':'disabled-btn'">{{
                    $t("formMenu.confirm") }}</a-button></a-col>
            </a-row>


        </a-modal>
    </div>
</template>

<script>
export default {
    props: {
        show: {
            type: Boolean
        },
        close: {
            type: Function
        },
        confirm: {
            type: Function
        },
    },
    data(){
        return {
            check:false
        }
    }
}
</script>

<style>

</style>
