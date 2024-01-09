<template>
  <div>
    <a-modal id="add-payment" v-model="verificationModel" width="400px" :footer="false" @cancel="close">
      <a-row class="px-4 pt-4">
        <a-col :lg="16">
          <p class="payment-heading fw-5">
            {{ $t('person.pd20') }}
          </p>
        </a-col>
        <a-col :lg="8" align="end" class="pointer">
          <img src="/images/ud-cross.svg" @click="close" />
        </a-col>

      </a-row>
      <a-row class="px-4">
        <a-col :lg="24">
          <a-form-model ref="verification" :hide-required-mark="true" label-align="left" :model="verify" :rules="rules">
            <a-row :gutter="16">
              <a-col :lg="24">
                <p class="verification-paypass fw-5"><img src="/images/fund-pass1.svg" class="mr-2" /> <span>
                    {{ $t('person.pd22') }}
                  </span></p>
                <a-form-model-item has-feedback prop="paypassword" :colon="false" :wrapper-col="{
                  xl: 24,
                  lg: 24,
                  md: 24,
                  sm: 24,
                  xs: 24,
                }">
                  <a-input-password v-model="verify.paypassword" />
                </a-form-model-item>
              </a-col>
              <a-col :lg="24">
                <p class="verification-paypass fw-5"><img src="/images/google2.svg" class="mr-2 " /> <span>
                    {{ $t('person.pd21') }}
                  </span></p>
                <a-form-model-item has-feedback prop="googleVerifyCode" :colon="false" :wrapper-col="{
                  xl: 24,
                  lg: 24,
                  md: 24,
                  sm: 24,
                  xs: 24,
                }">
                  <a-input v-model="verify.googleVerifyCode" />

                </a-form-model-item>
              </a-col>
              <a-col :lg="24" align="end">
                <nuxt-link to="/person/security/password-capital" class="forgot-pass fw-5">{{ $t('last.la18')
                }}</nuxt-link></a-col>
            </a-row>
            <a-row :gutter="16" class="pb-4 pt-3">
              <a-col :lg="24" align="end">
                <a-button class="cancel-outline-btn fw-5 mr-2 px-4" @click="close">{{ $t('person.pd18') }}</a-button>
                <a-button class="primary-btn fw-5 px-4" @click="Confirm">{{ $t('person.pd19') }}</a-button>
              </a-col>
            </a-row>
          </a-form-model>
        </a-col>
      </a-row>
    </a-modal>
  </div>
</template>

<script>
import crypto from "@/plugins/axios/crypto";
export default {
  name: 'verification-model',
  props: {
        verificationModel: {
      type: Boolean
    },
    close: {
      type: Function
    },
    confirmPaymentMethod: {
      type: Function
    }
  },
  data() {
    return {
      verify: {
        googleVerifyCode: '',
        paypassword: ''
      },
      rules: {
        googleVerifyCode: [
          { required: true, message: this.$t('messages.msg25') },
        ],
        paypassword: [
          { required: true, message: this.$t('messages.msg26') },
        ],
      }
    }
  },
  methods: {
    async Confirm() {
      await this.$refs['verification'].validate((valid) => {
        if (valid) {
          const encryptedpassword = crypto.md5String(this.verify.paypassword)
          let data = {
            googleVerifyCode: this.verify.googleVerifyCode,
            paypassword: encryptedpassword
          }
          this.confirmPaymentMethod(data);

        }
      })

    },

  }
}
</script>

<style></style>
