<template>
  <div class="invitation-tabs">
    <a-card class="tabs-card" :bordered="false">
      <a-tabs default-active-key="1" @change="changeTab">
        <a-tab-pane key="1" :tab="$t('tabkeys.tab61')">

        </a-tab-pane>
        <a-tab-pane key="2" :tab="$t('tabkeys.tab62')">
            <a-row class="pb-5">
          <a-table
            :columns="incomeColumns"
            :pagination="true"
            :data-source="earnings"
          >
            <div slot="time" slot-scope="text,row" >
              <span >{{global_get_local_time(row.invitatdate).format('YYYY-MM-DD HH:mm:ss')}}</span>
            </div>
            <div slot="status" slot-scope="text,row" >
              <span >{{ $t('person.pi1') }}</span>
            </div>
          </a-table>
        </a-row>
        </a-tab-pane>
      </a-tabs>
    </a-card>
  </div>
</template>

<script>

import InviteTable from '@/components/person/Invitation/InviteTable'
export default {
    components: {
        InviteTable
    },
  data(){
    return{
      page: {
        pagesize: 10,
        pageindex: 1
      },
      searchParam: {},
      earnings: [],
      invitationColumns:[
        {
          title: this.$t("tableskeys.ms1"),
          dataIndex: 'invitatdate',
          scopedSlots: { customRender: 'time' },
        },
        {
          title: this.$t("tableskeys.ms2"),
          dataIndex: 'userid',
        },
        {
          title: this.$t("tableskeys.ms3"),
          dataIndex: 'status',
          scopedSlots: { customRender: 'status' },
        },
      ],
    incomeColumns:[
      {
        title: this.$t("tableskeys.ms1"),
        dataIndex: 'time',
        scopedSlots: { customRender: 'time' },

      },
      {
        title: this.$t("tableskeys.ms4"),
        dataIndex: 'remark',

      },
      {
        title: this.$t("tableskeys.ms5"),
        dataIndex: 'amount',
        scopedSlots: { customRender: 'amount' },

      },
      {
        title: this.$t("tableskeys.ms6"),
        dataIndex: 'typename',

      },
    ]
    }
  },
  methods:{
    changeTab(val) {//tab 切换
      if (val == 1) {
        this.getInviteRecord();
      } else {
        this.getinvitedearnings();
      }
    },
    getinvitedearnings(pageIndex) {//获取用户收益记录
        this.page.pageindex = pageIndex ? pageIndex : 1;
        this.searchParam['assestypes'] = [14];
        var postData = Object.assign(this.searchParam, this.page, {uid: this.$userinfo.uid, key: this.$userinfo.secretkey,pagesize:15});
        pageIndex ? postData.pageindex = pageIndex : postData.pageindex = 1;
        this.$store.dispatch('user_assets_record_getlist', postData).then(({data}) => {
          if (data) {
            this.earnings = data.pagedata;
            this.total = data.totalitemcount;
          } else {
            this.total = 0;
            this.earnings = [];
          }
          this.loading = false;
        })
    },
  }
}
</script>

<style></style>
