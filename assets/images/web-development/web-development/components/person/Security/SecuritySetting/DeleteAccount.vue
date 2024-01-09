<template>
    <div class="delete-account">
        <div class="">
            <a-card class="security-card" :bordered="false">
                <p class="main-heading fw-5 mb-0 text-black">
                    {{ $t('home.deleteAccount') }}
                </p>
            </a-card>
            <a-card :bordered="false" class="pb-5 mt-3">
                <a-row class="pt-5 px-4">
                    <a-col :lg="{ span: 14, offset: 5 }" :xl="{ span: 10, offset: 7 }">

                        <p class="notice-txt fw-5 mb-0 my-3 text-black">
                            {{$t('deleteAccount.del2')}}
                        </p>


                        <a-tabs :defautlActiveKey="activeTab" class="change-mob-tab"
                            @change="(key) => { this.activeTab = key }">
                            <a-tab-pane key="1" tab="Google" v-if="this.$userinfo.isgoogleauthed">
                                <a-row :gutter="16" class="pt-3">
                                    <a-col :lg="24">
                                        <a-form-model ref="googleAuthForm" :hide-required-mark="true" label-align="left"
                                            :model="validatePhone" :rules="googleRules">
                                            <a-form-model-item has-feedback :label="$t('labels.lbl56')"
                                                prop="googleverifycode" :colon="false" :wrapper-col="{
                                                    xl: 24,
                                                    lg: 24,
                                                    md: 24,
                                                    sm: 24,
                                                    xs: 24,
                                                }">
                                                <a-input :placeholder="$t('placeholders.plh47')
                                                    " v-model="validatePhone.googleverifycode" type="number" />
                                            </a-form-model-item>
                                        </a-form-model>
                                    </a-col>
                                </a-row>
                            </a-tab-pane>
                            <a-tab-pane key="2" tab="Email" v-if="$userinfo.isemailauthed">
                                <a-form-model ref="emailForm" :hide-required-mark="true" label-align="left"
                                    :model="validatePhone" :rules="emailRules">
                                    <a-row :gutter="16" class="pt-3">
                                        <a-col :lg="16">
                                            <a-form-model-item has-feedback :label="$t('labels.lbl5')"
                                                prop="emailverifycode" :colon="false" :wrapper-col="{
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
                                            </a-form-model-item>
                                        </a-col>
                                    </a-row>
                                </a-form-model>
                            </a-tab-pane>
                            <a-tab-pane key="3" tab="Phone" v-if="$userinfo.isphoneauthed">
                                <a-form-model ref="smsForm" :hide-required-mark="true" label-align="left"
                                    :model="validatePhone" :rules="smsRules">
                                    <a-row :gutter="16" class="pt-3">
                                        <a-col :lg="16">
                                            <a-form-model-item has-feedback :label="$t('labels.lbl11')" prop="smsverifycode"
                                                :colon="false" :wrapper-col="{
                                                    xl: 24,
                                                    lg: 24,
                                                    md: 24,
                                                    sm: 24,
                                                    xs: 24,
                                                }">
                                                <a-input
                                                    :placeholder="`${$t('placeholders.plh46')} ${global_string_split($userinfo.phone)}`"
                                                    v-model="validatePhone.smsverifycode" type="number" />
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
                                                <verifycode :phone="$userinfo.phone" :areacode="$userinfo.countrycode">
                                                </verifycode>
                                            </a-form-model-item>
                                        </a-col>

                                    </a-row>
                                </a-form-model>
                            </a-tab-pane>

                        </a-tabs>

                        <a-row class="mt-3">
                            <a-col :lg="24">
                                <h3>{{$t('deleteAccount.del3')}}</h3>
                            </a-col>
                            <a-col :lg="24">
                                <a-radio-group v-model="validatePhone.reason" class="text-black fw-5">
                                    <a-radio :style="radioStyle" :value="1">
                                        {{$t('deleteAccount.del4')}}
                                    </a-radio>
                                    <a-radio :style="radioStyle" :value="2">
                                        {{$t('deleteAccount.del5')}}
                                    </a-radio>
                                    <a-radio :style="radioStyle" :value="3">
                                        {{$t('deleteAccount.del6')}}
                                    </a-radio>
                                </a-radio-group>
                            </a-col>
                            <a-col :lg="24" v-if="validatePhone.reason == 3">
                                <a-form-model-item has-feedback :label="$t('labels.lbl19')" prop="coin" :colon="false"
                                    :wrapper-col="{
                                        xl: 24,
                                        lg: 24,
                                        md: 24,
                                        sm: 24,
                                        xs: 24,
                                    }">
                                    <a-textarea v-model="validatePhone.reasondescriptiono"
                                        :placeholder="$t('placeholders.plh27')" :rows="8" />
                                </a-form-model-item>
                            </a-col>
                        </a-row>



                        <a-row :gutter="16" class="mt-3">
                            <a-col :lg="24" align="end">
                                <a-button class="primary-btn fw-5 px-4" :loading="loading" :disabled="loading" block
                                    @click="openPhone">
                                    {{ $t('home.deleteAccount') }}
                                </a-button>
                            </a-col>
                        </a-row>
                    </a-col>
                </a-row>

            </a-card>
        </div>
        <DeleteAccountConfirmModal :show="showConfirmDelete" @onClose="showConfirmDelete = false"
            @onConfirm="onConfirmDelete" :loading="loading" />
    </div>
</template>

<script>
import verifycode from "@/components/public/verifycode";
import DeleteAccountConfirmModal from "./DeleteAccountConfirmModal.vue";

export default {
    name: "DeleteAccount",
    components: {
        verifycode,
        DeleteAccountConfirmModal
    },
    data() {
        return {
            activeTab: 2,
            loading: false,
            showConfirmDelete: false,
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
                emailverifycode: "",
                googleverifycode: "",
                smsverifycode: "",
                telNumber: "",
                reason: '',
                reasondescriptiono: '',
            },
            radioStyle: {
                display: 'block',
                height: '30px',
                lineHeight: '30px',
            },


            isphone: true,
            phoneformat: true,

            googleRules: {
                googleverifycode: [
                    {
                        required: true,
                        message: this.$t('messages.msg42'),
                    },
                ],
            },
            emailRules: {
                emailverifycode: [
                    {
                        required: true,
                        message: this.$t('messages.msg40'),
                    },
                ],
            },

            smsRules: {
                smsverifycode: [
                    {
                        required: true,
                        message: this.$t('messages.msg41'),
                    },
                ],
            },
            postData: {}
        };
    },
    mounted() {
        if (this.$userinfo.isgoogleauthed) {
            this.activeTab = 1;
        }
    },
    methods: {

        
        async openPhone() {
            const _self = this;

            let currentForm = null

            if (this.activeTab == 1) {
                this.postData.googleverifycode = this.validatePhone.googleverifycode
                currentForm = 'googleAuthForm'
            } else if (this.activeTab == 2) {
                this.postData.emailverifycode = this.validatePhone.emailverifycode
                currentForm = 'emailForm'
                this.postData.email = this.$userinfo.email
            } else if (this.activeTab == 3) {
                postData.smsverifycode = this.validatePhone.smsverifycode
                currentForm = 'smsForm'
                this.postData.phone = this.$userinfo.phone
            }

            await this.$refs[currentForm].validate((valid) => {
                
                if (valid) {
                    _self.state.isopen = true;
                    // api is not receiving these two fields
                    // postData.reason = this.validatePhone.reason
                    // postData.reasondescriptiono = this.validatePhone.reasondescriptiono
                    _self.showConfirmDelete = true
                }
            });
        },

        onConfirmDelete() {
            const _self = this
            _self.loading = true;
            _self.$store
                .dispatch('auth/deleteAccount', this.postData)
                .then((res) => {
                    if (res.data) {
                        _self.showConfirmDelete = true
                        _self.$store.commit("set_message", {
                            type: "ok",
                            text: res.msg,
                        })
                        _self.$store.commit('remove_user_info');
                        _self.$router.push("/")
                    }
                }).finally(() => {
                    _self.loading = false
                });
        },
    },
};
</script>

<style lang="scss"></style>
