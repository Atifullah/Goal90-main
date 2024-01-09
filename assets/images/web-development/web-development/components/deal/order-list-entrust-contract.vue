<style scoped lang="less">
@import "css/order-list";
</style>
<template>
  <!-- 合约当前委托 -->
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
          <div class="traded_card_header_closeAll button_style" :style="{'color': backColor == 'day'? '#fff':'#0d1015'}" @click="cancleAllContract()">{{ $t('contract.canAll') }}</div>
      </div> -->
      <div class="traded_table_content">
        <table class="hex_table">
          <thead class="hex_table_header padding br">
            <tr>
              <th class="lt">
                <div>{{ $t('index.time') }}</div>
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
                <div>{{ $t('deal.entrustPrice') }}</div>
              </th>
              <th class="rt" width="108">
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
                {{ coins.price > 0 ? global_get_tofixed(coins.price, getSymbInfo(coins.ctid).pricedigits): '--' }}
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

export default {
    name: 'articles',
    props: ['isSelect', 'changeState'],
    data() {
        return {
            loading: true,
            popupstate: false,
            serachOrder: {
                pageindex: 1,
                pagesize: 10,
                orderstatus: '0,1'
            },
            orderDetail: [],
            total: 0,
            found: true,
            selectId: '',
        };
    },
    emits: ['onOrderListReceived'],
    watch: {
        'isSelect': function (val) {
            this.getUserDeal();
        },
        'changeState': function (val) {
            if (val == 1) {
                this.getUserDeal();
            }
        }
    },
    computed: {
      backColor() {
        return this.$store.state.hex_client_background.active
      },
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
    }
    ,
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
      filterOption(input, option) {
        return (
          option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
        );
      },
      getSymbInfo(ctid) {
        var symbleinfo = this.$store.state.symbleinfos.filter((citem) => {
            return citem.id == ctid;
        })[0];
        console.log('symbleinfo===', symbleinfo)
        return symbleinfo ? symbleinfo : {};
      },
        changePositinFilter() {
          this.getUserDeal()
        },
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
                return '--';
            }
            else {
                return m.tradeavgprice;
            }
        },
        coinDecimal(coin) {
            return coin.split('/')[1];
        },
        popup() {
            this.popupstate = !this.popupstate;
        },
        async cancleAllContract() {
          const _self = this
          this.loading = true
          await this.orderDetail.forEach(order => {
            console.log('order::', order);
            _self.repeal(order.id)
          })
          this.loading = false
        },
        repeal(id) {
            const _self = this
            this.$store.dispatch('usercontract_order_cancel', { orderid: id }).then((res) => {
                if (res.data) {
                    let fliterData = [];
                    this.orderDetail.forEach((item) => {
                        if (item.id != id) {
                            fliterData.push(item);
                        }
                    });
                    this.popupstate = !this.popupstate;
                    this.orderDetail = fliterData;
                    this.$store.commit('set_message', { type: 'ok', text: res.msg });
                    setTimeout(() => {
                        /*刷新资产信息*/
                        _self.$pubsub.publish(this.$pubsub.getOrderList);
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
            if (this.$userinfo.uid) {
                let serachOrder = Object.assign({}, this.serachOrder);
                console.log('this.selectId', this.selectId)
                if (this.selectId.length > 0) {
                  serachOrder.symble = this.selectId
                }
                console.log('serachOrder.symble', serachOrder.symble)
                //this.isSelect ? serachOrder.symble = this.isSelect : delete serachOrder.symble;
                this.$store.dispatch('usercontract_order_search', serachOrder).then(({ data }) => {
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
                    this.$emit('onOrderListReceived', this.orderDetail);
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
