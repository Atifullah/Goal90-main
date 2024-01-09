<template>
    <div class="handling-fee">
        <div class="handling-fee-bg">
            <div class="main-content">
                <a-row>
                    <p class="mb-2 main-heading fw-5">{{ $t('handelingFee.hf1') }}</p>
                    <a-col :lg="10">
                        <p class="mb-0 text-desc fw-4">
                            {{ $t('handelingFee.hf2') }}
                        </p>
                    </a-col>
                </a-row>
            </div>
        </div>
        <div class="handlingfee-detail">
            <div class="main-content">
                <a-row class="pt-8">
                    <a-col :lg="13">
                        <p class="sub-heading mb-2 fw-5">{{ $t('handelingFee.hf3') }}</p>
                        <p class="mb-0 text-desc text-black fw-4 pb-6">{{ $t('handelingFee.hf4') }}</p>
                    </a-col>
                </a-row>
                <a-row :gutter="16">
                    <a-col :lg="6" v-for="(list, key) in getHandlingFeeList" :key="key" class="pr-4">
                        <p class="mb-3 sub-text fw-5"> <img :src="list.img" height="24px" class="mr-2" />{{ list.title
                        }}</p>
                        <p class="mb-0 title-desc">{{ list.desc }}</p>
                    </a-col>
                </a-row>
                <a-row :gutter="16" class="pt-8">
                    <a-col :lg="24">
                        <a-tabs default-active-key="1">
                            <a-tab-pane key="1" :tab="$t('handelingFee.hf16')">
                                <a-table :columns="vipColumns" :data-source="vipData" :pagination="false" class="mt-4">
                                    <span slot="vipLevel">
                                        <p class="col-alignment mb-0 vip-txt fw-5"><img src="/images/vip1.svg"
                                                class="mr-2" />Vip 1</p>
                                    </span>
                                    <span slot="or" class="wing-token">
                                        /
                                    </span>
                                    <span slot="or1" class="wing-token">
                                        /
                                    </span>
                                </a-table>
                            </a-tab-pane>
                            <a-tab-pane key="2" :tab="$t('handelingFee.hf21')">
                                <a-table :columns="vipColumns" :data-source="vipData" :pagination="false" class="mt-4">
                                    <span slot="vipLevel">
                                        <p class="col-alignment mb-0 vip-txt fw-5"><img src="/images/vip1.svg"
                                                class="mr-2" />Vip 1</p>
                                    </span>
                                    <span slot="or" class="wing-token">
                                        /
                                    </span>
                                    <span slot="or1" class="wing-token">
                                        /
                                    </span>
                                </a-table> </a-tab-pane>
                            <a-tab-pane key="3" :tab="$t('handelingFee.hf20')">
                                <a-table :columns="vipColumns" :data-source="vipData" :pagination="false" class="mt-4">
                                    <span slot="vipLevel">
                                        <p class="col-alignment mb-0 vip-txt fw-5"><img src="/images/vip1.svg"
                                                class="mr-2" />Vip 1</p>
                                    </span>
                                    <span slot="or" class="wing-token">
                                        /
                                    </span>
                                    <span slot="or1" class="wing-token">
                                        /
                                    </span>
                                </a-table> </a-tab-pane>
                        </a-tabs>
                    </a-col>
                </a-row>
                <div class="pt-8 pb-5">
                    <div class="bitnasdaq-partner">
                        <a-row :gutter="16" class="px-5 mx-3 col-alignment">
                            <a-col :lg="20">
                                <p class="cost-effective mb-2 fw-5 text-black">{{ $t('handelingFee.hf5') }}</p>
                                <p class="bitnasdaq-desc mb-0">{{ $t('handelingFee.hf6') }}<a href="#"> service@bitnasdaq.com
                                    </a></p>
                            </a-col>
                            <a-col :lg="4">
                                <nuxt-link to="/contact-us"> <a-button
                                        class="primary-btn fw-5 mt-0 px-4">{{ $t('handelingFee.hf7') }}</a-button></nuxt-link>
                            </a-col>
                        </a-row>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            getHandlingFeeList: [
                {
                    img: '/images/success-img.svg',
                    title: this.$t('handelingFee.hf8'),
                    desc: this.$t('handelingFee.hf9')
                },
                {
                    img: '/images/success-img.svg',
                    title: this.$t('handelingFee.hf10'),
                    desc: this.$t('handelingFee.hf11')
                },
                {
                    img: '/images/success-img.svg',
                    title: this.$t('handelingFee.hf12'),
                    desc: this.$t('handelingFee.hf13')
                },
                {
                    img: '/images/success-img.svg',
                    title: this.$t('handelingFee.hf14'),
                    desc: this.$t('handelingFee.hf15')
                }
            ],
            vipColumns: [
                {
                    title: this.$t('handelingFee.hf16'),
                    dataIndex: 'vipLevel',
                    scopedSlots: { customRender: 'vipLevel' },
                    width: 180,
                },
                {
                    title: this.$t('handelingFee.hf17'),
                    dataIndex: 'recharge',
                    width: 160,
                    align: 'center'

                },
                {
                    title: 'OR',
                    dataIndex: 'or',
                    width: 100,
                    scopedSlots: { customRender: 'or' },
                    align: 'center'

                },
                {
                    title: this.$t('handelingFee.hf18'),
                    dataIndex: 'tradingVolume',
                    width: 200,
                    align: 'center'

                },
                {
                    title: this.$t('tableskeys.vt3'),
                    dataIndex: 'or1',
                    width: 100,
                    scopedSlots: { customRender: 'or1' },
                    align: 'center'

                },
                {
                    title: this.$t('handelingFee.hf19'),
                    dataIndex: 'tradingUsdt',
                    width: 180,
                    align: 'center'

                },
            ],
            vipData: [
                {
                    recharge: '100,000',
                    tradingVolume: '100,000-200,000',
                    tradingUsdt: '200,000-500,000'

                },
                {
                    recharge: '100,000',
                    tradingVolume: '100,000-200,000',
                    tradingUsdt: '200,000-500,000'

                },
                {
                    recharge: '100,000',
                    tradingVolume: '100,000-200,000',
                    tradingUsdt: '200,000-500,000'

                },
                {
                    recharge: '100,000',
                    tradingVolume: '100,000-200,000',
                    tradingUsdt: '200,000-500,000'

                },
                {
                    recharge: '100,000',
                    tradingVolume: '100,000-200,000',
                    tradingUsdt: '200,000-500,000'

                },
                {
                    recharge: '100,000',
                    tradingVolume: '100,000-200,000',
                    tradingUsdt: '200,000-500,000'

                },
                {
                    recharge: '100,000',
                    tradingVolume: '100,000-200,000',
                    tradingUsdt: '200,000-500,000'

                },
            ]
        }
    }
}
</script>

<style></style>