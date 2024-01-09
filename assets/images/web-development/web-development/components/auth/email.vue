<template>
  <a-form-model
    ref="registerForm"
    :model="signModel"
    :rules="setRegisterValidation.rules"
    :hide-required-mark="true"
    label-align="left"
  >
    <a-row>
      <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <!--EMAIL COLUMN-->
        <a-form-model-item
          has-feedback
          :label="$t('person.pd14')"
          prop="email"
          :colon="false"
          :wrapper-col="{
            xl: 24,
            lg: 24,
            md: 24,
            sm: 24,
            xs: 24,
          }"
        >
          <a-input
            v-model="signModel.email"
            :placeholder="$t('placeholders.plh3')"
          />
        </a-form-model-item>
      </a-col>
      <!-- END EMAIL COLUMN-->
      <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <a-row :gutter="10">
          <a-col :lg="17" :xl="17">
            <a-form-model-item
              :label="$t('labels.lbl5')"
              prop="verifycode"
              has-feedback
              :colon="false"
              :wrapper-col="{
                xl: 24,
                lg: 24,
                md: 24,
                sm: 24,
                xs: 24,
              }"
            >
              <a-input
                v-model="signModel.verifycode"
                :placeholder="$t('placeholders.plh6')"
              />
            </a-form-model-item>
          </a-col>

          <a-col :lg="7" :xl="7" class="code-p2pbtn-space">
            <a-button
              class="primary-btn fw-5"
              block
              @click="getCode('registerForm')"
              >{{ state.sendDelay }}</a-button
            >
          </a-col>
        </a-row>
      </a-col>
      <!--PASSWORD COLUMN-->
      <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <a-form-model-item
          :label="$t('labels.lbl6')"
          prop="password"
          has-feedback
          :colon="false"
          :wrapper-col="{
            xl: 24,
            lg: 24,
            md: 24,
            sm: 24,
            xs: 24,
          }"
        >
          <a-input-password
            v-model="signModel.password"
            prop="password"
            :placeholder="$t('placeholders.plh7')"
          />
        </a-form-model-item>
      </a-col>
      <!--END PASSWORD COLUMN-->
      <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <a-form-model-item
          :label="$t('labels.lbl7')"
          prop="passwordagain"
          has-feedback
          :colon="false"
          :wrapper-col="{
            xl: 24,
            lg: 24,
            md: 24,
            sm: 24,
            xs: 24,
          }"
        >
          <a-input-password
            v-model="signModel.passwordagain"
            prop="password"
            :placeholder="$t('placeholders.plh8')"
          />
        </a-form-model-item>
      </a-col>
      <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <a-form-model-item
          :label="$t('labels.lbl8')"
          prop="referee"
          has-feedback
          :colon="false"
          :wrapper-col="{
            xl: 24,
            lg: 24,
            md: 24,
            sm: 24,
            xs: 24,
          }"
        >
          <a-input
            v-model="signModel.referee"
            prop="referee"
            :placeholder="$t('placeholders.plh9')"
          />
        </a-form-model-item>
      </a-col>
      <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
          <a-checkbox v-model="state.check">
            {{ $t("authentication.auth1") }}
          </a-checkbox>
          <a target="_blank" href="/terms/terms-of-service" class="text-black">
            <span class="term-condition fw-5">{{ $t("authentication.auth2") }} </span>
          </a>
      </a-col>
    </a-row>
    <a-row>
      <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" align="center">
        <!-- BUTTON COLUMN-->
        <a-button
          class="mt-4 mb-2 primary-btn fw-5"
          :class="!state.check ? 'disabled-btn' : ''"
          block
          @click="signUp('registerForm')"
          :loading="loading"
          :disabled="loading || !state.check"
        >
          {{ $t("authentication.auth3") }}
        </a-button>

      </a-col>
    </a-row>
  </a-form-model>
</template>
<script>
import crypto from "@/plugins/axios/crypto";
import verifycode from "@/components/public/verifycode.vue";
import terms from "@/components/public/terms-service.vue";

export default {
  name: "AuthEmail",
  components: {
    verifycode,
    terms,
  },
  watch: {
    "$store.state.hex_lang.locale": function (val) {
      this.state.sendDelay = this.$i18n.t("formMenu.getCode");
    },
    "signModel.password": function (val) {
      const _signModel = this.signModel;
      if (this.reg.strong.test(val)) {
        _signModel.passwordstrength = 3;
      } else if (this.reg.middle.test(val)) {
        _signModel.passwordstrength = 2;
      } else if (this.reg.single.test(val)) {
        _signModel.passwordstrength = 1;
      } else {
        _signModel.passwordstrength = 0;
      }
    },
  },

  data() {
    return {
      loading: false,
      isemail: true,
      popupStatue: false,
      state: {
        send: false,
        check: true,
        signup: false,
        sendDelay: this.$i18n.t("formMenu.getCode"),
        sendDelayState: false,
      },
      reg: {
        single: /^((?=.*[a-z])|(?=.*[A-Z])|(?=.*[0-9]))(?=.{8,})/g,
        middle:
          /^(((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[A-Z])))(?=.{8,})/g,
        strong:
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*`~()_=/])(?=.{8,})/g,
      },

      signModel: this.getModel(),

      sendModel: {
        email: "",
        template: "Signup",
      },
      terms_channelid: 20,
      subtitle: "yhxy",
      setRegisterValidation: {
        rules: {
          email: [
            { required: true, message: this.$t("messages.msg1") },
            {
              type: "email",
              message: this.$t("messages.msg2"),
            },
          ],
          verifycode: [{ required: true, message: this.$t("messages.msg7") }],
          password: [
            {
              required: true,
              message: this.$t("messages.msg12"),
              trigger: "blur",
            },
            {
              min: 8,
              max: 20,
              message: this.$t("messages.msg8"),
              trigger: "blur",
            },
          ],
          passwordagain: [
            {
              required: true,
              message: this.$t("messages.msg9"),
              trigger: "change",
            },
            {
              min: 8,
              max: 20,
              message: this.$t("messages.msg8"),
              trigger: "change",
            },
            {
              min: 8,
              max: 20,
              validator: (rule, value, callback) => {
                if (value === "") {
                  callback(new Error(this.$t("messages.msg9")));
                } else if (value !== this.signModel.password) {
                  callback(new Error(this.$t("messages.msg10")));
                } else {
                  callback();
                }
              },
              trigger: "change",
              message: this.$t("messages.msg10"),
            },
          ],
        },
      },
    };
  },

  mounted() {
    // console.log("email", this.enteredEmail);
    if (this.$route.query.invitecode) {
      this.signModel.referee = this.$route.query.invitecode;
    } else if (this.$route.query.ref) {
      this.signModel.referee = this.$route.query.ref;
    } else {
      this.signModel.referee = "";
    }
    if (this.$route.query.email) {
      this.signModel.email = this.$route.query.email;
    }
    // this.signModel.referee = this.$route.query.invitecode ? this.$route.query.invitecode : '';
    // this.signModel.referee = this.$route.query.ref ? this.$route.query.ref : '';
    // this.signModel.email=this.$route.query.email?this.$route.query.email:'';
  },
  methods: {
    closeloading() {
      this.state.send = false;
    },
    getModel() {
      const tempData = this.$store.getters["auth/getTempData"];
      
      return {
        signuptype: "email",
        email: tempData.email || "",
        password: "",
        passwordagain: "",
        verifycode: "",
        passwordstrength: "",
        source: "",
        referee: "",
        usertype: 0,
      };
    },
    popup() {
      this.popupStatue = !this.popupStatue;
    },
    async getCode(formName) {
      const _self = this;
      if (_self.state.send) return;
      this.sendModel.email = this.signModel.email;
      await _self.$refs[formName].validateField("email", (errorMessage) => {
        if (!errorMessage) {
          _self.state.send = true;
          this.$store
            .dispatch("user_user_exist", { email: this.signModel.email })
            .then(({ data }) => {
              if (data) {
                _self.state.send = false;
                _self.$store.commit("set_message", {
                  type: "error",
                  text: this.$t("formMenu.existEmail"),
                });
              } else {
                _self.$emit("register:sendCode", _self, "email");
              }
            });
        }
      });
    },
    async signUp(formName) {
      if (!this.state.check) return;
      const _self = this;
      const _sign = Object.assign({}, _self.signModel);
      if (_self.state.signup) return;
      if (_self.loading) {
        return;
      }
      await this.$refs[formName].validate((valid) => {
        if (valid) {
          _self.loading = true;
          _self.state.signup = true;
          _sign.password = crypto.md5String(_sign.password);
          delete _sign.passwordagain;
          _self.$store
            .dispatch("user_user_signup", _sign)
            .then((res) => {
              if (res.data) {
                _self.$store.commit("set_message", {
                  type: "ok",
                  text: res.msg,
                });
                _self.$store.commit("set_user_info", res);
                location.href = "/person";
              }
              _self.loading = false;
            })
            .then((data) => {
              _self.state.signup = false;
            });
        }
      });
    },
  },
};
</script>

<style ></style>
