<template>
  <div id="bitnasdaq-news">
    <Blogs v-if="!loadingArticlesList" :pageTitle="this.$t('footer.footer_News')" />
    <AppLoading v-else />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Blogs from '~/components/Blog/Blogs.vue'
import { blogChannelId, bitnasdaqNewsChannelId } from '~/plugins/constants'
import AppLoading from '~/components/AppLoading.vue'
// import News from '~/components/FooterModule/BitnasdaqNews/News.vue'
export default {
  components: {
    Blogs,
    AppLoading
  },
    data() {
        return {
            pageIndex: 1,
            pageSize: 10,
            lang: "en_us",
        };
    },
  computed: {
    ...mapGetters("general", ["loadingArticlesList"]),
    ...mapGetters("article", [
      "getSubItems",
      "subItemPagination",
      "getLatestArticles",
      "getArticleChildren",
    ]),
  },
  methods: {
    ...mapActions('article', ['fetchSubItems', 'fetchNewsSubItems','fetchLatestArticles']),
    async fetchNews() {
      //console.log('blogType:::route', channelId);
      // let newsObject = {channelId: flashNewsChannelId,pageIndex: 1,pageSize: 10}
      // await this.fetchSubItems(newsObject)
      await this.fetchSubItems({ channelId: bitnasdaqNewsChannelId, pageIndex: 1, pageSize: 10 })
     await this.fetchLatestArticles({ channelId: bitnasdaqNewsChannelId, istoparticle: true, pageIndex: this.pageIndex, pageSize: this.pageSize, lang: this.lang });

      // await this.fetchNewsSubItems({channelId: bitnasdaqNewsChannelId,pageIndex: 1,pageSize: 10})
    }
  },
  mounted() {
    this.fetchNews()
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/pages/footer/news.scss';
</style>
