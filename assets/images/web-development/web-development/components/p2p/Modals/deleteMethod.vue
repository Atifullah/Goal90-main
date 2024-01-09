<template>
    <div class="apply-success-modal">
        <a-modal id="agent-apply-modal" v-model="deleteModel" :footer="false" :title="false" @cancel="close"
            width="400px">
            <a-row class="col-alignment mb-4">
                <a-col :lg="20">
                    <p class="apply-heading fw-5 delete-heading mb-0">{{$t('adsharing.as9')}}</p>
                </a-col>
                <a-col :lg="4" align="end">
                    <img src="/images/ud-cross.svg" class="pointer" @click="close" />
                </a-col>
            </a-row>
            <a-row>
                <a-col :lg="24" align="center">

                    <img src="/images/delete-img.svg" />

                    <p class="success-txt fw-5 pt-2 mb-2 mt-3">{{$t('adsharing.as10')}} </p>
                </a-col>
            </a-row>

        </a-modal>
    </div>
</template>

<script>
export default {
    props: {
        deleteModel: {
            type: Boolean
        },
        close: {
            type: Function
        },
    },
}
</script>

<style lang="scss">
@import '@/assets/scss/components/modals/success.scss';
</style>
