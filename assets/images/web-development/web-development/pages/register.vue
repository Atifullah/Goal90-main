<template>
  <div id="register">
    <a-card :bordered="false" class="register-bg-card">
      <div class="main-content">
        <div class="register">
          <a-row class="pb-5">
            <a-col :lg="{span:22,offset:1}" :xl="{span:18,offset:3}" class="pb-4">
              <a-row class="register-details">
                <a-col :lg="12" class="register-left py-5">
                  <a-row :gutter="16" class="px-5 register-row">
                    <a-col :lg="24">
                      <p class="log-bitnasdaq fw-5">{{ $t("last.la17") }}</p>
                      <a-tabs default-active-key="email" v-model="state.tab">
                        <a-tab-pane key="email">
                          <span slot="tab">
                            <img
                              :src="
                                state.tab == 'email'
                                  ? '/images/email-icon-active.svg'
                                  : '/images/email-icon.svg'
                              "
                              class="mr-1"
                            />
                            {{ $t("last.la9") }}
                            <p
                              v-show="state.tab == 'email'"
                              class="bottom-line"
                            ></p>
                          </span>
                          <Email ref="email" @register:sendCode="getCode" />
                        </a-tab-pane>
                        <a-tab-pane key="phone">
                          <span slot="tab">
                            <img
                              :src="
                                state.tab == 'phone'
                                  ? '/images/phone-icon-active.svg'
                                  : '/images/phone-icon.svg'
                              "
                              class="mr-1"
                            />
                            {{ $t("last.la12") }}
                            <p
                              v-show="state.tab == 'phone'"
                              class="bottom-line"
                            ></p>
                          </span>
                          <Phone ref="phone" @register:sendCode="getCode" />
                        </a-tab-pane>
                      </a-tabs>
                      <a-divider>Or</a-divider>
                      <a-row :gutter="16">
                        <a-col :lg="12">
                          <a-button @click="googleLogin" class="cancel-outline-btn fw-5" block><img
                              src="/images/google-logo.svg" class="pr-2" />
                            {{ $t('last.la13') }}</a-button>
                        </a-col>
                        <a-col :lg="12">
                          <a-button @click="appleLogin" class="cancel-outline-btn fw-5" block><img
                              src="/images/apple.svg" class="pr-2" />{{ $t('last.la14') }}</a-button>
                        </a-col>
                      </a-row>
                              <!-- END BUTTON COLUMN-->
        <p class="mt-4 already-account text-center fw-3 mb-0">
          {{ $t("authentication.auth4") }}
          <nuxt-link to="/login" class="ml-1"
            >{{ $t("authentication.auth5") }}
          </nuxt-link>
        </p>
                    </a-col>
                  </a-row>
                </a-col>
                <a-col :lg="12" class="register-right">
                  <a-row class="right-box">
                    <a-col :lg="16" class="pt-5 mt-4" :offset="4">
                      <!-- <img src="/images/register-bg1.png" /> -->
                      <p class="bnq-txt fw-7 mb-3">{{ $t("bscard.bsc51") }}</p>
                      <p class="bnq-desc fw-5">
                        {{ $t("bscard.bsc52") }}
                        <span class="rebate-txt">
                          {{ $t("bscard.bsc53") }}</span
                        >
                      </p>
                    </a-col>
                  </a-row>
                </a-col>
              </a-row>
            </a-col>
          </a-row>
        </div>
      </div>
    </a-card>
  </div>
</template>
<script>
import Email from "@/components/auth/email";
import Phone from "@/components/auth/phone";
import Captcha from "@/plugins/captcha";
// import LottieAnimation from "lottie-vuejs/src/LottieAnimation.vue";
export default {
  name: "Home",
  middleware: ["guest"],
  components: {
    Email,
    Phone,
    // LottieAnimation,
  },
  data() {
    return {
      state: {
        tab: "email",
      },        
      signModel: {
        username: '',
        password: '',
        verifycode: '',
        rememberme: true,
      },
      loginWith: 'email',
      thirdPartyLoginLoading: false,
      verifyModel: null,
    };
  },
  methods: {
    appleLogin() {
      var randstr = this.uuid();
      const options = {
        response_type: 'code', // 固定内容
        response_mode: 'form_post',
        state: randstr, // 随机字符串，此处仅做演示
        client_id: 'bitnasdaq.com.development',
        redirect_uri:`${this.$baseUrl}/comapi/v1.0/com/apple.login`,
        scope: 'openid name email'
      }
      const url = new URL('https://appleid.apple.com/auth/authorize')
      const keys = Object.keys(options)
      keys.forEach(key => {
        url.searchParams.append(key, options[key])
      })
      var bl = false;
      const _self = this;
      const appleloginurl = url.toString();
      var iTop = (window.screen.height - 700) / 2;       //获得窗口的垂直位置;
      var iLeft = (window.screen.width - 1024) / 2;        //获得窗口的水平位置;
      var openWin = window.open(appleloginurl, "newWindow", "width=1024,height=700,top=" + iTop + ", left=" + iLeft + ",titlebar=no, menubar=no,scrollbars=yes,resizable=yes,status=yes,toolbar=no,location=yes");
      var winLoop = setInterval(function () {
        if (openWin.closed && !bl) {
          clearInterval(winLoop);
          bl = true;
          _self.loginWith = 'apple'
          _self.thirdPartyLoginLoading = true
          _self.siginByThreadPlant(randstr);
        }
      }, 1000);
    },
    googleLogin() {
      var randstr = this.uuid();
      const options = {
        response_type: 'code', // 固定内容
        state: randstr, // 随机字符串，此处仅做演示
        include_granted_scopes: true,
        access_type: 'offline',
        client_id: '311638269948-vj4vooafhg3581iuen0kgtgaggdglbhu.apps.googleusercontent.com',
        redirect_uri:`${this.$baseUrl}/comapi/v1.0/com/google.login`,
        scope: 'openid profile email'
      }
      const url = new URL('https://accounts.google.com/o/oauth2/auth')
      const keys = Object.keys(options)
      keys.forEach(key => {
        url.searchParams.append(key, options[key])
      })
      const appleloginurl = url.toString();
      var bl = false;
      const _self = this;
      var iTop = (window.screen.height - 700) / 2;       //获得窗口的垂直位置;
      var iLeft = (window.screen.width - 1024) / 2;        //获得窗口的水平位置;
      var openWin = window.open(appleloginurl, "newWindow", "width=1024,height=700,top=" + iTop + ", left=" + iLeft + ",titlebar=no, menubar=no,scrollbars=yes,resizable=yes,status=yes,toolbar=no,location=yes");
      
      var winLoop = setInterval(function () {
        if (openWin.closed && !bl) {
          clearInterval(winLoop);
          bl = true;
          _self.loginWith = 'google'
          _self.thirdPartyLoginLoading = true
           
          _self.siginByThreadPlant(randstr)
        }
      }, 1000);
    },    uuid() {
      const s = [],
        hexDigits = "0123456789abcdefghijklmnopqrstuvwxyz";
      for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
      }
      s[14] = "4";
      s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
      s[8] = s[13] = s[18] = s[23] = "-";
      return s.join("");
    },
    siginByThreadPlant(state) {
      const _self = this;
      console.log(_self.signModel," beroresignModel register")
      const _sign = Object.assign({}, _self.signModel);
      _self.$store.dispatch('user_user_signin', { randstr: state }).then((res) => {
        const data = res.data
        _self.verifyModel = data;
        _self.$store.commit('set_token', {
          'token': data.token,
          'expire': new Date().getTime() + 2 * 3600000
        });
        if (!data) {
          throw data;
        }
        _sign.randstr = state;
        _sign.ticket = "666666";
        _self.$store.commit('auth/setLoginWith', _self.loginWith)
        console.log(_sign,"signModel register")
        return true;
      }).then((data) => {
        if (data) {
          _self.$store.commit('auth/setLoginWith', _self.loginWith)
          const userEmail = _self.verifyModel.email;

          // Dispatch the action to update the 'visitor_user.userInput' state with the user's email
          _self.$store.dispatch('setUserInput', userEmail);
          //console.log("userrrrrremaiiiillll", userEmail);
         console.log(_sign,"signModel register")

          _self.$router.push({
            name: 'auth',
            params: {
              verifyModel: _self.verifyModel,
              signModel: _sign,
              returnurl: _self.returnurl
            }
          })


        }
      }).catch((res) => {
        _self.state.signin = false
        _self.loading = false
        _self.thirdPartyLoginLoading = false
      })
    },


    setRegisterActive(tab) {
      this.state.tab = tab;
    },
    getCode(_self, _tab) {
      const _send = _self.sendModel;
      _self.state.send = true;

      const post =
        _tab == "email"
          ? "com_email_verifycode_send"
          : "com_sms_verifycode_send";

      // Initialize captcha
      Captcha.init()
        .then((res) => {
          if (res && res.ret == 0) {
            _send.randstr = res.randstr;
            _send.ticket = res.ticket;
            _send.captchaid = Captcha.appId;

            this.$store
              .dispatch(post, _send)
              .then(({ data, msg }) => {
                if (data) {
                  this.delaySend(_self, data).then(() => {
                    // Allow showing captcha again when countdown ends
                    _self.state.sendDelayState = false;
                  });
                } else {
                  _tab == "email"
                    ? this.$refs.email.closeloading()
                    : this.$refs.phone.closeloading();
                  this.$store.commit("set_message", {
                    type: "error",
                    text: msg,
                  });
                }
              })
              .catch(() => {
                _self.state.send = false;
              });
          } else if (res && res.ret == 2) {
            _self.state.send = false;
          }
        })
        .catch(() => {
          _self.state.send = false;
        });
    },

    delaySend(_self, data) {
      const _this = this;
      let _m = _self.state;

      // Check if a countdown is already in progress
      if (_m.sendDelayState) {
        return Promise.resolve(false); // Return early if countdown is already running
      }

      return new Promise(function (resolve) {
        if (!(data && data.succeed)) {
          resolve(true);
          return;
        }

        let number = 119;
        _m.send = false;
        _m.sendDelayState = true;
        _m.sendDelay = number + "s";

        const _timer = setInterval(() => {
          --number;
          _m.sendDelay = number + "s";
          if (number === 0) {
            _m.sendDelayState = false;
            _m.sendDelay = _this.$t("formMenu.getCode");
            clearInterval(_timer);
            resolve(true);
          }
        }, 1000);
      });
    },
  },
  mounted() {
    if (/^\d+$/.test(Number(this.$route.params.k))) this.state.tab = "phone";
    const tempdata=this.$store.state.auth.tempData;
    if(tempdata){
      if(tempdata.phone){
        this.state.tab="phone"
      }
      else{
        this.state.tab="email"
      }
    }
  },
};
</script>
<style lang="scss">
@import "@/assets/scss/pages/auth/register.scss";
</style>
