<template>
    <div class="scurity-second-form">
        <div class="">
            <a-card class="security-card" :bordered="false">
                <p class="main-heading fw-5 mb-0">
                    <img src="/images/arrow-left.svg" class="mr-2 pointer" @click="goback" />
                    {{ $t("formMenu.bindPhone") }}
                </p>
            </a-card>
            <a-card :bordered="false" class="pb-5 security-form mt-3">
                <a-form-model ref="changeMobile" :hide-required-mark="true" label-align="left" :model="validatePhone"
                    :rules="rules">
                    <a-row class="pt-5 px-4">
                        <a-col :lg="{ span: 14, offset: 5 }" :xl="{ span: 10, offset: 7 }">
                            <a-row :gutter="16" class="col-alignment">
                                <a-col :lg="4">
                                    <img src="/images/phone-verification.svg" />
                                </a-col>
                                <a-col :lg="20" class="">
                                    <p class="transfer-heading fw-5 mb-2">
                                        {{ $t("person.ps6") }}
                                    </p>
                                    <p class="enter-pass mb-0">
                                        {{ $t("person.ps7") }}
                                    </p>
                                </a-col>
                            </a-row>
                            <p class="notice-txt fw-4 mb-0 pt-4 my-3">
                                {{ $t("person.ps8") }}
                            </p>
                            <a-row :gutter="16" class="pt-3">
                                <a-col :lg="24">
                                    <a-form-model-item has-feedback :label="$t('labels.lbl9')" prop="telNumber"
                                        :colon="false" :wrapper-col="{
                                            xl: 24,
                                            lg: 24,
                                            md: 24,
                                            sm: 24,
                                            xs: 24,
                                        }">
                                        <vue-tel-input v-model="validatePhone.telNumber"
                                            @blur="validatePhone.telNumber = Number(validatePhone.telNumber).toString()"
                                            v-on:country-changed="countryChanged" mode="auto" :validCharactersOnly="true"
                                            :defaultCountry="validatePhone.countrycode
                                                " :autoFormat="false" :dropdownOptions="{
        showFlags: true,
        showDialCodeInList: true,
        showSearchBox: true,
        showDialCodeInSelection: true,
    }"></vue-tel-input>

                                    </a-form-model-item>
                                </a-col>
                            </a-row>
                            <a-row :gutter="16" class="pt-3">
                                <a-col :lg="16">
                                    <a-form-model-item has-feedback :label="$t('labels.lbl55')" prop="smsverifycode"
                                        :colon="false" :wrapper-col="{
                                            xl: 24,
                                            lg: 24,
                                            md: 24,
                                            sm: 24,
                                            xs: 24,
                                        }">
                                        <a-input :placeholder="$t('placeholders.plh45')
                                            " v-model="validatePhone.smsverifycode" type="number" />
                                    </a-form-model-item></a-col>
                                <a-col :lg="8" class="code-p2pbtn-space">
                                    <a-form-model-item has-feedback prop="" :colon="false" :wrapper-col="{
                                        xl: 24,
                                        lg: 24,
                                        md: 24,
                                        sm: 24,
                                        xs: 24,
                                    }">
                                        <verifycode :phone="validatePhone.telNumber" :areacode="validatePhone.countrycode
                                            ">
                                        </verifycode>
                                    </a-form-model-item></a-col>
                            </a-row>

                            <!--  -->

                            <a-tabs :defautlActiveKey="activeTab"  class="change-mob-tab"  @change="(key)=>{this.activeTab=key}">
                                <a-tab-pane key="1" tab="Google" v-if="this.$userinfo.isgoogleauthed">
                                    <a-row :gutter="16" class="pt-3">
                                        <a-col :lg="24">
                                            <a-form-model-item has-feedback :label="$t('labels.lbl56')"
                                                :prop="activeTab == 1 ? 'googleverifycode' : ''" :colon="false" :wrapper-col="{
                                                    xl: 24,
                                                    lg: 24,
                                                    md: 24,
                                                    sm: 24,
                                                    xs: 24,
                                                }">
                                                <a-input :placeholder="$t('placeholders.plh47')
                                                    " v-model="validatePhone.googleverifycode" type="number" />
                                            </a-form-model-item>
                                        </a-col>
                                    </a-row>
                                </a-tab-pane>
                                <a-tab-pane key="2" tab="Email" v-if="$userinfo.isemailauthed">
                                    <a-row :gutter="16" class="pt-3">
                                        <a-col :lg="16">
                                            <a-form-model-item has-feedback :label="$t('labels.lbl5')"
                                                :prop="activeTab == 2 ? 'emailverifycode' : ''" :colon="false" :wrapper-col="{
                                                    xl: 24,
                                                    lg: 24,
                                                    md: 24,
                                                    sm: 24,
                                                    xs: 24,
                                                }">
                                                <a-input
                                                    :placeholder="`${$t('placeholders.plh46')} ${global_string_split($userinfo.email)}`"
                                                    v-model="validatePhone.emailverifycode" type="number" />
                                            </a-form-model-item>
                                        </a-col>
                                        <a-col :lg="8" class="code-p2pbtn-space">
                                            <a-form-model-item has-feedback prop="" :colon="false" :wrapper-col="{
                                                xl: 24,
                                                lg: 24,
                                                md: 24,
                                                sm: 24,
                                                xs: 24,
                                            }">
                                                <verifycode :email="$userinfo.email"></verifycode>
                                            </a-form-model-item></a-col>
                                    </a-row>
                                </a-tab-pane>
                            </a-tabs>





                            <!--  -->

                            <!-- <a-row :gutter="16" class="pt-3">
                                <a-col :lg="16">
                                    <a-form-model-item has-feedback :label="$t('labels.lbl5')" prop="emailverifycode"
                                        :colon="false" :wrapper-col="{
                                            xl: 24,
                                            lg: 24,
                                            md: 24,
                                            sm: 24,
                                            xs: 24,
                                        }">
                                        <a-input
                                            :placeholder="`${$t('placeholders.plh46')} ${global_string_split($userinfo.email)}`"
                                            v-model="validatePhone.emailverifycode" type="number" />
                                    </a-form-model-item>
                                </a-col>
                                <a-col :lg="8" class="code-p2pbtn-space">
                                    <a-form-model-item has-feedback prop="" :colon="false" :wrapper-col="{
                                        xl: 24,
                                        lg: 24,
                                        md: 24,
                                        sm: 24,
                                        xs: 24,
                                    }">
                                        <verifycode :email="$userinfo.email"></verifycode>
                                    </a-form-model-item></a-col>
                            </a-row>
                            <a-row :gutter="16" class="pt-3">
                                <a-col :lg="24">
                                    <a-form-model-item has-feedback :label="$t('labels.lbl56')" prop="googleverifycode"
                                        :colon="false" :wrapper-col="{
                                            xl: 24,
                                            lg: 24,
                                            md: 24,
                                            sm: 24,
                                            xs: 24,
                                        }">
                                        <a-input :placeholder="$t('placeholders.plh47')
                                            " v-model="validatePhone.googleverifycode
        " type="number" />
                                    </a-form-model-item>
                                </a-col>
                            </a-row> -->
                            <a-row :gutter="16" class="mt-3">
                                <a-col :lg="24" align="end">
                                    <a-button class="primary-btn fw-5 px-4" block @click="openPhone">{{ $t("formMenu.bindding")
                                    }}</a-button>
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
import verifycode from "@/components/public/verifycode";

export default {
    name: "binding-email-google",
    components: {
        verifycode,
    },
    watch: {
        "validatePhone.countrycode": function (val) {
            this.country = this.countryOptions.find((item) => {
                this.validatePhone.telNumber = "";
                return item.areacode == val;
            });
        },
        "$store.state.hex_lang.locale": function (val) {
            this.countryOptions.map((item) => {
                if (val == "en_us") {
                    item.name = item.engname;
                } else {
                    item.name = item.name;
                }
            });
        },
    },
    data() {
        return {
            activeTab:2,
            loading: false,
            lang: this.$store.state.hex_lang.locale,
            state: {
                isopen: false,
                phone: {
                    state: false,
                    sendDelay: this.$t("formMenu.getCode"),
                },
                email: {
                    state: false,
                    sendDelay: this.$t("formMenu.getCode"),
                },
            },
            
            validatePhone: {
                countrycode: "",
                emailverifycode: "",
                googleverifycode: "",
                smsverifycode: "",
                telNumber: "",
            },
            country: {},
            isphone: true,
            countryOptions: [],
            phoneformat: true,
            submitState: false,
            rules: {
                telNumber:[
                    {
                        required: true,
                        message: this.$t('messages.msg59'),
                    },
                ],
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
        if (this.$userinfo.isgoogleauthed) {
                this.activeTab = 1;
            }
        this.$store.dispatch("com_country_getlist").then(({ data }) => {
            this.countryOptions = data;
            this.countryOptions.map((item) => {
                if (this.lang == "zh_cn" || this.lang == "zh_hk") {
                    item.name = item.name;
                } else {
                    item.name = item.engname;
                }
            });
        });
    },
    methods: {
        goback() {
            this.$router.go(-1);
        },
        countryChanged(event) {
            this.validatePhone.countrycode = event.dialCode;
        },
        getcoutrycode() {
            var _self = this;
            this.$store.dispatch("com_getlangbyip").then(({ data }) => {
                if (data && data.countrycode) {
                    var coutryinfos = _self.countryOptions.filter((item) => {
                        return item.areacode == data.countrycode;
                    });
                    if (coutryinfos.length > 0) {
                        _self.validatePhone.countryid =
                            coutryinfos[0].countryid;
                    }
                }
            });
        },
        async openPhone() {
            const _self = this;
            let postData;
            if (_self.state.issopen) return;
            if (_self.submitState) return;

            await this.$refs["changeMobile"].validate((valid) => {
                if (valid) {
                    _self.submitState = true;
                    _self.loading = true;
                    _self.state.isopen = true;
                    if (!this.$userinfo.isphoneauthed) {
                        postData = {
                            authtype: "AuthPhone",
                            countryid: _self.country.countryid,
                            countrycode: _self.validatePhone.countrycode,
                            account: _self.validatePhone.telNumber,
                            emailverifycode:
                                _self.validatePhone.emailverifycode,
                            googleverifycode:
                                _self.validatePhone.googleverifycode,
                            smsverifycode: _self.validatePhone.smsverifycode,
                        };
                    } else {
                        postData = {
                            countryCode: _self.validatePhone.countrycode,
                            newPhone: _self.validatePhone.telNumber,
                            googleVerifyCode:
                                _self.validatePhone.googleverifycode,
                            emailVerifyCode:
                                _self.validatePhone.emailverifycode,
                            smsVerifyCode: _self.validatePhone.smsverifycode,
                        };
                    }
                    _self.$store
                        .dispatch(
                            this.$userinfo.isphoneauthed
                                ? "user_reset_phone"
                                : "user_user_auth",
                            postData
                        )
                        .then((res) => {
                            if (res.data) {
                                _self.global_refresh_user_info();
                                _self.$store.commit("set_message", {
                                    type: "ok",
                                    text: res.msg,
                                });
                                _self.$router.push("/person/security");
                            } else {
                                _self.submitState = false;
                                _self.loading = false;
                            }
                        });
                }
            });
        },
    },
};
</script>

<style lang="scss"></style>
