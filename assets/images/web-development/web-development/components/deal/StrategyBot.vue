<template>
    <div class="strategy-bot bg-white">
        <div class="strategy-bot-bg">
            <div class="main-content">
                <a-row :gutter="16" class="">
                    <a-col :lg="11" :xl="11">
                        <p class="strategy-bot-title fw-5 mb-1">
                            {{ $t("stratergybot.sb1") }}
                        </p>
                        <p class="strategy-bot-desc fw-4">
                            {{ $t("stratergybot.sb2") }}
                            {{ $t("stratergybot.sb3") }}
                        </p>

                        <a-row class="mt-4">
                            <a-col :lg="24">
                                <a-button class="primary-btn fw-5 mr-2">
                                    <nuxt-link :to="selfRoute.dealPro +
                                        `/btc_usdt?ctid=${defaultCoinCtid}`
                                        ">
                                        {{ $t("stratergybot.sb4") }}
                                    </nuxt-link>
                                </a-button>
                                <a-button class="cancel-outline-btn fw-5 ml-2">
                                    <nuxt-link :to="selfRoute.helpCenter">
                                        {{ $t("stratergybot.sb5") }}
                                    </nuxt-link>
                                </a-button>
                            </a-col>
                        </a-row>
                    </a-col>
                </a-row>
            </div>
        </div>
        <div class="grid-bot mt-5">
            <div class="main-content">
                <!-- GRIDBOTDETAIL STARTED -->
                <a-row :gutter="{ lg: 24, xl: 32 }" class="mt-3 grid-bot-row">
                    <a-col :lg="8" v-for="(list, key) in gridBotDetail" :key="key">
                        <a-card :bordered="false" class="grid-bot-card">
                            <span @mouseover="hoverKey = key" @mouseleave="hoverKey = -1">
                            <a-row :gutter="16" class="">
                                <a-col class="col-alignment bot-title mb-2">
                                    <img :src="list.img" class="list-bot-img" />
                                    <p class="mb-1 gird-bot-title fw-5">
                                        {{ list.title }}
                                    </p>
                                </a-col>
                                <a-col>
                                    <p class="mb-0 grid-bot-desc fw-4">
                                        {{ list.desc }}
                                    </p>
                                </a-col>
                            </a-row>
                            <a-row :gutter="16" type="flex" justify="space-between">
                                <a-col :sm="18" :lg="16" :xl="18">
                                    <a-row :gutter="16" class="pt-4 mt-2">
                                        <a-col :sm="12" :lg="10">
                                            <p class="mb-1 highest-apr fw-4">
                                                {{ $t("stratergybot.sb6") }}
                                            </p>
                                            <p class="running-bot fw-7 success-active mb-0">
                                                {{ list.annualinterestrate }}%
                                            </p>
                                        </a-col>
                                        <a-col :sm="12" :lg="14">
                                            <p class="mb-1 highest-apr fw-4">
                                                {{ $t("stratergybot.sb7") }}
                                            </p>
                                            <p class="running-bot fw-7 mb-0">
                                                {{ list.runningbots }}
                                            </p>
                                        </a-col>
                                    </a-row>
                                </a-col>
                                <a-col :sm="6" :lg="5">
                                    <nuxt-link :to="list.tradeBoardLink">
                                        <a-button class="bot-create-btn fw-5">
                                            {{ $t("legalTrad.Create") }}
                                            <img :src="hoverKey == key ? '/images/arrow-create-active.png' : '/images/arrow-create.png'" alt="" />
                                        </a-button>
                                    </nuxt-link>
                                </a-col>
                            </a-row>
                        </span>
                        </a-card>
                    </a-col>
                </a-row>
                <!-- GRIDBOTDETAIL ENDED -->

                <a-row class="mt-5 mb-3">
                    <a-col :lg="24">
                        <BannerArticleNew />
                    </a-col>
                </a-row>

                <!-- STRATEGYBOTTABLE STARTED -->
                <a-card :bordered="false" class="mt-2 grid-spot-card">
                    <a-tabs :defaultActiveTabKey="activeTab">
                        <a-tab-pane v-for="tab in tabs" :key="tab.key" :tab="tab.title">
                            <!-- THE KEY IS SET TO 1-SPOT,2-MARGIN,3-FUTURE AS IT IS RECOGNIZED BY API OF GETTING BOT DATA  -->
                            <StrategyBotTable :strategyType="tab.key" />
                        </a-tab-pane>
                    </a-tabs>
                </a-card>
                <!-- STRATEGYBOTTABLE STARTED -->

                <!-- FAQ   STARTED -->
                <a-card class="py-3 faqs-container" :bordered="false">
                    <Faqs :channelid="85" :subtitle="'strategy-bots_faqs'" />
                </a-card>
                <!-- FAQ  STARTED -->
            </div>
        </div>
    </div>
</template>

<script>
import Faqs from "@/components/public/Faqs.vue";
import StrategyBotTable from "./StrategyBotTable.vue";

import { btcCtid } from "~/plugins/constants";
import BannerArticleNew from "../home/banner-article-copy.vue";
import { mapActions,mapGetters } from "vuex";
export default {
    components: {
        Faqs,
        StrategyBotTable,
        BannerArticleNew,
    },
    data() {
        return {
            hoverKey: -1,
            activeTab: 1,
            tabs: [
                { key: 1, title: this.$t("stratergybot.sb10") },
                { key: 2, title: this.$t("stratergybot.sb11") },
                { key: 3, title: this.$t("stratergybot.sb12") },
            ],
            swiperBannel: [],
        };
    },
    computed: {
        ...mapGetters("constants", ["getstrategies"]),
        selfRoute: function () {
            return this.$store.state.route;
        },
        defaultCoinCtid() {
            return btcCtid;
        },
        gridBotDetail(){
          return JSON.parse(this.getstrategies).map((item) => {
                        switch (item.type) {
                            case "spot":
                                item.img = "/images/strategy-spot-grid.svg";
                                item.title = this.$t("stratergybot.sb10");
                                item.desc = this.$t("stratergybot.sb13");
                                item.tradeBoardLink =
                                    this.selfRoute.dealPro +
                                    `/btc_usdt?ctid=${this.defaultCoinCtid}`;
                                break;

                            case "margin":
                                item.img = "/images/strategy-margin-grid.svg";
                                item.title = this.$t("stratergybot.sb11");
                                item.desc = this.$t("stratergybot.sb14");
                                item.tradeBoardLink =
                                    this.selfRoute.marginPro +
                                    `/btc_usdt?ctid=${this.defaultCoinCtid}`;
                                break;
                            case "futrue":
                                item.img = "/images/strategy-future-grid.svg";
                                item.title = this.$t("stratergybot.sb12");
                                item.desc = this.$t("stratergybot.sb15");
                                item.tradeBoardLink =
                                    this.selfRoute.futurePro +
                                    `/btc_yx?ctid=${this.defaultCoinCtid}`;
                                break;

                            default:
                                break;
                        }

                        // item.img = item.type == 'spot' ? '/images/spot-grid.svg' : (item.type == 'margin') ? '/images/margin-grid.svg' : '/images/future-grid.svg';
                        // item.title = item.type == 'spot' ? this.$t('stratergybot.sb10') : (item.type == 'margin') ? this.$t('stratergybot.sb11') : this.$t('stratergybot.sb12');
                        // item.desc = item.type == 'spot' ? this.$t('stratergybot.sb13') : (item.type == 'margin') ? this.$t('stratergybot.sb14') : this.$t('stratergybot.sb15');
                        return item;
                    });
               
        }
    },
    methods: {
        ...mapActions("article", ["fetchArticles"]),
        //GETTING GRIDBOTDETAIL FROM API AND  SETTING IMAGE TITLE AND DESC ACCORDING TO TYPE (SPOT,MARGIN,FUTURE)
        getarticle() {
            this.fetchArticles("com_article_search", {
                channelid: 2,
                pageindex: 1,
                pagesize: 12,
            }).then((artical) => {
                this.swiperBannel =
                    artical.data && artical.data.pagedata
                        ? artical.data.pagedata
                        : [];
            });
        },
    },
    mounted() {
         this.getarticle();
    },
};
</script>

<style></style>
