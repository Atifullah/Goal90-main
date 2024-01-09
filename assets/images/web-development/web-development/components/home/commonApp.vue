<template>
    <div class="bitnasdaq-app">
        <div class="top-sec">
            <a-row>
                <a-col :xxl="{ span: 10, offset: 7 }" :xl="{ span: 10, offset: 7 }" :lg="{ span: 14, offset: 5 }">
                    <p class="mb-2 text-center extensive-product fw-6">{{ $t('home_page.hp20') }}</p>
                    <p class="text-center buy-sell-txt fw-4 bottom-sec mb-0">{{ $t('home_page.hp21') }}
                    </p>
                </a-col>
            </a-row>
            <div class="main-content">
                <strategyMarquee :list="StrategyDataa" v-if="StrategyDataa.length > 0" />
            </div>
        </div>
        <div class="product-bg top-sec mb-1">
            <div class="main-content">
                <p class="mb-2 text-center extensive-product fw-6">{{ $t('home_page.hp10') }}</p>
                <p class="text-center buy-sell-txt fw-4 bottom-sec mb-0">{{ $t('home_page.hp11') }}</p>
                <div class="product-suite">
                    <div class="product1" v-for="(list, key) in productList" :key="key">
                        <div @mouseover="hoverKey = key" @mouseleave="hoverKey = -1">
                            <nuxt-link :to="list.link">
                                <a-card class="product-card" :bordered="false">
                                    <!-- <img :src="hoverKey == key ? list.img_active : list.img" class="mb-4" /> -->
                                    <svg width="76" height="76" class="mb-4">
                                        <use
                                            :xlink:href="hoverKey == key ? `/images/svg/home.svg#${list.img_active}` : `/images/svg/home.svg#${list.img}`">
                                        </use>
                                    </svg>
                                    <p class="product-title fw-5 mb-2">{{ list.title }}</p>
                                    <p class="product-desc fw-4 mb-0">{{ list.desc }}</p>
                                </a-card>
                            </nuxt-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import moment from 'moment';
import strategyMarquee from './strategyMarquee.vue'

import { btcCtid } from '~/plugins/constants'
export default {
    name: 'CommonApp',
    components: {
        strategyMarquee
    },
    mounted() {
        this.getStrategies()
    },
    data() {
        return {

            hoverKey: -1,
            StrategyDataa: [],
            productList: [
                {
                    img: 'product1-icon',
                    img_active: 'product1-active-icon',
                    link: '/p2p/buy-and-sell',
                    title: 'P2P Trading',
                    desc: this.$t('bitapp.bta1')
                },
                {
                    img: 'product2-icon',
                    img_active: 'buy-crypto-active-icon',
                    link: `/contract-pro/btc_yx?ctid=${btcCtid}`,
                    title: this.$t('bitapp.spot_and_future'),
                    desc: this.$t('bitapp.bta2')
                },
                {
                    img: 'product3-icon',
                    img_active: 'product3-active-icon',
                    title: this.$t('demo_account'),
                    link: '/financial',
                    desc: this.$t('practice_refining_your_trading')
                },
                {
                    img: 'product4-icon',
                    img_active: 'product4-active-icon',
                    link: '/strategy-bot',

                    title: this.$t('stratergybot.sb1'),
                    desc: this.$t('bitapp.bta4')
                }
            ]
        }
    },
    computed: {

        defaultCoinCtid() {
            return btcCtid
        }
    },
    methods: {

        getStrategies() {
            this.$store.dispatch('querytopstrategy_get', { pageIndex: 1, pageSize: 30, strategyType: 1, orderType: 1 }).then((data) => {
                if (data) {

                    let StrategyDataa = data.data.pagedata;
                    StrategyDataa = StrategyDataa.map(item => {
                        const Symbol = this.$store.state.symbleinfos.find((symbol) => symbol.id == item.ctid)
                        item.fcurrencyname = Symbol.fcurrencyname
                        let createTime = moment.tz(item.createtime, 'Etc/GMT').local();
                        let nowTime = moment();
                        var duration = moment.duration(nowTime.diff(createTime));
                        var days = Math.floor(duration.asDays());
                        var hours = duration.hours();
                        var minutes = duration.minutes();
                        item.running_days = `${days}`;
                        item.running_hours = `${hours}`;
                        item.running_mints = `${minutes}`;
                        item.copynum = item.copynum.toLocaleString()
                        item.incomerate = item.incomerate.toFixed(2)
                        item.profit = item.profit.toFixed(2)
                        item.tradenum = parseInt(item.tradenum)
                        const coinid = (Symbol.fcurrencyname + '_' + Symbol.tcurrencyname).toLowerCase()
                        let redirecTo = '/deal-pro/' + coinid + '?strategy-bot-id=' + item.id
                        if (this.strategyType == 1) {
                            redirecTo = '/deal-pro/' + coinid + '?strategy-bot-id=' + item.id
                        } else if (this.strategyType == 2) {
                            redirecTo = '/margin-pro/' + coinid + '?strategy-bot-id=' + item.id
                        }
                        else if (this.strategyType == 3) {
                            redirecTo = '/contract-pro/' + coinid + '?strategy-bot-id=' + item.id
                        }

                        item.redirecTo = redirecTo
                        return item;
                    })

                    this.StrategyDataa = StrategyDataa

                }
            })

        },
        getSymble(s) {
            const symble = s.toLowerCase();
            //console.log('symb:', s);

            const obj = this.$store.state.symbleinfos.find((sinfo) => sinfo.descriptions.toLowerCase().includes(symble))
            //console.log('objJJ: ', obj)
            const des = obj.descriptions.split("/");
            return {
                from: des[0],
                to: des[1],
            };
        },
    },


}
</script>



