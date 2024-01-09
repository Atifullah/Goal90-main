<template>
    <div class="help-center ant-layout">

        <div class="help-center-header">
            <div class="main-content">
                <p class="help-center-heading fw-5 mb-2">
                    {{ $t("home.footerHelp") }}
                </p>
                <p class="help-center-desc fw-4 mb-5">{{ $t("home.customerserv") }}</p>
                <a-row>
                    <a-col :lg="9" :xl="9" class="help-center-search-input">
                        <a-input-search :placeholder="$t('placeholders.plh22')" size="large" @search="onSearch"
                            class="help-center-ant-input" />

                    </a-col>
                    <!-- <a-col :lg="12" align="start">
                        <nuxt-link to="/person/my-tickets/create-ticket">
                            <a-button class="outline-btn fw-5 ml-3"><a-icon type="plus" /> {{
                                $t('person.create_ticket_person') }}</a-button></nuxt-link>
                    </a-col> -->
                </a-row>
            </div>
        </div>
        <div class="main-content">
            <div class="pt-8 services-card1">
                <p class="help-center-heading fw-5 mb-0 pb-6">{{ $t("home.ss") }}</p>
                <a-row>
                    <a-col v-for="(list, key) in servicesList" :key="key" class="services-list-col">
                        <nuxt-link :to="list.redirectTo">
                            <a-card :bordered="false" class="services-card">
                                <a-row :gutter="16" class="col-alignment gray-card-list">
                                    <a-col :lg="6" class="pl-0"> <img :src="list.img" />
                                    </a-col>
                                    <a-col :lg="18" class="px-0">
                                        <p class="services-list fw-4 mb-0">
                                            {{ list.title }}
                                        </p>
                                    </a-col>
                                </a-row>
                            </a-card>

                        </nuxt-link>
                    </a-col>
                </a-row>
            </div>
            <div class="pt-8">
                <p class="help-center-heading fw-5 mb-0 pb-6">{{ $t('returntxt.rtxt32') }}</p>
                <a-row :gutter="16">
                    <a-col :lg="6" :xl="6" v-for="(list, key) in articleChannels" :key="key">
                        <nuxt-link :to="list.redirectTo ? list.redirectTo : ''">
                            <a-card class="help-center-descc pointer">
                                <a-row>
                                    <a-col :lg="4">
                                        <img :src="list.imageurl" class="pr-2 help-centerfaq-images" />
                                    </a-col>
                                    <a-col :lg="20">
                                        <p class="mb-0 channel-name">{{ list.channelname }}</p>
                                    </a-col>
                                </a-row>
                            </a-card>
                        </nuxt-link>
                    </a-col>
                </a-row>
            </div>
            <div class="pt-6">
                <p class="help-center-heading fw-5 mb-0 pb-6">Announcement</p>
                <a-row :gutter="16">
                    <a-col :lg="6" :xl="6" v-for="(list, key) in announcementArticle" :key="key">
                        <nuxt-link class="mb-0 mt-4 faq-desc fw-5" to="/help-dashboard/16?channelId=86">
                            <a-card class="help-center-descc pointer">
                                <a-row>
                                    <a-col :lg="4">
                                        <img :src="list.imageurl" class="pr-2 help-centerfaq-images" />
                                    </a-col>
                                    <a-col :lg="20">
                                        <p class="mb-0 channel-name">{{ list.channelname }}</p>
                                    </a-col>
                                </a-row>
                            </a-card>
                        </nuxt-link>
                    </a-col>
                </a-row>
            </div>

            <div class="pt-6 pb-6">
                <a-row :gutter="16">
                    <a-col :lg="12">
                        <p class="articels-txt fw-5 mb-5"> {{ $t('helpcenter.hc2') }}</p>
                        <a-row :gutter="16">
                            <a-col :lg="24" v-for="(list, key) in latestArticles" :key="key" :to="list.link" class="mb-5">
                                <nuxt-link
                                    :to="selfRoute.helpCenterChannelDetail + '/' + list.mainchannel + '?subChannel=' + list.subchannel + '&subItemTitle=' + list.subtitle">
                                    <p class="articles-desc fw-4 mb-0">{{ list.title }} </p>
                                    <p class="articles-date pl-2 mb-0 fw-4">{{ formatDate(list.createtime) }}</p>
                                    <!-- <p class="mt-2 mb-4 fw-5">

                                    </p> -->
                                </nuxt-link>
                            </a-col>
                            <a-col lg="12" v-if="laodingLatestArticles">
                                <AppLoading height="70px" position="left" />
                            </a-col>

                            <a-col lg="24" v-if="latestArticles.length == 0 && !laodingLatestArticles">
                                {{ $t('extra.extra20') }}
                            </a-col>

                        </a-row>
                    </a-col>
                    <a-col :lg="12">
                        <p class="articels-txt fw-6 mb-5">{{ $t('helpcenter.hc3') }}</p>
                        <a-row :gutter="16">
                            <a-col :lg="24" v-for="(list, key) in recomendArticles" :key="key" :to="list.link" class="pb-5">
                                <nuxt-link
                                    :to="selfRoute.helpCenterChannelDetail + '/' + list.mainchannel + '?subChannel=' + list.subchannel + '&subItemTitle=' + list.subtitle">
                                    <p class="articles-desc fw-4 mb-0">{{ list.title }}
                                    </p>
                                    <p class="articles-date pl-2 mb-0 fw-4">{{ formatDate(list.createtime) }}</p>

                                    <!-- <p class="mt-2 mb-4 fw-5">

                                    </p> -->
                                </nuxt-link>
                            </a-col>
                            <a-col lg="12" v-if="loadingRecommendArticles">
                                <AppLoading height="70px" position="left" />
                            </a-col>

                            <a-col lg="24" v-if="recomendArticles.length == 0 && !loadingRecommendArticles">
                                {{ $t('helpcenter.hc6') }}
                            </a-col>
                        </a-row>
                    </a-col>

                </a-row>
            </div>


        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import AppLoading from "../AppLoading.vue";
import { blogChannelId } from "~/plugins/constants";
export default {
    components: { AppLoading },
    data() {
        return {
            helpCenterId: 7,
            AnnoncementChannel: 16,
            servicesList: [

            ],
            pageIndex: 1,
            pageSize: 10,
            lang: "en_us",
        };
    },
    head() {
        return {
            bodyAttrs: {
                class: 'Help-center',
            }
        }
    },
    computed: {
        ...mapGetters("article", ["getArticleChildren", "getLatestArticles", "getRecomendArticles", "getAnnouncement"]),
        ...mapGetters("general", ["laodingLatestArticles", "loadingRecommendArticles"]),
        articleChannels() {
            return this.getArticleChildren;
        },
        latestArticles() {
            return this.getLatestArticles;
        },
        recomendArticles() {
            return this.getRecomendArticles;
        },
        announcementArticle() {
            return this.getAnnouncement;
        },
        selfRoute: function () {
            return this.$store.state.route;
        },


    },
    methods: {
        ...mapActions("article", [
            "fetchArticleChannels",
            "fetchLatestArticles",
            "fetchRecomendArticles",
            "fetchAnnouncement",
        ]),
        onSearch(value) {
            const url = this.selfRoute.searchResult + '?query=' + value
            window.open(url, "_blank")
        },
        assignServicesList: function () {
            const hexServerUserInfo = this.$store.state.hex_server_user_info;
            var email = hexServerUserInfo.value.email;
            var userId = hexServerUserInfo.value.uid;

            // Check if userId and email are not found (or if hexServerUserInfo is not available)
            if (!userId || !email) {
                const array = [
                    {
                        img: "/images/service-lock.png",
                        title: this.$t("news.t8"),
                        redirectTo: "/login",
                    },
                    {
                        img: "/images/service-lock-slash.png",
                        title: this.$t("news.t9"),
                        redirectTo: "/login",
                    },
                    {
                        img: "/images/service-reset.png",
                        title: this.$t("news.t10"),
                        redirectTo: "/login",
                    },
                    {
                        img: "/images/service-sms-edit.png",
                        title: this.$t("news.t11"),
                        redirectTo: "/login",
                    },
                    {
                        img: "/images/service-reset-google.png",
                        title: this.$t("news.t12"),
                        redirectTo: "/login",
                    },
                    {
                        img: "/images/service-card.png",
                        title: this.$t("news.t13"),
                        redirectTo: "/login",
                    },
                ];

                this.servicesList = array;
            } else {
                // User is logged in, populate the services list with specific options
                const array = [
                    {
                        img: "/images/service-lock.png",
                        title: this.$t("news.t8"),
                        redirectTo: this.selfRoute.changePassword,
                    },
                    {
                        img: "/images/service-lock-slash.png",
                        title: this.$t("news.t9"),
                        redirectTo: this.selfRoute.createTicket,
                    },
                    {
                        img: "/images/service-reset.png",
                        title: this.$t("news.t10"),
                        redirectTo: this.selfRoute.bindPhoneNo,
                    },
                    {
                        img: "/images/service-sms-edit.png",
                        title: this.$t("news.t11"),
                        redirectTo: this.selfRoute.bindEmail,
                    },
                    {
                        img: "/images/service-reset-google.png",
                        title: this.$t("news.t12"),
                        redirectTo: this.selfRoute.changeGoogleVerification,
                    },
                    {
                        img: "/images/service-card.png",
                        title: this.$t("news.t13"),
                        redirectTo: this.selfRoute.createTicket + '?tab=others',
                    },
                ];

                this.servicesList = array;
            }
        }
    },

    mounted() {
        //all ids are not confirmed yet might be chnaged in future
        this.assignServicesList()
        this.fetchArticleChannels({ "channelId": this.helpCenterId }); //help-center id  = 7
        this.fetchAnnouncement({ "channelId": this.AnnoncementChannel }) //announcement channel id =16
        this.fetchLatestArticles({ channelId: this.helpCenterId, istoparticle: true, pageIndex: this.pageIndex, pageSize: this.pageSize, lang: this.lang });
        this.fetchRecomendArticles({ channelId: this.helpCenterId, isRecommend: true,  pageIndex: this.pageIndex, pageSize: this.pageSize, lang: this.lang });
    },
}
</script>

<style></style>
