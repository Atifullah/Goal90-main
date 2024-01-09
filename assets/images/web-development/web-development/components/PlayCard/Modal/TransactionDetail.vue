<template>
    <div class="send-transactions">
        
        <a-modal id="send-play-modal" v-model="show" width="450px" :footer="false" :title="false" :maskClosable="true"
            @cancel="close">
            <div>
                <a-row class="mt-4">
                    <a-col :lg="24" align="center">
                        <img src="/images/pl-success-icon.svg" />
                        <p class="mb-3 user-email fw-5">Payment Successful</p>
                        <p class="bnq-heading fw-7">
                            <span class="one-txt">{{ transactionData.amount }} </span>
                            {{ transactionData.currency }}
                        </p>
                    </a-col>
                </a-row>
                <a-card class="user-info-card info-card1 my-2" :bordered="false">
                    <a-row :gutter="16" class="col-alignment">
                        <a-col :lg="10">
                            <p class="mb-0 left-txt fw-5">To</p>
                        </a-col>
                        <a-col :lg="14" align="end">
                            <p class="mb-0 user-email fw-5" v-if="toUser.email">{{ toUser.email }}</p>
                            <p class="mb-0 nick-name fw-5" v-if="toUser.nickname">{{ toUser.nickname }}</p>
                        </a-col>
                    </a-row>
                    <a-divider class="game-divider" />
                    <a-row :gutter="16" class="col-alignment">
                        <a-col :lg="10">
                            <p class="mb-0 left-txt fw-5">Transaction Id</p>
                        </a-col>
                        <a-col :lg="14" align="end">
                            <p class="mb-0 user-email fw-5">{{ transactionData.transaction_id }}</p>
                        </a-col>
                    </a-row>
                    <a-divider class="game-divider" />
                    <a-row :gutter="16" class="col-alignment">
                        <a-col :lg="10">
                            <p class="mb-0 left-txt fw-5">Currency</p>
                        </a-col>
                        <a-col :lg="14" align="end">
                            <p class="mb-0 user-email fw-5">{{ transactionData.amount }} {{ transactionData.currency }}</p>
                        </a-col>
                    </a-row>
                </a-card>
            </div>
        </a-modal>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    name: 'TransactionDetail',
    props: {
        show: {
            type: Boolean,
            default: false
        },
        toUser: {
            type: Object,
            default: () => { }
        },
        transactionData: {
            type: Object,
            default: () => { }
            // {transaction_id:'', amount:'', currency}
        }
    },
    emits: ['onClose'],
    methods: {
        close() {
            this.$emit('onClose', true)
        }
    },
}
</script>

<style lang="scss">
@import '@/assets/scss/pages/play-card/send-transactions.scss';
</style>
