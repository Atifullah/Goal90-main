<template>
    <div class="partner-program">
        <div class="partner-bg">
            <div class="main-content">
                <p class="mb-2 partner-heading fw-5">{{$t('partner.part1')}}</p>
                <p class="mb-0 partner-desc fw-4">{{$t('partner.part2')}}</p>
                <a-button class="primary-btn fw-5 px-4" @click="partnerModel=true">{{$t('partner.part3')}}</a-button>
            </div>
        </div>
        <div class="partner-detail">
            <div class="main-content">
                <a-row class="pt-6">
                    <a-col :lg="16" :xl="12">
                        <p class="sub-heading mb-2 fw-5">{{$t('partner.part4')}}</p>
                        <p class="mb-0 sub-text fw-4">{{$t('partner.part5')}}</p>
                    </a-col>
                </a-row>
                <a-row class="pt-6">
                    <a-col :lg="16" :xl="12">
                        <p class="sub-heading mb-2 fw-5">{{$t('partner.part6')}}</p>
                        <p class="mb-0 sub-text fw-4">{{$t('partner.part7')}}</p>
                    </a-col>
                </a-row>
                <a-row class="pt-5">
                    <a-col :lg="24" :xl="19">
                       <a-row :gutter="16">
                        <a-col :lg="6" v-for="(list,key) in getPartnerList" :key="key" class="pr-4">
                            <p class="mb-2 sub-text fw-5">  <img :src="list.img" height="24px" class="mr-2"/>{{ list.title }}</p>
                            <p class="mb-0 title-desc">{{ list.desc }}</p>
                        </a-col>
                    </a-row>
                    </a-col>
                </a-row>
                <a-row class="pt-6">
                    <a-col :lg="16" :xl="20">
                        <p class="sub-heading mb-2 fw-5">{{$t('partner.part8')}}</p>
                        <p class="mb-0 sub-text fw-4">{{$t('partner.part9')}}</p>
                    </a-col>
                </a-row>
                <a-row class="pt-6">
                    <a-col :lg="16" :xl="12">
                        <p class="sub-heading mb-2 fw-5">{{$t('partner.part10')}}</p>
                        <p class="mb-0 sub-text fw-4">{{$t('partner.part11')}}</p>
                    </a-col>
                </a-row>
                <a-row class="pt-5">
                    <a-col :lg="24" :xl="22">
                       <div class="partner-types">
                        <div v-for="(list,key) in getPartnerTypes" :key="key" class="pr-4 type-box">
                            <img :src="list.img" class="mb-4"/>
                            <p class="mb-2 sub-text fw-5"> {{ list.title }}</p>
                            <p class="mb-0 title-desc">{{ list.desc }}</p>
                        </div>
                    </div>
                    </a-col>
                </a-row>
                <div class="pt-6 pb-5">
                <div class="bitnasdaq-partner">
                    <a-row :gutter="16" class="px-5 mx-4 col-alignment">
                        <a-col :lg="19">
                            <p class="sub-heading mb-2 fw-5">{{$t('partner.part1')}}</p>
                            <p class="bitnasdaq-desc mb-0">{{$t('partner.part2')}}</p>
                        </a-col>
                        <a-col :lg="5">
                            <a-button class="primary-btn fw-5 mt-0 px-4" @click="partnerModel=true">{{$t('partner.part3')}}</a-button>
                        </a-col>
                    </a-row>
                </div>
                </div>
            </div>
        </div>
        <PartnerModal :show="partnerModel" @onClose="partnerModel = false"/>
    </div>
</template>

<script>
import PartnerModal from './PartnerModal.vue'
export default {
  components: { PartnerModal },
    data() {
        return {
            partnerModel: false,
            getPartnerList: [
                {
                   img: '/images/success-img.svg',
                   title: this.$t('partner.part12'),
                   desc: this.$t('partner.part13') 
                },
                {
                   img: '/images/success-img.svg',
                   title: this.$t('partner.part14'),
                   desc: this.$t('partner.part15') 
                },
                {
                   img: '/images/success-img.svg',
                   title: this.$t('partner.part16'),
                   desc: this.$t('partner.part17')
                },
                {
                   img: '/images/success-img.svg',
                   title: this.$t('partner.part18'),
                   desc: this.$t('partner.part19') 
                }
            ],
            getPartnerTypes: [
                {
                   img: '/images/type1.svg',
                   title: this.$t('partner.part20'),
                   desc: this.$t('partner.part21') 
                },
                {
                   img: '/images/type2.svg',
                   title: this.$t('partner.part22'),
                   desc: this.$t('partner.part23') 
                },
                {
                   img: '/images/type3.svg',
                   title: this.$t('partner.part24'),
                   desc: this.$t('partner.part25') 
                },
                {
                   img: '/images/type4.svg',
                   title: this.$t('partner.part26'),
                   desc: this.$t('partner.part27')
                },
                {
                   img: '/images/type5.svg',
                   title: this.$t('partner.part28'),
                   desc: this.$t('partner.part29') 
                }
            ]
        }
    },
    methods: {
        close() {
            this.partnerModel = false
        }
    }
}
</script>

<style></style>