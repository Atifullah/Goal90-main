<template>
  <div class="new-authentication-form" v-if="!loading">
    <a-row :gutter="24" >
      <a-col :lg="12" :xl="8" class="mt-3">
        <a-card
          class="first-lv-card"
          :title="$t('person_auth.primary_KYC_person')"
          :bordered="false"
        >
          <a-row :gutter="16">
            <a-col :lg="12">
              <p class="trading-txt fw-5 mb-0">{{ $t("lv4form.lvf1") }}</p>
              <p class="trading-txt1 fw-5 mb-0">
                $ {{ constantInfo.kyc_lv1?.P2P_Trading.toLocaleString() }} USDT
              </p>
            </a-col>
            <a-col :lg="12">
              <p class="trading-txt fw-5 mb-0">{{ $t("lv4form.lvf2") }}</p>
              <p class="trading-txt1 fw-5 mb-0">
                $ {{ constantInfo.kyc_lv1?.Transfer_Out.toLocaleString() }} USDT
              </p>
            </a-col>
          </a-row>
          <a-row :gutter="16" class="pt-3">
            <a-col :lg="12">
              <p class="trading-txt fw-5 mb-0">{{ $t("lv4form.lvf3") }}</p>
              <p class="trading-txt1 fw-5 mb-0">
                {{ $usersettings?.withdrawlimtperday_1.toLocaleString() }} BTC
              </p>
            </a-col>
          </a-row>
          <a-row :gutter="16" class="pt-4 pb-3">
            <a-col :lg="24">
              <p class="mb-0 trading-txt1 fw-5pl-1">
                <a-divider type="vertical" class="ml-0 mr-0 requirements" />
                {{ $t("lv4form.lvf4") }}
              </p>
            </a-col>
          </a-row>
          <div class="require-icon">
            <a-row :gutter="16">
              <a-col :lg="8" :xl="9">
                <a-row :gutter="16" class="col-alignment">
                  <a-col :lg="6" :xl="5" 
                    ><img src="/images/sms1.svg" 
                  /></a-col>
                  <a-col :lg="18" :xl="19">
                    <p class="email-txt fw-5 mb-0">
                      {{ $t("lv4form.lvf5")
                      }}<img
                        src="/images/ud-info-circle.svg"
                        v-if="!$userinfo.email"
                      />
                    </p>
                  </a-col>
                </a-row>
              </a-col>
              <a-col :lg="8" :xl="9">
                <a-row :gutter="16" class="col-alignment">
                  <a-col :lg="6" :xl="5" class="small-icon"
                    ><img src="/images/ud-call1.svg"
                  /></a-col>
                  <a-col :lg="18" :xl="19">
                    <p class="email-txt fw-5 mb-0">
                      {{ $t("lv4form.lvf6") }}
                      <img
                        src="/images/ud-info-circle.svg"
                        v-if="!$userinfo.phone"
                      />
                    </p>
                  </a-col>
                </a-row>
              </a-col>
            </a-row>
          </div>
          <a-row :gutter="16" class="mt-4 pt-2">
            <a-col :lg="24">
              <a-button class="fw-5"
                :class="
                  authedState > 0
                    ? 'verified-card-btn disabled-btn'
                    : 'primary-btn'
                "
                @click="verifyNow(0)"
                block
              >
                {{ primary }}
                <img
                  v-if="authedState > 0"
                  src="/images/verified-icon1.svg"
                  class="ml-1"
              /></a-button>
            </a-col>
          </a-row>
        </a-card>
      </a-col>
      <!-- KYC LEVEL -->
      <a-col :lg="12" :xl="8" class="mt-3">
        <a-card
          class="first-lv-card"
          :title="$t('person.ph9')"
          :bordered="false"
        >
          <a-row :gutter="16">
            <a-col :lg="12">
              <p class="trading-txt fw-5 mb-0">{{ $t("lv4form.lvf1") }}</p>
              <p class="trading-txt1 fw-5 mb-0">
                $ {{ constantInfo.kyc_lv2?.P2P_Trading.toLocaleString() }} USDT
              </p>
            </a-col>
            <a-col :lg="12">
              <p class="trading-txt fw-5 mb-0">{{ $t("lv4form.lvf2") }}</p>
              <p class="trading-txt1 fw-5 mb-0">
                $ {{ constantInfo.kyc_lv2?.Transfer_Out.toLocaleString() }} USDT
              </p>
            </a-col>
          </a-row>
          <a-row :gutter="16" class="pt-3">
            <a-col :lg="12">
              <p class="trading-txt fw-5 mb-0">{{ $t("lv4form.lvf3") }}</p>
              <p class="trading-txt1 fw-5 mb-0">
                {{
                  $usersettings?.withdrawlimtperday_2 +
                  $usersettings?.withdrawlimtperday_1
                }}
                BTC
              </p>
            </a-col>
            <a-col :lg="12">
              <p class="trading-txt fw-5 mb-0">{{ $t("lv4form.lvf7") }}</p>
              <p class="trading-txt1 fw-5 mb-0">{{ $t("lv4form.lvf8") }}</p>
            </a-col>
          </a-row>
          <a-row :gutter="16" class="pt-4 pb-3">
            <a-col :lg="24">
              <p class="mb-0 trading-txt1 fw-5pl-1">
                <a-divider type="vertical" class="ml-0 mr-0 requirements" />
                {{ $t("lv4form.lvf4") }}
              </p>
            </a-col>
          </a-row>
          <div class="require-icon">
            <a-row :gutter="16">
              <a-col :lg="9" :xl="9">
                <a-row :gutter="16" class="col-alignment">
                  <a-col :lg="5" :xl="5"
                    ><img src="/images/id-num.svg"
                  /></a-col>
                  <a-col :lg="19" :xl="19">
                    <p class="email-txt fw-5 mb-0">{{ $t("lv4form.lvf9") }}</p>
                  </a-col>
                </a-row>
              </a-col>
              <a-col :lg="9" :xl="9">
                <a-row :gutter="16" class="col-alignment">
                  <a-col :lg="5" :xl="5"
                    ><img src="/images/user-octagon.svg"
                  /></a-col>
                  <a-col :lg="19" :xl="19">
                    <p class="email-txt fw-5 mb-0">{{ $t("lv4form.lvf10") }}</p>
                  </a-col>
                </a-row>
              </a-col>
            </a-row>

            <a-row :gutter="16" class="mt-3">
              <a-col :lg="9" :xl="9">
                <a-row :gutter="16" class="col-alignment">
                  <a-col :lg="5" :xl="5"
                    ><img src="/images/global-edit.svg"
                  /></a-col>
                  <a-col :lg="19" :xl="19">
                    <p class="email-txt fw-5 mb-0">{{ $t("lv4form.lvf11") }}</p>
                  </a-col>
                </a-row>
              </a-col>
              <a-col :lg="9" :xl="9">
                <a-row :gutter="16" class="col-alignment">
                  <a-col :lg="5" :xl="5"
                    ><img src="/images/user-i-edit.svg"
                  /></a-col>
                  <a-col :lg="19" :xl="19">
                    <p class="email-txt fw-5 mb-0">{{ $t("lv4form.lvf12") }}</p>
                  </a-col>
                </a-row>
              </a-col>
            </a-row>
            <p class="error-remark fw-5 mb-0 pt-2" v-if="kyc.remark">
              {{ kyc.remark }}
            </p>
          </div>
          <a-row :gutter="16" class="pt-2" :class="!kyc.remark ? 'mt-4' : ''">
            <a-col :lg="24">
              <a-button @click="verifyNow(1)" :class="kyc.class" block
                >{{ kyc.btnText }}
                <img
                  v-if="authedState > 1"
                  src="/images/verified-icon1.svg"
                  class="ml-1"
              /></a-button>
            </a-col>
          </a-row>
        </a-card>
      </a-col>
      <!-- ADVANCED KYC -->
      <a-col :lg="12" :xl="8" class="mt-3">
        <a-card
          class="first-lv-card"
          :title="$t('person.ph10')"
          :bordered="false"
        >
          <a-row :gutter="16">
            <a-col :lg="12">
              <p class="trading-txt fw-5 mb-0">{{ $t("lv4form.lvf1") }}</p>
              <p class="trading-txt1 fw-5 mb-0">
                $ {{ constantInfo.kyc_lv3?.P2P_Trading.toLocaleString() }} USDT
              </p>
            </a-col>
            <a-col :lg="12">
              <p class="trading-txt fw-5 mb-0">{{ $t("lv4form.lvf2") }}</p>
              <p class="trading-txt1 fw-5 mb-0">
                $ {{ constantInfo.kyc_lv3?.Transfer_Out.toLocaleString() }} USDT
              </p>
            </a-col>
          </a-row>
          <a-row :gutter="16" class="pt-3">
            <a-col :lg="12">
              <p class="trading-txt fw-5 mb-0">{{ $t("lv4form.lvf3") }}</p>
              <p class="trading-txt1 fw-5 mb-0">
                {{
                  $usersettings?.withdrawlimtperday_3 +
                  $usersettings?.withdrawlimtperday_2 +
                  $usersettings?.withdrawlimtperday_1
                }}
                BTC
              </p>
            </a-col>
            <a-col :lg="12">
              <p class="trading-txt fw-5 mb-0">{{ $t("lv4form.lvf13") }}</p>
              <p class="trading-txt1 fw-5 mb-0">
                $ {{ constantInfo.kyc_lv3?.Bonuses.toLocaleString() }}
              </p>
            </a-col>
          </a-row>
          <a-row :gutter="16" class="pt-4 pb-3">
            <a-col :lg="24">
              <p class="mb-0 trading-txt1 fw-5pl-1">
                <a-divider type="vertical" class="ml-0 mr-0 requirements" />
                {{ $t("lv4form.lvf4") }}
              </p>
            </a-col>
          </a-row>
          <div class="require-icon">
            <a-row :gutter="16">
              <a-col :lg="14">
                <a-row :gutter="16" class="col-alignment">
                  <a-col :lg="4"
                    ><img src="/images/location.svg"
                  /></a-col>
                  <a-col :lg="20">
                    <p class="email-txt fw-5 mb-0">{{ $t("lv4form.lvf14") }}</p>
                  </a-col>
                </a-row>
              </a-col>
            </a-row>
            <p class="error-remark fw-5 mb-0 pt-2" v-if="advancekyc.remark">
              {{ advancekyc.remark }}
            </p>
          </div>
          <a-row :gutter="16" class="pt-2" :class="!kyc.remark ? 'mt-4' : ''">
            <a-col :lg="24">
              <a-button @click="verifyNow(2)" :class="advancekyc.class" block
                >{{ advancekyc.btnText
                }}<img
                  v-if="authedState > 2"
                  src="/images/verified-icon1.svg"
                  class="ml-1"
              /></a-button>
            </a-col>
          </a-row>
        </a-card>
      </a-col>
    </a-row>
    <a-card class="chat-card mt-3" :bordered="false">
      <a-row :gutter="16" class="col-alignment">
        <a-col :lg="15" :xl="12">
          <p class="mb-2 trading-txt2 fw-5 ">
            {{ $t("person_auth.notice1_auth_person") }}
          </p>
          <p class="mb-0 trading-txt">
            {{ $t("person_auth.notice2_auth_person") }}
          </p>
        </a-col>
        <a-col :lg="9" :xl="12" align="end">
          <a-button
            class="ml-4 outline-btn fw-5 px-4"
            @click="openChatPopover"
            >{{ $t("person_auth.Chat_auth_person") }}</a-button
          ><a-button
            class="ml-3 outline-btn fw-5 px-4"
            @click="sendEmail"
            >{{ $t("person_auth.emailnote_auth_person") }}</a-button
          >
        </a-col>
      </a-row>
    </a-card>
    <a-card class="mt-3" :bordered="false">
      <Faqs :channelid="85" :subtitle="'identity-authentication_faqs'" />
    </a-card>
  </div>
</template>
<script>
import Faqs from "@/components/public/Faqs.vue";
import { mapState, mapMutations } from "vuex";
export default {
  name: "LV4Form",
  props: {
    authedState: {
      type: Number,
    },
  },
  components: {
    Faqs,
  },
  computed: {
    ...mapState({
      showPopover: (state) => state.popoverstate.showPopover,
    }),
    primary() {
      if (this.authedState > 0) {
        return this.$t("btntxt.bt1");
      } else if (this.authedState <= 0 && this.$userinfo.email) {
        return this.$t("btntxt.bt4");
      } else if (this.authedState <= 0 && this.$userinfo.phone) {
        return this.$t("btntxt.bt5");
      }
    },
    kyc() {
      if (this.authedState > 1) {
        return {
          class: "verified-card-btn disabled-btn fw-5",
          btnText: this.$t("btntxt.bt1"),
          remark: false,
        };
      } else if (this.userData?.auditingstate == 2 && this.authedState >= 1) {
        return {
          class: "primary-btn fw-5",
          btnText: this.$t("btntxt.bt2"),
          remark: this.userData.auditingremark,
        };
      } else if (this.userData?.auditingstate == 0 && this.authedState >= 1) {
        return {
          class: "primary-btn fw-5 disabled-btn",
          btnText: this.$t("btntxt.bt3"),
          remark: false,
        };
      } else if (this.authedState >= 0) {
        return {
          class: "primary-btn fw-5",
          btnText: this.$t("btntxt.bt2"),
          remark: false,
        };
      } else if (this.authedState < 1) {
        return {
          class: "primary-btn fw-5 disabled-btn",
          btnText: this.$t("btntxt.bt2"),
          remark: false,
        };
      }
    },
    advancekyc() {
      if (this.authedState > 2) {
        return {
          class: "verified-card-btn disabled-btn fw-5",
          btnText: this.$t("btntxt.bt1"),
        };
      } else if (
        this.userData?.addressauditingstate == 2 &&
        this.authedState >= 1
      ) {
        return {
          class: "primary-btn fw-5",
          btnText: this.$t("btntxt.bt2"),
          remark: this.userData.addressauditingremark,
        };
      } else if (
        this.userData?.addressauditingstate == 0 &&
        this.authedState >= 1
      ) {
        return {
          class: "primary-btn fw-5 disabled-btn",
          btnText: this.$t("btntxt.bt3"),
          remark: false,
        };
      } else if (this.authedState >= 1) {
        return {
          class: "primary-btn fw-5",
          btnText: this.$t("btntxt.bt2"),
          remark: false,
        };
      } else if (this.authedState < 1) {
        return {
          class: "primary-btn fw-5 disabled-btn",
          btnText: this.$t("btntxt.bt2"),
          remark: false,
        };
      }
    },
    // userCountry() {
    //     if (this.userData && this.countryOptions.length > 0) {
    //         const country = this.countryOptions.filter(item => {
    //             if (this.userData.countryid == item.countryid) {
    //                 return item;
    //             }
    //         })[0];

    //     }
    //     return {}
    // }
  },
  data() {
    return {
      successSubmit: false,
      submitFailed: false,
      userData: null,
      // countryOptions: [],
      loading: true,
      constantInfo: {},
    };
  },
  methods: {
    ...mapMutations(["setShowPopover"]),
    openChatPopover() {
      this.setShowPopover(true);
    },
    verifyNow(state) {
      if (this.authedState == state && state == 0) {
        this.$router.push("/person/authentication/LV1");
      } else if (state == 1 && !this.successSubmit) {
        this.$router.push("/person/authentication/LV2");
      } else if (state == 2 && !this.successSubmit) {
        this.$router.push("/person/authentication/LV3");
      } else {
        return;
      }
    },
    async getUserIdAuth() {
      if (this.authedState < 1) {
        return;
      }
      const _self = this;
      _self.$store.dispatch("user_user_idauth_get").then(({ data }) => {
        if (data) {
          this.userData = data;
          //console.log(data);
          // if (data.auditingstate == 0 || data.auditingstate==1) {
          //     _self.successSubmit = true;
          // } else if (data.auditingstate == 2) {
          //     _self.submitFailed = true;

          // }
        }
        _self.loadings = false;
      });
    },
    getConstantsInfo() {
      const _self = this;
      _self.$store
        .dispatch("com_constants_getconstantsinfo", { key: "kyc_config_info" })
        .then(({ data }) => {
          if (data) {
            _self.constantInfo = JSON.parse(data); //required for populating the value of p2p trading and internal transfer
            _self.loading = false;
          }
        });
    },
    sendEmail() {
      if (this.authedState) {
        const emailAddress = "service@bitnasdaq.com";
        const subject = "Regarding Authentication";
        const body =
          "Hello,\n\nI have a question regarding the authentication process.\n\nBest regards,\n[Your Name]";

        const mailtoLink = `mailto:${emailAddress}?subject=${encodeURIComponent(
          subject
        )}&body=${encodeURIComponent(body)}`;

        window.location.href = mailtoLink;
      }
    },
  },
  mounted() {
    this.getUserIdAuth();
    this.$store.dispatch("com_country_getlist").then(({ data }) => {
      this.countryOptions = data;
    });
    this.getConstantsInfo();
  },
};
</script>

<style></style>


  <!-- <template>
      <div class="authentication-form">
          <a-card class="lv3-card" >
              <a-row :gutter="16">
                  <a-col :lg="12">
                      <p class="mb-2 primary-kyc">{{$t('person_auth.primary_KYC_person')}}</p>
                      <p class="mb-0 increase-desc">{{$t('person_auth.Increase_person')}} {{ $usersettings?.withdrawlimtperday_1 }} BTC</p>
                  </a-col>
                  <a-col :lg="12" align="end">
                      <p class="mb-0 red-active">
                          <a-button class="ml-4 px-4" :class="authedState>0?'verify-btn':'outline-btn'" @click="verifyNow(0)"><img src="/images/verify-icon.svg" v-if="authedState>0" class="mr-2"/>{{authedState>0?'Verified':'Verify'}}</a-button></p>
                  </a-col>
              </a-row>
              <a-divider />
              <a-row :gutter="16">
                  <a-col :lg="18">
                      <div class="primary-detail">
                          <div class="detail-box">
                              <p v-if="$userinfo.email" class="mb-0 nationality">{{$t('person_auth.Email_auth_person')}}：<span class="detail-sec-txt">{{ global_string_split($userinfo.email) }}</span> </p>
                              <p v-if="$userinfo.phone" class="mb-0 nationality">{{$t('person_auth.Phone_auth_person')}}：<span class="detail-sec-txt">{{ global_string_split($userinfo.phone) }}</span> </p>
                          </div>

                      </div>
                  </a-col>
              </a-row>
          </a-card>
          <div class="pt-2">
          <a-card class="lv3-card mt-4">
              <a-row :gutter="16">
                  <a-col :lg="12">
                      <p class="mb-2 primary-kyc">KYC</p>
                      <p class="mb-0 increase-desc">{{$t('person_auth.Increase2_person')}} {{ $usersettings?.withdrawlimtperday_2 }} BTC</p>
                  </a-col>
                  <a-col :lg="12" align="end">
                      <p class="mb-0 failed-txt"><span v-if="submitFailed"><img src="/images/info-circle-red.svg" class="mr-2" /> {{$t('person.ph11')}}</span>
                          <a-button  class="ml-2 px-4" :class="authedState>1?'verify-btn':successSubmit?'outline-btn':'outline-btn'" @click="verifyNow(1)"><img src="/images/verify-icon.svg" v-if="authedState>1" class="mr-2" />{{kyc}}</a-button></p>
                  </a-col>
              </a-row>
              <a-divider />
              <a-row :gutter="16">
                  <a-col :lg="18">
                      <div class="primary-detail" v-if="userData">
                          <div class="detail-box">
                              <p class="mb-0 nationality">{{$t('person_auth.Nationality_auth_person')}}：<img :src="userCountry[0]" height="14" width="auto" class="mr-2 mb-1"/><span class="detail-sec-txt">{{ userCountry[1] }}</span> </p>
                          </div>
                          <div class="detail-box">
                              <p class="mb-0 nationality">{{$t('person_auth.Name_auth_person')}}：<span class="detail-sec-txt">{{ userData.realname }}</span> </p>
                          </div>
                          <div class="detail-box">
                              <p class="mb-0 nationality">{{$t('person_auth.Type_auth_person')}}：<span class="detail-sec-txt">{{ userData.idtype==1?'ID Card':userData.idtype==2?'Passport':'Licence' }}</span></p>
                          </div>
                          <div class="detail-box">
                              <p class="mb-0 nationality"> {{$t('person_auth.ID_Number_auth_person')}}：<span class="detail-sec-txt">{{ global_string_split(userData.idnumber)}}</span>
                              </p>
                          </div>
                      </div>
                      <div class="level-list pl-3">
                          <ul class="mt-3">
                              <li>{{$t('person_auth.Pinfo_auth_person')}}</li>
                              <li>{{$t('person_auth.Frecog_auth_person')}}</li>
                          </ul>
                      </div>
                  </a-col>
              </a-row>
          </a-card>
      </div>
      <div class="pt-2">
          <a-card class="lv3-card mt-4">
              <a-row :gutter="16">
                  <a-col :lg="12">
                      <p class="mb-2 primary-kyc">{{$t('person_auth.Advanced_person')}}</p>
                      <p class="mb-0 increase-desc">{{$t('person_auth.Increase2_person')}} {{ $usersettings?.withdrawlimtperday_3 }} BTC</p>
                  </a-col>
                  <a-col :lg="12" align="end">
                      <p class="mb-0 failed-txt"><span v-if="submitFailed"><img src="/images/info-circle-red.svg" class="mr-2" /> {{$t('person.ph11')}}</span>
                          <a-button  class="ml-2 px-4" :class="authedState>2?'verify-btn':successSubmit?'outline-btn':'outline-btn'" @click="verifyNow(2)"><img src="/images/verify-icon.svg" v-if="authedState>2" class="mr-2" />{{advancekyc}}</a-button></p>
                  </a-col>
              </a-row>
              <a-divider />
              <a-row :gutter="16">
                  <a-col :lg="18">
                      <div class="level-list pl-3">
                          <ul class="mt-3">
                              <li>Address Verification</li>
                          </ul>
                      </div>
                  </a-col>
              </a-row>
          </a-card>
      </div>
      <div class="pt-2">

          <a-card class="lv3-card mt-4">
              <a-row :gutter="16" class="col-alignment">
                  <a-col :lg="12">
                      <p class="mb-2 primary-kyc">{{$t('person_auth.notice1_auth_person')}}</p>
                      <p class="mb-0 increase-desc">{{$t('person_auth.notice2_auth_person')}}</p>
                  </a-col>
                  <a-col :lg="12" align="end">
                      <a-button class="ml-4 outline-btn px-4" :disabled="disabled">{{$t('person_auth.Chat_auth_person')}}</a-button><a-button class="ml-3 outline-btn px-4" :disabled="disabled">{{$t('person_auth.emailnote_auth_person')}}</a-button>
                  </a-col>
              </a-row>
          </a-card>
  </div>
      </div>
  </template>

  <script>

  export default {
      props:{
          authedState:{
              type: Number
          }
      },
      computed:{
          kyc(){
              if(this.authedState>1){
                  return 'Verified'
              }
              else if(this.authedState<1){
                  return 'Verify'
              }
              else if(this.submitFailed){
                  return 'Try Again'
              }
              else if(this.successSubmit){
                  return 'Pending Approval'
              }
              else{
                  return 'Verify'
              }
          },
          advancekyc(){
              if(this.authedState>2){
                  return 'Verified'
              }
              else if(this.authedState<2){
                  return 'Verify'
              }
              else if(this.submitFailed){
                  return 'Try Again'
              }
              else if(this.successSubmit){
                  return 'Pending Approval'
              }
              else{
                  return 'Verify'
              }
          },
          disabled(){
              if(this.authedState>1){
                  return false;
              }
              else{
                  return true;
              }
          },
          userCountry(){
              if(this.userData && this.countryOptions.length>0){
                  const country=this.countryOptions.filter(item => {
                      if(this.userData.countryid==item.countryid){
                          return item;
                      }
              })[0];

              }
              return {}
          }
      },
      data(){
          return{
              successSubmit:false,
              submitFailed:false,
              userData:null,
              countryOptions:[],
          }
      },
      methods:{
          verifyNow(state){
              if(this.authedState==state && state==0){
                  this.$router.push('/person/authentication/LV1')
              }
              else if(this.authedState==state && state==1 && !this.successSubmit){
                  this.$router.push('/person/authentication/LV2')
              }
              else if(this.authedState==state && state==2 && !this.successSubmit){
                  this.$router.push('/person/authentication/LV3')
              }
              else{
                  return
              }
          },
          async getUserIdAuth() {
              if(this.authedState<1){
                  return;
              }
              const _self = this;
              _self.$store.dispatch("user_user_idauth_get").then(({ data }) => {
                  if (data) {
                      this.userData=data;
                      if (data.auditingstate == 0) {
                          _self.successSubmit = true;
                      } else if (data.auditingstate == 2) {
                          _self.submitFailed=true;

                      }
                  }
                  _self.loadings = false;
              });
          },
      },
      mounted(){
          this.getUserIdAuth();
          this.$store.dispatch("com_country_getlist").then(({ data }) => {
              this.countryOptions = data;
          });
      }
  }
  </script>
  <style>

  </style> -->
