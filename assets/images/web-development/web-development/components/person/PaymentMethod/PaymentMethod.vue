<template>
  <div class="payment">
    <a-card class="payment-card" :bordered="false">
      <a-row :gutter="16" class="col-alignment">
        <a-col :lg="10">
          <p class="mb-0 main-heading fw-5">{{ $t('legalDeal.collection') }}</p>
        </a-col>
        <a-col :lg="14" align="end">
          <a-popover :title="false" :trigger="!securityCheckModel ? 'hover' : ''" placement="bottom"
            overlay-class-name="payment-method-popover">
            <template slot="content">

              <p class="bank-transfer fw-5 p-3 pointer  header-list" @click="bankTransfer">{{ $t('person.pp5') }}</p>

              <a-row :gutter="16" class="pointer col-alignment">

                <a-col :lg="24" @click="getAllC2CPaymentMethods">
                  <div class="more p-3 bank-transfer">
                    <div>{{ $t('person.notice_top_more') }} </div>
                    <div>
                      <img src="/images/more-method.svg" />
                    </div>
                  </div>
                </a-col>
              </a-row>
            </template>
            <a-button class="outline-btn fw-5" :disabled="securityCheckModel">
              <a-icon type="plus" /> {{ $t('legalDeal.AddPaymentMethod') }}</a-button>
          </a-popover>
        </a-col>
      </a-row>
    </a-card>
    <a-card :bordered="false" class="mt-3 pb-5">
      <a-row>
        <a-card class="orange-card-btn my-4" :bordered="false">
          <div class="text-left notice-txt fw-4 mb-0">
            <div class="error-img-left">
              <img src="/images/orange-img.svg" />
            </div>
            <div class="error-img-left pl-3"><strong>{{ $t('person.pp6') }}:</strong> {{ $t('person.pp7') }}
            </div>
          </div>
        </a-card>
      </a-row>
      <a-row class="" v-if="bindCollection.length == 0"
        style="display:flex;justify-content:center; align-items:center; flex-direction: column; height:25rem;">
        <img src="../../../static/images/empty-list.svg" style="width:50px; height:auto;" />
        <p>{{ $t('c2c.noPaymentMethod') }}</p>

      </a-row>
      <template v-else>
        <a-row v-for=" item in bindCollection" :key="item.typeid">
          <PaymentDetail :item="item" :paymentGetList="paymentGetList" />
        </a-row>
      </template>

    </a-card>
    <SelectPaymentMethod :model="model" :paymentMethodCollection="paymentMethodCollection" :toggleModel="toggleModel" />
    <SecurityCheck :securityCheckModel="securityCheckModel" :close="close" />
  </div>
</template>

<script>

import PaymentDetail from "./PaymentDetail.vue"
import SelectPaymentMethod from "./PaymentModal/SelectPaymentMethod.vue";
import SecurityCheck from "../Security/SecurityModal/SecurityCheck";
export default {
  components: {
    PaymentDetail,
    SelectPaymentMethod,
    SecurityCheck

  },
  data() {
    return {
      lang: this.$store.state.hex_lang.locale,
      loading: false,
      bindCollection: [],
      paymentMethodCollection: {},
      ispaypassword: '',
      model: false,
      securityCheckModel: false
    }
  },
  mounted() {

    if (!this.$userinfo.isopenpaypassword || !this.$userinfo.isgoogleauthed) {

      this.securityCheckModel = true;
    } else {
      this.paymentGetList();
    }

  },
  watch: {
    '$store.state.hex_lang.locale': function (val) {
      this.lang = val;
    }
  },
  methods: {

    async getAllC2CPaymentMethods() {
      const _self = this;
      _self.toggleModel(true);
      try {
        let { data } = await _self.$store.dispatch('trading_c2c_all_payment_method_get', {
        });
        _self.paymentMethodCollection = data;
      } catch (error) {
        //console.log('Error', error);
      }
    },
    async bankTransfer() {
      const _self = this;
      try {
        let { data } = await _self.$store.dispatch('trading_c2c_all_payment_method_get');
        const item = data.all.filter(item => item.name == 'Bank Transfer');
        this.$store.commit('setSelectedPayment',item[0])
        this.$router.push({ path: 'payment/add-method'})
      } catch (error) {
        //console.log('Error', error);
      }
    },
    toggleModel(model) {
      this.model = model;
      this.showAlpha = '';
      this.showrecommend = 4;
    },
    close() {
      this.securityCheckModel = false;
    },
    async paymentGetList() {
      if (this.loading) return;
      this.loading = true;
      this.ispaypassword = this.$userinfo.isopenpaypassword;
      this.$store.dispatch('user_user_payments_get').then(({ data }) => {
        if (data) {

          let datas = [];
          data.map((item) => {
            datas.push(item);
          })
          this.bindCollection = datas;
          //console.log(datas)
        }
        else {
          this.bindCollection = []
        }

        this.loading = false;

      })

    },
    async deletePaymentMethod(id) {
      const _self = this;
      try {
        await _self.$store.dispatch('user_user_payments_delete', {
          id: id
        });
        _self.paymentGetList();
        return
      } catch (error) {
        //console.log('Error', error);
      }
    }

  }

}
</script>

<style lang="scss">
@import '@/assets/scss/pages/user-center/payment-method.scss';
</style>
