<template>
    <div class="safety-guide">
        <div class="safety-guide-header">
            <div class="main-content">
            <a-row :gutter="16" class="mx-0">
                <a-col :lg="24">
                    <p class="mb-4 safety-heading fw-5">{{$t('saftey_guid.sfg1')}}</p>
                    <a-button class="px-4 primary-btn fw-5">{{$t('saftey_guid.sfg2')}}</a-button>
                </a-col>
            </a-row>
        </div>
        </div>
        <div id="safety-guide" class="main-content">
            <div class="my-5">
                <a-card :bordered="false">
                    <a-row :gutter="16">
                        <a-col :lg="15" class="pr-5">
                            <p class="guide-desc fw-5">{{$t('saftey_guid.sfg3')}}</p>
                            <p class="guide-title fw-5 mt-4">{{$t('saftey_guid.sfg4')}}</p>
                            <p class="guide-desc fw-5">{{$t('saftey_guid.sfg5')}}</p>
                            <p class="guide-title fw-5 mt-4">{{$t('saftey_guid.sfg6')}}</p>
                            <p class="guide-desc fw-5">{{$t('saftey_guid.sfg7')}}</p>
                            <p class="guide-title fw-5 mt-4">{{$t('saftey_guid.sfg8')}}</p>
                            <p class="guide-desc fw-5">{{$t('saftey_guid.sfg9')}}</p>
                            <p class="guide-title fw-5 mt-4">{{$t('saftey_guid.sfg10')}}</p>
                            <p class="guide-desc fw-5 mb-5">{{$t('saftey_guid.sfg11')}}</p>

                            <p class="guide-desc fw-5">{{$t('saftey_guid.sfg12')}}</p>
                            <video width="400" controls class="mb-4">
                                <source src="mov_bbb.mp4" type="video/mp4">
                                <source src="mov_bbb.ogg" type="video/ogg">
                                {{$t('saftey_guid.sfg13')}}
                            </video>
                            <p class="guide-desc fw-5">{{$t('saftey_guid.sfg14')}}</p>
                            <video width="400" controls>
                                <source src="mov_bbb.mp4" type="video/mp4">
                                <source src="mov_bbb.ogg" type="video/ogg">
                                {{$t('saftey_guid.sfg15')}}
                            </video>
                            <p class="guide-title fw-5 mt-4">{{$t('saftey_guid.sfg16')}}</p>
                            <p class="guide-desc fw-5 mb-5 pr-5">{{$t('saftey_guid.sfg17')}}</p>

                        </a-col>
                        <a-col :lg="9" class="pl-5">
                            <p class="usd-txt fw-5">$ 0.0001053 USD <span class="green-txt fw-5 pl-2">+0%</span><span
                                    class="percent-txt fw-5"> (24H)</span></p>
                            <p class="mb-0 several-txt fw-5">{{$t('saftey_guid.sfg18')}}</p>
                            <p class="guide-title fw-5 mt-5 mb-0">{{$t('saftey_guid.sfg19')}}</p>
                            <a-row :gutter="16" class="col-alignment mt-4" v-for="(list, key) in getListoins"
                                :key="key">
                                <a-col :lg="2"><img :src="list.img" /></a-col>
                                <a-col :lg="20">
                                    <p class="mb-0 guide-title fw-5">{{ list.title }}</p>
                                </a-col>
                                <a-col :lg="2"><img :src="list.img1" /></a-col>
                            </a-row>
                        </a-col>
                    </a-row>
                </a-card>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            getListoins: [
                {
                    img: '/images/btc-icon.svg',
                    title:this.$t('titles.title18'),
                    img1: '/images/black-arrow.svg'
                },
                {
                    img: '/images/eth-black.svg',
                    title: this.$t('titles.title19'),
                    img1: '/images/black-arrow.svg'
                },
                {
                    img: '/images/bnb-icon.svg',
                    title: 'BNB',
                    img1: '/images/black-arrow.svg'
                },
                {
                    img: '/images/qitcoin-logo.svg',
                    title: 'QTC',
                    img1: '/images/black-arrow.svg'
                }
            ]
        }
    }
}
</script>

<style>

</style>
