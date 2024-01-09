<template>
  <!-- 现货订单 -->
  <div class="exchange-record">
    <div class="exchange-record_title">
      <span v-show="symbletype == -1" :class="{ 'active': changeState == 3 }" @click="tabChange(3)">{{
        $t('leverage.currentApplication') }}</span>

      <span :class="{ 'active': changeState == 1 }" @click="tabChange(1)">{{ $t('patch.OpenOrder') }}

        <span v-if="openOrders.length > 0">({{ openOrders.length }})</span>
      </span>
      <span :class="{ 'active': changeState == 2 }" @click="tabChange(2)">{{ $t('patch.TradeHistory') }}</span>

      <!-- <span   :class="{ 'active': changeState == 4 }" @click="tabChange(4)">{{
        $t('leverage.capitalFlow') }}</span> -->

      <span class="right hide-trading">
        <a-checkbox v-model="checked">
          <span class="label-tip">{{ $t('c2c.hideCoin') }}</span>
        </a-checkbox>
      </span>
      <span :class="{ 'active': changeState == 5 }" @click="tabChange(5)">{{ $t('patch.patch1') }}</span>
      <span :class="{ 'active': changeState == 6 }" @click="tabChange(6)">{{ $t('patch.patch2') }}</span>
      <span :class="{ 'active': changeState == 7 }" @click="tabChange(7)">{{ $t('patch.billing_detail') }}</span>

    </div>

    <CurrentBorrow v-if="changeState == 3" :symbleinfo="symbleinfo" :isSelect="isSelect"
      :leverageCtidInfo="leverageCtidInfo" :applicationApproved="applicationApproved" ref="leverageloan" />

    <OpenOrders v-if="changeState == 1" :symbleinfo="symbleinfo" :changeState="changeState" :isSelect="isSelect"
      :symbletype="symbletype" @onOrderListReceived="orderListReceived" />

    <TradeHistory v-if="changeState == 2" :symbleinfo="symbleinfo" :changeState="changeState" :isSelect="isSelect"
      :symbletype="symbletype" />

    <!-- <FundingDetail v-if="changeState == 4" :symbleinfo="symbleinfo" :isSelect="isSelect"
      :leverageCtidInfo="leverageCtidInfo" :applicationApproved="applicationApproved" ref="leveragecap" /> -->

    <Strategies v-if="changeState == 5" :changeState="changeState" :symbleinfo="symbleinfo" :isSelect="isSelect" />
    <StrategyDetail v-if="changeState == 6" :changeState="changeState" :symbleinfo="symbleinfo" :isSelect="isSelect" />
    <BillingDetail  v-if="changeState == 7" :changeState="changeState" :symbleinfo="symbleinfo" :isSelect="isSelect" />

  </div>
</template>
<script>
import OpenOrders from '@/components/deal/order-list-entrust'
import BillingDetail from '@/components/deal/order-list-billing-detail'
import TradeHistory from '@/components/deal/order-list-transaction'
import CurrentBorrow from '@/components/deal/order-list-loan-full';
import FundingDetail from '@/components/deal/order-list-capitalflow-full';
import Strategies from '@/components/deal/strategy-table';
import StrategyDetail from '@/components/deal/strategy-table-details';
import { mapGetters } from 'vuex'

export default {
  name: 'order-list',
  components: {
    OpenOrders,
    TradeHistory,
    CurrentBorrow,
    FundingDetail,
    Strategies,
    StrategyDetail,
    BillingDetail
  },
  props: {
    symbleinfo: {
      type: Object,
      default: function () {
        return {}
      }
    },
    leverageCtidInfo: {
      type: Object,
      default: function () {
        return {}
      }
    },
    symbletype: 0,
    defaultTab: {
      type: String | Number,
      default: 1
    }
  },
  watch: {
    'checked': function (val) {
      if (val) {
        this.isSelect = this.symbleinfo.descriptions;
      } else {
        this.isSelect = '';
      }
    },
    'leverageCtidInfo': function (val) {
      if (val) {
        if (Number(val.riskrate) <= 1.1 && Number(val.riskrate) > 0) {
          this.percentage = '100%'
        } else if (Number(val.riskrate) > 1.1 && Number(val.riskrate) < 2) {
          this.percentage = `${((val.riskrate - 1.1) / (2 - 1.1)) * 100}%`
        } else {
          this.percentage = 0
        }
      }
    },
    strategyTabActive: function (val) {
      this.changeState = this.strategyTabActive ? 5 : 1
    }
  },
  data() {
    return {
      //交易记录
      checked: false,
      applicationApproved: false,
      changeState: 3,
      isSelect: '',
      openOrders: []
    }
  },
  computed: {
    ...mapGetters("strategy", ["strategyTabActive"]),
  },
  created() {
  },/*订阅相关消息*/
  mounted() {
    this.tabChange(this.defaultTab)
  },
  methods: {
    //设置订单类型
    tabChange(num) {
      this.changeState = num
    },
    orderListReceived(list) {
      this.openOrders = list
      //console.log('listlistlistlist', list);
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
  color: @cl_ADB1B8;

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
    display: table-row;
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
  color: @cl_71757A;
  line-height: 14px;
}

.exchange-record :deep(.ant-checkbox-inner) {
  background-color: transparent;
  border: 1px solid #858789;
  border-radius: 3px;
}
</style>
