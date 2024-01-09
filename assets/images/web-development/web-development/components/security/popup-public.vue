<template>
    <a-modal
        id="email-verification-modal"
        v-model="model"
        width="450px"
        :footer="false"
        @cancel="close(true)"
    >
        <a-form-model
            ref="securityVerification"
            :hide-required-mark="true"
            label-align="left"
            :model="verifyModel"
            :rules="rules"
        >
            <a-row :gutter="16" class="">
                <a-col :lg="3"
                    ></a-col
                >
                <a-col :lg="18" align="center">
                    <img src="/images/verification.svg"/>
                </a-col>
                <a-col :lg="3" align="end"
                    ><img class="pointer"
                        src="/images/ud-cross.svg"
                        @click="close(true)"
                /></a-col>
            </a-row>
            <a-row><a-col :lg="24" class="pt-4 text-center">
                <p class="verification-heading fw-5 mb-1">{{$t('security.cc27')}}</p>
                <p class="verification-code-txt fw-5">{{$t('security.cc28')}}</p>
            </a-col></a-row>
            <a-row :gutter="10" class="pt-3">
                <!--  -->
                <a-tabs :defautlActiveKey="activeTab"  class="change-mob-tab"  @change="(key)=>{this.activeTab=key}">
        
                <a-tab-pane key="1" tab="Email" >
                <a-col :lg="16">
                    <a-form-model-item
                        has-feedback
                        :label="$t('labels.lbl5')"
                        :prop="activeTab == 1 ? 'emailverifycode' : ''"
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
                        :placeholder="$t('placeholders.plh62')"
                            v-model="verifyModel.emailverifycode"
                        />
                    </a-form-model-item>
                </a-col>
                <a-col :lg="8">
                    <a-form-model-item
                        has-feedback
                        label=" "
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
                        <verifycode :email="$userinfo.email" :isEmail="true" />
                    </a-form-model-item>
                </a-col>
            </a-tab-pane>
            <a-tab-pane key="2" tab="Mobile" >
                <a-col :lg="16">
                    <a-form-model-item
                        has-feedback
                        :label="$t('labels.lbl10')"
                        :prop="activeTab == 2 ? 'smsverifycode' : ''"
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
                        :placeholder="$t('placeholders.plh45')"
                            v-model="verifyModel.smsverifycode"
                        />
                    </a-form-model-item>
                </a-col>
                <a-col :lg="8">
                    <a-form-model-item
                        has-feedback
                        label=" "
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
                        <verifycode :phone="$userinfo.phone" :isPhone="true" :areacode="$userinfo.countrycode"></verifycode>
                    </a-form-model-item>
                </a-col>
                </a-tab-pane>
                </a-tabs>

                <!--  -->
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
                        <a-input
                        :placeholder="$t('placeholders.plh63')"
                            v-model="verifyModel.googleverifycode"
                        /> </a-form-model-item
                ></a-col>

            </a-row>
            <a-row :gutter="16" class="">
                <a-col :lg="12" class="mt-3">
                    <a-button class="cancel-outline-btn fw-5" @click="close(true)"  block>{{$t('security.cc29')}}</a-button>
                </a-col>
                <a-col :lg="12" class="mt-3">
                    <a-button class="primary-btn fw-5" @click="open()" block :loading="loading" :disabled="loading">{{
                        $t("formMenu.confirm")
                    }}</a-button>
                </a-col>
            </a-row>
        </a-form-model>
    </a-modal>

</template>
<script>
import { required } from "vuelidate/lib/validators";
import verifycode from "@/components/public/verifycode";

export default {
    name: "AuthPopup",
    props: {
        template: {
            type: String,
            default: "Default",
        },
        model: {
            type: Boolean,
        },
    },
    components: {
        verifycode,
    },

    watch: {
        "verifyModel.smsverifycode": function (val) {
            val = val ? val.trim() : "";
            if (val && val.length == 6) {
                this.open();
            }
        },
    },
    data() {
        return {
            loading: false,
            submitState: false,
            loginInfo: {},
            withdrawalAddress: false,
            activeTab:1,
            sendModel: {
                template: "Default",
            },
            verifyModel: {
                emailverifycode: "",
                smsverifycode: "",
                googleverifycode: "",
            },
            state: {
                tab: "phone",
                phone: {
                    state: false,
                    sendDelay: this.$t("formMenu.getCode"),
                },
                email: {
                    state: false,
                    sendDelay: this.$t("formMenu.getCode"),
                },
            },
            rules: {
                emailverifycode: [
                    {
                        required: true,
                        message: this.$t('messages.msg40'),
                    },
                ],
                smsverifycode: [
                    {
                        required: true,
                        message: this.$t('messages.msg41'),
                    },
                ],
                googleverifycode: [
                    {
                        required: true,
                        message: this.$t('messages.msg42'),
                    },
                ],
            },
        };
    },
    mounted() {
        this.loginInfo = this.$userinfo;
        if (this.$route.path.indexOf("/person/address") >= 1) {
            this.withdrawalAddress = true;
        } else {
            this.withdrawalAddress = false;
        }
    },
    methods: {
        resetvalidateWhite() {
            this.emailverifycode = "";
            this.smsverifycode = "";
            this.googleverifycode = "";
            this.$v.$reset();
        },
        async open() {

            await this.$refs["securityVerification"].validate((valid) => {
                if (valid) {
                    if (this.submitState) return;
                    this.submitState = true;
                    this.loading = true;
                    this.$emit("confirm", this);
                }
            });
        },
        closeloading() {
            this.loading = false;
            this.submitState = false;
        },
        clearstate() {
            this.submitState = false;
            this.loading = false;
        },
        clearTime() {
            if (this.$refs.email) {
                this.$refs.email.clearTime();
            }
            if (this.$refs.phone) {
                this.$refs.phone.clearTime();
            }
        },
        close(val) {
            this.emailverifycode = "";
            this.smsverifycode = "";
            this.googleverifycode = "";
            this.submitState = false;
            this.$emit("closepopup");
        },
    },
};
</script>
