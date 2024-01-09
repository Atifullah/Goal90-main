<template>
    <a-table :columns="columns" :pagination="false" :data-source="copyMarketData" rowKey="ctid" :show-header="false">
        <div slot="pair" slot-scope="text, row">
            <div class="pointer symbol-txt fw-5" @click="
                goDeal(
                    '' + row.symble + '',
                    row.itype == 1
                        ? 'contract'
                        : row.itype == -1
                            ? 'margin'
                            : 'spot'
                )
                ">
                <img :src="row.logo" width="35px" height="35px" class="mr-2" />
                <span>
                    <span class="symbolFrom">{{ getSymble(row.symble).from }}</span>
                    <span v-if="row.itype != '1'" class="symbolTo grey-active read-more fw-5">
                        /{{ getSymble(row.symble).to }}
                    </span>
                    <span v-else class="symbolTo ml-1 perpetual-txt fw-5">
                        &nbsp;{{ $t("contract.swap") }}
                    </span>
                    <span class="margin-trade-txt" v-if="(tab == '-1' || row.itype == -1) &&
                        $store.state.symbleinfos?.length > 0">
                        {{ $store.state.symbleinfos.filter((item) => {
                            return item.id == row.ctid;
                        })[0].borrowmultiple
                        }}X
                    </span>
                </span>
            </div>
        </div>
        <div slot="lastPrice" slot-scope="text, row">
            <p class="mb-0 symbol-txt fw-5">
                ${{ global_get_tofixed(row.c, global_get_decimal(row.symble).p) }}
                <span class=" read-more fw-5">
                    <!-- {{ $store.getters.get_client_exchange_rate_name.mark }}  
                    {{ getClientExchangeRate(row) }} -->
                </span>
            </p>
        </div>
        <div v-if="tab != '2'" slot="turnover" slot-scope="text, row" :ref="`animation${row.symble}`">
            <div class="currency-curve">
                <canvas class="curve" :ref="`${row.symble}`"></canvas>
            </div>
        </div>

        <div slot="change" slot-scope="text, row">
            <span :class="row.c - row.o < 0 ? 'red-active' : 'up-dark'">{{ getlimitprice(row) }}%<img :src="limitPrice(row.c, row.o) < 0
                ? '/images/red-up-arrow.svg'
                : '/images/green-blue-up-arrow.svg'
                " height="12" width="auto" class="ml-1 mb-1" /></span>
        </div>
    </a-table>
</template>

<script>
import NoData from "@/components/public/NoData";
export default {
    components: {
        NoData,
    },
    props: {
        marketdata: {
            type: Array,
        },
        getSymble: {
            type: Function,
        },
        getClientExchangeRate: {
            type: Function,
        },
        tab: {
            type: String,
        },
        symbleinfos: {
            type: Array,
        },
        marginFavorite: {
            type: Function,
        },
        _getDaily: {
            type: Function,
        },
        getFavorites: {
            type: Function,
        },
        getCoinInfo: {
            type: Function,
        },
        coinInfos: {
            type: Object,
        },
    },
    data() {
        return {
            // copyMarketData:[],
            columns: [
                {
                    title: this.$t("tableskeys.tk1"),
                    dataIndex: "pair",
                    key: "pair",
                    scopedSlots: { customRender: "pair" },
                    width: 170,
                },
                {
                    title: this.$t("tableskeys.tk2"),
                    dataIndex: "lastPrice",
                    key: "lastPrice",
                    scopedSlots: { customRender: "lastPrice" },
                    width: 140,
                },

                {
                    title: this.$t("tableskeys.tk5"),
                    dataIndex: "change",
                    key: "change",
                    scopedSlots: { customRender: "change" },
                    width: 120,
                },
                {
                    title: this.tab != "2" ? this.$t('home_page.chart_home') : "",
                    dataIndex: "turnOver",
                    key: "turnOver",
                    scopedSlots: { customRender: "turnover" },
                    width: this.tab != "2" ? 150 : 0,
                    align: "right"
                },

            ],
            canvasary: [],
            bg: {
                buy: "rgba(74,196,158,0.000089)",
                buydark: "rgba(74,196,158,0.45)",
                buyline: "rgba(74,196,158,0.85)",
                sell: "rgba(255,129,141,000089)",
                selldark: "rgba(255,129,141,0.0045)",
                sellline: "rgba(255,129,141,0.85)",
            },
        };
    },
    computed:{
        copyMarketData(){
            if(this.marketdata.length>0){
                return this.marketdata.slice(0, 7);
            }
            else return []
            
        }
    },
    watch: {
        marketdata: function (val) {
            if (val.length > 0) {
                // const data=val.slice(0, 8);
                this.loading = false;
                this.canvasary = [];
                val.forEach((_d) => {
                    this.canvasary[_d.symble] = {
                        data: _d,
                    };
                });
                this.$nextTick(() => {
                    for (const i in this.canvasary) {
                        this.canvasary[i]["canvas"] = this.$refs[i];
                        this.drawline(this.canvasary[i]);
                    }
                });
                // this.copyMarketData=data
            }
        },
    },
    methods: {
        formatter(row, column) {
            return row.address;
        },
        getlimitprice(item) {
            return (
                (item.c - item.o < 0 ? "-" : "+") +
                this.global_get_limitprice(item)
            );
        },
        handleRowClick(row) {
            goDeal(
                "" + row.symble + "",
                row.itype == 1
                    ? "contract"
                    : row.itype == -1
                        ? "margin"
                        : "spot"
            );
        },
        goDeal(coinid, ctype) {
            coinid = coinid.replace("/", "_");
            if (ctype == "contract") {
                this.$router.push({ path: "/contract-pro/" + coinid + '?contractType=1' });
            } else if (ctype == "margin") {
                this.$router.push({ path: "/margin-pro/" + coinid });
            } else {
                this.$router.push({ path: "/deal-pro/" + coinid });
            }
        },
        limitPrice: function (c, o) {
            let limit_price = Number((((c - o) / o) * 100).toFixed(2));
            return isNaN(limit_price) ? 0 : limit_price;
        },
        drawline({ data, canvas }) {
            if (!canvas) return;
            const k = data.kdata;
            if (!k) return;
            const _length = k.length;
            if (_length <= 0) return;
            const isup = this.limitPrice(data.c, data.o) >= 0;
            const { offsetHeight, offsetWidth } = canvas.parentElement;
            canvas.width = offsetWidth;
            canvas.height = offsetHeight;
            const width = offsetWidth;
            const height = offsetHeight;
            const context = canvas.getContext("2d");
            context.clearRect(0, 0, width, height);
            const _sort = k.sort((a, b) => {
                return b.c - a.c;
            });
            let _max = _sort[0].c;
            let _min = _sort[_sort.length - 1].c;
            let _range = _max - _min;

            const _k = k.sort((a, b) => {
                return a.t - b.t;
            });
            context.beginPath();
            var my_gradient = context.createLinearGradient(0, 0, 0, height);
            my_gradient.addColorStop(0, isup ? this.bg.buydark : this.bg.sell);
            my_gradient.addColorStop(1, isup ? this.bg.buy : this.bg.selldark);
            context.fillStyle = my_gradient;
            context.strokeStyle = isup ? this.bg.buyline : this.bg.sellline;
            let last = {};
            const getxy = function (item, index) {
                const x = (width / _length) * index;
                const _y = 2 * ((item.c - _min) / _range - 0.5);
                const y = (-_y * height * 0.8) / 2 + height / 2;
                return { x, y };
            };

            _k.forEach((item, index) => {
                const { x, y } = getxy(item, index);
                context.fillRect(x, y, width / _length, height - y);
                context.lineTo(x, y);
                if (index == _length - 2) context.stroke();
            });
        },
        collect(val) {
            const _self = this;
            if (!this.$userinfo.uid) {
                this.$router.push("/login");
                return;
            }
            let url;
            let options = {};
            let isadd;
            if (this.tab != "-1") {
                isadd = !val.self;
            } else {
                isadd = !_self.marginFavorite(val.ctid);
            }
            url = isadd
                ? "user_self_selection_add"
                : "user_self_selection_delete";
            isadd ? (options.ctids = [val.ctid]) : (options.ids = [val.id]);
            options.ismargin = this.tab == "-1" ? 1 : 0;

            this.$store.dispatch(url, options).then((res) => {
                const data = res.data;
                if (data) {
                    this.$store.commit("set_message", {
                        type: "ok",
                        text: isadd
                            ? this.$t("c2c.favorite")
                            : this.$t("c2c.unfavorite"),
                    });
                    if (this.tab == "2") {
                        _self._getDaily(2);
                        val.self = !val.self;
                    } else if (this.tab == "-1") {
                        _self.getFavorites();
                    } else {
                        val.self = !val.self;
                    }
                }
            });
        },
        onExpand(row) {
            this.$set(row, "expanded", true);
            if (row.expanded) this.getArticleInfo(row);
            row.onExpand();
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
        async getArticleInfo(row) {
            if (row.expanded) {
                const symble = this.getSymble(row.record.symble).from;
                if (!this.coinInfos[symble]) this.getCoinInfo(symble);
            }
        },
    },
    mounted() {
    },
};
</script>

<style lang="scss" scoped>
.currency-curve {
    width: 100px;
    height: 40px;
    float: right;
    canvas {
        width: 100%;
        height: 100%;
    }
}
</style>
