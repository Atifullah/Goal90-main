<template>
    <div id="bank-transfer">

        <div class="" v-if="!loading">
           

                <a-card class="payment-card" :bordered="false">
      <a-row :gutter="16" class="col-alignment">
        <a-col :lg="10">
          <p class="mb-0 ant-card-head-title fw-5">{{ !edit ? $t('termsofser.ts15') : $t('termsofser.ts16') }}</p>
        </a-col>
        <a-col :lg="14" align="end" v-if="!edit">
          <a-popover :title="false" :trigger="!securityCheckModel ? 'hover' : ''" placement="bottom"
            overlay-class-name="payment-method-popover">
            <template slot="content">

              <p class="bank-transfer fw-5 p-3 pointer  header-list" @click="bankTransfer">{{ $t('person.pp5') }}</p>

              <a-row :gutter="16" class="pointer col-alignment">

                <a-col :lg="24" @click="getAllC2CPaymentMethods">
                  <div class="more p-3 bank-transfer">
                    <div>{{ $t('person.notice_top_more') }} </div>
                    <div>
                      <img src="/images/more-method.svg" />
                    </div>
                  </div>
                </a-col>
              </a-row>
            </template>
            <a-button class="outline-btn fw-5" :disabled="securityCheckModel">
              <a-icon type="plus" />  Change Payment method</a-button>
          </a-popover>
        </a-col>
      </a-row>
    </a-card>
    <SelectPaymentMethod :model="model" :paymentMethodCollection="paymentMethodCollection" :toggleModel="toggleModel" :stateChange="true"/>





            <a-card :bordered="false" class="pb-5 bank-transfer" >
                <a-form-model ref="bankTransfer" :hide-required-mark="true" label-align="left"
                    :model="methodInfo.payconfiginfo">
                    <a-row>
                        <a-col :lg="{ span: 12, offset: 6 }" :xl="{ span: 10, offset: 7 }">
                            <p v-bind:style="bgc" class="transfer-heading fw-5 pl-2">
                                {{ method.payconfiginfo ? method.payconfiginfo.name : method.name }}</p>
                            <a-row :gutter="16">
                                <a-col :lg="24" v-for="(item, i) in methodInfo.payconfiginfo.fields" :key="i">
                                    <a-form-model-item has-feedback :label="item.fieldname" prop="fieldvalue" :key="i"
                                        :colon="false" :wrapper-col="{
                                            xl: 24,
                                            lg: 24,
                                            md: 24,
                                            sm: 24,
                                            xs: 24,
                                        }">
                                        <a-upload v-if="item.fieldcontenttype == 'qr_code'" name="avatar"
                                            list-type="picture-card" class="avatar-uploader" :show-upload-list="false"
                                            :multiple="false" @change="handleAvatarSuccess">
                                            <img v-if="item.fieldvalue" :src="item.fieldvalue" alt="avatar" height="100"
                                                width="100" />
                                            <div v-else>
                                                <a-icon :type="loading ? 'loading' : 'plus'" />
                                                <div class="ant-upload-text">
                                                    {{ $t('termsofser.ts12') }}
                                                </div>
                                            </div>
                                        </a-upload>
                                        <!-- <a-input v-else :readOnly="BankTransfer && item.fieldname == 'Name'" -->
                                        <a-input v-else :readOnly="item.fieldcontenttype=='payee'"
                                            v-model="item.fieldvalue" :id="item.fieldid" @change="validate(i)" />
                                    </a-form-model-item></a-col>
                            </a-row>
                            <a-row :gutter="16" class="mt-1">
                                <a-col :lg="24" class="pr-5">
                                    <p class="reminder-txt fw-5 mb-0">{{ $t('termsofser.ts13') }}</p>
                                    <p class="reminder-txt fw-5">
                                        {{ $t('termsofser.ts14') }}
                                    </p>
                                </a-col>
                            </a-row>
                            <a-row :gutter="16" class="pt-2">
                                <a-col :lg="12">
                                    <a-button class="mr-2 cancel-outline-btn fw-5 px-4" block
                                        @click="$router.go(-1)">Cancel</a-button>
                                </a-col>
                                <a-col :lg="12">
                                    <a-button class="primary-btn fw-5 px-4" block @click="OpenVerifyModel">Confrim</a-button>
                                </a-col>
                            </a-row>
                        </a-col>
                    </a-row>
                </a-form-model>
            </a-card>
        </div>
        <TradingRequirements :tradingRequirements="tradingRequirements" :close="closeTR" />
        <VerificationMethod v-if="verificationModel" :verificationModel="verificationModel" :close="close"
            @confirmPaymentMethod="confirmPaymentMethod" :loading="confirmloading" />
            <SecurityCheck :securityCheckModel="securityCheckModel" :close="closeSM" />
    </div>
</template>

<script>
import crypto from "@/plugins/axios/crypto";
import VerificationMethod from "@/components/person/PaymentMethod/PaymentModal/VerificationMethod";
import TradingRequirements from "@/components/p2p/Modals/TradingRequirements"
import SecurityCheck from "~/components/person/Security/SecurityModal/SecurityCheck.vue";
import SelectPaymentMethod from "@/components/person/PaymentMethod/PaymentModal/SelectPaymentMethod.vue";

export default {
    name: 'AddPaymentMethod',
    components: {
    VerificationMethod,
    TradingRequirements,
    SecurityCheck,
    SelectPaymentMethod,
},
    computed: {
        BankTransfer() {
            if (this.method?.payconfiginfo) {
                if (this.method.payconfiginfo.name == 'Bank Transfer') {
                    return true;
                }
            }
            else if (this.method.name == 'Bank Transfer') {
                return true;
            }
            else {
                return false;
            }
        }
    },
    data() {
        return {
            loading: true,
            confirmloading: false,
            method: null,
            verificationModel: false,
            tradingRequirements: false,
            methodInfo: null,
            edit: false,
            securityCheckModel: false,
            paymentMethodCollection:{},
            bgc: {
            },
            model:false
        }
    },
    watch:{
        "$store.state.selectedPayment": function (val) {
            if(val.identifier!=this.method.identifier){
                this.initialize()
            }

    },
    },
    methods: {
        toggleModel(model) {
      this.model = model;
      this.showAlpha = '';
      this.showrecommend = 4;
    },
        async getAllC2CPaymentMethods() {
      const _self = this;
      _self.toggleModel(true);
      try {
        let { data } = await _self.$store.dispatch('trading_c2c_all_payment_method_get', {
        });
        _self.paymentMethodCollection = data;
      } catch (error) {
        //console.log('Error', error);
      }
    },    async bankTransfer() {
      const _self = this;
      try {
        let { data } = await _self.$store.dispatch('trading_c2c_all_payment_method_get');
        const item = data.all.filter(item => item.name == 'Bank Transfer');
        this.$store.commit('setSelectedPayment',item[0])
     
      } catch (error) {
        //console.log('Error', error);
      }
    },
        validate(i) {
            let obj = this.$refs.bankTransfer.fields[i]
            if (this.methodInfo.payconfiginfo.fields[i].fieldvalue == '' && this.methodInfo.payconfiginfo.fields[i].isrequired) {
                this.$set(obj, 'validateState', "error");
                this.$set(obj, 'validateMessage', `${this.methodInfo.payconfiginfo.fields[i].fieldname} is required`);
            }
            else {
                this.$set(obj, 'validateState', "success");
                this.$set(obj, 'validateMessage', "");
            }
        },
        validateForm() {
            const _self = this;
            let errorFields = this.methodInfo.payconfiginfo.fields.filter((_f, i) => {
                if ((_f.fieldvalue == '' || !_f.fieldvalue) && _f.isrequired) {
                    let obj = this.$refs.bankTransfer.fields[i];
                    _self.$set(obj, 'validateState', "error");
                    _self.$set(obj, 'validateMessage', `${_self.methodInfo.payconfiginfo.fields[i].fieldname} is required`);
                    return _f;
                }
            })
            return errorFields.length < 1 ? true : false
        },
        closeTR() {
            this.tradingRequirements = false;
        },
        closeSM(){
            this.securityCheckModel = false;
        },
        OpenVerifyModel() {
            if (this.$userinfo.securitylevel < 2) {
                this.tradingRequirements = true;
                return;
            }

            if (!this.$userinfo.isopenpaypassword || !this.$userinfo.isgoogleauthed) {

                this.securityCheckModel = true;
                return;
            }


            const _self = this;
            if (_self.validateForm()) {
                _self.verificationModel = true
            }
        },
        handleAvatarSuccess(file) {
            const _this = this;
            file = file.file;
            let formData = new FormData();
            formData.append("file", file);
            let imgUrlBase64;
            if (file.name) {
                let reader = new FileReader();
                imgUrlBase64 = reader.readAsDataURL(file.originFileObj);
                reader.onload = function (e) {
                    _this.$store.dispatch("com_image_upload", {
                        imagetype: 'Payment',
                        imgbase64: (reader.result.split(','))[1],
                        width: '120',
                        height: '120',
                        filename: new Date().getTime() + Number(Math.random() * 1000000000) + "." + file.name
                    }).then(({ data }) => {
                        if (data) {
                            _this.methodInfo.payconfiginfo.fields.map(_f => {
                                if (_f.fieldcontenttype == 'qr_code') {
                                    _f.fieldvalue = data.imgurl;
                                }
                            })
                        }
                    })
                }
            }
        },
        async getPaymentMethodInfo() {
            const _self = this;
            try {
                let { data } = await _self.$store.dispatch('trading_c2c_payment_method_info', {
                    identifier: this.method.identifier,
                });
                _self.methodInfo.payconfiginfo = data;
                // if (_self.methodInfo.payconfiginfo.name == 'Bank Transfer') {
                    _self.methodInfo.payconfiginfo.fields.forEach((item) => {
                        if (item.fieldcontenttype=='payee') {
                            item.fieldvalue = _self.$userinfo.realname;
                        }
                    })
                // }
                this.loading = false;
            } catch (error) {
                this.$router.go(-1);
                //console.log('Error',error);
            }
        },
        async confirmPaymentMethod(verifyCode) {
            const _self = this;
            _self.confirmloading = true;
            const options = {};
            if (verifyCode.googleVerifyCode) {
                options.googleVerifyCode = verifyCode.googleVerifyCode;
            }
            if (verifyCode.payPassword) {
                options.paypassword = crypto.md5String(verifyCode.payPassword);
            }
            options.payConfig = this.methodInfo.payconfiginfo
            try {
                let data = await _self.$store.dispatch('user_user_payments_set', options).then((response) => {
                    if (response.code == 200) {
                        _self.confirmloading = false;
                        _self.$router.go(-1);
                    }
                    else {
                        _self.confirmloading = false;
                    }
                });
            } catch (error) {
                //console.log('Error',error);
                _self.confirmloading = false;
            }
        },
        close() {
            this.verificationModel = false;
        },
        initialize(){
            const _self = this;
        if (!this.$userinfo.uid) {
            this.$router.push('/login?returnurl=' + this.$route.path)
        }
        this.method = this.$store.state.selectedPayment
        if (this.method.payconfiginfo) {
            this.methodInfo = this.method;
            if (this.methodInfo.name == 'Bank Transfer') {
                this.method.payconfiginfo.fields.forEach((item) => {
                    if (item.fieldname == 'Name') {
                        item.fieldvalue = _self.$userinfo.realname;
                    }
                })
            }
            console.log(this.methodInfo)
            this.bgc = { "border-left": `3px solid ${this.method ? this.method.bgcolor : '#fff'}` }
            this.edit = true;
            this.loading = false;
        }
        else if (this.method.identifier) {
            this.methodInfo = {
                payconfiginfo: {
                    fields: []
                }
            }
            this.bgc = { "border-left": `3px solid ${this.method ? this.method.bgcolor : '#fff'}` }
            this.getPaymentMethodInfo();

        }
        else {
            this.$router.go(-1);
        }
        }
    },
    created() {
this.initialize()
    }
}
</script>

<style lang="scss">
@import '@/assets/scss/pages/user-center/bank-transfer.scss';
</style>
