<template>
    <div id="black-footer">
        <a-row :gutter="16" class="pt-5 pb-4 footer-bg m-0">
            <div class="footer-box">
                <template v-if="loadingFooterData">
                    <AppLoading height="416px" backgroundColor="transparent" />
                </template>

                <template v-else>
                    <a-col :md="6" :lg="5" class="logo-col pr-5">
                        <img src="/images/white-logo.svg" class="mb-4" />
                        <a-row class="mt-2 mb-0" v-for="email in emailData" :key="email.name">
                            <a-col :lg="24">
                                <SocialLinks />

                                <!-- <p class="footerEmail mb-0">
                                    {{ email.name }}
                                </p> -->
                                <p class="list-desc fw-4 mb-1">
                                    {{ email.email }}
                                </p>
                            </a-col>
                        </a-row>
                    </a-col>
                </template>
                <a-col :xs="24" :sm="24" :md="24" :lg="19" class="mb-4">
                    <a-row :gutter="8" type="flex">
                        <a-col class="footer-sec-space" v-for="(footerChannel, footerIndex) in footerChannels"
                            :key="footerIndex">
                            <a-collapse v-model="activeKey">
                                <template #expandIcon="props">
                                    <a-icon type="caret-right" :rotate="props.isActive ? 90 : 0" />
                                </template>
                                <a-collapse-panel :key="footerIndex + ''" :disabled="!screenSizeIsSm">
                                    <template #header>
                                        <h3 class="faq-header fw-5 mb-3">{{ footerChannel.channelname }}</h3>
                                    </template>
                                    <p class="mb-2 p-0" v-for="(subChannel, childIndex) in footerChannel.children"
                                        :key="childIndex + 'footer'"> <nuxt-link :to="`${subChannel.imageurl}`"
                                            v-if="subChannel.imageurl">{{ subChannel.channelname
                                            }}</nuxt-link>
                                        <a href="javascript:;" v-else>{{
                                            subChannel.channelname
                                        }}</a>
                                    </p>
                                </a-collapse-panel>
                            </a-collapse>
                        </a-col>
                    </a-row>
                </a-col>

                <!-- <a-col :lg="19" class="mb-4">
                    <a-row :gutter="8" type="flex" justify="space-between">

                        <a-col :lg="4" v-for="(footerChannel, footerIndex) in footerChannels" :key="footerIndex + 'footer'">
                            <p class="list-title fw-5 mb-3">{{ footerChannel.channelname }}</p>
                            <ul class="footer-list">
                                <li v-for="(subChannel, childIndex) in footerChannel.children" :key="childIndex + 'footer'">
                                    <nuxt-link :to="`${subChannel.imageurl}`" v-if="subChannel.imageurl">{{
                                        subChannel.channelname }}</nuxt-link>
                                    <a href="javascript:;" v-else>{{ subChannel.channelname }}</a>
                                </li>
                            </ul>
                        </a-col>
                    </a-row>
                </a-col> -->
            </div>

        </a-row>

        <a-row class="sub-bar">
            <a-col :lg="24" class="pb-5 text-center">
                <div class="main-content">
                    <a-divider class="footer-divider" />
                    <p class="sub-bar-txt fw-4 mb-0">{{ $t('copyright.copy_right') }}</p>
                  
                </div>
            </a-col>
        </a-row>

    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { webFooterArticle } from '~/plugins/constants';
import AppLoading from '../AppLoading.vue';
import SocialLinks from "../App/SocialLinks.vue";

export default {
    components: {
        AppLoading,
        SocialLinks
    },
    data() {
        return {
            hoverKey: -1,
            activeKey: [],
            screenSizeIsSm: false
        }
    },

    computed: {
        ...mapGetters('article', ['getFooterData']),
        ...mapGetters('general', ['loadingFooterData']),
        ...mapGetters("constants", ["getEmails"]),
        emailData() {
            return this.getEmails.length>0 ? this.getEmails.filter(item => item.email == 'service@bitnasdaq.com') : [];
        },
        footerChannels: function () {
            return this.getFooterData
        }
    },
    watch: {
        footerChannels: function (val) {
            if (!this.screenSizeIsSm) {
                val.map((channel, index) => {
                    //console.log('index', index);
                    //console.log('channel', channel);
                    this.activeKey.push(index + '')
                })
            }

        }
    },
    methods: {
        ...mapActions('article', ['fetchFooterData']), 
        onResize() {
            const innerWidth = window.innerWidth
            this.screenSizeIsSm = false
            if (innerWidth <= 576) {
                this.screenSizeIsSm = true
                this.activeKey = []
            }
        },
    },
    mounted() {
        this.fetchFooterData({ channelId: webFooterArticle });
        // this.fetchConstants({ key: "social_infos" });
        // constants :  pre key
        

        this.$nextTick(() => {
            window.addEventListener('resize', this.onResize);
        })
        this.onResize()
    },
}
</script>

<style lang="scss">
@import '@/assets/scss/pages/footer/black-footer.scss';

.footerEmailblack {
    font-family: Satoshi;
    color: #FFFFFF;
    font-size: 14px;
    font-weight: 900;
    font-weight: bold;
    line-height: 25px;
    letter-spacing: 0em;
    text-align: left;
    margin-bottom: 10px;
}

.km-chat-icon-sidebox {
    display: none !important;
}

.km-custom-widget-background-color {
    display: none !important;
}
</style>
