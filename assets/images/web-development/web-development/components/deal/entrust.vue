<template>
  <div class="entrust-list">
    <div class="dealcoin-title clearfix">
      <ul class="coin-title clearfix">
        <li class="coin-title_item active order-book" @click.stop="opentradedetail(8)">
          {{ $t('ico.ico34') }}
        </li>

        <li class="coin-title_item market-trade" @click.stop="opentradedetail(10)">
          {{ $t('deal.newargain') }}
        </li>

        <li class="coin-title_item assets-transfer" @click.stop="opentradedetail(9)"
          v-if="showMarketTab && symbleinfo.itype == 1">
          {{ $t('contract.assets') }}
        </li>

      </ul>
    </div>
    <div class="entrust-list_title clearfix">
      <div class="select_list_tab left pl-2">
        <span class="all" :class="{ 'active': activelisttab == 1 }" @click="activelisttab = 1"></span>
        <span class="buy" :class="{ 'active': activelisttab == 2 }" @click="activelisttab = 2"></span>
        <span class="sell" :class="{ 'active': activelisttab == 3 }" @click="activelisttab = 3"></span>
      </div>
      <div class="dot_right right">
        <!--<span class="dot_tip">{{ $t('deal.mergeDepth') }}</span>-->
        <div class="dot_tip_select">
          <span class="dot_tip_select_tip" @click.stop="showDot">{{ dotType }}</span>
        </div>
      </div>
      <ul class="dot_tip_select_content" v-show="isshowDot">
        <li v-for="(m, index) in dotList" :key="index" :class="{ 'active': dotType == m }" @click="setDotType(m)">
          {{ m }}
        </li>
      </ul>
    </div>
    <!--header-->
    <dl class="entrust-list_content_title entrust-list_content entrust-list_content_4">
      <dt class="header">
        <span class="price title-price">{{ $t('deal.price') }}</span>
        <span class="num">{{ $t('deal.count') }} {{ symblefrom }}</span>
        <span class="money">{{ $t('patch.total') }}</span>
      </dt>
    </dl>
    <div class="entrust-list_body" :class="{ 'body_full': activelisttab == 1, 'body_single': activelisttab != 1 }">
      <!--卖盘-->
      <dl class="entrust-list_content entrust-list_content_4 sell_content" v-if="activelisttab != 2"
        @mouseenter="iscanscroll = false" @mouseleave="iscanscroll = true">
        <div v-bar ref="entrustsell">
          <div>
            <dd class="body buying" ref="selling" v-for="(m, i) in orderselllist" :class="{ 'first': i == 0 }"
              @click="getEntrustRate(m)" @mouseenter="exchangeRateConversion($event)"
              @mouseleave="notExchangeRateConversion($event)" :key="i">
              <span class="progress" :style="{ 'width': `calc(${getprogress(m, -1)}% - 4px)` }"></span>
              <span class="price title-price">{{ m.p == '--' ? m.p : getprice(m.p) }}</span>
              <span class="price title-price animated bounceIn"><b>{{
                $store.getters.get_client_exchange_rate_name.mark.toUpperCase() }}
                  {{ m.p == '--' ? m.p : $store.getters.get_client_exchange_rate(symbleto, m.p) }}</b></span>
              <span class="num">{{ m.a == '--' ? m.a : global_get_tofixed_entrust(m.a, symbleinfo.amountdigits) }}</span>
              <span class="money">{{ getSum(m) }}</span>
            </dd>
          </div>
        </div>
      </dl>
      <!--最新价-->
      <div class="entrust-list_content_center">
        <p v-if="link !== 'contract'" class="price">
          <span class="new-money-dot" :class="newmoney.direction > 0 ? 'rise' : 'fall'">
            {{ global_get_tofixed_entrust(newmoney.price, dcs.p) }}</span>
          <span class="tip">≈{{
            $store.getters.get_client_exchange_rate(symbleto, newmoney.price) }}
            {{ $store.state.hex_client_exchange.active.toUpperCase() }}</span>
        </p>
        <div v-else class="price co_price">
          <div style="text-align: left;float: left;">
            <p class="index" style="width: 100%;line-height: 20px;height: 20px;">{{ $t('deal.newPrice') }}</p>
            <p class="new-money-dot" style="width: 100%;line-height: 20px;height: 20px;"
              :class="newmoney.direction > 0 ? 'rise' : 'fall'">{{ global_get_tofixed_entrust(newmoney.price, dcs.p) }}
            </p>
          </div>
          <div style="text-align: right;float: right;">
            <p class="index" style="width: 100%;line-height: 20px;height: 20px;">{{ $t('deal.indexPrice') }}</p>
            <p class="index new-money-dot pointer" style="width: 100%;line-height: 20px;height: 20px;"
              @click="$router.push('/contract/data?tab=1')">
              {{ global_get_tofixed_entrust(indexPrice, dcs.p) }}</p>
          </div>
        </div>
      </div>
      <!--买盘-->
      <dl class="entrust-list_content entrust-list_content_4" v-if="activelisttab != 3" @mouseenter="iscanscroll = false"
        @mouseleave="iscanscroll = true">
        <div v-bar>
          <div>
            <dd class="body average" v-for="(m, i) in orderbuylist" :class="{ 'first': i == 0 }"
              @click="getEntrustRate(m)" @mouseenter="exchangeRateConversion($event)"
              @mouseleave="notExchangeRateConversion($event)" :key="i">
              <span class="progress" :style="{ 'width': `calc(${getprogress(m, 1)}% - 4px)` }"></span>
              <span class="price title-price">{{ m.p == '--' ? m.p : getprice(m.p) }}</span>
              <span class="price title-price animated bounceIn"><b>
                  {{ $store.getters.get_client_exchange_rate_name.mark.toUpperCase() }}{{ m.p == '--' ? m.p :
                    $store.getters.get_client_exchange_rate(symbleto, m.p)
                  }}</b></span>
              <span class="num">{{ m.a == '--' ? m.a : global_get_tofixed_entrust(m.a, symbleinfo.amountdigits) }}</span>
              <span class="money">{{ getSum(m) }}</span>
            </dd>
          </div>
        </div>
      </dl>
    </div>

  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'DealEntrust',
  computed: {
    ...mapGetters('market', ['getCurrentMarketPrice']),
    newmoney: function () {
      // console.log('this.getCurrentMarketPrice: symble', this.getCurrentMarketPrice.symble,'price:', this.getCurrentMarketPrice.price);
      return this.getCurrentMarketPrice
    }
  },
  watch: {
    'activelisttab': function (val) {
      if (val == 3) {
        this.$nextTick(() => {
          this.resetscroll()
        })
      }
      this.orderDepthsell()
      this.orderDepthbuy()
    },
    'symbleinfo': function (val) {
      if (val && val.descriptions) {
        this.dcs = this.global_get_decimal(val.descriptions);
        this.symbleParameString = val.descriptions.replace("/", "")
        this.symblefrom = val.fcurrencyname;
        this.symbleto = val.tcurrencyname;
        var dotval = 1;
        for (var ii = val.pricedigits; ii >= 1; ii--) {
          if (ii == 1)
            dotval = 0.1
          else if (ii == 2)
            dotval = 0.01
          else if (ii == 3)
            dotval = 0.001
          else if (ii == 4)
            dotval = 0.0001
          else if (ii == 5)
            dotval = 0.00001
          else if (ii == 6)
            dotval = 0.000001
          else if (ii == 7)
            dotval = 0.0000001
          else if (ii == 8)
            dotval = 0.00000001
          else if (ii == 9)
            dotval = 0.000000001
          else if (ii == 10)
            dotval = 0.0000000001
          else if (ii == 11)
            dotval = 0.00000000001
          else if (ii == 12)
            dotval = 0.000000000001
          if (ii === val.pricedigits) {
            this.lastdotType = dotval;
            this.dotType = dotval;
          }
          this.dotList.push(dotval);
        }
        if(val.pricedigits == 0) {
          this.dotList.push(1)
        }
        if (this.$route.path.indexOf('contract') >= 1) {
          this.link = "contract"
          this.getcontractRate()
        } else {
          this.link = "other"
        }
        this.getMarkDepth()
        document.addEventListener('click', () => {
          this.isshowDot = false
        })
      }
    }
  },
  props: {
    symbleinfo: {
      type: Object,
      default: function () {
        return {}
      }
    },
    showMarketTab: {
      type: Boolean
    },
    entrustType: {
      type: Number
    }
  },
  data() {
    return {
      dotTypeLoading: true,
      dotList: [],
      dotType: 1,
      lastdotType: 1,
      isshowDot: false,
      entrustsaleFirst: false,
      entrustbuyFirst: false,
      activelisttab: 1,
      //24小时行情数据
      depthBuying: [],
      depthSelling: [],
      link: "",
      indexPrice: 0,
      maxsellamount: 0,
      maxbuyamount: 0,
      orderselllist: this.initDepth(),
      orderbuylist: this.initDepth(),
      iscanscroll: true,
      symbleParameString: '',
      symblefrom: '',
      symbleto: '',
      dcs: {},
      timmer: null
    }
  },
  mounted() {

  },
  subscribe() {
    return {
      changeNewMoney(res) {
        /*更新最新价格*/
        if (res && res.symble.toUpperCase() == this.symbleParameString.toUpperCase()) {

          if (this.newmoney.price == 0) {
            if (res.price > 1) {
              this.dotList.push(1);
            }
            /* if (res.price > 10) {
               this.dotList.push(10);
             }
             if (res.price > 50) {
               this.dotList.push(50);
             }
             if (res.price > 100) {
               this.dotList.push(100);
             }*/
          }
          // this.newmoney = res

        }
      }
    }
  },
  methods: {
    getcontractRate() { //合约指数价格展示
      if (!this.symbleinfo.id) {
        return
      }
      let _self = this;
      this.$store.dispatch('usercontract_contract_getindexprice', { ctid: this.symbleinfo.id })
        .then(({ data }) => {
          if (data) {
            _self.indexPrice = data;
            this.$pubsub.publish(this.$pubsub.indexPrice, data)
            _self.connectindexsocket();
          }
        })
    },
    opentradedetail(type) {
      this.$emit('setEntrustType', type)
    },
    connectindexsocket() {
      var substr = "indexprice." + this.symbleParameString.toLowerCase() + ".detail"
      this.$socket.invoke({
        sub: substr,
        type: this.$socket.type.usercontract_contract_getindexprice,
      });
      this.$socket.receive(this.$socket.type.usercontract_contract_getindexprice, this.indexpricecallback);
    },
    EntrustType(type) {
      this.activelisttab = 4;
      this.$emit('setEntrustType', 9);
    },
    indexpricecallback(data) {
      this.indexPrice = data.data;
      this.$pubsub.publish(this.$pubsub.indexPrice, data.data)
    },
    orderDepthsell() { //倒序排列卖家委托列表
      const num = this.activelisttab != 1 ? -this.depthSelling.length : -30
      const self = this
      if (!self.depthSelling || self.depthSelling.length <= 0) {
        return []
      }

      const res = new Map();
      self.depthSelling = self.depthSelling.filter((item) => !res.has(item.p) && res.set(item.p, 1));
      var maxbuyprice = this.orderbuylist[0].p == '--' ? 0 : this.orderbuylist[0].p
      self.depthSelling = self.depthSelling.filter((item) => {
        return item.a > 0 && item.p >= maxbuyprice && item.p > 0
      })

      let sell = self.depthSelling.sort(function (itema, itemb) {
        return itemb.p - itema.p
      }).slice(num) //排序并且获取指定数量的卖单
      this.maxsellamount = Math.max.apply(Math, sell.map(function (item) {
        return item.a
      }));
      if (sell.length > 0 && !isNaN(Number(sell[0].p))) {
        if (!self.entrustsaleFirst) {
          self.entrustsaleFirst = true
          //初始化买入卖出价
          self.$pubsub.publish(self.$pubsub.entrustSaleRate, sell[sell.length - 1].p)
        }
      }

      this.orderselllist = sell
    },
    orderDepthbuy: function () { //倒叙排列买家委托列表
      const num = this.activelisttab != 1 ? this.depthBuying.length : 30
      const self = this
      if (!self.depthBuying || self.depthBuying.length <= 0) {
        return []
      }
      const res = new Map();
      self.depthBuying = self.depthBuying.filter((item) => !res.has(item.p) && res.set(item.p, 1));
      var maxsellprice = this.orderselllist[0].p == '--' ? 99999999 : this.orderselllist[this.orderselllist.length - 1].p
      self.depthBuying = self.depthBuying.filter((item) => {
        return item.a > 0 && (item.p <= maxsellprice)
      })
      let buy = self.depthBuying.sort(function (itema, itemb) {
        return itemb.p - itema.p
      }).slice(0, num)
      this.maxbuyamount = Math.max.apply(Math, buy.map(function (item) {
        return item.a
      }));
      if (buy.length > 0 && !isNaN(Number(buy[0].p))) {
        if (!self.entrustbuyFirst) {
          self.entrustbuyFirst = true
          //初始化买入卖出价
          self.$pubsub.publish(self.$pubsub.entrustBuyRate, buy[0].p)
        }
      }
      this.orderbuylist = buy
    },
    sellflexbottom() {//专业版卖盘数量少时靠下显示，先去掉
      const selling = this.$refs['selling']
      if (selling.length > 0) {
        const lastsell = selling[0]
        const margintop = parseInt(getComputedStyle(lastsell).marginTop.replace('px', ''))
        const marginbottom = parseInt(getComputedStyle(lastsell).marginBottom.replace('px', ''))
        const allheight = (lastsell.offsetHeight + margintop) * selling.length + marginbottom
        if (lastsell.offsetParent != null) {
          const isless = allheight < lastsell.offsetParent.offsetHeight
          if (isless) {
            lastsell.offsetParent.classList.add('flex-to-bottom')
          } else {
            lastsell.offsetParent.classList.remove('flex-to-bottom')
          }
        }
      }
    },
    resetscroll: function () {//重置滚动条位置
      if (this.$vuebar && this.$refs.entrustsell && this.iscanscroll) {
        let ref = this.$vuebar.getState(this.$refs.entrustsell);
        ref.el2.scrollTop = ref.el2.scrollHeight + 100;
      }
      this.sellflexbottom();
    },
    getprice(p) {
      let digits = 0
      if (this.dotType == 1)
        digits = 0
      else if (this.dotType == 0.1)
        digits = 1
      else if (this.dotType == 0.01)
        digits = 2
      else if (this.dotType == 0.001)
        digits = 3
      else if (this.dotType == 0.0001)
        digits = 4
      else if (this.dotType == 0.00001)
        digits = 5
      else if (this.dotType == 0.000001)
        digits = 6
      else if (this.dotType == 0.0000001)
        digits = 7
      else if (this.dotType == 0.00000001)
        digits = 8
      else if (this.dotType == 0.000000001)
        digits = 9
      else if (this.dotType == 0.0000000001)
        digits = 10
      else if (this.dotType == 0.00000000001)
        digits = 11
      else
        digits = 12

      // console.log('digits', p, digits);


      return this.global_get_tofixed_entrust(p, digits)

    },
    exchangeRateConversion(e) {//汇率转换
      e.stopPropagation();
      e.currentTarget.children[1].style.display = "none";
      e.currentTarget.children[2].style.display = "block"
    },
    notExchangeRateConversion(e) {//汇率不转换
      e.stopPropagation();
      e.currentTarget.children[2].style.display = "none";
      e.currentTarget.children[1].style.display = "block"
    },
    getprogress(m, buyorsell) { //背景最大量的百分比
      if (m.a && buyorsell == -1) {
        return (m.a / this.maxsellamount) * 100
      }
      if (m.a && buyorsell == 1) {
        return (m.a / this.maxbuyamount) * 100
      }
    },
    callback({ data }) {
      if (data) {
        //console.log('callBackData:', data)
        var { asks, bids } = data
        asks = asks !== null ? asks : [] //selling
        bids = bids !== null ? bids : [] //buying

        if (asks.length + bids.length <= 1) {
          if (asks.length == 1) {
            var obj = this.depthSelling.filter((item) => {
              return item.p == asks[0].p
            });

            if (obj.length > 0) {
              if (asks[0].a > 0) {
                obj[0].a = this.$np.plus(obj[0].a, asks[0].a)
              } else {
                var n_a = this.$np.plus(obj[0].a, asks[0].a)
                if (n_a > 0) {
                  obj[0].a = n_a;
                } else {
                  this.depthSelling = this.depthSelling.filter((item) => {
                    return item.p != asks[0].p
                  });
                }
              }
            } else {
              // if (asks[0].a > 0) {
              //   this.depthSelling.push(asks[0])
              // }
            }
            this.orderDepthsell()
          }
          if (bids.length == 1) {
            var obj = this.depthBuying.filter((item) => {
              return item.p == bids[0].p
            });
            if (obj.length > 0) {
              if (bids[0].a > 0) {
                obj[0].a = this.$np.plus(obj[0].a, bids[0].a)
              } else {
                var n_a = this.$np.plus(obj[0].a, bids[0].a)
                if (n_a > 0) {
                  obj[0].a = n_a;
                } else {
                  this.depthBuying = this.depthBuying.filter((item) => {
                    return item.p != bids[0].p
                  });
                }
              }
            } else {
              // if (bids[0].a > 0) {
              //   this.depthBuying.push(bids[0])
              // }
            }
            this.orderDepthbuy()
          }
        } else {
          

          this.orderselllist = this.initDepth()
          this.orderbuylist = this.initDepth()
          this.depthBuying = bids  //买入
          this.depthSelling = asks //卖出

          this.orderDepthbuy()
          this.orderDepthsell()
        }
        /*发布深度图数据*/
        this.$pubsub.publish(this.$pubsub.changeDepthChart, {
          sell: this.depthSelling,
          buy: this.depthBuying
        })
      }
      this.$nextTick(function () {
        this.resetscroll()
      })
    },
    getMarkDepth() { /*订阅socket*/
      const _self = this;
      var strsub = `market.${this.symbleParameString.toLowerCase()}.depth.8`;
      this.$store.dispatch(this.$socket.url.quotation_marketing_depth_get, {
        symble: this.symbleParameString,
        pagesize: 100,
        pageindex: 1,
        decimaldigits: this.dotType
      }).then((res) => {
        _self.callback(res)
         
        if (_self.dotType == _self.lastdotType) {
          _self.$nextTick(() => {
            _self.resetscroll()
            _self.$socket.invoke({
              sub: strsub,
              type: _self.$socket.type.quotation_marketing_depth_get
            });
            _self.$socket.receive(_self.$socket.type.quotation_marketing_depth_get, _self.callback);
          })
          clearInterval(_self.timmer);
        } else {
          _self.timmer = setTimeout(() => {
            _self.getMarkDepth();
          }, 5000);
        }
      })
    },
    setDotType(val) { //切换小数位
      /*请求的数据是否加载完*/
      this.dotTypeLoading = false
      this.dotType = val
      if (this.dotType != this.lastdotType) {
        // console.log('not equal')
        var strsub = `market.${this.symbleParameString.toLowerCase()}.depth.8`;
        this.$socket.uninvoke({
          sub: strsub,
          type: this.$socket.type.quotation_marketing_depth_get
        });
      }
      this.getMarkDepth();
    },
    showDot(val) { //展示小数位数量
      if (typeof val == "boolean") {
        this.isshowDot = val
      } else {
        this.isshowDot = !this.isshowDot
      }
    },
    getEntrustRate(m) {//单击触发通知挂单价格变更
      this.$emit('entrust:getEntrustRate', m)
    },
    //获取委托金额
    getSum(m) {//计算金额
      const sum = this.global_get_tofixed_entrust(this.$np.times(m.p, m.a), this.symbleinfo.sumdigits)
      if (m.p == '--') {
        return '--'
      }
      return isNaN(sum) ? '--' : sum
    },
    initDepth() {
      const ary = []
      const obj = {
        p: '--',
        a: '--'
      }
      for (let i = 1; i <= 14; i++) {
        ary.push(obj)
      }
      return ary
    }
  },
  beforeDestroy() {
    // console.log("Destroying in process")
    var strsub = `market.${this.symbleParameString.toLowerCase()}.depth.8`;
    this.$socket.uninvoke({
      sub: strsub,
      type: this.$socket.type.quotation_marketing_depth_get
    })

    strsub = "indexprice." + this.symbleParameString.toLowerCase() + ".detail"
    this.$socket.uninvoke({
      sub: strsub,
      type: this.$socket.type.usercontract_contract_getindexprice,
    });
  }
}
</script>
<style lang="less" scoped>
@import "css/entrust";

p,
dl,
* {
  padding: 0px;
  margin: 0px;
}

.animated {
  -webkit-animation-duration: 1s;
  animation-duration: 1s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
}

@-webkit-keyframes bounceIn {

  from,
  20%,
  40%,
  60%,
  80%,
  to {
    -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }

  0% {
    opacity: 0;
    -webkit-transform: scale3d(0.3, 0.3, 0.3);
    transform: scale3d(0.3, 0.3, 0.3);
  }

  20% {
    -webkit-transform: scale3d(1.1, 1.1, 1.1);
    transform: scale3d(1.1, 1.1, 1.1);
  }

  40% {
    -webkit-transform: scale3d(0.9, 0.9, 0.9);
    transform: scale3d(0.9, 0.9, 0.9);
  }

  60% {
    opacity: 1;
    -webkit-transform: scale3d(1.03, 1.03, 1.03);
    transform: scale3d(1.03, 1.03, 1.03);
  }

  80% {
    -webkit-transform: scale3d(0.97, 0.97, 0.97);
    transform: scale3d(0.97, 0.97, 0.97);
  }

  to {
    opacity: 1;
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1);
  }
}

@keyframes bounceIn {

  from,
  20%,
  40%,
  60%,
  80%,
  to {
    -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }

  0% {
    opacity: 0;
    -webkit-transform: scale3d(0.3, 0.3, 0.3);
    transform: scale3d(0.3, 0.3, 0.3);
  }

  20% {
    -webkit-transform: scale3d(1.1, 1.1, 1.1);
    transform: scale3d(1.1, 1.1, 1.1);
  }

  40% {
    -webkit-transform: scale3d(0.9, 0.9, 0.9);
    transform: scale3d(0.9, 0.9, 0.9);
  }

  60% {
    opacity: 1;
    -webkit-transform: scale3d(1.03, 1.03, 1.03);
    transform: scale3d(1.03, 1.03, 1.03);
  }

  80% {
    -webkit-transform: scale3d(0.97, 0.97, 0.97);
    transform: scale3d(0.97, 0.97, 0.97);
  }

  to {
    opacity: 1;
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1);
  }
}

.bounceIn {
  -webkit-animation-duration: 0.5s;
  animation-duration: 0.5s;
  -webkit-animation-name: bounceIn;
  animation-name: bounceIn;
}

.body_full .entrust-list_content.sell_content .flex-to-bottom {
  display: flex !important;
  flex-direction: column;
  justify-content: flex-start;
}

.entrust-list .entrust-list_content.sell_content {
  .flex-to-bottom .body {
    margin: 0 0 2px 0;
  }
}

.entrust-list .dealcoin-title {
  background-color: @cl_content;

  .coin-title {
    color: @cl_8790A1;
    // border-bottom: 1px solid @cl_292E39;
    font-size: 12px;
    margin: 0px;

    .coin-title_item {
      line-height: 30px;
      height: 30px;
      float: left;
      text-align: center;
      padding: 0 12px;
      cursor: pointer;
      font-weight: 600;
    }

    .coin-title_item.active {
      color: @cl_fff !important;
      border-top: 2px solid @cl_link;
      background-color: #0C1014;
      line-height: 26px;
    }

    .coin-title_item.hex-li {
      display: none;
    }

    .coin-title_item:hover {
      color: @cl_link;
    }
  }
}



.entrust-list_body {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.entrust-list {
  width: 320px !important;
  display: flex;
  flex-direction: column;
}

.entrust-list_body.body_full {
  .entrust-list_content {
    height: 50%;
    overflow: hidden;

    .vb {
      height: 100%;

      .vb-content {
        position: relative;
      }
    }
  }
}

.entrust-list_body.body_single {
  .entrust-list_content {
    flex: 1;
    overflow: hidden;

    .vb {
      height: 100%;
    }
  }
}

.market-trade {
  display: none;
}

@media only screen and (max-width: 1799px) {
  .market-trade {
    display: block;
  }
}
</style>
