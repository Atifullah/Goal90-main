<template>
    <div>
        <a-modal id="add-payment" v-model="verificationModel" width="450px" :footer="false" @cancel="close">
            <a-row class="px-4 py-4">

                <a-col :lg="20">
                        <p class="mb-0 payment-heading"><img :src="verificationType == 'google' ? '/images/google-verification.svg' : '/images/fund-pass.svg'"
                                        class="mr-2 pointer" @click="goback" /> <span>
                                        {{ verificationType == 'google' ? 'Verification' : 'Fund Password' }}
                                    </span></p>
                </a-col>
                <a-col :lg="4" align="end" class="pointer">
                    <img src="/images/ud-cross.svg" @click="close" />
                </a-col>
                </a-row>
                <a-row class="px-4">
            </a-row>

            <a-row class="px-4">
                <a-col :lg="24">
                    <a-form-model ref="verification" :hide-required-mark="true" label-align="left" :model="verify"
                        :rules="rules">
                        <a-row :gutter="16">
                            <a-col :lg="24">
                                <p class="google-fund-txt fw-5">

                                        {{ verificationType == 'google' ? 'Google Verify' : 'Fund Password' }}
                                 </p>
                                <a-form-model-item has-feedback prop="code" :colon="false" :wrapper-col="{
                                    xl: 24,
                                    lg: 24,
                                    md: 24,
                                    sm: 24,
                                    xs: 24,
                                }">
                                    <a-input-password  v-model="verify.code" />
                                </a-form-model-item>
                                <p class="my-3">{{$t('extra.extra24')}} <nuxt-link to="/person/security"> {{$t('extra.extra26')}}</nuxt-link></p>

                            </a-col>
                        </a-row>

                        <a-row :gutter="16" class="pb-4 pt-3">
                            <a-col :lg="12">
                                <a-button block class="cancel-outline-btn fw-5" @click="close">{{$t('person.pd18')}}</a-button>
                                </a-col>
                                <a-col :lg="12">

                                <a-button block class="primary-btn fw-5 px-4" @click="Confirm" :loading="loading">{{$t('home.Confirm')}}</a-button>
                            </a-col>
                        </a-row>
                    </a-form-model>
                </a-col>
            </a-row>
        </a-modal>
    </div>
</template>

<script>
export default {
    props: {
        verificationModel: {
            type: Boolean
        },
        close: {
            type: Function
        },
        loading:{
            type:Boolean
        }
    },
    data() {
        return {
            verify: {
                code: '',
            },
            verificationType: 'paypassword',
            rules: {
                code: [
                    { required: true, message: this.$t('messages.msg37') },
                ],
            }
        }
    },
    methods: {
        goback() {
            this.$router.go(-1);
        },
        async Confirm() {
            const _self=this;
            await this.$refs['verification'].validate((valid) => {
                if (valid) {
                    let verifycode = {};
                    if (this.verificationType == 'google') {
                        verifycode.googleVerifyCode = this.verify.code
                    }
                    else {
                        verifycode.payPassword = this.verify.code
                    }

                    _self.$emit('confirmPaymentMethod',verifycode);
                    // _self.reset();
                }
            })

        },
        changeVerification() {
            if (this.verificationType == 'google') {
                this.verificationType = 'payPassword'
            }
            else {
                this.verificationType = 'google';
            }
        },
        reset() {
            this.verify = {
                code: '',
            };
            this.verificationType = 'google';
            this.$refs['verification']?.clearValidate(['code']);

        }
    }
}
</script>

<style lang="scss">
@import '@/assets/scss/pages/user-center/payment-method.scss';
</style>
