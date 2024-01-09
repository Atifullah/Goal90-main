<template>
    <div class="app-download">

        <a-row>
            <a-col :md="{span: 18, offset: 3 }" :lg="{span: 12, offset: 0 }">
                <p class="mt-5 text-black fw-5 trade-on mb-1">Trade On The Go</p>
                <p class="download-desc text-black fw-4 mb-0">Easy to navigate, seamless, and universal BitNasdaq
                    cryptocurrency exchange application. Be on top of your trading game and download the BitNasdaq app here
                    today.</p>
                <a-row :gutter="40" class="mt-6 app-list">
                    <a-col :lg="12">
                        <p class="mb-4 text-black fw-5 app-text">Android</p>
                        <a-card class="app-box mb-3 pointer" v-for="(item, key) in getAndroidList" :key="key" @click="redirect(item.link)">

                            <a-popover placement="bottom" overlay-class-name="ios-popover" trigger="hover">
                                <template slot="content">
                                    <img :src="item.qrImage" class="text-center mt-3" height="150px" />
                                    <p class="list-subheading fw-5 text-black mb-0 py-2">{{ $t('home.home17') }}
                                    </p>
                                </template>

                                <a-row class="col-alignment" >
                                    <a-col :lg="5">
                                        <img :src="item.img" height="24px" />
                                    </a-col>
                                    <a-col :lg="13">
                                        <p class="text-black fw-5 mb-0">{{ item.title }}</p>
                                        <p class="app-sec-text mb-0">{{ item.subTitle }}</p>
                                    </a-col>
                                    <a-col :lg="6" align="end">
                                        <img :src="item.img2" />
                                    </a-col>
                                </a-row>

                            </a-popover>
                        </a-card>
                    </a-col>
                    <a-col :lg="12">
                        <p class="mb-4 text-black fw-5 app-text">IOS</p>
                        <a-card class="app-box mb-3 pointer" v-for="(item, key) in getIosList" :key="key" @click="redirect(item.link)">
                            <a-popover placement="bottom" overlay-class-name="ios-popover" trigger="hover">
                                <template slot="content">
                                    <img :src="item.qrImage" class="text-center mt-3" height="150px" />
                                    <p class="list-subheading fw-5 text-black mb-0 py-2">{{ $t('home.home17') }}
                                    </p>
                                </template>
                           
                                    <a-row class="col-alignment" >
                                        <a-col :lg="5">
                                            <img :src="item.img" height="24px" />
                                        </a-col>
                                        <a-col :lg="13">
                                            <p class="text-black fw-5 mb-0">{{ item.title }}</p>
                                            <p class="app-sec-text mb-0">{{ item.subTitle }}</p>
                                        </a-col>
                                        <a-col :lg="6" align="end">
                                            <img :src="item.img2" />
                                        </a-col>
                                    </a-row>
                             
                            </a-popover>
                        </a-card>
                    </a-col>
                </a-row>
            </a-col>
            <a-col :md="{span: 22, offset: 1 }" :lg="{span: 12, offset: 0 }"><img src="/images/right-download.svg" class="right-img"/></a-col>
        </a-row>
    </div>
</template>

<script>
import { googleLinkLink, androidLink, appleStoreBetaLink, appleStoreLink, googleAuthenticator, appleGoogleAuthenticator } from "~/plugins/constants";
export default {
    data() {
        return {
            getAndroidList: [
                {
                    img: '/images/playstore.svg',
                    title: 'Play Store',
                    subTitle: 'Download From',
                    img2: '/images/download-qrcode.svg',
                    qrImage: '/images/playstore.png',
                    link: googleLinkLink
                },
                {
                    img: '/images/android.svg',
                    title: 'Download Apk',
                    subTitle: 'Download From',
                    img2: '/images/download-qrcode.svg',
                    qrImage: '/images/bitnasdaqapk.png',
                    link: androidLink
                }
            ],
            getIosList: [
                {
                    img: '/images/apple-store1.svg',
                    title: 'iOS Beta',
                    subTitle: 'Download From',
                    img2: '/images/download-qrcode.svg',
                    qrImage: '/images/testflight.png',
                    link: appleStoreBetaLink
                },
                {
                    img: '/images/apple-store1.svg',
                    title: 'Play Store',
                    subTitle: 'Download From',
                    img2: '/images/download-qrcode.svg',
                    qrImage: '/images/appstore.png',
                    link: appleStoreLink
                }
            ]
        }
    },
    methods:{
        redirect(to){
            window.open(to)
        }
    }
}
</script>

<style></style>