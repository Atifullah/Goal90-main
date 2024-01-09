<template>
    <div class="about-us-sec">
        <div class="about-us">
            <div class="main-content">
                <a-row>
                    <a-col :lg="10" :xl="8">
                        <p class="mb-2 about-heading fw-5">About BitNasdaq</p>
                        <p class="mb-0 about-desc fw-4">
                            BitNasdaq, the top cryptocurrency exchange where AImeets blockchain. Learn more about BitNasdaq here.
                        </p>
                    </a-col>
                </a-row>
            </div>
        </div>
        <div class="white-bg">
            <div class="main-content">
                <div class="about-detail pt-6">
                    <a-row :gutter="16">
                        <a-col :lg="14" :xl="13">
                            <p class="main-heading fw-5 mb-2">{{ $t("aboutus.meet-bitnasdaq") }}</p>
                            <p class="mb-0 small-text fw-4">
                                {{ $t("aboutus.Inclusive-Intelligence") }}
                            </p>
                        </a-col>
                        <a-col :lg="10" :xl="11" align="center">
                            <img src="/images/about-icon.svg" class="right-side-img" />
                        </a-col>
                    </a-row>
                    <a-row class="mt-5" :gutter="16">
                        <a-col :lg="8" v-for="(list,key) in ourGoalList" :key="key" class="pr-5">
                            <p class="main-heading  fw-5 mb-2">{{ list.title }}</p>
                            <p class="mb-0 small-text fw-4">{{ list.desc }}
                            </p>
                        </a-col>
                    </a-row>
             
                </div>
                <div class="pt-6">
                    <a-row :gutter="16" class="col-alignment">
                        <!-- <a-col :lg="9" :xl="11" align="center">
                            <img src="/images/unique.png" />
                        </a-col> -->
                        <a-col :lg="24">
                            <a-row :gutter="16">
                                <a-col :lg="22" :xl="12">
                                    <p class="main-heading  fw-5  mb-2">
                                        {{ $t("aboutus.Our-Unique-Features") }}
                                    </p>
                                    <p class="mb-0 small-text fw-4">
                                        {{ $t("aboutus.join-us") }}
                                    </p>
                                </a-col>
                            </a-row>
                            <div class="pt-5 feature-list-box">
                                <div class="all-box" v-for="(list, key) in getFeaturesLIst" :key="key">
                                    <div @mouseover="hoverKey = key" @mouseleave="hoverKey = -1">
                                        <a-card class="gray-card pointer">
                                            <img :src="hoverKey == key ? list.img_active : list.img" />
                                            <p class="feature-heading fw-5 mb-0 pt-4">
                                                {{ list.title }}
                                            </p>
                                            <p class="feature-desc fw-4 mb-0">
                                                {{ list.desc }}
                                            </p>
                                        </a-card>
                                    </div>
                                </div>
                            </div>
                        </a-col>
                    </a-row>
                </div>

                <a-row :gutter="16">
                    <a-col :lg="22" :xl="18">
                        <div class="pt-6">
                            <p class="main-heading  fw-5 mb-2">
                                {{ $t("aboutus.Inclusive") }}
                            </p>
                            <p class="mb-0 small-text fw-4">
                                {{ $t("aboutus.our-tagline") }}
                            </p>
                        </div>
                        <div class="pt-6">
                            <p class="main-heading  fw-5 mb-2">
                                {{ $t("aboutus.empowring") }}
                            </p>
                            <p class="mb-0 small-text fw-4">
                                {{ $t("aboutus.at-bitnasdaq") }}

                            </p>
                        </div>
                        <div class="pt-6">
                            <p class="main-heading  fw-5 mb-2"> {{ $t("aboutus.BNQ-Token") }}</p>
                            <p class="mb-0 small-text fw-4">
                                {{ $t("aboutus.our-native-token") }}
                            </p>
                        </div>
                        <div class="pt-6">
                            <p class="main-heading  fw-5 mb-2">{{$t('market.mark6')}}</p>
                            <p class="mb-0 small-text fw-4">{{$t('market.mark7')}}<a href="https://www.tradingview.com/symbols/BTCUSD/" target="_blank">BTC USD Chart</a>, {{$t('market.mark8')}} <a href="https://www.tradingview.com/economic-calendar/" target="_blank">{{$t('market.mark9')}}</a>.
                            </p>
                        </div>
                    </a-col>
                </a-row>
                <a-row :gutter="16" class="mt-5 pt-3">
                    <a-col :lg="11" :xl="9">
                        <p class="main-heading  fw-5  mb-2"> {{ $t("aboutus.Our-Team") }}</p>
                        <p class="mb-0 small-text fw-4">
                            {{ $t("aboutus.team-of-dedicated") }}
                        </p>
                        <p class="pt-4 our-team-desc fw-4 mb-0">
                            <span class="our-team-title fw-5"> {{ $t("aboutus.Educating-Next-Generation") }}</span>
                            {{ $t("aboutus.we-are-committed") }}
                        </p>
                        <p class="pt-4 our-team-desc fw-4 mb-0">
                            <span class="our-team-title fw-5">{{ $t("aboutus.Demystify-The-Trading:") }}</span>
                            {{ $t("aboutus.we-strive") }}
                        </p>
                        <p class="pt-4 our-team-desc fw-4 mb-0">
                            <span class="our-team-title fw-5"> {{ $t("aboutus.building-community") }}</span>
                            {{ $t("aboutus.we-want-cultivate") }}
                        </p>
                    </a-col>
                    <a-col :lg="13" :xl="15" align="center" class="pt-3">
                        <img src="/images/our-team.png" />
                    </a-col>
                </a-row>
                <div class="pb-6">
                    <p class="main-heading  fw-5  mb-2 text-center"> {{ $t("aboutus.join-us-on") }}</p>
                    <a-row>
                        <a-col :lg="16" :offset="4">
                            <p class="mb-0 small-text fw-4 text-center">
                                {{ $t("aboutus.we-invite-you") }}
                            </p>
                        </a-col>
                        <a-col :lg="16" :offset="4">
                            <div class="pt-4 mt-4">
                                <SocialLinks />
                            </div>

                        </a-col>
                    </a-row>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import SocialLinks from "../App/SocialLinks.vue";

export default {
    components: {
        SocialLinks
    },
    data() {
        return {

            hoverKey: -1,
            getFeaturesLIst: [
                {
                    img: "/images/feature1.svg",
                    title: this.$t("aboutus.Demo-Accounts"),
                    img_active: '/images/feature1-active.svg',
                    desc: "Experience the platform risk-free",
                },
                {
                    img: "/images/feature2.svg",
                    title: this.$t("aboutus.Strategy-Bots:"),
                    img_active: '/images/feature2-active.svg',
                    desc: "Automate your trading strategies",
                },
                {
                    img: "/images/feature3.svg",
                    title: this.$t("aboutus.Facial-Recognition"),
                    img_active: '/images/feature3-active.svg',
                    desc: "Secure account with cutting-edge facial recognition",
                },
                {
                    img: "/images/feature4.svg",
                    title: this.$t("aboutus.voice_enabled"),
                    img_active: '/images/feature4-active.svg',
                    desc: "Engage in decentralized igaming",
                },
                {
                    img: "/images/feature5.svg",
                    title: this.$t("aboutus.voice_biometric"),
                    img_active: '/images/feature5-active.svg',
                    desc: "Enhance security with voice biometric authentication",
                },
            ],
            ourGoalList: [
                {
                    title: this.$t('aboutus.Our-Mission'),
                    desc: this.$t('aboutus.core-mission')
                },
                {
                    title: this.$t('aboutus.our-vision'),
                    desc: this.$t('aboutus.our-visionn')
                },
                {
                    title: this.$t('aboutus.core-value'),
                    desc: this.$t('aboutus.core-valuee')
                }
            ]
        };
    },
};
</script>

<style></style>
