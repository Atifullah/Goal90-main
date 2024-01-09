<template>
    <div class="confirmation-release">
        <a-modal id="p2p-payment-confirmation" v-model="confirmationRelease" :footer="false" :title="false"
            @cancel="close">
            <a-row :gutter="16">
                <a-col :lg="24" align="end"><img src="/images/ud-cross.svg" class="pointer"
                        @click="close" /></a-col>
            </a-row>
            <a-row :gutter="16">
                <a-col :lg="24" align="center">
                    <img src="/images/confirmation-release.svg" />
                    <p class="payment-confirmation-heading fw-5 mb-0 mt-2">{{$t('modals.mod1')}}</p>
                </a-col>
            </a-row>
            <a-row :gutter="16" class="mt-3">
                <a-col :lg="1"><a-checkbox></a-checkbox></a-col>
                <a-col :lg="23" class="pl-4">
                    <p class="user-desc fw-5">{{$t('modals.mod2')}}
                    </p>
                </a-col>
            </a-row>
            <a-row :gutter="16">
                <a-col :lg="1"><a-checkbox></a-checkbox></a-col>
                <a-col :lg="20" class="pl-4">
                    <p class="user-desc fw-5">{{$t('modals.mod3')}}
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


        </a-modal>
    </div>
</template>

<script>
export default {
    props: {
        confirmationRelease: {
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
