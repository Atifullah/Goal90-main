<template>
    <div id="buy-sell-card">
        <a-card :bordered="false" class="buy-card">

            <a-row :gutter="16">
                <a-col :lg="14" class="pt-4">
                    <div class="px-4 pt-4">
                <p class="mb-0"><img src="/images/speed-star.svg" class="mr-2" height="28px" /><span
                        class="speed-star-txt fw-5">{{ $t('bscard.bsc1') }}</span><img src="/images/star-p2p.svg" class="ml-1" /><img
                        src="/images/check-star.svg" class="ml-1" />
                    <span class="speed-star-desc fw-5 ml-3">{{ $t('bscard.bsc2') }}</span>
                </p>
            </div>
                    <a-card class="sell-gray-card">
                        <a-row :gutter="16" class="px-4">
                            <p class="mb-4 trade-info fw-5 mt-3 mx-2">{{ $t('bscard.bsc3') }}</p>
                            <a-col :lg="8">
                                <p class="price-txt fw-4">{{ $t('bscard.bsc4') }} <span class="ml-2 cny-txt fw-5">7.32 CNY</span> </p>
                                <p class="price-txt fw-4">{{ $t('bscard.bsc5') }} <span class="ml-2 cny-txt fw-5">1111 USDT</span> </p>
                                <p class="price-txt">{{ $t('bscard.bsc6') }} <span class="ml-2 cny-txt fw-5">{{$t('bscard.bsc1')}}</span> </p>

                            </a-col>
                            <a-col :lg="16">
                                <p class="price-txt fw-4">{{ $t('bscard.bsc7') }} <span class="ml-2 cny-txt fw-5">355.00 - 999999.00
                                        CNY</span> </p>
                                <p class="price-txt fw-4">{{ $t('bscard.bsc8') }} <span class="ml-2 cny-txt fw-5">{{ $t('bscard.bsc9') }}</span> </p>
                                <p class="price-txt fw-4">{{ $t('bscard.bsc10') }}<a-tag class="mezan-bank fw-4">{{ $t('bscard.bsc11') }}</a-tag></p>
                            </a-col>
                        </a-row>
                    </a-card>
                    <p class="mb-1 term-and-conditions fw-5 px-4 pt-4">{{ $t('bscard.bsc12') }}</p>
                    <p class="term-and-conditions-desc fw-4 px-4">{{ $t('bscard.bsc13') }} </p>
                </a-col>
                <a-col :lg="10" class="px-4">
                    <a-form-model ref="buySellForm" :model="buySellForm" :hide-required-mark="true" label-align="left">
                        <a-row class="pr-4" :gutter="16">
                            <a-col :lg="24">
                                <a-form-model-item has-feedback :label="$t('labels.lbl93')" prop="email" :colon="false"
                                    :wrapper-col="{
                                        xl: 24,
                                        lg: 24,
                                        md: 24,
                                        sm: 24,
                                        xs: 24,
                                    }">
                                    <a-input placeholder="750,000">
                                        <div slot="suffix">
                                            <p class="mb-0 gray-txt-color"><span class="mr-2 active">{{ $t('bscard.bsc14') }}</span> PKR</p>
                                        </div>
                                    </a-input>

                                </a-form-model-item>
                            </a-col>
                            <a-col :lg="24">
                                <a-form-model-item has-feedback :label="$t('express.exp46')" prop="email" :colon="false"
                                    :wrapper-col="{
                                        xl: 24,
                                        lg: 24,
                                        md: 24,
                                        sm: 24,
                                        xs: 24,
                                    }">
                                    <a-input placeholder="750,000">
                                        <div slot="suffix">
                                            <p class="mb-0 gray-txt-color"> USDT </p>
                                        </div>
                                    </a-input>

                                </a-form-model-item>
                            </a-col>
                            <a-col :lg="24">
                                <a-form-model-item has-feedback :label="$t('labels.lbl17')" prop="email" :colon="false"
                                    :wrapper-col="{
                                        xl: 24,
                                        lg: 24,
                                        md: 24,
                                        sm: 24,
                                        xs: 24,
                                    }">
                                    <a-select default-value="lucy" style="width: 100%">
                                        <a-select-option value="jack">
                                            <a-button class="mr-2 light-blue-btn fw-5">{{ $t('bscard.bsc15') }}</a-button> <span>276598036</span>
                                        </a-select-option>
                                        <a-select-option value="1">
                                            <a-divider class="mt-2 mb-0"/>

                                        </a-select-option>
                                        <a-select-option value="2">
                                           <p class="text-center active pt-2"><img src="/images/add1.svg" class="mr-2"/>{{ $t('bscard.bsc16') }}</p>
                                        </a-select-option>

                                    </a-select>

                                </a-form-model-item>
                            </a-col>
                        </a-row>
                        <a-row :gutter="16" class="mt-3 pr-4 mb-4">
                            <a-col :lg="8"><a-button class="cancel-btn" block>{{ $t('bscard.bsc17') }}</a-button></a-col>
                            <a-col :lg="16"><a-button class="buy-usdt-btn fw-5" block>{{ $t('bscard.bsc18') }}</a-button></a-col>
                        </a-row>
                    </a-form-model>
                </a-col>
            </a-row>

        </a-card>
    </div>
</template>

<script>
export default {
data() {
    return {
        buySellForm: {}
    }
}
}
</script>

<style lang="scss">
@import '@/assets/scss/components/p2p-modules/buy-sell-card.scss';
</style>
