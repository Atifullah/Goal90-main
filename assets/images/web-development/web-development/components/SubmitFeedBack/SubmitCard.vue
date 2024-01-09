<template>
    <div class="submit-feedcard my-4">
        <a-card class="submit-card" :bordered="false">
            <a-row>
                <a-col :lg="16" :offset="4">
                    <a-row :gutter="24">
                        <p class="feedback-txt fw-5 text-center mt-4 mb-4">{{$t('feedback.fdb3')}}</p>
                        <a-col :lg="12" v-for="(list, key) in getCardDetail" :key="key" class="mb-4">
                            <nuxt-link :to="list.link">
                                <a-card class="white-card" :bordered="false">
                                    <p class="mb-0 lang-txt fw-7">{{ list.title }}</p>
                                    <p class="lang-desc fw-5 mb-0">{{ list.desc }}</p>
                                </a-card>
                            </nuxt-link>
                        </a-col>
                    </a-row>
                    <a-row :gutter="24">
                        <a-col :lg="24">
                            <a-card class="white-card mb-3" :bordered="false">
                                <p class="mb-0 lang-txt fw-7">{{$t('feedback.fdb11')}}</p>
                                <p class="lang-desc fw-5 mb-0">{{$t('feedback.fdb16')}}</p>
                            </a-card>
                        </a-col>
                    </a-row>
                </a-col>
            </a-row>
        </a-card>
        <a-row class="mt-4">
            <a-card class="work-card" :bordered="false">
                <p class="feedback-txt fw-5 mb-0 text-center mt-4">{{$t('feedback.fdb17')}}</p>
                <div class="feedback-detail mx-5 px-4 mt-5">
                    <div class="feedback-icon text-center">
                        <img src="/images/feedback-icon.svg" />
                        <p class="mt-4 social-feedback fw-7">{{$t('feedback.fdb18')}}</p>
                    </div>
                    <div class="feedback-icon text-center">
                        <img src="/images/multi-arrow.svg" />

                    </div>
                    <div class="feedback-icon text-center">
                        <img src="/images/team-review.svg" />
                        <p class="mt-4 social-feedback fw-7">{{$t('feedback.fdb19')}}</p>

                    </div>
                    <div class="feedback-icon text-center">
                        <img src="/images/multi-arrow.svg" />

                    </div>
                    <div class="feedback-icon text-center">
                        <img src="/images/product-improvement.svg" />
                        <p class="mt-4 social-feedback fw-7">{{$t('feedback.fdb20')}}</p>

                    </div>
                    <div class="feedback-icon text-center">
                        <img src="/images/multi-arrow.svg" />

                    </div>
                    <div class="feedback-icon text-center">
                        <img src="/images/stay-tuned.svg" />
                        <p class="mt-4 social-feedback fw-7">{{$t('feedback.fdb21')}}</p>

                    </div>
                </div>
                <a-row :gutter="16" class="">
                    <p class="works-detail-desc fw-5 text-center mt-4 mb-5">{{$t('feedback.fdb22')}}</p>
                    <p class="works-detail-desc fw-5 text-center mb-5">{{$t('feedback.fdb23')}} <nuxt-link to="/feedback-form"> {{$t('feedback.fdb24')}} </nuxt-link></p>
                </a-row>
            </a-card>
        </a-row>
    </div>
</template>

<script>
export default {
    data() {
        return {
            getCardDetail: [
                {
                    title: this.$t("tableskeys.sc1"),
                    desc: this.$t('description.des25'),
                    link: '/feedback-form'
                },
                {
                    title: this.$t("tableskeys.sc2"),
                    desc: this.$t('description.des26'),
                    link: '/feedback-form'

                },
                {
                    title:this.$t("tableskeys.sc3"),
                    desc: this.$t('description.des27'),
                    link: '/feedback-form'

                },
                {
                    title: this.$t("tableskeys.sc4"),
                    desc: this.$t('description.des28'),
                    link: '/feedback-form'

                }
            ]
        }
    }
}
</script>

<style>

</style>
