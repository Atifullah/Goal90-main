<template>
    <div class="add-address">
        <a-modal id="wallet-detail-modal" v-model="addAddressModal" width="593px" :footer="false" :title="false"
            @cancel="close">
            <a-row :gutter="16" class="col-alignment">
                <a-col :lg="16">
                    <p class="deposit-heading fw-5 mb-0">{{$t('person.pdd1')}}</p>
                </a-col>
                <a-col :lg="8" align="end"><img src="/images/ud-cross.svg" class="pointer"
                        @click="close" /></a-col>
            </a-row>
            <a-form-model :hide-required-mark="true" label-align="left" ref="addAddress" :model="add" :rules="rules">
                <a-row :gutter="16" class="mt-4">
                    <a-col :lg="12">
                        <a-form-model-item has-feedback :label="$t('labels.lbl68')" prop="currencySelected" :colon="false" :wrapper-col="{
                            xl: 24,
                            lg: 24,
                            md: 24,
                            sm: 24,
                            xs: 24,
                        }">
                            <a-select style="width: 100%" class="mb-3" v-model="add.currencySelected"
                                :placeholder="$t('formMenu.select')" @change="currencyOnChange">
                                <a-select-option v-for="item in currencies" :key="item.id" :value="item.currencyname">
                                    <img :src="item.icon" class="mr-1" width="15" height="15" />
                                    {{ item.currencyname }}</a-select-option>
                            </a-select>
                        </a-form-model-item>
                    </a-col>
                    <a-col :lg="12">
                        <a-form-model-item has-feedback :label="$t('labels.lbl31')" prop="withdrawalMethod" :colon="false"
                            :wrapper-col="{
                                xl: 24,
                                lg: 24,
                                md: 24,
                                sm: 24,
                                xs: 24,
                            }">
                            <a-select v-model="radio" style="width:100%" class="mb-3" :placeholder="$t('placeholders.plh31')"
                                @change="add.address = ''">
                                <a-select-option v-for="(item, i) in mainChains" :key="i">
                                    <a-row :gutter="16">
                                        <a-col :lg="12" :xl="12">{{ item.tokenfullname }}</a-col>
                                        <a-col :lg="12" :xl="12" align="end"> ({{ item.tokentype.toUpperCase() }})</a-col>
                                    </a-row>
                                </a-select-option>
                            </a-select>
                        </a-form-model-item>
                    </a-col>

                </a-row>
                <a-row :gutter="16">

                    <a-col :lg="24" class="">
                        <a-checkbox v-model="isPublicAddress">{{$t('person.pdd2')}}</a-checkbox>
                        <p class="address-desc fw-4 mb-0">{{$t('person.pdd3')}}</p>
                    </a-col>
                    <a-col :lg="24">
                        <a-form-model-item has-feedback :label="$t('labels.lbl69')" prop="address" :colon="false"
                            :wrapper-col="{
                                xl: 24,
                                lg: 24,
                                md: 24,
                                sm: 24,
                                xs: 24,
                            }">
                            <a-input :placeholder="$t('placeholders.plh50')" v-model="add.address" />
                        </a-form-model-item>
                    </a-col>
                    <a-col :lg="24">
                        <a-form-model-item has-feedback :label="$t('labels.lbl70')" prop="remarks" :colon="false" :wrapper-col="{
                            xl: 24,
                            lg: 24,
                            md: 24,
                            sm: 24,
                            xs: 24,
                        }">
                            <a-input :placeholder="$t('placeholders.plh51')" v-model="add.remarks" />
                        </a-form-model-item>
                    </a-col>
                    <a-col :lg="24" class="pt-2">
                        <a-checkbox v-model="isWhiteList">{{$t('person.pdd4')}}</a-checkbox>
                        <p class="address-desc fw-4">{{$t('person.pdd5')}}
                        </p>
                    </a-col>
                </a-row>
                <a-row :gutter="16" class="mt-2">
                    <a-col :lg="12"><a-button class="cancel-outline-btn fw-5" block @click="close">{{$t('person.pd18')}}</a-button></a-col>
                    <a-col :lg="12"><a-button class="primary-btn fw-5" block @click="confirm">{{$t('person.pd19')}}</a-button></a-col>

                </a-row>
            </a-form-model>
        </a-modal>
        <addSecurityVerificationModal :addSecurityVerificationModal="addSecurityVerificationModal" :close="close" />
        <VerificationMethod v-if="verificationModel" :verificationModel="verificationModel" :close="closeVerificationModel"
            @confirmPaymentMethod="addAddress" :loading="loading"/>
    </div>
</template>

<script>
import addSecurityVerificationModal from '../WalletAddress/AddSecurityVerificationModal'
import VerificationMethod from "../PaymentMethod/PaymentModal/VerificationMethod"
import crypto from "@/plugins/axios/crypto";
export default {
    components: {
        addSecurityVerificationModal,
        VerificationMethod
    },
    props: {
        addAddressModal: {
            type: Boolean
        },
        close: {
            type: Function
        },
        getListAddresses: {
            type: Function
        }
    },
    data() {
        return {
            addSecurityVerificationModal: false,
            verificationModel: false,
            loading: false,
            addstate: false,
            isPublicAddress: true,
            isWhiteList: true,
            currencies: [],
            radio: '',
            valid: '',
            mainChains: [],
            add: {
                currencySelected: 'USDT',
                address: '',
                remarks: ''
            },
            rules: {
                address: [
                    {
                        required: true, message: this.$t('messages.msg49'), trigger: 'blur'
                    },
                    {
                        validator: async (rule, value, callback) => {
                            if (this.add.address === '') {
                                callback(new Error(this.$t('messages.msg49')))
                            } else {
                                const validateAddress = await this.isAddressValid()
                                if (!validateAddress) {
                                    callback(new Error(this.$t('messages.msg50')))
                                }
                                else {
                                    callback()
                                }

                            }
                        },
                        trigger: 'blur',
                        message: this.$t('messages.msg50')
                    }
                ],
            }
        }
    },
    methods: {
        async getChains() {
            if (!this.add.currencySelected == '') {
                const _self = this;
                _self.mainChains = [];

                try {
                    let { data } = await _self.$store.dispatch('get_user_deposit_and_withdrawl_configuration', {
                        token: this.add.currencySelected.toLowerCase(),
                    });
                    if (data) {
                        this.mainChains = data.mainchains;
                        _self.radio = this.mainChains.length - 1;
                    }
                    else {
                        _self.radio = 'No Chain Found..!!!';
                    }
                } catch (error) {
                    //console.log('Error', error);
                }
            }
        },
        getCurrencyId(name) {
            const currency = this.currencies?.filter(_c => _c.currencyname == name);
            return currency[0]?.id;
        },
        async isAddressValid() {
            const _self = this;
            try {
                const id = this.getCurrencyId(this.add.currencySelected)
                let { data } = await _self.$store.dispatch('user_user_withdraw_address_check', {
                    currencyID: id,
                    address: this.add.address,
                    cType: this.mainChains[this.radio].maichina,
                });
                this.valid = data ? data : false;
                return this.valid
            } catch (error) {
                //console.log('Error', error);
                return false;
            }
        },
        addAddress(verifycode) {
            const _self = this
            let postData = {};
            if (verifycode.googleVerifyCode) {
                postData.googleVerifyCode = verifycode.googleVerifyCode
            }
            else {
                postData.payPassword = crypto.md5String(verifycode.payPassword);
            }
            postData.address = _self.add.address;
            postData.cType = this.mainChains[this.radio].maichina;
            postData.remeark = this.add.remarks
            postData.currencyID = _self.getCurrencyId(_self.add.currencySelected);
            postData.isPublicAddress = _self.isPublicAddress;
            postData.isWhiteList = _self.isWhiteList;
            if (_self.addstate) return
            _self.addstate = true
            this.loading = true;
            _self.$store.dispatch('user_user_withdraw_address_add', postData)
                .then(({ data, msg }) => {
                    if (data) {
                        _self.$store.commit('set_message', {
                            type: 'ok', text: msg
                        })
                        this.getListAddresses(1);
                    } else {
                        _self.addstate = false;
                        _self.loading = false;
                    }
                    _self.closeVerificationModel();
                    _self.close();
                })
                .then(() => {
                    _self.addstate = false;
                    _self.loading = false;
                })
        },
        currencyOnChange() {
            const _self = this;
            this.getChains();
        },
        closeVerificationModel() {
            this.verificationModel = false;
        },
        async confirm() {
            await this.$refs['addAddress'].validate((valid) => {
                if (valid) {
                    this.verificationModel = true;
                }
            })
        }
    },
    mounted() {
        this.currencies = this.$store.state.currencyinfos.filter(item=>item.iscanwithdraw===true);
        this.currencyOnChange(); 
    }
}
</script>

<style></style>
