<template>
  <!-- 现货资金明细 -->
  <div class="traded">
    <div class="traded-block">
      <div class="traded_table_content">

        <table class="hex_table abc">
          <thead class="hex_table_header padding br">
            <tr>
              <th class="lt">
                <div>{{ $t('leverage.flow') }}</div>
              </th>
              <!-- <th class="lt">
                <div>{{ $t('person.account') }}</div>
              </th> -->
              <th class="lt">
                <div>{{ $t('leverage.Currency') }}</div>
              </th>
              <th class="rt">
                <div>{{ $t('leverage.Tradetype') }}</div>
              </th>
              <th class="rt">
                <div>{{ $t('leverage.totalAssetsBeforeTheChange') }}</div>
              </th>
              <th class="rt">
                <div>{{ $t("leverage.thisNumberOfTimes") }}</div>
              </th>
              <th class="rt">
                <div>{{ $t('leverage.totalAssetsAfterTheChange') }}</div>
              </th>
              <th class="rt">
                <div>{{ $t('leverage.CreateTime') }}</div>
              </th>
            </tr>
          </thead>
          <tbody class="deal-tbody">
            <tr class="hex_table_body padding" v-for="(coins, index) in recodes" :key="index">
              <td class="lt">
                {{ coins.id }}
              </td>
              <!-- <td class="lt">
                {{ get_symblename(coins.orderid) }}
              </td> -->
              <td class="lt">
                {{ global_get_uppercase(coins.currencyname) }}
              </td>
              <td class="rt">
                {{ coins.typename }}
              </td>
              <td class="rt">
                {{ global_get_tofixed(coins.amountbefore, global_get_decimal(coins.currencyname).a) }}
              </td>
              <td class="rt">
                {{ global_get_tofixed(coins.amount, global_get_decimal(coins.currencyname).a) }}
              </td>
              <td class="rt">
                {{ global_get_tofixed(coins.amountafter, global_get_decimal(coins.currencyname).a) }}
              </td>
              <td class="rt">
                {{ getRecordTime(coins) }}
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

      <div class="mr-3 "
        :class="$store.state.hex_client_background.active == 'night' ? 'deal-paging-source' : 'text-right'"
        v-if="total > 0">
        <a-pagination background @change="handChange" :page-size="page.pagesize" :current="page.pageindex"
          popper-class="paging" layout="prev, pager, next" :total="total">
        </a-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import AppNoData from '../App/AppNoData.vue';
import repaymentPopup from '../security/repayment-popup';
export default {
  name: 'articles',
  components: {
    'repayment-popup': repaymentPopup,
    AppNoData
  },
  data() {
    return {
      loading: true,
      found: true,
      total: 0,
      page: {
        pageindex: 1,
        pagesize: 10,
      },
      recodes: [],
    }
  },
  props: {
    symbleinfo: {
      type: Object,
      default: function () {
        return {}
      }
    },
    isSelect: '',
    changeState: ''
  },
  watch: {
    'isSelect': function (val) {
      this.getUserContractAssestesRecodes();
    },
    'changeState': function (val) {
      if (val == 4) {
        this.getUserContractAssestesRecodes();
      }
    }
  },
  mounted() {
    this.getUserContractAssestesRecodes();
  },
  subscribe() {
    return {
      //订阅更新orderlist 消息
      getOrderList() {
        this.getUserContractAssestesRecodes();
      }
    }
  },
  created() {
  },
  methods: {
    getRecordTime: function (coins) {
      return (coins.createtime) ? this.global_get_local_time(coins.createtime).format('YYYY-MM-DD HH:mm:ss') : '--'
    },
    getPaidTime: function (paymenttime) {
      return paymenttime ? this.global_get_local_time(paymenttime).format('YYYY-MM-DD HH:mm:ss') : '--'
    },
    handChange(val) {
      this.getUserContractAssestesRecodes(val)
    },
    get_symblename(ctid) {
      var symbleobj = this.$store.state.symbleinfos.filter(item => {
        return item.id == ctid;
      })[0];
      if (symbleobj) {
        if (symbleobj.itype == 1) {
          return symbleobj.fcurrencyname + " " + this.$t('contract.swap');
        } else {
          return symbleobj.descriptions
        }
      }

    },
    getUserContractAssestesRecodes(pageIndex) {
      if (this.$userinfo.uid) {
        var type = -1 // margin
        this.loading = true;
        this.total = 0;
        this.recodes = [];
        if (this.symbleinfo.itype == 1) { // future or contract
          type = -2
        } else if (this.symbleinfo.itype == 0) { // for spot
          type = 0
        }
        var postData = Object.assign({}, this.page, { type: type });
        if (this.isSelect) {
          postData.completedid = this.symbleinfo.id;
        } else {
          delete postData.completedid;
        }
        pageIndex ? postData.pageindex = pageIndex : postData.pageindex = 1;
        pageIndex ? this.page.pageindex = pageIndex : this.page.pageindex = 1;
        this.$store.dispatch('user_assets_record_getlist', postData).then(({ data }) => {
          if (data) {
            this.recodes = data.pagedata;
            this.total = data.totalitemcount;
            this.found = true;
          } else {
            this.found = false;
            this.total = 0;
            this.recodes = [];
          }
          this.loading = false;
        })
      } else {
        this.$nextTick(() => {
          this.total = 0;
          this.loading = false;
          this.found = false;
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
