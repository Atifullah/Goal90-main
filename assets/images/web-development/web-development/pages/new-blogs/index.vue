<!-- <template>
  <div id="new-blogs">
    <NewBlogs />
  </div>
</template>

<script>
import NewBlogs from '~/components/NewBlogs/NewBlogs'

export default {
components: {
    NewBlogs
}
}
</script>

<style lang="scss">
@import '@/assets/scss/pages/footer/new-blogs.scss';
</style> -->
<template>
  <div id="new-blogs">
    <BlogCopy v-if="!loadingArticlesList"  />
    <AppLoading v-else :pageTitle="this.$t('home_page.blogs')"/>
  </div>
</template>

<script>
import BlogCopy from '~/components/NewBlogs/BlogCopy.vue'
import { mapActions, mapGetters } from 'vuex'
import {blogChannelId } from '~/plugins/constants'
import AppLoading from '~/components/AppLoading.vue'
// import News from '~/components/FooterModule/BitnasdaqNews/News.vue'
export default {
  components: {
    BlogCopy,
    AppLoading
  },
  computed: {
    ...mapGetters("general", ["loadingArticlesList"])
  },
  methods: {
    ...mapActions('article', ['fetchSubItems']),
    async fetchBlogs() {
      let blogObject = {channelId: blogChannelId,pageIndex: 1,pageSize: 10}
      await this.fetchSubItems(blogObject)
    }
  },
  mounted(){
    this.fetchBlogs()
  }
}

</script>

<style lang="scss">
@import '@/assets/scss/pages/footer/new-blogs.scss';
</style>