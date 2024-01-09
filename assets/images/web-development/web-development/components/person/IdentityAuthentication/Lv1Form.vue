<template>
  <div class="identity">
    <a-card class="user-identity-card" :bordered="false">
      <a-row :gutter="16" class="col-alignment">
        <a-col :lg="24">
          <p class="mb-0 identity-heading fw-5"><img src="/images/arrow-left.svg" class="mr-3 pointer"
              @click="goback" />{{ $t('person.ph9') }}</p>
        </a-col>
      </a-row>
    </a-card>
    <a-card :bordered="false" class="mt-3 form-card">
      <div class="authentication-form" v-if="!loading">
        <a-form-model ref="authenticationLv1Form" :model="auth" :hide-required-mark="true" label-align="left"
          :rules="rules">
          <a-row :gutter="24" class="mx-5">
            <a-col :lg="10" :offset="7">
              <a-row type="flex">
                <a-col :lg="24" :order="$userinfo.isemailauthed ? 1 : 3">
                  <a-form-model-item has-feedback :label="$t('labels.lbl32')" prop="emailAddress" :colon="false"
                    :wrapper-col="{
                      xl: 24,
                      lg: 24,
                      md: 24,
                      sm: 24,
                      xs: 24,
                    }">
                    <a-input :placeholder="$t('placeholders.plh33')" :readOnly="$userinfo.isemailauthed"
                      v-model="auth.emailAddress" />
                  </a-form-model-item>
                </a-col>
                <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" :order="$userinfo.isemailauthed ? 2 : 4">
                  <a-row :gutter="10">
                    <a-col :lg="16">
                      <a-form-model-item has-feedback :label="$t('labels.lbl33')" prop="emailverifycode" :order="2"
                        :colon="false" :wrapper-col="{
                          xl: 24,
                          lg: 24,
                          md: 24,
                          sm: 24,
                          xs: 24,
                        }"><a-input v-model="auth.emailverifycode" :placeholder="$t('placeholders.plh34')" />
                      </a-form-model-item>
                    </a-col>
                    <a-col :lg="8" class="code-p2pbtn-space">
                      <verifycode :email="auth.emailAddress ? auth.emailAddress : '0'"
                        :isexist="$userinfo.isemailauthed ? false : true" />
                    </a-col>
                  </a-row>
                </a-col>
                <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" :order="$userinfo.isphoneauthed ? 1 : 3">
                  <a-form-model-item has-feedback label="Phone No." prop="telNumber" :order="1" :colon="false"
                    :wrapper-col="{
                      xl: 24,
                      lg: 24,
                      md: 24,
                      sm: 24,
                      xs: 24,
                    }">
                    <vue-tel-input v-model="auth.telNumber" @blur="auth.telNumber=Number(auth.telNumber).toString()" :disabled="$userinfo.isphoneauthed" mode="auto"
                      v-on:country-changed="countryChanged" :validCharactersOnly="true" :autoFormat="false"
                      :defaultCountry="parseInt(country.areacode)"  
                      :dropdownOptions="{ showFlags: true, showDialCodeInList: true, showSearchBox: true, showDialCodeInSelection: true, }"></vue-tel-input>
                  </a-form-model-item>
                </a-col>
                <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" :order="$userinfo.isphoneauthed ? 2 : 4">
                  <a-row :gutter="10">
                    <a-col :lg="16">
                      <a-form-model-item has-feedback :label="$t('labels.lbl35')" prop="phoneverifycode" :order="2"
                        :colon="false" :wrapper-col="{
                          xl: 24,
                          lg: 24,
                          md: 24,
                          sm: 24,
                          xs: 24,
                        }"><a-input v-model="auth.phoneverifycode" :placeholder="$t('placeholders.plh35')" />
                      </a-form-model-item>
                    </a-col>
                    <a-col :lg="8" class="code-p2pbtn-space">
                      <verifycode :phone="auth.telNumber ? auth.telNumber : '0'" :nation="true" :country="country"
                        ref="names" :isexist="$userinfo.isphoneauthed ? false : true"></verifycode>
                    </a-col>
                  </a-row>
                </a-col>
                <a-col :lg="24" class="mt-2" :order="5">
                  <!-- v-if="!$userinfo.isemailauthed||!$userinfo.isphoneauthed" -->
                  <a-button class="get-code-btn primary-btn fw-5" block :loading="submitState" @click="submits">{{
                    $t('person.pd19') }}</a-button>
                </a-col>
              </a-row>
            </a-col>
          </a-row>
        </a-form-model>
      </div>
    </a-card>
  </div>
</template>

<script>
import verifycode from "@/components/public/verifycode.vue";
export default {
  components: {
    verifycode
  },
  computed: {
    Account() {
      return this.$userinfo.isemailauthed ? this.$t('person.pd15') : this.$t('person.pd14');
    }
  },
  data() {
    return {
      loading: true,
      submitState: false,
      lang: this.$store.state.hex_lang.locale,
      state: 0,
      isphone: true,
      countryOptions: [],
      country: {},
      auth: {
        emailAddress: '',
        emailverifycode: '',
        countryid: "",
        telNumber: '',
        phoneverifycode: ''
      },
      rules: {
        emailAddress: [
          { required: true, message: this.$t('messages.msg1') }
        ],
        emailverifycode: [
          { required: true, message: this.$t('messages.msg15') },
        ],
        phoneverifycode: [
          { required: true, message: this.$t('messages.msg52') },
        ],
        telNumber: [
          { required: true, message: this.$t('messages.msg11') },
        ],
      },

    }
  },
  watch: {
    '$store.state.hex_lang.locale': function (val) {
      this.countryOptions.map((item) => {
        if (val == 'zh_cn' || this.lang == 'zh_hk') {
          item.name = item.name;
        } else {
          item.name = item.engname;
        }
      });
    },
    'auth.countryid': function (val) {
      this.country = this.countryOptions.find((item) => {
        if (!this.$userinfo.isphoneauthed) {
          this.auth.telNumber = '';
        }
        return item.countryid == val
      })
    }
  },
  mounted() {
    if (this.$userinfo.isemailauthed) {
      this.auth.emailAddress = this.$userinfo.email;
    }
    if (this.$userinfo.isphoneauthed) {
      this.auth.telNumber = this.$userinfo.phone;
      this.auth.countryid = this.$userinfo.countryid;
    }
    const _this = this;
    this.$store.dispatch('com_country_getlist').then(({ data }) => {
      this.countryOptions = data;
      // console.log('this.countryOptions', this.countryOptions);
      this.countryOptions.map((item) => {
        if (this.lang == 'zh_cn' || this.lang == 'zh_hk') {
          item.name = item.name;
        } else {
          item.name = item.engname;
        }
      });
      _this.getcoutrycode();
    })
  },
  methods: {
    exist(val) {
      this.isphone = val;
    },
    goback() {
      this.$router.go(-1);
    },
    getcoutrycode() {
      var _self = this;
      this.$store.dispatch("com_getlangbyip").then(({ data }) => {
        if (data && data.countrycode) {
          var coutryinfos = _self.countryOptions.filter(item => {
            return item.areacode == data.countrycode
          });
          if (coutryinfos.length > 0) {
            _self.auth.countryid = coutryinfos[0].countryid;
            _self.country = _self.countryOptions.find((item) => {
              if (!this.$userinfo.isphoneauthed) {
                _self.auth.telNumber = '';
              }
              return item.countryid == _self.auth.countryid
            })
          }
        }
        _self.loading = false;
      });
    },
    countryChanged(event) {
      // console.log('event:::', event);
      const areacode = event.dialCode
      const country = this.countryOptions.find((item) => {
        return item.areacode == areacode
      })
      //  console.log('country:::', country)
      this.country = {}
      if (country) {
        this.country = country
      }
    },
    submits() {
 this.$refs['authenticationLv1Form'].validate(async (valid) => {
  if (valid) {
    let postData = {};
      const _this = this;
      const _user = this.$userinfo;
      if (_this.submitState) return;
      if (_user.isemailauthed) { //已绑定邮箱
        postData = {
          authtype: 'AuthPhone',
          countryid: _this.auth.countryid,
          countrycode: _this.country.areacode,
          account: _this.auth.telNumber,
          emailverifycode: _this.auth.emailverifycode,
          smsverifycode: _this.auth.phoneverifycode
        }

      } else if (_user.isphoneauthed) {//已绑定手机
        postData = {
          authtype: 'AuthEmail',
          account: this.auth.emailAddress,
          emailverifycode: this.auth.emailverifycode,
          smsverifycode: this.auth.phoneverifycode
        }
      }
      _this.submitState = true;
      this.$store.dispatch("user_user_auth", postData).then((res) => {
        _this.submitState = false;
        _this.loading = false;
        if (res.data) {
          _this.$emit('getUserInfo');
          _this.$store.commit('set_message', { type: 'ok', text: res.msg });

        }
        if(res.code==200) 
        location.href = '/person/authentication'
      })
  }
})
      




    },
  }
}
</script>

<style></style>
