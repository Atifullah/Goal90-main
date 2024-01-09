<template>
    <a-card class="list-notifi" :bordered="false" v-show="list.length > 0">
        <div class="main-content">
            <a-row :gutter="16">
                <a-col :xl="12">

                    <a-carousel :autoplay="true" effect="fade" :dots="false">
                        <a-row v-for=" (a, index) in list" :key="index + Math.random()">
                            <div @click="goDetail(a)" class="pt-1">
                                <a-col :lg="20" :xl="20" class="pointer">
                                <img src="/images/speaker.svg" class="mr-2"/>    <a v-if="a.articlehref" :href="a.articlehref" target="_blank">{{
                                        a.title }}</a>
                                    <span v-else class="email-binding-txt">{{ a.title }}</span>
                                    <a class="read-more mb-0 pointer ml-2">More <!-- {{ $t('home_page.reade_more_home') }} -->
                                    </a>
                                </a-col>
                            </div>
                        </a-row>
                    </a-carousel>
                </a-col>


            </a-row>
        </div>
    </a-card>
</template>

<script>
import { announcementId,SubAnnouncementId } from '~/plugins/constants';
import { mapActions, mapGetters } from "vuex";
export default {
    name: "banner-article",

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

    mounted() {
        this.getList();
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
    }
}
</script>

<style  scoped lang="scss">
@import "assets/variables/light.scss";
.list-notifi {
    background: transparent;

    :deep(.ant-card-body) {
        padding: 4px 12px !important;
    }

    .email-binding-txt {
        font-weight: 400;
        font-size: $fs_sm;
        line-height: 26px;
        color: $heading-color;
    }

    .read-more {
        font-weight: 500;
        font-size: $fs_xs;
        color: $text-grey;
    }
}
</style>
