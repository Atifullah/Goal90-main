<template>
    <div class="news-body">
        <div class="marqueeArea " ref="marqueeArea">
            <div class="marqueeBox" ref="marqueeBox" :style="boxStyles">
                <template v-for="index in copyTimes">
                    <a-col :lg="24" class="" v-for="(news, listIndex) in subItems"
                        :key="`marqueeItem-${index}-${listIndex}`">
                        <nuxt-link :to="news.redirectTo">
                            <a-row :gutter="16" class="pt-2 relative-card">
                                <a-col :lg="8" class="pl-0">
                                    <img :src="news.imgurl" width="100%" height="131px" class="example-img"
                                        v-if="imgLoaded" />
                                    <AppLoading width="100%" height="131px" v-else />
                                </a-col>
                                <a-col :lg="16">
                                    <div class="card-content">
                                        <p class="list-heading fw-5 mb-1" :class="news.title.length <= 51 ? '' : 'min-height'"
                                            v-html="news.title.substr(0, 70)"></p>
                                        <div :class="news.title.length <= 51 ? 'description-high' : 'description-low'">
                                            <p class="list-time-txt fw-4 text-black pb-1 mb-0">
                                                {{ news.seo.short_description ? news.seo.short_description.substr(0, 180) :
                                                    '' }}
                                            </p>
                                        </div>
                                    </div>
                                    <div class="card-footer">
                                        <a-row :gutter="16" class="col-alignment">
                                            <a-col :lg="12">
                                                <p class="list-time-txt fw-5 mb-0">
                                                    <span class="list-time-txt fw-5 text-underline pr-2"
                                                        v-if="news.source">{{
                                                            news.source }}</span>
                                                </p>
                                            </a-col>
                                            <a-col :lg="12" align="end">
                                                <p class="mb-0 gray-active fw-5 update-time">{{
                                                    global_get_local_time(news.createtime, "YYYY-MM-DD HH:mm:ss") }}</p>
                                            </a-col>
                                        </a-row>
                                    </div>
                                </a-col>
                            </a-row>
                        </nuxt-link>
                        <a-divider class="mt-3 mb-2 news-divider" />
                    </a-col>
                </template>
            </div>
        </div>
    </div>
</template>
        
<script>
import { mapActions, mapGetters } from 'vuex'
import { bitnasdaqNewsChannelId } from '~/plugins/constants'
import AppLoading from "../AppLoading.vue";
export default {
    name: 'HomeNews',
    mounted() {
        const _self = this;
        this.fetchNews();
        window.addEventListener('scroll', () => {
            _self.imgLoaded = true;
        });
    },
    beforeDestroy() {
        const _self = this;
        window.removeEventListener('scroll', () => {
            _self.imgLoaded = false;
        });
    },
    watch: {
        subItems(x) {
            if (x.length > 0) {
                this.setMarquee();
            }
        }
    },
    data() {
        return {
            copyTimes: 2,
            movingDistance: 0,
            windowWidth: null,
            marqueeBox: null,
            marqueeArea: null,
            time: 10,
            imgLoaded: false
        };
    },
    computed: {
        ...mapGetters('article', ['getSubItems']),
        subItems() {
            return this.getSubItems;
        },
        boxStyles() {
            return {
                transform: `translateY(-${this.movingDistance}px)`,
                animationDuration: `${this.time}s`,
            };
        },
    },
    methods: {
        ...mapActions('article', ['fetchSubItems']),
        fetchNews() {
            const newsObject = {
                channelId: bitnasdaqNewsChannelId,
                pageIndex: 1,
                pageSize: 10,
            };
            this.fetchSubItems(newsObject);
        },
        stopAnimations() {
            //console.log('Animation Paused')
            const elements = document.querySelectorAll('.marquee__group');
            elements.forEach(element => {
                element.classList.add('marquee-paused');
            });
        },
        resumeAnimations() {
            const elements = document.querySelectorAll('.marquee__group');
            elements.forEach(element => {
                element.classList.remove('marquee-paused');
            });
        },
        setMarquee() {
            this.copyTimes = 1;
            this.$nextTick(() => {
                const marqueeArea = this.$refs.marqueeArea;
                const marqueeBox = this.$refs.marqueeBox;
                const areaHeight = marqueeArea ? Math.floor(marqueeArea.offsetHeight) : 0;
                const boxHeight = marqueeBox ? Math.floor(marqueeBox.offsetHeight) : 0;
                // console.log(areaHeight,boxHeight)
                this.copyTimes = Math.max(2, Math.ceil((areaHeight * 2) / boxHeight)) || 2;
                this.movingDistance = boxHeight * Math.floor(this.copyTimes / 2);
                this.time = parseFloat(((this.time * this.movingDistance) / 375).toFixed(2));
            });
        },
    },
    components: { AppLoading }
};
</script>
        
<style scoped>
@keyframes boxMove {
    from {
        transform: translateY(0);
    }
}

.marqueeArea {
    position: relative;
    overflow: hidden;
    height: 562px;
}

.marqueeBox {
    display: flex;
    flex-direction: column;
    /* white-space: nowrap; */
    animation: boxMove 10s linear infinite;
    overflow: hidden;
}

.marqueeBox:hover {
    animation-play-state: paused;
}

.marqueeItem {
    display: inline-block;
}

.relative-card {
    position: relative;
}

.card-content {
    padding-bottom: 50px;
    /* Adjust as needed to give space for the footer */
}

.card-footer {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #fff;
    padding: 11px;
}

.description-low {
    /* Set a fixed maximum height for the description */
    padding: 0px !important;
    min-height: 46px;
    max-height: 46px;
}

.description-high {
    /* Set a fixed maximum height for the description */
    padding: 0px !important;
    min-height: 66px;
    max-height: 66px;
}</style>