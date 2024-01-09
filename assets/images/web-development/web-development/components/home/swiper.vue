<template>
    <div>
        <!-- FIRST SECTION START -->
        <div class="market-card">
                <a-row :gutter="16" class="">
                    <a-col :lg="6">
                        <nuxt-link :to="'/deal-pro/btc_usdt?ctid=' + defaultCoinCtid">
                            <a-card class="spot-detail-card" @mouseover="hoverKey = 1" @mouseleave="hoverKey = -1">
                                <a-row :gutter="16" class="col-alignment">
                                    <a-col :lg="7">
                                        <svg width="76" height="76" class="svg-icon">
      <use :xlink:href="hoverKey == 1 ? '/images/svg/sprite.svg#buy-crypto-active-icon':'/images/svg/sprite.svg#buy-crypto-icon'"></use>
    </svg>
                                    </a-col>
                                    <a-col :lg="17">
                                        <!-- <p class="mb-0 spot-price fw-7">{{ $store.getters.get_client_exchange_rate_name.mark }} -->
                                            <p class="mb-0 spot-price fw-7">$
                                            {{ spotMarketTotal
                                            }}</p>
                                        <p class="mb-0 time-heading fw-5">{{ $t('home.headSpotMargin') }}</p>
                                    </a-col>
                                </a-row>
                            </a-card>
                        </nuxt-link>
                    </a-col>

                    <a-col :lg="6">
                        <nuxt-link :to="'/contract-pro/btc_yx?ctid=' + defaultCoinCtid + '&contractType=1'">
                            <a-card class="spot-detail-card" @mouseover="hoverKey = 2" @mouseleave="hoverKey = -1">
                                <a-row :gutter="16" class="col-alignment">
                                    <a-col :lg="7">
                                        <!-- <img
                                            :src="hoverKey == 2 ? '/images/status-up-active.svg' : '/images/status-up.svg'" /> -->

                                        <!-- <img src="/images/status-up.svg" /> -->
                                        <svg width="76" height="76">
      <use :xlink:href="hoverKey == 2 ? '/images/svg/home.svg#status-up-active-icon':'/images/svg/home.svg#status-up-icon'"></use>
    </svg>
                                    </a-col>
                                    <a-col :lg="17">
                                        <!-- <p class="mb-0 spot-price fw-7">{{ $store.getters.get_client_exchange_rate_name.mark }} -->
                                            <p class="mb-0 spot-price fw-7">$
                                            {{ futureMarketTotal
                                            }}</p>
                                        <p class="mb-0 time-heading fw-5">{{ $t('person.Future_person') }}</p>
                                    </a-col>
                                </a-row>
                            </a-card>
                        </nuxt-link>
                    </a-col>
                    <a-col :lg="6">
                        <nuxt-link to="/strategy-bot">
                            <a-card class="spot-detail-card" @mouseover="hoverKey = 3" @mouseleave="hoverKey = -1">
                                <a-row :gutter="16" class="col-alignment">
                                    <a-col :lg="7">
                                        <!-- <img
                                            :src="hoverKey == 3 ? '/images/chart1-active.svg' : '/images/chart1.svg'" /> -->

                                        <!-- <img src="/images/chart1.svg" /> -->
                                        <svg width="76" height="76">
      <use :xlink:href="hoverKey == 3 ? '/images/svg/home.svg#chart1-active-icon':'/images/svg/home.svg#chart1-icon'"></use>
    </svg>
                                    </a-col>
                                    <a-col :lg="17">
                                        <p class="mb-0 spot-price fw-7">{{ strategyMarketTotal }}%</p>
                                        <p class="mb-0 time-heading fw-5">{{ $t('stratergybot.sb16') }}</p>
                                    </a-col>
                                </a-row>
                            </a-card>
                        </nuxt-link>
                    </a-col>
                    <a-col :lg="6">
                        <nuxt-link to="/market">
                            <a-card class="spot-detail-card" @mouseover="hoverKey = 4" @mouseleave="hoverKey = -1">
                                <a-row :gutter="16" class="col-alignment">
                                    <a-col :lg="7">
                                        <!-- <img
                                            :src="hoverKey == 4 ? '/images/bitcoin-convert-active.svg' : '/images/bitcoin-convert.svg'" /> -->

                                        <!-- <img src="/images/bitcoin-convert.svg" /> -->
                                        <svg width="76" height="76">
      <use :xlink:href="hoverKey == 4 ? '/images/svg/home.svg#bitcoin-convert-active-icon':'/images/svg/home.svg#bitcoin-convert-icon'"></use>
    </svg>
                                    </a-col>
                                    <a-col :lg="17">
                                        <p class="mb-0 spot-price fw-7">{{ currencyCount }}</p>
                                        <p class="mb-0 time-heading fw-5">{{ $t('cryptolistingsteps.cls9') }}</p>
                                    </a-col>
                                </a-row>
                            </a-card>
                        </nuxt-link>
                    </a-col>

                </a-row>
        </div>
        <!-- FIRST SECTION END -->

        <!-- SECOND SECTION START-->
        <a-row class="mt-4  mb-4">
            <a-col :lg="24" class="mt-4  mb-4">
                <BannerArticle />
            </a-col>
        </a-row>

        <!-- SECOND SECTION END -->

        <!-- THIRD SECTION START -->
        <div class="swiper-container" v-if="swiperBannel.length > 0">
            <no-ssr>
                <carousel :perPage="swiperBannel.length" :loop="true"
                    :autoplay="true" :perPageCustom="[ [1100, 4],[1200, 4]]" >
                    <slide v-for="(bannel, index) in swiperBannel" :key="index">
                        <a v-if="bannel.articlehref" :href="bannel.articlehref" target="_blank">
                            <img class="swiper-container-img" :src="bannel.imgurl" alt="">
                        </a>
                        <img class="swiper-container-img" v-else :src="bannel.imgurl" alt="">
                    </slide>
                </carousel>
            </no-ssr>
        </div>
        <!-- THIRD SECTION END -->
    </div>
</template>

<script>
import carousel from '@/plugins/carousel/Carousel';
import slide from '@/plugins/carousel/Slide';
import navigation from '@/plugins/carousel/Navigation';
import BannerArticle from './banner-article.vue'
import { btcCtid } from '~/plugins/constants'
import { mapActions, mapGetters } from "vuex";
export default {
    name: 'swiper',
    components: {
        carousel, slide, navigation, BannerArticle
    },
    created() {
        if (process.client) {
            this.getarticle()
            this.setSymbolTotal()
        }
    },
    mounted() {
        this.calculateVolumeData();
    },

    props: {
        spotMarket: {
            type: Array,
            default: () => []
        },
        futureMarket: {
            type: Array,
            default: () => []
        },
        getClientExchangeRate: {
            type: Function,
        }
    },

    data() {
        return {
            swiperBannel: [],
            spotMarketTotal: 0,
            strategyMarketTotal: 0,
            futureMarketTotal: 0,
            currencyCount: 0,
            hoverKey: -1
        }
    },

    watch: {
        '$store.state.hex_lang.locale': function (val) {
            this.getarticle()
        },
       
        '$store.state.symbleinfos': function (val) {
            this.setSymbolTotal()
        },
        '$store.getters.get_client_exchange_rate_name.mark': function (val) {
            this.calculateVolumeData()
        },
        '$store.state.constants.streagy': function (val) {
            this.getStrategyVolume()
        },
        '$store.state.constants.futrue': function (val) {
            this.futureMarketTotal = val + 'B'
        },
        '$store.state.constants.spot': function (val) {
            this.spotMarketTotal = val + 'B'
        },
    },


    computed: {
        defaultCoinCtid() {
            return btcCtid
        }
    },
    methods: {
      ...mapGetters("constants", ["getStreagy" , "getFutrue", "getSpot"]),
        ...mapActions("article", [
            "fetchArticles",
        ]),
       
        //VOLUME DATA SECTION(A) STARTED
        //GETTING STRATEGY VOLUME
        getStrategyVolume() {
            console.log('====x====22222')
          if (process.client) {
            console.log('====x====1111')
            let x = this.getStreagy()
            console.log('====x====', x)
            x.map((item => {
                if (item.type == 'spot') {
                    this.strategyMarketTotal = item.annualinterestrate;
                }
            }))
          }
        },
        //SETTING TOTAL CRYPTOCURRENCY LISTED
        setSymbolTotal() {
            this.currencyCount = this.$store.state.symbleinfos.length;
        },
        //SETTTING SPOT AND FUTURE MARKET VOLUME
        calculateVolumeData() {
            this.spotMarketTotal = this.getSpot() + 'B'
            this.futureMarketTotal = this.getFutrue() + 'B'
            this.getStrategyVolume()
        },
        //SECTION 3 METHODS
        getarticle() {
            this.fetchArticles({   channelid: 2,
                pageindex: 1,
                pagesize: 12
            }).then((artical) => {
                this.swiperBannel = (artical.data && artical.data.pagedata) ? artical.data.pagedata : []
                // this.swiperBannel = this.swiperBannel.concat(this.swiperBannel);
                //console.log(this.swiperBannel)
            })
        }
        //SECTION 3 METHODS

    }
}
</script>
<style lang='less'>
.swiper-container-img {
    // width: 340px;
    // height: 165px;
    padding: 0 10px;
    display: inline-block;
    border-radius: 6px;
    cursor: pointer;
    transition: transform .5s;
}

.swiper-container .VueCarousel .VueCarousel-dot--active .VueCarousel-dot-button {
    background: #FFA500 !important;
    border-radius: 78px !important;
    width: 17px !important;
}

.swiper-container .VueCarousel .VueCarousel-dot-button {
    background: #EBEBEB !important;
    height: 7px !important;
    width: 7px !important;
}

.VueCarousel-dot-container {
    margin-top: 35px !important;
}

.swiper-container-img:hover {
    transform: scale(1.03);
    transition: transform .5s;
}

.swiper-container a {
    display: inline-block;
}

.swiper-container {
    margin: auto;
}

@media (min-width: 1440px)  {

    // .swiper-container {
    //     width: 1230px;
    //     margin: auto;
    // }

    // .swiper-container {
    //     width: 1440px;
    //     margin: auto;
    // }

    // .swiper-container-img {
    //     width: 345px;
    // }
}


.swiper-container {
    .VueCarousel .VueCarousel-dot {
        margin-top: 0 !important;
        padding: 0 4px !important;
    }


    .VueCarousel .VueCarousel-inner .VueCarousel-slide:first-child {
        text-align: center;
    }

    .VueCarousel .VueCarousel-inner .VueCarousel-slide:nth-child(3n+0) {
        text-align: center;
    }

    .VueCarousel .VueCarousel-slide {
        text-align: center;
        margin: 6px 0px;
    }

    .VueCarousel .VueCarousel-dot-button:focus {
        outline: none;
    }
    .swiper-slide {
        text-align: center;
        font-size: 18px;
        background: #fff;
        width: 390px !important;
        margin-right: 15px;
        align-items: center;
        height: 133px;
        box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.1);
    }

}
</style>

