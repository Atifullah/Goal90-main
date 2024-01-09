<template>
  <div class="contact-us">
    <div class="contact-header">
      <div class="main-content">
        <a-row>
          <a-col :lg="12" :offset="6">
            <p class="mb-2 contact-heading fw-5 text-center">{{$t('contactus.contact1')}}</p>
            <p class="mb-0 contact-desc fw-4 text-center px-3">
              {{$t('contactus.the_BitNasdaq_support_team_is_available')}}
            </p>
          </a-col>
        </a-row>
      </div>
    </div>
    <div class="white-bg">
      <div class="main-content pt-8">
        <a-row :gutter="16">
          <a-col  :lg="{ span: 14, offset: 5 }"  :xl="{ span: 10, offset: 7 }">
            <p class="main-heading fw-5 mb-2 text-center">{{$t('contactus.contact3')}}</p>
            <p class="mb-0 small-text fw-4 text-center pb-6">
              {{$t('contactus.contact4')}}
            </p>
            <a-form-model
              class="mx-4"
              ref="contactUsForm"
              :model="contactUsForm"
              :rules="rules"
              :hide-required-mark="true"
              label-align="left"
            >
              <a-row :gutter="16">
                <a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                  <a-form-model-item
                    has-feedback
                    :label="$t('api.name')"
                    prop="name"
                    :colon="false"
                  >
                    <a-input v-model="contactUsForm.name" />
                  </a-form-model-item>
                </a-col>
                <a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                  <a-form-model-item
                    has-feedback
                    :label="$t('person.pd14')"
                    prop="email"
                    :colon="false"
                  >
                    <a-input v-model="contactUsForm.email" />
                  </a-form-model-item>
                </a-col>
              </a-row>
              <a-row :gutter="16">
                <a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                  <a-form-model-item
                    has-feedback
                    :label="$t('contactus.contact13')"
                    prop="subject"
                    :colon="false"
                  >
                    <a-input v-model="contactUsForm.subject" />
                  </a-form-model-item>
                </a-col>
              </a-row>
              <a-row :gutter="16">
                <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                  <a-form-model-item
                    has-feedback
                    :label="$t('contactus.contact14')"
                    prop="query"
                    :colon="false"
                  >
                    <a-textarea
                      :rows="4"
                      class="query-box"
                      allow-clear
                      @change="onChange"
                      v-model="contactUsForm.query"
                    />
                  </a-form-model-item>
                  <a-button
                    class="primary-btn fw-5 px-5 mt-2"
                    @click="applyAgentPlan"
                    >{{$t('legalTrad.Submit')}}</a-button
                  >
                </a-col>
              </a-row>
            </a-form-model>
          </a-col>
        </a-row>
      </div>
      <div class="main-content">
        <a-row class="pt-8">
          <a-col :lg="20" :offset="2">
            <a-card class="follow-us-card" :bordered="false">
              <p class="main-heading fw-5 mb-2 text-center">{{$t('contactus.contact12')}}</p>
              <p class="mb-0 small-text fw-4 text-center">
                {{$t('contactus.contact5')}}
              </p>
              <div class="pt-4 mt-2">
                <SocialLinks />
              </div>
            </a-card>
          </a-col>
        </a-row>
        <a-row :gutter="16" class="pt-8 pb-6">
          <a-col :lg="14" :offset="5">
            <p class="main-heading fw-5 mb-2 text-center">{{$t('contactus.contact6')}}</p>
            <p class="mb-4 small-text fw-4 text-center">
              {{$t('contactus.contact7')}}
              <a href="/help-center">{{$t('contactus.contact8')}}</a>. {{$t('contactus.contact9')}}
              <a href="mailto:service@bitnasdaq.com">service@bitnasdaq.com</a>
            </p>
            <a-row :gutter="16" class="pt-2">
              <a-col :lg="14" :offset="5">
                <a-row :gutter="16">
                  <a-col :lg="16">
                    <a-form-model
                      ref="subform"
                      :model="subform"
                      :rules="subformRules"
                      :hide-required-mark="true"
                      label-align="left"
                    >
                      <a-form-model-item has-feedback prop="subemail">
                        <a-input
                          :placeholder="$t('contactus.contact1')"
                          class="subscribe-txt"
                          prop="subemail"
                          :rules="subformRules.subemail"
                          v-model="subform.subemail"
                        />
                      </a-form-model-item>
                    </a-form-model>
                  </a-col>
                  <a-col :lg="8">
                    <a-button class="primary-btn fw-5" block @click="subscribe"
                      >{{$t('contactus.contact11')}}</a-button
                    >
                  </a-col>
                </a-row>
              </a-col>
            </a-row>
          </a-col>
        </a-row>
      </div>
    </div>
    <ApplySuccessModal
      :applySuccessModel="successModel"
      @applySuccessModelClose="successModel = {}"
    />
  </div>
</template>

<script>
import { socialLinks } from "~/plugins/constants";
import SocialLinks from "../App/SocialLinks.vue";
import ApplySuccessModal from "../AgentPlan/ApplySuccessModal.vue";

export default {
  components: {
    SocialLinks,
    ApplySuccessModal,
  },
  data() {
    return {
      contactUsForm: {
        name: "",
        email: "",
        subject: "",
        query: "",
      },
      subform: {
        subemail: "",
      },

      successModel: {},
      rules: {
        name: [{ required: true, message: this.$t("messages.msg71") }],
        email: [
          { required: true, message: this.$t("messages.msg1") },
          {
            type: "email",
            message: this.$t("messages.msg2"),
          },
        ],
        subject: [{ required: true, message: this.$t("messages.msg72") }],
      },
      subformRules: {
        subemail: [
          { required: true, message: this.$t("messages.msg1") },
          {
            type: "email",
            message: this.$t("messages.msg2"),
          },
        ],
      },
    };
  },
  methods: {
    onChange(e) {
      //console.log(e);
    },
    isLoggedIn() {
      const hexServerUserInfo = this.$store.state.hex_server_user_info;
      const email = hexServerUserInfo?.value?.email;
      const userId = hexServerUserInfo?.value?.uid;

      return !!email && !!userId;
    },
    async applyAgentPlan() {
      const _self = this;
      // Get user info from the store
      const hexServerUserInfo = this.$store.state.hex_server_user_info;
      const email = hexServerUserInfo?.value?.email;
      const userId = hexServerUserInfo?.value?.uid;
      if (!email || !userId) {
        // Redirect the user to the login page
        this.$router.push("/login"); // Replace "/login" with your actual login route
        return; // Exit the function
      }
      await this.$refs["contactUsForm"].validate(async (valid) => {
        if (valid) {
          this.loading = true;
          const postData = {
            typeName: "Others",
            content: "Contact-Us Form",
            jsonContent: JSON.stringify(_self.contactUsForm),
          };
          try {
            const data = await this.$store.dispatch(
              "work_order_update",
              postData
            );
            // console.log("dataa", data);
            if (data.code == 200) {
              this.contactUsForm = {
                name: "",
                email: "",
                subject: "",
                query: "",
              };
              this.successModel = {
                ServerMessage: this.$t("messages.msg73"),
              };
            }
            this.loading = false;
          } catch (error) {
            // console.log("Error", error);
            this.loading = false;
          }
        }
      });
    },
    async subscribe() {
      const _self = this;
      const hexServerUserInfo = this.$store.state.hex_server_user_info;
      const email = hexServerUserInfo?.value?.email;
      const userId = hexServerUserInfo?.value?.uid;
      if (!email || !userId) {
        // Redirect the user to the login page
        this.$router.push("/login"); // Replace "/login" with your actual login route
        return; // Exit the function
      }
      await this.$refs["subform"].validate(async (valid) => {
        if (valid) {
          this.loading = true;
          const postData = {
            typeName: "Others",
            content: "subscribe Form",
            jsonContent: JSON.stringify(_self.subform),
          };
          try {
            const data = await this.$store.dispatch(
              "work_order_update",
              postData
            );
            // console.log(data);

            if (data.code == 200) {
              this.subform = {
                subemail: "",
              };
              this.successModel = {
                ServerMessage: this.$t("messages.msg70"),
              };
            }
            this.loading = false;
          } catch (error) {
            // console.log("Error", error);
            this.loading = false;
          }
        }
      });
    },
  },
  computed: {
    socialLinks() {
      return socialLinks;
    },
  },
};
</script>

<style></style>
