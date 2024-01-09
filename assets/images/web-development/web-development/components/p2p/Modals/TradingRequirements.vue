<template>
    <div class="trading-requirement">
        <a-modal id="trading-requirement" v-model="tradingRequirements" :footer="false" :title="false" @cancel="close" width="450px" :maskClosable="false">
            <a-row :gutter="16">
                <a-col :lg="12">
                    <p class="mb-0 trading-heading fw-5">{{$t('p2p.modal1')}}</p>
                </a-col>
                <!-- <a-col :lg="12" align="end">
                    <img src="/images/ud-cross.svg" class="pointer" @click="close"/>
                </a-col> -->
            </a-row>
            <a-row :gutter="16">
                <a-col :lg="24" align="center">
                    <img src="/images/trading-icon.svg"/>
                    <p class="trading-desc fw-5 pt-4 px-4 mt-2">{{$t('p2p.modal2')}}</p>
                </a-col>
            </a-row>
            <a-row :gutter="16" class="pt-5 col-alignment">
                <a-col :lg="12"><p class="mb-0 enable-auth-txt fw-5">{{$t('person_auth.primary_KYC_person')}}</p></a-col>
                <a-col v-if="$userinfo.securitylevel>0" :lg="12" align="end"><p class="mb-0 finished-txt fw-5">{{$t('p2p.modal4')}} <img src="/images/green-verify-icon.svg" class="pl-1"/></p></a-col>
                <a-col v-else :lg="12" align="end"><a-button class="outline-btn fw-5 enable-btn" @click="$router.push('/person/authentication')">{{$t('p2p.modal6')}} </a-button></a-col>
            </a-row>
            <a-divider class="my-3"/>
            <a-row :gutter="16" class="col-alignment">
                <a-col :lg="12"><p class="mb-0 enable-auth-txt fw-5">{{$t('person.ph9')}}</p></a-col>
                <a-col v-if="$userinfo.securitylevel>1" :lg="12" align="end"><p class="mb-0 finished-txt fw-5">{{$t('p2p.modal4')}} <img src="/images/green-verify-icon.svg" class="pl-1"/></p></a-col>
                <a-col v-else :lg="12" align="end"><a-button class="outline-btn fw-5 enable-btn" @click="$router.push('/person/authentication')">{{$t('p2p.modal6')}}  </a-button></a-col>
            </a-row>
            <a-divider class="my-3" v-if="postNewAddtradingRequirements"/>
            <a-row :gutter="16" class="col-alignment" v-if="postNewAddtradingRequirements">
                <a-col :lg="12"><p class="mb-0 enable-auth-txt fw-5">{{$t('p2p.modal17')}}</p></a-col>
                <a-col v-if="$usersettings.moreconfig?.applyadv" :lg="12" align="end"><p class="mb-0 finished-txt fw-5">{{$t('p2p.modal4')}} <img src="/images/p2p/green-verify-icon.svg" class="pl-1"/></p></a-col>
                <a-col v-else :lg="12" align="end"><a-button class="outline-btn fw-5 enable-btn" @click="$router.push('/p2p/merchant')">{{$t('p2p.modal18')}}  </a-button></a-col>
            </a-row>
        </a-modal>
    </div>
</template>

<script>
export default {
    props: {
        tradingRequirements: {
            type: Boolean
        },
        postNewAddtradingRequirements:{
            type:Boolean,
            default:false
        },
        close: {
            type: Function
        },
    },
}
</script>

<style lang="scss">
@import '@/assets/scss/components/p2p-modules/modals/payment-confirmation.scss';
</style>