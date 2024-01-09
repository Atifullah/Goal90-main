<template>
    <div>

        <div class="invite-innertable">
            <a-table :columns="columns" :data-source="invitedRecord.pagedata" :expandIconColumnIndex="4"
                :expandIconAsCell="false" class="components-table-demo-nested"
                :rowKey="(record, index) => { return 'outer-' + index }">
                <span slot-scope="text,row" slot="invitatdate">
                    {{ global_get_local_time(row.invitatdate).format("YYYY-MM-DD HH:mm:ss") }}
                </span>

                <a-table class="nested-invite-table" slot="expandedRowRender" slot-scope="text,row" :columns="columns"
                    :data-source="row.rebatedatas" :pagination="false"
                    :rowKey="(record, index) => { return 'inner-' + index }">
                </a-table>

            </a-table>
        </div>

    </div>
</template>

<script>
import NoData from "@/components/public/NoData";
export default {
    components: {
        NoData,
    },
    props: {
        invitedRecord: {
            type: Object,
        },
    },
    data() {
        return {
            show: false,
            columns: [
                {
                    title: this.$t("Invite.invite_reg_info"),
                    dataIndex: "userid",
                    key: "userid",
                    scopedSlots: { customRender: 'userid' },
                    width: 150,
                },
                {
                    title: this.$t("Invite.invite_ref_count"),
                    dataIndex: "invitationcount",
                    key: "invitationcount",
                    width: 140,
                },
                {
                    title: this.$t("Invite.invite_hist_performance"),
                    dataIndex: "totalamount",
                    key: "totalamount",
                    width: 140,
                },
                {
                    title: this.$t("Invite.invite_create_time"),
                    dataIndex: "invitatdate",
                    key: "invitatdate",
                    width: 180,
                },
                {
                    title: this.$t("Invite.invite_details"),
                    width: 70,
                    align: 'right'
                }
            ],
        };
    },
    methods: {
        showDetail(k) {
            this.show = !this.show;
            this.$set(k, "show", !k.show);
        },
        getCurrency(id) {
            return this.$store.state.currencyinfos.filter(
                (item) => item.id == id
            )[0];
        },
    },
    mounted() { },
};
</script>

<style></style>
