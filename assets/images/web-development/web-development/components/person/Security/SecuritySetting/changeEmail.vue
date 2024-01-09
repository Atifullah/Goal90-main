<template>
    <div class="google-verification">
      <div class="">
          <a-card class="security-card" :bordered="false">
              <p class="main-heading fw-5 mb-0"><img src="/images/arrow-left.svg" class="mr-2 pointer" @click="goback"/>{{$t("formMenu.bindEmail")}}</p>
          </a-card>
              <a-card :bordered="false"  class="pb-5 security-form mt-3">
                  <a-form-model
                  ref="changeEmail"
                  :hide-required-mark="true"
                  label-align="left"
                  :model="validateEmail"
                  :rules="rules"
                  >
                  <a-row class="pt-5 px-4">
                    <a-col :lg="{span:14,offset:5}" :xl="{span:10,offset:7}">

                        <a-row :gutter="16" class="">
                                <a-col :lg="4">
                                    <img src="/images/email-verification.svg"/>
                                </a-col>
                                <a-col :lg="20">
                                    <p class="transfer-heading fw-5 mb-2">{{$t('person.ps1')}}</p>
                                    <p class="enter-pass mb-0">{{$t('person.ps2')}}</p>
                                </a-col>
                            </a-row>
                            <p class=" notice-txt fw-4 mb-0 pt-4 my-3">{{$t('person.ps3')}}</p>
                  <a-row :gutter="16" class="pt-3">
                    <a-col :lg="24">
                        <a-form-model-item
                          has-feedback
                          :label="$t('person.pd14')"
                          prop="emailAddress"
                          :colon="false"
                          :wrapper-col="{
                          xl: 24,
                          lg: 24,
                          md: 24,
                          sm: 24,
                          xs: 24,
                          }"
                      >
                      <a-input :placeholder="$t('formMenu.emialInputAddress')" v-model="validateEmail.emailAddress"/>
                      </a-form-model-item>
                    </a-col>
                    </a-row>
                    <a-row :gutter="16" class="pt-3">

                      <a-col :lg="16">
                      <a-form-model-item
                          has-feedback
                          :label="$t('labels.lbl5')"
                          prop="emailverifycode"
                          :colon="false"
                          :wrapper-col="{
                          xl: 24,
                          lg: 24,
                          md: 24,
                          sm: 24,
                          xs: 24,
                          }"
                      >
                            <a-input :placeholder="$t('formMenu.emialInputVerification')" v-model="validateEmail.emailverifycode" type="number"/>
                         </a-form-model-item
                      ></a-col>
                      <a-col :lg="8" class="code-p2pbtn-space">
                      <a-form-model-item
                          has-feedback
                          label=""
                          prop=""
                          :colon="false"
                          :wrapper-col="{
                          xl: 24,
                          lg: 24,
                          md: 24,
                          sm: 24,
                          xs: 24,
                          }"
                      >
                          <verifycode :email="validateEmail.emailAddress" ></verifycode>
                         </a-form-model-item
                      ></a-col>
                      </a-row>

                            <!--  -->

                            <a-tabs :defautlActiveKey="activeTab" class="change-mob-tab"  @change="(key)=>{this.activeTab=key}">
                                <a-tab-pane key="1" tab="Google" v-if="$userinfo.isgoogleauthed">
                                  <a-row :gutter="16" class="pt-3">
                                        <a-col :lg="24">
                                          <a-form-model-item
                                            has-feedback
                                            :label="$t('labels.lbl56')"
                                            :prop="activeTab == 1 ? 'googleverifycode' : ''"
                                            :colon="false"
                                            :wrapper-col="{
                                            xl: 24,
                                            lg: 24,
                                            md: 24,
                                            sm: 24,
                                            xs: 24,
                                            }"
                                        >
                                        <a-input v-model="validateEmail.googleverifycode" type="number"
                                        :placeholder="$t('formMenu.googleInputVerification')"/>
                                        </a-form-model-item>
                                        </a-col>
                                        </a-row>
                                </a-tab-pane>
                                <a-tab-pane key="2" tab="Phone" v-if="$userinfo.isphoneauthed">
                                  <a-row :gutter="16" class="pt-3">

                                    <a-col :lg="16">
                                    <a-form-model-item
                                        has-feedback
                                        :label="$t('labels.lbl55')"
                                        :prop="activeTab == 2 ? 'activesmsverifycode' : ''"
                                        :colon="false"
                                        :wrapper-col="{
                                          xl: 24,
                                          lg: 24,
                                          md: 24,
                                          sm: 24,
                                          xs: 24,
                                        }"
                                    >
                                          <a-input :placeholder="$t('formMenu.phoneInputVerification')" v-model="validateEmail.smsverifycode" type="number"/>
                                        </a-form-model-item
                                    ></a-col>
                                    <a-col :lg="8" class="code-p2pbtn-space">
                                    <a-form-model-item
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
                                        <verifycode :phone="$userinfo.phone"></verifycode>
                                        </a-form-model-item
                                    ></a-col>
                                    </a-row>
                                  </a-tab-pane>
                            </a-tabs>



<!--  -->





<!--                       
                      <a-row :gutter="16" class="pt-3">

                      <a-col :lg="16">
                      <a-form-model-item
                          has-feedback
                          :label="$t('labels.lbl55')"
                          prop="smsverifycode"
                          :colon="false"
                          :wrapper-col="{
                          xl: 24,
                          lg: 24,
                          md: 24,
                          sm: 24,
                          xs: 24,
                          }"
                      >
                            <a-input :placeholder="$t('formMenu.phoneInputVerification')" v-model="validateEmail.smsverifycode" type="number"/>
                         </a-form-model-item
                      ></a-col>
                      <a-col :lg="8" class="code-p2pbtn-space">
                      <a-form-model-item
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
                          <verifycode :phone="$userinfo.phone"></verifycode>
                         </a-form-model-item
                      ></a-col>
                      </a-row>
                      <a-row :gutter="16" class="pt-3">

                      <a-col :lg="24">
                        <a-form-model-item
                          has-feedback
                          :label="$t('labels.lbl56')"
                          prop="googleverifycode"
                          :colon="false"
                          :wrapper-col="{
                          xl: 24,
                          lg: 24,
                          md: 24,
                          sm: 24,
                          xs: 24,
                          }"
                      >
                      <a-input v-model="validateEmail.googleverifycode" type="number"
                     :placeholder="$t('formMenu.googleInputVerification')"/>
                      </a-form-model-item>
                    </a-col>
                  </a-row> -->







                  <a-row :gutter="16" class="mt-3">
                      <a-col :lg="24" align="end">
                      <a-button class="primary-btn fw-5 px-4" block @click='openEmail'>{{$t("formMenu.bindding")}}</a-button>
                      </a-col>
                  </a-row>
              </a-col>
                  </a-row>
                  </a-form-model>
              </a-card>
              </div>
    </div>
  </template>

  <script>
  import verifycode from '@/components/public/verifycode'

  export default {
    name: "binding-email-google",
    components: {
      verifycode
    },
    data() {
      return {
        loading:false,
        submitState:false,
        activeTab:1,
        state: {
          isopen: false,
          phone: {
            state: false,
            sendDelay: this.$t("formMenu.getCode")
          },
          email: {
            state: false,
            sendDelay: this.$t("formMenu.getCode")
          },
        },
        validateEmail: {
          emailverifycode: '',
          googleverifycode: '',
          smsverifycode: '',
          emailAddress: ''
        },
        rules: {
          emailAddress:[
            { required: true, message: this.$t('messages.msg39')},
            {
              type: 'email',
              message: this.$t('messages.msg2'),
              trigger:'blur'
            },
          ],
          emailverifycode:[
            { required: true, message: this.$t('messages.msg40') },
          ],
          smsverifycode:[
            { required: true, message: this.$t('messages.msg41') },
          ],
          googleverifycode:[
            { required: true, message: this.$t('messages.msg42') },
          ],
        },
        bindingStatue: '',
        isemail: ""
      };
    },
    mounted() {
      if (this.$userinfo.isgoogleauthed) {
                this.activeTab = 1;
            }
    },
    methods: {
      goback(){
        this.$router.go(-1);
      },
      async openEmail() {
        const _self = this;
        if (_self.state.issopen) return;
        if (_self.submitState) return;
        let postData;
        await this.$refs['changeEmail'].validate((valid) => {
          if (valid) {
            if (!this.$userinfo.isemailauthed) {
              postData = {
                authtype: 'AuthEmail',
                account: this.validateEmail.emailAddress,
                emailverifycode: this.validateEmail.emailverifycode,
                googleverifycode: this.validateEmail.googleverifycode,
                smsverifycode: this.validateEmail.smsverifycode
              }
            } else{
              postData = {
                newEmail: this.validateEmail.emailAddress,
                googleVerifyCode: this.validateEmail.googleverifycode,
                emailVerifyCode: this.validateEmail.emailverifycode,
                smsVerifyCode: this.validateEmail.smsverifycode
              }
            }

            _self.state.isopen = true;
              _self.submitState = true;
              _self.loading=true;
            this.$store.dispatch(!this.$userinfo.isemailauthed?'user_user_auth':'user_reset_email', postData).then((res) => {
              if (res.data) {
                this.global_refresh_user_info();
                this.$store.commit('set_message', {type: 'ok', text: res.msg});
                this.$router.push("/person/security");
              }else{
                _self.submitState = false;
                _self.loading = false;
              }
            });
          }
        })
      }
    }
  };
  </script>


<style lang="scss">
</style>
