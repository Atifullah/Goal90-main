<template>
  <div class="dealcoin-list">
    <div class="dealcoin-title clearfix">
      <ul class="coin-title clearfix">
        <li class="coin-title_item order-book" @click.stop="opentradedetail(8)">
          {{ $t('ico.ico34') }}
        </li>
        <!-- @click.stop="opentradedetail(9)" -->

        <li class="coin-title_item hide-tab assets-transfer" @click.stop="opentradedetail(9)"
          v-if="symbleinfo.itype == 1 && showAssetsTab">
          {{ $t('contract.assets') }}
        </li>
        <li class="coin-title_item active market-trade" @click.stop="opentradedetail(10)">
          {{ $t('deal.newargain') }}
        </li>
      </ul>
    </div>
    <dl class="dealcoin-list_content">
      <dt class="header">
        <span class="time">{{ $t('deal.time') }}</span>
        <span class="num">{{ $t('deal.transactionPrice') }}</span>
        <span class="money">{{ $t('deal.count') }}</span>
      </dt>
      <div v-bar class="dealcoin-list_content_body hex-loading" v-hex-loading="loading">
        <div class="content-body">
          <dd class="body" :class="{ new: getnewbodyclass(m) }" v-for="(m, i) in tradingDetail" :key="'1st' + i"
            v-if="m.amount > 0">
            <span class="time">{{ global_get_local_time(m.ts).format('HH:mm:ss') }}</span>
            <span class="num" :class="{ 'buy': m.direction == 1, 'sale': m.direction != 1 }">{{
              global_get_tofixed_entrust(m.price, symbleinfo.pricedigits)
            }}</span>
            <span class="money">{{ getamount(m.amount) }}</span>
          </dd>
        </div>
      </div>
    </dl>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'TradeDetail',
  components: {
  },
  computed: {},
  props: {
    symbleinfo: {
      type: Object,
      default: function () {
        return {}
      }
    },
    showAssetsTab: {
      type: Boolean
    },
    showOrderTab: {
      type: Boolean
    }
  },

  data() {
    return {
      menutype: 9,
      //交易明细
      tradingDetails: [],
      loading: false,
      pagehidden: false,
      symbleParameString: "",
      symblefrom: "",
      symbleto: "",
      dcs: {},
      isworking: false
    }
  },
  computed: {
    ...mapGetters('trade', ['getSocketTradeDetail', 'getSocketTradeDetailData']),
    tradingDetail: function () {
      return this.getSocketTradeDetailData
    }
  },

  watch: {
    'symbleinfo': function (val) {
      if (val && val.descriptions) {
        this.watchSymbolInfoData()
      }
    },
    'getSocketTradeDetail': {
      handler: function (val, oldVal) {
        this.socketData(val)
      },
      deep: true,
      immediate: true
    }
  },

  methods: {
    opentradedetail(type) {
      this.menutype = type
      this.$emit('setEntrustType', type)
    },
    getnewbodyclass(item) {
      if (item._new) {
        setTimeout(() => {
          item._new = false
        }, 500)
      }
      return item._new
    },
    getamount(a) {
      const amount = this.global_get_tofixed_entrust(a, this.symbleinfo.amountdigits)
      return amount
    },
    watchSymbolInfoData() {
      const symbolInfo = this.symbleinfo
      if (!symbolInfo.descriptions) {
        return
      }
      this.dcs = this.global_get_decimal(symbolInfo.descriptions);
      this.symbleParameString = symbolInfo.descriptions.replace("/", "")
      this.symblefrom = symbolInfo.fcurrencyname;
      this.symbleto = symbolInfo.tcurrencyname;
      this.socketData(this.getSocketTradeDetail)
    },

    socketData(data) {

      data.data.forEach(element => { 
        if (element.amount > 0) {
          /*更新title*/
           if (this.symbleto.toUpperCase() == "YX") { 
            this.$store.commit('setTitleSeo', this.global_get_tofixed_entrust(element.price, this.dcs.p) + ' ' + this.symblefrom + this.$t('deal_new.dn10') + ' | BitNasdaq');
          } else {
            this.$store.commit('setTitleSeo', this.global_get_tofixed_entrust(element.price, this.dcs.p) + ' ' + this.symblefrom + '/' + this.symbleto + ' | BitNasdaq');
          } 
          element.symble = this.symbleParameString 
          this.$pubsub.publish(this.$pubsub.changeNewMoney, element)
          this.isworking = true; 
        }
      });
    }
  },
  mounted() {
    //激活页面 

    document.addEventListener("visibilitychange", () => {
      this.pagehidden = document.hidden
    });

    if (this.isworking == false) {
      this.watchSymbolInfoData()
    }

  },
  created() {
  },
  beforeDestroy() {
  }
}
</script>
<style lang="less" scoped>
@import "../../static/styles/color";

.dealcoin-list {
  background: #0C1014;
  color: #555A5F;
  height: 100%;
  overflow: hidden;
  font-weight: 500 !important;

  .dealcoin-list_title {
    font-size: 14px;
    color: @cl_8790A1;
    padding-left: 10px;
    border-bottom: 1px solid @cl_292E39;

    >span {
      line-height: 30px;
      font-weight: bold;
    }
  }

  .dealcoin-list_content {
    font-size: 12px;
    width: 100%;
    color: @cl_fff;
    line-height: 25px;
    position: relative;

    .header {
      line-height: 30px;
      height: 30px;
      padding: 0 2px;
      display: table;
      width: 100%;
      color: @cl_ADB1B8;
      font-weight: 500;
    }

    .body {
      height: 25px;
      line-height: 25px;
      display: table;
      width: 100%;
      transition: background-color 0.4s cubic-bezier(.645, .045, .355, 1);
    }

    .body.new {
      background-color: @cl_282D37;
    }

    .time {
      padding-left: 8px;
    }

    .money {
      padding-right: 16px;
    }

    .dealcoin-list_content_body {
      overflow-y: auto;
      height: 285px;

      .content-body {
        // max-height: 205px;
      }

      .num.buy {
        color: @cl_buy;
      }

      .num.sale {
        color: @cl_sell;
      }
    }

    dt span,
    dd span {
      display: table-cell;
      white-space: nowrap;
      z-index: 1;
      position: relative;
    }

    dt span.time,
    dd span.time {
      text-align: left;
      width: 20%;
    }

    dt span.num,
    dd span.num {
      text-align: right;
      width: 39%;
    }

    dt span.money,
    dd span.money {
      text-align: right;
      width: 41%;
    }
  }
}

.pro {
  .dealcoin-list {
    .dealcoin-list_content {
      .dealcoin-list_content_body {
        height: 195px;
      }
    }
  }
}

.dealcoin-list {
  background-color: @cl_content;
  width: inherit;

  .coin-title {
    color: @cl_ADB1B8;
    // border-bottom: 1px solid @cl_292E39;
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
      color: @cl_link;
    }
  }
}


@media only screen and (min-width: 1800px) {
  .dealcoin-list {
    .dealcoin-list_content {
      .dealcoin-list_content_body {
        height: 195px;
      }
    }
  }

  .hide-tab {
    display: none;
  }
}
</style>
