<template>
    <div class="scurity-form">
        <div class="">
            <a-card class="security-card" :bordered="false">
                <p class="main-heading fw-5 mb-0"> <img src="/images/arrow-left.svg" class="mr-2 pointer"
                        @click="goback" /> {{ $t('memberCenter.modifyPassword') }}</p>
            </a-card>
            <a-card :bordered="false" class="pb-5 security-form mt-3">
                <a-form-model ref="modifypassword" :hide-required-mark="true" label-align="left" :model="modifypassword"
                    :rules="rules">
                    <a-row class="pt-5 px-4">
                        <a-col :lg="{span:14,offset:5}" :xl="{span:10,offset:7}">
                            <a-row :gutter="16" class="">
                                <a-col :lg="4">
                                    <img src="/images/padlock.svg"/>
                                </a-col>
                                <a-col :lg="20">
                                    <p class="transfer-heading fw-5 mb-2">{{ $t('memberCenter.modifyPassword') }}</p>
                                    <p class="enter-pass mb-0">{{$t('person.ps9')}}</p>
                                </a-col>
                            </a-row>
                            <p class="notice-txt fw-4 pt-4 my-3">{{$t('person.ps10')}}</p>
                            <a-row :gutter="16" class="pt-3">
                                <a-col :lg="24">
                                    <a-form-model-item has-feedback :label="$t('labels.lbl59')" prop="originalpwd" :colon="false"
                             :wrapper-col="{
                                            xl: 24,
                                            lg: 24,
                                            md: 24,
                                            sm: 24,
                                            xs: 24,
                                        }">
                                        <a-input-password :placeholder="$t('formMenu.yLoginPasswordInput')"
                                            v-model="modifypassword.originalpwd" />
                                    </a-form-model-item></a-col>
                                    </a-row>
                                    <a-row :gutter="16" class="pt-3">

                                <a-col :lg="24">
                                    <a-form-model-item has-feedback :label="$t('labels.lbl60')" prop="newpwd" :colon="false"
                                        :wrapper-col="{
                                            xl: 24,
                                            lg: 24,
                                            md: 24,
                                            sm: 24,
                                            xs: 24,
                                        }">
                                        <a-input-password :placeholder="$t('security.loginPassword')"
                                            v-model="modifypassword.newpwd" />
                                    </a-form-model-item></a-col>
                                    </a-row>
                                    <a-row :gutter="16" class="pt-3">

                                <a-col :lg="24">
                                    <a-form-model-item has-feedback :label="$t('labels.lbl61')" prop="passwordagain"
                                        :colon="false"  :wrapper-col="{
                                            xl: 24,
                                            lg: 24,
                                            md: 24,
                                            sm: 24,
                                            xs: 24,
                                        }">
                                        <a-input-password :placeholder="$t('formMenu.loginPasswordAgain')"
                                            v-model="modifypassword.passwordagain" />
                                    </a-form-model-item></a-col>
                            </a-row>
                            <a-row :gutter="16" class="mt-3">
                                <a-col :lg="24" align="end">
                                    <a-button class="primary-btn px-4" block
                                        @click="popups(true)">{{ $t('security.modify') }}</a-button>
                                </a-col>
                            </a-row>



                        </a-col>
                    </a-row>
                </a-form-model>
            </a-card>
        </div>
        <popup @closepopup='popups' ref="child" :model="popupstate" :template="'ModifyPwd'" @confirm="tomodifypassword"  :isexist="true" />
    </div>
</template>

<script>
import crypto from "@/plugins/axios/crypto";
import popup from '@/components/security/popup-optional.vue'

export default {
    name: 'Home',
    components: {
        popup
    },
    watch: {
        'modifypassword.newpwd': function (val) {
            const _modifypassword = this.modifypassword
            if (this.reg.strong.test(val)) {
                _modifypassword.passwordstrength = 3
            } else if (this.reg.middle.test(val)) {
                _modifypassword.passwordstrength = 2
            } else if (this.reg.single.test(val)) {
                _modifypassword.passwordstrength = 1
            } else {
                _modifypassword.passwordstrength = 0
            }
        }
    },
    data() {
        return {
            loading: false,
            popupstate: false,
            sendModel: {
                template: 'Default'
            },
            reg: {
                single: /^((?=.*[a-z])|(?=.*[A-Z])|(?=.*[0-9]))(?=.{8,})/g,
                middle: /^(((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[A-Z])))(?=.{8,})/g,
                strong: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*`~()_=/])(?=.{8,})/g
            },
            rules: {
                originalpwd: [
                    { required: true, message: this.$t('messages.msg46') },
                ],
                newpwd: [
                    { required: true, message: this.$t('messages.msg47'), trigger: 'blur' },
                    {
                        min: 8,
                        max: 20,
                        message: this.$t('messages.msg8'),
                        trigger: 'blur'
                    }
                ],
                passwordagain: [
                    {
                        required: true,
                        message: this.$t('messages.msg9'),
                        trigger: 'change'
                    },
                    {
                        min: 8,
                        max: 20,
                        message: this.$t('messages.msg8'),
                        trigger: 'change'
                    },
                    {
                        min: 8,
                        max: 20,
                        validator: (rule, value, callback) => {
                            if (value === '') {
                                callback(new Error(this.$t('messages.msg9')))
                            } else if (value !== this.modifypassword.newpwd) {
                                callback(new Error(this.$t('messages.msg10')))
                            } else {
                                callback()
                            }
                        },
                        trigger: 'change',
                        message: this.$t('messages.msg10')
                    }
                ]
            },
            state: {
                sendEmail: false,
                stepState: false,
                resetState: 1,
                codeState: false
            },
            modifypassword: {
                originalpwd: '',
                newpwd: '',
                passwordstrength: '',
                passwordagain: '',
            },
        }
    },
    methods: {
        goback() {
            this.$router.go(-1);
        },
        async popups(val) {
            if (val) {
                await this.$refs['modifypassword'].validate((valid) => {
                    if (valid) {
                        const _self = this;
                        if (_self.state.stepState) return;
                        _self.loading = true;
                        this.state.stepState = true
                        this.$store.dispatch("user_user_pwd_check",
                            { password: crypto.md5String(_self.modifypassword.originalpwd) })
                            .then(({ data }) => {
                                if (data) {
                                    _self.popupstate = val;
                                    if (_self.$userinfo.isgoogleauthed) {
                                    }
                                    _self.state.stepState = false;
                                    _self.loading = false;
                                } else {
                                    _self.state.stepState = false;
                                    _self.loading = false;
                                    return;
                                }
                            })
                    }
                })
            } else {
                this.popupstate = false;
            }
        },
        tomodifypassword(_childthis) {
            const _child = _childthis;
            const _self = this
            const _modifypassword = Object.assign({}, this.modifypassword);
            _modifypassword.newpwd = crypto.md5String(_modifypassword.newpwd)
            _modifypassword.originalpwd = crypto.md5String(_modifypassword.originalpwd)

            _modifypassword.googleverifycode =_child.activeTab==1?_child.verifyModel.googleverifycode:null;
            _modifypassword.emailverifycode =_child.activeTab==2? _child.verifyModel.emailverifycode:null;
            _modifypassword.smsverifycode =_child.activeTab==3? _child.verifyModel.smsverifycode:null

            this.$store.dispatch('user_user_password', _modifypassword)
                .then((res) => {
                    if (res.data) {
                        _self.popupstate = false;
                        _self.$store.commit('set_message', { type: 'ok', text: res.msg });
                        if (_self.$store.state.hex_uid.value) {
                            _self.$store.commit('set_user_info', res)
                        }
                        _self.$store.commit('remove_user_info');
                        _self.$router.push('/login')
                    } else {
                        _self.$refs.child.closeloading();
                    }
                })
                .then(() => {
                    // this.state.stepState = false
                })
        },
    },
}

</script>

<style></style>
