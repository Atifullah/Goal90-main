<template>
  <div class="tabs">
    <div v-if="!loading" class="pt-5 mt-3">
      <a-row :gutter="16">
        <a-col :lg="8" v-for="(list, key) in welfareInfos" :key="key">
          <RewardCard @onReceived="onReceived" :list="list" :getWelfareInfos="getWelfareInfos" :index="key" />
        </a-col>
      </a-row>
    </div>
    <div v-else>
      <a-spin style="height:40vh; display:flex; justify-content:center; align-items:center; background:#FDFDFD;">
        <a-icon slot="indicator" type="loading" style="font-size: 24px; " spin />
      </a-spin>
    </div>
    <a-row v-if="loggedIn">
      <a-col :lg="24">
        <a-tabs default-active-key="1" >
          <a-tab-pane key="1" :tab="$t('rewardhub.rew2')">
            <a-row :gutter="16" class="pt-4 pb-2">
              <a-col :lg="4">
                <hex-select ref="types" :label="$t('leverage.zj_capitalflow')" :type="'All'" :order="types" market="All"
                  @searchData="searchData" @change="change" @clearCurrentState="clearCurrentState" />
              </a-col>
              <a-col :lg="5">
                <a-range-picker @change="changeDate" v-model="calender" />
              </a-col>
              <a-col :lg="3" class="some-code-btn-space">
                <span @mouseover="hoverKey = 2" @mouseleave="hoverKey = -1">
                  <a-button block class="outline-btn fw-5 px-2" @click="resetSelect">
                    <svg width="15" height="15" class="svg-icon mr-2 refresh-icon">
                      <use
                        :xlink:href="hoverKey == 2 ? '/images/svg/sprite.svg#refresh-white-icon' : '/images/svg/sprite.svg#refresh-icon-icon'">
                      </use>
                    </svg>
                    {{ $t('memberCenter.reset') }}</a-button>
                </span>
              </a-col>
            </a-row>
            <a-table :columns="recieveColums" :pagination="false" :data-source="welfareRecords"
              :rowKey="(record, index) => index" :loading="loading" class="mb-4">
              <div slot="type" slot-scope="text,row">
                <p class="mb-0">{{ row.fundtype == 0 ? 'Deductible Money' : row.fundtype == 1 ? 'Experience Money' : '' }}
                </p>
              </div>
              <div slot="amount" slot-scope="text,row">
                <p class="mb-0">{{ row.amount }} {{ getCurrency(row.currencyid) }}</p>
              </div>
              <div slot="createTime" slot-scope="text,row">
                <p class="mb-0">{{ global_get_local_time(row.createtime, "YYYY-MM-DD HH:mm:ss") }}</p>
              </div>
              <div slot="expiredTime" slot-scope="text,row">
                <p class="mb-0">{{ global_get_local_time(row.expiredtime, "YYYY-MM-DD HH:mm:ss") }}</p>
              </div>
              <div slot="status" slot-scope="text,row">
                <p class="mb-0 success-active">{{ $t('rewardhub.rew4') }}</p>
              </div>
            </a-table>
          </a-tab-pane>
          <a-tab-pane key="2" :tab="$t('rewardhub.rew3')">
            <a-table :columns="usedColums" :pagination="false" :data-source="welfareAssetsRecords"
              :rowKey="(record, index) => index" :loading="loading" class="mb-4">
              <div slot="type" slot-scope="text,row">
                <p class="mb-0">{{ row.fundtype == 0 ? 'Deductible Money' : row.fundtype == 1 ? 'Experience Money' : '' }}
                </p>
              </div>
              <div slot="token" slot-scope="text,row">
                <p class="mb-0">{{ getCurrency(row.currencyid) }}</p>
              </div>
              <div slot="amount" slot-scope="text,row">
                <p class="mb-0">{{ row.amount }}</p>
              </div>
              <div slot="createTime" slot-scope="text,row">
                <p class="mb-0">{{ global_get_local_time(row.createtime, "YYYY-MM-DD HH:mm:ss") }}</p>
              </div>
              <div slot="expiredTime" slot-scope="text,row">
                <p class="mb-0">{{ global_get_local_time(row.expiredtime, "YYYY-MM-DD HH:mm:ss") }}</p>
              </div>
              <div slot="status" slot-scope="text,row">
                <p class="mb-0 success-active">{{ $t('rewardhub.rew4') }}</p>
              </div>
            </a-table>
          </a-tab-pane>
        </a-tabs>
      </a-col>
    </a-row>
    <a-row v-if="total > 0">
      <a-col :lg="24" class="text-right py-4">
        <a-pagination background @change="handChange" :page-size="page.pagesize" :current="page.pageindex"
          popper-class="paging" layout="prev, pager, next" :total="total">
        </a-pagination>
      </a-col>
    </a-row>

  </div>
</template>

<script>
import RewardCard from '@/components/RewardsHub/RewardCard.vue'
import select from '@/components/security/deal_select'
export default {
  components: {
    RewardCard,
    "hex-select": select
  },
  computed: {
    types: function () {
      return [
        {
          id: 0,
          value: this.$t('values.val13'),//资产流水
          type: 'type'
        },
        {//类型
          id: 1,//状态
          value: this.$t('values.val14'),//杠杆流水
          type: 'type'
        }
      ]
    },
    loggedIn() {
      return this.$userinfo.uid != undefined
    }
  },
  data() {
    return {
      hoverKey: -1,
      welfareInfos: [],
      welfareRecords: [],
      welfareAssetsRecords: [],
      tab: '1',
      total: 0,
      found: false,
      loading: true,
      searchParam: {},
      page: {
        pageindex: 1,
        pagesize: 10,
      },
      calender: [],
      recieveColums: [
        {
          title: 'ID',
          dataIndex: 'id',
          key: 'id',
          width: 160,
        },
        {
          title: this.$t("tableskeys.tt2"),
          dataIndex: 'type',
          key: 'type',
          scopedSlots: { customRender: 'type' },
          width: 160,
        },
        {
          title: this.$t("tableskeys.lh5"),
          dataIndex: 'amount',
          key: 'amount',
          scopedSlots: { customRender: 'amount' },
          width: 150,
        },
        {
          title: this.$t("tableskeys.wa6"),
          dataIndex: 'createtime',
          key: 'createtime',
          scopedSlots: { customRender: 'createTime' },
          width: 180,
        },
        {
          title: this.$t("tableskeys.wc8"),
          dataIndex: 'expiredtime',
          key: 'expiredtime',
          scopedSlots: { customRender: 'expiredTime' },
          width: 180,
        },
        {
          title: this.$t("tableskeys.tt4"),
          dataIndex: 'status',
          key: 'status',
          scopedSlots: { customRender: 'status' },
          width: 80,

        },
      ],
      usedColums: [
        {
          title: 'ID',
          dataIndex: 'id',
          key: 'id',
          width: 80,
        },
        {
          title: this.$t("tableskeys.wc9"),
          dataIndex: 'type',
          key: 'type',
          scopedSlots: { customRender: 'type' },
          width: 100,
        },
        {
          title: this.$t("tableskeys.bh6"),
          dataIndex: 'token',
          key: 'token',
          scopedSlots: { customRender: 'token' },
          width: 80,
        },
        {
          title: this.$t("tableskeys.lh5"),
          dataIndex: 'amount',
          key: 'amount',
          scopedSlots: { customRender: 'amount' },
          width: 80,
        },
        {
          title: this.$t("tableskeys.wc10"),
          dataIndex: 'typename',
          key: 'typename',
          width: 120,
        },
        {
          title: this.$t("tableskeys.tt5"),
          dataIndex: 'createtime',
          key: 'createtime',
          scopedSlots: { customRender: 'createTime' },
          width: 80,
        },
      ],
    }
  },
  methods: {
    onReceived(val) {
      this.$emit('onReceived', val)
    },
    async getWelfareInfos() {
      try {
        const { data } = await this.$store.dispatch('get_wefareinfos_get')
        if (data) {
          this.welfareInfos = data;
          this.loading = false;
        }
      } catch (error) {
        this.loading = false;
      }
    },
    async getWelfareRecords(pageIndex) {
      this.total = 0;
      this.loading = true;
      this.page.pageindex = pageIndex ? pageIndex : 1;
      var postData = Object.assign(this.searchParam, this.page);
      try {
        const { data } = await this.$store.dispatch('get_wefarerecords_get', postData)
        if (data) {
          this.welfareRecords = data.pagedata;
          this.total = data.totalitemcount;
        }
        else {
          this.total = 0;
          this.welfareRecords = [];
        }
        this.loading = false;
      } catch (error) {
        this.loading = false;
      }
    },
    async getWelfareAssetsRecords(pageIndex) {
      this.total = 0;
      this.loading = true;
      this.page.pageindex = pageIndex ? pageIndex : 1;
      var postData = Object.assign(this.searchParam, this.page);
      try {
        const { data } = await this.$store.dispatch('get_welfare_assets_records_get', postData)
        if (data) {
          this.welfareAssetsRecords = data.pagedata;
          this.total = data.totalitemcount;
        }
        else {
          this.total = 0;
          this.welfareAssetsRecords = [];
        }
        this.loading = false;
      } catch (error) {
        this.loading = false;
      }
    },
    getCurrency(id) {
      return this.$store.state.currencyinfos.filter(item => item.id == id)[0].currencyname;
    },
    changeTab(e) {
      if (this.$userinfo.uid) {
        this.resetSelect();
      }
    },
    search() {
      if (this.tab == '2') {
        this.getWelfareRecords();
      } else if (this.tab == '3') {
        this.getWelfareAssetsRecords();
      }
    },
    changeDate(date, dateString) {
      this.searchParam['startTime'] = dateString[0];
      this.searchParam['endTime'] = dateString[1];
      this.search();
    },
    handChange(val) {
      if (this.tab == '2') {
        this.getWelfareRecords(val)
      } else if (this.tab == '3') {
        this.getWelfareAssetsRecords(val);
      }
    },
    searchData(val) {//用于存子组件传过来数据
      this.searchParam[val.type] = val.id;
      this.search();
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
      this.search();
    },
  },
  mounted() {
    this.getWelfareInfos();
    
    if (this.loggedIn) {
      this.getWelfareRecords(1);
      this.getWelfareAssetsRecords(1); 
    }
  }
}
</script>

