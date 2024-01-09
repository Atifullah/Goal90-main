<template>
    <div>
    <div class="community">
        <div class="main-content">
            <p class="mb-2 text-black trading-text fw-5 text-center">{{$t('home_page.trade_notice_home') }}</p>
            <a-row>
                <a-col :lg="10" :offset="7">
                    <p class="text-black fw-4 mb-5 text-center product-title">{{$t('home_page.trade_notice1_home') }}</p>
                </a-col>
            </a-row>
            <a-row>
                <a-col :lg="{span:24,offset: 0}" :xl="{span:22,offset: 1}">
                    <a-row>
                        <a-col :lg="13" :xl="14">
                            <img src="/images/community-app.svg" width="100%" height="398px" class="community-left-img"/>
                        </a-col>
                        <a-col :lg="11" :xl="10">
                            <div class="qr-code-sec">
                                <div class="white-qr-code">
                                    <div class="qr-code">
                                        <img src="/images/download-qrs.png" />
                                    </div>
                                </div>
                                <div class="qr-code-text pl-4">
                                    <p class="download-scan-app fw-4 mb-1">{{$t('home_page.hp23') }}</p>
                                    <p class="product-title fw-5 text-black mb-0">{{$t('home_page.hp24') }}</p>
                                </div>

                            </div>
                            <div class="download-sec">
                                <div class="download1 text-center">
                                    <a :href="appleStoreLink" target="_blank" class="text-black">
                                        <svg width="30" height="30" class="svg-icon">
                                            <use xlink:href="/images/svg/sprite.svg#apple-store-icon"></use>
                                        </svg>
                                        <p class="download-txt fw-4 mb-0">{{ $t('home_page.hp27') }}</p>
                                    </a>
                                </div>
                                <div class="download1 text-center">
                                    <a :href="googleLinkLink" target="_blank" class="text-black">
                                        <svg width="30" height="30">
                                            <use xlink:href="/images/svg/home.svg#google-play-icon"></use>
                                        </svg>

                                        <p class="download-txt fw-4 mb-0 text-black">{{ $t('home_page.hp28') }}</p>
                                    </a>
                                </div>
                                <div class="download1 text-center">
                                    <a :href="androidLink" target="_blank" class="text-black">
                                        <svg width="30" height="30">
                                            <use xlink:href="/images/svg/home.svg#android1-icon"></use>
                                        </svg>
                                        <p class="download-txt fw-4 mb-0">{{ $t('home_page.hp29') }}</p>
                                    </a>
                                </div>

                                <div class="download1 text-center">
                                    <a href="https://testflight.apple.com/join/wr82YLnR" target="_blank" class="text-black">
                                        <svg width="30" height="30" class="svg-icon">
                                            <use xlink:href="/images/svg/sprite.svg#apple-store-icon"></use>
                                        </svg>
                                        <p class="download-txt fw-4 mb-0">{{ $t('home_page.hp32') }}</p>
                                    </a>
                                </div>
                            </div>
                            <nuxt-link to="/services/downloads"> 
                            <div class="more-option fw-5 text-black mb-0 col-alignment pointer"><svg width="24" height="24" class="mr-2">
                                        <use xlink:href="/images/svg/home.svg#download-icon2-icon"></use>
                                    </svg>{{$t('home.home19') }}
                            </div>
                         </nuxt-link>
                        </a-col>
                    </a-row>
                </a-col>
            </a-row>
        </div>
    </div>
    <div class="start-trading mt-10 pb-10 text-center">
        <div class="main-content">
            <p class="trading-price text-black fw-5 mb-3">{{$t('home.startTrading') }}</p>
            <p class="product-title text-black fw-4 mb-3">{{$t('home_page.hp22') }}</p>
            <nuxt-link to="/deal-pro/btc_usdt?ctid=1575964013659730564"><a-button class="primary-btn trading-start-btn px-5">Trade Now</a-button></nuxt-link>
        </div>
    </div>
</div>
</template>

<script>
import { appleStoreLink, googleLinkLink, androidLink } from '~/plugins/constants'

export default {
    computed: {
        appleStoreLink() {
            return appleStoreLink
        },
        googleLinkLink() {
            return googleLinkLink
        },
        androidLink() {
            return androidLink
        }
    }
}
</script>

<style></style>