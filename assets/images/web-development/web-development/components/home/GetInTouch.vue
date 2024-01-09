<template>
    <div class="get-in-touch top-sec">
        <a-row>
            <a-col :lg="12">
                <p class="mb-2 extensive-product fw-6">{{ $t('home_page.trade_notice_home') }}</p>
                <p class=" buy-sell-txt fw-4 bottom-sec mb-0">{{ $t('home_page.trade_notice1_home') }}</p>
            </a-col>
        </a-row>
        <a-row class="mt-3">
            <a-col :xl="{ span: 24, offset: 0 }" :lg="{ span: 24, offset: 0 }">
                <a-row :gutter="16">
                    <a-col :lg="11" :xl="9" class="pr-4">

                        <a-row :gutter="16">
                            <a-col :lg="11">
                                <a-card class="scan-card text-center" :bordered="false">
                                    <img src="/images/qr-code1.png" height="198px" class="scan-card-img" />
                                </a-card>
                            </a-col>
                            <a-col :lg="13" class="pl-4">
                                <p class="my-3 img-qr-product fw-5">{{ $t('home_page.hp23') }}</p>
                                <p class="buy-sell-txt fw-5 text-black mb-2">{{ $t('home_page.hp24') }} </p>
                                <nuxt-link to="/services/downloads">
                                    <a-button class="cancel-outline-btn fw-5 text-black col-alignment">
                                        <!-- <img src="/images/download-icon2.svg" class="mr-2"/> -->
                                            <svg width="24" height="24" class="mr-2">
                                                <use xlink:href="/images/svg/home.svg#download-icon2-icon"></use>
                                            </svg>
                                  
                                            More Download Options
                                    </a-button>


                                </nuxt-link>
                            </a-col>
                        </a-row>
                        <div class="download-sec pt-5 pr-5">
                            <div class="download1 text-center">
                                <a :href="appleStoreLink" target="_blank">
                                    <!-- <img src="/images/apple-store.svg" /> -->
                                    <svg width="40" height="40" class="svg-icon">
                                        <use xlink:href="/images/svg/sprite.svg#apple-store-icon"></use>
                                    </svg>
                                    <p class="download-txt fw-5 pt-1 mb-0">{{ $t('home_page.hp27') }}</p>
                                </a>
                            </div>
                            <div class="download1 text-center">
                                <a :href="googleLinkLink" target="_blank">
                                    <!-- <img src="/images/google-play.svg" /> -->
                                    <svg width="40" height="40">
                                        <use xlink:href="/images/svg/home.svg#google-play-icon"></use>
                                    </svg>

                                    <p class="download-txt fw-5 pt-1 mb-0">{{ $t('home_page.hp28') }}</p>
                                </a>
                            </div>
                            <div class="download1 text-center">
                                <a :href="androidLink" target="_blank">
                                    <!-- <img src="/images/android1.svg" /> -->
                                    <svg width="40" height="40">
                                        <use xlink:href="/images/svg/home.svg#android1-icon"></use>
                                    </svg>
                                    <p class="download-txt fw-5 pt-1 mb-0">{{ $t('home_page.hp29') }}</p>
                                </a>
                            </div>

                            <div class="download1 text-center">
                                <a href="https://testflight.apple.com/join/wr82YLnR" target="_blank">
                                    <!-- <img src="/images/api-home.svg" /> -->
                                    <svg width="40" height="40" class="svg-icon">
                                        <use xlink:href="/images/svg/sprite.svg#apple-store-icon"></use>
                                    </svg>
                                    <p class="download-txt fw-5 pt-1 mb-0">{{ $t('home_page.hp32') }}</p>
                                </a>
                            </div>
                        </div>

                    </a-col>
                    <a-col :lg="13" :xl="15" class="pl-5" align="center">
                        <img src="/images/right-side.png" class="big-img pl-5" width="100%" />
                    </a-col>
                </a-row>

            </a-col>
        </a-row>
    </div>
</template>

<script>
import { appleStoreLink, googleLinkLink, androidLink } from '~/plugins/constants'
import { mapGetters } from 'vuex'

export default {
    computed: {
        ...mapGetters('article', ['getApiData']),
        appleStoreLink() {
            return appleStoreLink
        },
        googleLinkLink() {
            return googleLinkLink
        },
        androidLink() {
            return androidLink
        },
        apiData() {
            return this.getApiData
        }
    }
}
</script>

<style></style>
