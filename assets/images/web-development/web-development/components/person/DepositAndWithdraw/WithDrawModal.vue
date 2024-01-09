<template>
    <div class="with-draw-modal">
        <a-modal id="deposit-modal" v-model="withDrawModal" width="593px" :footer="false" :title="false" @cancel="close">
            <a-row :gutter="16" class="col-alignment mb-3">
                <a-col :lg="12">

                    <p class="deposit-crypto-head fw-5 mb-0">{{ $t('person.pd23') }}</p>
                </a-col>
                <a-col :lg="12" align="end"><img src="/images/ud-cross.svg" class="pointer"
                        @click="close" /></a-col>
            </a-row>
            <a-row :gutter="16" class="pt-2">
                <a-col :lg="24">
                    <a-tabs v-model="activeKey">
                        <a-tab-pane key="1" :tab="$t('tabkeys.tab46')">
                            <a-form-model ref="withdrawForm" :hide-required-mark="true" label-align="left" :model="withdraw"
                                :rules="rules">
                                <a-row class="" :gutter="16">
                                    <a-col :lg="24">
                                        <a-form-model-item has-feedback :label="$t('labels.lbl29')" prop="coin"
                                            :colon="false" :wrapper-col="{
                                                xl: 24,
                                                lg: 24,
                                                md: 24,
                                                sm: 24,
                                                xs: 24,
                                            }">
                                            <a-select style="width: 100%" class="mb-2" v-model="withdraw.currencySelected"
                                                :placeholder="$t('formMenu.select')" @change="currencyOnChange(false)">
                                                <a-select-option v-for="item in currencies" :key="item.id"
                                                    :value="item.currencyname">
                                                    <img :src="item.icon" class="mr-1" width="15" height="15" />
                                                    {{ item.currencyname }}</a-select-option>
                                            </a-select>
                                        </a-form-model-item>
                                    </a-col>

                                </a-row>
                                <a-row class="add-box">
                                    <a-col :lg="12" align="end" class="add-txt pointer"><nuxt-link
                                            to="/person/wallet-address"> {{ $t('person.pd24') }} </nuxt-link></a-col>
                                    <a-col :lg="12">
                                        <p class="step-heading fw-5 mb-2">{{ $t('person.Wallet_Address_person') }}</p>
                                    </a-col>
                                </a-row>
                                <a-row>
                                    <a-col :lg="24">

                                        <a-form-model-item has-feedback prop="withdrawalAddress" :colon="false"
                                            :wrapper-col="{
                                                xl: 24,
                                                lg: 24,
                                                md: 24,
                                                sm: 24,
                                                xs: 24,
                                            }">
                                            <a-auto-complete :filter-option="filterOption"
                                                v-model="withdraw.withdrawalAddress" @select="onAddressSelect"
                                                optionLabelProp="value">
                                                <template slot="dataSource">
                                                    <a-select-option v-for="item in dataSource" :key="item.address"
                                                        :value="item.address" :optionLabelProp="item.address">
                                                        <a-row :gutter="16">
                                                            <a-col :lg="6" :xl="6">
                                                                <p class="mb-0 smart-chain-txt fw-4">
                                                                    {{ item.userrealname ? item.userrealname :
                                                                        item.ctype.split('(')[0].toUpperCase() }} ( {{ item.remark }} )</p>
                                                                <p class="mb-0 smart-chain-txt fw-4 second-txt">
                                                                    {{ $t('person.pd25') }}</p>
                                                            </a-col>
                                                            <a-col :lg="18" :xl="18" align="end">
                                                                <p class="mb-0 smart-chain-txt fw-4 btc-secondtxt">{{ global_get_local_time(item.createtime).format('YYYY-MM-DD hh:mm a') }}
                                                                </p>
                                                                <p class="mb-0 first-bsc-txt fw-4 second-txt btc-secondtxt">
                                                                    {{ item.address }}</p>
                                                            </a-col>
                                                        </a-row>
                                                    </a-select-option>
                                                    <a-select-option key="sdsdcs">
                                                        <nuxt-link to="/person/wallet-address">
                                                            <p class="mb-0 mt-1 text-center add-myself-address fw-5 py-2">
                                                                {{ $t('person.pd26') }}</p>
                                                        </nuxt-link>
                                                    </a-select-option>
                                                </template>

                                            </a-auto-complete>
                                        </a-form-model-item>
                                        <a-row :gutter="16" class="col-alignment wallet-green-txt mb-2" v-show="local">
                                            <a-col :lg="20">
                                                <p class="mb-0 green-account-wallet">{{ $t('person.pd27') }}: {{ local }}
                                                </p>
                                            </a-col>
                                            <a-col :lg="4" align="end"><img class="pointer"
                                                    src="/images/green-bg-arrow.svg"
                                                    @click="internalTransfer" /></a-col>
                                        </a-row>
                                    </a-col>
                                </a-row>
                                <a-row>
                                    <a-col :lg="24">
                                        <a-form-model-item has-feedback :label="$t('labels.lbl31')" prop="networkType"
                                            :colon="false" :wrapper-col="{
                                                xl: 24,
                                                lg: 24,
                                                md: 24,
                                                sm: 24,
                                                xs: 24,
                                            }">
                                            <a-select v-model="radio" style="width:100%" class="mb-2"
                                                :placeholder="$t('placeholders.plh31')" @change="onNetworkChange">
                                                <a-select-option v-for="(item, i) in mainChains" :key="i"
                                                    :disabled="valid && radio == i">
                                                    <a-row :gutter="16">
                                                        <a-col :lg="12" :xl="12">
                                                            <p class="mb-0 first-bsc-txt fw-4 bold-header">
                                                                {{ item.maichina.toUpperCase() }}</p>
                                                            <p class="mb-0 smart-chain-txt fw-4 second-txt">
                                                                {{ $t('person.pd28') }}:
                                                                {{ item.arrivaltime }}</p>
                                                        </a-col>
                                                        <a-col :lg="12" :xl="12" align="end">
                                                            <p class="mb-0 first-bsc-txt fw-4  btc-secondtxt">
                                                                {{ item.tokenfullname }} ({{ item.tokentype.toUpperCase()
                                                                }})
                                                            </p>
                                                            <p class="mb-0  smart-chain-txt fw-4 second-txt btc-secondtxt">
                                                                {{ $t('person.pd29') }}: {{ item.withdrawalfee }}</p>
                                                        </a-col>
                                                    </a-row>
                                                </a-select-option>
                                            </a-select>
                                        </a-form-model-item>
                                    </a-col>
                                </a-row>
                                <a-row>
                                    <a-col :lg="24">
                                        <a-row class="add-box">
                                            <a-col :lg="24" align="end" class="add-txt add-txt1">
                                                <p class="available-txt fw-4 mb-0">
                                                    {{ $t('person.pd17') }} {{ availableAssets.toFixed(2) }}  {{ withdraw.currencySelected }}
                                                </p>
                                            </a-col>
                                            <a-col :lg="24">
                                                <a-form-model-item has-feedback :label="$t('labels.lbl30')" prop="amount"
                                                    :colon="false" :wrapper-col="{
                                                        xl: 24,
                                                        lg: 24,
                                                        md: 24,
                                                        sm: 24,
                                                        xs: 24,
                                                    }">
                                                    <a-input :placeholder="$t('placeholders.plh28')" type="number"
                                                        v-model="withdraw.amount">
                                                        <span slot="suffix" class="pointer" @click="withdraw.amount=availableAssets">All</span>

                                                    </a-input>
                                                </a-form-model-item>
                                            </a-col>
                                        </a-row>

                                    </a-col>
                                </a-row>
                                <a-row class="">
                                    <a-col :lg="12">
                                        <p class="network-inch fw-5 mb-2">{{ $t('person.pd30') }}</p>
                                    </a-col>
                                    <a-col :lg="12" align="end">
                                        <p class="network-inch fw-5 mb-2 active">{{ fee }} {{ withdraw.currencySelected }}</p>
                                    </a-col>

                                </a-row>

                                <a-card class="gray-card mt-2" v-if="radio >= 0 && mainChains.length > 0">
                                    <p class="important-txt fw-5 mb-2">{{ $t('person.pd4') }}:</p>
                                    <div class="scroll scroll-withdraw-note">
                                        <ul class="important-list">
                                            <li class="important-txt-desc fw-4">{{ $t('person.pd31') }}</li>
                                            <li class="important-txt-desc fw-4">{{ `Minimum withdrawal amount:
                                                ${mainChains[radio].minwithdrawalamount}
                                                                                            ${withdraw.currencySelected}(${mainChains[radio].tokentype})` }}</li>
                                            <li class="important-txt-desc fw-4">{{ $t('person.pd32') }}
                                            </li>
                                            <li class="important-txt-desc fw-4">{{ $t('person.pd6') }}
                                            </li>
                                        </ul>
                                    </div>
                                </a-card>
                                <a-row>
                                    <a-col :lg="24">
                                        <p class="limit-btc fw-4 my-4">{{ $t("memberCenter.limit") }}: {{
                                            withdrawallimitleft.toFixed(2) }}
                                            {{ withdraw.currencySelected }} <span
                                                class="detail-txt increase limit-tip ml-1">
                                                <nuxt-link to="/person/authentication">{{
                                                    $t("memberCenter.promoteLimit")
                                                }}
                                                </nuxt-link></span></p>
                                    </a-col>
                                </a-row>
                                <a-row :gutter="16">
                                    <a-col :lg="12">
                                        <a-button class="cancel-outline-btn fw-5" block @click="close">{{ $t('person.pd18')
                                        }}</a-button>
                                    </a-col>
                                    <a-col :lg="12">
                                        <a-button class="primary-btn fw-5" block @click="submit">{{ $t('person.pd19')
                                        }}</a-button>
                                    </a-col>
                                </a-row>
                            </a-form-model>
                        </a-tab-pane>
                        <a-tab-pane key="2" :tab="$t('tabkeys.tab47')">
                            <InternalTransfer ref="internal" :selectedCurrency="withdraw.currencySelected"
                                :currencies="$store.state.currencyinfos" :assets="assets" :uid="local" :close="close" />
                        </a-tab-pane>
                    </a-tabs>
                </a-col>
            </a-row>
        </a-modal>
        <VerificationModal :verificationModel="verificationModel" @onClose="closeVerificationModel" :confirmAuth="withDraw"
            :loading="verifying" />
        <SuccessModal :successModel="successModel" :show="showSuccessModal" @onOk="closeSuccessModal" />



    </div>
</template>

<script>
import crypto from "@/plugins/axios/crypto";
import VerificationModel from './VerificationModel.vue'
import InternalTransfer from './InternalTransfer.vue'
import VerificationModal from "~/components/App/VerificationModal.vue";
import SuccessModal from "~/components/App/SuccessModal.vue";
export default {
    components: {
        VerificationModel,
        InternalTransfer,
        VerificationModal,
        SuccessModal
    },
    props: {
        withDrawModal: {
            type: Boolean
        },
        selectedRow: {
            type: Object
        },
        close: {
            type: Function
        }
    },
    computed: {
        getYouRecieve() {
            if (this.withdraw.amount == 0) {
                return 0;
            }
            const fee = this.radio >= 0 && !this.local ? parseFloat(this.mainChains[this.radio].withdrawalfee) : 0;
            return this.amount - fee;
        },
        fee() {
            if (!this.local && this.mainChains[this.radio]) {
                return this.mainChains[this.radio].withdrawalfee;
            }
            else {
                return 0;
            }
        },
        selfRoute: function () {
            return this.$store.state.route;
        },
    },
    data() {
        return {
            activeKey: "1",
            withdraw: {
                currencySelected: '',
                withdrawalAddress: this.$t('returntxt.rtxt7'),
                amount: 0,
            },
            assets: [],
            availableAssets: 0,
            currencies: [],
            radio: -1,
            mainChains: [],
            withdrawalLimit: 0,
            left: 0,
            withdrawallimitleft: 0,
            payPassword: '',
            googleVerifyCode: '',
            dataSource: [],
            loading: true,
            verificationModel: false,
            valid: true,
            local: false,
            verifying: false,
            successModel: { heading: '', message: '' },
            showSuccessModal: false,
            rules: {
                currencySelected: [
                    {
                        required: true, message: this.$t('messages.msg27')
                    }
                ],
                withdrawalAddress: [
                    {
                        required: true, message: this.$t('messages.msg28'), trigger: 'blur'
                    },
                    {
                        validator: async (rule, value, callback) => {
                            if (this.withdraw.withdrawalAddress === '') {
                                callback(new Error(this.$t('messages.msg28')))
                            } else {
                                const validateAddress = await this.isAddressValid()
                                if (!validateAddress) {
                                    callback(new Error(this.$t('messages.msg29')))
                                }
                                else {
                                    callback()
                                }

                            }
                        },
                        trigger: 'blur',
                        message: this.$t('messages.msg29')
                    }
                ],
                amount: [
                    {
                        required: true, message: this.$t('messages.msg16')
                    },
                     {
                        validator: async (rule, value, callback) => {
                            if (this.withdraw.amount > this.withdrawallimitleft) {
                                 callback(new Error((this.$t('errors.err17'))))
                            } else if (this.withdraw.amount < parseInt(this.mainChains[this.radio].minwithdrawalamount)) {
                                callback(new Error((this.$t('errors.err18'))))
                            } else if (this.withdraw.amount > parseInt(this.mainChains[this.radio].maxwithdrawalamount)) {
                                callback(new Error(this.$t('errors.err19')))
                            } else if (this.withdraw.amount > this.availableAssets) {
                                callback(new Error(this.$t(this.$t('errors.err20'))))
                            } else {
                                callback()
                            }
                        },
                        trigger: 'change',
                    }
                ]

            }
        }
    },
    methods: {
        async copyToClipboard() {
            try {
                await navigator.clipboard?.writeText(this.depositAddress);
            } catch (e) {
                //console.log(e);
            }
        },
        goToAddressBook() {
            const baseURL = `http://${process.env.HOST || 'localhost'}:${process.env.PORT || 9088}`;
            this.$router.push(`${baseURL}/person/address`)
        },
        async getChains(ctype) {
            this.withdraw.amount = '';
            if (!ctype) {
                this.withdraw.withdrawalAddress = '';
                this.$refs['withdrawForm']?.clearValidate(['withdrawalAddress', 'amount']);
            }
            if (!this.withdraw.currencySelected == '') {
                const _self = this;
                _self.mainChains = [];
                // _self.radio = -1;
                _self.depositAddress = '';
                try {
                    let { data } = await _self.$store.dispatch('get_user_deposit_and_withdrawl_configuration', {
                        token: this.withdraw.currencySelected.toLowerCase(),
                    });
                    if (data) {
                        this.mainChains = data.mainchains;
                        if (!ctype) {
                            _self.radio = this.mainChains.length - 1;
                        }
                        else {
                            this.mainChains.filter((_m, i) => {
                                if (_m.maichina == ctype.split('(')[0].toLowerCase()) {
                                    this.radio = i;
                                }
                            })
                        }
                    }
                } catch (error) {
                    //console.log('Error', error);
                }
            }
        },
        async getWithdrawalLimit() {
            const _self = this;
            try {
                let { data } = await _self.$store.dispatch('user_serwithdraw_maxmount_get');
                if (data) {
                    this.left = data;
                    // console.log(data,this.withdraw.currencySelected)
                    if (this.withdraw.currencySelected !== 'BTC') {
                        const usdtprice=this.$store.getters.get_exchange_rate_by_name('USDT', 'BTC')
                        this.withdrawallimitleft = parseInt(data) * parseFloat(usdtprice/this.$store.getters.get_exchange_rate_by_name(this.withdraw.currencySelected, 'usdt'));
                    }
                    else {
                        this.withdrawallimitleft = data;
                    }

                }
            } catch (error) {
                //console.log('Error', error);
            }
        },
        async getUserAssets() {
            const _self = this;
            try {
                let { data } = await _self.$store.dispatch('user_assets_get');
                this.assets = this.getAssetsInfos(data, 1);
                this.assets.filter(asset => {
                    if (asset.currency.currencyname == this.withdraw.currencySelected) {
                        _self.availableAssets = asset.canuseamount;
                    }
                })
            } catch (error) {
                //console.log('Error', error);
            }
        },
        async onNetworkChange(e) {
            await this.$refs['withdrawForm'].validateField('withdrawalAddress');
        },
        onAddressSelect(value) {
            this.dataSource.filter(_d => {
                if (_d.address == value) {
                    this.withdraw.currencySelected = _d.currencyname;
                    this.$set(this.withdraw, 'withdrawalAddress', value);
                    this.currencyOnChange(_d.ctype);
                }
            });
        },
        async isAddressValid() {
            const _self = this;
            try {
                const id = this.getCurrencyId(this.withdraw.currencySelected)
                let { data } = await _self.$store.dispatch('user_user_withdraw_address_check', {
                    currencyID: id,
                    address: this.withdraw.withdrawalAddress,
                    cType: this.mainChains[this.radio].maichina,
                });
                this.valid = data ? data : false;
                if (this.valid) {
                    this.isAddressLocal(id);
                }
                else {
                    this.local = false;
                }
                return this.valid
            } catch (error) {
                //console.log('Error', error);
                return false;
            }
        },
        async isAddressLocal(id) {
            const _self = this;
            try {
                let { data } = await _self.$store.dispatch('user_user_withdraw_address_check_isin', {
                    currencyID: id,
                    address: this.withdraw.withdrawalAddress,
                    cType: this.mainChains[this.radio].maichina,
                });
                if (data && data != 0)
                    this.local = data;
                else
                    this.local = false;
            } catch (error) {
                //console.log('Error', error);
            }
        },
        async withDraw(verifycode) {
            const _self = this;
            try {
                const options = {};
                options.googleVerifyCode = verifycode.googleVerifyCode;

                options.paypassword = verifycode.paypassword
                options.amount = _self.withdraw.amount;
                options.currencyID = _self.getCurrencyId(_self.withdraw.currencySelected);
                options.fee = !this.local && this.mainChains[this.radio] ? this.mainChains[this.radio].withdrawalfee : 0;
                options.address = this.withdraw.withdrawalAddress;
                options.cType = this.mainChains[_self.radio].maichina;
                this.verifying = true
                const resp = await _self.$store.dispatch('user_assets_withdraw', options)
                this.verifying = false
                
                if (resp.code == 200) {
                    this.closeVerificationModel();
                    this.showSuccessModal = true
                    this.successModel = {
                        heading: 'Message',
                        message: resp.msg
                    }
                }


            } catch (error) {
                //console.log('Error', error);
            }
        },
        closeSuccessModal() {
            this.showSuccessModal = false
            this.successModel = { heading: '', message: '' }
            this.close();
            this.$router.push({
                path: this.selfRoute.walletHistory + '?tab=withdraw'
            })
        },
        async submit() {
            await this.$refs['withdrawForm'].validate((valid) => {
                if (valid) {
                    this.verificationModel = true;
                }
            })

        },
        closeVerificationModel() {
            this.verificationModel = false;
        },
        getCurrencyId(name) {
            const currency = this.currencies?.filter(_c => _c.currencyname == name);
            return currency[0]?.id;
        },
        async getListAddresses() {
            try {
                let array = [];
                let { data } = await this.$store.dispatch('user_withdraw_address_search', {
                    pageindex: 1,
                    currencyId: this.getCurrencyId(this.withdraw.currencySelected),
                    pagesize: 120
                });

                if (data) {
                    data.pagedata.forEach(_d => {
                        array.push(_d);
                    });
                    this.dataSource = array;
                }
                else {
                    this.dataSource = [];
                }
            } catch (error) {
                //console.log('Error', error);
            }
        },
        filterOption(input, option) {
            return (
                option.key.toUpperCase().indexOf(input.toUpperCase()) >= 0
            );
        },
        internalTransfer() {
            this.activeKey = "2";
        },
        currencyOnChange(ctype) {
            const _self = this;
            _self.local = false;
            if (this.withdraw.currencySelected !== 'BTC') {
                // this.withdrawalLimit = this.$userinfo.withdrawlimtperday * this.$store.getters.get_exchange_rate_by_name(this.withdraw.currencySelected, 'btc');
                // this.withdrawallimitleft = this.left * this.$store.getters.get_exchange_rate_by_name(this.withdraw.currencySelected, 'btc');
                const usdtprice=this.$store.getters.get_exchange_rate_by_name('USDT', 'BTC')
                        this.withdrawallimitleft = this.left * parseFloat(usdtprice/this.$store.getters.get_exchange_rate_by_name(this.withdraw.currencySelected, 'usdt'));
            }
            else {
                this.withdrawalLimit = this.$userinfo.withdrawlimtperday;
                this.withdrawallimitleft = this.left;
            }
            this.assets.filter(asset => {
                if (asset.currency.currencyname == this.withdraw.currencySelected) {
                    _self.availableAssets = asset.canuseamount;
                }
            })
            this.getChains(ctype);
            this.getListAddresses();
        },

    },
    mounted() {
        this.currencies = this.$store.state.currencyinfos.filter(item=>item.iscanwithdraw===true);
        this.withdraw.currencySelected = this.selectedRow.currency.currencyname;
        if (this.withdraw.currencySelected !== 'BTC') {
            this.withdrawalLimit = this.$userinfo.withdrawlimtperday * this.$store.getters.get_exchange_rate_by_name(this.withdraw.currencySelected, 'btc');
        }
        else {
            this.withdrawalLimit = this.$userinfo.withdrawlimtperday;
        }
        this.currencyOnChange();
        this.getWithdrawalLimit();
        this.getUserAssets();
        this.getListAddresses();
    }
}
</script>

<style></style>
