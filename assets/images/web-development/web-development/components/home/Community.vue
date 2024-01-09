<template>
    <div class="community" >
        <div class="community-bg">
            <a-row :gutter="16" class="top-sec">
                <a-col :lg="14">
                    <p class="extensive-product fw-6 mb-2">{{ $t('beginer_guide.bg1') }}</p>
                    <p class="buy-sell-txt fw-4 bottom-sec mb-0">{{ $t('beginer_guide.bg15') }}</p>
                    <a-row :gutter="[16, 16]">
                        <a-col :lg="12" v-for="(list, key) in beginnerGuide" :key="key">
                            <nuxt-link :to="list.link">
                            
                                <a-card class="community-card extensive-community-card">
                                    <a-row :gutter="16" class="col-alignment community-row mb-2 pb-1 mt-1">
                                    <a-col :lg="12">
                                        <!-- <img :src="list.img" /> -->
                                        <svg width="35" height="35">
      <use :xlink:href="`/images/svg/home.svg#${list.img}`"></use>
    </svg>
                                    </a-col>
                                    <a-col :lg="12" align="end">
                                        <p class="mb-0 num-value fw-6"> {{ list.num }}</p>
                                    </a-col>
                                </a-row>
                                    <p class="spot-price1 text-black fw-6 mb-2">{{ list.title }}</p>
                                    <p class="community-desc-txt fw-5 mb-0">{{ list.desc }}</p>
                                </a-card>
                            </nuxt-link>
                        </a-col>
                    </a-row>
                </a-col>
                <a-col :lg="10" class="pl-5 community-right-col">
                    <p class="extensive-product fw-6 mb-2">{{ $t('beginer_guide.bg2') }}</p>
                    <p class="buy-sell-txt fw-4 bottom-sec mb-0">{{ $t('beginer_guide.bg3') }}</p>
                    <a-card :bordered="false" class="community-card right-card">
                        <a-card :bordered="false" class="center-white-card">
                            <a-row :gutter="16">
                                <a-col :lg="12" :xl="10" :xxl="10">
                                    <img src="/images/bitnasdaq12.png" height="184px" class="bit-qrh" />
                                    <p class="mb-0"></p>
                                </a-col>
                                <a-col :lg="12" :xl="14" :xxl="14">
                                    <p class="buy-sell-txt fw-4 mb-3 text-black">{{ $t('beginer_guide.bg4') }}</p>
                                    <img src="/images/multi-user.png" class="multi-user-img"/>

                                </a-col>
                            </a-row>
                            <a-form-model ref="applyForm" :model="applyForm" :rules="applyFormValidation"
                                :hide-required-mark="true" label-align="left">

                                <a-row :gutter="8" class="my-4">
                                    <a-col :lg="16" :xl="18">
                                        <AppFormModelItem prop="email">
                                            <a-input placeholder="Enter your email" class="community-input"
                                                v-model="applyForm.email" />
                                        </AppFormModelItem>
                                    </a-col>
                                    <a-col :lg="8" :xl="6">
                                        <a-button @click="applyAgentPlan" :loading="applying" :disabled="applying"
                                            class="primary-btn fw-5" block>{{ $t('agent_plan.ap_join_aff') }}!</a-button>
                                    </a-col>
                                </a-row>
                            </a-form-model>
                            <div class="">
                            <SocialLinks />
                        </div>
                            <!-- <div class="social-community">
                                <span @mouseover="hoverKey = 4" @mouseleave="hoverKey = -1" class="pointer">
                                    <a :href="socialLinks.facebook" target="_blank">
                                        <img :src="hoverKey == 4 ? '/images/f-icon-active.svg' : '/images/f-icon.svg'"
                                            height="74px" />
                                    </a>
                                </span>
                                <span @mouseover="hoverKey = 5" @mouseleave="hoverKey = -1" class="pointer">
                                    <a :href="socialLinks.github" target="_blank">
                                        <img :src="hoverKey == 5 ? '/images/github-icon-active.svg' : '/images/git-icon.svg'"
                                            height="74px" />
                                    </a>
                                </span>
                                <span @mouseover="hoverKey = 6" @mouseleave="hoverKey = -1" class="pointer">
                                    <a :href="socialLinks.youtube" target="_blank">
                                        <img :src="hoverKey == 6 ? '/images/y-icon-active.svg' : '/images/y-icon.svg'"
                                            height="74px" />
                                    </a>
                                </span>
                                <span @mouseover="hoverKey = 7" @mouseleave="hoverKey = -1" class="pointer">
                                    <a :href="socialLinks.reddit" target="_blank">
                                        <img :src="hoverKey == 7 ? '/images/shape1-active.svg' : '/images/shape1.svg'"
                                            height="74px" />
                                    </a>

                                </span>
                                <span @mouseover="hoverKey = 8" @mouseleave="hoverKey = -1" class="pointer">
                                    <a :href="socialLinks.twitter" target="_blank">
                                        <img :src="hoverKey == 8 ? '/images/twitter-active.svg' : '/images/twitter.svg'"
                                            height="74px" />
                                    </a>
                                </span>
                            </div> -->
                        </a-card>
                    </a-card>
                </a-col>
            </a-row>

        </div>
    </div>
</template>

<script>
// import { socialLinks } from '~/plugins/constants'
import AppFormModelItem from '../App/AppFormModelItem.vue';
import SocialLinks from "../App/SocialLinks.vue";

export default {
    name: 'Community',
    components: { AppFormModelItem, SocialLinks },
    data() {
        return {
            hoverKey: -1,
            beginnerGuide: [
                {
                    title: this.$t("beginer_guide.bg7"),
                    desc: this.$t("beginer_guide.bg8"),
                    link: "/register",
                    img: 'big-user-icon',
                    num: '01'
                },
                {
                    title: this.$t("beginer_guide.bg11"),
                    desc: this.$t("beginer_guide.bg12"),
                    link: "/person/authentication",
                    img: 'user-scan-icon',
                    num: '02'
                },
                {
                    title: this.$t("beginer_guide.bg9"),
                    desc: this.$t("beginer_guide.bg10"),
                    link: "/person/wallet",
                    img: 'card-receive-icon',
                    num: '03'
                },
                {
                    title: this.$t("beginer_guide.bg13"),
                    desc: this.$t("beginer_guide.bg14"),
                    link: "/strategy-bot",
                    img: 'align-horizontally-icon',
                    num: '04'
                }
            ],
            applying: false,
            applyForm: {
                email: ''
            },
            applyFormValidation: {
                email: [
                    { required: true, message: this.$t('messages.msg1') },
                    {
                        type: 'email',
                        message: this.$t('messages.msg2'),
                    },
                ],
            }
        };
    },
    // computed: {
    //     socialLinks() {
    //         return socialLinks;
    //     }
    // },
    methods: {
        async applyAgentPlan() {
            if (!this.$userinfo.uid) {
                return this.$router.push('/login?returnurl=/#join-common-community')
            }
            const _self = this;
            await this.$refs['applyForm'].validate(async (valid) => {
                if (valid) {
                    this.applying = true;
                    const postData = {
                        typeName: 'Others',//no need translation
                        content: "Apply to join the community", //no need translation
                        jsonContent: JSON.stringify(_self.applyForm),
                    }
                    try {
                        const data = await this.$store.dispatch('work_order_update', postData)
                        if (data.code == 200) {
                            this.applyForm = {
                                email: ''
                            }

                            _self.$store.commit('set_message', { type: 'ok', text: this.$t('texts.txt1') });
                        }
                        this.applying = false;
                    } catch (error) {
                        //console.log('Error', error)
                        this.applying = false;
                    }
                }
            })

        }
    }

}
</script>

<style></style>
