<template>
  <div id="bitnasdaq-news">
    <Blogs v-if="!loadingArticlesList" />
    <AppLoading v-else :pageTitle="this.$t('home_page.blogs')"/>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Blogs from '~/components/Blog/Blogs.vue'
import {blogChannelId, newsChannelId } from '~/plugins/constants'
import AppLoading from '~/components/AppLoading.vue'
// import News from '~/components/FooterModule/BitnasdaqNews/News.vue'
export default {
  components: {
    Blogs,
    AppLoading
  },
  computed: {
    ...mapGetters("general", ["loadingArticlesList"])
  },
  methods: {
    ...mapActions('article', ['fetchSubItems', 'fetchNewsSubItems']),
    async fetchBlogs() {
      let blogObject = {channelId: blogChannelId,pageIndex: 1,pageSize: 10}
      const res =  await this.fetchSubItems(blogObject)
      console.log('blogs list', res);
    }
  },
  mounted(){
    this.fetchBlogs()
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/pages/footer/news.scss';
</style>
