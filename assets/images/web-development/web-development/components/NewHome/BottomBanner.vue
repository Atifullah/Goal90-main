<template>
  <div class="bottom-banner mt-3">
    <template v-if="loading">
                    <AppLoading height="133px" backgroundColor="transparent" />
                </template>
    <div class="main-content" v-else>
      <no-ssr>
                <carousel :perPage="swiperBannel.length > 4 ? 4 : swiperBannel.length" :loop="true" :speed="1500"
                    :autoplay="true" :perPageCustom="[ [1100, 4],[1200, 4],[1400, 5]]"
                    :navigationEnabled="true" :scrollPerPage="false"
                    :paginationEnabled="false" >
                    <slide v-for="(bannel, index) in swiperBannel" :key="index">
                        <a v-if="bannel.articlehref" :href="bannel.articlehref" target="_blank">
                            <img class="swiper-container-img" :src="bannel.imgurl" alt="">
                        </a>
                        <img class="swiper-container-img" v-else :src="bannel.imgurl" alt="">
                    </slide>
                </carousel>
            </no-ssr>

    </div>
  </div>
</template>

<script>
import carousel from '@/plugins/carousel/Carousel';
import slide from '@/plugins/carousel/Slide';
import { mapActions } from "vuex";
import AppLoading from '../AppLoading.vue'
export default {
  components: {
        carousel, slide, AppLoading
    },
    data() {
        return {
            swiperBannel: [],
            loading:true,
        }},
        methods:{
          ...mapActions("article", [
            "fetchArticles",
        ]),
          getarticle() {
            console.log("hello there")
            this.fetchArticles({   channelid: 2,
                pageindex: 1,
                pagesize: 12
            }).then((artical) => {
                this.loading=false
                this.swiperBannel = (artical.data && artical.data.pagedata) ? artical.data.pagedata : []
                // this.swiperBannel = this.swiperBannel.concat(this.swiperBannel);
                //console.log(this.swiperBannel)
            })
        }
        },

    created() {
        if (process.client) {
            this.getarticle()
        }}
}
</script>

<style>

</style>