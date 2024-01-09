<template>
  <div class="scurity-verification-modal">
    <a-modal id="wallet-detail-modal" v-model="addSecurityVerificationModal" width="35%" :footer="false" :title="false" @cancel="close">
        <a-row :gutter="16" class="col-alignment">
            <a-col :lg="16"><p class="deposit-heading fw-5 mb-0">{{$t('person.pdd6')}}</p></a-col>
            <a-col :lg="8" align="end"><img src="/images/ud-cross.svg"/></a-col>
        </a-row>
        <a-row :gutter="16" class="py-4">
            <a-col :lg="2"><img src="/images/cancel-icon.svg"/></a-col>
            <a-col :lg="22"><p class="mb-0 cancel-desc fw-5 pl-3"><span class="red-active">{{$t('person.pdd7')}} </span> {{$t('person.pdd8')}}</p></a-col>

        </a-row>
        <a-row :gutter="16" class="mt-2">
            <a-col :lg="19" align="end"><a-button class="cancel-btn fw-5 px-3">{{$t('person.pd18')}}</a-button></a-col>
            <a-col :lg="5"><a-button class="primary-btn fw-5 px-3" @click="addSecurityVerificationModal = true">{{$t('person.pd19')}}</a-button></a-col>

        </a-row>
</a-modal>
  </div>
</template>

<script>
export default {
    props: {
        addSecurityVerificationModal: {
            type: Boolean
        },
        close:{
            type: Function
        },
    },
}
</script>

<style>

</style>
