<template>
    <div id="works-card">
        <a-card class="gray-card px-4 py-4 mb-5" :bordered="false">
            <a-row :gutter="16" class="col-alignment">
                <a-col :lg="12">
                    <p class="mb-0 how-p2p-works fw-5">{{$t('p2p.wc1')}}</p>
                </a-col>
                <a-col :lg="12" align="end">
                    <div class="button-bg">
                    <a-button class="mr-1 fw-5" :class="direction==-1 ? 'buy-crypto': 'sell-crypto'" @click="direction = -1">{{$t('p2p.wc2')}}</a-button>
                    <a-button class="fw-5" :class="direction==1 ? 'buy-crypto': 'sell-crypto'" @click="direction = 1">{{$t('p2p.wc3')}}</a-button>
                    </div>
                </a-col>
            </a-row>
            <a-row class="pt-4 mt-3" :gutter="24">
                <a-col :lg="8" v-for="(list, key) in workDetails" :key="key">
                    <a-card :bordered="false" class="px-4 pb-5 pt-4 white-gray-card">
                        <a-row :gutter="16" class="col-alignment" v-if="direction == -1">
                            <a-col :lg="12"><img :src="list.img" class="white-card-img"/></a-col>
                            <a-col :lg="12" align="end"><img :src="list.img1" /></a-col>
                        </a-row>
                        <a-row :gutter="16" class="col-alignment" v-if="direction == 1">
                            <a-col :lg="12"><img :src="list.img2" class="white-card-img"/></a-col>
                            <a-col :lg="12" align="end"><img :src="list.img12" /></a-col>

                        </a-row>
                        <p class="list-title fw-5 mb-2 mt-4" v-if="direction == -1">{{ list.title }}</p>
                        <p class="list-title fw-5 mb-2 mt-4" v-if="direction == 1">{{ list.title1 }}</p>
                        <p class="mb-0 list-desc fw-5" v-if="direction == 1">{{ list.desc1 }}</p>

                        <p class="mb-0 list-desc fw-5" v-if="direction == -1">{{ list.desc }}</p>
                    </a-card>
                </a-col>
            </a-row>
        </a-card>
        <a-row class="mx-4" :gutter="16">
            <p class="how-p2p-works fw-5 mb-5">{{$t('p2p.wc4')}}</p>

            <a-col :lg="16" class="pl-0 pt-3">

                <!-- <p class="transaction-fee-desc mb-5 mx-4 pl-3">{{$t('p2p.wc5')}}</p> -->
                <a-row :gutter="16" class="">
                    <!-- <a-col :lg="4"><img :src="list.img"/></a-col> -->
                    <a-col :lg="12" class="mb-4 pb-3"  v-for="(list,key) in getTransactionFee" :key="key"><p class="mb-2 transaction-fee fw-5">{{ list.title }}</p>
                 <p class="transaction-fee-desc fw-5 pr-5 mb-0">{{ list.desc }}</p>
                    </a-col>
                </a-row>
            </a-col>
            <a-col :lg="8" align="center">
                <img src="/images/advantage.svg"/>
            </a-col>
        </a-row>
    </div>
</template>

<script>
export default {
    data() {
        return {
            direction: -1,
            workDetails: [
                {
                    img: "/images/your-ad.svg",
                    img1: "/images/gray-arrow.svg",
                    title: this.$t("tableskeys.wc1"),
                    title1: this.$t('description.title1'),
                    img2: "/images/your-ad.svg",
                    img12: "/images/gray-arrow.svg",
                    desc1: this.$t('description.des32'),
                    desc: this.$t('description.des18')
                },
                {
                    img: "/images/pay-seller.svg",
                    img1: "/images/gray-arrow.svg",
                    title: this.$t("tableskeys.wc2"),
                    title1: this.$t('description.title2'),
                    img2: "/images/your-crypto.svg",
                    img12: "/images/gray-arrow.svg",
                    desc1: this.$t('description.des33'),
                    desc: this.$t('description.des19')
                },
                {
                    img: "/images/your-crypto.svg",
                    img1: "",
                    title1: this.$t('description.title3'),
                    title: this.$t("tableskeys.wc3"),
                    img2: "/images/pay-seller.svg",
                    img12: "",
                    desc1: this.$t('description.des34'),
                    desc: this.$t('description.des20')
                }
            ],
            getTransactionFee: [
                {
                    // img: '/images/discount.svg',
                    title: this.$t("tableskeys.wc4"),
                    desc: this.$t('description.des21'),
                },
                {
                    // img: '/images/flexible.svg',
                    title: this.$t("tableskeys.wc5"),
                    desc: this.$t('description.des22'),
                },
                {
                    // img: '/images/trade-chart.svg',
                    title: this.$t("tableskeys.wc6"),
                    desc: this.$t('description.des23'),
                },
                {
                    // img: '/images/shield-security.svg',
                    title: this.$t("tableskeys.wc7"),
                    desc: this.$t('description.des24'),
                },
                {
                    // img: '/images/trade-chart.svg',
                    title: this.$t("tableskeys.wc11"),
                    desc: this.$t('description.des35'),
                },
                {
                    // img: '/images/shield-security.svg',
                    title: this.$t("tableskeys.wc12"),
                    desc: this.$t('description.des36'),
                }
            ]

        }
    }
}
</script>
<style lang="scss">
@import '@/assets/scss/components/p2p-modules/works-card.scss';
</style>
