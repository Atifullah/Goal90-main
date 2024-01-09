<style scoped lang="less">
@import "css/order-list";
</style>
<template>
  <div class="traded">
    <div class="traded-block">
      <div class="traded_table_content">
        <table class="hex_table">
          <thead class="hex_table_header padding br">
            <tr>
              <th class="lt">
                <div>{{ $t('memberCenter.orderTime') }}</div>
              </th>
              <th class="lt">
                <div>ID</div>
              </th>
              <th class="lt">
                <div>{{ $t('memberCenter.market') }}</div>
              </th>
              <th class="lt">
                <div>{{ $t('memberCenter.type') }}</div>
              </th>
              <th class="rt">
                <div>{{ $t('memberCenter.direction') }}</div>
              </th>
              <th class="rt">
                <div>{{ $t('deal.entrustPrices') }}</div>
              </th>
              <th class="rt">
                <div>{{ $t('deal.trigger') }}</div>
              </th>
              <th class="rt">
                <div>{{ $t('deal.entrustNumber') }}</div>
              </th>
              <th class="rt">
                <div>{{ $t('memberCenter.turnover') }}</div>
              </th>
              <th class="rt">
                <div>{{ $t('memberCenter.makeprices') }}</div>
              </th>
              <th class="rt">
                <div>{{ $t('memberCenter.statue') }}</div>
              </th>
              <th class="rt">
                <div>{{ $t('home.tradeOperation') }}</div>
              </th>
            </tr>
          </thead>
          <tbody class="deal-tbody">
            <tr class="hex_table_body padding" v-for="(coins, index) in orderDetail" :key="index">
              <td class="lt">
                {{ global_get_local_time(coins.createtime).format('YYYY-MM-DD HH:mm:ss') }}
              </td>
              <td class="lt">
                {{ coins.id }}
              </td>
              <td class="lt">
                {{ global_get_uppercase(coins.symble) }}
              </td>
              <td class="lt">
                {{ coins.ordersource == 7 ? $t('deal.strategyTrade') : coins.triggerprice > 0 ? global_get_order_type(3) :
                  global_get_order_type(Number(coins.ordertype)) }}
              </td>
              <td class="rt" :class="{ 'success': coins.direction == 1, 'fail': coins.direction == -1 }">
                {{ global_get_order_direction(coins.direction) }}
              </td>
              <td class="rt">
                {{ global_get_tofixed(coins.price, global_get_decimal(coins.symble).p) }}
              </td>
              <td class="rt" v-if="coins.triggerprice > 0">
                {{ global_get_tofixed(coins.triggerprice, global_get_decimal(coins.symble).p) }}
              </td>
              <td class="rt" v-else>--</td>
              <td class="rt" v-if="coins.price == 0">
                {{ global_get_tofixed(coins.amount,(coins.price==0 && coins.direction==1)? global_get_decimal('USDT').a:global_get_decimal(coins.symble).a) }}
              </td>
              <td class="rt" v-else>
                {{ global_get_tofixed(coins.amount, global_get_decimal(coins.symble).a) }}
              </td>
              <td class="rt">
                {{ global_get_tofixed(getnum(coins), global_get_decimal(coins.symble).a) }}
              </td>
              <td class="rt">
                {{ global_get_tofixed(coins.price * coins.amount, global_get_decimal(coins.symble).p) }}
              </td>
              <td class="rt">
                {{ coins.orderstatus == 0 ? $t('memberCenter.unturn') : $t('memberCenter.sectionunturn') }}
              </td>
              <td class="rt repeal" @click="repeal(coins.id)">
                {{ $t('memberCenter.revoke') }}
              </td>
            </tr>
          </tbody>
        </table>

        <div class="anonymous" v-if="loading || !found">
          <div class="loadingPic deal" v-hex-loading="loading" v-if="loading"></div>
          <template v-if="!found">
            <div v-if="$userinfo.uid">
              <AppNoData />
            </div>
            <div v-else class="islogin">
              <nuxt-link to="/login">{{ $t('home.headLogin') }}</nuxt-link>
              /
              <nuxt-link to="/register"> {{ $t('home.headRegister') }}</nuxt-link>
            </div>
          </template>
        </div>
      </div>
      <div class="mr-3"
        :class="$store.state.hex_client_background.active == 'night' ? 'deal-paging-source' : 'text-right'"
        v-if="total > 0">


        <a-pagination background @change="handChange" :page-size="serachOrder.pagesize" :current="serachOrder.pageindex"
          popper-class="paging" layout="prev, pager, next" :total="total">
        </a-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import AppNoData from '../App/AppNoData.vue';
import AppPagination from '../AppPagination.vue';
export default {
  name: "OrderListEntrust",
  components: { AppPagination, AppNoData },
  props: ["isSelect", "changeState", "symbletype", "symbleinfo"],
  data() {
    return {
      loading: true,
      found: true,
      popupstate: false,
      serachOrder: {
        pageindex: 1,
        pagesize: 10,
        orderstatus: "0,1"
      },
      searchParam: {},
      orderDetail: [],
      market: [],
      total: 0,
    };
  },
  watch: {
    "isSelect": function (val) {
      this.getUserDeal();
    },
    "changeState": function (val) {
      if (val == 1) {
        this.getUserDeal();
      }
    }
  },
  mounted() {
    this.getUserDeal();
  },
  subscribe() {
    return {
      //订阅更新orderlist 消息
      getOrderList() {
        this.getUserDeal();
      }
    };
  },
  created() {
  },
  emits:['onOrderListReceived'],
  methods: {
    getnum(coins) {
      return this.global_get_tofixed(coins.transactionamount, this.global_get_decimal(coins.symble).a);
    },
    handChange(val) {
      this.serachOrder.pageindex = val;
      this.getUserDeal();
    },
    getavgprice(m) {
      const ary = [1, 3, 4];
      if (ary.indexOf(m.orderstatus) < 0) {
        return "--";
      }
      else {
        return m.tradeavgprice;
      }
    },
    coinDecimal(coin) {
      return coin.split("/")[1];
    },
    popup() {
      this.popupstate = !this.popupstate;
    },
    repeal(id) {
      var _self = this;
      this.$store.dispatch("trading_order_cancel", { orderid: id }).then((res) => {
        if (res.data) {
           
          _self.serachOrder = {
            orderstatus: "0,1",
            pageindex: 1,
            pagesize: 10
          }
          _self.getUserDeal();
          this.$store.commit('set_message', { type: 'ok', text: res.msg })
          setTimeout(() => {
            /*刷新资产信息*/
            _self.$pubsub.publish(this.$pubsub.getOrderList)
          }, 1000);
        }
      });
    },
    getAllPrice(coins) {
      const p = this.$np.times(coins.tradeavgprice, coins.transactionamount);
      if (!p)
        return p.toFixed(2);
      return p.toFixed(8);
    },
    //获取委托订单
    getUserDeal() {
      if (!this.$userinfo.uid) {
        this.$nextTick(() => {
          this.total = 0;
          this.loading = false;
          this.found = false;
        });
        return;
      }
      let serachOrder = Object.assign({}, this.serachOrder);
      serachOrder.itype = (this.symbletype == -1) ? 1 : 0;
      if (this.isSelect) {
        serachOrder.symble = this.symbleinfo.descriptions;
      }
      else {
        delete serachOrder.symble;
      }
      this.$store.dispatch("trading_order_search", serachOrder).then(({ data }) => {
        if (data) { 
          this.total = data.totalitemcount;
          this.orderDetail = data.pagedata;
          this.found = true;

        }
        else {
          this.found = false;
          this.total = 0;
          this.orderDetail = [];
        }
        this.$emit('onOrderListReceived', this.orderDetail)
        this.loading = false;
      });
    }
  },

}
</script>
