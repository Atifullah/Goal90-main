<template>
    <div>
        <!-- FIRST SECTION START BELOW -->
        <div class="home-banner">
            <div class="banner-content-img">
                <img src="/images/home-banner.png" width="100%" />
            </div>
            <div class="home-banner-row">
                <div class="main-content">
                    <a-row :gutter="16" v-if="Userlogin">
                        <a-col :lg="24">
                            <div class="top-slider">
                                <template v-if="loadingPromotions">
                                    <AppLoading height="416px" backgroundColor="transparent" />
                                </template>
                                <template v-else>
                                    <a-carousel autoplay ref="OneCarousel" :autoplaySpeed="900" dotPosition="right"
                                        :dots="true" :afterChange="(item) => antCarousel = item" v-if="showCarousel">
                                        <a-row :gutter="16" v-for="(promotion, key) in  promotions " :key="key">
                                            <a-col :lg="11">
                                                <a :href="promotion.articlehref ? promotion.articlehref : 'javascript:;'"
                                                    :target="promotion.articlehref ? '_blank' : '_self'">
                                                    <div class="login-home">
                                                        <p class="join-us-heading fw-5 mb-2">{{ promotion.title }}</p>
                                                        <p class="exchange-heading fw-5 mb-0 pt-3"> {{
                                                            promotion.shortdescription }}
                                                        </p>
                                                        <a-row :gutter="10" class="pt-4 mt-3">
                                                            <a-col :lg="24">
                                                                <a-button class="primary-btn fw-5 mr-3 px-5">
                                                                    {{ promotion.source }}
                                                                </a-button>
                                                            </a-col>
                                                        </a-row>
                                                    </div>
                                                </a>
                                            </a-col>
                                            <a-col :lg="13" align="end" class="">
                                                <a :href="promotion.articlehref ? promotion.articlehref : 'javascript:;'"
                                                    :target="promotion.articlehref ? '_blank' : '_self'">
                                                    <img :src="promotion.imgurl" class="pl-5" height="409" width="100%" />
                                                </a>
                                            </a-col>

                                        </a-row>

                                        
                                    </a-carousel>
                                    <template v-if="promotions.length > 1">
                                        <div class="slider-top-arrow">
                                            <img :src="antCarousel == 0 ? '/images/uparrow.png' : '/images/uparrow-acitve.png'"
                                                @click="antCarousel == 0 ? () => { } : $refs.OneCarousel.prev()"
                                                class="pointer" />
                                        </div>
                                        <div class="slider-down-arrow">
                                            <img :src="antCarousel == 2 ? '/images/downarrow.png' : '/images/downarrow-active.png'"
                                                @click="antCarousel == 2 ? () => { } : $refs.OneCarousel.next()"
                                                class="pointer" />
                                        </div>
                                    </template>
                                </template>
                            </div>
                        </a-col>
                    </a-row>

                    <a-row :gutter="16" v-else>

                        <a-col :lg="12" :xl="11">

                            <div class="login-home">
                                <a :href="activeCarouselPromotion.articlehref ? activeCarouselPromotion.articlehref : 'javascript:;'"
                                    :target="activeCarouselPromotion.articlehref ? '_blank' : '_self'">
                                    <div class="h-sec">
                                        <p class="join-us-heading fw-5 mb-2">
                                            {{ activeCarouselPromotion ? activeCarouselPromotion.title : '' }}
                                        </p>
                                        <p class="exchange-heading fw-5 mb-0 pt-2">
                                            {{ activeCarouselPromotion ? activeCarouselPromotion.shortdescription : '' }}
                                        </p>
                                    </div>
                                </a>
                                <a-form-model :model="getStartedForm" ref="ticketForm" :rules="rules"
                                    :hide-required-mark="true" label-align="left">
                                    <a-row :gutter="12" class="pt-4 mt-3 login-input-icon">
                                        <a-col :lg="10" :xl="10">
                                            <AppFormModelItem prop="email">
                                                <a-input class="home-input fw-4" :placeholder="$t('placeholders.plh11')"
                                                    v-model="getStartedForm.email" />
                                            </AppFormModelItem>

                                        </a-col>
                                        <a-col :lg="6" :xl="5"><a-button class="get-btn outline-btn fw-5"
                                                @click="getStarted" block>{{
                                                    $t('home_page.home_start') }}</a-button></a-col>
                                        <a-col :lg="4" :xl="3" class="pointer" @mouseover="hoverKey = 1"
                                            @mouseleave="hoverKey = -1">
                                            <a :href="appleStoreLink" target="_blank">
                                                <img
                                                    :src="hoverKey == 1 ? '/images/apple2-active.svg' : '/images/apple2.svg'" />
                                            </a>
                                        </a-col>
                                        <a-col :lg="4" :xl="3" class="pointer pl-0" @mouseover="hoverKey = 2"
                                            @mouseleave="hoverKey = -1">
                                            <a :href="googleLinkLink" target="_blank">
                                                <img
                                                    :src="hoverKey == 2 ? '/images/google-active.svg' : '/images/google.svg'" />
                                            </a>
                                        </a-col>
                                         
                                    </a-row>
                                </a-form-model>
                            </div>

                        </a-col>

                        <a-col :lg="12" :xl="13">
                            <div class="top-slider">
                                <a-carousel :autoplay="true" ref="OneCarousel" :autoplaySpeed="900" dotPosition="right"
                                    :dots="true" :afterChange="promotionCarouselChange" v-if="showCarousel">

                                    <a :target="promotion.articlehref ? '_blank' : '_self'"
                                        :href="promotion.articlehref ? promotion.articlehref : 'javascript:;'"
                                        v-for="( promotion, key ) in  promotions " :key="key">
                                        <img :src="promotion.imgurl" height="409" class="pr-5" width="100%" />
                                    </a> 
                                </a-carousel>

                                <template v-if="promotions.length > 1">
                                    <div class="slider-top-arrow">
                                        <img :src="antCarousel == 0 ? '/images/uparrow.png' : '/images/uparrow-acitve.png'"
                                            @click="antCarousel == 0 ? () => { } : $refs.OneCarousel.prev()"
                                            class="pointer" />
                                    </div>
                                    <div class="slider-down-arrow">
                                        <img :src="antCarousel == 2 ? '/images/downarrow.png' : '/images/downarrow-active.png'"
                                            @click="antCarousel == 2 ? () => { } : $refs.OneCarousel.next()"
                                            class="pointer" />
                                    </div>
                                </template>

                            </div>
                        </a-col>
                    </a-row>

                </div>
            </div>
        </div>
        <!-- FIRST SECTION END ABOVE -->

        <!-- SECOND SECTION START BELOW  -->
        <a-row class="list-price-card">
            <div class="main-content">
                <!-- SWIPER MARKET START -->
                <a-col :lg="24" class="">
                    <swiper class="pb-2" :getClientExchangeRate="getClientExchangeRate" />
                </a-col>
                <!-- SWIPER MARKET END -->
                <a-col :lg="24" class="top-sec">
                    <a-row :gutter="16">
                        <!-- TRADE TABLE STARTED HERE -->
                        <a-col :lg="13" :xl="14" class="pr-5">
                            <div class="bottom-sec">
                                <p class="home-new-heading fw-6 mb-2">{{ $t('home_page.hp17') }}</p>
                                <p class="time-heading fw-4 mb-0"> {{ $t('home_page.hp18') }} </p>
                            </div>
                            <div class="left-tabs">
                                <a-card :bordered="false" class="table-card main-card-market">
                                    <a-tabs default-active-key="1" v-model="activeTab" @change="changeTab">
                                        <a-tab-pane key="1" :tab="$t('home_page.spot_home')">
                                            <a-card :bordered="false" class="table-card">
                                                <trade :getSymble="getSymble" :getClientExchangeRate="getClientExchangeRate"
                                                    :marketdata="getDataArray" tab="0" />
                                            </a-card>
                                        </a-tab-pane>
                                        <a-tab-pane key="2" :tab="$t('home_page.margin_home')">
                                            <a-card :bordered="false" class="table-card">
                                                <trade :getSymble="getSymble" :getClientExchangeRate="getClientExchangeRate"
                                                    :marketdata="getDataArray" tab="-1" :symbleinfos="symbleinfos" />
                                            </a-card>
                                        </a-tab-pane>
                                        <a-tab-pane key="3" :tab="$t('home_page.future_home')">
                                            <a-card :bordered="false" class="table-card">
                                                <trade tab="1" :getSymble="getSymble"
                                                    :getClientExchangeRate="getClientExchangeRate"
                                                    :marketdata="getDataArray" />
                                            </a-card>
                                        </a-tab-pane>
                                        <div slot="tabBarExtraContent">
                                            <nuxt-link to="/market">
                                                <p class="mb-0 read-more fw-5 grey-active text-right pointer">{{
                                                    $t('home_page.hp6') }}</p>
                                            </nuxt-link>
                                        </div>
                                    </a-tabs>
                                </a-card>
                            </div>
                        </a-col>
                        <!-- TRADE TABLE ENDED ABOVE -->

                        <!-- NEWS  STARTED HERE -->
                        <a-col :lg="11" :xl="10">
                            <div class="bottom-sec">
                                <p class="home-new-heading fw-6 mb-2">{{ $t('home_page.hp7') }}</p>

                                <a-row :gutter="16" class="col-alignment">
                                    <a-col :lg="20">
                                        <p class="time-heading fw-4 mb-0"> {{ $t('home_page.hp19') }}</p>
                                    </a-col>
                                    <a-col :lg="4" align="end">
                                        <nuxt-link to="/news">
                                            <p class="mb-0 more-news gray-active fw-5 update-time">{{ $t('home_page.hp31')
                                            }}</p>
                                        </nuxt-link>

                                    </a-col>
                                </a-row>
                            </div>
                            <div>
                                <News />
                            </div>
                        </a-col>
                        <!-- NEWS  ENDED ABOVE -->
                    </a-row>
                </a-col>
            </div>
            <!-- THIRD SECTION  (STRATEGY PROFILE SHOW IN THERE)-->
            <a-col :lg="24">
                <commonApp />
            </a-col>
            <!-- THIRD SECTION  -->

        </a-row>
        <div class="community-bg1" :bordered="false" id="join-common-community">
            <div class="main-content">
                <Community />
            </div>
        </div>
        <a-row class="get-in-touch">
            <div class="main-content">
                <a-col :lg="24" class="sec-mb">
                    <GetInTouch />
                </a-col>
            </div>
        </a-row>
        <a-row class="start-trading">
            <div class="main-content">
                <a-col :lg="24" align="center" class="py-5 my-3">

                    <p class="extensive-product mb-2 fw-5">{{
                        $t('home_page.hp8') }}</p>
                    <p class="text-center buy-sell-txt fw-4 mb-4">{{ $t('home_page.hp22') }}</p>
                    <nuxt-link :to="'/deal-pro/btc_usdt?ctid=' + defaultCoinCtid">
                        <a-button class="primary-btn fw-5 px-5">{{
                            $t('home_page.hp9') }}</a-button></nuxt-link>

                </a-col>
            </div>
        </a-row>
    </div>
</template>

<script>
import commonApp from './commonApp.vue'
import trade from './trade.vue'
import Community from './Community.vue'
import swiper from './swiper.vue'
import GetInTouch from './GetInTouch.vue'
// import currency from './currency-figure.vue'
import Volume from './volume.vue'
import CurrencyCount from './currency-count.vue'
import News from './HomeNews.vue'
import AppFormModelItem from '../App/AppFormModelItem.vue'
import AppLoading from '../AppLoading.vue'
import { mapGetters, mapActions } from 'vuex'
import { promotionChannelId, icoLink, googleLinkLink, appleStoreLink, btcCtid } from '~/plugins/constants'
import moment from "moment"

export default {
    name: 'commonHome',
    components: {
        trade,
        swiper,
        // currency,
        commonApp,
        Volume,
        CurrencyCount,
        Community,
        GetInTouch,
        News,
        AppFormModelItem,
        AppLoading
    },
    watch: {
        '$store.state.symbleinfos': function (val) {
            this.symbleinfos = val;
            switch (this.activeTab) {
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
        },
        promotions: function (val) {
            this.activeCarouselPromotion = val[0] ? val[0] : {}
        },
    },
    computed: {
        googleLinkLink: function () {
            return googleLinkLink
        },
        appleStoreLink: function () {
            return appleStoreLink
        },
        ...mapGetters('article', ['getPromotions']),
        ...mapGetters('general', ['loadingPromotions']),
        Userlogin() {
            if (this.$userinfo.uid)
                return true
            else
                return false
        },
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
        promotions: function () {
           return  this.getPromotions.concat(this.getPromotions)
        },
        icoLink() {
            return icoLink
        },
        defaultCoinCtid() {
            return btcCtid
        }
    },
    data() {
        return {
            // timer: '',
            // overtime: '',
            timer: {
                day: 0,
                hour: 0,
                min: 0,
                sec: 0,
                percentageCount: 0,
                percentage: 0,
                style: '',
            },

            activeCarouselPromotion: {
                title: '',
                shortdescription: ''
                // title: 'BitNasdaq Global ICO in progress',
                // shortdescription: 'Your dedication and trust will be greatly rewarded sincerely invite you to join us!'
            },
            antCarousel: 0,
            activeTab: "1",
            activeTab1: "0",
            searchvalue: '',
            showCarousel: false,
            loading: false,
            marketdata: [],
            favoritecoinlist: [],
            marketdata_recommend: [],
            marketdata_recommend_future: [],
            marketdata_futrue: [],
            marketdata_spot: [],
            marketdata_margin: [],
            sockettype: 0,
            symbleinfos: [],
            visible: false,
            volumeData: [],
            hoverKey: -1,
            getStartedForm: {
                email: ''
            },
            rules: {
                email: [
                    { required: true, message: this.$t('messages.msg1') },
                    {
                        type: 'email',
                        message: this.$t('messages.msg2'),
                    },
                ],
            },
            listImages: [
                {
                    // link: '/play-card',
                    // img: '/images/play-card-slider.svg'
                },
                {
                    // link: 'https://bitnasdaq.com',
                    // img: '/images/bit-card-slider.png'
                },
                {
                    // link: 'https://ico.bitnasdaq.com',
                    // img: '/images/ico-card-slider.png'
                }
            ]
        };
    },
    methods: {
        ...mapActions('article', ['fetchPromotions']),
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
        },

        getStarted() {

            this.$refs.ticketForm.validate((valid) => {
                //console.log('valid:::', valid);
                if (valid) {
                    this.$store.commit('auth/setTempData', {
                        email: this.getStartedForm.email
                    })
                    this.$router.push({ path: '/register', query: { email: this.email } })
                }

            })

        },
        afterVisibleChange(val) {
        },
        showDrawer() {
            this.visible = true;
        },
        onClose() {
            this.visible = false;
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
        _getDailyAlL(itype) {
            const _self = this;
            let _symbles = this.$store.state.symbleinfos;
            if (_symbles.length > 0) {
              this.$store.dispatch('quotation_daily_getall', {
                    iscontract: itype,
                    displaylocation: 1,
                    pageIndex: 1,
                    pageSize: 7
                }).then(({ data }) => {
                    _self.marketdata_spot = [];
                    _self.marketdata_recommend = [];
                    _self.marketdata_recommend_future = [];
                    _self.marketdata_margin = [];
                    _self.marketdata_futrue = [];
                    data.pagedata.forEach(item => {
                        var symbledatas = _symbles.filter(citem => {
                            return citem.id == item.ctid
                        })
                        if (symbledatas.length > 0) {
                            if (symbledatas[0].itype == 0) {
                                _self.marketdata_spot.push(item);
                                if (symbledatas[0].property.slice(0, 1) == "1") {
                                    _self.marketdata_recommend.push(item);
                                }
                                if (symbledatas[0].borrowmultiple > 0) {
                                    _self.marketdata_margin.push(item);
                                }
                            } else {
                                _self.marketdata_futrue.push(item);
                            }
                        }
                    });
                    if (itype == 0) {
                        this.marketdata = this.marketdata_spot;
                    }
                    if (itype == 1) {
                        this.marketdata = this.marketdata_futrue;
                        console.log('this.marketdata', this.marketdata)
                    }
                    if (itype == -1) {
                        this.marketdata = this.marketdata_margin;
                    }
                    //_self.changeTab(_self.activeTab);
                    this.loading = false;
                    _self.$nextTick(() => {
                        _self.connectsocket(itype);
                    });
                })
          }
            
        },
        connectsocket(itype) {
            let _self = this;
            this.$socket.uninvoke({
                sub: "market." + this.sockettype + ".tickers",
                type: _self.$socket.type.quotation_daily_getall,
            });
            this.sockettype = (itype == 0 ? 0 : itype);
            this.$socket.invoke({
                sub: "market." + this.sockettype + ".tickers",
                type: _self.$socket.type.quotation_daily_getall,
            });
            this.$socket.receive(_self.$socket.type.quotation_daily_getall, _self.callback);
        },
        promotionCarouselChange(index, b, c) {
            //console.log(index);
            if (index == 1) {
                this.activeCarouselPromotion = {
                    title: 'BitNasdaq Global ICO in progress',
                    shortdescription: 'Your dedication and trust will be greatly rewarded sincerely invite you to join us!',
                    articlehref: icoLink
                }
            } else {
                this.activeCarouselPromotion = this.promotions[index]
            }
        },
        setovertime() {
            const _self = this
            this.$store.dispatch('com_test', {}).then((res) => {
                const startTime = moment.tz(res.data.utcnow, 'Etc/GMT').local()
                const launchTime = moment.tz('2024-01-01 00:00:00', 'Etc/GMT').local()

                let from = new Date(startTime);
                const to = new Date(launchTime)


                if (_self.timer) {
                    clearInterval(_self.timer)
                    _self.timer = {
                        day: 0,
                        hour: 0,
                        min: 0,
                        sec: 0,
                        percentageCount: 0,
                        percentage: 0,
                        style: '',
                    }
                }




                setInterval(() => {
                    from = new Date(from.getTime() + ((new Date()).getTime() - from.getTime()))
                    const intervaltime = moment.duration(to - from)

                    if (intervaltime._milliseconds < 0) {
                        clearInterval(_self.timer)
                        _self.timer = null
                        _self.overtime = '-- -- --'
                    } else {

                        let referenceDuration = moment.duration(launchTime.diff(startTime))
                        let nowTime = moment()
                        var duration = moment.duration(launchTime.diff(nowTime))
                        const percentage = ((duration.asMilliseconds() / referenceDuration.asMilliseconds()) * 100)

                        let customstyle = `background:linear-gradient(to right, #ffff ${percentage - 20}%, #F8A400 ${(80 - percentage)}%)`


                        this.timer = {
                            day: intervaltime._data.days + intervaltime._data.months * 30,
                            hour: intervaltime._data.hours,
                            min: intervaltime._data.minutes,
                            sec: intervaltime._data.seconds,
                            percentageCount: 0,
                            percentage: percentage,
                            style: customstyle,
                        }
                    }
                }, 1000)
            });
        },

        timerClock() {

            const LaunchTime = moment('2024-01-01 00:00:00')
            const StartTime = moment('2023-07-10 00:00:00')
            let referenceDuration = moment.duration(LaunchTime.diff(StartTime))
            let nowTime = moment()
            var duration = moment.duration(LaunchTime.diff(nowTime))
            const day = Math.floor(duration.asDays()).toString().padStart(2, '0')
            const hour = duration.hours().toString().padStart(2, '0')
            const min = duration.minutes().toString().padStart(2, '0')
            const sec = duration.seconds().toString().padStart(2, '0')
            this.timer.percentageCount++
            // if (this.timer.percentageCount == 5) {

            const percentage = ((duration.asMilliseconds() / referenceDuration.asMilliseconds()) * 100)
            this.timer.percentage = percentage
            let customstyle = `background: linear-gradient(to right, #ffff ${this.timer.percentage}%, #F8A400 ${(100 - this.timer.percentage)}%)`

            this.timer.style = customstyle
            // }

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
        }
    },
    mounted() {

        this.loading = true;
        this.showCarousel = true;
        this._getDailyAlL(0);
        this.fetchPromotions({ pageIndex: 1, pageSize: 30, channelId: promotionChannelId })

        this.setovertime()

        // setInterval(() => {
        //     this.timerClock()
        // })
    },
    beforeDestroy() {
        this.$socket.uninvoke({
            sub: "market." + this.sockettype + ".tickers",
            type: this.$socket.type.quotation_daily_getall,
        });
    },
}
</script>

<style lang="scss" >
.left-slider {
    border: 1px solid black;
    padding: 40px 10px;
    position: absolute;
    right: 0;
    display: flex;
    flex-direction: column;
}

.marqueeY-container {

    height: 500px;
    overflow: hidden;
    background: white;
    position: relative;
    box-sizing: border-box;
}

.marqueeY-content {
    top: 0em;
    position: relative;
    box-sizing: border-box;
    animation: marquee 10s linear infinite;
}

.marqueeY-content:hover {
    animation-play-state: paused;
}

.mck-sidebox-launcher * {
    display: none;
}

@keyframes marquee {
    0% {
        trans: 2em
    }

    100% {
        top: -15em
    }
}

// .header-timer {
//     position: absolute;
//     height: 320px;
//     width: 320px;
//     left: 17.5%;
//     top: 16%;
//     margin: 0 auto;
//     text-align: center;
//     border-radius: 50%;
//     background: red;
//     z-index: 10;

//     .timer-container {
//         height: 315px;
//         width: 315px;
//         margin: 0 auto;
//         text-align: center;
//         border-radius: 50%;
//         background: white;
//     }
// }</style>
