<template>
  <!-- 合约资产信息 -->
  <div class="dealcoin-list dealcoin-info">
    <div class="dealcoin-title clearfix">
      <ul class="coin-title clearfix">
        <!-- <li class="coin-title_item  order-book" @click.stop="opentradedetail(8)">
          Order Book
        </li>
       -->
        <li class="coin-title_item active  assets-transfer" @click.stop="opentradedetail(9)">
          {{ $t('contract.assets') }}
        </li>
        <li class="coin-title_item hide-tab  market-trade" @click.stop="opentradedetail(10)">
          {{ $t('deal.newargain') }}
        </li>
      </ul>
    </div>
    <div class='contractcoininfo scroll-bar' v-bar :style="strategyTradeOpened ? 'height: 420px' : ''">
      <div class="dealcoin-items">
        <dl class="clearfix">
          <dt class="tooltip-hover">
            <a-tooltip placement="bottom">
              <div slot="title">
                {{ $t('contract.accountEquityTip') }}
              </div>
              {{ $t('contract.accountEquity') }}({{ contractassesinfo.amount > 0 ? symblefrom : "USDT" }})
            </a-tooltip>
          </dt>
          <dd v-if="contractType == 1">≈{{ global_get_tofixed(contractassesinfo.accountequity, 2) }}</dd>
          <dd v-else>≈{{ contractassesinfo.amount > 0 ? global_get_tofixed(contractassesinfo.accountequity,
            global_get_decimal(symblefrom).a)
            : global_get_tofixed(contractassesinfo.accountequity * dailyDetail.mp, 2) }}</dd>
        </dl>
        <!-- <dl class="clearfix" v-if="contractType != 1">
          <dt class="tooltip-hover">
            <a-tooltip placement="bottom">
              <div slot="title">
                {{ $t('contract.profitandlossamountTip') }}
              </div>
              {{ $t('contract.profitandlossamount') }}({{ contractassesinfo.amount > 0 ? symblefrom : "USDT" }})
            </a-tooltip>
          </dt>
          <dd>{{ contractassesinfo.amount > 0 ? global_get_tofixed(contractassesinfo.profitandlossamount,
            global_get_decimal(symblefrom).a) :
            global_get_tofixed(contractassesinfo.profitandlossamount * contractassesinfo.holdpositionsavgprice, 2) }}
          </dd>
        </dl> -->
        <!-- <dl class="clearfix">
          <dt class="tooltip-hover">
            <a-tooltip placement="bottom">
              <div slot="title">
                {{ $t('contract.unrealizedTip') }}
              </div>
              {{ $t('contract.unrealized') }}({{ contractassesinfo.amount > 0 ? symblefrom : "USDT" }})
            </a-tooltip>
          </dt>
          <dd v-if="contractType == 1">≈{{global_get_tofixed(contractassesinfo.unrealizedprofitandlossamount, 2)}}</dd>
          <dd v-else>≈{{ contractassesinfo.amount > 0 ? global_get_tofixed(contractassesinfo.unrealizedprofitandlossamount,
            global_get_decimal(symblefrom).a)
            : global_get_tofixed(contractassesinfo.unrealizedprofitandlossamount * contractassesinfo.holdpositionsavgprice, 2) }}</dd>
        </dl> -->
        <dl class="clearfix">
          <dt class="tooltip-hover">
            <a-tooltip placement="bottom">
              <div slot="title">
                {{ $t('contract.canuseamountTip') }}
              </div>
              {{ $t('contract.ct4') }}({{ contractassesinfo.amount > 0 ? symblefrom : "USDT" }})
            </a-tooltip>
          </dt>
          <dd>{{
            contractassesinfo.amount > 0 ?
            global_get_tofixed(contractassesinfo.canuseamount, global_get_decimal(symblefrom).a)
            : global_get_tofixed(contractassesinfo.canuseamount_usdt, 2)
          }} </dd>
        </dl>
        <dl class="clearfix">
          <dt class="tooltip-hover">
            <a-tooltip placement="bottom">
              <div slot="title">
                {{ $t('contract.unrealizedTip') }}
              </div>
              {{ $t('contract.unrealized1') }}({{ contractassesinfo.amount > 0 ? symblefrom : "USDT" }})
            </a-tooltip>
          </dt>
          <dd v-if="contractType == 1">≈{{global_get_tofixed(contractassesinfo.unrealizedprofitandlossamount, 2)}}</dd>
          <dd v-else>≈{{ contractassesinfo.amount > 0 ? global_get_tofixed(contractassesinfo.unrealizedprofitandlossamount,
            global_get_decimal(symblefrom).a)
            : global_get_tofixed(contractassesinfo.unrealizedprofitandlossamount * contractassesinfo.holdpositionsavgprice, 2) }}</dd>
        </dl>
        <dl class="clearfix">
          <dt class="tooltip-hover">
            ROI
          </dt>
          <dd v-if="contractType == 1">≈{{global_get_tofixed((contractassesinfo.unrealizedprofitandlossamount / contractassesinfo.holdpositionsamount)* 100 , 2)  }}%</dd>
          <!-- <dd v-else>≈{{ contractassesinfo.amount > 0 ? global_get_tofixed(contractassesinfo.unrealizedprofitandlossamount,
            global_get_decimal(symblefrom).a)
            : global_get_tofixed(contractassesinfo.unrealizedprofitandlossamount * contractassesinfo.holdpositionsavgprice, 2) }}</dd> -->
        </dl>
        <dl class="clearfix">
          <dt class="tooltip-hover">
            <a-tooltip placement="bottom">
              <!-- <div slot="title">
                {{ $t('contract.unrealizedTip') }}
              </div> -->
              {{ $t('contract.maintenance') }}({{ contractassesinfo.amount > 0 ? symblefrom : "USDT" }})
            </a-tooltip>
          </dt>
          <dd v-if="contractType == 1">≈{{global_get_tofixed(contractassesinfo.mholdpositionsamount, 2)}}</dd>
          <dd v-else>≈{{ contractassesinfo.amount > 0 ? global_get_tofixed(contractassesinfo.holdpositionsamount,
            global_get_decimal(symblefrom).a)
            : global_get_tofixed(contractassesinfo.holdpositionsamount, 2) }}</dd>
        </dl>
        <dl class="clearfix">
          <dt class="tooltip-hover">
            <a-tooltip placement="bottom">
              <!-- <div slot="title">
                {{ $t('contract.unrealizedTip') }}
              </div> -->
              {{ $t('contract.marginRatio') }}
            </a-tooltip>
          </dt>
          <dd v-if="contractType == 1">≈{{global_get_tofixed(contractassesinfo.marginrate, 2)}}%</dd>
          <dd v-else>≈{{ contractassesinfo.amount > 0 ? global_get_tofixed(contractassesinfo.holdpositionsamount,
            global_get_decimal(symblefrom).a)
            : global_get_tofixed(contractassesinfo.holdpositionsamount, 2) }}</dd>
        </dl>
        <dl class="clearfix">
          <dt class="tooltip-hover">
            <a-tooltip placement="bottom">
              <!-- <div slot="title">
                {{ $t('contract.unrealizedTip') }}
              </div> -->
              {{ $t('contract.trialFee') }}(USDT)
            </a-tooltip>
          </dt>
          <dd >≈{{global_get_tofixed(contractassesinfo.experienceamount, 2)}}</dd>
        </dl>
        <div class="clearfix mt-4">
          <div class="button_style" @click="showPop()"> {{ $t('leverage.transfer') }}</div>
        </div>
        <!-- <dl class="clearfix">
          <dt class="tooltip-hover">
            <a-tooltip placement="bottom">
              <div slot="title">
                {{ $t('contract.holdpositionsamountTip') }}
              </div>
              {{ $t('contract.holdpositionsamount') }}({{ contractassesinfo.amount > 0 ? symblefrom : "USDT" }})
            </a-tooltip>
          </dt>
          <dd v-if="contractType == 1">{{ global_get_tofixed(contractassesinfo.holdpositionsamount, 2)
          }}</dd>
          <dd v-else>{{ contractassesinfo.amount > 0 ? global_get_tofixed(contractassesinfo.holdpositionsamount,
            global_get_decimal(symblefrom).a)
            : global_get_tofixed(contractassesinfo.holdpositionsamount * contractassesinfo.holdpositionsavgprice, 2)
          }}</dd>
        </dl> -->
        <!-- <dl class="clearfix">
          <dt class="tooltip-hover">
            <a-tooltip placement="bottom">
              <div slot="title">
                {{ $t('contract.explosionpriceTip') }}
              </div>
              {{ $t('contract.explosionprice') }}(USDT)
            </a-tooltip>
          </dt>
          <dd>{{ contractassesinfo ? global_get_tofixed(contractassesinfo.explosionprice, global_get_decimal('USDT').a) :
            0 }}
          </dd>
        </dl> -->
        <!-- <dl class="clearfix">
          <dt class="tooltip-hover">
            <a-tooltip placement="bottom">
              <div slot="title">
                {{ $t('contract.marginrateTip') }}
              </div>
              {{ $t('contract.marginrate') }}
            </a-tooltip>
          </dt>
          <dd>{{ contractassesinfo ? global_get_tofixed(contractassesinfo.marginrate, 2) : 0 }}%</dd>
        </dl> -->
        <!-- <dl class="clearfix">
          <dt class="tooltip-hover">
            <a-tooltip placement="bottom">
              <div slot="title">
                {{ $t('contract.earnestTip') }}
              </div>
              {{ $t('contract.earnest') }}
            </a-tooltip>
          </dt>
          <dd v-if="contractType == 1">{{ contractassesinfo ? global_get_tofixed(contractassesinfo.amount_usdt, 2) : 0 }} USDT
          </dd>
          <dd v-else>{{
            contractassesinfo ? global_get_tofixed(contractassesinfo.amount, global_get_decimal(symblefrom).a) : 0
          }} {{ symblefrom }}/{{ contractassesinfo ? global_get_tofixed(contractassesinfo.amount_usdt, 2) : 0 }} USDT
          </dd>
        </dl>
        <dl class="clearfix">
          <dt class="tooltip-hover">
            <a-tooltip placement="bottom">
              <div slot="title">
                {{ $t('contract.experience_tip') }}
              </div>
              {{ $t('contract.experience') }}(USDT)
            </a-tooltip>
          </dt>
          <dd><a href="/rewards-hub" target="_blank" style="color: white;text-decoration: underline;">{{
            contractassesinfo ? global_get_tofixed(contractassesinfo.experienceamount, 2) : 0 }}</a></dd>
        </dl>
        <dl class="clearfix">
          <dt class="tooltip-hover">
            <a-tooltip placement="bottom">
              <div slot="title">
                {{ $t('contract.adjustmentrateTip') }}
              </div>
              {{ $t('contract.adjustmentrate') }}
            </a-tooltip>
          </dt>
          <dd>{{ contractassesinfo ? global_get_tofixed(contractassesinfo.adjustmentrate, 2) : 0 }}%</dd>
        </dl> -->
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'CoinInfoContract',
  watch: {},
  props: {
    symblefrom: "",
    contractassesinfo: {
      type: Object,
      default: Object
    },
    dailyDetail: {
      type: Object,
      default: Object
    }
  },
  watch: {
    'contractassesinfo': function (val) {
      console.log('val===', val)
    }
  },
  created() {
    this.setSymbolInfosFromLocal()
  },
  mounted() {
    this.contractType = this.$route.query.contractType
  },
  data() {
    return {
      List: [],
      decimal: {},
      contractType: ''
    };
  },
  computed: {
    ...mapGetters('strategy', ['strategyTradeOpened']),
  },
  /*订阅socket相关*/
  sockets() { },
  methods: {
    opentradedetail(type) {
      this.$emit('setEntrustType', type)
    },
    showPop() {
      this.$emit('showPopHz');
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../static/styles/color";

.dealcoin-list {
  background: #0C1014;
  color: @cl_ADB1B8;
  height: 100% !important;
  font-weight: 500 !important;

}

.dealcoin-title a {
  float: right;
  font-size: 12px;
  color: @cl_f5a;
  font-weight: normal;
}

dl {
  // padding: 0 10px;
  margin: 0px;
  font-size: 12px;
}
.button_style {
    float: right;
    background-color: #f4a000;
    color: #0d1015;
    height: 28px;
    line-height: 28px;
    width: 100%;
    border-radius: 5px;
    text-align: center;
    cursor: pointer;
  }

dt,
dd {
  margin: 10px 0 4px;
  display: inline-block;
}

dt {
  cursor: pointer;
  float: left;
  border-bottom: 1px dashed @cl_ADB1B8;
}

dd {
  float: right;
  color: #fff;
}

.tooltip-hover {
  display: inline-block;
}

.tooltip-inner {
  position: relative;
  z-index: 500;
  left: 0;
  display: none;
}

.tooltip-inner .tooltip-arrow,
.tooltip-inner .tooltip-text {
  position: absolute;
  box-shadow: 0 10px 20px 0 rgba(0, 0, 0, .4);
}

.tooltip-inner .tooltip-text {
  display: block;
  font-size: 12px;
  color: #1c242c;
  word-wrap: break-word;
  border-radius: 3px;
  padding: 10px;
  bottom: 22px;
  text-align: left;
  width: 208px;
  font-style: normal;
  background-color: #fff;
}

.tooltip-inner .tooltip-arrow {
  left: 10px;
  bottom: 17px;
  background-color: transparent;
  display: inline-block;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 5px solid #fff;
}

.tooltip-hover:hover .tooltip-inner {
  display: block;
}

.dealcoin-list {
  background-color: @cl_content;

  .coin-title {
    color: @cl_ADB1B8;
    // border-bottom: 1px solid @cl_5E6573;
    font-size: 12px;
    margin: 0px;

    .coin-title_item {
      line-height: 30px;
      height: 30px;
      float: left;
      text-align: center;
      padding: 0 12px;
      cursor: pointer;
      font-weight: 600;
    }

    .coin-title_item.active {
      color: @cl_fff !important;
      border-top: 2px solid @cl_link;
      background-color: #0C1014;
      line-height: 26px;
    }

    .coin-title_item.hex-li {
      display: none;
    }

    .coin-title_item:hover {
      cursor: auto;
      color: @cl_link_hover;
    }
  }
}





@media only screen and (min-width: 1800px) {
  .hide-tab {
    display: none;
  }
}
</style>
