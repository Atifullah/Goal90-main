<template>
  <div class="scurity-form">
    <div class="">
      <a-card class="security-card" :bordered="false">
        <p class="main-heading fw-5 mb-0"> <img src="/images/arrow-left.svg" class="mr-2 pointer"
            @click="goback" /> {{ $t('security.paypassword') }}</p>
      </a-card>
      <a-card :bordered="false" class="pb-5 security-form mt-3">
        <a-form-model ref="changeFundPassword" :hide-required-mark="true" label-align="left" :model="modifyPayPassword"
          :rules="rules">
          <a-row class="pt-5 px-4">
            <a-col :lg="{span:14,offset:5}" :xl="{span:10,offset:7}">
              <a-row :gutter="16" class="col-alignment">
                <a-col :lg="4">
                  <img src="/images/key-verification.svg" />
                </a-col>
                <a-col :lg="20" class="">
                  <p class="transfer-heading fw-5 mb-2">{{ $t('security.paypassword') }}</p>
                  <p class="enter-pass mb-0">{{ $t('person.ps4') }}</p>
                </a-col>
              </a-row>
              <p class=" notice-txt fw-4 mb-0 my-3 pt-4">{{ $t('person.ps5') }}</p>

              <a-row :gutter="16" class="pt-3">
                <a-col :lg="24">
                  <a-form-model-item has-feedback :label="$t('labels.lbl57')" prop="paypassword" :colon="false"
                    :wrapper-col="{
                      xl: 24,
                      lg: 24,
                      md: 24,
                      sm: 24,
                      xs: 24,
                    }">
                    <a-input-password :placeholder="$t('formMenu.modifyPayPassword')"
                      v-model="modifyPayPassword.paypassword" />
                  </a-form-model-item></a-col>
              </a-row>
              <a-row :gutter="16" class="pt-3">

                <a-col :lg="24">
                  <a-form-model-item has-feedback :label="$t('labels.lbl58')" prop="passwordagain" :colon="false"
                    :wrapper-col="{
                      xl: 24,
                      lg: 24,
                      md: 24,
                      sm: 24,
                      xs: 24,
                    }">
                    <a-input-password :placeholder="$t('formMenu.payPasswordAgain')"
                      v-model="modifyPayPassword.passwordagain" />
                  </a-form-model-item></a-col>
              </a-row>
              <a-row :gutter="16" class="mt-3">
                <a-col :lg="24" align="end">
                  <a-button class="primary-btn fw-5 px-4" block @click="validate">{{ $t('security.modify') }}</a-button>
                </a-col>
              </a-row>
            </a-col>
          </a-row>
        </a-form-model>
      </a-card>
    </div>
    <popup @closepopup='popups' ref="child" :model="popupstate" @confirm="confirm" />
  </div>
</template>

<script>
import popup from '@/components/security/popup-public'
import crypto from "@/plugins/axios/crypto";

export default {
  name: 'ChangeFundPassword',
  components: { popup },
  watch: {
    'modifyPayPassword.paypassword': function (val) {
      const _modifyPayPassword = this.modifyPayPassword
      if (this.reg.strong.test(val)) {
        _modifyPayPassword.passwordstrength = 3
      } else if (this.reg.middle.test(val)) {
        _modifyPayPassword.passwordstrength = 2
      } else if (this.reg.single.test(val)) {
        _modifyPayPassword.passwordstrength = 1
      } else {
        _modifyPayPassword.passwordstrength = 0
      }
    }
  },

  data() {
    return {
      loading: false,
      submitState: false,
      popupstate: false,
      reg: {
        single: /^((?=.*[a-z])|(?=.*[A-Z])|(?=.*[0-9]))(?=.{8,})/g,
        middle: /^(((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[A-Z])))(?=.{8,})/g,
        strong: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*`~()_=/])(?=.{8,})/g
      },
      //注册model
      modifyPayPassword: {
        password: "",
        paypassword: '',
        passwordagain: '',
      },
      rules: {
        //password removed from here
        paypassword: [
          { required: true, message: this.$t('messages.msg43'), },
          {
            min: 8,
            max: 20,
            message: this.$t('messages.msg8'),
            trigger: 'change'
          }
        ],
        passwordagain: [
          {
            required: true,
            message: this.$t('messages.msg44'),
          },
          {
            min: 8,
            max: 20,
            message: this.$t('messages.msg8'),
            trigger: 'change'
          },
          {
            min: 8,
            max: 20,
            validator: (rule, value, callback) => {
              if (value === '') {
                callback(new Error(this.$t('messages.msg44')))
              } else if (value !== this.modifyPayPassword.paypassword) {
                callback(new Error(this.$t('messages.msg45')))
              } else {
                callback()
              }
            },
            trigger: 'change',
            message: this.$t('messages.msg45')
          }
        ]
      },
    }
  },
  methods: {
    goback() {
      this.$router.go(-1);
    },
    popups(val) {
      const _self = this;
      _self.popupstate = val;
      if (!val) {
        _self.popupstate = false;
      }

    },
    async validate() {
      const _self = this;
      await this.$refs['changeFundPassword'].validate((valid) => {
        if (valid) {
          _self.popups(true);
        }
      })

    },
    confirm(_childthis) {
      const _child = _childthis;
      const _self = this;
      if (_self.submitState) return;

      _self.loading = true;
      _self.submitState = true;

      
      const paypassword = crypto.md5String(this.modifyPayPassword.paypassword);
      _self.$store.dispatch('user_user_paypassword_set', {
        paypassword: paypassword,
        emailVerifycode: _child.verifyModel.emailverifycode,
        googleVerifyCode: _child.verifyModel.googleverifycode,
        smsVerifyCode: _child.verifyModel.smsverifycode,
      }).then((resoult) => {
        _self.submitState = false;
        _self.loading = false;
        if (resoult.data) {
          this.global_refresh_user_info();
          this.$store.commit('set_message', { type: 'ok', text: resoult.msg });
          this.$router.push('/person/security');
        } 
      })

    }
  },
}

</script>
