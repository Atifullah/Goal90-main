<template>
    <div class="apply-success-modal">
        <a-modal id="agent-apply-modal" v-model="show" :footer="false" :title="false" @cancel="close" width="400px">
            <a-row>
                <a-col :lg="24" align="center">
                    <img :src="image" class="pt-2" />

                    <p class="success-txt fw-5 pt-3 mb-2 pb-1 text-center">{{ applySuccessModel.ServerMessage }}</p>

                    <p class="success-desc fw-5 text-center mb-4">{{ applySuccessModel.ClientMessage }}</p>

                    <a-button class="primary-btn fw-5" block @click="close()">Ok</a-button>
                </a-col>
            </a-row>

        </a-modal>
    </div>
</template>

<script>
export default {
    props: {
        applySuccessModel: {
            type: Object,
        },
        image: {
            type: String,
            default: '/images/success-img.svg'
        }
    },
    computed: {
        show() {

            if (this.applySuccessModel.ServerMessage != undefined && this.applySuccessModel.ServerMessage.length > 1) {
                return true;
            }
            else return false;
        }

    },
    methods: {
        close() {
            if (this.applySuccessModel.Data != undefined) { this.$emit('applySuccessModelClose', this.applySuccessModel.Data) }
            else { this.$emit('applySuccessModelClose') }

        }
    },
}
</script>

<style lang="scss">
@import '@/assets/scss/components/modals/success.scss';
</style>
