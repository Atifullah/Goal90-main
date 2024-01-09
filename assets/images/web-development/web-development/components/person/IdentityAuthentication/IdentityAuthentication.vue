<template>
  <div class="identity">
    <a-card class="user-identity-card" :bordered="false">
      <a-row :gutter="16" class="col-alignment">
        <a-col :lg="24">
          <p class="mb-0 identity-heading fw-5">{{ $t('person_auth.id_auth_person') }}</p>
        </a-col>
      </a-row>
    </a-card>

    <Lv4Form v-if="!loading" :authedState="authedState" />

    <AppLoading class="my-2" height="844px" v-else />

  </div>
</template>

<script>
import AppLoading from "~/components/AppLoading.vue";
import Lv4Form from "./Lv4Form"

export default {
  name: 'IdentityAuthentication',
  components: {
    Lv4Form,
    AppLoading
  },
  computed: {


  },
  data() {
    return {
      loading: false,
      googleverifycode: '',
      phone: {
        telNumber: '',
        phoneverifycode: ''
      },
      email: {
        emailAddress: '',
        emailverifycode: ''
      },
      state: 0,
      certificate: '1',
      nationSelected: '0',
      authedState: 0,//认证状态  1：一级认证
      auditState: '',
      getAuthenticationData: [
        {
          title: this.$t("tableskeys.pna9"),
          desc: this.$t('description.des12'),
        },
        {
          title: this.$t("tableskeys.pna10"),
          desc: this.$t('description.des13'),
        },
        {
          title: this.$t("tableskeys.pna11"),
          desc: this.$t('description.des14'),
        },
      ]
    }
  },
  created() {
  },
  mounted() {
    this.loading = true;
    this.getUserInfo();
  },
  methods: {
    openService() {
      _MEIQIA('showPanel');
    },
    getUserInfo() {
      var _self = this;
      this.$store.dispatch("user_getuserinfo").then(({ data }) => {
        if (data) {
          //console.log('DATa::: ', data);
          _self.authedState = data.securitylevel;
          _self.$store.commit('set_server_user_info', data);
          _self.loading = false;
        }
      })
    },
    submits() {
      let postData;
      if (this.$userinfo.isgoogleauthed) {
        const _google = this.$v.googleverifycode;
        _google.$touch();
        if (_google.$invalid) return;
      }
      if (this.$userinfo.isemailauthed) { //已绑定邮箱
        const _phone = this.$v.phone;
        _phone.$touch();
        this.$v.email.emailverifycode.$touch();
        if (_phone.$invalid) return;
        if (this.$v.email.emailverifycode.$invalid) return;
        postData = {
          authtype: 'AuthPhone',
          account: this.phone.telNumber,
          emailverifycode: this.email.emailverifycode,
          smsverifycode: this.phone.phoneverifycode
        }
        if (this.$userinfo.isgoogleauthed) {
          postData.googleverifycode = this.googleverifycode;
        }
      } else if (this.$userinfo.isphoneauthed) {//已绑定手机
        const _email = this.$v.email;
        _email.$touch();
        this.$v.phone.phoneverifycode.$touch();
        if (_email.$invalid) return;
        if (this.$v.phone.phoneverifycode.$invalid) return;
        postData = {
          authtype: 'AuthEmail',
          account: this.email.emailAddress,
          emailverifycode: this.email.emailverifycode,
          smsverifycode: this.phone.phoneverifycode
        }
        if (this.$userinfo.isgoogleauthed) {
          postData.googleverifycode = this.googleverifycode;
        }
      }
      this.$store.dispatch("user_user_auth", postData).then((res) => {
        if (res.data) {
          this.$store.commit('set_message', { type: 'ok', text: res.msg });
          this.$store.commit('set_user_info', res)
        }
      })
    },
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/pages/user-center/identity-authentication.scss';
</style>
