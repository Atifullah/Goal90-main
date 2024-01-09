<template>
    <div id="beginners-guide">
        <a-card :bordered="false">
            <p class="mb-0 beginner-guide-heading fw-5">{{ $t('p2p.p2p1') }}</p>
        </a-card>

        <a-card :bordered="false" class="mt-3">
            <a-row :gutter="16">
                <a-col :lg="12" v-for="(sub_item, index) in subItems" :key="index" class="pb-4">
                    <nuxt-link class="subitems fw-5" target="_blank" :to="{ path: sub_item.redirectTo }">
                        {{ sub_item.title }}
                    </nuxt-link>
                </a-col>
            </a-row>
        </a-card>
    </div>
</template>

<script>

import { mapActions, mapGetters } from "vuex";
import { p2pSubchannelId } from '~/plugins/constants';
export default {
    data() {
        return {
            pageIndex: 1,
            pageSize: 10,
        }
    },

    computed: {
        ...mapGetters("article", [
            "getSubItems",
            "subItemPagination",
            "getLatestArticles",
            "getArticleChildren",
        ]),
        ...mapGetters("general", [
            "loadingArticleDetail",
            "supporting",
            "notSupporting",
            "creatingArticleComment",
            "loadingComments"
        ]),
        subItems() {
            return this.getSubItems;
        },
    },
    // watch: {
    //     '$route.params': {
    //         handler() {
    //             this.fetchData(this.$route)
    //         },
    //         immediate: true
    //     },
    // },
    methods: {
        ...mapActions('article', ['fetchSubItems', 'fetchChannelInfo']),
        callback(key) {
            //console.log(key);
        },

    },
    mounted() {
        // const route = this.$route
        // this.fetchData(route)
        this.fetchSubItems({ channelID: p2pSubchannelId, pageIndex: this.pageIndex, pageSize: this.pageSize })
    },

}
</script>

<style>
.subitems {
    font-size: 0.875rem;
    color: #081131 !important;
    text-decoration: underline;
}
</style>
