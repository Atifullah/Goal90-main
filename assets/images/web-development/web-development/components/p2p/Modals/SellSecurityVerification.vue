<template>
    <div class="security-verification">
        <a-modal id="p2p-payment-confirmation" v-model="sellSecurityVerification" :footer="false" :title="false"
            @cancel="close">
            <a-row :gutter="16" class="mb-3">
                <a-col :lg="12">
                    <p class="mb-0 payment-confirmation-heading fw-5">{{$t('modals.mod14')}}</p>
                </a-col>
                <a-col :lg="12" align="end"><img src="/images/ud-cross.svg" class="pointer"
                        @click="close" /></a-col>
            </a-row>
            <a-row :gutter="16" class="mt-3">
                <a-col :lg="20">
                    <p class="mb-0 verification-txt fw-4">{{$t('modals.mod15')}}<a href="#" class="bitnasdaq-authenticator fw-4"> {{$t('modals.mod16')}}</a></p>
                </a-col>
            </a-row>
            <a-row :gutter="16" class="mt-4">
                <a-col :lg="17"><a-input :placeholder="$t('placeholders.plh25')"/></a-col>
                <a-col :lg="7"><a-button class="disabled-btn fw-5" block>{{$t('modals.mod17')}}</a-button></a-col>
            </a-row>
            <a-row :gutter="16" class="my-4">
                <p class="verification-unavailable fw-4 mb-3">{{$t('modals.mod18')}}</p>
                <a-col :lg="24"><a-button class="primary-btn fw-5" block>{{$t('modals.mod19')}}</a-button></a-col>
            </a-row>
        </a-modal>
    </div>
</template>

<script>
export default {
    props: {
        sellSecurityVerification: {
            type: Boolean
        },
        close: {
            type: Function
        },
    },
}
</script>

<style>

</style>
