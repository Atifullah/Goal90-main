<template>
    <div class="vip">
            <div class="vip-header">
            <div class="main-content">
                <a-row>
                    <a-col :lg="16"  :xl="14">
                        <p class="vip-heading fw-5 mb-2 text-white">{{ $t('vipprogram.vip1') }}</p>
                        <p class="vip-desc fw-5 mb-0 text-white">{{ $t('vipprogram.vip2') }}</p>
                    </a-col>
                </a-row>
            </div>
        </div>
      
        <div class="main-content" id="vip">
            <a-card :bordered="false" class="mt-3">
                <a-row :gutter="16">
                    <a-col :lg="7" :xl="8">
                        <a-card class="vip-orange-card" :bordered="false">
                            <a-row :gutter="16" class="col-alignment">
                                <a-col :lg="5" :xl="4">
                                    <img src="/images/my-spot-fee.svg" />
                                </a-col>
                                <a-col :lg="19" :xl="20">
                                    <p class="spot-fee fw-5 mb-0">{{ $t('vip_pro.vip_mspot') }}</p>
                                </a-col>
                            </a-row>
                            <a-row :gutter="16" class="pt-3 pb-3 mt-3">
                                <a-col :lg="12">
                                    <p class="mb-0 maker fw-5">{{ $t('vip_pro.vip_maker') }}</p>

                                    <p class="percent fw-5 mb-0">{{
                                        ((10 - vipInfo.viplevel) * 0.1 * 100 *
                                            this.$store.state.symbleinfos[0]?.sellfee).toFixed(2) }}%
                                        &nbsp;<span class="maker fw-4 mb-0 maker1">{{
                                            (this.$store.state.symbleinfos[0]?.buyfee * 100).toFixed(2) }}%</span>
                                    </p>
                                </a-col>
                                <a-col :lg="12">
                                    <p class="mb-0 maker fw-5">{{ $t('vip_pro.vip_taker') }}</p>
                                    <p class="percent  fw-5 mb-0">
                                        {{ ((10 - vipInfo.viplevel) * 0.1 * 100 *
                                            this.$store.state.symbleinfos[0]?.takersellfee).toFixed(2) }}%
                                        &nbsp;<span class="maker fw-4 mb-0 maker1">{{ (100 *
                                            this.$store.state.symbleinfos[0]?.takerbuyfee).toFixed(2) }}%</span>
                                    </p>
                                </a-col>
                            </a-row>
                        </a-card>
                    </a-col>
                    <a-col :lg="7" :xl="8">
                        <a-card class="vip-orange-card" :bordered="false">
                            <a-row :gutter="16" class="col-alignment">
                                <a-col :lg="5" :xl="4">
                                    <img src="/images/my-future-fee.svg" />
                                </a-col>
                                <a-col :lg="19" :xl="20">
                                    <p class="mb-0 spot-fee fw-5">{{ $t('vip_pro.vip_future_fee') }}</p>

                                </a-col>
                            </a-row>
                            <a-row :gutter="16" class="pt-3 pb-3 mt-3">
                                <a-col :lg="12">
                                    <p class="mb-0 maker fw-5">{{ $t('vip_pro.vip_maker') }}</p>
                                    <p class="percent  fw-5 mb-0">{{
                                        ((10 - vipInfo.viplevel) * 0.1 * 100 *
                                            this.$store.state.symbleinfos[4]?.sellfee).toFixed(2) }}%
                                        <span class="maker fw-4 mb-0 maker1">{{
                                            (100 * this.$store.state.symbleinfos[3]?.buyfee).toFixed(2) }}%</span>
                                    </p>
                                </a-col>
                                <a-col :lg="12">
                                    <p class="mb-0 fw-5 maker">{{ $t('vip_pro.vip_taker') }}</p>
                                    <p class="percent  fw-5 mb-0">{{
                                        ((10 - vipInfo.viplevel) * 0.1 * 100 *
                                            this.$store.state.symbleinfos[4]?.takersellfee).toFixed(2) }}%
                                        <span class="maker mb-0 fw-4 maker1">{{
                                            (100 * this.$store.state.symbleinfos[3]?.takerbuyfee).toFixed(2) }}% </span>
                                    </p>
                                </a-col>
                            </a-row>
                        </a-card>

                    </a-col>
                    <a-col :lg="10" :xl="8">
                        <a-card class="vip-orange-card" :bordered="false">
                            <a-row :gutter="16" class="">
                                <a-col :lg="17">
                                    <a-row :gutter="16" class="col-alignment">
                                        <a-col :lg="7">
                                            <img :src="$userinfo.avatar ? $userinfo.avatar : '/images/vector-img2.svg'"
                                                height="68" width="68" style="border-radius:50%;" class="user-vip-icon"/></a-col>
                                        <a-col :lg="17">
                                            <p class="user-id fw-5 mb-1"> {{ global_string_split($userinfo.email) }}</p>
                                            <p class="user-uid fw-5 mb-0">UID {{ $userinfo.uid?.slice(-11) }}</p>
                                        </a-col>
                                    </a-row>
                                    <p class="mb-0 vip-detail-txt fw-5 pt-4 pr-5">{{ $t('vipprogram.vip3') }}</p>
                                </a-col>
                                <a-col :lg="7" align="center">
                                    <img src="/images/vip-uid.svg" height="82px" class="user-vip-uid"/>
                                    <p class="pt-3">
                                        <a-tag class="vip-tag fw-5">
                                            VIP {{
                                                vipInfo.viplevel
                                            }}
                                        </a-tag>
                                    </p>
                                </a-col>
                            </a-row>
                        </a-card>

                    </a-col>
                </a-row>
            </a-card>
            <a-card class="upgrade-vip-card mt-3" :bordered="false">
                <p class="vip-heading  fw-5 mb-1">{{ $t('vip_pro.up_vip') }}</p>
                <p class="mb-0 vip-note fw-5">{{ $t('vip_pro.vip_note') }}</p>
            </a-card>
            <a-card :bordered="false" class="mt-3">
                <a-row type="flex" class="col-alignment" :gutter="16">
                    <a-col :lg="7" style="width:30%">
                        <VipCard :title="$t('description.title4')" :type=1 :amount="vipInfo.rechargeamount"
                            :nextLevelAmount="vipInfo.nexleverrechargeamount" :vipLevel="vipInfo.viplevel"
                            :days="vipInfo.days" />
                    </a-col>
                    <a-col :lg="1" align="center" style="width:5%">
                        <p class="middle-txt fw-4">{{ $t('vip_pro.vip_OR') }}</p>
                    </a-col>
                    <a-col :lg="7" style="width:30%">
                        <VipCard :title="$t('description.title5')" :type=2 :amount="vipInfo.spotamount"
                            :nextLevelAmount="vipInfo.nexleverspotamount" :vipLevel="vipInfo.viplevel"
                            :days="vipInfo.days" />
                    </a-col>
                    <a-col :lg="1" align="center" style="width:5%">
                        <p class="middle-txt fw-4">{{ $t('vip_pro.vip_OR') }}</p>
                    </a-col>
                    <a-col :lg="7" style="width:30%">
                        <VipCard :title="$t('description.title6')" :type=3 :amount="vipInfo.futrueamount"
                            :nextLevelAmount="vipInfo.nexleverfutrueamount" :vipLevel="vipInfo.viplevel"
                            :days="vipInfo.days" />
                    </a-col>
                </a-row>
            </a-card>
            <a-card class="upgrade-vip-card mt-3" :bordered="false">
                <p class="vip-heading  fw-5 mb-2">{{ $t('vip_pro.vip_level') }}</p>
                <p class="mb-0 vip-note fw-5">{{ $t('vip_pro.vip_note2') }}</p>
            </a-card>
            <a-row>
                <VipTabs />
            </a-row>
            <a-row>
                <ExclusiveBenefits />
            </a-row>
        </div>
    </div>
</template> 
<script>
import ExclusiveBenefits from './ExclusiveBenefits.vue'
import VipTabs from './VipTabs.vue'
import VipCard from './VipCard.vue'
export default {
    components: {
        VipCard,
        VipTabs,
        ExclusiveBenefits
    },
    computed: {
        prevVipLevel() {
            if (this.vipInfo.viplevel == 0) {
                return 0;
            }
            return 1;
        },
        spotMaker() {
            return this.$store.state.symbleinfos[0]?.buyfee * 100
        },
        spotTaker() {
            return this.$store.state.symbleinfos[0]?.takerbuyfee * 100
        },
        futureMaker() {
            return this.$store.state.symbleinfos[3]?.buyfee * 100
        },
        futureTaker() {
            return this.$store.state.symbleinfos[3]?.takerbuyfee * 100
        }
    },
    data() {
        return {
            vipInfo: {
                //     viplevel: 0,
                //     futrueamount: 0,
                //     nexleverfutrueamount: 0,
                //     nexleverrechargeamount: 0,
                //     nexleverspotamount: 0,
                //     rechargeamount: 0,
                //     spotamount: 0,
                //     days: 0
            }
        }
    },
    methods: {
        async getVipInfo() {
            try {

                const { data } = await this.$store.dispatch('get_my_vip_info_get')
                if (data) {
                    this.vipInfo = data;
                }


            } catch (error) {
                //console.log('Error', error)
            }
        }
    },
    mounted() {
        this.getVipInfo();
    },
}
</script> 
