<template>
    <div>
        <div class="tickets">

            <a-row :gutter="16" class="mt-3">
                <a-col :lg="8">
                    <a-card :bordered="false" class="tickets-card">
                        <a-row :gutter="16" class="col-alignment">
                            <a-col :lg="14" :xl="16">
                                <p class="count-tickets fw-7 mb-0 col-alignment"><img src="/images/ud-timer.svg" class="pr-3"/>
                                    {{ pendingTickets }}</p>

                            </a-col>
                            <a-col :lg="10" :xl="8" align="end">
                                <span class=" fw-5">{{ $t('person.pending_ticket') }}</span>
                            </a-col>
                        </a-row>
                    </a-card>
                </a-col>
                <a-col :lg="8">
                    <a-card :bordered="false" class="tickets-card">
                        <a-row :gutter="16" class="col-alignment">
                            <a-col :lg="14" :xl="16">
                                <p class="count-tickets fw-7 mb-0 col-alignment"><img src="/images/refresh.svg" class="pr-3"/>
                                    {{ processedTickets }}</p>

                            </a-col>
                            <a-col :lg="10" :xl="8" align="end">
                                <span class="tickets-desc fw-5">{{ $t('person.processed_ticket') }}</span>
                            </a-col>
                        </a-row>
                    </a-card>
                </a-col>
                <a-col :lg="8">
                    <a-card :bordered="false" class="tickets-card">
                        <a-row :gutter="16" class="col-alignment">
                            <a-col :lg="14" :xl="16">
                                <p class="count-tickets fw-7 mb-0 col-alignment"><img src="/images/ticket-star.svg" class="pr-3"/>
                                    {{ totalTickets }}</p>

                            </a-col>
                            <a-col :lg="10" :xl="8" align="end">
                                <span class="tickets-desc fw-5">{{ $t('person.total_tickets') }}</span>
                            </a-col>
                        </a-row>
                    </a-card>
                </a-col>
            </a-row>

        </div>
        <div class="tickets-table pt-3">
            <a-card class="table-card" :bordered="false">
                <div class="shadow-card">
                    <a-row :gutter="16" class="px-4 pt-4">
                        <a-col :lg="5" :xl="5">
                            <hex-select ref="types" :label="$i18n.t('leverage.zj_capitalflow')" :type="'All'" :order="types"
                                market="All" @searchData="searchData" @change="change"
                                @clearCurrentState="clearCurrentState" />
                        </a-col>
                        <a-col :lg="6" :xl="6">
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
                <div class="mt-3">
                    <a-table :columns="ticketsColumns" :pagination="false" :data-source="ticketsData" :loading="loading"
                        rowKey="id">
                        <span slot="time" slot-scope="text,row">
                            {{ global_get_local_time(row.createtime, 'YYYY-MM-DD HH:mm:ss') }}
                        </span>
                        <span slot="status" slot-scope="text,row" v-bind:class="bindStatusClass(row)">
                            {{ statusValue[row.status] }}
                        </span>
                        <span slot="action" slot-scope="text,row">
                            <a-row :gutter="10">
                                <a-col align="end" :lg="24" class="p-0">
                                    <!-- <span class="pointer edit-txt mb-0 " block @click="viewDetailModal=true"><img
                                            src="/images/edit-icon.svg" class="mr-2" />View</span> -->
                                    <span class="pointer edit-txt mb-0 ml-2" block @click="editTicket(row)"><img
                                            src="/images/edit-icon.svg" class="mr-2" />{{ $t('person.pi19') }}</span>
                                    <span class="pointer mb-0 ml-2" block @click="deletepopup(row, 'deleteAddress')"><img
                                            src="/images/del-icon.svg" class="mr-2" />{{ $t('person.pi20') }}</span>
                                </a-col>
                            </a-row>
                        </span>
                    </a-table>
                    <div class=" px-3 pb-4 text-right" v-if="total > 0">
                        <a-pagination background @change="handChange" :page-size="page.pagesize" :current="page.pageindex"
                            popper-class="paging" layout="prev, pager, next" :total="total">
                        </a-pagination>
                    </div>
                </div>
            </a-card>
        </div>
        <popupstair v-show="deleteState" @closePopup="deletePopupState" @deleteAddress="deleteTicket" title="Are You Sure?"
            subTitle="You Want to Delete the Ticket" ref="popname" />
        <!-- <TicketDetailModal :viewDetailModal="viewDetailModal" :close="close" /> -->
    </div>
</template>

<script>
import popupstair from '@/components/security/popup-only-google'
import select from '@/components/security/deal_select'
// import TicketDetailModal from './TicketDetailModal.vue'

export default {
    components: {
        popupstair,
        "hex-select": select,
        // TicketDetailModal
    },
    computed: {
        statusValue() {
            return ['In Process', 'Processed', 'Cancelled', 'Unresolved', 'Completed']
        },
        types: function () {
            return [
                {
                    id: 0,
                    value: this.$t('values.val8'),//资产流水
                    type: 'status'
                },
                {//类型
                    id: 1,//状态
                    value: this.$t('values.val9'),//杠杆流水
                    type: 'status'
                },
                {
                    id: 2,
                    value: this.$t('values.val10'),//资产流水
                    type: 'status'
                },
                {//类型
                    id: 3,//状态
                    value: this.$t('values.val11'),//杠杆流水
                    type: 'status'
                },
                {
                    id: 4,
                    value: this.$t('values.val12'),//资产流水
                    type: 'status'
                },
            ]
        },
        pendingTickets() {
            const pending = this.totalInfos.filter(item => item.status == 0);
            if (pending.length > 0) {
                return pending[0].total
            }
            return 0;
        },
        processedTickets() {
            const processed = this.totalInfos.filter(item => item.status == 1);
            if (processed.length > 0) {
                return processed[0].total
            }
            return 0;
        },
        totalTickets() {
            let total = 0;
            this.totalInfos.filter(item => {
                total = item.total + total;
            });
            return total;
        }
    },
    data() {
        return {
            total: 0,
            loading: true,
            // viewDetailModal: false,
            searchParam: {},
            hoverKey: -1,
            page: {
                pageindex: 1,
                pagesize: 10,
            },
            calender: [],
            ticketsColumns: [
                {
                    title: this.$t("tableskeys.tt1"),
                    dataIndex: 'id',
                    width: 80,
                },
                {
                    title: this.$t("tableskeys.tt2"),
                    dataIndex: 'typename',
                    width: 60,
                },
                {
                    title: this.$t("tableskeys.tt3"),
                    dataIndex: 'content',
                    width: 140,
                },
                {
                    title: this.$t("tableskeys.tt4"),
                    dataIndex: 'status',
                    scopedSlots: { customRender: 'status' },
                    width: 70,
                },
                {
                    title: this.$t("tableskeys.tt5"),
                    dataIndex: 'createTime',
                    scopedSlots: { customRender: 'time' },
                    width: 70,
                },

                {
                    title: this.$t("tableskeys.tt6"),
                    dataIndex: 'action',
                    scopedSlots: { customRender: 'action' },
                    width: 90,
                    align: 'right'
                },
            ],
            deleteState: false,
            ticketsData: [],
            totalInfos: [],
        }
    },
    methods: {
        callback(key) {
            //console.log(key)
        },
        //     close() {
        //     this.viewDetailModal = false
        // },
        async getTickets(pageIndex) {
            this.total = 0;
            this.loading = true;
            this.page.pageindex = pageIndex ? pageIndex : 1;
            var postData = Object.assign(this.searchParam, this.page);
            try {
                const { data } = await this.$store.dispatch('get_work_order_get', postData)
                if (data) {
                    this.ticketsData = data.pagedata[0].infos;
                    this.totalInfos = data.pagedata[0].totalinfos;
                    this.total = data.totalitemcount;
                    this.loading = false;
                }
                else {
                    this.total = 0;
                    this.ticketsData = [];
                    this.totalInfos = [];

                }
            } catch (error) {
                //console.log('Error', error)
                this.loading = false;
            }
        },
        search() {
            this.getTickets();
        },
        handChange(val) {
            this.getTickets(val);
        },
        changeDate(date, dateString) {
            this.searchParam['beginTime'] = dateString[0];
            this.searchParam['endTime'] = dateString[1];
            this.getTickets();
        },
        searchData(val) {//用于存子组件传过来数据
            this.searchParam[val.type] = val.id;
            this.getTickets();
        },
        change(val) {
            const _self = this;
            switch (val) {
                case 'types':
                    _self.$refs.types?.changeBack();
                    break;
            }
        },
        clearCurrentState(id) {
            this.searchParam[id] = {};
        },
        resetSelect() {
            this.$refs.types?.clearStatus();
            this.calender = []
            this.searchParam = {};
            this.getTickets();
        },
        deletePopupState() {
            this.deleteState = !this.deleteState;
        },
        deletepopup(vid, m) {
            this.deleteState = !this.deleteState;
            this.$refs.popname.ShowPopup(vid, m);
        },
        deleteTicket(id) {
            this.$store.dispatch("work_order_delete",
                { id: id }
            ).then((res) => {
                if (res.data) {
                    this.deleteState = !this.deleteState;
                    this.getTickets();
                    this.$store.commit('set_message',
                        { type: 'ok', text: res.msg });
                }
            })
        },
        editTicket(row) {
            this.$router.push({
                path: '/person/my-tickets/edit-ticket',
                query: {id:row.id}
            })
        },
        bindStatusClass(row) {
            const status = row.status
            let name = 'green-active'
            switch (status) {
                case 0:
                    name = 'yellow-active'
                    break;

                case 1:
                    name = 'blue-active'
                    break;

                case 2:
                    name = 'red-active'
                    break;

                case 3:
                    name = 'yellow-active'
                    break;

                case 4:
                    name = 'green-active'
                    break;
                default:
                    break;
            }

            return name;

        }
    },
    mounted() {
        this.resetSelect();
    }

}
</script>

<style></style>
