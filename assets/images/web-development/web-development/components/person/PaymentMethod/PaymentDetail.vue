<template>
  <div class="payment-detail pt-3">
    <a-card class="main-card" :bordered="false">
      <div class="main-bank-card">
        <a-card size="small" :bordered="false" class="bank-transfer-card">

          <a-row class="bank-color-name fw-5 px-3">
            <a-col :lg="12">
              <p :style="{ borderLeft: `3px solid ${item.payconfiginfo.bgcolor}`, paddingLeft: '10px' }">{{
                item.payconfiginfo.name }}</p>
            </a-col>
            <a-col :lg="12" align="end">
              <a @click="redirect(item)" class="mr-4 pr-2"><img
                  src="/images/pm-edit.svg" class="mr-2" />{{ $t('api.edit') }}</a>
              <nuxt-link to="/p2p/payment" @click.native="deletepopup(item, 'deleteAddress')"><img
                  src="/images/delete.svg" class="mr-2" />{{ $t('api.delete') }}</nuxt-link>
            </a-col>
          </a-row>
          <a-row :gutter="16" class="px-3 py-4">
            <a-col :lg="6" v-for="(_f, i) in  item.payconfiginfo.fields" :key="i">
              <p class="mb-1 user-name fw-5">{{ _f.fieldname }}</p>
              <a-popover v-if="_f.fieldcontenttype == 'qr_code'" trigger="hover" placement="bottom"
                overlay-class-name="qrcode-popover">
                <template slot="content">
                  <div>
                    <img :src="_f.fieldvalue" height="100" width="100" />
                  </div>

                </template>
                <img :src="_f.fieldvalue" height="20" width="20" />
              </a-popover>

              <p v-else class="user-detail fw-5 mb-1">{{ _f.fieldvalue }}</p>
            </a-col>
          </a-row>

        </a-card>
      </div>
    </a-card>
    <popupstair v-show="deleteState" @closePopup="deletePopupState" @deleteAddress="deletePaymentMethod"
      :title="$t('extra.extra26')" :subTitle="$t('extra.extra27')" ref="popname" />
  </div>
</template>

<script>
import popupstair from '@/components/security/popup-only-google'


export default {
  components: {
    popupstair,
  },
  props: {
    item: {
      type: Object
    },
    paymentGetList: {
      type: Function
    }
  },
  data() {
    return {
      deleteState: false,
    }
  },
  methods: {
    redirect(item){
      this.$store.commit('setSelectedPayment',item)
    this.$router.push({ path: '/p2p/payment/edit-method'});
    },
    deletePopupState() {
      this.deleteState = !this.deleteState;
    },
    deletepopup(vid, m) {
      this.deleteId = vid;
      this.deleteState = !this.deleteState;
      this.$refs.popname.ShowPopup(vid, m);


    },
    async deletePaymentMethod(id) {
      const _self = this;
      try {
        await _self.$store.dispatch('user_user_payments_delete', {
          id: id
        });
        _self.paymentGetList();
        _self.deletePopupState();
      } catch (error) {
        //console.log('Error',error);
      }
    }
  }
}
</script>

<style></style>
