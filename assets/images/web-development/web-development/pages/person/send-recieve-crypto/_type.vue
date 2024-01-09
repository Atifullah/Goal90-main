<template>
    <div id="send-crypto">
        <template v-if="type == 'send-crypto'">
            <SendCrypto ref="sendCrypto" :dataSource="commonPayees" @updategetCommonPayees="getCommonPayees(1)" />
        </template>
        <template v-if="type == 'receive-crypto'">
            <ReceiveCrypto />
        </template>
        <a-row class="mt-3">
            <a-col>
                <a-card :bordered="false" class="table-card">
                    <a-tabs v-model="activeKey" @change="changeTab" v-if="type == 'send-crypto'">
                        <a-tab-pane key="1" :tab="$t('tabkeys.tab72')" v-if="type == 'send-crypto'">
                            <CryptoTable :sendCryptocolumns="commonPayeesColumns" :sendCryptodata="commonPayees"
                                :loading="loading" :send="send" />
                        </a-tab-pane>
                        <a-tab-pane key="2" :tab="$t('tabkeys.tab73')" v-if="type == 'send-crypto'">
                            <div class="shadow-card pt-4 px-4 pb-4">
                                <a-row :gutter="16">
                                    <a-col :lg="5">
                                        <hex-select ref="currencyDetails" :label="$i18n.t('Waddress.selectCion')"
                                            :type="$i18n.t('Waddress.selectCion')" :order="currencyDetails"
                                            :market="currencyid" @searchData="searchData" @change="change"
                                            @clearCurrentState="clearCurrentState" />
                                    </a-col>
                                    <a-col :lg="6">
                                        <a-range-picker @change="changeDate" v-model="calender" />
                                    </a-col>
                                    <a-col :lg="4" :xl="3" class="some-code-btn-space">

                                        <span @mouseover="hoverKey = 2" @mouseleave="hoverKey = -1">
                                            <a-button block class="outline-btn fw-5 px-2" @click="resetSelect">
                                                <svg width="15" height="15" class="svg-icon mr-2 refresh-icon" >
                                        <use :xlink:href="hoverKey == 2 ? '/images/svg/sprite.svg#refresh-white-icon':'/images/svg/sprite.svg#refresh-icon-icon'"></use>
                                        </svg>
                                            {{ $t('memberCenter.reset')
                                                    }}</a-button>
                                        </span>
                                    </a-col>
                                </a-row>
                            </div>
                            <CryptoTable :sendCryptocolumns="sendColumns" type="Send" :sendCryptodata="sendRecieve"
                                :loading="loading" />
                        </a-tab-pane>

                    </a-tabs>
                    <p class="px-4 mb-0 crypto-heading fw-5 mt-4" v-if="type == 'receive-crypto'"> Recieve History</p>
                    <div v-if="type == 'receive-crypto'">
                        <div class="shadow-card pt-4 px-4">
                            <a-row :gutter="16">
                                <a-col :lg="5">
                                    <hex-select ref="currencyDetails" :label="$i18n.t('Waddress.selectCion')"
                                        :type="$i18n.t('Waddress.selectCion')" :order="currencyDetails" :market="currencyid"
                                        @searchData="searchData" @change="change" @clearCurrentState="clearCurrentState" />
                                </a-col>
                                <a-col :lg="6">
                                    <a-range-picker @change="changeDate" v-model="calender" />
                                </a-col>
                                <a-col :lg="4" :xl="3" class="some-code-btn-space">
                                    <span @mouseover="hoverKey = 6" @mouseleave="hoverKey = -1">
                                        <a-button block class="outline-btn fw-5 px-2" @click="resetSelect">
                                            <svg width="15" height="15" class="svg-icon mr-2 refresh-icon" >
                                        <use :xlink:href="hoverKey == 6 ? '/images/svg/sprite.svg#refresh-white-icon':'/images/svg/sprite.svg#refresh-icon-icon'"></use>
                                        </svg>
                                        {{ $t('memberCenter.reset')
                                                }}</a-button>
                                    </span>
                                </a-col>
                            </a-row>
                        </div>
                        <CryptoTable :sendCryptocolumns="recieveColumns" type="Receive" :sendCryptodata="sendRecieve"
                            :loading="loading" />
                    </div>
                </a-card>
            </a-col>
        </a-row>

    </div>
</template>

<script>
import SendCrypto from "@/components/person/SendReceiveCrypto/SendCrypto.vue"
import ReceiveCrypto from "@/components/person/SendReceiveCrypto/ReceiveCrypto.vue"
import CryptoTable from "~/components/person/SendReceiveCrypto/CryptoTable"
import select from '@/components/security/deal_select'

export default {
    components: {
        SendCrypto,
        ReceiveCrypto,
        "hex-select": select,
        CryptoTable,
    },
    watch: {
        'type': function (val) {
            if (val == 'receive-crypto') {
                setTimeout(() => {
                    this.activeKey = "3";
                    this.getTransferUsers(1);
                }, 50)

            }
            else {
                this.activeKey = "1";
                this.getCommonPayees(1);
            }
        }
    },
    computed: {
        type() {
            return this.$route.params.type;
        }
    },
    data() {
        return {
            hoverKey: -1,
            activeKey: "1",
            loading: true,
            found: false,
            total: 0,
            searchParam: {},
            page: {
                pageindex: 1,
                pagesize: 10
            },
            currencyDetails: [],
            currencyid: this.$t('formMenu.select'),
            calender: [],
            commonPayees: [],
            sendRecieve: [],
            commonPayeesColumns: [
                {
                    title: this.$t('tableskeys.ty1'),
                    dataIndex: 'touserid',
                    key: 'touserid',
                    width: 190,
                },
                {
                    title: this.$t('tableskeys.ty2'),
                    dataIndex: 'nikename',
                    key: 'nikename',
                    width: 140,
                },
                {
                    title: this.$t('tableskeys.ty3'),
                    dataIndex: 'email',
                    key: 'email',
                    width: 320,
                },
                {
                    title: this.$t('tableskeys.ty4'),
                    dataIndex: 'phone',
                    key: 'phone',
                    width: 120,
                },
                {
                    title: this.$t('tableskeys.tk6'),
                    dataIndex: 'action',
                    key: 'action',
                    scopedSlots: { customRender: 'commonaction' },
                    width: 120,
                },
            ],
            sendColumns: [
                {
                    title: this.$t('tableskeys.ty5'),
                    dataIndex: 'createtime',
                    key: 'createtime',
                    scopedSlots: { customRender: 'createtime' },
                    width: 190,
                },
                {
                    title: this.$t('tableskeys.ty6'),
                    dataIndex: 'nikename',
                    key: 'nikename',
                    width: 140,
                },
                {
                    title: this.$t('tableskeys.lh5'),
                    dataIndex: 'amount',
                    key: 'amount',
                    width: 120,
                },
                {
                    title: this.$t('tableskeys.vt21'),
                    dataIndex: 'currencyname',
                    key: 'currencyname',
                    width: 120,
                },
                {
                    title: this.$t('tableskeys.tt4'),
                    dataIndex: 'status',
                    key: 'status',
                    scopedSlots: { customRender: 'withdrawstatus' },
                    width: 120,
                },
                {
                    title: this.$t('tableskeys.tk6'),
                    dataIndex: 'action',
                    key: 'action',
                    scopedSlots: { customRender: 'action' },
                    width: 120,
                },
            ],
            recieveColumns: [
                {
                    title: this.$t('tableskeys.ty5'),
                    dataIndex: 'createtime',
                    key: 'createtime',
                    scopedSlots: { customRender: 'createtime' },
                    width: 190,
                },
                {
                    title: this.$t('tableskeys.ty7'),
                    dataIndex: 'nikename',
                    key: 'nikename',
                    width: 140,
                },
                {
                    title: this.$t('tableskeys.lh5'),
                    dataIndex: 'amount',
                    key: 'amount',
                    width: 120,
                },
                {
                    title: this.$t('tableskeys.vt21'),
                    dataIndex: 'currencyname',
                    key: 'currencynme',
                    width: 120,
                },
                {
                    title: this.$t('tableskeys.tt4'),
                    dataIndex: 'status',
                    key: 'status',
                    scopedSlots: { customRender: 'depositstatus' },
                    width: 120,
                },
                {
                    title: this.$t('tableskeys.tk6'),
                    dataIndex: 'action',
                    key: 'action',
                    scopedSlots: { customRender: 'action' },
                    width: 120,
                },
            ],
        }
    },
    methods: {
        changeTab(val) {
            if (val == "1") {
                this.getCommonPayees(1);
            }
            else if (val == "2") {
                this.getTransferUsers(1);
            }
            else {
                this.getTransferUsers(1);
            }
        },
        async getTransferUsers(pageIndex) {
            const _self = this;
            var postData = {};
            postData = Object.assign(this.searchParam, this.page);
            pageIndex ? postData.pageindex = pageIndex : postData.pageindex = 1;
            if (this.activeKey == "3") {
                postData.toUserID = this.$userinfo.uid;
            }
            else {
                delete postData.toUserID;
            }

            this.loading = true;
            try {
                let { data } = await _self.$store.dispatch('get_transfer_records_get', postData);

                if (data) {
                    this.total = data.totalpagecount;
                    this.sendRecieve = data.pagedata;
                } else {
                    this.total = 0;
                    this.found = true;
                    this.sendRecieve = [];
                }
                this.loading = false;
            } catch (error) {
                //console.log('Error', error);
            }
        },
        async getCommonPayees(pageIndex) {
            const _self = this;
            var postData = Object.assign(this.searchParam, this.page);
            pageIndex ? postData.pageindex = pageIndex : postData.pageindex = 1;
            this.loading = true;
            try {
                let { data } = await _self.$store.dispatch('get_transfer_users', postData);
                if (data) {
                    this.total = data.totalpagecount;
                    this.commonPayees = data.pagedata;
                } else {
                    this.total = 0;
                    this.found = true;
                    this.commonPayees = [];
                }
                this.loading = false;
            } catch (error) {
                //console.log('Error', error);
            }
        },
        getallcoininfos() {
            this.$store.state.currencyinfos.forEach(item => {
                this.currencyDetails.push({
                    id: item.id,
                    value: item.currencyname,
                    type: 'currencyid',
                    icon: item.icon
                });
            });
        },
        searchData(val) {//用于存子组件传过来数据
            this.searchParam[val.type] = val.id;
            this.changeTab(this.activeKey);
        },
        change(val) {
            const _self = this;
            switch (val) {
                case 'currencyDetails':
                    _self.$refs.currencyDetails.changeBack();
                    break;
            }
        },
        search() {
            this.changeTab(this.activeKey);
        },
        changeDate(date, dateString) {

            this.searchParam['startTime'] = this.global_get_utc_time(new Date(dateString[0]));
            this.searchParam['endTime'] = this.global_get_utc_time(new Date(dateString[1]));
            this.changeTab(this.activeKey);
        },
        resetSelect() {
            this.$refs.currencyDetails.clearStatus();
            this.calender = []
            this.searchParam = {};
            this.changeTab(this.activeKey);
        },
        clearCurrentState(id) {
            this.searchParam[id] = {};
        },
        send(row) {
            this.$refs.sendCrypto.commonPayee(row);
        },
    },
    mounted() {
        this.getallcoininfos();
        if (this.$route.params.type == 'receive-crypto') {
            this.activeKey = "3";
            this.getTransferUsers(1);
        }
        else {
            this.getCommonPayees(1);
        }

    }
}
</script>

<style lang="scss">
@import '@/assets/scss/pages/user-center/send-crypto.scss';
</style>
