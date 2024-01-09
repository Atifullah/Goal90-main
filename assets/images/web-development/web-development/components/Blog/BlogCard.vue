<template>
    <div class="news-card">
        <nuxt-link :to="news.redirectTo">
            <a-card :bordered="false" class="news-card">
                <a-row :gutter="16" >
                    <a-col :lg="7" :xl="7">
                        <img :src="news.imgurl" width="100%" height="195px" class="news-img" />
                    </a-col>
                    <a-col :lg="17" :xl="17" class="pl-4">
                        <p class="mb-2 news-heading fw-5">{{ news.title.substr(0, 80) }}</p>
                        <p class="mb-2 new-desc fw-4"> {{ seoData.short_description ? seoData.short_description.substr(0,
                            350) : '' }}</p>
                           
                        <a-row :gutter="16">
                                    <a-col :xl="24" :lg="24">
                                        <p class="mb-2 news-time fw-5 text-underline text-black"> {{ news.source }}</p>
                                    </a-col>
                            </a-row>


                            <a-row :gutter="16" class="col-alignment">
                                    <a-col :xl="12" :lg="12">
                                        <p class="mb-0 like-share col-alignment mt-2" ><img src="/images/like.svg" class="pr-1" />{{ news.data.supportnum }}<img
                                src="/images/share.svg" class="pl-4 pr-1" />{{ news.data.sharecount }}</p>                                    </a-col>
                                    <a-col :xl="12" :lg="12" align="right">
                                        <p class="mb-0 news-time fw-4"> {{ news.updatetime }}</p>
                                    </a-col>
                            </a-row>
                    </a-col>
                </a-row>
            </a-card>
        </nuxt-link>
    </div>
</template>

<script>

export default {
    name: 'BlogCard',
    props: {
        news: {
            type: Object,
            default: () => { }
        },
    },
    data() {
        return {
        }
    },
    computed: {
        seoData() {
            return this.news.seo ? this.news.seo : {}
        }
    },

}
</script>

<style></style>
