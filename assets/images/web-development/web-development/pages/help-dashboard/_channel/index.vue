<template>
    <div id="help-center">

        <SubItems v-if="showSubItem" />
        <SubItemDetail v-else-if="showSubItemDetail" />

    </div>
</template>

<script>

import SubItems from "@/components/HelpDashboard/SubItems.vue"
import SubItemDetail from "@/components/HelpDashboard/SubItemDetail.vue"
import { mapActions, mapGetters } from 'vuex'
export default {
    async asyncData({ store,route }) {
        console.log("ASync function callled")
        const params = route.params
        let channel = params.channel
        const queryParams = route.query
        const channelId = queryParams.channelId
        const subItemTitle = queryParams.subItemTitle
        const subChannel = queryParams.subChannel
        const mainChannel = queryParams.mainChannel
        channel = mainChannel ? mainChannel : channel
        if (channelId) {
            await store.dispatch('article/fetchSubItems', { channelID: channelId, pageIndex: 1, pageSize: 20 });
            const articleDetail = store.getters['article/getSubItems'];
           
        } else {
            await store.dispatch('article/fetchChannelInfo', { channelID: channel, subTitle: subItemTitle, subChannel: subChannel, pageIndex: 1, pageSize: 10 });
            const articleDetail = store.getters['article/getSubItem'];
            if(articleDetail.hasSeo){
            store.commit('setTitleSeo', articleDetail.seo.title);
            store.commit('setH1Seo', articleDetail.seo.title);
            store.commit('setDescriptionSeo', articleDetail.seo.description.substring(0, 150));
            }

        }
    },
    components: {
        SubItems,
        SubItemDetail
    },
    data() {
        return {
            showSubItem: false,
            showSubItemDetail: false
        }
    },
    computed: {
        ...mapGetters('article', ['getSubItems', 'getSubItem']),
           ...mapGetters("article", ["getArticleChildren", "getArticleDetail"]),
        ...mapGetters("general", ["loadingMainChannels"]),
        articles() {
            return this.getArticleChildren;
        },
        filterArticle() {
            return this.articles.filter(article => article.children && article.children.length > 0);

        },
    },
    watch: {
        '$route.params': {
            handler() {
                this.fetchData(this.$route)
            },
            immediate: true
        },
        getSubItems(newSubItems) {
            if (newSubItems.length === 1) {
                const subItem = newSubItems[0]; // Assuming getSubItems returns an array
                const path = subItem.redirectTo;
                this.$router.push(path);
            }

        },
    },

    methods: {
        ...mapActions('article', ['fetchSubItems', 'fetchChannelInfo']),
        async fetchData(route) {
            const params = route.params
            let channel = params.channel
            const queryParams = this.$route.query
            const channelId = queryParams.channelId
            const subItemTitle = queryParams.subItemTitle
            const subChannel = queryParams.subChannel
            const mainChannel = queryParams.mainChannel
            const lang = queryParams.lang
            channel = mainChannel ? mainChannel : channel
            if (lang) {
                this.$store.commit("set_lang", lang);
            }

            if (channelId) {
                this.showSubItem = true
                this.showSubItemDetail = false
                this.fetchSubItems({ channelID: channelId, pageIndex: 1, pageSize: 10 })
            } else {
                this.showSubItem = false
                this.showSubItemDetail = true
                await this.fetchChannelInfo({ channelID: channel, subTitle: subItemTitle, subChannel: subChannel, pageIndex: 1, pageSize: 10 })
     
            }
        },
        // openSubmenu(childId) {
        //     const articlesArray = this.filterArticle;
        //     let activeIndex = -1;

        //     articlesArray.forEach((article, index) => {
        //         const childIndex = article.children.findIndex((child) => child.id === childId);
        //         if (childIndex !== -1) {
        //             activeIndex = index;
        //             const i = index + childIndex;
        //             const submenuKey = `sub${i}`;
        //             this.openKeys = [submenuKey];
        //             this.selectedKey = [`childKey${i}`];
        //         }
        //     });
        // }
    },

   
}
</script>

<style lang="scss">
@import '@/assets/scss/pages/help-center/help-center.scss';
</style>
