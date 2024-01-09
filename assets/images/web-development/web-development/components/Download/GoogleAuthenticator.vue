<template>
    <div class="app-download">

        <a-row>
            <a-col :md="{span: 18, offset: 3 }" :lg="{span: 12, offset: 0 }">
                <p class="mt-5 text-black fw-5 trade-on mb-1">Google Authenticator</p>
                <p class="download-desc text-black fw-4 mb-0 pr-5 mr-5 google-auth">Bind your account with the Bitnasdaq Authenticator to generate verification codes that enhance account security and protection</p>
                <a-row :gutter="40" class="mt-6 app-list" >
                    <a-col :lg="12">
                        <p class="mb-4 text-black fw-5 app-text">Android</p>
                        <a-card class="app-box mb-3 pointer"  @click="redirect(list.google.link)">
                            <a-popover placement="bottom" overlay-class-name="ios-popover" trigger="hover">
                                <template slot="content">
                                    <img :src="list.google.qrImage" class="text-center mt-3" height="150px" />
                                    <p class="list-subheading fw-5 text-black mb-0 py-2">{{ $t('home.home17') }}
                                    </p>
                                </template>
                            <a-row class="col-alignment">
                                <a-col :lg="5">
                                    <img :src="list.google.img" height="24px"/>
                                </a-col>
                                <a-col :lg="13">
                                    <p class="text-black fw-5 mb-0">{{ list.google.title }}</p>
                                    <p class="app-sec-text mb-0">{{list.google.subTitle}}</p>
                                </a-col>
                                <a-col :lg="6" align="end">
                                    <img :src="list.google.img2" />
                                </a-col>
                            </a-row>
                            </a-popover>
                        </a-card>
                    </a-col>
                    <a-col :lg="12">
                        <p class="mb-4 text-black fw-5 app-text">IOS</p>
                        <a-card class="app-box mb-3 pointer" @click="redirect(list.ios.link)">
                            <a-popover placement="bottom" overlay-class-name="ios-popover" trigger="hover">
                                <template slot="content">
                                    <img :src="list.google.qrImage" class="text-center mt-3" height="150px" />
                                    <p class="list-subheading fw-5 text-black mb-0 py-2">{{ $t('home.home17') }}
                                    </p>
                                </template>
                            <a-row class="col-alignment">
                                <a-col :lg="5">
                                    <img :src="list.ios.img" height="24px"/>
                                </a-col>
                                <a-col :lg="13">
                                    <p class="text-black fw-5 mb-0">{{list.ios.title}}</p>
                                    <p class="app-sec-text mb-0">{{list.ios.subTitle}}</p>
                                </a-col>
                                <a-col :lg="6" align="end">
                                    <img :src="list.ios.img2" />
                                </a-col>
                            </a-row>
                            </a-popover>
                        </a-card>
                    </a-col>
                </a-row>
            </a-col>
            <a-col :md="{span: 22, offset: 1 }" :lg="{span: 12, offset: 0 }"><img src="/images/right-download2.svg" class="right-img"/></a-col>
        </a-row>
    </div>
</template>

<script>
import { googleAuthenticator, appleGoogleAuthenticator } from "~/plugins/constants";
export default {
data() {
    return {
        list: {
            google:
                {
                    img: '/images/playstore.svg',
                    title: 'Play Store',
                    subTitle: 'Download From',
                    img2: '/images/download-qrcode.svg',
                    qrImage: '/images/googleauthplay.png',
                    link: googleAuthenticator
                },
                ios:
                {
                    img: '/images/apple-store1.svg',
                    title: 'Apple Store',
                    subTitle: 'Download From',
                    img2: '/images/download-qrcode.svg',
                    qrImage: '/images/googleauthapp.png',
                    link: appleGoogleAuthenticator
                }
        },
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