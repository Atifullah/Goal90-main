<template>
    <div class="login-history fw-5">
        <a-card class="login-history-card" :bordered="false">
            <p class="mb-0 login-history fw-5 px-4 py-4">{{ $t('person.Login_His_person') }}</p>
        </a-card>
        <a-card class="login-history-card mt-3" :bordered="false">
            <a-table :columns="loginHistoryColums" :data-source="loginhistory" :scroll-y="240" :scroll-x="50"
                class="pb-4 pt-3" :rowKey="(record, index) => index" :pagination="false" :loading="loading">
                <span slot="time" slot-scope="text,row">

                    {{ global_get_local_time(row.time).format('YYYY-MM-DD hh:mm a')
                    }} </span>
            </a-table>
            <div class=" text-right mb-3 px-3" v-if="total > 0">
                <a-pagination background @change="handChange" :page-size="logsModel.pagesize" :current="logsModel.pageindex"
                    popper-class="paging" layout="prev, pager, next" :total="total">
                </a-pagination>
            </div>
        </a-card>
    </div>
</template>

<script>
export default {
    data() {
        return {
            loading: true,
            found: false,
            total: 0,
            moreState: true,
            loginhistory: [],
            logsModel: {
                type: "Signin",
                pageindex: 1,
                pagesize: 10
            },
            loginHistoryColums: [
                {
                    title: this.$t("tableskeys.ms1"),
                    dataIndex: 'time',
                    scopedSlots: { customRender: 'time' },
                    width: 140,

                },
                {
                    title: this.$t("tableskeys.lh1"),
                    dataIndex: 'ip',
                    width: 120,

                },
                {
                    title: this.$t("tableskeys.lh2"),
                    dataIndex: 'device',
                    width: 200,

                },
                {
                    title: this.$t("tableskeys.lh3"),
                    dataIndex: 'currenttext',
                    width: 120,
                    align: 'end',

                }
            ],
        }
    },
    mounted() {
        this.getuserSign();
    },
    methods: {
        handChange(val) {
            this.getuserSign(val);
        },
        getuserSign(val) {
            this.loading = true;
            !val ? this.logsModel.pageindex = 1 : this.logsModel.pageindex = val;
            this.$store.dispatch("user_logs_search", this.logsModel).then(({ data }) => {
                if (data) {
                    this.total = data.totalitemcount;
                    this.loginhistory = data.pagedata;
                } else {
                    this.total = 0;
                    this.found = true;
                    this.loginhistory = [];
                }
                this.loading = false;
            })
        },
        record(val) {
            this.records = val;
        }

    },
}
</script>

<style></style>
