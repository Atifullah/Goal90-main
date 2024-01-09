<template>
    <div class="trade-detail pt-3">
        <a-card :bordered="false" class="deposit-detail-card">
            <a-row :gutter="16" class="px-4 col-alignment">
                <a-col :lg="2">
                    <p class="token-blance fw-5 mb-0">{{ $t('person.token_person') }}</p>
                </a-col>
                <a-col :lg="17" align="end">
                    <p class="hide-txt fw-5 show-hide mb-0">
                        {{ hideSmallBalance ? 'Hide' : 'Show' }} {{ $t('public.pub2') }}

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
                <a-table :columns="tradeTableColumns" :pagination="{pageSize: 10}" :data-source="searchLists"
                    :rowKey="(row) => { return row.currency.id }" :loading="loading">
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
                        <span>
                            <a-badge :count="$t('wallet.mining')" :number-style="{
                                backgroundColor: '#ff8000',
                                color: '#fff',
                                fontWeight: 400,
                                cursor: 'pointer',
                            }" class="head-example pl-2" v-if="row.currency.isfinancing"
                                @click="goFinancing(m.currency.id)" />
                        </span>
                    </div>
                    <div slot="available" slot-scope="text,row">
                        <span>{{ global_get_tofixed(row.canuseamount,
                            global_get_decimal(row.currency.currencyname).a)
                        }}</span>
                    </div>
                    <div slot="frozen" slot-scope="text,row">
                        <div class="col-alignment spot-link-color">
                            <nuxt-link :to="{ path: selfRoute.deal }" class="handle">
                                {{ global_get_tofixed(row.bbfrozen, global_get_decimal(row.currency.currencyname).a) }}
                            </nuxt-link> /
                            <nuxt-link :to="{ path: selfRoute.financialDeal }" class="handle">
                                {{ global_get_tofixed(row.financingamount,
                                    global_get_decimal(row.currency.currencyname).a)
                                }} </nuxt-link>

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
                        </div>
                    </div>
                    <p slot="spotFinancialTitle" class="spot-link-color mb-0">
                        {{ $t('public.pub4') }} (<nuxt-link to="/person/deal"> {{ $t('public.pub3')
                        }}</nuxt-link>/<nuxt-link to="/person/financial-deal">{{ $t('public.pub5') }}</nuxt-link> )
                    </p>
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
                                <span class="pointer deposit-table-txt fw-5 mb-0" block
                                    @click="() => showDetailRow(row, 'deposit')">
                                    <span class="handle">
                                        {{ $t('wallet.recharge') }}
                                    </span>
                                </span>
                                <span class="pointer deposit-table-txt fw-5 mb-0 ml-2" block
                                    @click="() => showDetailRow(row, 'withdrawal')">{{ $t('wallet.withdraw') }}</span>

                                <span class="pointer deposit-table-txt fw-5 mb-0 ml-2" block @click="showPopTrasfer(row)">{{
                                    $t('public.pub6') }}</span>

                                <span class="pointer deposit-table-txt fw-5 mb-0 ml-2" v-if="row.listsymble?.length <= 0" block
                                    @click="row.symble">{{ $t('public.pub7') }}</span>
                            </a-col>
                        </a-row>
                    </div>
                    <span slot="status">
                        <a-button class="deposit-success fw-5">{{ $t('public.pub8') }}</a-button>
                    </span>
                </a-table>
            </a-row>
        </a-card>
        <DepositModal v-if="depositModal" :depositModal="depositModal" :selectedRow="selectedRow" :close="close" />
        <WithDrawModal v-if="withDrawModal" :withDrawModal="withDrawModal" :selectedRow="selectedRow" :close="close" />
        <hex-transfer v-if="transfer_pop" :transfer_pop="transfer_pop" :currencyid="ctid" type="5"
            :closePopup="showPopTrasfer" />
    </div>
</template>
<script>
import DepositModal from '@/components/person/DepositAndWithdraw/DepositModal.vue';
import WithDrawModal from '@/components/person/DepositAndWithdraw/WithDrawModal.vue';
import transferPop from '@/components/security/transfer';
export default {
    name: 'AssetTable',
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
        DepositModal,
        WithDrawModal,
        'hex-transfer': transferPop,
    },
    computed: {
        selfRoute: function () {
            return this.$store.state.route
        },
        searchLists: function () {
            return this.hideSmallBalance ? this.searchList.filter(item => {
                const rate = this.$store.getters.get_exchange_rate_by_name(item.currency.currencyname, 'usdt');
                const amount = item.totalamount * rate;
                return amount >= 1;
            }) : this.searchList;
        },
    },
    watch: {
      currencyData: function (val) {
        console.log('val----', val)
        const list = this.getAssetsInfos(val, 0)
        console.log('val----list', list)
        const value = this.search.toLowerCase().replace(/ /g, '');
        let searchary = [];
        if (value) {
            const reg = new RegExp(value, 'gim');

            list.map((item) => {
                item.cid = item.currency.id
                if ((item.currency.currencyname).match(reg)) {
                    item.cid = item.currency.id
                    //console.log('item:', list);
                    searchary.push(item)
                }
            });
            this.searchList = searchary
        } else {
            this.searchList = list
        }
        
      }
    },
    data() {
        return {
            search: "",
            ctid: 0,
            transfer_pop: false,
            depositModal: false,
            withDrawModal: false,
            hideSmallBalance: false,
            selectedRow: {},
            tradeTableColumns: [
                {
                    title: this.$t("tableskeys.bh6"),
                    dataIndex: 'token',
                    scopedSlots: { customRender: 'token' },
                    width: 160,
                },
                {
                    title: this.$t("tableskeys.tt8"),
                    dataIndex: 'available',
                    scopedSlots: { customRender: 'available' },
                    width: 150,
                },
                {
                    slots: { title: 'spotFinancialTitle' },
                    dataIndex: 'frozen',
                    scopedSlots: { customRender: 'frozen' },
                    width: 180,
                },
                {
                    title: this.$t("tableskeys.ty12"),
                    dataIndex: 'totalAssets',
                    scopedSlots: { customRender: 'totalAssets' },
                    width: 120,
                },
                {
                    title: this.$t("tableskeys.tt6"),
                    dataIndex: 'action',
                    scopedSlots: { customRender: 'action' },
                    align: 'end',
                    width: 220,
                },
            ],
            searchList: []
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

            if (type == 'withdrawal' && !row.currency.iscanwithdraw) {
                this.$store.commit('set_message', { type: 'error', text: this.$t('tableskeys.withdraw_error') });
            }
            if (type == 'deposit' && !row.currency.iscandeposit) {
                this.$store.commit('set_message', { type: 'error', text: this.$t('tableskeys.deposit_error') });
            }

        },
        updateList(data) {
          this.currency = data
        },
        toDeal(s) {
            s = s.replace('/', '_');
            this.$router.push({ path: '/deal/' + s })
        },
        showPopTrasfer(m) {
            if (m) {
                this.ctid = m.currency.id;
            }

            this.transfer_pop = !this.transfer_pop;
            this.getWalletInfo()
        },
        close() {
            this.depositModal = false;
            this.withDrawModal = false;
            this.selectedRow = {};
            this.getWalletInfo()

        },
    }
}
</script>
<style lang="scss">
@import '@/assets/scss/components/trade-table/trade-table.scss';
</style>
