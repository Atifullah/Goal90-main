<template>
    <div class="">
        <a-modal id="security-check" v-model="securityCheckModel" width="450px" :footer="false" @cancel="close">
            <a-row :gutter="16" class="col-alignment">
                <a-col :lg="18">
                    <p class="security-check-heading fw-5 mb-0">{{ $t('person.pp8') }}</p>
                </a-col>
                <a-col :lg="6" align="end"><img src="/images/ud-cross.svg" class="pointer"
                        @click="close" /></a-col>
            </a-row>
            <a-row class="pt-2">
                <a-col :lg="20">
                    <p class="security-check-desc fw-5">{{ $t('person.pp10') }}</p>
                </a-col>
            </a-row>
            <a-row class="mt-4">
                <a-col :lg="24" v-if="!$userinfo.isgoogleauthed">

                    <a-card class="security-card mb-3" :bordered="false">
                        <nuxt-link to="/person/security">
                        <a-row :gutter="16" class="col-alignment">
                            <a-col :lg="4">
                                <img src="/images/s-google-icon.svg" />
                            </a-col>
                            <a-col :lg="16" class="pl-3">
                                <p class="sub-heading fw-5 mb-0">{{ $t('person.pp11') }}</p>
                            </a-col>
                            <a-col :lg="2" class="text-right">
                                <div @mouseover="hoverKey = 1" @mouseleave="hoverKey = -1">
                                    <img
                                            :src="hoverKey == 1 ? '/images/arrow-right2-active.svg' : '/images/arrow-right2.svg'" />
                                </div>
                            </a-col>
                        </a-row>
                    </nuxt-link>
                    </a-card>

                    <!-- 
                    <p class="sub-heading fw-5">{{$t('person.pp10')}}</p>
                    <a-card class="check-card">
                        <a-row :gutter="16">
                            <a-col :lg="9" class="pr-0">
                                <p class="mb-0 google-txt">{{$t('person.pp11')}}</p>
                            </a-col>
                            <a-col :lg="9" class="green-txt fw-4">{{$t('person.pp12')}}</a-col>
                            <a-col :lg="6" align="end"><nuxt-link to="/person/security" class="link-txt">{{$t('person.pp13')}}<img
                                        src="/images/right-orange-arrow.svg" class="pl-2" /> </nuxt-link>
                            </a-col>
                        </a-row>
                    </a-card> -->
                </a-col>
                <a-col :lg="24" v-if="!$userinfo.isopenpaypassword">

                    <a-card class="security-card mb-3" :bordered="false">
                        <nuxt-link to="/person/security">
                        <a-row :gutter="16" class="col-alignment">
                            <a-col :lg="4">
                                <img src="/images/s-fund-icon.svg" />
                            </a-col>
                            <a-col :lg="16" class="pl-3">
                                <p class="sub-heading fw-5 mb-0">{{ $t('person.pp16') }}</p>
                            </a-col>
                            <a-col :lg="2" class="text-right">
                                <div @mouseover="hoverKey = 2" @mouseleave="hoverKey = -1">
                                    <img
                                            :src="hoverKey == 2 ? '/images/arrow-right2-active.svg' : '/images/arrow-right2.svg'" />
                                </div>
                            </a-col>
                        </a-row>
                    </nuxt-link>
                    </a-card>


                    <!-- <p class="sub-heading fw-5 mb-1">{{$t('person.pp14')}}</p>
                    <p class="security-check-desc pr-5 mr-5">{{$t('person.pp15')}}</p>
                    <a-card class="check-card">
                        <a-row :gutter="16">
                            <a-col :lg="10">
                                <p class="mb-0 google-txt">{{$t('person.pp16')}}</p>
                            </a-col>
                            <a-col :lg="8" class="green-txt fw-4"></a-col>
                            <a-col :lg="6" align="end"><nuxt-link to="/person/security" class="link-txt">{{$t('person.pp13')}}<img
                                        src="/images/right-orange-arrow.svg" class="pl-2" /> </nuxt-link>
                            </a-col>
                        </a-row>
                    </a-card> -->
                </a-col>
            </a-row>
        </a-modal>
    </div>
</template>

<script>
export default {
    props: {
        securityCheckModel: {
            type: Boolean
        },
        close: {
            type: Function
        }
    },
    data() {
        return {
            hoverKey: -1
        }
    }
}
</script>

<style></style>
