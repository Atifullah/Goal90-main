<template>
    <div class="apply-success-modal">
        <a-modal id="agent-apply-modal" v-model="show" :footer="false" :title="false" @cancel="close" width="400px"
            :maskClosable="false">
            <a-row>
                <a-col :lg="24" align="center">
                    <img :src="image" class="pt-2" height="50px" />

                    <p class="success-txt fw-5 pt-3 mb-2 pb-1 text-center" v-if="object?.heading">{{ object?.heading }}</p>

                    <p class="success-desc fw-5 text-center mb-4" v-html="object?.message"></p>

                    <a-button class="primary-btn fw-5" block @click="ok()">Ok</a-button>
                </a-col>
            </a-row>
        </a-modal>
    </div>
</template>

<script>
export default {
    name: "ErrorModal",
    props: {
        object: {
            type: Object, //{heading:'', message:''}
        },
        image: {
            type: String,
            default: '/images/red-info-circle.svg'
        },
        show: {
            type: Boolean,
            default: false
        }
    },
    emits: ['onClose', 'onOk'],

    methods: {
        close() {
            this.$emit('onClose')
        },
        ok() {
            this.$emit('onOk', true)
        }
    },
}
</script>

<style lang="scss" >
@import '@/assets/scss/components/modals/success.scss';
</style>
