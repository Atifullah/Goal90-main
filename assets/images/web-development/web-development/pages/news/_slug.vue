<template>
  <div id="bitnasdaq-news">
    <BlogDetail />
  </div>
</template>

<script>
import BlogDetail from '@/components/Blog/Detail.vue'
import { mapActions } from 'vuex'
import { bitnasdaqNewsChannelId } from '~/plugins/constants'
export default {
  components: {
    BlogDetail
  },
  data() {
    return {
      pageTitle: 'News',
    }
  },
  async asyncData({ params, store, app }) {
    const subItemTitle = params.slug
    const apiData = await store.dispatch('article/fetchChannelInfo', { channelID: bitnasdaqNewsChannelId, subTitle: subItemTitle, subChannel: bitnasdaqNewsChannelId, pageIndex: 1, pageSize: 10 });  // Replace with your API call
    const articleDetail = store.getters['article/getSubItem'];
    //pushing description/title  for seo 
    store.commit('setDescriptionSeo',articleDetail.seo.short_description);
    store.commit('setTitleSeo',articleDetail.seo.title);
        //pushing opengraph and twitter description 
          if(articleDetail.seo?.social){
          const social=articleDetail.seo.social[0]
          social.og.forEach(element => {
          app.head.meta.push({
            property:element.property, 
            content: element.content
          });
       });
        social.twitter.forEach(element => {
        app.head.meta.push({
          name:element.name, 
          content: element.content
        });
  });
}

  },
  methods: {
    ...mapActions('article', ['fetchChannelInfo']),
    async fetchData() {
      const router = this.$route
      //console.log('router', router)
      const params = router.params
      const subItemTitle = params.slug

      await this.fetchChannelInfo({ channelID: bitnasdaqNewsChannelId, subTitle: subItemTitle, subChannel: bitnasdaqNewsChannelId, pageIndex: 1, pageSize: 10 })
    }
  },

  mounted() {
    this.fetchData()

  }
}
</script>

<style lang="scss">
@import '@/assets/scss/pages/footer/news.scss';
</style>