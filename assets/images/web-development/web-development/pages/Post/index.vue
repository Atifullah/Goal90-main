<template>
    <div id="bitnasdaq-news">
        <BitnasdaqPost v-if="!loadingArticlesList" />
        <AppLoading v-else :pageTitle="this.$t('home_page.blogs')" />
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { bitnasdaqPostChannelId } from "~/plugins/constants";


import BitnasdaqPost from '~/components/Posts/post.vue'
import AppLoading from '~/components/AppLoading.vue'

export default {
    components: {
        BitnasdaqPost
    },
    computed: {
        ...mapGetters("general", ["loadingArticlesList"])
    },
    methods: {
        ...mapActions('article', ['fetchSubItems', 'fetchNewsSubItems']),
        async fetchBlogs() {
            let blogObject = { channelId: bitnasdaqPostChannelId, pageIndex: 1, pageSize: 10 }
            const res = await this.fetchSubItems(blogObject)
            console.log('blogs list', res);
        }
    },
    mounted() {
        this.fetchBlogs()
    }
}
</script>

<style lang="scss">
@import '@/assets/scss/pages/footer/news.scss';
</style>
