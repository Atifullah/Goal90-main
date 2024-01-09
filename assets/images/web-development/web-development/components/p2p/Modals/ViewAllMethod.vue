<template> 
    <div class="view-all-method">
        <a-modal id="trading-requirement" v-model="viewAllMethod" :footer="false" :title="false" @cancel="close"
            width="450px">
            <a-row :gutter="16">
                <a-col :lg="12">
                    <p class="mb-0 trading-heading fw-5">{{$t('adsharing.as17')}}</p>
                </a-col>
                <a-col :lg="12" align="end">
                    <img src="/images/ud-cross.svg" class="pointer" @click="close" />
                </a-col>
            </a-row>
            <a-row :gutter="16" class="pt-4 mt-3">
                <a-col :lg="12">
                    <p :style="{borderLeft:`3px solid ${Method.bgcolor}`, paddingLeft:'10px'}" class="mb-0 enable-auth-txt fw-5">{{ Method.name }}</p>
                </a-col>
                <a-col :lg="12" align="end">
                    <img src="/images/green-dot-tick.svg" height="16px" />
                </a-col>
            </a-row>
            <a-divider class="my-3" />
            <span v-for="(item,index) in Method.fields" :key="index">
                <a-row :gutter="16" class="col-alignment">
                    <a-col :lg="12">
                        <p class="mb-0 full-name-txt fw-5">{{ item.fieldname }}</p>
                    </a-col>
                    <a-col :lg="12" align="end">
                        <p class="mb-0 enable-auth-txt fw-5">{{ item.fieldvalue }}</p>
                    </a-col>
                </a-row>
                <a-divider class="my-3" v-if="!(index==Method.fields.length-1)"/>
            </span>

        </a-modal>
    </div>
</template>

<script>
export default {
    props: {
        viewAllMethod: {
            type: Boolean
        },
        Method: {
            type: Object
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
