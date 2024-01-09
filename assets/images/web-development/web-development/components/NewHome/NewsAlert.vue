<template>
    <div class="main-content mt-2">
        <a-card class="news-alert" :bordered="false">
            <a-row :gutter="16">
                <a-col :lg="24" :xl="24">
                    <a-carousel :autoplay="true" effect="fade" :dots="false">


                        <a-row v-for=" (a, index) in list" :key="index + Math.random()">
                            <a-col :lg="20" :xl="20" class="pointer" @click="goDetail(a)">
                                <div class="col-alignment">
                                    <img src="/images/volume-down.svg" class="pr-2" />
                                       <a v-if="a.articlehref" :href="a.articlehref" target="_blank">{{
                                        a.title }}</a>
                                        <span v-else class="news-text">{{ a.title }}</span>
                                </div>
                            </a-col>

                            <a-col :lg="4" :xl="4" align="end" @click="goDetail(a)">

                                <p class="read-more mb-0 pointer"> {{ $t('home_page.reade_more_home') }}

                                    <svg width="15" height="15" class="ml-2 svg-icon">
                                        <use xlink:href="/images/svg/sprite.svg#black-right-arrow-icon"></use>
                                    </svg>
                                </p>
                            </a-col>
                        </a-row>

                    </a-carousel>
                </a-col>
            </a-row>
        </a-card>

    </div>
</template>

<script>
import { announcementId, SubAnnouncementId } from '~/plugins/constants';
import { mapActions, mapGetters } from "vuex";
export default {


    name: "news-alert",

    data() {
        return {
            lang: this.$store.state.hex_lang.locale,
            list: [],
            translatepx: '',
            trantimer: ''
        }
    },
    watch: {
        '$store.state.hex_lang.locale': function (val) {
            this.lang = val;
            this.getList();
        }
    },
    methods: {
        ...mapActions("article", [
            "fetchArticles",
        ]),
        pushData(data) {
            this.list = [];
            if (data && data.pagedata.length > 0) {
                data.pagedata.forEach((item) => {
                    item.title = item.title;
                    item.mintime = new Date(this.global_get_local_time(item.updatetime)).getTime();
                    this.list.push(item);
                })
            }
        },
        // 去详情
        goDetail(article) {
            this.$router.push({ path: `/help-dashboard/${announcementId}?subChannel=${SubAnnouncementId}&subItemTitle=${article.subtitle}` });
        },
        getList() {
            clearInterval(this.trantimer);
            this.fetchArticles({
                channelid: 16,
                pageindex: 1,
                pagesize: 24,
            }).then((data) => {
                this.pushData(data.data);
            })
        },
        sorts() {
            return function (a, b) {
                return a.mintime > b.mintime ? -1 : 1;
            }
        },
        setanimation(bol) {
            if (!bol) {
                clearInterval(this.trantimer)
            } else {
                if (this.list.length > 0) {
                    const lenthceil = Math.ceil(this.list.length / 3);
                    let _ceil = 1;

                    if (this.trantimer) {
                        clearInterval(this.trantimer);
                        this.trantimer = null
                    }
                    this.trantimer = setInterval(() => {
                        _ceil++;
                        if (_ceil > lenthceil) {
                            _ceil = 1
                        }
                        this.translatepx = (_ceil - 1) * 40
                    }, 3500)
                }
            }
        }
    },

    beforeDestroy() {
        clearInterval(this.trantimer)
    },
    mounted() {
        this.getList();
    },


}
</script>

<style></style>
