<template>
    <a-modal v-model="show" wrapClassName="delete-confirm-modal" :footer="false" :title="false" @cancel="close"
        width="400px" :maskClosable="false">
        <a-row>
            <a-col :lg="24" align="center">
                <img src="/images/orange-cancel.svg" class="pt-2" height="48" />
                <p class="success-desc fw-5 text-black text-center my-4">{{ text }}</p>
            </a-col>
        </a-row>
        <a-row :gutter="16">
            <a-col :lg="12" class="text-right">
                <a-button class="fw-5 cancel-outline-btn" block @click="close">{{ $t('legalTrad.Cancel') }}</a-button>
            </a-col>
            <a-col :lg="12">
                <a-button class="primary-btn fw-5" block @click="$emit('onConfirm')" :loading="loading"
                    :disabled="loading">{{ $t('formMenu.confirm') }}</a-button>
            </a-col>
        </a-row>
    </a-modal>
</template>

<script>
export default {
    name: "ConfirmModal",
    props: {
        show: {
            type: Boolean,
            default: false
        },
        loading: {
            type: Boolean,
            default: false
        },
        text: {
            type: String,
            default: null
        }
    },
    emits: ['onClose', 'onConfirm'],

    methods: {
        close() {
            this.$emit('onClose')
        },
    },
}
</script>

<style lang="scss" >
.delete-confirm-modal {
    .ant-modal-content {
        border-radius: 12px;

        .success-desc {
            font-size: 15px;
        }
    }
}
</style>
