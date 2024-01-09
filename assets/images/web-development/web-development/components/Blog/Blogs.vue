<template>
    <a-card class="main-card" :bordered="false">
        <div class="main-content">
            <a-row :gutter="16" class="col-alignment py-4 mt-3">
                <a-col :lg="17" :xl="19">
                    <p class="news-date fw-7 mb-0">{{ pageTitle }}</p>
                </a-col>

                <a-col :lg="7" :xl="5">
                    <a-input class="search-news" :placeholder="$t('placeholders.plh22')" v-model="searchText"
                        @keyup.enter="onSearchNews">
                        <span slot="prefix">
                            <img src="/images/search-news.svg" />
                        </span>
                    </a-input>
                </a-col>
            </a-row>
            <a-row :gutter="16">
                <a-col :lg="15" :xl="17">
                    <a-row :gutter="16" v-for="(news, key) in subItems" :key="key" class="mb-4">
                        <a-col :lg="24" :xl="24">
                            <BlogCard :news="news" />
                        </a-col>
                    </a-row>
                    <a-row>
                        <a-col lg="24" v-if="loadingArticlesList">
                            <AppLoading height="20vh" />
                        </a-col>
                        <a-col lg="24" v-else-if="subItems.length == 0">
                            <div class="p-5 text-capitalize text-center">
                                <h4>{{ $t('helpcenter.hc8') }}</h4>
                            </div>
                        </a-col>
                    </a-row>
                </a-col>

                <a-col :lg="9" :xl="7">
                    <a-card :bordered="false" class="right-card first-right-card">
                        <p class="latest-news-heading fw-5 mb-3">
                            {{ blogType === "/blogs" ? $t("details.det19") : $t("details.det14") }}
                        </p>

                        <div class="">
                            <a-row v-for="(
                                    sub_item, subItemIndex
                                ) in  LatestBlogNews.slice(0, 10)" v-bind:key="subItemIndex" class="pr-2"
                                v-bind:class="activeRoute(sub_item.redirectTo)">
                                <a-col :lg="24">
                                    <a :href="sub_item.articlehref" v-if="sub_item.articlehref" target="_blank"
                                        class="link-txt">
                                        <p class="news-detail-desc fw-5 mb-1" v-html="sub_item.title.substr(0, 80)">

                                        </p>
                                    </a>
                                    <nuxt-link :to="sub_item.redirectTo" v-else>
                                        <p class="mb-1 news-title fw-5" v-html="sub_item.title.substr(0, 80)">
                                        </p>
                                    </nuxt-link>

                                    <p class="mb-0 like-share fw-5">
                                        {{ sub_item.updateTime }}
                                    </p>
                                </a-col>
                                <a-col :lg="24">
                                    <a-divider class="my-3 detail-new-divider" />
                                </a-col>
                            </a-row>
                            <a-row>
                                <a-col lg="24" v-if="loadingArticlesList">
                                    <AppLoading height="20vh" />
                                </a-col>
                                <a-col lg="24" v-else-if="subItems.length == 0">
                                    <div class="text-capitalize text-left">
                                        <h4>{{ $t('helpcenter.hc8') }}</h4>
                                    </div>
                                </a-col>
                            </a-row>
                        </div>
                    </a-card>
                </a-col>
            </a-row>
        </div>
        <div class="blog-pagination" v-if="subItemPagination.totalPageCount > 0">
            <AppPagination :paginatedObject="subItemPagination" @onChange="handlePageChange($event)" />
        </div>
    </a-card>
</template> 

<script>
import { mapActions, mapGetters } from "vuex";
import BlogCard from "./BlogCard.vue";
import { blogChannelId, bitnasdaqNewsChannelId } from "~/plugins/constants";
import AppPagination from "../AppPagination.vue";
import AppLoading from "../AppLoading.vue";
export default {
    components: { BlogCard, AppPagination, AppLoading },
    data() {
        return {
            currentNewsChannel: "all",
            pageIndex: 1,
            pageSize: 10,
            lang: "en_us",
            searchText: "",
            isSearching: false,
            pageTitle: "",
            blogType: ""
        };
    },
    watch: {
        // searchText: function (val) {
        //     const blogType = this.$route.query.type
        //     if (document.readyState != "interactive") {
        //         //update url query param inside browser
        //         this.$router.replace({ query: { type: blogType, query: val } });
        //     }
        // },

        $route: {
            handler(to) {
                const route = this.$route;
                const blogType = route.path;

                if (blogType == "/news") {
                    this.pageTitle = this.$t("footer.footer_News");
                } else if (blogType == "/blogs") {
                    this.pageTitle = this.$t("home_page.blogs");
                }
            },
            deep: true,
            immediate: true, // Trigger the handler immediately when the component is mounted
        },
    },

    computed: {
        ...mapGetters("article", [
            "getSubItems",
            "subItemPagination",
            "getLatestArticles",
            "getArticleChildren",
            "getNewsSubItems",
        ]),
        ...mapGetters("general", [
            "laodingLatestArticles",
            "loadingArticlesList",
        ]),
        subItems() {
            return this.getSubItems;
        },
        newsSubItems() {
            return this.getNewsSubItems;
        },
        latestArticles() {
            return this.getLatestArticles;
        },
        LatestBlogNews() {
            // Get a list of unique article IDs from latestArticles
            const latestArticleIds = this.latestArticles.map(article => article.id);

            // Filter subItems to exclude articles that are already in latestArticles
            const filteredSubItems = this.subItems.filter(subItem => !latestArticleIds.includes(subItem.id));
            console.log('latestArticles:', this.latestArticles);

            // Concatenate the latest articles and filtered subItems
            return this.latestArticles.concat(filteredSubItems).sort((a, b) => new Date(b.updatetime).getTime() - new Date(a.updatetime).getTime());
        },
        latestNewsList() {
            const list = this.getLatestArticles;
            const newsList = [];

            list.forEach(function (news, index) {
                if (index == 0) {
                    news.side_news = [];
                    newsList.push(news);
                } else if (index <= 2) {
                    newsList[0].side_news.push(news);
                }
            });
            return newsList;
        },
        newsChannels() {
            return this.getArticleChildren;
        },
    },

    methods: {
        ...mapActions("article", [
            "fetchSubItems",
            "fetchLatestArticles",
            "fetchArticleChannels",
        ]),
        activeRoute: function (route) {
            const router = this.$route;
            let activeClass = "";
            if (router.fullPath == route) {
                activeClass = "visited-link";
            }
            return activeClass;
        },
        onSearch(val) {
            this.searchText = val;
            this.pageIndex = 1;
            this.onSearchNews();
        },
        handlePageChange: function (val) {
            this.pageIndex = val;
            this.onSearchNews();
        },

        onSearchNews(val) {

            // Define channelId based on blogType
            let channelId;
            if (this.blogType === "/news") {
                channelId = bitnasdaqNewsChannelId;
                console.log("news channel", this.blogType)
            } else if (this.blogType === "/blogs") {
                channelId = blogChannelId;
                console.log("news channel", this.blogType)

            } else {
                // Default to all channels or handle other cases
                channelId = "all";
            }

            const newsObject = {
                channelId: channelId,
                pageIndex: this.pageIndex,
                pageSize: this.pageSize,
                keywords: this.searchText,
            };
            console.log(newsObject, "object")
            this.fetchSubItems(newsObject);

        },
    },

    mounted() {
        const route = this.$route;
        const query = route.query.query;
        this.blogType = route.path; // Use this.$route instead of this.route
        if (query) {
            this.isSearching = true;
            this.onSearchNews(route.query.query);
        }
        this.fetchLatestArticles({ channelId: blogChannelId, istoparticle: true, pageIndex: this.pageIndex, pageSize: this.pageSize, lang: this.lang });
    },

};
</script>

<style>
.blog-pagination {
    width: 1260px;
    text-align: right !important;
}
</style>
