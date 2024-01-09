<style lang='less' scoped>
@import "../../static/styles/color";
@import "../../static/styles/person";
@import "../../static/styles/table";
@import "../../static/styles/auth";
img {
  width: unset;
}
.person-block {
  padding: 18px 20px 16px 20px;
}
.person-block .person-block_icon.wallet {
  background: url("../../static/images/exchange_icon.svg");
}
.traded .person-block_info {
  line-height: 36px;
}
.traded_tip {
  font-size: 18px;
  font-weight: bold;
  margin-right: 10px;
}
.traded-block {
  margin-top: 10px;
  background-color: #ffffff;
}
.ordertab {
  padding: 20px;
  padding-left: 23px;
}
.formtab {
  padding: 20px;
  padding-left: 30px;
}
.ordertab h3 {
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 10px;
}
.ordertab h3 img {
  width: 22px;
  vertical-align: middle;
  margin-right: 7px;
}
.label-tip {
  color: #606266;
  font-weight: 500;
  font-size: 14px;
  margin-left: 30px;
}
.red {
  color: red;
}
.pl {
  font-size: 14px;
  color: #666666;
  line-height: 24px;
}
</style>
<template>
  <div class="traded">
    <div class="person-block">
      <span class="person-block_icon wallet"></span>
      <div class="person-block_info clearfix">
        <p class="traded_info_title left">
          <span class="traded_tip">{{$t('legalSet.title')}}</span>
        </p>
      </div>
    </div>
    <div class="traded-block">
      <div class="ordertab" style="border-bottom: 1px solid #f5f5f8;">
        <h3>
          {{$t('legalSet.userLicoTitle')}}
        </h3>
        <span class="label-tip">{{$t('legalSet.exchange')}}</span>
        <span class="label-tip">{{$t('legalSet.otcTrade')}}</span>
        <span class="label-tip">{{$t('legalSet.leveragedTrade')}}</span>
        <span class="label-tip">{{$t('legalSet.contractTrade')}}</span>
      </div>

      <div class="formtab">
        <div class="auth-content_nav">
          <span
            v-if="$userinfo.isemailauthed"
            class="email"
            :class="{'active':tab===1}"
            @click="tab=1"
          >{{$t('formMenu.emailAuthentication')}}</span>
        </div>
        <div class="auth-content_form" v-if="tab===0">
          <div class="auth-content_group auth-content_group_code">
            <p class="title clearfix">
              <span class="left">{{$t('formMenu.noteInputVerification')}}</span>
              <span
                class="normal-tip_error right"
                v-if="addressCode.smsverifycode == ''"
              >{{$t('formMenu.phoneCodeVerificationNone')}}</span>
            </p>
            <div class="auth-content_group_mail">
              <input
                class="input"
                type="text"
                v-model="$v.addressCode.smsverifycode.$model"
                :placeholder="$t('formMenu.phoneInputVerification')"
              />
              <verifycode :phone="$userinfo.phone"></verifycode>
            </div>
          </div>
        </div>
        <div class="auth-content_form" v-if="tab===1">
          <div class="auth-content_group auth-content_group_code">
            <p class="title clearfix">
              <span class="left">{{$t('formMenu.emailCodeVerification')}}</span>
            </p>
            <span class="normal-tip_error right fz12">{{$t("formMenu.emailCodeVerificationNone")}}</span>
            <div class="auth-content_group_mail">
              <input
                class="input"
                type="text"
                v-model="$v.addressCode.emailverifycode.$model"
                :placeholder="$t('formMenu.emialInputVerification')"
              />
              <verifycode :email="$userinfo.email"></verifycode>
            </div>
          </div>
        </div>
        <div
          v-if="openTradePayFee"
          @click="saveSetting()"
          class="auth-content_button button-loading--por"
        >{{$t('legalSet.turnOff')}}</div>
        <div
          v-if="!openTradePayFee"
          @click="saveSetting()"
          class="auth-content_button button-loading--por"
        >{{$t('legalSet.turnOn')}}</div>
        <p class="pl">
          <span class="red">*</span>
          <b>
            {{$t('legalSet.span1')}}
            (<span class="red">{{cvalue}}%</span>)
            {{$t('legalSet.span1-1')}}
          </b>
        </p>



        <p class="pl">
          <span class="red">*</span>
         {{$t('legalSet.span2')}}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import popup from "@/components/security/popup-add-mantion-address";
import verifycode from "@/components/public/verifycode";
export default {
  components: {
    popup,
    verifycode
  },
  validations: {
    addressCode: {
      emailverifycode: {
        required
      },
      smsverifycode: {
        required
      },
      googleverifycode: {
        required
      },
      paypassword: {
        required
      }
    }
  },
  data() {
    return {
      tab: 1,
      addressCode: {
        googleverifycode: "",
        emailverifycode: "",
        smsverifycode: "",
        paypassword: ""
      },
      openTradePayFee: false,
      cvalue: 50
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.$store.dispatch("user_user_settings_get").then(data => {
        if (data) {
          this.openTradePayFee = data.data.opentradepayfee;
        }
      });
      this.$store
        .dispatch("com_constants_getconstantsinfo", {
          uid: this.$userinfo.uid,
          key: "LicoTradeFeeZK"
        })
        .then(data => {
          if (data) {
            this.cvalue = data.data * 100;
          }
        });
    },
    saveSetting() {
      var model = {
        userid: this.$userinfo.uid,
        opentradepayfee: !this.openTradePayFee
      };

      if (this.tab == 0 && this.$v.addressCode.smsverifycode.$model != null) {
        model.smsverifycode = this.$v.addressCode.smsverifycode.$model;
      } else if (
        this.tab == 1 &&
        this.$v.addressCode.emailverifycode.$model != null
      ) {
        model.emailverifycode = this.$v.addressCode.emailverifycode.$model;
      }

      if (this.tab == 1 && this.$v.addressCode.emailverifycode.$model == "") {
        this.$store.commit("set_message", {
          type: "error",
          text: this.$t("formMenu.emailCodeVerificationNone")
        });
        return;
      } else if (
        this.tab == 0 &&
        this.$v.addressCode.smsverifycode.$model == ""
      ) {
        this.$store.commit("set_message", {
          type: "error",
          text: this.$t("formMenu.phoneCodeVerificationNone")
        });
        return;
      }
      this.$store.dispatch("user_user_settings_save", model).then(data => {

        if (data.code == 200) {
          this.$v.addressCode.smsverifycode.$model = ""
          this.$v.addressCode.emailverifycode.$model = ""
          this.$store.commit("set_message", { type: "ok", text: data.msg });
          setTimeout(() => {
            window.location.reload()
          }, 500);
        }

      });
    }
  }
};
</script>

