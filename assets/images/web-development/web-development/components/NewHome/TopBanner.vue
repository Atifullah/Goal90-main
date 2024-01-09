<template>
    <div class="home-container">
        <div class="home-slider main-content">
            <!-- WHEN LOGIN -->
            <div v-if="Userlogin">
                <template v-if="loadingPromotions">
                    <AppLoading height="435px" backgroundColor="transparent" />
                </template>
                <template v-else>
                    <a-carousel :autoplaySpeed="10000" :autoplay="true" dotPosition="right" :dots="true" v-if="showCarousel"
                        ref="OneCarousel">
                        <a-row :gutter="16"
                            v-for="(promotion, key) in  promotions.filter(item => item.subtitle != 'trusted-compliant-and-efficient')"
                            :key="key">
                            <a-col :lg="10" :xxl="12" class="mt-10 left-side">
                                <a-row>
                                    <a-col :lg="21">
                                        <p class="home-heading mb-2 text-black fw-5">{{ promotion.title }}</p>
                                    </a-col>
                                </a-row>
                                <a-row>
                                    <a-col :lg="23" :xxl="18">
                                        <p class="mb-3 pb-3 fw-4 trading-price text-black">{{
                                            promotion.shortdescription }}!</p>
                                        <nuxt-link
                                            :to="promotion.articlehref == '' ? '/deal-pro/btc_usdt?ctid=1575964013659730564' : promotion.articlehref.replace(/[\?&]lang=en_us/, '')">
                                            <a-button class="primary-btn trading-start-btn px-5">{{ promotion.source == ''
                                                ? 'Trade Now' : promotion.source }}</a-button>
                                        </nuxt-link>

                                    </a-col>
                                </a-row>
                            </a-col>
                            <a-col :lg="14" :xxl="12" align="end" class="pl-5">
                                <a :href="promotion.articlehref ? promotion.articlehref : 'javascript:;'"
                                    :target="promotion.articlehref ? '_blank' : '_self'">
                                    <img class="pl-5 top-slider-imgs" :src="promotion.imgurl" height="435px" />
                                </a>
                            </a-col>
                        </a-row>
                    </a-carousel>
                </template>
                <template>
                    <div class="slider-top-arrow">
                        <img src="/images/top-up-arrow-active.svg" height="20px" @click="$refs.OneCarousel.prev()"
                            class="pointer" />
                    </div>
                    <div class="slider-down-arrow">
                        <img src="/images/top-down-arrow-active.svg" height="20px" @click="$refs.OneCarousel.next()"
                            class="pointer" />
                    </div>
                </template>
            </div>
            <!-- WHEN NOT LOGIN -->
            <div v-else>
                <template v-if="loadingPromotions">
                    <AppLoading height="435px" backgroundColor="transparent" />
                </template>
                <template v-else>

                    <a-row :gutter="16" class="col-alignment" v-if="showCarousel"
                        v-for="(promotion, key) in  promotions.filter(item => item.subtitle == 'trusted-compliant-and-efficient') "
                        :key="key">
                        <a-col :lg="12">
                            <a-row>
                                <a-col :lg="20">
                                    <p class="home-heading mb-3 text-black fw-5">{{ promotion.title }}</p>
                                </a-col>
                            </a-row>
                            <a-row :gutter="8" class="mb-3">
                                <a-form-model :model="getStartedForm" ref="ticketForm" :rules="rules"
                                    :hide-required-mark="true" label-align="left">
                                    <a-col :lg="11">
                                        <AppFormModelItem prop="email">
                                            <a-input class="home-input" v-model="getStartedForm.email"
                                                placeholder="Enter Email/Phone number" />
                                        </AppFormModelItem>
                                    </a-col>
                                    <a-col :lg="6">
                                        <a-button class="primary-btn join-now" block @click="join">{{$t('agent_plan.ap_join_aff')}}</a-button>
                                    </a-col>
                                </a-form-model>
                            </a-row>
                            <a-row>
                                <a-col :lg="18">
                                    <p class="mb-3 pb-3 fw-4 home-desc text-black">{{ promotion.shortdescription }}</p>
                                </a-col>
                            </a-row>
                            <a-row>
                                <a-col :lg="8" :xl="6">
                                    <p class="home-desc mb-0">{{$t('adsharing.as29')}}
                                    </p>
                                    <div class="apps-icon">
                                        <div class="icon-box pointer">
                                            <img src="/images/g-home-icon.svg" @click="googleLogin" />
                                        </div>
                                        <div class="icon-box pointer">
                                            <img src="/images/a-home-icon.svg" @click="appleLogin" />
                                        </div>
                                    </div>
                                </a-col>
                                <a-col :lg="4" :xl="4">
                                    <p class="home-desc mb-3"> {{$t('adsharing.as8')}}
                                    </p>

                                    <a-popover :title="false" trigger="hover" placement="right"
                                        overlay-class-name="download-popover">
                                        <template slot="content">
                                            <span>
                                                <div class="text-center">
                                                    <img src="/images/download-qrs.png" class="mt-2 pt-1" height="155px" />
                                                    <p class="px-4 mx-2 text-black download-txt mb-2 pb-1">Scan to download
                                                        App iOS & Android</p>
                                                    <a href="/services/downloads" target="_blank"> <a-button
                                                            class="primary-btn fw-5 download-app-btn mb-3">
                                                            {{ $t('depositModal.dm12') }}
                                                        </a-button></a>
                                                </div>
                                            </span>
                                        </template>
                                        <span class="home-download-icon-btn pointer ">
                                            <img src="/images/home-qr.svg" />
                                        </span>

                                        <!-- <div class="apps-icon">
                                        <div class="icon-box pointer">
                                       
                                        </div>
                                    </div> -->


                                    </a-popover>

                                </a-col>

                            </a-row>
                        </a-col>
                        <a-col :lg="12" align="end" class="pl-5 mt-6 mb-5">
                            <img :src="promotion.imgurl" height="435px" width="100%" class="pl-5 top-slider-imgs" />
                        </a-col>
                    </a-row>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
import AppFormModelItem from '../App/AppFormModelItem.vue'
import { mapGetters, mapActions } from 'vuex'
import { promotionChannelId, icoLink, googleLinkLink, appleStoreLink, btcCtid } from '~/plugins/constants'
import AppLoading from '../AppLoading.vue'

export default {
    components: {
        AppFormModelItem, AppLoading
    },
    data() {
        return {

            getStartedForm: {
                email: ''
            },
            // rules: {
            //     email: [
            //         { required: true, message: this.$t('messages.msg1') },
            //         {validator: (rule, value, callback) => {
            //             if (value === '') {
            //                 callback(new Error(this.$t('messages.msg9')))
            //             } else if (value !== this.resetForm.password) {
            //                 callback(new Error(this.$t('messages.msg10')))
            //             } else {
            //                 callback()
            //             }
            //         }},
            //         {
            //             type: 'email|phone',
            //             message: this.$t('messages.msg2'),
            //         },
            //     ],
            // },
            rules: {
                email: [
                    { required: true, message: "email or phone is required" },
                    {
                        validator: (rule, value) => {
                            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                            const phoneRegex = /^\+?[0-9]{10,}$/;
                            if (!value || phoneRegex.test(value)) {
                                return Promise.resolve();
                            }
                            else if (!value || emailRegex.test(value)) {
                                return Promise.resolve();
                            }
                            return Promise.reject("Enter Valid Email/Phone (with area code)");
                        },
                    },
                ]
            },

            //FOR CAROUSOUL STARTED
            activeCarouselPromotion: {
                title: '',
                shortdescription: ''
                // title: 'BitNasdaq Global ICO in progress',
                // shortdescription: 'Your dedication and trust will be greatly rewarded sincerely invite you to join us!'
            },
            antCarousel: 0,
            showCarousel: false,

            //FOR CAROUSOUL ENDED
            //for goodle and apple login started below
            signModel: {
                username: '',
                password: '',
                verifycode: '',
                rememberme: true,
            },
            loginWith: 'email',
            thirdPartyLoginLoading: false,
            verifyModel: null,
        }
        //for goodle and apple login ended above
    },
    computed: {
        Userlogin() {
            if (this.$userinfo.uid)
                return true
            else
                return false
        },
        ...mapGetters('article', ['getPromotions']),
        ...mapGetters('general', ['loadingPromotions']),
        promotions: function () {
            return this.getPromotions
        },

    },
    mounted() {
        this.fetchPromotions({ pageIndex: 1, pageSize: 30, channelId: promotionChannelId })
        this.showCarousel = true;
    },
    methods: {
        ...mapActions('article', ['fetchPromotions']),
        promotionCarouselChange(index, b, c) {
            if (index == 1) {
                this.activeCarouselPromotion = {
                    title: 'BitNasdaq Global ICO in progress',
                    shortdescription: 'Your dedication and trust will be greatly rewarded sincerely invite you to join us!',
                    articlehref: icoLink
                }
            } else {
                this.activeCarouselPromotion = this.promotions[index]
            }
        },
        join() {
            this.$refs.ticketForm[0].validate((valid) => {
                if (valid) {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    const phoneRegex = /^\+?[0-9]{10,}$/;
                    if (phoneRegex.test(this.getStartedForm.email)) {
                        this.$store.commit('auth/setTempData', {
                            phone: this.getStartedForm.email
                        })
                    }
                    else if (emailRegex.test(this.getStartedForm.email)) {
                        this.$store.commit('auth/setTempData', {
                            email: this.getStartedForm.email
                        })
                    }

                    this.$router.push({ path: '/register'})
                }
            })
        },
        //lOGIN FUNCTIONALITY STARTED BELOW
        uuid() {
            const s = [],
                hexDigits = "0123456789abcdefghijklmnopqrstuvwxyz";
            for (var i = 0; i < 36; i++) {
                s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
            }
            s[14] = "4";
            s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
            s[8] = s[13] = s[18] = s[23] = "-";
            return s.join("");
        },
        appleLogin() {
            var randstr = this.uuid();
            const options = {
                response_type: 'code', // 固定内容
                response_mode: 'form_post',
                state: randstr, // 随机字符串，此处仅做演示
                client_id: 'bitnasdaq.com.development',
                redirect_uri:`${this.$baseUrl}/comapi/v1.0/com/apple.login`,
                scope: 'openid name email'
            }
            const url = new URL('https://appleid.apple.com/auth/authorize')
            const keys = Object.keys(options)
            keys.forEach(key => {
                url.searchParams.append(key, options[key])
            })
            var bl = false;
            const _self = this;
            const appleloginurl = url.toString();
            var iTop = (window.screen.height - 700) / 2;       //获得窗口的垂直位置;
            var iLeft = (window.screen.width - 1024) / 2;        //获得窗口的水平位置;
            var openWin = window.open(appleloginurl, "newWindow", "width=1024,height=700,top=" + iTop + ", left=" + iLeft + ",titlebar=no, menubar=no,scrollbars=yes,resizable=yes,status=yes,toolbar=no,location=yes");
            var winLoop = setInterval(function () {
                if (openWin.closed && !bl) {
                    clearInterval(winLoop);
                    bl = true;
                    _self.loginWith = 'apple'
                    _self.thirdPartyLoginLoading = true
                    _self.siginByThreadPlant(randstr);
                }
            }, 1000);
        },
        googleLogin() {
            var randstr = this.uuid();
            const options = {
                response_type: 'code', // 固定内容
                state: randstr, // 随机字符串，此处仅做演示
                include_granted_scopes: true,
                access_type: 'offline',
                client_id: '311638269948-vj4vooafhg3581iuen0kgtgaggdglbhu.apps.googleusercontent.com',
                redirect_uri:`${this.$baseUrl}/comapi/v1.0/com/google.login`,
                scope: 'openid profile email'
            }
            const url = new URL('https://accounts.google.com/o/oauth2/auth')
            const keys = Object.keys(options)
            keys.forEach(key => {
                url.searchParams.append(key, options[key])
            })
            const appleloginurl = url.toString();
            var bl = false;
            const _self = this;
            var iTop = (window.screen.height - 700) / 2;       //获得窗口的垂直位置;
            var iLeft = (window.screen.width - 1024) / 2;        //获得窗口的水平位置;
            var openWin = window.open(appleloginurl, "newWindow", "width=1024,height=700,top=" + iTop + ", left=" + iLeft + ",titlebar=no, menubar=no,scrollbars=yes,resizable=yes,status=yes,toolbar=no,location=yes");

            var winLoop = setInterval(function () {
                if (openWin.closed && !bl) {
                    clearInterval(winLoop);
                    bl = true;
                    _self.loginWith = 'google'
                    _self.thirdPartyLoginLoading = true

                    _self.siginByThreadPlant(randstr)
                }
            }, 1000);
        },
        siginByThreadPlant(state) {
            const _self = this;

            const _sign = Object.assign({}, _self.signModel);
            _self.$store.dispatch('user_user_signin', { randstr: state }).then((res) => {
                const data = res.data
                _self.verifyModel = data;
                _self.$store.commit('set_token', {
                    'token': data.token,
                    'expire': new Date().getTime() + 2 * 3600000
                });
                if (!data) {
                    throw data;
                }
                _sign.randstr = state;
                _sign.ticket = "666666";
                _self.$store.commit('auth/setLoginWith', _self.loginWith)

                return true;
            }).then((data) => {
                if (data) {
                    _self.$store.commit('auth/setLoginWith', _self.loginWith)
                    const userEmail = _self.verifyModel.email;

                    // Dispatch the action to update the 'visitor_user.userInput' state with the user's email
                    _self.$store.dispatch('setUserInput', userEmail);
                    //console.log("userrrrrremaiiiillll", userEmail);


                    _self.$router.push({
                        name: 'auth',
                        params: {
                            verifyModel: _self.verifyModel,
                            signModel: _sign,
                            returnurl: _self.returnurl
                        }
                    })


                }
            }).catch((res) => {
                _self.state.signin = false
                _self.loading = false
                _self.thirdPartyLoginLoading = false
            })
        },
        //lOGIN FUNCTIONALITY ENDED ABOVE
    }
}
</script>

<style></style>