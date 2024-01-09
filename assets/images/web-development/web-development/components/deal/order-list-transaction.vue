<style scoped lang="less">
@import "css/order-list";

.tooltip-icon:hover {
  background-image: url("../../static/images/tip-active.svg");
}

.tooltip-icon {
  display: inline-block;
  width: 14px;
  height: 14px;
  vertical-align: sub;
  background-repeat: no-repeat;
  background-size: 14px 14px;
  background-position: center;
  background-image: url("../../static/images/tip-active.svg");
  cursor: pointer;
}
</style>

<template>
  <!-- 现货交易历史 -->
  <div class="traded">
    <div class="traded-block">
      <div class="traded_table_content">
        <table class="hex_table abc">
          <thead class="  hex_table_header padding br">
            <tr>
              <th class="lt">
                <div>ID</div>
              </th>
              <th class="lt">
                <div>{{ $t('memberCenter.orderTime') }}</div>
              </th>
              <th class="lt">
                <div>{{ $t('memberCenter.dealTime') }}</div>
              </th>
              <th class="lt">
                <div>{{ $t('memberCenter.market') }}</div>
              </th>
              <th class="rt">
                <div>{{ $t('memberCenter.type') }}</div>
              </th>
              <th class="rt">
                <div>{{ $t('memberCenter.direction') }}</div>
              </th>
              <th class="rt">
                <div>{{ $t("deal.entrustPrices") }}</div>
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
                <div>{{ $t('deal.bargainPrice') }}</div>
              </th>
              <th class="rt">
                <div>{{ $t('wallet.serviceCharge') }}</div>
              </th>
              <th class="rt">
                <div>{{ $t('memberCenter.statue') }}</div>
              </th>
            </tr>
          </thead>
          <tbody class="deal-tbody">
            <tr class="hex_table_body padding" v-for="(coins, index) in orderDetail" :key="index">
              <td class="lt">
                {{ coins.id }}
              </td>
              <td class="lt">
                {{ global_get_local_time(coins.createtime).format('YYYY-MM-DD HH:mm:ss') }}
              </td>
              <td class="lt">
                {{
                  coins.orderstatus == 2 ? "--" : global_get_local_time(coins.updatetime).format('YYYY-MM-DD HH:mm:ss')
                }}
              </td>
              <td class="lt">
                {{ global_get_uppercase(coins.symble) }}
              </td>
              <td class="rt">
                {{ coins.ordersource == 7 ? $t('deal.strategyTrade') : coins.triggerprice > 0 ? global_get_order_type(3) :
                  global_get_order_type(Number(coins.ordertype)) }}
              </td>
              <td class="rt" :class="{ 'success': coins.direction == 1, 'fail': coins.direction == -1 }">
                {{ global_get_order_direction(coins.direction) }}
              </td>
              <td class="rt" v-if="coins.price > 0">
                {{ global_get_tofixed(coins.price, global_get_decimal(coins.symble).p) }}
              </td>
              <td class="rt" v-else>--</td>
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
              <td class="rt" v-if="coins.price == 0 && coins.direction == 1">
                {{ global_get_tofixed(getVolume(coins), global_get_decimal(coins.symble).a) }}
              </td>
              <td class="rt" v-else>
                {{ global_get_tofixed(coins.transactionamount, global_get_decimal(coins.symble).a) }}
              </td>
              <td class="rt">
                {{ global_get_tofixed(getavgprice(coins), global_get_decimal(coins.symble).p) }}
              </td>
              <td class="rt">
                {{ getRealFee(coins)}}
                <a-tooltip v-if="coins.licofee > 0" placement="top">
                  <div slot="content">{{ $t('legalTrad.licofee') }}: {{ coins.licofee }}</div>
                  <i class="tooltip-icon"></i>
                </a-tooltip>
              </td>
              <td class="rt"> 
                <span :class="statusClass(global_get_order_state(coins.orderstatus))">{{
                  global_get_order_state(coins.orderstatus) }}</span>
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

export default {
    name: 'TradeHistory',
    props: ['isSelect', 'changeState', 'symbletype', 'symbleinfo'],
    data() {
        return {
            loading: true,
            found: true,
            total: 0,
            serachOrder: {
                pagesize: 10,
                pageindex: 1,
                orderstatus: '2,3,4'
            },
            searchParam: {},
            orderDetail: [],
            market: [],
        };
    },
    watch: {
        'isSelect': function (val) {
            this.getUserDeal();
        },
        'changeState': function (val) {
            if (val == 2) {
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
    methods: {
        handChange(val) {
            this.serachOrder.pageindex = val;
            this.getUserDeal();
        },
        getavgprice(m) {
            const ary = [1, 3, 4];
            if (ary.indexOf(m.orderstatus) < 0) {
                return '--';
            }
            else {
                return m.tradeavgprice;
            }
        },
        getVolume(coin) {
            return this.$np.divide(coin.transactionamount, this.getavgprice(coin));
        },
        getAllPrice(coins) {
            const p = this.$np.times(coins.tradeavgprice, coins.transactionamount);
            if (!p)
                return p.toFixed(2);
            return this.global_get_tofixed(p);
        },
        getRealFee(coins) {
          let reef = 0
          if (coins.real_fee > 0) {
            reef = this.global_get_tofixed(coins.real_fee, this.global_get_decimal(this.coinDecimal(coins.symble)).a)
          } else if (coins.real_fee_usdt > 0) {
            reef = this.global_get_tofixed(coins.real_fee_usdt, this.global_get_decimal(this.coinDecimal(coins.symble)).p)
          }
          return reef
          //coins.real_fee>0?coins.real_fee:coins.real_fee_usdt>0?coins.real_fee_usdt:0
        },
        coinDecimal(coin) {
          return coin.split("/")[0].toLowerCase();
        },
        // 过去用户交易记录
        getUserDeal() {
            if (this.$userinfo.uid) {
                this.loading = true;
                this.total = 0;
                this.orderDetail = [];
                let serachOrder = Object.assign({}, this.serachOrder);
                if (this.isSelect) {
                    serachOrder.symble = this.symbleinfo.descriptions;
                }
                else {
                    delete serachOrder.symble;
                }
                serachOrder.itype = (this.symbletype == -1) ? 1 : 0;
                this.$store.dispatch('trading_order_search', serachOrder).then(({ data }) => {
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
                    this.loading = false;
                });
            }
            else {
                this.$nextTick(() => {
                    this.total = 0;
                    this.loading = false;
                    this.found = false;
                });
            }
        },
        statusClass(status) {
            //console.log('status', status);
            const str = status.toLowerCase();
            let className = 'success-active';
            if (str == 'cancelled') {
                className = 'red-active';
            }
            else if (str == 'success') {
                className = 'success-active';
            }
            return className;
        }
    },
    components: { AppNoData }
}

</script>
