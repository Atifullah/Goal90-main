<template>
    <div class="other-crypto mt-4">
        <a-card class="other-crypto-card">
            <p class="cryptos-title mb-0 text-black">{{ $t('bnq.buy_crypto') }}</p>
            <a-table :columns="otherCryptosColumns" :pagination="false" :data-source="markets" :showHeader="false">
                <div slot="token" slot-scope="text, row" class="cursor" @click="redirectTo(row)">
                    <a-row :gutter="16" class="col-alignment">
                        <!--  :src="row.logo" -->
                        <a-col :lg="4"><img :src="row.logo" height="24" /></a-col>
                        <a-col :lg="20">
                            <p class="btc-heading ml-2 fw-5 text-black mb-0">
                                {{ symbleName(row) }}
                            </p>
                            <p class="btc-desc mb-0 ml-2">{{ symbleFullName(row) }}</p>
                        </a-col>
                    </a-row>
                </div>
                <div slot="lastPrice" slot-scope="text, row" class="cursor" @click="redirectTo(row)">
                    <p class="btc-heading fw-5 text-black mb-0">{{ row.c }}</p>

                    <span :class="row.c - row.o < 0 ? 'red-active' : 'up-dark'">{{ getlimitprice(row) }}%<img :src="limitPrice(row.c, row.o) < 0
                        ? '/images/red-up-arrow.svg'
                        : '/images/green-blue-up-arrow.svg'
                        " height="12" width="auto" class="ml-1 mb-1" /></span>
                </div>
            </a-table>
        </a-card>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
    data() {
        return {
            otherCryptosColumns: [
                {
                    dataIndex: "token",
                    key: "token",
                    scopedSlots: { customRender: "token" },
                    width: 120,
                },
                {
                    dataIndex: "lastPrice",
                    key: "lastPrice",
                    scopedSlots: { customRender: "lastPrice" },
                    width: 120,
                    align: 'end'
                },

            ],
            otherCryptosData: [
                {}
            ]
        }
    },

    computed: {
        ...mapGetters({
            markets: 'market/getSpotMarkets'
        }),
    },
    methods: {
        symbleName(row) {
            return row.symble.split('/')[0]
        },
        symbleFullName(row) {
            const currency = this.$store.state.currencyinfos.find((info) => info.currencyname.toLowerCase() == row.symble.split('/')[0].toLowerCase())
            if (currency) {
                return currency.fullname
            }
        },
        redirectTo(row) {
            const symble = row.symble.replace('/', '_').toLowerCase()
            return this.$router.push('/deal-pro/' + symble)
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
    },
}
</script>

<style></style>