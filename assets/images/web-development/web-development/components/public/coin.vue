<template>
  <div class="coin-content" @click.stop>
    <ul class="coin-title clearfix">
      <li class="coin-title_item" @click="changetab('self')" :class="{'active':isSelectCoin=='self'}">
        {{$t('patch.Favourite')}}
      </li>
  
      <li @click="changetab('spot')" class="coin-title_item" :class="[{'active':isSelectCoin=='spot'}]">
        {{$t('home.headCionDeal')}} </li>
      <li @click="changetab('margin')" class="coin-title_item" :class="[{'active':isSelectCoin=='margin'}]">
        {{$t('legalSet.leveragedTrade')}} </li>
      <li @click="changetab('contract')" class="coin-title_item" :class="[{'active':isSelectCoin=='contract'}]">
        {{$t('contract.contractDeal')}}</li>
      <li class="coin-title_search">
        <div class="search">
          <input type="text" v-model="searchvalue" :placeholder="$t('wallet.searchCion')">
          <i class="search_coin"></i>
        </div>
      </li>
    </ul>
    <div class="coin-list-trades" v-hex-loading="loading">
      <div class="coin-list_content trande-rise">
        <ul class='trande-s trandeTitle tab-header clearfix'>
          <li class='tac deal-twain'>{{$t('patch.Market')}}</li>
          <li class=" real-time-price ovh">
            <div class='fl cursor'>
              <span @click="setsorttype('c')">{{$t("deal.NewTransactionPrice")}}</span>
            </div>
            <div class='fl sorts'>
              <i class="sortup" :class="initsorttypeclass('c',2)" @click="setsorttype('c')"></i>
              <i class="sortdown " :class="initsorttypeclass('c',1)" @click="setsorttype('c')"></i>
            </div>
          </li>
          <li class=' price-limit ovh'>
            <div class='fr sorts'>
              <i class="sortup" :class="initsorttypeclass('limitprice',2)" @click="setsorttype('limitprice')"></i>
              <i class="sortdown " :class="initsorttypeclass('limitprice',1)" @click="setsorttype('limitprice')"></i>
            </div>
            <div class='fr cursor'>
              <span @click="setsorttype('limitprice')">{{$t('home.tradelimitDay')}}</span>
            </div>
          </li>
          <li class='Volume ovh'>
            <div class='fr sorts'>
              <i class="sortup" :class="initsorttypeclass('v',2)" @click="setsorttype('v')"></i>
              <i class="sortdown" :class="initsorttypeclass('v',1)" @click="setsorttype('v')"></i>
            </div>
            <div class='fr cursor'>
              <span @click="setsorttype('v')">{{$t('home.tradeCostDay')}}</span>
            </div>
          </li>
        </ul>
        <div class="scroll-bar" :style="{'height':searchlist.length>=8?'320px':''}" v-bar>
          <div>
            <ul class='trande-s tab-body clearfix' v-if="!loading">
              <li class=' trande-data deal-twain' v-for="(tradeData,aindex) in searchlist" :key="aindex"
                @click="goDeal(''+tradeData.symble+'',tradeData.itype==1?'contract':(tradeData.itype==-1)?'margin':'spot')">
                <div class="deal-twain nams" st>
                  <span :class="[tradeData.self==true?'collect':'cancel_collect']"
                    @click.stop="collect(tradeData)">&nbsp;
                  </span>
                  <img :src='tradeData.logo' v-if="tradeData.logo" alt="">
                  <span class='colour'>{{tradeData.title }}</span>
                  <span class="symble">{{getSymble(tradeData.symble).from}}</span>
                  <span class="symbleTo"
                    v-if="tradeData.itype==0 || tradeData.itype==-1">/{{getSymble(tradeData.symble).to}}</span>
                  <span class="symbleTo" v-if="tradeData.itype==1"> &nbsp;{{$t('contract.swap')}}</span>
                  <span class="margin-label"
                    v-if="tradeData.itype==-1">{{getSymbInfo(tradeData.ctid).borrowmultiple}}X</span>
                </div>
                <div class="real-time-price o vh">
                  <span class="real-price">
                    {{global_get_tofixed_entrust(tradeData.c, global_get_decimal(tradeData.symble).p)}}
                  </span>
                  <span class='fz12 c-a data-price '>
                    ≈{{$store.getters.get_client_exchange_rate(getSymble(tradeData.symble).to, tradeData.c)}}
                    {{$store.state.hex_client_exchange.active.toUpperCase()}}
                  </span>
                </div>
                <div class='price-limit c-green '>
                  <span :class='tradeData.c-tradeData.o<0?"i_down":"i_up"'>{{getlimitprice(tradeData)}}%</span>
                </div>
                <div class='Volume rightAlign'>
                  {{global_get_tofixed_entrust(tradeData.v, global_get_decimal(tradeData.symble).a)}}
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import more from '@/components/public/more'
export default {
  name: 'trade',
  components: {
    'hex-more': more
  },
  props: ['day', 'symbleto'],
  data() {
    return {
      selectcut: '',
      searchvalue: '',
      coinList: [],
      isSelectCoin: 'spot',
      noDataText: false,
      collecttimer: '',
      loading: false,
      sorttypelistactive: {
        type: '',
        value: ''
      },
      searchlist: [],
      selectcoinlist: {},
      symbletype: 0,
      allmarketDatas: [],
      marketDatas: []
    }
  },
  watch: {
    'sorttypelistactive': {
      handler: function (val) {
        this.changesearchlist()
      },
      deep: true
    },
    '$userinfo': function (val) {
      if (!val.uid) {
        this.changesearchlist()
      }
    },
    'coinList': {
      handler: function (data) {
        this.changesearchlist()
      },
      deep: true
    },
    'isSelectCoin': function (val) {
      this.changesearchlist()
    },
    'searchvalue': function () {
      this.changesearchlist()
    },
    'marketDatas': function (val) {
      if (this.searchlist == null || this.searchlist.length == 0) {
        this.searchlist = val;
      }
      if (this.isSelectCoin == 'self' && this.selectcoinlist.length == 0) {
        this.searchlist = [];
      }
      if (this.searchlist.length > 0) {
        let newdatas = [];
        this.searchlist.forEach((m) => {
          var datainfos = val.filter((item) => {
            return item.ctid == m.ctid;
          });
          if (datainfos.length > 0) {
            m.c = datainfos[0].c;
            m.h = datainfos[0].h;
            m.l = datainfos[0].l;
            m.o = datainfos[0].o;
            m.v = datainfos[0].v;
            m.t = datainfos[0].t;
          }
          if (this.selectcoinlist != null && this.selectcoinlist.length > 0) {
            var favouriteobj = this.selectcoinlist.filter(item => {
              return item.ctid == m.ctid && item.itype == m.itype;
            });
            if (favouriteobj != null && favouriteobj.length > 0) {
              m.id = favouriteobj[0].id;
              m.itype = favouriteobj[0].itype;
              m.self = favouriteobj[0].self;
            }
          }
          newdatas.push(m);
        });
        this.searchlist = newdatas;
      }
    },
  },
  created() {
    if (this.$route.path.indexOf('contract') >= 1) {
      this.isSelectCoin = 'contract';
    }
    else if (this.$route.path.indexOf('margin') >= -1) {
      this.isSelectCoin = 'margin';
    }
    else {
      this.isSelectCoin = 'spot';
    }
  },
  mounted() {
    var _self = this;
    this.$store.dispatch('quotation_daily_getall', {
      iscontract: 2,
      displaylocation: 0,
      pageIndex: 1,
      pageSize: 10000
    }).then(({ data }) => {
      console.log('11111117777======', data)
      _self.allmarketDatas = data.pagedata; 
      _self.changetab(_self.isSelectCoin);
      _self.getSelectionDatas();
    })
  },
  methods: {
    changetab(ctype) {
      this.isSelectCoin = ctype;
      this.marketDatas = [];
      var _self = this;
      if (this.isSelectCoin == 'contract') {
        this.marketDatas = this.allmarketDatas.filter(item => {
          return item.itype == 1;
        });
      }
      else if (this.isSelectCoin == 'margin') {
        this.allmarketDatas.filter(item => {
          var symbleobj = this.$store.state.symbleinfos.filter(citem => { return citem.id == item.ctid })
          if (symbleobj[0].itype == 0 && symbleobj[0].borrowmultiple > 0) {
            item.itype = -1;
            _self.marketDatas.push(item);
          }
        });
      }
      else if (this.isSelectCoin == 'spot') {
        this.allmarketDatas.filter(item => {
          var symbleobj = this.$store.state.symbleinfos.filter(citem => { return citem.id == item.ctid })
          if (symbleobj[0].itype == 0) {
            item.itype = 0;
            _self.marketDatas.push(item);
          }
        });
      } else {
        this.marketDatas = this.selectcoinlist;
      } 
      this.connectsocket(this.isSelectCoin == 'contract' ? 1 : this.isSelectCoin == 'margin' ? -1 : this.isSelectCoin == 'spot' ? 0 : 100);
    },
    getSymbInfo(ctid) {
      return this.$store.state.symbleinfos.filter(citem => { return citem.id == ctid })[0]
    },
    connectsocket(itype) {
      let _self = this;
      let substr = "market." + this.markettype + ".tickers"
      this.$socket.uninvoke({
        sub: substr,
        type: _self.$socket.type.quotation_daily_getall,
      });
      this.markettype = (itype == 2 ? 0 : itype);
      substr = "market." + this.markettype + ".tickers"
      this.$socket.invoke({
        sub: substr,
        type: _self.$socket.type.quotation_daily_getall,
      });
      this.$socket.receive(_self.$socket.type.quotation_daily_getall, _self.callback);
    },
    callback(data) {
      this.marketDatas = [];
      this.marketDatas = data.data;
    },
    changesearchlist() {
      const _this = this;
      /*排序*/
      const sorttype = _this.sorttypelistactive;
      /*筛选的值*/
      const value = _this.searchvalue.toLowerCase().replace(/ /g, '');
      let searchlist = [];
      /*筛选*/
      if (value) {
        const reg = new RegExp(value.toLowerCase(), 'g');
        if (this.isSelectCoin == 'self') {
          this.selectcoinlist.map((item) => {
            if (item.symble.toLowerCase().replace("yx", "usdt").search(reg) >= 0) {
              searchlist.push(item)
            }
          })
        } else {
          this.marketDatas.map((item) => {
            if (item.symble.toLowerCase().replace("yx", "usdt").search(reg) >= 0) {
              searchlist.push(item)
            }
          })
        }
      } else {
        if (this.isSelectCoin == 'self') {
          searchlist = _this.selectcoinlist;
        } else {
          this.marketDatas.forEach(item => {
            var itype = this.isSelectCoin == 'contract' ? 1 : this.isSelectCoin == 'margin' ? -1 : this.isSelectCoin == 'spot' ? 0 : 100
            var favouriteobj = this.selectcoinlist.filter(citem => {
              return citem.ctid == item.ctid && citem.itype == itype;
            });
            if (favouriteobj != null && favouriteobj.length > 0) {
              item.id = favouriteobj[0].id;
              item.itype = favouriteobj[0].itype;
              item.self = favouriteobj[0].self;
            } else {
              item.self = false;
            }
            searchlist.push(item);
          });
        }
      }
      if (sorttype.type) {
        searchlist.sort((a, b) => {
          let newa, newb;
          if (sorttype.type == 'limitprice') {
            newa = this.global_get_limitprice(a);
            newb = this.global_get_limitprice(b);
            if (a.c - a.o < 0) {
              newa = newa * -1
            }
            if (b.c - b.o < 0) {
              newb = newb * -1
            }
          } else if (sorttype.type == 'volume') {
            newa = this.getvolume(a)
            newb = this.getvolume(b)
          } else if (sorttype.type == 'symble') {
            newa = a.symble;
            newb = b.symble;
            if (sorttype.value == 1) {
              if (newa > newb) {
                return 1;
              }
              if (newa < newb) {
                return -1;
              }
              return 0;
            } else {
              if (newa < newb) {
                return 1;
              }
              if (newa > newb) {
                return -1;
              }
              return 0;
            }

          } else {
            newa = a.c;
            newb = b.c;
          }
          return sorttype.value == 1 ? newb - newa : newa - newb
        })
      } 
      this.searchlist = searchlist;
    },
    getlimitprice(item) {
      const p = this.global_get_limitprice(item)
      if (item.c - item.o < 0) {
        return '-' + p
      } else {
        return '+' + p
      }
    },
    initsorttypeclass(type, value) {
      return (this.sorttypelistactive.type == type && this.sorttypelistactive.value == value) ? 'active' : ''
    },
    setsorttype(type) {// val:2 小到大  1 大到小
      let v = this.sorttypelistactive.value;
      if (this.sorttypelistactive.type == type) {
        v = v == 1 ? 2 : 1;
      } else {
        v = 1;
      }
      this.sorttypelistactive.type = type
      this.sorttypelistactive.value = v
    },
    getSymble(s) {
      s = this.global_get_uppercase(s);
      const symble = s.split('/');
      return {
        from: symble[0],
        to: symble[1]
      }
    },
    collect(val) {
      var marketobj = this.searchlist.filter(item => {
        return item.ctid == val.ctid && item.self == true
      });
      var isadd = true;
      if (!this.$userinfo.uid) {
        this.$router.push('/login?returnurl='+this.$route.path)
        return
      }
      let ids = [];
      let ctids = [];
      ctids.push(val.ctid);
      if (marketobj != null && marketobj.length > 0) {
        isadd = false;
        ids.push(marketobj[0].id);
      }
      let url;
      isadd ? url = 'user_self_selection_add' : url = 'user_self_selection_delete';
      this.$store.dispatch(url, { ctids: ctids, ismargin: (val.itype == -1 ? 1 : 0), ids: ids }).then((res) => {
        const data = res.data;
        if (data) {
          this.$store.commit('set_message', {
            type: 'ok',
            text: isadd ? this.$t('c2c.favorite') : this.$t('c2c.unfavorite')
          });
          this.getSelectionDatas();
        }
      })
    },
    goDeal(coinid, ctype) {
      coinid = coinid.replace('/', '_');
      if (ctype == 'contract') {
        if (this.$store.getters.get_contractType == 1) {
          this.$router.push({ path: '/contract/' + coinid + '?contractType=1'})
        } else {
          this.$router.push({ path: '/contract/' + coinid })
        }
      }
      else if (ctype == 'margin') {
        this.$router.push({ path: '/margin/' + coinid })
      }
      else {
        this.$router.push({ path: '/deal/' + coinid })
      }
    },
    getSelectionDatas() {
      const _self = this;
      if (this.isSelectCoin == 'self' && !this.$userinfo.uid) {
        return
      }
      /*设置loading*/
      this.loading = this.selectcoinlist.length <= 0;
      _self.$store.dispatch('user_self_selection_getlist', { type: 0 }).then(({ data }) => {
        _self.loading = false;
        if (data) {
          _self.selectcoinlist = data;
          _self.changesearchlist();
        }
      })
    }
  }
} 
</script>

<style lang="less" scoped>
@import "../../static/styles/color";

.noDataText {
  line-height: 120px;
  height: 120px;
  text-align: center;
}

.coin-title {
  line-height: 40px;
  color: rgba(51, 51, 51, 1);
  border-bottom: 1px solid rgba(30, 34, 42, 1);
}

.coin-title_item {
  float: left;
  cursor: pointer;
  margin-right: 30px;
  font-weight: 600;
  text-align: center;
  color: rgba(197, 195, 221, 1);

}

.coin-title_item:hover {
  color: @cl_link;
}

.coin-title .coin-title_item:first-child {
  margin-left: 20px;
}

.coin-title_item.active {
  color: @cl_link;
}

.coin-title_item.hex-li {
  display: none;
}

.coin-list-trades {
  font-size: 14px;
  color: white;
}

.coin-list-trades .coin-list_content .select {
  width: 4%;
  height: 37px;
}

.coin-list-trades .market {
  width: 20%;
}

.coin-list-trades .price {
  width: 36%;
}

.coin-list-trades .limit {
  width: 20%;
}

.coin-list-trades .num {
  width: 20%;
}

.coin-list-trades .market img {
  width: 20px;
  height: 20px;
  vertical-align: middle;
  margin-right: 10px;
  border-radius: 100%;
}

.coin-list_header {
  font-size: 12px;
  color: #646B8C;
  display: table;
  width: 100%;
  padding: 0 20px;
  background: rgba(250, 250, 253, 1);
  line-height: 40px;
}

.coin-list_header .select {
  width: 4%;
}

.coin-list-trades .coin-list_content .body {
  line-height: 40px;
  padding: 0 20px;
}

.coin-list-trades .coin-list_content .body:hover {
  background: rgba(245, 247, 251, 1);
}

.coin-list-trades .coin-list_content .body>*,
.coin-list_header>* {
  float: left;
}

.coin-list-trades .collect {
  background: url('../../static/images/collect.svg') no-repeat left center;
  background-size: 14px, 14px;
  cursor: pointer;
}

.coin-list-trades .collect.active {
  background-image: url('../../static/images/collect-active.svg');
}

.coin-list_content .price_rate {
  font-size: 12px;
  color: @cl_c5c;
  margin-left: 6px;
}

.coin-list-trades .coin-list_content .updown.i_down {
  color: rgba(233, 108, 66, 1);
}

.coin-list-trades .coin-list_content .updown.i_down:after {
  background: url('../../static/images/i_down.svg') no-repeat;
  content: '';
  display: inline-block;
  width: 9px;
  height: 11px;
  background-size: cover;
  margin-left: 5px;
}

.coin-list-trades .coin-list_content .updown.i_up {
  color: rgba(3, 191, 123, 1);
}

.coin-list-trades .coin-list_content .updown.i_up:after {
  color: rgba(3, 191, 123, 1);
  background: url('../../static/images/i_up.svg') no-repeat;
  content: '';
  display: inline-block;
  width: 9px;
  height: 11px;
  background-size: cover;
  margin-left: 5px;
}

.market_from {
  font-weight: 600;
}

.coin-title_search {
  float: right;
}

.coin-title_search .search {
  display: inline-block;
  width: 160px;
  height: 30px;
  line-height: 30px;
  font-size: 14px;
  border-radius: 3px;
  margin-right: 13px;
  background: rgba(30, 34, 42, 1);
  position: relative;
  padding-right: 25px;
  padding-left: 10px;
  color: white !important;
  border: 1px solid rgba(68, 75, 89, 1);
  border-radius: 3px;
  margin-top: 6px;
}

.coin-title_search input {
  display: inline-block;
  width: 145px;
  line-height: 22px;
  color: white !important;
  background: rgba(30, 34, 42, 1);
}

.coin-title_search input:focus {
  color: rgba(51, 51, 51, 1);
}

.coin-title_search .search_coin {
  background-image: url("../../static/images/search.svg");
  display: inline-block;
  width: 16px;
  height: 16px;
  background-size: cover;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 5px;
}

.coin-title_search input:focus+i.search_coin {
  background-image: url("../../static/images/foucs_search.svg");
}

.noDataText .repeal {
  color: @cl_link;
}

.trande-rise {
  line-height: 40px;
  overflow: hidden;

  .trande-s {
    li {
      font-size: 14px;
      float: left;
      color: rgba(154, 163, 181, 1);
      height: 40px;
      line-height: 40px;

      .red,
      .green {
        display: inline-block;
        width: 5px;
        height: 6px;
      }
    }

    li.trande-data:hover {
      background-color: #333946;
    }

    .deal-twain {
      width: 29%;
    }

    li.trande-data.deal-twain {
      padding: 0 20px;
    }

    .tac.deal-twain {
      text-align: left;
      padding-left: 29px;
    }

    .real-time-price {
      width: 33%;

      .real-price {
        color: @cl_fff;
      }

      .data-price {
        display: inline-block;
        text-align: left;
        padding-left: 7px;
      }
    }

    .Volume {
      width: 20%;

      .fl {
        float: right;
      }
    }

    .price-limit {
      width: 18%;

      .fl {
        float: right;
      }
    }

    .operation {
      width: 77px;
      text-align: right;
    }

    .rightAlign {
      padding-right: 6px;
    }

    .trande-data {
      width: 100%;
      cursor: pointer;

      div {
        float: left;
        color: @cl_fff;
        text-align: right;

        img {
          width: 15px;
          height: 15px;
          vertical-align: middle;
          margin-left: 10px;
        }

        span {
          color: rgb(153, 153, 153);
        }

        .colour {
          margin-left: 10px;
          color: rgb(51, 51, 51);
          font-weight: 600;

        }

        .symble {
          font-size: 14px;
          font-weight: bold;
          color: @cl_fff;
        }

        .symbleTo {
          font-size: 14px;
          color: @cl_fff;
        }
      }

      .real-time-price {
        text-align: left;
      }

      .c-green {
        span {
          display: inline-block;
        }

        .i_down:after {
          background: url('../../static/images/i_down.svg') no-repeat;
          content: '';
          display: inline-block;
          width: 9px;
          height: 11px;
          background-size: cover;
          color: #46B05D;
          margin-left: 5px;

        }

        .i_up {
          color: rgba(3, 191, 123, 1);
        }

        .i_down {
          color: rgba(233, 108, 66, 1);
        }

        .i_up:after {
          color: rgba(3, 191, 123, 1);
          background: url('../../static/images/i_up.svg') no-repeat;
          content: '';
          display: inline-block;
          width: 9px;
          height: 11px;
          background-size: cover;
          color: #46B05D;
          margin-left: 5px;
        }

        img {
          width: 8px;
          height: 10px;
          position: relative;
          top: 0;
          left: 3px;
        }
      }

      .nams {
        box-sizing: border-box;

        img {
          border-radius: 50%;
        }
      }

      button {
        height: 40px;
        background: url("../../static/images/deals.svg") no-repeat center right;
        text-align: center;
        line-height: 20px;
        border: none;
        outline: none;
        color: white;
      }

      .cancel_collect {
        cursor: pointer;
        width: 14px;
        text-align: center;
        display: inline-block;
        background: url('../../static/images/collect.svg') no-repeat center center;
      }

      .collect {
        cursor: pointer;
        width: 14px;
        text-align: center;
        display: inline-block;
        background: url('../../static/images/collect-active.svg') no-repeat center center;
      }

    }
  }

  .trandeTitle {
    padding: 0 20px;
  }

  .more {
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    border-top: 1px solid rgba(133, 131, 172, 0.2);
  }
}

.sorts {
  color: @cl_999;
  line-height: 7px;
  padding-left: 6px;
  display: inline-block;
  height: 30px;
  i {
    display: block;
    width: 10px;
    height: 8px;
  }

  i.sortup {
    display: none;
    background: url('../../static/images/s_up.png') no-repeat center center;
  }

  i.sortdown {
    display: none;
    background: url('../../static/images/s_down.png') no-repeat center center;
  }

  i.sortup.active {
    display: block;
    padding-top: 40px;
    background: url('../../static/images/s_up_check.svg') no-repeat center center;
  }

  i.sortdown.active {
    display: block;
    padding-top: 40px;
    background: url('../../static/images/s_down_check.svg') no-repeat center center;
  }
}

.trande-rise .trande-s .trande-data div.deal-twain {
  text-align: left;
}

.cut {
  float: left;
  display: inline-block;
  width: 58px;
  height: 24px;
  line-height: 24px;
  color: #9EAECB;
  border-radius: 2px;
  cursor: pointer;
  background: rgba(65, 72, 87, 1);
  margin: 9px 10px 0 0;
}

.cut:hover {
  color: #14a2a5;
}

.cut:hover:before {
  background-image: url("../../static/images/cut-active.svg");
}

.cut:before {
  content: '';
  display: inline-block;
  width: 8px;
  height: 8px;
  background-image: url("../../static/images/cut.svg");
  background-repeat: no-repeat;
  background-size: 8px;
  background-position: center;
  margin: 0 6px;
}
</style>
<style lang="less">
@import "../../static/styles/color";

.coin-list .coin-list_content .select {
  width: 4%;
  height: 37px;
}

.coin-list .coin-list_content .updown.i_down {
  color: @cl_sell;
  padding-right: 15px;
  background: url('../../static/images/decline.svg') no-repeat right center;
}

.coin-list .coin-list_content .updown.i_up {
  color: @cl_buy;
  padding-right: 15px;
  background: url('../../static/images/rise.svg') no-repeat right center;
}

.coin-list .coin-list_content .body {
  line-height: 36px;
  padding: 0 20px;
  cursor: pointer;
}

.coin-list .coin-list_content .body:hover {
  background-color: #333946;
}

.coin-list .coin-list_content .body>*,
.coin-list_header>* {
  float: left;
}
</style>