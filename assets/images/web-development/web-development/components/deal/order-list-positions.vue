<template>
  <div class="traded">
    <div class="traded-block">
      <div class="traded_table_content">
        <div class="traded_card_box" v-hex-loading="loading">
          <!-- <div class="traded_card_header">
            <div class="trade_card_select">
              <a-select style="width: 120px;height: 38px;"  v-model="selectId" default-value="all" dropdownClassName="filter-dropdownlist"
                class="mr-2 black-filter-dropdown" @change="changePositinFilter" showSearch
                :filter-option="filterOption">
                <a-select-option v-for="filter in positionFilters" :key="filter.value">
                  {{ filter.label }}
                </a-select-option>
              </a-select>
            </div>
            <div class="traded_card_header_closeAll button_style" :style="{'color': backColor == 'day'? '#fff':'#0d1015'}" @click="repealAllContract()">{{ $t('contract.fullclosing') }}</div>
          </div> -->
          <div class="card_list_box" v-if="searList.length && !loadingProps && !loading">
            <div  v-for="(item, index) in searList" :key="index">
              <card-list 
                :item="item" 
                :symbleinfo="symbleinfo"
                :entrustBuyRate="entrustBuyRate"
                :entrustSaleRate="entrustSaleRate"
                :listhaveorderinfos="listhaveorderinfos"
                :contractassesinfo="contractassesinfo"
                :dailyDetail="dailyDetail"
                :isCloseAll="isCloseAll"
                :isPro="isPro"
                @getContractAssesInfos="getContractAssesInfos"
                @changeLoading="changeLoading"
                />
            </div>
          </div>
        </div> 
        <div class="anonymous" v-if="loading || loadingProps">
          <div class="loadingPic deal" v-hex-loading="true"></div>
        </div>
        <div class="anonymous" v-if="!found && !searList.length && !loading &&!loadingProps">
          <template>
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
    </div>

    <!-- <CurrencyLeverage :listhaveorderinfos="listhaveorderinfos" :symbleinfo="symbleinfo"
      :currencyLeverageModal="showLeverage" v-show="showLeverage" @closePopup="showLeverage = false"
      @confirmCurrencyLeverage="updateLeverage" /> -->
  </div>
</template>

<script>
import number from '@/components/public/number'
import CurrencyLeverage from '@/components/security/currency-leverage';
import { mapActions, mapGetters } from 'vuex'
import AppNoData from '../App/AppNoData.vue';
import AppTooltip from '../App/AppTooltip.vue';
import cardList from './order-list-positions-list.vue'
export default {
  name: 'Positions',
  computed: {
    backColor() {
      return this.$store.state.hex_client_background.active
    },
    positionFilters() {
      let arr = [{label : 'all', value: '' }]
      var symbleinfo = this.$store.state.symbleinfos.filter((citem) => {
          return citem.itype == 1;
      });
      symbleinfo.forEach(ele => {
        arr.push({
          label: this.global_get_uppercase(ele.descriptions).replace('/YX', this.$t('contract.swap')),
          value: ele.id
        })
      })
      return arr
    },
    searList() {
      //this.currentContractPriceList = this.getContractAllMarketList
      let list = this.listhaveorderinfos
      // console.log('this.currentContractPriceList', this.currentContractPriceList)
      list.map(item => {
        this.currentContractPriceList.map(citem => {
          if (item.ctid == citem.ctid) {
            this.$set(item,'copeDailyDetail',citem)
            // item.copeDailyDetail = citem
            // item.copeDailyDetail.c = citem.copeDailyDetail.c;
            // item.dcs = citem.dcs
          }
        })
      })
      if (this.selectId.length > 0) {
        list = list.filter((citem) => {
          return citem.ctid == this.selectId;
        })
      }
      return list
    },
  },
  components: {
    'hex-number': number,
    CurrencyLeverage,
    AppNoData,
    AppTooltip,
    cardList
  },
  props: {
    loadingProps: false,
    symbleinfo: {
      default: Object
    },
    entrustBuyRate: {
      default: 0
    },
    entrustSaleRate: {
      default: 0
    },
    listhaveorderinfos: {
      default: []
    },
    contractassesinfo: {
      default: Object
    },
    // 'multiple', 'entrustBuyRate', 'entrustSaleRate', 'listhaveorderinfos', 'contractassesinfo',
    dailyDetail: {
      type: Object,
      default: Object,
    },
    isCloseAll: { // pass when want to close all positions 
      // be alert when passing true as it will close all positions 
      type: Boolean,
      default: false
    },
    isPro: { // pass when want to close all positions 
      // be alert when passing true as it will close all positions 
      type: Boolean,
      default: false
    },
    currentContractPriceList: {
      default: []
    }
  },
  data() {
    return {
      selback: "",
      loading: false,
      treadetype: 1,
      found: false,
      selectId: '',
      //订单数据模型
      dealModel: {
        ctid: '',
        ordertype: 1,
        direction: 1,
        price: 0,
        amount: 0,
        ordersource: 1
      },
      contract_size: 0,
      newmoney: 0,
      saleAmount: '',
      buyAmount: '',
      buyRate: '',
      saleRate: '',
      buyPercentage: 1, // 买 百分数
      salePercentage: 1, // 卖 百分数
      maxSaleAmount: 0,
      maxBuyAmount: 0,
      showLeverage: false,
      colorList: ['#00c076','#f54252'],
      copeDailyDetail: {},
      dcs: {},
    }
  },
  watch: {
    'buyRate': function (val) {
      this.listhaveorderinfos.filter(data => data.direction == -1).map(data => {
        this.maxBuyAmount = this.global_get_tofixed(this.$np.minus(data.openinterest, data.frozenamount), this.global_get_decimal(this.symbleinfo.descriptions).a)
      })
      return val
    },
    'saleRate': function (val) {
      this.listhaveorderinfos.filter(data => data.direction == 1).map(data => {
        this.maxSaleAmount = this.global_get_tofixed(this.$np.minus(data.openinterest, data.frozenamount), this.global_get_decimal(this.symbleinfo.descriptions).a)
      })
      return val
    },
    'maxSaleAmount': function (val) {
      this.saleAmount = val
    },
    'maxBuyAmount': function (val) {
      this.buyAmount = val;
    },
    'entrustBuyRate': function (val) {
      this.buyRate = this.global_get_tofixed(val, this.global_get_decimal(this.symbleinfo.descriptions).p)
    },
    'entrustSaleRate': function (val) {
      this.saleRate = this.global_get_tofixed(val, this.global_get_decimal(this.symbleinfo.descriptions).p)
    },
    'searList': function (val) {
      console.log('listhaveorderinfos', val)
      this.found = val?.length == 0 ? false : true
    }, 
  },
  methods: {
    changeLoading(val) {
      this.loading = val
      setTimeout(() => {
        this.loading = false
      }, 1000);
    },
    getContractAssesInfos(val) {
      this.$emit('getContractAssesInfos',val);
    },
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
      );
    },
    ...mapActions('trade', ['submitChangeLeverage']),
    changePositinFilter() {

    },
    changeLeverage() {
      this.showLeverage = true
    },
    async updateLeverage(leverage) {
      this.showLeverage = false
      const res = await this.submitChangeLeverage({ ctid: this.symbleinfo.id, multiple: leverage })
      console.log('ress', res);
      if (res.code == 200) {
        this.$store.commit('set_message', {
          type: 'ok',
          text: 'The leverage multiple updated.'
        })
        this.$emit('getContractAssesInfos');
      } else {
        this.$store.commit('set_message', {
          type: 'error',
          text: res.msg
        })
      }

    },
    // changeAmount(data, val) {
    //   if (this.treadetype == 1) {//限价交易
    //     if (data.direction == 1) {//买入
    //       this.salePercentage = val
    //       this.maxSaleAmount = this.global_get_tofixed(this.$np.minus(data.openinterest, data.frozenamount), this.global_get_decimal(this.symbleinfo.descriptions).a)
    //       this.saleAmount = this.maxSaleAmount * val
    //     } else {//卖出
    //       this.buyPercentage = val
    //       this.maxBuyAmount = this.global_get_tofixed(this.$np.minus(data.openinterest, data.frozenamount), this.global_get_decimal(this.symbleinfo.descriptions).a)
    //       this.buyAmount = this.maxBuyAmount * val
    //     }
    //   } else {//市价交易
    //     if (data.direction == 1) {//买入
    //       this.salePercentage = val
    //       this.maxSaleAmount = this.global_get_tofixed(this.$np.minus(data.openinterest, data.frozenamount), this.global_get_decimal(this.symbleinfo.descriptions).a)
    //       this.saleAmount = this.maxSaleAmount * val
    //     } else {//卖出
    //       this.buyPercentage = val
    //       this.maxBuyAmount = this.global_get_tofixed(this.$np.minus(data.openinterest, data.frozenamount), this.global_get_decimal(this.symbleinfo.descriptions).a)
    //       this.buyAmount = this.maxBuyAmount * val
    //     }
    //   }
    // },
    changeTreadeType(val) {
      this.treadetype = val;
      this.buyAmount = 0;
      this.saleAmount = 0;
    },
    changePrice(data) {
      if (data.direction == 1) {
        this.maxSaleAmount = this.global_get_tofixed(this.$np.minus(data.openinterest, data.frozenamount), this.global_get_decimal(this.symbleinfo.descriptions).a)
        this.saleAmount = this.global_get_tofixed(this.$np.minus(data.openinterest, data.frozenamount) * this.salePercentage, this.global_get_decimal(this.symbleinfo.descriptions).a)
      } else {
        this.maxBuyAmount = this.global_get_tofixed(this.$np.minus(data.openinterest, data.frozenamount), this.global_get_decimal(this.symbleinfo.descriptions).a)
        this.buyAmount = this.global_get_tofixed(this.$np.minus(data.openinterest, data.frozenamount) * this.buyPercentage, this.global_get_decimal(this.symbleinfo.descriptions).a)
      }
    },
    replaceCurrency(symble) {
      return symble.toUpperCase().replace(this.$t('contract.swap'), '');
    },
    setExplosionPrice(n, m) {
      if (Number(n) <= 0) {
        return 0;
      } else {
        return this.global_get_tofixed(n, this.global_get_decimal(m.toLowerCase() +
                    "/yx").p)
      }
    },
    getnum(coins) {
      return this.global_get_tofixed(coins.transactionamount, this.global_get_decimal(this.symbleinfo.descriptions).a)
    },
    //（（已实现盈亏+未实现盈亏）/持仓保证金）*100%
    getprofitrate(coins) {
      let rate = coins.holdpositionsamount ? (coins.profitamount + coins.unrealizedprofitandlossamount) / Number(coins.holdpositionsamount) : ''
      rate = rate ? this.global_get_tofixed(rate * 100, 2) : '--'
      return rate
    },
    getavgprice(m) {
      const ary = [1, 3, 4];
      if (ary.indexOf(m.orderstatus) < 0) {
        return '--'
      } else {
        return m.tradeavgprice
      }
    },
    
    coinDecimal(coin) {
      return coin.split('/')[1];
    },
    repeal(direction, ctid = null) {
      const currencyId = ctid ? ctid : this.symbleinfo.id.toString()
      console.log('direction', direction);
      console.log('ctid', ctid);
      if (this.treadetype == 1 && direction == 1 && (this.saleAmount == '' || this.saleAmount <= 0 || this.saleRate == '' || this.saleRate <= 0)) {
        return
      } else if (this.treadetype == 1 && direction == -1 && (this.buyAmount == '' || this.buyAmount <= 0 || this.buyRate == '' || this.buyRate <= 0)) {
        return
      }
      else if (this.treadetype == 2 && direction == 1 && (this.saleAmount == '' || this.saleAmount <= 0)) {
        return
      }
      else if (this.treadetype == 2 && direction == -1 && (this.buyAmount == '' || this.buyAmount <= 0)) {
        return
      }
      if (this.maxSaleAmount < this.saleAmount) {
        this.$store.commit('set_message', {
          type: 'error',
          text: this.$t('c2c.Cannotavailable')
        })
      }
      if (this.maxBuyAmount < this.buyAmount) {
        this.$store.commit('set_message', {
          type: 'error',
          text: this.$t('c2c.Cannotavailable')
        })
      }
      this.dealModel.ordertype = this.treadetype == 2 ? 5 : 4;//5，市价平仓；4，限价平仓
      const dealModel = Object.assign({}, this.dealModel)
      dealModel.price = this.treadetype == 2 ? 0 : Number((direction == 1) ? this.saleRate : this.buyRate)
      dealModel.amount = Number((direction == 1) ? this.saleAmount : this.buyAmount)
      dealModel.multiple = Number(this.multiple)
      dealModel.ctid = currencyId
      dealModel.direction = (direction == 1) ? -1 : 1
      if (this.$route.query.contractType == 1) {
        dealModel.contractType = 1
      }
      this.$store.dispatch('usercontract_order_create', dealModel)
        .then((res) => {
          if (res.data) {
            /*发布*/
            this.$pubsub.publish(this.$pubsub.getOrderList)
            this.$pubsub.publish(this.$pubsub.changeDepthChart)
            this.$store.commit('set_message', { type: 'ok', text: res.msg })
          }
        })
        .then(() => {
          setTimeout(() => {
            this.$emit('getContractAssesInfos');
            // 刷新
          }, 500);
          this.saleAmount = ''
          this.buyAmount = ''
        }).catch(() => {
        })
    },
    repealAll(direction, item, ctid = null) {
      // this.loading = true
      const currencyId = ctid ? ctid : this.symbleinfo.id.toString()
      this.dealModel.ordertype = 5;//5，市价平仓；4，限价平仓
      const dealModel = Object.assign({}, this.dealModel)
      dealModel.price = 0
      dealModel.amount = item.openinterest
      dealModel.multiple = Number(this.multiple)
      dealModel.ctid = currencyId
      dealModel.direction = (direction == 1) ? -1 : 1
      if (this.$route.query.contractType == 1) {
        dealModel.contractType = 1
      }
      this.$store.dispatch('usercontract_order_create', dealModel)
        .then((res) => {
          // this.loading = false
          this.currentLength ++
          if (res.data) {
            /*发布*/
            this.$pubsub.publish(this.$pubsub.getOrderList)
            this.$pubsub.publish(this.$pubsub.changeDepthChart)
            this.$store.commit('set_message', { type: 'ok', text: res.msg })
          }
        })
        .then(() => {
          if(this.currentLength == this.listhaveorderinfos.length) {
            setTimeout(() => {
              this.$emit('getContractAssesInfos',1);
              this.loading = false
            }, 500);
            this.saleAmount = ''
            this.buyAmount = ''
          }
        }).catch(() => {
        })
    },
    async repealAllContract() {
      const _self = this
      // this.loading = true
      this.currentLength = 0
      if (this.searList.length > 0) {
        this.loading = true
        await this.searList.forEach(order => {
          console.log('order::', order);
          _self.repealAll(order.direction, order, order.ctid.toString())
        })
      }
      // this.loading = false
    },
    // getAllPrice(coins) {
    //   const p = this.$np.times(coins.tradeavgprice, coins.transactionamount)
    //   if (!p) return p.toFixed(2)
    //   return p.toFixed(8)
    // }
  },

  mounted() {
    console.log('1111-------1111')
    for (let index = 0; index < 5; index++) {
      setTimeout(() => {
        if (this.entrustBuyRate > 0 || this.entrustSaleRate > 0) {
          index = 5
        }
        this.buyRate = this.entrustBuyRate
        this.saleRate = this.entrustSaleRate
      }, 2000)
    }
    this.contract_size = this.$store.getters.get__currency_contract_size(this.symbleinfo.fcurrencyname)
  },

  created() {
  },
}
</script>
<style scoped lang="less">
@import "css/order-list";

dt {
  cursor: pointer;
  border-bottom: 1px dashed @cl_71757A;
}

.hex_table_header th {
  line-height: 18px;
  padding-top: 7px;
  padding-bottom: 7px;
}

input {
  height: 25px;
  width: 90px;
  line-height: 25px;
  padding: 0 5px;
  background: @cl_1E252B;
  border-radius: 6px;
  border: none;
  color: #fff;
}

input:focus {
  border-color: #14a2a5;
}

input:focus-visible {
  outline: 0;
}

.felin-sel {
  position: relative;
}

.felin-in:focus~.in-sel {
  display: block;
}

.in-sel {
  display: none;
  position: absolute;
  width: 90px;
  line-height: 25px;
  background: @cl_0C1014;
  border-radius: 2px;
  border: 1px solid @cl_202020;
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.2);
  color: #fff;
  right: 2px;
  top: 35px;
  text-align: left;
  color: @cl_71757A;
  z-index: 9;
}

.in-sel li {
  padding: 0 5px;
  cursor: pointer;
  list-style: none;
}

.in-sel li:hover {
  background: #333946;
  color: #fff;
}

.repeal button {
  background: transparent;
  height: 30px;
}

.pd {
  color: #E63550;
}

.pu {
  color: #18CA64;
}

.repeal button[disabled] {
  color: #555A5F;
  cursor: not-allowed;
  font-weight: 500 !important;

}

.margin-label {
  padding: 0 1px;
  background: #412F11;
  border-radius: 3px;
  color: @cl_FFA500;
  font-size: 10px;
}
.traded_card_box {
  // width: calc(100vw -336px);
  .traded_card_header {
    width: 100%;
    height: 68px;
    display: flex;
		justify-content: space-between;
		align-items: center;
    .trade_card_select {
      width: 120px;
      height: 38px;
      border-radius: 6px;
      margin-left: 14px;
    }
    .traded_card_header_closeAll {
      width: calc(600/100%);;
      height: 29px;
      margin-right: 14px;
      border-radius: 4px;
      line-height: 29px;
      text-align: center;
      background-color: #f4a000;
      cursor: pointer;
    }
  }
  .card_list_box {
     margin-top:20px;
     overflow-y: auto;
  }
  // .card_list_box::-webkit-scrollbar {
  //   width: 10px;
  //   height: 10px;
  //   overflow: auto;
  // }
  // .card_list_box::-webkit-scrollbar-thumb {
  //   background-color: #ccc;
  //   min-height: 25px;
  //   min-width: 25px;
  //   border: 1px solid #e0e0e0;
  // }
  .traded_card_list {
    margin: 0 14px 30px 14px;
    height: 146px;
    background: #0d1015;
    border: 2px solid #12181e;
    border-left: none;
    padding-left: 4px;
    position: relative;
    .traded_style {
      width: 5px;
      height: 100%;
      background-color: #00c076;
      position: absolute;
      left: 0;
    }
    .card_title {
      height: 22px;
      line-height: 22px;
      padding-left: 9px;
      box-sizing: border-box;
      background: #12181e;
      margin-top: 14px;
      margin-bottom: 14px;
      font-weight: 400;
      color: #00c076;
    }
    .card_list {
      margin-bottom: 13px;
      width: 100%;
      display: flex;
      flex-wrap: nowrap;
      align-items: center;
      .card_style_field,
      .card_style_value,
      .card_style_value_day {
        width: calc(100/10%);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        padding-left: 10px;
        box-sizing: border-box;
        color: #aeb1b7;
      }
      .card_style_value {
        color: #fff;
      }
      .card_style_value_day {
        color: #000;
      }
      .button_box {
        display: float;
        
        align-items: center;
        .button_style {
          float: right;
          background-color: #f4a000;
          color: #0d1015;
          height: 28px;
          line-height: 25px;
          width: 68%;
          border-radius: 5px;
          text-align: center;
          cursor: pointer;
        }
      }
    }
  }
}
</style>

<style lang="less">
.card_style_value,
.card_style_value_day {
  .in-sel {
    right: inherit;
    left: 12px;
  }
}
</style>