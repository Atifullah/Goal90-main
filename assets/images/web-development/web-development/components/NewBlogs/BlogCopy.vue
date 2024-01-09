<template>
    <div>
        <div class="blogs-header">
            <div class="main-content">
                <p class="blog-main-heading mb-0 text-black fw-5">
                    {{ $t("keyWords.blog1") }}
                </p>
            </div>
        </div>
        <div class="blogs-content">
            <div class="main-content">
                <a-row class="mt-6">
                    <nuxt-link :to="firstBlog.redirectTo">
                        <a-col :lg="9" :xl="8" :xxl="8">
                        <img :src="firstBlog.imgurl" width="100%" height="274px" class="blog-imgs"/>
                    </a-col>
                    <a-col :lg="14" :xl="11" :xxl="9" class="pl-4">
                        <p class="sub-heading mb-3 fw-5 text-black">
                            {{ firstBlog.title ? firstBlog.title.substr(0, 35) : '' }}
                        </p>
                        <p class="desc mb-3 text-black">
                            {{
                                seoData(firstBlog).short_description
                                ? seoData(firstBlog).short_description.substr(0, 350)
                                : ""
                            }}
                        </p>
                        <p class="date-text mb-0">{{ firstBlog.updatetime }}</p>
                    </a-col>
                    </nuxt-link>
                </a-row>
                <a-row class="mt-6 col-alignment">
                    <a-col :lg="18" :xl="19">
                        <a-radio-group size="small" @change="onSearch" v-model="searchText">
                            <a-radio-button :value="keyWord.value" v-for="(keyWord, index) in keyWords"
                            :key="index" >
                                {{ keyWord.label }}
                            </a-radio-button>
                        </a-radio-group>
                    </a-col>
                    <a-col :lg="6" :xl="5" align="end">
                        <a-input ref="userNameInput" placeholder="Search" v-model="searchText"
                        @keyup.enter="onSearch">
                            <span slot="prefix">
                                <img src="/images/search-news.svg" />
                            </span>
                        </a-input>
                    </a-col>
                </a-row>
                <a-row class="mt-6" :gutter="50">
                    <a-col :lg="8" v-for="(blog, key) in subItems" :key="key" class="mb-5">
                        <nuxt-link :to="blog.redirectTo">
                            <div class="blog-box">
                        <img :src="blog.imgurl" width="100%" height="239px" class="blog-imgs" />
                        <p class="blog-title mt-4 fw-5 text-black mb-2">
                            {{ blog.title.substr(0, 65) }}
                        </p>
                        <p class="blog-desc mb-2 text-black">
                            {{
                                seoData(blog).short_description
                                ? seoData(blog).short_description.substr(0, 350)
                                : ""
                            }}
                        </p>
                        <p class="date-text mb-0">{{ blog.updatetime }}</p>
                        </div>
                        </nuxt-link>
                    </a-col>
                </a-row>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import BlogCard from "/components/Blog/BlogCard.vue";
import { blogChannelId } from "~/plugins/constants";
import AppPagination from "../AppPagination.vue";
import AppLoading from "../AppLoading.vue";
export default {
    components: { BlogCard, AppPagination, AppLoading },
    name: 'BlogCopy',
    data() {
        return {
            pageIndex: 1,
            pageSize: 10,
            lang: "en_us",
            searchText: "",
            isSearching: false,
            pageTitle: "",
            keyWords: [
                {
                    label: this.$t('keyWords.bitnasdaq'),
                    value: this.$t('keyWords.bitnasdaq')
                },
                {
                    label: this.$t('keyWords.top_cryptocurrencies_label'),
                    value: this.$t('keyWords.top_cryptocurrencies_value')
                },
                {
                    label: this.$t('keyWords.buy_and_sell_label'),
                    value: this.$t('keyWords.buy_and_sell_value')
                },
                {
                    label: this.$t('keyWords.best_cryptocurrency_exchange_label'),
                    value: this.$t('keyWords.best_cryptocurrency_exchange_value')
                },
                {
                    label: this.$t('keyWords.staking_in_cryptocurrency_label'),
                    value: this.$t('keyWords.staking_in_cryptocurrency_value')
                },
                {
                    label: this.$t('keyWords.trading_platform_label'),
                    value: this.$t('keyWords.trading_platform_value')
                },
                {
                    label: this.$t('keyWords.predicts_the_future_label'),
                    value: this.$t('keyWords.predicts_the_future_value')
                }
            ]
        };
    },
    computed: {
        ...mapGetters("article", ["getSubItems"]),
        subItems() {
            return this.getSubItems;
        },
        firstBlog() {
            return this.subItems.length > 0 ? this.subItems[0] : {}
        }

    },
    methods: {
        ...mapActions("article", ["fetchSubItems"]),
        seoData(blog) {
            return blog.seo ? blog.seo : {};
        },
        onSearch(val) {
            console.log('value',val)
            // this.searchText = val;
            this.pageIndex = 1;
            this.getBlogs();
        },
        getBlogs() {
            const blogsObject = {
                channelId: blogChannelId,
                pageIndex: this.pageIndex,
                pageSize: this.pageSize,
               keywords: this.searchText,
            };
            this.fetchSubItems(blogsObject);
        },
    },
    mounted() {
        this.getBlogs()

    }
};
</script>

<style></style>
