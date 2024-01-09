<template>
    <div class="institution">
        <div class="institution-header">
            <div class="main-content">
                <a-row :gutter="16">
                    <a-col :lg="24">
                        <p class="institution-title text-white fw-5 mb-2">
                            {{ $t("Institutions.ins1") }}
                        </p>
                        <a-row>
                            <a-col :md="12" :lg="10">
                                <p class="institution-desc fw-5 mb-3">
                                    {{ $t("Institutions.ins3") }}
                                </p>
                            </a-col>
                        </a-row>
                        <a-button class="primary-btn fw-5 px-5">{{
                            $t("Institutions.ins10")
                        }}</a-button>
                    </a-col>
                </a-row>
            </div>
        </div>
        <div class="main-content">
            
            <div class="institution-nav col-alignment mt-5 pt-4">
                <div v-for="(item, key) in institutionNavDetails" :key="key" class="">
                    <nuxt-link :to="item.link">
                        <span @mouseover="hoverKey = key" @mouseleave="hoverKey = -1">
                    <a-card :bordered="false"  class="col-alignment institution-nav-card">
                       
                        <div class="institution-nav-icon col-alignment">
                            
                        <img :src="hoverKey == key ? item.icon2 : item.icon" alt="">
                    </div>
               
                
                    <p class="institution-nav-desc pt-3">{{item.desc}}</p>
                    </a-card>
                </span>
                </nuxt-link>
            </div>
                
            </div>
            <a-row class="mt-5">
                <TailorMadeInstitution />
            </a-row>
            <a-row class="my-3">
                <TradeNow />
            </a-row>
            <div class="ins-heading-bg">
                <a-row :gutter="16">
                    <a-col :lg="24" align="center">
                        <p class="mb-0 mt-2  institution-title fw-5">
                            {{ $t("in_service.is15") }}
                        </p>
                        <a-button class="primary-btn fw-5 px-5 mt-3">{{
                            $t("in_service.is28")
                        }}</a-button>
                    </a-col>
                </a-row>
            </div>
        </div>
    </div>
</template>

<script>
import TradeNow from "./TradeNow.vue";
import TailorMadeInstitution from "./TailorMadeInstitution.vue";
export default {
    components: {
        TailorMadeInstitution,
        TradeNow,
    },
    data() {
        return {
            hoverKey: -1,
            institutionNavDetails: [
            {
                    icon: '/images/bank.svg',
                    icon2:'/images/bank-active.svg',
                    desc: this.$t('in_service.is29'),
                    link:'#'
                },
                {
                    icon: '/images/gift-icon.svg',
                    icon2:'/images/thumb-active.svg',
                    desc: this.$t('in_service.is30'),
                    link:'#'
                },
                {
                    icon: '/images/user-robot.svg',
                    icon2:'/images/card-active.svg',
                    desc: this.$t('stratergybot.sb1'),
                    link:'#'
                },
                {
                    icon: '/images/percentage-circle.svg',
                    icon2:'/images/percentage-circle-active.svg',
                    desc: this.$t('in_service.is32'),
                    link:'#'
                },
                {
                    icon: '/images/crown.svg',
                    icon2:'/images/crown-active.svg',
                    desc: this.$t('in_service.is33'),
                    link:'/vip-program'
                },
                {
                    icon: '/images/ranking.svg',
                    icon2:'/images/document-text-active.svg',
                    desc: this.$t('tableskeys.bh4'),
                    link:'#'
                },
                {
                    icon: '/images/music-play.svg',
                    icon2:'/images/music-play-active.svg',
                    desc: this.$t('in_service.is28'),
                    link:'/contact-us'
                }
                
            ],
        }
    },
};
</script>

<style></style>
