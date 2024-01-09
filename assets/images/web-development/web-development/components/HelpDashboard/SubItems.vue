<template>
    <div class="account-function">
        <a-card :bordered="false">
            <SearchPanel :breadCrumbs="breadCrumbs" />
        </a-card>
        <a-card :bordered="false" class="mt-3">
            <BreadCrumbs @breadcrumbs-updated="updateBreadcrumbs" />

            <div v-if="!loadingArticlesList">
                <p class="intro-title fw-5 mt-4 pt-3">{{ articleTypeName }}</p>
                <a-row class="mb-5" :gutter="16">
                    <a-col :lg="12" v-for="(sub_item, index) in subitems" v-bind:key="index" class="pb-4">
                        <a v-if="sub_item.articlehref" :href="sub_item.redirectTo" target="_blank" class="subitems fw-5">{{
                            sub_item.title }}</a>
                        <nuxt-link v-else class="subitems fw-5" :to="{ path: sub_item.redirectTo }" v-html="sub_item.title">

                        </nuxt-link>
                    </a-col>
                    <a-col :lg="24" class="py-2" v-if="subitems.length == 0">
                        <p>{{ $t('helpcenter.hc6') }}</p>
                    </a-col>
                </a-row>
            </div>
            <div v-if="loadingArticlesList">
                <AppLoading />
            </div>

        </a-card>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import BreadCrumbs from './BreadCrumbs.vue';
import AppLoading from '../AppLoading.vue';
import SearchPanel from './SearchPanel.vue';
export default {
    components: { BreadCrumbs, AppLoading, SearchPanel },
    data() {
        return {
            currentSubChannel: '',
            searchValue: '',
            breadCrumbs: [], 

        }
    },
    created() {
        const route = this.$route;
        this.currentSubChannel = route.query.channelId;
    },
    computed: {
        ...mapGetters('article', ['getSubItems', 'getCurrentChannel', 'getCurrentSubChannel']),
        ...mapGetters('general', ['loadingArticlesList']),
        subitems() {
            const items = JSON.parse(JSON.stringify(this.getSubItems))
            return items.filter(item => {
                //console.log('item toLowerCase', item);
                return item.title.toLowerCase().includes(this.searchValue.toLowerCase())
            }
            );

        },
        selfRoute: function () {
            return this.$store.state.route
        },
        currentChannel: function () {
            return this.getCurrentChannel
        },
        articleTypeName() {
            return this.subitems.length > 0 ? this.subitems[0].articletypename : '';
        }
    },
    methods: {
        ...mapActions('article', ['fetchSubItems']),
        updateBreadcrumbs(breadCrumbs) {
            this.breadCrumbs = breadCrumbs;
            console.log(this.breadCrumbs)
        },
    }
}


</script>

<!-- <style lang="scss">
@import '@/assets/scss/pages/help-center/help-center.scss';
</style> -->
