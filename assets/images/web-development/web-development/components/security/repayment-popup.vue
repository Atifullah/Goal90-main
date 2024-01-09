<template>
    <a-modal id="repayment-modal" v-model="repayModel" width="480px" :footer="false" @cancel="close(0)">
        <a-row :gutter="16" class="col-alignment">
            <a-col :lg="12">
                <p class="mb-0 returning-loans">{{ $t('leverage.returning') }}</p>
            </a-col>
            <a-col :lg="12" align="end"><img class="pointer" src="/images/ud-cross.svg"
                    @click='close(0)' /></a-col>
        </a-row>
        <a-form-model ref="repayment" :model="repaymentModal" :hide-required-mark="true" label-align="left" :rules="rules">
            <a-row :gutter="16" class="pt-4 mt-2">
                <a-col :lg="12">
                    <p class="mb-0 accounts-heading">{{ $t("wallet.leveraged") }}</p>
                </a-col>
                <a-col :lg="12" align="end">
                    <p class="mb-0 btc-heading">{{ _symblename }}</p>
                </a-col>
            </a-row>
            <a-divider class="my-3" />
            <a-row :gutter="16" class="mt-2">
                <a-col :lg="12">
                    <p class="mb-0 accounts-heading">{{ $t("leverage.quantity") }}</p>
                </a-col>
                <a-col :lg="12" align="end">
                    <p class="mb-0 btc-heading">{{ global_get_tofixed(_loanamount, global_get_decimal(_loancurrencyname).a)
                    }} {{ _loancurrencyname }}</p>

                </a-col>
            </a-row>
            <div class="py-2">
                <a-card class="orange-repay-bg my-4" :bordered="false">
                    <a-row :gutter="16" class="col-alignment">
                        <a-col :lg="9">
                            <p class="mb-2 accounts-heading">{{ $t("leverage.loans") }}</p>
                            <p class="mb-0 interest-heading">{{ global_get_tofixed(_loancurrencyamount,
                                global_get_decimal(_loancurrencyname).a) }} {{ _loancurrencyname }}</p>
                        </a-col>
                        <a-col :lg="7" class="pl-0">
                            <p class="mb-2 accounts-heading">{{ $t("leverage.totalInterestPaid") }}</p>
                            <p class="mb-0 interest-heading">{{ global_get_tofixed(_interest,
                                global_get_decimal(_loancurrencyname).a) }} {{ _loancurrencyname }}</p>
                        </a-col>
                        <a-col :lg="8" class="pl-0">
                            <img src="/images/repay-img.svg" />
                        </a-col>
                    </a-row>
                </a-card>
            </div>
            <a-row class="pl-1">
                <a-col :lg="24">
                    <a-row :gutter="16">
                        <a-col :lg="8">
                            <p class="return-num">{{ $t('leverage.returns') }}</p>
                        </a-col>
                        <a-col :lg="16" align="end" class="account-balance">
                            <span class="text">
                                {{ $t('manage.Balance') }}:
                            </span>
                            <span class="balance">
                                {{ amount }} {{ _loancurrencyname }}
                            </span>

                        </a-col>
                    </a-row>
                </a-col>
                <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                    <a-row>
                        <a-col :lg="21">
                            <a-form-model-item has-feedback prop="repayment" :colon="false" :wrapper-col="{
                                xl: 24,
                                lg: 24,
                                md: 24,
                                sm: 24,
                                xs: 24,
                            }">
                                <a-input class="transfer-crypto-input" type="number" v-model="repaymentModal.repayment">
                                    <!-- <span slot="suffix" class="btc-gray-txt">{{ _loancurrencyname }}</span> -->
                                </a-input>
                            </a-form-model-item>
                        </a-col>
                        <a-col :lg="3">
                            <p class="text-center all-transfer-txt mb-0" @click="repaymentAllLoan()">{{ $t('manage.all') }}
                            </p>
                        </a-col>
                    </a-row>
                </a-col>
            </a-row>

            <a-row :gutter="16" class="pt-4">
                <a-col :lg="12"><a-button class="cancel-outline-btn fw-5" block @click="close(0)">{{ $t("legalTrad.Cancel")
                }}</a-button></a-col>
                <a-col :lg="12"><a-button class="primary-btn fw-5" block @click="confirmToRepayment" :loading="loading" :class="amount>0?'':'disabled-btn'">{{
                    $t("formMenu.confirm") }}</a-button></a-col>
            </a-row>
        </a-form-model>
    </a-modal>
</template>
<script>
export default {
    name: "leverage-amount",
    subscribe() {
        return {
            getOrderList() {//下单后更新资产数据
                this.getLeverageInfo(this.ctid);
            }
        }
    },
    computed: {
        _symblename: function () {
            return this.symblename && this.symblename.toUpperCase()
        },
        _loancurrencyamount: function () {
            return this.loancurrencyamount;
        },
        _interest: function () {
            return this.interest;
        },
        _loancurrencyname: function () {
            return this.loancurrencyname && this.loancurrencyname.toUpperCase();
        },
        _loanamount: function () {
            return this.loanamount;
        },
    },
    props: ['id', 'symblename', 'ctid', 'loancurrencyamount', 'interest', 'loancurrencyname', 'loanamount', 'repayModel'],
    data() {
        return {
            amount: 0,
            digits: 2,
            loading: false,
            repaymentModal: {
                repayment: '',
            },
            rules: {
                repayment: [
                    {
                        validator: async (rule, value, callback) => {
                            const amount = parseFloat(this.repaymentModal.repayment);
                            if (this.repaymentModal.repayment == '') {
                                callback(new Error((this.$t('errors.err21'))))
                            }
                            else if (amount <= 0) {
                                callback(new Error((this.$t('errors.err22'))))
                            }
                            else {
                                callback()
                            }
                        },
                        trigger: 'change',
                    }
                ],
            },

        }
    },
    mounted() {
        this.getLeverageInfo(this.ctid);
    },
    methods: {
        repaymentAllLoan() {
            if (this.amount >= this._loanamount) {
                this.repaymentModal.repayment = this.global_get_tofixed(this._loanamount, this.digits)
            } else {
                this.repaymentModal.repayment = this.global_get_tofixed(this.amount, this.digits)
            }
        },
        async confirmToRepayment() {
            const params = Object.assign({}, {
                id: this.id,
                repaymentamount: this.repaymentModal.repayment
            });
            var _self = this;
            this.$store.dispatch('userborrowmoney_user_borrow_back', params)
                .then((res) => {
                    if (res.data) {
                        this.$store.commit('set_message', {
                            type: 'ok',
                            text: res.msg
                        });
                        _self.$pubsub.publish(_self.$pubsub.getOrderList) //更新资产与订单列表
                        _self.$emit("confirmToRepayment", _self);
                    }
                })
        },
        close(val) {
            this.repaymentModal.repayment = '';
            this.loading = false;
            this.$emit('closePopup', val);
        },
        closeLoading() {
            this.loading = false;
        },
        getLeverageInfo(ctid) {
            var _self = this;
            this.$store.dispatch('userborrowmoney_user_mortgageassets_infos', { ctid: ctid }).then(({ data }) => {
                if (data) {//_loancurrencyname
                    let dataInfo =  this.getMortgageassetsInfos(data, 1)[0];
                    if (dataInfo.tcurrencyname.toUpperCase() == _self._loancurrencyname) {
                        _self.amount = dataInfo.tamount;
                        _self.digits = dataInfo.pricedigits;
                    } else if (dataInfo.fcurrencyname.toUpperCase() == _self._loancurrencyname) {
                        _self.amount = dataInfo.famount;
                        _self.digits = dataInfo.amountdigits
                    }
                }
            })
        },
    }
};
</script>
<style lang='scss'>
#repayment-modal {
    .ant-modal-close {
        display: none;
    }

    .ant-modal-content {
        box-shadow: 0px 20px 136px -4px rgba(16, 24, 40, 0.1), 0px 8px 8px -4px rgba(16, 24, 40, 0.04);
        border-radius: 12px;

        .returning-loans {
            font-weight: 500;
            font-size: 18px;
            color: #081131;
        }

        .accounts-heading {
            font-weight: 500;
            font-size: 14px;
            line-height: 17px;
            color: #718096;
        }

        .btc-heading {
            font-weight: 500;
            font-size: 18px;
            line-height: 24px;
            color: #081131;
        }

        .interest-heading {
            font-weight: 500;
            font-size: 15px;
            color: #081131;
        }
    }

    .ant-input {
        border-radius: 6px 0 0 6px !important;
    }

    .orange-repay-bg {
        background: rgba(255, 187, 63, 0.07);
        border-radius: 12px;

        .ant-card-body {
            padding: 9px 15px;
        }
    }

    .all-transfer-txt {
        border: 1px solid #d0d5dd;
        height: 38px;
        border-left: none;
        border-radius: 0px 6px 6px 0 !important;
        line-height: 38px;
        cursor: pointer;
        color: #718096;

        &:hover {
            color: #FFA500;
        }
    }

    .return-num {
        font-weight: 500;
        font-size: 14px;
        line-height: 20px;
        color: #081131;
    }

    .account-balance {
        font-weight: 500;
        font-size: 14px;
        line-height: 20px;

        .text {
            color: #718096;
        }

        .balance {
            color: #081131;
        }
    }
}
</style >
