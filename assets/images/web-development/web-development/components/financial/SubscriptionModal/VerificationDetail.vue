<template>
  <div class="verification">
    <a-modal id="verification-detail" v-model="isVerification" width="450px" :footer="false" @cancel="close">

      <a-row :gutter="16" class="col-alignment mb-3">
        <a-col :lg="20">
          <p class="verification-info fw-5 mb-0">{{ $t('subscriptio.sub15') }}</p>
        </a-col>
        <a-col :lg="4" align="end"><img src="/images/ud-cross.svg" class="pointer"
            @click="close" /></a-col>
      </a-row>
      <a-row :gutter="16" class="py-4">
        <a-col :lg="24">
          <p class="mb-0 verification-type fw-5 pointer" @click="googleVerify = !googleVerify">{{$t('deal_new.dn41')}}</p>
        </a-col>
      </a-row>
      <p class="label-text fw-5 mb-3">{{ googleVerify ? 'Google Verify' : 'Fund Password' }}</p>
      <a-input type="number" v-if="googleVerify" :placeholder="$t('placeholders.plh20')" v-model="googleVerificationCode" />
      <a-input-password v-else :placeholder="$t('placeholders.plh21')" v-model="paymentVerificationCode" />

      <a-row :gutter="16" class="mt-4">
        <a-col :lg="12"><a-button class="cancel-outline-btn fw-5" @click="close" block>{{$t('deal_new.dn42')}}</a-button></a-col>
        <a-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
          <a-button html-type="submit" block class="primary-btn fw-5" :loading="loading" @click="subscribePakcage">
            {{ $t('subscriptio.sub14') }}
          </a-button>
        </a-col>
      </a-row>
    </a-modal>
  </div>
</template>

<script>
import crypto from "@/plugins/axios/crypto";
export default {
  props: {
    isVerification: {
      type: Boolean
    },
    purchaseProductID: {
      type: String
    },
    currencyID: {
      type: Number
    },
    close: {
      type: Function
    },
    refresh: {
      type: Function
    },
    tradeAmount: {
      type: Number
    }
  },
  data() {
    return {
      loading: false,
      googleVerify: true,
      paymentVerificationCode: '',
      googleVerificationCode: '',
    }
  },
  methods: {
    reset() {
      this.paymentVerificationCode = '';
      this.googleVerificationCode = '';
    },
    subscribePakcage() {
      let amount = 0;
      let tamount = 0;
      if (this.currencyID == 0) {
        amount = this.tradeAmount;
      }
      else {
        tamount = this.tradeAmount;
      }
      let data = {
        "productID": this.purchaseProductID,
        "amount": amount,
        "tAmount": tamount,
      }
      if (this.paymentVerificationCode) {
        data.payPassword = crypto.md5String(this.paymentVerificationCode)
      }
      else if (this.googleVerificationCode) {
        data.googleVerifyCode = this.googleVerificationCode
      }
      else {
        return
      }
      this.loading = true;
      this.$store.dispatch('finance_user_product_purchase', data).then((res) => {
        if (res.code == 200) {
          this.$store.commit('set_message', { type: 'ok', text: this.$t('texts.txt11') });
          this.refresh();
        }
        this.loading = false;
        this.close();
      })
    }
  },
}
</script>

<style></style>
