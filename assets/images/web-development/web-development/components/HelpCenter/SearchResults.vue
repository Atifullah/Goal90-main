<template>
    <div>
        <div class="search-content">
            <div class="main-content">
                <a-row :gutter="16">
                    <a-col :lg="8" :offset="8">
                        <p class="help-center-heading fw-5 text-center">{{ $t('helpcenter.hc7') }}</p>
                        <div class="mx-4">
                            <a-input-search v-model="searchText" :placeholder="$t('placeholders.plh22')" size="large"
                                @search="onSearch" />
                        </div>
                    </a-col>
                </a-row>
            </div>

        </div>
        <div class="main-content">
            <a-card class="all-content my-3" :bordered="false">

                <a-breadcrumb separator=">">
                    <a-breadcrumb-item>
                        <nuxt-link to="/">{{ $t('person.home') }}</nuxt-link>
                    </a-breadcrumb-item>
                    <a-breadcrumb-item>
                        <nuxt-link :to="selfRoute.helpCenter">{{ $t('home.footerHelp') }}</nuxt-link>
                    </a-breadcrumb-item>
                    <a-breadcrumb-item>
                        {{ $t('help.searchresults') }}
                    </a-breadcrumb-item>



                </a-breadcrumb>


                <a-row :gutter="16" class="mt-4 pt-2" v-for="(sub_item, subItemIndex) in subItems"
                    v-bind:key="subItemIndex">
                    <a-col :lg="18">
                        <a v-if="sub_item.articlehref" :href="sub_item.articlehref" v-html="sub_item.title"
                            class="help-center-heading fw-5"></a>
                        <nuxt-link v-else class="help-center-heading fw-5" :to="sub_item.redirectTo"
                            v-html="sub_item.title"></nuxt-link>
                    </a-col>
                    <a-col :lg="6" align="end">
                        <p class="services-list fw-5 mb-0 articles-date">{{ sub_item.updatetime }}</p>
                    </a-col>

                    <a-col :lg="24">
                        <p class="help-center-desc fw-5">{{ sub_item.seo.description }}</p>
                        <nuxt-link :to="sub_item.subChannelRdirectTo">
                            <a-button class="cancel-outline-btn fw-5"> {{ sub_item.articletypename.toUpperCase() }}
                                <img src="/images/right-arrow.svg" class="ml-2" />
                            </a-button>
                        </nuxt-link>

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

                <div class=" text-right mb-3 px-3" v-if="subItemPagination.totalPageCount > 1">
                    <AppPagination :paginatedObject="subItemPagination" @onChange="handlePageChange($event)" />
                </div>

            </a-card>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import BreadCrumbs from '@/components/HelpDashboard/BreadCrumbs.vue';
import AppLoading from "../AppLoading.vue";
import AppPagination from "../AppPagination.vue";

export default {
    components: { BreadCrumbs, AppLoading, AppPagination },
    data() {
        return {
            pageIndex: 1,
            pageSize: 10,
            searchText: ''
        }
    },
    watch: {
        searchText: function (val) {
            //console.log('SearchResults watching searchText document.readyState', document.readyState)

            if (document.readyState != 'interactive') {//update url query param inside browser
                this.$router.replace({ query: { query: val } });
            }
        }
    },
    beforeRouteUpdate(to, from, next) {
        if (to.query.query !== this.searchText) {
            this.searchText = to.query.query;
        }
        next();
    },

    computed: {
        ...mapGetters("article", ["getSubItems", "subItemPagination"]),
        ...mapGetters("general", ["loadingArticlesList"]),
        subItems() {
            return this.getSubItems
        },
        selfRoute: function () {
            return this.$store.state.route
        },
    },

    methods: {
        ...mapActions("article", [
            "fetchSubItems",
        ]),
        onSearch(val) {
            this.searchText = val
            this.pageIndex = 1
            this.searchResults()
        },
        handlePageChange: function (val) {
            this.pageIndex = val
            this.searchResults()
        },
        searchResults() {
            const query = this.$route.query.query
            const channelId = this.$route.channelId; // Make sure channelId is available in the component

            this.searchText = query
            const object = {
                keywords: query,
                pageIndex: this.pageIndex,
                pageSize: this.pageSize,
                channelId: channelId
            }
            this.$store.commit('article/setCurrentSearchText', this.searchText, this.channelId)
            this.fetchSubItems(object)
        }
    },

    mounted() {
        this.searchResults()
    },
    beforeDestroy() {
        this.$store.commit('article/setSubItems', []);
        this.$store.commit('article/setCurrentSearchText', '');

    },

}
</script>

<style lang="scss" scoped></style>
