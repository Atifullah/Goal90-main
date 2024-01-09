<template>


    <div id="side-bar">
        <div class="side-menu">
            <a-menu :open-keys.sync="openKeys" v-model="selectedKey" mode="inline" @click="handleClick">
                <a-sub-menu key="sub1" @titleClick="titleClick">
                    <span slot="title" class="user-center">{{ $t('person.trading') }}</span>
                    <a-menu-item :key="selfRoute.buyAndSell" class="home-first sidebar-border"
                        @mouseover="hoverKey = selfRoute.buyAndSell" @mouseleave="hoverKey = ''"><nuxt-link
                            :to="{ path: selfRoute.buyAndSell }"><img
                                :src="(selectedKey[0] == selfRoute.buyAndSell || hoverKey == selfRoute.buyAndSell) ? '/images/buy-sell-active.svg' : '/images/buy-sell.svg'"
                                class="sidebar-icon" />{{ $t('person.buyandsell') }}</nuxt-link>
                    </a-menu-item>
                    <a-menu-item :key="selfRoute.p2pAccount" >
                        <a-row :gutter="16">
                        <a-col :lg="20">
                            <nuxt-link :to="{ path: selfRoute.p2pAccount }" class="p2p-account-txt"><img
                                :src="(selectedKey[0] == selfRoute.p2pAccount || hoverKey == selfRoute.p2pAccount) ? '/images/p2p-account-active.svg' : '/images/p2p-account-icon.svg'"
                                class="sidebar-icon" />{{ $t('person.p2paccount') }}
                        </nuxt-link>
            </a-col>
                        <a-col :lg="4">
                <img @click="$router.push('/person/p2p')" src="/images/external-link.svg" />
            </a-col>
            </a-row>
                    </a-menu-item>

                    <a-menu-item :key="selfRoute.paymentMethod" @mouseover="hoverKey = selfRoute.paymentMethod"
                        @mouseleave="hoverKey = ''"><nuxt-link :to="{ path: selfRoute.paymentMethod }">
                            <img :src="(selectedKey[0] == selfRoute.paymentMethod || hoverKey == selfRoute.paymentMethod) ? '/images/payment-methods-active.svg' : '/images/payment-methods.svg'"
                                class="sidebar-icon" />{{ $t('person.paymentmethod') }}</nuxt-link></a-menu-item>

                </a-sub-menu>

                <a-sub-menu key="sub2" @titleClick="titleClick">
                    <span slot="title" class="sub-item fw-6"> {{ $t('person.advertisment') }}</span>
                    <a-menu-item :key="selfRoute.postNewAd" @mouseover="hoverKey = selfRoute.postNewAd"
                        @mouseleave="hoverKey = ''"><nuxt-link :to="{ path: selfRoute.postNewAd }"><img
                                :src="(selectedKey[0] == selfRoute.postNewAd || hoverKey == selfRoute.postNewAd) ? '/images/post-new-ad-active.svg' : '/images/post-new-ad.svg'"
                                class="sidebar-icon" />{{ $t('person.postnewads') }}</nuxt-link>
                    </a-menu-item>
                    <a-menu-item :key="selfRoute.myAds" @mouseover="hoverKey = selfRoute.myAds" @mouseleave="hoverKey = ''">
                        <nuxt-link :to="{ path: selfRoute.myAds }"><img
                                :src="(selectedKey[0] == selfRoute.myAds || hoverKey == selfRoute.myAds) ? '/images/my-ad-active.svg' : '/images/my-ad.svg'"
                                class="sidebar-icon" /> {{ $t('person.myads') }} </nuxt-link>
                    </a-menu-item>
                    <a-menu-item :key="selfRoute.closedAds" @mouseover="hoverKey = selfRoute.closedAds"
                        @mouseleave="hoverKey = ''">
                        <nuxt-link :to="{ path: selfRoute.closedAds }"><img
                                :src="(selectedKey[0] == selfRoute.closedAds || hoverKey == selfRoute.closedAds) ? '/images/closed-ad-active.svg' : '/images/closed-ad.svg'"
                                class="sidebar-icon" /> {{ $t('person.closedads') }} </nuxt-link>
                    </a-menu-item>

                </a-sub-menu>

                <a-sub-menu key="sub3" @titleClick="titleClick">
                    <span slot="title" class="sub-item fw-6">{{ $t('person.orders') }}</span>
                    <a-menu-item :key="selfRoute.inProcess" @mouseover="hoverKey = selfRoute.inProcess"
                        @mouseleave="hoverKey = ''">
                        <nuxt-link :to="{ path: selfRoute.inProcess }">
                            <img :src="(selectedKey[0] == selfRoute.inProcess || hoverKey == selfRoute.inProcess) ? '/images/in-process-active.svg' : '/images/in-process.svg'"
                                class="sidebar-icon" /> {{ $t('person.inprocess') }} <a-badge class="ml-2"
                                :count="processCount" :number-style="{
                                    backgroundColor: '#FAAD14',
                                    color: '#fff',
                                    border: 'none',
                                    fontSize: '12px'
                                }" />
                        </nuxt-link>
                    </a-menu-item>
                    <a-menu-item :key="selfRoute.orderHistory" @mouseover="hoverKey = selfRoute.orderHistory"
                        @mouseleave="hoverKey = ''">
                        <nuxt-link :to="{ path: selfRoute.orderHistory }">
                            <img :src="(selectedKey[0] == selfRoute.orderHistory || hoverKey == selfRoute.orderHistory) ? '/images/order-history-active.svg' : '/images/order-history.svg'"
                                class="sidebar-icon" />{{ $t('person.ordershistory') }}</nuxt-link></a-menu-item>
                </a-sub-menu>
                <a-sub-menu key="sub4">
                    <span slot="title" class="sub-item fw-6">{{ $t('person.userguide') }}</span>
                    <a-menu-item :key="selfRoute.beginnersGuide" @mouseover="hoverKey = selfRoute.beginnersGuide"
                        @mouseleave="hoverKey = ''">
                        <nuxt-link :to="{ path: selfRoute.beginnersGuide }">
                            <img :src="(selectedKey[0] == selfRoute.beginnersGuide || hoverKey == selfRoute.beginnersGuide) ? '/images/beginner-guide-active.svg' : '/images/beginner-guide.svg'"
                                class="sidebar-icon" />{{ $t('person.beginnersguide') }}</nuxt-link></a-menu-item>
                    <a-menu-item :key="selfRoute.videoTutorial" @mouseover="hoverKey = selfRoute.videoTutorial"
                        @mouseleave="hoverKey = ''">
                        <a href="javascript:void(0)" @click="buySellVideo = true">
                            <img
                                :src="(selectedKey[0] == selfRoute.videoTutorial || hoverKey == selfRoute.videoTutorial) ? '/images/video-tutorial-active.svg' : '/images/video-tutorial.svg'"
                                class="sidebar-icon" />{{ $t('person.videotutorial') }}
                        </a>
                            </a-menu-item>
                    <a-menu-item :key="selfRoute.p2pTradingFaqs" @mouseover="hoverKey = selfRoute.p2pTradingFaqs"
                        @mouseleave="hoverKey = ''"><nuxt-link :to="{ path: selfRoute.p2pTradingFaqs }"><img
                                :src="(selectedKey[0] == selfRoute.p2pTradingFaqs || hoverKey == selfRoute.p2pTradingFaqs) ? '/images/p2p-trading-faq-active.svg' : '/images/p2p-trading-faq.svg'"
                                class="sidebar-icon" />{{ $t('person.P2Ptradingfaq') }}</nuxt-link></a-menu-item>

                </a-sub-menu>

            </a-menu>

        </div>
        <BuySellCryptoVideo  :show="buySellVideo" :close="close"/>
    </div>
</template>

<script>
import BuySellCryptoVideo from '../p2p/Modals/BuySellCryptoVideo.vue';
export default {

    components: { BuySellCryptoVideo },
    data() {
        return {
            current: ["mail"],
            openKeys: ["sub1", "sub4", "sub3", "sub2", "sub5"],
            selectedKey: [],
            hoverKey: "",
            buySellVideo: false,
        };
    },
    watch: {
        openKeys(val) {
        },
        "$route": {
            handler: function () {
                this.$set(this.selectedKey, 0, this.$store.state.route.active);
            },
            deep: true,
            immediate: true
        }
    },
    computed: {
        hovers: function () {
            return this.$store.state.hovers;
        },
        selfRoute: function () {
            return this.$store.state.route;
        },
        processCount() {
            return this.$store.state.inprocessorders;
        }
    },
    methods: {
        close() {
            this.buySellVideo = false
            this.$set(this.selectedKey, 0, this.$store.state.route.active);

        },
        handleClick(e) {
        },
        titleClick(e) {
        },
    },
    mounted() {
        this.$set(this.selectedKey, 0, this.$store.state.route.active);
        this.global_refresh_user_inprocessorders_count();
    },
}
</script>

<style lang="scss">
@import '@/assets/scss/components/sidebar/sidebar.scss';
</style>
