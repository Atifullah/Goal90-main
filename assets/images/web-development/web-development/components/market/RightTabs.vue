<template>
    <a-table :columns="columns" :pagination="{ pageSize: 8 }" :data-source="topgainers" rowKey="ctid" :customRow="goDeal"
        :rowClassName="() => { return 'pointer' }">
        <div slot="pair" slot-scope="text,row">
            <div>
                <span><span class="symbolFrom">{{ getSymble(row.symble).from }}</span><span class="symbolTo">
                        {{ $t('deal_new.dn10') }}</span></span>


            </div>
        </div>
        <div slot="lastPrice" slot-scope="text,row">
            <p class="mb-0">{{ global_get_tofixed(row.c, global_get_decimal(row.symble).p) }}</p>
            <!-- <img class="equivalent" src="/images/delta.svg" /> -->
            <span class="second-price-txt"> ≈ {{ $store.getters.get_client_exchange_rate_name.mark }}{{
                getClientExchangeRate(row) }}</span>
        </div>
        <div slot="changes" slot-scope="text,row">
            <span v-if="tab == '2'" :class="row.c - row.o < 0 ? 'red-active' : 'up-dark'">${{ numFormatter(row.c * row.v)
            }}<img :src="row.c - row.o < 0 ? '/images/red-up-arrow.svg' : '/images/green-blue-up-arrow.svg'" height="12"
                    width="auto" class="ml-1 mb-1" /></span>
            <span v-else :class="row.c - row.o < 0 ? 'red-active' : 'up-dark'">{{ getlimitprice(row) }}%<img
                    :src="row.c - row.o < 0 ? '/images/red-up-arrow.svg' : '/images/green-blue-up-arrow.svg'" height="12"
                    width="auto" class="ml-1 mb-1" /></span>
        </div>
    </a-table>
</template>

<script>

export default {
    props: {
        marketdata: {
            type: Array
        },
        getSymble: {
            type: Function
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
                        width: 110,
                    },
                    {
                        title: this.$t("tableskeys.tk2"),
                        dataIndex: 'lastPrice',
                        key: 'lastPrice',
                        scopedSlots: { customRender: 'lastPrice' },
                        width: 90,
                    },
                    {
                        title: this.tab == 2 ? 'Total 24h Vol' : this.$t('texts.txt41'),
                        dataIndex: 'changes',
                        key: 'changes',
                        scopedSlots: { customRender: 'changes' },
                        width: 100,
                        align: 'center'
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
        goDeal(row) {


            return {
                on: {
                    click: event => {
                        var coinid = '' + row.symble + ''
                        coinid = coinid.replace('/', '_');
                        const ctype = row.itype == 1 ? 'contract' : (row.itype == -1) ? 'margin' : 'spot'
                        const ctid = row.ctid

                        if (ctype == 'contract') {
                            this.$router.push({ path: `/contract-pro/${coinid}?ctid=${ctid}` + '&contractType=1' })
                        }
                        else if (ctype == 'margin') {
                            this.$router.push({ path: `/margin-pro/${coinid}?ctid=${ctid}` })
                        }
                        else {
                            this.$router.push({ path: `/deal-pro/${coinid}?ctid=${ctid}` })
                        }
                    }
                }
            };
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
            }
            else if (this.tab == "1") {
                this.topgainers = this.losers(this.marketdata);
            }
            else if (this.tab == "2") {
                this.topgainers = this.volume(this.marketdata);
            }
        }
    },
    mounted() {
        this.manageTabsData()
    }
}
</script>
