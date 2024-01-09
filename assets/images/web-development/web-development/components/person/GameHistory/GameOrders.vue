<template>
  <div class="wallet-history">
    <a-card class="wallet-history-card" :bordered="false">
      <a-row :gutter="16">
        <a-col :lg="24">
          <p class="mb-0 billing-txt fw-5 col-alignment">{{$t('game.game1')}}</p>

        </a-col>
      </a-row>
    </a-card>
    <a-card class="mt-3 tabs-card" :bordered="false">

      <a-tabs :default-active-key="0" @change="changeTab">

        <a-tab-pane :key="0" tab="Open Betting">
          <div class="shadow-card pt-4 px-4 pb-4">
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
                <span @mouseover="hoverKey = 2" @mouseleave="hoverKey = -1"
                  >
                  <a-button block class="outline-btn fw-5 refresh-btn px-2" @click="refreshData">
                    <svg width="15" height="15" class="svg-icon mr-2 refresh-icon" >
                                        <use :xlink:href="hoverKey == 2 ? '/images/svg/sprite.svg#refresh-white-icon':'/images/svg/sprite.svg#refresh-icon-icon'"></use>
                                        </svg>
                    {{ $t('memberCenter.reset') }}
                  </a-button>
                </span>
              </a-col>
            </a-row>
          </div>
          <GameOrderTable :historyColumns="fundHistoryColums" :historyData="capitalDetails" :loading="loadingOrders">
            <template #currency="{ row }"><img :src="row.icon" width="15" height="15" class="mr-2" />
              {{ global_get_uppercase(row.currencyname) }}
            </template>


            <template #amount="{ row }">
              {{ cutZero(global_get_tofixed(row.amount,
                global_get_decimal(row.currencyname).a)) }}
            </template>

            <template #profit="{ row }">
              {{ cutZero(global_get_tofixed(row.profit,
                global_get_decimal(row.currencyname).a)) }}
            </template>


            <template #createTime="{ row }">
              <span class="last-create-time">{{ getRecordTime(row) }}</span>
            </template>
          </GameOrderTable>
        </a-tab-pane>

        <a-tab-pane :key="1" :tab="$t('play_game.pg28')">
          <div class="shadow-card pt-4 px-4 pb-4">
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

                <span @mouseover="hoverKey = 5" @mouseleave="hoverKey = -1">
                  <a-button block class="outline-btn fw-5 refresh-btn" @click="refreshData">
                    <svg width="15" height="15" class="svg-icon mr-2 refresh-icon" >
                                        <use :xlink:href="hoverKey == 5 ? '/images/svg/sprite.svg#refresh-white-icon':'/images/svg/sprite.svg#refresh-icon-icon'"></use>
                                        </svg>
                    {{ $t('memberCenter.reset') }}
                  </a-button>
                </span>

              </a-col>
            </a-row>
          </div>
          <GameOrderTable :historyColumns="fundHistoryColums" :historyData="capitalDetails" :loading="loadingOrders">
            <template #currency="{ row }"><img :src="row.icon" width="15" height="15" class="mr-2" />
              {{ global_get_uppercase(row.currencyname) }}
            </template>


            <template #amount="{ row }">
              {{ cutZero(global_get_tofixed(row.amount,
                global_get_decimal(row.currencyname).a)) }}
            </template>

            <template #profit="{ row }">
              {{ cutZero(global_get_tofixed(row.profit,
                global_get_decimal(row.currencyname).a)) }}
            </template>


            <template #createTime="{ row }">
              <span class="last-create-time">{{ getRecordTime(row) }}</span>
            </template>
          </GameOrderTable>
        </a-tab-pane>


      </a-tabs>
      <div class=" px-3 pb-4 text-right">

        <AppPagination :paginatedObject="listPagination" @onChange="handlePageChange" />




      </div>
    </a-card>

  </div>
</template>

<script>
import select from '@/components/security/deal_select'
import GameOrderTable from './GameOrderTable.vue'
import WalletDetailModal from './WalletDetailModal.vue'
import AppPagination from '~/components/AppPagination.vue'
import { mapActions, mapGetters } from 'vuex'

export default {
  name:'GameOrders',
  components: {
    WalletDetailModal,
    GameOrderTable,
    "hex-select": select,
    AppPagination
  },
  data() {
    return {
      hoverKey: -1,
      calender: [],

      currencyDetails: [],
      searchParam: {},
      currencyid: this.$t('formMenu.select'),
      pageIndex: 1,
      pageSize: 10,
      fundHistoryColums: [
        {
          title: this.$t("tableskeys.it1"),
          dataIndex: 'currency',
          key: 'currency',
          scopedSlots: { customRender: 'currency' },
          width: 80,
        },
        {
          title: this.$t('contract.amount'),
          dataIndex: 'amount',
          key: 'amount',
          scopedSlots: { customRender: 'amount' },
          width: 80,
        },
        {
          title: this.$t('game.game2'),
          dataIndex: 'profit',
          key: 'profit',
          scopedSlots: { customRender: 'profit' },
          width: 80,
        },
        {
          title: this.$t("tableskeys.wa5"),
          dataIndex: 'id',
          key: 'id',
          width: 80,
        },
        {
          title: this.$t("tableskeys.wa6"),
          dataIndex: 'createTime',
          key: 'createTime',
          scopedSlots: { customRender: 'createTime' },
          width: 80,
          align: 'left'
        },
      ],
    }
  },

  computed: {
    ...mapGetters('playcard', ['getBetOrders', 'listPagination']),
    ...mapGetters('general', ['loadingOrders']),

    capitalDetails: function () {
      return this.getBetOrders
    }
  },
  methods: {
    ...mapActions('playcard', ['fetchBettingOrders']),

    changeTab(key) {
      // this.resetSelect()
      //console.log('key:', key);
      this.pageSize = 10
      this.pageindex = 1

      this.searchParam = {
        pageSize: this.pageSize,
        pageIndex: this.pageIndex,
        status: 1
      }

      if (key == 0) {
        this.searchParam.status = -1
        this.fetchBettingOrders(this.searchParam)
      } else {
        this.fetchBettingOrders(this.searchParam)
      }

    },

    changeDate(date, dateString) {
      this.searchParam.pageSize = 10
      this.searchParam.pageIndex = 1
      this.searchParam['beginTime'] = dateString[0];
      this.searchParam['endTime'] = dateString[1];
      this.fetchBettingOrders(this.searchParam)
    },

    getRecordTime: function (coinitem) {
      return (coinitem.updatetime && coinitem.status == 1) ? this.global_get_local_time(coinitem.updatetime).format('YYYY-MM-DD hh:mm a') : this.global_get_local_time(coinitem.createtime).format('YYYY-MM-DD hh:mm a')
    },


    handlePageChange: function (val) {
      this.searchParam.pageIndex = val
      this.fetchBettingOrders(this.searchParam)
    },


    searchData(val) {//用于存子组件传过来数据

      //console.log('val:sea: ', val);
      this.searchParam.pageIndex = 1
      this.searchParam.pageSize = 10
      this.searchParam.currencyID = val.id

      this.fetchBettingOrders(this.searchParam)
    },
    change(val) {

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
    refreshData() {
      this.searchParam.pageIndex = 1
      this.fetchBettingOrders(this.searchParam)
    },
    resetSelect() {
      this.$refs.currencyDetails.clearStatus();
      this.calender = []
      this.searchParam = {};
      // this.search();
    },
  },
  mounted() {
    this.getallcoininfos();
    this.resetSelect()
    this.searchParam = {
      pageSize: this.pageSize,
      pageIndex: this.pageIndex,
      status: -1
    }

    this.fetchBettingOrders(this.searchParam)
  }

}
</script>

<style></style>
