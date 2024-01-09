<template>
    <div class="apply-success-modal">
        <a-modal id="agent-apply-modal" v-model="show" :footer="false" :title="false" @cancel="close" width="450px"
            :maskClosable="false">

            <a-row>
                <a-col :lg="16">
                    <p class="success-txt fw-5 mb-2 pb-1 "> Set Password </p>
                </a-col>
                <a-col :lg="8" align="end" class="pointer">
                    <img src="/images/ud-cross.svg" @click="close()" class="pointer " />
                </a-col>
            </a-row>

            <a-row>
                <a-col :lg="24" align="center">
                    <img :src="image" class="pt-2" />
                    <p class="success-desc fw-5  my-3 ">You've not bind
                        <nuxt-link class="active" :to="selfRoute.changeGoogleVerification">Google Authenticater</nuxt-link> and 
                        <nuxt-link class="active" :to="selfRoute.fundsPassword">Fund Password</nuxt-link>.
                    </p>
                </a-col>
            </a-row>

            <a-row :gutter="16" class="my-3">
                <a-col :lg="12">
                    <a-button class="outline-btn fw-5" block @click="ok()">Cancel</a-button>
                </a-col>
                <a-col :lg="12">
                    <a-button class="primary-btn fw-5" block>
                        <nuxt-link :to="selfRoute.security">
                            Set Password
                        </nuxt-link>
                    </a-button>
                </a-col>
            </a-row>
        </a-modal>
    </div>
</template>

<script>
export default {
    name: "SetFundPasswordModal",
    props: {
        successModel: {
            type: Object, //{heading:'', message:''}
        },
        image: {
            type: String,
            default: '/images/security-lock.svg'
        },
        show: {
            type: Boolean,
            default: false
        }
    },
    emits: ['onClose', 'onOk'],
    computed: {
        selfRoute: function () {
            return this.$store.state.route
        },
    },

    methods: {
        close() {
            this.$emit('onClose', true)
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
