<template>
  <div class="traded">
    <div class="traded-block">
      <div class="traded_table_content">

        <table class="hex_table abc">
          <thead class="hex_table_header padding br">
            <tr>
              <th class="lt" style="width:200px">
                <div>{{ $t('leverage.applicationtime') }}</div>
              </th>
              <th class="lt">
                <div>{{ $t('wallet.leveraged') }}</div>
              </th>
              <th class="lt">
                <div>{{ $t('legalTrad.Currencies') }}</div>
              </th>
              <th class="rt">
                <div>{{ $t('leverage.loans') }}</div>
              </th>
              <th class="rt">
                <div>{{ $t('leverage.returned') }}</div>
              </th>
              <th class="rt">
                <div>{{ $t("leverage.multiple") }}</div>
              </th>
              <th class="rt">
                <div>{{ $t('leverage.dailyInterestRate') }}</div>
              </th>
              <th class="rt">
                <div>{{ $t('leverage.totalInterestPaid') }}</div>
              </th>
              <th class="rt" style="width:200px">
                <div>{{ $t('leverage.interestSettlementTime') }}</div>
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
                {{ getRecordTime(coins) }}
              </td>
              <td class="lt">
                {{ global_get_uppercase(coins.symblename) }}
              </td>
              <td class="lt">
                {{ global_get_uppercase(coins.loancurrencyname) }}
              </td>
              <td class="rt">
                {{ coins.loancurrencyamount }}
              </td>
              <td class="rt">
                {{ coins.paymentamount }}
              </td>
              <td class="rt">
                {{ coins.borrowmultiple }}X
              </td>
              <td class="rt">
                {{ global_get_tofixed(coins.dayrate, 5) * 100 }}%
              </td>
              <td class="rt">
                {{ global_get_tofixed(coins.totalpaymentinterest, global_get_decimal(coins.loancurrencyname).a) }}
              </td>
              <td class="rt">
                {{ getPaidTime(coins.paymenttime) }}
              </td>
              <td class="rt">
                {{ global_get_leverage_state(Number(coins.istatus)) }}
              </td>
              <td class="rt orderstatus">
                <span v-if="coins.istatus == 1" @click="showPop(coins)" class="repayment">{{ $t('leverage.repayment')
                }}</span>
                <span v-else class="repayment repayment_no">--</span>
              </td>
            </tr>
          </tbody>
        </table>

        <div class="anonymous  " v-if="loading || !found">

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
      <!--无数据&&未登录占位-->


      <div class="mr-3"
        :class="$store.state.hex_client_background.active == 'night' ? 'deal-paging-source' : 'text-right'"
        v-if="total > 0">
        <a-pagination background @change="handChange" :page-size="page.pagesize" :current="page.pageindex"
          popper-class="paging" layout="prev, pager, next" :total="total">
        </a-pagination>
      </div>
    </div>
    <!--归还借贷popup-->
    <repayment-popup :id="id" :ctid="leverageCtidInfo.ctid" :symblename="symblename"
      :loancurrencyamount="loancurrencyamount" :loanamount="loanamount" :interest="interest" :repayModel="popupstate"
      :loancurrencyname="loancurrencyname" @closePopup="closePopup" @confirmToRepayment="confirmToRepayment"
      v-if="popupstate" ref="popup" />
  </div>
</template>

<script>
import AppNoData from '../App/AppNoData.vue';
import repaymentPopup from '../security/repayment-popup';
export default {
  name: 'CurrentBorrow',
  components: {
    'repayment-popup': repaymentPopup,
    AppNoData
},
  data() {
    return {
      loading: true,
      found: true,
      popupstate: false,
      id: '',
      symblename: '',
      loancurrencyname: '',
      interest: 0,//支付利息
      loanamount: 0,//应还数量
      loancurrencyamount: 0,//贷款数量
      total: 0,
      page: {
        pageindex: 1,
        pagesize: 10,
      },
      orderDetail: [],
      currencyData: [],
    }
  },
  props: ['isSelect', 'applicationApproved', 'leverageCtidInfo'],
  watch: {
    isSelect(newVal, oldVal) {
      this.getUserDeal()
    },
    leverageCtidInfo(val) {
      this.getUserDeal(1)
    }
  },
  mounted() {
    this.getUserDeal(1);
  },
  subscribe() {
    return {
      //订阅更新orderlist 消息
      getOrderList() {
        this.getUserDeal();
      }
    }
  },
  created() {
  },
  methods: {
    closePopup() {
      this.popupstate = !this.popupstate;
    },
    showPop(val) {
      this.popupstate = !this.popupstate;
      this.symblename = val.symblename;//对称币种名
      this.loancurrencyname = val.loancurrencyname;//币种名
      this.loanamount = val.loanamount;//应还数量
      this.loancurrencyamount = val.loancurrencyamount;//贷款数量
      this.interest = val.totalpaymentinterest;//应付利息
      this.id = val.id;//订单id
    },
    confirmToRepayment() {
      this.loading = true;
      this.$refs.popup.close();
      this.getUserDeal();
    },
    getRecordTime: function (coins) {
      return (coins.createtime) ? this.global_get_local_time(coins.createtime).format('YYYY-MM-DD HH:mm:ss') : '--'
    },
    getPaidTime: function (paymenttime) {
      var year = new Date(paymenttime).getFullYear()
      return year != 1 ? this.global_get_local_time(paymenttime).format('YYYY-MM-DD HH:mm:ss') : '--'
    },
    handChange(val) {
      this.getUserDeal(val)
    },
    getUserDeal(pageIndex) {
      if (this.$userinfo.uid && this.leverageCtidInfo && this.leverageCtidInfo.ctid) {
        this.loading = true;
        this.total = 0;
        this.orderDetail = [];
        var postData = Object.assign({}, this.page, { uid: this.$userinfo.uid, key: this.$userinfo.secretkey });
        if (this.isSelect) {
          postData.ctid = this.leverageCtidInfo.ctid
        } else {
          delete postData.ctid
        }
        pageIndex ? postData.pageindex = pageIndex : postData.pageindex = 1;
        postData.istatus=1;
        this.$store.dispatch('userborrowmoney_user_borrow_infos', postData).then(({ data }) => {
          if (data) {
            this.total = data.totalitemcount;
            this.orderDetail = data.pagedata;
           

            this.page.pageindex = data.currentpageindex
            this.page.pagesize = data.pagesize

            this.found = true;
          } else {
            this.found = false;
            this.total = 0;
            this.orderDetail = [];
          }
          this.loading = false;
        })
      } else {
        this.$nextTick(() => {
          this.total = 0
          this.loading = false
          this.found = false
        })
      }
    }
  }
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
