<template>
    <div class="bg-white">
        <div class="join-us-new-header">
            <div class="main-content">
                <div class="join-us-wrapper-header">
                    <a-row :gutter="16" justify="center">
                        <a-col>
                            <p class="join-us-new-heading fw-5 mb-3 pt-5">
                                {{ $t('footer.fj1') }}
                            </p>
                            <p class="join-us-new-desc fw-5">{{ $t('community.com1') }}
                            </p>
                        </a-col>
                        <a-col>

                            <a-row class="community-card-container" type="flex" justify="center"
                                :gutter="{ sm: 16, md: 24, lg: 48, xl: 48 }">
                                <a-col class="" v-for="(list, key) in communityDetail" :key="key">
                                    <a-card :bordered="false" :class="list.className">
                                        <a-row :gutter="16">
                                            <a-col :lg="6" class="social-card">
                                                <img :src="list.img">
                                            </a-col>
                                            <a-col :lg="18">
                                                <a-row class="comunity-details">
                                                    <a-col>
                                                        <p class="our-platform mb-1 fw-5">{{ list.platform }}
                                                            {{ $t('community.com2') }}</p>
                                                        <p class="followers mb-1 fw-4">Join our community on {{ list.platform }}</p>
                                                    </a-col>
                                                    <a-col>
                                                        <a-row type="flex" justify="space-between" align="middle"
                                                            class="join-community">
                                                            <img :src="list.communityImg" alt="">
                                                            <a :href="getSocialLink(list.platform).url"
                                                                target="_blank"><a-button
                                                                    class="community-btn fw-6">{{ $t('community.com3') }}</a-button></a>
                                                        </a-row>
                                                    </a-col>
                                                </a-row>
                                            </a-col>
                                        </a-row>
                                    </a-card>
                                </a-col>
                            </a-row>
                        </a-col>
                    </a-row>
                </div>
            </div>
        </div>
        
            <div class="join-us-main-con main-content col-alignment">
                <div class="joinus-cards">
                    <a-row :gutter="48" class="" type="flex" justify="center">
                        <a-col v-for="(list, key) in affiliateEasy" :key="key" class="join-us-card-column">
                            <a-card class="join-social-card py-2" :bordered="false">
                                <a-row :gutter="16" class="content-center">
                                    <a-col :lg="24">
                                        <a-row class="join-new-card" type="flex">
                                            <a-col class="content-center">
                                                <div class="join-img-circle"><img :src="list.img" /></div>
                                            </a-col>

                                            <a-col>
                                                <p class="mt-4 mb-3 join-main-title fw-5"> {{ list.title }} </p>
                                                <p class="mb-3 join-main-desc fw-4">{{ list.subTitile }}</p>
                                            </a-col>
                                        </a-row>
                                    </a-col>
                                </a-row>

                            </a-card>
                        </a-col>
                    </a-row>
                </div>
                <div class="join-us-wrapper">
                <div class="community-section">
                    <a-row>
                        <a-col class="community-content">
                            <p class="join-us-new-heading fw-5 mb-3 pt-5">
                                {{ $t('community.com4') }}
                            </p>
                            <p class="join-us-new-desc fw-5">{{ $t('community.com5') }}</p>
                        </a-col>
                        <a-col>
                            <div class="com-cards pt-5">
                                <a-row :gutter="[16, 24]" class="social-card-container">
                                    <a-col :md="12" :lg="8" v-for="(link, key) in socialLinks" :key="key">
                                        <a :href="link.url" target="_blank">
                                            <a-card :bordered="false">
                                                <a-row class="community-cards" :gutter="16" type="flex">
                                                    <a-col :lg="3" class="social-icon"><img :src="link.icon"> </a-col>
                                                    <a-col :md="18" :lg="20" class="fw-5 social-title">{{ link.name
                                                    }}</a-col>
                                                </a-row>
                                            </a-card>
                                        </a>
                                    </a-col>
                                </a-row>
                            </div>
                        </a-col>
                    </a-row>
                </div>
                <div class="bitnasdaq-community pt-5">
                    <a-row type="flex" class="bit-comunity">
                        <a-col :md="24" :lg="12">
                            <p class="join-us-new-heading fw-5 mb-3 pt-5">
                                {{ $t('community.com6') }}
                            </p>
                            <p class="join-us-new-desc fw-4">{{ $t('community.com7') }}</p>
                        </a-col>
                    </a-row>
                </div>
           
                 
            
            <div class="community-querries pt-5">
                <a-row type="flex" align="middle">
                    <a-col :lg="13" :md="24">
                        <p class="join-us-new-heading fw-5 ">
                            {{$t('community.com8')}}
                        </p>
                        <p class="join-us-new-desc fw-4">{{$t('community.com9')}}</p>
                    </a-col>
                    <a-col :lg="11" :md="24" class="help-btn-container">
                        <nuxt-link to="/help-center"> <a-button class="primary-btn help-btn">{{$t('community.com10')}}</a-button></nuxt-link>
                    </a-col>
                </a-row>
            </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
    data() {
        return {
            communityDetail: [
                {
                    img: '/images/join-us-fb.svg',
                    platform: this.$t('extra.extra17'),
                    isInsta: false,
                    className: 'facebook-card',
                    communityImg:'/images/join-us-community.png'
                },
                {
                    img: '/images/join-us-twitter.svg',
                    platform: this.$t('community.com17'),
                    isInsta: false,
                    className: 'twitter-card',
                    communityImg:'/images/join-us-community.png'
                },
                {
                    img: '/images/join-us-insta.svg',
                    platform: this.$t('community.com18'),
                    isInsta: true,
                    className: 'insta-card',
                    communityImg:'/images/join-us-community.png'
                },
            ],

            affiliateEasy: [
                {
                    img: '/images/global.png',
                    title: this.$t('community.com11'),
                    subTitile: this.$t('community.com12')
                },
                {
                    img: '/images/presention-chart.png',
                    title: this.$t('community.com13'),
                    subTitile: this.$t('community.com14')
                },
                {
                    img: '/images/info-circle.png',
                    title: this.$t('community.com15'),
                    subTitile: this.$t('community.com16')
                }
            ],

        }
    },


    computed: {
        ...mapGetters("constants", ["getSocialLinks"]),

        socialLinks: function () {
            return this.getSocialLinks;
        },
    },

    methods: {
        getSocialLink(platform) {
            const link = this.getSocialLinks.find(link => link.name === platform);
            return link
                ? { url: link.url }
                : { url: '#' };
        },
    },
}

</script>
<style lang="scss" scoped>
.facebook-card {
    background-color: #EEF7FF;

    .community-btn {
        background: #1976D2;
    }
}

.twitter-card {
    background-color: #E0F6FF;

    .community-btn {
        background: #00ACEE;
    }
}

.insta-card {
    background-color: #FFF2F2;

    .community-btn {
        background: linear-gradient(180deg, #9D41A5 0%, #D74669 32.29%, #E95950 70.83%, #F8BD01 100%);
    }
}</style>