<template>
    <div class="content">
        <div class="spot">
            <button type="text" class="btn-spot" @click="changeTab('spot')"><a href="#">{{$t('home_page.spot_home')}}<span v-show="tab==='spot'"
                        class="dot"></span></a></button>
            <button type="text" class="btn-margen" @click="changeTab('margin')"><a class="btn-margen"
                    href="#">{{$t('home_page.margin_home')}}<span v-show="tab==='margin'" class="dot"></span></a></button>
            <button type="text" class="btn-features" @click="changeTab('future')">
                <a href="#">{{$t('home_page.future_home')}}<span v-show="tab==='future'" class="dot"></span></a>
            </button>
            <li class="coin-title_search">
                <div class="search-h">
                    <button class="btn-search" @click="ishidden = !ishidden"> <i class="search_coin"></i> </button>
                </div>
                <div class="search" v-if="!ishidden">
                    <i class="search_coin"></i>
                    <input type="text" v-model="searchvalue" :placeholder="$t('wallet.searchCion')" />
                </div>
            </li>
        </div>
        <table class="coin-content">

            <tr class="coin-title clearfix">
                <td class="coin-title_item" @click="selectCoin('self')" :class="{ active: isSelectCoin === 'self' }">
                    {{ $t(`home.trade${tab}`) }}
                </td>
                <td class="coin-title_item last" style="padding-left: 156px">
                    {{$t('home_page.lastp_home')}}
                </td>
                <td class="coin-title_item" style="padding-left: 147px">
                    {{ $t("home.tradeHighest") }}
                </td>
                <td class="coin-title_item" style="padding-left: 80px">
                    {{ $t("home.tradeLowest") }}
                </td>
                <td class="coin-title_item" style="padding-left: 40px">
                    {{$t('home_page.change_home')}}
                </td>
                <td class="coin-title_item chart" style="padding-left: 70px">
                    {{$t('home_page.chart_home')}}
                </td>
                <td class="coin-title_item" style="padding-left: 110px">
                    {{ $t("home.tradeOperation") }}
                </td>
            </tr>

            <div class="coin-list-trades " v-hex-loading="coinlistloading">
                <div class="coin-list_content trande-rise">

                    <ul class="trande-s tab-body clearfix" v-if="!coinlistloading">
                        <li class="trande-data deal-twain "
                            :class="{'coin_compair_animation_down':tradeData.equality>0, 'coin_compair_animation_up':tradeData.equality<0}"
                            :ref="`animation${tradeData.symble}`" v-for="(tradeData, aindex) in searchlist"
                            :key="aindex" @click="goDeal(tradeData.symble)">
                            <div class="deal-twain nams ">
                                <span :class="[
                                    iscollectList[tradeData.ctid]
                                        ? 'collect'
                                        : 'cancel_collect',
                                ]" @click.stop="collect(tradeData)">
                                </span>
                                <img :src="tradeData.logo" v-if="tradeData.logo" alt="" />
                                <span class="margin-label"
                                    v-if="tradeData.borrowmultiple && tradeData.borrowmultiple>0">{{tradeData.borrowmultiple}}X</span>
                                <span class="colour">{{
                                tradeData.title
                                }}</span>
                                <span class="symble">{{
                                getSymble(tradeData.symble).from
                                }}</span>
                                <span class="symbleTo">/{{ getSymble(tradeData.symble).to }}</span>
                            </div>
                            <div class="real-time-price">
                                <span class="real-price">{{
                                global_get_tofixed(
                                tradeData.c,
                                global_get_decimal(tradeData.symble).p
                                )
                                }}</span>
                                <span class="fz12 c-a data-price">{{
                                $store.getters
                                .get_client_exchange_rate_name.mark
                                }}{{
                                    getClientExchangeRate(tradeData)
                                    }}</span>
                            </div>
                            <div class="low low-pd">
                                {{
                                global_get_tofixed(
                                tradeData.l,
                                global_get_decimal(tradeData.symble).p
                                )
                                }}
                            </div>
                            <div class="highest low-pd">
                                {{
                                global_get_tofixed(
                                tradeData.h,
                                global_get_decimal(tradeData.symble).p
                                )
                                }}
                            </div>
                            <div class="price-limit c-green">
                                <span :class="
                                    tradeData.c - tradeData.o < 0
                                        ? 'i_down'
                                        : 'i_up'
                                ">{{ getlimitprice(tradeData) }}%</span>
                            </div>
                            <div class="currency-curve">
                                <canvas class="curve" :ref="`${tradeData.symble}`"></canvas>
                            </div>
                            <button class="operation"></button>
                        </li>
                    </ul>
                </div>
                <hex-more :list="coinList[isSelectCoin]" :state="moreState"></hex-more>
            </div>
        </table>


    </div>
</template>
<script>
import more from "@/components/public/more";
export default {
    name: "trade",
    components: {
        "hex-more": more,
    },
    props: ["quotationdailygetalldatas"],
    data() {
        return {
            ishidden: true,
            isHidden: true,
            isHiddenMargen: true,
            isHiddenFeatures: true,
            tab: "spot",
            isContract: 0,
            dcs: {},
            total: 0,
            searchvalue: "",
            coinList: [],
            socketcoinlist: [],
            collectchangeval: null,
            iscollectList: {},
            isselectcoinlist: [],
            isSelectCoin: "ALL",
            getCoinInfoTimer: null,
            noDataText: false,
            searchState: false,
            collecttimer: "",
            loadState: true,
            coinlistloading: false,
            moreState: true,
            sorttypelistactive: {
                type: "",
                value: "",
            },
            sub: "market.tickers",
            searchlist: [],
            marginsymbols: null,
            canvasary: [],
            bg: {
                buy: 'rgba(2,250,153,0.05)',
                buyline: 'rgba(2,250,153,0.5)',
                sell: 'rgba(233,108,66,0.05)',
                sellline: 'rgba(233,108,66,0.5)'
            }
        };
    },
    computed: {},
    watch: {
        sorttypelistactive: {
            handler: function (val) {
                this.changesearchlist();
            },
            deep: true,
        },
        $userinfo: function (val) {
            if (!val.uid) {
                this._changesearchlist();
            }
        },
        coinList: {
            handler: function (data) {
                if (!data) return;
                this.$nextTick(() => {
                    data.forEach((item, index) => {
                        if (item.equality) {
                            setTimeout(() => {
                                try {
                                    let content = this.$refs[`animation${item.symble}`][0].classList;
                                    content.add('isanimation');
                                    setTimeout(() => {
                                        content.remove('isanimation');
                                    }, 1000)
                                } catch (e) {
                                }
                            }, Math.random() * 300);
                        }
                    });
                });
                this._changesearchlist();
            },
            deep: true,
        },
        isSelectCoin: function (val) {
            this._getDaily();
            this._changesearchlist();
        },
        searchvalue: function () {
            this._changesearchlist();
        },
        "$store.state.bbTitleList": function (newval, oldval) {
            this.gettitlelist();
        },
        "$store.state.hex_lang.locale": function (val) {
            this.$store.dispatch("quotation_frenchcurrency").then((res) => {
                if (res.data) this.$store.commit("set_coin_bb", res.data);
            });
            if (val === "en_us" && this.isSelectCoin === "全部") {
                this.isSelectCoin = "ALL";
            } else if (val === "zh_cn" && this.isSelectCoin === "ALL") {
                this.isSelectCoin = "全部";
            }
        },
    },
    mounted() {
        if (this.$store.state.bbTitleList.length > 0) {

            this.gettitlelist();
        }
        if (window.localStorage.getItem("thisMarket")) {
            this.isSelectCoin = window.localStorage.getItem("thisMarket");
        } else {
            if (this.$store.state.hex_lang.locale === "en_us")
                this.isSelectCoin = "ALL";
            else this.isSelectCoin = "全部";
        }
    },
    created() {
        var symbleinfos = this.$store.state.symbleinfos;
        symbleinfos.forEach((item) => {
            if (item.itype == 0 && item.borrowMultiple > 0) {
                this.marginsymbols.push(item);
            }
        });
    },
    methods: {
        gettitlelist() {


            const _self = this;
            if (this.coinlistloading) return;
            this.coinlistloading = true;
            this.searchlist = [];
            this.coinList = [];
            this.$store
                .dispatch(this.$socket.url.quotation_daily_getall, {
                    iscontract: _self.isContract,
                    displaylocation: 0,
                    pageIndex: 1,
                    pageSize: 100000
                })
                .then(({ data }) => {
                    console.log('11111114444======', data)
                    if (data.pagedata) {
                        let ary = {};
                        if (_self.isContract == -1) {

                            this.filterMarginTokenPromise(data).then((res) => {
                                res.forEach((_d, i) => {
                                    this.iscollectList[_d.ctid] = _d.self
                                    ary[_d.symble] = {
                                        data: _d
                                    };
                                    data[i].equality = false;
                                });
                                this.coinList = res;
                                this._changesearchlist();
                            })
                        } else {
                            data.forEach((_d, i) => {
                                this.iscollectList[_d.ctid] = _d.self;
                                ary[_d.symble] = {
                                    data: _d
                                };
                                data[i].equality = false;
                            });

                            this.coinList = data;
                            this._changesearchlist();
                        }
                    }
                    this.$nextTick(() => {
                        this.coinlistloading = false;
                        this.$socket.invoke({
                            sub: this.sub,
                            type: this.$socket.type.quotation_daily_getall,
                        });
                        for (const i in _self.canvasary) {
                            if (this.$refs[i]) {
                                _self.canvasary[i]['canvas'] = this.$refs[i][0];
                                _self.drawline(_self.canvasary[i]);
                            }
                        }
                        this._getDaily();
                    });
                });
        },
        _getDaily() {
            const _self = this;
            _self.$store.dispatch("getIntervalData", {
                url: _self.$socket.url.quotation_daily_getall,
                params: {
                    ctype: window.localStorage.getItem("thisMarket"),
                    iscontract: _self.isContract,
                    displaylocation: 2
                },
                timer: _self.$socket.timer.quotation_daily_getall,
                callback: ({ data }) => {
                    if (data) {
                        if (_self.isContract == -1) {
                            _self.filterMarginTokenPromise(data).then((res) => {
                                res.forEach((_d, i) => {
                                    _self.iscollectList[_d.ctid] = _d.self
                                    _self.canvasary[_d.symble] = {
                                        data: _d
                                    };
                                    data[i].equality = 0;
                                    if (_d.c != _self.coinList[i].c) {
                                        data[i].equality = _d.c < _self.coinList[i].c ? -1 : 1
                                    }
                                });
                                _self.coinList = res;
                                _self._changesearchlist();
                            })



                        } else {
                            data.forEach((_d, i) => {
                                _self.coinList[_d.ctid] = _d.self;
                                _self.canvasary[_d.symble] = {
                                    data: _d
                                };
                                data[i].equality = 0;
                                if (_d.c != _self.coinList[i].c) {
                                    data[i].equality = _d.c < _self.coinList[i].c ? -1 : 1
                                }
                            })
                            _self.coinList = data;
                            _self._changesearchlist();
                        }
                        _self.$nextTick(() => {
                            for (const i in _self.canvasary) {
                                _self.canvasary[i]['canvas'] = this.$refs[i][0];
                                _self.drawline(_self.canvasary[i]);
                            }
                        })
                    }

                },
            });
        },
        filterMarginTokenPromise(data) {
            let _ = [];
            var _this = this;
            return new Promise((resolve) => {
                data.forEach((m, i) => {
                    _this.marginsymbols.forEach((n) => {
                        if (m.ctid === n.id) {
                            m.borrowmultiple = n.borrowmultiple;
                            _.push(m);
                        }
                    })
                });
                resolve(_);
            })
        },
        limitPrice: function (c, o) {
            let limit_price = Number((((c - o) / o) * 100).toFixed(2));
            return isNaN(limit_price) ? 0 : limit_price;
        },
        drawline({ data, canvas }) {
            if (!canvas) return
            const k = data.kdata
            const _length = k.length
            if (_length <= 0) return
            const isup = this.limitPrice(data.c, data.o) >= 0
            const { offsetHeight, offsetWidth } = canvas.parentElement
            canvas.width = offsetWidth
            canvas.height = offsetHeight
            const width = offsetWidth
            const height = offsetHeight
            const context = canvas.getContext('2d');
            context.clearRect(0, 0, width, height);
            const _sort = k.sort((a, b) => {
                return b.c - a.c
            })
            let _max = _sort[0].c
            let _min = _sort[_sort.length - 1].c
            let _range = _max - _min

            const _k = k.sort((a, b) => {
                return a.t - b.t
            })
            context.beginPath();
            context.fillStyle = isup ? this.bg.buy : this.bg.sell;
            context.strokeStyle = isup ? this.bg.buyline : this.bg.sellline;
            let last = {}
            const getxy = function (item, index) {
                const x = width / _length * index
                const _y = 2 * ((item.c - _min) / _range - 0.5)
                const y = -_y * height * 0.8 / 2 + height / 2
                return { x, y }
            }

            _k.forEach((item, index) => {
                const { x, y } = getxy(item, index)
                context.fillRect(x, y, width / _length, height - y);
                context.lineTo(x, y);
                if (index == _length - 2)
                    context.stroke()
            })
        },

        getlimitprice(item) {
            return (
                (item.c - item.o < 0 ? "-" : "+") +
                this.global_get_limitprice(item)
            );
        },
        _changesearchlist() {
            this.changecoinlist();
            this.changesearchlist();
        },
        changesearchlist() {
            const _this = this;
            /*排序*/
            const sorttype = _this.sorttypelistactive;
            /*筛选的值*/
            const value = _this.searchvalue.toLowerCase().replace(/ /g, "");
            /*需要筛选的列表*/
            const list = _this.isselectcoinlist;
            let searchlist = [];
            /*筛选*/
            if (value) {
                const reg = new RegExp(value, "g");

                list.map((item) => {
                    if (item.symble.search(reg) >= 0) {
                        searchlist.push(item);
                    }
                });
            } else {
                searchlist = list;
            }
            if (sorttype.type) {
                searchlist.sort((a, b) => {
                    let newa, newb;
                    if (sorttype.type === "limitprice") {
                        newa = this.global_get_limitprice(a);
                        newb = this.global_get_limitprice(b);
                        if (a.c - a.o < 0) {
                            newa = newa * -1;
                        }
                        if (b.c - b.o < 0) {
                            newb = newb * -1;
                        }
                    } else if (sorttype.type === "symble") {
                        newa = a.symble.substring(0, 1).toUpperCase();
                        newb = b.symble.substring(0, 1).toUpperCase();
                        if (sorttype.value == 1) {
                            if (newa < newb) return -1;
                            if (newa > newb) return 1;
                        } else {
                            if (newa > newb) return -1;
                            if (newa < newb) return 1;
                        }
                        return 0;
                    } else {
                        newa = a[sorttype.type];
                        newb = b[sorttype.type];
                    }
                    newb = parseFloat(newb);
                    newa = parseFloat(newa);
                    return sorttype.value == 1 ? newb - newa : newa - newb;
                });
            }
            this.searchlist = searchlist;
        },
        changecoinlist(data) {
            data = data ? data : this.coinList;
            let _list = [];
            if (this.isSelectCoin !== "self") {
                if (
                    this.isSelectCoin.toLowerCase() === "all" ||
                    this.isSelectCoin === "全部"
                ) {
                    _list = data;
                } else {
                    data.forEach((_d) => {
                        const [zi, mu] = _d.symble.split("/");
                        if (mu === this.isSelectCoin.toLowerCase()) {
                            _list.push(_d);
                        }
                    });
                }
            } else {
                for (const _l in this.iscollectList) {
                    const newd = data.find((_d) => {
                        return _d.ctid == _l;
                    });
                    if (newd && this.iscollectList[_l]) {
                        _list.push(newd);
                    }
                }
            }
            this.isselectcoinlist = _list;
        },

        initvisibility(val) {
            return {
                visibility:
                    this.sorttypelistactive.type == val ? "visible" : "hidden",
            };
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
            if (this.sorttypelistactive.type == type) {
                v = v == 1 ? 2 : 1;
            } else {
                v = 1;
            }
            this.sorttypelistactive.type = type;
            this.sorttypelistactive.value = v;
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

        isLogin() {
            return this.isSelectCoin === "self" && !this.$userinfo.uid;
        },

        getSymble(s) {
            s = this.global_get_uppercase(s);
            s = s.split("/");

            return {
                from: s[0],
                to: s[1],
            };
        },

        selectCoin(i) {
            this.isSelectCoin = i;
            i = i === "self" ? "" : i;
            window.localStorage.setItem("thisMarket", i);
        },

        collect(val) {
            /*清除计时器*/
            if (this.collecttimer) return;

            this.collecttimer = true;

            if (!this.$userinfo.uid) {
                /*设置本地自选*/
                this._changesearchlist();
                this.collecttimer = false;
                return;
            }

            const isadd = !this.iscollectList[val.ctid];

            let url = isadd
                ? "user_self_selection_add"
                : "user_self_selection_delete";
            this.$store.dispatch(url, { ctid: val.ctid }).then((res) => {
                const data = res.data;
                if (data) {
                    this.iscollectList[val.ctid] = isadd;
                    this._changesearchlist();
                    this.$store.commit("set_message", {
                        type: isadd ? "ok" : "error",
                        text: isadd
                            ? this.$t("c2c.favorite")
                            : this.$t("c2c.unfavorite"),
                    });
                    this.collecttimer = false;
                }
            });
        },

        goDeal(coinid) {
            coinid = coinid.replace("/", "_");

            let _path = window.localStorage.getItem("deal");

            if (_path) {
                this.$router.push({
                    path:`/deal/${coinid}`

                });
            }

            this.$router.push({ path: `/deal/${coinid}` });
        },
        changeTab(tab) {

            if (this.tab !== tab) {
                this.tab = tab;
                if (tab === 'spot') {
                    this.isContract = 0;
                }
                else if (tab === 'margin') {
                    this.isContract = -1;
                }
                else {
                    this.isContract = 1;
                }
                this.gettitlelist();
            }




        }
    },

    beforeDestroy() {
        this.$socket.uninvoke(this.$socket.type.quotation_daily_getall);
    },
};
</script>

<style lang="scss" scoped>

.coin-content {
    width: 1427px;
    background: #fff;
    margin: 60px auto 200px auto;
    box-shadow: 80px 60px 256px #73899533;
    border-radius: 10px;
    padding: 0 0px 50px 0px;
}

.spot {

    .dot {
        background: #FEA600 0% 0% no-repeat padding-box;
        opacity: 1;
        height: 8px;
        width: 8px;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        flex-direction: column;
        margin: 5px auto;

    }

    .dot4 {
        background: #FEA600 0% 0% no-repeat padding-box;
        opacity: 1;
        height: 8px;
        width: 8px;
        border-radius: 50%;
        position: relative;
        display: inline-block;
        bottom: -25px;
        right: 46px;
    }

    .dot3 {
        background: #FEA600 0% 0% no-repeat padding-box;
        opacity: 1;
        height: 8px;
        width: 8px;
        border-radius: 50%;
        position: relative;
        display: inline-block;
        bottom: -25px;
        right: 53px;
    }

    position: relative;
    width: 1400px;
    margin-left: auto;
    margin-right: auto;
    justify-content: unset;
    bottom: -27px;

    .btn-spot {
        font: normal normal bold 26px/39px Poppins;
        letter-spacing: 0px;
        color: #fea600;
        opacity: 1;
        padding-right: 41px;
        background: transparent;

        a {
            color: #fea600;
        }
    }

    .btn-margen {
        font: normal normal bold 26px/39px Poppins;
        letter-spacing: 0px;
        color: #fea600;
        opacity: 1;
        padding-right: 17px;
        background-color: transparent;


    }

    .btn-features {
        font: normal normal bold 26px/39px Poppins;
        letter-spacing: 0px;
        color: #fea600;
        opacity: 1;
        background-color: transparent;

        a {
            color: #fea600;
        }

    }

}

.features-click {
    background: rgb(255, 249, 238);

    .btn-usdt {
        background: #fea600 0% 0% no-repeat padding-box;
        border-radius: 34px;
        opacity: 1;
        padding: 10px 10px;
    }

    .btn-btc {
        background: #fea600 0% 0% no-repeat padding-box;
        border-radius: 34px;
        opacity: 1;
        padding: 10px 10px;
    }

    .btn-usd {
        background: #fea600 0% 0% no-repeat padding-box;
        border-radius: 34px;
        opacity: 1;
        padding: 10px 10px;
    }

}

.left-1 {
    margin-left: -40px;
}

.noDataText {
    line-height: 120px;
    text-align: center;
}

.coin-title {
    line-height: 80px;
    color: #000;
    border-bottom: 1px solid #e8e8e8;
    font-size: 16px;
    background: #FFF9EE;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
}

.search-h {
    margin-top: inherit;
    margin-left: 331px;
    margin-right: 3px;

}

.btn-search {
    cursor: pointer;
    border-radius: 12px;
    opacity: 1.34;
    border: 1px solid #C9C9C7;
    width: 61px;

    .search_coin {
        background-image: url("../../static/images/search.svg");
        display: inline-block;
        width: 18px;
        height: 18px;
        background-size: cover;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: 10px;
        opacity: 0.8;
        padding: 20px;
        color: #FEA600;

    }

}


.coin-title_item {
    float: left;
    cursor: pointer;
    margin-right: 50px;
    font-weight: 600;
    text-align: center;
    color: rgba(51, 51, 51, 1);
    line-height: 40px;
    margin-top: 20px;
}

.left {
    margin-left: -80px;
}

.coin-title_item:hover {
    color: rgb(254, 166, 0);
}

.coin-title .coin-title_item:first-child {
    margin-left: 20px;
}

.coin-title_item.active {
    border-bottom: 3px solid #fff;
    color: #fff;
}

.coin-title_item.hex-li {
    display: none;
}

.coin-list-trades {
    font-size: 14px;
    color: rgba(51, 51, 51, 1);
    position: relative;
}

.coin-list-trades :deep(.coin-list_content .select) {
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

.mgl5 {
    margin-left: 155px;
}

.coin-list_header {
    font-size: 12px;
    color: #646b8c;
    display: table;
    width: 100%;
    padding: 0 20px;
    background: rgba(250, 250, 253, 1);
    line-height: 40px;
}

.coin-list_header .select {
    width: 4%;
}

.coin-list-trades :deep(.coin-list_content) {
    margin-bottom: 0 !important;
}

.coin-list-trades :deep(.coin-list_content .body) {
    line-height: 40px;
    padding: 0 20px;
}

.coin-list-trades :deep(.coin-list_content .body:hover) {
    background: rgba(245, 247, 251, 1);
}

.coin-list-trades :deep(.coin-list_content .body > *),
.coin-list_header>* {
    float: left;
}

.coin-list-trades :deep(.el-scrollbar__thumb) {
    background-color: rgba(41, 50, 76, 1);
}

.coin-list-trades :deep(.el-scrollbar__thumb:hover) {
    background: rgba(245, 247, 251, 1);
}

.coin-list-trades .collect {
    background: url("../../static/images/collect.svg") no-repeat left center;
    background-size: 14px, 14px;
    cursor: pointer;
}

.coin-list-trades .collect.active {
    background-image: url("../../static/images/collect-active.svg");
}

.coin-list_content .price_rate {
    font-size: 12px;
    color: #555A5F;;
    margin-left: 6px;
    font-weight: 500 !important;

}

.coin-list-trades :deep(.coin-list_content .updown.i_down) {
    color: #ae313c;
}

.coin-list-trades :deep(.coin-list_content .updown.i_down:after) {
    background: url("../../static/images/i_down.svg") no-repeat;
    content: "";
    display: inline-block;
    width: 9px;
    height: 11px;
    background-size: cover;
    margin-left: 5px;
}

.coin-list-trades :deep(.coin-list_content .updown.i_up) {
    color: rgba(3, 191, 123, 1);
}

.coin-list-trades :deep(.coin-list_content .updown.i_up:after) {
    color: rgba(3, 191, 123, 1);
    background: url("../../static/images/i_up.svg") no-repeat;
    content: "";
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

    margin-top: -50px;

    bottom: -64px;
    position: relative;
    bottom: -123px;
    float: right;

}

.coin-title_search .search {
    display: inline-block;
    width: 220px;
    height: 48px;
    line-height: 50px;
    font-size: 15px;
    margin-right: 56px;
    position: relative;
    padding-right: 25px;
    color: #bdbccb;
    border: 2px solid #FEA600;
    border-radius: 6px;
    opacity: 0.34;
    width: 315px;
    padding-left: 10px;
    margin-left: 10px;
    bottom: 66px;
    right: 3px;
}

.coin-title_search input {
    display: inline-block;
    width: 200px;
    padding-left: 40px;
    line-height: 30px;
    font-size: 15px;
    background: #fff;
    border-radius: 5px;
    color: #70707078;


    &::placeholder {
        text-align: left;
        font: normal normal medium 26px/39px Poppins;
        letter-spacing: 0px;
        color: #70707078;
        opacity: 1;
    }
}

.coin-title_search input:focus {
    color: rgba(51, 51, 51, 1);
}

.coin-title_search .search_coin {
    background-image: url("../../static/images/search.svg");
    display: inline-block;
    width: 18px;
    height: 18px;
    background-size: cover;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 10px;
    opacity: 0.8;
    padding: 10px;
    color: #FEA600;

}

.coin-title_search button {
    background-size: cover;
    top: 3%;
    transform: translateY(-40%);
    width: 46px;
    height: 48px;
    margin-bottom: 0px;
    margin-top: 0px;






}



.coin-title_search input:focus+i.search_coin {
    background-image: url("../../static/images/foucs_search.svg");
}

.noDataText .repeal {
    color: #ffb11a
}

.trande-rise {
    line-height: 40px;


    .trande-s {
        cursor: pointer;

        li {
            font-size: 16px;
            float: left;
            color: #8e8e8e;
            height: 80px;
            line-height: 80px;

            .red,
            .green {
                display: inline-block;
                width: 5px;
                height: 6px;
            }
        }

        li.trande-data:hover {
            background: #fff;
            box-shadow: 0 0 14px 2px #e3e3e3;
            transform: scale(1.07);
            border-radius: 10px;
        }

        .deal-twain {
            width: 253px;
        }

        .tac.deal-twain {
            text-align: left;
            padding-left: 51px;
            margin-left: -63;
        }

        .real-time-price {
            width: 206px;
            text-align: left !important;

            .real-price {
                margin-left: 25px;
                font-weight: bold;
            }

            .data-price {
                width: 75px;
                display: inline-block;
                text-align: left;
                padding-left: 7px;
            }

            .fl {
                margin-left: 30px;
            }
        }

        .low {
            width: 179px;
            text-align: right;
        }

        .low.low-pd,
        .highest.low-pd {
            padding-right: 16px;
        }

        .highest {
            width: 195px;
            text-align: right;
        }

        .Volume {
            width: 225px;

            .fl {
                float: right;
            }
        }

        .price-limit {
            width: 166px;

            .fl {
                float: right;
            }
        }

        .operation {
            width: 200px;
            text-align: right;
        }

        .rightAlign {
            padding-right: 12px;
        }

        .trande-data {
            border-bottom: 1px solid #e8e8e8;
            border-top: 0;
            width: 100%;
            transition: all 0.4s ease;
            background: white;

            div {
                float: left;
                color: #333333;
                text-align: right;
                font-weight: bold;
                padding-right: 20px;

                img {
                    width: 24px;
                    height: 24px;
                    vertical-align: middle;
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
                    font-size: 16px;
                    font-weight: bold;
                    color: rgb(51, 51, 51);
                }

                .symbleTo {
                    font-size: 16px;
                    color: rgba(170, 170, 170, 1);
                }
            }

            .c-green {
                span {
                    display: inline-block;
                }

                .i_down:after {
                    background: url("../../static/images/i_down.svg") no-repeat;
                    content: "";
                    display: inline-block;
                    width: 10px;
                    height: 12px;
                    background-size: cover;
                    color: #46b05d;
                    margin-left: -10px;
                }

                .i_up {
                    color: rgba(3, 191, 123, 1);
                }

                .i_down {
                    color: #ae313c;
                }

                .i_up:after {
                    color: rgba(3, 191, 123, 1);
                    background: url("../../static/images/i_up.svg") no-repeat;
                    content: "";
                    display: inline-block;
                    width: 10px;
                    height: 12px;
                    background-size: cover;
                    color: #46b05d;
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
                display: flex;
                align-items: center;

                img {
                    border-radius: 50%;
                    margin-left: -45px;
                }
            }

            button {
                height: 80px;
                background: url("../../static/images/action_1.png") no-repeat center center;
                background-size: 24px 24px;
                text-align: center;
                line-height: 20px;
                outline: none;
                color: white;
                margin-left: 0px;
            }

            .cancel_collect {
                width: 56px;
                text-align: center;
                display: inline-block;
                background: url("../../static/images/collect.svg") no-repeat center center;
                background-size: 20px 20px;
            }

            .collect {
                width: 56px;
                text-align: center;
                display: inline-block;
                background: url("../../static/images/collect-active.svg") no-repeat center center;
                background-size: 20px 20px;
            }
        }
    }

    .trandeTitle {
        width: inherit !important;
        background: white;
        border-bottom: 1px solid #e8e8e8;
        border-top: none;

    }

    .more {
        height: 40px;
        line-height: 40px;
        font-size: 14px;
        border-top: 1px solid rgba(133, 131, 172, 0.2);
    }
}

.trande-rise .trande-s.trandeTitle li {
    font-size: 16px !important;
}

.sorts {
    color: #999999;
    line-height: 7px;
    padding-left: 6px;
    display: inline-block;
    height: 30px;
    min-width: 16px;

    i {
        display: inline-block;
        width: 10px;
        height: 6px;
        position: relative;
        top: -1px;
    }

    i.sortup {
        display: none;
        background: url("../../static/images/s_up.png") no-repeat center center;
    }

    i.sortdown {
        display: none;
        background: url("../../static/images/s_down.png") no-repeat center center;
    }

    i.sortup.active {
        display: block;
        padding-top: 40px;
        background: url("../../static/images/s_up_check.svg") no-repeat center center;
    }

    i.sortdown.active {
        display: block;
        padding-top: 40px;
        background: url("../../static/images/s_down_check.svg") no-repeat center center;
    }
}

.trande-rise .trande-s .trande-data div.deal-twain {
    text-align: left;


}

.clearfix {
    zoom: 1;
    height: 80px;
}

.clearfix:after {
    content: ".";
    display: block;
    height: 0;
    clear: both;
    visibility: hidden;
}

@media (min-width:768px) and (max-width:1919px) {
    .spot {
        width: 1190px;
        margin-left: auto;
        margin-right: auto;
    }
}

@media (min-width: 1200px) and (max-width: 1919px) {

    .coin-content {
        width: 1200px;

    }

    .coin-title_item {

        margin-left: -43px;
    }

    .chart {
        padding-left: 40px;
    }

    .trande-rise .trande-s .tac.deal-twain {
        padding-left: 60px !important;
    }

    .trande-rise .trande-s .deal-twain {
        width: 210px !important;
    }

    .trande-rise .trande-s .real-time-price {
        width: 209px !important;
    }

    .trande-rise .trande-s .low {
        width: 160px !important;
        margin-left: -20px
    }

    .trande-rise .trande-s .highest {
        width: 160px !important;
    }

    .trande-rise .trande-s .Volume {
        width: 160px !important;
    }

    .trande-rise .trande-s .price-limit {
        width: 150px !important;
    }

    .trande-rise .trande-s .operation {
        width: 117px !important;
    }

    .trande-rise .trande-s .trande-data {
        width: 100% !important;
    }
}

.currency-curve {
    width: 15%;
    height: 100%;


    z-index: -1;

    padding-left: 21px;
    margin-left: 9px;

    canvas {
        width: 100%;
        height: 80%;

    }
}

li.coin_compair_animation_up {
    background: url("../../static/images/image_red.svg") -385px 0px no-repeat;
    background-size: auto 100%;
}

li.coin_compair_animation_down {
    background: url("../../static/images/image_green.svg") -385px 0px no-repeat;
    background-size: auto 100%;
}

.border {
    border: 1px solid black;
}
</style>
