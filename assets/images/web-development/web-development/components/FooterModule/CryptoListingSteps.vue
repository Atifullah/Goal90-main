<template>
  <div class="cypto-listing">
    <a-card :bordered="false" class="my-5">
      <a-row :gutter="16">
        <a-col :lg="18" :offset="3">
          <p class="listing-title fw-5 text-center mb-3 mt-5">
            {{ $t("footer.fm3") }}
          </p>
          <a-row class="px-5 mx-5 pt-4">
            <!-- <a-steps :current="getCryptoListingSteps" label-placement="vertical">
                            <a-step v-for="(item,index) in steps" :key="index" :title="item.title" >
                                <span slot="icon">
                        <img :src="current>=index?'/images/dot-active.svg':'/images/dot-p2p.svg'"  class="pointer" />
                    </span>
                                </a-step>
                        </a-steps> -->
            <div class="steps-content mt-3">
              <a-row :gutter="16">
                <a-col :lg="{span: 16,offset:4}" :xl="{span: 12,offset:6}">
                  <a-form-model
                    ref="applyForm"
                    :model="applyForm"
                    :rules="rules"
                    :hide-required-mark="true"
                    label-align="left"
                  >
                    <a-row :gutter="16" class="mb-4">
                      <a-col :lg="24">
                        <a-form-model-item
                          has-feedback
                          :label="$t('cryptolistingstepsForm.cls1')"
                          :colon="false"
                          prop="emailAddress"
                          :wrapper-col="{
                            xl: 24,
                            lg: 24,
                            md: 24,
                            sm: 24,
                            xs: 24,
                          }"
                        >
                          <a-input
                            v-model="applyForm.emailAddress"
                            :placeholder="$t('cryptolistingstepsForm.cls12')"
                          />
                        </a-form-model-item>
                      </a-col>
                      <a-col :lg="24">
                        <a-form-model-item
                          has-feedback
                          :label="$t('cryptolistingstepsForm.cls2')"
                          prop="telegram"
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
                            v-model="applyForm.telegram"
                            :placeholder="$t('cryptolistingstepsForm.cls13')"
                          />
                        </a-form-model-item>
                      </a-col>
                      <a-col :lg="24">
                        <a-form-model-item
                          has-feedback
                          :label="$t('cryptolistingstepsForm.cls3')"
                          prop="project"
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
                            v-model="applyForm.project"
                            :placeholder="$t('cryptolistingstepsForm.cls14')"
                          />
                        </a-form-model-item>
                      </a-col>
                      <a-col :lg="24">
                        <a-form-model-item
                          has-feedback
                          :label="$t('cryptolistingstepsForm.cls4')"
                          :colon="false"
                          prop="token"
                          :wrapper-col="{
                            xl: 24,
                            lg: 24,
                            md: 24,
                            sm: 24,
                            xs: 24,
                          }"
                        >
                          <a-input
                            v-model="applyForm.token"
                            :placeholder="$t('cryptolistingstepsForm.cls15')"
                          />
                        </a-form-model-item>
                      </a-col>
                      <!--  -->
                      <a-col :lg="24">
                        <a-form-model-item
                          has-feedback
                          :label="$t('cryptolistingstepsForm.cls5')"
                          :colon="false"
                          prop="chain"
                          :wrapper-col="{
                            xl: 24,
                            lg: 24,
                            md: 24,
                            sm: 24,
                            xs: 24,
                          }"
                        >
                          <a-input
                            v-model="applyForm.chain"
                            :placeholder="$t('cryptolistingstepsForm.cls16')"
                          />
                        </a-form-model-item>
                      </a-col>
                      <!--  -->
                      <a-col :lg="24">
                        <a-form-model-item
                          has-feedback
                          :label="$t('cryptolistingsteps.cls6')"
                          :colon="false"
                          prop="cryptoName"
                          :wrapper-col="{
                            xl: 24,
                            lg: 24,
                            md: 24,
                            sm: 24,
                            xs: 24,
                          }"
                        >
                          <a-input
                            v-model="applyForm.cryptoName"
                            :placeholder="$t('cryptolistingstepsForm.cls16')"
                          />
                        </a-form-model-item>
                      </a-col>
                      <!--  -->
                      <a-col :lg="24">
                        <a-form-model-item
                          has-feedback
                          :label="$t('cryptolistingstepsForm.cls7')"
                          :colon="false"
                          prop="url"
                          :wrapper-col="{
                            xl: 24,
                            lg: 24,
                            md: 24,
                            sm: 24,
                            xs: 24,
                          }"
                        >
                          <a-input
                            v-model="applyForm.url"
                            :placeholder="$t('cryptolistingstepsForm.cls16')"
                          />
                        </a-form-model-item>
                      </a-col>
                      <!--  -->
                      <a-col :lg="24">
                        <a-form-model-item
                          has-feedback
                          :label="$t('cryptolistingstepsForm.cls8')"
                          :colon="false"
                          prop="twitterUrl"
                          :wrapper-col="{
                            xl: 24,
                            lg: 24,
                            md: 24,
                            sm: 24,
                            xs: 24,
                          }"
                        >
                          <a-input
                            v-model="applyForm.twitterUrl"
                            :placeholder="$t('cryptolistingstepsForm.cls16')"
                          />
                        </a-form-model-item>
                      </a-col>
                      <a-col :lg="24">
                        <a-form-model-item
                          has-feedback
                          :label="$t('cryptolistingstepsForm.cls9')"
                          :colon="false"
                          prop="whitepaper"
                          :wrapper-col="{
                            xl: 24,
                            lg: 24,
                            md: 24,
                            sm: 24,
                            xs: 24,
                          }"
                        >
                          <a-input
                            v-model="applyForm.whitepaper"
                            :placeholder="$t('cryptolistingstepsForm.cls16')"
                          />
                        </a-form-model-item>
                      </a-col>
                      <a-col :lg="24">
                        <a-form-model-item
                          has-feedback
                          :label="$t('cryptolistingstepsForm.cls10')"
                          :colon="false"
                          prop="introProject"
                          :wrapper-col="{
                            xl: 24,
                            lg: 24,
                            md: 24,
                            sm: 24,
                            xs: 24,
                          }"
                        >
                          <a-input
                            v-model="applyForm.introProject"
                            :placeholder="$t('cryptolistingstepsForm.cls16')"
                          />
                        </a-form-model-item>
                      </a-col>
                      <a-col :lg="24">
                        <a-form-model-item
                          has-feedback
                          :label="$t('cryptolistingstepsForm.cls11')"
                          :colon="false"
                          prop="role"
                          :wrapper-col="{
                            xl: 24,
                            lg: 24,
                            md: 24,
                            sm: 24,
                            xs: 24,
                          }"
                        >
                          <a-input
                            v-model="applyForm.role"
                            :placeholder="$t('cryptolistingstepsForm.cls16')"
                          />
                        </a-form-model-item>
                      </a-col>
                      <!-- end form -->
                      <!-- <a-col :lg="24" align="center" class="my-4">
                                                <img src="/images/file1.svg" />
                                            </a-col> -->
                      <!-- <a-col :lg="24" class="my-4">
                                                <a-button block class="disabled-btn">{{$t('footer.fm4')}}</a-button>

                                            </a-col> -->
                      <!-- <a-col :lg="24">
                                                <a-row :gutter="8">
                                                    <a-col :lg="2"><a-checkbox></a-checkbox></a-col>
                                                    <a-col :lg="22">
                                                        <p class="list1-desc"> {{$t('footer.fm5')}}</p>
                                                    </a-col>
                                                </a-row>
                                                <a-row :gutter="16" class="my-3">
                                                    <a-col :lg="12"><a-button block
                                                            class="previous-btn">{{$t('footer.fm6')}}</a-button></a-col>
                                                    <a-col :lg="12"><a-button block
                                                            class="disabled-btn">{{$t('footer.fm7')}}</a-button></a-col>
                                                </a-row>
                                            </a-col> -->
                      <a-col :lg="24" class="my-4">
                        <a-button
                          @click="applyAgentPlan"
                          block
                          class="primary-btn fw-5 my-3"
                          >{{ $t("footer.fm7") }}</a-button
                        >
                      </a-col>
                      <!-- <a-col :lg="24">
                                                <p class="mb-0 list1-desc">{{$t('footer.fm8')}}</p>
                                            </a-col> -->
                    </a-row>
                    <!-- <a-row :gutter="16">
                                            <a-col :lg="24" align="center">
                                                <img src="/images/success-icon.svg" />
                                                <p class="list-title mt-4">{{$t('footer.fm9')}}</p>
                                                <p class="list1-desc px-5 mx-3">{{$t('footer.fm10')}}</p>
                                                    <a-button class="primary-btn my-3" block>{{$t('footer.fm11')}}</a-button>
                                            </a-col>
                                        </a-row> -->
                  </a-form-model>
                  <ApplySuccessModal
                    :applySuccessModel="successModel"
                    @applySuccessModelClose="successModel = {}"
                  />
                </a-col>
              </a-row>
            </div>
          </a-row>
        </a-col>
      </a-row>
    </a-card>
  </div>
</template>

<script>
import ApplySuccessModal from "../AgentPlan/ApplySuccessModal.vue";

export default {
  components: {
    ApplySuccessModal,
  },
  props: {
    ApplySuccessModal: {
      type: Boolean,
    },
    close: {
      type: Function,
    },
    metada: {
      default: () => {
        return {
          title: "Apply as a crypto listing ", //{{ $t('agent_plan.ap1') }}
          description:
            "You will get a higher commission and get the chance to join us.", //{{ $t('agent_plan.ap2') }}
        };
      },
    },
  },
  data() {
    return {
      getCryptoListingSteps: 1,
      applyForm: {
        emailAddress: "",
        telegram: "",
        project: "",
        token: "",
        chain: "",
        cryptoName: "",
        url: "",
        twitterUrl: "",
        whitepaper: "",
        introProject: "",
        role: "",
      },
      successModel: {},
      steps: [
        { title: this.$t("news.t5") },
        {
          title: this.$t("news.t6"),
        },
        {
          title: this.$t("news.t7"),
        },
      ],
      cryptoListingForm: {},
      rules: {
        emailAddress: [
          { required: true, message: this.$t("messages.msg1") },
          {
            type: "email",
            message: this.$t("messages.msg2"),
          },
        ],
        telegram: [
          { required: true, message: this.$t("cryptolistingstepsForm.msg2") },
        ],
        project: [
          { required: true, message: this.$t("cryptolistingstepsForm.msg3") },
        ],
        token: [
          { required: true, message: this.$t("cryptolistingstepsForm.msg4") },
        ],
        chain: [
          { required: true, message: this.$t("cryptolistingstepsForm.msg5") },
        ],
        cryptoName: [
          { required: true, message: this.$t("cryptolistingstepsForm.msg6") },
        ],
        url: [
          { required: true, message: this.$t("cryptolistingstepsForm.cls7") },
        ],
        twitterUrl: [
          { required: true, message: this.$t("cryptolistingstepsForm.cls8") },
        ],
        whitepaper: [
          { required: true, message: this.$t("cryptolistingstepsForm.cls9") },
        ],
        introProject: [
          { required: true, message: this.$t("cryptolistingstepsForm.cls10") },
        ],
        role: [
          { required: true, message: this.$t("cryptolistingstepsForm.cls11") },
        ],
      },
    };
  },
  methods: {
    async applyAgentPlan() {
      const _self = this;
      await this.$refs["applyForm"].validate(async (valid) => {
        if (valid) {
          this.loading = true;
          const postData = {
            typeName: "Others",
            content: "Crypto listing application",
            jsonContent: JSON.stringify(_self.applyForm),
          };
          try {
            const data = await this.$store.dispatch(
              "work_order_update",
              postData
            );
            if (data.code == 200) {
              this.applyForm = {
                emailAddress: "",
                telegram: "",
                project: "",
                token: "",
                chain: "",
                cryptoName: "",
                url: "",
                twitterUrl: "",
                whitepaper: "",
                introProject: "",
                role: "",
              };
              this.successModel = {
                ServerMessage: this.$t("messages.msg69"),
              };
              // _self.$store.commit("set_message", {
              //   type: "ok",
              //   text: this.$t("texts.txt1") + " " + this.metada.title,
              // });
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
};
</script>

<style  lang="scss">
@import "@/assets/scss/components/modals/success.scss";
</style>
