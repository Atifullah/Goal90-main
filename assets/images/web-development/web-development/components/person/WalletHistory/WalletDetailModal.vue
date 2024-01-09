<template>
    <a-modal id="wallet-detail-modal" v-model="walletDetailModal" width="450px" :footer="false" :title="false"
        @cancel="close">
        <a-row :gutter="16" class="col-alignment mb-4">
            <a-col :lg="12">
                <p class="deposit-heading fw-5 mb-0">{{ title }}</p>
            </a-col>
            <a-col :lg="12" align="end"><img src="/images/ud-cross.svg" @click="close"
                    class="pointer" /></a-col>
        </a-row>
        <a-row :gutter="16" class="mb-3">
            <a-col :lg="24" align="center">
                <img src="/images/deposit-detail-modal.svg" />
            </a-col>
        </a-row>
        <a-row :gutter="16" class="col-alignment">
            <a-col :lg="4">
                <p class="mb-0 gray-list  fw-5">{{ $t('person.pdd13') }}</p>
            </a-col>
            <a-col :lg="20">
                <p class="mb-0 gray-list  fw-5 black-list success-txt fw-5" v-bind:class="bindStatusColor(selectedRow.status)">
                    {{ selectedRow.type != 'Deposit' ? global_get_mention_state(selectedRow.status) :
                        global_get_charge_state(selectedRow.status) }}
                </p>
            </a-col>
        </a-row>
        <a-divider class="wallet-address-detail-divider" />
        <a-row :gutter="16" class="col-alignment">
            <a-col :lg="4">
                <p class="mb-0 gray-list  fw-5">{{ $t('person.pdd14') }}</p>
            </a-col>
            <a-col :lg="20">
                <p class="mb-0 gray-list  fw-5 black-list">{{ getRecordTime(selectedRow) }}</p>
            </a-col>
        </a-row>
        <a-divider class="wallet-address-detail-divider" />
        <a-row :gutter="16" class="col-alignment">
            <a-col :lg="4">
                <p class="mb-0 gray-list  fw-5">{{ $t('person.pd13') }}</p>
            </a-col>
            <a-col :lg="20">
                <p class="mb-0 gray-list  fw-5 black-list">{{ global_get_uppercase(selectedRow.currencyname) }}</p>
            </a-col>
        </a-row>
        <a-divider class="wallet-address-detail-divider" />
        <a-row :gutter="16" class="col-alignment">
            <a-col :lg="4">
                <p class="mb-0 gray-list  fw-5">{{ $t('person.pi3') }}</p>
            </a-col>
            <a-col :lg="20">
                <p class="mb-0 gray-list  fw-5 black-list">{{ selectedRow.amount }}</p>
            </a-col>
        </a-row>
        <a-divider class="wallet-address-detail-divider" />
        <a-row :gutter="16" class="col-alignment">
            <a-col :lg="4">
                <p class="mb-0 gray-list  fw-5">{{ $t('person.pd25') }}</p>
            </a-col>
            <a-col :lg="20">
                <p class="mb-0 gray-list  fw-5 black-list">{{ selectedRow.address }}</p>
            </a-col>
        </a-row>
        <a-divider class="wallet-address-detail-divider" />
        <a-row :gutter="16" class="pb-2 col-alignment">
            <a-col :lg="4">
                <p class="mb-0 gray-list  fw-5">TXID</p>
            </a-col>
            <a-col :lg="20">
                <a target="_blank" :href="selectedRow.blockchainexplorer+selectedRow.moneyhashcode"><p class="mb-0   fw-5 ">{{ selectedRow.moneyhashcode ? selectedRow.moneyhashcode : '--' }}</p></a>
            </a-col>
        </a-row>
    </a-modal>
</template>

<script>
export default {
    props: {
        walletDetailModal: {
            type: Boolean
        },
        close: {
            type: Function
        },
        selectedRow: {
            type: Object
        },
        title: {
            type: String
        }
    },
    data() {
        return {
            getDetail: [
                {
                    name: this.$t('legalDeal.Status'),
                    status: this.$t('tableskeys.lss3'),
                    img: '/images/green-icon.svg',
                    img1: ''
                },
                {
                    name: this.$t('person.pdd14'),
                    status: '2022-11-12  17:14',
                    img: '',
                    img1: ''
                },
                {
                    name: this.$t('person.pd13'),
                    status: 'USDT',
                    img: '',
                    img1: ''
                },
                {
                    name: this.$t('tableskeys.vt23'),
                    status: '100',
                    img: '',
                    img1: ''
                },
                {
                    name: this.$t('tableskeys.wa8'),
                    status: 'TRX',
                    img: '',
                    img1: ''
                },
                {
                    name: this.$t('authentication.street'),
                    status: 'xitongxitonxitongxiton',
                    img: '',
                    img1: 'copy-icon-icon'
                },
                {
                    name: 'TxID',
                    status: 'xitongxitonxitongxiton',
                    img: '',
                    img1: 'copy-icon-icon'
                },
                {
                    name: this.$t('confirm.con9'),
                    status: this.$t('confirm.con9'),
                    img: '',
                    img1: ''
                }
            ]
        }
    },
    methods: {
        getRecordTime: function (coinitem) {
            return (coinitem.updatetime && coinitem.status == 1) ? this.global_get_local_time(coinitem.updatetime).format('YYYY-MM-DD hh:mm a') : this.global_get_local_time(coinitem.createtime).format('YYYY-MM-DD hh:mm a')
        },
        //status color name
        bindStatusColor(s) {
            let color = 'green-active'
            switch (s) {
                case 0:
                    color = 'yellow-active'//this.$t('patch.WaitingReview');
                    break;

                case 1:
                    color = 'green-active' //this.$t('patch.DealSuccess');
                    break;

                case 2:
                    color = 'red-active' //this.$t('patch.WithdrawFailed');
                    break;

                case 3:
                    color = 'yellow-active' // this.$t('patch.Processing');
                    break;

                case 4:
                    color = 'red-active' //this.$t('patch.Rejected');
                    break;
                case 5:
                    color = 'red-active' //this.$t('patch.cancelled');
                    break;
                default:
                    break;
            }

            return color
        },
    },
    mounted() {
        console.log(this.selectedRow)
    }
}
</script>

<style></style>
