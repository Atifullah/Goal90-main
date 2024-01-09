<template>
    <div class="trade-detail pt-3">
        <a-card :bordered="false" class="deposit-detail-card">
            <a-row :gutter="16" class="px-4 col-alignment">
                <a-col :lg="2">
                    <p class="total-blance fw-5 mb-0">{{ $t('person.token_person') }}</p>
                </a-col>
                <a-col :lg="17" align="end">
                    <p class="hide-txt fw-5 show-hide mb-0">
                        {{ hideSmallBalance ? $t('person.hide_person') : $t('person.show_person') }} {{ $t('person.sbalance_person') }}

                            <svg width="15" height="15" class="svg-icon ml-2 pointer" @click="hideSmallBalance = !hideSmallBalance">
                                    <use :xlink:href="hideSmallBalance   ? '/images/svg/sprite.svg#us-eye-icon':'/images/svg/sprite.svg#us-eye-active-icon'"></use>
                                    </svg>
                    </p>
                </a-col>
                <a-col :lg="5">
                    <a-input :placeholder="$t('placeholders.plh5')" v-model="search">
                        <span slot="prefix">
                            <img src="/images/search-icon.svg" /></span>
                    </a-input>
                </a-col>
            </a-row>
            <a-row class="pt-4">
                <a-table :columns="tradeTableColumns" :pagination="{pageSize: 10}" :data-source="searchList"
                    :rowKey="(record, index) => index" :loading="loading">
                    <div slot="token" slot-scope="text,row" class="col-alignment">
                        <img height="20" width="20" :src="row.currency.icon" class="mr-2" />{{
                            (row.currency.currencyname).toUpperCase() }}
                        <div v-if="row.currency.currencyname == 'CNYT' || row.currency.currencyname == 'HX'"
                            @mouseenter="showManage(i, true)" @mouseleave="showManage(i, false)"
                            :class="{ 'active': showManage, 'coin-hx': row.currency.currencyname == 'HX' }"
                            class="trade-top_tip ">
                            <i></i>
                            <dl v-show="isShowManage(i)" class="tip_modal">
                                <div class="row">
                                    <dd v-if="row.currency.currencyname == 'CNYT'">
                                        {{ $t('manage.third-party') }}
                                    </dd>
                                    <dd v-else>
                                        {{ $t('manage.launched') }}
                                    </dd>
                                </div>
                            </dl>
                        </div>
                    </div>

                    <div slot="available" slot-scope="text,row">
                        <span>{{ global_get_tofixed(row.canuseamount,
                            global_get_decimal(row.currency.currencyname).a)
                        }}</span>
                    </div>
                    <div slot="merchantfrozen" slot-scope="text,row">
                        <span>{{ row.currency.currencyname == 'USDT' ? row.applyadvfrozen : '--' }}</span>
                        <a-popover v-if="row.currency.currencyname == 'USDT'" :title="false"
                            overlay-class-name="p2paccount-popover" placement="top">
                            <template slot="content">
                                <p class="mb-0 p2p-info-txt fw-4">{{ $t('person.pi22') }}</p>
                            </template>
                            <img src="/images/gray-circle.svg" class="ml-1" />
                        </a-popover>
                    </div>
                    <div slot="frozen" slot-scope="text,row">
                        {{ global_get_tofixed(row.frozen,
                                    global_get_decimal(row.currency.currencyname).a)
                                }}
                        <!-- <div class="col-alignment">
                            <nuxt-link :to="{ path: selfRoute.deal }" class="handle">
                                {{ global_get_tofixed(row.bbfrozen, global_get_decimal(row.currency.currencyname).a) }}
                            </nuxt-link> /
                            <nuxt-link :to="{ path: selfRoute.financialDeal }" class="handle">
                                {{ global_get_tofixed(row.financingamount,
                                    global_get_decimal(row.currency.currencyname).a)
                                }} </nuxt-link>
                            <a-popover :title="false" overlay-class-name="p2paccount-popover" placement="top">
                                <template slot="content">
                                    <p class="mb-0 p2p-info-txt fw-4">{{ $t('person.pi22') }}</p>
                                </template>
                                <img src="/images/gray-circle.svg" class="ml-1" />
                            </a-popover>
                        </div>
                        <div v-if="row.currency.currencyname == 'HX'"
                            :class="{ 'freeze-coin-hx': row.currency.currencyname == 'HX' }" class="trade-top_tip active">
                            <i></i>
                            <dl class="tip_modal">
                                <div class="row">
                                    <dd class="lt">
                                        {{ $t('manage.fNum') }}
                                    </dd>
                                    <dd class="lt">
                                        {{ $t('manage.sNum') }}
                                    </dd>
                                </div>
                            </dl>

                        </div> -->

                    </div>
                    <div slot="totalAssets" slot-scope="text,row">
                        <p class="mb-0 first-txt">{{ global_get_tofixed(row.totalamount,
                            global_get_decimal(row.currency.currencyname).a)
                        }}</p>
                        <p class="mb-0">≈ {{ $store.getters.get_client_exchange_rate_name.mark }}
                            {{ $store.getters.get_client_exchange_rate(row.currency.currencyname, row.totalamount) }}</p>
                    </div>

                    <div slot="action" slot-scope="text,row" class="pr-2">
                        <a-row :gutter="10">
                            <a-col align="end" :lg="24" class="p-0">
                                <span v-if="row.currency.currencyname == 'USDT' && $usersettings.moreconfig?.applyadv"
                                    class="pointer deposit-table-txt fw-5 mb-0" block @click="confirmRefund(row)">{{
                                        $t('person.pi23') }}</span>
                                <nuxt-link :to="{ path: '/p2p/buy-and-sell', query: { direction: -1 } }"> <span
                                        class="pointer deposit-table-txt fw-5 mb-0 ml-2" block>
                                        {{ $t('legalDeal.Buy') }}</span></nuxt-link>
                                <nuxt-link :to="{ path: '/p2p/buy-and-sell', query: { direction: 1 } }"><span
                                        class="pointer deposit-table-txt fw-5 mb-0 ml-2" block>{{ $t('legalDeal.Sell') }}</span>
                                </nuxt-link>
                                <span class="pointer deposit-table-txt fw-5 mb-0 ml-2" block @click="showPopTrasfer(row)">{{
                                    $t('leverage.transfer') }}</span>
                            </a-col>
                        </a-row>
                    </div>
                    <span slot="status">
                        <a-button class="deposit-success fw-5">{{ $t('person.pi24') }}</a-button>
                    </span>
                </a-table>
            </a-row>
        </a-card>
        <hex-transfer v-if="transfer_pop" :transfer_pop="transfer_pop" :currencyid="cid" type="5" :closePopup="showPopTrasfer" @onTransferred="getWalletInfo()"/>
         
        <!-- <hex-transfer v-if="transfer_pop" :transfer_pop="transfer_pop" :currencyid="cid" type="5" :closePopup="showPopTrasfer" /> -->

        <ApplySuccessModal :applySuccessModel="applySuccessModel" @applySuccessModelClose="applySuccessModelClose()" />

        <RefundConfirmModal v-show="isRefund" ref="confirmRefund" @closePopup="closeConfirmRefund()" @deleteAddress="refund()"
            :title="$t('person.refundquestion')" :subTitle="$t('person.refund_note')" />

    </div>
</template>
<script>
import transferPop from '@/components/security/transfer';
import ApplySuccessModal from "@/components/AgentPlan/ApplySuccessModal.vue";
import RefundConfirmModal from '@/components/security/popup-only-google'
export default {
    props: {
        currencyData: {
            type: Array,
            default: () => [],
        },
        getWalletInfo: {
            type: Function
        },
        loading:{
            type:Boolean,
            default:false
        }
    },
    components: {
        'hex-transfer': transferPop,
        ApplySuccessModal,
        RefundConfirmModal
    },
    computed: {
        selfRoute: function () {
            return this.$store.state.route
        },
        searchList: function () {
            const _this = this;
            const list = _this.currencyData;
            const value = _this.search.toLowerCase().replace(/ /g, '');
            let searchary = [];
            if (value) {
                const reg = new RegExp(value, 'gim');

                list.map((item) => {
                    if ((item.currency.currencyname).match(reg)) {
                        searchary.push(item)
                    }
                });
                return _this.hideSmallBalance ? searchary.filter(item => {
                    const rate = _this.$store.getters.get_exchange_rate_by_name(item.currency.currencyname, 'usdt');
                    const amount = item.totalamount * rate;
                    return amount >= 1;
                }) : searchary;
            } else {
                return _this.hideSmallBalance ? list.filter(item => {
                    const rate = _this.$store.getters.get_exchange_rate_by_name(item.currency.currencyname, 'usdt');
                    const amount = item.totalamount * rate;
                    return amount >= 1;
                }) : list;
            }
        }
    },
    data() {
        return {
            search: "",
            cid: 0,
            transfer_pop: false,
            depositModal: false,
            withDrawModal: false,
            hideSmallBalance: false,
            isRefund: false,
            selectedRow: {},
            tradeTableColumns: [
                {
                    title: this.$t("tableskeys.tt7"),
                    dataIndex: 'token',
                    scopedSlots: { customRender: 'token' },
                    width: 150,
                },
                {
                    title: this.$t("tableskeys.tt8"),
                    dataIndex: 'available',
                    scopedSlots: { customRender: 'available' },
                    width: 150,
                },
                {
                    title: this.$t("tableskeys.tt9"),
                    dataIndex: 'merchantfrozen',
                    scopedSlots: { customRender: 'merchantfrozen' },
                    width: 150,
                },
                {
                    title: this.$t("tableskeys.tt10"),
                    dataIndex: 'frozen',
                    scopedSlots: { customRender: 'frozen' },
                    width: 150,
                },
                {
                    title: this.$t("tableskeys.tt11"),
                    dataIndex: 'totalAssets',
                    scopedSlots: { customRender: 'totalAssets' },
                    width: 120,
                },
                {
                    title:this.$t("tableskeys.tt6"),
                    dataIndex: 'action',
                    scopedSlots: { customRender: 'action' },
                    align: 'end',
                    width: 200,
                },
            ],
            applySuccessModel: {},
        }
    },
    methods: {
        showDetailRow(row, type) {
            this.selectedRow = row;
            if (type == 'deposit' && row.currency.iscandeposit) {
                this.depositModal = true;
            }
            else if (type == 'withdrawal' && row.currency.iscanwithdraw) {
                this.withDrawModal = true;
            }
        },
        toDeal(s) {
            s = s.replace('/', '_');
            this.$router.push({ path: '/deal/' + s })
        },
        showPopTrasfer(m) {
            //console.log('MMMM:', m);
            if (m) {
                this.cid = m.currency.id;
            }
            this.transfer_pop = !this.transfer_pop;
        },
        close() {
            this.depositModal = false;
            this.withDrawModal = false;
            this.selectedRow = {};

        },
        closeConfirmRefund() {
            this.isRefund = !this.isRefund
        },
        confirmRefund(row) {
            //console.log('ROW confirmRefund', row)
            this.isRefund = !this.isRefund
            this.$refs.confirmRefund.ShowPopup(row, 'deleteAddress')
        },
        refund() {
            this.$store.dispatch("user_user_settings_save",
                {
                    moreConfig: {
                        applyAdv: false,
                    }
                }
            ).then((res) => {
                if (res.data) {
                    this.closeConfirmRefund()//closing refund confirm modal

                    this.applySuccessModel = {
                        ServerMessage: res.msg,
                        ClientMessage: this.$t('messages.msg65'),
                    }
                    this.getWalletInfo();
                    this.global_refresh_user_settings();

                }
                else{
                    this.closeConfirmRefund();
                }

            })
        },
        applySuccessModelClose() {
            this.applySuccessModel = {};
        },
    }
}
</script>
<style lang="scss">
@import '@/assets/scss/components/trade-table/trade-table.scss';
</style>
