<template>
    <div class="secuirty-level">
        <a-card :bordered="false" class="mb-3">
            <a-row :gutter="16" class="col-alignment">
                <a-col :lg="4" :xl="3" :xxl="2">
                    <div class="dummy-img">
                        <img :src="$userinfo.avatar?$userinfo.avatar:'/images/vector-img1.svg'" class="mr-2"/>
                    </div>
                </a-col>
                <a-col :lg="8" :xl="7" :xxl="7" class="pl-3">
                    <p class="user-id fw-5 mb-2 pb-1">UID：{{ $userinfo.uid }}
                    </p>
                    <p class="mb-2 last-login fw-5 pb-1">{{ $t("memberCenter.lastLoginTime") }}
                        {{ global_get_local_time($userinfo.lastlogintime).format("YYYY-MM-DD HH:mm:ss") }}</p>
                    <p class="mb-0 last-login fw-5 login-ip">IP: {{ checkIp($userinfo.lastloginip) }}</p>
                </a-col>
                <a-col :lg="9" :xl="8" :xxl="8">
                    <div class="levels px-4">
                        <p class="user-id fw-5  mb-2 mr-2 pb-1">{{ $t('memberCenter.safetyClass') }} </p>
                        <p class="last-login fw-5 mb-2 pb-1">{{$t('person.saftey_stren_person')}}: {{ $userinfo.securitylevel > 1 ? $t('formMenu.passwordStrong') : $userinfo.securitylevel > 0 ? $t('formMenu.passwordMiddle') : $t('formMenu.passwordWeak') }} </p>
                        <p class="mb-0"><a-progress :percent="securityLevel" :strokeColor="strokeColor"/></p>
                       
                    </div>
                </a-col>
                <a-col :lg="3" :xl="5" :xxl="6" align="end">
                    <img src="/images/security-icon.svg" class="security-row-icon"/>
                </a-col>

            </a-row>
        </a-card>
        <a-card class="security-level-card" :bordered="false">
            <a-row>
           
                <a-col :lg="24">
                    <a-row :gutter="16" class="col-alignment py-5 px-2 hover-affect">
                        <a-col :lg="1"><img src="/images/sms-notification.svg" /></a-col>
                        <a-col :lg="11" class="pl-5">
                            <a-row>
                                <a-col :lg="18">
                                    <p class="mb-1 security-list fw-5">{{ $t('formMenu.emailAuthentication') }}</p>
                                    <p class="mb-0 security-desc fw-4">
                                        {{ $t('formMenu.emailAuthentication') }}{{ $t('security.noteLoginTip') }}</p>
                                </a-col>
                            </a-row>
                        </a-col>
                        <a-col :lg="6">
                            <p class="security-num fw-5 pl-5"><img v-if="$userinfo.email"
                                    :src="$userinfo.isemailauthed ? '/images/verify-icon.svg' : '/images/filled-red-icon.svg'"
                                    class="mr-2" />{{ $userinfo.isemailauthed ? global_string_split($userinfo.email) : "" }}
                            </p>
                        </a-col>
                        <a-col :lg="6" align="end">
                            <a-button class="outline-btn fw-5" @click="openEmail('email')">{{ $userinfo.isemailauthed ?
                                $t('security.modify') : $t('formMenu.notOpenAuthod') }}</a-button>
                        </a-col>
                    </a-row>
                </a-col>

            </a-row>
            <a-row>
                <a-col :lg="24">
                    <a-divider class="my-0 security-divider" />
                </a-col>
                <a-col :lg="24">
                    <a-row :gutter="16" class="col-alignment py-5 px-2 hover-affect">
                        <a-col :lg="1"><img src="/images/message-notif.svg" /></a-col>
                        <a-col :lg="11" class="pl-5">
                            <a-row>
                                <a-col :lg="18">
                                    <p class="mb-1 security-list fw-5">{{ $t('formMenu.noteInputVerification') }}</p>
                                    <p class="mb-0 security-desc fw-4">{{ $t('formMenu.noteInputVerification') }}
                                        {{ $t('security.noteLoginTip') }}</p>
                                </a-col>
                            </a-row>
                        </a-col>
                        <a-col :lg="6">
                            <p class="security-num fw-5 pl-5"><img v-if="$userinfo.phone"
                                    :src="$userinfo.isphoneauthed ? '/images/verify-icon.svg' : '/images/filled-red-icon.svg'"
                                    class="mr-2" />{{ $userinfo.isphoneauthed ? global_string_split($userinfo.phone) : "" }}
                            </p>
                        </a-col>
                        <a-col :lg="6" align="end">
                            <a-button class="outline-btn" @click="openEmail('phone')">{{ $userinfo.isphoneauthed ?
                                $t('security.modify') : $t('formMenu.notOpenAuthod') }}</a-button>
                        </a-col>
                    </a-row>
                </a-col>

            </a-row>
            <a-row>
                <a-col :lg="24">
                    <a-divider class="my-0 security-divider" />
                </a-col>
                <a-col :lg="24">
                    <a-row :gutter="16" class="col-alignment py-5 px-2 hover-affect">
                        <a-col :lg="1"><img src="/images/setting-google.svg" /></a-col>
                        <a-col :lg="11" class="pl-5">
                            <a-row>
                                <a-col :lg="18">
                                    <p class="mb-1 security-list fw-5">{{ $t('formMenu.googleAuthentication') }}</p>
                                    <p class="mb-0 security-desc fw-4">{{ $t('security.jbindgoogle') }}</p>
                                </a-col>
                            </a-row>
                        </a-col>
                        <a-col :lg="6">
                        </a-col>
                        <a-col :lg="6" align="end">
                            <a-button @click="changeGoogle" class="outline-btn fw-5">{{ $userinfo.isgoogleauthed ?
                                $t('security.modify') : $t('formMenu.notOpenAuthod') }}</a-button>
                        </a-col>
                    </a-row>
                </a-col>
            </a-row>
            <a-row>
                <a-col :lg="24">
                    <a-divider class="my-0 security-divider" />
                </a-col>
                <a-col :lg="24">
                    <a-row :gutter="16" class="col-alignment py-5 px-2 hover-affect">
                        <a-col :lg="1"><img src="/images/lock-setting.svg" /> </a-col>
                        <a-col :lg="11" class="pl-5">
                            <a-row>
                                <a-col :lg="18">
                                    <p class="mb-1 security-list fw-5">{{ $t('security.loginPassword') }}</p>
                                    <p class="mb-0 security-desc fw-4">{{ $t('security.loginUse') }}</p>
                                </a-col>
                            </a-row>
                        </a-col>
                        <a-col :lg="6">
                            <p class="security-num fw-5 pl-5">********</p>
                        </a-col>
                        <a-col :lg="6" align="end">
                            <nuxt-link to='/person/security/password-change'><a-button class="outline-btn fw-5">{{
                                $t('security.modify') }}</a-button></nuxt-link>
                        </a-col>
                    </a-row>
                </a-col>

            </a-row>
  
            
        
         
            <a-row>
                <a-col :lg="24">
                    <a-divider class="my-0 security-divider" />
                </a-col>
                <a-col :lg="24">
                    <a-row :gutter="16" class="col-alignment py-5 px-2 hover-affect">
                        <a-col :lg="1"><img src="/images/setting-key.svg" /></a-col>
                        <a-col :lg="11" class="pl-5">
                            <a-row>
                                <a-col :lg="18">
                                    <p class="mb-1 security-list fw-5">{{ $t('security.paypassword') }}</p>
                                    <p class="mb-0 security-desc fw-4">{{ $t('security.payPasswordTip') }}</p>
                                </a-col>
                            </a-row>
                        </a-col>
                        <a-col :lg="6" class="pl-5">
                        </a-col>
                        <a-col :lg="6" align="end">
                            <a-button class="outline-btn fw-5" @click="openEmail('fundPassword')">{{ $userinfo.isopenpaypassword
                                ? $t('security.modify') : $t('formMenu.notOpenAuthod') }}</a-button>
                        </a-col>
                    </a-row>
                </a-col>
            </a-row>
        </a-card>
    <ErrorModal :object="message" :close="close" :show="errorModal" @close="close" @onOk="close"/>
    </div>
</template>

<script>
import ErrorModal from '~/components/App/ErrorModal.vue'

export default {
    data() {
        return {
            security: 0,
            reg: {
                ip: new RegExp("^((25[0-5]|2[0-4]\\d|((1\\d{2})|([1-9]?\\d)))\\.){3}(25[0-5]|2[0-4]\\d|((1\\d{2})|([1-9]?\\d)))")
            },
            errorModal:false,
            message:{}
        };
    },
    computed: {
        securityLevel() {
            if (this.$userinfo.securitylevel < 1) {
                return 30;
            }
            else if (this.$userinfo.securitylevel < 2) {
                return 60;
            }
            else {
                return 100;
            }
        },
        strokeColor() {
            if (this.$userinfo.secuirtylevel < 1) {
                return '#f6465d';
            }
            else if (this.$userinfo.securitylevel < 2) {
                return '#FFA500';
            }
            else {
                return '#0ECB81';
            }
        }
    },
    mounted() {
        //安全等级判断
        const _userInfo = this.$userinfo;
        if (_userInfo.isopenpaypassword && _userInfo.isphoneauthed && _userInfo.isgoogleauthed && _userInfo.isemailauthed) {
            this.security = 3;
        }
        else if ((_userInfo.isgoogleauthed && _userInfo.isemailauthed) || (_userInfo.isphoneauthed && _userInfo.isgoogleauthed)) {
            this.security = 2;
        }
        else {
            this.security = 1;
        }
    },
    methods: {
        checkIp(val) {
            return this.reg.ip.test(val) ? val : '--';
        },
        openEmail(val) {
            if (val == "phone") {
                if (this.$userinfo.isemailauthed) {
                    this.$router.push("/person/security/binding-mobile");
                }
                else {
                    this.set_message("Phone binding requirements","Please bind your email address first");
                }
            }
            else if (val == "email") {
                if (this.$userinfo.isphoneauthed) {
                    this.$router.push("/person/security/binding-email-google");
                }
                else {
                    this.set_message("Email binding requirements","Please Bind your phone first");
                }
            }
            else if (val == 'fundPassword') {
                if (this.$userinfo.isemailauthed && this.$userinfo.isphoneauthed && this.$userinfo.isgoogleauthed) {
                    this.$router.push("/person/security/password-capital");
                }
                else {
                    const emailCheck=this.$userinfo.isemailauthed?'':' Email '
                    const phoneCheck=this.$userinfo.isphoneauthed?'':' Phone '
                    const googleCheck=this.$userinfo.isgoogleauthed?'':' Google Autheticator '
                    const message="Please set "+emailCheck+phoneCheck+googleCheck+"to set your fund password"
                    this.set_message("Fund Password requirements",message);
                }
            }
        },
        openGoogle() {
            if (!this.$userinfo.isgoogleauthed) {
                this.$router.push("/person/security/google");
            }
        },
        changeGoogle() {
            this.$router.push("/person/security/google-change");
        },
        set_message(heading,message) {
            this.message={heading:heading,message:message}
            this.errorModal=true;
            // this.$store.commit('set_message', { type: 'error', text: message });
        },
        close(){
            this.errorModal=false
        }
    },
    components: { ErrorModal }
}
</script>

<style></style>
