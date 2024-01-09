<template>
  <div id="get-code">
    <a-card class="get-code-card" :bordered="false">
      <a-row class="main-content">

        <a-col :lg="{span:12,offset:6}" :xl="{span:8,offset:8}" class="py-5 mb-4 text-center">
          <a-card :bordered="false" class="reset-white-bg">
            <div class="lock-img">
              <img src="/images/lock1.svg" />
            </div>
            <p class="mt-3 security-txt fw-5 mb-2">{{ $t('last.la1') }}</p>
            <p class="text-center notice-txt fw-5 pb-2 px-5 mx-3">{{ $t('last.la6') }} <span @click="openChatPopover"
                style="color: #FFA500;cursor: pointer;">{{
                  $t('last.la7') }}</span>
            </p>
            <!-- <button > event click</button> -->
            <a-tabs class="px-5" v-model="activeKey" @change="changeTab">
              <a-tab-pane key="google" v-if="verifyModel.isgoogleauthed">
                <span slot="tab">
                  <img
                    :src="activeKey == 'google' ? '/images/google1-icon-active.svg' : '/images/google1.svg'"
                    class="pr-1" />
                  {{ $t('last.la5') }}
                </span>
                <p class="verification-code-txt fw-5 mb-2">{{ $t('bscard.bsc54') }}</p>
                <p class="verification-code-txt fw-5 mb-2">{{ $t('bscard.bsc49') }}</p>
                <a-form-model ref="googleVerificationForm" :model="signModel"
                  :rules="setGoogleVerificationValidation.rules" :hide-required-mark="true" label-align="left">
                  <a-form-model-item prop="verifycode" has-feedback :colon="false" :wrapper-col="{
                    xl: 24,
                    lg: 24,
                    md: 24,
                    sm: 24,
                    xs: 24,
                  }">
                    <a-input type="number" ref="googleInput" class="mb-2 pr-0" :placeholder="$t('placeholders.plh66')"
                      size="large" v-model="signModel.verifycode" @keyup.enter="toSign('googleVerificationForm')" />
                  </a-form-model-item>
                  <a-button class="my-3 fw-5" block @click="toSign('googleVerificationForm')" :loading="loading"
                    :class="loading ? 'disabled-btn' : 'primary-btn'">{{ $t('last.la3') }}</a-button>
                </a-form-model>
              </a-tab-pane>

              <a-tab-pane key="email" v-if="verifyModel.isemailauthed">
                <span slot="tab">
                  <img
                    :src="activeKey == 'email' ? '/images/email-icon-active.svg' : '/images/email-icon.svg'"
                    class="pr-1" />
                  {{ $t('last.la4') }}
                </span>
                <p class="verification-code-txt fw-5 mb-2">{{ $t('bscard.bsc49') }}</p>
                <a-form-model ref="emailVerificationForm" :model="signModel" :rules="setEmailVerificationValidation.rules"
                  :hide-required-mark="true" label-align="left">

                  <a-row :gutter="8">
                    <a-col :lg="15">
                      <a-form-model-item prop="verifycode" has-feedback :colon="false" :wrapper-col="{
                        xl: 24,
                        lg: 24,
                        md: 24,
                        sm: 24,
                        xs: 24,
                      }">
                        <a-input class="mb-2 pr-0" ref="emailInput" type="number" :placeholder="$t('placeholders.plh34')"
                          size="large" v-model="signModel.verifycode" @keyup.enter="toSign('emailVerificationForm')">

                        </a-input>
                      </a-form-model-item>
                    </a-col>
                    <a-col :lg="9">
                      <verifycode :email="verifyModel.email" :template="'signIn'">
                      </verifycode>
                    </a-col>
                  </a-row>


                  <a-button class="my-4 fw-5" block @click="toSign('emailVerificationForm')" :loading="loading"
                    :class="loading ? 'disabled-btn' : 'primary-btn'">{{ $t('last.la3') }}</a-button>
                </a-form-model>
              </a-tab-pane>

              <a-tab-pane key="phone" v-if="verifyModel.isphoneauthed">
                <span slot="tab">
                  <img
                    :src="activeKey == 'phone' ? '/images/phone-icon-active.svg' : '/images/phone-icon.svg'"
                    class="pr-1" />
                  {{ $t('last.la2') }}
                </span>
                <p class="verification-code-txt fw-5 mb-2">{{ $t('bscard.bsc49') }}</p>
                <a-form-model ref="smsVerificationForm" :model="signModel" :rules="setSmsVerificationValidation.rules"
                  :hide-required-mark="true" label-align="left">

                  <a-row :gutter="8">
                    <a-col :lg="15">
                      <a-form-model-item prop="verifycode" has-feedback :colon="false" :wrapper-col="{
                        xl: 24,
                        lg: 24,
                        md: 24,
                        sm: 24,
                        xs: 24,
                      }">
                        <a-input class="mb-2 pr-0" type="number" ref="phoneInput" :placeholder="$t('placeholders.plh10')"
                          size="large" v-model="signModel.verifycode" @keyup.enter="toSign('smsVerificationForm')">
                          <!-- <div slot="suffix"> </div> -->

                        </a-input>
                      </a-form-model-item>
                    </a-col>
                    <a-col :lg="9">
                      <verifycode :phone="verifyModel.phone" :areacode="verifyModel.countrycode" :template="'signIn'">
                      </verifycode>
                    </a-col>

                  </a-row>
                  <a-button class="my-4 fw-5" block @click="toSign('smsVerificationForm')" :loading="loading"
                    :class="loading ? 'disabled-btn' : 'primary-btn'">{{ $t('last.la3') }}</a-button>
                </a-form-model>

              </a-tab-pane>


            </a-tabs>
          </a-card>
        </a-col>
      </a-row>
    </a-card>
  </div>
</template>
<script>
import Captcha from '@/plugins/captcha'
import { required } from 'vuelidate/lib/validators'
import verifycode from '@/components/public/verifycode'
import { mapState, mapMutations } from 'vuex';



export default {
  name: 'Auth',
  layout: 'default2',
  components: {
    verifycode
  },
  validations: {
    signModel: {
      verifycode: {
        required
      }
    }
  },

  data() {
    return {
      loading: false,
      state: {
        tab: '',
        signin: false,
        sendDelay: this.$t("formMenu.getCode")
      },
      signModel: {},
      sendModel: {
        template: 'Signin',
      },
      returnurl: '',
      verifyModel: {},
      activeKey: '',
      activeForm: 'googleVerificationForm',
      setSmsVerificationValidation: {
        rules: {
          verifycode: [
            { required: true, message: this.$t('messages.msg14'), trigger: ["change"] },

          ],
        }
      },
      setEmailVerificationValidation: {
        rules: {
          verifycode: [
            { required: true, message: this.$t('messages.msg15'), trigger: ["change"] },
          ],
        }
      },
      setGoogleVerificationValidation: {
        rules: {
          verifycode: [
            { required: true, message: this.$t('messages.msg15'), trigger: ["change"] },
          ],
        }
      }
    }
  },
  watch: {
    'state.tab': function (val) {
      if (this.signModel.ticket) {
        Object.assign(this.sendModel, {
          ticket: this.signModel.ticket,
          captchaid: Captcha.appId,
          randstr: this.signModel.randstr
        })
      }
      if (val == 'email') {
        Object.assign(this.sendModel, {
          email: this.verifyModel.email
        })
      } else if (val == 'phone') {
        Object.assign(this.sendModel, {
          phone: this.verifyModel.phone,
          areacode: this.verifyModel.countrycode
        })
      }
      setTimeout(() => {
        this.$v.$reset()
      }, 0)
    },
    'signModel.verifycode': function (val) {
      val = val ? val.trim() : ''
      if (val && val.length == 6) {
        this.toSign(this.activeForm)
      }
    }
  },

  mounted() {
    this.activeKey = this.state.tab


    this.changeTab(this.activeKey)
    /*  setTimeout(() => {
        if (this.verifyModel.isemailauthed) {
          this.setActive('email')
        } else if (this.verifyModel.isphoneauthed) {
          this.setActive('phone')
        }else if (this.verifyModel.isgoogleauthed) {
          this.setActive('google')
        }
        this.$v.$reset()
      }, 300) */
  },
  beforeRouteEnter(to, from, next) {
    if (!to.params.verifyModel) {
      next('login')
    } else {
      next((vm) => {
        const { verifyModel, signModel, returnurl } = to.params;
        vm.verifyModel = verifyModel;
        vm.signModel = signModel;
        vm.returnurl = returnurl;
        if (verifyModel.isgoogleauthed) {
          vm.state.tab = 'google'
        } else if (verifyModel.isemailauthed) {
          vm.state.tab = 'email'
        } else {
          vm.state.tab = 'phone'
        }
      })
    }
  },
  computed: {
    ...mapState({
      showPopover: (state) => state.popoverstate.showPopover,
    }),
  },
  methods: {
    ...mapMutations(['setShowPopover']),
    openChatPopover() {
      this.setShowPopover(true);
    },
    async toSign(form) {
      //console.log(form)
      await this.$refs[form].validate((valid) => {
        //console.log('Form valid', valid);
        if (!valid) {
          return
        }
        let _self = this;
        if (_self.loading) return;
        _self.loading = true;
        if (this.state.signin) return;
        this.state.signin = true;
        if (this.state.tab == 'email') {
          this.signModel.vctype = "Email"
        } else if (this.state.tab == 'phone') {
          this.signModel.vctype = 'SMS'
        } else {
          this.signModel.vctype = 'Google'
        }
        if (this.signModel.ticket == "666666") {
          this.signModel.username = "";
        }
        this.getUserInfo()
      })
    },

    getUserInfo() {
      let _self = this;
      if (this.verifyModel.isemailauthed == true && this.verifyModel.isgoogleauthed == false && this.verifyModel.isphoneauthed == false) {
        this.signModel.randstr = this.sendModel.randstr
      }
      _self.$store.dispatch('user_user_signin', this.signModel).then((res) => {
        if (res.data) {
          this.$store.commit('set_token', {
            'token': res.data.token,
            'expire': new Date().getTime() + 2 * 3600000
          });
          _self.$store.commit('set_user_info', res);

          console.log('RESSS auth: ', res);
          //console.log('RESSS auth: ', res)
          if (this.returnurl) {
            //console.log('this.returnurl', this.returnurl);
            location.href = this.returnurl
          } else {
            location.href = '/person'
          }
        } else {
          _self.state.signin = false;
          _self.loading = false;
        }
      })
    },

    setActive(tab) {
      this.signModel.verifycode = '';
      this.state.tab = tab
      this.$nextTick(() => {
        this.$v.$reset()
      })
      if (tab == 'phone') {
        this.activeForm = 'smsVerificationForm'
      } else if (tab == 'email') {
        this.activeForm = 'emailVerificationForm'
      } else {
        this.activeForm = 'googleVerificationForm'
      }
    },
    changeTab(key) {
      this.activeKey = key;
      this.setActive(key)
      //console.log('key:::', key);

      this.$nextTick(() => {
        setTimeout(() => {
          this.$refs[key + 'Input'].focus();
        }, 200);
      });
    },
    onSearch() {
    },
  }
}
</script>
