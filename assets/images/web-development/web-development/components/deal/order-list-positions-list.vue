<template>
    <!-- <div class="card_list_box" :style="{height: isPro? '400px':'auto'}" v-if="searList.length"> -->
    <div class="traded_card_list" :style="{'backgroundColor': backColor == 'day'?'#fff':'#12181e', 'border': backColor == 'day'?'none':'2px solid #12181e', 'borderLeft': 'none'}">
      <div class="traded_style" :style="{'backgroundColor': item.direction !== -1 ?'#00c076':'#f54252'}"></div>
      <div class="card_title" :style="{'color': item.direction !== -1 ?'#00c076':'#f54252','backgroundColor': backColor == 'day'? '#f3f5f7':'#12181e'}">
        {{ global_get_uppercase(item.symblename) }}·{{ item.direction == -1 ?
          $t('contract.none') : $t('contract.more')
        }}
        <span class="margin-label pointer" :style="{'color': item.direction !== -1 ?'#00c076':'#f54252', 'background': 'transparent'}" @click="changeLeverage">{{ global_get_tofixed(item.multiple, 0)
        }}X</span>
      </div>
      <div class="card_list">
        <div class="card_style_field"> {{ $t('contract.positionZh') }} </div>
        <div :class="backColor == 'day'?'card_style_value_day':'card_style_value'">
          {{ global_get_tofixed(item.openinterest, symbleinfo.amountdigits) }}{{ symbleinfo.fcurrencyname }}
        </div>
        <div class="card_style_field"> {{ $t('deal.openAveragePrice') }} </div>
        <div :class="backColor == 'day'?'card_style_value_day':'card_style_value'">
          {{ global_get_tofixed(item.openavgprice, symbleinfo.pricedigits)
          }}
        </div>
       <div class="card_style_field"> {{ $t('contract.floatMoust') }} </div>
          <div :class="backColor == 'day'?'card_style_value_day':'card_style_value'" :style="{'color': unrealizedProfitAndLossAmount > 0 ?'#00c076':'#f54252','backgroundColor': backColor == 'day'? '#f3f5f7':'#12181e'}">{{ unrealizedProfitAndLossAmount }}USDT</div>
        <div class="card_style_field">  {{ $t('strtable.stab18') }} </div>
        <div :class="backColor == 'day'?'card_style_value_day felin':'card_style_value felin'" style="position: relative; overflow: inherit;">
          <input class="felin-in" v-show="treadetype == 1" @input="changePrice"
            type="number" v-model="buyPrice" />
          <input class="felin-in" v-show="treadetype == 2" @input="changePrice" type="number"
            :placeholder="$t('deal.marketDeal')" readonly="readonly" />
          <ul class="in-sel">
            <li @mousedown.prevent="selback = '10%'" @click="changeTreadeType(1)">{{ $t('deal.limitedDeal') }}</li>
            <li @mousedown.prevent="selback = '10%'" @click="changeTreadeType(2)">{{ $t('deal.marketDeal') }}</li>
          </ul>
        </div>
        <div class="card_style_field button_box">
          <div class="button_style" :style="{'color': backColor == 'day'? '#fff':'#0d1015'}" :disabled="Number(amount) > Number(maxAmount)" @click="repeal(item.direction)">{{ $t('contract.closePosition') }}</div>
        </div>
        <!-- <div class="card_style_field button_box">
          <div class="button_style" :style="{'color': backColor == 'day'? '#fff':'#0d1015'}" @click="repeal(item.direction)">{{ $t('deal.reverse') }}</div>
        </div> -->
      </div>
      <div class="card_list">
        <div class="card_style_field">{{ $t('contract.entrusted') }}</div>
        <div :class="backColor == 'day'?'card_style_value_day':'card_style_value'">
          <font style="border-bottom: 1px dashed #14a2a5;cursor: pointer;"
            :title="global_get_tofixed(item.frozenamount * item.holdpositionsavgprice, global_get_decimal(symbleinfo.fcurrencyname).p) + ' USDT'">
            {{ global_get_tofixed(item.frozenamount, symbleinfo.amountdigits) }} {{ item.symblename }}</font>
        </div> 
        <div class="card_style_field">{{ $t('index.mark') }}</div>
        <!-- {{ global_get_tofixed(item.copeDailyDetail?.mp, item.dcs?.p) }} -->
        <div :class="backColor == 'day'?'card_style_value_day':'card_style_value'">  {{ marketPrice }}</div> 
        <div class="card_style_field">{{ $t('contract.ct18') }}</div>
        <div :class="backColor == 'day'?'card_style_value_day':'card_style_value'" :style="{'color': getprofitrate(item) > 0 ?'#00c076':'#f54252'}">{{ getprofitrate(item) }}%</div>
      </div>
      <div class="card_list">
        <div class="card_style_field">{{ $t('contract.ct19') }}</div>
        <div :class="backColor == 'day'?'card_style_value_day':'card_style_value'">
          <font style="border-bottom: 1px dashed #14a2a5;cursor: pointer;"
            :title="global_get_tofixed($np.minus(item.openinterest, item.frozenamount) * item.holdpositionsavgprice, global_get_decimal(symbleinfo.fcurrencyname).p) + ' USDT'">
            {{ global_get_tofixed($np.minus(item.openinterest, item.frozenamount), symbleinfo.amountdigits)}}{{ item.symblename }}
          </font>
        </div>
        <div class="card_style_field">{{ $t('contract.ct20') }}</div>
        <div :class="backColor == 'day'?'card_style_value_day':'card_style_value'">{{global_get_tofixed(item.holdpositionsamount, global_get_decimal(symbleinfo.fcurrencyname).p)}} <span class="prepetual-txt">USDT</span></div>
        <div class="card_style_field">{{ $t('contract.ct21') }}</div>
        <div :class="backColor == 'day'?'card_style_value_day':'card_style_value'"> {{ setExplosionPrice(item.explosionprice, symbleinfo.fcurrencyname) }}</div>
        <div class="card_style_field">{{ $t('contract.ct22') }}</div>
        <div :class="backColor == 'day'?'card_style_value_day felin':'card_style_value felin'" style="position: relative; overflow: inherit">
          <input class="felin-in" type="number" v-model="amount" @input="changeAmountInput" />
          <ul class="in-sel">
            <li @mousedown.prevent="selback = '10%'" @click="changeAmount(item, 0.1)">10%</li>
            <li @mousedown.prevent="selback = '20%'" @click="changeAmount(item, 0.2)">20%</li>
            <li @mousedown.prevent="selback = '50%'" @click="changeAmount(item, 0.5)">50%</li>
            <li @mousedown.prevent="selback = '100%'" @click="changeAmount(item, 1)">100%</li>
          </ul>
        </div>
        <!-- <div class="card_style_field button_box">
          <div class="button_style" :style="{'color': backColor == 'day'? '#fff':'#0d1015'}" @click="repealAll(item.direction, item)">{{ $t('tabkeys.tab69') }}</div>
          </div> -->
       <div class="card_style_field button_box"><div class="button_style" :style="{'color': backColor == 'day'? '#fff':'#0d1015'}" @click="repealAll(item.direction, item)">{{ $t('contract.fullclosing') }}</div>
        </div>
      </div>
      <CurrencyLeverage :listhaveorderinfos="[item]" :symbleinfo="symbleinfo"
      :currencyLeverageModal="showLeverage" v-show="showLeverage" @closePopup="showLeverage = false"
      @confirmCurrencyLeverage="updateLeverage" />
    </div>
</template>

<script>
import number from '@/components/public/number'
import CurrencyLeverage from '@/components/security/currency-leverage';
import { mapActions, mapGetters } from 'vuex'
import AppNoData from '../App/AppNoData.vue';
import AppTooltip from '../App/AppTooltip.vue';
export default {
  name: 'PositionsList',
  computed: {
    ...mapGetters("market", ["getContractAllMarketList"]),
    backColor() {
      return this.$store.state.hex_client_background.active
    },
    unrealizedProfitAndLossAmount() {
      if (!this.item.copeDailyDetail) {
        return 0
      } 
      let price = this.item.direction == 1
            ? (Number(this.marketPrice) - Number(this.item.holdpositionsavgprice)) * Number(this.item.openinterest)
            : (Number(this.item.holdpositionsavgprice) - Number(this.marketPrice)) * Number(this.item.openinterest)
      return this.global_get_tofixed(price, this.global_get_decimal(this.symbleinfo.fcurrencyname + '/usdt').p)
    },
    earnedRate() {
      return this.item.holdpositionsamount > 0
        ? this.unrealizedProfitAndLossAmount / this.item.holdpositionsamount
        : 0
    },
    copeDailyDetail() {
      if (this.getContractAllMarketList) {
        let array = Array.from(this.getContractAllMarketList)
        let list = array.filter((citem) => {
        return citem.ctid == this.item.ctid;
      });
      if (list.length > 0) {
        return list[0]
      } else {
        return this.copeDailyDetailFirst
      }
    }
  }
  },
  components: {
    'hex-number': number,
    CurrencyLeverage,
    AppNoData,
    AppTooltip
  },
  props: {
    item: {
      default: Object
    },
    contractassesinfo: {
      default: Object
    },
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
      symbleinfo: {},
      copeDailyDetailFirst: '',
      marketPrice:0,
      buyPrice: '',
      amount: '',
      maxAmount: ''
    }
  },
  watch: {
    // 'item.ip': function (val) {
    //   this.listhaveorderinfos.filter(data => data.direction == -1).map(data => {
    //     this.maxBuyAmount = this.global_get_tofixed(this.$np.minus(data.openinterest, data.frozenamount), this.global_get_decimal(this.symbleinfo.descriptions).a)
    //   })
    //   return val
    // },
    // 'saleRate': function (val) {
    //   this.listhaveorderinfos.filter(data => data.direction == 1).map(data => {
    //     this.maxSaleAmount = this.global_get_tofixed(this.$np.minus(data.openinterest, data.frozenamount), this.global_get_decimal(this.symbleinfo.descriptions).a)
    //   })
    //   return val
    // },
    // 'maxSaleAmount': function (val) {
    //   this.saleAmount = val
    // },
    // 'maxBuyAmount': function (val) {
    //   this.buyAmount = val;
    // },
    'copeDailyDetail': {
      handler: function (val) {
        if (val) {
          if (!this.buyPrice || this.buyPrice <= 0) {
            this.buyPrice = val.ip
          } 
          if(val.mp>0)
             this.marketPrice=val.mp;
        }
      },
      deep: true,
      immediate: true,
    },
    // 'entrustSaleRate': function (val) {
    //   this.saleRate = this.global_get_tofixed(val, this.global_get_decimal(this.symbleinfo.descriptions).p)
    // },
    // dailyDetail: function (val) {
    //   if (val) {
    //     this.copeDailyDetail = val;
    //     this.copeDailyDetail.c = val.c;
    //     this.dcs = this.global_get_decimal(val.symble.toUpperCase());
    //   }
    // }
  },
  methods: {
    ...mapActions('trade', ['submitChangeLeverage']),
    changePositinFilter() {

    },
    changeLeverage() {
      this.showLeverage = true
    },
    async updateLeverage(leverage) {
      this.showLeverage = false
      let param = { ctid: this.symbleinfo.id, multiple: leverage}
      if (this.$route.query.contractType == 1) {
        param.contractType = 1
      }
      const res = await this.submitChangeLeverage(param)
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
    changeAmount(data, val) {
      if (this.treadetype == 1) {//限价交易
        
        this.amount = this.global_get_tofixed(this.maxAmount * val, this.global_get_decimal(this.symbleinfo.descriptions).a)
        // if (data.direction == 1) {//买入
        //   this.salePercentage = val
        //   this.maxSaleAmount = this.global_get_tofixed(this.$np.minus(data.openinterest, data.frozenamount), this.global_get_decimal(this.symbleinfo.descriptions).a)
        //   this.amount = this.maxSaleAmount * val
        // } else {//卖出
        //   this.buyPercentage = val
        //   this.maxBuyAmount = this.global_get_tofixed(this.$np.minus(data.openinterest, data.frozenamount), this.global_get_decimal(this.symbleinfo.descriptions).a)
        //   this.amount = this.maxBuyAmount * val
        // }
      } else {//市价交易
         this.amount = this.global_get_tofixed(this.maxAmount * val, this.global_get_decimal(this.symbleinfo.descriptions).a)
        // if (data.direction == 1) {//买入
        //   this.salePercentage = val
        //   this.maxSaleAmount = this.global_get_tofixed(this.$np.minus(data.openinterest, data.frozenamount), this.global_get_decimal(this.symbleinfo.descriptions).a)
        //   this.saleAmount = this.maxSaleAmount * val
        // } else {//卖出
        //   this.buyPercentage = val
        //   this.maxBuyAmount = this.global_get_tofixed(this.$np.minus(data.openinterest, data.frozenamount), this.global_get_decimal(this.symbleinfo.descriptions).a)
        //   this.buyAmount = this.maxBuyAmount * val
        // }
      }
    },
    changeTreadeType(val) {
      this.treadetype = val;
      this.buyAmount = 0;
      this.saleAmount = 0;
    },
    changePrice(e) {
        let value = e.target.value;
        // 限制最多只能输入多少位小数
        if (value.indexOf('.') > -1 && value.split('.')[1].length > this.symbleinfo.pricedigits) {
          this.buyPrice = parseFloat(value.substring(0, value.length - 1));
          return
        }
    },
    changeAmountInput(e) {
        let value = e.target.value;
        // 限制最多只能输入多少位小数
        if (value.indexOf('.') > -1 && value.split('.')[1].length > this.symbleinfo.amountdigits) {
          this.amount = parseFloat(value.substring(0, value.length - 1));
          return
        }
    },
    replaceCurrency(symble) {
      return symble.toUpperCase().replace(this.$t('contract.swap'), '');
    },
    setExplosionPrice(n, m) {
      if (Number(n) <= 0) {
        return '--';
      } else {
        return this.global_get_tofixed(n, this.global_get_decimal(m?m.toLowerCase():m +
                    "/yx").p)
      }
    },
    getnum(coins) {
      return this.global_get_tofixed(coins.transactionamount, this.global_get_decimal(this.symbleinfo.descriptions).a)
    },
    //（（已实现盈亏+未实现盈亏）/持仓保证金）*100%
    getprofitrate(coins) {
      let rate = coins.holdpositionsamount ? ((this.unrealizedProfitAndLossAmount) / Number(coins.holdpositionsamount)) : 0
      rate = rate ? this.global_get_tofixed(rate * 100, 2) : 0
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
      const currencyId = ctid ? ctid : this.symbleinfo.id
      
      // if (this.treadetype == 1 && direction == 1 && (this.saleAmount == '' || this.saleAmount <= 0 || this.saleRate == '' || this.saleRate <= 0)) {
      //   return
      // } else if (this.treadetype == 1 && direction == -1 && (this.buyAmount == '' || this.buyAmount <= 0 || this.buyRate == '' || this.buyRate <= 0)) {
      //   return
      // }
      // else if (this.treadetype == 2 && direction == 1 && (this.saleAmount == '' || this.saleAmount <= 0)) {
      //   return
      // }
      // else if (this.treadetype == 2 && direction == -1 && (this.buyAmount == '' || this.buyAmount <= 0)) {
      //   return
      // }
      // if (this.maxAmount < this.amount) {
      //   this.$store.commit('set_message', {
      //     type: 'error',
      //     text: this.$t('c2c.Cannotavailable')
      //   })
      // }
      if (this.maxAmount < this.amount) {
        console.log('this.maxBuyAmount', this.maxAmount)
        this.$store.commit('set_message', {
          type: 'error',
          text: this.$t('c2c.Cannotavailable')
        })
        return
      }
      this.dealModel.ordertype = this.treadetype == 2 ? 5 : 4;//5，市价平仓；4，限价平仓
      const dealModel = Object.assign({}, this.dealModel)
      dealModel.price = this.treadetype == 2 ? 0 :  this.buyPrice
      dealModel.amount = this.amount
      dealModel.multiple = Number(this.item.multiple)
      dealModel.ctid = currencyId
      dealModel.direction = (direction == 1) ? -1 : 1
      if (this.$route.query.contractType == 1) {
        dealModel.contractType = 1
      }
      this.$emit('changeLoading',true)
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
              this.$emit('getContractAssesInfos',1);
            }, 500);
        }).catch(() => {
        })
    },
    repealAll(direction, item, ctid = null) {
      const currencyId = ctid ? ctid : this.item.ctid.toString()
      this.dealModel.ordertype = 5;//5，市价平仓；4，限价平仓
      const dealModel = Object.assign({}, this.dealModel)
      dealModel.price = 0
      dealModel.amount = item.openinterest
      dealModel.multiple = Number(this.item.multiple)
      dealModel.ctid = currencyId
      if (this.$route.query.contractType == 1) {
        dealModel.contractType = 1
      }
      dealModel.direction = (direction == 1) ? -1 : 1
      
      this.$emit('changeLoading',true)
      // setTimeout(() => {
      //   this.$emit('changeLoading',false)
      // }, 2000);
      this.$store.dispatch('usercontract_order_create', dealModel)
        .then((res) => {
          this.loading = false
          if (res.data) {
            /*发布*/
            this.$pubsub.publish(this.$pubsub.getOrderList)
            this.$pubsub.publish(this.$pubsub.changeDepthChart)
            this.$store.commit('set_message', { type: 'ok', text: res.msg })
          }
        })
        .then(() => {
          setTimeout(() => {
            this.$emit('getContractAssesInfos',1);
          }, 500);
        }).catch(() => {
        })
    },
    async repealAllContract() {
      const _self = this
      this.loading = true
      await this.listhaveorderinfos.forEach(order => {
        console.log('order::', order);
        _self.repealAll(order.direction, order, order.ctid.toString())
      })
      this.loading = false
    },
    // getAllPrice(coins) {
    //   const p = this.$np.times(coins.tradeavgprice, coins.transactionamount)
    //   if (!p) return p.toFixed(2)
    //   return p.toFixed(8)
    // }
  },

  mounted() {
    this.symbleinfo = this.$store.state.symbleinfos.filter((citem) => {
        return citem.id == this.item.ctid;
      })[0];
      console.log('this.item====', this.item)
      this.buyPrice =this.global_get_tofixed(this.item.copeDailyDetail?.ip, this.symbleinfo.pricedigits)
      this.amount = this.global_get_tofixed(this.$np.minus(this.item.openinterest, this.item.frozenamount), this.global_get_decimal(this.symbleinfo.descriptions).a)
      this.maxAmount = this.global_get_tofixed(this.$np.minus(this.item.openinterest, this.item.frozenamount), this.global_get_decimal(this.symbleinfo.descriptions).a)
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
      width: 101px;
      height: 29px;
      border-radius: 6px;
      margin-left: 14px;
    }
    .traded_card_header_closeAll {
      width: calc(600/100%);
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
    height: 400px;
    overflow-y: auto;
  }
  .card_list_box::-webkit-scrollbar {
    width: 10px;
    height: 10px;
    overflow: auto;
  }
  .card_list_box::-webkit-scrollbar-thumb {
    background-color: #ccc;
    min-height: 25px;
    min-width: 25px;
    border: 1px solid #e0e0e0;
  }
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
      margin-bottom: 14px;
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
        width: calc(100/9%);
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