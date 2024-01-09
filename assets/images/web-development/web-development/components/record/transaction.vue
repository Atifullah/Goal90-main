<template>
  <div class="">
    <div class="" v-if="isSelect">
      <div class="shadow-card pt-4 pb-4 px-4">
        <a-row :gutter="16">
          <a-col :lg="4">
            <hex-select ref="ordertype" :label="$i18n.t('patch.Type')" :type="$i18n.t('patch.Type')" :order="ordertype"
              :market="ordertypetext" @searchData="searchData" @change="change" @clearCurrentState="clearCurrentState" />
          </a-col>
          <a-col :lg="4">
            <hex-select ref="dirction" :label="$i18n.t('patch.Side')" :type="$i18n.t('patch.Side')" :order="direction"
              :market="directiontext" @searchData="searchData" @change="change" @clearCurrentState="clearCurrentState" />
          </a-col>
          <a-col :lg="4">
            <hex-select ref="market" :label="$i18n.t('patch.Market')" :type="$i18n.t('patch.Market')" :order="market"
              :market="markettext" :margin="margin" @searchData="searchData" @change="change"
              @clearCurrentState="clearCurrentState" />
          </a-col>
          <a-col :lg="4">
            <hex-select ref="orderstatus" :label="$i18n.t('patch.Status')" :type="$i18n.t('patch.Status')"
              :order="orderstatusselect" :market="orderstatusselecttext" @searchData="searchData" @change="change"
              @clearCurrentState="clearCurrentState" />
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
      <div class="main-currency-card">

      <div class="currency-detail px-4 pt-2">
        <a-row :gutter="5" class="px-3">
          <a-col :lg="3">
            <p class="type-coin-txt fw-4">{{ $t('record.rec1') }}</p>
          </a-col>
          <a-col :lg="4">
            <p class="type-coin-txt fw-4">{{ $t('record.rec4') }}</p>
          </a-col>
          <a-col :lg="4">
            <p class="type-coin-txt fw-4">{{ $t('record.rec5') }}</p>
          </a-col>
          <a-col :lg="3">
            <p class="type-coin-txt fw-4">{{ $t('record.rec6') }}</p>
          </a-col>
          <a-col :lg="3">
            <p class="type-coin-txt fw-4">{{ $t('record.rec8') }}</p>
          </a-col>
          <a-col :lg="2" >
            <p class="type-coin-txt fw-4 right">{{ $t('record.rec7') }}</p>
          </a-col>
          <a-col :lg="3" align="end" style="float: right;">
            <p class="type-coin-txt fw-4">{{ $t('record.rec3') }}</p>
          </a-col>
        </a-row>
        <a-card :bordered="false" class="currency-detail-card" v-for="(item, index) in orderDetail" :key="index"
          :class="index == 0 ? 'first-card' : ''">
          <a-row class="px-3 curency-detail-bg">
            <a-col :lg="14">
              <p class="mb-0 currency-txt fw-5"><span :class="getSide(item) == 'Sell' ? 'sell-txt' : 'buy-txt'">{{
                getSide(item) }}</span>              <span class="currency-txt fw-5 usdt-txt ml-2">
                {{ item.ordersource == 7 ? $t('deal.strategyTrade') : item.triggerprice > 0 ? global_get_order_type(3) :
                  global_get_order_type(Number(item.ordertype)) }}
              </span><a-divider type="vertical" class="mx-2" />{{ timeChange(global_get_local_time(item.createtime)) }}</p>
            </a-col>
            <a-col :lg="10" align="end">
              <p class="mb-0 copy-link-txt fw-5"><span :id="`keycopy${index}`">{{ item.id }}</span>
                <AppClipboard :target="`#keycopy${index}`" element-class="link-url1" />

                  </p>
            </a-col>
          </a-row>
          <a-row :gutter="5" class="px-3 py-4 col-alignment">
            <a-col :lg="3">
              <p class="currency-txt fw-5 usdt-txt mb-0"><img :src="getCurrencyIcon(item)" width="20" height="20"
                  class="mr-2" />{{ global_get_uppercase(item.symble).replace('/YX', ' ' + $t('contract.swap')) }}</p>
            </a-col>
            <a-col :lg="4">
              <p class="currency-txt fw-5 usdt-txt mb-0">
                {{ item.price > 0 ? global_get_tofixed(item.price, global_get_decimal(item.symble).p) : '--' }}/{{
                  item.triggerprice > 0 ? cutZero(global_get_tofixed(item.triggerprice,
                    global_get_decimal(item.symble).p)) : '--' }}</p>
            </a-col>
            <a-col :lg="4">
              <p class="currency-txt fw-5 usdt-txt mb-0">
                <a-tooltip v-if="numberTradeValue(item).length > 18">
                  <template slot="title">
                    {{ numberTradeValue(item) }}
                  </template>
                  {{ numberTradeValue(item).substring(0, 18) + '...' }}
                </a-tooltip>
                <span v-else>
                  {{ numberTradeValue(item) }}
                </span>
              </p>
            </a-col>
            <a-col :lg="3">
              <p class="currency-txt fw-5 usdt-txt mb-0">
                <a-tooltip v-if="priceValue(item).length > 9">
                  <template slot="title">
                    {{ priceValue(item) }}
                  </template>
                  {{ priceValue(item).substring(0, 9) + '...' }}
                </a-tooltip>
                <span v-else>
                  {{ priceValue(item) }}
                </span>
              </p>
            </a-col>
            <a-col :lg="3">
              <p class="currency-txt fw-5 usdt-txt mb-0">{{ cutZero(global_get_tofixed(global_get_fee(item), 8)) }}</p>
            </a-col>
            <a-col :lg="3">
              <p class="usdt-txt mb-0 ml-5" :class="(item.orderstatus == 3 ? 'success-active' : 'red-active')">
                {{ global_get_order_state(item.orderstatus) }}
              </p>
            </a-col>
            <a-col :lg="4" align="end" style="float: right;">
              <p class="currency-txt fw-5 usdt-txt mb-0" >{{ timeChange(global_get_local_time(item.createtime)) }}</p>
            </a-col>
          </a-row>
        </a-card>
        <NoData v-if="orderDetail.length < 1" :loading="loading"/>
        <div v-if="total > 0" class="mt-4 text-right">
          <a-pagination background @change="handChange" :page-size="serachOrder.pagesize" :current="serachOrder.pageindex"
            popper-class="paging" layout="prev, pager, next" :total="total">
          </a-pagination>
        </div>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppClipboard from '~/components/App/AppClipboard.vue';

import more from '@/components/public/more'
import select from '@/components/security/deal_select'
import NoData from '~/components/public/NoData';
import Clipboard from 'clipboard';

export default {
  name: 'articles',
  props: ['isSelect', 'margin'],
  components: {
    'hex-more': more,
    "hex-select": select,
    NoData,
    AppClipboard
  },
  computed: {
    orderstatusselect: function () {
      return [
        {
          id: 3,
          value: this.$t('person.traded'),//未成交
          type: 'orderstatus'
        },
        {
          id: 4,
          value: this.$t('person.Partial'),//部分成交
          type: 'orderstatus'
        },
        {
          id: '2,5',
          value: this.$t('person.withdrawn'),//已撤单
          type: 'orderstatus'
        }
      ]
    },
    ordertype: function () {
      if (this.margin === 'margin') {
        return [
          {//类型
            id: 4,//状态
            value: this.$t('deal.limitedDeal'),//杠杆限价交易
            type: 'ordertype'
          }, {
            id: 6,
            value: this.$t('deal.marketDeal'),//杠杆市价交易
            type: 'ordertype'
          }, {
            id: 5,
            value: this.$t('deal.stopLoss'),//杠杆止盈止损
            type: 'ordertype'
          }]
      } else if (this.margin === 'contract') {
        return [
          {//类型
            id: 1,//状态
            value: this.$t('contract.openLimit'),//开仓限价交易
            type: 'ordertype'
          }, {
            id: 2,
            value: this.$t('contract.openMarket'),//开仓市价交易
            type: 'ordertype'
          }, {
            id: 3,
            value: this.$t('contract.openStop'),//开仓止盈止损交易
            type: 'ordertype'
          }, {//类型
            id: 4,//状态
            value: this.$t('contract.closeLimit'),//平仓限价交易
            type: 'ordertype'
          }, {
            id: 6,
            value: this.$t('contract.closeStop'),//平仓止盈止损交易
            type: 'ordertype'
          }]
      }
      else {
        return [
          {//类型

            id: 1,//状态
            value: this.$t('deal.limitedDeal'),//限价交易
            type: 'ordertype'
          }, {
            id: 2,
            value: this.$t('deal.marketDeal'),//市价交易
            type: 'ordertype'
          }, {
            id: 3,
            value: this.$t('contract.planLoss'),//止盈止损
            type: 'ordertype'
          }]
      }
    },
    direction: function () {
      return [
        {//方向
          id: 1,
          value: this.$t('memberCenter.buy'),//买入
          type: 'direction'
        }, {
          id: -1,
          value: this.$t('memberCenter.sell'),//卖出
          type: 'direction'
        }
      ]
    }
  },
  data() {
    return {
      loading: true,
      found: false,
      total: 0,
      hoverKey: -1,
      orderState: true,
      serachOrder: {
        pagesize: 10,
        pageindex: 1,
        orderstatus: '2,3,4'
      },
      searchParam: {},
      directiontext: "direction",
      ordertypetext: "ordertype",
      markettext: "symble",
      orderstatusselecttext: "orderstatus",
      orderDetail: [],
      market: [],
    }
  },
  mounted() {
    this.getUserDeal(true);
  },
  methods: {
    timeChange(time) {
      time = new Date(time)
      let year = time.getFullYear()
      let month = time.getMonth() + 1
      let day = time.getDate()
      let hours = time.getHours()
      let minute = time.getMinutes()
      if(month <10){
        month = '0' + month;
      }else{
        month = month;
      }
      if(day < 10){
        day = '0' + day
      }else{
        day = day;
      }
      if(hours < 10){
        hours = '0' + hours
      }else{
        hours = hours;
      }
      if(minute < 10){
        minute = '0' + minute
      }else{
        minute = minute;
      }
      return year + '-' + month + '-' + day + ' ' + hours + ':' + minute
    },
    handChange(val) {
      this.getUserDeal(false, val);
    },
    getSide(item) {
      return item.symble.indexOf('/YX') > -1 ? this.global_get_contract_order_direction(item.ordertype, item.direction) : this.global_get_order_direction(item.direction);
    },
    getCurrencyIcon(item) {
      const icon = this.$store.state.currencyinfos.filter(_i => _i.currencyname == item.symble.split('/')[0])[0].icon;
      return icon;
    },

    numberTradeValue(item) {
      const no = this.global_get_tofixed(item.amount, this.global_get_decimal(item.symble).a)
      const traded = this.global_get_tofixed(item.transactionamount, this.global_get_decimal(item.symble).a)
      const value = `${this.cutZero(no)}/${this.cutZero(traded)}`
      return value
    },
    priceValue(item) {
      const value = this.global_get_tofixed(this.getavgprice(item), this.global_get_decimal(item.symble).p)
      return this.cutZero(value)
    },

    change(val) {
      const _self = this;
      switch (val) {
        case 'direction':
          _self.$refs.ordertype.changeBack();
          _self.$refs.market.changeBack();
          _self.$refs.orderstatus.changeBack();
          break;
        case 'ordertype':
          _self.$refs.dirction.changeBack();
          _self.$refs.market.changeBack();
          _self.$refs.orderstatus.changeBack();
          break;
        case 'symble':
          _self.$refs.dirction.changeBack();
          _self.$refs.ordertype.changeBack();
          _self.$refs.orderstatus.changeBack();
          break;
        case 'orderstatus':
          _self.$refs.dirction.changeBack();
          _self.$refs.ordertype.changeBack();
          _self.$refs.market.changeBack();
          break;
      }
    },
    getavgprice(m) {
      const ary = [1, 3, 4];
      if (ary.indexOf(m.orderstatus) < 0) {
        return '--'
      } else {
        return m.tradeavgprice
      }
    },
    getVolume(coin) {// 已成交=委托量/成交均价
      return coin.amount / this.getavgprice(coin)
    },
    coinDecimal(coin) {
      return coin.split('/')[1];
    },
    clearCurrentState(id) {
      this.searchParam[id] = {};
    },
    resetSelect() {
      this.$refs.dirction.clearStatus();
      this.$refs.ordertype.clearStatus();
      this.$refs.market.clearStatus();
      this.$refs.orderstatus.clearStatus();
      this.searchParam = {};
      this.getUserDeal(false);
    },
    searchData(val) {//用于存子组件传过来数据
      this.searchParam[val.type] = val;
      this.getUserDeal(false)
    },
    getAllPrice(coins) {
      const p = coins.tradeavgprice * coins.transactionamount;
      if (!p) return p.toFixed(2);
      return this.global_get_tofixed(p);
    },
    // 过去用户交易记录
    getUserDeal(val, pageIndex) {
      if (this.isSelect) {
        this.$refs.dirction.changeBack();
        this.$refs.ordertype.changeBack();
        this.$refs.market.changeBack();
        this.$refs.orderstatus.changeBack();
      }
      let serachOrder = this.serachOrder;
      const _params = this.searchParam;
      val || !pageIndex ? serachOrder.pageindex = 1 : serachOrder.pageindex = pageIndex;
      let symble, direction, ordertype, orderstatus;
      _params.symble == undefined ? symble = [] : symble = Object.getOwnPropertyNames(_params.symble);
      _params.direction == undefined ? direction = [] : direction = Object.getOwnPropertyNames(_params.direction);
      _params.ordertype == undefined ? ordertype = [] : ordertype = Object.getOwnPropertyNames(_params.ordertype);
      _params.orderstatus == undefined ? orderstatus = [] : orderstatus = Object.getOwnPropertyNames(_params.orderstatus);
      ordertype.length > 0 ? serachOrder[_params.ordertype.type] = _params.ordertype.id : delete serachOrder.ordertype;
      direction.length > 0 ? serachOrder[_params.direction.type] = _params.direction.id : delete serachOrder.direction;
      symble.length > 0 ? serachOrder[_params.symble.type] = _params.symble.value : delete serachOrder.symble;
      orderstatus.length > 0 ? serachOrder[_params.orderstatus.type] = _params.orderstatus.id : serachOrder['orderstatus'] = '2,3,4';

      serachOrder.itype = (this.margin === 'margin') ? 1 : 0;
      var url
      if (this.margin == "contract") {
        url = 'usercontract_order_search'
      } else {
        url = 'trading_order_search'
      }
      this.$store.dispatch(url, serachOrder).then(({ data }) => {
        if (data) {
          this.total = data.totalitemcount;
          this.orderDetail = data.pagedata;
          this.found = false;
        } else {
          this.found = true;
          this.total = 0;
          this.orderDetail = [];
        }
        this.loading = false;
      })
    }
  }
}
</script>
