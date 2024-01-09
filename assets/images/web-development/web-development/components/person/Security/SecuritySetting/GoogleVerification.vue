<template>
    <div class="google-verification">
        <div class="">
            <a-card class="security-card" :bordered="false">
                <p class="main-heading fw-5 mb-0">
                    <img
                        src="/images/arrow-left.svg"
                        @click="goback"
                        class="mr-2 pointer"
                    />
                    {{ $t("google.changeGoogle") }}
                </p>
            </a-card>
            <a-card :bordered="false" class="pb-5 security-form mt-3">
                <a-form-model
                    ref="changeGoogle"
                    :hide-required-mark="true"
                    label-align="left"
                    :model="verifyModel"
                    :rules="rules"
                >
                    <a-row class="pt-5 px-4">
                        <a-col :lg="{span:14,offset:5}" :xl="{span:10,offset:7}">
                            <a-row :gutter="16" class="col-alignment">
                                    <a-col :lg="4" :xl="4">
                                    <img src="/images/google-authenticator.svg"/>
                                </a-col>
                                <a-col :lg="20" :xl="20" class="">
                                    <p class="transfer-heading fw-5 mb-2"> {{ $t("google.loadgoogle") }}</p>
                                    <p class="enter-pass mb-0">{{$t('person.ps11')}}</p>
                                </a-col>
                            </a-row>
                            <p class="notice-txt fw-4 mb-0 pt-4 mt-3">
                                {{ $t("google.iosload") }}
                            </p>
                            <p class="notice-txt fw-4">
                                {{ $t("google.azload") }}
                            </p>
                            <a-row :gutter="16" class="my-4 py-2">
                                <a-col :lg="12"
                                    ><a
                                        href="https://itunes.apple.com/cn/app/google-authenticator/id388497605?mt=8" target="_blank"
                                        ><img
                                                src="/images/app-store.svg"
                                                class="" width="100%"
                                            /></a
                                    ></a-col
                                >
                                <a-col :lg="12"
                                    ><a
                                        href="https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2" target="_blank"
                                        ><img
                                                src="/images/google-store.svg"
                                                class="" width="100%"
                                            /></a
                                    ></a-col
                                >
                            </a-row>

                            <a-row :gutter="16" class="pb-4 pt-3 col-alignment">
                                <a-col :lg="4">
                                    <img src="/images/biding-google-auth.svg"/>
                                </a-col>
                                <a-col :lg="20" class="">
                                    <p class="transfer-heading fw-5 mb-2">  {{ $t("google.bindgoogle") }}</p>
                                    <p class="enter-pass mb-0">{{$t('person.ps11')}}</p>
                                </a-col>
                            </a-row>
                            <a-row :gutter="16" class="">
                                <a-col :lg="24">
                                    <a-card
                                        class="text-center qrcode-card"
                                        :bordered="false"
                                    >
                                        <div id="canvas">

                                        </div>
                                    
                                   
                                    </a-card>

                                    <a-tooltip  v-if="encsecretkey" :visible="false">
                                <template slot="title">
                                    {{encsecretkey}}
                                </template>
                                <a-input
                                        v-if="encsecretkey"
                                        class="my-3"
                                        :value="encsecretkey"
                                        readOnly
                                        id="keycopy"
                                       
                                    >
                                        <span
                                            slot="suffix"
                                        >
                                        <AppClipboard target="#keycopy" element-class="link-url1" />

                                        </span>
                                    </a-input>
                            </a-tooltip>
                          
                                </a-col>
                                </a-row>
                                <a-row :gutter="16" class="pt-3">

                                <a-col :lg="16" v-if="$userinfo.isemailauthed">
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
                                        <a-input type="number"
                                            v-model="
                                                verifyModel.emailverifycode
                                            "
                                            :placeholder="
                                                $t(
                                                    'formMenu.emialInputVerification'
                                                )
                                            "
                                        />
                                    </a-form-model-item>
                                </a-col>
                                <a-col
                                    :lg="8"
                                    v-if="$userinfo.isemailauthed"
                                    class="code-p2pbtn-space"
                                >
                                    <a-form-model-item
                                        has-feedback
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
                                        <verifycode
                                            :email="$userinfo.email"
                                            :template="$userinfo.isemailauthed?'GoogleVerifySettingsChanged':'GoogleVerifySettingsOpened'"
                                        ></verifycode>
                                    </a-form-model-item>
                                </a-col>
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
                                        <a-input
                                        type="number"
                                            v-model="
                                                verifyModel.googleverifycode
                                            "
                                            :placeholder="
                                                $t(
                                                    'formMenu.googleInputVerification'
                                                )
                                            "
                                            @keyup.enter="open(0)"
                                        />
                                    </a-form-model-item>
                                </a-col>
                            </a-row>
                            <a-row :gutter="16" class="mt-3">
                                <a-col :lg="24" align="end">
                                    <a-button
                                        class="primary-btn fw-5 px-4"
                                        block
                                        @click="open(0)"
                                        >{{ $t("formMenu.bindding") }}</a-button
                                    >
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
import Clipboard from "clipboard";
import verifycode from "@/components/public/verifycode";
import Qrlogo from '@/static/images/qrlogo.png'
import AppClipboard from '~/components/App/AppClipboard.vue';

export default {
    name: "google-change",
    components: {
        verifycode,
        AppClipboard
    },
    data() {
        return {
            loading: false,
            submitState: false,
            verifyModel: {
                emailverifycode: "",
                smsverifycode: "",
                googleverifycode: "",
            },
            secretKey: "",
            bindGoogleData: {},
            encsecretkey: "",
            qrcode: "",
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
        const _self=this;
        this.$store.dispatch("user_ga_create").then((res) => {
            if (res.data) {
                this.bindGoogleData = res.data;
                this.secretKey = this.bindGoogleData["secretkey"];
                this.encsecretkey = this.bindGoogleData["encsecretkey"]; //长
                this.getCode();
            }
        });
        import('qr-code-styling').then(({ default: QRCodeStyling }) => {
            _self.QRCodeStyling = QRCodeStyling;
        });
    },
    methods: {
        goback() {
            this.$router.go(-1);
        },
        getCode(code) {
            const _self = this;
            let bb;
            bb = setInterval(() => {
                if (document.getElementById('canvas')) {
                    const qrCode = new _self.QRCodeStyling({
                        width: 200,
                        height: 200,
                        type: "canvas",
                        data: this.bindGoogleData.provisionurl,
                        // image: Qrlogo,
                        dotsOptions: {
                            color: "#000",
                        },
                        backgroundOptions: {
                            color: "#fff",
                        },
                    });

                    document.getElementById("canvas").innerHTML = null;
                    qrCode.append(document.getElementById("canvas"));
                    clearInterval(bb);
                }
            }, 100);


        },
        async open() {
            if (this.submitState) return;
            await this.$refs["changeGoogle"].validate((valid) => {
                if (valid) {
                    const _self = this;
                    let postData = {};
                    postData = {
                        authtype: "AuthGoogle",
                        account: _self.bindGoogleData.secretkey,
                        emailverifycode: _self.verifyModel.emailverifycode,
                        googleverifycode: _self.verifyModel.googleverifycode,
                    };
                    this.submitState = true;
                    this.loading = true;
                    this.$store
                        .dispatch("user_user_auth", postData)
                        .then((res) => {
                            if (res.data) {
                                this.global_refresh_user_info();
                                this.$store.commit("set_message", {
                                    type: "ok",
                                    text: res.msg,
                                });
                                this.$router.push("/person/security");
                            } else {
                                this.submitState = false;
                                this.loading = false;
                            }
                        });
                }
            });
        },
        // copy(val) {
        //     let a = '.' + val;
        //console.log("ehllo")

        //     let clipboard = new Clipboard(a);
        //     clipboard.on('success', e => {
        //         this.$store.commit('set_message', { type: 'ok', text: this.$t('patch.copysuccess') })
        //         clipboard.destroy()
        //         document.getSelection().removeAllRanges();

        //     })
        //     clipboard.on('error', e => {
        //         this.$store.commit('set_message', { type: 'error',text: this.$t('texts.txt13') })
        //         clipboard.destroy()
        //     })
        // },
    },
};
</script>

<style lang="scss"></style>
