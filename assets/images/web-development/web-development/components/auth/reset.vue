<template>
  <div class="reset-bg">
    <a-row class="pb-5">
      <a-col :lg="{span:22,offset:1}" :xl="{span:18,offset:3}" class="pb-4">
        <a-row class="reset-details">
          <a-col :lg="12" class="reset-left py-5">
            <a-row :gutter="16" class="px-5 py-5 my-5">
              <a-col :lg="18">
                <p class="log-bitnasdaq fw-5 mb-0">
                  {{ state.resetState == 1 ? this.$t('btntxt.bt10') : this.$t('btntxt.bt11') }}
                  <img src="/images/reset-lock.svg" />
                </p>
                <span class="reset-desc fw-5">
                  {{ $t('authentication.auth6') }}
                </span>
              </a-col>
              <a-col :lg="24" class="pt-4">

                <a-form-model :hide-required-mark="true" label-align="left" :model="resetForm" :rules="rules"
                  ref="resetForm">
                  <a-row>
                    <a-col v-if="state.resetState == 1" :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                      <a-tabs default-active-key="email" @change="switchEmailPhoneFields"
                        v-bind:style="`overflow: ${tab == 'phone_no' ? 'visible' : 'hidden'}`">
                        <a-tab-pane key="email">
                          <span slot="tab">
                            <img
                              :src="tab == 'email' ? '/images/email-icon-active.svg' : '/images/email-icon.svg'"
                              class="mr-1" />
                            {{$t('person.pd14')}}
                            <p v-show="tab == 'email'" class="bottom-line"></p>
                          </span>
                          <a-form-model-item class="pr-1" has-feedback :label="$t('person.pd14')" prop="email" :colon="false" :wrapper-col="{
                              xl: 24,
                              lg: 24,
                              md: 24,
                              sm: 24,
                              xs: 24,
                            }
                            ">
                            <a-input v-model="resetForm.email" autoFocus :placeholder="$t('placeholders.plh11')"
                              @keyup.enter="toStep1" v-if="showEmail" />
                          </a-form-model-item>
                        </a-tab-pane>
                        <a-tab-pane key="phone_no">
                          <span slot="tab">
                            <img
                              :src="tab == 'phone_no' ? '/images/phone-icon-active.svg' : '/images/phone-icon.svg'"
                              class="mr-1" />
                            {{$t('formMenu.phone')}}
                            <p v-show="tab == 'phone_no'" class="bottom-line"></p>
                          </span>
                          <a-form-model-item has-feedback :label="$t('labels.lbl9')" prop="phone_no" :colon="false"
                            :wrapper-col="{
                                xl: 24,
                                lg: 24,
                                md: 24,
                                sm: 24,
                                xs: 24,
                              }
                              ">
                            <vue-tel-input v-model="resetForm.phone_no" mode="auto" :autoFormat="false"   @blur="resetForm.phone_no = Number(resetForm.phone_no).toString()"
                              :validCharactersOnly="true" :placeholder="$t('placeholders.plh12')" v-if="showPhoneNo"
                              :dropdownOptions="{ showFlags: true, showDialCodeInList: true, showSearchBox: true, showDialCodeInSelection: true }"></vue-tel-input>
                          </a-form-model-item>
                        </a-tab-pane>

                      </a-tabs>

                      <!--EMAIL COLUMN-->
                      <!-- <a-form-model-item has-feedback label="Email/Phone" prop="accountname" :colon="false" :wrapper-col="{
                        xl: 24,
                        lg: 24,
                        md: 24,
                        sm: 24,
                        xs: 24,
                      }">
                        <a-input v-if="email" v-model="resetForm.accountname" autoFocus
                          placeholder="Enter your email or phone" @keyup.enter="toStep1" />
                        <vue-tel-input v-else v-model="resetForm.accountname" mode="auto" :autoFormat="false"
                          :defaultCountry="parseInt(userdata.countrycode)"
                          :dropdownOptions="{ showFlags: true, showDialCodeInList: true, showSearchBox: true, showDialCodeInSelection: true, autofocus: !email }"></vue-tel-input>
                      </a-form-model-item> -->
                    </a-col>
                    <a-row v-else-if="state.resetState == 2" :gutter="8">
                      <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="18">
                        <a-form-model-item v-if="!email" has-feedback :label="$t('labels.lbl11')" prop="smsverifycode"
                          :colon="false" :wrapper-col="{
                              xl: 24,
                              lg: 24,
                              md: 24,
                              sm: 24,
                              xs: 24,
                            }
                            ">
                          <a-input v-model="resetForm.smsverifycode" :disabled="getCodeClicked ? false : true"
                          :placeholder="$t('placeholders.plh13')" />
                        </a-form-model-item>
                        <a-form-model-item v-else has-feedback :label="$t('labels.lbl5')" prop="emailverifycode"
                          :colon="false" :wrapper-col="{
                              xl: 24,
                              lg: 24,
                              md: 24,
                              sm: 24,
                              xs: 24,
                            }
                            ">
                          <a-input type="number" v-model="resetForm.emailverifycode"
                            :disabled="getCodeClicked ? false : true"
                            :placeholder="$t('placeholders.plh14')" />
                        </a-form-model-item>
                      </a-col>
                      <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="6" class="pt-4 mt-4">
                        <a-button v-if="!email" class="primary-btn  reset-primary-btn fw-5"
                          :disabled="state['phone'].sendDelayState ? true : false" block @click="getCode('phone')">{{
                            state.phone.sendDelay
                          }}</a-button>
                        <a-button v-else class="primary-btn reset-primary-btn fw-5" :disabled="state['email'].sendDelayState ? true : false"
                          block @click="getCode('email')">{{ state.email.sendDelay
                          }}</a-button>
                      </a-col>
                    </a-row>
                    <a-row v-else-if="state.resetState == 3">
                      <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">

                        <a-form-model-item has-feedback :label="$t('labels.lbl12')" prop="password" :colon="false"
                          :wrapper-col="{
                              xl: 24,
                              lg: 24,
                              md: 24,
                              sm: 24,
                              xs: 24,
                            }
                            ">
                          <a-input-password v-model="resetForm.password" :placeholder="$t('placeholders.plh7')" />
                        </a-form-model-item>
                      </a-col>
                      <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">

                        <a-form-model-item has-feedback :label="$t('labels.lbl13')" prop="passwordagain"
                          :colon="false" :wrapper-col="{
                              xl: 24,
                              lg: 24,
                              md: 24,
                              sm: 24,
                              xs: 24,
                            }
                            ">
                          <a-input-password v-model="resetForm.passwordagain"
                          :placeholder="$t('placeholders.plh15')" />
                        </a-form-model-item>
                      </a-col>
                    </a-row>
                  </a-row>
                  <a-row>
                    <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" align="center">
                      <!-- BUTTON COLUMN-->
                      <!-- numberFieldFilled -->
                      <a-button class="mt-2 mb-2 primary-btn fw-5" block
                        v-bind:class="!numberFieldFilled ? 'disabled-btn' : ''"
                        :disabled="!numberFieldFilled ? true : false" :loading="state.stepState" @click="toStep2()"
                        v-if="state.resetState == 2">
                        {{$t('postadd.pna17')}}
                      </a-button>

                      <a-button v-else class="mt-2 mb-2 primary-btn fw-5" block :loading="state.stepState"
                        @click="state.resetState == 1 ? toStep1() : toStep3()">
                        {{ state.resetState == 3 ? this.$t('formMenu.confirm') : this.$t('footer.fm7') }}
                      </a-button>
                      <!-- END BUTTON COLUMN-->

                      <p class="back-login pt-3">
                        <nuxt-link to="/login">
                          <img src="/images/left-arrow.svg" class="mr-2" />{{$t('btntxt.bt12')}}
                        </nuxt-link>
                      </p>

                    </a-col>
                  </a-row>
                </a-form-model>
              </a-col>
            </a-row>
          </a-col>
          <a-col :lg="12" class="reset-right">
            <a-row class="reset-box">
              <a-col :lg="24" align="end" class="p-5"><img src="/images/reset.png" width="100%"/>
              </a-col>
            </a-row>
          </a-col>
        </a-row>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import Captcha from '@/plugins/captcha'
import crypto from "@/plugins/axios/crypto";
export default {
  name:'Reset',
  data() {
    return {
      tab: "email",
      userdata: {
        countrycode: ''
      },
      timer: null,
      state: {
        phone: {
          sendDelayState: false,
          state: false,
          sendDelay: this.$t("formMenu.getCode")
        },
        email: {
          sendDelayState: false,
          state: false,
          sendDelay: this.$t("formMenu.getCode")
        },
        sendEmail: false,
        stepState: false,
        resetState: 1,
        codeState: false
      },
      reg: {
        single: /^((?=.*[a-z])|(?=.*[A-Z])|(?=.*[0-9]))(?=.{8,})/g,
        middle: /^(((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[A-Z])))(?=.{8,})/g,
        strong: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*`~()_=/])(?=.{8,})/g
      },
      resetForm: {
        accountname: '',
        email: '',
        phone_no: '',
        password: '',
        passwordstrength: 0,
        passwordagain: '',
        smsverifycode: '',
        emailverifycode: '',
        countryid: '',
      },
      step1Data: {},
      step2Data: {},
      step3Data: {},
      step1: {
        accountname: ''
      },
      step2: {
        accountname: '',
        smsverifycode: '',
        emailverifycode: ''
      },
      step3: {
        accountname: '',
        password: '',
        passwordstrength: 0,
        passwordagain: ''
      },
      sendModel: {
        template: 'ResetPwd'
      },
      showEmail: true,
      showPhoneNo: false,
      getCodeClicked: false,
      numberFieldFilled: false,
      rules: {
        email: [
          { required: true, message: this.$t('messages.msg1'), },
          {
            type: 'email', message: this.$t('messages.msg2')
          }, 
        ],
        phone_no: [
          { required: true, message: this.$t('messages.msg11') },
        ],
        smsverifycode: [
          { required: true, message: this.$t('messages.msg14') }
        ],
        emailverifycode: [
          { required: true, message: this.$t('messages.msg15') }
        ],
        password: [
          { required: true, message: this.$t('messages.msg12') },
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
            message: this.$t('messages.msg9'),
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
                callback(new Error(this.$t('messages.msg9')))
              } else if (value !== this.resetForm.password) {
                callback(new Error(this.$t('messages.msg10')))
              } else {
                callback()
              }
            },
            trigger: 'change',
            message: this.$t('messages.msg10')
          }
        ]
      }
    }
  },
  watch: {
    '$store.state.hex_lang.locale': function (val) {
      const a = this.$i18n.t('formMenu.getCode')
      this.state.phone.sendDelay = a
      this.state.email.sendDelay = a
    },
    'resetForm.password': function (val) {
      const _step3Model = this.resetForm
      if (this.reg.strong.test(val)) {
        _step3Model.passwordstrength = 3
      } else if (this.reg.middle.test(val)) {
        _step3Model.passwordstrength = 2
      } else if (this.reg.single.test(val)) {
        _step3Model.passwordstrength = 1
      } else {
        _step3Model.passwordstrength = 0
      }
    },
    'resetForm.countryid': function (val) {
      this.country = this.countryOptions.find((item) => {
        if (!this.$userinfo.isphoneauthed) {
          this.auth.telNumber = '';
        }
        return item.countryid == val
      })
    },
    'resetForm.emailverifycode': function (val) {
      val = val ? val.trim() : ''
      if (val && val.length == 6) {
        this.numberFieldFilled = true
        this.toStep2()
      } else {
        this.numberFieldFilled = false
      }
    },
    'resetForm.smsverifycode': function (val) {
      val = val ? val.trim() : ''
      if (val && val.length == 6) {
        this.numberFieldFilled = true
        this.toStep2()
      } else {
        this.numberFieldFilled = false
      }
    }
  },
  computed: {
    model() {
      return this.state.resetState == 1 ? this.step1 : this.state.resetState == 2 ? this.step2 : this.step3
    },
    email() {
      if (this.showPhoneNo) {
        return false
      }
      else {
        return true
      }
    },
  },
  methods: {
    async toStep1() {
      const _self = this
      await _self.$refs['resetForm'].validateField(['email', 'phone_no'], (errorMessage) => {
        if (!errorMessage) {
          if (_self.state.stepState) return
          _self.state.stepState = true
          const fieldValue = this.resetForm.email ? this.resetForm.email : this.resetForm.phone_no
          _self.$store.dispatch('user_user_reset_pwd_step1', {
            accountname: fieldValue
          })
            .then(({ data }) => {
              if (data) {
                this.userdata = data;
                _self.state.resetState = 2
              }
            })
            .then(() => {
              _self.state.stepState = false
            })
        }
      })
    },

    async toStep2() {
      const _self = this
      let postData = {}
      if (_self.state.stepState) return
      await _self.$refs['resetForm'].validateField(!this.email ? 'smsverifycode' : 'emailverifycode', (errorMessage) => {
        if (!errorMessage) {
          this.state.stepState = true
          if (!this.email) {
            Object.assign(postData, {
              ticket: this.sendModel.ticket,
              captchaid: Captcha.appId,
              randstr: this.sendModel.randstr,
            })
          }
          postData.smsverifycode = this.resetForm.smsverifycode;
          postData.emailverifycode = this.resetForm.emailverifycode;
          postData.accountname = this.resetForm.email ? this.resetForm.email : this.resetForm.phone_no;
          this.$store.dispatch('user_user_reset_pwd_step2', postData)
            .then(({ data }) => {
              if (data) {
                this.state.resetState = 3
              }
            })
            .then(() => {
              this.state.stepState = false
            })
        }
      })

    },
    async toStep3() {
      const _self = this
      if (_self.state.stepState) return
      await _self.$refs['resetForm'].validate((valid) => {
        if (valid) {
          this.state.stepState = true
          const _step3Model = {}
          _step3Model.accountname = this.resetForm.email ? this.resetForm.email : this.resetForm.phone_no;
          _step3Model.emailVerifyCode = this.resetForm.email ? this.resetForm.emailverifycode : '';
          _step3Model.smsVerifyCode = this.resetForm.phone_no ? this.resetForm.smsverifycode : '';
          _step3Model.password = crypto.md5String(this.resetForm.password)
          _step3Model.passwordstrength = this.resetForm.passwordstrength;

          
          this.$store.dispatch('user_user_reset_pwd_step3', _step3Model)
            .then((res) => {
              if (res.data) {
                this.step3Data = res.data
                this.$store.commit('set_message', { type: 'ok', text: res.msg })
                this.$router.push('/login')
                this.$store.commit('remove_user_info');
              }
            })
            .then(() => {
              this.state.stepState = false
            })
        }
      })

    },
    getCode(type) {
      const _self = this
      let _sendState = _self.state[type]
     



      if (_sendState.sendDelayState) return
      _sendState.state = true

      let post, _send = this.sendModel
      if (type == 'email') {
        post = 'com_email_verifycode_send'
        _send.email = _self.resetForm.email
      } else {
        post = 'com_sms_verifycode_send'
        _send.phone = _self.resetForm.phone_no
        _send.areacode = _self.userdata.countrycode
      }

      this.getCaptch(type)
        .then((res) => {

         
          const currentState = _self.state[type]

          if (res && res.ret == 0) {
            _send.randstr = res.randstr
            _send.ticket = res.ticket
            _self.$store.dispatch(post, _send)
              .then(({ data, msg }) => {
                if (data) { 
                  this.delaySend(type, data)
                } else {
                  currentState.sendDelayState = false
                  currentState.state = false
                  this.$store.commit('set_message', { type: 'error', text: msg });
                }
              })
          } else if (res && res.ret == 2) {
            _sendState.state = false
          } else {
            _self.$store.dispatch(post, _send)
              .then(({ data, msg }) => {
                if (data) { 
                  this.getCodeClicked = true
                  this.delaySend(type, data)
                } else { 
                  currentState.sendDelayState = false
                  currentState.state = false
                  this.$store.commit('set_message', { type: 'error', text: msg });
                }
              })
          }
        })

    },
    getCaptch(type) {
      if (type == 'phone') {
        this.getCodeClicked = true //to enable input field
        return Captcha.init()
      } else {
        return new Promise((resolve) => {
          resolve(null)
        })
      }
    },
    switchEmailPhoneFields(tab) { 
      this.tab = tab

      this.resetForm.email = ''
      this.resetForm.phone_no = ''
      if (tab == 'email') {
        this.showEmail = true
        this.showPhoneNo = false
      } else {
        this.showEmail = false
        this.showPhoneNo = true
      }
    },

    delaySend(type, data) {
      let _self = this
      let _m = _self.state[type]
      return new Promise(function (resolve) {
        if (!(data && data.succeed)) {
          resolve(true)
          return
        }
        let number = 119
        _m.state = false
        _m.sendDelayState = true
        _m.sendDelay = number + 's'
        _self.timer = setInterval(() => {
          --number
          _m.sendDelay = number + 's' 
          if (number <= 0) {
            _m.sendDelayState = false
            _m.sendDelay = _self.$t("formMenu.getCode")
            clearInterval(_self.timer)
            resolve(true)
          }
        }, 1000)
      })
    },

    clearTime() {
      // sdfsd
      const _self = this;
      clearInterval(this.timer);
      _self.send = false;
      _self.sendDelay = _self.$t("formMenu.getCode");
      _self.timer = null;
    },

  }
}
</script>

<style lang="scss">
@import '@/assets/scss/pages/auth/reset.scss';
</style>
