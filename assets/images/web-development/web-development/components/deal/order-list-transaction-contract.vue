<template>
  <!-- 合约历史委托 -->
  <div class="traded">
    <div class="traded-block">
      <!-- <div class="traded_card_header">
          <div class="trade_card_select">
            <a-select style="width: 120px;"  v-model="selectId" default-value="all" dropdownClassName="filter-dropdownlist"
              class="mr-2 black-filter-dropdown" @change="changePositinFilter" showSearch
              :filter-option="filterOption">
              <a-select-option v-for="filter in positionFilters" :key="filter.value">
              {{ filter.label }}
              </a-select-option>
          </a-select>
          </div>
          <div class="traded_card_header_closeAll button_style" :style="{'color': backColor == 'day'? '#fff':'#0d1015'}" @click="repeal(item.direction)">{{ $t('contract.fullclosing') }}</div>  
      </div> -->
      <div class="traded_table_content"> 
        <table class="hex_table abc">
          <thead class="hex_table_header padding br">
            <tr>
              <th class="lt">
                <div>{{ $t('deal.time') }}</div>
              </th>
              <th class="lt">
                <div>{{ $t('memberCenter.direction') }}</div>
              </th>
              <th class="lt">
                <div>{{ $t('contract.contractDeal') }}</div>
              </th>
              <th class="rt">
                <div>{{ $t('contract.delegateType') }}</div>
              </th>
              <th class="rt">
                <div>{{ $t('deal.entrustNumber') }}/{{ $t('strtable.stab37') }}</div>
              </th>
              <th class="rt">
                <div>{{ $t('deal.entrustPrice') }}/{{ $t('deal.transactionPrice') }}</div>
              </th>
              <th class="rt">
                <div>{{ $t("contract.feerate") }}</div>
              </th>
              <th class="rt">
                <div>{{ $t('memberCenter.statue') }}</div>
              </th>
            </tr>
          </thead>
          <tbody class="deal-tbody">
            <tr class="hex_table_body padding" v-for="(coins, index) in orderDetail" :key="index">
              <td class="lt">
                {{ global_get_local_time(coins.updatetime).format('YYYY-MM-DD HH:mm:ss') }}
              </td>
              <td class="lt" :class="{ 'success': coins.direction == 1, 'fail': coins.direction == -1 }">
                {{ global_get_contract_order_direction(coins.ordertype, coins.direction)}}·{{ global_get_tofixed(coins.multiple, 0)}}X
              </td>
              <td class="lt">
                {{ global_get_uppercase(coins.symble).replace('/YX', $t('contract.swap')) }}
              </td>
              <td class="rt">
                {{ global_get_contract_order_type(Number(coins.ordertype), coins.triggerprice) }}
              </td>
              <td class="rt"
                v-if="(coins.ordertype == 2 && coins.direction == 1) || coins.ordertype == 6 && coins.direction == 1">
                {{ global_get_tofixed(coins.amount, getSymbInfo(coins.ctid).amountdigits) }}/{{ global_get_tofixed(coins.transactionamount, getSymbInfo(coins.ctid).amountdigits) }}
              </td>
              <td class="rt" v-else>
                {{ global_get_tofixed(coins.amount, global_get_decimal(coins.symble).a) }}/{{global_get_tofixed(coins.transactionamount, global_get_decimal(coins.symble).a) }}
              </td>

              <td class="rt">
                {{ getTradeavgprice(coins) }}
              </td>

              <!-- real_fee大于0就取real_fee不然取real_Fee_USDT -->
              <td class="rt">
                {{ getRealFee(coins) }}
              </td>
              <!-- <td class="rt" v-else>
                {{ coins.real_fee_usdt }}USDT
              </td> -->

              <td class="rt orderstatus">
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
  name: 'articles',
  props: ['isSelect', 'symbleinfo', 'changeState', 'margin'],
  data() {
    return {
      loading: true,
      found: true,
      total: 0,
      serachOrder: {
        pagesize: 10,
        pageindex: 1,
        orderstatus: '2,3,4,5'
      },
      searchParam: {},
      orderDetail: [],
      market: [],
      selectId: '',
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
  computed: {
    positionFilters() {
      let arr = [{label : 'all', value: '' }]
      var symbleinfo = this.$store.state.symbleinfos.filter((citem) => {
          return citem.itype == 1;
      });
      console.log('symbole ===', symbleinfo)
      symbleinfo.forEach(ele => {
        arr.push({
          label: this.global_get_uppercase(ele.descriptions).replace('/YX', this.$t('contract.swap')),
          value: ele.descriptions
        })
      })
      return arr
    },
  },
  methods: {
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
      );
    },
    getTradeavgprice(coins) {
      let price = coins.price > 0 ? this.global_get_tofixed(coins.price, this.getSymbInfo(coins.ctid).pricedigits): '--'
      let tradeavgprice = coins.tradeavgprice > 0 ? this.global_get_tofixed(coins.tradeavgprice, this.getSymbInfo(coins.ctid).pricedigits) : '--'
      return price + '/' + tradeavgprice
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
    changePositinFilter() {
      this.getUserDeal()
    },
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
        return this.global_get_tofixed(m.tradeavgprice);
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
    statusClass(status) {
      const str = status.toLowerCase();
      let className = 'success-active';
      if (str == 'cancelled') {
        className = 'red-active';
      }
      else if (str == 'success') {
        className = 'success-active';
      }
      return className;
    },
    getSymbInfo(ctid) {
      var symbleinfo = this.$store.state.symbleinfos.filter((citem) => {
          return citem.id == ctid;
      })[0];
      console.log('symbleinfo===', symbleinfo)
      return symbleinfo ? symbleinfo : {};
    },
    // 过去用户交易记录
    getUserDeal() {
      if (this.$userinfo.uid) {
        let serachOrder = Object.assign({}, this.serachOrder);
        if (this.selectId.length > 0) {
          serachOrder.symble = this.selectId
        }
        if (this.$route.query.contractType == 1) {
          serachOrder.contractType = 1
        }
        this.$store.dispatch('usercontract_order_search', serachOrder).then(({ data }) => {
          if (data) {
            console.log('历史委托', data)
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
        }).catch((error) => {
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
    }
  },
  components: { AppNoData }
}

</script>
<style scoped lang="less">
@import "css/order-list";

.hex_table_body {
  .repayment {
    color: rgb(111, 143, 241);
    cursor: pointer;
  }

  .repayment_no {
    color: #c9c8cc;
    background: transparent;
    padding: 0;
  }
}

.money-exchange-content.exchange-full .exchange-record .traded_table_content {
  overflow: auto;
}

.hex_table th {
  line-height: 18px;
  padding-top: 7px;
  padding-bottom: 7px;
}

.hex_table_body {
  line-height: 18px;
}

.hex_table_body td {
  padding-top: 11px;
  padding-bottom: 11px;
}
</style>
