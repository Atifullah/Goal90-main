<template>
    <div class="popular-cryptocurrencies mt-10">
        <div class="main-content">
            <p class="popular-currencies fw-5 text-black">{{$t('details.det13')}}</p>
            <a-row :gutter="16">
                <a-col :lg="16">
                    <a-card class="left-card">
                        <a-tabs default-active-key="1" v-model="activeTab" @change="changeTab">
                            <a-tab-pane key="0" :tab="$t('marketdetail.markdet1')">
                         <trade :getSymble="getSymble" :getClientExchangeRate="getClientExchangeRate"
                                                    :marketdata="getDataArray" tab="2" :loading="marketDataLoading" />
                            </a-tab-pane>
                            <a-tab-pane key="1" :tab="$t('tabkeys.tab19')">
                                <trade :getSymble="getSymble" :getClientExchangeRate="getClientExchangeRate" :loading="marketDataLoading"
                                                    :marketdata="getDataArray" tab="0" />
                            </a-tab-pane>
                            <a-tab-pane key="2" :tab="$t('tabkeys.tab20')">
                                <trade :getSymble="getSymble" :getClientExchangeRate="getClientExchangeRate" :loading="marketDataLoading"
                                                    :marketdata="getDataArray" tab="-1" />
                            </a-tab-pane>
                            <a-tab-pane key="3" :tab="$t('tabkeys.tab21')">
                                <trade :getSymble="getSymble" :getClientExchangeRate="getClientExchangeRate" :loading="marketDataLoading"
                                                    :marketdata="getDataArray" tab="1" />
                            </a-tab-pane>
                        </a-tabs>
                    </a-card>
                </a-col>
                <a-col :lg="8">
                    <a-card class="left-card">
                        <a-tabs default-active-key="1">
                            <a-tab-pane key="0" :tab="$t('tabkeys.tab22')">
                                <RightTabs :getSymble="getSymble" :getClientExchangeRate="getClientExchangeRate" :loading="marketDataLoading"
                                        :marketdata="marketdata_futrue" tab="0" key="0" />                         </a-tab-pane>
                            <a-tab-pane key="1" :tab="$t('tabkeys.tab23')">
                                <RightTabs :getSymble="getSymble" :getClientExchangeRate="getClientExchangeRate" :loading="marketDataLoading"
                                        :marketdata="marketdata_futrue" tab="1" key="1" />
                            </a-tab-pane>
                           
                        </a-tabs>
                    </a-card>
                </a-col>
            </a-row>
        </div>
    </div>
</template>

<script>
import trade from './trade.vue'
import RightTabs from './RightTabs.vue'
export default {
    components: {
        trade,
        RightTabs
    },
    data() {
        return {
            favoritecoinlist: [],
            marketdata_futrue: [],
            marketdata_spot: [],
            marketdata_margin: [],
            marketdata: [],
            marketDataLoading:true,
            activeTab: "1",
            searchvalue: '',
            popularCurrenciesColumns: [
            {
                    title: this.$t('wallet.coin'),
                    dataIndex: "token",
                    key: "token",
                    scopedSlots: { customRender: "token" },
                    width: 140,
                },
                {
                    title: this.$t('legal.lgl3'),
                    dataIndex: "price",
                    key: "price",
                    scopedSlots: { customRender: "price" },
                    width: 120,
                },
                {
                    title: this.$t('public.24chan'),
                    dataIndex: "changes",
                    key: "changes",
                    scopedSlots: { customRender: "changes" },
                    width: 100,
                    align: 'end'
                },
            ],
            popularCurrenciesData: [
                {},
                {},
                {}
            ]
        }
    },
    // computed
    computed:{
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
                if (_self.searchvalue != '') {
                    const filtered = _self.marketdata.filter(function (item) {
                        const str = (_self.getSymble(item.symble).from + "/" + _self.getSymble(item.symble).to).toLowerCase();
                        return str.indexOf(_self.searchvalue.toLowerCase()) !== -1;
                    });
                    return filtered
                }
                return this.marketdata;
            }
            
        },
    },
    methods: {
        connectsocket(itype) {
            let _self = this;
            this.$socket.uninvoke({
                sub: "market." + this.sockettype + ".tickers",
                type: _self.$socket.type.quotation_daily_getall,
            });
            this.sockettype = (itype == 2 ? 0 : itype);
            this.$socket.invoke({
                sub: "market." + this.sockettype + ".tickers",
                type: _self.$socket.type.quotation_daily_getall,
            });
            this.$socket.receive(_self.$socket.type.quotation_daily_getall, _self.callback);
        },
        callback(data) {
            let newdatas = [];
            this.marketdata.forEach((m) => {
                var datainfos = data.data.filter((item) => {
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
                newdatas.push(m);
            });
            this.marketdata = [];
            this.marketdata = newdatas;
        },
        _getDailyAlL(itype) {
            const _self = this;
            let _symbles = this.$store.state.symbleinfos;
            if (itype == 2) {
                this.$store.dispatch('quotation_daily_getall', {
                    iscontract: itype,
                    displaylocation: 0,
                    pageIndex: 0,
                    pageSize: 300 //have to change
                }).then(({ data }) => {
                    _self.marketDataLoading=false;
                    _self.marketdata_spot = [];
                    _self.marketdata_recommend = [];
                    _self.marketdata_recommend_future = [];
                    _self.marketdata_margin = [];
                    _self.marketdata_futrue = [];
                    const market_data = data.pagedata

                    market_data.forEach(item => {
                        var symbledatas = _symbles.filter(citem => {
                            return citem.id == item.ctid
                        });
                        if (symbledatas.length > 0) {
                            if (symbledatas[0].itype == 0) {
                                _self.marketdata_spot.push(item);
                                if (symbledatas[0].property.slice(0, 1) == "1") {
                                    _self.marketdata_recommend.push(item);
                                }
                                if (symbledatas[0].borrowmultiple > 0) {
                                    item.borrowmultiple=symbledatas[0].borrowmultiple;
                                    _self.marketdata_margin.push(item);
                                }
                            } else {
                                _self.marketdata_futrue.push(item);
                            }
                        }
                    });
                    _self.changeTab(_self.activeTab);
                    this.loading = false;
                    _self.$nextTick(() => {
                        _self.connectsocket(itype);
                    });
                });
            } else {
                if (itype == 0) {
                    this.marketdata = this.marketdata_spot;
                }
                if (itype == 1) {
                    this.marketdata = this.marketdata_futrue;
                }
                if (itype == -1) {
                    this.marketdata = this.marketdata_margin;
                }
                this.connectsocket(itype);
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
            console.log('im calling in market getFavorites ');
            _self.$store.dispatch('user_self_selection_getlist', { type: 0 }).then(({ data }) => {
            
                if (data) {
                    _self.favoritecoinlist = data;
                }
            })
        },

     
        changeTab(tab) {
            switch (tab) {
                case '0':
                    this.getFavorites();
                    break;
                case '1':
                    this._getDailyAlL(0);
                    break;
                case '2':
                    this._getDailyAlL(-1);
                    break;
                case '3':
                    this._getDailyAlL(1);
                    break;
            }
        },},

        mounted(){
            this._getDailyAlL(2);
        }
   
}
</script>

<style></style>