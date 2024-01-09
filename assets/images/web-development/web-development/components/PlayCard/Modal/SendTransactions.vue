<template>
    <div class="send-transactions">
        <a-modal id="send-play-modal" wrapClassName="userForm" v-model="show" :footer="false" :title="false" @cancel="close"
            width="450px" :maskClosable="false">
            <a-form-model :model="form" :hide-required-mark="true" ref="sendCryptoForm" label-align="left"
                :rules="setValidation.rules">
                <a-row :gutter="16" class="col-alignment">
                    <a-col :lg="18">
                        <p class="user-heading fw-6 mb-0">Send to user</p>
                    </a-col>
                    <a-col :lg="6" align="end">
                        <img src="/images/close-btn.svg" @click="close" class="pointer" />
                    </a-col>
                </a-row>

                <div>
                    <!-- <p class="mb-0 send-desc">Please enter a name for this project.</p> -->
                    <a-row :gutter="16" class="mt-2">

                        <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                            <a-form-model-item has-feedback label="User ID" prop="to" :colon="false">
                                <a-input type="number" placeholder="Enter your user id" v-model="form.to" />
                            </a-form-model-item>
                        </a-col>

                        <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" v-if="toUser.nickname">
                            <p class="mb-2 info-title fw-5">Send to</p>
                            <a-card class="user-info-card mb-2" :bordered="false">
                                <a-row :gutter="16" class="col-alignment">
                                    <a-col :lg="3">
                                        <img :src="toUser.avatar" height="30" />
                                    </a-col>
                                    <a-col :lg="21">
                                        <p class="mb-0 user-email fw-5">{{ toUser.email }}</p>
                                        <p class="mb-0 nick-name fw-5">{{ toUser.nickname }}</p>
                                    </a-col>
                                </a-row>
                            </a-card>
                        </a-col>

                        <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                            <a-form-model-item has-feedback :label="$t('labels.lbl62')" prop="currencyID" :colon="false">
                                <a-select :placeholder="$t('labels.lbl62')" dropdownClassName="send-dropdown"
                                    v-model="form.currencyID" @change="sleectCurrency">
                                    <span slot="suffixIcon">
                                        <a-icon type="caret-down" />
                                    </span>
                                    <a-select-option v-for="item in currencyinfos" :key="item.id"
                                        v-if="filterFiatOptions(item.currencyname.toLowerCase())">
                                        <img :src="item.icon" height="15" width="15" class="mr-1 mb-1" /> {{
                                            item.currencyname }}
                                    </a-select-option>
                                </a-select>
                            </a-form-model-item>
                        </a-col>



                        <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                            <a-row class="mb-2 pb-1 balance pt-2">
                                <a-col :lg="8">
                                    <label> <b>Amount</b> </label>
                                </a-col>
                                <a-col :lg="16" class="text-right">
                                    <label> <b>{{ availableBalance }} {{ selectedCurrency }}</b> </label>
                                </a-col>
                            </a-row>
                            <a-form-model-item has-feedback prop="amount" :colon="false">
                                <a-input placeholder="Enter your amount" v-model="form.amount" type="number" />
                            </a-form-model-item>
                        </a-col>
                    </a-row>

                    <a-row :gutter="16" class="mt-3 mb-2 px-1">
                        <a-col :lg="12">
                            <a-button class="next-btn fw-6 cancel-btn" block @click="close">Cancel</a-button>
                        </a-col>
                        <a-col :lg="12">
                            <a-button class="next-btn fw-6" block @click="validateForm">
                                {{ $t('play_game.pg7') }}</a-button>
                        </a-col>
                    </a-row>
                </div>

            </a-form-model>
            <VerificationModel :verificationModel="showVerificationModel" @onClose="showVerificationModel = false"
                :confirmAuth="sendCrypto" :loading="verifying" />


        </a-modal>
    </div>
</template>

<script>
import VerificationModel from '~/components/App/VerificationModal.vue'

import TransactionDetail from '~/components/PlayCard/Modal/TransactionDetail.vue';

import { mapActions, mapGetters } from 'vuex'
export default {
    name: 'SendCrypto',
    components: { VerificationModel, TransactionDetail },
    props: {
        show: {
            type: Boolean
        },
    },
    emits: ["onClose", 'onAmountSent'],
    data() {
        return {
            toUser: {},
            form: {
                to: "",
                type: "1",
                currencyID: "",
                amount: "",
                payPassword: "",
                googleVerifyCode: ""
            },
            showVerificationModel: false,
            successModel: { heading: '', message: '' },
            cryptoSent: false,
            verifying: false,
            open: false,
            searchValue: "",
            formNotValidated: false,
            selectedCurrency: 'USDT',
            transactionData: {
                currency: 'USDT',
                transaction_id: '',
                amount: 0,
            },

            setValidation: {
                rules: {
                    to: [
                        {
                            validator: async (rule, value, callback) => {
                                if (this.form.to == '' || this.form.to == null) {
                                    callback(new Error(this.$t('messages.msg67')))
                                } else {
                                    await this.findUser()
                                    if (this.formNotValidated) {
                                        callback(new Error(this.$t('messages.msg48')))
                                    }
                                    else {
                                        callback()
                                    }
                                }
                            },
                            trigger: 'blur',
                        }
                    ],
                    currencyID: [
                        {
                            required: true,
                            message: this.$t('messages.msg67'),
                        },
                    ],
                    amount: [
                        {
                            required: true,
                            message: this.$t('messages.msg16'),
                        },
                    ]
                }
            },
        };
    },
    watch: {
        currencyinfos: function (val) {
            if (val.length > 0) {
                //set default USDt currency as a selected value
                const currency = val.find((currency) => currency.currencyname == 'USDT')
                this.form.currencyID = currency.id
            }
        },
        getTempUser: function (val) {
            this.toUser = val
        }
    },
    computed: {
        ...mapGetters("auth", ["getTempUser"]),
        ...mapGetters('playcard', ['getUserGameAssets']),
        currencyinfos() {
            return this.$store.state.currencyinfos;
        },

        availableBalance() {
            if (this.getUserGameAssets.length > 0 && this.selectedCurrency && this.currencyinfos.length > 0) {

                const asset = this.getUserGameAssets.find(item => item.currencyid == this.form.currencyID);
                //console.log('available', asset);
                return this.cutZero(this.global_get_tofixed((asset.available), this.global_get_decimal(this.selectedCurrency).a))
            }
            else return 0
        },
    },
    methods: {
        ...mapActions("auth", ["verifyUserInfo"]),
        ...mapActions('playcard', ['fetchUserGameAssets']),
        async findUser() {
            const object = {
                to: this.form.to
            };
            const response = await this.verifyUserInfo(object);
            this.formNotValidated = false
            if (response.data == undefined || response.data == '' || response.data == null) {
                this.formNotValidated = true
                this.toUser = {}
            }
        },

        async sendCrypto(object) {

            //console.log('object:::', object)

            const validate = await this.$refs["sendCryptoForm"].validate(async (valid) => {
                //console.log("validated: valid: ", valid);
                if (valid) {
                    this.formNotValidated = false
                    this.form.googleVerifyCode = object.googleVerifyCode
                    this.form.payPassword = object.paypassword
                    const _self = this
                    _self.verifying = true
                    const resp = await _self.$store.dispatch('transfer_user', this.form)
                    _self.verifying = false

                    if (resp.code == 200) {

                        this.showVerificationModel = false

                        const currency = this.currencyinfos.find((currency) => currency.id == this.form.currencyID)


                        this.$emit('onAmountSent', {
                            transactionData: {
                                currency: currency.currencyname,
                                transaction_id: resp.data,
                                amount: this.form.amount,
                            }
                        })
                        this.fetchUserGameAssets({})

                        this.close()


                    }
                } else {
                    this.formNotValidated = true
                }
            })
        },

        async validateForm() {
            const validate = await this.$refs["sendCryptoForm"].validate(async (valid) => {
                if (valid) {
                    this.formNotValidated = false
                    this.showVerificationModel = true
                } else {
                    this.formNotValidated = true
                }
            })
        },



        close() {
            //console.log('closinggg');
            this.$emit("onClose", true)
            this.toUser = {}
            const currency = this.currencyinfos.find((currency) => currency.currencyname == 'USDT')

            this.form = {
                to: "",
                type: "1",
                currencyID: currency.id,
                amount: "",
                payPassword: "",
                googleVerifyCode: ""
            }
            this.selectedCurrency = 'USDT'
            this.$refs["sendCryptoForm"]?.clearValidate([
                "to",
                "currencyID",
                "amount",
            ])
        },
        filterFiatOptions(str) {
            const _self = this;
            if (_self.searchValue !== "") {
                return (str.indexOf(_self.searchValue.toLowerCase()) !== -1);
            }
            return true;
        },
        sleectCurrency(val) {
            const currency = this.currencyinfos.find((currency) => currency.id == val)
            this.selectedCurrency = currency.currencyname
            //console.log('sleectCurrency:', val);
        }
    },
}
</script>


<style lang="scss">
@import '@/assets/scss/pages/play-card/send-transactions.scss';
</style>
