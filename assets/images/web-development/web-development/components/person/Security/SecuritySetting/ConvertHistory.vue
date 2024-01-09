<template>
    <div class="">
        <a-card class="login-history-card" :bordered="false">
            <p class="mb-0 login-history fw-5 px-4 py-4">{{ $t('person.Convert_History_person') }}</p>
        </a-card>
        <a-card class="mt-3 convert-history-card" :bordered="false">
            <div class="shadow-card pt-4 px-4 pb-3">
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
            <a-table :columns="convertHistoryColums" :data-source="convertRecords" class="pb-4" :pagination="false"
                rowKey="id" :loading="loading">
                <div slot="trade_rate" slot-scope="text,row">
                    <span>{{ global_get_local_time(row.createtime).format('YYYY-MM-DD hh:mm a') }}</span> 
                </div>
                <div slot="pair" slot-scope="text,row">
                    <span>{{ getPair(row.fid, row.tid)[0].currencyname }}-{{ getPair(row.fid, row.tid)[1].currencyname }}</span>
                </div>
                <div slot="from" slot-scope="text,row">
                    <span>{{ row.famount }} {{ getPair(row.fid, row.tid)[0].currencyname }}</span>
                </div>
                <div slot="to" slot-scope="text,row">
                    <span>{{global_get_tofixed( row.tamount, getPair(row.fid, row.tid)[1].precision)}} {{ getPair(row.fid, row.tid)[1].currencyname }}</span>
                </div>
                <div slot="price" slot-scope="text,row">
                    <span>{{ global_get_tofixed(row.famount / row.tamount, getPair(row.fid, row.tid)[0].precision) }} {{
                        getPair(row.fid, row.tid)[0].currencyname }}/{{ getPair(row.fid, row.tid)[1].currencyname }}</span>
                </div>
                <div slot="success" slot-scope="text,row">
                    <span class="success-active">{{ $t('person.Success_person') }}</span>
                </div>
            </a-table>
            <div class=" px-3 pb-4 text-right" v-if="total > 0">
                <a-pagination background @change="handChange" :page-size="page.pagesize" :current="page.pageindex"
                    popper-class="paging" layout="prev, pager, next" :total="total">
                </a-pagination>
            </div>
        </a-card>
    </div>
</template>

<script>
import select from '@/components/security/deal_select'
export default {
    components: {
        "hex-select": select,
    },
    data() {
        return {
            hoverKey: -1,
            convertHistoryColums: [
                {
                    title: this.$t("tableskeys.ms1"),
                    dataIndex: 'tradeRate',
                    scopedSlots: { customRender: 'trade_rate' },
                    width: 170,

                },
                {
                    title: this.$t("tableskeys.tk11"),
                    dataIndex: 'pair',
                    scopedSlots: { customRender: 'pair' },
                    width: 120,

                },
                {
                    title: this.$t("tableskeys.tt15"),
                    dataIndex: 'from',
                    scopedSlots: { customRender: 'from' },
                    width: 120,

                },
                {
                    title: this.$t("tableskeys.tt16"),
                    dataIndex: 'to',
                    scopedSlots: { customRender: 'to' },
                    width: 120,

                },
                {
                    title: this.$t("tableskeys.tt17"),
                    dataIndex: 'price',
                    scopedSlots: { customRender: 'price' },
                    width: 140,

                },
                {
                    title: this.$t("tableskeys.tt18"),
                    dataIndex: 'success',
                    scopedSlots: { customRender: 'success' },
                    width: 100,
                    align: 'end',

                },
            ],
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
            convertRecords: [],

        }
    },
    methods: {
        handChange(val) {
            this.getConvertHistory(val);
        },
        getConvertHistory(pageIndex) {
            var postData = Object.assign(this.searchParam, this.page);
            pageIndex ? postData.pageindex = pageIndex : postData.pageindex = 1;
            this.loading = true;
            this.$store.dispatch("user_flash_convert_records_get", postData).then(({ data }) => {
                if (data) {
                    this.total = data.totalpagecount;
                    this.convertRecords = data.pagedata;
                } else {
                    this.total = 0;
                    this.found = true;
                    this.convertRecords = [];
                }
                this.loading = false;
            })
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
        getPair(fid, tid) {
            let fname = '';
            let tname = '';
            this.$store.state.currencyinfos.filter(item => {
                if (item.id == fid) {
                    fname = item;
                }
                if (item.id == tid) {
                    tname = item;
                }
            });
       
            return [fname, tname];
        },
        searchData(val) {//用于存子组件传过来数据
            this.searchParam[val.type] = val.id;
            this.search();
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
            this.getConvertHistory(1);
        },
        changeDate(date, dateString) {
            this.searchParam['beginTime'] = dateString[0];
            this.searchParam['endTime'] = dateString[1];
            this.search();
        },
        resetSelect() {
            this.$refs.currencyDetails.clearStatus();
            this.calender = []
            this.searchParam = {};
            this.search();
        },
        clearCurrentState(id) {
            this.searchParam[id] = {};
        },
    },
    mounted() {
        this.getallcoininfos();
        this.resetSelect();
        this.getConvertHistory(1);
    }
}
</script>
