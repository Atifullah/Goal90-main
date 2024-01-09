<template>
    <a-table :columns="columns" :pagination="false" :data-source="marketdata.slice(0,4)" rowKey="ctid">
        <div slot="pair" slot-scope="text, row">
            <div class="pointer symbol-txt fw-5">
                <nuxt-link class="text-black " :to="selfRoute.marketDetail + '?currency=' + getSymble(row.symble).from.toLowerCase()">
                    <img :src="row.logo" width="24px" height="24px" class="mr-2" />
                        <span class="symbolFrom">{{ row.currencyNmae }}</span>
                </nuxt-link>
            </div>
        </div>
        <div slot="lastPrice" slot-scope="text, row">
            <p class="mb-0 symbol-txt fw-5">
                ${{ global_get_tofixed(row.c, global_get_decimal(row.symble).p) }}
            </p>
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
export default {
    data() {
        return {
            marketdata: [],
            columns: [
                {
                    title: this.$t("public.pub1"),
                    dataIndex: "pair",
                    key: "pair",
                    scopedSlots: { customRender: "pair" },
                    width: 140,
                },
                {
                    title: this.$t("contract.amount"),
                    dataIndex: "lastPrice",
                    key: "lastPrice",
                    scopedSlots: { customRender: "lastPrice" },
                    width: 90,
                },
                {
                    title: '24H ' + this.$t("tableskeys.tk5"),
                    dataIndex: "change",
                    key: "change",
                    scopedSlots: { customRender: "change" },
                    width: 80,
                    align: 'right'
                },
            ],

        };
    },
    computed: {
        selfRoute: function () {
            return this.$store.state.route
        },
    },

    methods: {

        getSymble(s) {
            s = this.global_get_uppercase(s)
            s = s.split("/")
            return {
                from: s[0],
                to: s[1],
            };
        },

        getlimitprice(item) {
            return (
                (item.c - item.o < 0 ? "-" : "+") +
                this.global_get_limitprice(item)
            );
        },

        limitPrice: function (c, o) {
            let limit_price = Number((((c - o) / o) * 100).toFixed(2));
            return isNaN(limit_price) ? 0 : limit_price;
        },
        getPopularCryptoCurrencies() {
            let currencyinfos = this.$store.state.currencyinfos
            console.log('aa', this.$store.dispatch('quotation_daily_getall', {
                iscontract: 0,
                displaylocation: 0,
                pageIndex: 1,
                pageSize: 100000
            }));
            this.$store.dispatch('quotation_daily_getall', {
                iscontract: 0,
                displaylocation: 0,
                pageIndex: 1,
                pageSize: 100000
            }).then((data) => {
                if (data.code == 200) {
                    console.log('11111112222======', data.data.pagedata)
                    const currencies = data.data.pagedata
                    const _self = this
                    const filteredArray = currencies.filter(currency => currency.itype == 0)

                    const array = filteredArray.map(currency => {
                        const name = _self.getSymble(currency.symble).from
                        const c = currencyinfos.find((cinfo) => {
                            return cinfo.currencyname.toLowerCase().includes(name.toLowerCase())
                        })

                        if (c) {
                            return {
                                ...currency,
                                currencyNmae: c.fullname
                            }
                        }

                    })
                    this.marketdata = array
                }
            });

        },
    },
    mounted() {
        this.getPopularCryptoCurrencies()
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
