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
                <a-table :columns="tradeTableColumns" :pagination="false" :data-source="searchList"
                    :rowKey="(record, index) => index">
                    <div slot="token" slot-scope="text,row" class="col-alignment">
                        <img height="15" width="15" :src="row.icon" class="mr-2" />{{
                            (row.currencyname).toUpperCase() }}

                    </div>

                    <div slot="available" slot-scope="text,row">
                        <span>{{ global_get_tofixed(row.available,
                            global_get_decimal(row.currencyname).a)
                        }}</span>
                    </div>

                    <div slot="frozen" slot-scope="text,row">
                        <div class="col-alignment">
                            {{ global_get_tofixed(row.frozen, global_get_decimal(row.currencyname).a) }}
                        </div>
                    </div>
                    <div slot="totalAssets" slot-scope="text,row">

                        <p class="mb-0 first-txt">
                            {{ global_get_tofixed(row.amount, global_get_decimal(row.currencyname).a) }}</p>

                        <p class="mb-0">≈
                            {{ $store.getters.get_client_exchange_rate_name.mark }}
                            {{ $store.getters.get_client_exchange_rate(row.currencyname, row.amount) }}
                        </p>
                    </div>

                    <div slot="action" slot-scope="text,row" class="pr-2">
                        <a-row :gutter="10">
                            <a-col align="end" :lg="24" class="p-0">

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
        <hex-transfer v-if="transfer_pop" :transfer_pop="transfer_pop" :currencyid="cid" type="7"
            :closePopup="showPopTrasfer" />


    </div>
</template>
<script>
import transferPop from '@/components/security/transfer';

export default {
    name: 'GameDataTable',
    props: {
        currencyData: {
            type: Array,
            default: () => [],
        },
        getWalletInfo: {
            type: Function
        }
    },
    components: {
        'hex-transfer': transferPop,

    },

    data() {
        return {
            search: "",
            cid: 0,
            transfer_pop: false,
            hideSmallBalance: false,
            tradeTableColumns: [
                {
                    title: this.$t("tableskeys.tt7"),
                    dataIndex: 'token',
                    scopedSlots: { customRender: 'token' },
                    width: 100,
                },
                {
                    title: this.$t("tableskeys.tt8"),
                    dataIndex: 'available',
                    scopedSlots: { customRender: 'available' },
                    width: 100,
                },
                {
                    title: this.$t("tableskeys.tt10"),
                    dataIndex: 'frozen',
                    key: 'frozen',
                    scopedSlots: { customRender: 'frozen' },
                    width: 100,
                },
                {
                    title: this.$t("tableskeys.tt11"),
                    dataIndex: 'totalAssets',
                    scopedSlots: { customRender: 'totalAssets' },
                    width: 100,
                },
                {
                    title: this.$t("tableskeys.tt6"),
                    dataIndex: 'action',
                    scopedSlots: { customRender: 'action' },
                    align: 'end',
                    width: 140,
                },
            ],
        }
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
                    if ((item.currencyname).match(reg)) {
                        searchary.push(item)
                    }
                });
                return _this.hideSmallBalance ? searchary.filter(item => {
                    const rate = _this.$store.getters.get_exchange_rate_by_name(item.currencyname, 'usdt');
                    const amount = item.amount * rate;
                    return amount >= 1;
                }) : searchary;
            } else {
                return _this.hideSmallBalance ? list.filter(item => {
                    const rate = _this.$store.getters.get_exchange_rate_by_name(item.currencyname, 'usdt');
                    const amount = item.amount * rate;
                    return amount >= 1;
                }) : list;
            }
        }
    },
    methods: {


        showPopTrasfer(m) {
            if (m) {
                this.cid = m.currencyid;
            }
            else {
                this.getWalletInfo();
            }
            this.transfer_pop = !this.transfer_pop;

        },




    }
}
</script>
<style lang="scss">
@import '@/assets/scss/components/trade-table/trade-table.scss';
</style>
