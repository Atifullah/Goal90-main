<template>
    <div class="card-header">
        <a-row :gutter="16" class="my-4 col-alignment">
            <a-col :lg="8">
                <p class="blockchain-heading fw-4 mb-0">{{ $t('play_game.pg1') }}</p>
                <p class="mt-3 mb-0 chess-txt fw-4">{{ $t('play_game.pg2') }}
                </p>

            </a-col>
            <a-col :lg="8" align="center">
                <img src="/images/pl-logo.svg" />
            </a-col>
            <a-col :lg="8">
                <a-row :gutter="16">
                    <a-col :lg="17" align="end">
                        <p class="game-rules-txt fw-5 mb-3 pointer"><img src="/images/pl-video-circle.svg"
                                class="pr-1 mb-1" /> {{ $t('play_game.pg3') }}</p>
                    </a-col>
                    <a-col :lg="7" align="end">
                        <p class="game-rules-txt fw-5 mb-3 pointer" @click="helpCenterModel = true">
                            <img src="/images/clipboard-text.svg" class="pr-1 mb-1" /> {{ $t('play_game.pg4') }}
                        </p>
                    </a-col>
                </a-row>
                <a-row>
                    <a-col :lg="24" align="end">
                        <nuxt-link to="/person/wallet"> <a-button class="common-btn mr-1">{{ $t('play_game.pg5')
                        }}</a-button></nuxt-link>
                        <a-button class="common-btn transfer-btn mr-1" @click="showPopTrasfer">{{ $t('play_game.pg6')
                        }}</a-button>
                        <a-button class="common-btn transfer-btn" @click="checkAuthPassword()">{{ $t('play_game.pg7')
                        }}</a-button>

                    </a-col>
                </a-row>
            </a-col>
        </a-row>
        <SendTransactions :show="sendTransactionModel" @onClose="sendTransactionModel = false" @onAmountSent="amountSent" />
        <HelpCenter :helpCenterModel="helpCenterModel" :close="close" />
        <hex-transfer v-if="transfer_pop" :transfer_pop="transfer_pop" :cid="ctid" type="5" :closePopup="showPopTrasfer" />

        <TransactionDetail :toUser="toUser" :transactionData="transactionData" :show="cryptoSent"
            @onClose="cryptoSent = false" />

        <SetFundPasswordModal :show="showSetPasswordModal" @onClose="showSetPasswordModal = false"
            @onOk="showSetPasswordModal = false" />

    </div>
</template>

<script>
import transferPop from '@/components/security/transfer';
import SendTransactions from './Modal/SendTransactions.vue'
import HelpCenter from './Modal/HelpCenter.vue'
import TransactionDetail from '~/components/PlayCard/Modal/TransactionDetail.vue';
import SetFundPasswordModal from '~/components/App/SetFundPasswordModal.vue';

import { mapGetters } from 'vuex'

export default {
    name: 'CardHeader',
    components: {
        SendTransactions,
        HelpCenter,
        TransactionDetail,
        "hex-transfer": transferPop,
        SetFundPasswordModal
    },
    data() {
        return {
            showSetPasswordModal: false,
            sendTransactionModel: false,
            helpCenterModel: false,
            transfer_pop: false,
            cryptoSent: false,
            transactionData: {
                currency: '',
                transaction_id: '',
                amount: '',
            }
        }
    },
    computed: {
        ...mapGetters("auth", ["getTempUser"]),
        toUser() {
            return this.getTempUser.nickname ? this.getTempUser : {};
        }
    },
    methods: {
        close() {
            this.sendTransactionModel = false
            this.helpCenterModel = false
        },
        showPopTrasfer() {
            this.transfer_pop = !this.transfer_pop;
        },
        amountSent(object) {
            //console.log('aobject:', object)
            this.transactionData = object.transactionData
            this.cryptoSent = true
            this.close()
        },
        checkAuthPassword() {
            const auth = this.$userinfo
            if (!auth.uid) {
                this.$router.push('/login?returnurl=' + this.$route.path)
            } else if (auth.isgoogleauthed && auth.isopenpaypassword) {
                this.sendTransactionModel = true
            } else {
                this.showSetPasswordModal = true
            }
            //console.log('autH::', auth);
            // this.showSetPasswordModal = true
        }
    }
}
</script>

<style></style>
