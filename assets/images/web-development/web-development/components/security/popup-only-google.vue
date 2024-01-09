<template>
  <div class='popup'>
    <div class="mask"></div>
    <div class="mask-content">
      <div class="apiset" v-if="!popname">
        <a-row class="col-alignment mx-2">
          <a-col :lg="20">
            <p class="mb-0 new-verification-heading">{{ $t('security.cc25') }}</p>
          </a-col>
          <a-col :lg="4" align="end">
            <img src="/images/ud-cross.svg" class="pointer" @click="close" />
          </a-col>
        </a-row>
        <a-row class=" mt-4 mb-3 mx-2">
          <a-form-model ref="authForm" :model="form" :rules="rules">
            <a-form-model-item ref="name" :label="$t('labels.lbl56')" prop="googleauthed">
              <a-input :placeholder="$t('formMenu.googleInputVerification')" @keyup.enter='createdApi'
                v-model="form.googleauthed" />
            </a-form-model-item>
          </a-form-model>

        </a-row>
        <a-row class="mx-2 mt-3">
          <a-col :lg="24"><a-button class="primary-btn fw-5" block @click="createdApi">{{ $t('security.cc26')
          }}</a-button></a-col>
        </a-row>
      </div>
      <div v-if="popname == 'deleteAddress'">
        <a-row :gutter="16" class="px-2">
          <a-col :lg="3"></a-col>
          <a-col :lg="18" align="center"><img src="/images/delete-icon.svg" /></a-col>
          <a-col :lg="3" align="end">
            <img src="/images/ud-cross.svg" class="pointer" @click="close" />
          </a-col>
        </a-row>
        <a-row :gutter="16" class="text-center mt-4 pt-3">
          <a-col :lg="24">
            <p class="confirm-heading mb-1">{{ title }}</p>
            <p class="confirm-desc">{{ subTitle }}</p>
          </a-col>
        </a-row>
        <a-row :gutter="16" class="mt-4">
          <a-col :lg="12"><a-button block class="cancel-outline-btn fw-5" @click="close">{{ $t('legalTrad.Cancel')
          }}</a-button></a-col>
          <a-col :lg="12"><a-button class="primary-btn fw-5" block :loading="loading"
              @click="deleteAddressData(deleteData?.id)">{{ $t('security.cc26') }}</a-button></a-col>
        </a-row>
      </div>
    </div>
  </div>
</template>
<script>
import { required } from 'vuelidate/lib/validators'

export default {
  name: "PopupOnlyGoogle",
  validations: {
    googleauthed: {
      required
    }
  },
  props: {
    title: {
      type: String,
      default: () => {
        return "Confirm Closing the ad?"// this.$t('depositModal.dm18')
      } //this.$t('depositModal.dm18')
    },
    subTitle: {
      type: String,
      default: () => {
        return "Once closed, You can not edit this ad"// this.$t('depositModal.dm19')
      }
    }
  },
  data() {
    return {
      loading: false,
      submitState: false,
      popname: '',
      form: {
        googleauthed: ""
      },
      rules: {
        googleauthed: [
          {
            required: true, message: this.$t('messages.msg38')
          }
        ],
      },
      apiid: '',
      deleteData: {}
    };
  },
  subscribe() {
    return {
      resetValidate() {
        this.resetvalidate();
      }
    }

  },
  mounted() {
  },
  methods: {
    resetvalidate() {
      this.form.googleauthed = '';
      this.$v.$reset();
    },
    ShowPopup(deletedata, m) {
      this.loading = false;
      this.popname = m;
      this.deleteData = deletedata;
    },
    deleteAddressData(id) {
      this.loading = true;
      this.$emit('deleteAddress', id);
    },
    apipopup(val) {
      this.form.googleauthed = '';
      this.$v.$reset();
      this.apiid = val;
    },
    async createdApi() {
      if (this.submitState) return;
      await this.$refs['authForm'].validate((valid) => {
        if (valid) {
          this.submitState = true;
          this.loading = true;
          this.$store.dispatch("user_google_verfiycode_check", {
            verifycode: this.form.googleauthed
          })
            .then((res) => {
              if (res.data) {
                if (this.apiid != 'apiset') {
                  this.$emit('createapi', this.apiid);

                  this.$pubsub.publish(this.$pubsub[this.apiid.pops], this)
                } else {
                  this.$emit('createapi', this);
                }
                this.submitState = false;
                this.loading = false;
              } else {
                this.submitState = false;
                this.loading = false;
              }
            })
        }
      })
    },
    closeLoading() {
      this.loading = false;
    },
    close() {
      this.$emit('closePopup');
      this.form.googleauthed = '';
      this.$v.$reset();
    }
  }
};
</script>
<style lang='less' scoped>
@import '../../static/styles/auth';

.confirm-heading {
  font-size: 20px;
  font-weight: 400;
  color: #000000;
}

.mask-content {
  max-width: 400px;
}

.confirm-heading {
  font-weight: 500;
  font-size: 18px;
  color: #081131;
}

.new-verification-heading {
  font-weight: 500;
  font-size: 18px;
  color: #081131;
}

.confirm-desc {
  font-weight: 500;
  font-size: 14px;
  color: #718096;
}

.cancel-btn {
  background: #FFFFFF;
  border: 0.6px solid #000000;
  border-radius: 3px;
  font-weight: 400;
  font-size: 15px;
  color: #000000;
}

button.commitBtn.bg_bbb {
  background: #bbb !important;
}

.head {
  overflow: hidden;

  span {
    font-weight: 600;
  }
}

.popup .mask-content {
  background: #FCFCFC;
  box-shadow: 0px 3px 24px rgba(0, 0, 0, 0.1);
  border-radius: 12px;

}
</style>
