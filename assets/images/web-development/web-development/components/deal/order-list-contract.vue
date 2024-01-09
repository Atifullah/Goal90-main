<template>
  <!-- 当前委托 -->
  <div class="exchange-record">
    <div class="exchange-record_title">
      <span :class="{ 'active': changeState == 1 }" @click="tabChange(1)">{{ $t('contract.shippingSpace') }}
        <span v-if="listhaveorderinfos.length > 0">({{ listhaveorderinfos.length }})</span>
      </span>
      <span :class="{ 'active': changeState == 2 }" @click="tabChange(2)">{{ $t('patch.OpenOrder1') }}
        <span v-if="openOrders.length > 0">({{ openOrders.length }})</span>
      </span>
      
      
      <span :class="{ 'active': changeState == 3 }" @click="tabChange(3)"> {{ $t('contract.historicalCommission') }}</span>
      <!-- <span :class="{ 'active': changeState == 4 }" @click="tabChange(4)">{{ $t('contract.financialRecords') }}</span> -->
      <span :class="{ 'active': changeState == 8 }" @click="tabChange(8)"> {{ $t('patch.historicalPosition') }}</span>
      <span :class="{ 'active': changeState == 9 }" @click="tabChange(9)"> {{ $t('patch.transactionDetails') }}</span>
      <span :class="{ 'active': changeState == 5 }" @click="tabChange(5)">{{ $t('patch.patch1') }}</span>
      <span :class="{ 'active': changeState == 6 }" @click="tabChange(6)">{{ $t('patch.patch2') }}</span> 
      <span :class="{ 'active': changeState == 11 }" @click="tabChange(11)">{{ $t('patch.billing_detail') }}</span>

    </div>
    <div :style="{ 'width': isPro? 'calc(100vw - 331px)': '100%'}">
      <Positions v-if="changeState == 1" :symbleinfo="symbleinfo" :multiple="multiple" :isSelect="isSelect" :loadingProps="loadingProps"
      :listhaveorderinfos="positionsOrders" :entrustBuyRate="entrustBuyRate" :entrustSaleRate="entrustSaleRate"
      :dailyDetail="dailyDetail" :contractassesinfo="contractassesinfo" @getContractAssesInfos="getContractAssesInfos"
      :isCloseAll="isCloseAll" @onAllClosed="isCloseAll = false; confirmCloseAll = false" :isPro="isPro" :currentContractPriceList="currentContractPriceList"/>
    </div>
    <OpenOrders :symbleinfo="symbleinfo" v-show="changeState == 2" :changeState="changeState" :isSelect="isSelect"
      @onOrderListReceived="orderListReceived" />
    <TradeHistory :symbleinfo="symbleinfo" v-if="changeState == 3" :isSelect="isSelect" :changeState="changeState"
      :margin="margin" />
    <FundingDetail :symbleinfo="symbleinfo" v-if="changeState == 4" :isSelect="isSelect" :changeState="changeState"
      ref="leveragecap" />
    <Strategies v-if="changeState == 5" :changeState="changeState" :symbleinfo="symbleinfo" :isSelect="isSelect" />
    <StrategyDetail v-if="changeState == 6" :changeState="changeState" :symbleinfo="symbleinfo" :isSelect="isSelect" />
    <FinancialRecords  v-if="changeState == 7" :changeState="changeState" :symbleinfo="symbleinfo" :isSelect="isSelect" />
    <HistoricalPosition  v-if="changeState == 8" :changeState="changeState" :symbleinfo="symbleinfo" :isSelect="isSelect" />
    <TransactionDetails  v-if="changeState == 9" :changeState="changeState" :symbleinfo="symbleinfo" :isSelect="isSelect" />
    <ConfirmModal :show="confirmCloseAll" :text="$t('contract.confirm_close_all_positions')"
      @onClose="confirmCloseAll = false" @onConfirm="onConfirmCloseAll" />
      <FutureDetail  v-if="changeState == 11" :changeState="changeState" :symbleinfo="symbleinfo" :isSelect="isSelect" />

  </div>
</template>
<script>
import Positions from '@/components/deal/order-list-positions'
import OpenOrders from '@/components/deal/order-list-entrust-contract'
import TradeHistory from '@/components/deal/order-list-transaction-contract'
import FundingDetail from '@/components/deal/order-list-capitalflow-full';
import Strategies from '@/components/deal/strategy-table';
import StrategyDetail from '@/components/deal/strategy-table-details';
import FinancialRecords from '@/components/deal/financial-records';
import HistoricalPosition from '@/components/deal/historical-position';
import TransactionDetails from '@/components/deal/transaction-details';
import { mapGetters } from 'vuex'
import FutureDetail from '@/components/deal/order-list-future-detail'

import ConfirmModal from '../App/ConfirmModal.vue';

export default {
  name: 'OrderListContract',
  components: {
    OpenOrders,
    Positions,
    TradeHistory,
    FundingDetail,
    Strategies,
    StrategyDetail,
    ConfirmModal,
    FinancialRecords,
    HistoricalPosition,
    TransactionDetails,
    FutureDetail

  },
  props: {
    loadingProps: false,
    symbleinfo: {
      type: Object,
      default: function () {
        return {}
      }
    },
    margin: '',
    multiple: 0,
    entrustBuyRate: '',
    entrustSaleRate: '',
    listhaveorderinfos: [],
    contractassesinfo: {},
    dailyDetail: {
      type: Object,
      default: function () {
        return {};
      },
    },
    isPro: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    'checked': function (val) {
      if (val) {
        this.isSelect = this.symbleinfo.descriptions;
      } else {
        this.isSelect = '';
      }
    },
    'getContractAllMarketList': {
      handler(newValue, oldValue) {
      if (newValue) {
        let list = Array.from(newValue)
        if (this.currentContractPriceList.length == 0) {
          this.currentContractPriceList = Array.from(newValue)
        }
        list.map(citem => {
          let fountd = false
          this.currentContractPriceList.map( (item, index) => {
            if (item.ctid == citem.ctid) {
              this.currentContractPriceList[index] = citem
                fountd = true
              }
            })
            if (!fountd) {
                this.currentContractPriceList.push(citem)
              }
          })
         }
        
      },
      immediate: true
    },
    strategyTabActive: function (val) {
      this.changeState = this.strategyTabActive ? 5 : 1
    }
  },
  data() {
    return {
      //交易记录
      checked: false,
      found: false,
      total: 0,
      tradingRecord: [],
      changeState: 1,
      isSelect: '',
      openOrders: [],
      confirmCloseAll: false,
      isCloseAll: false,
      positionFilters: [
        {
          label: this.$t('manage.all'),
          value: 'all'
        },
        {
          label: this.$t('security.cc7'),
          value: 1
        },
        {
          label: this.$t('security.cc8'),
          value: -1
        },


      ],
      filter: 'all',
      currentDirection: null,
      currentContractPriceList: []
    }
  },
  computed: {
    ...mapGetters("strategy", ["strategyTabActive"]),
    ...mapGetters("market", ["getContractAllMarketList"]),
    positionsOrders() {
      if (this.currentDirection) { // 1, -1
        return this.listhaveorderinfos.filter((order) => order.direction == this.currentDirection)
      } else if (this.currentDirection == null) {
        return this.listhaveorderinfos
      }
    }
  },
  created() {
  },
  mounted() {
    console.log('11111')
  },
  methods: {
    //设置订单类型
    tabChange(num) {
      this.changeState = num
      console.log(this.changeState)
      if (num == 1) {
        this.$emit('getContractAssesInfos');
      }
    },
    getContractAssesInfos(val) {
      this.$emit('getContractAssesInfos',val);
    },
    orderListReceived(list) {
      this.openOrders = list
    },
    changePositinFilter(value) {
      console.log('value', value);
      if (value == 1 || value == -1) {
        this.currentDirection = value
      } else if (value == 'all') {
        this.currentDirection = null
      }
    },
    onConfirmCloseAll() {
      this.isCloseAll = true
    }
  }
}
</script>
<style scoped lang="less">
@import "../../static/styles/color";

.exchange-record {
  background-color: @cl_content;
  margin-bottom: 6px;
  font-size: 12px;
  color: @cl_CED3DD;

  .exchange-record_table_body .sale {
    color: @cl_sell;
  }

  .exchange-record_table span.tr {
    text-align: right;
  }
 
  .exchange-record_title {
    color: @cl_ADB1B8;
    font-size: 14px;
    // border-bottom: 1px solid @cl_292E39;

    >span {
      font-weight: bold;
      line-height: 30px;
      text-align: center;
      display: inline-block;
      cursor: pointer;
      padding: 0 10px;
    }

    .active {
      border-top: 2px solid @cl_link;
      background-color: #0C1014;
      color: @cl_fff !important;
    }
  }

  .exchange-record_table {
    display: table;
    width: 100%;
  }

  .exchange-record_table_header {
    font-size: 12px;
    color: @cl_8790A1;
    display: table-header-group;
  }

  .exchange-record_table_header span,
  .exchange-record_table_body span {
    display: table-cell;
    padding: 8px 20px;
    line-height: 22px;
  }

  .exchange-record_table_body {
    background-color: @cl_1a2;
    font-size: 12px;
    color: @cl_c5c;
  }

  .exchange-record_table_body .buy {
    color: @cl_buy;
  }

  .anonymous {
    background: none;
  }

  .entrust-list_title {
    padding: 0;
  }

  p.entrust-list_title:first-child {
    margin: 0 10px;
  }

  .entrust-list_title {
    color: rgba(197, 195, 221, 1);
  }

  .entrust-list_title.active {
    border-bottom: 2px solid @cl_link;
    color: white;
  }

  /*分页*/
  .paging-source-deal {
    padding: 10px 0;
    text-align: center;

    .el-pagination.is-background .btn-next,
    .el-pagination.is-background .btn-prev,
    .el-pagination.is-background .el-pager li {
      background: rgba(26, 33, 52, 1);
      border: 1px solid rgba(52, 75, 108, 1);
      color: rgba(189, 188, 203, 1);
    }
  }

  .repeal {
    color: @cl_link;
    cursor: pointer;
  }
}

.label-tip {
  font-size: 12px;
  font-weight: 500;
  color: @cl_ADB1B8;
  line-height: 14px;
}

:deep(.ant-checkbox-inner) {
  background-color: transparent;
  border: 1px solid #858789;
  border-radius: 3px;
}
</style>
