<template>
  <div>
    <div class="market-price pb-4 pt-4">
        <pricingCard :marketdata_recommend="marketdata_spot.slice(0, 3)"
            :marketdata_recommend_future="marketdata_futrue.slice(0, 2)" :getSymble="getSymble"
            :getClientExchangeRate="getClientExchangeRate" />
        <a-row class="col-alignment px-2 my-3" :gutter="16">
            <a-col :lg="12">
                <p class="tradable-txt fw-5 mb-0">{{ $t('home_market.mark1') }}</p>
            </a-col>
            <a-col :lg="12" align="end">
                <p class="market-data-txt fw-5 mb-0"><img src="/images/market-data.svg" class="mr-2" />
                    {{ $t('home_market.mark2') }}</p>
            </a-col>
        </a-row>
        <div class="market-table">
            <a-row :gutter="16" class="mt-2 p-0 m-0">
                <a-col :lg="16" :xl="18">
                    <div class="left-tabs">
                        <a-card class="table-card market-left-side" :bordered="false">
                            <a-tabs default-active-key="1" v-model="activeTab" @change="changeTab">
                                <a-tab-pane key="0">
                                    <p slot="tab" class="mb-0 col-alignment">
                                        <img :src="activeTab == '0' ? '/images/star-active.svg' : '/images/star1.svg'"
                                            class="mr-2" height="12px" />
                                        {{ $t('extra.extra21') }}
                                    </p>
                                    <a-card class="table-card" :bordered="false">
                                        <LeftTabs :getSymble="getSymble" :getClientExchangeRate="getClientExchangeRate"
                                            :marketdata="getDataArray" tab="2" key="2" :symbleinfos="symbleinfos"
                                            :_getDaily="_getDaily" :coinInfos="coinInfos" :getCoinInfo="getCoinInfo"/>
                                    </a-card>
                                </a-tab-pane>
                                <a-tab-pane key="1" :tab="$t('tabkeys.tab19')">
                                    <a-card class="table-card" :bordered="false">
                                        <LeftTabs  ref="leftTabs" :getSymble="getSymble" :getClientExchangeRate="getClientExchangeRate" :pageSize="pageSize" :pageTotal="pageTotal"
                                            :marketdata="getDataArray" tab="0"  key="0" :coinInfos="coinInfos" @change-size="changePage" :pageIndex="pageIndex"
                                            :getCoinInfo="getCoinInfo" />
                                    </a-card>
                                </a-tab-pane>
                                <a-tab-pane key="2" :tab="$t('tabkeys.tab20')">
                                    <a-card class="table-card" :bordered="false">
                                        <LeftTabs ref="leftTabs1" :getSymble="getSymble" :getClientExchangeRate="getClientExchangeRate" :pageSize="pageSize" :pageTotal="pageTotal1"
                                            :marketdata="getDataArray" tab="-1"  key="-1" :coinInfos="coinInfos" :pageIndex="pageIndex1"
                                            :getCoinInfo="getCoinInfo" :symbleinfos="symbleinfos" @change-size="changePage"
                                            :marginFavorite="marginFavorite" :getFavorites="getFavorites" />
                                    </a-card>
                                </a-tab-pane>
                                <a-tab-pane key="3" :tab="$t('tabkeys.tab21')">
                                    <a-card class="table-card" :bordered="false">
                                        <LeftTabs ref="leftTabs2" tab="1" key="1"  :getSymble="getSymble" :pageSize="pageSize" :pageTotal="pageTotal2" :pageIndex="pageIndex2"
                                            :getClientExchangeRate="getClientExchangeRate" :marketdata="getDataArray"
                                            :coinInfos="coinInfos" :getCoinInfo="getCoinInfo" @change-size="changePage" />
                                    </a-card>
                                </a-tab-pane>

                                <div slot="tabBarExtraContent">
                                    <a-input ref="userNameInput" v-model="searchvalue" @change="inputSearchValue"
                                        :placeholder="$t('placeholders.plh5')">
                                        <span slot="prefix">
                                            <img src="/images/search-icon-home.svg" />
                                        </span>
                                    </a-input>

                                </div>
                            </a-tabs>
                        </a-card>
                    </div>
                </a-col>
                <a-col :lg="8" :xl="6">
                    <div class="right-tabs">
                        <a-card class="table-card market-left-side" :bordered="false">
                            <a-tabs default-active-key="0" v-model="activeTab1">
                                <a-tab-pane key="0" :tab="$t('tabkeys.tab22')">
                                    <RightTabs :getSymble="getSymble" :getClientExchangeRate="getClientExchangeRate"
                                        :marketdata="marketdata_futrue" tab="0" key="0" />
                                </a-tab-pane>
                                <a-tab-pane key="1" :tab="$t('tabkeys.tab23')">
                                    <RightTabs :getSymble="getSymble" :getClientExchangeRate="getClientExchangeRate"
                                        :marketdata="marketdata_futrue" tab="1" key="1" />
                                </a-tab-pane>
                                <a-tab-pane key="2" :tab="$t('tabkeys.tab24')">
                                    <RightTabs :getSymble="getSymble" :getClientExchangeRate="getClientExchangeRate"
                                        :marketdata="marketdata_futrue" tab="2" key="2" />
                                </a-tab-pane>
                            </a-tabs>
                        </a-card>
                    </div>
                </a-col>
            </a-row>
        </div>
         
    </div>
    <!-- <div v-show="loading">
      <a-spin style="height:90vh; display:flex; justify-content:center; align-items:center; background:#FDFDFD;">
          <a-icon slot="indicator" type="loading" style="font-size: 24px; " spin />
      </a-spin>
    </div> -->
  </div>
</template>

<script>
import pricingCard from './pricingCard.vue'
import LeftTabs from './LeftTabs.vue'
import RightTabs from './RightTabs.vue'

export default {
    components: {
        pricingCard,
        LeftTabs,
        RightTabs
    },
    watch: {
        '$store.state.symbleinfos': function (val) {
            this.symbleinfos = val;
        },
    },
    computed: {
        getDataArray() {
            const _self = this;

            if (this.activeTab == "0") {
                if (_self.searchvalue != '') {
                    const filtered = _self.favoritecoinlist.filter(function (item) {

                        const str = (_self.getSymble(item.symble).from + "/" + _self.getSymble(item.symble).to).toLowerCase();
                        return str.indexOf(_self.searchvalue.toLowerCase()) !== -1;
                    });
                    return filtered
                }
                return this.favoritecoinlist
            }
            else {
                // if (_self.searchvalue != '') {
                //     const filtered = _self.marketdata.filter(function (item) {

                //         const str = (_self.getSymble(item.symble).from + "/" + _self.getSymble(item.symble).to).toLowerCase();
                //         return str.indexOf(_self.searchvalue.toLowerCase()) !== -1;
                //     });
                //     return filtered
                // }
                return this.marketdata;
            }
        },
    },
    data() {
        return {
            activeTab: "1",
            activeTab1: "0",
            searchvalue: '',
            loading: false,
            marketdata: [],
            favoritecoinlist: [],
            marketdata_recommend: [],
            marketdata_recommend_future: [],
            marketdata_futrue: [],
            marketdata_spot: [],
            marketdata_margin: [],
            sockettype: 0,
            symbleinfos: [],
            coinInfos: {},
            pageIndex: 1,
            pageIndex1: 1,
            pageIndex2: 1,
            pageSize: 8,
            pageTotal: 0,
            pageTotal1: 0,
            pageTotal2: 0,
            total: 0,
        }
    },
    created() {
        this.setSymbolInfosFromLocal()
    },
    methods: {

        changeTab(tab) {

            //-1: spot, 0:margin, 1:future
            switch (tab) {
                case '0':
                    this.getFavorites();
                    break;
                case '1':
                    this._getDaily();
                    break;
                case '2':
                    this._getDaily();
                    break;
                case '3':
                    this._getDaily();
                    break;
            }
        },
        getSymble(s) {
            s = this.global_get_uppercase(s);
            s = s.split("/");
            return {
                from: s[0],
                to: s[1],
            };
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
        getFavorites() {
            const _self = this;
            if (!this.$userinfo.uid) {
                return
            }
            _self.$store.dispatch('user_self_selection_getlist', { type: 0 }).then(({ data }) => {
                if (data) {
                    _self.favoritecoinlist = data;
                }
            })
        },
        marginFavorite(ctid) {
            const _i = this.favoritecoinlist.filter(item => item.ctid == ctid)[0];
            if (_i) {
                return _i.itype == -1 ? true : false
            }
            return false
        },
        _getDaily() {
            const _self = this;
            this.loading = true
            let _symbles = this.$store.state.symbleinfos;
            let type = 0
            let pageIndex = 1
            switch (this.activeTab) {
                case '1':
                    type = 0
                    pageIndex = this.pageIndex
                    break;
                case '2':
                    type = -1
                    pageIndex = this.pageIndex1
                    break;
                case '3':
                    type = 1
                    pageIndex = this.pageIndex2
                    break;
            }
            this.total = 0
            if (_symbles.length > 0) {
              let queryData = {
                iscontract: type,
                displaylocation: 2,
                pageIndex: pageIndex,
                pageSize: 8
              }
              if (this.searchvalue.length > 0) {
                queryData.keywords = this.searchvalue
              }
              this.$store.dispatch('quotation_daily_getall', queryData).then(({ data }) => {
                console.log('data-----', data)
                this.loading = false;
                
                this.total = data.totalitemcount
                let marketdata_spot_current = [];
                let marketdata_recommend_future_current = [];
                let marketdata_margin_current = [];
                let marketdata_futrue_current = [];
                
                  data.pagedata.forEach(item => {
                      var symbledatas = _symbles.filter(citem => {
                          return citem.id == item.ctid
                      })
                      if (symbledatas.length > 0) {
                          if (symbledatas[0].itype == 0) {
                              marketdata_spot_current.push(item);
                              if (symbledatas[0].property.slice(0, 1) == "1") {
                                  marketdata_recommend_future_current.push(item);
                              }
                              if (symbledatas[0].borrowmultiple > 0) {
                                  marketdata_margin_current.push(item);
                              }
                          } else {
                              marketdata_futrue_current.push(item);
                          }
                      }
                  });
                  if (pageIndex == 1 && this.marketdata_spot.length == 0) {
                      this.marketdata_spot = marketdata_spot_current
                  }
                  if (pageIndex == 1 && this.marketdata_margin.length == 0) {
                      this.marketdata_margin = marketdata_margin_current
                  }
                  if (this.activeTab == '1') {
                      this.pageTotal = this.total
                      
                      //this.marketdata_spot = marketdata_spot_current
                      this.marketdata = marketdata_spot_current;
                  }else if (this.activeTab == '3') {
                      this.pageTotal2 = this.total
                      this.marketdata = marketdata_futrue_current;
                      
                  }else if (this.activeTab == '2') {
                      this.pageTotal1 = this.total
                      
                      this.marketdata = marketdata_margin_current;
                      
                  }
                  //_self.changeTab(_self.activeTab);
                  if (this.marketdata.length > 0) {
                    _self.$nextTick(() => {
                      _self.connectsocket(type);
                    });
                  }
               
                    
              })
          }
        },
        inputSearchValue(e) {
            let str = e.target.value.replace(/\s/g, "")
            this.searchvalue = str
            if (this.searchvalue.length > 1 || this.searchvalue.length == 0) {
                switch (this.activeTab) {
                  case '1':
                    this.pageTotal = 0
                    this.pageIndex = 1
                    this.$refs.leftTabs.resetPageIndex()
                    break;
                  case '2':
                    this.pageIndex1 = 1
                    this.pageTotal1 = 0
                    this.$refs.leftTabs1.resetPageIndex()
                    break;
                  case '3':
                    this.pageIndex2 = 1
                    this.pageTotal2 = 0
                    this.$refs.leftTabs2.resetPageIndex()
                    break;
                }
                this._getDaily()
            }
        },
        _getAllDaily() {
            const _self = this;
            let _symbles = this.$store.state.symbleinfos;
            if (_symbles.length > 0) {
              this.$store.dispatch('quotation_daily_getall', {
                    iscontract: 1,
                    displaylocation: 0,
                    pageIndex: 1,
                    pageSize: 8
                }).then(({ data }) => {
                    _self.marketdata_futrue = [];
                    data.pagedata.forEach(item => {
                        var symbledatas = _symbles.filter(citem => {
                            return citem.id == item.ctid
                        })
                        if (symbledatas.length > 0) {
                            _self.marketdata_futrue.push(item);
                        }
                    });
                    //this.marketdata_spot = marketdata_spot_current
                    // _self.$nextTick(() => {
                    //     _self.connectsocket(2);
                    // });
                })
          }
        },
        connectsocket(itype) {
            let _self = this;
            let substr = "market." + this.sockettype + ".tickers"
            this.$socket.uninvoke({
                sub: substr,
                type: _self.$socket.type.quotation_daily_getall,
            });
            this.sockettype = (itype == 2 ? 0 : itype);
            substr = "market." + this.sockettype + ".tickers"
            this.$socket.invoke({
                sub: substr,
                type: _self.$socket.type.quotation_daily_getall,
            });
            this.$socket.receive(_self.$socket.type.quotation_daily_getall, _self.callback);
        },
        callback(data) {

            const currencies = data.data
            const filteredSocketData = currencies.filter((currency) => currency.symble != "qtc/usdt")
            const _self = this
            filteredSocketData.forEach(currency => {
                const index = _self.marketdata.findIndex((c) => c.ctid == currency.ctid)
                if (index > -1) {
                    _self.marketdata[index].c = currency.c
                    _self.marketdata[index].l = currency.l
                    _self.marketdata[index].h = currency.h
                    _self.marketdata[index].v = currency.v
                    // _self.marketdata[index].kdata = currency.kdata.reverse()
                }
            })
            this.marketdata = _self.marketdata
            // console.log('_self.marketdata', _self.marketdata);
        },
        async getCoinInfo(coin) {
            try {
                const { data } = await this.$store.dispatch('com_article_info_get', {
                    channelID: 3,
                    subTitle: coin,
                });
                if (data) {
                    this.$set(this.coinInfos, coin, JSON.parse(data.shortdescription));

                } else {
                    this.$set(this.coinInfos, coin, 'nodata');
                }
            } catch (error) {
                //console.log(error);
                this.$set(this.coinInfos, coin, 'nodata');
            }
        },
        changePage(pageIndex) {
          console.log('1111-pageIndex', pageIndex)
            switch (this.activeTab) {
                case '1':
                    this.pageIndex = pageIndex
                    break;
                case '2':
                    this.pageIndex1 = pageIndex
                    break;
                case '3':
                    this.pageIndex2 = pageIndex
                    break;
            }
            
            this._getDaily()
        }
    },
    mounted() {
        this._getAllDaily()
        this._getDaily();
        
    },
    beforeDestroy() {
        this.$socket.uninvoke({
            sub: "market." + this.sockettype + ".tickers",
            type: this.$socket.type.quotation_daily_getall,
        });
    },
}
</script>

<style></style>
