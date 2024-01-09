<template>
    <a-form-model ref="registerForm" :model="signModel" :rules="setRegisterValidation.rules" :hide-required-mark="true"
        label-align="left">
        <a-row>
            <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                <a-form-model-item has-feedback :label="$t('labels.lbl9')" prop="phone" :colon="false" :wrapper-col="{
                    xl: 24,
                    lg: 24,
                    md: 24,
                    sm: 24,
                    xs: 24,
                }">
                    <vue-tel-input v-model="signModel.phone" mode="auto"
                        @blur="signModel.phone = Number(signModel.phone).toString()" v-on:country-changed="countryChanged"
                        :validCharactersOnly="true" :autoFormat="false"
                        :dropdownOptions="{ showFlags: true, showDialCodeInList: true, showSearchBox: true, showDialCodeInSelection: true, }"></vue-tel-input>
                </a-form-model-item>
            </a-col>
        </a-row>
        <a-row :gutter="10">
            <a-col :xs="24" :sm="24" :md="24" :lg="17" :xl="17">
                <a-form-model-item :label="$t('labels.lbl10')" prop="verifycode" has-feedback :colon="false" :wrapper-col="{
                    xl: 24,
                    lg: 24,
                    md: 24,
                    sm: 24,
                    xs: 24,
                }">
                    <a-input v-model="signModel.verifycode" :placeholder="$t('placeholders.plh10')" type="number" />
                </a-form-model-item>
            </a-col>
            <a-col :xs="24" :sm="24" :md="24" :lg="7" :xl="7">
                <a-form-model-item label=" " prop="v" has-feedback :colon="false" :wrapper-col="{
                    xl: 24,
                    lg: 24,
                    md: 24,
                    sm: 24,
                    xs: 24,
                }">
                    <a-button class="primary-btn fw-5" block @click="getCode('registerForm')">
                        {{ state.sendDelay }}</a-button>
                </a-form-model-item>
            </a-col>
        </a-row>
        <a-row>
            <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                <a-form-model-item :label="$t('labels.lbl6')" prop="password" has-feedback :colon="false" :wrapper-col="{
                    xl: 24,
                    lg: 24,
                    md: 24,
                    sm: 24,
                    xs: 24,
                }">
                    <a-input-password v-model="signModel.password" prop="password" :placeholder="$t('placeholders.plh7')" />
                </a-form-model-item>
            </a-col>
            <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                <a-form-model-item :label="$t('labels.lbl7')" prop="passwordagain" has-feedback :colon="false" :wrapper-col="{
                    xl: 24,
                    lg: 24,
                    md: 24,
                    sm: 24,
                    xs: 24,
                }">
                    <a-input-password v-model="signModel.passwordagain" prop="passwordagain"
                        :placeholder="$t('placeholders.plh8')" />
                </a-form-model-item>
            </a-col>
            <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                <a-form-model-item :label="$t('labels.lbl8')" prop="referee" has-feedback :colon="false" :wrapper-col="{
                    xl: 24,
                    lg: 24,
                    md: 24,
                    sm: 24,
                    xs: 24,
                }">
                    <a-input v-model="signModel.referee" prop="referee" :placeholder="$t('placeholders.plh9')" />
                </a-form-model-item>
            </a-col>
            <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                <a-checkbox v-model="state.check">
                    {{ $t('authentication.auth1') }}

                </a-checkbox>

                <a target="_blank" href="/terms/terms-of-service" class="text-black">
                    <span class="term-condition fw-5">{{ $t('authentication.auth2') }}
                    </span>
                </a>
            </a-col>
        </a-row>
        <a-row>
            <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" align="center">
                <a-button class="mt-4 mb-2 primary-btn fw-5" block @click="signUp('registerForm')"
                    :class="!state.check ? 'disabled-btn' : ''" :loading="state.signup"
                    :disabled="state.signup || !state.check">
                    {{ $t('authentication.auth3') }}
                </a-button>

            </a-col>
        </a-row>
    </a-form-model>
</template>
<script>
import crypto from "@/plugins/axios/crypto";
import verifycode from "@/components/public/verifycode.vue";
import terms from "@/components/public/terms-service.vue";

export default {
    props: {
      referee: {
        require: false,
        type: String,
        default: ''
      }
    },
    name: 'Phone',
    components: {
        verifycode,
        terms,
    },
    watch: {
        '$store.state.hex_lang.locale': function (val) {
            this.state.sendDelay = this.$i18n.t('formMenu.getCode');
            this.countryOptions.map((item) => {
                if (val == 'zh_cn') {
                    item.name = item.chname;
                } else {
                    item.name = item.engname;
                }
            })
        },
        'signModel.password': function (val) {
            const _signModel = this.signModel;
            if (this.reg.strong.test(val)) {
                _signModel.passwordstrength = 3
            } else if (this.reg.middle.test(val)) {
                _signModel.passwordstrength = 2
            } else if (this.reg.single.test(val)) {
                _signModel.passwordstrength = 1
            } else {
                _signModel.passwordstrength = 0
            }
        },
        'signModel.countryid': function (val) {
            this.state.country = this.countryOptions.find((item) => {
                return item.countryid == val
            })
        }
    },

    data() {
        return {
            lang: this.$store.state.hex_lang.locale,
            popupStatue: false,
            phoneformat: true,//false 手机号有误
            isphone: true,
            open: false,
            state: {
                sendDelayState: false,
                send: false,
                check: true,
                signup: false,
                country: {},
                sendDelay: this.$i18n.t('formMenu.getCode')
            },
            reg: {
                single: /^((?=.*[a-z])|(?=.*[A-Z])|(?=.*[0-9]))(?=.{8,})/g,
                middle: /^(((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[A-Z])))(?=.{8,})/g,
                strong: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*`~()_=/])(?=.{8,})/g
            },
            //注册model
            signModel: {
                signuptype: 'phone',
                phone: '',
                password: '',
                passwordagain: '',
                passwordstrength: '',
                source: '',
                referee: '',
                verifycode: '',
                countryid: '',
                countrycode: '',
                usertype: 0,
            },
            //验证model
            sendModel: {
                phone: '',
                areacode: '',
                template: 'Signup',
            },
            countryOptions: [],
            terms_channelid: 20,
            subtitle: 'yhxy',
            setRegisterValidation: {
                rules: {
                    phone: [
                        { required: true, message: this.$t('messages.msg11') },
                    ],
                    verifycode: [
                        { required: true, message: this.$t('messages.msg7') },
                    ],
                    password: [
                        { required: true, message: this.$t('messages.msg12'), trigger: 'blur' },
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
                                } else if (value !== this.signModel.password) {
                                    callback(new Error(this.$t('messages.msg10')))
                                } else {
                                    callback()
                                }
                            },
                            trigger: 'change',
                            message: this.$t('messages.msg10')
                        }
                    ]
                }
            },
        }
    },
    methods: {
        closeloading() {
            this.state.send = false;
        },
        filterOption(input, option) {
            return (
                option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
            );
        },

        countryChanged(event) {
            const areacode = event.dialCode
            const country = this.countryOptions.find((item) => {
                return item.areacode == areacode
            })
            this.state.country = {}
            if (country) {
                this.state.country = country
            }
        },
        async signUp(formName) {
            if (!this.state.check) return;
            const _self = this;
            const _sign = Object.assign({}, _self.signModel);

            if (_self.state.signup) return;
            await this.$refs[formName].validate((valid) => {
                if (valid) {
                    _self.state.signup = true;
                    const { areacode } = _self.state.country;
                    _sign.countrycode = areacode;
                    _sign.password = crypto.md5String(_sign.password);
                    delete _sign.passwordagain;
                    _self.$store.dispatch('user_user_signup', _sign)
                        .then((res) => {
                            if (res.data) {
                                _self.$store.commit('set_message', {
                                    type: 'ok',
                                    text: res.msg
                                });
                                _self.$store.commit('set_user_info', res);
                                location.href = '/person'
                            }
                        })
                        .then((data) => {
                            _self.state.signup = false
                        })
                }
            })
        },
        popup() {
            this.popupStatue = !this.popupStatue;
        },
        handleChange() {
            this.$refs.search.focus();
        },
        handleInputKeyDown(value, option) {
        },
        async getCode() {
            const _this = this;
            if (_this.state.send) return;
            _this.sendModel.phone = this.signModel.phone;
            _this.sendModel.areacode = this.state.country.areacode;

            await _this.$refs['registerForm'].validateField('phone', (errorMessage) => {
                if (!errorMessage) {
                    _this.state.send = true;
                    if (_this.signModel.countryid == '243') {
                        let patt1 = new RegExp(/^1\d{10}$/);
                        if (!patt1.test(_this.signModel.phone)) {
                            _this.state.send = false;
                            _this.$store.commit('set_message', { type: 'error', text: this.$t('formMenu.phoneFormatError') });
                        } else {
                            _this.$store.dispatch("user_user_exist", { phone: _this.signModel.phone }).then(({ data }) => {
                                if (data) {
                                    _this.state.send = false;
                                    _this.$store.commit('set_message', { type: 'error', text: this.$t('formMenu.exisPhone') });
                                } else {
                                    _this.$emit('register:sendCode', _this)
                                }
                            })
                        }
                    } else {
                        _this.$emit('register:sendCode', _this, 'phone')
                    }

                }
            })
        },
        getcoutrycode() {
            var _self = this;
            this.$store.dispatch("com_getlangbyip").then(({ data }) => {
                if (data && data.countrycode) {
                    var coutryinfos = _self.countryOptions.filter(item => {
                        return item.areacode == data.countrycode
                    });
                    if (coutryinfos.length > 0) {
                        _self.signModel.countryid = coutryinfos[0].countryid;
                    }
                }
            });
        },
        findAreaCode(phoneNumber, areaCodes) {
            // Remove non-numeric characters from the phone number
            const numericPhoneNumber = phoneNumber.replace(/\D/g, '');
            // Iterate through the array of area codes
            for (let i = 0; i < areaCodes.length; i++) {
                // Check if the phone number starts with the current area code
                if (numericPhoneNumber.startsWith(areaCodes[i].areacode)) {
                    const areaCodeLength = areaCodes[i].areacode.length;
                    return {
                     country:areaCodes[i],
                     phone:numericPhoneNumber.slice(areaCodeLength)

                    }
                }
            }
            return false;
        }

    },
    mounted() {
        this.signModel.referee = this.$route.query.invitecode ? this.$route.query.invitecode : '';
        this.signModel.referee = this.$route.query.invitecode ? this.$route.query.invitecode : '';
        this.$store.dispatch('com_country_getlist').then(({ data }) => {
            this.countryOptions = data;
            this.countryOptions.map((item) => {
                if (this.lang == 'zh_cn') {
                    item.name = item.name;
                } else {
                    item.name = item.engname;
                }
            });
            this.getcoutrycode();
            //getting number and country from state if stored
            const tempData = this.$store.getters["auth/getTempData"];
            if (tempData.phone) {
                const areaCodeTemp = this.findAreaCode(tempData.phone, data)
                if(areaCodeTemp){
                    this.state.country = areaCodeTemp.country.areacode
                this.signModel.phone = areaCodeTemp.phone
                }
            }

        })

    }
}
</script>
<style scoped lang="less">
.serve-tip {
    font-size: 14px;
    margin-left: 10px;
    cursor: pointer;
}

.flag {
    width: 20px;
    float: right;
    padding-top: 11px;
}
</style>
