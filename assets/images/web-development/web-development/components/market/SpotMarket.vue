<template>
    <a-table :columns="columns" :pagination="false" :data-source="topgainers" rowKey="ctid" :showHeader="false" :scroll="{ y: 520 }"
        class="spot-market-table mt-2">
        <div slot="pair" slot-scope="text,row">
            <div class="pointer" @click="goDeal('' + row.symble + '', row.itype == 1 ? 'contract' : (row.itype == -1) ? 'margin' : 'spot',row.ctid)">
                <span>
                    <!-- class="d-flex" -->
                    <div class="col-alignment">
                        <div>
                            <img width="40px" height="40px" :src="row.logo" class="table-icon"/>
                        </div>
                        <div class="pl-3">
                            <span class="symbolFrom">{{ getSymble(row.symble) }}</span>
                            <div class="grey-active fw-4">
                                {{ row.fullname }}
                            </div>
                        </div>
                    </div> 
                </span> 
            </div>
        </div>
        <div slot="lastPrice" slot-scope="text,row" class="text-right price-column">
            <div>
                <span class="symbolFrom">{{ $store.getters.get_client_exchange_rate_name.mark }}{{ getClientExchangeRate(row) }}</span> 
                <p class="fw-4" v-if="tab == '2'" :class="row.c - row.o < 0 ? 'red-active' : 'up-dark'">${{ numFormatter(row.c * row.v) }}
                    <img :src="row.c - row.o < 0 ? '/images/red-up-arrow.svg' : '/images/green-blue-up-arrow.svg'"
                        height="12" width="auto" class="ml-1 mb-1" />
                </p>
                <p class="fw-4" v-else :class="row.c - row.o < 0 ? 'red-active' : 'up-dark'">{{ getlimitprice(row) }}%<img
                        :src="row.c - row.o < 0 ? '/images/red-up-arrow.svg' : '/images/green-blue-up-arrow.svg'"
                        height="12" width="auto" class="ml-1 mb-1" /></p>
            </div> 
        </div> 
    </a-table>
</template> 
<script>

export default {
    props: {
        marketdata: {
            type: Array
        },
        getClientExchangeRate: {
            type: Function
        },
        tab: {
            type: String
        }
    },
    data() {
        return {
            topgainers: [],
            columns:
                [
                    {
                        title: this.$t("tableskeys.tk11"),
                        dataIndex: 'pair',
                        key: 'pair',
                        scopedSlots: { customRender: 'pair' },
                        width: 170,
                    },
                    {
                        title: this.$t("tableskeys.tk2"),
                        dataIndex: 'lastPrice',
                        key: 'lastPrice',
                        scopedSlots: { customRender: 'lastPrice' },
                        width: 100,
                    },

                ]
        }
    },
    watch: {
        marketdata: function (val) {
            this.manageTabsData()
        }
    },
    methods: {
        getSymble(s) {
            return this.global_get_uppercase(s);
        },
        getlimitprice(item) {
            return (
                (item.c - item.o < 0 ? "-" : "+") +
                this.global_get_limitprice(item)
            );
        },
        topGainers(data) {
            const array = data.concat([]);
            array.sort((a, b) => {
                const x = a.c - a.o < 0 ? -1 : 1;
                const y = b.c - b.o < 0 ? -1 : 1;
                return y * parseFloat(this.global_get_limitprice(b)) - x * parseFloat(this.global_get_limitprice(a))
            })
            return array;
        },
        goDeal(coinid, ctype,ctid) {
            console.log(ctid,)
            coinid = coinid.replace('/', '_');
            if (ctype == 'contract') {
                this.$router.push({ path: `/contract-pro/${coinid}?ctid=${ctid}`  + '&contractType=1'  })
            }
            else if (ctype == 'margin') {
                this.$router.push({ path: `/margin-pro/${coinid}?ctid=${ctid}` })
            }
            else {
                this.$router.push({ path: `/deal-pro/${coinid}?ctid=${ctid}`  })
               
            }
        },
        losers(data) {
            const array = data.concat([]);
            array.sort((a, b) => {
                const x = a.c - a.o < 0 ? -1 : 1;
                const y = b.c - b.o < 0 ? -1 : 1;
                return x * parseFloat(this.global_get_limitprice(a)) - y * parseFloat(this.global_get_limitprice(b))
            })
            return array;
        },
        volume(data) {
            const array = data.concat([]);
            array.sort((a, b) => {
                return (b.v * b.c) - (a.v * a.c);
            })
            return array;
        },
        numFormatter(num) {
            if (num > 999 && num < 1000000) {
                return (num / 1000).toFixed(2) + 'K'; // convert to K for number from > 1000 < 1 million
            } else if (num > 1000000 && num < 10000000) {
                return (num / 1000000).toFixed(2) + 'M'; // convert to M for number from > 1 million
            } else if (num > 10000000) {
                return (num / 10000000).toFixed(2) + 'B'; // convert to B for number from > 1 billion
            } else if (num < 900) {
                return num; // if value < 1000, nothing to do
            }
        },
        manageTabsData() {
            if (this.tab == "0") {
                this.topgainers = this.topGainers(this.marketdata);
            } else if (this.tab == "1") {
                this.topgainers = this.losers(this.marketdata);
            } else if (this.tab == "2") {
                this.topgainers = this.volume(this.marketdata);
            }
        }, 
        callback(response) {
            const items = response.data
            items.forEach(item => {
                const index = this.topgainers.findIndex((gainer) => gainer.ctid == item.ctid)
                if (index > -1) {
                    this.topgainers[index].c = item.c
                    this.topgainers[index].h = item.h
                    this.topgainers[index].l = item.l
                    this.topgainers[index].mp = item.mp
                    this.topgainers[index].o = item.o
                    this.topgainers[index].t = item.t
                    this.topgainers[index].v = item.v
                }
            });
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
    },
    mounted() {
        this.manageTabsData() 
        this.$nextTick(() => {
            this.connectsocket(0);
        })
    }, 
    beforeDestroy() { 
        let substr = "market.0.tickers"
        this.$socket.uninvoke({
            sub: substr,
            type: this.$socket.type.quotation_daily_getall,
        });
    }, 
}
</script>
 