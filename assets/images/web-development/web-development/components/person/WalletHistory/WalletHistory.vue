<template>
  <div class="wallet-history">
    <a-card class="wallet-history-card" :bordered="false">
      <a-row :gutter="16">
        <a-col :lg="24">
          <p class="mb-0 billing-txt fw-5 col-alignment">{{ $t('person.Billing_Details_person') }}</p>
        </a-col>
      </a-row>
    </a-card>
    <a-card class="mt-3 tabs-card" :bordered="false">

      <a-tabs :default-active-key="0" v-model="records" @change="changeTab">

        <a-tab-pane :key="0" :tab="$t('tabkeys.tab67')">
          <div class="shadow-card pt-4 px-4 pb-4">
            <a-row :gutter="16">
              <a-col :lg="6" :xl="5" v-show="records == 0">
                <hex-select ref="capitaltypes" :label="$i18n.t('leverage.zj_capitalflow')"
                  :type="$i18n.t('leverage.zj_capitalflow')" :order="capitaltypes" :market="capitaltypetext"
                  @searchData="searchData" @change="change" @clearCurrentState="clearCurrentState" />
              </a-col>
              <a-col :lg="6" :xl="5">
                <hex-select ref="currencyDetails" :label="$i18n.t('Waddress.selectCion')"
                  :type="$i18n.t('Waddress.selectCion')" :order="currencyDetails" :market="currencyid"
                  @searchData="searchData" @change="change" @clearCurrentState="clearCurrentState" />
              </a-col>
              <a-col :lg="7" :xl="6">
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
          <HistoryTable :historyColumns="fundHistoryColums" :historyData="capitalDetails" :loading="loading">
            <template #currency="{ row }"><img :src="getCurrencyIcon(row)" width="20" height="20" class="mr-2" />{{
              global_get_uppercase(row.currencyname) }}</template>
            <template #assetBefore="{ row }">{{ global_get_tofixed(row.amountbefore,
              global_get_decimal(row.currencyname).a) }}</template>
            <template #quantity="{ row }">{{ global_get_tofixed(row.amount,
              global_get_decimal(row.currencyname).a) }}</template>
            <template #assetAfter="{ row }">{{ global_get_tofixed(row.amountafter,
              global_get_decimal(row.currencyname).a) }}</template>
            <template #createTime="{ row }"><span class="last-create-time">{{ getRecordTime(row) }}</span> </template>
          </HistoryTable>
        </a-tab-pane>
        <a-tab-pane :key="1" :tab="$t('wallet.moneyRecord')">
          <div class="shadow-card pt-4 px-4 pb-4">
            <a-row :gutter="16">
              <a-col :lg="5" v-show="records == 0">
                <hex-select ref="capitaltypes" :label="$i18n.t('leverage.zj_capitalflow')"
                  :type="$i18n.t('leverage.zj_capitalflow')" :order="capitaltypes" :market="capitaltypetext"
                  @searchData="searchData" @change="change" @clearCurrentState="clearCurrentState" />
              </a-col>
              <a-col :lg="5">
                <hex-select ref="currencyDetails" :label="$i18n.t('Waddress.selectCion')"
                  :type="$i18n.t('Waddress.selectCion')" :order="currencyDetails" :market="currencyid"
                  @searchData="searchData" @change="change" @clearCurrentState="clearCurrentState" />
              </a-col>
              <a-col :lg="6">
                <a-range-picker @change="changeDate" v-model="calender" />
              </a-col>
              <a-col :lg="4" :xl="3" class="some-code-btn-space">

                <span @mouseover="hoverKey = 5" @mouseleave="hoverKey = -1">

                  <a-button block class="outline-btn fw-5 px-2" @click="resetSelect">
                    <svg width="15" height="15" class="svg-icon mr-2 refresh-icon" >
                                        <use :xlink:href="hoverKey == 5 ? '/images/svg/sprite.svg#refresh-white-icon':'/images/svg/sprite.svg#refresh-icon-icon'"></use>
                                        </svg>
                  {{ $t('memberCenter.reset')
                      }}</a-button>
                </span>

              </a-col>
            </a-row>
          </div>
          <HistoryTable :historyColumns="depositHistoryColums" :historyData="chargeRecord" :loading="loading">
            <template #coins="{ row }">{{ getRecordTime(row) }}</template>
            <template #network="{ row }">{{ row.ctype.toUpperCase() }}</template>
            <template #txid="{ row }"><a :href="row.blockchainexplorer + row.id" class="deposit-table-txt fw-5">{{ row.id
            }}</a></template>
            <template #currency="{ row }"><img :src="getCurrencyIcon(row)" width="15" height="15" class="mr-2" />{{
              global_get_uppercase(row.currencyname) }}</template>
            <template #status="{ row }"><span :class="row.status == 1 ? 'success-active' : 'red-active'">{{
              global_get_charge_state(row.status) }}</span></template>
            <template #action="{ row }"><span class="pointer deposit-table-txt fw-5" @click="upPop(row)">{{ $t('extra.extra14')
            }}</span></template>
          </HistoryTable>
        </a-tab-pane>

        <a-tab-pane :key="2" :tab="$t('wallet.mentionRecord')">
          <div class="shadow-card pt-4 px-4 pb-4">
            <a-row :gutter="16">
              <a-col :lg="5" v-show="records == 0">
                <hex-select ref="capitaltypes" :label="$i18n.t('leverage.zj_capitalflow')"
                  :type="$i18n.t('leverage.zj_capitalflow')" :order="capitaltypes" :market="capitaltypetext"
                  @searchData="searchData" @change="change" @clearCurrentState="clearCurrentState" />
              </a-col>
              <a-col :lg="5">
                <hex-select ref="currencyDetails" :label="$i18n.t('Waddress.selectCion')"
                  :type="$i18n.t('Waddress.selectCion')" :order="currencyDetails" :market="currencyid"
                  @searchData="searchData" @change="change" @clearCurrentState="clearCurrentState" />
              </a-col>
              <a-col :lg="6">
                <a-range-picker @change="changeDate" v-model="calender" />
              </a-col>
              <a-col :lg="4" :xl="3" class="some-code-btn-space">
                <span @mouseover="hoverKey = 4" @mouseleave="hoverKey = -1">
                  <a-button block class="outline-btn fw-5 px-2" @click="resetSelect">
                    <svg width="15" height="15" class="svg-icon mr-2 refresh-icon" >
                                        <use :xlink:href="hoverKey == 4 ? '/images/svg/sprite.svg#refresh-white-icon':'/images/svg/sprite.svg#refresh-icon-icon'"></use>
                                        </svg>
                  {{ $t('memberCenter.reset')
                      }}</a-button>
                </span>

              </a-col>
            </a-row>
          </div>
          <HistoryTable :historyColumns="withdrawHistoryColums" :historyData="mentionRecord" :loading="loading">
            <template #coins="{ row }">{{ getRecordTime(row) }}</template>
            <template #amount="{ row }">{{ row.amount }}</template>
            <template #network="{ row }">{{ row.ctype.toUpperCase() }}</template>
            <template #currency="{ row }"><img :src="getCurrencyIcon(row)" width="15" height="15"
                class="mr-2" />{{ global_get_uppercase(row.currencyname) }}</template>
            <template #status="{ row }"><span
                :class="row.status == 1 ? 'success-active' : 'yellow-active'">{{ global_get_mention_state(row.status) }}</span></template>
            <template #action="{ row }"><span class="pointer deposit-table-txt fw-5"
                @click="upPop(row)">{{ $t('frnd_recom.fr20') }}</span></template>
          </HistoryTable>
        </a-tab-pane>
      </a-tabs>
      <div class=" px-3 pb-4 text-right" v-if="total > 0">
        <a-pagination background @change="handChange" :page-size="page.pagesize" :current="page.pageindex"
          popper-class="paging" layout="prev, pager, next" :total="total">
        </a-pagination>
      </div>
    </a-card>
    <WalletDetailModal v-if="popupstate" :walletDetailModal="popupstate" :close="closePopup" :selectedRow="selectedRow"
      :title="records == 2 ? this.$t('newkeys.nk3') : this.$t('newkeys.nk4')" />
  </div>
</template>

<script>
import select from '@/components/security/deal_select'
import HistoryTable from './HistoryTable.vue'
import WalletDetailModal from './WalletDetailModal.vue'
export default {
  name:'WalletHistory',
  components: {
    WalletDetailModal,
    HistoryTable,
    "hex-select": select
  },
  computed: {
    capitaltypes: function () {
      return [
        {
          id: 0,
          value: this.$t('leverage.zj_capitalflow'),//资产流水
          type: 'type'
        },
        {//类型
          id: -1,//状态
          value: this.$t('leverage.margin_capitalflow'),//杠杆流水
          type: 'type'
        }, {
          id: -2,
          value: this.$t('leverage.contract_capitalflow'),//合约流水
          type: 'type'
        }, {
          id: -3,
          value: this.$t('leverage.contract_P2P'),//P2P流水
          type: 'type'
        }, 
        
        // {  <!-- moved to playcard branh -->
        //   id: -4,
        //   value: this.$t('newkeys.nk5'),//P2P流水
        //   type: 'type'
        // }
      ]
    }
  },
  data() {
    return {
      loading: true,
      popupstate: false,//撤销弹窗
      chargeRecordStatus: true,
      mentionRecordStatus: true,
      hoverKey: -1,
      records: 0,
      calender: [],
      selectedRow: {},
      chargeRecord: [],
      mentionRecord: [],
      capitalDetails: [],
      currencyDetails: [],
      visibleDetailRows: [],
      chargeText: true,
      searchParam: {},
      capitaltypetext: this.$t('leverage.zj_capitalflow'),
      currencyid: this.$t('formMenu.select'),
      total: 0,
      found: false,
      page: {
        pageindex: 1,
        pagesize: 10,
      },
      fundHistoryColums: [
        {
          title: this.$t("tableskeys.it1"),
          dataIndex: 'currency',
          key: 'currency',
          scopedSlots: { customRender: 'currency' },
          width: 100,
        },
        {
          title: this.$t("tableskeys.wa1"),
          dataIndex: 'typename',
          key: 'typename',
          width: 180,
        },

        {
          title: this.$t("tableskeys.wa2"),
          dataIndex: 'assetBefore',
          key: 'assetBefore',
          scopedSlots: { customRender: 'assetBefore' },
          width: 110,
        },
        {
          title: this.$t("tableskeys.wa3"),
          dataIndex: 'quantity',
          key: 'quantity',
          scopedSlots: { customRender: 'quantity' },
          width: 100,
        },
        {
          title: this.$t("tableskeys.wa4"),
          dataIndex: 'assetsAfter',
          key: 'assetsAfter',
          scopedSlots: { customRender: 'assetAfter' },
          width: 110,
        },
        {
          title: this.$t("tableskeys.wa5"),
          dataIndex: 'id',
          key: 'id',
          width: 120,
        },
        {
          title: this.$t("tableskeys.wa6"),
          dataIndex: 'createTime',
          key: 'createTime',
          scopedSlots: { customRender: 'createTime' },
          width: 180,
          align: 'end'
        },
      ],
      depositHistoryColums: [
        {
          title: this.$t("tableskeys.it1"),
          dataIndex: 'currency',
          key: 'currency',
          scopedSlots: { customRender: 'currency' },
          width: 80,
        },
        {
          title: this.$t("tableskeys.lh5"),
          dataIndex: 'amount',
          key: 'amount',
          width: 80,
        },
        {
          title: 'TXID',
          dataIndex: 'id',
          key: 'id',
          scopedSlots: { customRender: 'txid' },
          width: 120,
        },
        {
          title: this.$t("tableskeys.wa8"),
          dataIndex: 'ctype',
          key: 'ctype',
          scopedSlots: { customRender: 'network' },
          width: 100,
        },
        {
          title: 'ID',
          dataIndex: 'id',
          key: 'id',
          width: 120,
        },
        {
          title: this.$t("tableskeys.wa7"),
          dataIndex: 'coins',
          key: 'coins',
          scopedSlots: { customRender: 'coins' },
          width: 160,
        },
        {
          title: this.$t("tableskeys.tt4"),
          dataIndex: 'status',
          key: 'status',
          scopedSlots: { customRender: 'status' },
          width: 140,

        },
        {
          title: this.$t("tableskeys.tt6"),
          dataIndex: 'action',
          key: 'action',
          scopedSlots: { customRender: 'action' },
          width: 80,
          align: 'end'
        },
      ],
      withdrawHistoryColums: [
        {
          title: this.$t("tableskeys.it1"),
          dataIndex: 'currency',
          key: 'currency',
          scopedSlots: { customRender: 'currency' },
          width: 90,
        },
        {
          title: this.$t("tableskeys.lh5"),
          dataIndex: 'amount',
          key: 'amount',
          scopedSlots: { customRender: 'amount' },
          width: 140,
        },
        {
          title: 'TXID',
          dataIndex: 'id',
          width: 120,
        },
        {
          title: this.$t("tableskeys.wa8"),
          dataIndex: 'ctype',
          key: 'ctype',
          scopedSlots: { customRender: 'network' },
          width: 120,
        },
        {
          title: this.$t("tableskeys.wa9"),
          dataIndex: 'address',
          key: 'address',
          width: 140,
        },
        {
          title: this.$t("tableskeys.wa6"),
          dataIndex: 'coins',
          key: 'coins',
          scopedSlots: { customRender: 'coins' },
          width: 160,
        },
        {
          title: this.$t("tableskeys.tt4"),
          dataIndex: 'status',
          key: 'status',
          scopedSlots: { customRender: 'status' },
          width: 90,
        },
        {
          title: this.$t("tableskeys.tt6"),
          dataIndex: 'action',
          key: 'action',
          scopedSlots: { customRender: 'action' },
          width: 80,
          align: 'end'
        },
      ],
    }
  },
  methods: {
    changeTab(key) {
      this.resetSelect()
      if (key > 0) {
        this.getUserCoin(key);
      } else {
        this.getcapitalDetails(true, 1);
      }

    },
    search() {
      if (this.records > 0) {
        this.getUserCoin(this.records);
      } else {
        this.getcapitalDetails(false, 1);
      }
    },
    changeDate(date, dateString) {
      this.searchParam['startTime'] = dateString[0];
      this.searchParam['endTime'] = dateString[1];
      this.search();
    },
    closePopup() {
      this.popupstate = !this.popupstate;
    },
    upPop(val) {
      this.selectedRow = val;
      this.popupstate = !this.popupstate;
    },
    getcapitalDetails(val, pageIndex) {
      this.capitalDetails = [];
      this.total = 0;
      this.loading = true;
      this.page.pageindex = pageIndex ? pageIndex : 1;
      var postData = Object.assign(this.searchParam, this.page, { uid: this.$userinfo.uid, key: this.$userinfo.secretkey, pagesize: this.page.pagesize });
      this.$store.dispatch('user_assets_record_getlist', postData).then(({ data }) => {
        if (data) {
          this.capitalDetails = data.pagedata;
          this.total = data.totalitemcount;
        } else {
          this.total = 0;
          this.capitalDetails = [];
        }
        this.loading = false;
      })
    },
    repealcoinitem(id) {//提币撤销
      this.$store.dispatch("user_assets_withdraw_revoke", { withdrawid: id }).then((res) => {
        if (res) {
          this.popupstate = !this.popupstate;
          let fliterData = [];
          this.mentionRecord.forEach((item) => {
            if (item.id != id) {
              fliterData.push(item);
            }
          });
          this.mentionRecord = fliterData;
          this.total = fliterData.length;
          this.total ? this.found = false : this.found = true;
          this.$store.commit('set_message', { type: 'ok', text: res.msg })
        }
        this.$refs.popname.closeLoading();
      })
    },
    getRecordTime: function (coinitem) {
      return (coinitem.updatetime && coinitem.status == 1) ? this.global_get_local_time(coinitem.updatetime).format('YYYY-MM-DD hh:mm a') : this.global_get_local_time(coinitem.createtime).format('YYYY-MM-DD hh:mm a')
    },
    isVisibleDetailRow(rowid) {
      return this.visibleDetailRows.indexOf(rowid) >= 0
    },
    handChange(val) {
      if (this.records > 0) {
        this.getUserCoin(this.records, val);
      }
      else {
        this.getcapitalDetails(true, val);
      }

    },
    getUserCoin(val, pageIndex) {
      this.loading = true;
      this.records = val;
      this.found = false;
      this.mentionRecord = [];
      this.chargeRecord = [];

      if (val == 1) {
        this.chargeRecordStatus = true;
        this.chargeText = true;
      } else {
        this.mentionRecordStatus = true;
        this.chargeText = false;
      }
      this.page.pageindex = pageIndex ? pageIndex : 1;
      var postData = Object.assign(this.searchParam, this.page);
      postData.type = val;
      this.$store.dispatch("user_assets_exchange_record", postData)
        .then(({ data }) => {
          if (data) {
            if (val == 1) {
              this.total = data.totalitemcount;
              this.chargeRecord = data.pagedata;
              for (var i = 0; i < this.chargeRecord.length; i++) {
                if (this.chargeRecord[i]['userremark'] != null && this.chargeRecord[i]['currencyname'] == 'USDT') {
                  var userremark_mention = this.chargeRecord[i]['userremark']
                  var pate = userremark_mention.match(/实际充币金额为：(\S*)，当前/)
                  if (pate != null && this.chargeRecord[i]['status'] == 1) {
                    this.chargeRecord[i]['actualtoaccount'] = pate[1] + 'usd'
                  } else if (pate != null && this.chargeRecord[i]['status'] != 1) {
                    this.chargeRecord[i]['actualtoaccount'] = '--'
                  } else {
                    this.chargeRecord[i]['actualtoaccount'] = 0
                  }
                } else if (this.chargeRecord[i]['currencyname'] == 'EUR' && this.chargeRecord[i]['status'] == 1) {
                  this.chargeRecord[i]['actualtoaccount'] = 0
                } else {
                  this.chargeRecord[i]['actualtoaccount'] = 0
                }
              }

              this.total ? this.found = false : this.found = true;
            } else {
              this.total = data.totalitemcount;
              this.mentionRecord = data.pagedata;
              for (var i = 0; i < this.mentionRecord.length; i++) {
                if (this.mentionRecord[i]['userremark'] != null && this.mentionRecord[i]['currencyname'] == 'USDT') {
                  var userremark_mention = this.mentionRecord[i]['userremark']
                  var pate = userremark_mention.match(/实际到账:(\S*),usd/)
                  if (pate != null && this.mentionRecord[i]['status'] == 1) {
                    this.mentionRecord[i]['actualtoaccount'] = pate[1]
                  } else if (pate != null && this.mentionRecord[i]['status'] != 1) {
                    this.mentionRecord[i]['actualtoaccount'] = '--'
                  } else {
                    this.mentionRecord[i]['actualtoaccount'] = 0
                  }
                } else if (this.mentionRecord[i]['currencyname'] == 'EUR' && this.mentionRecord[i]['status'] == 1) {
                  this.mentionRecord[i]['actualtoaccount'] = 0
                } else {
                  this.mentionRecord[i]['actualtoaccount'] = 0
                }
              }
              this.total ? this.found = false : this.found = true;
            }
          } else {
            this.total = 0;
            this.found = true;
          }
          this.loading = false;
          this.chargeRecordStatus = false;
          this.mentionRecordStatus = false;
        })
    },
    showDetailRow(row) {
      if (!this.isVisibleDetailRow(row.id)) {
        this.visibleDetailRows.push(row.id)
      } else {
        this.visibleDetailRows.splice(this.visibleDetailRows.indexOf(row.id), 1);
      }
      this.$forceUpdate()
    },
    searchData(val) {//用于存子组件传过来数据
      this.searchParam[val.type] = val.id;
      this.search();
    },
    change(val) {
      const _self = this;
      switch (val) {
        case 'capitaltypes':
          _self.$refs.capitaltypes.changeBack();
          break;
        case 'currencyDetails':
          _self.$refs.currencyDetails.changeBack();
          break;
      }
    },
    clearCurrentState(id) {
      this.searchParam[id] = {};
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
    getCurrencyIcon(item) {
      const icon = this.$store.state.currencyinfos.filter(_i => _i.currencyname == item.currencyname)[0].icon;
      return icon;
    },
    resetSelect() {
      this.$refs.capitaltypes.clearStatus();
      this.$refs.currencyDetails.clearStatus();
      this.calender = []
      this.searchParam = {};
      this.search();
    },
  },
  mounted() {
    this.getcapitalDetails(true, 1);
    this.getallcoininfos();
    this.resetSelect()

    const currentTab = this.$route.query.tab

    if (currentTab == 'withdraw') {
      this.records = 2
      this.changeTab(2)
    }

  }

}
</script>

<style></style>
