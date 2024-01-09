<template>
    <div class="new-download">
        <div class="download-bg">
            <a-row>
                <a-col :xs="{ span: 22, offset: 1 }" :sm="{ span: 18, offset: 3 }" :md="{ span: 18, offset: 3 }"
                    :lg="{ span: 14, offset: 5 }" :xl="{ span: 12, offset: 6 }" :xxl="{ span: 8, offset: 8 }"
                    align="center">
                    <p class="download-heading fw-5 mb-2 text-black">{{$t('downloads.download1')}}</p>
                    <p class="download-desc mb-0 text-black fw-4">{{$t('downloads.download2')}}</p>
                    <a-radio-group default-value="1" v-model="currentTab" size="large" class="mt-10">
                        <a-radio-button value="1">
                           {{$t('downloads.appdownload')}}
                        </a-radio-button>
                        <a-radio-button value="2">
                            {{$t('google.loadgoogle')}}
                        </a-radio-button>
                    </a-radio-group>
                </a-col>
            </a-row>
        </div>
        <AppDownload v-show="currentTab == 1" />
        <GoogleAuthenticator v-show="currentTab == 2" />
        <WhyChooseBitnasdaq />
        <div class="download-btn-sec px-3 py-3" v-if="isMobile">
            <template v-if="currentTab == 1">
                <a-row :gutter="16">
                    <a-col :xs="12" :sm="12" v-if="!isMobile?.iOS()">
                        <a @click="redirect('playstore')">
                            <div class="mob-btn">
                                <div class="left-side">
                                    <img src="/images/playstore.svg" height="20px" class="mr-3" />
                                </div>
                                <div class="right-side">
                                    <p class="mb-0 btn-txt fw-7 text-black">{{ $t('down_load.dow10') }}</p>
                                    <p class="mb-0 btn-desc fw-5">{{ $t('down_load.dow11') }}</p>
                                </div>
                            </div>
                        </a>
                    </a-col>
                    <a-col :xs="12" :sm="12" @click="redirect('android')" v-if="!isMobile?.iOS()">
                        <a @click="redirect('android')">
                            <div class="mob-btn">
                                <div class="left-side">
                                    <img src="/images/android.svg" height="20px" class="mr-3" />
                                </div>
                                <div class="right-side">
                                    <p class="mb-0 btn-txt fw-7 text-black">{{ $t('down_load.dow12') }}</p>
                                    <p class="mb-0 btn-desc fw-5">{{ $t('down_load.dow11') }}</p>
                                </div>
                            </div>
                        </a>
                    </a-col>
                </a-row>
                <a-row :gutter="16" class="mt-3" v-if="!isMobile?.Android()">
                    <a-col :xs="12" :sm="12">
                        <a @click="redirect('appstore')">
                            <div class="mob-btn">
                                <div class="left-side">
                                    <img src="/images/apple-store.svg" height="20px" class="mr-3" />
                                </div>
                                <div class="right-side">
                                    <p class="mb-0 btn-txt fw-7 text-black">{{ $t('down_load.dow13') }}</p>
                                    <p class="mb-0 btn-desc fw-5">{{ $t('down_load.dow11') }}</p>
                                </div>
                            </div>
                        </a>
                    </a-col>
                    <a-col :xs="12" :sm="12" v-if="!isMobile?.Android()">
                        <a @click="redirect('iosbeta')">
                            <div class="mob-btn">
                                <div class="left-side">
                                    <img src="/images/apple-store.svg" height="20px" class="mr-3" />
                                </div>
                                <div class="right-side">
                                    <p class="mb-0 btn-txt fw-7 text-black">{{ $t('down_load.dow14') }}</p>
                                    <p class="mb-0 btn-desc fw-5">{{ $t('down_load.dow11') }}</p>
                                </div>
                            </div>
                        </a>
                    </a-col>
                </a-row>
            </template>

            <a-row :gutter="16" v-if="isMobile && currentTab == 2">
                <a-col :xs="24" v-if="isMobile?.Android()">
                    <a @click="redirect('playstore')">
                        <div class="mob-btn">
                            <div class="left-side">
                                <img src="/images/playstore.svg" height="20px" class="mr-3" />
                            </div>
                            <div class="right-side">
                                <p class="mb-0 btn-txt fw-7 text-black">{{ $t('down_load.dow10') }}</p>
                                <p class="mb-0 btn-desc fw-5">{{ $t('down_load.dow11') }}</p>
                            </div>
                        </div>
                    </a>
                </a-col>
                <a-col :xs="24" @click="redirect('appleauth')" v-if="isMobile?.iOS()">
                    <a @click="redirect('appleauth')">
                        <div class="mob-btn">
                            <div class="left-side">
                                <img src="/images/apple-store.svg" height="20px" class="mr-3" />
                            </div>
                            <div class="right-side">
                                <p class="mb-0 btn-txt fw-7 text-black">{{ $t('down_load.dow13') }}</p>
                                <p class="mb-0 btn-desc fw-5">{{ $t('down_load.dow11') }}</p>
                            </div>
                        </div>
                    </a>
                </a-col>
            </a-row>

        </div>
    </div>
</template>

<script>
import AppDownload from './AppDownload.vue'
import GoogleAuthenticator from './GoogleAuthenticator.vue'
import WhyChooseBitnasdaq from './WhyChooseBitnasdaq.vue'
import { googleLinkLink, androidLink, appleStoreBetaLink, appleStoreLink, googleAuthenticator, appleGoogleAuthenticator } from "~/plugins/constants";
export default {
    components: { AppDownload, WhyChooseBitnasdaq, GoogleAuthenticator },
    data() {
        return {
            currentTab: '1',
            isMobile: undefined
        }
    },
    methods: {
        redirect(key) {

            if (this.currentTab == 1) {
                switch (key) {
                    case 'android': window.open(androidLink); break;
                    case 'playstore': window.open(googleLinkLink); break;
                    case 'iosbeta': window.open(appleStoreBetaLink); break;
                    case 'appstore': window.open(appleStoreLink); break;

                    case 'appleauth': window.open(appleGoogleAuthenticator); break;
                    case 'playauth': window.open(googleAuthenticator); break;
                    default:
                        break;
                }
            } else {
                switch (key) {
                    case 'playstore': window.open(googleAuthenticator); break;
                    case 'appleauth': window.open(appleGoogleAuthenticator); break;
                    default:
                        break;
                }
            }

        }
    },
    mounted() {
        import("~/plugins/helpers").then(({ isMobile }) => {
            this.isMobile = isMobile
        });

    }

}
</script>

<style></style>