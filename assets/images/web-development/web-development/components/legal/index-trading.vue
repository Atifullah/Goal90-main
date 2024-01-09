<template>
  <div class="traded">
    <div class="traded-block">
      <table class="hex_table" v-if="!found">
        <tbody>
          <tr class="hex_table_body" v-for="a in orderDetail" :key="a.id">
            <td class="fw">
              <div class="orderType">
                <span
                  :class="['type',a.direction==1?'sell':'buy']">{{a.direction==1?$t('memberCenter.buy'):$t('memberCenter.sell')}}</span>
                <span class="coinNane">{{global_get_uppercase(a.currencyname)}}</span>
              </div>
            </td>
            <td class="lt ">
              <div><span class="gray">{{$t('legalTrad.Quantity')}}</span></div>
              <div><span class="gray">{{$t('legalTrad.Unit')}}</span></div>
              <div><span class="gray">{{$t('legalTrad.Totalprice')}}</span></div>
            </td>
            <td class="lt ">
              <div><span>{{global_get_tofixed(a.amount,c2cDecimal(a.currencyname))}}</span></div>
              <div><span>{{global_get_tofixed(a.price,2)}}</span></div>
              <div><span>{{global_get_tofixed(a.amount*a.price,2)}}</span></div>
            </td>
            <td class="lt ">
              <div class="gray">{{$t('c2c.Transaction')}}</div>
              <div class="gray">{{$t('legalDeal.Status')}}</div>
              <div class="gray">{{$t('home.tradeOperation')}}</div>
            </td>
            <td class="lt ">
              <div class="dealType">{{a.nikename}}</div>
              <div>
                <span v-if="a.orderstatus==0">
                  {{$t('c2c.buyers')}}
                </span>
                <span v-else-if="a.orderstatus==4">
                  {{$t('c2c.seller')}}
                </span>
                <span v-else-if="a.orderstatus==1||a.orderstatus==5||a.orderstatus==7">
                  {{$t('legalDeal.completed')}}
                </span>
                <span v-else-if="a.orderstatus==2||a.orderstatus==3">
                  {{$t('c2c.Cancelled')}}
                </span>
                <span v-else-if="a.orderstatus==6">
                  {{$t('c2c.Appealing')}}
                </span>
              </div>
              <div>
                <span class="soldOut" @click="gotrade(a)">{{$t('legalDeal.detailed')}}</span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="anonymous" v-if="found">
        <div class="anonymous-pic">
          <img src="~/static/images/anonymous.svg" alt="">
          <p style="text-align:center;"> {{$t('legalTrad.record')}}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'articles',
  data() {
    return {

    }
  }, props: {
    orderDetail: [],
    found: false
  },
  created() {
  },
  methods: {
    c2cDecimal(val) {
      let digits = 2;
      switch (val) {
        case 'btc':
          digits = 6;
          break;
        case 'eth':
          digits = 4;
          break;
      }
      return digits;
    },
    gotrade(order) {
      this.$router.push({ path: '/trade/' + order.id })
    }
  }
}
</script>
<style lang='less' scoped>
@import "../../static/styles/color";
@import "../../static/styles/person";
@import "../../static/styles/table";
.traded_tip {
  font-size: 18px;
  font-weight: bold;
  margin-right: 10px;
}

.traded_info {
  font-size: 14px;
}

.traded_info .btc {
  color: #00C076;
  font-size: 30px;
  font-weight: bold;
  margin-right: 5px;
}

.traded_info .cny {
  color: #ffb11a;
  font-size: 30px;
  font-weight: bold;
  margin-right: 5px;
}

.traded_info .br {
  margin: 0 20px;
  border-right: 1px solid @cl_858;
  display: inline-block;
  height: 20px;
}

.traded_info_title {}

.traded_info_num {
  padding: 4px 0;
}

.traded_info_address_button {
  color: #ffb11a;
  margin-top: 16px;
}

.traded-block {
  margin-top: 10px;
  background-color: #ffffff;
}

.traded-block-title {
  padding: 18px 20px 8px 20px;
}

.traded-block-title .title_tip {
  font-size: 16px;
  font-weight: bold;
}

.traded-block-search {
  margin-right: 10px;
  font-size: 14px;
  width: 130px;
  display: inline-table;
  border-collapse: separate;
}

.traded-block-search input {
  height: 30px;
  line-height: 30px;
  border: 1px solid #DDDDDD;
  display: table-cell;
  width: 100%;
  padding: 5px 10px;
}

.traded-block-search .search-tip {
  display: table-cell;
  width: 60px;
  background-color: #ffb11a;
  color: #ffffff;
  border: 1px solid #ffb11a;
  text-align: center;
}

.traded-block-search .search-tip::placeholder {
  color: $cl_bbb;
}

.traded-block-search_button {
  display: inline-block;
  height: 30px;
  line-height: 30px;
  text-align: center;
  color: #ffffff;
  background-color: #ffb11a;
  font-size: 14px;
  width: 60px;
  cursor: pointer;
}

.traded-block-reset_button {
  display: inline-block;
  height: 30px;
  line-height: 30px;
  text-align: center;
  color: #ffb11a;
  font-size: 14px;
  width: 60px;
  margin-left: 10px;
  cursor: pointer;

}

.traded .person-block_info {
  line-height: 36px;
}

.person-block {
  padding: 18px 20px 16px 20px;
}

.traded-block .search-market {
  margin: 14px 0 10px 20px;
}

.ordertab {
  padding: 10px 20px;
}

.ordertab span {
  font-size: 14px;
  padding-bottom: 3px;

}

.ordertab span.entrust {
  margin-right: 20px;
}

.ordertab span.cur {
  color: rgba(40, 149, 251, 1);
  border-bottom: 2px solid rgba(40, 149, 251, 1);
}

td.repeal {
  color: rgba(40, 149, 251, 1);
  cursor: pointer;
}

.hex_table_body {
  line-height: 32px;
}

.hex_table_body td {
  padding: 10px 7px;
}

.hex_table_header th {
  padding: 0 7px;
}

.hex_table td.fw {
  padding-left: 20px;
}

.hex_table td.orderdetail {
  width: 257px;
}

.orderType>span {
  display: block;
  font-size: 14px;
}

.orderType .type {
  width: 36px;
  height: 20px;
  text-align: center;
  color: white;
  line-height: 20px;
  border-radius: 3px;
}

.orderType .type.sell {
  background: rgba(3, 191, 123, 1);
}

.orderType .type.buy {
  background: rgba(233, 108, 66, 1);
}

.orderType .coinNane {
  font-size: 18px;
  color: rgba(33, 40, 62, 1);
}

table tbody,
table tbody tr {
  border-top: 1px solid rgba(133, 131, 172, .2);
}

.hex_table .hex_table_body td .dealType span {
  margin-right: 10px;
}

td .dealType {
  .Unionpay:before {
    content: '';
    background: url('../../static/images/Unionpay.svg') no-repeat;
    vertical-align: middle;
    width: 18px;
    height: 18px;
    background-size: cover;
    display: inline-block;
  }

  .Alipay:before {
    content: '';
    background: url('../../static/images/Alipay.svg') no-repeat;
    vertical-align: middle;
    width: 18px;
    height: 18px;
    background-size: cover;
    display: inline-block;
  }

  .wechat:before {
    content: '';
    background: url('../../static/images/wechat.svg') no-repeat;
    vertical-align: middle;
    width: 18px;
    height: 18px;
    background-size: cover;
    display: inline-block;
  }

  .Wumis:before {
    content: '';
    background: url('../../static/images/Wumis.svg') no-repeat;
    vertical-align: middle;
    width: 18px;
    height: 18px;
    background-size: cover;
    display: inline-block;
  }

  .money-gram:before {
    content: '';
    background: url('../../static/images/money-gram.svg') no-repeat;
    vertical-align: middle;
    width: 18px;
    height: 18px;
    background-size: cover;
    display: inline-block;
  }

  .Paypal:before {
    content: '';
    background: url('../../static/images/Paypal.svg') no-repeat;
    vertical-align: middle;
    width: 18px;
    height: 18px;
    background-size: cover;
    display: inline-block;
  }
}

.soldOut {
  cursor: pointer;
  color: rgba(40, 149, 251, 1);
  margin-right: 10px;
}

.hex_table_body td.lt .gray {
  color: rgba(153, 153, 153, 1);
}
</style>
