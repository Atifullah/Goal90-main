<template>
  <div class="dealcoin-list" style="width: 320px">
    <div class="search-area mb-2" style="">
      <div style="height: 52px; padding: 10px 11px 10px 9px">
        <div class="coin-search">
          <div class="search">
            <input type="text" :placeholder="$t('placeholders.plh5')" v-model="searchvalue" />
            <i class="search_coin"></i>
          </div>
        </div>
      </div>
    </div>
    <ul class="coin-title clearfix">
      <li class="coin-title_item ml-2" @click.stop="selectCoin('self')"
        :class="{ active: isSelectCoin == 'self' && searchvalue == '' }">
        {{ $t("patch.Favourite") }}
      </li>
      <li class="coin-title_item" @click.stop="selectCoin('spot')"
        :class="{ active: isSelectCoin == 'spot' && searchvalue == '' }">
        {{ $t("person.Spot_person") }}
      </li>
      <li class="coin-title_item" @click.stop="selectCoin('margin')"
        :class="{ active: isSelectCoin == 'margin' && searchvalue == '' }">
        {{ $t("leverage.lever") }}
      </li>
      <li class="coin-title_item mr-0" @click.stop="selectCoin('future')"
        :class="{ active: isSelectCoin == 'future' && searchvalue == '' }">
        {{ $t("contract.contractDeal") }}
      </li>
    </ul>

    <div class="coin-content">
      <div class="coin-list_header">

        <span class="market ovh cursor">
          <span class="fl" @click="setsorttype('symble')">{{
            $t("home.tradeOn")
          }}</span>
          <span class="fl sorts" v-if="sorttypelistactive.type == 'symble'">
            <i class="sortup" v-if="sorttypelistactive.value == 2" :class="initsorttypeclass('symble', 2)"
              @click="setsorttype('symble')"></i>
            <i class="sortdown" v-if="sorttypelistactive.value == 1" :class="initsorttypeclass('symble', 1)"
              @click="setsorttype('symble')"></i>
          </span>
        </span>
        <span class="select"></span>

        <span class="price ovh cursor">
          <span class="fl" @click="setsorttype('price')">{{
            $t("memberCenter.price")
          }}</span>
          <span class="fl sorts" v-if="sorttypelistactive.type == 'price'">
            <i class="sortup" v-if="sorttypelistactive.value == 2" :class="initsorttypeclass('price', 2)"
              @click="setsorttype('price')"></i>
            <i class="sortdown" v-if="sorttypelistactive.value == 1" :class="initsorttypeclass('price', 1)"
              @click="setsorttype('price')"></i>
          </span>
        </span>
        <span class="limit rt cursor" v-show="sortitemstate == 1">
          <span class="fr sorts" v-if="sorttypelistactive.type == 'limitprice'">
            <i class="sortup" v-if="sorttypelistactive.value == 2" :class="initsorttypeclass('limitprice', 2)"
              @click="setsorttype('limitprice')"></i>
            <i class="sortdown" v-if="sorttypelistactive.value == 1" :class="initsorttypeclass('limitprice', 1)"
              @click="setsorttype('limitprice')"></i>
          </span>
          <span class="fr" @click="setsorttype('limitprice')">{{
            $t("home.tradelimit")
          }}</span>
        </span>
        <span class="limit rt cursor" v-show="sortitemstate == 2">
          <span class="fr sorts" v-if="sorttypelistactive.type == 'volume'">
            <i class="sortup" v-if="sorttypelistactive.value == 2" :class="initsorttypeclass('volume', 2)"
              @click="setsorttype('volume')"></i>
            <i class="sortdown" v-if="sorttypelistactive.value == 1" :class="initsorttypeclass('volume', 1)"
              @click="setsorttype('volume')"></i>
          </span>

          <span class="fr" @click="setsorttype('volume')">{{
            $t("home.turnover")
          }}</span>
        </span>
      </div>
      <div v-bar v-hex-loading="coinlistloading" ref="coin-list" class="coin-list_content hex-loading mt-2">
        <div>
          <div class="body clearfix mb-2" v-for="(item, index) in sortedMarketDatas" @click="goDeal(item)" :key="index">
            <span class="select collect" :class="{ active: isFavorite(item) }" @click.stop="collect(item)"></span>
            <div class="market">
              <p class="colour mb-0 label-text">
                <span class="market_from">{{ item.symble.split("/")[0].toUpperCase() }}</span>

                <span class="margin-label" v-if="item.itype === -1">
                  {{ getSymbInfo(item.ctid).borrowmultiple }}X
                </span>

                <span class="gray-label-text fw-500" v-if="item.itype === 0">/
                  {{ item.symble.split("/")[1].toUpperCase() }}
                </span>

                <span v-if="item.itype === 1" class="gray-label-text fw-500">
                  {{ $t("contract.swap") }}
                </span>
              </p>
              <p class="mb-0 colour gray-label-text">
                {{ coinFullName(item.symble.split("/")[0].toUpperCase()) }}
              </p>
            </div>
            <div class="price">
              <p class="mb-0 label-text">{{ getcnyprice(item) }}</p>
              <p class="mb-0 colour">
                {{ $store.getters.get_client_exchange_rate_name.mark
                }}{{ getClientExchangeRate(item) }}
              </p>
            </div>
            <div class="limit rt" v-show="sortitemstate == 1">
              <p class="updown mb-0 label-text fw-5" :class="item.c - item.o < 0 ? 'i_down' : 'i_up'">
                {{ getlimitprice(item) }}%
              </p>
              <p class="mb-0 colour fw-5">
                {{
                  numFormatter(
                    global_get_tofixed(
                      item.v,
                      global_get_decimal(item.symble).p
                    )
                  )
                }}
              </p>
            </div>
            <div class="limit rt" v-show="sortitemstate == 2">
              <p class="mb-0 label-text">
                {{
                  toformatvolume(
                    global_get_tofixed_entrust(
                      getvolume(item),
                      global_get_decimal(item.symble).a
                    )
                  )
                }}
              </p>
              <p class="mb-0 colour">
                {{
                  numFormatter(
                    global_get_tofixed(
                      item.v * item.c,
                      global_get_decimal(item.symble).p
                    )
                  )
                }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapMutations } from 'vuex'
export default {
  name: "CoinList",

  props: {
    symbleinfo: {
      type: Object,
      default: function () {
        return {};
      },
    },
    symbletype: "",
    contractType: {
      type: String,
      default: ''
    }
  },

  data() {
    return {
      selectcut: false,
      searchvalue: "",
      isSelectCoin: "spot",
      selectcoinlist: [],
      coinlistloading: false,
      sortitemstate: 1,
      sorttypelistactive: {
        type: "limitprice",
        value: "1",
      },
      marketDatas: [],
      marketdata_futrue: [],
      marketdata_spot: [],
      marketdata_margin: [],
      markettype: 10,
      dcs: {},
      dailyDetail: {},
      allMarkets: []
    };
  },

  watch: {
    symbleinfo: function (val) {
      if (val && val.descriptions) {
        this.dcs = this.global_get_decimal(val.descriptions.toUpperCase());
      }
    },
    dailyDetail: function (val) {
      if (val) {
        val.self = this.isFavorite(val);
        /*发布最新价格*/
        this.$pubsub.publish(this.$pubsub.quotationDaily, val);
      }
    },
  },
  computed: {
    filteredMarketDatas() {
      const _self = this;
      if (this.searchvalue != "") {
        const filtered = _self.allMarkets.filter(function (item) {
          const str = (
            _self.getSymble(item.symble).from +
            "/" +
            _self.getSymble(item.symble).to
          ).toLowerCase()
          return str.indexOf(_self.searchvalue.toLowerCase()) !== -1
        })
        return filtered;
      }
      return _self.marketDatas;
    },
    // function for sorting the max and min value using getlimitprice
    sortedMarketDatas() {
      return this.filteredMarketDatas
    },
    loggedIn: function () {
      return this.$userinfo.uid != null;
    },
  },

  methods: {
    ...mapMutations('market', ['setCurrentMarketType', 'setContractAllMarketList']),
    getSymbInfo(ctid) {
      var symbleinfo = this.$store.state.symbleinfos.filter((citem) => {
        return citem.id == ctid;
      })[0];
      return symbleinfo ? symbleinfo : {};
    },
    getSymble(s) {
      s = this.global_get_uppercase(s);
      s = s.split("/");
      return {
        from: s[0],
        to: s[1],
      };
    },
    coinFullName(name) {
      return this.$store.state.currencyinfos.filter(
        (item) => item.currencyname == name
      )[0]?.fullname;
    },
    numFormatter(num) {
      if (num > 999 && num < 1000000) {
        return (num / 1000).toFixed(2) + "K"; // convert to K for number from > 1000 < 1 million
      } else if (num > 1000000 && num < 10000000) {
        return (num / 1000000).toFixed(2) + "M"; // convert to M for number from > 1 million
      } else if (num > 10000000) {
        return (num / 10000000).toFixed(2) + "B"; // convert to B for number from > 1 billion
      } else if (num < 900) {
        return num; // if value < 1000, nothing to do
      }
    },
    getClientExchangeRate(tradeData) {
      if (tradeData.symble) {
        let symble = tradeData.symble.split("/");
        if (symble.length > 1) {
          symble = symble[1];
        }
        return this.$store.getters.get_client_exchange_rate(
          symble,
          tradeData.c
        );
      }
    },
    getlimitprice(item) {
      const p = this.global_get_limitprice(item);
      if (item.c - item.o < 0) {
        return "-" + p;
      } else {
        return "+" + p;
      }
    },
    isFavorite(item) {
      if (this.isSelectCoin == "self") {
        return true;
      }
      let isActive = false;
       
      item.self = false;
      this.selectcoinlist.forEach((_s) => {
        if (item.ctid == _s.ctid) {
          if (this.isSelectCoin == "margin" && _s.itype == -1) {
            item.id = _s.id;
            item.self = true;
            isActive = _s.self;
          } else if (this.isSelectCoin == "spot" && _s.itype == 0) {
            item.id = _s.id;
            item.self = true;
            isActive = _s.self;
          } else if (this.isSelectCoin == "future" && _s.itype == 1) {
            item.id = _s.id;
            item.self = true;
            isActive = _s.self;
          } else if (this.isSelectCoin == "self") {
            item.id = _s.id;
            item.self = true;
            isActive = _s.self;
          }
        }
      });
      return isActive;
    },
    toformatvolume(num) {
      if (num) {
        const _n = num.toString().split(".")[0];
        if (_n.length >= 8) {
          return _n;
        } else {
          return parseFloat(num).toFixed(2);
        }
      } else {
        return 0;
      }
    },
    getcnyprice(item) {
      if (this.selectcut) {
        return this.$store.getters.get_client_exchange_rate(
          item.symble.split("/")[1],
          item.c,
          this.$store.state.hex_client_exchange.active.toUpperCase()
        );
      } else {
        return this.global_get_tofixed_entrust(
          item.c,
          this.global_get_decimal(item.symble).p
        );
      }
    },
    initsorttypeclass(type, value) {
      return this.sorttypelistactive.type == type &&
        this.sorttypelistactive.value == value
        ? "active"
        : "";
    },
    setsorttype(type) {
      // val:2 小到大  1 大到小
      let v = this.sorttypelistactive.value;
      v = v === 1 ? 2 : 1;
      this.sorttypelistactive.type = type;
      this.sorttypelistactive.value = v;
    },
    selectCoin(i) {
      this.isSelectCoin = i;
      if (i == "self" && this.loggedIn) {
        this.getSelectionDatas();
      } else {
        this.changeTab(i == "spot" ? 0 : i == "margin" ? -1 : 1);
      }

      if (i == 'spot' || i == 'margin' || i == 'future') {
        this.setCurrentMarketType(i)
      }

    },
    collect(val) {
      const _self = this;
      if (!this.$userinfo.uid) {
        this.$router.push("/login?returnurl=" + this.$route.path);
        return;
      }
      var url = "";
      var params = {};
      if (val.self && val.id > 0) {
        url = "user_self_selection_delete";
        params = {
          ids: [val.id],
          ismargin: val.itype == -1 ? 1 : 0,
        };
      } else {
        url = "user_self_selection_add";
        params = {
          ctids: [val.ctid],
          ismargin: val.itype == -1 ? 1 : 0,
        };
      }
      this.$store.dispatch(url, params).then((res) => {
        if (res.data) {
          this.$pubsub.publish(this.$pubsub.addedToFavorite, {
            ctid: val.ctid,
            self: !val.self,
          });
          _self.$store.commit("set_message", {
            type: "ok",
            text: !val.self
              ? _self.$t("c2c.favorite")
              : _self.$t("c2c.unfavorite"),
          });
          _self.getSelectionDatas();
        }
      });
    },
    goDeal(tradedata) {
      const symbleName = tradedata.symble.replace("/", "_");

      const route = this.$route;
      const routeName = route.name;
      const itype = tradedata.itype;
      console.log('itype111', itype)

      const ctId = tradedata.ctid
      const selectedTab = this.isSelectCoin

      let redirectToo = "";
      if (routeName.includes("pro")) {
        if (itype == 1) {
          redirectToo = `/contract-pro/`;
          let query = route.query
          query.ctid = ctId
          this.$router.push({path: '/contract-pro/' + symbleName, query: query})
          return
        } else if (itype == -1) {
          redirectToo = `/margin-pro/`;
        } else {
          redirectToo = `/deal-pro/`;
        }

        redirectToo = redirectToo + `${symbleName}?ctid=${ctId}`

      } else {
        if (itype == 1) {
          redirectToo = `/contract/${symbleName}`
          if (route.query.contractType == 1) {
            redirectToo += `?contractType=1`
          }
        } else if (itype == -1) {
          redirectToo = `/margin/${symbleName}`;
        } else {
          redirectToo = `/deal/${symbleName}`;
        }
      }

      this.$router.push(redirectToo);
    },
    /*获取成交额*/
    getvolume: function (item) {
      return this.$np.strip(item.v * item.c);
    },
    getSelectionDatas() {
      const _self = this;
      if (this.$userinfo.uid) {
        /*设置loading*/
        this.coinlistloading = true;
        _self.$store
          .dispatch("user_self_selection_getlist")
          .then(({ data }) => {
            _self.coinlistloading = false
            if (data) {
              _self.selectcoinlist = data;
              if (_self.isSelectCoin != "self") {
                _self.selectCoin(_self.isSelectCoin);
              } else {
                _self.marketDatas = data;
              }
            }
          });
      } else {
        this.selectCoin(this.isSelectCoin);
      }
    },
    changeTab(itype) {
      const _self = this
      if (this.marketdata_spot.length == 0) {
        this.$store
          .dispatch("quotation_daily_getall", {
            iscontract: 2, //get all data
            displaylocation: 0,
            pageIndex: 1,
            pageSize: 100000
          })
          .then(({ data }) => {
            _self.allMarkets = []
            data.pagedata.forEach((item) => {

              if (_self.symbleinfo.descriptions != undefined) {
                var symblemodel = _self.$store.state.symbleinfos.filter((citem) => {
                  // if (item.symble.toUpperCase() == _self.symbleinfo.descriptions.toUpperCase().replace('YX','USDT')) {
                  if (item.symble.toUpperCase() == _self.symbleinfo.descriptions.toUpperCase()) {
                    _self.dailyDetail = item
                  }
                  return citem.id == item.ctid
                }
                )
                if (symblemodel.length > 0) {

                  if (symblemodel[0].itype == 0) {

                    _self.marketdata_spot.push({ ...item, itype: 0 })
                    _self.allMarkets.push({ ...item, itype: 0 })
                    if (symblemodel[0].borrowmultiple > 0) {
                      _self.marketdata_margin.push({ ...item, itype: -1 })
                      _self.allMarkets.push({ ...item, itype: -1 })
                    }

                  } else {
                    _self.marketdata_futrue.push({ ...item, itype: 1 })
                    _self.allMarkets.push({ ...item, itype: 1 })
                  }


                }
              }
            });
            if (this.markettype == 1) { // 合约
              this.setContractAllMarketList(_self.marketdata_futrue)
            }
          });
      }


      this.marketDatas =
        itype == 0
          ? this.marketdata_spot
          : itype == 1
            ? this.marketdata_futrue
            : this.marketdata_margin;
      this.connectsocket(itype);
    },
    connectsocket(itype) {
      let _self = this;
      let substr = "market." + this.markettype + ".tickers";
      if (this.$route.query.contractType == 1)  { // 合约页面不合约socket
        console.log('itype==', itype)
        if (this.markettype != itype && itype == 1) {
          this.$socket.uninvoke({
            sub: substr,
            type: _self.$socket.type.quotation_daily_getall,
          });
        }
      } else {
        if (this.markettype != itype) {
          this.$socket.uninvoke({
            sub: substr,
            type: _self.$socket.type.quotation_daily_getall,
          });
        }
      }
      this.markettype = itype;
      substr = "market." + this.markettype + ".tickers";
      this.$socket.invoke({
        sub: substr,
        type: _self.$socket.type.quotation_daily_getall,
      });
      this.$socket.receive(
        _self.$socket.type.quotation_daily_getall,
        _self.callback
      );
    },
    callback(data) {
      // console.log('DATAAA::', data.data);
      var _self = this;
      if (this.symbleinfo.descriptions != undefined) {
        var item1 = data.data.filter((item) => {
          // return item.symble.toUpperCase() == _self.symbleinfo.descriptions.toUpperCase().replace('YX','USDT')
          return  item.ctid.toUpperCase() ==  _self.symbleinfo.id.toUpperCase()
        })
        if (item1.length > 0) {
          _self.dailyDetail = item1[0]
        }
        if (this.selectcoinlist.length > 0) {
          this.selectcoinlist.forEach((item) => {
            var citem = data.data.filter((t) => {
              return t.ctid == item.ctid;
            });
            if (citem.length > 0) {
              item.c = citem[0].c
              item.l = citem[0].l
              item.h = citem[0].h
              item.v = citem[0].v
            }
          });
        }


        const currencies = data.data

        const filteredSocketData = currencies.filter((currency) => currency.symble != "qtc/usdt")

        this.setContractAllMarketList(filteredSocketData)

        filteredSocketData.forEach(currency => {
          const index = this.marketDatas.findIndex((c) => c.ctid == currency.ctid)
          if (index > -1) {
            this.marketDatas[index].c = currency.c
            this.marketDatas[index].l = currency.l
            this.marketDatas[index].h = currency.h
            this.marketDatas[index].v = currency.v
          }
        })
        // if (this.isSelectCoin != 'self') {
        //   this.marketDatas = data.data
        // }
      }
    },
  },
  /*订阅消息*/
  subscribe() {
    return {
      /*订阅最新价*/
      changeCollect(res) {
        this.dailyDetail.self = !res.self;
        this.collect(res);
      },
    };
  },
  mounted() {
    this.isSelectCoin =
      this.symbletype == -1
        ? "margin"
        : this.symbletype == 1
          ? "future"
          : "spot";
    this.getSelectionDatas();
  },
  beforeDestroy() {
    let substr = "market." + this.markettype + ".tickers";
    this.$socket.uninvoke({
      sub: substr,
      type: this.$socket.type.quotation_daily_getall,
    });
  },
};
</script>
<style lang="less" scoped>
@import "../../static/styles/color";

.dealcoin-list {
  background-color: @cl_content;
  margin-bottom: 6px;
  display: flex;
  flex-direction: column;

  .coin-title {
    color: @cl_ADB1B8;
    // border-bottom: 1px solid @cl_292E39;
    font-size: 12px;
    padding: 0px;
    margin: 0px;

    .coin-title_item {
      line-height: 30px;
      height: 30px;
      float: left;
      text-align: center;
      margin: 0 24px;
      cursor: pointer;
      font-weight: 500;
      list-style: none;
    }

    .coin-title_item.active {
      color: @cl_fff !important;
      border-top: 2px solid @cl_FFA500;
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

  .search-area {
    width: 100%;
    background: #0C1014;
    margin-right: 6px;
  }

  .coin-search {
    // margin: 6px 8px 0 8px;
    color: @cl_8790A1;
    font-size: 12px;
    height: 100%;
    display: flex;
    justify-content: center;

    .search {
      display: inline-block;
      width: 100%;
      height: 100%;
      line-height: 24px;
      font-size: 14px;
      border-radius: 2px;
      background: @cl_192026;
      border: none;
      position: relative;
      padding-right: 25px;
      padding-left: 10px;


      input {
        line-height: 1;
        color: #ffffff;
        width: 100%;
        background-color: transparent;
        height: 100%;
        outline: none;
        padding-left: 18px;
      }



      input::placeholder {
        color: @cl_6D777E;
        font-weight: 500 !important;
        opacity: 1;
        /* Firefox */
      }

      .search_coin {
        background-image: url("../../static/images/search.svg");
        display: inline-block;
        width: 12px;
        height: 12px;
        background-size: cover;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: 8px;
      }
    }

    .sort {
      display: inline-block;
      height: 24px;
      line-height: 24px;
      border: 1px solid @cl_292E39;
      border-radius: 2px;
      // width: 108px;
      text-align: center;
      overflow: hidden;
      float: right;

      .sort_item {
        float: left;
        // width: 50%;
        cursor: pointer;
      }

      .sort_item.active {
        background-color: @cl_292E39;
        color: @cl_link;
      }
    }

    .cut {
      float: left;
      display: inline-block;
      width: 52px;
      height: 24px;
      line-height: 24px;
      background-color: #292e39;
      color: #9eaecb;
      border-radius: 2px;
      cursor: pointer;
    }

    .cut.active,
    .cut:hover {
      color: #14a2a5;
    }

    .cut.active:before,
    .cut:hover:before {
      background-image: url("../../static/images/cut-active.svg");
    }

    .cut:before {
      content: "";
      display: inline-block;
      width: 8px;
      height: 8px;
      background-image: url("../../static/images/cut.svg");
      background-repeat: no-repeat;
      background-size: 8px;
      background-position: center;
      margin: 0 2px 0 6px;
    }
  }

  .coin-content {
    position: relative;
    font-size: 12px;
    color: @cl_CED3DD;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;

    .market {
      width: 110px;
    }

    .price {
      width: 110px;

      .sort {
        line-height: 7px;
        padding-top: 7px;
        padding-left: 3px;
        display: inline-block;
        height: 30px;

        i {
          display: block;
          width: 10px;
          height: 8px;
        }

        i.sortup {
          background: url("../../static/images/s_up.png") no-repeat center center;
        }

        i.sortdown {
          background: url("../../static/images/s_down.png") no-repeat center center;
        }
      }
    }

    .limit {
      width: 57px;
    }

    .market img {
      width: 20px;
      height: 20px;
      vertical-align: middle;
      margin-right: 10px;
      border-radius: 100%;
    }

    .gray-label-text {
      color: @cl_717572 !important;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }

    .colour {
      color: @cl_ADB1B8;
      line-height: 18px;

      .market_from {
        color: @cl_EAECEF;
        font-weight: 600;
        max-width: 50px;
        overflow: hidden;
        display: inline-block;
        text-overflow: ellipsis;
        vertical-align: middle;
      }
    }

    .coin-list_content .body>*,
    .coin-list_header>* {
      float: left;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .coin-list_header {
      font-size: 12px;
      color: @cl_ADB1B8 !important;
      display: table;
      width: 100%;
      line-height: 30px;
      padding: 0 8px 0 8px;

      .select {
        width: 14px;
        margin-right: 8px;
        height: 30px;
      }
    }

    .coin-list_content {
      overflow-x: hidden;
      // height: 300px;
      flex-grow: 1;
      padding-bottom: 5px;
      max-height: 266px !important;

      .price_rate {
        font-size: 12px;
        color: @cl_ADB1B8;
        margin-left: 6px;
      }

      .select {
        width: 14px;
        margin-right: 8px;
        height: 100%;
        background-position: center 8px;
      }

      .updown.i_down {
        color: @cl_sell;
      }

      .updown.i_up {
        color: @cl_buy;
      }

      .body {
        height: 36px;
        line-height: 30px;
        padding: 0 8px 0 8px;
        cursor: pointer;
      }

      .body:hover {
        background-color: #222930;
      }
    }

    .el-scrollbar__thumb {
      background-color: rgba(41, 50, 76, 1);
    }

    .el-scrollbar__thumb:hover {
      background-color: rgba(41, 50, 76, 1);
    }

    .collect {
      background-image: url("../../static/images/star1.svg");
      background-repeat: no-repeat;
      background-size: 14px, 14px;
      background-position: left center;
      cursor: pointer;
    }

    .collect.active {
      background-image: url("../../static/images/active-star.svg");
    }
  }

  .nodata {
    text-align: center;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 100%;
    font-size: 14px;
    color: @cl_8790A1;

    .repeal {
      color: @cl_link;
    }
  }
}

.sorts {
  color: @cl_858789;
  padding-left: 3px;
  display: inline-block;
  height: 30px;

  i {
    display: inline-block;
    width: 9px;
    height: 6px;
    position: relative;
    top: -1px;
  }

  i.sortup {
    background: url("../../static/images/s_up.png") no-repeat center center;
  }

  i.sortdown {
    background: url("../../static/images/s_down.png") no-repeat center center;
  }

  i.sortup.active {
    background: url("../../static/images/s_up_check.svg") no-repeat center center;
  }

  i.sortdown.active {
    background: url("../../static/images/s_down_check.svg") no-repeat center center;
  }
}

.margin-label {
  padding: 0 1px;
  background: #412F11;
  border-radius: 3px;
  color: #FFA500;
  font-size: 10px;
}

.label-text {
  line-height: 18px;
  font-weight: 500;
  color: @cl_fff;
}


@media only screen and (min-width: 1800px) {
  .dealcoin-list {
    margin-bottom: 0px;

    .coin-content {
      .coin-list_content {
        // height: 640px;
        flex-grow: 1;
      }
    }
  }
}

// .dealcoin-list .coin-content .coin-list_content
</style>
